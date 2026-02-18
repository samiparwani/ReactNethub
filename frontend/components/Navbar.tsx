"use client";

import Link from "next/link";
import { myAppHook } from "@/context/AppProvider";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { logout, authToken } = myAppHook();
  const pathname = usePathname();

  // عدم نمایش Navbar در صفحات تمپلیت
  const templatePages = ["/dashboard", "/products", "/profile", "/settings"];
  if (templatePages.includes(pathname)) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" href="/">
          ReactNethub
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {authToken ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/dashboard">
                    داشبورد
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/products">
                    محصولات
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-2" onClick={logout}>
                    خروج
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/">
                    خانه
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/auth">
                    ورود / ثبت‌نام
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;