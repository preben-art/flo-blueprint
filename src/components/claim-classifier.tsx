"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form-fields";
import { classifyClaim, defaultTool, type ToolConfig } from "@/content/tool";

export function ClaimClassifier() {
  const [tool, setTool] = useState<ToolConfig>({
    intro: defaultTool.intro,
    disclaimer: defaultTool.disclaimer,
    classes: defaultTool.classes.map((klass) => ({ ...klass, keywords: [...klass.keywords] })),
  });
  const [claim, setClaim] = useState("");
  const [source, setSource] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let live = true;
    fetch("/api/desk/tool")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { tool?: ToolConfig } | null) => {
        if (live && data?.tool?.classes?.length) setTool(data.tool);
      })
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, []);

  const result = useMemo(() => classifyClaim(source, tool.classes), [source, tool.classes]);
  const klass = tool.classes.find((item) => item.id === result) ?? tool.classes.at(-1);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        <p className="text-[15px] leading-relaxed text-[#221d19]">{tool.intro}</p>
        <div>
          <Label htmlFor="claim">Påstanden</Label>
          <Textarea
            id="claim"
            value={claim}
            onChange={(e) => {
              setClaim(e.target.value);
              setDone(false);
            }}
            placeholder="«Dette må gjøres.»"
            required
          />
        </div>
        <div>
          <Label htmlFor="source">Hvem sier det, og hva er kilden?</Label>
          <Input
            id="source"
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setDone(false);
            }}
            placeholder="Tilsyn, rådgiver, entreprenør, veileder, forskrift…"
            required
          />
        </div>
        <Button type="submit">Klassifiser</Button>
      </form>
      <div className="border border-[#161210] bg-[#fbf8f2] p-5">
        <p className="room-number mb-3 text-[#c62e32]">Foreløpig klasse</p>
        {done && klass ? (
          <>
            <h3 className="text-2xl font-normal">{klass.label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#161210]">{klass.meaning}</p>
            {claim ? <p className="mt-4 border-t border-[#161210]/20 pt-4 text-sm">«{claim}»</p> : null}
            <p className="mt-4 text-sm text-[#161210]">{tool.disclaimer}</p>
          </>
        ) : (
          <ul className="space-y-3 text-sm leading-relaxed text-[#161210]">
            {tool.classes.map((item) => (
              <li key={item.id}>
                <span className="font-medium">{item.label}.</span> {item.meaning}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}