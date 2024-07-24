var us = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function tu(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function nu(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ls = { exports: {} }, ye = ls.exports = {}, nt, rt;
function mi() {
  throw new Error("setTimeout has not been defined");
}
function Ei() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? nt = setTimeout : nt = mi;
  } catch {
    nt = mi;
  }
  try {
    typeof clearTimeout == "function" ? rt = clearTimeout : rt = Ei;
  } catch {
    rt = Ei;
  }
})();
function fs(t) {
  if (nt === setTimeout)
    return setTimeout(t, 0);
  if ((nt === mi || !nt) && setTimeout)
    return nt = setTimeout, setTimeout(t, 0);
  try {
    return nt(t, 0);
  } catch {
    try {
      return nt.call(null, t, 0);
    } catch {
      return nt.call(this, t, 0);
    }
  }
}
function ru(t) {
  if (rt === clearTimeout)
    return clearTimeout(t);
  if ((rt === Ei || !rt) && clearTimeout)
    return rt = clearTimeout, clearTimeout(t);
  try {
    return rt(t);
  } catch {
    try {
      return rt.call(null, t);
    } catch {
      return rt.call(this, t);
    }
  }
}
var yt = [], Jt = !1, xt, Dn = -1;
function iu() {
  !Jt || !xt || (Jt = !1, xt.length ? yt = xt.concat(yt) : Dn = -1, yt.length && hs());
}
function hs() {
  if (!Jt) {
    var t = fs(iu);
    Jt = !0;
    for (var e = yt.length; e; ) {
      for (xt = yt, yt = []; ++Dn < e; )
        xt && xt[Dn].run();
      Dn = -1, e = yt.length;
    }
    xt = null, Jt = !1, ru(t);
  }
}
ye.nextTick = function(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var n = 1; n < arguments.length; n++)
      e[n - 1] = arguments[n];
  yt.push(new ds(t, e)), yt.length === 1 && !Jt && fs(hs);
};
function ds(t, e) {
  this.fun = t, this.array = e;
}
ds.prototype.run = function() {
  this.fun.apply(null, this.array);
};
ye.title = "browser";
ye.browser = !0;
ye.env = {};
ye.argv = [];
ye.version = "";
ye.versions = {};
function vt() {
}
ye.on = vt;
ye.addListener = vt;
ye.once = vt;
ye.off = vt;
ye.removeListener = vt;
ye.removeAllListeners = vt;
ye.emit = vt;
ye.prependListener = vt;
ye.prependOnceListener = vt;
ye.listeners = function(t) {
  return [];
};
ye.binding = function(t) {
  throw new Error("process.binding is not supported");
};
ye.cwd = function() {
  return "/";
};
ye.chdir = function(t) {
  throw new Error("process.chdir is not supported");
};
ye.umask = function() {
  return 0;
};
var ou = ls.exports;
const Ee = /* @__PURE__ */ nu(ou);
var Ur = { exports: {} }, jr = {}, en = {}, ps = {}, Wi = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var e = {}, n = Symbol("test"), r = Object(n);
  if (typeof n == "string" || Object.prototype.toString.call(n) !== "[object Symbol]" || Object.prototype.toString.call(r) !== "[object Symbol]")
    return !1;
  var i = 42;
  e[n] = i;
  for (n in e)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
    return !1;
  var o = Object.getOwnPropertySymbols(e);
  if (o.length !== 1 || o[0] !== n || !Object.prototype.propertyIsEnumerable.call(e, n))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var a = Object.getOwnPropertyDescriptor(e, n);
    if (a.value !== i || a.enumerable !== !0)
      return !1;
  }
  return !0;
}, au = Wi, Vi = function() {
  return au() && !!Symbol.toStringTag;
}, su = Error, cu = EvalError, uu = RangeError, lu = ReferenceError, gs = SyntaxError, gr = TypeError, fu = URIError, Po = typeof Symbol < "u" && Symbol, hu = Wi, du = function() {
  return typeof Po != "function" || typeof Symbol != "function" || typeof Po("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : hu();
}, Dr = {
  __proto__: null,
  foo: {}
}, pu = Object, gu = function() {
  return { __proto__: Dr }.foo === Dr.foo && !(Dr instanceof pu);
}, yu = "Function.prototype.bind called on incompatible ", mu = Object.prototype.toString, Eu = Math.max, Au = "[object Function]", Co = function(e, n) {
  for (var r = [], i = 0; i < e.length; i += 1)
    r[i] = e[i];
  for (var o = 0; o < n.length; o += 1)
    r[o + e.length] = n[o];
  return r;
}, Tu = function(e, n) {
  for (var r = [], i = n, o = 0; i < e.length; i += 1, o += 1)
    r[o] = e[i];
  return r;
}, vu = function(t, e) {
  for (var n = "", r = 0; r < t.length; r += 1)
    n += t[r], r + 1 < t.length && (n += e);
  return n;
}, Su = function(e) {
  var n = this;
  if (typeof n != "function" || mu.apply(n) !== Au)
    throw new TypeError(yu + n);
  for (var r = Tu(arguments, 1), i, o = function() {
    if (this instanceof i) {
      var p = n.apply(
        this,
        Co(r, arguments)
      );
      return Object(p) === p ? p : this;
    }
    return n.apply(
      e,
      Co(r, arguments)
    );
  }, a = Eu(0, n.length - r.length), s = [], c = 0; c < a; c++)
    s[c] = "$" + c;
  if (i = Function("binder", "return function (" + vu(s, ",") + "){ return binder.apply(this,arguments); }")(o), n.prototype) {
    var u = function() {
    };
    u.prototype = n.prototype, i.prototype = new u(), u.prototype = null;
  }
  return i;
}, Ou = Su, zi = Function.prototype.bind || Ou, Iu = Function.prototype.call, bu = Object.prototype.hasOwnProperty, Ru = zi, Nu = Ru.call(Iu, bu), Q, _u = su, wu = cu, Pu = uu, Cu = lu, tn = gs, Zt = gr, Lu = fu, ys = Function, Br = function(t) {
  try {
    return ys('"use strict"; return (' + t + ").constructor;")();
  } catch {
  }
}, Ft = Object.getOwnPropertyDescriptor;
if (Ft)
  try {
    Ft({}, "");
  } catch {
    Ft = null;
  }
var qr = function() {
  throw new Zt();
}, xu = Ft ? function() {
  try {
    return arguments.callee, qr;
  } catch {
    try {
      return Ft(arguments, "callee").get;
    } catch {
      return qr;
    }
  }
}() : qr, zt = du(), ku = gu(), Oe = Object.getPrototypeOf || (ku ? function(t) {
  return t.__proto__;
} : null), Yt = {}, Mu = typeof Uint8Array > "u" || !Oe ? Q : Oe(Uint8Array), $t = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? Q : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? Q : ArrayBuffer,
  "%ArrayIteratorPrototype%": zt && Oe ? Oe([][Symbol.iterator]()) : Q,
  "%AsyncFromSyncIteratorPrototype%": Q,
  "%AsyncFunction%": Yt,
  "%AsyncGenerator%": Yt,
  "%AsyncGeneratorFunction%": Yt,
  "%AsyncIteratorPrototype%": Yt,
  "%Atomics%": typeof Atomics > "u" ? Q : Atomics,
  "%BigInt%": typeof BigInt > "u" ? Q : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? Q : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? Q : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? Q : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": _u,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": wu,
  "%Float32Array%": typeof Float32Array > "u" ? Q : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? Q : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? Q : FinalizationRegistry,
  "%Function%": ys,
  "%GeneratorFunction%": Yt,
  "%Int8Array%": typeof Int8Array > "u" ? Q : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? Q : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? Q : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": zt && Oe ? Oe(Oe([][Symbol.iterator]())) : Q,
  "%JSON%": typeof JSON == "object" ? JSON : Q,
  "%Map%": typeof Map > "u" ? Q : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !zt || !Oe ? Q : Oe((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? Q : Promise,
  "%Proxy%": typeof Proxy > "u" ? Q : Proxy,
  "%RangeError%": Pu,
  "%ReferenceError%": Cu,
  "%Reflect%": typeof Reflect > "u" ? Q : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? Q : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !zt || !Oe ? Q : Oe((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? Q : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": zt && Oe ? Oe(""[Symbol.iterator]()) : Q,
  "%Symbol%": zt ? Symbol : Q,
  "%SyntaxError%": tn,
  "%ThrowTypeError%": xu,
  "%TypedArray%": Mu,
  "%TypeError%": Zt,
  "%Uint8Array%": typeof Uint8Array > "u" ? Q : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? Q : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? Q : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? Q : Uint32Array,
  "%URIError%": Lu,
  "%WeakMap%": typeof WeakMap > "u" ? Q : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? Q : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? Q : WeakSet
};
if (Oe)
  try {
    null.error;
  } catch (t) {
    var Fu = Oe(Oe(t));
    $t["%Error.prototype%"] = Fu;
  }
var $u = function t(e) {
  var n;
  if (e === "%AsyncFunction%")
    n = Br("async function () {}");
  else if (e === "%GeneratorFunction%")
    n = Br("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    n = Br("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var r = t("%AsyncGeneratorFunction%");
    r && (n = r.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var i = t("%AsyncGenerator%");
    i && Oe && (n = Oe(i.prototype));
  }
  return $t[e] = n, n;
}, Lo = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, In = zi, Zn = Nu, Uu = In.call(Function.call, Array.prototype.concat), ju = In.call(Function.apply, Array.prototype.splice), xo = In.call(Function.call, String.prototype.replace), Qn = In.call(Function.call, String.prototype.slice), Du = In.call(Function.call, RegExp.prototype.exec), Bu = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, qu = /\\(\\)?/g, Gu = function(e) {
  var n = Qn(e, 0, 1), r = Qn(e, -1);
  if (n === "%" && r !== "%")
    throw new tn("invalid intrinsic syntax, expected closing `%`");
  if (r === "%" && n !== "%")
    throw new tn("invalid intrinsic syntax, expected opening `%`");
  var i = [];
  return xo(e, Bu, function(o, a, s, c) {
    i[i.length] = s ? xo(c, qu, "$1") : a || o;
  }), i;
}, Wu = function(e, n) {
  var r = e, i;
  if (Zn(Lo, r) && (i = Lo[r], r = "%" + i[0] + "%"), Zn($t, r)) {
    var o = $t[r];
    if (o === Yt && (o = $u(r)), typeof o > "u" && !n)
      throw new Zt("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: i,
      name: r,
      value: o
    };
  }
  throw new tn("intrinsic " + e + " does not exist!");
}, bn = function(e, n) {
  if (typeof e != "string" || e.length === 0)
    throw new Zt("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof n != "boolean")
    throw new Zt('"allowMissing" argument must be a boolean');
  if (Du(/^%?[^%]*%?$/, e) === null)
    throw new tn("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var r = Gu(e), i = r.length > 0 ? r[0] : "", o = Wu("%" + i + "%", n), a = o.name, s = o.value, c = !1, u = o.alias;
  u && (i = u[0], ju(r, Uu([0, 1], u)));
  for (var p = 1, m = !0; p < r.length; p += 1) {
    var E = r[p], S = Qn(E, 0, 1), C = Qn(E, -1);
    if ((S === '"' || S === "'" || S === "`" || C === '"' || C === "'" || C === "`") && S !== C)
      throw new tn("property names with quotes must have matching quotes");
    if ((E === "constructor" || !m) && (c = !0), i += "." + E, a = "%" + i + "%", Zn($t, a))
      s = $t[a];
    else if (s != null) {
      if (!(E in s)) {
        if (!n)
          throw new Zt("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (Ft && p + 1 >= r.length) {
        var k = Ft(s, E);
        m = !!k, m && "get" in k && !("originalValue" in k.get) ? s = k.get : s = s[E];
      } else
        m = Zn(s, E), s = s[E];
      m && !c && ($t[a] = s);
    }
  }
  return s;
}, ms = { exports: {} }, Gr, ko;
function Hi() {
  if (ko) return Gr;
  ko = 1;
  var t = bn, e = t("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return Gr = e, Gr;
}
var Vu = bn, Bn = Vu("%Object.getOwnPropertyDescriptor%", !0);
if (Bn)
  try {
    Bn([], "length");
  } catch {
    Bn = null;
  }
var Ki = Bn, Mo = Hi(), zu = gs, Ht = gr, Fo = Ki, Es = function(e, n, r) {
  if (!e || typeof e != "object" && typeof e != "function")
    throw new Ht("`obj` must be an object or a function`");
  if (typeof n != "string" && typeof n != "symbol")
    throw new Ht("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new Ht("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new Ht("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new Ht("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new Ht("`loose`, if provided, must be a boolean");
  var i = arguments.length > 3 ? arguments[3] : null, o = arguments.length > 4 ? arguments[4] : null, a = arguments.length > 5 ? arguments[5] : null, s = arguments.length > 6 ? arguments[6] : !1, c = !!Fo && Fo(e, n);
  if (Mo)
    Mo(e, n, {
      configurable: a === null && c ? c.configurable : !a,
      enumerable: i === null && c ? c.enumerable : !i,
      value: r,
      writable: o === null && c ? c.writable : !o
    });
  else if (s || !i && !o && !a)
    e[n] = r;
  else
    throw new zu("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, Ai = Hi(), As = function() {
  return !!Ai;
};
As.hasArrayLengthDefineBug = function() {
  if (!Ai)
    return null;
  try {
    return Ai([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Ts = As, Hu = bn, $o = Es, Ku = Ts(), Uo = Ki, jo = gr, Yu = Hu("%Math.floor%"), Xu = function(e, n) {
  if (typeof e != "function")
    throw new jo("`fn` is not a function");
  if (typeof n != "number" || n < 0 || n > 4294967295 || Yu(n) !== n)
    throw new jo("`length` must be a positive 32-bit integer");
  var r = arguments.length > 2 && !!arguments[2], i = !0, o = !0;
  if ("length" in e && Uo) {
    var a = Uo(e, "length");
    a && !a.configurable && (i = !1), a && !a.writable && (o = !1);
  }
  return (i || o || !r) && (Ku ? $o(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    n,
    !0,
    !0
  ) : $o(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    n
  )), e;
};
(function(t) {
  var e = zi, n = bn, r = Xu, i = gr, o = n("%Function.prototype.apply%"), a = n("%Function.prototype.call%"), s = n("%Reflect.apply%", !0) || e.call(a, o), c = Hi(), u = n("%Math.max%");
  t.exports = function(E) {
    if (typeof E != "function")
      throw new i("a function is required");
    var S = s(e, a, arguments);
    return r(
      S,
      1 + u(0, E.length - (arguments.length - 1)),
      !0
    );
  };
  var p = function() {
    return s(e, o, arguments);
  };
  c ? c(t.exports, "apply", { value: p }) : t.exports.apply = p;
})(ms);
var yr = ms.exports, vs = bn, Ss = yr, Ju = Ss(vs("String.prototype.indexOf")), mr = function(e, n) {
  var r = vs(e, !!n);
  return typeof r == "function" && Ju(e, ".prototype.") > -1 ? Ss(r) : r;
}, Zu = Vi(), Qu = mr, Ti = Qu("Object.prototype.toString"), Er = function(e) {
  return Zu && e && typeof e == "object" && Symbol.toStringTag in e ? !1 : Ti(e) === "[object Arguments]";
}, Os = function(e) {
  return Er(e) ? !0 : e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && Ti(e) !== "[object Array]" && Ti(e.callee) === "[object Function]";
}, el = function() {
  return Er(arguments);
}();
Er.isLegacyArguments = Os;
var tl = el ? Er : Os, nl = Object.prototype.toString, rl = Function.prototype.toString, il = /^\s*(?:function)?\*/, Is = Vi(), Wr = Object.getPrototypeOf, ol = function() {
  if (!Is)
    return !1;
  try {
    return Function("return function*() {}")();
  } catch {
  }
}, Vr, al = function(e) {
  if (typeof e != "function")
    return !1;
  if (il.test(rl.call(e)))
    return !0;
  if (!Is) {
    var n = nl.call(e);
    return n === "[object GeneratorFunction]";
  }
  if (!Wr)
    return !1;
  if (typeof Vr > "u") {
    var r = ol();
    Vr = r ? Wr(r) : !1;
  }
  return Wr(e) === Vr;
}, bs = Function.prototype.toString, Xt = typeof Reflect == "object" && Reflect !== null && Reflect.apply, vi, qn;
if (typeof Xt == "function" && typeof Object.defineProperty == "function")
  try {
    vi = Object.defineProperty({}, "length", {
      get: function() {
        throw qn;
      }
    }), qn = {}, Xt(function() {
      throw 42;
    }, null, vi);
  } catch (t) {
    t !== qn && (Xt = null);
  }
else
  Xt = null;
var sl = /^\s*class\b/, Si = function(e) {
  try {
    var n = bs.call(e);
    return sl.test(n);
  } catch {
    return !1;
  }
}, zr = function(e) {
  try {
    return Si(e) ? !1 : (bs.call(e), !0);
  } catch {
    return !1;
  }
}, Gn = Object.prototype.toString, cl = "[object Object]", ul = "[object Function]", ll = "[object GeneratorFunction]", fl = "[object HTMLAllCollection]", hl = "[object HTML document.all class]", dl = "[object HTMLCollection]", pl = typeof Symbol == "function" && !!Symbol.toStringTag, gl = !(0 in [,]), Oi = function() {
  return !1;
};
if (typeof document == "object") {
  var yl = document.all;
  Gn.call(yl) === Gn.call(document.all) && (Oi = function(e) {
    if ((gl || !e) && (typeof e > "u" || typeof e == "object"))
      try {
        var n = Gn.call(e);
        return (n === fl || n === hl || n === dl || n === cl) && e("") == null;
      } catch {
      }
    return !1;
  });
}
var ml = Xt ? function(e) {
  if (Oi(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  try {
    Xt(e, null, vi);
  } catch (n) {
    if (n !== qn)
      return !1;
  }
  return !Si(e) && zr(e);
} : function(e) {
  if (Oi(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  if (pl)
    return zr(e);
  if (Si(e))
    return !1;
  var n = Gn.call(e);
  return n !== ul && n !== ll && !/^\[object HTML/.test(n) ? !1 : zr(e);
}, El = ml, Al = Object.prototype.toString, Rs = Object.prototype.hasOwnProperty, Tl = function(e, n, r) {
  for (var i = 0, o = e.length; i < o; i++)
    Rs.call(e, i) && (r == null ? n(e[i], i, e) : n.call(r, e[i], i, e));
}, vl = function(e, n, r) {
  for (var i = 0, o = e.length; i < o; i++)
    r == null ? n(e.charAt(i), i, e) : n.call(r, e.charAt(i), i, e);
}, Sl = function(e, n, r) {
  for (var i in e)
    Rs.call(e, i) && (r == null ? n(e[i], i, e) : n.call(r, e[i], i, e));
}, Ol = function(e, n, r) {
  if (!El(n))
    throw new TypeError("iterator must be a function");
  var i;
  arguments.length >= 3 && (i = r), Al.call(e) === "[object Array]" ? Tl(e, n, i) : typeof e == "string" ? vl(e, n, i) : Sl(e, n, i);
}, Il = Ol, bl = [
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array"
], Hr = bl, Rl = typeof globalThis > "u" ? us : globalThis, Nl = function() {
  for (var e = [], n = 0; n < Hr.length; n++)
    typeof Rl[Hr[n]] == "function" && (e[e.length] = Hr[n]);
  return e;
}, er = Il, _l = Nl, Do = yr, Yi = mr, Wn = Ki, wl = Yi("Object.prototype.toString"), Ns = Vi(), Bo = typeof globalThis > "u" ? us : globalThis, Ii = _l(), Xi = Yi("String.prototype.slice"), Kr = Object.getPrototypeOf, Pl = Yi("Array.prototype.indexOf", !0) || function(e, n) {
  for (var r = 0; r < e.length; r += 1)
    if (e[r] === n)
      return r;
  return -1;
}, tr = { __proto__: null };
Ns && Wn && Kr ? er(Ii, function(t) {
  var e = new Bo[t]();
  if (Symbol.toStringTag in e) {
    var n = Kr(e), r = Wn(n, Symbol.toStringTag);
    if (!r) {
      var i = Kr(n);
      r = Wn(i, Symbol.toStringTag);
    }
    tr["$" + t] = Do(r.get);
  }
}) : er(Ii, function(t) {
  var e = new Bo[t](), n = e.slice || e.set;
  n && (tr["$" + t] = Do(n));
});
var Cl = function(e) {
  var n = !1;
  return er(
    // eslint-disable-next-line no-extra-parens
    /** @type {Record<`\$${TypedArrayName}`, Getter>} */
    /** @type {any} */
    tr,
    /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
    function(r, i) {
      if (!n)
        try {
          "$" + r(e) === i && (n = Xi(i, 1));
        } catch {
        }
    }
  ), n;
}, Ll = function(e) {
  var n = !1;
  return er(
    // eslint-disable-next-line no-extra-parens
    /** @type {Record<`\$${TypedArrayName}`, Getter>} */
    /** @type {any} */
    tr,
    /** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */
    function(r, i) {
      if (!n)
        try {
          r(e), n = Xi(i, 1);
        } catch {
        }
    }
  ), n;
}, _s = function(e) {
  if (!e || typeof e != "object")
    return !1;
  if (!Ns) {
    var n = Xi(wl(e), 8, -1);
    return Pl(Ii, n) > -1 ? n : n !== "Object" ? !1 : Ll(e);
  }
  return Wn ? Cl(e) : null;
}, xl = _s, kl = function(e) {
  return !!xl(e);
};
(function(t) {
  var e = tl, n = al, r = _s, i = kl;
  function o(N) {
    return N.call.bind(N);
  }
  var a = typeof BigInt < "u", s = typeof Symbol < "u", c = o(Object.prototype.toString), u = o(Number.prototype.valueOf), p = o(String.prototype.valueOf), m = o(Boolean.prototype.valueOf);
  if (a)
    var E = o(BigInt.prototype.valueOf);
  if (s)
    var S = o(Symbol.prototype.valueOf);
  function C(N, Wt) {
    if (typeof N != "object")
      return !1;
    try {
      return Wt(N), !0;
    } catch {
      return !1;
    }
  }
  t.isArgumentsObject = e, t.isGeneratorFunction = n, t.isTypedArray = i;
  function k(N) {
    return typeof Promise < "u" && N instanceof Promise || N !== null && typeof N == "object" && typeof N.then == "function" && typeof N.catch == "function";
  }
  t.isPromise = k;
  function U(N) {
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(N) : i(N) || T(N);
  }
  t.isArrayBufferView = U;
  function w(N) {
    return r(N) === "Uint8Array";
  }
  t.isUint8Array = w;
  function A(N) {
    return r(N) === "Uint8ClampedArray";
  }
  t.isUint8ClampedArray = A;
  function y(N) {
    return r(N) === "Uint16Array";
  }
  t.isUint16Array = y;
  function I(N) {
    return r(N) === "Uint32Array";
  }
  t.isUint32Array = I;
  function x(N) {
    return r(N) === "Int8Array";
  }
  t.isInt8Array = x;
  function H(N) {
    return r(N) === "Int16Array";
  }
  t.isInt16Array = H;
  function F(N) {
    return r(N) === "Int32Array";
  }
  t.isInt32Array = F;
  function ee(N) {
    return r(N) === "Float32Array";
  }
  t.isFloat32Array = ee;
  function z(N) {
    return r(N) === "Float64Array";
  }
  t.isFloat64Array = z;
  function ie(N) {
    return r(N) === "BigInt64Array";
  }
  t.isBigInt64Array = ie;
  function oe(N) {
    return r(N) === "BigUint64Array";
  }
  t.isBigUint64Array = oe;
  function X(N) {
    return c(N) === "[object Map]";
  }
  X.working = typeof Map < "u" && X(/* @__PURE__ */ new Map());
  function ue(N) {
    return typeof Map > "u" ? !1 : X.working ? X(N) : N instanceof Map;
  }
  t.isMap = ue;
  function me(N) {
    return c(N) === "[object Set]";
  }
  me.working = typeof Set < "u" && me(/* @__PURE__ */ new Set());
  function ge(N) {
    return typeof Set > "u" ? !1 : me.working ? me(N) : N instanceof Set;
  }
  t.isSet = ge;
  function fe(N) {
    return c(N) === "[object WeakMap]";
  }
  fe.working = typeof WeakMap < "u" && fe(/* @__PURE__ */ new WeakMap());
  function Ne(N) {
    return typeof WeakMap > "u" ? !1 : fe.working ? fe(N) : N instanceof WeakMap;
  }
  t.isWeakMap = Ne;
  function Ae(N) {
    return c(N) === "[object WeakSet]";
  }
  Ae.working = typeof WeakSet < "u" && Ae(/* @__PURE__ */ new WeakSet());
  function _(N) {
    return Ae(N);
  }
  t.isWeakSet = _;
  function P(N) {
    return c(N) === "[object ArrayBuffer]";
  }
  P.working = typeof ArrayBuffer < "u" && P(new ArrayBuffer());
  function $(N) {
    return typeof ArrayBuffer > "u" ? !1 : P.working ? P(N) : N instanceof ArrayBuffer;
  }
  t.isArrayBuffer = $;
  function f(N) {
    return c(N) === "[object DataView]";
  }
  f.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && f(new DataView(new ArrayBuffer(1), 0, 1));
  function T(N) {
    return typeof DataView > "u" ? !1 : f.working ? f(N) : N instanceof DataView;
  }
  t.isDataView = T;
  var l = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
  function h(N) {
    return c(N) === "[object SharedArrayBuffer]";
  }
  function d(N) {
    return typeof l > "u" ? !1 : (typeof h.working > "u" && (h.working = h(new l())), h.working ? h(N) : N instanceof l);
  }
  t.isSharedArrayBuffer = d;
  function R(N) {
    return c(N) === "[object AsyncFunction]";
  }
  t.isAsyncFunction = R;
  function O(N) {
    return c(N) === "[object Map Iterator]";
  }
  t.isMapIterator = O;
  function b(N) {
    return c(N) === "[object Set Iterator]";
  }
  t.isSetIterator = b;
  function L(N) {
    return c(N) === "[object Generator]";
  }
  t.isGeneratorObject = L;
  function q(N) {
    return c(N) === "[object WebAssembly.Module]";
  }
  t.isWebAssemblyCompiledModule = q;
  function K(N) {
    return C(N, u);
  }
  t.isNumberObject = K;
  function Z(N) {
    return C(N, p);
  }
  t.isStringObject = Z;
  function ae(N) {
    return C(N, m);
  }
  t.isBooleanObject = ae;
  function _e(N) {
    return a && C(N, E);
  }
  t.isBigIntObject = _e;
  function bt(N) {
    return s && C(N, S);
  }
  t.isSymbolObject = bt;
  function dt(N) {
    return K(N) || Z(N) || ae(N) || _e(N) || bt(N);
  }
  t.isBoxedPrimitive = dt;
  function we(N) {
    return typeof Uint8Array < "u" && ($(N) || d(N));
  }
  t.isAnyArrayBuffer = we, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(N) {
    Object.defineProperty(t, N, {
      enumerable: !1,
      value: function() {
        throw new Error(N + " is not supported in userland");
      }
    });
  });
})(ps);
var Ml = function(e) {
  return e && typeof e == "object" && typeof e.copy == "function" && typeof e.fill == "function" && typeof e.readUInt8 == "function";
}, bi = { exports: {} };
typeof Object.create == "function" ? bi.exports = function(e, n) {
  n && (e.super_ = n, e.prototype = Object.create(n.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : bi.exports = function(e, n) {
  if (n) {
    e.super_ = n;
    var r = function() {
    };
    r.prototype = n.prototype, e.prototype = new r(), e.prototype.constructor = e;
  }
};
var Fl = bi.exports;
(function(t) {
  var e = Object.getOwnPropertyDescriptors || function(T) {
    for (var l = Object.keys(T), h = {}, d = 0; d < l.length; d++)
      h[l[d]] = Object.getOwnPropertyDescriptor(T, l[d]);
    return h;
  }, n = /%[sdj%]/g;
  t.format = function(f) {
    if (!x(f)) {
      for (var T = [], l = 0; l < arguments.length; l++)
        T.push(a(arguments[l]));
      return T.join(" ");
    }
    for (var l = 1, h = arguments, d = h.length, R = String(f).replace(n, function(b) {
      if (b === "%%") return "%";
      if (l >= d) return b;
      switch (b) {
        case "%s":
          return String(h[l++]);
        case "%d":
          return Number(h[l++]);
        case "%j":
          try {
            return JSON.stringify(h[l++]);
          } catch {
            return "[Circular]";
          }
        default:
          return b;
      }
    }), O = h[l]; l < d; O = h[++l])
      A(O) || !z(O) ? R += " " + O : R += " " + a(O);
    return R;
  }, t.deprecate = function(f, T) {
    if (typeof Ee < "u" && Ee.noDeprecation === !0)
      return f;
    if (typeof Ee > "u")
      return function() {
        return t.deprecate(f, T).apply(this, arguments);
      };
    var l = !1;
    function h() {
      if (!l) {
        if (Ee.throwDeprecation)
          throw new Error(T);
        Ee.traceDeprecation ? console.trace(T) : console.error(T), l = !0;
      }
      return f.apply(this, arguments);
    }
    return h;
  };
  var r = {}, i = /^$/;
  if (Ee.env.NODE_DEBUG) {
    var o = Ee.env.NODE_DEBUG;
    o = o.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), i = new RegExp("^" + o + "$", "i");
  }
  t.debuglog = function(f) {
    if (f = f.toUpperCase(), !r[f])
      if (i.test(f)) {
        var T = Ee.pid;
        r[f] = function() {
          var l = t.format.apply(t, arguments);
          console.error("%s %d: %s", f, T, l);
        };
      } else
        r[f] = function() {
        };
    return r[f];
  };
  function a(f, T) {
    var l = {
      seen: [],
      stylize: c
    };
    return arguments.length >= 3 && (l.depth = arguments[2]), arguments.length >= 4 && (l.colors = arguments[3]), w(T) ? l.showHidden = T : T && t._extend(l, T), F(l.showHidden) && (l.showHidden = !1), F(l.depth) && (l.depth = 2), F(l.colors) && (l.colors = !1), F(l.customInspect) && (l.customInspect = !0), l.colors && (l.stylize = s), p(l, f, l.depth);
  }
  t.inspect = a, a.colors = {
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    white: [37, 39],
    grey: [90, 39],
    black: [30, 39],
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [31, 39],
    yellow: [33, 39]
  }, a.styles = {
    special: "cyan",
    number: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    date: "magenta",
    // "name": intentionally not styling
    regexp: "red"
  };
  function s(f, T) {
    var l = a.styles[T];
    return l ? "\x1B[" + a.colors[l][0] + "m" + f + "\x1B[" + a.colors[l][1] + "m" : f;
  }
  function c(f, T) {
    return f;
  }
  function u(f) {
    var T = {};
    return f.forEach(function(l, h) {
      T[l] = !0;
    }), T;
  }
  function p(f, T, l) {
    if (f.customInspect && T && X(T.inspect) && // Filter out the util module, it's inspect function is special
    T.inspect !== t.inspect && // Also filter out any prototype objects using the circular check.
    !(T.constructor && T.constructor.prototype === T)) {
      var h = T.inspect(l, f);
      return x(h) || (h = p(f, h, l)), h;
    }
    var d = m(f, T);
    if (d)
      return d;
    var R = Object.keys(T), O = u(R);
    if (f.showHidden && (R = Object.getOwnPropertyNames(T)), oe(T) && (R.indexOf("message") >= 0 || R.indexOf("description") >= 0))
      return E(T);
    if (R.length === 0) {
      if (X(T)) {
        var b = T.name ? ": " + T.name : "";
        return f.stylize("[Function" + b + "]", "special");
      }
      if (ee(T))
        return f.stylize(RegExp.prototype.toString.call(T), "regexp");
      if (ie(T))
        return f.stylize(Date.prototype.toString.call(T), "date");
      if (oe(T))
        return E(T);
    }
    var L = "", q = !1, K = ["{", "}"];
    if (U(T) && (q = !0, K = ["[", "]"]), X(T)) {
      var Z = T.name ? ": " + T.name : "";
      L = " [Function" + Z + "]";
    }
    if (ee(T) && (L = " " + RegExp.prototype.toString.call(T)), ie(T) && (L = " " + Date.prototype.toUTCString.call(T)), oe(T) && (L = " " + E(T)), R.length === 0 && (!q || T.length == 0))
      return K[0] + L + K[1];
    if (l < 0)
      return ee(T) ? f.stylize(RegExp.prototype.toString.call(T), "regexp") : f.stylize("[Object]", "special");
    f.seen.push(T);
    var ae;
    return q ? ae = S(f, T, l, O, R) : ae = R.map(function(_e) {
      return C(f, T, l, O, _e, q);
    }), f.seen.pop(), k(ae, L, K);
  }
  function m(f, T) {
    if (F(T))
      return f.stylize("undefined", "undefined");
    if (x(T)) {
      var l = "'" + JSON.stringify(T).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return f.stylize(l, "string");
    }
    if (I(T))
      return f.stylize("" + T, "number");
    if (w(T))
      return f.stylize("" + T, "boolean");
    if (A(T))
      return f.stylize("null", "null");
  }
  function E(f) {
    return "[" + Error.prototype.toString.call(f) + "]";
  }
  function S(f, T, l, h, d) {
    for (var R = [], O = 0, b = T.length; O < b; ++O)
      Ae(T, String(O)) ? R.push(C(
        f,
        T,
        l,
        h,
        String(O),
        !0
      )) : R.push("");
    return d.forEach(function(L) {
      L.match(/^\d+$/) || R.push(C(
        f,
        T,
        l,
        h,
        L,
        !0
      ));
    }), R;
  }
  function C(f, T, l, h, d, R) {
    var O, b, L;
    if (L = Object.getOwnPropertyDescriptor(T, d) || { value: T[d] }, L.get ? L.set ? b = f.stylize("[Getter/Setter]", "special") : b = f.stylize("[Getter]", "special") : L.set && (b = f.stylize("[Setter]", "special")), Ae(h, d) || (O = "[" + d + "]"), b || (f.seen.indexOf(L.value) < 0 ? (A(l) ? b = p(f, L.value, null) : b = p(f, L.value, l - 1), b.indexOf(`
`) > -1 && (R ? b = b.split(`
`).map(function(q) {
      return "  " + q;
    }).join(`
`).slice(2) : b = `
` + b.split(`
`).map(function(q) {
      return "   " + q;
    }).join(`
`))) : b = f.stylize("[Circular]", "special")), F(O)) {
      if (R && d.match(/^\d+$/))
        return b;
      O = JSON.stringify("" + d), O.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (O = O.slice(1, -1), O = f.stylize(O, "name")) : (O = O.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), O = f.stylize(O, "string"));
    }
    return O + ": " + b;
  }
  function k(f, T, l) {
    var h = f.reduce(function(d, R) {
      return R.indexOf(`
`) >= 0, d + R.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    return h > 60 ? l[0] + (T === "" ? "" : T + `
 `) + " " + f.join(`,
  `) + " " + l[1] : l[0] + T + " " + f.join(", ") + " " + l[1];
  }
  t.types = ps;
  function U(f) {
    return Array.isArray(f);
  }
  t.isArray = U;
  function w(f) {
    return typeof f == "boolean";
  }
  t.isBoolean = w;
  function A(f) {
    return f === null;
  }
  t.isNull = A;
  function y(f) {
    return f == null;
  }
  t.isNullOrUndefined = y;
  function I(f) {
    return typeof f == "number";
  }
  t.isNumber = I;
  function x(f) {
    return typeof f == "string";
  }
  t.isString = x;
  function H(f) {
    return typeof f == "symbol";
  }
  t.isSymbol = H;
  function F(f) {
    return f === void 0;
  }
  t.isUndefined = F;
  function ee(f) {
    return z(f) && me(f) === "[object RegExp]";
  }
  t.isRegExp = ee, t.types.isRegExp = ee;
  function z(f) {
    return typeof f == "object" && f !== null;
  }
  t.isObject = z;
  function ie(f) {
    return z(f) && me(f) === "[object Date]";
  }
  t.isDate = ie, t.types.isDate = ie;
  function oe(f) {
    return z(f) && (me(f) === "[object Error]" || f instanceof Error);
  }
  t.isError = oe, t.types.isNativeError = oe;
  function X(f) {
    return typeof f == "function";
  }
  t.isFunction = X;
  function ue(f) {
    return f === null || typeof f == "boolean" || typeof f == "number" || typeof f == "string" || typeof f == "symbol" || // ES6 symbol
    typeof f > "u";
  }
  t.isPrimitive = ue, t.isBuffer = Ml;
  function me(f) {
    return Object.prototype.toString.call(f);
  }
  function ge(f) {
    return f < 10 ? "0" + f.toString(10) : f.toString(10);
  }
  var fe = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  function Ne() {
    var f = /* @__PURE__ */ new Date(), T = [
      ge(f.getHours()),
      ge(f.getMinutes()),
      ge(f.getSeconds())
    ].join(":");
    return [f.getDate(), fe[f.getMonth()], T].join(" ");
  }
  t.log = function() {
    console.log("%s - %s", Ne(), t.format.apply(t, arguments));
  }, t.inherits = Fl, t._extend = function(f, T) {
    if (!T || !z(T)) return f;
    for (var l = Object.keys(T), h = l.length; h--; )
      f[l[h]] = T[l[h]];
    return f;
  };
  function Ae(f, T) {
    return Object.prototype.hasOwnProperty.call(f, T);
  }
  var _ = typeof Symbol < "u" ? Symbol("util.promisify.custom") : void 0;
  t.promisify = function(T) {
    if (typeof T != "function")
      throw new TypeError('The "original" argument must be of type Function');
    if (_ && T[_]) {
      var l = T[_];
      if (typeof l != "function")
        throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      return Object.defineProperty(l, _, {
        value: l,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), l;
    }
    function l() {
      for (var h, d, R = new Promise(function(L, q) {
        h = L, d = q;
      }), O = [], b = 0; b < arguments.length; b++)
        O.push(arguments[b]);
      O.push(function(L, q) {
        L ? d(L) : h(q);
      });
      try {
        T.apply(this, O);
      } catch (L) {
        d(L);
      }
      return R;
    }
    return Object.setPrototypeOf(l, Object.getPrototypeOf(T)), _ && Object.defineProperty(l, _, {
      value: l,
      enumerable: !1,
      writable: !1,
      configurable: !0
    }), Object.defineProperties(
      l,
      e(T)
    );
  }, t.promisify.custom = _;
  function P(f, T) {
    if (!f) {
      var l = new Error("Promise was rejected with a falsy value");
      l.reason = f, f = l;
    }
    return T(f);
  }
  function $(f) {
    if (typeof f != "function")
      throw new TypeError('The "original" argument must be of type Function');
    function T() {
      for (var l = [], h = 0; h < arguments.length; h++)
        l.push(arguments[h]);
      var d = l.pop();
      if (typeof d != "function")
        throw new TypeError("The last argument must be of type Function");
      var R = this, O = function() {
        return d.apply(R, arguments);
      };
      f.apply(this, l).then(
        function(b) {
          Ee.nextTick(O.bind(null, null, b));
        },
        function(b) {
          Ee.nextTick(P.bind(null, b, O));
        }
      );
    }
    return Object.setPrototypeOf(T, Object.getPrototypeOf(f)), Object.defineProperties(
      T,
      e(f)
    ), T;
  }
  t.callbackify = $;
})(en);
var qo;
function ws() {
  if (qo) return jr;
  qo = 1;
  function t(A) {
    "@babel/helpers - typeof";
    return t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(y) {
      return typeof y;
    } : function(y) {
      return y && typeof Symbol == "function" && y.constructor === Symbol && y !== Symbol.prototype ? "symbol" : typeof y;
    }, t(A);
  }
  function e(A, y, I) {
    return Object.defineProperty(A, "prototype", { writable: !1 }), A;
  }
  function n(A, y) {
    if (!(A instanceof y))
      throw new TypeError("Cannot call a class as a function");
  }
  function r(A, y) {
    if (typeof y != "function" && y !== null)
      throw new TypeError("Super expression must either be null or a function");
    A.prototype = Object.create(y && y.prototype, { constructor: { value: A, writable: !0, configurable: !0 } }), Object.defineProperty(A, "prototype", { writable: !1 }), y && i(A, y);
  }
  function i(A, y) {
    return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(x, H) {
      return x.__proto__ = H, x;
    }, i(A, y);
  }
  function o(A) {
    var y = c();
    return function() {
      var x = u(A), H;
      if (y) {
        var F = u(this).constructor;
        H = Reflect.construct(x, arguments, F);
      } else
        H = x.apply(this, arguments);
      return a(this, H);
    };
  }
  function a(A, y) {
    if (y && (t(y) === "object" || typeof y == "function"))
      return y;
    if (y !== void 0)
      throw new TypeError("Derived constructors may only return object or undefined");
    return s(A);
  }
  function s(A) {
    if (A === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return A;
  }
  function c() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), !0;
    } catch {
      return !1;
    }
  }
  function u(A) {
    return u = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(I) {
      return I.__proto__ || Object.getPrototypeOf(I);
    }, u(A);
  }
  var p = {}, m, E;
  function S(A, y, I) {
    I || (I = Error);
    function x(F, ee, z) {
      return typeof y == "string" ? y : y(F, ee, z);
    }
    var H = /* @__PURE__ */ function(F) {
      r(z, F);
      var ee = o(z);
      function z(ie, oe, X) {
        var ue;
        return n(this, z), ue = ee.call(this, x(ie, oe, X)), ue.code = A, ue;
      }
      return e(z);
    }(I);
    p[A] = H;
  }
  function C(A, y) {
    if (Array.isArray(A)) {
      var I = A.length;
      return A = A.map(function(x) {
        return String(x);
      }), I > 2 ? "one of ".concat(y, " ").concat(A.slice(0, I - 1).join(", "), ", or ") + A[I - 1] : I === 2 ? "one of ".concat(y, " ").concat(A[0], " or ").concat(A[1]) : "of ".concat(y, " ").concat(A[0]);
    } else
      return "of ".concat(y, " ").concat(String(A));
  }
  function k(A, y, I) {
    return A.substr(0, y.length) === y;
  }
  function U(A, y, I) {
    return (I === void 0 || I > A.length) && (I = A.length), A.substring(I - y.length, I) === y;
  }
  function w(A, y, I) {
    return typeof I != "number" && (I = 0), I + y.length > A.length ? !1 : A.indexOf(y, I) !== -1;
  }
  return S("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError), S("ERR_INVALID_ARG_TYPE", function(A, y, I) {
    m === void 0 && (m = Ri()), m(typeof A == "string", "'name' must be a string");
    var x;
    typeof y == "string" && k(y, "not ") ? (x = "must not be", y = y.replace(/^not /, "")) : x = "must be";
    var H;
    if (U(A, " argument"))
      H = "The ".concat(A, " ").concat(x, " ").concat(C(y, "type"));
    else {
      var F = w(A, ".") ? "property" : "argument";
      H = 'The "'.concat(A, '" ').concat(F, " ").concat(x, " ").concat(C(y, "type"));
    }
    return H += ". Received type ".concat(t(I)), H;
  }, TypeError), S("ERR_INVALID_ARG_VALUE", function(A, y) {
    var I = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "is invalid";
    E === void 0 && (E = en);
    var x = E.inspect(y);
    return x.length > 128 && (x = "".concat(x.slice(0, 128), "...")), "The argument '".concat(A, "' ").concat(I, ". Received ").concat(x);
  }, TypeError), S("ERR_INVALID_RETURN_VALUE", function(A, y, I) {
    var x;
    return I && I.constructor && I.constructor.name ? x = "instance of ".concat(I.constructor.name) : x = "type ".concat(t(I)), "Expected ".concat(A, ' to be returned from the "').concat(y, '"') + " function but got ".concat(x, ".");
  }, TypeError), S("ERR_MISSING_ARGS", function() {
    for (var A = arguments.length, y = new Array(A), I = 0; I < A; I++)
      y[I] = arguments[I];
    m === void 0 && (m = Ri()), m(y.length > 0, "At least one arg needs to be specified");
    var x = "The ", H = y.length;
    switch (y = y.map(function(F) {
      return '"'.concat(F, '"');
    }), H) {
      case 1:
        x += "".concat(y[0], " argument");
        break;
      case 2:
        x += "".concat(y[0], " and ").concat(y[1], " arguments");
        break;
      default:
        x += y.slice(0, H - 1).join(", "), x += ", and ".concat(y[H - 1], " arguments");
        break;
    }
    return "".concat(x, " must be specified");
  }, TypeError), jr.codes = p, jr;
}
var Yr, Go;
function $l() {
  if (Go) return Yr;
  Go = 1;
  function t(_, P) {
    var $ = Object.keys(_);
    if (Object.getOwnPropertySymbols) {
      var f = Object.getOwnPropertySymbols(_);
      P && (f = f.filter(function(T) {
        return Object.getOwnPropertyDescriptor(_, T).enumerable;
      })), $.push.apply($, f);
    }
    return $;
  }
  function e(_) {
    for (var P = 1; P < arguments.length; P++) {
      var $ = arguments[P] != null ? arguments[P] : {};
      P % 2 ? t(Object($), !0).forEach(function(f) {
        n(_, f, $[f]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(_, Object.getOwnPropertyDescriptors($)) : t(Object($)).forEach(function(f) {
        Object.defineProperty(_, f, Object.getOwnPropertyDescriptor($, f));
      });
    }
    return _;
  }
  function n(_, P, $) {
    return P = a(P), P in _ ? Object.defineProperty(_, P, { value: $, enumerable: !0, configurable: !0, writable: !0 }) : _[P] = $, _;
  }
  function r(_, P) {
    if (!(_ instanceof P))
      throw new TypeError("Cannot call a class as a function");
  }
  function i(_, P) {
    for (var $ = 0; $ < P.length; $++) {
      var f = P[$];
      f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), Object.defineProperty(_, a(f.key), f);
    }
  }
  function o(_, P, $) {
    return P && i(_.prototype, P), Object.defineProperty(_, "prototype", { writable: !1 }), _;
  }
  function a(_) {
    var P = s(_, "string");
    return A(P) === "symbol" ? P : String(P);
  }
  function s(_, P) {
    if (A(_) !== "object" || _ === null) return _;
    var $ = _[Symbol.toPrimitive];
    if ($ !== void 0) {
      var f = $.call(_, P || "default");
      if (A(f) !== "object") return f;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (P === "string" ? String : Number)(_);
  }
  function c(_, P) {
    if (typeof P != "function" && P !== null)
      throw new TypeError("Super expression must either be null or a function");
    _.prototype = Object.create(P && P.prototype, { constructor: { value: _, writable: !0, configurable: !0 } }), Object.defineProperty(_, "prototype", { writable: !1 }), P && U(_, P);
  }
  function u(_) {
    var P = C();
    return function() {
      var f = w(_), T;
      if (P) {
        var l = w(this).constructor;
        T = Reflect.construct(f, arguments, l);
      } else
        T = f.apply(this, arguments);
      return p(this, T);
    };
  }
  function p(_, P) {
    if (P && (A(P) === "object" || typeof P == "function"))
      return P;
    if (P !== void 0)
      throw new TypeError("Derived constructors may only return object or undefined");
    return m(_);
  }
  function m(_) {
    if (_ === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return _;
  }
  function E(_) {
    var P = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
    return E = function(f) {
      if (f === null || !k(f)) return f;
      if (typeof f != "function")
        throw new TypeError("Super expression must either be null or a function");
      if (typeof P < "u") {
        if (P.has(f)) return P.get(f);
        P.set(f, T);
      }
      function T() {
        return S(f, arguments, w(this).constructor);
      }
      return T.prototype = Object.create(f.prototype, { constructor: { value: T, enumerable: !1, writable: !0, configurable: !0 } }), U(T, f);
    }, E(_);
  }
  function S(_, P, $) {
    return C() ? S = Reflect.construct.bind() : S = function(T, l, h) {
      var d = [null];
      d.push.apply(d, l);
      var R = Function.bind.apply(T, d), O = new R();
      return h && U(O, h.prototype), O;
    }, S.apply(null, arguments);
  }
  function C() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), !0;
    } catch {
      return !1;
    }
  }
  function k(_) {
    return Function.toString.call(_).indexOf("[native code]") !== -1;
  }
  function U(_, P) {
    return U = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(f, T) {
      return f.__proto__ = T, f;
    }, U(_, P);
  }
  function w(_) {
    return w = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function($) {
      return $.__proto__ || Object.getPrototypeOf($);
    }, w(_);
  }
  function A(_) {
    "@babel/helpers - typeof";
    return A = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(P) {
      return typeof P;
    } : function(P) {
      return P && typeof Symbol == "function" && P.constructor === Symbol && P !== Symbol.prototype ? "symbol" : typeof P;
    }, A(_);
  }
  var y = en, I = y.inspect, x = ws(), H = x.codes.ERR_INVALID_ARG_TYPE;
  function F(_, P, $) {
    return ($ === void 0 || $ > _.length) && ($ = _.length), _.substring($ - P.length, $) === P;
  }
  function ee(_, P) {
    if (P = Math.floor(P), _.length == 0 || P == 0) return "";
    var $ = _.length * P;
    for (P = Math.floor(Math.log(P) / Math.log(2)); P; )
      _ += _, P--;
    return _ += _.substring(0, $ - _.length), _;
  }
  var z = "", ie = "", oe = "", X = "", ue = {
    deepStrictEqual: "Expected values to be strictly deep-equal:",
    strictEqual: "Expected values to be strictly equal:",
    strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
    deepEqual: "Expected values to be loosely deep-equal:",
    equal: "Expected values to be loosely equal:",
    notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
    notStrictEqual: 'Expected "actual" to be strictly unequal to:',
    notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
    notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
    notEqual: 'Expected "actual" to be loosely unequal to:',
    notIdentical: "Values identical but not reference-equal:"
  }, me = 10;
  function ge(_) {
    var P = Object.keys(_), $ = Object.create(Object.getPrototypeOf(_));
    return P.forEach(function(f) {
      $[f] = _[f];
    }), Object.defineProperty($, "message", {
      value: _.message
    }), $;
  }
  function fe(_) {
    return I(_, {
      compact: !1,
      customInspect: !1,
      depth: 1e3,
      maxArrayLength: 1 / 0,
      // Assert compares only enumerable properties (with a few exceptions).
      showHidden: !1,
      // Having a long line as error is better than wrapping the line for
      // comparison for now.
      // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
      // have meta information about the inspected properties (i.e., know where
      // in what line the property starts and ends).
      breakLength: 1 / 0,
      // Assert does not detect proxies currently.
      showProxy: !1,
      sorted: !0,
      // Inspect getters as we also check them when comparing entries.
      getters: !0
    });
  }
  function Ne(_, P, $) {
    var f = "", T = "", l = 0, h = "", d = !1, R = fe(_), O = R.split(`
`), b = fe(P).split(`
`), L = 0, q = "";
    if ($ === "strictEqual" && A(_) === "object" && A(P) === "object" && _ !== null && P !== null && ($ = "strictEqualObject"), O.length === 1 && b.length === 1 && O[0] !== b[0]) {
      var K = O[0].length + b[0].length;
      if (K <= me) {
        if ((A(_) !== "object" || _ === null) && (A(P) !== "object" || P === null) && (_ !== 0 || P !== 0))
          return "".concat(ue[$], `

`) + "".concat(O[0], " !== ").concat(b[0], `
`);
      } else if ($ !== "strictEqualObject") {
        var Z = Ee.stderr && Ee.stderr.isTTY ? Ee.stderr.columns : 80;
        if (K < Z) {
          for (; O[0][L] === b[0][L]; )
            L++;
          L > 2 && (q = `
  `.concat(ee(" ", L), "^"), L = 0);
        }
      }
    }
    for (var ae = O[O.length - 1], _e = b[b.length - 1]; ae === _e && (L++ < 2 ? h = `
  `.concat(ae).concat(h) : f = ae, O.pop(), b.pop(), !(O.length === 0 || b.length === 0)); )
      ae = O[O.length - 1], _e = b[b.length - 1];
    var bt = Math.max(O.length, b.length);
    if (bt === 0) {
      var dt = R.split(`
`);
      if (dt.length > 30)
        for (dt[26] = "".concat(z, "...").concat(X); dt.length > 27; )
          dt.pop();
      return "".concat(ue.notIdentical, `

`).concat(dt.join(`
`), `
`);
    }
    L > 3 && (h = `
`.concat(z, "...").concat(X).concat(h), d = !0), f !== "" && (h = `
  `.concat(f).concat(h), f = "");
    var we = 0, N = ue[$] + `
`.concat(ie, "+ actual").concat(X, " ").concat(oe, "- expected").concat(X), Wt = " ".concat(z, "...").concat(X, " Lines skipped");
    for (L = 0; L < bt; L++) {
      var Fe = L - l;
      if (O.length < L + 1)
        Fe > 1 && L > 2 && (Fe > 4 ? (T += `
`.concat(z, "...").concat(X), d = !0) : Fe > 3 && (T += `
  `.concat(b[L - 2]), we++), T += `
  `.concat(b[L - 1]), we++), l = L, f += `
`.concat(oe, "-").concat(X, " ").concat(b[L]), we++;
      else if (b.length < L + 1)
        Fe > 1 && L > 2 && (Fe > 4 ? (T += `
`.concat(z, "...").concat(X), d = !0) : Fe > 3 && (T += `
  `.concat(O[L - 2]), we++), T += `
  `.concat(O[L - 1]), we++), l = L, T += `
`.concat(ie, "+").concat(X, " ").concat(O[L]), we++;
      else {
        var Lt = b[L], pt = O[L], g = pt !== Lt && (!F(pt, ",") || pt.slice(0, -1) !== Lt);
        g && F(Lt, ",") && Lt.slice(0, -1) === pt && (g = !1, pt += ","), g ? (Fe > 1 && L > 2 && (Fe > 4 ? (T += `
`.concat(z, "...").concat(X), d = !0) : Fe > 3 && (T += `
  `.concat(O[L - 2]), we++), T += `
  `.concat(O[L - 1]), we++), l = L, T += `
`.concat(ie, "+").concat(X, " ").concat(pt), f += `
`.concat(oe, "-").concat(X, " ").concat(Lt), we += 2) : (T += f, f = "", (Fe === 1 || L === 0) && (T += `
  `.concat(pt), we++));
      }
      if (we > 20 && L < bt - 2)
        return "".concat(N).concat(Wt, `
`).concat(T, `
`).concat(z, "...").concat(X).concat(f, `
`) + "".concat(z, "...").concat(X);
    }
    return "".concat(N).concat(d ? Wt : "", `
`).concat(T).concat(f).concat(h).concat(q);
  }
  var Ae = /* @__PURE__ */ function(_, P) {
    c(f, _);
    var $ = u(f);
    function f(T) {
      var l;
      if (r(this, f), A(T) !== "object" || T === null)
        throw new H("options", "Object", T);
      var h = T.message, d = T.operator, R = T.stackStartFn, O = T.actual, b = T.expected, L = Error.stackTraceLimit;
      if (Error.stackTraceLimit = 0, h != null)
        l = $.call(this, String(h));
      else if (Ee.stderr && Ee.stderr.isTTY && (Ee.stderr && Ee.stderr.getColorDepth && Ee.stderr.getColorDepth() !== 1 ? (z = "\x1B[34m", ie = "\x1B[32m", X = "\x1B[39m", oe = "\x1B[31m") : (z = "", ie = "", X = "", oe = "")), A(O) === "object" && O !== null && A(b) === "object" && b !== null && "stack" in O && O instanceof Error && "stack" in b && b instanceof Error && (O = ge(O), b = ge(b)), d === "deepStrictEqual" || d === "strictEqual")
        l = $.call(this, Ne(O, b, d));
      else if (d === "notDeepStrictEqual" || d === "notStrictEqual") {
        var q = ue[d], K = fe(O).split(`
`);
        if (d === "notStrictEqual" && A(O) === "object" && O !== null && (q = ue.notStrictEqualObject), K.length > 30)
          for (K[26] = "".concat(z, "...").concat(X); K.length > 27; )
            K.pop();
        K.length === 1 ? l = $.call(this, "".concat(q, " ").concat(K[0])) : l = $.call(this, "".concat(q, `

`).concat(K.join(`
`), `
`));
      } else {
        var Z = fe(O), ae = "", _e = ue[d];
        d === "notDeepEqual" || d === "notEqual" ? (Z = "".concat(ue[d], `

`).concat(Z), Z.length > 1024 && (Z = "".concat(Z.slice(0, 1021), "..."))) : (ae = "".concat(fe(b)), Z.length > 512 && (Z = "".concat(Z.slice(0, 509), "...")), ae.length > 512 && (ae = "".concat(ae.slice(0, 509), "...")), d === "deepEqual" || d === "equal" ? Z = "".concat(_e, `

`).concat(Z, `

should equal

`) : ae = " ".concat(d, " ").concat(ae)), l = $.call(this, "".concat(Z).concat(ae));
      }
      return Error.stackTraceLimit = L, l.generatedMessage = !h, Object.defineProperty(m(l), "name", {
        value: "AssertionError [ERR_ASSERTION]",
        enumerable: !1,
        writable: !0,
        configurable: !0
      }), l.code = "ERR_ASSERTION", l.actual = O, l.expected = b, l.operator = d, Error.captureStackTrace && Error.captureStackTrace(m(l), R), l.stack, l.name = "AssertionError", p(l);
    }
    return o(f, [{
      key: "toString",
      value: function() {
        return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
      }
    }, {
      key: P,
      value: function(l, h) {
        return I(this, e(e({}, h), {}, {
          customInspect: !1,
          depth: 0
        }));
      }
    }]), f;
  }(/* @__PURE__ */ E(Error), I.custom);
  return Yr = Ae, Yr;
}
var Wo = Object.prototype.toString, Ps = function(e) {
  var n = Wo.call(e), r = n === "[object Arguments]";
  return r || (r = n !== "[object Array]" && e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && Wo.call(e.callee) === "[object Function]"), r;
}, Xr, Vo;
function Ul() {
  if (Vo) return Xr;
  Vo = 1;
  var t;
  if (!Object.keys) {
    var e = Object.prototype.hasOwnProperty, n = Object.prototype.toString, r = Ps, i = Object.prototype.propertyIsEnumerable, o = !i.call({ toString: null }, "toString"), a = i.call(function() {
    }, "prototype"), s = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"
    ], c = function(E) {
      var S = E.constructor;
      return S && S.prototype === E;
    }, u = {
      $applicationCache: !0,
      $console: !0,
      $external: !0,
      $frame: !0,
      $frameElement: !0,
      $frames: !0,
      $innerHeight: !0,
      $innerWidth: !0,
      $onmozfullscreenchange: !0,
      $onmozfullscreenerror: !0,
      $outerHeight: !0,
      $outerWidth: !0,
      $pageXOffset: !0,
      $pageYOffset: !0,
      $parent: !0,
      $scrollLeft: !0,
      $scrollTop: !0,
      $scrollX: !0,
      $scrollY: !0,
      $self: !0,
      $webkitIndexedDB: !0,
      $webkitStorageInfo: !0,
      $window: !0
    }, p = function() {
      if (typeof window > "u")
        return !1;
      for (var E in window)
        try {
          if (!u["$" + E] && e.call(window, E) && window[E] !== null && typeof window[E] == "object")
            try {
              c(window[E]);
            } catch {
              return !0;
            }
        } catch {
          return !0;
        }
      return !1;
    }(), m = function(E) {
      if (typeof window > "u" || !p)
        return c(E);
      try {
        return c(E);
      } catch {
        return !1;
      }
    };
    t = function(S) {
      var C = S !== null && typeof S == "object", k = n.call(S) === "[object Function]", U = r(S), w = C && n.call(S) === "[object String]", A = [];
      if (!C && !k && !U)
        throw new TypeError("Object.keys called on a non-object");
      var y = a && k;
      if (w && S.length > 0 && !e.call(S, 0))
        for (var I = 0; I < S.length; ++I)
          A.push(String(I));
      if (U && S.length > 0)
        for (var x = 0; x < S.length; ++x)
          A.push(String(x));
      else
        for (var H in S)
          !(y && H === "prototype") && e.call(S, H) && A.push(String(H));
      if (o)
        for (var F = m(S), ee = 0; ee < s.length; ++ee)
          !(F && s[ee] === "constructor") && e.call(S, s[ee]) && A.push(s[ee]);
      return A;
    };
  }
  return Xr = t, Xr;
}
var jl = Array.prototype.slice, Dl = Ps, zo = Object.keys, Vn = zo ? function(e) {
  return zo(e);
} : Ul(), Ho = Object.keys;
Vn.shim = function() {
  if (Object.keys) {
    var e = function() {
      var n = Object.keys(arguments);
      return n && n.length === arguments.length;
    }(1, 2);
    e || (Object.keys = function(r) {
      return Dl(r) ? Ho(jl.call(r)) : Ho(r);
    });
  } else
    Object.keys = Vn;
  return Object.keys || Vn;
};
var Cs = Vn, Bl = Cs, Ls = Wi(), xs = mr, Ko = Object, ql = xs("Array.prototype.push"), Yo = xs("Object.prototype.propertyIsEnumerable"), Gl = Ls ? Object.getOwnPropertySymbols : null, Wl = function(e, n) {
  if (e == null)
    throw new TypeError("target must be an object");
  var r = Ko(e);
  if (arguments.length === 1)
    return r;
  for (var i = 1; i < arguments.length; ++i) {
    var o = Ko(arguments[i]), a = Bl(o), s = Ls && (Object.getOwnPropertySymbols || Gl);
    if (s)
      for (var c = s(o), u = 0; u < c.length; ++u) {
        var p = c[u];
        Yo(o, p) && ql(a, p);
      }
    for (var m = 0; m < a.length; ++m) {
      var E = a[m];
      if (Yo(o, E)) {
        var S = o[E];
        r[E] = S;
      }
    }
  }
  return r;
}, Jr = Wl, Vl = function() {
  if (!Object.assign)
    return !1;
  for (var t = "abcdefghijklmnopqrst", e = t.split(""), n = {}, r = 0; r < e.length; ++r)
    n[e[r]] = e[r];
  var i = Object.assign({}, n), o = "";
  for (var a in i)
    o += a;
  return t !== o;
}, zl = function() {
  if (!Object.assign || !Object.preventExtensions)
    return !1;
  var t = Object.preventExtensions({ 1: 2 });
  try {
    Object.assign(t, "xy");
  } catch {
    return t[1] === "y";
  }
  return !1;
}, Hl = function() {
  return !Object.assign || Vl() || zl() ? Jr : Object.assign;
}, Xo = function(t) {
  return t !== t;
}, ks = function(e, n) {
  return e === 0 && n === 0 ? 1 / e === 1 / n : !!(e === n || Xo(e) && Xo(n));
}, Kl = ks, Ji = function() {
  return typeof Object.is == "function" ? Object.is : Kl;
}, Zr, Jo;
function Ar() {
  if (Jo) return Zr;
  Jo = 1;
  var t = Cs, e = typeof Symbol == "function" && typeof Symbol("foo") == "symbol", n = Object.prototype.toString, r = Array.prototype.concat, i = Es, o = function(u) {
    return typeof u == "function" && n.call(u) === "[object Function]";
  }, a = Ts(), s = function(u, p, m, E) {
    if (p in u) {
      if (E === !0) {
        if (u[p] === m)
          return;
      } else if (!o(E) || !E())
        return;
    }
    a ? i(u, p, m, !0) : i(u, p, m);
  }, c = function(u, p) {
    var m = arguments.length > 2 ? arguments[2] : {}, E = t(p);
    e && (E = r.call(E, Object.getOwnPropertySymbols(p)));
    for (var S = 0; S < E.length; S += 1)
      s(u, E[S], p[E[S]], m[E[S]]);
  };
  return c.supportsDescriptors = !!a, Zr = c, Zr;
}
var Qr, Zo;
function Yl() {
  if (Zo) return Qr;
  Zo = 1;
  var t = Ji, e = Ar();
  return Qr = function() {
    var r = t();
    return e(Object, { is: r }, {
      is: function() {
        return Object.is !== r;
      }
    }), r;
  }, Qr;
}
var ei, Qo;
function Xl() {
  if (Qo) return ei;
  Qo = 1;
  var t = Ar(), e = yr, n = ks, r = Ji, i = Yl(), o = e(r(), Object);
  return t(o, {
    getPolyfill: r,
    implementation: n,
    shim: i
  }), ei = o, ei;
}
var ti, ea;
function Ms() {
  return ea || (ea = 1, ti = function(e) {
    return e !== e;
  }), ti;
}
var ni, ta;
function Fs() {
  if (ta) return ni;
  ta = 1;
  var t = Ms();
  return ni = function() {
    return Number.isNaN && Number.isNaN(NaN) && !Number.isNaN("a") ? Number.isNaN : t;
  }, ni;
}
var ri, na;
function Jl() {
  if (na) return ri;
  na = 1;
  var t = Ar(), e = Fs();
  return ri = function() {
    var r = e();
    return t(Number, { isNaN: r }, {
      isNaN: function() {
        return Number.isNaN !== r;
      }
    }), r;
  }, ri;
}
var ii, ra;
function Zl() {
  if (ra) return ii;
  ra = 1;
  var t = yr, e = Ar(), n = Ms(), r = Fs(), i = Jl(), o = t(r(), Number);
  return e(o, {
    getPolyfill: r,
    implementation: n,
    shim: i
  }), ii = o, ii;
}
var oi, ia;
function Ql() {
  if (ia) return oi;
  ia = 1;
  function t(g, v) {
    return o(g) || i(g, v) || n(g, v) || e();
  }
  function e() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function n(g, v) {
    if (g) {
      if (typeof g == "string") return r(g, v);
      var M = Object.prototype.toString.call(g).slice(8, -1);
      if (M === "Object" && g.constructor && (M = g.constructor.name), M === "Map" || M === "Set") return Array.from(g);
      if (M === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(M)) return r(g, v);
    }
  }
  function r(g, v) {
    (v == null || v > g.length) && (v = g.length);
    for (var M = 0, j = new Array(v); M < v; M++) j[M] = g[M];
    return j;
  }
  function i(g, v) {
    var M = g == null ? null : typeof Symbol < "u" && g[Symbol.iterator] || g["@@iterator"];
    if (M != null) {
      var j, B, J, Y, ne = [], re = !0, Ie = !1;
      try {
        if (J = (M = M.call(g)).next, v !== 0) for (; !(re = (j = J.call(M)).done) && (ne.push(j.value), ne.length !== v); re = !0) ;
      } catch (Pe) {
        Ie = !0, B = Pe;
      } finally {
        try {
          if (!re && M.return != null && (Y = M.return(), Object(Y) !== Y)) return;
        } finally {
          if (Ie) throw B;
        }
      }
      return ne;
    }
  }
  function o(g) {
    if (Array.isArray(g)) return g;
  }
  function a(g) {
    "@babel/helpers - typeof";
    return a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(v) {
      return typeof v;
    } : function(v) {
      return v && typeof Symbol == "function" && v.constructor === Symbol && v !== Symbol.prototype ? "symbol" : typeof v;
    }, a(g);
  }
  var s = /a/g.flags !== void 0, c = function(v) {
    var M = [];
    return v.forEach(function(j) {
      return M.push(j);
    }), M;
  }, u = function(v) {
    var M = [];
    return v.forEach(function(j, B) {
      return M.push([B, j]);
    }), M;
  }, p = Object.is ? Object.is : Xl(), m = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function() {
    return [];
  }, E = Number.isNaN ? Number.isNaN : Zl();
  function S(g) {
    return g.call.bind(g);
  }
  var C = S(Object.prototype.hasOwnProperty), k = S(Object.prototype.propertyIsEnumerable), U = S(Object.prototype.toString), w = en.types, A = w.isAnyArrayBuffer, y = w.isArrayBufferView, I = w.isDate, x = w.isMap, H = w.isRegExp, F = w.isSet, ee = w.isNativeError, z = w.isBoxedPrimitive, ie = w.isNumberObject, oe = w.isStringObject, X = w.isBooleanObject, ue = w.isBigIntObject, me = w.isSymbolObject, ge = w.isFloat32Array, fe = w.isFloat64Array;
  function Ne(g) {
    if (g.length === 0 || g.length > 10) return !0;
    for (var v = 0; v < g.length; v++) {
      var M = g.charCodeAt(v);
      if (M < 48 || M > 57) return !0;
    }
    return g.length === 10 && g >= Math.pow(2, 32);
  }
  function Ae(g) {
    return Object.keys(g).filter(Ne).concat(m(g).filter(Object.prototype.propertyIsEnumerable.bind(g)));
  }
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   */
  function _(g, v) {
    if (g === v)
      return 0;
    for (var M = g.length, j = v.length, B = 0, J = Math.min(M, j); B < J; ++B)
      if (g[B] !== v[B]) {
        M = g[B], j = v[B];
        break;
      }
    return M < j ? -1 : j < M ? 1 : 0;
  }
  var P = !0, $ = !1, f = 0, T = 1, l = 2, h = 3;
  function d(g, v) {
    return s ? g.source === v.source && g.flags === v.flags : RegExp.prototype.toString.call(g) === RegExp.prototype.toString.call(v);
  }
  function R(g, v) {
    if (g.byteLength !== v.byteLength)
      return !1;
    for (var M = 0; M < g.byteLength; M++)
      if (g[M] !== v[M])
        return !1;
    return !0;
  }
  function O(g, v) {
    return g.byteLength !== v.byteLength ? !1 : _(new Uint8Array(g.buffer, g.byteOffset, g.byteLength), new Uint8Array(v.buffer, v.byteOffset, v.byteLength)) === 0;
  }
  function b(g, v) {
    return g.byteLength === v.byteLength && _(new Uint8Array(g), new Uint8Array(v)) === 0;
  }
  function L(g, v) {
    return ie(g) ? ie(v) && p(Number.prototype.valueOf.call(g), Number.prototype.valueOf.call(v)) : oe(g) ? oe(v) && String.prototype.valueOf.call(g) === String.prototype.valueOf.call(v) : X(g) ? X(v) && Boolean.prototype.valueOf.call(g) === Boolean.prototype.valueOf.call(v) : ue(g) ? ue(v) && BigInt.prototype.valueOf.call(g) === BigInt.prototype.valueOf.call(v) : me(v) && Symbol.prototype.valueOf.call(g) === Symbol.prototype.valueOf.call(v);
  }
  function q(g, v, M, j) {
    if (g === v)
      return g !== 0 ? !0 : M ? p(g, v) : !0;
    if (M) {
      if (a(g) !== "object")
        return typeof g == "number" && E(g) && E(v);
      if (a(v) !== "object" || g === null || v === null || Object.getPrototypeOf(g) !== Object.getPrototypeOf(v))
        return !1;
    } else {
      if (g === null || a(g) !== "object")
        return v === null || a(v) !== "object" ? g == v : !1;
      if (v === null || a(v) !== "object")
        return !1;
    }
    var B = U(g), J = U(v);
    if (B !== J)
      return !1;
    if (Array.isArray(g)) {
      if (g.length !== v.length)
        return !1;
      var Y = Ae(g), ne = Ae(v);
      return Y.length !== ne.length ? !1 : Z(g, v, M, j, T, Y);
    }
    if (B === "[object Object]" && (!x(g) && x(v) || !F(g) && F(v)))
      return !1;
    if (I(g)) {
      if (!I(v) || Date.prototype.getTime.call(g) !== Date.prototype.getTime.call(v))
        return !1;
    } else if (H(g)) {
      if (!H(v) || !d(g, v))
        return !1;
    } else if (ee(g) || g instanceof Error) {
      if (g.message !== v.message || g.name !== v.name)
        return !1;
    } else if (y(g)) {
      if (!M && (ge(g) || fe(g))) {
        if (!R(g, v))
          return !1;
      } else if (!O(g, v))
        return !1;
      var re = Ae(g), Ie = Ae(v);
      return re.length !== Ie.length ? !1 : Z(g, v, M, j, f, re);
    } else {
      if (F(g))
        return !F(v) || g.size !== v.size ? !1 : Z(g, v, M, j, l);
      if (x(g))
        return !x(v) || g.size !== v.size ? !1 : Z(g, v, M, j, h);
      if (A(g)) {
        if (!b(g, v))
          return !1;
      } else if (z(g) && !L(g, v))
        return !1;
    }
    return Z(g, v, M, j, f);
  }
  function K(g, v) {
    return v.filter(function(M) {
      return k(g, M);
    });
  }
  function Z(g, v, M, j, B, J) {
    if (arguments.length === 5) {
      J = Object.keys(g);
      var Y = Object.keys(v);
      if (J.length !== Y.length)
        return !1;
    }
    for (var ne = 0; ne < J.length; ne++)
      if (!C(v, J[ne]))
        return !1;
    if (M && arguments.length === 5) {
      var re = m(g);
      if (re.length !== 0) {
        var Ie = 0;
        for (ne = 0; ne < re.length; ne++) {
          var Pe = re[ne];
          if (k(g, Pe)) {
            if (!k(v, Pe))
              return !1;
            J.push(Pe), Ie++;
          } else if (k(v, Pe))
            return !1;
        }
        var un = m(v);
        if (re.length !== un.length && K(v, un).length !== Ie)
          return !1;
      } else {
        var Vt = m(v);
        if (Vt.length !== 0 && K(v, Vt).length !== 0)
          return !1;
      }
    }
    if (J.length === 0 && (B === f || B === T && g.length === 0 || g.size === 0))
      return !0;
    if (j === void 0)
      j = {
        val1: /* @__PURE__ */ new Map(),
        val2: /* @__PURE__ */ new Map(),
        position: 0
      };
    else {
      var ln = j.val1.get(g);
      if (ln !== void 0) {
        var gt = j.val2.get(v);
        if (gt !== void 0)
          return ln === gt;
      }
      j.position++;
    }
    j.val1.set(g, j.position), j.val2.set(v, j.position);
    var fn = Fe(g, v, M, J, j, B);
    return j.val1.delete(g), j.val2.delete(v), fn;
  }
  function ae(g, v, M, j) {
    for (var B = c(g), J = 0; J < B.length; J++) {
      var Y = B[J];
      if (q(v, Y, M, j))
        return g.delete(Y), !0;
    }
    return !1;
  }
  function _e(g) {
    switch (a(g)) {
      case "undefined":
        return null;
      case "object":
        return;
      case "symbol":
        return !1;
      case "string":
        g = +g;
      case "number":
        if (E(g))
          return !1;
    }
    return !0;
  }
  function bt(g, v, M) {
    var j = _e(M);
    return j ?? (v.has(j) && !g.has(j));
  }
  function dt(g, v, M, j, B) {
    var J = _e(M);
    if (J != null)
      return J;
    var Y = v.get(J);
    return Y === void 0 && !v.has(J) || !q(j, Y, !1, B) ? !1 : !g.has(J) && q(j, Y, !1, B);
  }
  function we(g, v, M, j) {
    for (var B = null, J = c(g), Y = 0; Y < J.length; Y++) {
      var ne = J[Y];
      if (a(ne) === "object" && ne !== null)
        B === null && (B = /* @__PURE__ */ new Set()), B.add(ne);
      else if (!v.has(ne)) {
        if (M || !bt(g, v, ne))
          return !1;
        B === null && (B = /* @__PURE__ */ new Set()), B.add(ne);
      }
    }
    if (B !== null) {
      for (var re = c(v), Ie = 0; Ie < re.length; Ie++) {
        var Pe = re[Ie];
        if (a(Pe) === "object" && Pe !== null) {
          if (!ae(B, Pe, M, j)) return !1;
        } else if (!M && !g.has(Pe) && !ae(B, Pe, M, j))
          return !1;
      }
      return B.size === 0;
    }
    return !0;
  }
  function N(g, v, M, j, B, J) {
    for (var Y = c(g), ne = 0; ne < Y.length; ne++) {
      var re = Y[ne];
      if (q(M, re, B, J) && q(j, v.get(re), B, J))
        return g.delete(re), !0;
    }
    return !1;
  }
  function Wt(g, v, M, j) {
    for (var B = null, J = u(g), Y = 0; Y < J.length; Y++) {
      var ne = t(J[Y], 2), re = ne[0], Ie = ne[1];
      if (a(re) === "object" && re !== null)
        B === null && (B = /* @__PURE__ */ new Set()), B.add(re);
      else {
        var Pe = v.get(re);
        if (Pe === void 0 && !v.has(re) || !q(Ie, Pe, M, j)) {
          if (M || !dt(g, v, re, Ie, j)) return !1;
          B === null && (B = /* @__PURE__ */ new Set()), B.add(re);
        }
      }
    }
    if (B !== null) {
      for (var un = u(v), Vt = 0; Vt < un.length; Vt++) {
        var ln = t(un[Vt], 2), gt = ln[0], fn = ln[1];
        if (a(gt) === "object" && gt !== null) {
          if (!N(B, g, gt, fn, M, j)) return !1;
        } else if (!M && (!g.has(gt) || !q(g.get(gt), fn, !1, j)) && !N(B, g, gt, fn, !1, j))
          return !1;
      }
      return B.size === 0;
    }
    return !0;
  }
  function Fe(g, v, M, j, B, J) {
    var Y = 0;
    if (J === l) {
      if (!we(g, v, M, B))
        return !1;
    } else if (J === h) {
      if (!Wt(g, v, M, B))
        return !1;
    } else if (J === T)
      for (; Y < g.length; Y++)
        if (C(g, Y)) {
          if (!C(v, Y) || !q(g[Y], v[Y], M, B))
            return !1;
        } else {
          if (C(v, Y))
            return !1;
          for (var ne = Object.keys(g); Y < ne.length; Y++) {
            var re = ne[Y];
            if (!C(v, re) || !q(g[re], v[re], M, B))
              return !1;
          }
          return ne.length === Object.keys(v).length;
        }
    for (Y = 0; Y < j.length; Y++) {
      var Ie = j[Y];
      if (!q(g[Ie], v[Ie], M, B))
        return !1;
    }
    return !0;
  }
  function Lt(g, v) {
    return q(g, v, $);
  }
  function pt(g, v) {
    return q(g, v, P);
  }
  return oi = {
    isDeepEqual: Lt,
    isDeepStrictEqual: pt
  }, oi;
}
var oa;
function Ri() {
  if (oa) return Ur.exports;
  oa = 1;
  function t(l) {
    "@babel/helpers - typeof";
    return t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(h) {
      return typeof h;
    } : function(h) {
      return h && typeof Symbol == "function" && h.constructor === Symbol && h !== Symbol.prototype ? "symbol" : typeof h;
    }, t(l);
  }
  function e(l, h, d) {
    return Object.defineProperty(l, "prototype", { writable: !1 }), l;
  }
  function n(l, h) {
    if (!(l instanceof h))
      throw new TypeError("Cannot call a class as a function");
  }
  var r = ws(), i = r.codes, o = i.ERR_AMBIGUOUS_ARGUMENT, a = i.ERR_INVALID_ARG_TYPE, s = i.ERR_INVALID_ARG_VALUE, c = i.ERR_INVALID_RETURN_VALUE, u = i.ERR_MISSING_ARGS, p = $l(), m = en, E = m.inspect, S = en.types, C = S.isPromise, k = S.isRegExp, U = Hl(), w = Ji(), A = mr("RegExp.prototype.test"), y, I;
  function x() {
    var l = Ql();
    y = l.isDeepEqual, I = l.isDeepStrictEqual;
  }
  var H = !1, F = Ur.exports = X, ee = {};
  function z(l) {
    throw l.message instanceof Error ? l.message : new p(l);
  }
  function ie(l, h, d, R, O) {
    var b = arguments.length, L;
    if (b === 0)
      L = "Failed";
    else if (b === 1)
      d = l, l = void 0;
    else {
      if (H === !1) {
        H = !0;
        var q = Ee.emitWarning ? Ee.emitWarning : console.warn.bind(console);
        q("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094");
      }
      b === 2 && (R = "!=");
    }
    if (d instanceof Error) throw d;
    var K = {
      actual: l,
      expected: h,
      operator: R === void 0 ? "fail" : R,
      stackStartFn: O || ie
    };
    d !== void 0 && (K.message = d);
    var Z = new p(K);
    throw L && (Z.message = L, Z.generatedMessage = !0), Z;
  }
  F.fail = ie, F.AssertionError = p;
  function oe(l, h, d, R) {
    if (!d) {
      var O = !1;
      if (h === 0)
        O = !0, R = "No value argument passed to `assert.ok()`";
      else if (R instanceof Error)
        throw R;
      var b = new p({
        actual: d,
        expected: !0,
        message: R,
        operator: "==",
        stackStartFn: l
      });
      throw b.generatedMessage = O, b;
    }
  }
  function X() {
    for (var l = arguments.length, h = new Array(l), d = 0; d < l; d++)
      h[d] = arguments[d];
    oe.apply(void 0, [X, h.length].concat(h));
  }
  F.ok = X, F.equal = function l(h, d, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    h != d && z({
      actual: h,
      expected: d,
      message: R,
      operator: "==",
      stackStartFn: l
    });
  }, F.notEqual = function l(h, d, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    h == d && z({
      actual: h,
      expected: d,
      message: R,
      operator: "!=",
      stackStartFn: l
    });
  }, F.deepEqual = function l(h, d, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    y === void 0 && x(), y(h, d) || z({
      actual: h,
      expected: d,
      message: R,
      operator: "deepEqual",
      stackStartFn: l
    });
  }, F.notDeepEqual = function l(h, d, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    y === void 0 && x(), y(h, d) && z({
      actual: h,
      expected: d,
      message: R,
      operator: "notDeepEqual",
      stackStartFn: l
    });
  }, F.deepStrictEqual = function l(h, d, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    y === void 0 && x(), I(h, d) || z({
      actual: h,
      expected: d,
      message: R,
      operator: "deepStrictEqual",
      stackStartFn: l
    });
  }, F.notDeepStrictEqual = ue;
  function ue(l, h, d) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    y === void 0 && x(), I(l, h) && z({
      actual: l,
      expected: h,
      message: d,
      operator: "notDeepStrictEqual",
      stackStartFn: ue
    });
  }
  F.strictEqual = function l(h, d, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    w(h, d) || z({
      actual: h,
      expected: d,
      message: R,
      operator: "strictEqual",
      stackStartFn: l
    });
  }, F.notStrictEqual = function l(h, d, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    w(h, d) && z({
      actual: h,
      expected: d,
      message: R,
      operator: "notStrictEqual",
      stackStartFn: l
    });
  };
  var me = /* @__PURE__ */ e(function l(h, d, R) {
    var O = this;
    n(this, l), d.forEach(function(b) {
      b in h && (R !== void 0 && typeof R[b] == "string" && k(h[b]) && A(h[b], R[b]) ? O[b] = R[b] : O[b] = h[b]);
    });
  });
  function ge(l, h, d, R, O, b) {
    if (!(d in l) || !I(l[d], h[d])) {
      if (!R) {
        var L = new me(l, O), q = new me(h, O, l), K = new p({
          actual: L,
          expected: q,
          operator: "deepStrictEqual",
          stackStartFn: b
        });
        throw K.actual = l, K.expected = h, K.operator = b.name, K;
      }
      z({
        actual: l,
        expected: h,
        message: R,
        operator: b.name,
        stackStartFn: b
      });
    }
  }
  function fe(l, h, d, R) {
    if (typeof h != "function") {
      if (k(h)) return A(h, l);
      if (arguments.length === 2)
        throw new a("expected", ["Function", "RegExp"], h);
      if (t(l) !== "object" || l === null) {
        var O = new p({
          actual: l,
          expected: h,
          message: d,
          operator: "deepStrictEqual",
          stackStartFn: R
        });
        throw O.operator = R.name, O;
      }
      var b = Object.keys(h);
      if (h instanceof Error)
        b.push("name", "message");
      else if (b.length === 0)
        throw new s("error", h, "may not be an empty object");
      return y === void 0 && x(), b.forEach(function(L) {
        typeof l[L] == "string" && k(h[L]) && A(h[L], l[L]) || ge(l, h, L, d, b, R);
      }), !0;
    }
    return h.prototype !== void 0 && l instanceof h ? !0 : Error.isPrototypeOf(h) ? !1 : h.call({}, l) === !0;
  }
  function Ne(l) {
    if (typeof l != "function")
      throw new a("fn", "Function", l);
    try {
      l();
    } catch (h) {
      return h;
    }
    return ee;
  }
  function Ae(l) {
    return C(l) || l !== null && t(l) === "object" && typeof l.then == "function" && typeof l.catch == "function";
  }
  function _(l) {
    return Promise.resolve().then(function() {
      var h;
      if (typeof l == "function") {
        if (h = l(), !Ae(h))
          throw new c("instance of Promise", "promiseFn", h);
      } else if (Ae(l))
        h = l;
      else
        throw new a("promiseFn", ["Function", "Promise"], l);
      return Promise.resolve().then(function() {
        return h;
      }).then(function() {
        return ee;
      }).catch(function(d) {
        return d;
      });
    });
  }
  function P(l, h, d, R) {
    if (typeof d == "string") {
      if (arguments.length === 4)
        throw new a("error", ["Object", "Error", "Function", "RegExp"], d);
      if (t(h) === "object" && h !== null) {
        if (h.message === d)
          throw new o("error/message", 'The error message "'.concat(h.message, '" is identical to the message.'));
      } else if (h === d)
        throw new o("error/message", 'The error "'.concat(h, '" is identical to the message.'));
      R = d, d = void 0;
    } else if (d != null && t(d) !== "object" && typeof d != "function")
      throw new a("error", ["Object", "Error", "Function", "RegExp"], d);
    if (h === ee) {
      var O = "";
      d && d.name && (O += " (".concat(d.name, ")")), O += R ? ": ".concat(R) : ".";
      var b = l.name === "rejects" ? "rejection" : "exception";
      z({
        actual: void 0,
        expected: d,
        operator: l.name,
        message: "Missing expected ".concat(b).concat(O),
        stackStartFn: l
      });
    }
    if (d && !fe(h, d, R, l))
      throw h;
  }
  function $(l, h, d, R) {
    if (h !== ee) {
      if (typeof d == "string" && (R = d, d = void 0), !d || fe(h, d)) {
        var O = R ? ": ".concat(R) : ".", b = l.name === "doesNotReject" ? "rejection" : "exception";
        z({
          actual: h,
          expected: d,
          operator: l.name,
          message: "Got unwanted ".concat(b).concat(O, `
`) + 'Actual message: "'.concat(h && h.message, '"'),
          stackStartFn: l
        });
      }
      throw h;
    }
  }
  F.throws = function l(h) {
    for (var d = arguments.length, R = new Array(d > 1 ? d - 1 : 0), O = 1; O < d; O++)
      R[O - 1] = arguments[O];
    P.apply(void 0, [l, Ne(h)].concat(R));
  }, F.rejects = function l(h) {
    for (var d = arguments.length, R = new Array(d > 1 ? d - 1 : 0), O = 1; O < d; O++)
      R[O - 1] = arguments[O];
    return _(h).then(function(b) {
      return P.apply(void 0, [l, b].concat(R));
    });
  }, F.doesNotThrow = function l(h) {
    for (var d = arguments.length, R = new Array(d > 1 ? d - 1 : 0), O = 1; O < d; O++)
      R[O - 1] = arguments[O];
    $.apply(void 0, [l, Ne(h)].concat(R));
  }, F.doesNotReject = function l(h) {
    for (var d = arguments.length, R = new Array(d > 1 ? d - 1 : 0), O = 1; O < d; O++)
      R[O - 1] = arguments[O];
    return _(h).then(function(b) {
      return $.apply(void 0, [l, b].concat(R));
    });
  }, F.ifError = function l(h) {
    if (h != null) {
      var d = "ifError got unwanted exception: ";
      t(h) === "object" && typeof h.message == "string" ? h.message.length === 0 && h.constructor ? d += h.constructor.name : d += h.message : d += E(h);
      var R = new p({
        actual: h,
        expected: null,
        operator: "ifError",
        message: d,
        stackStartFn: l
      }), O = h.stack;
      if (typeof O == "string") {
        var b = O.split(`
`);
        b.shift();
        for (var L = R.stack.split(`
`), q = 0; q < b.length; q++) {
          var K = L.indexOf(b[q]);
          if (K !== -1) {
            L = L.slice(0, K);
            break;
          }
        }
        R.stack = "".concat(L.join(`
`), `
`).concat(b.join(`
`));
      }
      throw R;
    }
  };
  function f(l, h, d, R, O) {
    if (!k(h))
      throw new a("regexp", "RegExp", h);
    var b = O === "match";
    if (typeof l != "string" || A(h, l) !== b) {
      if (d instanceof Error)
        throw d;
      var L = !d;
      d = d || (typeof l != "string" ? 'The "string" argument must be of type string. Received type ' + "".concat(t(l), " (").concat(E(l), ")") : (b ? "The input did not match the regular expression " : "The input was expected to not match the regular expression ") + "".concat(E(h), `. Input:

`).concat(E(l), `
`));
      var q = new p({
        actual: l,
        expected: h,
        message: d,
        operator: O,
        stackStartFn: R
      });
      throw q.generatedMessage = L, q;
    }
  }
  F.match = function l(h, d, R) {
    f(h, d, R, l, "match");
  }, F.doesNotMatch = function l(h, d, R) {
    f(h, d, R, l, "doesNotMatch");
  };
  function T() {
    for (var l = arguments.length, h = new Array(l), d = 0; d < l; d++)
      h[d] = arguments[d];
    oe.apply(void 0, [T, h.length].concat(h));
  }
  return F.strict = U(T, F, {
    equal: F.strictEqual,
    deepEqual: F.deepStrictEqual,
    notEqual: F.notStrictEqual,
    notDeepEqual: F.notDeepStrictEqual
  }), F.strict.strict = F.strict, Ur.exports;
}
var ef = Ri();
const $s = /* @__PURE__ */ tu(ef), gA = "aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc", tf = 0, yA = 1, mA = 2, EA = 3, AA = 4, TA = 5, vA = 6, nf = 360n, SA = 10n, rf = 10000n, of = 0n, OA = 16n, IA = 8n, af = "v1", sf = "spectre", Us = "staking";
function Zi(t, e, n) {
  return `${e}_${t}_${af}${mt.programSuffix ? "_" + mt.programSuffix : ""}${n ? "_" + n : ""}.aleo`;
}
function js(t) {
  return Zi(t, sf);
}
function Ds(t) {
  return Zi(t, Us);
}
const bA = () => js(mt.programs.spectre.accessControl), RA = () => js(mt.programs.spectre.aclManager), cf = () => Ds(mt.programs.staking.stcredits), NA = () => Ds(mt.programs.staking.stcreditsPoints);
function _A(t) {
  const e = (t + 1).toString().padStart(3, "0");
  return Zi(mt.programs.staking.delegator, Us, e);
}
let mt;
function wA(t) {
  $s(!mt), mt = t;
}
const kn = globalThis || void 0 || self;
var Bs = typeof kn == "object" && kn && kn.Object === Object && kn, uf = typeof self == "object" && self && self.Object === Object && self, st = Bs || uf || Function("return this")(), Ve = st.Symbol, qs = Object.prototype, lf = qs.hasOwnProperty, ff = qs.toString, hn = Ve ? Ve.toStringTag : void 0;
function hf(t) {
  var e = lf.call(t, hn), n = t[hn];
  try {
    t[hn] = void 0;
    var r = !0;
  } catch {
  }
  var i = ff.call(t);
  return r && (e ? t[hn] = n : delete t[hn]), i;
}
var df = Object.prototype, pf = df.toString;
function gf(t) {
  return pf.call(t);
}
var yf = "[object Null]", mf = "[object Undefined]", aa = Ve ? Ve.toStringTag : void 0;
function wt(t) {
  return t == null ? t === void 0 ? mf : yf : aa && aa in Object(t) ? hf(t) : gf(t);
}
function Je(t) {
  return t != null && typeof t == "object";
}
var Ef = "[object Symbol]";
function Tr(t) {
  return typeof t == "symbol" || Je(t) && wt(t) == Ef;
}
function vr(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, i = Array(r); ++n < r; )
    i[n] = e(t[n], n, t);
  return i;
}
var te = Array.isArray, Af = 1 / 0, sa = Ve ? Ve.prototype : void 0, ca = sa ? sa.toString : void 0;
function Gs(t) {
  if (typeof t == "string")
    return t;
  if (te(t))
    return vr(t, Gs) + "";
  if (Tr(t))
    return ca ? ca.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -Af ? "-0" : e;
}
var Tf = /\s/;
function vf(t) {
  for (var e = t.length; e-- && Tf.test(t.charAt(e)); )
    ;
  return e;
}
var Sf = /^\s+/;
function Of(t) {
  return t && t.slice(0, vf(t) + 1).replace(Sf, "");
}
function ze(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var ua = NaN, If = /^[-+]0x[0-9a-f]+$/i, bf = /^0b[01]+$/i, Rf = /^0o[0-7]+$/i, Nf = parseInt;
function _f(t) {
  if (typeof t == "number")
    return t;
  if (Tr(t))
    return ua;
  if (ze(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = ze(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = Of(t);
  var n = bf.test(t);
  return n || Rf.test(t) ? Nf(t.slice(2), n ? 2 : 8) : If.test(t) ? ua : +t;
}
var la = 1 / 0, wf = 17976931348623157e292;
function Pf(t) {
  if (!t)
    return t === 0 ? t : 0;
  if (t = _f(t), t === la || t === -la) {
    var e = t < 0 ? -1 : 1;
    return e * wf;
  }
  return t === t ? t : 0;
}
function Sr(t) {
  var e = Pf(t), n = e % 1;
  return e === e ? n ? e - n : e : 0;
}
function nn(t) {
  return t;
}
var Cf = "[object AsyncFunction]", Lf = "[object Function]", xf = "[object GeneratorFunction]", kf = "[object Proxy]";
function St(t) {
  if (!ze(t))
    return !1;
  var e = wt(t);
  return e == Lf || e == xf || e == Cf || e == kf;
}
var ai = st["__core-js_shared__"], fa = function() {
  var t = /[^.]+$/.exec(ai && ai.keys && ai.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Mf(t) {
  return !!fa && fa in t;
}
var Ff = Function.prototype, $f = Ff.toString;
function Bt(t) {
  if (t != null) {
    try {
      return $f.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Uf = /[\\^$.*+?()[\]{}|]/g, jf = /^\[object .+?Constructor\]$/, Df = Function.prototype, Bf = Object.prototype, qf = Df.toString, Gf = Bf.hasOwnProperty, Wf = RegExp(
  "^" + qf.call(Gf).replace(Uf, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Vf(t) {
  if (!ze(t) || Mf(t))
    return !1;
  var e = St(t) ? Wf : jf;
  return e.test(Bt(t));
}
function zf(t, e) {
  return t?.[e];
}
function qt(t, e) {
  var n = zf(t, e);
  return Vf(n) ? n : void 0;
}
var Ni = qt(st, "WeakMap"), ha = Object.create, Hf = /* @__PURE__ */ function() {
  function t() {
  }
  return function(e) {
    if (!ze(e))
      return {};
    if (ha)
      return ha(e);
    t.prototype = e;
    var n = new t();
    return t.prototype = void 0, n;
  };
}();
function Kf(t, e, n) {
  switch (n.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, n[0]);
    case 2:
      return t.call(e, n[0], n[1]);
    case 3:
      return t.call(e, n[0], n[1], n[2]);
  }
  return t.apply(e, n);
}
function Te() {
}
function Yf(t, e) {
  var n = -1, r = t.length;
  for (e || (e = Array(r)); ++n < r; )
    e[n] = t[n];
  return e;
}
var Xf = 800, Jf = 16, Zf = Date.now;
function Qf(t) {
  var e = 0, n = 0;
  return function() {
    var r = Zf(), i = Jf - (r - n);
    if (n = r, i > 0) {
      if (++e >= Xf)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
function eh(t) {
  return function() {
    return t;
  };
}
var nr = function() {
  try {
    var t = qt(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}(), th = nr ? function(t, e) {
  return nr(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: eh(e),
    writable: !0
  });
} : nn, nh = Qf(th);
function Ws(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r && e(t[n], n, t) !== !1; )
    ;
  return t;
}
function Vs(t, e, n, r) {
  for (var i = t.length, o = n + -1; ++o < i; )
    if (e(t[o], o, t))
      return o;
  return -1;
}
function rh(t) {
  return t !== t;
}
function ih(t, e, n) {
  for (var r = n - 1, i = t.length; ++r < i; )
    if (t[r] === e)
      return r;
  return -1;
}
function Qi(t, e, n) {
  return e === e ? ih(t, e, n) : Vs(t, rh, n);
}
function zs(t, e) {
  var n = t == null ? 0 : t.length;
  return !!n && Qi(t, e, 0) > -1;
}
var oh = 9007199254740991, ah = /^(?:0|[1-9]\d*)$/;
function Or(t, e) {
  var n = typeof t;
  return e = e ?? oh, !!e && (n == "number" || n != "symbol" && ah.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function eo(t, e, n) {
  e == "__proto__" && nr ? nr(t, e, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : t[e] = n;
}
function Rn(t, e) {
  return t === e || t !== t && e !== e;
}
var sh = Object.prototype, ch = sh.hasOwnProperty;
function Ir(t, e, n) {
  var r = t[e];
  (!(ch.call(t, e) && Rn(r, n)) || n === void 0 && !(e in t)) && eo(t, e, n);
}
function to(t, e, n, r) {
  var i = !n;
  n || (n = {});
  for (var o = -1, a = e.length; ++o < a; ) {
    var s = e[o], c = void 0;
    c === void 0 && (c = t[s]), i ? eo(n, s, c) : Ir(n, s, c);
  }
  return n;
}
var da = Math.max;
function uh(t, e, n) {
  return e = da(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var r = arguments, i = -1, o = da(r.length - e, 0), a = Array(o); ++i < o; )
      a[i] = r[e + i];
    i = -1;
    for (var s = Array(e + 1); ++i < e; )
      s[i] = r[i];
    return s[e] = n(a), Kf(t, this, s);
  };
}
function no(t, e) {
  return nh(uh(t, e, nn), t + "");
}
var lh = 9007199254740991;
function ro(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= lh;
}
function ct(t) {
  return t != null && ro(t.length) && !St(t);
}
function Hs(t, e, n) {
  if (!ze(n))
    return !1;
  var r = typeof e;
  return (r == "number" ? ct(n) && Or(e, n.length) : r == "string" && e in n) ? Rn(n[e], t) : !1;
}
function fh(t) {
  return no(function(e, n) {
    var r = -1, i = n.length, o = i > 1 ? n[i - 1] : void 0, a = i > 2 ? n[2] : void 0;
    for (o = t.length > 3 && typeof o == "function" ? (i--, o) : void 0, a && Hs(n[0], n[1], a) && (o = i < 3 ? void 0 : o, i = 1), e = Object(e); ++r < i; ) {
      var s = n[r];
      s && t(e, s, r, o);
    }
    return e;
  });
}
var hh = Object.prototype;
function Nn(t) {
  var e = t && t.constructor, n = typeof e == "function" && e.prototype || hh;
  return t === n;
}
function dh(t, e) {
  for (var n = -1, r = Array(t); ++n < t; )
    r[n] = e(n);
  return r;
}
var ph = "[object Arguments]";
function pa(t) {
  return Je(t) && wt(t) == ph;
}
var Ks = Object.prototype, gh = Ks.hasOwnProperty, yh = Ks.propertyIsEnumerable, br = pa(/* @__PURE__ */ function() {
  return arguments;
}()) ? pa : function(t) {
  return Je(t) && gh.call(t, "callee") && !yh.call(t, "callee");
};
function mh() {
  return !1;
}
var Ys = typeof exports == "object" && exports && !exports.nodeType && exports, ga = Ys && typeof module == "object" && module && !module.nodeType && module, Eh = ga && ga.exports === Ys, ya = Eh ? st.Buffer : void 0, Ah = ya ? ya.isBuffer : void 0, Tn = Ah || mh, Th = "[object Arguments]", vh = "[object Array]", Sh = "[object Boolean]", Oh = "[object Date]", Ih = "[object Error]", bh = "[object Function]", Rh = "[object Map]", Nh = "[object Number]", _h = "[object Object]", wh = "[object RegExp]", Ph = "[object Set]", Ch = "[object String]", Lh = "[object WeakMap]", xh = "[object ArrayBuffer]", kh = "[object DataView]", Mh = "[object Float32Array]", Fh = "[object Float64Array]", $h = "[object Int8Array]", Uh = "[object Int16Array]", jh = "[object Int32Array]", Dh = "[object Uint8Array]", Bh = "[object Uint8ClampedArray]", qh = "[object Uint16Array]", Gh = "[object Uint32Array]", le = {};
le[Mh] = le[Fh] = le[$h] = le[Uh] = le[jh] = le[Dh] = le[Bh] = le[qh] = le[Gh] = !0;
le[Th] = le[vh] = le[xh] = le[Sh] = le[kh] = le[Oh] = le[Ih] = le[bh] = le[Rh] = le[Nh] = le[_h] = le[wh] = le[Ph] = le[Ch] = le[Lh] = !1;
function Wh(t) {
  return Je(t) && ro(t.length) && !!le[wt(t)];
}
function Rr(t) {
  return function(e) {
    return t(e);
  };
}
var Xs = typeof exports == "object" && exports && !exports.nodeType && exports, En = Xs && typeof module == "object" && module && !module.nodeType && module, Vh = En && En.exports === Xs, si = Vh && Bs.process, Nt = function() {
  try {
    var t = En && En.require && En.require("util").types;
    return t || si && si.binding && si.binding("util");
  } catch {
  }
}(), ma = Nt && Nt.isTypedArray, io = ma ? Rr(ma) : Wh, zh = Object.prototype, Hh = zh.hasOwnProperty;
function Js(t, e) {
  var n = te(t), r = !n && br(t), i = !n && !r && Tn(t), o = !n && !r && !i && io(t), a = n || r || i || o, s = a ? dh(t.length, String) : [], c = s.length;
  for (var u in t)
    (e || Hh.call(t, u)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    Or(u, c))) && s.push(u);
  return s;
}
function Zs(t, e) {
  return function(n) {
    return t(e(n));
  };
}
var Kh = Zs(Object.keys, Object), Yh = Object.prototype, Xh = Yh.hasOwnProperty;
function Qs(t) {
  if (!Nn(t))
    return Kh(t);
  var e = [];
  for (var n in Object(t))
    Xh.call(t, n) && n != "constructor" && e.push(n);
  return e;
}
function He(t) {
  return ct(t) ? Js(t) : Qs(t);
}
var Jh = Object.prototype, Zh = Jh.hasOwnProperty, Ue = fh(function(t, e) {
  if (Nn(e) || ct(e)) {
    to(e, He(e), t);
    return;
  }
  for (var n in e)
    Zh.call(e, n) && Ir(t, n, e[n]);
});
function Qh(t) {
  var e = [];
  if (t != null)
    for (var n in Object(t))
      e.push(n);
  return e;
}
var ed = Object.prototype, td = ed.hasOwnProperty;
function nd(t) {
  if (!ze(t))
    return Qh(t);
  var e = Nn(t), n = [];
  for (var r in t)
    r == "constructor" && (e || !td.call(t, r)) || n.push(r);
  return n;
}
function ec(t) {
  return ct(t) ? Js(t, !0) : nd(t);
}
var rd = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, id = /^\w*$/;
function oo(t, e) {
  if (te(t))
    return !1;
  var n = typeof t;
  return n == "number" || n == "symbol" || n == "boolean" || t == null || Tr(t) ? !0 : id.test(t) || !rd.test(t) || e != null && t in Object(e);
}
var vn = qt(Object, "create");
function od() {
  this.__data__ = vn ? vn(null) : {}, this.size = 0;
}
function ad(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var sd = "__lodash_hash_undefined__", cd = Object.prototype, ud = cd.hasOwnProperty;
function ld(t) {
  var e = this.__data__;
  if (vn) {
    var n = e[t];
    return n === sd ? void 0 : n;
  }
  return ud.call(e, t) ? e[t] : void 0;
}
var fd = Object.prototype, hd = fd.hasOwnProperty;
function dd(t) {
  var e = this.__data__;
  return vn ? e[t] !== void 0 : hd.call(e, t);
}
var pd = "__lodash_hash_undefined__";
function gd(t, e) {
  var n = this.__data__;
  return this.size += this.has(t) ? 0 : 1, n[t] = vn && e === void 0 ? pd : e, this;
}
function Ut(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Ut.prototype.clear = od;
Ut.prototype.delete = ad;
Ut.prototype.get = ld;
Ut.prototype.has = dd;
Ut.prototype.set = gd;
function yd() {
  this.__data__ = [], this.size = 0;
}
function Nr(t, e) {
  for (var n = t.length; n--; )
    if (Rn(t[n][0], e))
      return n;
  return -1;
}
var md = Array.prototype, Ed = md.splice;
function Ad(t) {
  var e = this.__data__, n = Nr(e, t);
  if (n < 0)
    return !1;
  var r = e.length - 1;
  return n == r ? e.pop() : Ed.call(e, n, 1), --this.size, !0;
}
function Td(t) {
  var e = this.__data__, n = Nr(e, t);
  return n < 0 ? void 0 : e[n][1];
}
function vd(t) {
  return Nr(this.__data__, t) > -1;
}
function Sd(t, e) {
  var n = this.__data__, r = Nr(n, t);
  return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this;
}
function Ot(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Ot.prototype.clear = yd;
Ot.prototype.delete = Ad;
Ot.prototype.get = Td;
Ot.prototype.has = vd;
Ot.prototype.set = Sd;
var Sn = qt(st, "Map");
function Od() {
  this.size = 0, this.__data__ = {
    hash: new Ut(),
    map: new (Sn || Ot)(),
    string: new Ut()
  };
}
function Id(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function _r(t, e) {
  var n = t.__data__;
  return Id(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
}
function bd(t) {
  var e = _r(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function Rd(t) {
  return _r(this, t).get(t);
}
function Nd(t) {
  return _r(this, t).has(t);
}
function _d(t, e) {
  var n = _r(this, t), r = n.size;
  return n.set(t, e), this.size += n.size == r ? 0 : 1, this;
}
function It(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
It.prototype.clear = Od;
It.prototype.delete = bd;
It.prototype.get = Rd;
It.prototype.has = Nd;
It.prototype.set = _d;
var wd = "Expected a function";
function ao(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(wd);
  var n = function() {
    var r = arguments, i = e ? e.apply(this, r) : r[0], o = n.cache;
    if (o.has(i))
      return o.get(i);
    var a = t.apply(this, r);
    return n.cache = o.set(i, a) || o, a;
  };
  return n.cache = new (ao.Cache || It)(), n;
}
ao.Cache = It;
var Pd = 500;
function Cd(t) {
  var e = ao(t, function(r) {
    return n.size === Pd && n.clear(), r;
  }), n = e.cache;
  return e;
}
var Ld = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, xd = /\\(\\)?/g, kd = Cd(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(Ld, function(n, r, i, o) {
    e.push(i ? o.replace(xd, "$1") : r || n);
  }), e;
});
function Md(t) {
  return t == null ? "" : Gs(t);
}
function wr(t, e) {
  return te(t) ? t : oo(t, e) ? [t] : kd(Md(t));
}
var Fd = 1 / 0;
function _n(t) {
  if (typeof t == "string" || Tr(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -Fd ? "-0" : e;
}
function so(t, e) {
  e = wr(e, t);
  for (var n = 0, r = e.length; t != null && n < r; )
    t = t[_n(e[n++])];
  return n && n == r ? t : void 0;
}
function $d(t, e, n) {
  var r = t == null ? void 0 : so(t, e);
  return r === void 0 ? n : r;
}
function co(t, e) {
  for (var n = -1, r = e.length, i = t.length; ++n < r; )
    t[i + n] = e[n];
  return t;
}
var Ea = Ve ? Ve.isConcatSpreadable : void 0;
function Ud(t) {
  return te(t) || br(t) || !!(Ea && t && t[Ea]);
}
function uo(t, e, n, r, i) {
  var o = -1, a = t.length;
  for (n || (n = Ud), i || (i = []); ++o < a; ) {
    var s = t[o];
    n(s) ? co(i, s) : r || (i[i.length] = s);
  }
  return i;
}
function Ye(t) {
  var e = t == null ? 0 : t.length;
  return e ? uo(t) : [];
}
var tc = Zs(Object.getPrototypeOf, Object);
function nc(t, e, n) {
  var r = -1, i = t.length;
  e < 0 && (e = -e > i ? 0 : i + e), n = n > i ? i : n, n < 0 && (n += i), i = e > n ? 0 : n - e >>> 0, e >>>= 0;
  for (var o = Array(i); ++r < i; )
    o[r] = t[r + e];
  return o;
}
function jd(t, e, n, r) {
  var i = -1, o = t == null ? 0 : t.length;
  for (r && o && (n = t[++i]); ++i < o; )
    n = e(n, t[i], i, t);
  return n;
}
function Dd() {
  this.__data__ = new Ot(), this.size = 0;
}
function Bd(t) {
  var e = this.__data__, n = e.delete(t);
  return this.size = e.size, n;
}
function qd(t) {
  return this.__data__.get(t);
}
function Gd(t) {
  return this.__data__.has(t);
}
var Wd = 200;
function Vd(t, e) {
  var n = this.__data__;
  if (n instanceof Ot) {
    var r = n.__data__;
    if (!Sn || r.length < Wd - 1)
      return r.push([t, e]), this.size = ++n.size, this;
    n = this.__data__ = new It(r);
  }
  return n.set(t, e), this.size = n.size, this;
}
function at(t) {
  var e = this.__data__ = new Ot(t);
  this.size = e.size;
}
at.prototype.clear = Dd;
at.prototype.delete = Bd;
at.prototype.get = qd;
at.prototype.has = Gd;
at.prototype.set = Vd;
function zd(t, e) {
  return t && to(e, He(e), t);
}
var rc = typeof exports == "object" && exports && !exports.nodeType && exports, Aa = rc && typeof module == "object" && module && !module.nodeType && module, Hd = Aa && Aa.exports === rc, Ta = Hd ? st.Buffer : void 0, va = Ta ? Ta.allocUnsafe : void 0;
function Kd(t, e) {
  var n = t.length, r = va ? va(n) : new t.constructor(n);
  return t.copy(r), r;
}
function lo(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, i = 0, o = []; ++n < r; ) {
    var a = t[n];
    e(a, n, t) && (o[i++] = a);
  }
  return o;
}
function ic() {
  return [];
}
var Yd = Object.prototype, Xd = Yd.propertyIsEnumerable, Sa = Object.getOwnPropertySymbols, fo = Sa ? function(t) {
  return t == null ? [] : (t = Object(t), lo(Sa(t), function(e) {
    return Xd.call(t, e);
  }));
} : ic;
function Jd(t, e) {
  return to(t, fo(t), e);
}
var Zd = Object.getOwnPropertySymbols, Qd = Zd ? function(t) {
  for (var e = []; t; )
    co(e, fo(t)), t = tc(t);
  return e;
} : ic;
function oc(t, e, n) {
  var r = e(t);
  return te(t) ? r : co(r, n(t));
}
function _i(t) {
  return oc(t, He, fo);
}
function ep(t) {
  return oc(t, ec, Qd);
}
var wi = qt(st, "DataView"), Pi = qt(st, "Promise"), Qt = qt(st, "Set"), Oa = "[object Map]", tp = "[object Object]", Ia = "[object Promise]", ba = "[object Set]", Ra = "[object WeakMap]", Na = "[object DataView]", np = Bt(wi), rp = Bt(Sn), ip = Bt(Pi), op = Bt(Qt), ap = Bt(Ni), qe = wt;
(wi && qe(new wi(new ArrayBuffer(1))) != Na || Sn && qe(new Sn()) != Oa || Pi && qe(Pi.resolve()) != Ia || Qt && qe(new Qt()) != ba || Ni && qe(new Ni()) != Ra) && (qe = function(t) {
  var e = wt(t), n = e == tp ? t.constructor : void 0, r = n ? Bt(n) : "";
  if (r)
    switch (r) {
      case np:
        return Na;
      case rp:
        return Oa;
      case ip:
        return Ia;
      case op:
        return ba;
      case ap:
        return Ra;
    }
  return e;
});
var sp = Object.prototype, cp = sp.hasOwnProperty;
function up(t) {
  var e = t.length, n = new t.constructor(e);
  return e && typeof t[0] == "string" && cp.call(t, "index") && (n.index = t.index, n.input = t.input), n;
}
var rr = st.Uint8Array;
function lp(t) {
  var e = new t.constructor(t.byteLength);
  return new rr(e).set(new rr(t)), e;
}
function fp(t, e) {
  var n = t.buffer;
  return new t.constructor(n, t.byteOffset, t.byteLength);
}
var hp = /\w*$/;
function dp(t) {
  var e = new t.constructor(t.source, hp.exec(t));
  return e.lastIndex = t.lastIndex, e;
}
var _a = Ve ? Ve.prototype : void 0, wa = _a ? _a.valueOf : void 0;
function pp(t) {
  return wa ? Object(wa.call(t)) : {};
}
function gp(t, e) {
  var n = t.buffer;
  return new t.constructor(n, t.byteOffset, t.length);
}
var yp = "[object Boolean]", mp = "[object Date]", Ep = "[object Map]", Ap = "[object Number]", Tp = "[object RegExp]", vp = "[object Set]", Sp = "[object String]", Op = "[object Symbol]", Ip = "[object ArrayBuffer]", bp = "[object DataView]", Rp = "[object Float32Array]", Np = "[object Float64Array]", _p = "[object Int8Array]", wp = "[object Int16Array]", Pp = "[object Int32Array]", Cp = "[object Uint8Array]", Lp = "[object Uint8ClampedArray]", xp = "[object Uint16Array]", kp = "[object Uint32Array]";
function Mp(t, e, n) {
  var r = t.constructor;
  switch (e) {
    case Ip:
      return lp(t);
    case yp:
    case mp:
      return new r(+t);
    case bp:
      return fp(t);
    case Rp:
    case Np:
    case _p:
    case wp:
    case Pp:
    case Cp:
    case Lp:
    case xp:
    case kp:
      return gp(t);
    case Ep:
      return new r();
    case Ap:
    case Sp:
      return new r(t);
    case Tp:
      return dp(t);
    case vp:
      return new r();
    case Op:
      return pp(t);
  }
}
function Fp(t) {
  return typeof t.constructor == "function" && !Nn(t) ? Hf(tc(t)) : {};
}
var $p = "[object Map]";
function Up(t) {
  return Je(t) && qe(t) == $p;
}
var Pa = Nt && Nt.isMap, jp = Pa ? Rr(Pa) : Up, Dp = "[object Set]";
function Bp(t) {
  return Je(t) && qe(t) == Dp;
}
var Ca = Nt && Nt.isSet, qp = Ca ? Rr(Ca) : Bp, ac = "[object Arguments]", Gp = "[object Array]", Wp = "[object Boolean]", Vp = "[object Date]", zp = "[object Error]", sc = "[object Function]", Hp = "[object GeneratorFunction]", Kp = "[object Map]", Yp = "[object Number]", cc = "[object Object]", Xp = "[object RegExp]", Jp = "[object Set]", Zp = "[object String]", Qp = "[object Symbol]", eg = "[object WeakMap]", tg = "[object ArrayBuffer]", ng = "[object DataView]", rg = "[object Float32Array]", ig = "[object Float64Array]", og = "[object Int8Array]", ag = "[object Int16Array]", sg = "[object Int32Array]", cg = "[object Uint8Array]", ug = "[object Uint8ClampedArray]", lg = "[object Uint16Array]", fg = "[object Uint32Array]", se = {};
se[ac] = se[Gp] = se[tg] = se[ng] = se[Wp] = se[Vp] = se[rg] = se[ig] = se[og] = se[ag] = se[sg] = se[Kp] = se[Yp] = se[cc] = se[Xp] = se[Jp] = se[Zp] = se[Qp] = se[cg] = se[ug] = se[lg] = se[fg] = !0;
se[zp] = se[sc] = se[eg] = !1;
function zn(t, e, n, r, i, o) {
  var a;
  if (a !== void 0)
    return a;
  if (!ze(t))
    return t;
  var s = te(t);
  if (s)
    return a = up(t), Yf(t, a);
  var c = qe(t), u = c == sc || c == Hp;
  if (Tn(t))
    return Kd(t);
  if (c == cc || c == ac || u && !i)
    return a = u ? {} : Fp(t), Jd(t, zd(a, t));
  if (!se[c])
    return i ? t : {};
  a = Mp(t, c), o || (o = new at());
  var p = o.get(t);
  if (p)
    return p;
  o.set(t, a), qp(t) ? t.forEach(function(S) {
    a.add(zn(S, e, n, S, t, o));
  }) : jp(t) && t.forEach(function(S, C) {
    a.set(C, zn(S, e, n, C, t, o));
  });
  var m = _i, E = s ? void 0 : m(t);
  return Ws(E || t, function(S, C) {
    E && (C = S, S = t[C]), Ir(a, C, zn(S, e, n, C, t, o));
  }), a;
}
var hg = 4;
function Re(t) {
  return zn(t, hg);
}
function wn(t) {
  for (var e = -1, n = t == null ? 0 : t.length, r = 0, i = []; ++e < n; ) {
    var o = t[e];
    o && (i[r++] = o);
  }
  return i;
}
var dg = "__lodash_hash_undefined__";
function pg(t) {
  return this.__data__.set(t, dg), this;
}
function gg(t) {
  return this.__data__.has(t);
}
function rn(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.__data__ = new It(); ++e < n; )
    this.add(t[e]);
}
rn.prototype.add = rn.prototype.push = pg;
rn.prototype.has = gg;
function uc(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r; )
    if (e(t[n], n, t))
      return !0;
  return !1;
}
function ho(t, e) {
  return t.has(e);
}
var yg = 1, mg = 2;
function lc(t, e, n, r, i, o) {
  var a = n & yg, s = t.length, c = e.length;
  if (s != c && !(a && c > s))
    return !1;
  var u = o.get(t), p = o.get(e);
  if (u && p)
    return u == e && p == t;
  var m = -1, E = !0, S = n & mg ? new rn() : void 0;
  for (o.set(t, e), o.set(e, t); ++m < s; ) {
    var C = t[m], k = e[m];
    if (r)
      var U = a ? r(k, C, m, e, t, o) : r(C, k, m, t, e, o);
    if (U !== void 0) {
      if (U)
        continue;
      E = !1;
      break;
    }
    if (S) {
      if (!uc(e, function(w, A) {
        if (!ho(S, A) && (C === w || i(C, w, n, r, o)))
          return S.push(A);
      })) {
        E = !1;
        break;
      }
    } else if (!(C === k || i(C, k, n, r, o))) {
      E = !1;
      break;
    }
  }
  return o.delete(t), o.delete(e), E;
}
function Eg(t) {
  var e = -1, n = Array(t.size);
  return t.forEach(function(r, i) {
    n[++e] = [i, r];
  }), n;
}
function po(t) {
  var e = -1, n = Array(t.size);
  return t.forEach(function(r) {
    n[++e] = r;
  }), n;
}
var Ag = 1, Tg = 2, vg = "[object Boolean]", Sg = "[object Date]", Og = "[object Error]", Ig = "[object Map]", bg = "[object Number]", Rg = "[object RegExp]", Ng = "[object Set]", _g = "[object String]", wg = "[object Symbol]", Pg = "[object ArrayBuffer]", Cg = "[object DataView]", La = Ve ? Ve.prototype : void 0, ci = La ? La.valueOf : void 0;
function Lg(t, e, n, r, i, o, a) {
  switch (n) {
    case Cg:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      t = t.buffer, e = e.buffer;
    case Pg:
      return !(t.byteLength != e.byteLength || !o(new rr(t), new rr(e)));
    case vg:
    case Sg:
    case bg:
      return Rn(+t, +e);
    case Og:
      return t.name == e.name && t.message == e.message;
    case Rg:
    case _g:
      return t == e + "";
    case Ig:
      var s = Eg;
    case Ng:
      var c = r & Ag;
      if (s || (s = po), t.size != e.size && !c)
        return !1;
      var u = a.get(t);
      if (u)
        return u == e;
      r |= Tg, a.set(t, e);
      var p = lc(s(t), s(e), r, i, o, a);
      return a.delete(t), p;
    case wg:
      if (ci)
        return ci.call(t) == ci.call(e);
  }
  return !1;
}
var xg = 1, kg = Object.prototype, Mg = kg.hasOwnProperty;
function Fg(t, e, n, r, i, o) {
  var a = n & xg, s = _i(t), c = s.length, u = _i(e), p = u.length;
  if (c != p && !a)
    return !1;
  for (var m = c; m--; ) {
    var E = s[m];
    if (!(a ? E in e : Mg.call(e, E)))
      return !1;
  }
  var S = o.get(t), C = o.get(e);
  if (S && C)
    return S == e && C == t;
  var k = !0;
  o.set(t, e), o.set(e, t);
  for (var U = a; ++m < c; ) {
    E = s[m];
    var w = t[E], A = e[E];
    if (r)
      var y = a ? r(A, w, E, e, t, o) : r(w, A, E, t, e, o);
    if (!(y === void 0 ? w === A || i(w, A, n, r, o) : y)) {
      k = !1;
      break;
    }
    U || (U = E == "constructor");
  }
  if (k && !U) {
    var I = t.constructor, x = e.constructor;
    I != x && "constructor" in t && "constructor" in e && !(typeof I == "function" && I instanceof I && typeof x == "function" && x instanceof x) && (k = !1);
  }
  return o.delete(t), o.delete(e), k;
}
var $g = 1, xa = "[object Arguments]", ka = "[object Array]", Mn = "[object Object]", Ug = Object.prototype, Ma = Ug.hasOwnProperty;
function jg(t, e, n, r, i, o) {
  var a = te(t), s = te(e), c = a ? ka : qe(t), u = s ? ka : qe(e);
  c = c == xa ? Mn : c, u = u == xa ? Mn : u;
  var p = c == Mn, m = u == Mn, E = c == u;
  if (E && Tn(t)) {
    if (!Tn(e))
      return !1;
    a = !0, p = !1;
  }
  if (E && !p)
    return o || (o = new at()), a || io(t) ? lc(t, e, n, r, i, o) : Lg(t, e, c, n, r, i, o);
  if (!(n & $g)) {
    var S = p && Ma.call(t, "__wrapped__"), C = m && Ma.call(e, "__wrapped__");
    if (S || C) {
      var k = S ? t.value() : t, U = C ? e.value() : e;
      return o || (o = new at()), i(k, U, n, r, o);
    }
  }
  return E ? (o || (o = new at()), Fg(t, e, n, r, i, o)) : !1;
}
function go(t, e, n, r, i) {
  return t === e ? !0 : t == null || e == null || !Je(t) && !Je(e) ? t !== t && e !== e : jg(t, e, n, r, go, i);
}
var Dg = 1, Bg = 2;
function qg(t, e, n, r) {
  var i = n.length, o = i;
  if (t == null)
    return !o;
  for (t = Object(t); i--; ) {
    var a = n[i];
    if (a[2] ? a[1] !== t[a[0]] : !(a[0] in t))
      return !1;
  }
  for (; ++i < o; ) {
    a = n[i];
    var s = a[0], c = t[s], u = a[1];
    if (a[2]) {
      if (c === void 0 && !(s in t))
        return !1;
    } else {
      var p = new at(), m;
      if (!(m === void 0 ? go(u, c, Dg | Bg, r, p) : m))
        return !1;
    }
  }
  return !0;
}
function fc(t) {
  return t === t && !ze(t);
}
function Gg(t) {
  for (var e = He(t), n = e.length; n--; ) {
    var r = e[n], i = t[r];
    e[n] = [r, i, fc(i)];
  }
  return e;
}
function hc(t, e) {
  return function(n) {
    return n == null ? !1 : n[t] === e && (e !== void 0 || t in Object(n));
  };
}
function Wg(t) {
  var e = Gg(t);
  return e.length == 1 && e[0][2] ? hc(e[0][0], e[0][1]) : function(n) {
    return n === t || qg(n, t, e);
  };
}
function Vg(t, e) {
  return t != null && e in Object(t);
}
function dc(t, e, n) {
  e = wr(e, t);
  for (var r = -1, i = e.length, o = !1; ++r < i; ) {
    var a = _n(e[r]);
    if (!(o = t != null && n(t, a)))
      break;
    t = t[a];
  }
  return o || ++r != i ? o : (i = t == null ? 0 : t.length, !!i && ro(i) && Or(a, i) && (te(t) || br(t)));
}
function zg(t, e) {
  return t != null && dc(t, e, Vg);
}
var Hg = 1, Kg = 2;
function Yg(t, e) {
  return oo(t) && fc(e) ? hc(_n(t), e) : function(n) {
    var r = $d(n, t);
    return r === void 0 && r === e ? zg(n, t) : go(e, r, Hg | Kg);
  };
}
function Xg(t) {
  return function(e) {
    return e?.[t];
  };
}
function Jg(t) {
  return function(e) {
    return so(e, t);
  };
}
function Zg(t) {
  return oo(t) ? Xg(_n(t)) : Jg(t);
}
function ut(t) {
  return typeof t == "function" ? t : t == null ? nn : typeof t == "object" ? te(t) ? Yg(t[0], t[1]) : Wg(t) : Zg(t);
}
function Qg(t, e, n, r) {
  for (var i = -1, o = t == null ? 0 : t.length; ++i < o; ) {
    var a = t[i];
    e(r, a, n(a), t);
  }
  return r;
}
function ey(t) {
  return function(e, n, r) {
    for (var i = -1, o = Object(e), a = r(e), s = a.length; s--; ) {
      var c = a[++i];
      if (n(o[c], c, o) === !1)
        break;
    }
    return e;
  };
}
var ty = ey();
function ny(t, e) {
  return t && ty(t, e, He);
}
function ry(t, e) {
  return function(n, r) {
    if (n == null)
      return n;
    if (!ct(n))
      return t(n, r);
    for (var i = n.length, o = -1, a = Object(n); ++o < i && r(a[o], o, a) !== !1; )
      ;
    return n;
  };
}
var Gt = ry(ny);
function iy(t, e, n, r) {
  return Gt(t, function(i, o, a) {
    e(r, i, n(i), a);
  }), r;
}
function oy(t, e) {
  return function(n, r) {
    var i = te(n) ? Qg : iy, o = e ? e() : {};
    return i(n, t, ut(r), o);
  };
}
var pc = Object.prototype, ay = pc.hasOwnProperty, yo = no(function(t, e) {
  t = Object(t);
  var n = -1, r = e.length, i = r > 2 ? e[2] : void 0;
  for (i && Hs(e[0], e[1], i) && (r = 1); ++n < r; )
    for (var o = e[n], a = ec(o), s = -1, c = a.length; ++s < c; ) {
      var u = a[s], p = t[u];
      (p === void 0 || Rn(p, pc[u]) && !ay.call(t, u)) && (t[u] = o[u]);
    }
  return t;
});
function Fa(t) {
  return Je(t) && ct(t);
}
var sy = 200;
function cy(t, e, n, r) {
  var i = -1, o = zs, a = !0, s = t.length, c = [], u = e.length;
  if (!s)
    return c;
  e.length >= sy && (o = ho, a = !1, e = new rn(e));
  e:
    for (; ++i < s; ) {
      var p = t[i], m = p;
      if (p = p !== 0 ? p : 0, a && m === m) {
        for (var E = u; E--; )
          if (e[E] === m)
            continue e;
        c.push(p);
      } else o(e, m, r) || c.push(p);
    }
  return c;
}
var Pr = no(function(t, e) {
  return Fa(t) ? cy(t, uo(e, 1, Fa, !0)) : [];
});
function on(t) {
  var e = t == null ? 0 : t.length;
  return e ? t[e - 1] : void 0;
}
function be(t, e, n) {
  var r = t == null ? 0 : t.length;
  return r ? (e = e === void 0 ? 1 : Sr(e), nc(t, e < 0 ? 0 : e, r)) : [];
}
function On(t, e, n) {
  var r = t == null ? 0 : t.length;
  return r ? (e = e === void 0 ? 1 : Sr(e), e = r - e, nc(t, 0, e < 0 ? 0 : e)) : [];
}
function uy(t) {
  return typeof t == "function" ? t : nn;
}
function W(t, e) {
  var n = te(t) ? Ws : Gt;
  return n(t, uy(e));
}
function ly(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r; )
    if (!e(t[n], n, t))
      return !1;
  return !0;
}
function fy(t, e) {
  var n = !0;
  return Gt(t, function(r, i, o) {
    return n = !!e(r, i, o), n;
  }), n;
}
function Xe(t, e, n) {
  var r = te(t) ? ly : fy;
  return r(t, ut(e));
}
function gc(t, e) {
  var n = [];
  return Gt(t, function(r, i, o) {
    e(r, i, o) && n.push(r);
  }), n;
}
function Ke(t, e) {
  var n = te(t) ? lo : gc;
  return n(t, ut(e));
}
function hy(t) {
  return function(e, n, r) {
    var i = Object(e);
    if (!ct(e)) {
      var o = ut(n);
      e = He(e), n = function(s) {
        return o(i[s], s, i);
      };
    }
    var a = t(e, n, r);
    return a > -1 ? i[o ? e[a] : a] : void 0;
  };
}
var dy = Math.max;
function py(t, e, n) {
  var r = t == null ? 0 : t.length;
  if (!r)
    return -1;
  var i = n == null ? 0 : Sr(n);
  return i < 0 && (i = dy(r + i, 0)), Vs(t, ut(e), i);
}
var an = hy(py);
function Ze(t) {
  return t && t.length ? t[0] : void 0;
}
function gy(t, e) {
  var n = -1, r = ct(t) ? Array(t.length) : [];
  return Gt(t, function(i, o, a) {
    r[++n] = e(i, o, a);
  }), r;
}
function D(t, e) {
  var n = te(t) ? vr : gy;
  return n(t, ut(e));
}
function We(t, e) {
  return uo(D(t, e));
}
var yy = Object.prototype, my = yy.hasOwnProperty, Ey = oy(function(t, e, n) {
  my.call(t, n) ? t[n].push(e) : eo(t, n, [e]);
}), Ay = Object.prototype, Ty = Ay.hasOwnProperty;
function vy(t, e) {
  return t != null && Ty.call(t, e);
}
function G(t, e) {
  return t != null && dc(t, e, vy);
}
var Sy = "[object String]";
function ke(t) {
  return typeof t == "string" || !te(t) && Je(t) && wt(t) == Sy;
}
function Oy(t, e) {
  return vr(e, function(n) {
    return t[n];
  });
}
function ve(t) {
  return t == null ? [] : Oy(t, He(t));
}
var Iy = Math.max;
function Le(t, e, n, r) {
  t = ct(t) ? t : ve(t), n = n && !r ? Sr(n) : 0;
  var i = t.length;
  return n < 0 && (n = Iy(i + n, 0)), ke(t) ? n <= i && t.indexOf(e, n) > -1 : !!i && Qi(t, e, n) > -1;
}
function $a(t, e, n) {
  var r = t == null ? 0 : t.length;
  if (!r)
    return -1;
  var i = 0;
  return Qi(t, e, i);
}
var by = "[object Map]", Ry = "[object Set]", Ny = Object.prototype, _y = Ny.hasOwnProperty;
function ce(t) {
  if (t == null)
    return !0;
  if (ct(t) && (te(t) || typeof t == "string" || typeof t.splice == "function" || Tn(t) || io(t) || br(t)))
    return !t.length;
  var e = qe(t);
  if (e == by || e == Ry)
    return !t.size;
  if (Nn(t))
    return !Qs(t).length;
  for (var n in t)
    if (_y.call(t, n))
      return !1;
  return !0;
}
var wy = "[object RegExp]";
function Py(t) {
  return Je(t) && wt(t) == wy;
}
var Ua = Nt && Nt.isRegExp, Et = Ua ? Rr(Ua) : Py;
function At(t) {
  return t === void 0;
}
var Cy = "Expected a function";
function Ly(t) {
  if (typeof t != "function")
    throw new TypeError(Cy);
  return function() {
    var e = arguments;
    switch (e.length) {
      case 0:
        return !t.call(this);
      case 1:
        return !t.call(this, e[0]);
      case 2:
        return !t.call(this, e[0], e[1]);
      case 3:
        return !t.call(this, e[0], e[1], e[2]);
    }
    return !t.apply(this, e);
  };
}
function xy(t, e, n, r) {
  if (!ze(t))
    return t;
  e = wr(e, t);
  for (var i = -1, o = e.length, a = o - 1, s = t; s != null && ++i < o; ) {
    var c = _n(e[i]), u = n;
    if (c === "__proto__" || c === "constructor" || c === "prototype")
      return t;
    if (i != a) {
      var p = s[c];
      u = void 0, u === void 0 && (u = ze(p) ? p : Or(e[i + 1]) ? [] : {});
    }
    Ir(s, c, u), s = s[c];
  }
  return t;
}
function ky(t, e, n) {
  for (var r = -1, i = e.length, o = {}; ++r < i; ) {
    var a = e[r], s = so(t, a);
    n(s, a) && xy(o, wr(a, t), s);
  }
  return o;
}
function Qe(t, e) {
  if (t == null)
    return {};
  var n = vr(ep(t), function(r) {
    return [r];
  });
  return e = ut(e), ky(t, n, function(r, i) {
    return e(r, i[0]);
  });
}
function My(t, e, n, r, i) {
  return i(t, function(o, a, s) {
    n = r ? (r = !1, o) : e(n, o, a, s);
  }), n;
}
function je(t, e, n) {
  var r = te(t) ? jd : My, i = arguments.length < 3;
  return r(t, ut(e), n, i, Gt);
}
function Cr(t, e) {
  var n = te(t) ? lo : gc;
  return n(t, Ly(ut(e)));
}
function Fy(t, e) {
  var n;
  return Gt(t, function(r, i, o) {
    return n = e(r, i, o), !n;
  }), !!n;
}
function yc(t, e, n) {
  var r = te(t) ? uc : Fy;
  return r(t, ut(e));
}
var $y = 1 / 0, Uy = Qt && 1 / po(new Qt([, -0]))[1] == $y ? function(t) {
  return new Qt(t);
} : Te, jy = 200;
function Dy(t, e, n) {
  var r = -1, i = zs, o = t.length, a = !0, s = [], c = s;
  if (o >= jy) {
    var u = Uy(t);
    if (u)
      return po(u);
    a = !1, i = ho, c = new rn();
  } else
    c = s;
  e:
    for (; ++r < o; ) {
      var p = t[r], m = p;
      if (p = p !== 0 ? p : 0, a && m === m) {
        for (var E = c.length; E--; )
          if (c[E] === m)
            continue e;
        s.push(p);
      } else i(c, m, n) || (c !== s && c.push(m), s.push(p));
    }
  return s;
}
function mo(t) {
  return t && t.length ? Dy(t) : [];
}
function Ci(t) {
  console && console.error && console.error(`Error: ${t}`);
}
function mc(t) {
  console && console.warn && console.warn(`Warning: ${t}`);
}
function Ec(t) {
  const e = (/* @__PURE__ */ new Date()).getTime(), n = t();
  return { time: (/* @__PURE__ */ new Date()).getTime() - e, value: n };
}
function Ac(t) {
  function e() {
  }
  e.prototype = t;
  const n = new e();
  function r() {
    return typeof n.bar;
  }
  return r(), r(), t;
}
function By(t) {
  return qy(t) ? t.LABEL : t.name;
}
function qy(t) {
  return ke(t.LABEL) && t.LABEL !== "";
}
class lt {
  get definition() {
    return this._definition;
  }
  set definition(e) {
    this._definition = e;
  }
  constructor(e) {
    this._definition = e;
  }
  accept(e) {
    e.visit(this), W(this.definition, (n) => {
      n.accept(e);
    });
  }
}
class De extends lt {
  constructor(e) {
    super([]), this.idx = 1, Ue(this, Qe(e, (n) => n !== void 0));
  }
  set definition(e) {
  }
  get definition() {
    return this.referencedRule !== void 0 ? this.referencedRule.definition : [];
  }
  accept(e) {
    e.visit(this);
  }
}
class sn extends lt {
  constructor(e) {
    super(e.definition), this.orgText = "", Ue(this, Qe(e, (n) => n !== void 0));
  }
}
class Me extends lt {
  constructor(e) {
    super(e.definition), this.ignoreAmbiguities = !1, Ue(this, Qe(e, (n) => n !== void 0));
  }
}
class xe extends lt {
  constructor(e) {
    super(e.definition), this.idx = 1, Ue(this, Qe(e, (n) => n !== void 0));
  }
}
class ft extends lt {
  constructor(e) {
    super(e.definition), this.idx = 1, Ue(this, Qe(e, (n) => n !== void 0));
  }
}
class ht extends lt {
  constructor(e) {
    super(e.definition), this.idx = 1, Ue(this, Qe(e, (n) => n !== void 0));
  }
}
class Se extends lt {
  constructor(e) {
    super(e.definition), this.idx = 1, Ue(this, Qe(e, (n) => n !== void 0));
  }
}
class et extends lt {
  constructor(e) {
    super(e.definition), this.idx = 1, Ue(this, Qe(e, (n) => n !== void 0));
  }
}
class tt extends lt {
  get definition() {
    return this._definition;
  }
  set definition(e) {
    this._definition = e;
  }
  constructor(e) {
    super(e.definition), this.idx = 1, this.ignoreAmbiguities = !1, this.hasPredicates = !1, Ue(this, Qe(e, (n) => n !== void 0));
  }
}
class he {
  constructor(e) {
    this.idx = 1, Ue(this, Qe(e, (n) => n !== void 0));
  }
  accept(e) {
    e.visit(this);
  }
}
function Gy(t) {
  return D(t, Hn);
}
function Hn(t) {
  function e(n) {
    return D(n, Hn);
  }
  if (t instanceof De) {
    const n = {
      type: "NonTerminal",
      name: t.nonTerminalName,
      idx: t.idx
    };
    return ke(t.label) && (n.label = t.label), n;
  } else {
    if (t instanceof Me)
      return {
        type: "Alternative",
        definition: e(t.definition)
      };
    if (t instanceof xe)
      return {
        type: "Option",
        idx: t.idx,
        definition: e(t.definition)
      };
    if (t instanceof ft)
      return {
        type: "RepetitionMandatory",
        idx: t.idx,
        definition: e(t.definition)
      };
    if (t instanceof ht)
      return {
        type: "RepetitionMandatoryWithSeparator",
        idx: t.idx,
        separator: Hn(new he({ terminalType: t.separator })),
        definition: e(t.definition)
      };
    if (t instanceof et)
      return {
        type: "RepetitionWithSeparator",
        idx: t.idx,
        separator: Hn(new he({ terminalType: t.separator })),
        definition: e(t.definition)
      };
    if (t instanceof Se)
      return {
        type: "Repetition",
        idx: t.idx,
        definition: e(t.definition)
      };
    if (t instanceof tt)
      return {
        type: "Alternation",
        idx: t.idx,
        definition: e(t.definition)
      };
    if (t instanceof he) {
      const n = {
        type: "Terminal",
        name: t.terminalType.name,
        label: By(t.terminalType),
        idx: t.idx
      };
      ke(t.label) && (n.terminalLabel = t.label);
      const r = t.terminalType.PATTERN;
      return t.terminalType.PATTERN && (n.pattern = Et(r) ? r.source : r), n;
    } else {
      if (t instanceof sn)
        return {
          type: "Rule",
          name: t.name,
          orgText: t.orgText,
          definition: e(t.definition)
        };
      throw Error("non exhaustive match");
    }
  }
}
class cn {
  visit(e) {
    const n = e;
    switch (n.constructor) {
      case De:
        return this.visitNonTerminal(n);
      case Me:
        return this.visitAlternative(n);
      case xe:
        return this.visitOption(n);
      case ft:
        return this.visitRepetitionMandatory(n);
      case ht:
        return this.visitRepetitionMandatoryWithSeparator(n);
      case et:
        return this.visitRepetitionWithSeparator(n);
      case Se:
        return this.visitRepetition(n);
      case tt:
        return this.visitAlternation(n);
      case he:
        return this.visitTerminal(n);
      case sn:
        return this.visitRule(n);
      default:
        throw Error("non exhaustive match");
    }
  }
  /* c8 ignore next */
  visitNonTerminal(e) {
  }
  /* c8 ignore next */
  visitAlternative(e) {
  }
  /* c8 ignore next */
  visitOption(e) {
  }
  /* c8 ignore next */
  visitRepetition(e) {
  }
  /* c8 ignore next */
  visitRepetitionMandatory(e) {
  }
  /* c8 ignore next 3 */
  visitRepetitionMandatoryWithSeparator(e) {
  }
  /* c8 ignore next */
  visitRepetitionWithSeparator(e) {
  }
  /* c8 ignore next */
  visitAlternation(e) {
  }
  /* c8 ignore next */
  visitTerminal(e) {
  }
  /* c8 ignore next */
  visitRule(e) {
  }
}
function Wy(t) {
  return t instanceof Me || t instanceof xe || t instanceof Se || t instanceof ft || t instanceof ht || t instanceof et || t instanceof he || t instanceof sn;
}
function ir(t, e = []) {
  return t instanceof xe || t instanceof Se || t instanceof et ? !0 : t instanceof tt ? yc(t.definition, (r) => ir(r, e)) : t instanceof De && Le(e, t) ? !1 : t instanceof lt ? (t instanceof De && e.push(t), Xe(t.definition, (r) => ir(r, e))) : !1;
}
function Vy(t) {
  return t instanceof tt;
}
function it(t) {
  if (t instanceof De)
    return "SUBRULE";
  if (t instanceof xe)
    return "OPTION";
  if (t instanceof tt)
    return "OR";
  if (t instanceof ft)
    return "AT_LEAST_ONE";
  if (t instanceof ht)
    return "AT_LEAST_ONE_SEP";
  if (t instanceof et)
    return "MANY_SEP";
  if (t instanceof Se)
    return "MANY";
  if (t instanceof he)
    return "CONSUME";
  throw Error("non exhaustive match");
}
class Lr {
  walk(e, n = []) {
    W(e.definition, (r, i) => {
      const o = be(e.definition, i + 1);
      if (r instanceof De)
        this.walkProdRef(r, o, n);
      else if (r instanceof he)
        this.walkTerminal(r, o, n);
      else if (r instanceof Me)
        this.walkFlat(r, o, n);
      else if (r instanceof xe)
        this.walkOption(r, o, n);
      else if (r instanceof ft)
        this.walkAtLeastOne(r, o, n);
      else if (r instanceof ht)
        this.walkAtLeastOneSep(r, o, n);
      else if (r instanceof et)
        this.walkManySep(r, o, n);
      else if (r instanceof Se)
        this.walkMany(r, o, n);
      else if (r instanceof tt)
        this.walkOr(r, o, n);
      else
        throw Error("non exhaustive match");
    });
  }
  walkTerminal(e, n, r) {
  }
  walkProdRef(e, n, r) {
  }
  walkFlat(e, n, r) {
    const i = n.concat(r);
    this.walk(e, i);
  }
  walkOption(e, n, r) {
    const i = n.concat(r);
    this.walk(e, i);
  }
  walkAtLeastOne(e, n, r) {
    const i = [
      new xe({ definition: e.definition })
    ].concat(n, r);
    this.walk(e, i);
  }
  walkAtLeastOneSep(e, n, r) {
    const i = ja(e, n, r);
    this.walk(e, i);
  }
  walkMany(e, n, r) {
    const i = [
      new xe({ definition: e.definition })
    ].concat(n, r);
    this.walk(e, i);
  }
  walkManySep(e, n, r) {
    const i = ja(e, n, r);
    this.walk(e, i);
  }
  walkOr(e, n, r) {
    const i = n.concat(r);
    W(e.definition, (o) => {
      const a = new Me({ definition: [o] });
      this.walk(a, i);
    });
  }
}
function ja(t, e, n) {
  return [
    new xe({
      definition: [
        new he({ terminalType: t.separator })
      ].concat(t.definition)
    })
  ].concat(e, n);
}
function Pn(t) {
  if (t instanceof De)
    return Pn(t.referencedRule);
  if (t instanceof he)
    return Ky(t);
  if (Wy(t))
    return zy(t);
  if (Vy(t))
    return Hy(t);
  throw Error("non exhaustive match");
}
function zy(t) {
  let e = [];
  const n = t.definition;
  let r = 0, i = n.length > r, o, a = !0;
  for (; i && a; )
    o = n[r], a = ir(o), e = e.concat(Pn(o)), r = r + 1, i = n.length > r;
  return mo(e);
}
function Hy(t) {
  const e = D(t.definition, (n) => Pn(n));
  return mo(Ye(e));
}
function Ky(t) {
  return [t.terminalType];
}
const Tc = "_~IN~_";
class Yy extends Lr {
  constructor(e) {
    super(), this.topProd = e, this.follows = {};
  }
  startWalking() {
    return this.walk(this.topProd), this.follows;
  }
  walkTerminal(e, n, r) {
  }
  walkProdRef(e, n, r) {
    const i = Jy(e.referencedRule, e.idx) + this.topProd.name, o = n.concat(r), a = new Me({ definition: o }), s = Pn(a);
    this.follows[i] = s;
  }
}
function Xy(t) {
  const e = {};
  return W(t, (n) => {
    const r = new Yy(n).startWalking();
    Ue(e, r);
  }), e;
}
function Jy(t, e) {
  return t.name + e + Tc;
}
function V(t) {
  return t.charCodeAt(0);
}
function ui(t, e) {
  Array.isArray(t) ? t.forEach(function(n) {
    e.push(n);
  }) : e.push(t);
}
function dn(t, e) {
  if (t[e] === !0)
    throw "duplicate flag " + e;
  t[e], t[e] = !0;
}
function Kt(t) {
  if (t === void 0)
    throw Error("Internal Error - Should never get here!");
  return !0;
}
function Zy() {
  throw Error("Internal Error - Should never get here!");
}
function Da(t) {
  return t.type === "Character";
}
const or = [];
for (let t = V("0"); t <= V("9"); t++)
  or.push(t);
const ar = [V("_")].concat(or);
for (let t = V("a"); t <= V("z"); t++)
  ar.push(t);
for (let t = V("A"); t <= V("Z"); t++)
  ar.push(t);
const Ba = [
  V(" "),
  V("\f"),
  V(`
`),
  V("\r"),
  V("	"),
  V("\v"),
  V("	"),
  V(" "),
  V(" "),
  V(" "),
  V(" "),
  V(" "),
  V(" "),
  V(" "),
  V(" "),
  V(" "),
  V(" "),
  V(" "),
  V(" "),
  V(" "),
  V("\u2028"),
  V("\u2029"),
  V(" "),
  V(" "),
  V("　"),
  V("\uFEFF")
], Qy = /[0-9a-fA-F]/, Fn = /[0-9]/, em = /[1-9]/;
class tm {
  constructor() {
    this.idx = 0, this.input = "", this.groupIdx = 0;
  }
  saveState() {
    return {
      idx: this.idx,
      input: this.input,
      groupIdx: this.groupIdx
    };
  }
  restoreState(e) {
    this.idx = e.idx, this.input = e.input, this.groupIdx = e.groupIdx;
  }
  pattern(e) {
    this.idx = 0, this.input = e, this.groupIdx = 0, this.consumeChar("/");
    const n = this.disjunction();
    this.consumeChar("/");
    const r = {
      type: "Flags",
      loc: { begin: this.idx, end: e.length },
      global: !1,
      ignoreCase: !1,
      multiLine: !1,
      unicode: !1,
      sticky: !1
    };
    for (; this.isRegExpFlag(); )
      switch (this.popChar()) {
        case "g":
          dn(r, "global");
          break;
        case "i":
          dn(r, "ignoreCase");
          break;
        case "m":
          dn(r, "multiLine");
          break;
        case "u":
          dn(r, "unicode");
          break;
        case "y":
          dn(r, "sticky");
          break;
      }
    if (this.idx !== this.input.length)
      throw Error("Redundant input: " + this.input.substring(this.idx));
    return {
      type: "Pattern",
      flags: r,
      value: n,
      loc: this.loc(0)
    };
  }
  disjunction() {
    const e = [], n = this.idx;
    for (e.push(this.alternative()); this.peekChar() === "|"; )
      this.consumeChar("|"), e.push(this.alternative());
    return { type: "Disjunction", value: e, loc: this.loc(n) };
  }
  alternative() {
    const e = [], n = this.idx;
    for (; this.isTerm(); )
      e.push(this.term());
    return { type: "Alternative", value: e, loc: this.loc(n) };
  }
  term() {
    return this.isAssertion() ? this.assertion() : this.atom();
  }
  assertion() {
    const e = this.idx;
    switch (this.popChar()) {
      case "^":
        return {
          type: "StartAnchor",
          loc: this.loc(e)
        };
      case "$":
        return { type: "EndAnchor", loc: this.loc(e) };
      case "\\":
        switch (this.popChar()) {
          case "b":
            return {
              type: "WordBoundary",
              loc: this.loc(e)
            };
          case "B":
            return {
              type: "NonWordBoundary",
              loc: this.loc(e)
            };
        }
        throw Error("Invalid Assertion Escape");
      case "(":
        this.consumeChar("?");
        let n;
        switch (this.popChar()) {
          case "=":
            n = "Lookahead";
            break;
          case "!":
            n = "NegativeLookahead";
            break;
        }
        Kt(n);
        const r = this.disjunction();
        return this.consumeChar(")"), {
          type: n,
          value: r,
          loc: this.loc(e)
        };
    }
    return Zy();
  }
  quantifier(e = !1) {
    let n;
    const r = this.idx;
    switch (this.popChar()) {
      case "*":
        n = {
          atLeast: 0,
          atMost: 1 / 0
        };
        break;
      case "+":
        n = {
          atLeast: 1,
          atMost: 1 / 0
        };
        break;
      case "?":
        n = {
          atLeast: 0,
          atMost: 1
        };
        break;
      case "{":
        const i = this.integerIncludingZero();
        switch (this.popChar()) {
          case "}":
            n = {
              atLeast: i,
              atMost: i
            };
            break;
          case ",":
            let o;
            this.isDigit() ? (o = this.integerIncludingZero(), n = {
              atLeast: i,
              atMost: o
            }) : n = {
              atLeast: i,
              atMost: 1 / 0
            }, this.consumeChar("}");
            break;
        }
        if (e === !0 && n === void 0)
          return;
        Kt(n);
        break;
    }
    if (!(e === !0 && n === void 0) && Kt(n))
      return this.peekChar(0) === "?" ? (this.consumeChar("?"), n.greedy = !1) : n.greedy = !0, n.type = "Quantifier", n.loc = this.loc(r), n;
  }
  atom() {
    let e;
    const n = this.idx;
    switch (this.peekChar()) {
      case ".":
        e = this.dotAll();
        break;
      case "\\":
        e = this.atomEscape();
        break;
      case "[":
        e = this.characterClass();
        break;
      case "(":
        e = this.group();
        break;
    }
    if (e === void 0 && this.isPatternCharacter() && (e = this.patternCharacter()), Kt(e))
      return e.loc = this.loc(n), this.isQuantifier() && (e.quantifier = this.quantifier()), e;
  }
  dotAll() {
    return this.consumeChar("."), {
      type: "Set",
      complement: !0,
      value: [V(`
`), V("\r"), V("\u2028"), V("\u2029")]
    };
  }
  atomEscape() {
    switch (this.consumeChar("\\"), this.peekChar()) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        return this.decimalEscapeAtom();
      case "d":
      case "D":
      case "s":
      case "S":
      case "w":
      case "W":
        return this.characterClassEscape();
      case "f":
      case "n":
      case "r":
      case "t":
      case "v":
        return this.controlEscapeAtom();
      case "c":
        return this.controlLetterEscapeAtom();
      case "0":
        return this.nulCharacterAtom();
      case "x":
        return this.hexEscapeSequenceAtom();
      case "u":
        return this.regExpUnicodeEscapeSequenceAtom();
      default:
        return this.identityEscapeAtom();
    }
  }
  decimalEscapeAtom() {
    return { type: "GroupBackReference", value: this.positiveInteger() };
  }
  characterClassEscape() {
    let e, n = !1;
    switch (this.popChar()) {
      case "d":
        e = or;
        break;
      case "D":
        e = or, n = !0;
        break;
      case "s":
        e = Ba;
        break;
      case "S":
        e = Ba, n = !0;
        break;
      case "w":
        e = ar;
        break;
      case "W":
        e = ar, n = !0;
        break;
    }
    if (Kt(e))
      return { type: "Set", value: e, complement: n };
  }
  controlEscapeAtom() {
    let e;
    switch (this.popChar()) {
      case "f":
        e = V("\f");
        break;
      case "n":
        e = V(`
`);
        break;
      case "r":
        e = V("\r");
        break;
      case "t":
        e = V("	");
        break;
      case "v":
        e = V("\v");
        break;
    }
    if (Kt(e))
      return { type: "Character", value: e };
  }
  controlLetterEscapeAtom() {
    this.consumeChar("c");
    const e = this.popChar();
    if (/[a-zA-Z]/.test(e) === !1)
      throw Error("Invalid ");
    return { type: "Character", value: e.toUpperCase().charCodeAt(0) - 64 };
  }
  nulCharacterAtom() {
    return this.consumeChar("0"), { type: "Character", value: V("\0") };
  }
  hexEscapeSequenceAtom() {
    return this.consumeChar("x"), this.parseHexDigits(2);
  }
  regExpUnicodeEscapeSequenceAtom() {
    return this.consumeChar("u"), this.parseHexDigits(4);
  }
  identityEscapeAtom() {
    const e = this.popChar();
    return { type: "Character", value: V(e) };
  }
  classPatternCharacterAtom() {
    switch (this.peekChar()) {
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
      case "\\":
      case "]":
        throw Error("TBD");
      default:
        const e = this.popChar();
        return { type: "Character", value: V(e) };
    }
  }
  characterClass() {
    const e = [];
    let n = !1;
    for (this.consumeChar("["), this.peekChar(0) === "^" && (this.consumeChar("^"), n = !0); this.isClassAtom(); ) {
      const r = this.classAtom();
      if (r.type, Da(r) && this.isRangeDash()) {
        this.consumeChar("-");
        const i = this.classAtom();
        if (i.type, Da(i)) {
          if (i.value < r.value)
            throw Error("Range out of order in character class");
          e.push({ from: r.value, to: i.value });
        } else
          ui(r.value, e), e.push(V("-")), ui(i.value, e);
      } else
        ui(r.value, e);
    }
    return this.consumeChar("]"), { type: "Set", complement: n, value: e };
  }
  classAtom() {
    switch (this.peekChar()) {
      case "]":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        throw Error("TBD");
      case "\\":
        return this.classEscape();
      default:
        return this.classPatternCharacterAtom();
    }
  }
  classEscape() {
    switch (this.consumeChar("\\"), this.peekChar()) {
      case "b":
        return this.consumeChar("b"), { type: "Character", value: V("\b") };
      case "d":
      case "D":
      case "s":
      case "S":
      case "w":
      case "W":
        return this.characterClassEscape();
      case "f":
      case "n":
      case "r":
      case "t":
      case "v":
        return this.controlEscapeAtom();
      case "c":
        return this.controlLetterEscapeAtom();
      case "0":
        return this.nulCharacterAtom();
      case "x":
        return this.hexEscapeSequenceAtom();
      case "u":
        return this.regExpUnicodeEscapeSequenceAtom();
      default:
        return this.identityEscapeAtom();
    }
  }
  group() {
    let e = !0;
    switch (this.consumeChar("("), this.peekChar(0)) {
      case "?":
        this.consumeChar("?"), this.consumeChar(":"), e = !1;
        break;
      default:
        this.groupIdx++;
        break;
    }
    const n = this.disjunction();
    this.consumeChar(")");
    const r = {
      type: "Group",
      capturing: e,
      value: n
    };
    return e && (r.idx = this.groupIdx), r;
  }
  positiveInteger() {
    let e = this.popChar();
    if (em.test(e) === !1)
      throw Error("Expecting a positive integer");
    for (; Fn.test(this.peekChar(0)); )
      e += this.popChar();
    return parseInt(e, 10);
  }
  integerIncludingZero() {
    let e = this.popChar();
    if (Fn.test(e) === !1)
      throw Error("Expecting an integer");
    for (; Fn.test(this.peekChar(0)); )
      e += this.popChar();
    return parseInt(e, 10);
  }
  patternCharacter() {
    const e = this.popChar();
    switch (e) {
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
      case "^":
      case "$":
      case "\\":
      case ".":
      case "*":
      case "+":
      case "?":
      case "(":
      case ")":
      case "[":
      case "|":
        throw Error("TBD");
      default:
        return { type: "Character", value: V(e) };
    }
  }
  isRegExpFlag() {
    switch (this.peekChar(0)) {
      case "g":
      case "i":
      case "m":
      case "u":
      case "y":
        return !0;
      default:
        return !1;
    }
  }
  isRangeDash() {
    return this.peekChar() === "-" && this.isClassAtom(1);
  }
  isDigit() {
    return Fn.test(this.peekChar(0));
  }
  isClassAtom(e = 0) {
    switch (this.peekChar(e)) {
      case "]":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        return !1;
      default:
        return !0;
    }
  }
  isTerm() {
    return this.isAtom() || this.isAssertion();
  }
  isAtom() {
    if (this.isPatternCharacter())
      return !0;
    switch (this.peekChar(0)) {
      case ".":
      case "\\":
      case "[":
      case "(":
        return !0;
      default:
        return !1;
    }
  }
  isAssertion() {
    switch (this.peekChar(0)) {
      case "^":
      case "$":
        return !0;
      case "\\":
        switch (this.peekChar(1)) {
          case "b":
          case "B":
            return !0;
          default:
            return !1;
        }
      case "(":
        return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!");
      default:
        return !1;
    }
  }
  isQuantifier() {
    const e = this.saveState();
    try {
      return this.quantifier(!0) !== void 0;
    } catch {
      return !1;
    } finally {
      this.restoreState(e);
    }
  }
  isPatternCharacter() {
    switch (this.peekChar()) {
      case "^":
      case "$":
      case "\\":
      case ".":
      case "*":
      case "+":
      case "?":
      case "(":
      case ")":
      case "[":
      case "|":
      case "/":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        return !1;
      default:
        return !0;
    }
  }
  parseHexDigits(e) {
    let n = "";
    for (let i = 0; i < e; i++) {
      const o = this.popChar();
      if (Qy.test(o) === !1)
        throw Error("Expecting a HexDecimal digits");
      n += o;
    }
    return { type: "Character", value: parseInt(n, 16) };
  }
  peekChar(e = 0) {
    return this.input[this.idx + e];
  }
  popChar() {
    const e = this.peekChar(0);
    return this.consumeChar(void 0), e;
  }
  consumeChar(e) {
    if (e !== void 0 && this.input[this.idx] !== e)
      throw Error("Expected: '" + e + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
    if (this.idx >= this.input.length)
      throw Error("Unexpected end of input");
    this.idx++;
  }
  loc(e) {
    return { begin: e, end: this.idx };
  }
}
class Eo {
  visitChildren(e) {
    for (const n in e) {
      const r = e[n];
      e.hasOwnProperty(n) && (r.type !== void 0 ? this.visit(r) : Array.isArray(r) && r.forEach((i) => {
        this.visit(i);
      }, this));
    }
  }
  visit(e) {
    switch (e.type) {
      case "Pattern":
        this.visitPattern(e);
        break;
      case "Flags":
        this.visitFlags(e);
        break;
      case "Disjunction":
        this.visitDisjunction(e);
        break;
      case "Alternative":
        this.visitAlternative(e);
        break;
      case "StartAnchor":
        this.visitStartAnchor(e);
        break;
      case "EndAnchor":
        this.visitEndAnchor(e);
        break;
      case "WordBoundary":
        this.visitWordBoundary(e);
        break;
      case "NonWordBoundary":
        this.visitNonWordBoundary(e);
        break;
      case "Lookahead":
        this.visitLookahead(e);
        break;
      case "NegativeLookahead":
        this.visitNegativeLookahead(e);
        break;
      case "Character":
        this.visitCharacter(e);
        break;
      case "Set":
        this.visitSet(e);
        break;
      case "Group":
        this.visitGroup(e);
        break;
      case "GroupBackReference":
        this.visitGroupBackReference(e);
        break;
      case "Quantifier":
        this.visitQuantifier(e);
        break;
    }
    this.visitChildren(e);
  }
  visitPattern(e) {
  }
  visitFlags(e) {
  }
  visitDisjunction(e) {
  }
  visitAlternative(e) {
  }
  // Assertion
  visitStartAnchor(e) {
  }
  visitEndAnchor(e) {
  }
  visitWordBoundary(e) {
  }
  visitNonWordBoundary(e) {
  }
  visitLookahead(e) {
  }
  visitNegativeLookahead(e) {
  }
  // atoms
  visitCharacter(e) {
  }
  visitSet(e) {
  }
  visitGroup(e) {
  }
  visitGroupBackReference(e) {
  }
  visitQuantifier(e) {
  }
}
let Kn = {};
const nm = new tm();
function xr(t) {
  const e = t.toString();
  if (Kn.hasOwnProperty(e))
    return Kn[e];
  {
    const n = nm.pattern(e);
    return Kn[e] = n, n;
  }
}
function rm() {
  Kn = {};
}
const vc = "Complement Sets are not supported for first char optimization", sr = `Unable to use "first char" lexer optimizations:
`;
function im(t, e = !1) {
  try {
    const n = xr(t);
    return Li(n.value, {}, n.flags.ignoreCase);
  } catch (n) {
    if (n.message === vc)
      e && mc(`${sr}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
    else {
      let r = "";
      e && (r = `
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`), Ci(`${sr}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + r);
    }
  }
  return [];
}
function Li(t, e, n) {
  switch (t.type) {
    case "Disjunction":
      for (let i = 0; i < t.value.length; i++)
        Li(t.value[i], e, n);
      break;
    case "Alternative":
      const r = t.value;
      for (let i = 0; i < r.length; i++) {
        const o = r[i];
        switch (o.type) {
          case "EndAnchor":
          case "GroupBackReference":
          case "Lookahead":
          case "NegativeLookahead":
          case "StartAnchor":
          case "WordBoundary":
          case "NonWordBoundary":
            continue;
        }
        const a = o;
        switch (a.type) {
          case "Character":
            $n(a.value, e, n);
            break;
          case "Set":
            if (a.complement === !0)
              throw Error(vc);
            W(a.value, (c) => {
              if (typeof c == "number")
                $n(c, e, n);
              else {
                const u = c;
                if (n === !0)
                  for (let p = u.from; p <= u.to; p++)
                    $n(p, e, n);
                else {
                  for (let p = u.from; p <= u.to && p < yn; p++)
                    $n(p, e, n);
                  if (u.to >= yn) {
                    const p = u.from >= yn ? u.from : yn, m = u.to, E = _t(p), S = _t(m);
                    for (let C = E; C <= S; C++)
                      e[C] = C;
                  }
                }
              }
            });
            break;
          case "Group":
            Li(a.value, e, n);
            break;
          default:
            throw Error("Non Exhaustive Match");
        }
        const s = a.quantifier !== void 0 && a.quantifier.atLeast === 0;
        if (
          // A group may be optional due to empty contents /(?:)/
          // or if everything inside it is optional /((a)?)/
          a.type === "Group" && xi(a) === !1 || // If this term is not a group it may only be optional if it has an optional quantifier
          a.type !== "Group" && s === !1
        )
          break;
      }
      break;
    default:
      throw Error("non exhaustive match!");
  }
  return ve(e);
}
function $n(t, e, n) {
  const r = _t(t);
  e[r] = r, n === !0 && om(t, e);
}
function om(t, e) {
  const n = String.fromCharCode(t), r = n.toUpperCase();
  if (r !== n) {
    const i = _t(r.charCodeAt(0));
    e[i] = i;
  } else {
    const i = n.toLowerCase();
    if (i !== n) {
      const o = _t(i.charCodeAt(0));
      e[o] = o;
    }
  }
}
function qa(t, e) {
  return an(t.value, (n) => {
    if (typeof n == "number")
      return Le(e, n);
    {
      const r = n;
      return an(e, (i) => r.from <= i && i <= r.to) !== void 0;
    }
  });
}
function xi(t) {
  const e = t.quantifier;
  return e && e.atLeast === 0 ? !0 : t.value ? te(t.value) ? Xe(t.value, xi) : xi(t.value) : !1;
}
class am extends Eo {
  constructor(e) {
    super(), this.targetCharCodes = e, this.found = !1;
  }
  visitChildren(e) {
    if (this.found !== !0) {
      switch (e.type) {
        case "Lookahead":
          this.visitLookahead(e);
          return;
        case "NegativeLookahead":
          this.visitNegativeLookahead(e);
          return;
      }
      super.visitChildren(e);
    }
  }
  visitCharacter(e) {
    Le(this.targetCharCodes, e.value) && (this.found = !0);
  }
  visitSet(e) {
    e.complement ? qa(e, this.targetCharCodes) === void 0 && (this.found = !0) : qa(e, this.targetCharCodes) !== void 0 && (this.found = !0);
  }
}
function Ao(t, e) {
  if (e instanceof RegExp) {
    const n = xr(e), r = new am(t);
    return r.visit(n), r.found;
  } else
    return an(e, (n) => Le(t, n.charCodeAt(0))) !== void 0;
}
const jt = "PATTERN", gn = "defaultMode", Un = "modes";
let Sc = typeof new RegExp("(?:)").sticky == "boolean";
function sm(t, e) {
  e = yo(e, {
    useSticky: Sc,
    debug: !1,
    safeMode: !1,
    positionTracking: "full",
    lineTerminatorCharacters: ["\r", `
`],
    tracer: (A, y) => y()
  });
  const n = e.tracer;
  n("initCharCodeToOptimizedIndexMap", () => {
    Pm();
  });
  let r;
  n("Reject Lexer.NA", () => {
    r = Cr(t, (A) => A[jt] === $e.NA);
  });
  let i = !1, o;
  n("Transform Patterns", () => {
    i = !1, o = D(r, (A) => {
      const y = A[jt];
      if (Et(y)) {
        const I = y.source;
        return I.length === 1 && // only these regExp meta characters which can appear in a length one regExp
        I !== "^" && I !== "$" && I !== "." && !y.ignoreCase ? I : I.length === 2 && I[0] === "\\" && // not a meta character
        !Le([
          "d",
          "D",
          "s",
          "S",
          "t",
          "r",
          "n",
          "t",
          "0",
          "c",
          "b",
          "B",
          "f",
          "v",
          "w",
          "W"
        ], I[1]) ? I[1] : e.useSticky ? Wa(y) : Ga(y);
      } else {
        if (St(y))
          return i = !0, { exec: y };
        if (typeof y == "object")
          return i = !0, y;
        if (typeof y == "string") {
          if (y.length === 1)
            return y;
          {
            const I = y.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"), x = new RegExp(I);
            return e.useSticky ? Wa(x) : Ga(x);
          }
        } else
          throw Error("non exhaustive match");
      }
    });
  });
  let a, s, c, u, p;
  n("misc mapping", () => {
    a = D(r, (A) => A.tokenTypeIdx), s = D(r, (A) => {
      const y = A.GROUP;
      if (y !== $e.SKIPPED) {
        if (ke(y))
          return y;
        if (At(y))
          return !1;
        throw Error("non exhaustive match");
      }
    }), c = D(r, (A) => {
      const y = A.LONGER_ALT;
      if (y)
        return te(y) ? D(y, (x) => $a(r, x)) : [$a(r, y)];
    }), u = D(r, (A) => A.PUSH_MODE), p = D(r, (A) => G(A, "POP_MODE"));
  });
  let m;
  n("Line Terminator Handling", () => {
    const A = bc(e.lineTerminatorCharacters);
    m = D(r, (y) => !1), e.positionTracking !== "onlyOffset" && (m = D(r, (y) => G(y, "LINE_BREAKS") ? !!y.LINE_BREAKS : Ic(y, A) === !1 && Ao(A, y.PATTERN)));
  });
  let E, S, C, k;
  n("Misc Mapping #2", () => {
    E = D(r, Oc), S = D(o, Nm), C = je(r, (A, y) => {
      const I = y.GROUP;
      return ke(I) && I !== $e.SKIPPED && (A[I] = []), A;
    }, {}), k = D(o, (A, y) => ({
      pattern: o[y],
      longerAlt: c[y],
      canLineTerminator: m[y],
      isCustom: E[y],
      short: S[y],
      group: s[y],
      push: u[y],
      pop: p[y],
      tokenTypeIdx: a[y],
      tokenType: r[y]
    }));
  });
  let U = !0, w = [];
  return e.safeMode || n("First Char Optimization", () => {
    w = je(r, (A, y, I) => {
      if (typeof y.PATTERN == "string") {
        const x = y.PATTERN.charCodeAt(0), H = _t(x);
        li(A, H, k[I]);
      } else if (te(y.START_CHARS_HINT)) {
        let x;
        W(y.START_CHARS_HINT, (H) => {
          const F = typeof H == "string" ? H.charCodeAt(0) : H, ee = _t(F);
          x !== ee && (x = ee, li(A, ee, k[I]));
        });
      } else if (Et(y.PATTERN))
        if (y.PATTERN.unicode)
          U = !1, e.ensureOptimizations && Ci(`${sr}	Unable to analyze < ${y.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
        else {
          const x = im(y.PATTERN, e.ensureOptimizations);
          ce(x) && (U = !1), W(x, (H) => {
            li(A, H, k[I]);
          });
        }
      else
        e.ensureOptimizations && Ci(`${sr}	TokenType: <${y.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`), U = !1;
      return A;
    }, []);
  }), {
    emptyGroups: C,
    patternIdxToConfig: k,
    charCodeToPatternIdxToConfig: w,
    hasCustom: i,
    canBeOptimized: U
  };
}
function cm(t, e) {
  let n = [];
  const r = lm(t);
  n = n.concat(r.errors);
  const i = fm(r.valid), o = i.valid;
  return n = n.concat(i.errors), n = n.concat(um(o)), n = n.concat(Am(o)), n = n.concat(Tm(o, e)), n = n.concat(vm(o)), n;
}
function um(t) {
  let e = [];
  const n = Ke(t, (r) => Et(r[jt]));
  return e = e.concat(dm(n)), e = e.concat(ym(n)), e = e.concat(mm(n)), e = e.concat(Em(n)), e = e.concat(pm(n)), e;
}
function lm(t) {
  const e = Ke(t, (i) => !G(i, jt)), n = D(e, (i) => ({
    message: "Token Type: ->" + i.name + "<- missing static 'PATTERN' property",
    type: pe.MISSING_PATTERN,
    tokenTypes: [i]
  })), r = Pr(t, e);
  return { errors: n, valid: r };
}
function fm(t) {
  const e = Ke(t, (i) => {
    const o = i[jt];
    return !Et(o) && !St(o) && !G(o, "exec") && !ke(o);
  }), n = D(e, (i) => ({
    message: "Token Type: ->" + i.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
    type: pe.INVALID_PATTERN,
    tokenTypes: [i]
  })), r = Pr(t, e);
  return { errors: n, valid: r };
}
const hm = /[^\\][$]/;
function dm(t) {
  class e extends Eo {
    constructor() {
      super(...arguments), this.found = !1;
    }
    visitEndAnchor(o) {
      this.found = !0;
    }
  }
  const n = Ke(t, (i) => {
    const o = i.PATTERN;
    try {
      const a = xr(o), s = new e();
      return s.visit(a), s.found;
    } catch {
      return hm.test(o.source);
    }
  });
  return D(n, (i) => ({
    message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + i.name + `<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,
    type: pe.EOI_ANCHOR_FOUND,
    tokenTypes: [i]
  }));
}
function pm(t) {
  const e = Ke(t, (r) => r.PATTERN.test(""));
  return D(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'PATTERN' must not match an empty string",
    type: pe.EMPTY_MATCH_PATTERN,
    tokenTypes: [r]
  }));
}
const gm = /[^\\[][\^]|^\^/;
function ym(t) {
  class e extends Eo {
    constructor() {
      super(...arguments), this.found = !1;
    }
    visitStartAnchor(o) {
      this.found = !0;
    }
  }
  const n = Ke(t, (i) => {
    const o = i.PATTERN;
    try {
      const a = xr(o), s = new e();
      return s.visit(a), s.found;
    } catch {
      return gm.test(o.source);
    }
  });
  return D(n, (i) => ({
    message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + i.name + `<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,
    type: pe.SOI_ANCHOR_FOUND,
    tokenTypes: [i]
  }));
}
function mm(t) {
  const e = Ke(t, (r) => {
    const i = r[jt];
    return i instanceof RegExp && (i.multiline || i.global);
  });
  return D(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
    type: pe.UNSUPPORTED_FLAGS_FOUND,
    tokenTypes: [r]
  }));
}
function Em(t) {
  const e = [];
  let n = D(t, (o) => je(t, (a, s) => (o.PATTERN.source === s.PATTERN.source && !Le(e, s) && s.PATTERN !== $e.NA && (e.push(s), a.push(s)), a), []));
  n = wn(n);
  const r = Ke(n, (o) => o.length > 1);
  return D(r, (o) => {
    const a = D(o, (c) => c.name);
    return {
      message: `The same RegExp pattern ->${Ze(o).PATTERN}<-has been used in all of the following Token Types: ${a.join(", ")} <-`,
      type: pe.DUPLICATE_PATTERNS_FOUND,
      tokenTypes: o
    };
  });
}
function Am(t) {
  const e = Ke(t, (r) => {
    if (!G(r, "GROUP"))
      return !1;
    const i = r.GROUP;
    return i !== $e.SKIPPED && i !== $e.NA && !ke(i);
  });
  return D(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
    type: pe.INVALID_GROUP_TYPE_FOUND,
    tokenTypes: [r]
  }));
}
function Tm(t, e) {
  const n = Ke(t, (i) => i.PUSH_MODE !== void 0 && !Le(e, i.PUSH_MODE));
  return D(n, (i) => ({
    message: `Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,
    type: pe.PUSH_MODE_DOES_NOT_EXIST,
    tokenTypes: [i]
  }));
}
function vm(t) {
  const e = [], n = je(t, (r, i, o) => {
    const a = i.PATTERN;
    return a === $e.NA || (ke(a) ? r.push({ str: a, idx: o, tokenType: i }) : Et(a) && Om(a) && r.push({ str: a.source, idx: o, tokenType: i })), r;
  }, []);
  return W(t, (r, i) => {
    W(n, ({ str: o, idx: a, tokenType: s }) => {
      if (i < a && Sm(o, r.PATTERN)) {
        const c = `Token: ->${s.name}<- can never be matched.
Because it appears AFTER the Token Type ->${r.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
        e.push({
          message: c,
          type: pe.UNREACHABLE_PATTERN,
          tokenTypes: [r, s]
        });
      }
    });
  }), e;
}
function Sm(t, e) {
  if (Et(e)) {
    const n = e.exec(t);
    return n !== null && n.index === 0;
  } else {
    if (St(e))
      return e(t, 0, [], {});
    if (G(e, "exec"))
      return e.exec(t, 0, [], {});
    if (typeof e == "string")
      return e === t;
    throw Error("non exhaustive match");
  }
}
function Om(t) {
  return an([
    ".",
    "\\",
    "[",
    "]",
    "|",
    "^",
    "$",
    "(",
    ")",
    "?",
    "*",
    "+",
    "{"
  ], (n) => t.source.indexOf(n) !== -1) === void 0;
}
function Ga(t) {
  const e = t.ignoreCase ? "i" : "";
  return new RegExp(`^(?:${t.source})`, e);
}
function Wa(t) {
  const e = t.ignoreCase ? "iy" : "y";
  return new RegExp(`${t.source}`, e);
}
function Im(t, e, n) {
  const r = [];
  return G(t, gn) || r.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + gn + `> property in its definition
`,
    type: pe.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
  }), G(t, Un) || r.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + Un + `> property in its definition
`,
    type: pe.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
  }), G(t, Un) && G(t, gn) && !G(t.modes, t.defaultMode) && r.push({
    message: `A MultiMode Lexer cannot be initialized with a ${gn}: <${t.defaultMode}>which does not exist
`,
    type: pe.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
  }), G(t, Un) && W(t.modes, (i, o) => {
    W(i, (a, s) => {
      if (At(a))
        r.push({
          message: `A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${s}>
`,
          type: pe.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
        });
      else if (G(a, "LONGER_ALT")) {
        const c = te(a.LONGER_ALT) ? a.LONGER_ALT : [a.LONGER_ALT];
        W(c, (u) => {
          !At(u) && !Le(i, u) && r.push({
            message: `A MultiMode Lexer cannot be initialized with a longer_alt <${u.name}> on token <${a.name}> outside of mode <${o}>
`,
            type: pe.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE
          });
        });
      }
    });
  }), r;
}
function bm(t, e, n) {
  const r = [];
  let i = !1;
  const o = wn(Ye(ve(t.modes))), a = Cr(o, (c) => c[jt] === $e.NA), s = bc(n);
  return e && W(a, (c) => {
    const u = Ic(c, s);
    if (u !== !1) {
      const m = {
        message: wm(c, u),
        type: u.issue,
        tokenType: c
      };
      r.push(m);
    } else
      G(c, "LINE_BREAKS") ? c.LINE_BREAKS === !0 && (i = !0) : Ao(s, c.PATTERN) && (i = !0);
  }), e && !i && r.push({
    message: `Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,
    type: pe.NO_LINE_BREAKS_FLAGS
  }), r;
}
function Rm(t) {
  const e = {}, n = He(t);
  return W(n, (r) => {
    const i = t[r];
    if (te(i))
      e[r] = [];
    else
      throw Error("non exhaustive match");
  }), e;
}
function Oc(t) {
  const e = t.PATTERN;
  if (Et(e))
    return !1;
  if (St(e))
    return !0;
  if (G(e, "exec"))
    return !0;
  if (ke(e))
    return !1;
  throw Error("non exhaustive match");
}
function Nm(t) {
  return ke(t) && t.length === 1 ? t.charCodeAt(0) : !1;
}
const _m = {
  // implements /\n|\r\n?/g.test
  test: function(t) {
    const e = t.length;
    for (let n = this.lastIndex; n < e; n++) {
      const r = t.charCodeAt(n);
      if (r === 10)
        return this.lastIndex = n + 1, !0;
      if (r === 13)
        return t.charCodeAt(n + 1) === 10 ? this.lastIndex = n + 2 : this.lastIndex = n + 1, !0;
    }
    return !1;
  },
  lastIndex: 0
};
function Ic(t, e) {
  if (G(t, "LINE_BREAKS"))
    return !1;
  if (Et(t.PATTERN)) {
    try {
      Ao(e, t.PATTERN);
    } catch (n) {
      return {
        issue: pe.IDENTIFY_TERMINATOR,
        errMsg: n.message
      };
    }
    return !1;
  } else {
    if (ke(t.PATTERN))
      return !1;
    if (Oc(t))
      return { issue: pe.CUSTOM_LINE_BREAK };
    throw Error("non exhaustive match");
  }
}
function wm(t, e) {
  if (e.issue === pe.IDENTIFY_TERMINATOR)
    return `Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;
  if (e.issue === pe.CUSTOM_LINE_BREAK)
    return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;
  throw Error("non exhaustive match");
}
function bc(t) {
  return D(t, (n) => ke(n) ? n.charCodeAt(0) : n);
}
function li(t, e, n) {
  t[e] === void 0 ? t[e] = [n] : t[e].push(n);
}
const yn = 256;
let Yn = [];
function _t(t) {
  return t < yn ? t : Yn[t];
}
function Pm() {
  if (ce(Yn)) {
    Yn = new Array(65536);
    for (let t = 0; t < 65536; t++)
      Yn[t] = t > 255 ? 255 + ~~(t / 255) : t;
  }
}
function Cn(t, e) {
  const n = t.tokenTypeIdx;
  return n === e.tokenTypeIdx ? !0 : e.isParent === !0 && e.categoryMatchesMap[n] === !0;
}
function cr(t, e) {
  return t.tokenTypeIdx === e.tokenTypeIdx;
}
let Va = 1;
const Rc = {};
function Ln(t) {
  const e = Cm(t);
  Lm(e), km(e), xm(e), W(e, (n) => {
    n.isParent = n.categoryMatches.length > 0;
  });
}
function Cm(t) {
  let e = Re(t), n = t, r = !0;
  for (; r; ) {
    n = wn(Ye(D(n, (o) => o.CATEGORIES)));
    const i = Pr(n, e);
    e = e.concat(i), ce(i) ? r = !1 : n = i;
  }
  return e;
}
function Lm(t) {
  W(t, (e) => {
    _c(e) || (Rc[Va] = e, e.tokenTypeIdx = Va++), za(e) && !te(e.CATEGORIES) && (e.CATEGORIES = [e.CATEGORIES]), za(e) || (e.CATEGORIES = []), Mm(e) || (e.categoryMatches = []), Fm(e) || (e.categoryMatchesMap = {});
  });
}
function xm(t) {
  W(t, (e) => {
    e.categoryMatches = [], W(e.categoryMatchesMap, (n, r) => {
      e.categoryMatches.push(Rc[r].tokenTypeIdx);
    });
  });
}
function km(t) {
  W(t, (e) => {
    Nc([], e);
  });
}
function Nc(t, e) {
  W(t, (n) => {
    e.categoryMatchesMap[n.tokenTypeIdx] = !0;
  }), W(e.CATEGORIES, (n) => {
    const r = t.concat(e);
    Le(r, n) || Nc(r, n);
  });
}
function _c(t) {
  return G(t, "tokenTypeIdx");
}
function za(t) {
  return G(t, "CATEGORIES");
}
function Mm(t) {
  return G(t, "categoryMatches");
}
function Fm(t) {
  return G(t, "categoryMatchesMap");
}
function $m(t) {
  return G(t, "tokenTypeIdx");
}
const Um = {
  buildUnableToPopLexerModeMessage(t) {
    return `Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`;
  },
  buildUnexpectedCharactersMessage(t, e, n, r, i) {
    return `unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${n} characters.`;
  }
};
var pe;
(function(t) {
  t[t.MISSING_PATTERN = 0] = "MISSING_PATTERN", t[t.INVALID_PATTERN = 1] = "INVALID_PATTERN", t[t.EOI_ANCHOR_FOUND = 2] = "EOI_ANCHOR_FOUND", t[t.UNSUPPORTED_FLAGS_FOUND = 3] = "UNSUPPORTED_FLAGS_FOUND", t[t.DUPLICATE_PATTERNS_FOUND = 4] = "DUPLICATE_PATTERNS_FOUND", t[t.INVALID_GROUP_TYPE_FOUND = 5] = "INVALID_GROUP_TYPE_FOUND", t[t.PUSH_MODE_DOES_NOT_EXIST = 6] = "PUSH_MODE_DOES_NOT_EXIST", t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE", t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY", t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST", t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED", t[t.SOI_ANCHOR_FOUND = 11] = "SOI_ANCHOR_FOUND", t[t.EMPTY_MATCH_PATTERN = 12] = "EMPTY_MATCH_PATTERN", t[t.NO_LINE_BREAKS_FLAGS = 13] = "NO_LINE_BREAKS_FLAGS", t[t.UNREACHABLE_PATTERN = 14] = "UNREACHABLE_PATTERN", t[t.IDENTIFY_TERMINATOR = 15] = "IDENTIFY_TERMINATOR", t[t.CUSTOM_LINE_BREAK = 16] = "CUSTOM_LINE_BREAK", t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE = 17] = "MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE";
})(pe || (pe = {}));
const mn = {
  deferDefinitionErrorsHandling: !1,
  positionTracking: "full",
  lineTerminatorsPattern: /\n|\r\n?/g,
  lineTerminatorCharacters: [`
`, "\r"],
  ensureOptimizations: !1,
  safeMode: !1,
  errorMessageProvider: Um,
  traceInitPerf: !1,
  skipValidations: !1,
  recoveryEnabled: !0
};
Object.freeze(mn);
let $e = class {
  constructor(e, n = mn) {
    if (this.lexerDefinition = e, this.lexerDefinitionErrors = [], this.lexerDefinitionWarning = [], this.patternIdxToConfig = {}, this.charCodeToPatternIdxToConfig = {}, this.modes = [], this.emptyGroups = {}, this.trackStartLines = !0, this.trackEndLines = !0, this.hasCustom = !1, this.canModeBeOptimized = {}, this.TRACE_INIT = (i, o) => {
      if (this.traceInitPerf === !0) {
        this.traceInitIndent++;
        const a = new Array(this.traceInitIndent + 1).join("	");
        this.traceInitIndent < this.traceInitMaxIdent && console.log(`${a}--> <${i}>`);
        const { time: s, value: c } = Ec(o), u = s > 10 ? console.warn : console.log;
        return this.traceInitIndent < this.traceInitMaxIdent && u(`${a}<-- <${i}> time: ${s}ms`), this.traceInitIndent--, c;
      } else
        return o();
    }, typeof n == "boolean")
      throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);
    this.config = Ue({}, mn, n);
    const r = this.config.traceInitPerf;
    r === !0 ? (this.traceInitMaxIdent = 1 / 0, this.traceInitPerf = !0) : typeof r == "number" && (this.traceInitMaxIdent = r, this.traceInitPerf = !0), this.traceInitIndent = -1, this.TRACE_INIT("Lexer Constructor", () => {
      let i, o = !0;
      this.TRACE_INIT("Lexer Config handling", () => {
        if (this.config.lineTerminatorsPattern === mn.lineTerminatorsPattern)
          this.config.lineTerminatorsPattern = _m;
        else if (this.config.lineTerminatorCharacters === mn.lineTerminatorCharacters)
          throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);
        if (n.safeMode && n.ensureOptimizations)
          throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
        this.trackStartLines = /full|onlyStart/i.test(this.config.positionTracking), this.trackEndLines = /full/i.test(this.config.positionTracking), te(e) ? i = {
          modes: { defaultMode: Re(e) },
          defaultMode: gn
        } : (o = !1, i = Re(e));
      }), this.config.skipValidations === !1 && (this.TRACE_INIT("performRuntimeChecks", () => {
        this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(Im(i, this.trackStartLines, this.config.lineTerminatorCharacters));
      }), this.TRACE_INIT("performWarningRuntimeChecks", () => {
        this.lexerDefinitionWarning = this.lexerDefinitionWarning.concat(bm(i, this.trackStartLines, this.config.lineTerminatorCharacters));
      })), i.modes = i.modes ? i.modes : {}, W(i.modes, (s, c) => {
        i.modes[c] = Cr(s, (u) => At(u));
      });
      const a = He(i.modes);
      if (W(i.modes, (s, c) => {
        this.TRACE_INIT(`Mode: <${c}> processing`, () => {
          if (this.modes.push(c), this.config.skipValidations === !1 && this.TRACE_INIT("validatePatterns", () => {
            this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(cm(s, a));
          }), ce(this.lexerDefinitionErrors)) {
            Ln(s);
            let u;
            this.TRACE_INIT("analyzeTokenTypes", () => {
              u = sm(s, {
                lineTerminatorCharacters: this.config.lineTerminatorCharacters,
                positionTracking: n.positionTracking,
                ensureOptimizations: n.ensureOptimizations,
                safeMode: n.safeMode,
                tracer: this.TRACE_INIT
              });
            }), this.patternIdxToConfig[c] = u.patternIdxToConfig, this.charCodeToPatternIdxToConfig[c] = u.charCodeToPatternIdxToConfig, this.emptyGroups = Ue({}, this.emptyGroups, u.emptyGroups), this.hasCustom = u.hasCustom || this.hasCustom, this.canModeBeOptimized[c] = u.canBeOptimized;
          }
        });
      }), this.defaultMode = i.defaultMode, !ce(this.lexerDefinitionErrors) && !this.config.deferDefinitionErrorsHandling) {
        const c = D(this.lexerDefinitionErrors, (u) => u.message).join(`-----------------------
`);
        throw new Error(`Errors detected in definition of Lexer:
` + c);
      }
      W(this.lexerDefinitionWarning, (s) => {
        mc(s.message);
      }), this.TRACE_INIT("Choosing sub-methods implementations", () => {
        if (Sc ? (this.chopInput = nn, this.match = this.matchWithTest) : (this.updateLastIndex = Te, this.match = this.matchWithExec), o && (this.handleModes = Te), this.trackStartLines === !1 && (this.computeNewColumn = nn), this.trackEndLines === !1 && (this.updateTokenEndLineColumnLocation = Te), /full/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createFullToken;
        else if (/onlyStart/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createStartOnlyToken;
        else if (/onlyOffset/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createOffsetOnlyToken;
        else
          throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);
        this.hasCustom ? (this.addToken = this.addTokenUsingPush, this.handlePayload = this.handlePayloadWithCustom) : (this.addToken = this.addTokenUsingMemberAccess, this.handlePayload = this.handlePayloadNoCustom);
      }), this.TRACE_INIT("Failed Optimization Warnings", () => {
        const s = je(this.canModeBeOptimized, (c, u, p) => (u === !1 && c.push(p), c), []);
        if (n.ensureOptimizations && !ce(s))
          throw Error(`Lexer Modes: < ${s.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
      }), this.TRACE_INIT("clearRegExpParserCache", () => {
        rm();
      }), this.TRACE_INIT("toFastProperties", () => {
        Ac(this);
      });
    });
  }
  tokenize(e, n = this.defaultMode) {
    if (!ce(this.lexerDefinitionErrors)) {
      const i = D(this.lexerDefinitionErrors, (o) => o.message).join(`-----------------------
`);
      throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
` + i);
    }
    return this.tokenizeInternal(e, n);
  }
  // There is quite a bit of duplication between this and "tokenizeInternalLazy"
  // This is intentional due to performance considerations.
  // this method also used quite a bit of `!` none null assertions because it is too optimized
  // for `tsc` to always understand it is "safe"
  tokenizeInternal(e, n) {
    let r, i, o, a, s, c, u, p, m, E, S, C, k, U, w;
    const A = e, y = A.length;
    let I = 0, x = 0;
    const H = this.hasCustom ? 0 : Math.floor(e.length / 10), F = new Array(H), ee = [];
    let z = this.trackStartLines ? 1 : void 0, ie = this.trackStartLines ? 1 : void 0;
    const oe = Rm(this.emptyGroups), X = this.trackStartLines, ue = this.config.lineTerminatorsPattern;
    let me = 0, ge = [], fe = [];
    const Ne = [], Ae = [];
    Object.freeze(Ae);
    let _;
    function P() {
      return ge;
    }
    function $(d) {
      const R = _t(d), O = fe[R];
      return O === void 0 ? Ae : O;
    }
    const f = (d) => {
      if (Ne.length === 1 && // if we have both a POP_MODE and a PUSH_MODE this is in-fact a "transition"
      // So no error should occur.
      d.tokenType.PUSH_MODE === void 0) {
        const R = this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(d);
        ee.push({
          offset: d.startOffset,
          line: d.startLine,
          column: d.startColumn,
          length: d.image.length,
          message: R
        });
      } else {
        Ne.pop();
        const R = on(Ne);
        ge = this.patternIdxToConfig[R], fe = this.charCodeToPatternIdxToConfig[R], me = ge.length;
        const O = this.canModeBeOptimized[R] && this.config.safeMode === !1;
        fe && O ? _ = $ : _ = P;
      }
    };
    function T(d) {
      Ne.push(d), fe = this.charCodeToPatternIdxToConfig[d], ge = this.patternIdxToConfig[d], me = ge.length, me = ge.length;
      const R = this.canModeBeOptimized[d] && this.config.safeMode === !1;
      fe && R ? _ = $ : _ = P;
    }
    T.call(this, n);
    let l;
    const h = this.config.recoveryEnabled;
    for (; I < y; ) {
      c = null;
      const d = A.charCodeAt(I), R = _(d), O = R.length;
      for (r = 0; r < O; r++) {
        l = R[r];
        const b = l.pattern;
        u = null;
        const L = l.short;
        if (L !== !1 ? d === L && (c = b) : l.isCustom === !0 ? (w = b.exec(A, I, F, oe), w !== null ? (c = w[0], w.payload !== void 0 && (u = w.payload)) : c = null) : (this.updateLastIndex(b, I), c = this.match(b, e, I)), c !== null) {
          if (s = l.longerAlt, s !== void 0) {
            const q = s.length;
            for (o = 0; o < q; o++) {
              const K = ge[s[o]], Z = K.pattern;
              if (p = null, K.isCustom === !0 ? (w = Z.exec(A, I, F, oe), w !== null ? (a = w[0], w.payload !== void 0 && (p = w.payload)) : a = null) : (this.updateLastIndex(Z, I), a = this.match(Z, e, I)), a && a.length > c.length) {
                c = a, u = p, l = K;
                break;
              }
            }
          }
          break;
        }
      }
      if (c !== null) {
        if (m = c.length, E = l.group, E !== void 0 && (S = l.tokenTypeIdx, C = this.createTokenInstance(c, I, S, l.tokenType, z, ie, m), this.handlePayload(C, u), E === !1 ? x = this.addToken(F, x, C) : oe[E].push(C)), e = this.chopInput(e, m), I = I + m, ie = this.computeNewColumn(ie, m), X === !0 && l.canLineTerminator === !0) {
          let b = 0, L, q;
          ue.lastIndex = 0;
          do
            L = ue.test(c), L === !0 && (q = ue.lastIndex - 1, b++);
          while (L === !0);
          b !== 0 && (z = z + b, ie = m - q, this.updateTokenEndLineColumnLocation(C, E, q, b, z, ie, m));
        }
        this.handleModes(l, f, T, C);
      } else {
        const b = I, L = z, q = ie;
        let K = h === !1;
        for (; K === !1 && I < y; )
          for (e = this.chopInput(e, 1), I++, i = 0; i < me; i++) {
            const Z = ge[i], ae = Z.pattern, _e = Z.short;
            if (_e !== !1 ? A.charCodeAt(I) === _e && (K = !0) : Z.isCustom === !0 ? K = ae.exec(A, I, F, oe) !== null : (this.updateLastIndex(ae, I), K = ae.exec(e) !== null), K === !0)
              break;
          }
        if (k = I - b, ie = this.computeNewColumn(ie, k), U = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(A, b, k, L, q), ee.push({
          offset: b,
          line: L,
          column: q,
          length: k,
          message: U
        }), h === !1)
          break;
      }
    }
    return this.hasCustom || (F.length = x), {
      tokens: F,
      groups: oe,
      errors: ee
    };
  }
  handleModes(e, n, r, i) {
    if (e.pop === !0) {
      const o = e.push;
      n(i), o !== void 0 && r.call(this, o);
    } else e.push !== void 0 && r.call(this, e.push);
  }
  chopInput(e, n) {
    return e.substring(n);
  }
  updateLastIndex(e, n) {
    e.lastIndex = n;
  }
  // TODO: decrease this under 600 characters? inspect stripping comments option in TSC compiler
  updateTokenEndLineColumnLocation(e, n, r, i, o, a, s) {
    let c, u;
    n !== void 0 && (c = r === s - 1, u = c ? -1 : 0, i === 1 && c === !0 || (e.endLine = o + u, e.endColumn = a - 1 + -u));
  }
  computeNewColumn(e, n) {
    return e + n;
  }
  createOffsetOnlyToken(e, n, r, i) {
    return {
      image: e,
      startOffset: n,
      tokenTypeIdx: r,
      tokenType: i
    };
  }
  createStartOnlyToken(e, n, r, i, o, a) {
    return {
      image: e,
      startOffset: n,
      startLine: o,
      startColumn: a,
      tokenTypeIdx: r,
      tokenType: i
    };
  }
  createFullToken(e, n, r, i, o, a, s) {
    return {
      image: e,
      startOffset: n,
      endOffset: n + s - 1,
      startLine: o,
      endLine: o,
      startColumn: a,
      endColumn: a + s - 1,
      tokenTypeIdx: r,
      tokenType: i
    };
  }
  addTokenUsingPush(e, n, r) {
    return e.push(r), n;
  }
  addTokenUsingMemberAccess(e, n, r) {
    return e[n] = r, n++, n;
  }
  handlePayloadNoCustom(e, n) {
  }
  handlePayloadWithCustom(e, n) {
    n !== null && (e.payload = n);
  }
  matchWithTest(e, n, r) {
    return e.test(n) === !0 ? n.substring(r, e.lastIndex) : null;
  }
  matchWithExec(e, n) {
    const r = e.exec(n);
    return r !== null ? r[0] : null;
  }
};
$e.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
$e.NA = /NOT_APPLICABLE/;
function An(t) {
  return wc(t) ? t.LABEL : t.name;
}
function wc(t) {
  return ke(t.LABEL) && t.LABEL !== "";
}
const jm = "parent", Ha = "categories", Ka = "label", Ya = "group", Xa = "push_mode", Ja = "pop_mode", Za = "longer_alt", Qa = "line_breaks", es = "start_chars_hint";
function To(t) {
  return Dm(t);
}
function Dm(t) {
  const e = t.pattern, n = {};
  if (n.name = t.name, At(e) || (n.PATTERN = e), G(t, jm))
    throw `The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;
  return G(t, Ha) && (n.CATEGORIES = t[Ha]), Ln([n]), G(t, Ka) && (n.LABEL = t[Ka]), G(t, Ya) && (n.GROUP = t[Ya]), G(t, Ja) && (n.POP_MODE = t[Ja]), G(t, Xa) && (n.PUSH_MODE = t[Xa]), G(t, Za) && (n.LONGER_ALT = t[Za]), G(t, Qa) && (n.LINE_BREAKS = t[Qa]), G(t, es) && (n.START_CHARS_HINT = t[es]), n;
}
const Dt = To({ name: "EOF", pattern: $e.NA });
Ln([Dt]);
function vo(t, e, n, r, i, o, a, s) {
  return {
    image: e,
    startOffset: n,
    endOffset: r,
    startLine: i,
    endLine: o,
    startColumn: a,
    endColumn: s,
    tokenTypeIdx: t.tokenTypeIdx,
    tokenType: t
  };
}
function Bm(t, e) {
  return Cn(t, e);
}
const Pc = {
  buildMismatchTokenMessage({ expected: t, actual: e, previous: n, ruleName: r }) {
    return `Expecting ${wc(t) ? `--> ${An(t)} <--` : `token of type --> ${t.name} <--`} but found --> '${e.image}' <--`;
  },
  buildNotAllInputParsedMessage({ firstRedundant: t, ruleName: e }) {
    return "Redundant input, expecting EOF but found: " + t.image;
  },
  buildNoViableAltMessage({ expectedPathsPerAlt: t, actual: e, previous: n, customUserDescription: r, ruleName: i }) {
    const o = "Expecting: ", s = `
but found: '` + Ze(e).image + "'";
    if (r)
      return o + r + s;
    {
      const c = je(t, (E, S) => E.concat(S), []), u = D(c, (E) => `[${D(E, (S) => An(S)).join(", ")}]`), m = `one of these possible Token sequences:
${D(u, (E, S) => `  ${S + 1}. ${E}`).join(`
`)}`;
      return o + m + s;
    }
  },
  buildEarlyExitMessage({ expectedIterationPaths: t, actual: e, customUserDescription: n, ruleName: r }) {
    const i = "Expecting: ", a = `
but found: '` + Ze(e).image + "'";
    if (n)
      return i + n + a;
    {
      const c = `expecting at least one iteration which starts with one of these possible Token sequences::
  <${D(t, (u) => `[${D(u, (p) => An(p)).join(",")}]`).join(" ,")}>`;
      return i + c + a;
    }
  }
};
Object.freeze(Pc);
const qm = {
  buildRuleNotFoundError(t, e) {
    return "Invalid grammar, reference to a rule which is not defined: ->" + e.nonTerminalName + `<-
inside top level rule: ->` + t.name + "<-";
  }
}, kt = {
  buildDuplicateFoundError(t, e) {
    function n(p) {
      return p instanceof he ? p.terminalType.name : p instanceof De ? p.nonTerminalName : "";
    }
    const r = t.name, i = Ze(e), o = i.idx, a = it(i), s = n(i), c = o > 0;
    let u = `->${a}${c ? o : ""}<- ${s ? `with argument: ->${s}<-` : ""}
                  appears more than once (${e.length} times) in the top level rule: ->${r}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;
    return u = u.replace(/[ \t]+/g, " "), u = u.replace(/\s\s+/g, `
`), u;
  },
  buildNamespaceConflictError(t) {
    return `Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${t.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;
  },
  buildAlternationPrefixAmbiguityError(t) {
    const e = D(t.prefixPath, (i) => An(i)).join(", "), n = t.alternation.idx === 0 ? "" : t.alternation.idx;
    return `Ambiguous alternatives: <${t.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${n}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;
  },
  buildAlternationAmbiguityError(t) {
    const e = D(t.prefixPath, (i) => An(i)).join(", "), n = t.alternation.idx === 0 ? "" : t.alternation.idx;
    let r = `Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(" ,")}> in <OR${n}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;
    return r = r + `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`, r;
  },
  buildEmptyRepetitionError(t) {
    let e = it(t.repetition);
    return t.repetition.idx !== 0 && (e += t.repetition.idx), `The repetition <${e}> within Rule <${t.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`;
  },
  // TODO: remove - `errors_public` from nyc.config.js exclude
  //       once this method is fully removed from this file
  buildTokenNameError(t) {
    return "deprecated";
  },
  buildEmptyAlternationError(t) {
    return `Ambiguous empty alternative: <${t.emptyChoiceIdx + 1}> in <OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`;
  },
  buildTooManyAlternativesError(t) {
    return `An Alternation cannot have more than 256 alternatives:
<OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
 has ${t.alternation.definition.length + 1} alternatives.`;
  },
  buildLeftRecursionError(t) {
    const e = t.topLevelRule.name, n = D(t.leftRecursionPath, (o) => o.name), r = `${e} --> ${n.concat([e]).join(" --> ")}`;
    return `Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${r}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;
  },
  // TODO: remove - `errors_public` from nyc.config.js exclude
  //       once this method is fully removed from this file
  buildInvalidRuleNameError(t) {
    return "deprecated";
  },
  buildDuplicateRuleNameError(t) {
    let e;
    return t.topLevelRule instanceof sn ? e = t.topLevelRule.name : e = t.topLevelRule, `Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`;
  }
};
function Gm(t, e) {
  const n = new Wm(t, e);
  return n.resolveRefs(), n.errors;
}
class Wm extends cn {
  constructor(e, n) {
    super(), this.nameToTopRule = e, this.errMsgProvider = n, this.errors = [];
  }
  resolveRefs() {
    W(ve(this.nameToTopRule), (e) => {
      this.currTopLevel = e, e.accept(this);
    });
  }
  visitNonTerminal(e) {
    const n = this.nameToTopRule[e.nonTerminalName];
    if (n)
      e.referencedRule = n;
    else {
      const r = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, e);
      this.errors.push({
        message: r,
        type: Ce.UNRESOLVED_SUBRULE_REF,
        ruleName: this.currTopLevel.name,
        unresolvedRefName: e.nonTerminalName
      });
    }
  }
}
class Vm extends Lr {
  constructor(e, n) {
    super(), this.topProd = e, this.path = n, this.possibleTokTypes = [], this.nextProductionName = "", this.nextProductionOccurrence = 0, this.found = !1, this.isAtEndOfPath = !1;
  }
  startWalking() {
    if (this.found = !1, this.path.ruleStack[0] !== this.topProd.name)
      throw Error("The path does not start with the walker's top Rule!");
    return this.ruleStack = Re(this.path.ruleStack).reverse(), this.occurrenceStack = Re(this.path.occurrenceStack).reverse(), this.ruleStack.pop(), this.occurrenceStack.pop(), this.updateExpectedNext(), this.walk(this.topProd), this.possibleTokTypes;
  }
  walk(e, n = []) {
    this.found || super.walk(e, n);
  }
  walkProdRef(e, n, r) {
    if (e.referencedRule.name === this.nextProductionName && e.idx === this.nextProductionOccurrence) {
      const i = n.concat(r);
      this.updateExpectedNext(), this.walk(e.referencedRule, i);
    }
  }
  updateExpectedNext() {
    ce(this.ruleStack) ? (this.nextProductionName = "", this.nextProductionOccurrence = 0, this.isAtEndOfPath = !0) : (this.nextProductionName = this.ruleStack.pop(), this.nextProductionOccurrence = this.occurrenceStack.pop());
  }
}
class zm extends Vm {
  constructor(e, n) {
    super(e, n), this.path = n, this.nextTerminalName = "", this.nextTerminalOccurrence = 0, this.nextTerminalName = this.path.lastTok.name, this.nextTerminalOccurrence = this.path.lastTokOccurrence;
  }
  walkTerminal(e, n, r) {
    if (this.isAtEndOfPath && e.terminalType.name === this.nextTerminalName && e.idx === this.nextTerminalOccurrence && !this.found) {
      const i = n.concat(r), o = new Me({ definition: i });
      this.possibleTokTypes = Pn(o), this.found = !0;
    }
  }
}
class kr extends Lr {
  constructor(e, n) {
    super(), this.topRule = e, this.occurrence = n, this.result = {
      token: void 0,
      occurrence: void 0,
      isEndOfRule: void 0
    };
  }
  startWalking() {
    return this.walk(this.topRule), this.result;
  }
}
class Hm extends kr {
  walkMany(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Ze(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof he && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkMany(e, n, r);
  }
}
class ts extends kr {
  walkManySep(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Ze(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof he && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkManySep(e, n, r);
  }
}
class Km extends kr {
  walkAtLeastOne(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Ze(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof he && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkAtLeastOne(e, n, r);
  }
}
class ns extends kr {
  walkAtLeastOneSep(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Ze(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof he && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkAtLeastOneSep(e, n, r);
  }
}
function ki(t, e, n = []) {
  n = Re(n);
  let r = [], i = 0;
  function o(s) {
    return s.concat(be(t, i + 1));
  }
  function a(s) {
    const c = ki(o(s), e, n);
    return r.concat(c);
  }
  for (; n.length < e && i < t.length; ) {
    const s = t[i];
    if (s instanceof Me)
      return a(s.definition);
    if (s instanceof De)
      return a(s.definition);
    if (s instanceof xe)
      r = a(s.definition);
    else if (s instanceof ft) {
      const c = s.definition.concat([
        new Se({
          definition: s.definition
        })
      ]);
      return a(c);
    } else if (s instanceof ht) {
      const c = [
        new Me({ definition: s.definition }),
        new Se({
          definition: [new he({ terminalType: s.separator })].concat(s.definition)
        })
      ];
      return a(c);
    } else if (s instanceof et) {
      const c = s.definition.concat([
        new Se({
          definition: [new he({ terminalType: s.separator })].concat(s.definition)
        })
      ]);
      r = a(c);
    } else if (s instanceof Se) {
      const c = s.definition.concat([
        new Se({
          definition: s.definition
        })
      ]);
      r = a(c);
    } else {
      if (s instanceof tt)
        return W(s.definition, (c) => {
          ce(c.definition) === !1 && (r = a(c.definition));
        }), r;
      if (s instanceof he)
        n.push(s.terminalType);
      else
        throw Error("non exhaustive match");
    }
    i++;
  }
  return r.push({
    partialPath: n,
    suffixDef: be(t, i)
  }), r;
}
function Cc(t, e, n, r) {
  const i = "EXIT_NONE_TERMINAL", o = [i], a = "EXIT_ALTERNATIVE";
  let s = !1;
  const c = e.length, u = c - r - 1, p = [], m = [];
  for (m.push({
    idx: -1,
    def: t,
    ruleStack: [],
    occurrenceStack: []
  }); !ce(m); ) {
    const E = m.pop();
    if (E === a) {
      s && on(m).idx <= u && m.pop();
      continue;
    }
    const S = E.def, C = E.idx, k = E.ruleStack, U = E.occurrenceStack;
    if (ce(S))
      continue;
    const w = S[0];
    if (w === i) {
      const A = {
        idx: C,
        def: be(S),
        ruleStack: On(k),
        occurrenceStack: On(U)
      };
      m.push(A);
    } else if (w instanceof he)
      if (C < c - 1) {
        const A = C + 1, y = e[A];
        if (n(y, w.terminalType)) {
          const I = {
            idx: A,
            def: be(S),
            ruleStack: k,
            occurrenceStack: U
          };
          m.push(I);
        }
      } else if (C === c - 1)
        p.push({
          nextTokenType: w.terminalType,
          nextTokenOccurrence: w.idx,
          ruleStack: k,
          occurrenceStack: U
        }), s = !0;
      else
        throw Error("non exhaustive match");
    else if (w instanceof De) {
      const A = Re(k);
      A.push(w.nonTerminalName);
      const y = Re(U);
      y.push(w.idx);
      const I = {
        idx: C,
        def: w.definition.concat(o, be(S)),
        ruleStack: A,
        occurrenceStack: y
      };
      m.push(I);
    } else if (w instanceof xe) {
      const A = {
        idx: C,
        def: be(S),
        ruleStack: k,
        occurrenceStack: U
      };
      m.push(A), m.push(a);
      const y = {
        idx: C,
        def: w.definition.concat(be(S)),
        ruleStack: k,
        occurrenceStack: U
      };
      m.push(y);
    } else if (w instanceof ft) {
      const A = new Se({
        definition: w.definition,
        idx: w.idx
      }), y = w.definition.concat([A], be(S)), I = {
        idx: C,
        def: y,
        ruleStack: k,
        occurrenceStack: U
      };
      m.push(I);
    } else if (w instanceof ht) {
      const A = new he({
        terminalType: w.separator
      }), y = new Se({
        definition: [A].concat(w.definition),
        idx: w.idx
      }), I = w.definition.concat([y], be(S)), x = {
        idx: C,
        def: I,
        ruleStack: k,
        occurrenceStack: U
      };
      m.push(x);
    } else if (w instanceof et) {
      const A = {
        idx: C,
        def: be(S),
        ruleStack: k,
        occurrenceStack: U
      };
      m.push(A), m.push(a);
      const y = new he({
        terminalType: w.separator
      }), I = new Se({
        definition: [y].concat(w.definition),
        idx: w.idx
      }), x = w.definition.concat([I], be(S)), H = {
        idx: C,
        def: x,
        ruleStack: k,
        occurrenceStack: U
      };
      m.push(H);
    } else if (w instanceof Se) {
      const A = {
        idx: C,
        def: be(S),
        ruleStack: k,
        occurrenceStack: U
      };
      m.push(A), m.push(a);
      const y = new Se({
        definition: w.definition,
        idx: w.idx
      }), I = w.definition.concat([y], be(S)), x = {
        idx: C,
        def: I,
        ruleStack: k,
        occurrenceStack: U
      };
      m.push(x);
    } else if (w instanceof tt)
      for (let A = w.definition.length - 1; A >= 0; A--) {
        const y = w.definition[A], I = {
          idx: C,
          def: y.definition.concat(be(S)),
          ruleStack: k,
          occurrenceStack: U
        };
        m.push(I), m.push(a);
      }
    else if (w instanceof Me)
      m.push({
        idx: C,
        def: w.definition.concat(be(S)),
        ruleStack: k,
        occurrenceStack: U
      });
    else if (w instanceof sn)
      m.push(Ym(w, C, k, U));
    else
      throw Error("non exhaustive match");
  }
  return p;
}
function Ym(t, e, n, r) {
  const i = Re(n);
  i.push(t.name);
  const o = Re(r);
  return o.push(1), {
    idx: e,
    def: t.definition,
    ruleStack: i,
    occurrenceStack: o
  };
}
var de;
(function(t) {
  t[t.OPTION = 0] = "OPTION", t[t.REPETITION = 1] = "REPETITION", t[t.REPETITION_MANDATORY = 2] = "REPETITION_MANDATORY", t[t.REPETITION_MANDATORY_WITH_SEPARATOR = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR", t[t.REPETITION_WITH_SEPARATOR = 4] = "REPETITION_WITH_SEPARATOR", t[t.ALTERNATION = 5] = "ALTERNATION";
})(de || (de = {}));
function Lc(t) {
  if (t instanceof xe || t === "Option")
    return de.OPTION;
  if (t instanceof Se || t === "Repetition")
    return de.REPETITION;
  if (t instanceof ft || t === "RepetitionMandatory")
    return de.REPETITION_MANDATORY;
  if (t instanceof ht || t === "RepetitionMandatoryWithSeparator")
    return de.REPETITION_MANDATORY_WITH_SEPARATOR;
  if (t instanceof et || t === "RepetitionWithSeparator")
    return de.REPETITION_WITH_SEPARATOR;
  if (t instanceof tt || t === "Alternation")
    return de.ALTERNATION;
  throw Error("non exhaustive match");
}
function Xm(t, e, n, r, i, o) {
  const a = So(t, e, n), s = Mc(a) ? cr : Cn;
  return o(a, r, s, i);
}
function Jm(t, e, n, r, i, o) {
  const a = Oo(t, e, i, n), s = Mc(a) ? cr : Cn;
  return o(a[0], s, r);
}
function Zm(t, e, n, r) {
  const i = t.length, o = Xe(t, (a) => Xe(a, (s) => s.length === 1));
  if (e)
    return function(a) {
      const s = D(a, (c) => c.GATE);
      for (let c = 0; c < i; c++) {
        const u = t[c], p = u.length, m = s[c];
        if (!(m !== void 0 && m.call(this) === !1))
          e: for (let E = 0; E < p; E++) {
            const S = u[E], C = S.length;
            for (let k = 0; k < C; k++) {
              const U = this.LA(k + 1);
              if (n(U, S[k]) === !1)
                continue e;
            }
            return c;
          }
      }
    };
  if (o && !r) {
    const a = D(t, (c) => Ye(c)), s = je(a, (c, u, p) => (W(u, (m) => {
      G(c, m.tokenTypeIdx) || (c[m.tokenTypeIdx] = p), W(m.categoryMatches, (E) => {
        G(c, E) || (c[E] = p);
      });
    }), c), {});
    return function() {
      const c = this.LA(1);
      return s[c.tokenTypeIdx];
    };
  } else
    return function() {
      for (let a = 0; a < i; a++) {
        const s = t[a], c = s.length;
        e: for (let u = 0; u < c; u++) {
          const p = s[u], m = p.length;
          for (let E = 0; E < m; E++) {
            const S = this.LA(E + 1);
            if (n(S, p[E]) === !1)
              continue e;
          }
          return a;
        }
      }
    };
}
function Qm(t, e, n) {
  const r = Xe(t, (o) => o.length === 1), i = t.length;
  if (r && !n) {
    const o = Ye(t);
    if (o.length === 1 && ce(o[0].categoryMatches)) {
      const s = o[0].tokenTypeIdx;
      return function() {
        return this.LA(1).tokenTypeIdx === s;
      };
    } else {
      const a = je(o, (s, c, u) => (s[c.tokenTypeIdx] = !0, W(c.categoryMatches, (p) => {
        s[p] = !0;
      }), s), []);
      return function() {
        const s = this.LA(1);
        return a[s.tokenTypeIdx] === !0;
      };
    }
  } else
    return function() {
      e: for (let o = 0; o < i; o++) {
        const a = t[o], s = a.length;
        for (let c = 0; c < s; c++) {
          const u = this.LA(c + 1);
          if (e(u, a[c]) === !1)
            continue e;
        }
        return !0;
      }
      return !1;
    };
}
class eE extends Lr {
  constructor(e, n, r) {
    super(), this.topProd = e, this.targetOccurrence = n, this.targetProdType = r;
  }
  startWalking() {
    return this.walk(this.topProd), this.restDef;
  }
  checkIsTarget(e, n, r, i) {
    return e.idx === this.targetOccurrence && this.targetProdType === n ? (this.restDef = r.concat(i), !0) : !1;
  }
  walkOption(e, n, r) {
    this.checkIsTarget(e, de.OPTION, n, r) || super.walkOption(e, n, r);
  }
  walkAtLeastOne(e, n, r) {
    this.checkIsTarget(e, de.REPETITION_MANDATORY, n, r) || super.walkOption(e, n, r);
  }
  walkAtLeastOneSep(e, n, r) {
    this.checkIsTarget(e, de.REPETITION_MANDATORY_WITH_SEPARATOR, n, r) || super.walkOption(e, n, r);
  }
  walkMany(e, n, r) {
    this.checkIsTarget(e, de.REPETITION, n, r) || super.walkOption(e, n, r);
  }
  walkManySep(e, n, r) {
    this.checkIsTarget(e, de.REPETITION_WITH_SEPARATOR, n, r) || super.walkOption(e, n, r);
  }
}
class xc extends cn {
  constructor(e, n, r) {
    super(), this.targetOccurrence = e, this.targetProdType = n, this.targetRef = r, this.result = [];
  }
  checkIsTarget(e, n) {
    e.idx === this.targetOccurrence && this.targetProdType === n && (this.targetRef === void 0 || e === this.targetRef) && (this.result = e.definition);
  }
  visitOption(e) {
    this.checkIsTarget(e, de.OPTION);
  }
  visitRepetition(e) {
    this.checkIsTarget(e, de.REPETITION);
  }
  visitRepetitionMandatory(e) {
    this.checkIsTarget(e, de.REPETITION_MANDATORY);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.checkIsTarget(e, de.REPETITION_MANDATORY_WITH_SEPARATOR);
  }
  visitRepetitionWithSeparator(e) {
    this.checkIsTarget(e, de.REPETITION_WITH_SEPARATOR);
  }
  visitAlternation(e) {
    this.checkIsTarget(e, de.ALTERNATION);
  }
}
function rs(t) {
  const e = new Array(t);
  for (let n = 0; n < t; n++)
    e[n] = [];
  return e;
}
function fi(t) {
  let e = [""];
  for (let n = 0; n < t.length; n++) {
    const r = t[n], i = [];
    for (let o = 0; o < e.length; o++) {
      const a = e[o];
      i.push(a + "_" + r.tokenTypeIdx);
      for (let s = 0; s < r.categoryMatches.length; s++) {
        const c = "_" + r.categoryMatches[s];
        i.push(a + c);
      }
    }
    e = i;
  }
  return e;
}
function tE(t, e, n) {
  for (let r = 0; r < t.length; r++) {
    if (r === n)
      continue;
    const i = t[r];
    for (let o = 0; o < e.length; o++) {
      const a = e[o];
      if (i[a] === !0)
        return !1;
    }
  }
  return !0;
}
function kc(t, e) {
  const n = D(t, (a) => ki([a], 1)), r = rs(n.length), i = D(n, (a) => {
    const s = {};
    return W(a, (c) => {
      const u = fi(c.partialPath);
      W(u, (p) => {
        s[p] = !0;
      });
    }), s;
  });
  let o = n;
  for (let a = 1; a <= e; a++) {
    const s = o;
    o = rs(s.length);
    for (let c = 0; c < s.length; c++) {
      const u = s[c];
      for (let p = 0; p < u.length; p++) {
        const m = u[p].partialPath, E = u[p].suffixDef, S = fi(m);
        if (tE(i, S, c) || ce(E) || m.length === e) {
          const k = r[c];
          if (Mi(k, m) === !1) {
            k.push(m);
            for (let U = 0; U < S.length; U++) {
              const w = S[U];
              i[c][w] = !0;
            }
          }
        } else {
          const k = ki(E, a + 1, m);
          o[c] = o[c].concat(k), W(k, (U) => {
            const w = fi(U.partialPath);
            W(w, (A) => {
              i[c][A] = !0;
            });
          });
        }
      }
    }
  }
  return r;
}
function So(t, e, n, r) {
  const i = new xc(t, de.ALTERNATION, r);
  return e.accept(i), kc(i.result, n);
}
function Oo(t, e, n, r) {
  const i = new xc(t, n);
  e.accept(i);
  const o = i.result, s = new eE(e, t, n).startWalking(), c = new Me({ definition: o }), u = new Me({ definition: s });
  return kc([c, u], r);
}
function Mi(t, e) {
  e: for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (r.length === e.length) {
      for (let i = 0; i < r.length; i++) {
        const o = e[i], a = r[i];
        if ((o === a || a.categoryMatchesMap[o.tokenTypeIdx] !== void 0) === !1)
          continue e;
      }
      return !0;
    }
  }
  return !1;
}
function nE(t, e) {
  return t.length < e.length && Xe(t, (n, r) => {
    const i = e[r];
    return n === i || i.categoryMatchesMap[n.tokenTypeIdx];
  });
}
function Mc(t) {
  return Xe(t, (e) => Xe(e, (n) => Xe(n, (r) => ce(r.categoryMatches))));
}
function rE(t) {
  const e = t.lookaheadStrategy.validate({
    rules: t.rules,
    tokenTypes: t.tokenTypes,
    grammarName: t.grammarName
  });
  return D(e, (n) => Object.assign({ type: Ce.CUSTOM_LOOKAHEAD_VALIDATION }, n));
}
function iE(t, e, n, r) {
  const i = We(t, (c) => oE(c, n)), o = mE(t, e, n), a = We(t, (c) => dE(c, n)), s = We(t, (c) => cE(c, t, r, n));
  return i.concat(o, a, s);
}
function oE(t, e) {
  const n = new sE();
  t.accept(n);
  const r = n.allProductions, i = Ey(r, aE), o = Qe(i, (s) => s.length > 1);
  return D(ve(o), (s) => {
    const c = Ze(s), u = e.buildDuplicateFoundError(t, s), p = it(c), m = {
      message: u,
      type: Ce.DUPLICATE_PRODUCTIONS,
      ruleName: t.name,
      dslName: p,
      occurrence: c.idx
    }, E = Fc(c);
    return E && (m.parameter = E), m;
  });
}
function aE(t) {
  return `${it(t)}_#_${t.idx}_#_${Fc(t)}`;
}
function Fc(t) {
  return t instanceof he ? t.terminalType.name : t instanceof De ? t.nonTerminalName : "";
}
class sE extends cn {
  constructor() {
    super(...arguments), this.allProductions = [];
  }
  visitNonTerminal(e) {
    this.allProductions.push(e);
  }
  visitOption(e) {
    this.allProductions.push(e);
  }
  visitRepetitionWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatory(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetition(e) {
    this.allProductions.push(e);
  }
  visitAlternation(e) {
    this.allProductions.push(e);
  }
  visitTerminal(e) {
    this.allProductions.push(e);
  }
}
function cE(t, e, n, r) {
  const i = [];
  if (je(e, (a, s) => s.name === t.name ? a + 1 : a, 0) > 1) {
    const a = r.buildDuplicateRuleNameError({
      topLevelRule: t,
      grammarName: n
    });
    i.push({
      message: a,
      type: Ce.DUPLICATE_RULE_NAME,
      ruleName: t.name
    });
  }
  return i;
}
function uE(t, e, n) {
  const r = [];
  let i;
  return Le(e, t) || (i = `Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${n}<-as it is not defined in any of the super grammars `, r.push({
    message: i,
    type: Ce.INVALID_RULE_OVERRIDE,
    ruleName: t
  })), r;
}
function $c(t, e, n, r = []) {
  const i = [], o = Xn(e.definition);
  if (ce(o))
    return [];
  {
    const a = t.name;
    Le(o, t) && i.push({
      message: n.buildLeftRecursionError({
        topLevelRule: t,
        leftRecursionPath: r
      }),
      type: Ce.LEFT_RECURSION,
      ruleName: a
    });
    const c = Pr(o, r.concat([t])), u = We(c, (p) => {
      const m = Re(r);
      return m.push(p), $c(t, p, n, m);
    });
    return i.concat(u);
  }
}
function Xn(t) {
  let e = [];
  if (ce(t))
    return e;
  const n = Ze(t);
  if (n instanceof De)
    e.push(n.referencedRule);
  else if (n instanceof Me || n instanceof xe || n instanceof ft || n instanceof ht || n instanceof et || n instanceof Se)
    e = e.concat(Xn(n.definition));
  else if (n instanceof tt)
    e = Ye(D(n.definition, (o) => Xn(o.definition)));
  else if (!(n instanceof he)) throw Error("non exhaustive match");
  const r = ir(n), i = t.length > 1;
  if (r && i) {
    const o = be(t);
    return e.concat(Xn(o));
  } else
    return e;
}
class Io extends cn {
  constructor() {
    super(...arguments), this.alternations = [];
  }
  visitAlternation(e) {
    this.alternations.push(e);
  }
}
function lE(t, e) {
  const n = new Io();
  t.accept(n);
  const r = n.alternations;
  return We(r, (o) => {
    const a = On(o.definition);
    return We(a, (s, c) => {
      const u = Cc([s], [], Cn, 1);
      return ce(u) ? [
        {
          message: e.buildEmptyAlternationError({
            topLevelRule: t,
            alternation: o,
            emptyChoiceIdx: c
          }),
          type: Ce.NONE_LAST_EMPTY_ALT,
          ruleName: t.name,
          occurrence: o.idx,
          alternative: c + 1
        }
      ] : [];
    });
  });
}
function fE(t, e, n) {
  const r = new Io();
  t.accept(r);
  let i = r.alternations;
  return i = Cr(i, (a) => a.ignoreAmbiguities === !0), We(i, (a) => {
    const s = a.idx, c = a.maxLookahead || e, u = So(s, t, c, a), p = gE(u, a, t, n), m = yE(u, a, t, n);
    return p.concat(m);
  });
}
class hE extends cn {
  constructor() {
    super(...arguments), this.allProductions = [];
  }
  visitRepetitionWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatory(e) {
    this.allProductions.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.allProductions.push(e);
  }
  visitRepetition(e) {
    this.allProductions.push(e);
  }
}
function dE(t, e) {
  const n = new Io();
  t.accept(n);
  const r = n.alternations;
  return We(r, (o) => o.definition.length > 255 ? [
    {
      message: e.buildTooManyAlternativesError({
        topLevelRule: t,
        alternation: o
      }),
      type: Ce.TOO_MANY_ALTS,
      ruleName: t.name,
      occurrence: o.idx
    }
  ] : []);
}
function pE(t, e, n) {
  const r = [];
  return W(t, (i) => {
    const o = new hE();
    i.accept(o);
    const a = o.allProductions;
    W(a, (s) => {
      const c = Lc(s), u = s.maxLookahead || e, p = s.idx, E = Oo(p, i, c, u)[0];
      if (ce(Ye(E))) {
        const S = n.buildEmptyRepetitionError({
          topLevelRule: i,
          repetition: s
        });
        r.push({
          message: S,
          type: Ce.NO_NON_EMPTY_LOOKAHEAD,
          ruleName: i.name
        });
      }
    });
  }), r;
}
function gE(t, e, n, r) {
  const i = [], o = je(t, (s, c, u) => (e.definition[u].ignoreAmbiguities === !0 || W(c, (p) => {
    const m = [u];
    W(t, (E, S) => {
      u !== S && Mi(E, p) && // ignore (skip) ambiguities with this "other" alternative
      e.definition[S].ignoreAmbiguities !== !0 && m.push(S);
    }), m.length > 1 && !Mi(i, p) && (i.push(p), s.push({
      alts: m,
      path: p
    }));
  }), s), []);
  return D(o, (s) => {
    const c = D(s.alts, (p) => p + 1);
    return {
      message: r.buildAlternationAmbiguityError({
        topLevelRule: n,
        alternation: e,
        ambiguityIndices: c,
        prefixPath: s.path
      }),
      type: Ce.AMBIGUOUS_ALTS,
      ruleName: n.name,
      occurrence: e.idx,
      alternatives: s.alts
    };
  });
}
function yE(t, e, n, r) {
  const i = je(t, (a, s, c) => {
    const u = D(s, (p) => ({ idx: c, path: p }));
    return a.concat(u);
  }, []);
  return wn(We(i, (a) => {
    if (e.definition[a.idx].ignoreAmbiguities === !0)
      return [];
    const c = a.idx, u = a.path, p = Ke(i, (E) => (
      // ignore (skip) ambiguities with this "other" alternative
      e.definition[E.idx].ignoreAmbiguities !== !0 && E.idx < c && // checking for strict prefix because identical lookaheads
      // will be be detected using a different validation.
      nE(E.path, u)
    ));
    return D(p, (E) => {
      const S = [E.idx + 1, c + 1], C = e.idx === 0 ? "" : e.idx;
      return {
        message: r.buildAlternationPrefixAmbiguityError({
          topLevelRule: n,
          alternation: e,
          ambiguityIndices: S,
          prefixPath: E.path
        }),
        type: Ce.AMBIGUOUS_PREFIX_ALTS,
        ruleName: n.name,
        occurrence: C,
        alternatives: S
      };
    });
  }));
}
function mE(t, e, n) {
  const r = [], i = D(e, (o) => o.name);
  return W(t, (o) => {
    const a = o.name;
    if (Le(i, a)) {
      const s = n.buildNamespaceConflictError(o);
      r.push({
        message: s,
        type: Ce.CONFLICT_TOKENS_RULES_NAMESPACE,
        ruleName: a
      });
    }
  }), r;
}
function EE(t) {
  const e = yo(t, {
    errMsgProvider: qm
  }), n = {};
  return W(t.rules, (r) => {
    n[r.name] = r;
  }), Gm(n, e.errMsgProvider);
}
function AE(t) {
  return t = yo(t, {
    errMsgProvider: kt
  }), iE(t.rules, t.tokenTypes, t.errMsgProvider, t.grammarName);
}
const Uc = "MismatchedTokenException", jc = "NoViableAltException", Dc = "EarlyExitException", Bc = "NotAllInputParsedException", qc = [
  Uc,
  jc,
  Dc,
  Bc
];
Object.freeze(qc);
function ur(t) {
  return Le(qc, t.name);
}
class Mr extends Error {
  constructor(e, n) {
    super(e), this.token = n, this.resyncedTokens = [], Object.setPrototypeOf(this, new.target.prototype), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
}
class Gc extends Mr {
  constructor(e, n, r) {
    super(e, n), this.previousToken = r, this.name = Uc;
  }
}
class TE extends Mr {
  constructor(e, n, r) {
    super(e, n), this.previousToken = r, this.name = jc;
  }
}
class vE extends Mr {
  constructor(e, n) {
    super(e, n), this.name = Bc;
  }
}
class SE extends Mr {
  constructor(e, n, r) {
    super(e, n), this.previousToken = r, this.name = Dc;
  }
}
const hi = {}, Wc = "InRuleRecoveryException";
class OE extends Error {
  constructor(e) {
    super(e), this.name = Wc;
  }
}
class IE {
  initRecoverable(e) {
    this.firstAfterRepMap = {}, this.resyncFollows = {}, this.recoveryEnabled = G(e, "recoveryEnabled") ? e.recoveryEnabled : Tt.recoveryEnabled, this.recoveryEnabled && (this.attemptInRepetitionRecovery = bE);
  }
  getTokenToInsert(e) {
    const n = vo(e, "", NaN, NaN, NaN, NaN, NaN, NaN);
    return n.isInsertedInRecovery = !0, n;
  }
  canTokenTypeBeInsertedInRecovery(e) {
    return !0;
  }
  canTokenTypeBeDeletedInRecovery(e) {
    return !0;
  }
  tryInRepetitionRecovery(e, n, r, i) {
    const o = this.findReSyncTokenType(), a = this.exportLexerState(), s = [];
    let c = !1;
    const u = this.LA(1);
    let p = this.LA(1);
    const m = () => {
      const E = this.LA(0), S = this.errorMessageProvider.buildMismatchTokenMessage({
        expected: i,
        actual: u,
        previous: E,
        ruleName: this.getCurrRuleFullName()
      }), C = new Gc(S, u, this.LA(0));
      C.resyncedTokens = On(s), this.SAVE_ERROR(C);
    };
    for (; !c; )
      if (this.tokenMatcher(p, i)) {
        m();
        return;
      } else if (r.call(this)) {
        m(), e.apply(this, n);
        return;
      } else this.tokenMatcher(p, o) ? c = !0 : (p = this.SKIP_TOKEN(), this.addToResyncTokens(p, s));
    this.importLexerState(a);
  }
  shouldInRepetitionRecoveryBeTried(e, n, r) {
    return !(r === !1 || this.tokenMatcher(this.LA(1), e) || this.isBackTracking() || this.canPerformInRuleRecovery(e, this.getFollowsForInRuleRecovery(e, n)));
  }
  // Error Recovery functionality
  getFollowsForInRuleRecovery(e, n) {
    const r = this.getCurrentGrammarPath(e, n);
    return this.getNextPossibleTokenTypes(r);
  }
  tryInRuleRecovery(e, n) {
    if (this.canRecoverWithSingleTokenInsertion(e, n))
      return this.getTokenToInsert(e);
    if (this.canRecoverWithSingleTokenDeletion(e)) {
      const r = this.SKIP_TOKEN();
      return this.consumeToken(), r;
    }
    throw new OE("sad sad panda");
  }
  canPerformInRuleRecovery(e, n) {
    return this.canRecoverWithSingleTokenInsertion(e, n) || this.canRecoverWithSingleTokenDeletion(e);
  }
  canRecoverWithSingleTokenInsertion(e, n) {
    if (!this.canTokenTypeBeInsertedInRecovery(e) || ce(n))
      return !1;
    const r = this.LA(1);
    return an(n, (o) => this.tokenMatcher(r, o)) !== void 0;
  }
  canRecoverWithSingleTokenDeletion(e) {
    return this.canTokenTypeBeDeletedInRecovery(e) ? this.tokenMatcher(this.LA(2), e) : !1;
  }
  isInCurrentRuleReSyncSet(e) {
    const n = this.getCurrFollowKey(), r = this.getFollowSetFromFollowKey(n);
    return Le(r, e);
  }
  findReSyncTokenType() {
    const e = this.flattenFollowSet();
    let n = this.LA(1), r = 2;
    for (; ; ) {
      const i = an(e, (o) => Bm(n, o));
      if (i !== void 0)
        return i;
      n = this.LA(r), r++;
    }
  }
  getCurrFollowKey() {
    if (this.RULE_STACK.length === 1)
      return hi;
    const e = this.getLastExplicitRuleShortName(), n = this.getLastExplicitRuleOccurrenceIndex(), r = this.getPreviousExplicitRuleShortName();
    return {
      ruleName: this.shortRuleNameToFullName(e),
      idxInCallingRule: n,
      inRule: this.shortRuleNameToFullName(r)
    };
  }
  buildFullFollowKeyStack() {
    const e = this.RULE_STACK, n = this.RULE_OCCURRENCE_STACK;
    return D(e, (r, i) => i === 0 ? hi : {
      ruleName: this.shortRuleNameToFullName(r),
      idxInCallingRule: n[i],
      inRule: this.shortRuleNameToFullName(e[i - 1])
    });
  }
  flattenFollowSet() {
    const e = D(this.buildFullFollowKeyStack(), (n) => this.getFollowSetFromFollowKey(n));
    return Ye(e);
  }
  getFollowSetFromFollowKey(e) {
    if (e === hi)
      return [Dt];
    const n = e.ruleName + e.idxInCallingRule + Tc + e.inRule;
    return this.resyncFollows[n];
  }
  // It does not make any sense to include a virtual EOF token in the list of resynced tokens
  // as EOF does not really exist and thus does not contain any useful information (line/column numbers)
  addToResyncTokens(e, n) {
    return this.tokenMatcher(e, Dt) || n.push(e), n;
  }
  reSyncTo(e) {
    const n = [];
    let r = this.LA(1);
    for (; this.tokenMatcher(r, e) === !1; )
      r = this.SKIP_TOKEN(), this.addToResyncTokens(r, n);
    return On(n);
  }
  attemptInRepetitionRecovery(e, n, r, i, o, a, s) {
  }
  getCurrentGrammarPath(e, n) {
    const r = this.getHumanReadableRuleStack(), i = Re(this.RULE_OCCURRENCE_STACK);
    return {
      ruleStack: r,
      occurrenceStack: i,
      lastTok: e,
      lastTokOccurrence: n
    };
  }
  getHumanReadableRuleStack() {
    return D(this.RULE_STACK, (e) => this.shortRuleNameToFullName(e));
  }
}
function bE(t, e, n, r, i, o, a) {
  const s = this.getKeyForAutomaticLookahead(r, i);
  let c = this.firstAfterRepMap[s];
  if (c === void 0) {
    const E = this.getCurrRuleFullName(), S = this.getGAstProductions()[E];
    c = new o(S, i).startWalking(), this.firstAfterRepMap[s] = c;
  }
  let u = c.token, p = c.occurrence;
  const m = c.isEndOfRule;
  this.RULE_STACK.length === 1 && m && u === void 0 && (u = Dt, p = 1), !(u === void 0 || p === void 0) && this.shouldInRepetitionRecoveryBeTried(u, p, a) && this.tryInRepetitionRecovery(t, e, n, u);
}
const RE = 4, Pt = 8, Vc = 1 << Pt, zc = 2 << Pt, Fi = 3 << Pt, $i = 4 << Pt, Ui = 5 << Pt, Jn = 6 << Pt;
function di(t, e, n) {
  return n | e | t;
}
class NE {
  constructor(e) {
    var n;
    this.maxLookahead = (n = e?.maxLookahead) !== null && n !== void 0 ? n : Tt.maxLookahead;
  }
  validate(e) {
    const n = this.validateNoLeftRecursion(e.rules);
    if (ce(n)) {
      const r = this.validateEmptyOrAlternatives(e.rules), i = this.validateAmbiguousAlternationAlternatives(e.rules, this.maxLookahead), o = this.validateSomeNonEmptyLookaheadPath(e.rules, this.maxLookahead);
      return [
        ...n,
        ...r,
        ...i,
        ...o
      ];
    }
    return n;
  }
  validateNoLeftRecursion(e) {
    return We(e, (n) => $c(n, n, kt));
  }
  validateEmptyOrAlternatives(e) {
    return We(e, (n) => lE(n, kt));
  }
  validateAmbiguousAlternationAlternatives(e, n) {
    return We(e, (r) => fE(r, n, kt));
  }
  validateSomeNonEmptyLookaheadPath(e, n) {
    return pE(e, n, kt);
  }
  buildLookaheadForAlternation(e) {
    return Xm(e.prodOccurrence, e.rule, e.maxLookahead, e.hasPredicates, e.dynamicTokensEnabled, Zm);
  }
  buildLookaheadForOptional(e) {
    return Jm(e.prodOccurrence, e.rule, e.maxLookahead, e.dynamicTokensEnabled, Lc(e.prodType), Qm);
  }
}
class _E {
  initLooksAhead(e) {
    this.dynamicTokensEnabled = G(e, "dynamicTokensEnabled") ? e.dynamicTokensEnabled : Tt.dynamicTokensEnabled, this.maxLookahead = G(e, "maxLookahead") ? e.maxLookahead : Tt.maxLookahead, this.lookaheadStrategy = G(e, "lookaheadStrategy") ? e.lookaheadStrategy : new NE({ maxLookahead: this.maxLookahead }), this.lookAheadFuncsCache = /* @__PURE__ */ new Map();
  }
  preComputeLookaheadFunctions(e) {
    W(e, (n) => {
      this.TRACE_INIT(`${n.name} Rule Lookahead`, () => {
        const { alternation: r, repetition: i, option: o, repetitionMandatory: a, repetitionMandatoryWithSeparator: s, repetitionWithSeparator: c } = PE(n);
        W(r, (u) => {
          const p = u.idx === 0 ? "" : u.idx;
          this.TRACE_INIT(`${it(u)}${p}`, () => {
            const m = this.lookaheadStrategy.buildLookaheadForAlternation({
              prodOccurrence: u.idx,
              rule: n,
              maxLookahead: u.maxLookahead || this.maxLookahead,
              hasPredicates: u.hasPredicates,
              dynamicTokensEnabled: this.dynamicTokensEnabled
            }), E = di(this.fullRuleNameToShort[n.name], Vc, u.idx);
            this.setLaFuncCache(E, m);
          });
        }), W(i, (u) => {
          this.computeLookaheadFunc(n, u.idx, Fi, "Repetition", u.maxLookahead, it(u));
        }), W(o, (u) => {
          this.computeLookaheadFunc(n, u.idx, zc, "Option", u.maxLookahead, it(u));
        }), W(a, (u) => {
          this.computeLookaheadFunc(n, u.idx, $i, "RepetitionMandatory", u.maxLookahead, it(u));
        }), W(s, (u) => {
          this.computeLookaheadFunc(n, u.idx, Jn, "RepetitionMandatoryWithSeparator", u.maxLookahead, it(u));
        }), W(c, (u) => {
          this.computeLookaheadFunc(n, u.idx, Ui, "RepetitionWithSeparator", u.maxLookahead, it(u));
        });
      });
    });
  }
  computeLookaheadFunc(e, n, r, i, o, a) {
    this.TRACE_INIT(`${a}${n === 0 ? "" : n}`, () => {
      const s = this.lookaheadStrategy.buildLookaheadForOptional({
        prodOccurrence: n,
        rule: e,
        maxLookahead: o || this.maxLookahead,
        dynamicTokensEnabled: this.dynamicTokensEnabled,
        prodType: i
      }), c = di(this.fullRuleNameToShort[e.name], r, n);
      this.setLaFuncCache(c, s);
    });
  }
  // this actually returns a number, but it is always used as a string (object prop key)
  getKeyForAutomaticLookahead(e, n) {
    const r = this.getLastExplicitRuleShortName();
    return di(r, e, n);
  }
  getLaFuncFromCache(e) {
    return this.lookAheadFuncsCache.get(e);
  }
  /* istanbul ignore next */
  setLaFuncCache(e, n) {
    this.lookAheadFuncsCache.set(e, n);
  }
}
class wE extends cn {
  constructor() {
    super(...arguments), this.dslMethods = {
      option: [],
      alternation: [],
      repetition: [],
      repetitionWithSeparator: [],
      repetitionMandatory: [],
      repetitionMandatoryWithSeparator: []
    };
  }
  reset() {
    this.dslMethods = {
      option: [],
      alternation: [],
      repetition: [],
      repetitionWithSeparator: [],
      repetitionMandatory: [],
      repetitionMandatoryWithSeparator: []
    };
  }
  visitOption(e) {
    this.dslMethods.option.push(e);
  }
  visitRepetitionWithSeparator(e) {
    this.dslMethods.repetitionWithSeparator.push(e);
  }
  visitRepetitionMandatory(e) {
    this.dslMethods.repetitionMandatory.push(e);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.dslMethods.repetitionMandatoryWithSeparator.push(e);
  }
  visitRepetition(e) {
    this.dslMethods.repetition.push(e);
  }
  visitAlternation(e) {
    this.dslMethods.alternation.push(e);
  }
}
const jn = new wE();
function PE(t) {
  jn.reset(), t.accept(jn);
  const e = jn.dslMethods;
  return jn.reset(), e;
}
function is(t, e) {
  isNaN(t.startOffset) === !0 ? (t.startOffset = e.startOffset, t.endOffset = e.endOffset) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset);
}
function os(t, e) {
  isNaN(t.startOffset) === !0 ? (t.startOffset = e.startOffset, t.startColumn = e.startColumn, t.startLine = e.startLine, t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine);
}
function CE(t, e, n) {
  t.children[n] === void 0 ? t.children[n] = [e] : t.children[n].push(e);
}
function LE(t, e, n) {
  t.children[e] === void 0 ? t.children[e] = [n] : t.children[e].push(n);
}
const xE = "name";
function Hc(t, e) {
  Object.defineProperty(t, xE, {
    enumerable: !1,
    configurable: !0,
    writable: !1,
    value: e
  });
}
function kE(t, e) {
  const n = He(t), r = n.length;
  for (let i = 0; i < r; i++) {
    const o = n[i], a = t[o], s = a.length;
    for (let c = 0; c < s; c++) {
      const u = a[c];
      u.tokenTypeIdx === void 0 && this[u.name](u.children, e);
    }
  }
}
function ME(t, e) {
  const n = function() {
  };
  Hc(n, t + "BaseSemantics");
  const r = {
    visit: function(i, o) {
      if (te(i) && (i = i[0]), !At(i))
        return this[i.name](i.children, o);
    },
    validateVisitor: function() {
      const i = $E(this, e);
      if (!ce(i)) {
        const o = D(i, (a) => a.msg);
        throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o.join(`

`).replace(/\n/g, `
	`)}`);
      }
    }
  };
  return n.prototype = r, n.prototype.constructor = n, n._RULE_NAMES = e, n;
}
function FE(t, e, n) {
  const r = function() {
  };
  Hc(r, t + "BaseSemanticsWithDefaults");
  const i = Object.create(n.prototype);
  return W(e, (o) => {
    i[o] = kE;
  }), r.prototype = i, r.prototype.constructor = r, r;
}
var ji;
(function(t) {
  t[t.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", t[t.MISSING_METHOD = 1] = "MISSING_METHOD";
})(ji || (ji = {}));
function $E(t, e) {
  return UE(t, e);
}
function UE(t, e) {
  const n = Ke(e, (i) => St(t[i]) === !1), r = D(n, (i) => ({
    msg: `Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,
    type: ji.MISSING_METHOD,
    methodName: i
  }));
  return wn(r);
}
class jE {
  initTreeBuilder(e) {
    if (this.CST_STACK = [], this.outputCst = e.outputCst, this.nodeLocationTracking = G(e, "nodeLocationTracking") ? e.nodeLocationTracking : Tt.nodeLocationTracking, !this.outputCst)
      this.cstInvocationStateUpdate = Te, this.cstFinallyStateUpdate = Te, this.cstPostTerminal = Te, this.cstPostNonTerminal = Te, this.cstPostRule = Te;
    else if (/full/i.test(this.nodeLocationTracking))
      this.recoveryEnabled ? (this.setNodeLocationFromToken = os, this.setNodeLocationFromNode = os, this.cstPostRule = Te, this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery) : (this.setNodeLocationFromToken = Te, this.setNodeLocationFromNode = Te, this.cstPostRule = this.cstPostRuleFull, this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular);
    else if (/onlyOffset/i.test(this.nodeLocationTracking))
      this.recoveryEnabled ? (this.setNodeLocationFromToken = is, this.setNodeLocationFromNode = is, this.cstPostRule = Te, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery) : (this.setNodeLocationFromToken = Te, this.setNodeLocationFromNode = Te, this.cstPostRule = this.cstPostRuleOnlyOffset, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular);
    else if (/none/i.test(this.nodeLocationTracking))
      this.setNodeLocationFromToken = Te, this.setNodeLocationFromNode = Te, this.cstPostRule = Te, this.setInitialNodeLocation = Te;
    else
      throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`);
  }
  setInitialNodeLocationOnlyOffsetRecovery(e) {
    e.location = {
      startOffset: NaN,
      endOffset: NaN
    };
  }
  setInitialNodeLocationOnlyOffsetRegular(e) {
    e.location = {
      // without error recovery the starting Location of a new CstNode is guaranteed
      // To be the next Token's startOffset (for valid inputs).
      // For invalid inputs there won't be any CSTOutput so this potential
      // inaccuracy does not matter
      startOffset: this.LA(1).startOffset,
      endOffset: NaN
    };
  }
  setInitialNodeLocationFullRecovery(e) {
    e.location = {
      startOffset: NaN,
      startLine: NaN,
      startColumn: NaN,
      endOffset: NaN,
      endLine: NaN,
      endColumn: NaN
    };
  }
  /**
       *  @see setInitialNodeLocationOnlyOffsetRegular for explanation why this work
  
       * @param cstNode
       */
  setInitialNodeLocationFullRegular(e) {
    const n = this.LA(1);
    e.location = {
      startOffset: n.startOffset,
      startLine: n.startLine,
      startColumn: n.startColumn,
      endOffset: NaN,
      endLine: NaN,
      endColumn: NaN
    };
  }
  cstInvocationStateUpdate(e) {
    const n = {
      name: e,
      children: /* @__PURE__ */ Object.create(null)
    };
    this.setInitialNodeLocation(n), this.CST_STACK.push(n);
  }
  cstFinallyStateUpdate() {
    this.CST_STACK.pop();
  }
  cstPostRuleFull(e) {
    const n = this.LA(0), r = e.location;
    r.startOffset <= n.startOffset ? (r.endOffset = n.endOffset, r.endLine = n.endLine, r.endColumn = n.endColumn) : (r.startOffset = NaN, r.startLine = NaN, r.startColumn = NaN);
  }
  cstPostRuleOnlyOffset(e) {
    const n = this.LA(0), r = e.location;
    r.startOffset <= n.startOffset ? r.endOffset = n.endOffset : r.startOffset = NaN;
  }
  cstPostTerminal(e, n) {
    const r = this.CST_STACK[this.CST_STACK.length - 1];
    CE(r, n, e), this.setNodeLocationFromToken(r.location, n);
  }
  cstPostNonTerminal(e, n) {
    const r = this.CST_STACK[this.CST_STACK.length - 1];
    LE(r, n, e), this.setNodeLocationFromNode(r.location, e.location);
  }
  getBaseCstVisitorConstructor() {
    if (At(this.baseCstVisitorConstructor)) {
      const e = ME(this.className, He(this.gastProductionsCache));
      return this.baseCstVisitorConstructor = e, e;
    }
    return this.baseCstVisitorConstructor;
  }
  getBaseCstVisitorConstructorWithDefaults() {
    if (At(this.baseCstVisitorWithDefaultsConstructor)) {
      const e = FE(this.className, He(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
      return this.baseCstVisitorWithDefaultsConstructor = e, e;
    }
    return this.baseCstVisitorWithDefaultsConstructor;
  }
  getLastExplicitRuleShortName() {
    const e = this.RULE_STACK;
    return e[e.length - 1];
  }
  getPreviousExplicitRuleShortName() {
    const e = this.RULE_STACK;
    return e[e.length - 2];
  }
  getLastExplicitRuleOccurrenceIndex() {
    const e = this.RULE_OCCURRENCE_STACK;
    return e[e.length - 1];
  }
}
class DE {
  initLexerAdapter() {
    this.tokVector = [], this.tokVectorLength = 0, this.currIdx = -1;
  }
  set input(e) {
    if (this.selfAnalysisDone !== !0)
      throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
    this.reset(), this.tokVector = e, this.tokVectorLength = e.length;
  }
  get input() {
    return this.tokVector;
  }
  // skips a token and returns the next token
  SKIP_TOKEN() {
    return this.currIdx <= this.tokVector.length - 2 ? (this.consumeToken(), this.LA(1)) : fr;
  }
  // Lexer (accessing Token vector) related methods which can be overridden to implement lazy lexers
  // or lexers dependent on parser context.
  LA(e) {
    const n = this.currIdx + e;
    return n < 0 || this.tokVectorLength <= n ? fr : this.tokVector[n];
  }
  consumeToken() {
    this.currIdx++;
  }
  exportLexerState() {
    return this.currIdx;
  }
  importLexerState(e) {
    this.currIdx = e;
  }
  resetLexerState() {
    this.currIdx = -1;
  }
  moveToTerminatedState() {
    this.currIdx = this.tokVector.length - 1;
  }
  getLexerPosition() {
    return this.exportLexerState();
  }
}
class BE {
  ACTION(e) {
    return e.call(this);
  }
  consume(e, n, r) {
    return this.consumeInternal(n, e, r);
  }
  subrule(e, n, r) {
    return this.subruleInternal(n, e, r);
  }
  option(e, n) {
    return this.optionInternal(n, e);
  }
  or(e, n) {
    return this.orInternal(n, e);
  }
  many(e, n) {
    return this.manyInternal(e, n);
  }
  atLeastOne(e, n) {
    return this.atLeastOneInternal(e, n);
  }
  CONSUME(e, n) {
    return this.consumeInternal(e, 0, n);
  }
  CONSUME1(e, n) {
    return this.consumeInternal(e, 1, n);
  }
  CONSUME2(e, n) {
    return this.consumeInternal(e, 2, n);
  }
  CONSUME3(e, n) {
    return this.consumeInternal(e, 3, n);
  }
  CONSUME4(e, n) {
    return this.consumeInternal(e, 4, n);
  }
  CONSUME5(e, n) {
    return this.consumeInternal(e, 5, n);
  }
  CONSUME6(e, n) {
    return this.consumeInternal(e, 6, n);
  }
  CONSUME7(e, n) {
    return this.consumeInternal(e, 7, n);
  }
  CONSUME8(e, n) {
    return this.consumeInternal(e, 8, n);
  }
  CONSUME9(e, n) {
    return this.consumeInternal(e, 9, n);
  }
  SUBRULE(e, n) {
    return this.subruleInternal(e, 0, n);
  }
  SUBRULE1(e, n) {
    return this.subruleInternal(e, 1, n);
  }
  SUBRULE2(e, n) {
    return this.subruleInternal(e, 2, n);
  }
  SUBRULE3(e, n) {
    return this.subruleInternal(e, 3, n);
  }
  SUBRULE4(e, n) {
    return this.subruleInternal(e, 4, n);
  }
  SUBRULE5(e, n) {
    return this.subruleInternal(e, 5, n);
  }
  SUBRULE6(e, n) {
    return this.subruleInternal(e, 6, n);
  }
  SUBRULE7(e, n) {
    return this.subruleInternal(e, 7, n);
  }
  SUBRULE8(e, n) {
    return this.subruleInternal(e, 8, n);
  }
  SUBRULE9(e, n) {
    return this.subruleInternal(e, 9, n);
  }
  OPTION(e) {
    return this.optionInternal(e, 0);
  }
  OPTION1(e) {
    return this.optionInternal(e, 1);
  }
  OPTION2(e) {
    return this.optionInternal(e, 2);
  }
  OPTION3(e) {
    return this.optionInternal(e, 3);
  }
  OPTION4(e) {
    return this.optionInternal(e, 4);
  }
  OPTION5(e) {
    return this.optionInternal(e, 5);
  }
  OPTION6(e) {
    return this.optionInternal(e, 6);
  }
  OPTION7(e) {
    return this.optionInternal(e, 7);
  }
  OPTION8(e) {
    return this.optionInternal(e, 8);
  }
  OPTION9(e) {
    return this.optionInternal(e, 9);
  }
  OR(e) {
    return this.orInternal(e, 0);
  }
  OR1(e) {
    return this.orInternal(e, 1);
  }
  OR2(e) {
    return this.orInternal(e, 2);
  }
  OR3(e) {
    return this.orInternal(e, 3);
  }
  OR4(e) {
    return this.orInternal(e, 4);
  }
  OR5(e) {
    return this.orInternal(e, 5);
  }
  OR6(e) {
    return this.orInternal(e, 6);
  }
  OR7(e) {
    return this.orInternal(e, 7);
  }
  OR8(e) {
    return this.orInternal(e, 8);
  }
  OR9(e) {
    return this.orInternal(e, 9);
  }
  MANY(e) {
    this.manyInternal(0, e);
  }
  MANY1(e) {
    this.manyInternal(1, e);
  }
  MANY2(e) {
    this.manyInternal(2, e);
  }
  MANY3(e) {
    this.manyInternal(3, e);
  }
  MANY4(e) {
    this.manyInternal(4, e);
  }
  MANY5(e) {
    this.manyInternal(5, e);
  }
  MANY6(e) {
    this.manyInternal(6, e);
  }
  MANY7(e) {
    this.manyInternal(7, e);
  }
  MANY8(e) {
    this.manyInternal(8, e);
  }
  MANY9(e) {
    this.manyInternal(9, e);
  }
  MANY_SEP(e) {
    this.manySepFirstInternal(0, e);
  }
  MANY_SEP1(e) {
    this.manySepFirstInternal(1, e);
  }
  MANY_SEP2(e) {
    this.manySepFirstInternal(2, e);
  }
  MANY_SEP3(e) {
    this.manySepFirstInternal(3, e);
  }
  MANY_SEP4(e) {
    this.manySepFirstInternal(4, e);
  }
  MANY_SEP5(e) {
    this.manySepFirstInternal(5, e);
  }
  MANY_SEP6(e) {
    this.manySepFirstInternal(6, e);
  }
  MANY_SEP7(e) {
    this.manySepFirstInternal(7, e);
  }
  MANY_SEP8(e) {
    this.manySepFirstInternal(8, e);
  }
  MANY_SEP9(e) {
    this.manySepFirstInternal(9, e);
  }
  AT_LEAST_ONE(e) {
    this.atLeastOneInternal(0, e);
  }
  AT_LEAST_ONE1(e) {
    return this.atLeastOneInternal(1, e);
  }
  AT_LEAST_ONE2(e) {
    this.atLeastOneInternal(2, e);
  }
  AT_LEAST_ONE3(e) {
    this.atLeastOneInternal(3, e);
  }
  AT_LEAST_ONE4(e) {
    this.atLeastOneInternal(4, e);
  }
  AT_LEAST_ONE5(e) {
    this.atLeastOneInternal(5, e);
  }
  AT_LEAST_ONE6(e) {
    this.atLeastOneInternal(6, e);
  }
  AT_LEAST_ONE7(e) {
    this.atLeastOneInternal(7, e);
  }
  AT_LEAST_ONE8(e) {
    this.atLeastOneInternal(8, e);
  }
  AT_LEAST_ONE9(e) {
    this.atLeastOneInternal(9, e);
  }
  AT_LEAST_ONE_SEP(e) {
    this.atLeastOneSepFirstInternal(0, e);
  }
  AT_LEAST_ONE_SEP1(e) {
    this.atLeastOneSepFirstInternal(1, e);
  }
  AT_LEAST_ONE_SEP2(e) {
    this.atLeastOneSepFirstInternal(2, e);
  }
  AT_LEAST_ONE_SEP3(e) {
    this.atLeastOneSepFirstInternal(3, e);
  }
  AT_LEAST_ONE_SEP4(e) {
    this.atLeastOneSepFirstInternal(4, e);
  }
  AT_LEAST_ONE_SEP5(e) {
    this.atLeastOneSepFirstInternal(5, e);
  }
  AT_LEAST_ONE_SEP6(e) {
    this.atLeastOneSepFirstInternal(6, e);
  }
  AT_LEAST_ONE_SEP7(e) {
    this.atLeastOneSepFirstInternal(7, e);
  }
  AT_LEAST_ONE_SEP8(e) {
    this.atLeastOneSepFirstInternal(8, e);
  }
  AT_LEAST_ONE_SEP9(e) {
    this.atLeastOneSepFirstInternal(9, e);
  }
  RULE(e, n, r = hr) {
    if (Le(this.definedRulesNames, e)) {
      const a = {
        message: kt.buildDuplicateRuleNameError({
          topLevelRule: e,
          grammarName: this.className
        }),
        type: Ce.DUPLICATE_RULE_NAME,
        ruleName: e
      };
      this.definitionErrors.push(a);
    }
    this.definedRulesNames.push(e);
    const i = this.defineRule(e, n, r);
    return this[e] = i, i;
  }
  OVERRIDE_RULE(e, n, r = hr) {
    const i = uE(e, this.definedRulesNames, this.className);
    this.definitionErrors = this.definitionErrors.concat(i);
    const o = this.defineRule(e, n, r);
    return this[e] = o, o;
  }
  BACKTRACK(e, n) {
    return function() {
      this.isBackTrackingStack.push(1);
      const r = this.saveRecogState();
      try {
        return e.apply(this, n), !0;
      } catch (i) {
        if (ur(i))
          return !1;
        throw i;
      } finally {
        this.reloadRecogState(r), this.isBackTrackingStack.pop();
      }
    };
  }
  // GAST export APIs
  getGAstProductions() {
    return this.gastProductionsCache;
  }
  getSerializedGastProductions() {
    return Gy(ve(this.gastProductionsCache));
  }
}
class qE {
  initRecognizerEngine(e, n) {
    if (this.className = this.constructor.name, this.shortRuleNameToFull = {}, this.fullRuleNameToShort = {}, this.ruleShortNameIdx = 256, this.tokenMatcher = cr, this.subruleIdx = 0, this.definedRulesNames = [], this.tokensMap = {}, this.isBackTrackingStack = [], this.RULE_STACK = [], this.RULE_OCCURRENCE_STACK = [], this.gastProductionsCache = {}, G(n, "serializedGrammar"))
      throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);
    if (te(e)) {
      if (ce(e))
        throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);
      if (typeof e[0].startOffset == "number")
        throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`);
    }
    if (te(e))
      this.tokensMap = je(e, (o, a) => (o[a.name] = a, o), {});
    else if (G(e, "modes") && Xe(Ye(ve(e.modes)), $m)) {
      const o = Ye(ve(e.modes)), a = mo(o);
      this.tokensMap = je(a, (s, c) => (s[c.name] = c, s), {});
    } else if (ze(e))
      this.tokensMap = Re(e);
    else
      throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
    this.tokensMap.EOF = Dt;
    const r = G(e, "modes") ? Ye(ve(e.modes)) : ve(e), i = Xe(r, (o) => ce(o.categoryMatches));
    this.tokenMatcher = i ? cr : Cn, Ln(ve(this.tokensMap));
  }
  defineRule(e, n, r) {
    if (this.selfAnalysisDone)
      throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
    const i = G(r, "resyncEnabled") ? r.resyncEnabled : hr.resyncEnabled, o = G(r, "recoveryValueFunc") ? r.recoveryValueFunc : hr.recoveryValueFunc, a = this.ruleShortNameIdx << RE + Pt;
    this.ruleShortNameIdx++, this.shortRuleNameToFull[a] = e, this.fullRuleNameToShort[e] = a;
    let s;
    return this.outputCst === !0 ? s = function(...p) {
      try {
        this.ruleInvocationStateUpdate(a, e, this.subruleIdx), n.apply(this, p);
        const m = this.CST_STACK[this.CST_STACK.length - 1];
        return this.cstPostRule(m), m;
      } catch (m) {
        return this.invokeRuleCatch(m, i, o);
      } finally {
        this.ruleFinallyStateUpdate();
      }
    } : s = function(...p) {
      try {
        return this.ruleInvocationStateUpdate(a, e, this.subruleIdx), n.apply(this, p);
      } catch (m) {
        return this.invokeRuleCatch(m, i, o);
      } finally {
        this.ruleFinallyStateUpdate();
      }
    }, Object.assign(s, { ruleName: e, originalGrammarAction: n });
  }
  invokeRuleCatch(e, n, r) {
    const i = this.RULE_STACK.length === 1, o = n && !this.isBackTracking() && this.recoveryEnabled;
    if (ur(e)) {
      const a = e;
      if (o) {
        const s = this.findReSyncTokenType();
        if (this.isInCurrentRuleReSyncSet(s))
          if (a.resyncedTokens = this.reSyncTo(s), this.outputCst) {
            const c = this.CST_STACK[this.CST_STACK.length - 1];
            return c.recoveredNode = !0, c;
          } else
            return r(e);
        else {
          if (this.outputCst) {
            const c = this.CST_STACK[this.CST_STACK.length - 1];
            c.recoveredNode = !0, a.partialCstResult = c;
          }
          throw a;
        }
      } else {
        if (i)
          return this.moveToTerminatedState(), r(e);
        throw a;
      }
    } else
      throw e;
  }
  // Implementation of parsing DSL
  optionInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(zc, n);
    return this.optionInternalLogic(e, n, r);
  }
  optionInternalLogic(e, n, r) {
    let i = this.getLaFuncFromCache(r), o;
    if (typeof e != "function") {
      o = e.DEF;
      const a = e.GATE;
      if (a !== void 0) {
        const s = i;
        i = () => a.call(this) && s.call(this);
      }
    } else
      o = e;
    if (i.call(this) === !0)
      return o.call(this);
  }
  atLeastOneInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead($i, e);
    return this.atLeastOneInternalLogic(e, n, r);
  }
  atLeastOneInternalLogic(e, n, r) {
    let i = this.getLaFuncFromCache(r), o;
    if (typeof n != "function") {
      o = n.DEF;
      const a = n.GATE;
      if (a !== void 0) {
        const s = i;
        i = () => a.call(this) && s.call(this);
      }
    } else
      o = n;
    if (i.call(this) === !0) {
      let a = this.doSingleRepetition(o);
      for (; i.call(this) === !0 && a === !0; )
        a = this.doSingleRepetition(o);
    } else
      throw this.raiseEarlyExitException(e, de.REPETITION_MANDATORY, n.ERR_MSG);
    this.attemptInRepetitionRecovery(this.atLeastOneInternal, [e, n], i, $i, e, Km);
  }
  atLeastOneSepFirstInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(Jn, e);
    this.atLeastOneSepFirstInternalLogic(e, n, r);
  }
  atLeastOneSepFirstInternalLogic(e, n, r) {
    const i = n.DEF, o = n.SEP;
    if (this.getLaFuncFromCache(r).call(this) === !0) {
      i.call(this);
      const s = () => this.tokenMatcher(this.LA(1), o);
      for (; this.tokenMatcher(this.LA(1), o) === !0; )
        this.CONSUME(o), i.call(this);
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
        e,
        o,
        s,
        i,
        ns
      ], s, Jn, e, ns);
    } else
      throw this.raiseEarlyExitException(e, de.REPETITION_MANDATORY_WITH_SEPARATOR, n.ERR_MSG);
  }
  manyInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(Fi, e);
    return this.manyInternalLogic(e, n, r);
  }
  manyInternalLogic(e, n, r) {
    let i = this.getLaFuncFromCache(r), o;
    if (typeof n != "function") {
      o = n.DEF;
      const s = n.GATE;
      if (s !== void 0) {
        const c = i;
        i = () => s.call(this) && c.call(this);
      }
    } else
      o = n;
    let a = !0;
    for (; i.call(this) === !0 && a === !0; )
      a = this.doSingleRepetition(o);
    this.attemptInRepetitionRecovery(
      this.manyInternal,
      [e, n],
      i,
      Fi,
      e,
      Hm,
      // The notStuck parameter is only relevant when "attemptInRepetitionRecovery"
      // is invoked from manyInternal, in the MANY_SEP case and AT_LEAST_ONE[_SEP]
      // An infinite loop cannot occur as:
      // - Either the lookahead is guaranteed to consume something (Single Token Separator)
      // - AT_LEAST_ONE by definition is guaranteed to consume something (or error out).
      a
    );
  }
  manySepFirstInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(Ui, e);
    this.manySepFirstInternalLogic(e, n, r);
  }
  manySepFirstInternalLogic(e, n, r) {
    const i = n.DEF, o = n.SEP;
    if (this.getLaFuncFromCache(r).call(this) === !0) {
      i.call(this);
      const s = () => this.tokenMatcher(this.LA(1), o);
      for (; this.tokenMatcher(this.LA(1), o) === !0; )
        this.CONSUME(o), i.call(this);
      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
        e,
        o,
        s,
        i,
        ts
      ], s, Ui, e, ts);
    }
  }
  repetitionSepSecondInternal(e, n, r, i, o) {
    for (; r(); )
      this.CONSUME(n), i.call(this);
    this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
      e,
      n,
      r,
      i,
      o
    ], r, Jn, e, o);
  }
  doSingleRepetition(e) {
    const n = this.getLexerPosition();
    return e.call(this), this.getLexerPosition() > n;
  }
  orInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(Vc, n), i = te(e) ? e : e.DEF, a = this.getLaFuncFromCache(r).call(this, i);
    if (a !== void 0)
      return i[a].ALT.call(this);
    this.raiseNoAltException(n, e.ERR_MSG);
  }
  ruleFinallyStateUpdate() {
    if (this.RULE_STACK.pop(), this.RULE_OCCURRENCE_STACK.pop(), this.cstFinallyStateUpdate(), this.RULE_STACK.length === 0 && this.isAtEndOfInput() === !1) {
      const e = this.LA(1), n = this.errorMessageProvider.buildNotAllInputParsedMessage({
        firstRedundant: e,
        ruleName: this.getCurrRuleFullName()
      });
      this.SAVE_ERROR(new vE(n, e));
    }
  }
  subruleInternal(e, n, r) {
    let i;
    try {
      const o = r !== void 0 ? r.ARGS : void 0;
      return this.subruleIdx = n, i = e.apply(this, o), this.cstPostNonTerminal(i, r !== void 0 && r.LABEL !== void 0 ? r.LABEL : e.ruleName), i;
    } catch (o) {
      throw this.subruleInternalError(o, r, e.ruleName);
    }
  }
  subruleInternalError(e, n, r) {
    throw ur(e) && e.partialCstResult !== void 0 && (this.cstPostNonTerminal(e.partialCstResult, n !== void 0 && n.LABEL !== void 0 ? n.LABEL : r), delete e.partialCstResult), e;
  }
  consumeInternal(e, n, r) {
    let i;
    try {
      const o = this.LA(1);
      this.tokenMatcher(o, e) === !0 ? (this.consumeToken(), i = o) : this.consumeInternalError(e, o, r);
    } catch (o) {
      i = this.consumeInternalRecovery(e, n, o);
    }
    return this.cstPostTerminal(r !== void 0 && r.LABEL !== void 0 ? r.LABEL : e.name, i), i;
  }
  consumeInternalError(e, n, r) {
    let i;
    const o = this.LA(0);
    throw r !== void 0 && r.ERR_MSG ? i = r.ERR_MSG : i = this.errorMessageProvider.buildMismatchTokenMessage({
      expected: e,
      actual: n,
      previous: o,
      ruleName: this.getCurrRuleFullName()
    }), this.SAVE_ERROR(new Gc(i, n, o));
  }
  consumeInternalRecovery(e, n, r) {
    if (this.recoveryEnabled && // TODO: more robust checking of the exception type. Perhaps Typescript extending expressions?
    r.name === "MismatchedTokenException" && !this.isBackTracking()) {
      const i = this.getFollowsForInRuleRecovery(e, n);
      try {
        return this.tryInRuleRecovery(e, i);
      } catch (o) {
        throw o.name === Wc ? r : o;
      }
    } else
      throw r;
  }
  saveRecogState() {
    const e = this.errors, n = Re(this.RULE_STACK);
    return {
      errors: e,
      lexerState: this.exportLexerState(),
      RULE_STACK: n,
      CST_STACK: this.CST_STACK
    };
  }
  reloadRecogState(e) {
    this.errors = e.errors, this.importLexerState(e.lexerState), this.RULE_STACK = e.RULE_STACK;
  }
  ruleInvocationStateUpdate(e, n, r) {
    this.RULE_OCCURRENCE_STACK.push(r), this.RULE_STACK.push(e), this.cstInvocationStateUpdate(n);
  }
  isBackTracking() {
    return this.isBackTrackingStack.length !== 0;
  }
  getCurrRuleFullName() {
    const e = this.getLastExplicitRuleShortName();
    return this.shortRuleNameToFull[e];
  }
  shortRuleNameToFullName(e) {
    return this.shortRuleNameToFull[e];
  }
  isAtEndOfInput() {
    return this.tokenMatcher(this.LA(1), Dt);
  }
  reset() {
    this.resetLexerState(), this.subruleIdx = 0, this.isBackTrackingStack = [], this.errors = [], this.RULE_STACK = [], this.CST_STACK = [], this.RULE_OCCURRENCE_STACK = [];
  }
}
class GE {
  initErrorHandler(e) {
    this._errors = [], this.errorMessageProvider = G(e, "errorMessageProvider") ? e.errorMessageProvider : Tt.errorMessageProvider;
  }
  SAVE_ERROR(e) {
    if (ur(e))
      return e.context = {
        ruleStack: this.getHumanReadableRuleStack(),
        ruleOccurrenceStack: Re(this.RULE_OCCURRENCE_STACK)
      }, this._errors.push(e), e;
    throw Error("Trying to save an Error which is not a RecognitionException");
  }
  get errors() {
    return Re(this._errors);
  }
  set errors(e) {
    this._errors = e;
  }
  // TODO: consider caching the error message computed information
  raiseEarlyExitException(e, n, r) {
    const i = this.getCurrRuleFullName(), o = this.getGAstProductions()[i], s = Oo(e, o, n, this.maxLookahead)[0], c = [];
    for (let p = 1; p <= this.maxLookahead; p++)
      c.push(this.LA(p));
    const u = this.errorMessageProvider.buildEarlyExitMessage({
      expectedIterationPaths: s,
      actual: c,
      previous: this.LA(0),
      customUserDescription: r,
      ruleName: i
    });
    throw this.SAVE_ERROR(new SE(u, this.LA(1), this.LA(0)));
  }
  // TODO: consider caching the error message computed information
  raiseNoAltException(e, n) {
    const r = this.getCurrRuleFullName(), i = this.getGAstProductions()[r], o = So(e, i, this.maxLookahead), a = [];
    for (let u = 1; u <= this.maxLookahead; u++)
      a.push(this.LA(u));
    const s = this.LA(0), c = this.errorMessageProvider.buildNoViableAltMessage({
      expectedPathsPerAlt: o,
      actual: a,
      previous: s,
      customUserDescription: n,
      ruleName: this.getCurrRuleFullName()
    });
    throw this.SAVE_ERROR(new TE(c, this.LA(1), s));
  }
}
class WE {
  initContentAssist() {
  }
  computeContentAssist(e, n) {
    const r = this.gastProductionsCache[e];
    if (At(r))
      throw Error(`Rule ->${e}<- does not exist in this grammar.`);
    return Cc([r], n, this.tokenMatcher, this.maxLookahead);
  }
  // TODO: should this be a member method or a utility? it does not have any state or usage of 'this'...
  // TODO: should this be more explicitly part of the public API?
  getNextPossibleTokenTypes(e) {
    const n = Ze(e.ruleStack), i = this.getGAstProductions()[n];
    return new zm(i, e).startWalking();
  }
}
const Fr = {
  description: "This Object indicates the Parser is during Recording Phase"
};
Object.freeze(Fr);
const as = !0, ss = Math.pow(2, Pt) - 1, Kc = To({ name: "RECORDING_PHASE_TOKEN", pattern: $e.NA });
Ln([Kc]);
const Yc = vo(
  Kc,
  `This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,
  // Using "-1" instead of NaN (as in EOF) because an actual number is less likely to
  // cause errors if the output of LA or CONSUME would be (incorrectly) used during the recording phase.
  -1,
  -1,
  -1,
  -1,
  -1,
  -1
);
Object.freeze(Yc);
const VE = {
  name: `This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,
  children: {}
};
class zE {
  initGastRecorder(e) {
    this.recordingProdStack = [], this.RECORDING_PHASE = !1;
  }
  enableRecording() {
    this.RECORDING_PHASE = !0, this.TRACE_INIT("Enable Recording", () => {
      for (let e = 0; e < 10; e++) {
        const n = e > 0 ? e : "";
        this[`CONSUME${n}`] = function(r, i) {
          return this.consumeInternalRecord(r, e, i);
        }, this[`SUBRULE${n}`] = function(r, i) {
          return this.subruleInternalRecord(r, e, i);
        }, this[`OPTION${n}`] = function(r) {
          return this.optionInternalRecord(r, e);
        }, this[`OR${n}`] = function(r) {
          return this.orInternalRecord(r, e);
        }, this[`MANY${n}`] = function(r) {
          this.manyInternalRecord(e, r);
        }, this[`MANY_SEP${n}`] = function(r) {
          this.manySepFirstInternalRecord(e, r);
        }, this[`AT_LEAST_ONE${n}`] = function(r) {
          this.atLeastOneInternalRecord(e, r);
        }, this[`AT_LEAST_ONE_SEP${n}`] = function(r) {
          this.atLeastOneSepFirstInternalRecord(e, r);
        };
      }
      this.consume = function(e, n, r) {
        return this.consumeInternalRecord(n, e, r);
      }, this.subrule = function(e, n, r) {
        return this.subruleInternalRecord(n, e, r);
      }, this.option = function(e, n) {
        return this.optionInternalRecord(n, e);
      }, this.or = function(e, n) {
        return this.orInternalRecord(n, e);
      }, this.many = function(e, n) {
        this.manyInternalRecord(e, n);
      }, this.atLeastOne = function(e, n) {
        this.atLeastOneInternalRecord(e, n);
      }, this.ACTION = this.ACTION_RECORD, this.BACKTRACK = this.BACKTRACK_RECORD, this.LA = this.LA_RECORD;
    });
  }
  disableRecording() {
    this.RECORDING_PHASE = !1, this.TRACE_INIT("Deleting Recording methods", () => {
      const e = this;
      for (let n = 0; n < 10; n++) {
        const r = n > 0 ? n : "";
        delete e[`CONSUME${r}`], delete e[`SUBRULE${r}`], delete e[`OPTION${r}`], delete e[`OR${r}`], delete e[`MANY${r}`], delete e[`MANY_SEP${r}`], delete e[`AT_LEAST_ONE${r}`], delete e[`AT_LEAST_ONE_SEP${r}`];
      }
      delete e.consume, delete e.subrule, delete e.option, delete e.or, delete e.many, delete e.atLeastOne, delete e.ACTION, delete e.BACKTRACK, delete e.LA;
    });
  }
  //   Parser methods are called inside an ACTION?
  //   Maybe try/catch/finally on ACTIONS while disabling the recorders state changes?
  // @ts-expect-error -- noop place holder
  ACTION_RECORD(e) {
  }
  // Executing backtracking logic will break our recording logic assumptions
  BACKTRACK_RECORD(e, n) {
    return () => !0;
  }
  // LA is part of the official API and may be used for custom lookahead logic
  // by end users who may forget to wrap it in ACTION or inside a GATE
  LA_RECORD(e) {
    return fr;
  }
  topLevelRuleRecord(e, n) {
    try {
      const r = new sn({ definition: [], name: e });
      return r.name = e, this.recordingProdStack.push(r), n.call(this), this.recordingProdStack.pop(), r;
    } catch (r) {
      if (r.KNOWN_RECORDER_ERROR !== !0)
        try {
          r.message = r.message + `
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`;
        } catch {
          throw r;
        }
      throw r;
    }
  }
  // Implementation of parsing DSL
  optionInternalRecord(e, n) {
    return pn.call(this, xe, e, n);
  }
  atLeastOneInternalRecord(e, n) {
    pn.call(this, ft, n, e);
  }
  atLeastOneSepFirstInternalRecord(e, n) {
    pn.call(this, ht, n, e, as);
  }
  manyInternalRecord(e, n) {
    pn.call(this, Se, n, e);
  }
  manySepFirstInternalRecord(e, n) {
    pn.call(this, et, n, e, as);
  }
  orInternalRecord(e, n) {
    return HE.call(this, e, n);
  }
  subruleInternalRecord(e, n, r) {
    if (lr(n), !e || G(e, "ruleName") === !1) {
      const s = new Error(`<SUBRULE${cs(n)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw s.KNOWN_RECORDER_ERROR = !0, s;
    }
    const i = on(this.recordingProdStack), o = e.ruleName, a = new De({
      idx: n,
      nonTerminalName: o,
      label: r?.LABEL,
      // The resolving of the `referencedRule` property will be done once all the Rule's GASTs have been created
      referencedRule: void 0
    });
    return i.definition.push(a), this.outputCst ? VE : Fr;
  }
  consumeInternalRecord(e, n, r) {
    if (lr(n), !_c(e)) {
      const a = new Error(`<CONSUME${cs(n)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw a.KNOWN_RECORDER_ERROR = !0, a;
    }
    const i = on(this.recordingProdStack), o = new he({
      idx: n,
      terminalType: e,
      label: r?.LABEL
    });
    return i.definition.push(o), Yc;
  }
}
function pn(t, e, n, r = !1) {
  lr(n);
  const i = on(this.recordingProdStack), o = St(e) ? e : e.DEF, a = new t({ definition: [], idx: n });
  return r && (a.separator = e.SEP), G(e, "MAX_LOOKAHEAD") && (a.maxLookahead = e.MAX_LOOKAHEAD), this.recordingProdStack.push(a), o.call(this), i.definition.push(a), this.recordingProdStack.pop(), Fr;
}
function HE(t, e) {
  lr(e);
  const n = on(this.recordingProdStack), r = te(t) === !1, i = r === !1 ? t : t.DEF, o = new tt({
    definition: [],
    idx: e,
    ignoreAmbiguities: r && t.IGNORE_AMBIGUITIES === !0
  });
  G(t, "MAX_LOOKAHEAD") && (o.maxLookahead = t.MAX_LOOKAHEAD);
  const a = yc(i, (s) => St(s.GATE));
  return o.hasPredicates = a, n.definition.push(o), W(i, (s) => {
    const c = new Me({ definition: [] });
    o.definition.push(c), G(s, "IGNORE_AMBIGUITIES") ? c.ignoreAmbiguities = s.IGNORE_AMBIGUITIES : G(s, "GATE") && (c.ignoreAmbiguities = !0), this.recordingProdStack.push(c), s.ALT.call(this), this.recordingProdStack.pop();
  }), Fr;
}
function cs(t) {
  return t === 0 ? "" : `${t}`;
}
function lr(t) {
  if (t < 0 || t > ss) {
    const e = new Error(
      // The stack trace will contain all the needed details
      `Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${ss + 1}`
    );
    throw e.KNOWN_RECORDER_ERROR = !0, e;
  }
}
class KE {
  initPerformanceTracer(e) {
    if (G(e, "traceInitPerf")) {
      const n = e.traceInitPerf, r = typeof n == "number";
      this.traceInitMaxIdent = r ? n : 1 / 0, this.traceInitPerf = r ? n > 0 : n;
    } else
      this.traceInitMaxIdent = 0, this.traceInitPerf = Tt.traceInitPerf;
    this.traceInitIndent = -1;
  }
  TRACE_INIT(e, n) {
    if (this.traceInitPerf === !0) {
      this.traceInitIndent++;
      const r = new Array(this.traceInitIndent + 1).join("	");
      this.traceInitIndent < this.traceInitMaxIdent && console.log(`${r}--> <${e}>`);
      const { time: i, value: o } = Ec(n), a = i > 10 ? console.warn : console.log;
      return this.traceInitIndent < this.traceInitMaxIdent && a(`${r}<-- <${e}> time: ${i}ms`), this.traceInitIndent--, o;
    } else
      return n();
  }
}
function YE(t, e) {
  e.forEach((n) => {
    const r = n.prototype;
    Object.getOwnPropertyNames(r).forEach((i) => {
      if (i === "constructor")
        return;
      const o = Object.getOwnPropertyDescriptor(r, i);
      o && (o.get || o.set) ? Object.defineProperty(t.prototype, i, o) : t.prototype[i] = n.prototype[i];
    });
  });
}
const fr = vo(Dt, "", NaN, NaN, NaN, NaN, NaN, NaN);
Object.freeze(fr);
const Tt = Object.freeze({
  recoveryEnabled: !1,
  maxLookahead: 3,
  dynamicTokensEnabled: !1,
  outputCst: !0,
  errorMessageProvider: Pc,
  nodeLocationTracking: "none",
  traceInitPerf: !1,
  skipValidations: !1
}), hr = Object.freeze({
  recoveryValueFunc: () => {
  },
  resyncEnabled: !0
});
var Ce;
(function(t) {
  t[t.INVALID_RULE_NAME = 0] = "INVALID_RULE_NAME", t[t.DUPLICATE_RULE_NAME = 1] = "DUPLICATE_RULE_NAME", t[t.INVALID_RULE_OVERRIDE = 2] = "INVALID_RULE_OVERRIDE", t[t.DUPLICATE_PRODUCTIONS = 3] = "DUPLICATE_PRODUCTIONS", t[t.UNRESOLVED_SUBRULE_REF = 4] = "UNRESOLVED_SUBRULE_REF", t[t.LEFT_RECURSION = 5] = "LEFT_RECURSION", t[t.NONE_LAST_EMPTY_ALT = 6] = "NONE_LAST_EMPTY_ALT", t[t.AMBIGUOUS_ALTS = 7] = "AMBIGUOUS_ALTS", t[t.CONFLICT_TOKENS_RULES_NAMESPACE = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE", t[t.INVALID_TOKEN_NAME = 9] = "INVALID_TOKEN_NAME", t[t.NO_NON_EMPTY_LOOKAHEAD = 10] = "NO_NON_EMPTY_LOOKAHEAD", t[t.AMBIGUOUS_PREFIX_ALTS = 11] = "AMBIGUOUS_PREFIX_ALTS", t[t.TOO_MANY_ALTS = 12] = "TOO_MANY_ALTS", t[t.CUSTOM_LOOKAHEAD_VALIDATION = 13] = "CUSTOM_LOOKAHEAD_VALIDATION";
})(Ce || (Ce = {}));
class xn {
  /**
   *  @deprecated use the **instance** method with the same name instead
   */
  static performSelfAnalysis(e) {
    throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
  }
  performSelfAnalysis() {
    this.TRACE_INIT("performSelfAnalysis", () => {
      let e;
      this.selfAnalysisDone = !0;
      const n = this.className;
      this.TRACE_INIT("toFastProps", () => {
        Ac(this);
      }), this.TRACE_INIT("Grammar Recording", () => {
        try {
          this.enableRecording(), W(this.definedRulesNames, (i) => {
            const a = this[i].originalGrammarAction;
            let s;
            this.TRACE_INIT(`${i} Rule`, () => {
              s = this.topLevelRuleRecord(i, a);
            }), this.gastProductionsCache[i] = s;
          });
        } finally {
          this.disableRecording();
        }
      });
      let r = [];
      if (this.TRACE_INIT("Grammar Resolving", () => {
        r = EE({
          rules: ve(this.gastProductionsCache)
        }), this.definitionErrors = this.definitionErrors.concat(r);
      }), this.TRACE_INIT("Grammar Validations", () => {
        if (ce(r) && this.skipValidations === !1) {
          const i = AE({
            rules: ve(this.gastProductionsCache),
            tokenTypes: ve(this.tokensMap),
            errMsgProvider: kt,
            grammarName: n
          }), o = rE({
            lookaheadStrategy: this.lookaheadStrategy,
            rules: ve(this.gastProductionsCache),
            tokenTypes: ve(this.tokensMap),
            grammarName: n
          });
          this.definitionErrors = this.definitionErrors.concat(i, o);
        }
      }), ce(this.definitionErrors) && (this.recoveryEnabled && this.TRACE_INIT("computeAllProdsFollows", () => {
        const i = Xy(ve(this.gastProductionsCache));
        this.resyncFollows = i;
      }), this.TRACE_INIT("ComputeLookaheadFunctions", () => {
        var i, o;
        (o = (i = this.lookaheadStrategy).initialize) === null || o === void 0 || o.call(i, {
          rules: ve(this.gastProductionsCache)
        }), this.preComputeLookaheadFunctions(ve(this.gastProductionsCache));
      })), !xn.DEFER_DEFINITION_ERRORS_HANDLING && !ce(this.definitionErrors))
        throw e = D(this.definitionErrors, (i) => i.message), new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`);
    });
  }
  constructor(e, n) {
    this.definitionErrors = [], this.selfAnalysisDone = !1;
    const r = this;
    if (r.initErrorHandler(n), r.initLexerAdapter(), r.initLooksAhead(n), r.initRecognizerEngine(e, n), r.initRecoverable(n), r.initTreeBuilder(n), r.initContentAssist(), r.initGastRecorder(n), r.initPerformanceTracer(n), G(n, "ignoredIssues"))
      throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);
    this.skipValidations = G(n, "skipValidations") ? n.skipValidations : Tt.skipValidations;
  }
}
xn.DEFER_DEFINITION_ERRORS_HANDLING = !1;
YE(xn, [
  IE,
  _E,
  jE,
  DE,
  qE,
  BE,
  GE,
  WE,
  zE,
  KE
]);
let XE = class extends xn {
  constructor(e, n = Tt) {
    const r = Re(n);
    r.outputCst = !1, super(e, r);
  }
};
const Ct = To, Xc = $e, bo = Ct({ name: "LCurly", pattern: /{/ }), Ro = Ct({ name: "RCurly", pattern: /}/ }), No = Ct({ name: "LSquare", pattern: /\[/ }), _o = Ct({ name: "RSquare", pattern: /]/ }), dr = Ct({ name: "Comma", pattern: /,/ }), wo = Ct({ name: "Colon", pattern: /:/ }), Di = Ct({
  name: "StringLiteral",
  pattern: /(\w|\.)+/
}), JE = Ct({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Xc.SKIPPED
}), Jc = [
  JE,
  Di,
  Ro,
  bo,
  No,
  _o,
  dr,
  wo
], ZE = new Xc(Jc);
bo.LABEL = "'{'";
Ro.LABEL = "'}'";
No.LABEL = "'['";
_o.LABEL = "']'";
dr.LABEL = "','";
wo.LABEL = "':'";
const QE = XE;
class eA extends QE {
  constructor() {
    super(Jc, { recoveryEnabled: !0 });
    const e = this;
    e.RULE("object", () => {
      const n = {};
      return e.CONSUME(bo), e.MANY_SEP({
        SEP: dr,
        DEF: () => {
          Object.assign(n, e.SUBRULE(e.objectItem));
        }
      }), e.CONSUME(Ro), n;
    }), e.RULE("objectItem", () => {
      let n, r, i;
      const o = {};
      return n = e.CONSUME(Di), e.CONSUME(wo), i = e.SUBRULE(e.value), r = n.isInsertedInRecovery ? "BAD_KEY" : n.image, o[r] = i, o;
    }), e.RULE("array", () => {
      const n = [];
      return e.CONSUME(No), e.MANY_SEP({
        SEP: dr,
        DEF: () => {
          n.push(e.SUBRULE(e.value));
        }
      }), e.CONSUME(_o), n;
    }), e.RULE(
      "value",
      () => e.OR([
        {
          ALT: () => e.CONSUME(Di).image
        },
        { ALT: () => e.SUBRULE(e.object) },
        { ALT: () => e.SUBRULE(e.array) }
      ])
    ), this.performSelfAnalysis();
  }
}
const pi = new eA();
function tA(t) {
  const e = ZE.tokenize(t);
  return pi.input = e.tokens, {
    cst: pi.value(),
    lexErrors: e.errors,
    parseErrors: pi.errors
  };
}
function pr(t) {
  if (t === "true")
    return !0;
  if (t === "false")
    return !1;
  throw new Error("invalid boolean string");
}
function LA(t) {
  return t ? "true" : "false";
}
function Be(t, e) {
  return t.split(e)[0];
}
function nA(t) {
  return BigInt(Be(t, "i8"));
}
function xA(t) {
  return `${t}i8`;
}
function rA(t) {
  return BigInt(Be(t, "i16"));
}
function kA(t) {
  return `${t}i16`;
}
function iA(t) {
  return BigInt(Be(t, "i32"));
}
function MA(t) {
  return `${t}i32`;
}
function oA(t) {
  return BigInt(Be(t, "i64"));
}
function FA(t) {
  return `${t}i64`;
}
function aA(t) {
  return BigInt(Be(t, "i128"));
}
function $A(t) {
  return `${t}i128`;
}
function Zc(t) {
  return BigInt(Be(t, "u8"));
}
function Ge(t) {
  return `${t}u8`;
}
function sA(t) {
  return BigInt(Be(t, "u16"));
}
function UA(t) {
  return `${t}u16`;
}
function Mt(t) {
  return BigInt(Be(t, "u32"));
}
function Bi(t) {
  return `${t}u32`;
}
function Rt(t) {
  return BigInt(Be(t, "u64"));
}
function gi(t) {
  return `${t}u64`;
}
function qi(t) {
  return BigInt(Be(t, "u128"));
}
function jA(t) {
  return `${t}u128`;
}
function cA(t) {
  return BigInt(Be(t, "field"));
}
function DA(t) {
  return `${t}field`;
}
function uA(t) {
  return BigInt(Be(t, "group"));
}
function BA(t) {
  return `${t}group`;
}
function lA(t) {
  return BigInt(Be(t, "scalar"));
}
function qA(t) {
  return `${t}scalar`;
}
class $r {
  constructor(e) {
    this.getMappingValueString = e;
  }
  async getMappingValueOrNull(e, n) {
    const r = await this.getMappingValueString(e, n);
    return r === "null" ? null : r;
  }
  async getMappingValue(e, n) {
    const r = await this.getMappingValueOrNull(e, n);
    if (r === null)
      throw new Error(`Mapping value not found for key: ${n}`);
    return r;
  }
  async getMappingValueOrDefault(e, n, r) {
    const i = await this.getMappingValueOrNull(e, n);
    return i === null ? r : i;
  }
}
function fA(t) {
  try {
    return t.startsWith("aleo1") ? t : t === "true" || t === "false" ? pr(t) : t.endsWith("field") ? cA(t) : t.endsWith("group") ? uA(t) : t.endsWith("i8") ? nA(t) : t.endsWith("i16") ? rA(t) : t.endsWith("i32") ? iA(t) : t.endsWith("i64") ? oA(t) : t.endsWith("i128") ? aA(t) : t.endsWith("u8") ? Zc(t) : t.endsWith("u16") ? sA(t) : t.endsWith("u32") ? Mt(t) : t.endsWith("u64") ? Rt(t) : t.endsWith("u128") ? qi(t) : t.endsWith("scalar") ? lA(t) : t;
  } catch {
    return t;
  }
}
function Gi(t) {
  return Array.isArray(t) ? t.map((e) => Gi(e)) : typeof t == "object" ? Object.fromEntries(
    Object.entries(t).map(([e, n]) => [e, Gi(n)])
  ) : fA(t);
}
function ot(t) {
  $s(t !== "null", "plaintext cannot be null"), t = t.replaceAll("\\n", `
`).replaceAll('"', ""), t = t.trim();
  const { cst: e, lexErrors: n, parseErrors: r } = tA(t);
  return n.length > 0 && (console.error("Lex errors:", n.map((i) => JSON.stringify(i)).join(`
`)), console.log(`Plaintext: "${t}"`)), r.length > 0 && (console.error("Parse errors:", r.map((i) => JSON.stringify(i)).join(`
`)), console.log(`Plaintext: "${t}"`)), Gi(e);
}
let yi;
async function Qc() {
  return yi || (globalThis.Worker || (globalThis.Worker = class extends EventTarget {
    postMessage() {
    }
    unref() {
    }
  }), yi = await import("@aleohq/sdk")), yi;
}
async function eu(t) {
  return (await Qc()).Plaintext.fromString(t).hashBhp256().toString();
}
async function hA(t) {
  return (await Qc()).ProgramID.fromString(t).toAddress();
}
class WA extends $r {
  /**
   * Get the state of the committee for an **active** validator.
   * @param validator
   * @returns The committee state or null if the validator is not in the committee.
   */
  async getCommitteeState(e) {
    const n = await this.getMappingValueOrNull("committee", e);
    return n === null ? null : ot(n);
  }
  /**
   * Get the total number of **active** validators in the committee.
   */
  async getCommitteeValidatorsCount() {
    return Rt(
      await this.getMappingValueOrDefault(
        "metadata",
        "aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc",
        gi(0)
      )
    );
  }
  /**
   * Get the total number of delegators (not including validators).
   */
  async getDelegatorsCount() {
    return Rt(
      await this.getMappingValueOrDefault(
        "metadata",
        "aleo1qgqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqanmpl0",
        gi(0)
      )
    );
  }
  /**
   * Get the total amount of microcredits that are prebonded and bonded to a validator.
   * Note: It includes both prebonded and bonded microcredits. However, it does not contain unbonding microcredits.
   * @param validator
   */
  async getDelegated(e) {
    return Rt(await this.getMappingValueOrDefault("delegated", e, gi(0)));
  }
  /**
   * Get the bond state of the staker.
   * @param staker The staker (validator or delegator)
   */
  async getBonded(e) {
    const n = await this.getMappingValueOrNull("bonded", e);
    return n === null ? null : ot(n);
  }
  /**
   * Get the unbonding state of the staker.
   * @param staker The staker (validator or delegator)
   */
  async getUnbonding(e) {
    const n = await this.getMappingValueOrNull("unbonding", e);
    return n === null ? null : ot(n);
  }
  /**
   * Get the withdrawal address of the staker.
   * @param staker The staker (validator or delegator)
   */
  async getWithdrawAddress(e) {
    return await this.getMappingValueOrNull("withdraw", e);
  }
  /**
   * Get the public microcredits balance of the account.
   * @param account
   */
  async getPublicBalance(e) {
    return Rt(await this.getMappingValueOrDefault("account", e, "0"));
  }
}
class VA extends $r {
  async isInitialized() {
    return pr(await this.getMappingValueOrDefault("initialized", "0u8", "false"));
  }
  async hasRole(e, n) {
    const r = await eu(`{
      account: ${n},
      role: ${Ge(e)}
    }`);
    return pr(await this.getMappingValueOrDefault("grants", r, "false"));
  }
  async isRoleAdmin(e, n) {
    const r = Number(
      Zc(await this.getMappingValueOrDefault("role_admins", Ge(e), Ge(tf)))
    );
    return typeof n == "number" ? n === r : this.hasRole(r, n);
  }
}
function dA(t) {
  return new Promise((e) => setTimeout(e, t));
}
var pA = /* @__PURE__ */ ((t) => (t[t.INVALID = 0] = "INVALID", t[t.IN_PROGRESS = 1] = "IN_PROGRESS", t[t.VALID = 2] = "VALID", t))(pA || {});
class zA extends $r {
  constructor(e, n) {
    super(e), this.credits = n;
  }
  async getTotalSupply() {
    return Rt(await this.getMappingValueOrDefault("total_supply", Ge(0), "0"));
  }
  async getPublicBalance(e) {
    return Rt(await this.getMappingValueOrDefault("account", e, "0"));
  }
  async getApproval(e, n) {
    const r = await eu(`{
      approver: ${e},
      spender: ${n}
    }`);
    return Rt(await this.getMappingValueOrDefault("approvals", r, "0"));
  }
  async getConfig() {
    const e = await this.getMappingValueOrNull("config", Ge(0));
    return e === null ? null : ot(e);
  }
  async isInitialized() {
    return await this.getConfig() !== null;
  }
  async isPaused() {
    const e = await this.getConfig();
    return e !== null && e.paused;
  }
  async getState() {
    return ot(await this.getMappingValue("state", Ge(0)));
  }
  async getCacheState() {
    const e = ot(await this.getMappingValue("cache_state", Ge(0)));
    return e.status = Number(e.status), e;
  }
  async getWithdraw(e) {
    const n = await this.getMappingValueOrNull("withdraws", e);
    return n === null ? null : ot(n);
  }
  isWithdrawClaimable(e, n, r, i) {
    return e.height <= (e.pending ? r + nf : i) && e.amount <= n;
  }
  async getDelegatorsCount() {
    return Mt(await this.getMappingValue("delegators_count", Ge(0)));
  }
  async getDelegator(e) {
    const n = await this.getMappingValueOrNull("delegators", Bi(e));
    return n === null ? null : ot(n);
  }
  async getDelegatorIndex(e) {
    const n = await this.getMappingValueOrNull("delegator_pos", e);
    return n === null ? null : Mt(n);
  }
  async getValidatorIndex(e) {
    const n = await this.getMappingValueOrNull("validator_pos", e);
    return n === null ? null : Mt(n);
  }
  async hasDelegator(e) {
    return await this.getDelegatorIndex(e) !== null;
  }
  async hasValidator(e) {
    return await this.getValidatorIndex(e) !== null;
  }
  async getDelegatorByValidator(e) {
    const n = await this.getValidatorIndex(e);
    return n === null ? null : await this.getDelegator(n);
  }
  async getTotalBuffered() {
    return this.credits.getPublicBalance(await hA(cf()));
  }
  getTotalPooled(e, n, r, i, o) {
    return e + n + r - i - o;
  }
  getStCreditsFromCredits(e, n, r) {
    return e * (r > 0n ? r : 1n) / (n > 0n ? n : 1n);
  }
  getCreditsFromStCredits(e, n, r) {
    return e * (n > 0n ? n : 1n) / (r > 0n ? r : 1n);
  }
  async getRewardHistoryCount() {
    return Mt(await this.getMappingValue("reward_history_count", Ge(0)));
  }
  async getRewardHistory(e) {
    return ot(await this.getMappingValue("reward_history", Bi(e)));
  }
  /**
   * Get the staking APY.
   * @param maxHistoryPerValidator
   * @param getInterval
   * @param blockInterval
   * @returns The staking APY, in basis points (0.01%, or 1/100th of a percent).
   */
  async getStakingAPY(e = 2, n = 100, r = 1e4) {
    const i = BigInt(Math.floor(31536e6 / r)), o = await this.getDelegatorsCount(), a = await this.getRewardHistoryCount(), s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
    for (let m = a - 1n; m >= 0; m--) {
      const E = await this.getRewardHistory(m);
      if (!s.has(E.validator))
        s.set(E.validator, E);
      else if (!c.has(E.validator) && (c.set(E.validator, E), c.size >= o))
        break;
      if (a - m >= BigInt(e) * o)
        break;
      await dA(n);
    }
    let u = 0n, p = 0n;
    for (const m of c.values()) {
      const E = s.get(m.validator);
      if (!E)
        continue;
      const S = E.height - m.height;
      u += S > 0n ? E.reward * i / S : 0n, p += E.bonded - E.reward;
    }
    return p > 0n ? u * 10000n / p : 0n;
  }
}
class HA extends $r {
  /**
   * Whether the program is paused.
   */
  async isPaused() {
    return pr(await this.getMappingValueOrDefault("paused", Ge(0), "true"));
  }
  /**
   * Get the total supply of points.
   */
  async getTotalSupply() {
    return qi(await this.getMappingValueOrDefault("total_supply", Ge(0), "0"));
  }
  /**
   * Get the balance of points for an account.
   * @param account
   */
  async getBalance(e) {
    return qi(await this.getMappingValueOrDefault("account", e, "0"));
  }
  /**
   * Get the balance of points for an account, including the unsettled points.
   * @param account
   * @param currentHeight
   */
  async getEstimatedBalance(e, n) {
    const r = await this.getBalance(e), i = await this.getState(e);
    if (!i)
      return r;
    const o = i.stcredits * (n - i.height);
    return r + o;
  }
  /**
   * Get the state of an account.
   * @param account
   */
  async getState(e) {
    const n = await this.getMappingValueOrNull("state", e);
    return n === null ? null : ot(n);
  }
  /**
   * Get the inviter by the invite code.
   * @param code
   */
  async getInviterByCode(e) {
    return await this.getMappingValueOrNull("inviters", Bi(e));
  }
  /**
   * Get the invite code by the inviter.
   * @param inviter
   */
  async getInviteCode(e) {
    return Mt(await this.getMappingValueOrDefault("invite_codes", e, String(of)));
  }
  /**
   * Get the invite code counter.
   */
  async getInviteCodeCounter() {
    return Mt(await this.getMappingValueOrDefault("invite_code_counter", Ge(0), String(rf)));
  }
}
export {
  bA as ACCESS_CONTROL_PROGRAM,
  RA as ACL_MANAGER_PROGRAM,
  vA as ASSET_LISTING_ADMIN_ROLE,
  VA as AccessControlProgram,
  pA as CacheStatus,
  WA as CreditsProgram,
  tf as DEFAULT_ADMIN_ROLE,
  AA as EMERGENCY_ADMIN_ROLE,
  of as EMPTY_INVITE_CODE,
  IA as INVITER_OF_INVITER_REWARD,
  OA as INVITER_REWARD,
  EA as POOL_ADMIN_ROLE,
  $r as ProgramBase,
  TA as RISK_ADMIN_ROLE,
  sf as SPECTRE,
  Us as STAKING,
  yA as STAKING_ADMIN_ROLE,
  mA as STAKING_OPERATOR_ROLE,
  rf as START_INVITE_CODE,
  SA as STCREDITS_CACHE_BATCH_NUM,
  NA as STCREDITS_POINTS_PROGRAM,
  cf as STCREDITS_PROGRAM,
  HA as StCreditsPointsProgram,
  zA as StCreditsProgram,
  af as VERSION,
  nf as WITHDRAW_DELAY,
  gA as ZERO_ADDRESS,
  eu as bhp256HashToField,
  pr as bool,
  LA as boolStr,
  _A as delegatorProgramName,
  cA as field,
  DA as fieldStr,
  uA as group,
  BA as groupStr,
  aA as i128,
  $A as i128Str,
  rA as i16,
  kA as i16Str,
  iA as i32,
  MA as i32Str,
  oA as i64,
  FA as i64Str,
  nA as i8,
  xA as i8Str,
  Qc as importAleo,
  wA as initialize,
  fA as parseLiteral,
  ot as parsePlaintext,
  hA as programAddress,
  lA as scalar,
  qA as scalarStr,
  qi as u128,
  jA as u128Str,
  sA as u16,
  UA as u16Str,
  Mt as u32,
  Bi as u32Str,
  Rt as u64,
  gi as u64Str,
  Zc as u8,
  Ge as u8Str
};
