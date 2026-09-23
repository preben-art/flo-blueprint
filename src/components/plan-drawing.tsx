type PlanLayer = "grid" | "rooms" | "walls" | "live";

export function PlanDrawing({
  layer,
  uid,
}: {
  layer: PlanLayer;
  uid: string;
}) {
  const hatch = `plan-hatch-${uid}`;
  const hatchX = `plan-hatch-x-${uid}`;

  if (layer === "grid") {
    return (
      <g className="plan-grid" fill="none" stroke="currentColor" strokeWidth="0.55">
        {Array.from({ length: 21 }, (_, i) => (
          <line key={`v${i}`} x1={i * 80} y1="40" x2={i * 80} y2="980" />
        ))}
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`h${i}`} x1="40" y1={40 + i * 80} x2="1560" y2={40 + i * 80} />
        ))}
        <g className="plan-centerline" strokeWidth="0.7">
          <path d="M80 512 H1520" />
          <path d="M608 80 V920" />
        </g>
        <g strokeWidth="0.5" opacity="0.75">
          <path d="M188 868 h252 m0 0 v-5 m0 5 v5" />
          <path d="M980 868 h300 m0 0 v-5 m0 5 v5" />
          <path d="M72 220 v268 m0 0 h-5 m5 0 h5" />
          <path d="M1320 300 h168 m0 0 v-5 m0 5 v5" />
        </g>
        <g className="plan-dims" fill="currentColor" stroke="none" fontFamily="ui-monospace, monospace" fontSize="11">
          <text x="286" y="892">12.40</text>
          <text x="1104" y="892">13.60</text>
          <text x="36" y="360" transform="rotate(-90 36 360)">
            13.20
          </text>
          <text x="1368" y="288">7.66</text>
        </g>
      </g>
    );
  }

  if (layer === "rooms") {
    return (
      <g className="plan-rooms" fill="none" stroke="currentColor" strokeWidth="0.8">
        <rect x="176" y="120" width="196" height="148" />
        <rect x="388" y="120" width="172" height="148" />
        <rect x="176" y="284" width="384" height="132" />
        <rect x="688" y="112" width="236" height="160" />
        <rect x="688" y="288" width="236" height="128" />
        <rect x="972" y="104" width="220" height="312" />
        <rect x="1210" y="104" width="196" height="148" />
        <rect x="1210" y="268" width="196" height="148" />
        <rect x="176" y="568" width="384" height="140" />
        <rect x="176" y="724" width="186" height="132" />
        <rect x="378" y="724" width="182" height="132" />
        <rect x="688" y="568" width="236" height="140" />
        <rect x="688" y="724" width="236" height="132" />
        <rect x="972" y="560" width="220" height="296" />
        <rect x="1210" y="560" width="196" height="140" />
        <rect x="1210" y="716" width="196" height="140" />
        <rect x="196" y="140" width="88" height="72" />
        <rect x="708" y="132" width="96" height="64" />
        <rect x="992" y="128" width="84" height="88" />
        <rect x="1230" y="288" width="92" height="68" />
        <rect x="196" y="588" width="120" height="64" />
        <rect x="708" y="744" width="88" height="56" />
        <path d="M292 416 A28 28 0 0 1 320 444" />
        <path d="M760 416 A28 28 0 0 1 788 444" />
        <path d="M1088 416 A28 28 0 0 0 1060 444" />
        <path d="M292 560 A28 28 0 0 0 320 588" />
        <path d="M760 560 A28 28 0 0 0 788 588" />
        <path d="M1088 560 A28 28 0 0 1 1060 588" />
        <path d="M148 748 A24 24 0 0 1 172 772" />
      </g>
    );
  }

  if (layer === "walls") {
    return (
      <g className="plan-walls">
        <defs>
          <pattern id={hatch} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M0 0 V6" stroke="currentColor" strokeWidth="0.7" />
          </pattern>
          <pattern id={hatchX} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <path d="M0 0 V6" stroke="currentColor" strokeWidth="0.55" />
          </pattern>
        </defs>
        <path d="M88 88 H1512 V912 H88 Z" fill="none" stroke="currentColor" strokeWidth="1.65" />
        <path d="M88 444 H1512" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M88 556 H1512" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M560 88 V444 M560 556 V912" fill="none" stroke="currentColor" strokeWidth="1.15" />
        <path d="M656 88 V444 M656 556 V912" fill="none" stroke="currentColor" strokeWidth="1.15" />
        <path d="M948 88 V444 M948 556 V912" fill="none" stroke="currentColor" strokeWidth="1.05" />
        <path
          d="M88 444 h92 v20 H108 v448 h-20 Z"
          fill={`url(#${hatch})`}
          stroke="currentColor"
          strokeWidth="1.05"
        />
        <path d="M88 444 h92 v20 H108 v448 h-20 Z" fill={`url(#${hatchX})`} />
        <path
          d="M88 424 h348 v20 H88 Z"
          fill={`url(#${hatch})`}
          stroke="currentColor"
          strokeWidth="1.05"
        />
        <path d="M88 424 h348 v20 H88 Z" fill={`url(#${hatchX})`} />
        <path
          d="M1168 556 h344 v20 h-88 v336 h-20 V576 h-236 Z"
          fill={`url(#${hatch})`}
          stroke="currentColor"
          strokeWidth="1.05"
        />
        <path d="M1168 556 h344 v20 h-88 v336 h-20 V576 h-236 Z" fill={`url(#${hatchX})`} />
        <path
          d="M1168 424 h344 v20 H1168 Z"
          fill={`url(#${hatch})`}
          stroke="currentColor"
          strokeWidth="1.05"
        />
        <path d="M1168 424 h344 v20 H1168 Z" fill={`url(#${hatchX})`} />
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M108 768 h52" />
          <path d="M108 780 h52" />
          <path d="M108 792 h52" />
          <path d="M108 804 h52" />
          <path d="M108 816 h52" />
          <path d="M108 828 h52" />
          <path d="M108 840 h52" />
        </g>
      </g>
    );
  }

  return (
    <g className="plan-live" fill="none">
      <path className="plan-fire" pathLength={1} d="M88 434 h348 M88 444 v468" strokeWidth="1.65" strokeLinecap="square" />
      <path className="plan-fire" pathLength={1} d="M1168 434 h344 M1424 556 v356" strokeWidth="1.65" strokeLinecap="square" />
      <path
        className="plan-escape"
        d="M134 848 V500 H608 V120"
        strokeWidth="1.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <g className="plan-point plan-point-call">
        <rect x="122" y="828" width="11" height="11" />
      </g>
      <g className="plan-point plan-point-det">
        <circle cx="608" cy="500" r="5" />
      </g>
      <g className="plan-point plan-point-det">
        <circle cx="608" cy="268" r="5" />
      </g>
    </g>
  );
}
