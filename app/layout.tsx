import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.scss";

const inter = Inter({
  variable: "--header-font",
  subsets: ["latin"],
  weight: ['300', '500', '600', '700'],
});

const grotesk = Space_Grotesk({
  variable: "--paragraph-font",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopify Returns App",
  description: "Tech challenge for Reversio by Thea Birk Berger.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            <body className={`${inter.variable} ${grotesk.variable} antialiased`}>
                <main className="flex flex-col gap-8 px-[4vw] py-[5vh]">

                    <div className="flex place-content-between items-center text-nowrap flex-wrap-reverse">
                        <h1>
                            Shopify Returns App
                        </h1>

                        <div className="flex items-center w-30">
                            <img className="w-full" src="/reversio_logo.png" alt="Good Tape logo"></img>
                        </div>
                    </div>

                    { children }

                </main>
            </body>
        </html>
  );
}
