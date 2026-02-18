"use client";

interface PageTitleProps {
  title: string;
  pagetitle: string;
}

export default function PageTitle({ title, pagetitle }: PageTitleProps) {
  return (
    <div className="row">
      <div className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-sm-0">{title}</h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <li className="breadcrumb-item">
                <a href="javascript: void(0);">{pagetitle}</a>
              </li>
              <li className="breadcrumb-item active">{title}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}