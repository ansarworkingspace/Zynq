import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      nav bar
      {children}
      footer
    </main>
  );
};

export default RootLayout;
