import React, { ReactNode } from "react";
import { StreamVideoProvider } from "../../providers/StreamClientProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkUp",
  description: "Get Linked Up with everyone",
  icons:{
    icon:'/icons/Link.png'
  }
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
