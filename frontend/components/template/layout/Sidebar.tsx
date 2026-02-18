"use client";

import { myAppHook } from "@/context/AppProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const { user } = myAppHook();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isActive = (path: string) => (pathname === path ? "active" : "");

  if (!isMounted) return null;

  return (
    <div className="app-menu navbar-menu">
      <div className="navbar-brand-box">
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
        <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
          <i className="ri-record-circle-line"></i>
        </button>
      </div>

      <div className="dropdown sidebar-user m-1 rounded">
        <button type="button" className="btn material-shadow-none w-100" data-bs-toggle="dropdown">
          <span className="d-flex align-items-center gap-2">
            <Image className="rounded header-profile-user" src="/assets/images/users/avatar-1.jpg" alt="user" height={32} width={32} />
            <span className="text-start">
              <span className="d-block fw-medium sidebar-user-name-text">{user?.name || "User"}</span>
              <span className="d-block fs-14 sidebar-user-name-sub-text">
                <i className="ri ri-circle-fill fs-10 text-success align-baseline"></i>
                <span className="align-middle">Online</span>
              </span>
            </span>
          </span>
        </button>
        <div className="dropdown-menu w-100">
          <h6 className="dropdown-header">Welcome {user?.name || "User"}!</h6>
          <Link className="dropdown-item" href="/profile">
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> Profile
          </Link>
          <Link className="dropdown-item" href="/settings">
            <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> Settings
          </Link>
        </div>
      </div>

      <div id="scrollbar">
        <div className="container-fluid">
          <ul className="navbar-nav" id="navbar-nav">
            <li className="menu-title"><span>Menu</span></li>
            <li className="nav-item">
              <Link href="/dashboard" className={`nav-link menu-link ${isActive("/dashboard")}`}>
                <i className="ri-dashboard-2-line"></i> <span>Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/products" className={`nav-link menu-link ${isActive("/products")}`}>
                <i className="ri-shopping-bag-line"></i> <span>Products</span>
              </Link>
            </li>
            <li className="menu-title mt-3"><span>Pages</span></li>
            <li className="nav-item">
              <Link href="/profile" className={`nav-link menu-link ${isActive("/profile")}`}>
                <i className="ri-user-line"></i> <span>Profile</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/settings" className={`nav-link menu-link ${isActive("/settings")}`}>
                <i className="ri-settings-line"></i> <span>Settings</span>
              </Link>
            </li>
            <li className="nav-item mt-3">
              <Link href="/auth" className="nav-link menu-link text-danger">
                <i className="ri-logout-circle-line"></i> <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidebar-background"></div>
    </div>
  );
}