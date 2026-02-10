"use client";

import ProBanner from '@/components/ProBanner';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="container-scroller">
      <ProBanner />
      
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        
        <div className="main-panel">
          <Navbar />
          
          <div className="content-wrapper">
            <h3 className="page-title mb-4">داشبورد</h3>
            
            {/* فقط ۴ باکس اول */}
            <div className="row">
              <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-9">
                        <div className="d-flex align-items-center align-self-start">
                          <h3 className="mb-0">۱۲,۳۴۰</h3>
                          <p className="text-success ms-2 mb-0 font-weight-medium">+۳.۵٪</p>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="icon icon-box-success">
                          <span className="mdi mdi-arrow-top-right icon-item"></span>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-muted font-weight-normal">رشد بالقوه</h6>
                  </div>
                </div>
              </div>
              
              <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-9">
                        <div className="d-flex align-items-center align-self-start">
                          <h3 className="mb-0">۱۷,۳۴۰</h3>
                          <p className="text-success ms-2 mb-0 font-weight-medium">+۱۱٪</p>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="icon icon-box-success">
                          <span className="mdi mdi-arrow-top-right icon-item"></span>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-muted font-weight-normal">درآمد فعلی</h6>
                  </div>
                </div>
              </div>
              
              <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-9">
                        <div className="d-flex align-items-center align-self-start">
                          <h3 className="mb-0">۱۲,۳۴۰</h3>
                          <p className="text-danger ms-2 mb-0 font-weight-medium">-۲.۴٪</p>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="icon icon-box-danger">
                          <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-muted font-weight-normal">درآمد روزانه</h6>
                  </div>
                </div>
              </div>
              
              <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-9">
                        <div className="d-flex align-items-center align-self-start">
                          <h3 className="mb-0">۳۱,۵۳۰</h3>
                          <p className="text-success ms-2 mb-0 font-weight-medium">+۳.۵٪</p>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="icon icon-box-success">
                          <span className="mdi mdi-arrow-top-right icon-item"></span>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-muted font-weight-normal">هزینه فعلی</h6>
                  </div>
                </div>
              </div>
            </div>
            
            {/* محتوای ساده برای تست */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">خوش آمدید به پنل مدیریت</h4>
                    <p className="card-description">
                      این یک پنل مدیریت ساده با استفاده از قالب Corona Admin و Next.js است.
                    </p>
                    <div className="mt-3">
                      <button className="btn btn-primary me-2">دکمه اول</button>
                      <button className="btn btn-success me-2">دکمه دوم</button>
                      <button className="btn btn-info">دکمه سوم</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Footer />
        </div>
      </div>
    </div>
  );
}