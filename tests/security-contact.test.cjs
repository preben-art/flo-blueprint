/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test loader transpiles the existing TS modules without another dependency. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const resolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...args) {
  return resolve.call(this, name.startsWith('@/') ? path.join(root, 'src', name.slice(2)) : name, ...args);
};
require.extensions['.ts'] = function (mod, file) {
  mod._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText, file);
};
const { serializeJsonLd } = require('../src/lib/json-ld.ts');
const auth = require('../src/lib/desk-auth.ts');
const { validatePostInput, canManagePost, validImagePath } = require('../src/lib/desk-validation.ts');
const { sendContactEmail, emailConfigured } = require('../src/lib/contact-email.ts');

test('JSON-LD cannot break out of script, while Norwegian and HTML-like text round-trip', () => {
  for (const text of ['</script><script>alert(1)</script>', '</ScRiPt><img src=x onerror=alert(1)>', '<!--<script>', 'Rømning æøå < 10 & > 2']) {
    const data = { headline: text, description: text, '@context': 'https://schema.org' };
    assert.ok(!serializeJsonLd(data).includes('<'));
    assert.deepEqual(JSON.parse(serializeJsonLd(data)), data);
  }
  assert.ok(JSON.stringify({ headline: '</script><script>alert(1)</script>' }).includes('</script>'), 'original serializer exposes the trigger');
});

test('production fails closed; distinct identities, signatures, rotation and expiry', () => {
  const saved = { ...process.env };
  try {
    process.env.NODE_ENV = 'production';
    for (const key of ['FLO_DESK_SECRET', 'FLO_DESK_KEY', 'FLO_DESK_CUSTOMERS']) delete process.env[key];
    assert.equal(auth.authenticateDesk('flo-redaksjon', 'FLO'), null);
    assert.equal(auth.authenticateDesk('kunde', 'Owner'), null);
    process.env.FLO_DESK_SECRET = 'a'.repeat(64);
    process.env.FLO_DESK_KEY = 'b'.repeat(64);
    const accounts = [{ id: 'a', passphrase: 'c'.repeat(64) }, { id: 'b', passphrase: 'd'.repeat(64) }];
    process.env.FLO_DESK_CUSTOMERS = JSON.stringify(accounts);
    const a = auth.authenticateDesk(accounts[0].passphrase, 'Same name');
    const b = auth.authenticateDesk(accounts[1].passphrase, 'Same name');
    assert.equal(a.id, 'a'); assert.equal(b.id, 'b');
    const token = auth.encodeSession(a);
    assert.deepEqual(auth.decodeSession(token), a);
    assert.equal(auth.decodeSession(token + '.extra'), null);
    const [payload, signature] = token.split('.');
    const changed = Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(payload, 'base64url')), id: 'flo', role: 'flo' })).toString('base64url');
    assert.equal(auth.decodeSession(changed + '.' + signature), null);
    const post = { source: 'desk', authorRole: 'kunde', authorId: 'a', authorName: 'Same name' };
    assert.equal(canManagePost(post, b), false);
    assert.equal(canManagePost(post, a), true);
    assert.equal(canManagePost({ ...post, authorId: undefined }, a), false);
    assert.equal(canManagePost(post, auth.authenticateDesk(process.env.FLO_DESK_KEY, 'Editor')), true);
    accounts[0].passphrase = 'e'.repeat(64);
    process.env.FLO_DESK_CUSTOMERS = JSON.stringify(accounts);
    assert.equal(auth.decodeSession(token), null);
    process.env.FLO_DESK_CUSTOMERS = JSON.stringify([accounts[1], accounts[1]]);
    assert.equal(auth.authenticateDesk(process.env.FLO_DESK_KEY, 'Editor'), null);
    process.env.FLO_DESK_CUSTOMERS = 'not json';
    assert.equal(auth.authenticateDesk(process.env.FLO_DESK_KEY, 'Editor'), null);
    process.env.FLO_DESK_CUSTOMERS = '[]';
    const now = Date.now;
    let expired;
    try { Date.now = () => now() - 8 * 86400_000; expired = auth.encodeSession({ id: 'flo', role: 'flo', name: 'Editor' }); }
    finally { Date.now = now; }
    assert.equal(auth.decodeSession(expired), null);
  } finally { process.env = saved; }
});

