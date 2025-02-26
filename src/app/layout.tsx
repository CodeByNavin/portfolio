import type { Metadata } from "next";
import "./globals.css";
import { Wrapper } from '@/app/Wrapper'

export const metadata: Metadata = {
  title: "Navin",
  description: "Front-end Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Wrapper>
          {children}
        </Wrapper>
      </body>
    </html>
  );
}
