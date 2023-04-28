import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_STRAPI, URL_STRAPI_IMG } from "utils/url";
import bg from "../../../assets/img/bg22.png"
import Footer from "../common/Footer"; 
export const Home = ({ setAuth }) => {
  const [data, setData] = useState([]);
  const fetchDataHome = async () => {
    try {
      const res = await axios.get(URL_STRAPI + "homepage?populate=deep,5");
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDataHome();
  }, []);

  // homepage?populate=deep,5

  if (data.attributes !== undefined) {
    let { Banner, Feature, Feedback } = data.attributes;
    return (
      <>
        <section className="wrapper bg-light">
          <div className="container-card">
            <div
              className="card image-wrapper bg-full bg-image bg-overlay bg-overlay-light-500 mt-2 mb-5"
              style={{ background: "url(" + bg + ")" }}
            >
              <div className="card-body py-14 px-0">
                <div className="container">
                  <div className="row gx-md-8 gx-xl-12 gy-10 align-items-center text-center text-lg-start">
                    <div
                      className="col-lg-6"
                      data-delay={900}
                    >
                      <h1 className="display-2 mb-4 me-xl-5 me-xxl-0">
                        {Banner.Title}
                      </h1>
                      <p className="lead fs-23 lh-sm mb-7 pe-xxl-15">
                        {Banner.description}
                      </p>
                      <a
                        href={Banner.button[0].description}
                        className="btn btn-lg btn-gradient gradient-1 rounded"
                      >
                        {Banner.button[0].title}
                      </a>
                    </div>
                    <div className="col-lg-6">
                      <img
                        className="img-fluid mb-n18"
                        src={
                          URL_STRAPI_IMG +
                          Banner.image.data.attributes.formats.medium.url
                        }
                        alt={Banner.button[0].title}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="wrapper bg-light">
          <div className="container pt-14 pt-md-17 pb-14 pb-4">
            <div className="row text-center">
              <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                <h2 className="fs-16 text-uppercase text-gradient gradient-1 mb-3">
                  {Feature.title}
                </h2>
                <h3 className="display-4 mb-9 px-xl-11">
                  {Feature.description}
                </h3>
              </div>
              {/* /column */}
            </div>
            {/* /.row */}
            <div className="row gy-8 mb-17">
              {Feature.featureItem.map((item, index) => (
                <div className="col-md-6 col-lg-4" key={index}>
                  <div className="d-flex flex-row">
                    <div>
                      <img
                        src={
                          URL_STRAPI_IMG + item.image.data.attributes.formats.small.url
                        }
                        className=" icon-svg icon-svg-sm solid-duo text-grape-fuchsia me-4"
                        alt=""
                      />
                    </div>
                    <div>
                      <h3 className="fs-22 mb-1">{item.title}</h3>
                      <p className="mb-0">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/*/.row */}
            <div className="row gx-md-8 gy-10 align-items-center">
              <div className="col-lg-6 offset-lg-1 order-lg-2 position-relative">
                <figure className="rounded">
                  <img
                    className="img-fluid"
                    src={
                      URL_STRAPI_IMG  +
                      Feedback.image.data[0].attributes.formats.medium.url
                    }
                    alt=""
                  />
                </figure>
                <div
                  className="card shadow-lg position-absolute d-none d-md-block"
                  style={{ top: "2%", left: "-7%" }}
                >
                  <div className="card-body py-4 px-5">
                    <div className="d-flex flex-row align-items-center">
                      <div className=" icon-svg icon-svg-sm solid-duo text-grape-fuchsia me-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 234.66"
                          data-inject-url="http://127.0.0.1:5500/dist/assets/img/icons/solid/cloud-group.svg"
                          className="icon-svg icon-svg-sm solid-duo text-grape-fuchsia me-3"
                        >
                          <circle
                            className="fill-secondary"
                            cx={128}
                            cy="149.33"
                            r="21.33"
                          />
                          <path
                            className="fill-secondary"
                            d="M162.67 234.66H93.34a8 8 0 01-8-8v-16a29.36 29.36 0 0129.33-29.33h26.67a29.35 29.35 0 0129.33 29.33v16a8 8 0 01-8 8zm32-64h-14.19a55.46 55.46 0 0116.85 40v2.67H216a8.06 8.06 0 008-8V200a29.32 29.32 0 00-29.33-29.34zm-133.34 0A29.31 29.31 0 0032 200v5.35a8.06 8.06 0 008 8h18.67v-2.67a55.46 55.46 0 0116.85-40z"
                          />
                          <circle
                            className="fill-secondary"
                            cx="74.67"
                            cy="138.66"
                            r="21.33"
                          />
                          <circle
                            className="fill-secondary"
                            cx="181.33"
                            cy="138.66"
                            r="21.33"
                          />
                          <path
                            className="fill-primary"
                            d="M27.2 162.94a52.21 52.21 0 018.8-6.56A42.48 42.48 0 01107.73 112a41 41 0 0140.54 0A42.48 42.48 0 01220 156.38a55.09 55.09 0 015.83 4 64.4 64.4 0 00-26.65-118.49A81.31 81.31 0 00128 0C90.19 0 57.39 26.3 49.1 62.18 21.54 65.07 0 88.22 0 116.26c0 19.93 11 37.21 27.2 46.68z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="fs-25 counter mb-0 text-nowrap">
                          {Feedback.cardNum}
                        </h3>
                        <p className="fs-16 lh-sm mb-0 text-nowrap">
                          {Feedback.cardTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="card shadow-lg position-absolute text-center d-none d-md-block"
                  style={{ bottom: "10%", left: "-10%" }}
                >
                  <div className="card-body p-6">
                    <div
                      className="progressbar semi-circle fuchsia mb-3"
                      data-value={Feedback.card2Num}
                    >
                      <svg
                        viewBox="0 0 100 50"
                        style={{
                          display: "block",
                          width: "100%",
                          height: "80px",
                        }}
                      >
                        <path
                          d="M 50,50 m -47,0 a 47,47 0 1 1 94,0"
                          stroke="#eee"
                          strokeWidth={6}
                          fillOpacity={0}
                        />
                        <path
                          d="M 50,50 m -47,0 a 47,47 0 1 1 94,0"
                          stroke="#555"
                          strokeWidth={6}
                          fillOpacity={0}
                          style={{
                            strokeDasharray: "147.708, 147.708",
                            strokeDashoffset: "29.5416",
                          }}
                        />
                      </svg>
                    </div>
                    <h2 className="card2Num">{Feedback.card2Num}%</h2>
                    <h4 className="mb-0 mt-3">{Feedback.card2Title}</h4>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <h2 className="fs-16 text-uppercase text-gradient gradient-1 mb-3">
                  {Feedback.subTitle}
                </h2>
                <h3 className="display-4 mb-4 me-lg-n5">{Feedback.title}</h3>
                <p className="mb-6">{Feedback.description}</p>
              </div>
            </div>
          </div>
        </section>
                          <Footer/>
      </>
    );
  } else {
    return <div></div>;
  }
};

export default Home;
