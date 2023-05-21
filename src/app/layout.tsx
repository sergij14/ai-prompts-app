import Nav from "@/components/Nav";
import "./globals.css";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import AuthProvider from "@/components/AuthProvider";
import { getActiveSession } from "@/utils/getSession";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prompts App",
  description: "Discover & share AI-powered prompts",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getActiveSession(headers().get("cookie") ?? "");

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <main className="min-h-screen">
            <Nav />
            <div className="container">{children}</div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
