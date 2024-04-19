import StreamClientProvider from "@/providers/StreamClientProvider";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <StreamClientProvider>{children}</StreamClientProvider>
    </main>
  );
};

export default RootLayout;
