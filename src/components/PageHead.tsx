import type { ReactNode } from "react";

export default function PageHead({ title, eyebrow, children }: { title: string; eyebrow?: string; children?: ReactNode }) {
  return (
    <div className="border-b border-panel2 bg-deep/60">
      <div className="mx-auto w-[min(1100px,92%)] py-10 sm:py-14">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className="text-4xl font-black sm:text-5xl">{title}</h1>
        {children && <p className="mt-3 max-w-2xl text-lg text-muted">{children}</p>}
      </div>
    </div>
  );
}
