import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indian Voiceover - Clear Hindi/English TTS",
  description: "Generate clear Indian voiceovers with natural pronunciation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
