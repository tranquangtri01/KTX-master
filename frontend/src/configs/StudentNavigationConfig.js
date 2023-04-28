import {
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  KeyOutlined,
  UserOutlined,
  CreditCardOutlined,

} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "common",
    title: "Tổng quát",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "dashboard",
        path: `${APP_PREFIX_PATH}/dashboard`,
        title: "Trang chủ",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "room-regis",
        path: `${APP_PREFIX_PATH}/room-register`,
        title: "Đăng ký phòng",
        icon: KeyOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "watch-room",
        path: `${APP_PREFIX_PATH}/room-relative`, 
        title: "Xem bạn cùng phòng",
        icon: TeamOutlined,
        breadcrumb: false,
        submenu: [], 
      },
      {
        key: "ttql",
        path: `${APP_PREFIX_PATH}/manager-detail`,
        title: "Thông tin quản lý",
        icon: UserOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "invoice",
        path: `${APP_PREFIX_PATH}/invoice`,
        title: "Thanh toán",
        icon: CreditCardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      // {
      //   key: "qlph",
      //   path: `${APP_PREFIX_PATH}/qlph`,
      //   title: "Phản hồi",
      //   icon: MessageOutlined,
      //   breadcrumb: false,
      //   submenu: [],
      // },
    ],
  },

  {
    key: "setting-common",
    path: `${APP_PREFIX_PATH}/setting`,
    title: "Cài đặt chung",
    icon: SettingOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "profile",
        path: `${APP_PREFIX_PATH}/profile`,
        title: "Thông tin cá nhân",
        icon: SettingOutlined,
        breadcrumb: false,
        submenu: [],
      },
     
      // {
      //   key: "history-register",
      //   path: `${APP_PREFIX_PATH}/history-register`,
      //   title: "Lịch sử đăng ký",
      //   icon: HistoryOutlined,
      //   breadcrumb: false,
      //   submenu: [],
      // },
      // {
      //   key: "changepass",
      //   path: `${APP_PREFIX_PATH}/change-pw`,
      //   title: "Đổi mật khẩu",
      //   icon: LockOutlined ,
      //   breadcrumb: false,
      //   submenu: [],
      // },
     
    ],
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
