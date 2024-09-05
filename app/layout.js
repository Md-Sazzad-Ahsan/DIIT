import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  manifest: "/manifest.json",
  title: "CSE-DIIT",
  description:"A comprehensive web application designed for students and faculty of the CSE Department at DIIT, offering easy access to schedules, notices, and academic resources for efficient learning.",
  openGraph: {
    title: "CSE-DIIT",
    description:"A comprehensive web application designed for students and faculty of the CSE Department at DIIT, offering easy access to schedules, notices, and academic resources for efficient learning.",
    type: "website",
    locale: "en_US",
    url: "https://cse20.vercel.app",
    images: [
      {
        url: "https://cse20.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "CSE-DIIT Open Graph Image",
      },
    ],
    siteName: "CSE-DIIT's Web App",
  },
  twitter: {
    title: "CSE-DIIT",
    description:
     "A comprehensive web application designed for students and faculty of the CSE Department at DIIT, offering easy access to schedules, notices, and academic resources for efficient learning.",
    card: "summary_large_image",
     },
  metadataBase: new URL("https://cse20.vercel.app"),
};

export default async function RootLayout({
  children,
}) {

  const session = await getServerSession();
  return (
    <html lang="en">
      <head>
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#333a3f" />
      </head>
      <body className={`${inter.className}`}>
         <SessionProvider session={session}> 

        <Header />
        <main>{children}</main>
        {/* <Footer /> */}
        
        </SessionProvider> 
      </body>
    </html>
  );
}
