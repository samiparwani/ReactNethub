"use client";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            {new Date().getFullYear()} © ReactNethub.
          </div>
          <div className="col-sm-6">
            <div className="text-sm-end d-none d-sm-block">
              طراحی و توسعه توسط تیم شما
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}