import { processSteps } from "@/content/explain";
import { cn } from "@/lib/utils";

export function ClarifyPath({
  className,
  tone = "paper",
}: {
  className?: string;
  tone?: "paper" | "glow";
}) {
  return (
    <ol className={cn("clarify-board plan-float", tone === "glow" && "is-glow", className)}>
      {processSteps.map((step, i) => (
        <li key={step.id}>
          <details className="clarify-cell">
            <summary>
              <span className="ed-kicker">{String(i + 1).padStart(2, "0")}</span>
              <span className="clarify-label">{step.label}</span>
            </summary>
            <p>{step.meaning}</p>
          </details>
        </li>
      ))}
    </ol>
  );
}
