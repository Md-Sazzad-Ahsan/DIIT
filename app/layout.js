import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CSE-20",
  description: "DIIT CSE-20 Class Schedule and Attendance",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#333a3f" />
      </head>
      <body className={`${inter.className}`}>
        <Header />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
