function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(typeof e + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function waitForVtexSessionId(key, platform) {
  return new Promise(function (resolve) {
    if (platform !== 'vtex') {
      return resolve(null);
    }
    var interval = setInterval(function () {
      var _JSON$parse;
      var item = localStorage.getItem(key);
      if (item !== null && ((_JSON$parse = JSON.parse(item)) == null ? void 0 : _JSON$parse.id) !== 'default-order-form') {
        var _JSON$parse2;
        clearInterval(interval);
        clearTimeout(timeout);
        return resolve((_JSON$parse2 = JSON.parse(item)) == null ? void 0 : _JSON$parse2.id);
      }
    }, 100);
    var timeout = setTimeout(function () {
      clearInterval(interval);
      resolve(null);
    }, 10000);
  });
}
function removeEmptyObjectProperties(obj) {
  if (Array.isArray(obj)) {
    return obj.filter(function (item) {
      return typeof item === 'boolean' || !!item;
    }).map(removeEmptyObjectProperties);
  } else if (obj && typeof obj === 'object') {
    return Object.entries(obj).reduce(function (accumulator, _ref) {
      var key = _ref[0],
        value = _ref[1];
      var convertedValue = removeEmptyObjectProperties(value);
      var HAS_PROPERTY_VALUE = convertedValue !== null && convertedValue !== undefined && convertedValue !== '' && (!(typeof convertedValue === 'number') || true) && (!(typeof convertedValue === 'boolean') || true) && (!Array.isArray(convertedValue) || convertedValue.length !== 0) && (typeof convertedValue !== 'object' || Object.keys(convertedValue).length !== 0);
      if (HAS_PROPERTY_VALUE) {
        accumulator[key] = convertedValue;
      } else {
        delete accumulator[key];
      }
      return accumulator;
    }, Array.isArray(obj) ? [] : {});
  } else {
    return obj;
  }
}
var Logger = /*#__PURE__*/function () {
  function Logger() {}
  Logger.error = function error() {
    for (var _len = arguments.length, message = new Array(_len), _key = 0; _key < _len; _key++) {
      message[_key] = arguments[_key];
    }
    console.error("[ERROR] Nemu Pixel ", message);
  };
  Logger.info = function info() {
    for (var _len2 = arguments.length, message = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      message[_key2] = arguments[_key2];
    }
    console.log("[INFO] Nemu Pixel ", message);
  };
  return Logger;
}();
var Storage = /*#__PURE__*/function () {
  function Storage() {}
  Storage.isJsonString = function isJsonString(value) {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  };
  var _proto = Storage.prototype;
  _proto.setCookie = function setCookie(name, value, date) {
    var cookieValue = typeof value === 'object' ? JSON.stringify(value) : value;
    if (!!date) {
      document.cookie = name + "=" + cookieValue + "; expires=" + date.toUTCString() + "; path=/";
    } else {
      document.cookie = name + "=" + cookieValue + "; path=/";
    }
  };
  _proto.removeCookie = function removeCookie(name) {
    var pastDate = new Date(0);
    document.cookie = name + "=; expires=" + pastDate.toUTCString();
  };
  _proto.hasCookiesEnabled = function hasCookiesEnabled() {
    var isCookiesEnabled = navigator.cookieEnabled;
    if (typeof navigator.cookieEnabled === 'undefined' || !isCookiesEnabled) {
      document.cookie = 'check';
      isCookiesEnabled = document.cookie.indexOf('check') !== -1;
    }
    return isCookiesEnabled;
  };
  _proto.getCookieByName = function getCookieByName(name) {
    try {
      var cookieString = "; " + document.cookie;
      var parts = cookieString.split('; ').filter(function (part) {
        return part;
      });
      for (var _iterator = _createForOfIteratorHelperLoose(parts), _step; !(_step = _iterator()).done;) {
        var part = _step.value;
        var _part$split = part.split('='),
          key = _part$split[0],
          value = _part$split[1];
        if (key === name) {
          var decodedResult = value && decodeURIComponent(value);
          return decodedResult ? Storage.isJsonString(decodedResult) ? JSON.parse(decodedResult) : decodedResult : null;
        }
      }
    } catch (error) {
      Logger.error('Error parsing cookie value:', error);
      return null;
    }
  };
  return Storage;
}();
var BaseService = /*#__PURE__*/function () {
  function BaseService() {}
  var _proto2 = BaseService.prototype;
  _proto2.api = /*#__PURE__*/function () {
    var _api = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url, method, options) {
      var response, data;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (method === void 0) {
              method = 'GET';
            }
            _context.next = 3;
            return fetch(url, _extends({
              method: method,
              headers: {
                'Content-Type': 'application/json'
              }
            }, options));
          case 3:
            response = _context.sent;
            if (!(response.status !== 204)) {
              _context.next = 8;
              break;
            }
            _context.next = 7;
            return response.json();
          case 7:
            data = _context.sent;
          case 8:
            if (response.ok) {
              _context.next = 10;
              break;
            }
            throw data;
          case 10:
            return _context.abrupt("return", data);
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function api(_x, _x2, _x3) {
      return _api.apply(this, arguments);
    }
    return api;
  }();
  _proto2.apiNoContentType = /*#__PURE__*/function () {
    var _apiNoContentType = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(url, method, options) {
      var response, data;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (method === void 0) {
              method = 'GET';
            }
            _context2.next = 3;
            return fetch(url, _extends({
              method: method
            }, options));
          case 3:
            response = _context2.sent;
            _context2.next = 6;
            return response.text();
          case 6:
            data = _context2.sent;
            if (response.headers.get("content-type") === "application/json") {
              try {
                data = JSON.parse(data);
              } catch (_unused) {}
            }
            if (response.ok) {
              _context2.next = 10;
              break;
            }
            throw data;
          case 10:
            return _context2.abrupt("return", data);
          case 11:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function apiNoContentType(_x4, _x5, _x6) {
      return _apiNoContentType.apply(this, arguments);
    }
    return apiNoContentType;
  }();
  return BaseService;
}();
var ClientService = /*#__PURE__*/function (_BaseService) {
  _inheritsLoose(ClientService, _BaseService);
  function ClientService() {
    return _BaseService.apply(this, arguments) || this;
  }
  ClientService.create = function create() {
    return new ClientService();
  };
  var _proto3 = ClientService.prototype;
  _proto3.getClientHash = /*#__PURE__*/function () {
    var _getClientHash = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var fpLib, fp, _yield$fp$get, clientHash;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return import('https://openfpcdn.io/fingerprintjs/v4');
          case 3:
            fpLib = _context3.sent;
            _context3.next = 6;
            return fpLib.load();
          case 6:
            fp = _context3.sent;
            _context3.next = 9;
            return fp.get();
          case 9:
            _yield$fp$get = _context3.sent;
            clientHash = _yield$fp$get.visitorId;
            return _context3.abrupt("return", clientHash);
          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", null);
          case 17:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 14]]);
    }));
    function getClientHash() {
      return _getClientHash.apply(this, arguments);
    }
    return getClientHash;
  }();
  _proto3.getClientId = /*#__PURE__*/function () {
    var _getClientId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var firstApi, secondApi, thirdApi, clientIp;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            firstApi = this.createPromiseNoContentType('https://ipinfo.io/ip');
            secondApi = this.createPromiseNoContentType('https://api.ipify.org/?format=json', 'ip');
            thirdApi = this.createPromise('https://api.bigdatacloud.net/data/client-ip', 'ipString');
            _context4.next = 6;
            return Promise.any([firstApi, secondApi, thirdApi]);
          case 6:
            clientIp = _context4.sent;
            return _context4.abrupt("return", btoa(String(clientIp)));
          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", null);
          case 13:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this, [[0, 10]]);
    }));
    function getClientId() {
      return _getClientId.apply(this, arguments);
    }
    return getClientId;
  }();
  _proto3.createPromise = function createPromise(url, fieldName) {
    var _this = this;
    return new Promise(function (resolve, reject) {
      _this.api(url, 'GET').then(function (response) {
        // @ts-ignore
        resolve(!!fieldName ? response[fieldName] : response);
      }).catch(function () {
        return reject(undefined);
      });
    });
  };
  _proto3.createPromiseNoContentType = function createPromiseNoContentType(url, fieldName) {
    var _this2 = this;
    return new Promise(function (resolve, reject) {
      _this2.apiNoContentType(url, 'GET').then(function (response) {
        // @ts-ignore
        resolve(!!fieldName ? response[fieldName] : response);
      }).catch(function () {
        return reject(undefined);
      });
    });
  };
  return ClientService;
}(BaseService);
var SessionHistoryService = /*#__PURE__*/function (_BaseService2) {
  _inheritsLoose(SessionHistoryService, _BaseService2);
  function SessionHistoryService(_ref2) {
    var _this3;
    var baseURL = _ref2.baseURL;
    _this3 = _BaseService2.call(this) || this;
    _this3.baseURL = void 0;
    Object.assign(_assertThisInitialized(_this3), {
      baseURL: baseURL
    });
    return _this3;
  }
  var _proto4 = SessionHistoryService.prototype;
  _proto4.sendInitateCheckoutEvent = /*#__PURE__*/function () {
    var _sendInitateCheckoutEvent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_ref3) {
      var trackingId, trackingSessionId, trackingSessionHistoryId;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            trackingId = _ref3.trackingId, trackingSessionId = _ref3.trackingSessionId, trackingSessionHistoryId = _ref3.trackingSessionHistoryId;
            _context5.next = 3;
            return this.api(this.baseURL + "/trackings/" + trackingId + "/sessions/" + trackingSessionId + "/histories/" + trackingSessionHistoryId + "/initiate_checkout", 'POST', {});
          case 3:
            return _context5.abrupt("return", _context5.sent);
          case 4:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this);
    }));
    function sendInitateCheckoutEvent(_x7) {
      return _sendInitateCheckoutEvent.apply(this, arguments);
    }
    return sendInitateCheckoutEvent;
  }();
  _proto4.getLastBySessionId = /*#__PURE__*/function () {
    var _getLastBySessionId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(trackingId, sessionId) {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return this.api(this.baseURL + "/trackings/" + trackingId + "/sessions/" + sessionId + "/histories/last");
          case 2:
            return _context6.abrupt("return", _context6.sent);
          case 3:
          case "end":
            return _context6.stop();
        }
      }, _callee6, this);
    }));
    function getLastBySessionId(_x8, _x9) {
      return _getLastBySessionId.apply(this, arguments);
    }
    return getLastBySessionId;
  }();
  _proto4.updateNuvemshopId = /*#__PURE__*/function () {
    var _updateNuvemshopId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(_ref4) {
      var trackingId, trackingSessionId, nuvemShopId;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            trackingId = _ref4.trackingId, trackingSessionId = _ref4.trackingSessionId, nuvemShopId = _ref4.nuvemShopId;
            _context7.prev = 1;
            if (nuvemShopId) {
              _context7.next = 4;
              break;
            }
            return _context7.abrupt("return");
          case 4:
            _context7.next = 6;
            return this.api(this.baseURL + "/trackings/" + trackingId + "/sessions/" + trackingSessionId + "/histories/last", 'PUT', {
              body: JSON.stringify({
                nuvemShopId: nuvemShopId,
                vtexSessionId: nuvemShopId
              })
            });
          case 6:
            return _context7.abrupt("return", _context7.sent);
          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](1);
            Logger.error(JSON.stringify(_context7.t0));
            return _context7.abrupt("return");
          case 13:
          case "end":
            return _context7.stop();
        }
      }, _callee7, this, [[1, 9]]);
    }));
    function updateNuvemshopId(_x10) {
      return _updateNuvemshopId.apply(this, arguments);
    }
    return updateNuvemshopId;
  }();
  _proto4.updateVtexSessionId = /*#__PURE__*/function () {
    var _updateVtexSessionId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(_ref5) {
      var trackingId, trackingSessionId, vtexSessionId;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            trackingId = _ref5.trackingId, trackingSessionId = _ref5.trackingSessionId, vtexSessionId = _ref5.vtexSessionId;
            _context8.prev = 1;
            if (vtexSessionId) {
              _context8.next = 4;
              break;
            }
            return _context8.abrupt("return");
          case 4:
            _context8.next = 6;
            return this.api(this.baseURL + "/trackings/" + trackingId + "/sessions/" + trackingSessionId + "/histories/last", 'PUT', {
              body: JSON.stringify({
                vtexSessionId: vtexSessionId
              })
            });
          case 6:
            return _context8.abrupt("return", _context8.sent);
          case 9:
            _context8.prev = 9;
            _context8.t0 = _context8["catch"](1);
            Logger.error(JSON.stringify(_context8.t0));
            return _context8.abrupt("return");
          case 13:
          case "end":
            return _context8.stop();
        }
      }, _callee8, this, [[1, 9]]);
    }));
    function updateVtexSessionId(_x11) {
      return _updateVtexSessionId.apply(this, arguments);
    }
    return updateVtexSessionId;
  }();
  _proto4.updateTraySessionId = /*#__PURE__*/function () {
    var _updateTraySessionId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(_ref6) {
      var trackingId, trackingSessionId, traySessionId;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            trackingId = _ref6.trackingId, trackingSessionId = _ref6.trackingSessionId, traySessionId = _ref6.traySessionId;
            _context9.prev = 1;
            if (traySessionId) {
              _context9.next = 4;
              break;
            }
            return _context9.abrupt("return");
          case 4:
            _context9.next = 6;
            return this.api(this.baseURL + "/trackings/" + trackingId + "/sessions/" + trackingSessionId + "/histories/last", 'PUT', {
              body: JSON.stringify({
                traySessionId: traySessionId
              })
            });
          case 6:
            return _context9.abrupt("return", _context9.sent);
          case 9:
            _context9.prev = 9;
            _context9.t0 = _context9["catch"](1);
            Logger.error(JSON.stringify(_context9.t0));
            return _context9.abrupt("return");
          case 13:
          case "end":
            return _context9.stop();
        }
      }, _callee9, this, [[1, 9]]);
    }));
    function updateTraySessionId(_x12) {
      return _updateTraySessionId.apply(this, arguments);
    }
    return updateTraySessionId;
  }();
  _proto4.add = /*#__PURE__*/function () {
    var _add = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(_ref7) {
      var _window, _window2, _document, _document2;
      var sessionId, productData, trackingId, referrer, clientHash, clientId, facebookParams, platform, vtexSessionId, nuvemShopId, response;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            sessionId = _ref7.sessionId, productData = _ref7.productData, trackingId = _ref7.trackingId, referrer = _ref7.referrer, clientHash = _ref7.clientHash, clientId = _ref7.clientId, facebookParams = _ref7.facebookParams, platform = _ref7.platform;
            _context10.next = 3;
            return waitForVtexSessionId('orderform', platform);
          case 3:
            vtexSessionId = _context10.sent;
            nuvemShopId = (_window = window) != null && (_window = _window.LS) != null && (_window = _window.cart) != null && _window.id ? String((_window2 = window) == null || (_window2 = _window2.LS) == null || (_window2 = _window2.cart) == null ? void 0 : _window2.id) : null;
            _context10.next = 7;
            return this.api(this.baseURL + "/trackings/" + trackingId + "/sessions/" + sessionId + "/histories", 'POST', {
              body: JSON.stringify(_extends({
                referrer: referrer,
                origin: window.location.origin,
                userAgent: navigator.userAgent,
                traySessionId: ((_document = document) == null || (_document = _document.documentElement) == null ? void 0 : _document.getAttribute('data-session')) || ((_document2 = document) == null || (_document2 = _document2.documentElement) == null ? void 0 : _document2.getAttribute('data-checkout-session_id')),
                vtexSessionId: vtexSessionId || nuvemShopId,
                nuvemShopId: nuvemShopId,
                clientId: clientId,
                clientHash: clientHash,
                productData: productData
              }, facebookParams))
            });
          case 7:
            response = _context10.sent;
            return _context10.abrupt("return", response);
          case 9:
          case "end":
            return _context10.stop();
        }
      }, _callee10, this);
    }));
    function add(_x13) {
      return _add.apply(this, arguments);
    }
    return add;
  }();
  return SessionHistoryService;
}(BaseService);
var SessionService = /*#__PURE__*/function (_BaseService3) {
  _inheritsLoose(SessionService, _BaseService3);
  function SessionService(_ref8) {
    var _this4;
    var baseURL = _ref8.baseURL;
    _this4 = _BaseService3.call(this) || this;
    _this4.baseURL = void 0;
    Object.assign(_assertThisInitialized(_this4), {
      baseURL: baseURL
    });
    return _this4;
  }
  var _proto5 = SessionService.prototype;
  _proto5.add = /*#__PURE__*/function () {
    var _add2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(_ref9) {
      var _JSON$parse3, _window3, _window4, _document3, _document4;
      var trackingId, productData, clientHash, referrer, clientId, vtexSessionId, nuvemShopId;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            trackingId = _ref9.trackingId, productData = _ref9.productData, clientHash = _ref9.clientHash, referrer = _ref9.referrer, clientId = _ref9.clientId;
            vtexSessionId = ((_JSON$parse3 = JSON.parse(window.localStorage.getItem('orderform'))) == null ? void 0 : _JSON$parse3.id) || null;
            nuvemShopId = (_window3 = window) != null && (_window3 = _window3.LS) != null && (_window3 = _window3.cart) != null && _window3.id ? String((_window4 = window) == null || (_window4 = _window4.LS) == null || (_window4 = _window4.cart) == null ? void 0 : _window4.id) : null;
            _context11.next = 5;
            return this.api(this.baseURL + "/trackings/" + trackingId + "/sessions", 'POST', {
              body: JSON.stringify({
                referrer: referrer,
                origin: window.location.origin,
                userAgent: navigator.userAgent,
                traySessionId: ((_document3 = document) == null || (_document3 = _document3.documentElement) == null ? void 0 : _document3.getAttribute('data-session')) || ((_document4 = document) == null || (_document4 = _document4.documentElement) == null ? void 0 : _document4.getAttribute('data-checkout-session_id')),
                vtexSessionId: vtexSessionId || nuvemShopId,
                nuvemShopId: nuvemShopId,
                clientId: clientId,
                clientHash: clientHash,
                productData: productData
              })
            });
          case 5:
            return _context11.abrupt("return", _context11.sent);
          case 6:
          case "end":
            return _context11.stop();
        }
      }, _callee11, this);
    }));
    function add(_x14) {
      return _add2.apply(this, arguments);
    }
    return add;
  }();
  _proto5.getBy = /*#__PURE__*/function () {
    var _getBy = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(_ref10) {
      var trackingId, clientSessionId, clientHash;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            trackingId = _ref10.trackingId, clientSessionId = _ref10.clientSessionId, clientHash = _ref10.clientHash;
            _context12.prev = 1;
            _context12.next = 4;
            return this.api(this.baseURL + "/trackings/" + trackingId + "/sessions?clientHash=" + clientHash + "&clientSessionId=" + clientSessionId);
          case 4:
            return _context12.abrupt("return", _context12.sent);
          case 7:
            _context12.prev = 7;
            _context12.t0 = _context12["catch"](1);
            Logger.error(_context12.t0);
          case 10:
          case "end":
            return _context12.stop();
        }
      }, _callee12, this, [[1, 7]]);
    }));
    function getBy(_x15) {
      return _getBy.apply(this, arguments);
    }
    return getBy;
  }();
  return SessionService;
}(BaseService);
var UtmScanner = /*#__PURE__*/function () {
  function UtmScanner(_ref11) {
    var full_url = _ref11.full_url;
    this.utmNames = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_content'];
    this.hotmartUtmNames = ['src', 'sck'];
    this.delimiters = /[|\\]/;
    this.full_url = window.location.search;
    Object.assign(this, {
      full_url: full_url
    });
  }
  var _proto6 = UtmScanner.prototype;
  _proto6.getUtmFormats = function getUtmFormats() {
    return this.utmNames.concat(this.hotmartUtmNames);
  };
  UtmScanner.extractHostname = function extractHostname(full_url) {
    try {
      return new URL(full_url).hostname;
    } catch (error) {
      return null;
    }
  };
  UtmScanner.extractOrigin = function extractOrigin(full_url) {
    try {
      var _URL;
      return (_URL = new URL(full_url)) == null ? void 0 : _URL.origin;
    } catch (error) {
      return null;
    }
  };
  _proto6.getHotmartSourceName = function getHotmartSourceName() {
    var searchParams = new URLSearchParams(this.full_url);
    var hotmartSources = ['src', 'sck'];
    var result;
    hotmartSources.find(function (source) {
      if (searchParams.has(source)) {
        result = source;
      }
    });
    return result;
  };
  _proto6.isHotmartUtmsValid = function isHotmartUtmsValid(sourceName, full_url) {
    var _searchParams$get$spl, _searchParams$get;
    if (full_url === void 0) {
      full_url = window.location.search;
    }
    var searchParams = new URLSearchParams(full_url);
    var _ref12 = (_searchParams$get$spl = (_searchParams$get = searchParams.get(sourceName)) == null ? void 0 : _searchParams$get.split('|')) != null ? _searchParams$get$spl : [],
      utm_source = _ref12[0],
      utm_medium = _ref12[1],
      utm_campaign = _ref12[2],
      utm_content = _ref12[3];
    var parsedUtms = removeEmptyObjectProperties({
      utm_source: utm_source,
      utm_medium: utm_medium,
      utm_campaign: utm_campaign,
      utm_content: utm_content
    });
    if (!(parsedUtms != null && parsedUtms.utm_source) && !(parsedUtms != null && parsedUtms.utm_medium) && !(parsedUtms != null && parsedUtms.utm_campaign) && !(parsedUtms != null && parsedUtms.utm_content)) {
      return false;
    }
    return true;
  };
  _proto6.containsHotmartSourceInUrl = function containsHotmartSourceInUrl() {
    var sourceName = this.getHotmartSourceName();
    if (sourceName && this.isHotmartUtmsValid(sourceName, this.full_url)) {
      return true;
    }
    return false;
  };
  _proto6.containsUTMsInQueryParams = function containsUTMsInQueryParams() {
    var searchParams = new URLSearchParams(this.full_url);
    console.log(searchParams, 'url', this.full_url);
    if (this.containsHotmartSourceInUrl()) {
      return true;
    }
    for (var _iterator2 = _createForOfIteratorHelperLoose(this.utmNames), _step2; !(_step2 = _iterator2()).done;) {
      var utmName = _step2.value;
      if (searchParams.has(utmName)) {
        return true;
      }
    }
    return false;
  };
  _proto6.extractUTMsFromQueryParams = function extractUTMsFromQueryParams() {
    var _this5 = this;
    var utmParams = {};
    var searchParams = new URLSearchParams(this.full_url);
    if (this.containsHotmartSourceInUrl()) {
      utmParams = UtmParser.parseHotmartUTMs(this.getHotmartSourceName(), this.full_url);
    }
    var _loop = function _loop() {
      var utmName = _step3.value;
      if (searchParams.has(utmName)) {
        var mappings = {
          utm_campaign: function utm_campaign() {
            var utm_campaign = searchParams == null ? void 0 : searchParams.get(utmName);
            var name = '';
            var id = '';
            if ((searchParams == null ? void 0 : searchParams.get('utm_source')) === 'google') {
              var _ref13 = (utm_campaign == null ? void 0 : utm_campaign.split(/[|\\-]/)) || [];
              name = _ref13[0];
              id = _ref13[1];
            } else {
              var _ref14 = (utm_campaign == null ? void 0 : utm_campaign.split(/[|\\]/)) || [];
              name = _ref14[0];
              id = _ref14[1];
            }
            utmParams['utm_campaignName'] = name;
            utmParams['utm_campaignId'] = id;
            utmParams[utmName] = utm_campaign;
          },
          utm_medium: function utm_medium() {
            var utm_medium = searchParams == null ? void 0 : searchParams.get(utmName);
            var _ref15 = (utm_medium == null ? void 0 : utm_medium.split(_this5.delimiters)) || [],
              adsetName = _ref15[0],
              adsetId = _ref15[1];
            utmParams['utm_adsetName'] = adsetName;
            utmParams['utm_adsetId'] = adsetId;
            utmParams[utmName] = utm_medium;
          },
          utm_content: function utm_content() {
            var utm_content = searchParams == null ? void 0 : searchParams.get(utmName);
            var _ref16 = (utm_content == null ? void 0 : utm_content.split(_this5.delimiters)) || [],
              adName = _ref16[0],
              adId = _ref16[1],
              term = _ref16[2];
            utmParams['utm_adName'] = adName;
            utmParams['utm_adId'] = adId;
            utmParams[utmName] = adName || adId ? (adName || '') + "\\" + (adId || '') : null;
          }
        };
        var properMapping = mappings == null ? void 0 : mappings[utmName];
        if (properMapping) {
          properMapping();
          return 1; // continue
        }
        utmParams[utmName] = searchParams.get(utmName);
      }
    };
    for (var _iterator3 = _createForOfIteratorHelperLoose(this.utmNames), _step3; !(_step3 = _iterator3()).done;) {
      if (_loop()) continue;
    }
    if (utmParams["utm_source"] === "google") {
      var term = searchParams.get("utm_term");
      utmParams["googleKeyword"] = term;
    }
    return utmParams;
  };
  _proto6.getFacebookParams = function getFacebookParams(storage) {
    var searchParams = new URLSearchParams(window.location.search);
    var fbcExists = storage.getCookieByName('_fbc');
    var fbpExists = storage.getCookieByName('_fbp');
    var fbclidExists = searchParams == null ? void 0 : searchParams.get('fbclid');
    return {
      fbclid: fbclidExists,
      fbc: fbcExists,
      fbp: fbpExists,
      fbpUnix: this.generateUnix(),
      fbcUnix: this.generateUnix()
    };
  };
  _proto6.generateUnix = function generateUnix() {
    var dateInSaoPauloTimezone = new Date().toLocaleString('en-US', {
      timeZone: 'America/Sao_Paulo'
    });
    var unix = Math.floor(new Date(dateInSaoPauloTimezone).getTime() / 1000); // Convert milliseconds to seconds

    return String(unix);
  };
  return UtmScanner;
}();
var PlatformFilter = /*#__PURE__*/function () {
  function PlatformFilter(_ref17) {
    var platforms = _ref17.platforms;
    this.platforms = void 0;
    Object.assign(this, {
      platforms: platforms
    });
  }
  var _proto7 = PlatformFilter.prototype;
  _proto7.referrerContainsPlatform = function referrerContainsPlatform(referrer) {
    var _this$platforms;
    var foundPlatform = (_this$platforms = this.platforms) == null ? void 0 : _this$platforms.find(function (platform) {
      return referrer == null ? void 0 : referrer.includes(platform.name);
    });
    return foundPlatform ? foundPlatform.name : null;
  };
  return PlatformFilter;
}();
var UtmParser = /*#__PURE__*/function () {
  function UtmParser(_ref18) {
    var scanner = _ref18.scanner,
      platformsFilter = _ref18.platformsFilter,
      sessionHistoryService = _ref18.sessionHistoryService,
      storage = _ref18.storage;
    this.scanner = void 0;
    this.platformsFilter = void 0;
    this.sessionHistoryService = void 0;
    this.storage = void 0;
    Object.assign(this, {
      scanner: scanner,
      platformsFilter: platformsFilter,
      sessionHistoryService: sessionHistoryService,
      storage: storage
    });
  }
  var _proto8 = UtmParser.prototype;
  _proto8.parseUTMSrc = function parseUTMSrc(_ref19) {
    var _this6 = this;
    var utm_source = _ref19.utm_source;
    var organicExists = utm_source == null ? void 0 : utm_source.endsWith('_organic');
    var referrerHostname = UtmScanner.extractHostname(document.referrer);
    var isReferrerHostnameValid = referrerHostname && referrerHostname !== window.location.hostname;
    var isOrganic = function isOrganic() {
      if (!isReferrerHostnameValid || organicExists) {
        return false;
      }
      var searchParams = new URLSearchParams(document.referrer);
      var utmFormats = _this6.scanner.getUtmFormats();
      for (var _iterator4 = _createForOfIteratorHelperLoose(utmFormats), _step4; !(_step4 = _iterator4()).done;) {
        var utmFormat = _step4.value;
        if (searchParams.has(utmFormat)) {
          return false;
        }
      }
      return true;
    };
    if (!utm_source) {
      var fromFilteredPlatform = this.platformsFilter.referrerContainsPlatform(referrerHostname);
      if (!isReferrerHostnameValid || !fromFilteredPlatform) {
        return 'organic';
      }
      return "" + fromFilteredPlatform + (isOrganic() ? '_organic' : '');
    }
    return utm_source;
  };
  UtmParser.parseHotmartUTMs = function parseHotmartUTMs(sourceName, full_url) {
    var _searchParams$get$spl2, _searchParams$get2;
    if (full_url === void 0) {
      full_url = window.location.search;
    }
    var searchParams = new URLSearchParams(full_url);
    var _ref20 = (_searchParams$get$spl2 = searchParams == null || (_searchParams$get2 = searchParams.get(sourceName)) == null ? void 0 : _searchParams$get2.split('|')) != null ? _searchParams$get$spl2 : [],
      utm_source = _ref20[0],
      utm_adsetName = _ref20[1],
      utm_campaignName = _ref20[2],
      utm_adName = _ref20[3],
      utm_campaignId = _ref20[4],
      utm_adsetId = _ref20[5],
      utm_adId = _ref20[6],
      utm_term = _ref20[7];
    return {
      utm_source: utm_source,
      utm_medium: (utm_adsetName || '') + "|" + (utm_adsetId || ''),
      utm_campaign: (utm_campaignName || '') + "|" + (utm_campaignId || ''),
      utm_content: (utm_adName || '') + "|" + (utm_adId || ''),
      utm_campaignId: utm_campaignId,
      utm_campaignName: utm_campaignName,
      utm_adsetId: utm_adsetId,
      utm_adsetName: utm_adsetName,
      utm_adId: utm_adId,
      utm_adName: utm_adName,
      utm_term: utm_term
    };
  };
  _proto8.parseUTMsToQueryParams = /*#__PURE__*/function () {
    var _parseUTMsToQueryParams = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(_ref21) {
      var _this7 = this;
      var tracking, utms, searchParams, hotmartSourceTypes, _i, _hotmartSourceTypes, hotmartSourceType, _iterator5, _step5, utmName, platformMappings, mapping;
      return _regeneratorRuntime().wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            tracking = _ref21.tracking, utms = _ref21.utms;
            searchParams = new URLSearchParams(window.location.search);
            hotmartSourceTypes = ['src', 'sck'];
            if (searchParams.get("utm_source") !== "google") {
              searchParams.delete("utm_term");
            }
            for (_i = 0, _hotmartSourceTypes = hotmartSourceTypes; _i < _hotmartSourceTypes.length; _i++) {
              hotmartSourceType = _hotmartSourceTypes[_i];
              if (searchParams != null && searchParams.has(hotmartSourceType)) {
                searchParams.delete(hotmartSourceType);
              }
            }
            for (_iterator5 = _createForOfIteratorHelperLoose(this.scanner.utmNames); !(_step5 = _iterator5()).done;) {
              utmName = _step5.value;
              if (searchParams != null && searchParams.has(utmName)) {
                searchParams.delete(utmName);
              }
            }
            platformMappings = {
              hotmart: function hotmart() {
                var querySource = ((utms == null ? void 0 : utms.utm_source) || '') + "|" + ((utms == null ? void 0 : utms.utm_adsetName) || '') + "|" + ((utms == null ? void 0 : utms.utm_campaignName) || '') + "|" + ((utms == null ? void 0 : utms.utm_adName) || '') + "|" + ((utms == null ? void 0 : utms.utm_campaignId) || '') + "|" + ((utms == null ? void 0 : utms.utm_adsetId) || '') + "|" + ((utms == null ? void 0 : utms.utm_adId) || '') + "|" + ((utms == null ? void 0 : utms.utm_term) || '');
                searchParams.set(tracking == null ? void 0 : tracking.sourceType, querySource);
              },
              vega: function vega() {
                var vegaMappings = {
                  utm_campaign: function utm_campaign() {
                    return ((utms == null ? void 0 : utms.utm_campaignName) || '') + "\\" + ((utms == null ? void 0 : utms.utm_campaignId) || '');
                  },
                  utm_medium: function utm_medium() {
                    return ((utms == null ? void 0 : utms.utm_adsetName) || '') + "\\" + ((utms == null ? void 0 : utms.utm_adsetId) || '');
                  },
                  utm_content: function utm_content() {
                    return ((utms == null ? void 0 : utms.utm_adName) || '') + "\\" + ((utms == null ? void 0 : utms.utm_adId) || '') + "\\" + (utms == null ? void 0 : utms.utm_term);
                  }
                };
                for (var _iterator6 = _createForOfIteratorHelperLoose(_this7.scanner.utmNames), _step6; !(_step6 = _iterator6()).done;) {
                  var utmName = _step6.value;
                  if (utmName === 'utm_content') {
                    var content = vegaMappings[utmName]();
                    searchParams.set(utmName, content);
                  } else if (utms[utmName]) {
                    var mappingExists = vegaMappings[utmName];
                    var utm = mappingExists ? mappingExists() : utms[utmName];
                    searchParams.set(utmName, utm || '');
                  }
                }
                if (utms["googleKeyword"]) {
                  searchParams.set("utm_term", utms["googleKeyword"] || '');
                }
              },
              others: function others() {
                for (var _iterator7 = _createForOfIteratorHelperLoose(_this7.scanner.utmNames), _step7; !(_step7 = _iterator7()).done;) {
                  var utmName = _step7.value;
                  if (utmName === 'utm_content') {
                    var content = ((utms == null ? void 0 : utms.utm_adName) || '') + "|" + ((utms == null ? void 0 : utms.utm_adId) || '') + "|" + (utms == null ? void 0 : utms.utm_term);
                    searchParams.set(utmName, content || '');
                  } else if (utms[utmName]) {
                    searchParams.set(utmName, utms[utmName] || '');
                  }
                }
                if (utms["googleKeyword"]) {
                  searchParams.set("utm_term", utms["googleKeyword"] || '');
                }
              },
              shopify_plus_others: function shopify_plus_others() {
                var getCookieByName = _this7.storage.getCookieByName;
                var sessionHistoryService = _this7.sessionHistoryService;
                function waitForShopifyCartToken() {
                  return new Promise( /*#__PURE__*/function () {
                    var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(resolve) {
                      var interval;
                      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
                        while (1) switch (_context14.prev = _context14.next) {
                          case 0:
                            interval = setInterval( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
                              var cartTokenCookie, cartTokenLocalStorage, item;
                              return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                                while (1) switch (_context13.prev = _context13.next) {
                                  case 0:
                                    cartTokenCookie = getCookieByName('cart') ? getCookieByName('cart').split('?')[0] : '';
                                    cartTokenLocalStorage = localStorage.getItem('trackedSourceId') || localStorage.getItem('cartToken');
                                    item = cartTokenCookie || cartTokenLocalStorage || null;
                                    if (!(item !== null)) {
                                      _context13.next = 8;
                                      break;
                                    }
                                    clearInterval(interval);
                                    _context13.next = 7;
                                    return sessionHistoryService.updateNuvemshopId({
                                      trackingId: tracking.id,
                                      trackingSessionId: utms.trackingSessionId,
                                      nuvemShopId: item
                                    });
                                  case 7:
                                    return _context13.abrupt("return", resolve(true));
                                  case 8:
                                  case "end":
                                    return _context13.stop();
                                }
                              }, _callee13);
                            })), 500);
                          case 1:
                          case "end":
                            return _context14.stop();
                        }
                      }, _callee14);
                    }));
                    return function (_x17) {
                      return _ref22.apply(this, arguments);
                    };
                  }());
                }
                waitForShopifyCartToken();
                for (var _iterator8 = _createForOfIteratorHelperLoose(_this7.scanner.utmNames), _step8; !(_step8 = _iterator8()).done;) {
                  var utmName = _step8.value;
                  if (utmName === 'utm_content') {
                    var content = ((utms == null ? void 0 : utms.utm_adName) || '') + "|" + ((utms == null ? void 0 : utms.utm_adId) || '') + "|" + (utms == null ? void 0 : utms.utm_term);
                    searchParams.set(utmName, content || '');
                  } else if (utms[utmName]) {
                    searchParams.set(utmName, utms[utmName] || '');
                  }
                }
                if (utms["googleKeyword"]) {
                  searchParams.set("utm_term", utms["googleKeyword"] || '');
                }
              },
              nuvemshop: function () {
                var _nuvemshop = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
                  var _window5, _window6;
                  var _iterator9, _step9, utmName, content;
                  return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                    while (1) switch (_context15.prev = _context15.next) {
                      case 0:
                        _context15.next = 2;
                        return _this7.sessionHistoryService.updateNuvemshopId({
                          trackingId: tracking.id,
                          trackingSessionId: utms.trackingSessionId,
                          //@ts-ignore
                          nuvemShopId: (_window5 = window) != null && (_window5 = _window5.LS) != null && (_window5 = _window5.cart) != null && _window5.id ? String((_window6 = window) == null || (_window6 = _window6.LS) == null || (_window6 = _window6.cart) == null ? void 0 : _window6.id) : null
                        });
                      case 2:
                        for (_iterator9 = _createForOfIteratorHelperLoose(_this7.scanner.utmNames); !(_step9 = _iterator9()).done;) {
                          utmName = _step9.value;
                          if (utmName === 'utm_content') {
                            content = ((utms == null ? void 0 : utms.utm_adName) || '') + "|" + ((utms == null ? void 0 : utms.utm_adId) || '') + "|" + (utms == null ? void 0 : utms.utm_term);
                            searchParams.set(utmName, content || '');
                          } else if (utms[utmName]) {
                            searchParams.set(utmName, utms[utmName] || '');
                          }
                        }
                        if (utms["googleKeyword"]) {
                          searchParams.set("utm_term", utms["googleKeyword"] || '');
                        }
                      case 4:
                      case "end":
                        return _context15.stop();
                    }
                  }, _callee15);
                }));
                function nuvemshop() {
                  return _nuvemshop.apply(this, arguments);
                }
                return nuvemshop;
              }(),
              tray: function () {
                var _tray = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
                  var _document5, _document6;
                  var _iterator10, _step10, utmName, content;
                  return _regeneratorRuntime().wrap(function _callee16$(_context16) {
                    while (1) switch (_context16.prev = _context16.next) {
                      case 0:
                        _context16.next = 2;
                        return _this7.sessionHistoryService.updateTraySessionId({
                          trackingId: tracking.id,
                          trackingSessionId: utms.trackingSessionId,
                          traySessionId: ((_document5 = document) == null || (_document5 = _document5.documentElement) == null ? void 0 : _document5.getAttribute('data-session')) || ((_document6 = document) == null || (_document6 = _document6.documentElement) == null ? void 0 : _document6.getAttribute('data-checkout-session_id'))
                        });
                      case 2:
                        for (_iterator10 = _createForOfIteratorHelperLoose(_this7.scanner.utmNames); !(_step10 = _iterator10()).done;) {
                          utmName = _step10.value;
                          if (utmName === 'utm_content') {
                            content = ((utms == null ? void 0 : utms.utm_adName) || '') + "|" + ((utms == null ? void 0 : utms.utm_adId) || '') + "|" + (utms == null ? void 0 : utms.utm_term);
                            searchParams.set(utmName, content || '');
                          } else if (utms[utmName]) {
                            searchParams.set(utmName, utms[utmName] || '');
                          }
                        }
                        if (utms["googleKeyword"]) {
                          searchParams.set("utm_term", utms["googleKeyword"] || '');
                        }
                      case 4:
                      case "end":
                        return _context16.stop();
                    }
                  }, _callee16);
                }));
                function tray() {
                  return _tray.apply(this, arguments);
                }
                return tray;
              }(),
              bagy: function bagy() {
                var expiryDate = new Date();
                var utmsForCookie = {
                  utm_source: utms == null ? void 0 : utms.utm_source,
                  utm_campaign: utms == null ? void 0 : utms.utm_campaign,
                  utm_medium: utms == null ? void 0 : utms.utm_medium,
                  utm_content: utms == null ? void 0 : utms.utm_content,
                  utm_term: utms == null ? void 0 : utms.utm_term
                };
                for (var _iterator11 = _createForOfIteratorHelperLoose(_this7.scanner.utmNames), _step11; !(_step11 = _iterator11()).done;) {
                  var utmName = _step11.value;
                  if (utmName === 'utm_content') {
                    var content = ((utms == null ? void 0 : utms.utm_adName) || '') + "|" + ((utms == null ? void 0 : utms.utm_adId) || '') + "|" + (utms == null ? void 0 : utms.utm_term);
                    searchParams.set(utmName, content || '');
                  } else if (utms[utmName]) {
                    searchParams.set(utmName, utms[utmName] || '');
                  }
                }
                if (utms["googleKeyword"]) {
                  searchParams.set("utm_term", utms["googleKeyword"] || '');
                }
                expiryDate.setDate(expiryDate.getDate() + 30);
                document.cookie = "_dc_utm_campaign=" + JSON.stringify(utmsForCookie) + "; expires=" + expiryDate.toUTCString() + "; path=/";
              },
              magazord: function magazord() {
                try {
                  var expiryDate = new Date();
                  var utmsForCookie = "lc=utm&utm_source=" + ((utms == null ? void 0 : utms.utm_source) || '') + "&utm_campaign=" + ((utms == null ? void 0 : utms.utm_campaign) || '') + "&utm_medium=" + ((utms == null ? void 0 : utms.utm_medium) || '') + "&utm_content=" + ((utms == null ? void 0 : utms.utm_content) || '') + "&utm_term=" + ((utms == null ? void 0 : utms.utm_term) || '');
                  var invertedStr = btoa(_this7.removeAccents(utmsForCookie.split('').reverse().join('')));
                  expiryDate.setDate(expiryDate.getDate() + 30);
                  document.cookie = "trk=" + encodeURIComponent(invertedStr) + "; expires=" + expiryDate.toUTCString() + "; path=/";
                } catch (error) {
                  Logger.error(error);
                }
                for (var _iterator12 = _createForOfIteratorHelperLoose(_this7.scanner.utmNames), _step12; !(_step12 = _iterator12()).done;) {
                  var utmName = _step12.value;
                  if (utmName === 'utm_content') {
                    var content = ((utms == null ? void 0 : utms.utm_adName) || '') + "|" + ((utms == null ? void 0 : utms.utm_adId) || '') + "|" + (utms == null ? void 0 : utms.utm_term);
                    searchParams.set(utmName, content || '');
                  } else if (utms[utmName]) {
                    searchParams.set(utmName, utms[utmName] || '');
                  }
                }
                if (utms["googleKeyword"]) {
                  searchParams.set("utm_term", utms["googleKeyword"] || '');
                }
              },
              loja_integrada: function loja_integrada() {
                var expiryDate = new Date();
                for (var _iterator13 = _createForOfIteratorHelperLoose(_this7.scanner.utmNames), _step13; !(_step13 = _iterator13()).done;) {
                  var utmName = _step13.value;
                  if (utmName === 'utm_content') {
                    var content = ((utms == null ? void 0 : utms.utm_adName) || '') + "|" + ((utms == null ? void 0 : utms.utm_adId) || '') + "|" + (utms == null ? void 0 : utms.utm_term);
                    searchParams.set(utmName, content || '');
                  } else if (utms[utmName]) {
                    searchParams.set(utmName, utms[utmName] || '');
                  }
                }
                if (utms["googleKeyword"]) {
                  searchParams.set("utm_term", utms["googleKeyword"] || '');
                }
                expiryDate.setDate(expiryDate.getDate() + 30);
                document.cookie = "utm_campaign=" + utms.trackingSessionId + "; expires=" + expiryDate.toUTCString() + "; path=/";
              },
              vtex: function () {
                var _vtex = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
                  var _iterator14, _step14, utmName, content, vtexSessionId;
                  return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                    while (1) switch (_context17.prev = _context17.next) {
                      case 0:
                        for (_iterator14 = _createForOfIteratorHelperLoose(_this7.scanner.utmNames); !(_step14 = _iterator14()).done;) {
                          utmName = _step14.value;
                          if (utmName === 'utm_content') {
                            content = ((utms == null ? void 0 : utms.utm_adName) || '') + "|" + ((utms == null ? void 0 : utms.utm_adId) || '') + "|" + (utms == null ? void 0 : utms.utm_term);
                            searchParams.set(utmName, content || '');
                          } else if (utms[utmName]) {
                            searchParams.set(utmName, utms[utmName] || '');
                          }
                        }
                        _context17.next = 3;
                        return waitForVtexSessionId('orderform', 'vtex');
                      case 3:
                        vtexSessionId = _context17.sent;
                        if (!(vtexSessionId !== (utms == null ? void 0 : utms.vtexSessionId))) {
                          _context17.next = 7;
                          break;
                        }
                        _context17.next = 7;
                        return _this7.sessionHistoryService.updateVtexSessionId({
                          trackingId: tracking.id,
                          trackingSessionId: utms.trackingSessionId,
                          vtexSessionId: vtexSessionId
                        });
                      case 7:
                      case "end":
                        return _context17.stop();
                    }
                  }, _callee17);
                }));
                function vtex() {
                  return _vtex.apply(this, arguments);
                }
                return vtex;
              }(),
              woocommerce: function () {
                var _woocommerce = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
                  var _iterator15, _step15, utmName, content, COOKIE_VALUE;
                  return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                    while (1) switch (_context18.prev = _context18.next) {
                      case 0:
                        for (_iterator15 = _createForOfIteratorHelperLoose(_this7.scanner.utmNames); !(_step15 = _iterator15()).done;) {
                          utmName = _step15.value;
                          if (utmName === 'utm_content') {
                            content = ((utms == null ? void 0 : utms.utm_adName) || '') + "|" + ((utms == null ? void 0 : utms.utm_adId) || '') + "|" + (utms == null ? void 0 : utms.utm_term);
                            searchParams.set(utmName, content || '');
                          } else if (utms[utmName]) {
                            searchParams.set(utmName, utms[utmName] || '');
                          }
                        }
                        COOKIE_VALUE = "typ=utm|||src=" + ((utms == null ? void 0 : utms.utm_source) || '(none)') + "|||mdm=" + ((utms == null ? void 0 : utms.utm_medium) || '(none)') + "|||cmp=" + ((utms == null ? void 0 : utms.utm_campaign) || '(none)') + "|||cnt=" + ((utms == null ? void 0 : utms.utm_content) || '(none)') + "|||trm=" + ((utms == null ? void 0 : utms.utm_term) || '(none)') + "|||id=(none)|||plt=(none)|||fmt=(none)|||tct=(none)";
                        document.cookie = "sbjs_current=" + encodeURIComponent(COOKIE_VALUE) + "; path=/";
                      case 3:
                      case "end":
                        return _context18.stop();
                    }
                  }, _callee18);
                }));
                function woocommerce() {
                  return _woocommerce.apply(this, arguments);
                }
                return woocommerce;
              }(),
              vnda: function () {
                var _vnda = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
                  var _iterator16, _step16, utmName, content, COOKIE_VALUE, expiryDate;
                  return _regeneratorRuntime().wrap(function _callee19$(_context19) {
                    while (1) switch (_context19.prev = _context19.next) {
                      case 0:
                        for (_iterator16 = _createForOfIteratorHelperLoose(_this7.scanner.utmNames); !(_step16 = _iterator16()).done;) {
                          utmName = _step16.value;
                          if (utmName === 'utm_content') {
                            content = ((utms == null ? void 0 : utms.utm_adName) || '') + "|" + ((utms == null ? void 0 : utms.utm_adId) || '') + "|" + (utms == null ? void 0 : utms.utm_term);
                            searchParams.set(utmName, content || '');
                          } else if (utms[utmName]) {
                            searchParams.set(utmName, utms[utmName] || '');
                          }
                        }
                        COOKIE_VALUE = "" + (utms == null ? void 0 : utms.utm_term);
                        expiryDate = new Date();
                        expiryDate.setDate(expiryDate.getDate() + 30);
                        document.cookie = "campaign=" + COOKIE_VALUE + "; expires=" + expiryDate.toUTCString() + "; path=/";
                      case 5:
                      case "end":
                        return _context19.stop();
                    }
                  }, _callee19);
                }));
                function vnda() {
                  return _vnda.apply(this, arguments);
                }
                return vnda;
              }()
            };
            mapping = platformMappings[tracking == null ? void 0 : tracking.platform] || platformMappings['others'];
            _context20.next = 10;
            return mapping();
          case 10:
            return _context20.abrupt("return", searchParams);
          case 11:
          case "end":
            return _context20.stop();
        }
      }, _callee20, this);
    }));
    function parseUTMsToQueryParams(_x16) {
      return _parseUTMsToQueryParams.apply(this, arguments);
    }
    return parseUTMsToQueryParams;
  }();
  _proto8.removeAccents = function removeAccents(input) {
    return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[`^~¨´]/g, "");
  };
  return UtmParser;
}();
var UtmProducer = /*#__PURE__*/function () {
  function UtmProducer(_ref24) {
    var sessionHistoryService = _ref24.sessionHistoryService,
      redirect_url = _ref24.redirect_url;
    this.sessionHistoryService = void 0;
    this.redirect_url = void 0;
    Object.assign(this, {
      redirect_url: redirect_url,
      sessionHistoryService: sessionHistoryService
    });
  }
  var _proto9 = UtmProducer.prototype;
  _proto9.redirectWithUTMs = function redirectWithUTMs(params) {
    var separator = this.redirect_url.includes('?') ? '&' : '?';
    console.log('redirectWithUTMs :>> params :>> ', params);
    window.location.href = "" + this.redirect_url + separator + params;
  };
  _proto9.loadUTMsInQueryParams = function loadUTMsInQueryParams(tracking, queryParams) {
    var newURL = "" + window.location.origin + window.location.pathname + "?" + queryParams;
    window.history.replaceState({
      path: newURL
    }, '', newURL);
    var utms = this.extractUtmsFromQueryParams(queryParams.toString());
    if ((tracking == null ? void 0 : tracking.platform) === 'shopify_plus_others') {
      var expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      document.cookie = "utmsTrack=?" + utms + "; expires=" + expiryDate.toUTCString() + "; path=/; SameSite=Lax; Secure";
      localStorage.setItem('nemu:utmsTrack', "?" + utms);
    }
  };
  _proto9.extractUtmsFromQueryParams = function extractUtmsFromQueryParams(queryParams) {
    var utmsParams = ['utm_source', 'utm_content', 'utm_medium', 'utm_campaign', 'utm_term'];
    var utms = queryParams.split('&').filter(function (param) {
      return utmsParams.includes(param.split('=')[0]);
    }).join('&');
    return utms;
  };
  _proto9.addInitiateCheckoutListener = function addInitiateCheckoutListener(tracking, trackingSessionId, trackingSessionHistoryId) {
    var _this8 = this;
    if ((tracking == null ? void 0 : tracking.initiate_checkout_detection_type) === 'selector') {
      var elements = document.querySelectorAll(tracking == null ? void 0 : tracking.initiate_checkout_detection_value);
      for (var _iterator17 = _createForOfIteratorHelperLoose(elements), _step17; !(_step17 = _iterator17()).done;) {
        var element = _step17.value;
        element.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21() {
          return _regeneratorRuntime().wrap(function _callee21$(_context21) {
            while (1) switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return _this8.sessionHistoryService.sendInitateCheckoutEvent({
                  trackingId: tracking == null ? void 0 : tracking.id,
                  trackingSessionId: trackingSessionId,
                  trackingSessionHistoryId: trackingSessionHistoryId
                });
              case 2:
              case "end":
                return _context21.stop();
            }
          }, _callee21);
        })));
      }
      return;
    }
    var selectors = ['button', 'a', 'input[type=""]', 'input[type="button"]', 'input[type="submit"]', 'input[type="reset"]'];
    for (var _i2 = 0, _selectors = selectors; _i2 < _selectors.length; _i2++) {
      var selector = _selectors[_i2];
      var _elements = document.querySelectorAll(selector);
      for (var _iterator18 = _createForOfIteratorHelperLoose(_elements), _step18; !(_step18 = _iterator18()).done;) {
        var _element = _step18.value;
        var containsText = false;
        if (_element.tagName.toLowerCase() === 'button' || _element.tagName.toLowerCase() === 'a') {
          containsText = _element.textContent.includes(tracking == null ? void 0 : tracking.initiate_checkout_detection_value);
        } else if (_element.tagName.toLowerCase() === 'input') {
          containsText = _element.value.includes(tracking == null ? void 0 : tracking.initiate_checkout_detection_value);
        }
        if (containsText) {
          _element.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22() {
            return _regeneratorRuntime().wrap(function _callee22$(_context22) {
              while (1) switch (_context22.prev = _context22.next) {
                case 0:
                  _context22.next = 2;
                  return this.sessionHistoryService.sendInitateCheckoutEvent({
                    trackingId: tracking == null ? void 0 : tracking.id,
                    trackingSessionId: trackingSessionId,
                    trackingSessionHistoryId: trackingSessionHistoryId
                  });
                case 2:
                case "end":
                  return _context22.stop();
              }
            }, _callee22, this);
          })));
        }
      }
    }
  };
  _proto9.execute = function execute(_ref27) {
    var trackingType = _ref27.trackingType,
      queryParams = _ref27.queryParams,
      trackingSessionHistoryId = _ref27.trackingSessionHistoryId,
      tracking = _ref27.tracking,
      trackingSessionId = _ref27.trackingSessionId;
    var isRedirect = trackingType && trackingType === 'redirect';
    if (isRedirect) {
      this.redirectWithUTMs(queryParams.toString());
      return;
    }
    this.loadUTMsInQueryParams(tracking, queryParams.toString());
    if (tracking != null && tracking.initiate_checkout_enabled && !!(tracking != null && tracking.initiate_checkout_detection_value)) {
      this.addInitiateCheckoutListener(tracking, trackingSessionId, trackingSessionHistoryId);
    }
  };
  return UtmProducer;
}();
var FacebookPixelManager = /*#__PURE__*/function () {
  function FacebookPixelManager(storage) {
    this.storage = storage;
    this.fbcKey = '_fbc';
    this.fbpKey = '_fbp';
  }
  var _proto10 = FacebookPixelManager.prototype;
  _proto10.getUnixTimestamp = function getUnixTimestamp() {
    var dateInSaoPauloTimezone = new Date().toLocaleString('en-US', {
      timeZone: 'America/Sao_Paulo'
    });
    return Math.floor(new Date(dateInSaoPauloTimezone).getTime() / 1000);
  };
  _proto10.generateRandomNumber = function generateRandomNumber() {
    return Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
  };
  _proto10.getExpirationDate = function getExpirationDate() {
    return new Date(Date.now() + 1000 * 60 * 60 * 24 * 90);
  };
  _proto10.isValidFbc = function isValidFbc(fbclid) {
    var fbc = this.storage.getCookieByName(this.fbcKey);
    return !!fbc && !!fbclid && fbc.includes(fbclid);
  };
  _proto10.isValidFbp = function isValidFbp() {
    var fbp = this.storage.getCookieByName(this.fbpKey);
    return !!fbp;
  };
  _proto10.validateAndUpdateFbc = function validateAndUpdateFbc() {
    var fbclid = new URLSearchParams(window.location.search).get('fbclid');
    if (!fbclid || this.isValidFbc(fbclid)) return;
    var fbc = "fb.1." + this.getUnixTimestamp() + "." + fbclid;
    this.storage.setCookie(this.fbcKey, fbc, this.getExpirationDate());
  };
  _proto10.ensureFbpExists = function ensureFbpExists() {
    if (this.isValidFbp()) return;
    var randomPart = this.generateRandomNumber();
    var fbp = "fb.1." + this.getUnixTimestamp() + "." + randomPart;
    this.storage.setCookie(this.fbpKey, fbp, this.getExpirationDate());
  };
  _proto10.initialize = function initialize() {
    this.validateAndUpdateFbc();
    this.ensureFbpExists();
  };
  return FacebookPixelManager;
}();
var Tracking = /*#__PURE__*/function () {
  function Tracking() {
    /* javascript-obfuscator:disable */
    this.id = 'chCPZQNFW-';
    /* javascript-obfuscator:disable */
    this.src = 'https://trackings.nemu.com.br';
    /* javascript-obfuscator:disable */
    this.type = 'tracking';
    /* javascript-obfuscator:disable */
    this.redirect_url = '';
    /* javascript-obfuscator:disable */
    this.full_url = '';
    /* javascript-obfuscator:disable */
    this.platform = 'others';
    /* javascript-obfuscator:disable */
    this.platforms = '[{"id":1,"name":"facebook","createdAt":"2024-08-13T14:35:00.000Z","updatedAt":"2024-08-13T14:35:00.000Z"},{"id":2,"name":"google","createdAt":"2024-08-13T14:35:00.000Z","updatedAt":"2024-08-13T14:35:00.000Z"},{"id":3,"name":"instagram","createdAt":"2024-08-13T14:35:00.000Z","updatedAt":"2024-08-13T14:35:00.000Z"}]';
  }
  var _proto11 = Tracking.prototype;
  _proto11.onLoad = /*#__PURE__*/function () {
    var _onLoad = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25() {
      var _this9 = this;
      var storage, facebookPixelManager, scanner, platformsFilter, clientService, _document7, _URL2, _sessionCreated$lastH, baseURL, sessionService, sessionHistoryService, parser, productData, clientSessionId, clientHash, clientId, session, producer, getLastSessionHistory, createTrackingSessionHistory, hasLoaded, hasCreated, sessionCreated, queryParams, _error$response;
      return _regeneratorRuntime().wrap(function _callee25$(_context25) {
        while (1) switch (_context25.prev = _context25.next) {
          case 0:
            storage = new Storage();
            facebookPixelManager = new FacebookPixelManager(storage);
            facebookPixelManager.initialize();
            console.log(this.full_url !== '' ? this.full_url : window.location.search, 'search', window.location.search);
            scanner = new UtmScanner({
              full_url: this.full_url !== '' ? this.full_url : window.location.search
            });
            platformsFilter = new PlatformFilter({
              platforms: JSON.parse(this.platforms)
            });
            clientService = new ClientService();
            _context25.prev = 7;
            Logger.info(JSON.stringify({
              referrer: UtmScanner.extractOrigin((_document7 = document) == null ? void 0 : _document7.referrer),
              search: JSON.stringify(window.location.search, null, 2),
              url: JSON.stringify(window.location, null, 2)
            }));
            baseURL = (_URL2 = new URL(this.src)) == null ? void 0 : _URL2.origin;
            if (baseURL) {
              _context25.next = 13;
              break;
            }
            Logger.error('script element with src attribute not found.');
            return _context25.abrupt("return");
          case 13:
            sessionService = new SessionService({
              baseURL: baseURL
            });
            sessionHistoryService = new SessionHistoryService({
              baseURL: baseURL
            });
            parser = new UtmParser({
              scanner: scanner,
              platformsFilter: platformsFilter,
              sessionHistoryService: sessionHistoryService,
              storage: storage
            });
            productData = {};
            clientSessionId = storage.getCookieByName("_nmu." + this.id);
            _context25.next = 20;
            return clientService.getClientHash();
          case 20:
            clientHash = _context25.sent;
            _context25.next = 23;
            return clientService.getClientId();
          case 23:
            clientId = _context25.sent;
            if (!(!!clientHash || !!clientSessionId)) {
              _context25.next = 28;
              break;
            }
            _context25.next = 27;
            return sessionService.getBy({
              trackingId: this.id,
              clientHash: clientHash,
              clientSessionId: clientSessionId
            });
          case 27:
            session = _context25.sent;
          case 28:
            producer = new UtmProducer({
              sessionHistoryService: sessionHistoryService,
              redirect_url: this.redirect_url !== '' ? this.redirect_url : null
            });
            getLastSessionHistory = /*#__PURE__*/function () {
              var _ref28 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23() {
                var lastHistory, queryParams;
                return _regeneratorRuntime().wrap(function _callee23$(_context23) {
                  while (1) switch (_context23.prev = _context23.next) {
                    case 0:
                      _context23.next = 2;
                      return sessionHistoryService.getLastBySessionId(_this9.id, session.id);
                    case 2:
                      lastHistory = _context23.sent;
                      if (lastHistory) {
                        _context23.next = 6;
                        break;
                      }
                      storage.removeCookie("_nmu." + _this9.id);
                      return _context23.abrupt("return", false);
                    case 6:
                      _context23.next = 8;
                      return parser.parseUTMsToQueryParams({
                        tracking: lastHistory == null ? void 0 : lastHistory.tracking,
                        utms: removeEmptyObjectProperties(lastHistory)
                      });
                    case 8:
                      queryParams = _context23.sent;
                      producer.execute({
                        tracking: lastHistory == null ? void 0 : lastHistory.tracking,
                        queryParams: queryParams,
                        baseURL: baseURL,
                        trackingSessionId: session.id,
                        trackingType: _this9.type,
                        trackingSessionHistoryId: lastHistory.id
                      });
                      return _context23.abrupt("return", true);
                    case 11:
                    case "end":
                      return _context23.stop();
                  }
                }, _callee23);
              }));
              return function getLastSessionHistory() {
                return _ref28.apply(this, arguments);
              };
            }();
            createTrackingSessionHistory = /*#__PURE__*/function () {
              var _ref29 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
                var _session, _history$lastHistory;
                var history, queryParams;
                return _regeneratorRuntime().wrap(function _callee24$(_context24) {
                  while (1) switch (_context24.prev = _context24.next) {
                    case 0:
                      Object.assign(productData, _extends({
                        utm_term: "nemu_" + session.id
                      }, removeEmptyObjectProperties(scanner.extractUTMsFromQueryParams())));
                      _context24.next = 3;
                      return sessionHistoryService.add({
                        trackingId: _this9.id,
                        sessionId: session.id,
                        clientId: clientId,
                        clientHash: clientHash,
                        productData: removeEmptyObjectProperties(_extends({}, productData, {
                          utm_source: parser.parseUTMSrc({
                            utm_source: productData == null ? void 0 : productData.utm_source
                          })
                        })),
                        referrer: UtmScanner.extractOrigin(document.referrer),
                        facebookParams: scanner.getFacebookParams(storage),
                        platform: _this9.platform
                      });
                    case 3:
                      history = _context24.sent;
                      if (history) {
                        _context24.next = 6;
                        break;
                      }
                      return _context24.abrupt("return", false);
                    case 6:
                      _context24.next = 8;
                      return parser.parseUTMsToQueryParams({
                        tracking: history == null ? void 0 : history.tracking,
                        utms: removeEmptyObjectProperties(history)
                      });
                    case 8:
                      queryParams = _context24.sent;
                      producer.execute({
                        tracking: (_session = session) == null ? void 0 : _session.tracking,
                        queryParams: queryParams,
                        trackingType: _this9.type,
                        baseURL: baseURL,
                        trackingSessionId: session.id,
                        trackingSessionHistoryId: history == null || (_history$lastHistory = history.lastHistory) == null ? void 0 : _history$lastHistory.id
                      });
                      return _context24.abrupt("return", true);
                    case 11:
                    case "end":
                      return _context24.stop();
                  }
                }, _callee24);
              }));
              return function createTrackingSessionHistory() {
                return _ref29.apply(this, arguments);
              };
            }();
            if (!session) {
              _context25.next = 44;
              break;
            }
            console.log('scanner', !scanner.containsUTMsInQueryParams());
            if (scanner.containsUTMsInQueryParams()) {
              _context25.next = 39;
              break;
            }
            _context25.next = 36;
            return getLastSessionHistory();
          case 36:
            hasLoaded = _context25.sent;
            if (!hasLoaded) {
              _context25.next = 39;
              break;
            }
            return _context25.abrupt("return");
          case 39:
            _context25.next = 41;
            return createTrackingSessionHistory();
          case 41:
            hasCreated = _context25.sent;
            if (!hasCreated) {
              _context25.next = 44;
              break;
            }
            return _context25.abrupt("return");
          case 44:
            if (scanner.containsUTMsInQueryParams()) {
              Object.assign(productData, _extends({}, removeEmptyObjectProperties(scanner.extractUTMsFromQueryParams())));
            }
            _context25.next = 47;
            return sessionService.add({
              trackingId: this.id,
              clientHash: clientHash,
              productData: _extends({}, productData, {
                utm_source: parser.parseUTMSrc({
                  utm_source: productData == null ? void 0 : productData.utm_source
                })
              }),
              facebookParams: scanner.getFacebookParams(storage),
              referrer: UtmScanner.extractOrigin(document.referrer),
              clientId: clientId
            });
          case 47:
            sessionCreated = _context25.sent;
            if (sessionCreated) {
              storage.setCookie("_nmu." + this.id, sessionCreated.id);
            }
            _context25.next = 51;
            return parser.parseUTMsToQueryParams({
              tracking: sessionCreated == null ? void 0 : sessionCreated.tracking,
              utms: removeEmptyObjectProperties(sessionCreated == null ? void 0 : sessionCreated.lastHistory)
            });
          case 51:
            queryParams = _context25.sent;
            console.log(queryParams.toString());
            producer.execute({
              tracking: sessionCreated == null ? void 0 : sessionCreated.tracking,
              queryParams: queryParams,
              trackingType: this.type,
              baseURL: baseURL,
              trackingSessionId: sessionCreated.id,
              trackingSessionHistoryId: sessionCreated == null || (_sessionCreated$lastH = sessionCreated.lastHistory) == null ? void 0 : _sessionCreated$lastH.id
            });
            _context25.next = 60;
            break;
          case 56:
            _context25.prev = 56;
            _context25.t0 = _context25["catch"](7);
            if (this.id) {
              storage.removeCookie("_nmu." + this.id);
            }
            Logger.error("" + ((_context25.t0 == null || (_error$response = _context25.t0.response) == null || (_error$response = _error$response.data) == null ? void 0 : _error$response.message) || _context25.t0));
          case 60:
          case "end":
            return _context25.stop();
        }
      }, _callee25, this, [[7, 56]]);
    }));
    function onLoad() {
      return _onLoad.apply(this, arguments);
    }
    return onLoad;
  }();
  return Tracking;
}();
var trackingNemu = new Tracking();
trackingNemu.onLoad();