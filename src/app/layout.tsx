import "../styles/globals.css";
import React from "react";
import Header from "../components/Header";

export const metadata = {
  title: "Product Explorer",
  description: "E-commerce product browsing demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
