import {
  DashboardOutlined,
  SettingOutlined,
  HomeOutlined,
  DeploymentUnitOutlined,
  BuildOutlined,
  TeamOutlined,
  FormOutlined,
  CreditCardOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import CB from "components/util-components/CustomIcon/cb";
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
        path: `${APP_PREFIX_PATH}/home`,
        title: "Thống kê",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },

  {
    key: "manager",
    title: "Quản lý",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "registerForm",
        path: `${APP_PREFIX_PATH}/student-register`,
        title: "Quản lý đăng ký",
        icon: FormOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "room",
        title: "Quản lý phòng",
        icon: AppstoreOutlined,
        breadcrumb: true,
        navCollapsed: false,

        submenu: [
          {
            key: "room",
            path: `${APP_PREFIX_PATH}/room`,
            title: "Phòng",
            icon: HomeOutlined,
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "room-type",
            path: `${APP_PREFIX_PATH}/room-type`,
            title: "Loại phòng",
            icon: DeploymentUnitOutlined,
            breadcrumb: false,
            submenu: [],
          },

          {
            key: "campus",
            path: `${APP_PREFIX_PATH}/campus`,
            title: "Quản lý tòa nhà",
            icon: BuildOutlined,
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
      {
        key: "student",
        path: `${APP_PREFIX_PATH}/student`,
        title: "Sinh viên",
        icon: TeamOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "manager",
        path: `${APP_PREFIX_PATH}/manager`,
        title: "Cán bộ KTX",
        icon: CB,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "bill",
        path: `${APP_PREFIX_PATH}/bill`,
        title: "Quản lý hóa đơn",
        icon: CreditCardOutlined,
        breadcrumb: false,
        submenu: [],
      },
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
        key: "setting",
        path: `${APP_PREFIX_PATH}/setting`,
        title: "Cài đặt",
        icon: SettingOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
