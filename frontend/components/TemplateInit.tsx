"use client";

import { useEffect } from "react";

export default function TemplateInit() {
  useEffect(() => {
    // Ensure DOM is ready
    const timeoutId = setTimeout(() => {
      // Feather Icons
      if (typeof window !== 'undefined' && (window as any).feather) {
        try {
          (window as any).feather.replace();
        } catch (error) {
          console.error("Feather icons error:", error);
        }
      }

      // Fullscreen button
      const fullscreenBtn = document.querySelector('#fullscreen-btn, [data-toggle="fullscreen"]');
      if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => console.error(err));
          } else {
            document.exitFullscreen();
          }
        });
      }

      // Theme toggle
      const themeBtn = document.querySelector('#theme-toggle, .light-dark-mode');
      if (themeBtn) {
        themeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const html = document.documentElement;
          const currentTheme = html.getAttribute('data-bs-theme') || 'light';
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          html.setAttribute('data-bs-theme', newTheme);
          
          const icon = themeBtn.querySelector('i');
          if (icon) {
            icon.className = newTheme === 'dark' ? 'bx bx-sun fs-22' : 'bx bx-moon fs-22';
          }
          localStorage.setItem('theme', newTheme);
        });

        // Apply saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          document.documentElement.setAttribute('data-bs-theme', savedTheme);
          const icon = themeBtn.querySelector('i');
          if (icon) {
            icon.className = savedTheme === 'dark' ? 'bx bx-sun fs-22' : 'bx bx-moon fs-22';
          }
        }
      }

      // Menu toggle (manual handler to ensure it works)
      const menuBtn = document.querySelector('#topnav-hamburger-icon');
      if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
          e.preventDefault();
          document.body.classList.toggle('sidebar-enable');
          const menu = document.querySelector('.app-menu');
          if (menu) {
            menu.classList.toggle('show');
          }
        });
      }

      // Tooltips
      if ((window as any).bootstrap) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map((el: any) => new (window as any).bootstrap.Tooltip(el));
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}