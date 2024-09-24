import type { Metadata } from "next";
import "./ui/globals.css";
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: "Isolate",
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
      <body
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
