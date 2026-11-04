import type { ReactNode } from "react";

export default function PageHead({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mx-auto w-[min(1100px,92%)] pb-4 pt-12 text-center">
      <h1 className="mb-3 text-4xl font-black sm:text-5xl">{title}</h1>
      {children && <p className="mx-auto max-w-2xl text-muted">{children}</p>}
    </div>
  );
}
