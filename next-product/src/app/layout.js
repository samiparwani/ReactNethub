"use client";

import { Inter } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  useEffect(() => {
    // Initialize template functionality
    const initTemplate = () => {
      console.log('Template initialized');
      
      // Hide loading spinner
      const spinner = document.getElementById('loading-spinner');
      if (spinner) {
        spinner.style.opacity = '0';
        setTimeout(() => {
          spinner.style.display = 'none';
        }, 300);
      }
      
      // Initialize sidebar toggle
      const initSidebarToggle = () => {
        const minimizeBtn = document.querySelector('[data-toggle="minimize"]');
        const offcanvasBtn = document.querySelector('[data-toggle="offcanvas"]');
        
        if (minimizeBtn) {
          minimizeBtn.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-icon-only');
          });
        }
        
        if (offcanvasBtn) {
          offcanvasBtn.addEventListener('click', () => {
            document.querySelector('.sidebar-offcanvas')?.classList.toggle('active');
          });
        }
      };
      
      // Initialize pro banner close
      const initProBanner = () => {
        const closeBtn = document.getElementById('bannerClose');
        const proBanner = document.getElementById('proBanner');
        
        if (closeBtn && proBanner) {
          closeBtn.addEventListener('click', () => {
            proBanner.style.display = 'none';
          });
        }
      };
      
      // Initialize dropdowns
      const initDropdowns = () => {
        if (typeof window.bootstrap !== 'undefined') {
          const dropdowns = document.querySelectorAll('.dropdown-toggle');
          dropdowns.forEach(dropdown => {
            new window.bootstrap.Dropdown(dropdown);
          });
        }
      };
      
      setTimeout(() => {
        initSidebarToggle();
        initProBanner();
        initDropdowns();
      }, 500);
    };
    
    setTimeout(initTemplate, 1000);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Corona Admin</title>
        
        {/* Template CSS - با توجه به مشکل فاصله، بعضی CSS ها را حذف می‌کنیم */}
        <link rel="stylesheet" href="/assets/vendors/mdi/css/materialdesignicons.min.css" />
        <link rel="stylesheet" href="/assets/vendors/css/vendor.bundle.base.css" />
        <link rel="stylesheet" href="/assets/vendors/font-awesome/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="shortcut icon" href="/assets/images/favicon.png" />
        
        {/* اضافه کردن CSS برای رفع مشکل فاصله */}
        <style>
          {`
            /* Reset margins and padding for main structure */
            body {
              margin: 0;
              padding: 0;
              overflow-x: hidden;
            }
            
            .container-scroller {
              width: 100%;
              margin: 0;
              padding: 0;
            }
            
            .page-body-wrapper {
              padding: 0;
              margin: 0;
              width: 100%;
            }
            
            .main-panel {
              width: 100%;
              margin: 0;
              padding: 0;
            }
            
            .content-wrapper {
              padding: 20px;
              margin: 0;
              width: 100%;
              box-sizing: border-box;
            }
            
            /* Fix sidebar and navbar positions */
            .sidebar {
              position: fixed;
              left: 0;
              top: 0;
              height: 100vh;
              z-index: 1000;
            }
            
            .navbar {
              position: fixed;
              top: 0;
              right: 0;
              left: 0;
              z-index: 999;
              margin: 0;
            }
            
            /* Adjust main content when sidebar is open */
            .sidebar-icon-only ~ .page-body-wrapper .main-panel {
              margin-left: 70px;
            }
            
            /* Default when sidebar is normal */
            .page-body-wrapper .main-panel {
              margin-left: 260px;
              transition: margin-left 0.3s ease;
            }
            
            /* For mobile */
            @media (max-width: 991px) {
              .page-body-wrapper .main-panel {
                margin-left: 0;
              }
              
              .sidebar-offcanvas.active {
                transform: translateX(0);
              }
            }
          `}
        </style>
      </head>
      <body className={inter.className}>
        {/* Loading Spinner */}
        <div id="loading-spinner" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          transition: 'opacity 0.3s'
        }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">در حال بارگذاری...</p>
          </div>
        </div>
        
        {children}
        
        {/* Load jQuery */}
        <Script
          src="https://code.jquery.com/jquery-3.7.1.min.js"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />
        
        {/* Load Bootstrap */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        
        {/* Load template scripts */}
        <Script
          src="/assets/js/jquery.cookie.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/js/off-canvas.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/js/hoverable-collapse.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/js/misc.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/js/proBanner.js"
          strategy="afterInteractive"
        />
        
        {/* Fix for template scripts */}
        <Script
          id="template-fix"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Fix for template initialization
              window.addEventListener('DOMContentLoaded', function() {
                setTimeout(function() {
                  // Ensure body has correct classes
                  if (!document.body.className.includes('sidebar-icon-only')) {
                    document.body.classList.add('sidebar-icon-only');
                  }
                  
                  // Initialize tooltips if needed
                  if (typeof bootstrap !== 'undefined') {
                    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                      return new bootstrap.Tooltip(tooltipTriggerEl);
                    });
                  }
                }, 1000);
              });
            `
          }}
        />
      </body>
    </html>
  );
}