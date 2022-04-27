import type { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren<{}>) {
  return (
    <div className={`
      card
      bg-white
      dark:bg-black
      z-10
      relative
      overflow-scroll
      h-full
      pt-12
      md:pt-0
      md:h-auto
      md:rounded-3xl
      md:overflow-hidden
      md:w-xl
    `}>
      {children}
    </div>
  );
}
