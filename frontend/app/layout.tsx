import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "@/context/AppProvider";
import LayoutWrapper from "@/components/LayoutWrapper";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReactNethub - Product Management System",
  description: "Product Management System with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-layout="vertical"
      data-topbar="light"
      data-sidebar="dark"
      data-sidebar-size="lg"
      data-sidebar-image="none"
      data-preloader="disable"
      data-theme="default"
      data-theme-colors="default"
    >
      <head>
        <link rel="shortcut icon" href="/assets/images/favicon.ico" />
        {/* Template CSS */}
        <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/css/icons.min.css" rel="stylesheet" />
        <link href="/assets/css/app.min.css" rel="stylesheet" />
        <link href="/assets/css/custom.min.css" rel="stylesheet" />
      </head>
      <body>
        <AppProvider>
          <Toaster position="top-right" />
          <LayoutWrapper>{children}</LayoutWrapper>
        </AppProvider>

        {/* Template Scripts */}
        <Script src="/assets/libs/bootstrap/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
        <Script src="/assets/libs/simplebar/simplebar.min.js" strategy="beforeInteractive" />
        <Script src="/assets/libs/node-waves/waves.min.js" strategy="beforeInteractive" />
        <Script src="/assets/libs/feather-icons/feather.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/pages/plugins/lord-icon-2.1.0.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins.js" strategy="afterInteractive" />
        <Script src="/assets/js/layout.js" strategy="afterInteractive" />
        <Script src="/assets/js/app.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}