import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "CodeByNavin",
  description: "Portfolio of Navin",
  // Site Icon
  icons: {
    icon: "/Navin.png",
    apple: "/Navin.png",
    other: [
      {
        rel: "icon",
        url: "/Navin.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "/Navin.png",
        sizes: "16x16",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
