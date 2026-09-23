/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const vm = require('node:vm');
process.env.NEXT_PUBLIC_SITE_URL = 'https://flo-brannsikring.no';
const root = path.resolve(__dirname, '..');
const resolve = Module._resolveFilename;
Module._resolveFilename = function(name, ...args) { return resolve.call(this, name.startsWith('@/') ? path.join(root,'src',name.slice(2)) : name,...args); };
require.extensions['.ts'] = (mod,file) => mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,file);

test('people grouped exactly once and all published roles represented', () => {
 const {people} = require('../src/content/site.ts');
 const {peopleGroups} = require('../src/content/people-groups.ts');
 const grouped = peopleGroups.flatMap(g=>g.members.map(p=>p.email));
 assert.equal(new Set(grouped).size,people.length);
 assert.equal(grouped.length,people.length);
 assert.ok(people.every(p=>p.role));
});

test('production sitemap and discovery share canonical public routes', async () => {
 const {publicRoutes} = require('../src/lib/public-routes.ts');
 const sitemap = require('../src/app/sitemap.ts').default;
 const {llmsText,llmsFullText} = require('../src/lib/semantic/public-docs.ts');
 const routes = await publicRoutes(); const map = await sitemap(); const text = await llmsText();
 assert.ok(routes.length > 40);
 assert.equal(map.length,routes.length);
 for(const entry of map) { assert.ok(text.includes(entry.url)); assert.ok(!/redaksjon|api\/desk|offline|hostingersite/.test(entry.url)); }
 const full = await llmsFullText();
 assert.ok(full.includes('Sigrid Elida Linnerud — Branningeniør'));
 assert.ok(!full.includes('authorId'));
});

test('service worker always prefers network and excludes private, API and POST requests', async () => {
 const handlers={}; const cached=[];
 const context={URL,Response,self:{location:{origin:'https://example.test'},addEventListener:(name,fn)=>handlers[name]=fn},caches:{open:async()=>({add:async url=>cached.push(url)}),keys:async()=>[],match:async()=>new Response('offline')},fetch:async()=>new Response('fresh')};
 vm.runInNewContext(fs.readFileSync(path.join(root,'public/sw.js'),'utf8'),context);
 let install; handlers.install({waitUntil:p=>install=p}); await install; assert.deepEqual(cached,['/offline']);
 async function request(url,method='GET',mode='navigate') {let response;handlers.fetch({request:{url:'https://example.test'+url,method,mode},respondWith:p=>response=p});return response ? (await response).text() : undefined;}
 assert.equal(await request('/om-flo'),'fresh');
 context.fetch=async()=>{throw new Error('offline');};
 assert.equal(await request('/om-flo'),'offline');
 assert.equal(await request('/api/desk'),undefined);
 assert.equal(await request('/redaksjon'),undefined);
 assert.equal(await request('/kontakt','POST'),undefined);
 assert.equal(await request('/api/site','GET','cors'),undefined);
});
