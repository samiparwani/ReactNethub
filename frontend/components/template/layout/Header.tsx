"use client";

import { myAppHook } from "@/context/AppProvider";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import TemplateInit from "@/components/TemplateInit";

export default function Header() {
  const { user, logout } = myAppHook();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
  };

  if (!isMounted) return null;

  return (
    <>
      <TemplateInit />
      <header id="page-topbar">
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              {/* LOGO */}
              <div className="navbar-brand-box horizontal-logo">
                <Link href="/dashboard" className="logo logo-dark">
                  <span className="logo-sm">
                    <Image src="/assets/images/logo-sm.png" alt="logo" height={22} width={22} />
                  </span>
                  <span className="logo-lg">
                    <Image src="/assets/images/logo-dark.png" alt="logo" height={17} width={120} />
                  </span>
                </Link>
                <Link href="/dashboard" className="logo logo-light">
                  <span className="logo-sm">
                    <Image src="/assets/images/logo-sm.png" alt="logo" height={22} width={22} />
                  </span>
                  <span className="logo-lg">
                    <Image src="/assets/images/logo-light.png" alt="logo" height={17} width={120} />
                  </span>
                </Link>
              </div>

              {/* Menu Toggle Button */}
              <button
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger material-shadow-none"
                id="topnav-hamburger-icon"
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>

              {/* Search Form */}
              <form className="app-search d-none d-md-block">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    autoComplete="off"
                    id="search-options"
                  />
                  <span className="mdi mdi-magnify search-widget-icon"></span>
                </div>
              </form>
            </div>

            <div className="d-flex align-items-center">
              {/* Language Dropdown */}
              <div className="dropdown ms-1 topbar-head-dropdown header-item">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Image src="/assets/images/flags/us.svg" alt="language" height={20} width={20} className="rounded" />
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  <a href="#" className="dropdown-item notify-item language py-2">
                    <Image src="/assets/images/flags/us.svg" alt="English" className="me-2 rounded" height={18} width={18} />
                    <span className="align-middle">English</span>
                  </a>
                </div>
              </div>

              {/* Fullscreen Button */}
              <div className="ms-1 header-item d-none d-sm-flex">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
                  id="fullscreen-btn"
                >
                  <i className="bx bx-fullscreen fs-22"></i>
                </button>
              </div>

              {/* Dark/Light Mode Toggle */}
              <div className="ms-1 header-item d-none d-sm-flex">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle light-dark-mode"
                  id="theme-toggle"
                >
                  <i className="bx bx-moon fs-22"></i>
                </button>
              </div>

              {/* User Dropdown */}
              <div className="dropdown ms-sm-3 header-item topbar-user">
                <button
                  type="button"
                  className="btn material-shadow-none"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center">
                    <Image
                      className="rounded-circle header-profile-user"
                      src="/assets/images/users/avatar-1.jpg"
                      alt="user avatar"
                      height={32}
                      width={32}
                    />
                    <span className="text-start ms-xl-2">
                      <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                        {user?.name || "User"}
                      </span>
                      <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">
                        {user?.role || "User"}
                      </span>
                    </span>
                  </span>
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  <h6 className="dropdown-header">Welcome {user?.name || "User"}!</h6>
                  <Link className="dropdown-item" href="/profile">
                    <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">Profile</span>
                  </Link>
                  <Link className="dropdown-item" href="/settings">
                    <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">Settings</span>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}