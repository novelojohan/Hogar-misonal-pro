import type { Metadata } from "next";
import { Inter, Annie_Use_Your_Telescope, Mogra } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const manuscrita = Annie_Use_Your_Telescope({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-manuscrita-var",
});

// 1. Cargamos la nueva fuente Mogra
const mogra = Mogra({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mogra-var",
});

export const metadata: Metadata = {
  title: "Hogar Misional",
  description: "Agenda de comidas para las hermanas de la iglesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 2. Inyectamos la variable de Mogra en el HTML
    <html lang="es" className={`${inter.variable} ${manuscrita.variable} ${mogra.variable}`}>
      <body className="font-sans min-h-full flex flex-col antialiased bg-slate-50">
        {children}
      </body>
    </html>
  );
}