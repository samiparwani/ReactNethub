"use client";

import Link from 'next/link';

export default function Sidebar() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <Link className="sidebar-brand brand-logo" href="/">
          <img src="/assets/images/logo.svg" alt="logo" />
        </Link>
        <Link className="sidebar-brand brand-logo-mini" href="/">
          <img src="/assets/images/logo-mini.svg" alt="logo" />
        </Link>
      </div>
      <ul className="nav">
        <li className="nav-item profile">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="count-indicator">
                <img className="img-xs rounded-circle" src="/assets/images/faces/face15.jpg" alt="profile" />
                <span className="count bg-success"></span>
              </div>
              <div className="profile-name">
                <h5 className="mb-0 font-weight-normal">هنری کلین</h5>
                <span>عضو طلایی</span>
              </div>
            </div>
            <a href="#" id="profile-dropdown" data-bs-toggle="dropdown">
              <i className="mdi mdi-dots-vertical"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">
              <a href="#" className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-cog text-primary"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1 text-small">تنظیمات حساب</p>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-onepassword text-info"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1 text-small">تغییر رمز عبور</p>
                </div>
              </a>
            </div>
          </div>
        </li>
        <li className="nav-item nav-category">
          <span className="nav-link">منوها</span>
        </li>
        
        {/* منوی ساده */}
        <li className="nav-item menu-items">
          <Link className="nav-link" href="/">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">داشبورد</span>
          </Link>
        </li>
        
        <li className="nav-item menu-items">
          <Link className="nav-link" href="/users">
            <span className="menu-icon">
              <i className="mdi mdi-account-multiple"></i>
            </span>
            <span className="menu-title">کاربران</span>
          </Link>
        </li>
        
        <li className="nav-item menu-items">
          <a className="nav-link" data-bs-toggle="collapse" href="#settings" aria-expanded="false" aria-controls="settings">
            <span className="menu-icon">
              <i className="mdi mdi-cog"></i>
            </span>
            <span className="menu-title">تنظیمات</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="settings">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <Link className="nav-link" href="/settings/general">عمومی</Link></li>
              <li className="nav-item"> <Link className="nav-link" href="/settings/security">امنیت</Link></li>
              <li className="nav-item"> <Link className="nav-link" href="/settings/notifications">اعلان‌ها</Link></li>
            </ul>
          </div>
        </li>
        
        <li className="nav-item menu-items">
          <Link className="nav-link" href="/reports">
            <span className="menu-icon">
              <i className="mdi mdi-chart-bar"></i>
            </span>
            <span className="menu-title">گزارشات</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}