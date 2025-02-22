import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Republic Day Event",
  description: "Republic day event made for GT Aloha Vidhya Mandir",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
