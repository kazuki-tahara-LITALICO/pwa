import { ReactNode } from "react";

const TopPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-start px-5 bg-white">
      {children}
    </div>
  );
};

export default TopPageLayout;
