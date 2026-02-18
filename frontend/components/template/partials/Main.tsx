"use client";

import { ReactNode, useEffect } from "react";

interface MainProps {
  children: ReactNode;
  title?: string;
}

export default function Main({ children, title = "Projects" }: MainProps) {
  useEffect(() => {
    // تنظیم title صفحه
    document.title = `${title} | Velzon - Admin & Dashboard Template`;
    
    // لود کردن اسکریپت‌های مورد نیاز
    const loadScripts = async () => {
      // این اسکریپت‌ها بعد از لود صفحه اضافه می‌شوند
    };
    
    loadScripts();
  }, [title]);

  return <>{children}</>;
}