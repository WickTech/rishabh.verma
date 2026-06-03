import { Reveal } from "./motion/Reveal";

export function SectionHeading({
  index,
  kicker,
  title,
}: {
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <Reveal>
      <div className="mb-12 flex items-end justify-between gap-6 border-b border-glass pb-5">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            {kicker}
          </span>
          <h2 className="display text-4xl text-on-surface sm:text-5xl">{title}</h2>
        </div>
        <span className="display shrink-0 text-2xl text-stroke sm:text-3xl">
          {index}
        </span>
      </div>
    </Reveal>
  );
}
