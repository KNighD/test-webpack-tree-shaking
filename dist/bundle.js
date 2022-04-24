!function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 2);
}([ , , function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var _modules_a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
    __webpack_require__(4);
    Object(_modules_a__WEBPACK_IMPORTED_MODULE_0__.a)();
}, , function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5), _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6), options = {
        insert: "head",
        singleton: !1
    };
    _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__.a, options), 
    _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__.a.locals;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var memo, isOldIE = function() {
        return void 0 === memo && (memo = Boolean(window && document && document.all && !window.atob)), 
        memo;
    }, getTarget = function() {
        var memo = {};
        return function(target) {
            if (void 0 === memo[target]) {
                var styleTarget = document.querySelector(target);
                if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) try {
                    styleTarget = styleTarget.contentDocument.head;
                } catch (e) {
                    styleTarget = null;
                }
                memo[target] = styleTarget;
            }
            return memo[target];
        };
    }(), stylesInDom = [];
    function getIndexByIdentifier(identifier) {
        for (var result = -1, i = 0; i < stylesInDom.length; i++) if (stylesInDom[i].identifier === identifier) {
            result = i;
            break;
        }
        return result;
    }
    function modulesToDom(list, options) {
        for (var idCountMap = {}, identifiers = [], i = 0; i < list.length; i++) {
            var item = list[i], id = options.base ? item[0] + options.base : item[0], count = idCountMap[id] || 0, identifier = "".concat(id, " ").concat(count);
            idCountMap[id] = count + 1;
            var index = getIndexByIdentifier(identifier), obj = {
                css: item[1],
                media: item[2],
                sourceMap: item[3]
            };
            -1 !== index ? (stylesInDom[index].references++, stylesInDom[index].updater(obj)) : stylesInDom.push({
                identifier: identifier,
                updater: addStyle(obj, options),
                references: 1
            }), identifiers.push(identifier);
        }
        return identifiers;
    }
    function insertStyleElement(options) {
        var style = document.createElement("style"), attributes = options.attributes || {};
        if (void 0 === attributes.nonce) {
            var nonce = __webpack_require__.nc;
            nonce && (attributes.nonce = nonce);
        }
        if (Object.keys(attributes).forEach((function(key) {
            style.setAttribute(key, attributes[key]);
        })), "function" == typeof options.insert) options.insert(style); else {
            var target = getTarget(options.insert || "head");
            if (!target) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            target.appendChild(style);
        }
        return style;
    }
    var textStore, replaceText = (textStore = [], function(index, replacement) {
        return textStore[index] = replacement, textStore.filter(Boolean).join("\n");
    });
    function applyToSingletonTag(style, index, remove, obj) {
        var css = remove ? "" : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css;
        if (style.styleSheet) style.styleSheet.cssText = replaceText(index, css); else {
            var cssNode = document.createTextNode(css), childNodes = style.childNodes;
            childNodes[index] && style.removeChild(childNodes[index]), childNodes.length ? style.insertBefore(cssNode, childNodes[index]) : style.appendChild(cssNode);
        }
    }
    function applyToTag(style, options, obj) {
        var css = obj.css, media = obj.media, sourceMap = obj.sourceMap;
        if (media ? style.setAttribute("media", media) : style.removeAttribute("media"), 
        sourceMap && "undefined" != typeof btoa && (css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */")), 
        style.styleSheet) style.styleSheet.cssText = css; else {
            for (;style.firstChild; ) style.removeChild(style.firstChild);
            style.appendChild(document.createTextNode(css));
        }
    }
    var singleton = null, singletonCounter = 0;
    function addStyle(obj, options) {
        var style, update, remove;
        if (options.singleton) {
            var styleIndex = singletonCounter++;
            style = singleton || (singleton = insertStyleElement(options)), update = applyToSingletonTag.bind(null, style, styleIndex, !1), 
            remove = applyToSingletonTag.bind(null, style, styleIndex, !0);
        } else style = insertStyleElement(options), update = applyToTag.bind(null, style, options), 
        remove = function() {
            !function(style) {
                if (null === style.parentNode) return !1;
                style.parentNode.removeChild(style);
            }(style);
        };
        return update(obj), function(newObj) {
            if (newObj) {
                if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) return;
                update(obj = newObj);
            } else remove();
        };
    }
    module.exports = function(list, options) {
        (options = options || {}).singleton || "boolean" == typeof options.singleton || (options.singleton = isOldIE());
        var lastIdentifiers = modulesToDom(list = list || [], options);
        return function(newList) {
            if (newList = newList || [], "[object Array]" === Object.prototype.toString.call(newList)) {
                for (var i = 0; i < lastIdentifiers.length; i++) {
                    var index = getIndexByIdentifier(lastIdentifiers[i]);
                    stylesInDom[index].references--;
                }
                for (var newLastIdentifiers = modulesToDom(newList, options), _i = 0; _i < lastIdentifiers.length; _i++) {
                    var _index = getIndexByIdentifier(lastIdentifiers[_i]);
                    0 === stylesInDom[_index].references && (stylesInDom[_index].updater(), stylesInDom.splice(_index, 1));
                }
                lastIdentifiers = newLastIdentifiers;
            }
        };
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7), ___CSS_LOADER_EXPORT___ = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__)()(!1);
    ___CSS_LOADER_EXPORT___.push([ module.i, "body {\n  background-color: red;\n}", "" ]), 
    __webpack_exports__.a = ___CSS_LOADER_EXPORT___;
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function(useSourceMap) {
        var list = [];
        return list.toString = function() {
            return this.map((function(item) {
                var content = function(item, useSourceMap) {
                    var content = item[1] || "", cssMapping = item[3];
                    if (!cssMapping) return content;
                    if (useSourceMap && "function" == typeof btoa) {
                        var sourceMapping = (sourceMap = cssMapping, base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), 
                        data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64), 
                        "/*# ".concat(data, " */")), sourceURLs = cssMapping.sources.map((function(source) {
                            return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
                        }));
                        return [ content ].concat(sourceURLs).concat([ sourceMapping ]).join("\n");
                    }
                    var sourceMap, base64, data;
                    return [ content ].join("\n");
                }(item, useSourceMap);
                return item[2] ? "@media ".concat(item[2], " {").concat(content, "}") : content;
            })).join("");
        }, list.i = function(modules, mediaQuery, dedupe) {
            "string" == typeof modules && (modules = [ [ null, modules, "" ] ]);
            var alreadyImportedModules = {};
            if (dedupe) for (var i = 0; i < this.length; i++) {
                var id = this[i][0];
                null != id && (alreadyImportedModules[id] = !0);
            }
            for (var _i = 0; _i < modules.length; _i++) {
                var item = [].concat(modules[_i]);
                dedupe && alreadyImportedModules[item[0]] || (mediaQuery && (item[2] ? item[2] = "".concat(mediaQuery, " and ").concat(item[2]) : item[2] = mediaQuery), 
                list.push(item));
            }
        }, list;
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", (function() {
        return foo1;
    }));
    __webpack_require__(9);
    window.a = "a";
    const foo1 = () => {
        console.log("foo1");
    };
    window.impure_foo = "impure_foo";
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5), _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_css_loader_dist_cjs_js_a_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10), options = {
        insert: "head",
        singleton: !1
    };
    _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_a_css__WEBPACK_IMPORTED_MODULE_1__.a, options), 
    _node_modules_css_loader_dist_cjs_js_a_css__WEBPACK_IMPORTED_MODULE_1__.a.locals;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7), ___CSS_LOADER_EXPORT___ = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__)()(!1);
    ___CSS_LOADER_EXPORT___.push([ module.i, "body {\n  background-color: green;\n}", "" ]), 
    __webpack_exports__.a = ___CSS_LOADER_EXPORT___;
} ]);