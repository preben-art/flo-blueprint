import type { ReactNode } from "react";
import { PlanPlate } from "@/components/plan-plate";
import { answerQuestion, type Answer, type AnswerId } from "@/content/answers";
import { cn } from "@/lib/utils";

export function AnswerBlock({
  id,
  item,
  tone = "glow",
  children,
}: {
  id: AnswerId;
  item: Answer;
  tone?: "paper" | "photo" | "glow";
  children?: ReactNode;
}) {
  const onDark = tone !== "paper";
  return (
    <article
      id={id}
      className={cn("answer-block scroll-mt-28 sm:scroll-mt-32", onDark && "text-[#fbf8f2]")}
    >
          <h2
        className={cn(
          "max-w-xl font-normal leading-snug",
          onDark ? "text-xl text-[#fbf8f2] sm:text-2xl" : "text-xl text-[#161210] sm:text-2xl",
        )}
      >
        {answerQuestion[id]}
      </h2>
      <p
        className={cn(
          "mt-5 max-w-xl font-normal leading-relaxed",
          onDark
            ? "text-[16px] text-[#fbf8f2]"
            : "text-[16px] text-[#221d19]",
        )}
      >
        {item.answer}
      </p>
      {item.detail ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-[15px] font-normal leading-relaxed",
            onDark ? "text-[#fbf8f2]/90" : "text-[#221d19]",
          )}
        >
          {item.detail}
        </p>
      ) : null}
      {item.points?.length ? (
        <ul className="mt-6 max-w-2xl space-y-0">
          {item.points.map((p) => (
            <li
              key={p}
              className={cn(
                "border-b py-2.5 text-[15px] font-normal leading-relaxed",
                onDark ? "border-[#fbf8f2]/18 text-[#fbf8f2]" : "border-[#161210]/18 text-[#161210]",
              )}
            >
              {p}
            </li>
          ))}
        </ul>
      ) : null}
      {item.photo && tone === "paper" ? (
        <PlanPlate
          className="mt-10"
          src={item.photo.src}
          alt={item.photo.alt}
          caption={item.photo.caption}
          sizes="(max-width: 1024px) 100vw, 720px"
          ratio="wide"
        />
      ) : null}
      {children}
    </article>
  );
}
