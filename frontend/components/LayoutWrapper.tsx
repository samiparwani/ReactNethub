"use client";

import { usePathname } from "next/navigation";
import MainLayout from "./template/layout/MainLayout";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Pages that should use the template layout
  const templatePages = ['/dashboard', '/products', '/profile', '/settings'];
  const useTemplate = templatePages.some(page => pathname.startsWith(page));

  if (useTemplate) {
    return <MainLayout>{children}</MainLayout>;
  }

  // For public pages (auth, home), render children directly
  return <>{children}</>;
}