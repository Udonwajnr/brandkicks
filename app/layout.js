import { Overpass_Mono } from 'next/font/google'

import "./globals.css";
import { AuthProvider } from "./context/context";


const overpass_mono = Overpass_Mono({
  weight: '400',
  subsets: ['latin'],
})
 
export const metadata = {
  title: "BrandKicks",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={overpass_mono.className}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
