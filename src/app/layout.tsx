import "../styles/globals.css";
import React from "react";
import Header from "../components/Header";
import { USERS } from "../constants/strings";
import { getData } from "../lib/getData";

// commenting out metadata to fix build error until i resolve use client usage
export const metadata = {
  title: "Product Explorer",
  description: "E-commerce product browsing demo",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // Server component loads initial product set (static/mock)
  const users = await getData(USERS);
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Header users={users} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}

