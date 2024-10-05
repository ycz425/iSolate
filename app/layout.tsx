import type { Metadata } from "next";
import "@/app/globals.css";
import { Inter } from 'next/font/google';
import { UserProvider } from "@auth0/nextjs-auth0/client"

export const metadata: Metadata = {
  title: "iSolate",
  description: "A productivity tool that immerses you in a distraction-free environment, so you can focus on the tasks you need to complete.",
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter-font',
  weight: ['300', '700', '900']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className={inter.className}
        >
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
