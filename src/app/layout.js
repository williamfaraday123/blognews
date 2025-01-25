import AdSense from "@/components/ads/AdSense";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { BlogContextProvider } from "@/context/BlogContext";
import { LocationProvider } from "@/context/LocationContext";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "mytravelblog",
  description: "Share your travel experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <AdSense />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <BlogContextProvider>
                <LocationProvider>
                  <div className="container">
                    <div className="wrapper">
                      <Navbar />
                      {children}
                      <Footer />
                    </div>
                  </div>
                </LocationProvider>
              </BlogContextProvider>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
