(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["client3"],{

/***/ "./src/NoteEditor.client.js":
/*!**********************************!*\
  !*** ./src/NoteEditor.client.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NoteEditor; });
/* harmony import */ var _Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_server_dom_webpack__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-server-dom-webpack */ "./node_modules/react-server-dom-webpack/index.js");
/* harmony import */ var react_server_dom_webpack__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _NotePreview__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NotePreview */ "./src/NotePreview.js");
/* harmony import */ var _Cache_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Cache.client */ "./src/Cache.client.js");
/* harmony import */ var _LocationContext_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LocationContext.client */ "./src/LocationContext.client.js");




var _jsxFileName = "/Users/yin-shaochen/src/github.com/michenly/server-components-demo/src/NoteEditor.client.js";

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */





function NoteEditor(_ref) {
  var noteId = _ref.noteId,
      initialTitle = _ref.initialTitle,
      initialBody = _ref.initialBody;
  var refresh = Object(_Cache_client__WEBPACK_IMPORTED_MODULE_7__["useRefresh"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(initialTitle),
      _useState2 = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState, 2),
      title = _useState2[0],
      setTitle = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(initialBody),
      _useState4 = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState3, 2),
      body = _useState4[0],
      setBody = _useState4[1];

  var _useLocation = Object(_LocationContext_client__WEBPACK_IMPORTED_MODULE_8__["useLocation"])(),
      _useLocation2 = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useLocation, 2),
      location = _useLocation2[0],
      setLocation = _useLocation2[1];

  var _useTransition = Object(react__WEBPACK_IMPORTED_MODULE_4__["useTransition"])(),
      _useTransition2 = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useTransition, 2),
      isNavigating = _useTransition2[0],
      startNavigating = _useTransition2[1];

  var _useMutation = useMutation({
    endpoint: noteId !== null ? "/notes/".concat(noteId) : "/notes",
    method: noteId !== null ? 'PUT' : 'POST'
  }),
      _useMutation2 = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useMutation, 2),
      isSaving = _useMutation2[0],
      saveNote = _useMutation2[1];

  var _useMutation3 = useMutation({
    endpoint: "/notes/".concat(noteId),
    method: 'DELETE'
  }),
      _useMutation4 = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useMutation3, 2),
      isDeleting = _useMutation4[0],
      deleteNote = _useMutation4[1];

  function handleSave() {
    return _handleSave.apply(this, arguments);
  }

  function _handleSave() {
    _handleSave = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var payload, requestedLocation, response;
      return _Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              payload = {
                title: title,
                body: body
              };
              requestedLocation = {
                selectedId: noteId,
                isEditing: false,
                searchText: location.searchText
              };
              _context.next = 4;
              return saveNote(payload, requestedLocation);

            case 4:
              response = _context.sent;
              navigate(response);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleSave.apply(this, arguments);
  }

  function handleDelete() {
    return _handleDelete.apply(this, arguments);
  }

  function _handleDelete() {
    _handleDelete = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var payload, requestedLocation, response;
      return _Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              payload = {};
              requestedLocation = {
                selectedId: null,
                isEditing: false,
                searchText: location.searchText
              };
              _context2.next = 4;
              return deleteNote(payload, requestedLocation);

            case 4:
              response = _context2.sent;
              navigate(response);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _handleDelete.apply(this, arguments);
  }

  function navigate(response) {
    var cacheKey = response.headers.get('X-Location');
    var nextLocation = JSON.parse(cacheKey);
    var seededResponse = Object(react_server_dom_webpack__WEBPACK_IMPORTED_MODULE_5__["createFromReadableStream"])(response.body);
    startNavigating(function () {
      refresh(cacheKey, seededResponse);
      setLocation(nextLocation);
    });
  }

  var isDraft = noteId === null;
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("div", {
    className: "note-editor",
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("form", {
      className: "note-editor-form",
      autoComplete: "off",
      onSubmit: function onSubmit(e) {
        return e.preventDefault();
      },
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("label", {
        className: "offscreen",
        htmlFor: "note-title-input",
        children: "Enter a title for your note"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 70,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("input", {
        id: "note-title-input",
        type: "text",
        value: title,
        onChange: function onChange(e) {
          setTitle(e.target.value);
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("label", {
        className: "offscreen",
        htmlFor: "note-body-input",
        children: "Enter the body for your note"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 81,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("textarea", {
        id: "note-body-input",
        value: body,
        onChange: function onChange(e) {
          setBody(e.target.value);
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 7
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("div", {
      className: "note-editor-preview",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("div", {
        className: "note-editor-menu",
        role: "menubar",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("button", {
          className: "note-editor-done",
          disabled: isSaving || isNavigating,
          onClick: function onClick() {
            return handleSave();
          },
          role: "menuitem",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("img", {
            src: "checkmark.svg",
            width: "14px",
            height: "10px",
            alt: "",
            role: "presentation"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 99,
            columnNumber: 13
          }, this), "Done"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 94,
          columnNumber: 11
        }, this), !isDraft && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("button", {
          className: "note-editor-delete",
          disabled: isDeleting || isNavigating,
          onClick: function onClick() {
            return handleDelete();
          },
          role: "menuitem",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("img", {
            src: "cross.svg",
            width: "10px",
            height: "10px",
            alt: "",
            role: "presentation"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 114,
            columnNumber: 15
          }, this), "Delete"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 109,
          columnNumber: 13
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("div", {
        className: "label label--preview",
        role: "status",
        children: "Preview"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 125,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("h1", {
        className: "note-title",
        children: title
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 128,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])(_NotePreview__WEBPACK_IMPORTED_MODULE_6__["default"], {
        title: title,
        body: body
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 129,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 65,
    columnNumber: 5
  }, this);
}

function useMutation(_ref2) {
  var endpoint = _ref2.endpoint,
      method = _ref2.method;

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      _useState6 = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState5, 2),
      isSaving = _useState6[0],
      setIsSaving = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      _useState8 = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState7, 2),
      didError = _useState8[0],
      setDidError = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(null),
      _useState10 = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState9, 2),
      error = _useState10[0],
      setError = _useState10[1];

  if (didError) {
    // Let the nearest error boundary handle errors while saving.
    throw error;
  }

  function performMutation(_x, _x2) {
    return _performMutation.apply(this, arguments);
  }

  function _performMutation() {
    _performMutation = Object(_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/_Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(payload, requestedLocation) {
      var response;
      return _Users_yin_shaochen_src_github_com_michenly_server_components_demo_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setIsSaving(true);
              _context3.prev = 1;
              _context3.next = 4;
              return fetch("".concat(endpoint, "?location=").concat(encodeURIComponent(JSON.stringify(requestedLocation))), {
                method: method,
                body: JSON.stringify(payload),
                headers: {
                  'Content-Type': 'application/json'
                }
              });

            case 4:
              response = _context3.sent;

              if (response.ok) {
                _context3.next = 11;
                break;
              }

              _context3.t0 = Error;
              _context3.next = 9;
              return response.text();

            case 9:
              _context3.t1 = _context3.sent;
              throw new _context3.t0(_context3.t1);

            case 11:
              return _context3.abrupt("return", response);

            case 14:
              _context3.prev = 14;
              _context3.t2 = _context3["catch"](1);
              setDidError(true);
              setError(_context3.t2);

            case 18:
              _context3.prev = 18;
              setIsSaving(false);
              return _context3.finish(18);

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 14, 18, 21]]);
    }));
    return _performMutation.apply(this, arguments);
  }

  return [isSaving, performMutation];
}

/***/ }),

/***/ "./src/NotePreview.js":
/*!****************************!*\
  !*** ./src/NotePreview.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NotePreview; });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TextWithMarkdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TextWithMarkdown */ "./src/TextWithMarkdown.js");

var _jsxFileName = "/Users/yin-shaochen/src/github.com/michenly/server-components-demo/src/NotePreview.js";

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function NotePreview(_ref) {
  var body = _ref.body;
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
    className: "note-preview",
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_TextWithMarkdown__WEBPACK_IMPORTED_MODULE_1__["default"], {
      text: body
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 13,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "./src/TextWithMarkdown.js":
/*!*********************************!*\
  !*** ./src/TextWithMarkdown.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TextWithMarkdown; });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! marked */ "./node_modules/marked/lib/marked.js");
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(marked__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sanitize_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sanitize-html */ "./node_modules/sanitize-html/index.js");
/* harmony import */ var sanitize_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sanitize_html__WEBPACK_IMPORTED_MODULE_2__);

var _jsxFileName = "/Users/yin-shaochen/src/github.com/michenly/server-components-demo/src/TextWithMarkdown.js";

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


var allowedTags = sanitize_html__WEBPACK_IMPORTED_MODULE_2___default.a.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3']);
var allowedAttributes = Object.assign({}, sanitize_html__WEBPACK_IMPORTED_MODULE_2___default.a.defaults.allowedAttributes, {
  img: ['alt', 'src']
});
function TextWithMarkdown(_ref) {
  var text = _ref.text;
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
    className: "text-with-markdown",
    dangerouslySetInnerHTML: {
      __html: sanitize_html__WEBPACK_IMPORTED_MODULE_2___default()(marked__WEBPACK_IMPORTED_MODULE_1___default()(text), {
        allowedTags: allowedTags,
        allowedAttributes: allowedAttributes
      })
    }
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 28,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ 1:
/*!***************************!*\
  !*** colorette (ignored) ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!**************************************!*\
  !*** ./terminal-highlight (ignored) ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!*******************************!*\
  !*** source-map-js (ignored) ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 5:
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 6:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=client3.main.js.map