"use strict";
(self["webpackChunkstrapi"] = self["webpackChunkstrapi"] || []).push([[5531],{

/***/ 45531:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _interopRequireDefault=__webpack_require__(95318);Object.defineProperty(exports, "__esModule", ({value:true}));exports["default"]=void 0;var _react=_interopRequireDefault(__webpack_require__(67294));var _helperPlugin=__webpack_require__(68547);var _Main=__webpack_require__(62031);var _LinkButton=__webpack_require__(60985);var _Layout=__webpack_require__(78862);var _EmptyStateLayout=__webpack_require__(62791);var _EmptyPictures=_interopRequireDefault(__webpack_require__(63215));var _ArrowRight=_interopRequireDefault(__webpack_require__(77602));var _reactIntl=__webpack_require__(97132);/**
 * InternalErrorPage
 *
 * This is the page we show when the user gets a 500 error
 *
 */var InternalErrorPage=function InternalErrorPage(){var _useIntl=(0,_reactIntl.useIntl)(),formatMessage=_useIntl.formatMessage;(0,_helperPlugin.useFocusWhenNavigate)();return/*#__PURE__*/_react["default"].createElement(_Main.Main,{labelledBy:"title"},/*#__PURE__*/_react["default"].createElement(_Layout.HeaderLayout,{id:"title",title:formatMessage({id:'content-manager.pageNotFound',defaultMessage:'Page not found'})}),/*#__PURE__*/_react["default"].createElement(_Layout.ContentLayout,null,/*#__PURE__*/_react["default"].createElement(_EmptyStateLayout.EmptyStateLayout,{action:/*#__PURE__*/_react["default"].createElement(_LinkButton.LinkButton,{variant:"secondary",endIcon:/*#__PURE__*/_react["default"].createElement(_ArrowRight["default"],null),to:"/"},formatMessage({id:'app.components.NotFoundPage.back',defaultMessage:'Back to homepage'})),content:formatMessage({id:'notification.error',defaultMessage:'An error occured'}),hasRadius:true,icon:/*#__PURE__*/_react["default"].createElement(_EmptyPictures["default"],{width:"10rem"}),shadow:"tableShadow"})));};var _default=InternalErrorPage;exports["default"]=_default;

/***/ })

}]);