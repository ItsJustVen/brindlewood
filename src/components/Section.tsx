import type { ReactNode } from "react";

export default function Section({
  title,
  intro,
  children,
}: {
  title?: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="py-10">
      <div className="mx-auto w-[min(1100px,92%)]">
        {title && <h2 className="mb-3 text-3xl font-bold text-teal">{title}</h2>}
        {intro && <p className="mb-6 max-w-2xl text-muted">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
