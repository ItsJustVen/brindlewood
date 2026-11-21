import type { ReactNode } from "react";
import { asset } from "../lib/text";

export default function PageHead({
  title,
  eyebrow,
  image,
  children,
}: {
  title: string;
  eyebrow?: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-panel2 bg-deep/60">
      {image && (
        <>
          <img
            src={asset(image)}
            alt=""
            aria-hidden="true"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-deep via-deep/80 to-transparent" />
        </>
      )}
      <div className="relative mx-auto w-[min(1100px,92%)] py-10 sm:py-14">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className="text-4xl font-black sm:text-5xl">{title}</h1>
        {children && <p className="mt-3 max-w-2xl text-lg text-muted">{children}</p>}
      </div>
    </div>
  );
}
