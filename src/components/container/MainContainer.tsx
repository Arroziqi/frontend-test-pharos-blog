import React from "react";

function MainContainer({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"main">) {
  return (
    <main className={`p-4 ${props.className}`} {...props}>
      {children}
    </main>
  );
}

export default MainContainer;
