import React, { ReactNode } from "react";
import Background from "./Background";

interface LayoutProps {
  children: ReactNode;
}

/// layout that uses ./Background to wrap around its children
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Background />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </>
  );
};

export default Layout;
