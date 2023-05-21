import Nav from "@/components/Nav";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prompts App",
  description: "Discover & share AI-powered prompts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen">
          <Nav />
          <div className="container">{children}</div>
        </main>
      </body>
    </html>
  );
}
