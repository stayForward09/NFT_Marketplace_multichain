(this["webpackJsonpadmin-panel"] = this["webpackJsonpadmin-panel"] || []).push([[9], { 125: function (e, t, a) { (function (r) { var n; e.exports = (n = a(1), function (e) { var t = {}; function a(r) { if (t[r])
            return t[r].exports; var n = t[r] = { i: r, l: !1, exports: {} }; return e[r].call(n.exports, n, n.exports, a), n.l = !0, n.exports; } return a.m = e, a.c = t, a.d = function (e, t, r) { a.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r }); }, a.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }); }, a.t = function (e, t) { if (1 & t && (e = a(e)), 8 & t)
            return e; if (4 & t && "object" == typeof e && e && e.__esModule)
            return e; var r = Object.create(null); if (a.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e)
            for (var n in e)
                a.d(r, n, function (t) { return e[t]; }.bind(null, n)); return r; }, a.n = function (e) { var t = e && e.__esModule ? function () { return e.default; } : function () { return e; }; return a.d(t, "a", t), t; }, a.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t); }, a.p = "", a(a.s = 4); }([function (e, t, a) { e.exports = a(2)(); }, function (e, t) { e.exports = n; }, function (e, t, a) {
                "use strict";
                var r = a(3);
                function n() { }
                function s() { }
                s.resetWarningCache = n, e.exports = function () { function e(e, t, a, n, s, i) { if (i !== r) {
                    var c = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                    throw c.name = "Invariant Violation", c;
                } } function t() { return e; } e.isRequired = e; var a = { array: e, bool: e, func: e, number: e, object: e, string: e, symbol: e, any: e, arrayOf: t, element: e, elementType: e, instanceOf: t, node: e, objectOf: t, oneOf: t, oneOfType: t, shape: t, exact: t, checkPropTypes: s, resetWarningCache: n }; return a.PropTypes = a, a; };
            }, function (e, t, a) {
                "use strict";
                e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
            }, function (e, a, r) {
                "use strict";
                r.r(a);
                var n = r(1), s = r.n(n), i = r(0), c = r.n(i);
                function l() { return (l = Object.assign || function (e) { for (var t = 1; t < arguments.length; t++) {
                    var a = arguments[t];
                    for (var r in a)
                        Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
                } return e; }).apply(this, arguments); }
                var o = function (e) { var t = e.pageClassName, a = e.pageLinkClassName, r = e.page, n = e.selected, i = e.activeClassName, c = e.activeLinkClassName, o = e.getEventListener, u = e.pageSelectedHandler, d = e.href, p = e.extraAriaContext, b = e.ariaLabel || "Page " + r + (p ? " " + p : ""), f = null; return n && (f = "page", b = e.ariaLabel || "Page " + r + " is your current page", t = void 0 !== t ? t + " " + i : i, void 0 !== a ? void 0 !== c && (a = a + " " + c) : a = c), s.a.createElement("li", { className: t }, s.a.createElement("a", l({ role: "button", className: a, href: d, tabIndex: "0", "aria-label": b, "aria-current": f, onKeyPress: u }, o(u)), r)); };
                o.propTypes = { pageSelectedHandler: c.a.func.isRequired, selected: c.a.bool.isRequired, pageClassName: c.a.string, pageLinkClassName: c.a.string, activeClassName: c.a.string, activeLinkClassName: c.a.string, extraAriaContext: c.a.string, href: c.a.string, ariaLabel: c.a.string, page: c.a.number.isRequired, getEventListener: c.a.func.isRequired };
                var u = o;
                function d() { return (d = Object.assign || function (e) { for (var t = 1; t < arguments.length; t++) {
                    var a = arguments[t];
                    for (var r in a)
                        Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
                } return e; }).apply(this, arguments); }
                !function () { var e = "undefined" != typeof reactHotLoaderGlobal ? reactHotLoaderGlobal.default : void 0; if (e) {
                    var r = void 0 !== a ? a : t;
                    if (r)
                        if ("function" != typeof r) {
                            for (var n in r)
                                if (Object.prototype.hasOwnProperty.call(r, n)) {
                                    var s = void 0;
                                    try {
                                        s = r[n];
                                    }
                                    catch (e) {
                                        continue;
                                    }
                                    e.register(s, n, "/home/adele/workspace/react-paginate/react_components/PageView.js");
                                }
                        }
                        else
                            e.register(r, "module.exports", "/home/adele/workspace/react-paginate/react_components/PageView.js");
                } }();
                var p = function (e) { var t = e.breakLabel, a = e.breakClassName, r = e.breakLinkClassName, n = e.breakHandler, i = e.getEventListener, c = a || "break"; return s.a.createElement("li", { className: c }, s.a.createElement("a", d({ className: r, role: "button", tabIndex: "0", onKeyPress: n }, i(n)), t)); };
                p.propTypes = { breakLabel: c.a.oneOfType([c.a.string, c.a.node]), breakClassName: c.a.string, breakLinkClassName: c.a.string, breakHandler: c.a.func.isRequired, getEventListener: c.a.func.isRequired };
                var b = p;
                function f(e) { return (f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e; } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e; })(e); }
                function g() { return (g = Object.assign || function (e) { for (var t = 1; t < arguments.length; t++) {
                    var a = arguments[t];
                    for (var r in a)
                        Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
                } return e; }).apply(this, arguments); }
                function m(e, t) { for (var a = 0; a < t.length; a++) {
                    var r = t[a];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
                } }
                function j(e, t) { return (j = Object.setPrototypeOf || function (e, t) { return e.__proto__ = t, e; })(e, t); }
                function h(e) { var t = function () { if ("undefined" == typeof Reflect || !Reflect.construct)
                    return !1; if (Reflect.construct.sham)
                    return !1; if ("function" == typeof Proxy)
                    return !0; try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () { }))), !0;
                }
                catch (e) {
                    return !1;
                } }(); return function () { var a, r = x(e); if (t) {
                    var n = x(this).constructor;
                    a = Reflect.construct(r, arguments, n);
                }
                else
                    a = r.apply(this, arguments); return v(this, a); }; }
                function v(e, t) { return !t || "object" !== f(t) && "function" != typeof t ? O(e) : t; }
                function O(e) { if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
                function x(e) { return (x = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) { return e.__proto__ || Object.getPrototypeOf(e); })(e); }
                function y(e, t, a) { return t in e ? Object.defineProperty(e, t, { value: a, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = a, e; }
                !function () { var e = "undefined" != typeof reactHotLoaderGlobal ? reactHotLoaderGlobal.default : void 0; if (e) {
                    var r = void 0 !== a ? a : t;
                    if (r)
                        if ("function" != typeof r) {
                            for (var n in r)
                                if (Object.prototype.hasOwnProperty.call(r, n)) {
                                    var s = void 0;
                                    try {
                                        s = r[n];
                                    }
                                    catch (e) {
                                        continue;
                                    }
                                    e.register(s, n, "/home/adele/workspace/react-paginate/react_components/BreakView.js");
                                }
                        }
                        else
                            e.register(r, "module.exports", "/home/adele/workspace/react-paginate/react_components/BreakView.js");
                } }();
                var C = function (e) { !function (e, t) { if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function"); e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), t && j(e, t); }(i, e); var t, a, r, n = h(i); function i(e) { var t, a; return function (e, t) { if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function"); }(this, i), y(O(t = n.call(this, e)), "handlePreviousPage", (function (e) { var a = t.state.selected; e.preventDefault ? e.preventDefault() : e.returnValue = !1, a > 0 && t.handlePageSelected(a - 1, e); })), y(O(t), "handleNextPage", (function (e) { var a = t.state.selected, r = t.props.pageCount; e.preventDefault ? e.preventDefault() : e.returnValue = !1, a < r - 1 && t.handlePageSelected(a + 1, e); })), y(O(t), "handlePageSelected", (function (e, a) { a.preventDefault ? a.preventDefault() : a.returnValue = !1, t.state.selected !== e && (t.setState({ selected: e }), t.callCallback(e)); })), y(O(t), "getEventListener", (function (e) { return y({}, t.props.eventListener, e); })), y(O(t), "handleBreakClick", (function (e, a) { a.preventDefault ? a.preventDefault() : a.returnValue = !1; var r = t.state.selected; t.handlePageSelected(r < e ? t.getForwardJump() : t.getBackwardJump(), a); })), y(O(t), "callCallback", (function (e) { void 0 !== t.props.onPageChange && "function" == typeof t.props.onPageChange && t.props.onPageChange({ selected: e }); })), y(O(t), "pagination", (function () { var e = [], a = t.props, r = a.pageRangeDisplayed, n = a.pageCount, i = a.marginPagesDisplayed, c = a.breakLabel, l = a.breakClassName, o = a.breakLinkClassName, u = t.state.selected; if (n <= r)
                    for (var d = 0; d < n; d++)
                        e.push(t.getPageElement(d));
                else {
                    var p, f, g, m = r / 2, j = r - m;
                    u > n - r / 2 ? m = r - (j = n - u) : u < r / 2 && (j = r - (m = u));
                    var h = function (e) { return t.getPageElement(e); };
                    for (p = 0; p < n; p++)
                        (f = p + 1) <= i || f > n - i || p >= u - m && p <= u + j ? e.push(h(p)) : c && e[e.length - 1] !== g && (g = s.a.createElement(b, { key: p, breakLabel: c, breakClassName: l, breakLinkClassName: o, breakHandler: t.handleBreakClick.bind(null, p), getEventListener: t.getEventListener }), e.push(g));
                } return e; })), a = e.initialPage ? e.initialPage : e.forcePage ? e.forcePage : 0, t.state = { selected: a }, t; } return t = i, (a = [{ key: "componentDidMount", value: function () { var e = this.props, t = e.initialPage, a = e.disableInitialCallback, r = e.extraAriaContext; void 0 === t || a || this.callCallback(t), r && console.warn("DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead."); } }, { key: "componentDidUpdate", value: function (e) { void 0 !== this.props.forcePage && this.props.forcePage !== e.forcePage && this.setState({ selected: this.props.forcePage }); } }, { key: "getForwardJump", value: function () { var e = this.state.selected, t = this.props, a = t.pageCount, r = e + t.pageRangeDisplayed; return r >= a ? a - 1 : r; } }, { key: "getBackwardJump", value: function () { var e = this.state.selected - this.props.pageRangeDisplayed; return e < 0 ? 0 : e; } }, { key: "hrefBuilder", value: function (e) { var t = this.props, a = t.hrefBuilder, r = t.pageCount; if (a && e !== this.state.selected && e >= 0 && e < r)
                            return a(e + 1); } }, { key: "ariaLabelBuilder", value: function (e) { var t = e === this.state.selected; if (this.props.ariaLabelBuilder && e >= 0 && e < this.props.pageCount) {
                            var a = this.props.ariaLabelBuilder(e + 1, t);
                            return this.props.extraAriaContext && !t && (a = a + " " + this.props.extraAriaContext), a;
                        } } }, { key: "getPageElement", value: function (e) { var t = this.state.selected, a = this.props, r = a.pageClassName, n = a.pageLinkClassName, i = a.activeClassName, c = a.activeLinkClassName, l = a.extraAriaContext; return s.a.createElement(u, { key: e, pageSelectedHandler: this.handlePageSelected.bind(null, e), selected: t === e, pageClassName: r, pageLinkClassName: n, activeClassName: i, activeLinkClassName: c, extraAriaContext: l, href: this.hrefBuilder(e), ariaLabel: this.ariaLabelBuilder(e), page: e + 1, getEventListener: this.getEventListener }); } }, { key: "render", value: function () { var e = this.props, t = e.disabledClassName, a = e.pageCount, r = e.containerClassName, n = e.previousLabel, i = e.previousClassName, c = e.previousLinkClassName, l = e.previousAriaLabel, o = e.prevRel, u = e.nextLabel, d = e.nextClassName, p = e.nextLinkClassName, b = e.nextAriaLabel, f = e.nextRel, m = this.state.selected, j = i + (0 === m ? " ".concat(t) : ""), h = d + (m === a - 1 ? " ".concat(t) : ""), v = 0 === m ? "true" : "false", O = m === a - 1 ? "true" : "false"; return s.a.createElement("ul", { className: r }, s.a.createElement("li", { className: j }, s.a.createElement("a", g({ className: c, href: this.hrefBuilder(m - 1), tabIndex: "0", role: "button", onKeyPress: this.handlePreviousPage, "aria-disabled": v, "aria-label": l, rel: o }, this.getEventListener(this.handlePreviousPage)), n)), this.pagination(), s.a.createElement("li", { className: h }, s.a.createElement("a", g({ className: p, href: this.hrefBuilder(m + 1), tabIndex: "0", role: "button", onKeyPress: this.handleNextPage, "aria-disabled": O, "aria-label": b, rel: f }, this.getEventListener(this.handleNextPage)), u))); } }]) && m(t.prototype, a), r && m(t, r), i; }(n.Component);
                y(C, "propTypes", { pageCount: c.a.number.isRequired, pageRangeDisplayed: c.a.number.isRequired, marginPagesDisplayed: c.a.number.isRequired, previousLabel: c.a.node, previousAriaLabel: c.a.string, prevRel: c.a.string, nextLabel: c.a.node, nextAriaLabel: c.a.string, nextRel: c.a.string, breakLabel: c.a.oneOfType([c.a.string, c.a.node]), hrefBuilder: c.a.func, onPageChange: c.a.func, initialPage: c.a.number, forcePage: c.a.number, disableInitialCallback: c.a.bool, containerClassName: c.a.string, pageClassName: c.a.string, pageLinkClassName: c.a.string, activeClassName: c.a.string, activeLinkClassName: c.a.string, previousClassName: c.a.string, nextClassName: c.a.string, previousLinkClassName: c.a.string, nextLinkClassName: c.a.string, disabledClassName: c.a.string, breakClassName: c.a.string, breakLinkClassName: c.a.string, extraAriaContext: c.a.string, ariaLabelBuilder: c.a.func, eventListener: c.a.string }), y(C, "defaultProps", { pageCount: 10, pageRangeDisplayed: 2, marginPagesDisplayed: 3, activeClassName: "selected", previousLabel: "Previous", previousClassName: "previous", previousAriaLabel: "Previous page", prevRel: "prev", nextLabel: "Next", nextClassName: "next", nextAriaLabel: "Next page", nextRel: "next", breakLabel: "...", disabledClassName: "disabled", disableInitialCallback: !1, eventListener: "onClick" }), function () { var e = "undefined" != typeof reactHotLoaderGlobal ? reactHotLoaderGlobal.default : void 0; if (e) {
                    var r = void 0 !== a ? a : t;
                    if (r)
                        if ("function" != typeof r) {
                            for (var n in r)
                                if (Object.prototype.hasOwnProperty.call(r, n)) {
                                    var s = void 0;
                                    try {
                                        s = r[n];
                                    }
                                    catch (e) {
                                        continue;
                                    }
                                    e.register(s, n, "/home/adele/workspace/react-paginate/react_components/PaginationBoxView.js");
                                }
                        }
                        else
                            e.register(r, "module.exports", "/home/adele/workspace/react-paginate/react_components/PaginationBoxView.js");
                } }(), a.default = C, function () { var e = "undefined" != typeof reactHotLoaderGlobal ? reactHotLoaderGlobal.default : void 0; if (e) {
                    var r = void 0 !== a ? a : t;
                    if (r)
                        if ("function" != typeof r) {
                            for (var n in r)
                                if (Object.prototype.hasOwnProperty.call(r, n)) {
                                    var s = void 0;
                                    try {
                                        s = r[n];
                                    }
                                    catch (e) {
                                        continue;
                                    }
                                    e.register(s, n, "/home/adele/workspace/react-paginate/react_components/index.js");
                                }
                        }
                        else
                            e.register(r, "module.exports", "/home/adele/workspace/react-paginate/react_components/index.js");
                } }();
            }])); }).call(this, a(40)); }, 126: function (e, t, a) { }, 345: function (e, t, a) {
            "use strict";
            a.r(t);
            var r = a(1), n = a(29), s = a(23), i = a(19), c = a(14), l = a(54), o = a(37), u = a(125), d = a.n(u), p = a(139), b = a(155), f = a(154), g = a(171), m = a(159), j = a(176), h = a(135), v = a(142), O = a(165), x = a(147), y = a(8), C = function (e) { var t = e.open, a = e.handleModal, r = e.mode, s = e.data, i = e.handleSubmitModal, c = e.handleEditChange, l = Object(y.jsx)(h.a, { className: "cursor-pointer", size: 15, onClick: a }); return Object(y.jsxs)(n.t, { isOpen: t, toggle: a, className: "sidebar-sm", modalClassName: "modal-slide-in", contentClassName: "pt-0", children: [Object(y.jsx)(n.v, { className: "mb-3", toggle: a, close: l, tag: "div", children: Object(y.jsx)("h5", { className: "modal-title", children: "NEW" === r ? "New Record" : "Edit Record" }) }), Object(y.jsxs)(n.u, { className: "flex-grow-1", children: [Object(y.jsxs)("div", { className: "mb-1", children: [Object(y.jsx)(n.s, { for: "Key", children: "* Key" }), Object(y.jsxs)(n.q, { children: [Object(y.jsx)(n.r, { children: Object(y.jsx)(v.a, { size: 15 }) }), Object(y.jsx)(n.p, { id: "Key", placeholder: "Key", value: s.key, onChange: function (e) { return c(e, "key"); } })] })] }), Object(y.jsxs)("div", { className: "mb-1", children: [Object(y.jsx)(n.s, { for: "Value", children: "* Value" }), Object(y.jsxs)(n.q, { children: [Object(y.jsx)(n.r, { children: Object(y.jsx)(O.a, { size: 15 }) }), Object(y.jsx)(n.p, { id: "Value", placeholder: "Value", value: s.value, onChange: function (e) { return c(e, "value"); } })] })] }), Object(y.jsxs)("div", { className: "mb-1", children: [Object(y.jsx)(n.s, { for: "description", children: "Description" }), Object(y.jsxs)(n.q, { children: [Object(y.jsx)(n.r, { children: Object(y.jsx)(x.a, { size: 15 }) }), Object(y.jsx)(n.p, { id: "description", placeholder: "Description", value: s.description, onChange: function (e) { return c(e, "description"); } })] })] }), Object(y.jsx)(n.d, { className: "mr-1", color: "primary", onClick: i, children: "Submit" }), Object(y.jsx)(n.d, { color: "secondary", onClick: a, outline: !0, children: "Cancel" })] })] }); }, k = function () { var e = Object(o.b)(), t = Object(o.c)((function (e) { return e.setting; })), a = Object(r.useState)(!1), u = Object(c.a)(a, 2), h = u[0], v = u[1], O = Object(r.useState)("NEW"), x = Object(c.a)(O, 2), k = x[0], N = x[1], P = Object(r.useState)({ currentPage: 1, column: "key", direction: "asc", rowsPerPage: 7, searchValue: "" }), L = Object(c.a)(P, 2), w = L[0], E = L[1], S = Object(r.useState)({ id: "", key: "", value: "", description: "" }), R = Object(c.a)(S, 2), D = R[0], _ = R[1], T = Math.ceil(t.total / w.rowsPerPage); Object(r.useEffect)((function () { e(Object(l.d)(w)); }), [e]); var B = function (t) { if (w.column === t) {
                var a = Object(i.a)(Object(i.a)({}, w), {}, { currentPage: 1, column: t, direction: "asc" === w.direction ? "desc" : "asc" });
                E(a), e(Object(l.d)(a));
            }
            else {
                var r = Object(i.a)(Object(i.a)({}, w), {}, { currentPage: 1, column: t, direction: "asc" });
                E(r), e(Object(l.d)(r));
            } }, A = function () { return v(!h); }; return Object(y.jsxs)(r.Fragment, { children: [Object(y.jsxs)(n.e, { children: [Object(y.jsxs)(n.f, { className: "border-bottom", children: [Object(y.jsx)(n.g, { tag: "h4", children: "Settings" }), Object(y.jsx)("div", { className: "d-flex mt-md-0 mt-1", children: Object(y.jsxs)(n.d, { className: "ml-2", color: "primary", onClick: function () { _({ id: "", key: "", value: "", description: "" }), N("NEW"), A(); }, children: [Object(y.jsx)(p.a, { size: 15 }), Object(y.jsx)("span", { className: "align-middle ml-50", children: "Add Record" })] }) })] }), Object(y.jsxs)(n.z, { className: "mx-0 mt-1 mb-50", children: [Object(y.jsx)(n.h, { sm: "6", children: Object(y.jsxs)("div", { className: "d-flex align-items-center", children: [Object(y.jsx)(n.s, { for: "sort-select", children: "show" }), Object(y.jsxs)(n.p, { className: "dataTable-select", type: "select", id: "sort-select", value: w.rowsPerPage, onChange: function (t) { return function (t) { var a = Object(i.a)(Object(i.a)({}, w), {}, { currentPage: 1, rowsPerPage: parseInt(t.target.value) }); E(a), e(Object(l.d)(a)); }(t); }, children: [Object(y.jsx)("option", { value: 7, children: "7" }), Object(y.jsx)("option", { value: 10, children: "10" }), Object(y.jsx)("option", { value: 25, children: "25" }), Object(y.jsx)("option", { value: 50, children: "50" }), Object(y.jsx)("option", { value: 75, children: "75" }), Object(y.jsx)("option", { value: 100, children: "100" })] }), Object(y.jsx)(n.s, { for: "sort-select", children: "entries" })] }) }), Object(y.jsxs)(n.h, { className: "d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1", sm: "6", children: [Object(y.jsx)(n.s, { className: "me-1", for: "search-input", children: "Search" }), Object(y.jsx)(n.p, { className: "dataTable-filter", type: "text", bsSize: "sm", id: "search-input", value: w.searchValue, onChange: function (t) { var a = Object(i.a)(Object(i.a)({}, w), {}, { searchValue: t.target.value, currentPage: 1 }); E(a), e(Object(l.d)(a)); } })] })] }), Object(y.jsxs)(n.A, { striped: !0, responsive: !0, children: [Object(y.jsx)("thead", { children: Object(y.jsxs)("tr", { children: [Object(y.jsxs)("th", { style: { whiteSpace: "nowrap", cursor: "pointer" }, onClick: function () { return B("key"); }, children: ["Key ", "key" === w.column ? "desc" === w.direction ? Object(y.jsx)(b.a, { size: 20 }) : Object(y.jsx)(f.a, { size: 20 }) : ""] }), Object(y.jsxs)("th", { style: { whiteSpace: "nowrap", cursor: "pointer" }, onClick: function () { return B("value"); }, children: ["Value  ", "value" === w.column ? "desc" === w.direction ? Object(y.jsx)(b.a, { size: 20 }) : Object(y.jsx)(f.a, { size: 20 }) : ""] }), Object(y.jsx)("th", { children: "Actions" })] }) }), Object(y.jsx)("tbody", { children: t.data.map((function (a, r) { return Object(y.jsxs)("tr", { children: [Object(y.jsx)("td", { children: Object(y.jsx)("span", { className: "align-middle font-weight-bold", children: a.key }) }), Object(y.jsxs)("td", { children: [" ", a.value, " "] }), Object(y.jsx)("td", { children: Object(y.jsxs)(n.C, { children: [Object(y.jsx)(n.m, { className: "icon-btn hide-arrow", color: "transparent", size: "sm", caret: !0, children: Object(y.jsx)(g.a, { size: 15 }) }), Object(y.jsxs)(n.l, { children: [Object(y.jsxs)(n.k, { href: "/", onClick: function (e) { return function (e, a) { e.preventDefault(), _(Object(i.a)({}, t.data[a])), N("EDIT"), A(); }(e, r); }, children: [Object(y.jsx)(m.a, { className: "mr-50", size: 15 }), " ", Object(y.jsx)("span", { className: "align-middle", children: "Edit" })] }), Object(y.jsxs)(n.k, { href: "/", onClick: function (a) { return function (a, r) { a.preventDefault(), confirm("Do you want to delete this row?") && e(Object(l.c)(t.data[r].id)); }(a, r); }, children: [Object(y.jsx)(j.a, { className: "mr-50", size: 15 }), " ", Object(y.jsx)("span", { className: "align-middle", children: "Delete" })] })] })] }) })] }, r); })) })] }), Object(y.jsx)(d.a, { previousLabel: "", nextLabel: "", breakLabel: "...", pageCount: T || 1, marginPagesDisplayed: 2, pageRangeDisplayed: 2, activeClassName: "active", forcePage: 0 !== w.currentPage ? w.currentPage - 1 : 0, onPageChange: function (t) { return function (t) { var a = Object(i.a)(Object(i.a)({}, w), {}, { currentPage: t.selected + 1 }); E(a), e(Object(l.d)(a)); }(t); }, pageClassName: "page-item", breakClassName: "page-item", nextLinkClassName: "page-link", pageLinkClassName: "page-link", breakLinkClassName: "page-link", previousLinkClassName: "page-link", nextClassName: "page-item next-item", previousClassName: "page-item prev-item", containerClassName: "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1" })] }), Object(y.jsx)(C, { open: h, handleModal: A, mode: k, data: D, handleEditChange: function (e, t) { _(Object(i.a)(Object(i.a)({}, D), {}, Object(s.a)({}, t, e.target.value))); }, handleSubmitModal: function () { "NEW" === k ? (e(Object(l.a)(D)), A()) : (e(Object(l.e)(D)), A()); } })] }); }, N = Object(r.memo)(k);
            a(126), t.default = function () { return Object(y.jsx)(r.Fragment, { children: Object(y.jsx)(n.z, { children: Object(y.jsx)(n.h, { sm: "12", children: Object(y.jsx)(N, {}) }) }) }); };
        } }]);
//# sourceMappingURL=9.925f2ac7.chunk.js.map