test('persistence rejects invalid image values before write; valid posts and ownership remain usable', async () => {
  const cwd = process.cwd();
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'flo-regression-'));
  try {
    process.chdir(temp);
    const desk = require('../src/lib/desk.ts');
    assert.equal(desk.slugify('Rømning og bæreevne'), 'romning-og-baereevne');
    const input = { kind: 'artikkel', title: 'Gyldig artikkel', kicker: '', excerpt: '', body: 'Rømning og dokumentasjon.', authorId: 'a', authorName: 'Same name', authorRole: 'kunde' };
    for (const still of [42, {}, [], null, 'https://example.com/a.jpg', '/media/../a.jpg', '/media/%2e%2e/a.jpg', 'data:image/svg+xml,<svg/>']) {
      await assert.rejects(desk.createDeskPost({ ...input, still }));
      assert.equal(fs.existsSync(path.join(temp, 'data/editorial/desk.json')), false);
    }
    for (const still of ['/media/naeringsbygg.jpg', '/partners/weenaas.jpg', '/uploads/1790000000000-aabbccdd.webp']) assert.ok(validImagePath(still));
    const post = await desk.createDeskPost({ ...input, still: '/media/naeringsbygg.jpg' });
    const { llmsText } = require('../src/lib/semantic/public-docs.ts');
    assert.ok((await llmsText()).includes(`/artikler/${post.slug}`));
    assert.equal((await desk.getDeskPost('artikkel', post.slug)).still, '/media/naeringsbygg.jpg');
    await assert.rejects(desk.setPostStatus(post.id, 'down', { id: 'b', name: 'Same name', role: 'kunde' }), /forbidden/);
    assert.equal((await desk.getDeskPost('artikkel', post.slug)).status, 'published');
    await desk.setPostStatus(post.id, 'down', { id: 'a', name: 'Changed byline', role: 'kunde' });
    assert.equal(await desk.getDeskPost('artikkel', post.slug), null);
    assert.ok(!(await llmsText()).includes(`/artikler/${post.slug}`));
    const file = path.join(temp, 'data/editorial/desk.json');
    const json = JSON.parse(fs.readFileSync(file, 'utf8')); json.posts[0].still = { bad: true };
    fs.writeFileSync(file, JSON.stringify(json));
    assert.equal((await desk.getDeskPost('artikkel', post.slug, true)).still, undefined);
    assert.throws(() => validatePostInput({ ...input, title: 'x'.repeat(251) }));
  } finally {
    process.chdir(cwd);
    fs.rmSync(temp, { recursive: true, force: true });
  }
});

test('article and page have separate identities; service relations resolve in the graph', () => {
  const { pageGraph } = require('../src/lib/semantic/graph.ts');
  const article = pageGraph({ path: '/artikler/test', title: 'Test', description: 'Beskrivelse', article: true, image: '/media/naeringsbygg.jpg' })['@graph'];
  const page = article.find(n => n['@type'] === 'WebPage');
  const piece = article.find(n => n['@type'] === 'Article');
  assert.notEqual(page['@id'], piece['@id']);
  assert.equal(page.mainEntity['@id'], piece['@id']);
  assert.equal(piece.mainEntityOfPage['@id'], page['@id']);
  assert.equal(piece.image, page.primaryImageOfPage);
  const services = pageGraph({ path: '/losninger/ribr', title: 'RIBr', description: 'Prosjektering', serviceSlug: 'ribr' })['@graph'];
  const ids = new Set(services.map(n => n['@id']));
  for (const node of services.filter(n => n['@type'] === 'Service')) {
    for (const related of node.isRelatedTo) assert.ok(ids.has(related['@id']));
  }
});

test('EmailJS placeholders never send; successful and failed transport are distinguished', async () => {
  const config = { serviceId: 'service_test', templateId: 'template_test', publicKey: 'public_test' };
  let calls = 0;
  const send = async (url, request) => {
    calls++;
    assert.equal(url, 'https://api.emailjs.com/api/v1.0/email/send');
    const body = JSON.parse(request.body);
    assert.equal(body.user_id, config.publicKey);
    assert.equal(body.template_params.reply_to, 'test@example.invalid');
    return { ok: true };
  };
  assert.equal(emailConfigured({ ...config, publicKey: 'YOUR_PUBLIC_KEY' }), false);
  await assert.rejects(sendContactEmail({}, {}, send), /not-configured/);
  assert.equal(calls, 0);
  await sendContactEmail(config, { reply_to: 'test@example.invalid' }, send);
  assert.equal(calls, 1);
  await assert.rejects(sendContactEmail(config, {}, async () => ({ ok: false })), /send-failed/);
  await assert.rejects(sendContactEmail(config, {}, async () => { throw new Error('network'); }), /network/);
});

const { documentOptions, getClaimGuidance } = require('../src/content/claim-guidance.ts');
test('guidance uses explicit document choices, never keywords as legal evidence', () => {
  const unknown = getClaimGuidance('ukjent');
  for (const input of ['', 'lov', 'ikke pålegg', 'rådgiver anbefaler', '__proto__', 'constructor']) {
    assert.deepEqual(getClaimGuidance(input), unknown);
  }
  const titles = documentOptions.map(option => getClaimGuidance(option.id).title);
  assert.equal(new Set(titles).size, documentOptions.length);
  for (const option of documentOptions) assert.equal(getClaimGuidance(option.id).checks.length, 3);
  assert.match(getClaimGuidance('vedtak').checks.join(' '), /endrer ikke en fastsatt frist/);
  assert.match(getClaimGuidance('tilbud').description, /alene avgjør ikke/);
});
const { contactPrivacyReceipt, privacyAcknowledgement } = require('../src/lib/contact-privacy.ts');
test('privacy acknowledgement is required and EmailJS receipt records separate UTC times', () => {
  assert.throws(()=>contactPrivacyReceipt(null), /privacy-required/);
  assert.throws(()=>contactPrivacyReceipt('invalid'), /privacy-required/);
  const receipt = contactPrivacyReceipt('2026-09-23T15:00:00.000Z',new Date('2026-09-23T15:01:20.000Z'));
  assert.equal(receipt.privacy_acknowledged,'yes');
  assert.equal(receipt.privacy_text,privacyAcknowledgement);
  assert.equal(receipt.privacy_acknowledged_at,'2026-09-23T15:00:00.000Z');
  assert.equal(receipt.submitted_at_utc,'2026-09-23T15:01:20.000Z');
  assert.match(receipt.submitted_at_oslo,/17:01:20/);
  assert.equal(receipt.timestamp_source,'browser');
});
