import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-screen flex-col items-center justify-center py-2 bg-white">
      {children}
    </main>
  );
}
