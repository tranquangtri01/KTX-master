import React, { lazy, Suspense, useEffect, useState } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";
// import MessengerCustomerChat from "react-messenger-customer-chat";
import { Alert } from "antd";
import { useLocation } from "react-router-dom";
import { URL } from "utils/url";
import axios from "axios";

export const StudentViews = () => {
  const location = useLocation();
  const [loading, setLoading] = useState([]);

  const fetchBill = async () => {
    let sid = window.localStorage.getItem("sid");
    try {
      const res = await axios.get(URL + "bill/billID", {
        params: { id: sid },
      });
      setLoading(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("loading", loading);
  return (
    <Suspense fallback={<Loading cover="content" />}>
      {location.pathname !== "/app/invoice" && loading.length > 0 && (
        <Alert
          message="Cảnh báo"
          description={
            <div>
              Bạn chưa thanh toán lệ phí tháng này.
              <br /> Click vào{" "}
              <Link to="/app/invoice" className="text-under">
                đây
              </Link>{" "}
              để thanh toán
            </div>
          }
          type="warning"
          showIcon
          className="money-check"
        />
      )}
      <Switch>
        <Route
          path={`${APP_PREFIX_PATH}/setting`}
          component={lazy(() => import(`./setting`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/shop`}
          component={lazy(() => import(`./e-commerce`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/invoice`}
          component={lazy(() => import(`./student-dashboard/invoice`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/profile`}
          component={lazy(() =>
            import(`./student-dashboard/EditProfile/index`)
          )}
        />
        <Route
          path={`${APP_PREFIX_PATH}/room-relative`}
          component={lazy(() => import(`./student-dashboard/RoomRelatives`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/room-register`}
          component={lazy(() => import(`./student-dashboard/RoomRegister`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/manager-detail`}
          component={lazy(() => import(`./student-dashboard/ManagerDetail`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/dashboard`}
          component={lazy(() => import(`./student-dashboard`))}
        />
        <Redirect
          from={`${APP_PREFIX_PATH}`}
          to={`${APP_PREFIX_PATH}/dashboard`}
        />
      </Switch>
        {/* <MessengerCustomerChat pageId="102791922266252" language="vi_VN" /> */}
    </Suspense>
  );
};

export default React.memo(StudentViews);
