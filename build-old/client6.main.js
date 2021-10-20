(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["client6"],{

/***/ "./src/SidebarNote.client.js":
/*!***********************************!*\
  !*** ./src/SidebarNote.client.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SidebarNote; });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _LocationContext_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LocationContext.client */ "./src/LocationContext.client.js");


var _jsxFileName = "/Users/yin-shaochen/src/github.com/michenly/server-components-demo/src/SidebarNote.client.js";

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


function SidebarNote(_ref) {
  var id = _ref.id,
      title = _ref.title,
      children = _ref.children,
      expandedChildren = _ref.expandedChildren;

  var _useLocation = Object(_LocationContext_client__WEBPACK_IMPORTED_MODULE_3__["useLocation"])(),
      _useLocation2 = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useLocation, 2),
      location = _useLocation2[0],
      setLocation = _useLocation2[1];

  var _useTransition = Object(react__WEBPACK_IMPORTED_MODULE_2__["useTransition"])(),
      _useTransition2 = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useTransition, 2),
      isPending = _useTransition2[0],
      startTransition = _useTransition2[1];

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
      _useState2 = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
      isExpanded = _useState2[0],
      setIsExpanded = _useState2[1];

  var isActive = id === location.selectedId; // Animate after title is edited.

  var itemRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
  var prevTitleRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(title);
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      itemRef.current.classList.add('flash');
    }
  }, [title]);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
    ref: itemRef,
    onAnimationEnd: function onAnimationEnd() {
      itemRef.current.classList.remove('flash');
    },
    className: ['sidebar-note-list-item', isExpanded ? 'note-expanded' : ''].join(' '),
    children: [children, /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("button", {
      className: "sidebar-note-open",
      style: {
        backgroundColor: isPending ? 'var(--gray-80)' : isActive ? 'var(--tertiary-blue)' : '',
        border: isActive ? '1px solid var(--primary-border)' : '1px solid transparent'
      },
      onClick: function onClick() {
        startTransition(function () {
          setLocation(function (loc) {
            return {
              selectedId: id,
              isEditing: false,
              searchText: loc.searchText
            };
          });
        });
      },
      children: "Open note for preview"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 7
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("button", {
      className: "sidebar-note-toggle-expand",
      onClick: function onClick(e) {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
      },
      children: isExpanded ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("img", {
        src: "chevron-down.svg",
        width: "10px",
        height: "10px",
        alt: "Collapse"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 70,
        columnNumber: 11
      }, this) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("img", {
        src: "chevron-up.svg",
        width: "10px",
        height: "10px",
        alt: "Expand"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 77,
        columnNumber: 11
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 7
    }, this), isExpanded && expandedChildren]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 30,
    columnNumber: 5
  }, this);
}

/***/ })

}]);
//# sourceMappingURL=client6.main.js.map