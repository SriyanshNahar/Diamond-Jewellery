import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "@/components/layout/AuthModal";
import SecurityWrapper from "@/components/layout/SecurityWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Aura | Premium Diamond Jewellery",
  description: "Discover the finest luxury diamond jewellery, rings, necklaces, and bangles. Elevate your elegance with Aura.",
  openGraph: {
    title: "Aura | Premium Diamond Jewellery",
    description: "Discover the finest luxury diamond jewellery.",
    url: "https://your-domain.com", // Will be updated on Vercel
    siteName: "Aura Jewellery",
    images: [
      {
        url: "/banner.jpg", // Needs a premium banner in public/
        width: 1200,
        height: 630,
        alt: "Aura Premium Jewellery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura | Premium Diamond Jewellery",
    description: "Discover the finest luxury diamond jewellery.",
    images: ["/banner.jpg"],
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AuthProvider>
          <CartProvider>
            <SecurityWrapper>
              <AuthModal />
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </SecurityWrapper>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
