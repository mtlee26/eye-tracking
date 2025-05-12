/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/hooks/GazeContext.js":
/*!**********************************!*\
  !*** ./src/hooks/GazeContext.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GazeDataProvider: () => (/* binding */ GazeDataProvider),\n/* harmony export */   useGazeData: () => (/* binding */ useGazeData)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// Tạo Context\nconst GazeDataContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst useGazeData = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(GazeDataContext);\nconst GazeDataProvider = ({ children })=>{\n    const [gazeData, setGazeData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"GazeDataProvider.useEffect\": ()=>{\n            const ws = new WebSocket(\"ws://localhost:3000\");\n            ws.onopen = ({\n                \"GazeDataProvider.useEffect\": ()=>{\n                    console.log(\"Connected to WebSocket server\");\n                }\n            })[\"GazeDataProvider.useEffect\"];\n            ws.onmessage = ({\n                \"GazeDataProvider.useEffect\": (event)=>{\n                    const data = JSON.parse(event.data);\n                    setGazeData(data);\n                }\n            })[\"GazeDataProvider.useEffect\"];\n            ws.onerror = ({\n                \"GazeDataProvider.useEffect\": (error)=>{\n                    console.error(\"WebSocket error:\", error);\n                }\n            })[\"GazeDataProvider.useEffect\"];\n            ws.onclose = ({\n                \"GazeDataProvider.useEffect\": ()=>{\n                    console.log(\"WebSocket connection closed\");\n                }\n            })[\"GazeDataProvider.useEffect\"];\n            return ({\n                \"GazeDataProvider.useEffect\": ()=>{\n                    ws.close();\n                }\n            })[\"GazeDataProvider.useEffect\"];\n        }\n    }[\"GazeDataProvider.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(GazeDataContext.Provider, {\n        value: gazeData,\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Admin\\\\Documents\\\\GitHub\\\\eye-tracking\\\\src\\\\hooks\\\\GazeContext.js\",\n        lineNumber: 37,\n        columnNumber: 5\n    }, undefined);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaG9va3MvR2F6ZUNvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUE4RTtBQUU5RSxjQUFjO0FBQ2QsTUFBTUssZ0NBQWtCSixvREFBYUE7QUFFOUIsTUFBTUssY0FBYyxJQUFNSCxpREFBVUEsQ0FBQ0UsaUJBQWlCO0FBRXRELE1BQU1FLG1CQUFtQixDQUFDLEVBQUVDLFFBQVEsRUFBRTtJQUMzQyxNQUFNLENBQUNDLFVBQVVDLFlBQVksR0FBR1IsK0NBQVFBLENBQUM7SUFFekNFLGdEQUFTQTtzQ0FBQztZQUNSLE1BQU1PLEtBQUssSUFBSUMsVUFBVTtZQUV6QkQsR0FBR0UsTUFBTTs4Q0FBRztvQkFDVkMsUUFBUUMsR0FBRyxDQUFDO2dCQUNkOztZQUVBSixHQUFHSyxTQUFTOzhDQUFHLENBQUNDO29CQUNkLE1BQU1DLE9BQU9DLEtBQUtDLEtBQUssQ0FBQ0gsTUFBTUMsSUFBSTtvQkFDbENSLFlBQVlRO2dCQUNkOztZQUVBUCxHQUFHVSxPQUFPOzhDQUFHLENBQUNDO29CQUNaUixRQUFRUSxLQUFLLENBQUMsb0JBQW9CQTtnQkFDcEM7O1lBRUFYLEdBQUdZLE9BQU87OENBQUc7b0JBQ1hULFFBQVFDLEdBQUcsQ0FBQztnQkFDZDs7WUFFQTs4Q0FBTztvQkFDTEosR0FBR2EsS0FBSztnQkFDVjs7UUFDRjtxQ0FBRyxFQUFFO0lBRUwscUJBQ0UsOERBQUNuQixnQkFBZ0JvQixRQUFRO1FBQUNDLE9BQU9qQjtrQkFDOUJEOzs7Ozs7QUFHUCxFQUFFIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEFkbWluXFxEb2N1bWVudHNcXEdpdEh1YlxcZXllLXRyYWNraW5nXFxzcmNcXGhvb2tzXFxHYXplQ29udGV4dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUNvbnRleHQsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBU4bqhbyBDb250ZXh0XG5jb25zdCBHYXplRGF0YUNvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XG5cbmV4cG9ydCBjb25zdCB1c2VHYXplRGF0YSA9ICgpID0+IHVzZUNvbnRleHQoR2F6ZURhdGFDb250ZXh0KTtcblxuZXhwb3J0IGNvbnN0IEdhemVEYXRhUHJvdmlkZXIgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gIGNvbnN0IFtnYXplRGF0YSwgc2V0R2F6ZURhdGFdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB3cyA9IG5ldyBXZWJTb2NrZXQoXCJ3czovL2xvY2FsaG9zdDozMDAwXCIpO1xuXG4gICAgd3Mub25vcGVuID0gKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWQgdG8gV2ViU29ja2V0IHNlcnZlclwiKTtcbiAgICB9O1xuXG4gICAgd3Mub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcbiAgICAgIHNldEdhemVEYXRhKGRhdGEpO1xuICAgIH07XG5cbiAgICB3cy5vbmVycm9yID0gKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiV2ViU29ja2V0IGVycm9yOlwiLCBlcnJvcik7XG4gICAgfTtcblxuICAgIHdzLm9uY2xvc2UgPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIldlYlNvY2tldCBjb25uZWN0aW9uIGNsb3NlZFwiKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdzLmNsb3NlKCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPEdhemVEYXRhQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17Z2F6ZURhdGF9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvR2F6ZURhdGFDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VTdGF0ZSIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJHYXplRGF0YUNvbnRleHQiLCJ1c2VHYXplRGF0YSIsIkdhemVEYXRhUHJvdmlkZXIiLCJjaGlsZHJlbiIsImdhemVEYXRhIiwic2V0R2F6ZURhdGEiLCJ3cyIsIldlYlNvY2tldCIsIm9ub3BlbiIsImNvbnNvbGUiLCJsb2ciLCJvbm1lc3NhZ2UiLCJldmVudCIsImRhdGEiLCJKU09OIiwicGFyc2UiLCJvbmVycm9yIiwiZXJyb3IiLCJvbmNsb3NlIiwiY2xvc2UiLCJQcm92aWRlciIsInZhbHVlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/hooks/GazeContext.js\n");

