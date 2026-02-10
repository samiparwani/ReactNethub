export default function RevenueCards() {
  return (
    <div className="row">
      <div className="col-sm-4 grid-margin">
        <div className="card">
          <div className="card-body">
            <h5>Revenue</h5>
            <div className="row">
              <div className="col-8 col-sm-12 col-xl-8 my-auto">
                <div className="d-flex d-sm-block d-md-flex align-items-center">
                  <h2 className="mb-0">$32123</h2>
                  <p className="text-success ms-2 mb-0 font-weight-medium">+3.5%</p>
                </div>
                <h6 className="text-muted font-weight-normal">11.38% Since last month</h6>
              </div>
              <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-4 grid-margin">
        <div className="card">
          <div className="card-body">
            <h5>Sales</h5>
            <div className="row">
              <div className="col-8 col-sm-12 col-xl-8 my-auto">
                <div className="d-flex d-sm-block d-md-flex align-items-center">
                  <h2 className="mb-0">$45850</h2>
                  <p className="text-success ms-2 mb-0 font-weight-medium">+8.3%</p>
                </div>
                <h6 className="text-muted font-weight-normal">9.61% Since last month</h6>
              </div>
              <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                <i className="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-4 grid-margin">
        <div className="card">
          <div className="card-body">
            <h5>Purchase</h5>
            <div className="row">
              <div className="col-8 col-sm-12 col-xl-8 my-auto">
                <div className="d-flex d-sm-block d-md-flex align-items-center">
                  <h2 className="mb-0">$2039</h2>
                  <p className="text-danger ms-2 mb-0 font-weight-medium">-2.1%</p>
                </div>
                <h6 className="text-muted font-weight-normal">2.27% Since last month</h6>
              </div>
              <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                <i className="icon-lg mdi mdi-monitor text-success ml-auto"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}