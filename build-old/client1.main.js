(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["client1"],{

/***/ "./src/EditButton.client.js":
/*!**********************************!*\
  !*** ./src/EditButton.client.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditButton; });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _LocationContext_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LocationContext.client */ "./src/LocationContext.client.js");


var _jsxFileName = "/Users/yin-shaochen/src/github.com/michenly/server-components-demo/src/EditButton.client.js";

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


function EditButton(_ref) {
  var noteId = _ref.noteId,
      children = _ref.children;

  var _useLocation = Object(_LocationContext_client__WEBPACK_IMPORTED_MODULE_3__["useLocation"])(),
      _useLocation2 = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useLocation, 2),
      setLocation = _useLocation2[1];

  var _useTransition = Object(react__WEBPACK_IMPORTED_MODULE_2__["useTransition"])(),
      _useTransition2 = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useTransition, 2),
      isPending = _useTransition2[0],
      startTransition = _useTransition2[1];

  var isDraft = noteId == null;
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("button", {
    className: ['edit-button', isDraft ? 'edit-button--solid' : 'edit-button--outline'].join(' '),
    disabled: isPending,
    onClick: function onClick() {
      startTransition(function () {
        setLocation(function (loc) {
          return {
            selectedId: noteId,
            isEditing: true,
            searchText: loc.searchText
          };
        });
      });
    },
    role: "menuitem",
    children: children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 18,
    columnNumber: 5
  }, this);
}

/***/ })

}]);
//# sourceMappingURL=client1.main.js.map