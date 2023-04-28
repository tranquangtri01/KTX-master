import React from "react";
import {TwitterOutlined, FacebookOutlined,InstagramOutlined,YoutubeOutlined,DribbbleOutlined} from "@ant-design/icons"

export default function Footer() {
  return (
    <footer className="bg-soft-primary">
      <div className="container py-13">
        <div className=" row gy-6 gy-lg-0">
          <div className="col-md-4 col-lg-3">
            <div className="widget">
              <img
                className="mb-4 logo"
                src={`/img/logo.png`}
                alt={`/img/logo.png`}
              />

              <p className="mb-4">
                © 2023 Bản quyền <b> Trường Đại học Sư Phạm Kỹ Thuật Vinh </b>{" "}
              </p>
              <nav className="nav social ">
                <a href="/#">
                  <TwitterOutlined />
                </a>
                <a href="/#">
                  <FacebookOutlined />
                </a>
                <a href="/#">
                  <DribbbleOutlined />
                </a>
                <a href="/#">
                  <InstagramOutlined />
                </a>
                <a href="/#">
                  <YoutubeOutlined />
                </a>
              </nav>
              {/* /.social */}
            </div>
            {/* /.widget */}
          </div>
          {/* /column */}
          <div className="col-md-4 col-lg-3">
            <div className="widget">
              <h4 className="widget-title  mb-3">Địa chỉ liên hệ</h4>
              <address className="mb-0">
                Địa chỉ: 117 - Nguyễn Viết Xuân - Phường Hưng Dũng - Thành phố Vinh – Tỉnh Nghệ An
              </address>
              <a href="mailto:vuted.edu@gmail.com" className="link-body">
                {" "}
                Email: vuted.edu@gmail.com
              </a>
              <p className="d-inline-block">SDT: 0238.3849264 <br></br> Fax: 0238.3842530 </p>
            </div>
            {/* /.widget */}
          </div>
          {/* /column */}
          <div className="col-md-4 col-lg-3">
            <div className="widget">
            </div>
            {/* /.widget */}
          </div>
          {/* /column */}
          <div className="col-md-12 col-lg-3">
            <div className="widget">
              <h4 className="widget-title  mb-3">Đăng ký nhận tin</h4>
              <p className="mb-5">
                Đăng ký nhận tin của chúng tôi để nhận tin tức của chúng tôi gửi
                đến bạn.
              </p>
              <div className="newsletter-wrapper">
                {/* Begin Mailchimp Signup Form */}
                <div id="mc_embed_signup2">
                  <form
                    method="post"
                    id="mc-embedded-subscribe-form2"
                    name="mc-embedded-subscribe-form"
                    className="validate "
                    target="_blank"
                    noValidate
                  >
                    <div id="mc_embed_signup_scroll2">
                      <div className="mc-field-group input-group form-floating">
                        <input
                          type="email"
                          name="EMAIL"
                          className="required email form-control"
                          placeholder="Email Address"
                          id="mce-EMAIL2"
                        />
                        <label htmlFor="mce-EMAIL2">Địa chỉ email</label>
                        <input
                          type="submit"
                          defaultValue="Join"
                          value={"Đăng ký"}
                          name="subscribe"
                          id="mc-embedded-subscribe2"
                          className="btn btn-primary btn-gradient gradient-1"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                {/*End mc_embed_signup*/}
              </div>
              {/* /.newsletter-wrapper */}
            </div>
            {/* /.widget */}
          </div>
          {/* /column */}
        </div>
        {/*/.row */}
      </div>
    </footer>
  );
}