/***/ }),

/***/ "./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _hooks_GazeContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/hooks/GazeContext */ \"./src/hooks/GazeContext.js\");\n/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/styles/global.css */ \"./src/styles/global.css\");\n/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_global_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n// function MyApp({ Component, pageProps }) {\n// return (\n// <WebGazerWrapper>\n// <Component {...pageProps} />\n// </WebGazerWrapper>\n// );\n// }\nfunction MyApp({ Component, pageProps }) {\n    return(// <GazeDataProvider>\n    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Admin\\\\Documents\\\\GitHub\\\\eye-tracking\\\\src\\\\pages\\\\_app.js\",\n        lineNumber: 15,\n        columnNumber: 5\n    }, this));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXVEO0FBQzFCO0FBRTdCLDZDQUE2QztBQUM3QyxXQUFXO0FBQ1gsb0JBQW9CO0FBQ3BCLCtCQUErQjtBQUMvQixxQkFBcUI7QUFDckIsS0FBSztBQUNMLElBQUk7QUFFSixTQUFTQyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3JDLE9BQ0UscUJBQXFCO2tCQUNyQiw4REFBQ0Q7UUFBVyxHQUFHQyxTQUFTOzs7Ozs7QUFJNUI7QUFFQSxpRUFBZUYsS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxBZG1pblxcRG9jdW1lbnRzXFxHaXRIdWJcXGV5ZS10cmFja2luZ1xcc3JjXFxwYWdlc1xcX2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYXplRGF0YVByb3ZpZGVyIH0gZnJvbSBcIkAvaG9va3MvR2F6ZUNvbnRleHRcIjtcbmltcG9ydCBcIkAvc3R5bGVzL2dsb2JhbC5jc3NcIjtcblxuLy8gZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4vLyByZXR1cm4gKFxuLy8gPFdlYkdhemVyV3JhcHBlcj5cbi8vIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbi8vIDwvV2ViR2F6ZXJXcmFwcGVyPlxuLy8gKTtcbi8vIH1cblxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gIHJldHVybiAoXG4gICAgLy8gPEdhemVEYXRhUHJvdmlkZXI+XG4gICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgIC8ve1wiIFwifVxuICAgIC8vIDwvR2F6ZURhdGFQcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XG4iXSwibmFtZXMiOlsiR2F6ZURhdGFQcm92aWRlciIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/_app.js\n");

/***/ }),

/***/ "./src/styles/global.css":
/*!*******************************!*\
  !*** ./src/styles/global.css ***!
  \*******************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.js"));
module.exports = __webpack_exports__;

})();