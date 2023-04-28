import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL_STRAPI } from "utils/url";

export default function Header() {
  // const [isOpen, setIsOpen] = useState(false);
  const [menus, setMenus] = useState([]);

  const fetchMenus = async () => {
    try {
      const res = await axios.get(URL_STRAPI + "menus?populate=deep,5");
      setMenus(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // eslint-disable-line react-hooks/exhaustive-deps
    fetchMenus();
  }, []);
  return (
    <div className="content-wrapper">
      <header className="wrapper">
        <nav className="navbar navbar-expand-lg center-nav transparent navbar-light caret-none py-3">
          <div className="container flex-lg-row flex-nowrap align-items-center">
            <Link className="nav-link active pl-0" to="/">
              <div className="logo large pl-0">
                <img src={`/img/logo.png`} alt={`/img/logo.png`} />
                <div className={"pl-2 brand"}>
                  <span style={{ fontSize: 14 }}>Hệ thống quản lý KTX</span>
                  <div className="text-primary">Đại học SPKTV</div>
                </div>
              </div>
            </Link>
            <div
              className={
                "navbar-collapse justify-content-center offcanvas-nav"
                // { open: isOpen }
              }
            >
              <div className="offcanvas-header d-lg-none d-xl-none">
                <a href="/">
                  <img
                    src="./assets/img/logo-light.png"
                    srcSet="./assets/img/logo-light@2x.png 2x"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  className="btn-close btn-close-white offcanvas-close offcanvas-nav-close"
                  aria-label="Close"
                  // onClick={() => setIsOpen(false)}
                />
              </div>
              <ul className="navbar-nav">
                {menus &&
                  menus.map((item, index) => {
                    return (
                      <li className="nav-item" key={index}>
                        <Link className="nav-link" to={item.attributes.Link}>
                          {item.attributes.Title}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="navbar-other d-flex ms-auto">
              <ul
                className="navbar-nav flex-row align-items-center ms-auto"
                data-sm-skip="true"
              >
                <li className="nav-item">
                  <nav className="nav social social-muted justify-content-end text-end">
                    {/* <a href="/#">
                     <FacebookOutlined />
                    </a>
                    <a href="/#">
                     <TwitterOutlined />
                    </a>
                    <a href="/#">
                      <InstagramOutlined />
                    </a> */}
                  </nav>
                  {/* /.social */}
                </li>
                <li className="nav-item d-lg-none">
                  <div className="navbar-hamburger">
                    <button
                      className="hamburger animate plain"
                      // onClick={() => setIsOpen(true)}
                      data-toggle="offcanvas-nav"
                    >
                      <span />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
