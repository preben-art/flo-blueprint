export function NextNeed({
  items,
}: {
  items: readonly { from: string; to: string }[];
}) {
  return (
    <div>
      <p className="room-number mb-4 text-[#c62e32]">Hva kan komme etterpå</p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.from} className="border-b border-[#161210]/15 pb-3 text-[15px] leading-relaxed">
            <span className="text-[#3d3832]">{item.from}</span>
            <span className="mx-2 text-[#c62e32]">så</span>
            <span className="font-medium">{item.to}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 max-w-xl text-sm text-[#6b645c]">
        Vi legger ikke til mer arbeid enn saken krever.
      </p>
    </div>
  );
}
