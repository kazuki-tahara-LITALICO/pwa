import React, { ReactNode } from "react";
import Footer from "../components/Footer/Footer";

const FuncsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="flex flex-col items-center justify-center py-2 bg-white">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default FuncsLayout;
