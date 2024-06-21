import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="w-screen pt-8 pb-7 px-4">{children}</div>;
}
