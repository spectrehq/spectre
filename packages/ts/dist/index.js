var us = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function eu(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function tu(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ls = { exports: {} }, ye = ls.exports = {}, tt, nt;
function Ei() {
  throw new Error("setTimeout has not been defined");
}
function Ti() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? tt = setTimeout : tt = Ei;
  } catch {
    tt = Ei;
  }
  try {
    typeof clearTimeout == "function" ? nt = clearTimeout : nt = Ti;
  } catch {
    nt = Ti;
  }
})();
function fs(t) {
  if (tt === setTimeout)
    return setTimeout(t, 0);
  if ((tt === Ei || !tt) && setTimeout)
    return tt = setTimeout, setTimeout(t, 0);
  try {
    return tt(t, 0);
  } catch {
    try {
      return tt.call(null, t, 0);
    } catch {
      return tt.call(this, t, 0);
    }
  }
}
function nu(t) {
  if (nt === clearTimeout)
    return clearTimeout(t);
  if ((nt === Ti || !nt) && clearTimeout)
    return nt = clearTimeout, clearTimeout(t);
  try {
    return nt(t);
  } catch {
    try {
      return nt.call(null, t);
    } catch {
      return nt.call(this, t);
    }
  }
}
var gt = [], Xt = !1, Lt, jn = -1;
function ru() {
  !Xt || !Lt || (Xt = !1, Lt.length ? gt = Lt.concat(gt) : jn = -1, gt.length && hs());
}
function hs() {
  if (!Xt) {
    var t = fs(ru);
    Xt = !0;
    for (var e = gt.length; e; ) {
      for (Lt = gt, gt = []; ++jn < e; )
        Lt && Lt[jn].run();
      jn = -1, e = gt.length;
    }
    Lt = null, Xt = !1, nu(t);
  }
}
ye.nextTick = function(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var n = 1; n < arguments.length; n++)
      e[n - 1] = arguments[n];
  gt.push(new ds(t, e)), gt.length === 1 && !Xt && fs(hs);
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
var iu = ls.exports;
const Ee = /* @__PURE__ */ tu(iu);
var jr = { exports: {} }, Dr = {}, Qt = {}, ps = {}, Vi = function() {
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
}, ou = Vi, Ki = function() {
  return ou() && !!Symbol.toStringTag;
}, au = Error, su = EvalError, cu = RangeError, uu = ReferenceError, gs = SyntaxError, gr = TypeError, lu = URIError, wo = typeof Symbol < "u" && Symbol, fu = Vi, hu = function() {
  return typeof wo != "function" || typeof Symbol != "function" || typeof wo("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : fu();
}, Br = {
  __proto__: null,
  foo: {}
}, du = Object, pu = function() {
  return { __proto__: Br }.foo === Br.foo && !(Br instanceof du);
}, gu = "Function.prototype.bind called on incompatible ", yu = Object.prototype.toString, mu = Math.max, Eu = "[object Function]", Co = function(e, n) {
  for (var r = [], i = 0; i < e.length; i += 1)
    r[i] = e[i];
  for (var o = 0; o < n.length; o += 1)
    r[o + e.length] = n[o];
  return r;
}, Tu = function(e, n) {
  for (var r = [], i = n, o = 0; i < e.length; i += 1, o += 1)
    r[o] = e[i];
  return r;
}, Au = function(t, e) {
  for (var n = "", r = 0; r < t.length; r += 1)
    n += t[r], r + 1 < t.length && (n += e);
  return n;
}, vu = function(e) {
  var n = this;
  if (typeof n != "function" || yu.apply(n) !== Eu)
    throw new TypeError(gu + n);
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
  }, a = mu(0, n.length - r.length), s = [], c = 0; c < a; c++)
    s[c] = "$" + c;
  if (i = Function("binder", "return function (" + Au(s, ",") + "){ return binder.apply(this,arguments); }")(o), n.prototype) {
    var u = function() {
    };
    u.prototype = n.prototype, i.prototype = new u(), u.prototype = null;
  }
  return i;
}, Su = vu, zi = Function.prototype.bind || Su, Ou = Function.prototype.call, Iu = Object.prototype.hasOwnProperty, bu = zi, Ru = bu.call(Ou, Iu), Q, Nu = au, _u = su, Pu = cu, wu = uu, en = gs, Jt = gr, Cu = lu, ys = Function, qr = function(t) {
  try {
    return ys('"use strict"; return (' + t + ").constructor;")();
  } catch {
  }
}, kt = Object.getOwnPropertyDescriptor;
if (kt)
  try {
    kt({}, "");
  } catch {
    kt = null;
  }
var Gr = function() {
  throw new Jt();
}, Lu = kt ? function() {
  try {
    return arguments.callee, Gr;
  } catch {
    try {
      return kt(arguments, "callee").get;
    } catch {
      return Gr;
    }
  }
}() : Gr, Vt = hu(), xu = pu(), Oe = Object.getPrototypeOf || (xu ? function(t) {
  return t.__proto__;
} : null), Ht = {}, ku = typeof Uint8Array > "u" || !Oe ? Q : Oe(Uint8Array), Mt = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? Q : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? Q : ArrayBuffer,
  "%ArrayIteratorPrototype%": Vt && Oe ? Oe([][Symbol.iterator]()) : Q,
  "%AsyncFromSyncIteratorPrototype%": Q,
  "%AsyncFunction%": Ht,
  "%AsyncGenerator%": Ht,
  "%AsyncGeneratorFunction%": Ht,
  "%AsyncIteratorPrototype%": Ht,
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
  "%Error%": Nu,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": _u,
  "%Float32Array%": typeof Float32Array > "u" ? Q : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? Q : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? Q : FinalizationRegistry,
  "%Function%": ys,
  "%GeneratorFunction%": Ht,
  "%Int8Array%": typeof Int8Array > "u" ? Q : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? Q : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? Q : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": Vt && Oe ? Oe(Oe([][Symbol.iterator]())) : Q,
  "%JSON%": typeof JSON == "object" ? JSON : Q,
  "%Map%": typeof Map > "u" ? Q : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !Vt || !Oe ? Q : Oe((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? Q : Promise,
  "%Proxy%": typeof Proxy > "u" ? Q : Proxy,
  "%RangeError%": Pu,
  "%ReferenceError%": wu,
  "%Reflect%": typeof Reflect > "u" ? Q : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? Q : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !Vt || !Oe ? Q : Oe((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? Q : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": Vt && Oe ? Oe(""[Symbol.iterator]()) : Q,
  "%Symbol%": Vt ? Symbol : Q,
  "%SyntaxError%": en,
  "%ThrowTypeError%": Lu,
  "%TypedArray%": ku,
  "%TypeError%": Jt,
  "%Uint8Array%": typeof Uint8Array > "u" ? Q : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? Q : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? Q : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? Q : Uint32Array,
  "%URIError%": Cu,
  "%WeakMap%": typeof WeakMap > "u" ? Q : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? Q : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? Q : WeakSet
};
if (Oe)
  try {
    null.error;
  } catch (t) {
    var Mu = Oe(Oe(t));
    Mt["%Error.prototype%"] = Mu;
  }
var Fu = function t(e) {
  var n;
  if (e === "%AsyncFunction%")
    n = qr("async function () {}");
  else if (e === "%GeneratorFunction%")
    n = qr("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    n = qr("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var r = t("%AsyncGeneratorFunction%");
    r && (n = r.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var i = t("%AsyncGenerator%");
    i && Oe && (n = Oe(i.prototype));
  }
  return Mt[e] = n, n;
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
}, On = zi, Zn = Ru, $u = On.call(Function.call, Array.prototype.concat), Uu = On.call(Function.apply, Array.prototype.splice), xo = On.call(Function.call, String.prototype.replace), Qn = On.call(Function.call, String.prototype.slice), ju = On.call(Function.call, RegExp.prototype.exec), Du = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Bu = /\\(\\)?/g, qu = function(e) {
  var n = Qn(e, 0, 1), r = Qn(e, -1);
  if (n === "%" && r !== "%")
    throw new en("invalid intrinsic syntax, expected closing `%`");
  if (r === "%" && n !== "%")
    throw new en("invalid intrinsic syntax, expected opening `%`");
  var i = [];
  return xo(e, Du, function(o, a, s, c) {
    i[i.length] = s ? xo(c, Bu, "$1") : a || o;
  }), i;
}, Gu = function(e, n) {
  var r = e, i;
  if (Zn(Lo, r) && (i = Lo[r], r = "%" + i[0] + "%"), Zn(Mt, r)) {
    var o = Mt[r];
    if (o === Ht && (o = Fu(r)), typeof o > "u" && !n)
      throw new Jt("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: i,
      name: r,
      value: o
    };
  }
  throw new en("intrinsic " + e + " does not exist!");
}, In = function(e, n) {
  if (typeof e != "string" || e.length === 0)
    throw new Jt("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof n != "boolean")
    throw new Jt('"allowMissing" argument must be a boolean');
  if (ju(/^%?[^%]*%?$/, e) === null)
    throw new en("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var r = qu(e), i = r.length > 0 ? r[0] : "", o = Gu("%" + i + "%", n), a = o.name, s = o.value, c = !1, u = o.alias;
  u && (i = u[0], Uu(r, $u([0, 1], u)));
  for (var p = 1, T = !0; p < r.length; p += 1) {
    var A = r[p], S = Qn(A, 0, 1), C = Qn(A, -1);
    if ((S === '"' || S === "'" || S === "`" || C === '"' || C === "'" || C === "`") && S !== C)
      throw new en("property names with quotes must have matching quotes");
    if ((A === "constructor" || !T) && (c = !0), i += "." + A, a = "%" + i + "%", Zn(Mt, a))
      s = Mt[a];
    else if (s != null) {
      if (!(A in s)) {
        if (!n)
          throw new Jt("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (kt && p + 1 >= r.length) {
        var k = kt(s, A);
        T = !!k, T && "get" in k && !("originalValue" in k.get) ? s = k.get : s = s[A];
      } else
        T = Zn(s, A), s = s[A];
      T && !c && (Mt[a] = s);
    }
  }
  return s;
}, ms = { exports: {} }, Wr, ko;
function Hi() {
  if (ko) return Wr;
  ko = 1;
  var t = In, e = t("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return Wr = e, Wr;
}
var Wu = In, Dn = Wu("%Object.getOwnPropertyDescriptor%", !0);
if (Dn)
  try {
    Dn([], "length");
  } catch {
    Dn = null;
  }
var Yi = Dn, Mo = Hi(), Vu = gs, Kt = gr, Fo = Yi, Es = function(e, n, r) {
  if (!e || typeof e != "object" && typeof e != "function")
    throw new Kt("`obj` must be an object or a function`");
  if (typeof n != "string" && typeof n != "symbol")
    throw new Kt("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new Kt("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new Kt("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new Kt("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new Kt("`loose`, if provided, must be a boolean");
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
    throw new Vu("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, Ai = Hi(), Ts = function() {
  return !!Ai;
};
Ts.hasArrayLengthDefineBug = function() {
  if (!Ai)
    return null;
  try {
    return Ai([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var As = Ts, Ku = In, $o = Es, zu = As(), Uo = Yi, jo = gr, Hu = Ku("%Math.floor%"), Yu = function(e, n) {
  if (typeof e != "function")
    throw new jo("`fn` is not a function");
  if (typeof n != "number" || n < 0 || n > 4294967295 || Hu(n) !== n)
    throw new jo("`length` must be a positive 32-bit integer");
  var r = arguments.length > 2 && !!arguments[2], i = !0, o = !0;
  if ("length" in e && Uo) {
    var a = Uo(e, "length");
    a && !a.configurable && (i = !1), a && !a.writable && (o = !1);
  }
  return (i || o || !r) && (zu ? $o(
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
  var e = zi, n = In, r = Yu, i = gr, o = n("%Function.prototype.apply%"), a = n("%Function.prototype.call%"), s = n("%Reflect.apply%", !0) || e.call(a, o), c = Hi(), u = n("%Math.max%");
  t.exports = function(A) {
    if (typeof A != "function")
      throw new i("a function is required");
    var S = s(e, a, arguments);
    return r(
      S,
      1 + u(0, A.length - (arguments.length - 1)),
      !0
    );
  };
  var p = function() {
    return s(e, o, arguments);
  };
  c ? c(t.exports, "apply", { value: p }) : t.exports.apply = p;
})(ms);
var yr = ms.exports, vs = In, Ss = yr, Xu = Ss(vs("String.prototype.indexOf")), mr = function(e, n) {
  var r = vs(e, !!n);
  return typeof r == "function" && Xu(e, ".prototype.") > -1 ? Ss(r) : r;
}, Ju = Ki(), Zu = mr, vi = Zu("Object.prototype.toString"), Er = function(e) {
  return Ju && e && typeof e == "object" && Symbol.toStringTag in e ? !1 : vi(e) === "[object Arguments]";
}, Os = function(e) {
  return Er(e) ? !0 : e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && vi(e) !== "[object Array]" && vi(e.callee) === "[object Function]";
}, Qu = function() {
  return Er(arguments);
}();
Er.isLegacyArguments = Os;
var el = Qu ? Er : Os, tl = Object.prototype.toString, nl = Function.prototype.toString, rl = /^\s*(?:function)?\*/, Is = Ki(), Vr = Object.getPrototypeOf, il = function() {
  if (!Is)
    return !1;
  try {
    return Function("return function*() {}")();
  } catch {
  }
}, Kr, ol = function(e) {
  if (typeof e != "function")
    return !1;
  if (rl.test(nl.call(e)))
    return !0;
  if (!Is) {
    var n = tl.call(e);
    return n === "[object GeneratorFunction]";
  }
  if (!Vr)
    return !1;
  if (typeof Kr > "u") {
    var r = il();
    Kr = r ? Vr(r) : !1;
  }
  return Vr(e) === Kr;
}, bs = Function.prototype.toString, Yt = typeof Reflect == "object" && Reflect !== null && Reflect.apply, Si, Bn;
if (typeof Yt == "function" && typeof Object.defineProperty == "function")
  try {
    Si = Object.defineProperty({}, "length", {
      get: function() {
        throw Bn;
      }
    }), Bn = {}, Yt(function() {
      throw 42;
    }, null, Si);
  } catch (t) {
    t !== Bn && (Yt = null);
  }
else
  Yt = null;
var al = /^\s*class\b/, Oi = function(e) {
  try {
    var n = bs.call(e);
    return al.test(n);
  } catch {
    return !1;
  }
}, zr = function(e) {
  try {
    return Oi(e) ? !1 : (bs.call(e), !0);
  } catch {
    return !1;
  }
}, qn = Object.prototype.toString, sl = "[object Object]", cl = "[object Function]", ul = "[object GeneratorFunction]", ll = "[object HTMLAllCollection]", fl = "[object HTML document.all class]", hl = "[object HTMLCollection]", dl = typeof Symbol == "function" && !!Symbol.toStringTag, pl = !(0 in [,]), Ii = function() {
  return !1;
};
if (typeof document == "object") {
  var gl = document.all;
  qn.call(gl) === qn.call(document.all) && (Ii = function(e) {
    if ((pl || !e) && (typeof e > "u" || typeof e == "object"))
      try {
        var n = qn.call(e);
        return (n === ll || n === fl || n === hl || n === sl) && e("") == null;
      } catch {
      }
    return !1;
  });
}
var yl = Yt ? function(e) {
  if (Ii(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  try {
    Yt(e, null, Si);
  } catch (n) {
    if (n !== Bn)
      return !1;
  }
  return !Oi(e) && zr(e);
} : function(e) {
  if (Ii(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  if (dl)
    return zr(e);
  if (Oi(e))
    return !1;
  var n = qn.call(e);
  return n !== cl && n !== ul && !/^\[object HTML/.test(n) ? !1 : zr(e);
}, ml = yl, El = Object.prototype.toString, Rs = Object.prototype.hasOwnProperty, Tl = function(e, n, r) {
  for (var i = 0, o = e.length; i < o; i++)
    Rs.call(e, i) && (r == null ? n(e[i], i, e) : n.call(r, e[i], i, e));
}, Al = function(e, n, r) {
  for (var i = 0, o = e.length; i < o; i++)
    r == null ? n(e.charAt(i), i, e) : n.call(r, e.charAt(i), i, e);
}, vl = function(e, n, r) {
  for (var i in e)
    Rs.call(e, i) && (r == null ? n(e[i], i, e) : n.call(r, e[i], i, e));
}, Sl = function(e, n, r) {
  if (!ml(n))
    throw new TypeError("iterator must be a function");
  var i;
  arguments.length >= 3 && (i = r), El.call(e) === "[object Array]" ? Tl(e, n, i) : typeof e == "string" ? Al(e, n, i) : vl(e, n, i);
}, Ol = Sl, Il = [
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
], Hr = Il, bl = typeof globalThis > "u" ? us : globalThis, Rl = function() {
  for (var e = [], n = 0; n < Hr.length; n++)
    typeof bl[Hr[n]] == "function" && (e[e.length] = Hr[n]);
  return e;
}, er = Ol, Nl = Rl, Do = yr, Xi = mr, Gn = Yi, _l = Xi("Object.prototype.toString"), Ns = Ki(), Bo = typeof globalThis > "u" ? us : globalThis, bi = Nl(), Ji = Xi("String.prototype.slice"), Yr = Object.getPrototypeOf, Pl = Xi("Array.prototype.indexOf", !0) || function(e, n) {
  for (var r = 0; r < e.length; r += 1)
    if (e[r] === n)
      return r;
  return -1;
}, tr = { __proto__: null };
Ns && Gn && Yr ? er(bi, function(t) {
  var e = new Bo[t]();
  if (Symbol.toStringTag in e) {
    var n = Yr(e), r = Gn(n, Symbol.toStringTag);
    if (!r) {
      var i = Yr(n);
      r = Gn(i, Symbol.toStringTag);
    }
    tr["$" + t] = Do(r.get);
  }
}) : er(bi, function(t) {
  var e = new Bo[t](), n = e.slice || e.set;
  n && (tr["$" + t] = Do(n));
});
var wl = function(e) {
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
          "$" + r(e) === i && (n = Ji(i, 1));
        } catch {
        }
    }
  ), n;
}, Cl = function(e) {
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
          r(e), n = Ji(i, 1);
        } catch {
        }
    }
  ), n;
}, _s = function(e) {
  if (!e || typeof e != "object")
    return !1;
  if (!Ns) {
    var n = Ji(_l(e), 8, -1);
    return Pl(bi, n) > -1 ? n : n !== "Object" ? !1 : Cl(e);
  }
  return Gn ? wl(e) : null;
}, Ll = _s, xl = function(e) {
  return !!Ll(e);
};
(function(t) {
  var e = el, n = ol, r = _s, i = xl;
  function o(N) {
    return N.call.bind(N);
  }
  var a = typeof BigInt < "u", s = typeof Symbol < "u", c = o(Object.prototype.toString), u = o(Number.prototype.valueOf), p = o(String.prototype.valueOf), T = o(Boolean.prototype.valueOf);
  if (a)
    var A = o(BigInt.prototype.valueOf);
  if (s)
    var S = o(Symbol.prototype.valueOf);
  function C(N, Gt) {
    if (typeof N != "object")
      return !1;
    try {
      return Gt(N), !0;
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
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(N) : i(N) || E(N);
  }
  t.isArrayBufferView = U;
  function P(N) {
    return r(N) === "Uint8Array";
  }
  t.isUint8Array = P;
  function m(N) {
    return r(N) === "Uint8ClampedArray";
  }
  t.isUint8ClampedArray = m;
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
  function z(N) {
    return r(N) === "Int16Array";
  }
  t.isInt16Array = z;
  function F(N) {
    return r(N) === "Int32Array";
  }
  t.isInt32Array = F;
  function ee(N) {
    return r(N) === "Float32Array";
  }
  t.isFloat32Array = ee;
  function K(N) {
    return r(N) === "Float64Array";
  }
  t.isFloat64Array = K;
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
  function Te(N) {
    return c(N) === "[object WeakSet]";
  }
  Te.working = typeof WeakSet < "u" && Te(/* @__PURE__ */ new WeakSet());
  function _(N) {
    return Te(N);
  }
  t.isWeakSet = _;
  function w(N) {
    return c(N) === "[object ArrayBuffer]";
  }
  w.working = typeof ArrayBuffer < "u" && w(new ArrayBuffer());
  function $(N) {
    return typeof ArrayBuffer > "u" ? !1 : w.working ? w(N) : N instanceof ArrayBuffer;
  }
  t.isArrayBuffer = $;
  function f(N) {
    return c(N) === "[object DataView]";
  }
  f.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && f(new DataView(new ArrayBuffer(1), 0, 1));
  function E(N) {
    return typeof DataView > "u" ? !1 : f.working ? f(N) : N instanceof DataView;
  }
  t.isDataView = E;
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
  function H(N) {
    return C(N, u);
  }
  t.isNumberObject = H;
  function Z(N) {
    return C(N, p);
  }
  t.isStringObject = Z;
  function ae(N) {
    return C(N, T);
  }
  t.isBooleanObject = ae;
  function _e(N) {
    return a && C(N, A);
  }
  t.isBigIntObject = _e;
  function bt(N) {
    return s && C(N, S);
  }
  t.isSymbolObject = bt;
  function ht(N) {
    return H(N) || Z(N) || ae(N) || _e(N) || bt(N);
  }
  t.isBoxedPrimitive = ht;
  function Pe(N) {
    return typeof Uint8Array < "u" && ($(N) || d(N));
  }
  t.isAnyArrayBuffer = Pe, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(N) {
    Object.defineProperty(t, N, {
      enumerable: !1,
      value: function() {
        throw new Error(N + " is not supported in userland");
      }
    });
  });
})(ps);
var kl = function(e) {
  return e && typeof e == "object" && typeof e.copy == "function" && typeof e.fill == "function" && typeof e.readUInt8 == "function";
}, Ri = { exports: {} };
typeof Object.create == "function" ? Ri.exports = function(e, n) {
  n && (e.super_ = n, e.prototype = Object.create(n.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : Ri.exports = function(e, n) {
  if (n) {
    e.super_ = n;
    var r = function() {
    };
    r.prototype = n.prototype, e.prototype = new r(), e.prototype.constructor = e;
  }
};
var Ml = Ri.exports;
(function(t) {
  var e = Object.getOwnPropertyDescriptors || function(E) {
    for (var l = Object.keys(E), h = {}, d = 0; d < l.length; d++)
      h[l[d]] = Object.getOwnPropertyDescriptor(E, l[d]);
    return h;
  }, n = /%[sdj%]/g;
  t.format = function(f) {
    if (!x(f)) {
      for (var E = [], l = 0; l < arguments.length; l++)
        E.push(a(arguments[l]));
      return E.join(" ");
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
      m(O) || !K(O) ? R += " " + O : R += " " + a(O);
    return R;
  }, t.deprecate = function(f, E) {
    if (typeof Ee < "u" && Ee.noDeprecation === !0)
      return f;
    if (typeof Ee > "u")
      return function() {
        return t.deprecate(f, E).apply(this, arguments);
      };
    var l = !1;
    function h() {
      if (!l) {
        if (Ee.throwDeprecation)
          throw new Error(E);
        Ee.traceDeprecation ? console.trace(E) : console.error(E), l = !0;
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
        var E = Ee.pid;
        r[f] = function() {
          var l = t.format.apply(t, arguments);
          console.error("%s %d: %s", f, E, l);
        };
      } else
        r[f] = function() {
        };
    return r[f];
  };
  function a(f, E) {
    var l = {
      seen: [],
      stylize: c
    };
    return arguments.length >= 3 && (l.depth = arguments[2]), arguments.length >= 4 && (l.colors = arguments[3]), P(E) ? l.showHidden = E : E && t._extend(l, E), F(l.showHidden) && (l.showHidden = !1), F(l.depth) && (l.depth = 2), F(l.colors) && (l.colors = !1), F(l.customInspect) && (l.customInspect = !0), l.colors && (l.stylize = s), p(l, f, l.depth);
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
  function s(f, E) {
    var l = a.styles[E];
    return l ? "\x1B[" + a.colors[l][0] + "m" + f + "\x1B[" + a.colors[l][1] + "m" : f;
  }
  function c(f, E) {
    return f;
  }
  function u(f) {
    var E = {};
    return f.forEach(function(l, h) {
      E[l] = !0;
    }), E;
  }
  function p(f, E, l) {
    if (f.customInspect && E && X(E.inspect) && // Filter out the util module, it's inspect function is special
    E.inspect !== t.inspect && // Also filter out any prototype objects using the circular check.
    !(E.constructor && E.constructor.prototype === E)) {
      var h = E.inspect(l, f);
      return x(h) || (h = p(f, h, l)), h;
    }
    var d = T(f, E);
    if (d)
      return d;
    var R = Object.keys(E), O = u(R);
    if (f.showHidden && (R = Object.getOwnPropertyNames(E)), oe(E) && (R.indexOf("message") >= 0 || R.indexOf("description") >= 0))
      return A(E);
    if (R.length === 0) {
      if (X(E)) {
        var b = E.name ? ": " + E.name : "";
        return f.stylize("[Function" + b + "]", "special");
      }
      if (ee(E))
        return f.stylize(RegExp.prototype.toString.call(E), "regexp");
      if (ie(E))
        return f.stylize(Date.prototype.toString.call(E), "date");
      if (oe(E))
        return A(E);
    }
    var L = "", q = !1, H = ["{", "}"];
    if (U(E) && (q = !0, H = ["[", "]"]), X(E)) {
      var Z = E.name ? ": " + E.name : "";
      L = " [Function" + Z + "]";
    }
    if (ee(E) && (L = " " + RegExp.prototype.toString.call(E)), ie(E) && (L = " " + Date.prototype.toUTCString.call(E)), oe(E) && (L = " " + A(E)), R.length === 0 && (!q || E.length == 0))
      return H[0] + L + H[1];
    if (l < 0)
      return ee(E) ? f.stylize(RegExp.prototype.toString.call(E), "regexp") : f.stylize("[Object]", "special");
    f.seen.push(E);
    var ae;
    return q ? ae = S(f, E, l, O, R) : ae = R.map(function(_e) {
      return C(f, E, l, O, _e, q);
    }), f.seen.pop(), k(ae, L, H);
  }
  function T(f, E) {
    if (F(E))
      return f.stylize("undefined", "undefined");
    if (x(E)) {
      var l = "'" + JSON.stringify(E).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return f.stylize(l, "string");
    }
    if (I(E))
      return f.stylize("" + E, "number");
    if (P(E))
      return f.stylize("" + E, "boolean");
    if (m(E))
      return f.stylize("null", "null");
  }
  function A(f) {
    return "[" + Error.prototype.toString.call(f) + "]";
  }
  function S(f, E, l, h, d) {
    for (var R = [], O = 0, b = E.length; O < b; ++O)
      Te(E, String(O)) ? R.push(C(
        f,
        E,
        l,
        h,
        String(O),
        !0
      )) : R.push("");
    return d.forEach(function(L) {
      L.match(/^\d+$/) || R.push(C(
        f,
        E,
        l,
        h,
        L,
        !0
      ));
    }), R;
  }
  function C(f, E, l, h, d, R) {
    var O, b, L;
    if (L = Object.getOwnPropertyDescriptor(E, d) || { value: E[d] }, L.get ? L.set ? b = f.stylize("[Getter/Setter]", "special") : b = f.stylize("[Getter]", "special") : L.set && (b = f.stylize("[Setter]", "special")), Te(h, d) || (O = "[" + d + "]"), b || (f.seen.indexOf(L.value) < 0 ? (m(l) ? b = p(f, L.value, null) : b = p(f, L.value, l - 1), b.indexOf(`
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
  function k(f, E, l) {
    var h = f.reduce(function(d, R) {
      return R.indexOf(`
`) >= 0, d + R.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    return h > 60 ? l[0] + (E === "" ? "" : E + `
 `) + " " + f.join(`,
  `) + " " + l[1] : l[0] + E + " " + f.join(", ") + " " + l[1];
  }
  t.types = ps;
  function U(f) {
    return Array.isArray(f);
  }
  t.isArray = U;
  function P(f) {
    return typeof f == "boolean";
  }
  t.isBoolean = P;
  function m(f) {
    return f === null;
  }
  t.isNull = m;
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
  function z(f) {
    return typeof f == "symbol";
  }
  t.isSymbol = z;
  function F(f) {
    return f === void 0;
  }
  t.isUndefined = F;
  function ee(f) {
    return K(f) && me(f) === "[object RegExp]";
  }
  t.isRegExp = ee, t.types.isRegExp = ee;
  function K(f) {
    return typeof f == "object" && f !== null;
  }
  t.isObject = K;
  function ie(f) {
    return K(f) && me(f) === "[object Date]";
  }
  t.isDate = ie, t.types.isDate = ie;
  function oe(f) {
    return K(f) && (me(f) === "[object Error]" || f instanceof Error);
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
  t.isPrimitive = ue, t.isBuffer = kl;
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
    var f = /* @__PURE__ */ new Date(), E = [
      ge(f.getHours()),
      ge(f.getMinutes()),
      ge(f.getSeconds())
    ].join(":");
    return [f.getDate(), fe[f.getMonth()], E].join(" ");
  }
  t.log = function() {
    console.log("%s - %s", Ne(), t.format.apply(t, arguments));
  }, t.inherits = Ml, t._extend = function(f, E) {
    if (!E || !K(E)) return f;
    for (var l = Object.keys(E), h = l.length; h--; )
      f[l[h]] = E[l[h]];
    return f;
  };
  function Te(f, E) {
    return Object.prototype.hasOwnProperty.call(f, E);
  }
  var _ = typeof Symbol < "u" ? Symbol("util.promisify.custom") : void 0;
  t.promisify = function(E) {
    if (typeof E != "function")
      throw new TypeError('The "original" argument must be of type Function');
    if (_ && E[_]) {
      var l = E[_];
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
        E.apply(this, O);
      } catch (L) {
        d(L);
      }
      return R;
    }
    return Object.setPrototypeOf(l, Object.getPrototypeOf(E)), _ && Object.defineProperty(l, _, {
      value: l,
      enumerable: !1,
      writable: !1,
      configurable: !0
    }), Object.defineProperties(
      l,
      e(E)
    );
  }, t.promisify.custom = _;
  function w(f, E) {
    if (!f) {
      var l = new Error("Promise was rejected with a falsy value");
      l.reason = f, f = l;
    }
    return E(f);
  }
  function $(f) {
    if (typeof f != "function")
      throw new TypeError('The "original" argument must be of type Function');
    function E() {
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
          Ee.nextTick(w.bind(null, b, O));
        }
      );
    }
    return Object.setPrototypeOf(E, Object.getPrototypeOf(f)), Object.defineProperties(
      E,
      e(f)
    ), E;
  }
  t.callbackify = $;
})(Qt);
var qo;
function Ps() {
  if (qo) return Dr;
  qo = 1;
  function t(m) {
    "@babel/helpers - typeof";
    return t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(y) {
      return typeof y;
    } : function(y) {
      return y && typeof Symbol == "function" && y.constructor === Symbol && y !== Symbol.prototype ? "symbol" : typeof y;
    }, t(m);
  }
  function e(m, y, I) {
    return Object.defineProperty(m, "prototype", { writable: !1 }), m;
  }
  function n(m, y) {
    if (!(m instanceof y))
      throw new TypeError("Cannot call a class as a function");
  }
  function r(m, y) {
    if (typeof y != "function" && y !== null)
      throw new TypeError("Super expression must either be null or a function");
    m.prototype = Object.create(y && y.prototype, { constructor: { value: m, writable: !0, configurable: !0 } }), Object.defineProperty(m, "prototype", { writable: !1 }), y && i(m, y);
  }
  function i(m, y) {
    return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(x, z) {
      return x.__proto__ = z, x;
    }, i(m, y);
  }
  function o(m) {
    var y = c();
    return function() {
      var x = u(m), z;
      if (y) {
        var F = u(this).constructor;
        z = Reflect.construct(x, arguments, F);
      } else
        z = x.apply(this, arguments);
      return a(this, z);
    };
  }
  function a(m, y) {
    if (y && (t(y) === "object" || typeof y == "function"))
      return y;
    if (y !== void 0)
      throw new TypeError("Derived constructors may only return object or undefined");
    return s(m);
  }
  function s(m) {
    if (m === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return m;
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
  function u(m) {
    return u = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(I) {
      return I.__proto__ || Object.getPrototypeOf(I);
    }, u(m);
  }
  var p = {}, T, A;
  function S(m, y, I) {
    I || (I = Error);
    function x(F, ee, K) {
      return typeof y == "string" ? y : y(F, ee, K);
    }
    var z = /* @__PURE__ */ function(F) {
      r(K, F);
      var ee = o(K);
      function K(ie, oe, X) {
        var ue;
        return n(this, K), ue = ee.call(this, x(ie, oe, X)), ue.code = m, ue;
      }
      return e(K);
    }(I);
    p[m] = z;
  }
  function C(m, y) {
    if (Array.isArray(m)) {
      var I = m.length;
      return m = m.map(function(x) {
        return String(x);
      }), I > 2 ? "one of ".concat(y, " ").concat(m.slice(0, I - 1).join(", "), ", or ") + m[I - 1] : I === 2 ? "one of ".concat(y, " ").concat(m[0], " or ").concat(m[1]) : "of ".concat(y, " ").concat(m[0]);
    } else
      return "of ".concat(y, " ").concat(String(m));
  }
  function k(m, y, I) {
    return m.substr(0, y.length) === y;
  }
  function U(m, y, I) {
    return (I === void 0 || I > m.length) && (I = m.length), m.substring(I - y.length, I) === y;
  }
  function P(m, y, I) {
    return typeof I != "number" && (I = 0), I + y.length > m.length ? !1 : m.indexOf(y, I) !== -1;
  }
  return S("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError), S("ERR_INVALID_ARG_TYPE", function(m, y, I) {
    T === void 0 && (T = Ni()), T(typeof m == "string", "'name' must be a string");
    var x;
    typeof y == "string" && k(y, "not ") ? (x = "must not be", y = y.replace(/^not /, "")) : x = "must be";
    var z;
    if (U(m, " argument"))
      z = "The ".concat(m, " ").concat(x, " ").concat(C(y, "type"));
    else {
      var F = P(m, ".") ? "property" : "argument";
      z = 'The "'.concat(m, '" ').concat(F, " ").concat(x, " ").concat(C(y, "type"));
    }
    return z += ". Received type ".concat(t(I)), z;
  }, TypeError), S("ERR_INVALID_ARG_VALUE", function(m, y) {
    var I = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "is invalid";
    A === void 0 && (A = Qt);
    var x = A.inspect(y);
    return x.length > 128 && (x = "".concat(x.slice(0, 128), "...")), "The argument '".concat(m, "' ").concat(I, ". Received ").concat(x);
  }, TypeError), S("ERR_INVALID_RETURN_VALUE", function(m, y, I) {
    var x;
    return I && I.constructor && I.constructor.name ? x = "instance of ".concat(I.constructor.name) : x = "type ".concat(t(I)), "Expected ".concat(m, ' to be returned from the "').concat(y, '"') + " function but got ".concat(x, ".");
  }, TypeError), S("ERR_MISSING_ARGS", function() {
    for (var m = arguments.length, y = new Array(m), I = 0; I < m; I++)
      y[I] = arguments[I];
    T === void 0 && (T = Ni()), T(y.length > 0, "At least one arg needs to be specified");
    var x = "The ", z = y.length;
    switch (y = y.map(function(F) {
      return '"'.concat(F, '"');
    }), z) {
      case 1:
        x += "".concat(y[0], " argument");
        break;
      case 2:
        x += "".concat(y[0], " and ").concat(y[1], " arguments");
        break;
      default:
        x += y.slice(0, z - 1).join(", "), x += ", and ".concat(y[z - 1], " arguments");
        break;
    }
    return "".concat(x, " must be specified");
  }, TypeError), Dr.codes = p, Dr;
}
var Xr, Go;
function Fl() {
  if (Go) return Xr;
  Go = 1;
  function t(_, w) {
    var $ = Object.keys(_);
    if (Object.getOwnPropertySymbols) {
      var f = Object.getOwnPropertySymbols(_);
      w && (f = f.filter(function(E) {
        return Object.getOwnPropertyDescriptor(_, E).enumerable;
      })), $.push.apply($, f);
    }
    return $;
  }
  function e(_) {
    for (var w = 1; w < arguments.length; w++) {
      var $ = arguments[w] != null ? arguments[w] : {};
      w % 2 ? t(Object($), !0).forEach(function(f) {
        n(_, f, $[f]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(_, Object.getOwnPropertyDescriptors($)) : t(Object($)).forEach(function(f) {
        Object.defineProperty(_, f, Object.getOwnPropertyDescriptor($, f));
      });
    }
    return _;
  }
  function n(_, w, $) {
    return w = a(w), w in _ ? Object.defineProperty(_, w, { value: $, enumerable: !0, configurable: !0, writable: !0 }) : _[w] = $, _;
  }
  function r(_, w) {
    if (!(_ instanceof w))
      throw new TypeError("Cannot call a class as a function");
  }
  function i(_, w) {
    for (var $ = 0; $ < w.length; $++) {
      var f = w[$];
      f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), Object.defineProperty(_, a(f.key), f);
    }
  }
  function o(_, w, $) {
    return w && i(_.prototype, w), Object.defineProperty(_, "prototype", { writable: !1 }), _;
  }
  function a(_) {
    var w = s(_, "string");
    return m(w) === "symbol" ? w : String(w);
  }
  function s(_, w) {
    if (m(_) !== "object" || _ === null) return _;
    var $ = _[Symbol.toPrimitive];
    if ($ !== void 0) {
      var f = $.call(_, w || "default");
      if (m(f) !== "object") return f;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (w === "string" ? String : Number)(_);
  }
  function c(_, w) {
    if (typeof w != "function" && w !== null)
      throw new TypeError("Super expression must either be null or a function");
    _.prototype = Object.create(w && w.prototype, { constructor: { value: _, writable: !0, configurable: !0 } }), Object.defineProperty(_, "prototype", { writable: !1 }), w && U(_, w);
  }
  function u(_) {
    var w = C();
    return function() {
      var f = P(_), E;
      if (w) {
        var l = P(this).constructor;
        E = Reflect.construct(f, arguments, l);
      } else
        E = f.apply(this, arguments);
      return p(this, E);
    };
  }
  function p(_, w) {
    if (w && (m(w) === "object" || typeof w == "function"))
      return w;
    if (w !== void 0)
      throw new TypeError("Derived constructors may only return object or undefined");
    return T(_);
  }
  function T(_) {
    if (_ === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return _;
  }
  function A(_) {
    var w = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
    return A = function(f) {
      if (f === null || !k(f)) return f;
      if (typeof f != "function")
        throw new TypeError("Super expression must either be null or a function");
      if (typeof w < "u") {
        if (w.has(f)) return w.get(f);
        w.set(f, E);
      }
      function E() {
        return S(f, arguments, P(this).constructor);
      }
      return E.prototype = Object.create(f.prototype, { constructor: { value: E, enumerable: !1, writable: !0, configurable: !0 } }), U(E, f);
    }, A(_);
  }
  function S(_, w, $) {
    return C() ? S = Reflect.construct.bind() : S = function(E, l, h) {
      var d = [null];
      d.push.apply(d, l);
      var R = Function.bind.apply(E, d), O = new R();
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
  function U(_, w) {
    return U = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(f, E) {
      return f.__proto__ = E, f;
    }, U(_, w);
  }
  function P(_) {
    return P = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function($) {
      return $.__proto__ || Object.getPrototypeOf($);
    }, P(_);
  }
  function m(_) {
    "@babel/helpers - typeof";
    return m = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(w) {
      return typeof w;
    } : function(w) {
      return w && typeof Symbol == "function" && w.constructor === Symbol && w !== Symbol.prototype ? "symbol" : typeof w;
    }, m(_);
  }
  var y = Qt, I = y.inspect, x = Ps(), z = x.codes.ERR_INVALID_ARG_TYPE;
  function F(_, w, $) {
    return ($ === void 0 || $ > _.length) && ($ = _.length), _.substring($ - w.length, $) === w;
  }
  function ee(_, w) {
    if (w = Math.floor(w), _.length == 0 || w == 0) return "";
    var $ = _.length * w;
    for (w = Math.floor(Math.log(w) / Math.log(2)); w; )
      _ += _, w--;
    return _ += _.substring(0, $ - _.length), _;
  }
  var K = "", ie = "", oe = "", X = "", ue = {
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
    var w = Object.keys(_), $ = Object.create(Object.getPrototypeOf(_));
    return w.forEach(function(f) {
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
  function Ne(_, w, $) {
    var f = "", E = "", l = 0, h = "", d = !1, R = fe(_), O = R.split(`
`), b = fe(w).split(`
`), L = 0, q = "";
    if ($ === "strictEqual" && m(_) === "object" && m(w) === "object" && _ !== null && w !== null && ($ = "strictEqualObject"), O.length === 1 && b.length === 1 && O[0] !== b[0]) {
      var H = O[0].length + b[0].length;
      if (H <= me) {
        if ((m(_) !== "object" || _ === null) && (m(w) !== "object" || w === null) && (_ !== 0 || w !== 0))
          return "".concat(ue[$], `

`) + "".concat(O[0], " !== ").concat(b[0], `
`);
      } else if ($ !== "strictEqualObject") {
        var Z = Ee.stderr && Ee.stderr.isTTY ? Ee.stderr.columns : 80;
        if (H < Z) {
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
      var ht = R.split(`
`);
      if (ht.length > 30)
        for (ht[26] = "".concat(K, "...").concat(X); ht.length > 27; )
          ht.pop();
      return "".concat(ue.notIdentical, `

`).concat(ht.join(`
`), `
`);
    }
    L > 3 && (h = `
`.concat(K, "...").concat(X).concat(h), d = !0), f !== "" && (h = `
  `.concat(f).concat(h), f = "");
    var Pe = 0, N = ue[$] + `
`.concat(ie, "+ actual").concat(X, " ").concat(oe, "- expected").concat(X), Gt = " ".concat(K, "...").concat(X, " Lines skipped");
    for (L = 0; L < bt; L++) {
      var Fe = L - l;
      if (O.length < L + 1)
        Fe > 1 && L > 2 && (Fe > 4 ? (E += `
`.concat(K, "...").concat(X), d = !0) : Fe > 3 && (E += `
  `.concat(b[L - 2]), Pe++), E += `
  `.concat(b[L - 1]), Pe++), l = L, f += `
`.concat(oe, "-").concat(X, " ").concat(b[L]), Pe++;
      else if (b.length < L + 1)
        Fe > 1 && L > 2 && (Fe > 4 ? (E += `
`.concat(K, "...").concat(X), d = !0) : Fe > 3 && (E += `
  `.concat(O[L - 2]), Pe++), E += `
  `.concat(O[L - 1]), Pe++), l = L, E += `
`.concat(ie, "+").concat(X, " ").concat(O[L]), Pe++;
      else {
        var Ct = b[L], dt = O[L], g = dt !== Ct && (!F(dt, ",") || dt.slice(0, -1) !== Ct);
        g && F(Ct, ",") && Ct.slice(0, -1) === dt && (g = !1, dt += ","), g ? (Fe > 1 && L > 2 && (Fe > 4 ? (E += `
`.concat(K, "...").concat(X), d = !0) : Fe > 3 && (E += `
  `.concat(O[L - 2]), Pe++), E += `
  `.concat(O[L - 1]), Pe++), l = L, E += `
`.concat(ie, "+").concat(X, " ").concat(dt), f += `
`.concat(oe, "-").concat(X, " ").concat(Ct), Pe += 2) : (E += f, f = "", (Fe === 1 || L === 0) && (E += `
  `.concat(dt), Pe++));
      }
      if (Pe > 20 && L < bt - 2)
        return "".concat(N).concat(Gt, `
`).concat(E, `
`).concat(K, "...").concat(X).concat(f, `
`) + "".concat(K, "...").concat(X);
    }
    return "".concat(N).concat(d ? Gt : "", `
`).concat(E).concat(f).concat(h).concat(q);
  }
  var Te = /* @__PURE__ */ function(_, w) {
    c(f, _);
    var $ = u(f);
    function f(E) {
      var l;
      if (r(this, f), m(E) !== "object" || E === null)
        throw new z("options", "Object", E);
      var h = E.message, d = E.operator, R = E.stackStartFn, O = E.actual, b = E.expected, L = Error.stackTraceLimit;
      if (Error.stackTraceLimit = 0, h != null)
        l = $.call(this, String(h));
      else if (Ee.stderr && Ee.stderr.isTTY && (Ee.stderr && Ee.stderr.getColorDepth && Ee.stderr.getColorDepth() !== 1 ? (K = "\x1B[34m", ie = "\x1B[32m", X = "\x1B[39m", oe = "\x1B[31m") : (K = "", ie = "", X = "", oe = "")), m(O) === "object" && O !== null && m(b) === "object" && b !== null && "stack" in O && O instanceof Error && "stack" in b && b instanceof Error && (O = ge(O), b = ge(b)), d === "deepStrictEqual" || d === "strictEqual")
        l = $.call(this, Ne(O, b, d));
      else if (d === "notDeepStrictEqual" || d === "notStrictEqual") {
        var q = ue[d], H = fe(O).split(`
`);
        if (d === "notStrictEqual" && m(O) === "object" && O !== null && (q = ue.notStrictEqualObject), H.length > 30)
          for (H[26] = "".concat(K, "...").concat(X); H.length > 27; )
            H.pop();
        H.length === 1 ? l = $.call(this, "".concat(q, " ").concat(H[0])) : l = $.call(this, "".concat(q, `

`).concat(H.join(`
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
      return Error.stackTraceLimit = L, l.generatedMessage = !h, Object.defineProperty(T(l), "name", {
        value: "AssertionError [ERR_ASSERTION]",
        enumerable: !1,
        writable: !0,
        configurable: !0
      }), l.code = "ERR_ASSERTION", l.actual = O, l.expected = b, l.operator = d, Error.captureStackTrace && Error.captureStackTrace(T(l), R), l.stack, l.name = "AssertionError", p(l);
    }
    return o(f, [{
      key: "toString",
      value: function() {
        return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
      }
    }, {
      key: w,
      value: function(l, h) {
        return I(this, e(e({}, h), {}, {
          customInspect: !1,
          depth: 0
        }));
      }
    }]), f;
  }(/* @__PURE__ */ A(Error), I.custom);
  return Xr = Te, Xr;
}
var Wo = Object.prototype.toString, ws = function(e) {
  var n = Wo.call(e), r = n === "[object Arguments]";
  return r || (r = n !== "[object Array]" && e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && Wo.call(e.callee) === "[object Function]"), r;
}, Jr, Vo;
function $l() {
  if (Vo) return Jr;
  Vo = 1;
  var t;
  if (!Object.keys) {
    var e = Object.prototype.hasOwnProperty, n = Object.prototype.toString, r = ws, i = Object.prototype.propertyIsEnumerable, o = !i.call({ toString: null }, "toString"), a = i.call(function() {
    }, "prototype"), s = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"
    ], c = function(A) {
      var S = A.constructor;
      return S && S.prototype === A;
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
      for (var A in window)
        try {
          if (!u["$" + A] && e.call(window, A) && window[A] !== null && typeof window[A] == "object")
            try {
              c(window[A]);
            } catch {
              return !0;
            }
        } catch {
          return !0;
        }
      return !1;
    }(), T = function(A) {
      if (typeof window > "u" || !p)
        return c(A);
      try {
        return c(A);
      } catch {
        return !1;
      }
    };
    t = function(S) {
      var C = S !== null && typeof S == "object", k = n.call(S) === "[object Function]", U = r(S), P = C && n.call(S) === "[object String]", m = [];
      if (!C && !k && !U)
        throw new TypeError("Object.keys called on a non-object");
      var y = a && k;
      if (P && S.length > 0 && !e.call(S, 0))
        for (var I = 0; I < S.length; ++I)
          m.push(String(I));
      if (U && S.length > 0)
        for (var x = 0; x < S.length; ++x)
          m.push(String(x));
      else
        for (var z in S)
          !(y && z === "prototype") && e.call(S, z) && m.push(String(z));
      if (o)
        for (var F = T(S), ee = 0; ee < s.length; ++ee)
          !(F && s[ee] === "constructor") && e.call(S, s[ee]) && m.push(s[ee]);
      return m;
    };
  }
  return Jr = t, Jr;
}
var Ul = Array.prototype.slice, jl = ws, Ko = Object.keys, Wn = Ko ? function(e) {
  return Ko(e);
} : $l(), zo = Object.keys;
Wn.shim = function() {
  if (Object.keys) {
    var e = function() {
      var n = Object.keys(arguments);
      return n && n.length === arguments.length;
    }(1, 2);
    e || (Object.keys = function(r) {
      return jl(r) ? zo(Ul.call(r)) : zo(r);
    });
  } else
    Object.keys = Wn;
  return Object.keys || Wn;
};
var Cs = Wn, Dl = Cs, Ls = Vi(), xs = mr, Ho = Object, Bl = xs("Array.prototype.push"), Yo = xs("Object.prototype.propertyIsEnumerable"), ql = Ls ? Object.getOwnPropertySymbols : null, Gl = function(e, n) {
  if (e == null)
    throw new TypeError("target must be an object");
  var r = Ho(e);
  if (arguments.length === 1)
    return r;
  for (var i = 1; i < arguments.length; ++i) {
    var o = Ho(arguments[i]), a = Dl(o), s = Ls && (Object.getOwnPropertySymbols || ql);
    if (s)
      for (var c = s(o), u = 0; u < c.length; ++u) {
        var p = c[u];
        Yo(o, p) && Bl(a, p);
      }
    for (var T = 0; T < a.length; ++T) {
      var A = a[T];
      if (Yo(o, A)) {
        var S = o[A];
        r[A] = S;
      }
    }
  }
  return r;
}, Zr = Gl, Wl = function() {
  if (!Object.assign)
    return !1;
  for (var t = "abcdefghijklmnopqrst", e = t.split(""), n = {}, r = 0; r < e.length; ++r)
    n[e[r]] = e[r];
  var i = Object.assign({}, n), o = "";
  for (var a in i)
    o += a;
  return t !== o;
}, Vl = function() {
  if (!Object.assign || !Object.preventExtensions)
    return !1;
  var t = Object.preventExtensions({ 1: 2 });
  try {
    Object.assign(t, "xy");
  } catch {
    return t[1] === "y";
  }
  return !1;
}, Kl = function() {
  return !Object.assign || Wl() || Vl() ? Zr : Object.assign;
}, Xo = function(t) {
  return t !== t;
}, ks = function(e, n) {
  return e === 0 && n === 0 ? 1 / e === 1 / n : !!(e === n || Xo(e) && Xo(n));
}, zl = ks, Zi = function() {
  return typeof Object.is == "function" ? Object.is : zl;
}, Qr, Jo;
function Tr() {
  if (Jo) return Qr;
  Jo = 1;
  var t = Cs, e = typeof Symbol == "function" && typeof Symbol("foo") == "symbol", n = Object.prototype.toString, r = Array.prototype.concat, i = Es, o = function(u) {
    return typeof u == "function" && n.call(u) === "[object Function]";
  }, a = As(), s = function(u, p, T, A) {
    if (p in u) {
      if (A === !0) {
        if (u[p] === T)
          return;
      } else if (!o(A) || !A())
        return;
    }
    a ? i(u, p, T, !0) : i(u, p, T);
  }, c = function(u, p) {
    var T = arguments.length > 2 ? arguments[2] : {}, A = t(p);
    e && (A = r.call(A, Object.getOwnPropertySymbols(p)));
    for (var S = 0; S < A.length; S += 1)
      s(u, A[S], p[A[S]], T[A[S]]);
  };
  return c.supportsDescriptors = !!a, Qr = c, Qr;
}
var ei, Zo;
function Hl() {
  if (Zo) return ei;
  Zo = 1;
  var t = Zi, e = Tr();
  return ei = function() {
    var r = t();
    return e(Object, { is: r }, {
      is: function() {
        return Object.is !== r;
      }
    }), r;
  }, ei;
}
var ti, Qo;
function Yl() {
  if (Qo) return ti;
  Qo = 1;
  var t = Tr(), e = yr, n = ks, r = Zi, i = Hl(), o = e(r(), Object);
  return t(o, {
    getPolyfill: r,
    implementation: n,
    shim: i
  }), ti = o, ti;
}
var ni, ea;
function Ms() {
  return ea || (ea = 1, ni = function(e) {
    return e !== e;
  }), ni;
}
var ri, ta;
function Fs() {
  if (ta) return ri;
  ta = 1;
  var t = Ms();
  return ri = function() {
    return Number.isNaN && Number.isNaN(NaN) && !Number.isNaN("a") ? Number.isNaN : t;
  }, ri;
}
var ii, na;
function Xl() {
  if (na) return ii;
  na = 1;
  var t = Tr(), e = Fs();
  return ii = function() {
    var r = e();
    return t(Number, { isNaN: r }, {
      isNaN: function() {
        return Number.isNaN !== r;
      }
    }), r;
  }, ii;
}
var oi, ra;
function Jl() {
  if (ra) return oi;
  ra = 1;
  var t = yr, e = Tr(), n = Ms(), r = Fs(), i = Xl(), o = t(r(), Number);
  return e(o, {
    getPolyfill: r,
    implementation: n,
    shim: i
  }), oi = o, oi;
}
var ai, ia;
function Zl() {
  if (ia) return ai;
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
      } catch (we) {
        Ie = !0, B = we;
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
  }, p = Object.is ? Object.is : Yl(), T = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function() {
    return [];
  }, A = Number.isNaN ? Number.isNaN : Jl();
  function S(g) {
    return g.call.bind(g);
  }
  var C = S(Object.prototype.hasOwnProperty), k = S(Object.prototype.propertyIsEnumerable), U = S(Object.prototype.toString), P = Qt.types, m = P.isAnyArrayBuffer, y = P.isArrayBufferView, I = P.isDate, x = P.isMap, z = P.isRegExp, F = P.isSet, ee = P.isNativeError, K = P.isBoxedPrimitive, ie = P.isNumberObject, oe = P.isStringObject, X = P.isBooleanObject, ue = P.isBigIntObject, me = P.isSymbolObject, ge = P.isFloat32Array, fe = P.isFloat64Array;
  function Ne(g) {
    if (g.length === 0 || g.length > 10) return !0;
    for (var v = 0; v < g.length; v++) {
      var M = g.charCodeAt(v);
      if (M < 48 || M > 57) return !0;
    }
    return g.length === 10 && g >= Math.pow(2, 32);
  }
  function Te(g) {
    return Object.keys(g).filter(Ne).concat(T(g).filter(Object.prototype.propertyIsEnumerable.bind(g)));
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
  var w = !0, $ = !1, f = 0, E = 1, l = 2, h = 3;
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
        return typeof g == "number" && A(g) && A(v);
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
      var Y = Te(g), ne = Te(v);
      return Y.length !== ne.length ? !1 : Z(g, v, M, j, E, Y);
    }
    if (B === "[object Object]" && (!x(g) && x(v) || !F(g) && F(v)))
      return !1;
    if (I(g)) {
      if (!I(v) || Date.prototype.getTime.call(g) !== Date.prototype.getTime.call(v))
        return !1;
    } else if (z(g)) {
      if (!z(v) || !d(g, v))
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
      var re = Te(g), Ie = Te(v);
      return re.length !== Ie.length ? !1 : Z(g, v, M, j, f, re);
    } else {
      if (F(g))
        return !F(v) || g.size !== v.size ? !1 : Z(g, v, M, j, l);
      if (x(g))
        return !x(v) || g.size !== v.size ? !1 : Z(g, v, M, j, h);
      if (m(g)) {
        if (!b(g, v))
          return !1;
      } else if (K(g) && !L(g, v))
        return !1;
    }
    return Z(g, v, M, j, f);
  }
  function H(g, v) {
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
      var re = T(g);
      if (re.length !== 0) {
        var Ie = 0;
        for (ne = 0; ne < re.length; ne++) {
          var we = re[ne];
          if (k(g, we)) {
            if (!k(v, we))
              return !1;
            J.push(we), Ie++;
          } else if (k(v, we))
            return !1;
        }
        var cn = T(v);
        if (re.length !== cn.length && H(v, cn).length !== Ie)
          return !1;
      } else {
        var Wt = T(v);
        if (Wt.length !== 0 && H(v, Wt).length !== 0)
          return !1;
      }
    }
    if (J.length === 0 && (B === f || B === E && g.length === 0 || g.size === 0))
      return !0;
    if (j === void 0)
      j = {
        val1: /* @__PURE__ */ new Map(),
        val2: /* @__PURE__ */ new Map(),
        position: 0
      };
    else {
      var un = j.val1.get(g);
      if (un !== void 0) {
        var pt = j.val2.get(v);
        if (pt !== void 0)
          return un === pt;
      }
      j.position++;
    }
    j.val1.set(g, j.position), j.val2.set(v, j.position);
    var ln = Fe(g, v, M, J, j, B);
    return j.val1.delete(g), j.val2.delete(v), ln;
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
        if (A(g))
          return !1;
    }
    return !0;
  }
  function bt(g, v, M) {
    var j = _e(M);
    return j ?? (v.has(j) && !g.has(j));
  }
  function ht(g, v, M, j, B) {
    var J = _e(M);
    if (J != null)
      return J;
    var Y = v.get(J);
    return Y === void 0 && !v.has(J) || !q(j, Y, !1, B) ? !1 : !g.has(J) && q(j, Y, !1, B);
  }
  function Pe(g, v, M, j) {
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
        var we = re[Ie];
        if (a(we) === "object" && we !== null) {
          if (!ae(B, we, M, j)) return !1;
        } else if (!M && !g.has(we) && !ae(B, we, M, j))
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
  function Gt(g, v, M, j) {
    for (var B = null, J = u(g), Y = 0; Y < J.length; Y++) {
      var ne = t(J[Y], 2), re = ne[0], Ie = ne[1];
      if (a(re) === "object" && re !== null)
        B === null && (B = /* @__PURE__ */ new Set()), B.add(re);
      else {
        var we = v.get(re);
        if (we === void 0 && !v.has(re) || !q(Ie, we, M, j)) {
          if (M || !ht(g, v, re, Ie, j)) return !1;
          B === null && (B = /* @__PURE__ */ new Set()), B.add(re);
        }
      }
    }
    if (B !== null) {
      for (var cn = u(v), Wt = 0; Wt < cn.length; Wt++) {
        var un = t(cn[Wt], 2), pt = un[0], ln = un[1];
        if (a(pt) === "object" && pt !== null) {
          if (!N(B, g, pt, ln, M, j)) return !1;
        } else if (!M && (!g.has(pt) || !q(g.get(pt), ln, !1, j)) && !N(B, g, pt, ln, !1, j))
          return !1;
      }
      return B.size === 0;
    }
    return !0;
  }
  function Fe(g, v, M, j, B, J) {
    var Y = 0;
    if (J === l) {
      if (!Pe(g, v, M, B))
        return !1;
    } else if (J === h) {
      if (!Gt(g, v, M, B))
        return !1;
    } else if (J === E)
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
  function Ct(g, v) {
    return q(g, v, $);
  }
  function dt(g, v) {
    return q(g, v, w);
  }
  return ai = {
    isDeepEqual: Ct,
    isDeepStrictEqual: dt
  }, ai;
}
var oa;
function Ni() {
  if (oa) return jr.exports;
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
  var r = Ps(), i = r.codes, o = i.ERR_AMBIGUOUS_ARGUMENT, a = i.ERR_INVALID_ARG_TYPE, s = i.ERR_INVALID_ARG_VALUE, c = i.ERR_INVALID_RETURN_VALUE, u = i.ERR_MISSING_ARGS, p = Fl(), T = Qt, A = T.inspect, S = Qt.types, C = S.isPromise, k = S.isRegExp, U = Kl(), P = Zi(), m = mr("RegExp.prototype.test"), y, I;
  function x() {
    var l = Zl();
    y = l.isDeepEqual, I = l.isDeepStrictEqual;
  }
  var z = !1, F = jr.exports = X, ee = {};
  function K(l) {
    throw l.message instanceof Error ? l.message : new p(l);
  }
  function ie(l, h, d, R, O) {
    var b = arguments.length, L;
    if (b === 0)
      L = "Failed";
    else if (b === 1)
      d = l, l = void 0;
    else {
      if (z === !1) {
        z = !0;
        var q = Ee.emitWarning ? Ee.emitWarning : console.warn.bind(console);
        q("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094");
      }
      b === 2 && (R = "!=");
    }
    if (d instanceof Error) throw d;
    var H = {
      actual: l,
      expected: h,
      operator: R === void 0 ? "fail" : R,
      stackStartFn: O || ie
    };
    d !== void 0 && (H.message = d);
    var Z = new p(H);
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
    h != d && K({
      actual: h,
      expected: d,
      message: R,
      operator: "==",
      stackStartFn: l
    });
  }, F.notEqual = function l(h, d, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    h == d && K({
      actual: h,
      expected: d,
      message: R,
      operator: "!=",
      stackStartFn: l
    });
  }, F.deepEqual = function l(h, d, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    y === void 0 && x(), y(h, d) || K({
      actual: h,
      expected: d,
      message: R,
      operator: "deepEqual",
      stackStartFn: l
    });
  }, F.notDeepEqual = function l(h, d, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    y === void 0 && x(), y(h, d) && K({
      actual: h,
      expected: d,
      message: R,
      operator: "notDeepEqual",
      stackStartFn: l
    });
  }, F.deepStrictEqual = function l(h, d, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    y === void 0 && x(), I(h, d) || K({
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
    y === void 0 && x(), I(l, h) && K({
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
    P(h, d) || K({
      actual: h,
      expected: d,
      message: R,
      operator: "strictEqual",
      stackStartFn: l
    });
  }, F.notStrictEqual = function l(h, d, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    P(h, d) && K({
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
      b in h && (R !== void 0 && typeof R[b] == "string" && k(h[b]) && m(h[b], R[b]) ? O[b] = R[b] : O[b] = h[b]);
    });
  });
  function ge(l, h, d, R, O, b) {
    if (!(d in l) || !I(l[d], h[d])) {
      if (!R) {
        var L = new me(l, O), q = new me(h, O, l), H = new p({
          actual: L,
          expected: q,
          operator: "deepStrictEqual",
          stackStartFn: b
        });
        throw H.actual = l, H.expected = h, H.operator = b.name, H;
      }
      K({
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
      if (k(h)) return m(h, l);
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
        typeof l[L] == "string" && k(h[L]) && m(h[L], l[L]) || ge(l, h, L, d, b, R);
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
  function Te(l) {
    return C(l) || l !== null && t(l) === "object" && typeof l.then == "function" && typeof l.catch == "function";
  }
  function _(l) {
    return Promise.resolve().then(function() {
      var h;
      if (typeof l == "function") {
        if (h = l(), !Te(h))
          throw new c("instance of Promise", "promiseFn", h);
      } else if (Te(l))
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
  function w(l, h, d, R) {
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
      K({
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
        K({
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
    w.apply(void 0, [l, Ne(h)].concat(R));
  }, F.rejects = function l(h) {
    for (var d = arguments.length, R = new Array(d > 1 ? d - 1 : 0), O = 1; O < d; O++)
      R[O - 1] = arguments[O];
    return _(h).then(function(b) {
      return w.apply(void 0, [l, b].concat(R));
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
      t(h) === "object" && typeof h.message == "string" ? h.message.length === 0 && h.constructor ? d += h.constructor.name : d += h.message : d += A(h);
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
          var H = L.indexOf(b[q]);
          if (H !== -1) {
            L = L.slice(0, H);
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
    if (typeof l != "string" || m(h, l) !== b) {
      if (d instanceof Error)
        throw d;
      var L = !d;
      d = d || (typeof l != "string" ? 'The "string" argument must be of type string. Received type ' + "".concat(t(l), " (").concat(A(l), ")") : (b ? "The input did not match the regular expression " : "The input was expected to not match the regular expression ") + "".concat(A(h), `. Input:

`).concat(A(l), `
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
  function E() {
    for (var l = arguments.length, h = new Array(l), d = 0; d < l; d++)
      h[d] = arguments[d];
    oe.apply(void 0, [E, h.length].concat(h));
  }
  return F.strict = U(E, F, {
    equal: F.strictEqual,
    deepEqual: F.deepStrictEqual,
    notEqual: F.notStrictEqual,
    notDeepEqual: F.notDeepStrictEqual
  }), F.strict.strict = F.strict, jr.exports;
}
var Ql = Ni();
const Vn = /* @__PURE__ */ eu(Ql), ef = "aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc", tf = 0, lT = 1, fT = 2, hT = 3, dT = 4, pT = 5, gT = 6, yT = 10n, $s = "v1", Us = "spectre";
function Ar(t) {
  return `${Us}_${t}_${$s}_${mt.programSuffix}.aleo`;
}
const mT = () => Ar(mt.programs.accessControl), ET = () => Ar(mt.programs.aclManager), nf = () => Ar(mt.programs.stcredits), TT = () => Ar(mt.programs.stcreditsPoints);
function AT(t) {
  const e = (t + 1).toString().padStart(3, "0");
  return `${Us}_${mt.programs.delegator}_${$s}_${mt.programSuffix}_${e}.aleo`;
}
let mt;
function vT(t) {
  Vn(!mt), mt = t;
}
const xn = globalThis || void 0 || self;
var js = typeof xn == "object" && xn && xn.Object === Object && xn, rf = typeof self == "object" && self && self.Object === Object && self, at = js || rf || Function("return this")(), We = at.Symbol, Ds = Object.prototype, of = Ds.hasOwnProperty, af = Ds.toString, fn = We ? We.toStringTag : void 0;
function sf(t) {
  var e = of.call(t, fn), n = t[fn];
  try {
    t[fn] = void 0;
    var r = !0;
  } catch {
  }
  var i = af.call(t);
  return r && (e ? t[fn] = n : delete t[fn]), i;
}
var cf = Object.prototype, uf = cf.toString;
function lf(t) {
  return uf.call(t);
}
var ff = "[object Null]", hf = "[object Undefined]", aa = We ? We.toStringTag : void 0;
function _t(t) {
  return t == null ? t === void 0 ? hf : ff : aa && aa in Object(t) ? sf(t) : lf(t);
}
function Xe(t) {
  return t != null && typeof t == "object";
}
var df = "[object Symbol]";
function vr(t) {
  return typeof t == "symbol" || Xe(t) && _t(t) == df;
}
function Sr(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, i = Array(r); ++n < r; )
    i[n] = e(t[n], n, t);
  return i;
}
var te = Array.isArray, pf = 1 / 0, sa = We ? We.prototype : void 0, ca = sa ? sa.toString : void 0;
function Bs(t) {
  if (typeof t == "string")
    return t;
  if (te(t))
    return Sr(t, Bs) + "";
  if (vr(t))
    return ca ? ca.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -pf ? "-0" : e;
}
var gf = /\s/;
function yf(t) {
  for (var e = t.length; e-- && gf.test(t.charAt(e)); )
    ;
  return e;
}
var mf = /^\s+/;
function Ef(t) {
  return t && t.slice(0, yf(t) + 1).replace(mf, "");
}
function Ve(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var ua = NaN, Tf = /^[-+]0x[0-9a-f]+$/i, Af = /^0b[01]+$/i, vf = /^0o[0-7]+$/i, Sf = parseInt;
function Of(t) {
  if (typeof t == "number")
    return t;
  if (vr(t))
    return ua;
  if (Ve(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = Ve(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = Ef(t);
  var n = Af.test(t);
  return n || vf.test(t) ? Sf(t.slice(2), n ? 2 : 8) : Tf.test(t) ? ua : +t;
}
var la = 1 / 0, If = 17976931348623157e292;
function bf(t) {
  if (!t)
    return t === 0 ? t : 0;
  if (t = Of(t), t === la || t === -la) {
    var e = t < 0 ? -1 : 1;
    return e * If;
  }
  return t === t ? t : 0;
}
function Or(t) {
  var e = bf(t), n = e % 1;
  return e === e ? n ? e - n : e : 0;
}
function tn(t) {
  return t;
}
var Rf = "[object AsyncFunction]", Nf = "[object Function]", _f = "[object GeneratorFunction]", Pf = "[object Proxy]";
function St(t) {
  if (!Ve(t))
    return !1;
  var e = _t(t);
  return e == Nf || e == _f || e == Rf || e == Pf;
}
var si = at["__core-js_shared__"], fa = function() {
  var t = /[^.]+$/.exec(si && si.keys && si.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function wf(t) {
  return !!fa && fa in t;
}
var Cf = Function.prototype, Lf = Cf.toString;
function Dt(t) {
  if (t != null) {
    try {
      return Lf.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var xf = /[\\^$.*+?()[\]{}|]/g, kf = /^\[object .+?Constructor\]$/, Mf = Function.prototype, Ff = Object.prototype, $f = Mf.toString, Uf = Ff.hasOwnProperty, jf = RegExp(
  "^" + $f.call(Uf).replace(xf, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Df(t) {
  if (!Ve(t) || wf(t))
    return !1;
  var e = St(t) ? jf : kf;
  return e.test(Dt(t));
}
function Bf(t, e) {
  return t?.[e];
}
function Bt(t, e) {
  var n = Bf(t, e);
  return Df(n) ? n : void 0;
}
var _i = Bt(at, "WeakMap"), ha = Object.create, qf = /* @__PURE__ */ function() {
  function t() {
  }
  return function(e) {
    if (!Ve(e))
      return {};
    if (ha)
      return ha(e);
    t.prototype = e;
    var n = new t();
    return t.prototype = void 0, n;
  };
}();
function Gf(t, e, n) {
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
function Ae() {
}
function Wf(t, e) {
  var n = -1, r = t.length;
  for (e || (e = Array(r)); ++n < r; )
    e[n] = t[n];
  return e;
}
var Vf = 800, Kf = 16, zf = Date.now;
function Hf(t) {
  var e = 0, n = 0;
  return function() {
    var r = zf(), i = Kf - (r - n);
    if (n = r, i > 0) {
      if (++e >= Vf)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
function Yf(t) {
  return function() {
    return t;
  };
}
var nr = function() {
  try {
    var t = Bt(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}(), Xf = nr ? function(t, e) {
  return nr(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Yf(e),
    writable: !0
  });
} : tn, Jf = Hf(Xf);
function qs(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r && e(t[n], n, t) !== !1; )
    ;
  return t;
}
function Gs(t, e, n, r) {
  for (var i = t.length, o = n + -1; ++o < i; )
    if (e(t[o], o, t))
      return o;
  return -1;
}
function Zf(t) {
  return t !== t;
}
function Qf(t, e, n) {
  for (var r = n - 1, i = t.length; ++r < i; )
    if (t[r] === e)
      return r;
  return -1;
}
function Qi(t, e, n) {
  return e === e ? Qf(t, e, n) : Gs(t, Zf, n);
}
function Ws(t, e) {
  var n = t == null ? 0 : t.length;
  return !!n && Qi(t, e, 0) > -1;
}
var eh = 9007199254740991, th = /^(?:0|[1-9]\d*)$/;
function Ir(t, e) {
  var n = typeof t;
  return e = e ?? eh, !!e && (n == "number" || n != "symbol" && th.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function eo(t, e, n) {
  e == "__proto__" && nr ? nr(t, e, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : t[e] = n;
}
function bn(t, e) {
  return t === e || t !== t && e !== e;
}
var nh = Object.prototype, rh = nh.hasOwnProperty;
function br(t, e, n) {
  var r = t[e];
  (!(rh.call(t, e) && bn(r, n)) || n === void 0 && !(e in t)) && eo(t, e, n);
}
function to(t, e, n, r) {
  var i = !n;
  n || (n = {});
  for (var o = -1, a = e.length; ++o < a; ) {
    var s = e[o], c = void 0;
    c === void 0 && (c = t[s]), i ? eo(n, s, c) : br(n, s, c);
  }
  return n;
}
var da = Math.max;
function ih(t, e, n) {
  return e = da(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var r = arguments, i = -1, o = da(r.length - e, 0), a = Array(o); ++i < o; )
      a[i] = r[e + i];
    i = -1;
    for (var s = Array(e + 1); ++i < e; )
      s[i] = r[i];
    return s[e] = n(a), Gf(t, this, s);
  };
}
function no(t, e) {
  return Jf(ih(t, e, tn), t + "");
}
var oh = 9007199254740991;
function ro(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= oh;
}
function st(t) {
  return t != null && ro(t.length) && !St(t);
}
function Vs(t, e, n) {
  if (!Ve(n))
    return !1;
  var r = typeof e;
  return (r == "number" ? st(n) && Ir(e, n.length) : r == "string" && e in n) ? bn(n[e], t) : !1;
}
function ah(t) {
  return no(function(e, n) {
    var r = -1, i = n.length, o = i > 1 ? n[i - 1] : void 0, a = i > 2 ? n[2] : void 0;
    for (o = t.length > 3 && typeof o == "function" ? (i--, o) : void 0, a && Vs(n[0], n[1], a) && (o = i < 3 ? void 0 : o, i = 1), e = Object(e); ++r < i; ) {
      var s = n[r];
      s && t(e, s, r, o);
    }
    return e;
  });
}
var sh = Object.prototype;
function Rn(t) {
  var e = t && t.constructor, n = typeof e == "function" && e.prototype || sh;
  return t === n;
}
function ch(t, e) {
  for (var n = -1, r = Array(t); ++n < t; )
    r[n] = e(n);
  return r;
}
var uh = "[object Arguments]";
function pa(t) {
  return Xe(t) && _t(t) == uh;
}
var Ks = Object.prototype, lh = Ks.hasOwnProperty, fh = Ks.propertyIsEnumerable, Rr = pa(/* @__PURE__ */ function() {
  return arguments;
}()) ? pa : function(t) {
  return Xe(t) && lh.call(t, "callee") && !fh.call(t, "callee");
};
function hh() {
  return !1;
}
var zs = typeof exports == "object" && exports && !exports.nodeType && exports, ga = zs && typeof module == "object" && module && !module.nodeType && module, dh = ga && ga.exports === zs, ya = dh ? at.Buffer : void 0, ph = ya ? ya.isBuffer : void 0, Tn = ph || hh, gh = "[object Arguments]", yh = "[object Array]", mh = "[object Boolean]", Eh = "[object Date]", Th = "[object Error]", Ah = "[object Function]", vh = "[object Map]", Sh = "[object Number]", Oh = "[object Object]", Ih = "[object RegExp]", bh = "[object Set]", Rh = "[object String]", Nh = "[object WeakMap]", _h = "[object ArrayBuffer]", Ph = "[object DataView]", wh = "[object Float32Array]", Ch = "[object Float64Array]", Lh = "[object Int8Array]", xh = "[object Int16Array]", kh = "[object Int32Array]", Mh = "[object Uint8Array]", Fh = "[object Uint8ClampedArray]", $h = "[object Uint16Array]", Uh = "[object Uint32Array]", le = {};
le[wh] = le[Ch] = le[Lh] = le[xh] = le[kh] = le[Mh] = le[Fh] = le[$h] = le[Uh] = !0;
le[gh] = le[yh] = le[_h] = le[mh] = le[Ph] = le[Eh] = le[Th] = le[Ah] = le[vh] = le[Sh] = le[Oh] = le[Ih] = le[bh] = le[Rh] = le[Nh] = !1;
function jh(t) {
  return Xe(t) && ro(t.length) && !!le[_t(t)];
}
function Nr(t) {
  return function(e) {
    return t(e);
  };
}
var Hs = typeof exports == "object" && exports && !exports.nodeType && exports, mn = Hs && typeof module == "object" && module && !module.nodeType && module, Dh = mn && mn.exports === Hs, ci = Dh && js.process, Rt = function() {
  try {
    var t = mn && mn.require && mn.require("util").types;
    return t || ci && ci.binding && ci.binding("util");
  } catch {
  }
}(), ma = Rt && Rt.isTypedArray, io = ma ? Nr(ma) : jh, Bh = Object.prototype, qh = Bh.hasOwnProperty;
function Ys(t, e) {
  var n = te(t), r = !n && Rr(t), i = !n && !r && Tn(t), o = !n && !r && !i && io(t), a = n || r || i || o, s = a ? ch(t.length, String) : [], c = s.length;
  for (var u in t)
    (e || qh.call(t, u)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    Ir(u, c))) && s.push(u);
  return s;
}
function Xs(t, e) {
  return function(n) {
    return t(e(n));
  };
}
var Gh = Xs(Object.keys, Object), Wh = Object.prototype, Vh = Wh.hasOwnProperty;
function Js(t) {
  if (!Rn(t))
    return Gh(t);
  var e = [];
  for (var n in Object(t))
    Vh.call(t, n) && n != "constructor" && e.push(n);
  return e;
}
function Ke(t) {
  return st(t) ? Ys(t) : Js(t);
}
var Kh = Object.prototype, zh = Kh.hasOwnProperty, Ue = ah(function(t, e) {
  if (Rn(e) || st(e)) {
    to(e, Ke(e), t);
    return;
  }
  for (var n in e)
    zh.call(e, n) && br(t, n, e[n]);
});
function Hh(t) {
  var e = [];
  if (t != null)
    for (var n in Object(t))
      e.push(n);
  return e;
}
var Yh = Object.prototype, Xh = Yh.hasOwnProperty;
function Jh(t) {
  if (!Ve(t))
    return Hh(t);
  var e = Rn(t), n = [];
  for (var r in t)
    r == "constructor" && (e || !Xh.call(t, r)) || n.push(r);
  return n;
}
function Zs(t) {
  return st(t) ? Ys(t, !0) : Jh(t);
}
var Zh = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Qh = /^\w*$/;
function oo(t, e) {
  if (te(t))
    return !1;
  var n = typeof t;
  return n == "number" || n == "symbol" || n == "boolean" || t == null || vr(t) ? !0 : Qh.test(t) || !Zh.test(t) || e != null && t in Object(e);
}
var An = Bt(Object, "create");
function ed() {
  this.__data__ = An ? An(null) : {}, this.size = 0;
}
function td(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var nd = "__lodash_hash_undefined__", rd = Object.prototype, id = rd.hasOwnProperty;
function od(t) {
  var e = this.__data__;
  if (An) {
    var n = e[t];
    return n === nd ? void 0 : n;
  }
  return id.call(e, t) ? e[t] : void 0;
}
var ad = Object.prototype, sd = ad.hasOwnProperty;
function cd(t) {
  var e = this.__data__;
  return An ? e[t] !== void 0 : sd.call(e, t);
}
var ud = "__lodash_hash_undefined__";
function ld(t, e) {
  var n = this.__data__;
  return this.size += this.has(t) ? 0 : 1, n[t] = An && e === void 0 ? ud : e, this;
}
function $t(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
$t.prototype.clear = ed;
$t.prototype.delete = td;
$t.prototype.get = od;
$t.prototype.has = cd;
$t.prototype.set = ld;
function fd() {
  this.__data__ = [], this.size = 0;
}
function _r(t, e) {
  for (var n = t.length; n--; )
    if (bn(t[n][0], e))
      return n;
  return -1;
}
var hd = Array.prototype, dd = hd.splice;
function pd(t) {
  var e = this.__data__, n = _r(e, t);
  if (n < 0)
    return !1;
  var r = e.length - 1;
  return n == r ? e.pop() : dd.call(e, n, 1), --this.size, !0;
}
function gd(t) {
  var e = this.__data__, n = _r(e, t);
  return n < 0 ? void 0 : e[n][1];
}
function yd(t) {
  return _r(this.__data__, t) > -1;
}
function md(t, e) {
  var n = this.__data__, r = _r(n, t);
  return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this;
}
function Ot(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Ot.prototype.clear = fd;
Ot.prototype.delete = pd;
Ot.prototype.get = gd;
Ot.prototype.has = yd;
Ot.prototype.set = md;
var vn = Bt(at, "Map");
function Ed() {
  this.size = 0, this.__data__ = {
    hash: new $t(),
    map: new (vn || Ot)(),
    string: new $t()
  };
}
function Td(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Pr(t, e) {
  var n = t.__data__;
  return Td(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
}
function Ad(t) {
  var e = Pr(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function vd(t) {
  return Pr(this, t).get(t);
}
function Sd(t) {
  return Pr(this, t).has(t);
}
function Od(t, e) {
  var n = Pr(this, t), r = n.size;
  return n.set(t, e), this.size += n.size == r ? 0 : 1, this;
}
function It(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
It.prototype.clear = Ed;
It.prototype.delete = Ad;
It.prototype.get = vd;
It.prototype.has = Sd;
It.prototype.set = Od;
var Id = "Expected a function";
function ao(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Id);
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
var bd = 500;
function Rd(t) {
  var e = ao(t, function(r) {
    return n.size === bd && n.clear(), r;
  }), n = e.cache;
  return e;
}
var Nd = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, _d = /\\(\\)?/g, Pd = Rd(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(Nd, function(n, r, i, o) {
    e.push(i ? o.replace(_d, "$1") : r || n);
  }), e;
});
function wd(t) {
  return t == null ? "" : Bs(t);
}
function wr(t, e) {
  return te(t) ? t : oo(t, e) ? [t] : Pd(wd(t));
}
var Cd = 1 / 0;
function Nn(t) {
  if (typeof t == "string" || vr(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -Cd ? "-0" : e;
}
function so(t, e) {
  e = wr(e, t);
  for (var n = 0, r = e.length; t != null && n < r; )
    t = t[Nn(e[n++])];
  return n && n == r ? t : void 0;
}
function Ld(t, e, n) {
  var r = t == null ? void 0 : so(t, e);
  return r === void 0 ? n : r;
}
function co(t, e) {
  for (var n = -1, r = e.length, i = t.length; ++n < r; )
    t[i + n] = e[n];
  return t;
}
var Ea = We ? We.isConcatSpreadable : void 0;
function xd(t) {
  return te(t) || Rr(t) || !!(Ea && t && t[Ea]);
}
function uo(t, e, n, r, i) {
  var o = -1, a = t.length;
  for (n || (n = xd), i || (i = []); ++o < a; ) {
    var s = t[o];
    n(s) ? co(i, s) : r || (i[i.length] = s);
  }
  return i;
}
function He(t) {
  var e = t == null ? 0 : t.length;
  return e ? uo(t) : [];
}
var Qs = Xs(Object.getPrototypeOf, Object);
function ec(t, e, n) {
  var r = -1, i = t.length;
  e < 0 && (e = -e > i ? 0 : i + e), n = n > i ? i : n, n < 0 && (n += i), i = e > n ? 0 : n - e >>> 0, e >>>= 0;
  for (var o = Array(i); ++r < i; )
    o[r] = t[r + e];
  return o;
}
function kd(t, e, n, r) {
  var i = -1, o = t == null ? 0 : t.length;
  for (r && o && (n = t[++i]); ++i < o; )
    n = e(n, t[i], i, t);
  return n;
}
function Md() {
  this.__data__ = new Ot(), this.size = 0;
}
function Fd(t) {
  var e = this.__data__, n = e.delete(t);
  return this.size = e.size, n;
}
function $d(t) {
  return this.__data__.get(t);
}
function Ud(t) {
  return this.__data__.has(t);
}
var jd = 200;
function Dd(t, e) {
  var n = this.__data__;
  if (n instanceof Ot) {
    var r = n.__data__;
    if (!vn || r.length < jd - 1)
      return r.push([t, e]), this.size = ++n.size, this;
    n = this.__data__ = new It(r);
  }
  return n.set(t, e), this.size = n.size, this;
}
function ot(t) {
  var e = this.__data__ = new Ot(t);
  this.size = e.size;
}
ot.prototype.clear = Md;
ot.prototype.delete = Fd;
ot.prototype.get = $d;
ot.prototype.has = Ud;
ot.prototype.set = Dd;
function Bd(t, e) {
  return t && to(e, Ke(e), t);
}
var tc = typeof exports == "object" && exports && !exports.nodeType && exports, Ta = tc && typeof module == "object" && module && !module.nodeType && module, qd = Ta && Ta.exports === tc, Aa = qd ? at.Buffer : void 0, va = Aa ? Aa.allocUnsafe : void 0;
function Gd(t, e) {
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
function nc() {
  return [];
}
var Wd = Object.prototype, Vd = Wd.propertyIsEnumerable, Sa = Object.getOwnPropertySymbols, fo = Sa ? function(t) {
  return t == null ? [] : (t = Object(t), lo(Sa(t), function(e) {
    return Vd.call(t, e);
  }));
} : nc;
function Kd(t, e) {
  return to(t, fo(t), e);
}
var zd = Object.getOwnPropertySymbols, Hd = zd ? function(t) {
  for (var e = []; t; )
    co(e, fo(t)), t = Qs(t);
  return e;
} : nc;
function rc(t, e, n) {
  var r = e(t);
  return te(t) ? r : co(r, n(t));
}
function Pi(t) {
  return rc(t, Ke, fo);
}
function Yd(t) {
  return rc(t, Zs, Hd);
}
var wi = Bt(at, "DataView"), Ci = Bt(at, "Promise"), Zt = Bt(at, "Set"), Oa = "[object Map]", Xd = "[object Object]", Ia = "[object Promise]", ba = "[object Set]", Ra = "[object WeakMap]", Na = "[object DataView]", Jd = Dt(wi), Zd = Dt(vn), Qd = Dt(Ci), ep = Dt(Zt), tp = Dt(_i), qe = _t;
(wi && qe(new wi(new ArrayBuffer(1))) != Na || vn && qe(new vn()) != Oa || Ci && qe(Ci.resolve()) != Ia || Zt && qe(new Zt()) != ba || _i && qe(new _i()) != Ra) && (qe = function(t) {
  var e = _t(t), n = e == Xd ? t.constructor : void 0, r = n ? Dt(n) : "";
  if (r)
    switch (r) {
      case Jd:
        return Na;
      case Zd:
        return Oa;
      case Qd:
        return Ia;
      case ep:
        return ba;
      case tp:
        return Ra;
    }
  return e;
});
var np = Object.prototype, rp = np.hasOwnProperty;
function ip(t) {
  var e = t.length, n = new t.constructor(e);
  return e && typeof t[0] == "string" && rp.call(t, "index") && (n.index = t.index, n.input = t.input), n;
}
var rr = at.Uint8Array;
function op(t) {
  var e = new t.constructor(t.byteLength);
  return new rr(e).set(new rr(t)), e;
}
function ap(t, e) {
  var n = t.buffer;
  return new t.constructor(n, t.byteOffset, t.byteLength);
}
var sp = /\w*$/;
function cp(t) {
  var e = new t.constructor(t.source, sp.exec(t));
  return e.lastIndex = t.lastIndex, e;
}
var _a = We ? We.prototype : void 0, Pa = _a ? _a.valueOf : void 0;
function up(t) {
  return Pa ? Object(Pa.call(t)) : {};
}
function lp(t, e) {
  var n = t.buffer;
  return new t.constructor(n, t.byteOffset, t.length);
}
var fp = "[object Boolean]", hp = "[object Date]", dp = "[object Map]", pp = "[object Number]", gp = "[object RegExp]", yp = "[object Set]", mp = "[object String]", Ep = "[object Symbol]", Tp = "[object ArrayBuffer]", Ap = "[object DataView]", vp = "[object Float32Array]", Sp = "[object Float64Array]", Op = "[object Int8Array]", Ip = "[object Int16Array]", bp = "[object Int32Array]", Rp = "[object Uint8Array]", Np = "[object Uint8ClampedArray]", _p = "[object Uint16Array]", Pp = "[object Uint32Array]";
function wp(t, e, n) {
  var r = t.constructor;
  switch (e) {
    case Tp:
      return op(t);
    case fp:
    case hp:
      return new r(+t);
    case Ap:
      return ap(t);
    case vp:
    case Sp:
    case Op:
    case Ip:
    case bp:
    case Rp:
    case Np:
    case _p:
    case Pp:
      return lp(t);
    case dp:
      return new r();
    case pp:
    case mp:
      return new r(t);
    case gp:
      return cp(t);
    case yp:
      return new r();
    case Ep:
      return up(t);
  }
}
function Cp(t) {
  return typeof t.constructor == "function" && !Rn(t) ? qf(Qs(t)) : {};
}
var Lp = "[object Map]";
function xp(t) {
  return Xe(t) && qe(t) == Lp;
}
var wa = Rt && Rt.isMap, kp = wa ? Nr(wa) : xp, Mp = "[object Set]";
function Fp(t) {
  return Xe(t) && qe(t) == Mp;
}
var Ca = Rt && Rt.isSet, $p = Ca ? Nr(Ca) : Fp, ic = "[object Arguments]", Up = "[object Array]", jp = "[object Boolean]", Dp = "[object Date]", Bp = "[object Error]", oc = "[object Function]", qp = "[object GeneratorFunction]", Gp = "[object Map]", Wp = "[object Number]", ac = "[object Object]", Vp = "[object RegExp]", Kp = "[object Set]", zp = "[object String]", Hp = "[object Symbol]", Yp = "[object WeakMap]", Xp = "[object ArrayBuffer]", Jp = "[object DataView]", Zp = "[object Float32Array]", Qp = "[object Float64Array]", eg = "[object Int8Array]", tg = "[object Int16Array]", ng = "[object Int32Array]", rg = "[object Uint8Array]", ig = "[object Uint8ClampedArray]", og = "[object Uint16Array]", ag = "[object Uint32Array]", se = {};
se[ic] = se[Up] = se[Xp] = se[Jp] = se[jp] = se[Dp] = se[Zp] = se[Qp] = se[eg] = se[tg] = se[ng] = se[Gp] = se[Wp] = se[ac] = se[Vp] = se[Kp] = se[zp] = se[Hp] = se[rg] = se[ig] = se[og] = se[ag] = !0;
se[Bp] = se[oc] = se[Yp] = !1;
function Kn(t, e, n, r, i, o) {
  var a;
  if (a !== void 0)
    return a;
  if (!Ve(t))
    return t;
  var s = te(t);
  if (s)
    return a = ip(t), Wf(t, a);
  var c = qe(t), u = c == oc || c == qp;
  if (Tn(t))
    return Gd(t);
  if (c == ac || c == ic || u && !i)
    return a = u ? {} : Cp(t), Kd(t, Bd(a, t));
  if (!se[c])
    return i ? t : {};
  a = wp(t, c), o || (o = new ot());
  var p = o.get(t);
  if (p)
    return p;
  o.set(t, a), $p(t) ? t.forEach(function(S) {
    a.add(Kn(S, e, n, S, t, o));
  }) : kp(t) && t.forEach(function(S, C) {
    a.set(C, Kn(S, e, n, C, t, o));
  });
  var T = Pi, A = s ? void 0 : T(t);
  return qs(A || t, function(S, C) {
    A && (C = S, S = t[C]), br(a, C, Kn(S, e, n, C, t, o));
  }), a;
}
var sg = 4;
function Re(t) {
  return Kn(t, sg);
}
function _n(t) {
  for (var e = -1, n = t == null ? 0 : t.length, r = 0, i = []; ++e < n; ) {
    var o = t[e];
    o && (i[r++] = o);
  }
  return i;
}
var cg = "__lodash_hash_undefined__";
function ug(t) {
  return this.__data__.set(t, cg), this;
}
function lg(t) {
  return this.__data__.has(t);
}
function nn(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.__data__ = new It(); ++e < n; )
    this.add(t[e]);
}
nn.prototype.add = nn.prototype.push = ug;
nn.prototype.has = lg;
function sc(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r; )
    if (e(t[n], n, t))
      return !0;
  return !1;
}
function ho(t, e) {
  return t.has(e);
}
var fg = 1, hg = 2;
function cc(t, e, n, r, i, o) {
  var a = n & fg, s = t.length, c = e.length;
  if (s != c && !(a && c > s))
    return !1;
  var u = o.get(t), p = o.get(e);
  if (u && p)
    return u == e && p == t;
  var T = -1, A = !0, S = n & hg ? new nn() : void 0;
  for (o.set(t, e), o.set(e, t); ++T < s; ) {
    var C = t[T], k = e[T];
    if (r)
      var U = a ? r(k, C, T, e, t, o) : r(C, k, T, t, e, o);
    if (U !== void 0) {
      if (U)
        continue;
      A = !1;
      break;
    }
    if (S) {
      if (!sc(e, function(P, m) {
        if (!ho(S, m) && (C === P || i(C, P, n, r, o)))
          return S.push(m);
      })) {
        A = !1;
        break;
      }
    } else if (!(C === k || i(C, k, n, r, o))) {
      A = !1;
      break;
    }
  }
  return o.delete(t), o.delete(e), A;
}
function dg(t) {
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
var pg = 1, gg = 2, yg = "[object Boolean]", mg = "[object Date]", Eg = "[object Error]", Tg = "[object Map]", Ag = "[object Number]", vg = "[object RegExp]", Sg = "[object Set]", Og = "[object String]", Ig = "[object Symbol]", bg = "[object ArrayBuffer]", Rg = "[object DataView]", La = We ? We.prototype : void 0, ui = La ? La.valueOf : void 0;
function Ng(t, e, n, r, i, o, a) {
  switch (n) {
    case Rg:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      t = t.buffer, e = e.buffer;
    case bg:
      return !(t.byteLength != e.byteLength || !o(new rr(t), new rr(e)));
    case yg:
    case mg:
    case Ag:
      return bn(+t, +e);
    case Eg:
      return t.name == e.name && t.message == e.message;
    case vg:
    case Og:
      return t == e + "";
    case Tg:
      var s = dg;
    case Sg:
      var c = r & pg;
      if (s || (s = po), t.size != e.size && !c)
        return !1;
      var u = a.get(t);
      if (u)
        return u == e;
      r |= gg, a.set(t, e);
      var p = cc(s(t), s(e), r, i, o, a);
      return a.delete(t), p;
    case Ig:
      if (ui)
        return ui.call(t) == ui.call(e);
  }
  return !1;
}
var _g = 1, Pg = Object.prototype, wg = Pg.hasOwnProperty;
function Cg(t, e, n, r, i, o) {
  var a = n & _g, s = Pi(t), c = s.length, u = Pi(e), p = u.length;
  if (c != p && !a)
    return !1;
  for (var T = c; T--; ) {
    var A = s[T];
    if (!(a ? A in e : wg.call(e, A)))
      return !1;
  }
  var S = o.get(t), C = o.get(e);
  if (S && C)
    return S == e && C == t;
  var k = !0;
  o.set(t, e), o.set(e, t);
  for (var U = a; ++T < c; ) {
    A = s[T];
    var P = t[A], m = e[A];
    if (r)
      var y = a ? r(m, P, A, e, t, o) : r(P, m, A, t, e, o);
    if (!(y === void 0 ? P === m || i(P, m, n, r, o) : y)) {
      k = !1;
      break;
    }
    U || (U = A == "constructor");
  }
  if (k && !U) {
    var I = t.constructor, x = e.constructor;
    I != x && "constructor" in t && "constructor" in e && !(typeof I == "function" && I instanceof I && typeof x == "function" && x instanceof x) && (k = !1);
  }
  return o.delete(t), o.delete(e), k;
}
var Lg = 1, xa = "[object Arguments]", ka = "[object Array]", kn = "[object Object]", xg = Object.prototype, Ma = xg.hasOwnProperty;
function kg(t, e, n, r, i, o) {
  var a = te(t), s = te(e), c = a ? ka : qe(t), u = s ? ka : qe(e);
  c = c == xa ? kn : c, u = u == xa ? kn : u;
  var p = c == kn, T = u == kn, A = c == u;
  if (A && Tn(t)) {
    if (!Tn(e))
      return !1;
    a = !0, p = !1;
  }
  if (A && !p)
    return o || (o = new ot()), a || io(t) ? cc(t, e, n, r, i, o) : Ng(t, e, c, n, r, i, o);
  if (!(n & Lg)) {
    var S = p && Ma.call(t, "__wrapped__"), C = T && Ma.call(e, "__wrapped__");
    if (S || C) {
      var k = S ? t.value() : t, U = C ? e.value() : e;
      return o || (o = new ot()), i(k, U, n, r, o);
    }
  }
  return A ? (o || (o = new ot()), Cg(t, e, n, r, i, o)) : !1;
}
function go(t, e, n, r, i) {
  return t === e ? !0 : t == null || e == null || !Xe(t) && !Xe(e) ? t !== t && e !== e : kg(t, e, n, r, go, i);
}
var Mg = 1, Fg = 2;
function $g(t, e, n, r) {
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
      var p = new ot(), T;
      if (!(T === void 0 ? go(u, c, Mg | Fg, r, p) : T))
        return !1;
    }
  }
  return !0;
}
function uc(t) {
  return t === t && !Ve(t);
}
function Ug(t) {
  for (var e = Ke(t), n = e.length; n--; ) {
    var r = e[n], i = t[r];
    e[n] = [r, i, uc(i)];
  }
  return e;
}
function lc(t, e) {
  return function(n) {
    return n == null ? !1 : n[t] === e && (e !== void 0 || t in Object(n));
  };
}
function jg(t) {
  var e = Ug(t);
  return e.length == 1 && e[0][2] ? lc(e[0][0], e[0][1]) : function(n) {
    return n === t || $g(n, t, e);
  };
}
function Dg(t, e) {
  return t != null && e in Object(t);
}
function fc(t, e, n) {
  e = wr(e, t);
  for (var r = -1, i = e.length, o = !1; ++r < i; ) {
    var a = Nn(e[r]);
    if (!(o = t != null && n(t, a)))
      break;
    t = t[a];
  }
  return o || ++r != i ? o : (i = t == null ? 0 : t.length, !!i && ro(i) && Ir(a, i) && (te(t) || Rr(t)));
}
function Bg(t, e) {
  return t != null && fc(t, e, Dg);
}
var qg = 1, Gg = 2;
function Wg(t, e) {
  return oo(t) && uc(e) ? lc(Nn(t), e) : function(n) {
    var r = Ld(n, t);
    return r === void 0 && r === e ? Bg(n, t) : go(e, r, qg | Gg);
  };
}
function Vg(t) {
  return function(e) {
    return e?.[t];
  };
}
function Kg(t) {
  return function(e) {
    return so(e, t);
  };
}
function zg(t) {
  return oo(t) ? Vg(Nn(t)) : Kg(t);
}
function ct(t) {
  return typeof t == "function" ? t : t == null ? tn : typeof t == "object" ? te(t) ? Wg(t[0], t[1]) : jg(t) : zg(t);
}
function Hg(t, e, n, r) {
  for (var i = -1, o = t == null ? 0 : t.length; ++i < o; ) {
    var a = t[i];
    e(r, a, n(a), t);
  }
  return r;
}
function Yg(t) {
  return function(e, n, r) {
    for (var i = -1, o = Object(e), a = r(e), s = a.length; s--; ) {
      var c = a[++i];
      if (n(o[c], c, o) === !1)
        break;
    }
    return e;
  };
}
var Xg = Yg();
function Jg(t, e) {
  return t && Xg(t, e, Ke);
}
function Zg(t, e) {
  return function(n, r) {
    if (n == null)
      return n;
    if (!st(n))
      return t(n, r);
    for (var i = n.length, o = -1, a = Object(n); ++o < i && r(a[o], o, a) !== !1; )
      ;
    return n;
  };
}
var qt = Zg(Jg);
function Qg(t, e, n, r) {
  return qt(t, function(i, o, a) {
    e(r, i, n(i), a);
  }), r;
}
function ey(t, e) {
  return function(n, r) {
    var i = te(n) ? Hg : Qg, o = e ? e() : {};
    return i(n, t, ct(r), o);
  };
}
var hc = Object.prototype, ty = hc.hasOwnProperty, yo = no(function(t, e) {
  t = Object(t);
  var n = -1, r = e.length, i = r > 2 ? e[2] : void 0;
  for (i && Vs(e[0], e[1], i) && (r = 1); ++n < r; )
    for (var o = e[n], a = Zs(o), s = -1, c = a.length; ++s < c; ) {
      var u = a[s], p = t[u];
      (p === void 0 || bn(p, hc[u]) && !ty.call(t, u)) && (t[u] = o[u]);
    }
  return t;
});
function Fa(t) {
  return Xe(t) && st(t);
}
var ny = 200;
function ry(t, e, n, r) {
  var i = -1, o = Ws, a = !0, s = t.length, c = [], u = e.length;
  if (!s)
    return c;
  e.length >= ny && (o = ho, a = !1, e = new nn(e));
  e:
    for (; ++i < s; ) {
      var p = t[i], T = p;
      if (p = p !== 0 ? p : 0, a && T === T) {
        for (var A = u; A--; )
          if (e[A] === T)
            continue e;
        c.push(p);
      } else o(e, T, r) || c.push(p);
    }
  return c;
}
var Cr = no(function(t, e) {
  return Fa(t) ? ry(t, uo(e, 1, Fa, !0)) : [];
});
function rn(t) {
  var e = t == null ? 0 : t.length;
  return e ? t[e - 1] : void 0;
}
function be(t, e, n) {
  var r = t == null ? 0 : t.length;
  return r ? (e = e === void 0 ? 1 : Or(e), ec(t, e < 0 ? 0 : e, r)) : [];
}
function Sn(t, e, n) {
  var r = t == null ? 0 : t.length;
  return r ? (e = e === void 0 ? 1 : Or(e), e = r - e, ec(t, 0, e < 0 ? 0 : e)) : [];
}
function iy(t) {
  return typeof t == "function" ? t : tn;
}
function W(t, e) {
  var n = te(t) ? qs : qt;
  return n(t, iy(e));
}
function oy(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r; )
    if (!e(t[n], n, t))
      return !1;
  return !0;
}
function ay(t, e) {
  var n = !0;
  return qt(t, function(r, i, o) {
    return n = !!e(r, i, o), n;
  }), n;
}
function Ye(t, e, n) {
  var r = te(t) ? oy : ay;
  return r(t, ct(e));
}
function dc(t, e) {
  var n = [];
  return qt(t, function(r, i, o) {
    e(r, i, o) && n.push(r);
  }), n;
}
function ze(t, e) {
  var n = te(t) ? lo : dc;
  return n(t, ct(e));
}
function sy(t) {
  return function(e, n, r) {
    var i = Object(e);
    if (!st(e)) {
      var o = ct(n);
      e = Ke(e), n = function(s) {
        return o(i[s], s, i);
      };
    }
    var a = t(e, n, r);
    return a > -1 ? i[o ? e[a] : a] : void 0;
  };
}
var cy = Math.max;
function uy(t, e, n) {
  var r = t == null ? 0 : t.length;
  if (!r)
    return -1;
  var i = n == null ? 0 : Or(n);
  return i < 0 && (i = cy(r + i, 0)), Gs(t, ct(e), i);
}
var on = sy(uy);
function Je(t) {
  return t && t.length ? t[0] : void 0;
}
function ly(t, e) {
  var n = -1, r = st(t) ? Array(t.length) : [];
  return qt(t, function(i, o, a) {
    r[++n] = e(i, o, a);
  }), r;
}
function D(t, e) {
  var n = te(t) ? Sr : ly;
  return n(t, ct(e));
}
function Ge(t, e) {
  return uo(D(t, e));
}
var fy = Object.prototype, hy = fy.hasOwnProperty, dy = ey(function(t, e, n) {
  hy.call(t, n) ? t[n].push(e) : eo(t, n, [e]);
}), py = Object.prototype, gy = py.hasOwnProperty;
function yy(t, e) {
  return t != null && gy.call(t, e);
}
function G(t, e) {
  return t != null && fc(t, e, yy);
}
var my = "[object String]";
function ke(t) {
  return typeof t == "string" || !te(t) && Xe(t) && _t(t) == my;
}
function Ey(t, e) {
  return Sr(e, function(n) {
    return t[n];
  });
}
function ve(t) {
  return t == null ? [] : Ey(t, Ke(t));
}
var Ty = Math.max;
function Le(t, e, n, r) {
  t = st(t) ? t : ve(t), n = n && !r ? Or(n) : 0;
  var i = t.length;
  return n < 0 && (n = Ty(i + n, 0)), ke(t) ? n <= i && t.indexOf(e, n) > -1 : !!i && Qi(t, e, n) > -1;
}
function $a(t, e, n) {
  var r = t == null ? 0 : t.length;
  if (!r)
    return -1;
  var i = 0;
  return Qi(t, e, i);
}
var Ay = "[object Map]", vy = "[object Set]", Sy = Object.prototype, Oy = Sy.hasOwnProperty;
function ce(t) {
  if (t == null)
    return !0;
  if (st(t) && (te(t) || typeof t == "string" || typeof t.splice == "function" || Tn(t) || io(t) || Rr(t)))
    return !t.length;
  var e = qe(t);
  if (e == Ay || e == vy)
    return !t.size;
  if (Rn(t))
    return !Js(t).length;
  for (var n in t)
    if (Oy.call(t, n))
      return !1;
  return !0;
}
var Iy = "[object RegExp]";
function by(t) {
  return Xe(t) && _t(t) == Iy;
}
var Ua = Rt && Rt.isRegExp, Et = Ua ? Nr(Ua) : by;
function Tt(t) {
  return t === void 0;
}
var Ry = "Expected a function";
function Ny(t) {
  if (typeof t != "function")
    throw new TypeError(Ry);
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
function _y(t, e, n, r) {
  if (!Ve(t))
    return t;
  e = wr(e, t);
  for (var i = -1, o = e.length, a = o - 1, s = t; s != null && ++i < o; ) {
    var c = Nn(e[i]), u = n;
    if (c === "__proto__" || c === "constructor" || c === "prototype")
      return t;
    if (i != a) {
      var p = s[c];
      u = void 0, u === void 0 && (u = Ve(p) ? p : Ir(e[i + 1]) ? [] : {});
    }
    br(s, c, u), s = s[c];
  }
  return t;
}
function Py(t, e, n) {
  for (var r = -1, i = e.length, o = {}; ++r < i; ) {
    var a = e[r], s = so(t, a);
    n(s, a) && _y(o, wr(a, t), s);
  }
  return o;
}
function Ze(t, e) {
  if (t == null)
    return {};
  var n = Sr(Yd(t), function(r) {
    return [r];
  });
  return e = ct(e), Py(t, n, function(r, i) {
    return e(r, i[0]);
  });
}
function wy(t, e, n, r, i) {
  return i(t, function(o, a, s) {
    n = r ? (r = !1, o) : e(n, o, a, s);
  }), n;
}
function je(t, e, n) {
  var r = te(t) ? kd : wy, i = arguments.length < 3;
  return r(t, ct(e), n, i, qt);
}
function Lr(t, e) {
  var n = te(t) ? lo : dc;
  return n(t, Ny(ct(e)));
}
function Cy(t, e) {
  var n;
  return qt(t, function(r, i, o) {
    return n = e(r, i, o), !n;
  }), !!n;
}
function pc(t, e, n) {
  var r = te(t) ? sc : Cy;
  return r(t, ct(e));
}
var Ly = 1 / 0, xy = Zt && 1 / po(new Zt([, -0]))[1] == Ly ? function(t) {
  return new Zt(t);
} : Ae, ky = 200;
function My(t, e, n) {
  var r = -1, i = Ws, o = t.length, a = !0, s = [], c = s;
  if (o >= ky) {
    var u = xy(t);
    if (u)
      return po(u);
    a = !1, i = ho, c = new nn();
  } else
    c = s;
  e:
    for (; ++r < o; ) {
      var p = t[r], T = p;
      if (p = p !== 0 ? p : 0, a && T === T) {
        for (var A = c.length; A--; )
          if (c[A] === T)
            continue e;
        s.push(p);
      } else i(c, T, n) || (c !== s && c.push(T), s.push(p));
    }
  return s;
}
function mo(t) {
  return t && t.length ? My(t) : [];
}
function Li(t) {
  console && console.error && console.error(`Error: ${t}`);
}
function gc(t) {
  console && console.warn && console.warn(`Warning: ${t}`);
}
function yc(t) {
  const e = (/* @__PURE__ */ new Date()).getTime(), n = t();
  return { time: (/* @__PURE__ */ new Date()).getTime() - e, value: n };
}
function mc(t) {
  function e() {
  }
  e.prototype = t;
  const n = new e();
  function r() {
    return typeof n.bar;
  }
  return r(), r(), t;
}
function Fy(t) {
  return $y(t) ? t.LABEL : t.name;
}
function $y(t) {
  return ke(t.LABEL) && t.LABEL !== "";
}
class ut {
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
class De extends ut {
  constructor(e) {
    super([]), this.idx = 1, Ue(this, Ze(e, (n) => n !== void 0));
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
class an extends ut {
  constructor(e) {
    super(e.definition), this.orgText = "", Ue(this, Ze(e, (n) => n !== void 0));
  }
}
class Me extends ut {
  constructor(e) {
    super(e.definition), this.ignoreAmbiguities = !1, Ue(this, Ze(e, (n) => n !== void 0));
  }
}
class xe extends ut {
  constructor(e) {
    super(e.definition), this.idx = 1, Ue(this, Ze(e, (n) => n !== void 0));
  }
}
class lt extends ut {
  constructor(e) {
    super(e.definition), this.idx = 1, Ue(this, Ze(e, (n) => n !== void 0));
  }
}
class ft extends ut {
  constructor(e) {
    super(e.definition), this.idx = 1, Ue(this, Ze(e, (n) => n !== void 0));
  }
}
class Se extends ut {
  constructor(e) {
    super(e.definition), this.idx = 1, Ue(this, Ze(e, (n) => n !== void 0));
  }
}
class Qe extends ut {
  constructor(e) {
    super(e.definition), this.idx = 1, Ue(this, Ze(e, (n) => n !== void 0));
  }
}
class et extends ut {
  get definition() {
    return this._definition;
  }
  set definition(e) {
    this._definition = e;
  }
  constructor(e) {
    super(e.definition), this.idx = 1, this.ignoreAmbiguities = !1, this.hasPredicates = !1, Ue(this, Ze(e, (n) => n !== void 0));
  }
}
class he {
  constructor(e) {
    this.idx = 1, Ue(this, Ze(e, (n) => n !== void 0));
  }
  accept(e) {
    e.visit(this);
  }
}
function Uy(t) {
  return D(t, zn);
}
function zn(t) {
  function e(n) {
    return D(n, zn);
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
    if (t instanceof lt)
      return {
        type: "RepetitionMandatory",
        idx: t.idx,
        definition: e(t.definition)
      };
    if (t instanceof ft)
      return {
        type: "RepetitionMandatoryWithSeparator",
        idx: t.idx,
        separator: zn(new he({ terminalType: t.separator })),
        definition: e(t.definition)
      };
    if (t instanceof Qe)
      return {
        type: "RepetitionWithSeparator",
        idx: t.idx,
        separator: zn(new he({ terminalType: t.separator })),
        definition: e(t.definition)
      };
    if (t instanceof Se)
      return {
        type: "Repetition",
        idx: t.idx,
        definition: e(t.definition)
      };
    if (t instanceof et)
      return {
        type: "Alternation",
        idx: t.idx,
        definition: e(t.definition)
      };
    if (t instanceof he) {
      const n = {
        type: "Terminal",
        name: t.terminalType.name,
        label: Fy(t.terminalType),
        idx: t.idx
      };
      ke(t.label) && (n.terminalLabel = t.label);
      const r = t.terminalType.PATTERN;
      return t.terminalType.PATTERN && (n.pattern = Et(r) ? r.source : r), n;
    } else {
      if (t instanceof an)
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
class sn {
  visit(e) {
    const n = e;
    switch (n.constructor) {
      case De:
        return this.visitNonTerminal(n);
      case Me:
        return this.visitAlternative(n);
      case xe:
        return this.visitOption(n);
      case lt:
        return this.visitRepetitionMandatory(n);
      case ft:
        return this.visitRepetitionMandatoryWithSeparator(n);
      case Qe:
        return this.visitRepetitionWithSeparator(n);
      case Se:
        return this.visitRepetition(n);
      case et:
        return this.visitAlternation(n);
      case he:
        return this.visitTerminal(n);
      case an:
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
function jy(t) {
  return t instanceof Me || t instanceof xe || t instanceof Se || t instanceof lt || t instanceof ft || t instanceof Qe || t instanceof he || t instanceof an;
}
function ir(t, e = []) {
  return t instanceof xe || t instanceof Se || t instanceof Qe ? !0 : t instanceof et ? pc(t.definition, (r) => ir(r, e)) : t instanceof De && Le(e, t) ? !1 : t instanceof ut ? (t instanceof De && e.push(t), Ye(t.definition, (r) => ir(r, e))) : !1;
}
function Dy(t) {
  return t instanceof et;
}
function rt(t) {
  if (t instanceof De)
    return "SUBRULE";
  if (t instanceof xe)
    return "OPTION";
  if (t instanceof et)
    return "OR";
  if (t instanceof lt)
    return "AT_LEAST_ONE";
  if (t instanceof ft)
    return "AT_LEAST_ONE_SEP";
  if (t instanceof Qe)
    return "MANY_SEP";
  if (t instanceof Se)
    return "MANY";
  if (t instanceof he)
    return "CONSUME";
  throw Error("non exhaustive match");
}
class xr {
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
      else if (r instanceof lt)
        this.walkAtLeastOne(r, o, n);
      else if (r instanceof ft)
        this.walkAtLeastOneSep(r, o, n);
      else if (r instanceof Qe)
        this.walkManySep(r, o, n);
      else if (r instanceof Se)
        this.walkMany(r, o, n);
      else if (r instanceof et)
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
    return Gy(t);
  if (jy(t))
    return By(t);
  if (Dy(t))
    return qy(t);
  throw Error("non exhaustive match");
}
function By(t) {
  let e = [];
  const n = t.definition;
  let r = 0, i = n.length > r, o, a = !0;
  for (; i && a; )
    o = n[r], a = ir(o), e = e.concat(Pn(o)), r = r + 1, i = n.length > r;
  return mo(e);
}
function qy(t) {
  const e = D(t.definition, (n) => Pn(n));
  return mo(He(e));
}
function Gy(t) {
  return [t.terminalType];
}
const Ec = "_~IN~_";
class Wy extends xr {
  constructor(e) {
    super(), this.topProd = e, this.follows = {};
  }
  startWalking() {
    return this.walk(this.topProd), this.follows;
  }
  walkTerminal(e, n, r) {
  }
  walkProdRef(e, n, r) {
    const i = Ky(e.referencedRule, e.idx) + this.topProd.name, o = n.concat(r), a = new Me({ definition: o }), s = Pn(a);
    this.follows[i] = s;
  }
}
function Vy(t) {
  const e = {};
  return W(t, (n) => {
    const r = new Wy(n).startWalking();
    Ue(e, r);
  }), e;
}
function Ky(t, e) {
  return t.name + e + Ec;
}
function V(t) {
  return t.charCodeAt(0);
}
function li(t, e) {
  Array.isArray(t) ? t.forEach(function(n) {
    e.push(n);
  }) : e.push(t);
}
function hn(t, e) {
  if (t[e] === !0)
    throw "duplicate flag " + e;
  t[e], t[e] = !0;
}
function zt(t) {
  if (t === void 0)
    throw Error("Internal Error - Should never get here!");
  return !0;
}
function zy() {
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
], Hy = /[0-9a-fA-F]/, Mn = /[0-9]/, Yy = /[1-9]/;
class Xy {
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
          hn(r, "global");
          break;
        case "i":
          hn(r, "ignoreCase");
          break;
        case "m":
          hn(r, "multiLine");
          break;
        case "u":
          hn(r, "unicode");
          break;
        case "y":
          hn(r, "sticky");
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
        zt(n);
        const r = this.disjunction();
        return this.consumeChar(")"), {
          type: n,
          value: r,
          loc: this.loc(e)
        };
    }
    return zy();
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
        zt(n);
        break;
    }
    if (!(e === !0 && n === void 0) && zt(n))
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
    if (e === void 0 && this.isPatternCharacter() && (e = this.patternCharacter()), zt(e))
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
    if (zt(e))
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
    if (zt(e))
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
          li(r.value, e), e.push(V("-")), li(i.value, e);
      } else
        li(r.value, e);
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
    if (Yy.test(e) === !1)
      throw Error("Expecting a positive integer");
    for (; Mn.test(this.peekChar(0)); )
      e += this.popChar();
    return parseInt(e, 10);
  }
  integerIncludingZero() {
    let e = this.popChar();
    if (Mn.test(e) === !1)
      throw Error("Expecting an integer");
    for (; Mn.test(this.peekChar(0)); )
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
    return Mn.test(this.peekChar(0));
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
      if (Hy.test(o) === !1)
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
let Hn = {};
const Jy = new Xy();
function kr(t) {
  const e = t.toString();
  if (Hn.hasOwnProperty(e))
    return Hn[e];
  {
    const n = Jy.pattern(e);
    return Hn[e] = n, n;
  }
}
function Zy() {
  Hn = {};
}
const Tc = "Complement Sets are not supported for first char optimization", sr = `Unable to use "first char" lexer optimizations:
`;
function Qy(t, e = !1) {
  try {
    const n = kr(t);
    return xi(n.value, {}, n.flags.ignoreCase);
  } catch (n) {
    if (n.message === Tc)
      e && gc(`${sr}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
    else {
      let r = "";
      e && (r = `
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`), Li(`${sr}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + r);
    }
  }
  return [];
}
function xi(t, e, n) {
  switch (t.type) {
    case "Disjunction":
      for (let i = 0; i < t.value.length; i++)
        xi(t.value[i], e, n);
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
            Fn(a.value, e, n);
            break;
          case "Set":
            if (a.complement === !0)
              throw Error(Tc);
            W(a.value, (c) => {
              if (typeof c == "number")
                Fn(c, e, n);
              else {
                const u = c;
                if (n === !0)
                  for (let p = u.from; p <= u.to; p++)
                    Fn(p, e, n);
                else {
                  for (let p = u.from; p <= u.to && p < gn; p++)
                    Fn(p, e, n);
                  if (u.to >= gn) {
                    const p = u.from >= gn ? u.from : gn, T = u.to, A = Nt(p), S = Nt(T);
                    for (let C = A; C <= S; C++)
                      e[C] = C;
                  }
                }
              }
            });
            break;
          case "Group":
            xi(a.value, e, n);
            break;
          default:
            throw Error("Non Exhaustive Match");
        }
        const s = a.quantifier !== void 0 && a.quantifier.atLeast === 0;
        if (
          // A group may be optional due to empty contents /(?:)/
          // or if everything inside it is optional /((a)?)/
          a.type === "Group" && ki(a) === !1 || // If this term is not a group it may only be optional if it has an optional quantifier
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
function Fn(t, e, n) {
  const r = Nt(t);
  e[r] = r, n === !0 && em(t, e);
}
function em(t, e) {
  const n = String.fromCharCode(t), r = n.toUpperCase();
  if (r !== n) {
    const i = Nt(r.charCodeAt(0));
    e[i] = i;
  } else {
    const i = n.toLowerCase();
    if (i !== n) {
      const o = Nt(i.charCodeAt(0));
      e[o] = o;
    }
  }
}
function qa(t, e) {
  return on(t.value, (n) => {
    if (typeof n == "number")
      return Le(e, n);
    {
      const r = n;
      return on(e, (i) => r.from <= i && i <= r.to) !== void 0;
    }
  });
}
function ki(t) {
  const e = t.quantifier;
  return e && e.atLeast === 0 ? !0 : t.value ? te(t.value) ? Ye(t.value, ki) : ki(t.value) : !1;
}
class tm extends Eo {
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
function To(t, e) {
  if (e instanceof RegExp) {
    const n = kr(e), r = new tm(t);
    return r.visit(n), r.found;
  } else
    return on(e, (n) => Le(t, n.charCodeAt(0))) !== void 0;
}
const Ut = "PATTERN", pn = "defaultMode", $n = "modes";
let Ac = typeof new RegExp("(?:)").sticky == "boolean";
function nm(t, e) {
  e = yo(e, {
    useSticky: Ac,
    debug: !1,
    safeMode: !1,
    positionTracking: "full",
    lineTerminatorCharacters: ["\r", `
`],
    tracer: (m, y) => y()
  });
  const n = e.tracer;
  n("initCharCodeToOptimizedIndexMap", () => {
    bm();
  });
  let r;
  n("Reject Lexer.NA", () => {
    r = Lr(t, (m) => m[Ut] === $e.NA);
  });
  let i = !1, o;
  n("Transform Patterns", () => {
    i = !1, o = D(r, (m) => {
      const y = m[Ut];
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
    a = D(r, (m) => m.tokenTypeIdx), s = D(r, (m) => {
      const y = m.GROUP;
      if (y !== $e.SKIPPED) {
        if (ke(y))
          return y;
        if (Tt(y))
          return !1;
        throw Error("non exhaustive match");
      }
    }), c = D(r, (m) => {
      const y = m.LONGER_ALT;
      if (y)
        return te(y) ? D(y, (x) => $a(r, x)) : [$a(r, y)];
    }), u = D(r, (m) => m.PUSH_MODE), p = D(r, (m) => G(m, "POP_MODE"));
  });
  let T;
  n("Line Terminator Handling", () => {
    const m = Oc(e.lineTerminatorCharacters);
    T = D(r, (y) => !1), e.positionTracking !== "onlyOffset" && (T = D(r, (y) => G(y, "LINE_BREAKS") ? !!y.LINE_BREAKS : Sc(y, m) === !1 && To(m, y.PATTERN)));
  });
  let A, S, C, k;
  n("Misc Mapping #2", () => {
    A = D(r, vc), S = D(o, Sm), C = je(r, (m, y) => {
      const I = y.GROUP;
      return ke(I) && I !== $e.SKIPPED && (m[I] = []), m;
    }, {}), k = D(o, (m, y) => ({
      pattern: o[y],
      longerAlt: c[y],
      canLineTerminator: T[y],
      isCustom: A[y],
      short: S[y],
      group: s[y],
      push: u[y],
      pop: p[y],
      tokenTypeIdx: a[y],
      tokenType: r[y]
    }));
  });
  let U = !0, P = [];
  return e.safeMode || n("First Char Optimization", () => {
    P = je(r, (m, y, I) => {
      if (typeof y.PATTERN == "string") {
        const x = y.PATTERN.charCodeAt(0), z = Nt(x);
        fi(m, z, k[I]);
      } else if (te(y.START_CHARS_HINT)) {
        let x;
        W(y.START_CHARS_HINT, (z) => {
          const F = typeof z == "string" ? z.charCodeAt(0) : z, ee = Nt(F);
          x !== ee && (x = ee, fi(m, ee, k[I]));
        });
      } else if (Et(y.PATTERN))
        if (y.PATTERN.unicode)
          U = !1, e.ensureOptimizations && Li(`${sr}	Unable to analyze < ${y.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
        else {
          const x = Qy(y.PATTERN, e.ensureOptimizations);
          ce(x) && (U = !1), W(x, (z) => {
            fi(m, z, k[I]);
          });
        }
      else
        e.ensureOptimizations && Li(`${sr}	TokenType: <${y.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`), U = !1;
      return m;
    }, []);
  }), {
    emptyGroups: C,
    patternIdxToConfig: k,
    charCodeToPatternIdxToConfig: P,
    hasCustom: i,
    canBeOptimized: U
  };
}
function rm(t, e) {
  let n = [];
  const r = om(t);
  n = n.concat(r.errors);
  const i = am(r.valid), o = i.valid;
  return n = n.concat(i.errors), n = n.concat(im(o)), n = n.concat(pm(o)), n = n.concat(gm(o, e)), n = n.concat(ym(o)), n;
}
function im(t) {
  let e = [];
  const n = ze(t, (r) => Et(r[Ut]));
  return e = e.concat(cm(n)), e = e.concat(fm(n)), e = e.concat(hm(n)), e = e.concat(dm(n)), e = e.concat(um(n)), e;
}
function om(t) {
  const e = ze(t, (i) => !G(i, Ut)), n = D(e, (i) => ({
    message: "Token Type: ->" + i.name + "<- missing static 'PATTERN' property",
    type: pe.MISSING_PATTERN,
    tokenTypes: [i]
  })), r = Cr(t, e);
  return { errors: n, valid: r };
}
function am(t) {
  const e = ze(t, (i) => {
    const o = i[Ut];
    return !Et(o) && !St(o) && !G(o, "exec") && !ke(o);
  }), n = D(e, (i) => ({
    message: "Token Type: ->" + i.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
    type: pe.INVALID_PATTERN,
    tokenTypes: [i]
  })), r = Cr(t, e);
  return { errors: n, valid: r };
}
const sm = /[^\\][$]/;
function cm(t) {
  class e extends Eo {
    constructor() {
      super(...arguments), this.found = !1;
    }
    visitEndAnchor(o) {
      this.found = !0;
    }
  }
  const n = ze(t, (i) => {
    const o = i.PATTERN;
    try {
      const a = kr(o), s = new e();
      return s.visit(a), s.found;
    } catch {
      return sm.test(o.source);
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
function um(t) {
  const e = ze(t, (r) => r.PATTERN.test(""));
  return D(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'PATTERN' must not match an empty string",
    type: pe.EMPTY_MATCH_PATTERN,
    tokenTypes: [r]
  }));
}
const lm = /[^\\[][\^]|^\^/;
function fm(t) {
  class e extends Eo {
    constructor() {
      super(...arguments), this.found = !1;
    }
    visitStartAnchor(o) {
      this.found = !0;
    }
  }
  const n = ze(t, (i) => {
    const o = i.PATTERN;
    try {
      const a = kr(o), s = new e();
      return s.visit(a), s.found;
    } catch {
      return lm.test(o.source);
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
function hm(t) {
  const e = ze(t, (r) => {
    const i = r[Ut];
    return i instanceof RegExp && (i.multiline || i.global);
  });
  return D(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
    type: pe.UNSUPPORTED_FLAGS_FOUND,
    tokenTypes: [r]
  }));
}
function dm(t) {
  const e = [];
  let n = D(t, (o) => je(t, (a, s) => (o.PATTERN.source === s.PATTERN.source && !Le(e, s) && s.PATTERN !== $e.NA && (e.push(s), a.push(s)), a), []));
  n = _n(n);
  const r = ze(n, (o) => o.length > 1);
  return D(r, (o) => {
    const a = D(o, (c) => c.name);
    return {
      message: `The same RegExp pattern ->${Je(o).PATTERN}<-has been used in all of the following Token Types: ${a.join(", ")} <-`,
      type: pe.DUPLICATE_PATTERNS_FOUND,
      tokenTypes: o
    };
  });
}
function pm(t) {
  const e = ze(t, (r) => {
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
function gm(t, e) {
  const n = ze(t, (i) => i.PUSH_MODE !== void 0 && !Le(e, i.PUSH_MODE));
  return D(n, (i) => ({
    message: `Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,
    type: pe.PUSH_MODE_DOES_NOT_EXIST,
    tokenTypes: [i]
  }));
}
function ym(t) {
  const e = [], n = je(t, (r, i, o) => {
    const a = i.PATTERN;
    return a === $e.NA || (ke(a) ? r.push({ str: a, idx: o, tokenType: i }) : Et(a) && Em(a) && r.push({ str: a.source, idx: o, tokenType: i })), r;
  }, []);
  return W(t, (r, i) => {
    W(n, ({ str: o, idx: a, tokenType: s }) => {
      if (i < a && mm(o, r.PATTERN)) {
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
function mm(t, e) {
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
function Em(t) {
  return on([
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
function Tm(t, e, n) {
  const r = [];
  return G(t, pn) || r.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + pn + `> property in its definition
`,
    type: pe.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
  }), G(t, $n) || r.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + $n + `> property in its definition
`,
    type: pe.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
  }), G(t, $n) && G(t, pn) && !G(t.modes, t.defaultMode) && r.push({
    message: `A MultiMode Lexer cannot be initialized with a ${pn}: <${t.defaultMode}>which does not exist
`,
    type: pe.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
  }), G(t, $n) && W(t.modes, (i, o) => {
    W(i, (a, s) => {
      if (Tt(a))
        r.push({
          message: `A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${s}>
`,
          type: pe.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
        });
      else if (G(a, "LONGER_ALT")) {
        const c = te(a.LONGER_ALT) ? a.LONGER_ALT : [a.LONGER_ALT];
        W(c, (u) => {
          !Tt(u) && !Le(i, u) && r.push({
            message: `A MultiMode Lexer cannot be initialized with a longer_alt <${u.name}> on token <${a.name}> outside of mode <${o}>
`,
            type: pe.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE
          });
        });
      }
    });
  }), r;
}
function Am(t, e, n) {
  const r = [];
  let i = !1;
  const o = _n(He(ve(t.modes))), a = Lr(o, (c) => c[Ut] === $e.NA), s = Oc(n);
  return e && W(a, (c) => {
    const u = Sc(c, s);
    if (u !== !1) {
      const T = {
        message: Im(c, u),
        type: u.issue,
        tokenType: c
      };
      r.push(T);
    } else
      G(c, "LINE_BREAKS") ? c.LINE_BREAKS === !0 && (i = !0) : To(s, c.PATTERN) && (i = !0);
  }), e && !i && r.push({
    message: `Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,
    type: pe.NO_LINE_BREAKS_FLAGS
  }), r;
}
function vm(t) {
  const e = {}, n = Ke(t);
  return W(n, (r) => {
    const i = t[r];
    if (te(i))
      e[r] = [];
    else
      throw Error("non exhaustive match");
  }), e;
}
function vc(t) {
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
function Sm(t) {
  return ke(t) && t.length === 1 ? t.charCodeAt(0) : !1;
}
const Om = {
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
function Sc(t, e) {
  if (G(t, "LINE_BREAKS"))
    return !1;
  if (Et(t.PATTERN)) {
    try {
      To(e, t.PATTERN);
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
    if (vc(t))
      return { issue: pe.CUSTOM_LINE_BREAK };
    throw Error("non exhaustive match");
  }
}
function Im(t, e) {
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
function Oc(t) {
  return D(t, (n) => ke(n) ? n.charCodeAt(0) : n);
}
function fi(t, e, n) {
  t[e] === void 0 ? t[e] = [n] : t[e].push(n);
}
const gn = 256;
let Yn = [];
function Nt(t) {
  return t < gn ? t : Yn[t];
}
function bm() {
  if (ce(Yn)) {
    Yn = new Array(65536);
    for (let t = 0; t < 65536; t++)
      Yn[t] = t > 255 ? 255 + ~~(t / 255) : t;
  }
}
function wn(t, e) {
  const n = t.tokenTypeIdx;
  return n === e.tokenTypeIdx ? !0 : e.isParent === !0 && e.categoryMatchesMap[n] === !0;
}
function cr(t, e) {
  return t.tokenTypeIdx === e.tokenTypeIdx;
}
let Va = 1;
const Ic = {};
function Cn(t) {
  const e = Rm(t);
  Nm(e), Pm(e), _m(e), W(e, (n) => {
    n.isParent = n.categoryMatches.length > 0;
  });
}
function Rm(t) {
  let e = Re(t), n = t, r = !0;
  for (; r; ) {
    n = _n(He(D(n, (o) => o.CATEGORIES)));
    const i = Cr(n, e);
    e = e.concat(i), ce(i) ? r = !1 : n = i;
  }
  return e;
}
function Nm(t) {
  W(t, (e) => {
    Rc(e) || (Ic[Va] = e, e.tokenTypeIdx = Va++), Ka(e) && !te(e.CATEGORIES) && (e.CATEGORIES = [e.CATEGORIES]), Ka(e) || (e.CATEGORIES = []), wm(e) || (e.categoryMatches = []), Cm(e) || (e.categoryMatchesMap = {});
  });
}
function _m(t) {
  W(t, (e) => {
    e.categoryMatches = [], W(e.categoryMatchesMap, (n, r) => {
      e.categoryMatches.push(Ic[r].tokenTypeIdx);
    });
  });
}
function Pm(t) {
  W(t, (e) => {
    bc([], e);
  });
}
function bc(t, e) {
  W(t, (n) => {
    e.categoryMatchesMap[n.tokenTypeIdx] = !0;
  }), W(e.CATEGORIES, (n) => {
    const r = t.concat(e);
    Le(r, n) || bc(r, n);
  });
}
function Rc(t) {
  return G(t, "tokenTypeIdx");
}
function Ka(t) {
  return G(t, "CATEGORIES");
}
function wm(t) {
  return G(t, "categoryMatches");
}
function Cm(t) {
  return G(t, "categoryMatchesMap");
}
function Lm(t) {
  return G(t, "tokenTypeIdx");
}
const xm = {
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
const yn = {
  deferDefinitionErrorsHandling: !1,
  positionTracking: "full",
  lineTerminatorsPattern: /\n|\r\n?/g,
  lineTerminatorCharacters: [`
`, "\r"],
  ensureOptimizations: !1,
  safeMode: !1,
  errorMessageProvider: xm,
  traceInitPerf: !1,
  skipValidations: !1,
  recoveryEnabled: !0
};
Object.freeze(yn);
let $e = class {
  constructor(e, n = yn) {
    if (this.lexerDefinition = e, this.lexerDefinitionErrors = [], this.lexerDefinitionWarning = [], this.patternIdxToConfig = {}, this.charCodeToPatternIdxToConfig = {}, this.modes = [], this.emptyGroups = {}, this.trackStartLines = !0, this.trackEndLines = !0, this.hasCustom = !1, this.canModeBeOptimized = {}, this.TRACE_INIT = (i, o) => {
      if (this.traceInitPerf === !0) {
        this.traceInitIndent++;
        const a = new Array(this.traceInitIndent + 1).join("	");
        this.traceInitIndent < this.traceInitMaxIdent && console.log(`${a}--> <${i}>`);
        const { time: s, value: c } = yc(o), u = s > 10 ? console.warn : console.log;
        return this.traceInitIndent < this.traceInitMaxIdent && u(`${a}<-- <${i}> time: ${s}ms`), this.traceInitIndent--, c;
      } else
        return o();
    }, typeof n == "boolean")
      throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);
    this.config = Ue({}, yn, n);
    const r = this.config.traceInitPerf;
    r === !0 ? (this.traceInitMaxIdent = 1 / 0, this.traceInitPerf = !0) : typeof r == "number" && (this.traceInitMaxIdent = r, this.traceInitPerf = !0), this.traceInitIndent = -1, this.TRACE_INIT("Lexer Constructor", () => {
      let i, o = !0;
      this.TRACE_INIT("Lexer Config handling", () => {
        if (this.config.lineTerminatorsPattern === yn.lineTerminatorsPattern)
          this.config.lineTerminatorsPattern = Om;
        else if (this.config.lineTerminatorCharacters === yn.lineTerminatorCharacters)
          throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);
        if (n.safeMode && n.ensureOptimizations)
          throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
        this.trackStartLines = /full|onlyStart/i.test(this.config.positionTracking), this.trackEndLines = /full/i.test(this.config.positionTracking), te(e) ? i = {
          modes: { defaultMode: Re(e) },
          defaultMode: pn
        } : (o = !1, i = Re(e));
      }), this.config.skipValidations === !1 && (this.TRACE_INIT("performRuntimeChecks", () => {
        this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(Tm(i, this.trackStartLines, this.config.lineTerminatorCharacters));
      }), this.TRACE_INIT("performWarningRuntimeChecks", () => {
        this.lexerDefinitionWarning = this.lexerDefinitionWarning.concat(Am(i, this.trackStartLines, this.config.lineTerminatorCharacters));
      })), i.modes = i.modes ? i.modes : {}, W(i.modes, (s, c) => {
        i.modes[c] = Lr(s, (u) => Tt(u));
      });
      const a = Ke(i.modes);
      if (W(i.modes, (s, c) => {
        this.TRACE_INIT(`Mode: <${c}> processing`, () => {
          if (this.modes.push(c), this.config.skipValidations === !1 && this.TRACE_INIT("validatePatterns", () => {
            this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(rm(s, a));
          }), ce(this.lexerDefinitionErrors)) {
            Cn(s);
            let u;
            this.TRACE_INIT("analyzeTokenTypes", () => {
              u = nm(s, {
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
        gc(s.message);
      }), this.TRACE_INIT("Choosing sub-methods implementations", () => {
        if (Ac ? (this.chopInput = tn, this.match = this.matchWithTest) : (this.updateLastIndex = Ae, this.match = this.matchWithExec), o && (this.handleModes = Ae), this.trackStartLines === !1 && (this.computeNewColumn = tn), this.trackEndLines === !1 && (this.updateTokenEndLineColumnLocation = Ae), /full/i.test(this.config.positionTracking))
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
        Zy();
      }), this.TRACE_INIT("toFastProperties", () => {
        mc(this);
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
    let r, i, o, a, s, c, u, p, T, A, S, C, k, U, P;
    const m = e, y = m.length;
    let I = 0, x = 0;
    const z = this.hasCustom ? 0 : Math.floor(e.length / 10), F = new Array(z), ee = [];
    let K = this.trackStartLines ? 1 : void 0, ie = this.trackStartLines ? 1 : void 0;
    const oe = vm(this.emptyGroups), X = this.trackStartLines, ue = this.config.lineTerminatorsPattern;
    let me = 0, ge = [], fe = [];
    const Ne = [], Te = [];
    Object.freeze(Te);
    let _;
    function w() {
      return ge;
    }
    function $(d) {
      const R = Nt(d), O = fe[R];
      return O === void 0 ? Te : O;
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
        const R = rn(Ne);
        ge = this.patternIdxToConfig[R], fe = this.charCodeToPatternIdxToConfig[R], me = ge.length;
        const O = this.canModeBeOptimized[R] && this.config.safeMode === !1;
        fe && O ? _ = $ : _ = w;
      }
    };
    function E(d) {
      Ne.push(d), fe = this.charCodeToPatternIdxToConfig[d], ge = this.patternIdxToConfig[d], me = ge.length, me = ge.length;
      const R = this.canModeBeOptimized[d] && this.config.safeMode === !1;
      fe && R ? _ = $ : _ = w;
    }
    E.call(this, n);
    let l;
    const h = this.config.recoveryEnabled;
    for (; I < y; ) {
      c = null;
      const d = m.charCodeAt(I), R = _(d), O = R.length;
      for (r = 0; r < O; r++) {
        l = R[r];
        const b = l.pattern;
        u = null;
        const L = l.short;
        if (L !== !1 ? d === L && (c = b) : l.isCustom === !0 ? (P = b.exec(m, I, F, oe), P !== null ? (c = P[0], P.payload !== void 0 && (u = P.payload)) : c = null) : (this.updateLastIndex(b, I), c = this.match(b, e, I)), c !== null) {
          if (s = l.longerAlt, s !== void 0) {
            const q = s.length;
            for (o = 0; o < q; o++) {
              const H = ge[s[o]], Z = H.pattern;
              if (p = null, H.isCustom === !0 ? (P = Z.exec(m, I, F, oe), P !== null ? (a = P[0], P.payload !== void 0 && (p = P.payload)) : a = null) : (this.updateLastIndex(Z, I), a = this.match(Z, e, I)), a && a.length > c.length) {
                c = a, u = p, l = H;
                break;
              }
            }
          }
          break;
        }
      }
      if (c !== null) {
        if (T = c.length, A = l.group, A !== void 0 && (S = l.tokenTypeIdx, C = this.createTokenInstance(c, I, S, l.tokenType, K, ie, T), this.handlePayload(C, u), A === !1 ? x = this.addToken(F, x, C) : oe[A].push(C)), e = this.chopInput(e, T), I = I + T, ie = this.computeNewColumn(ie, T), X === !0 && l.canLineTerminator === !0) {
          let b = 0, L, q;
          ue.lastIndex = 0;
          do
            L = ue.test(c), L === !0 && (q = ue.lastIndex - 1, b++);
          while (L === !0);
          b !== 0 && (K = K + b, ie = T - q, this.updateTokenEndLineColumnLocation(C, A, q, b, K, ie, T));
        }
        this.handleModes(l, f, E, C);
      } else {
        const b = I, L = K, q = ie;
        let H = h === !1;
        for (; H === !1 && I < y; )
          for (e = this.chopInput(e, 1), I++, i = 0; i < me; i++) {
            const Z = ge[i], ae = Z.pattern, _e = Z.short;
            if (_e !== !1 ? m.charCodeAt(I) === _e && (H = !0) : Z.isCustom === !0 ? H = ae.exec(m, I, F, oe) !== null : (this.updateLastIndex(ae, I), H = ae.exec(e) !== null), H === !0)
              break;
          }
        if (k = I - b, ie = this.computeNewColumn(ie, k), U = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(m, b, k, L, q), ee.push({
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
function En(t) {
  return Nc(t) ? t.LABEL : t.name;
}
function Nc(t) {
  return ke(t.LABEL) && t.LABEL !== "";
}
const km = "parent", za = "categories", Ha = "label", Ya = "group", Xa = "push_mode", Ja = "pop_mode", Za = "longer_alt", Qa = "line_breaks", es = "start_chars_hint";
function Ao(t) {
  return Mm(t);
}
function Mm(t) {
  const e = t.pattern, n = {};
  if (n.name = t.name, Tt(e) || (n.PATTERN = e), G(t, km))
    throw `The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;
  return G(t, za) && (n.CATEGORIES = t[za]), Cn([n]), G(t, Ha) && (n.LABEL = t[Ha]), G(t, Ya) && (n.GROUP = t[Ya]), G(t, Ja) && (n.POP_MODE = t[Ja]), G(t, Xa) && (n.PUSH_MODE = t[Xa]), G(t, Za) && (n.LONGER_ALT = t[Za]), G(t, Qa) && (n.LINE_BREAKS = t[Qa]), G(t, es) && (n.START_CHARS_HINT = t[es]), n;
}
const jt = Ao({ name: "EOF", pattern: $e.NA });
Cn([jt]);
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
function Fm(t, e) {
  return wn(t, e);
}
const _c = {
  buildMismatchTokenMessage({ expected: t, actual: e, previous: n, ruleName: r }) {
    return `Expecting ${Nc(t) ? `--> ${En(t)} <--` : `token of type --> ${t.name} <--`} but found --> '${e.image}' <--`;
  },
  buildNotAllInputParsedMessage({ firstRedundant: t, ruleName: e }) {
    return "Redundant input, expecting EOF but found: " + t.image;
  },
  buildNoViableAltMessage({ expectedPathsPerAlt: t, actual: e, previous: n, customUserDescription: r, ruleName: i }) {
    const o = "Expecting: ", s = `
but found: '` + Je(e).image + "'";
    if (r)
      return o + r + s;
    {
      const c = je(t, (A, S) => A.concat(S), []), u = D(c, (A) => `[${D(A, (S) => En(S)).join(", ")}]`), T = `one of these possible Token sequences:
${D(u, (A, S) => `  ${S + 1}. ${A}`).join(`
`)}`;
      return o + T + s;
    }
  },
  buildEarlyExitMessage({ expectedIterationPaths: t, actual: e, customUserDescription: n, ruleName: r }) {
    const i = "Expecting: ", a = `
but found: '` + Je(e).image + "'";
    if (n)
      return i + n + a;
    {
      const c = `expecting at least one iteration which starts with one of these possible Token sequences::
  <${D(t, (u) => `[${D(u, (p) => En(p)).join(",")}]`).join(" ,")}>`;
      return i + c + a;
    }
  }
};
Object.freeze(_c);
const $m = {
  buildRuleNotFoundError(t, e) {
    return "Invalid grammar, reference to a rule which is not defined: ->" + e.nonTerminalName + `<-
inside top level rule: ->` + t.name + "<-";
  }
}, xt = {
  buildDuplicateFoundError(t, e) {
    function n(p) {
      return p instanceof he ? p.terminalType.name : p instanceof De ? p.nonTerminalName : "";
    }
    const r = t.name, i = Je(e), o = i.idx, a = rt(i), s = n(i), c = o > 0;
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
    const e = D(t.prefixPath, (i) => En(i)).join(", "), n = t.alternation.idx === 0 ? "" : t.alternation.idx;
    return `Ambiguous alternatives: <${t.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${n}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;
  },
  buildAlternationAmbiguityError(t) {
    const e = D(t.prefixPath, (i) => En(i)).join(", "), n = t.alternation.idx === 0 ? "" : t.alternation.idx;
    let r = `Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(" ,")}> in <OR${n}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;
    return r = r + `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`, r;
  },
  buildEmptyRepetitionError(t) {
    let e = rt(t.repetition);
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
    return t.topLevelRule instanceof an ? e = t.topLevelRule.name : e = t.topLevelRule, `Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`;
  }
};
function Um(t, e) {
  const n = new jm(t, e);
  return n.resolveRefs(), n.errors;
}
class jm extends sn {
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
class Dm extends xr {
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
class Bm extends Dm {
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
class Mr extends xr {
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
class qm extends Mr {
  walkMany(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Je(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof he && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkMany(e, n, r);
  }
}
class ts extends Mr {
  walkManySep(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Je(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof he && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkManySep(e, n, r);
  }
}
class Gm extends Mr {
  walkAtLeastOne(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Je(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof he && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkAtLeastOne(e, n, r);
  }
}
class ns extends Mr {
  walkAtLeastOneSep(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Je(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof he && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkAtLeastOneSep(e, n, r);
  }
}
function Mi(t, e, n = []) {
  n = Re(n);
  let r = [], i = 0;
  function o(s) {
    return s.concat(be(t, i + 1));
  }
  function a(s) {
    const c = Mi(o(s), e, n);
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
    else if (s instanceof lt) {
      const c = s.definition.concat([
        new Se({
          definition: s.definition
        })
      ]);
      return a(c);
    } else if (s instanceof ft) {
      const c = [
        new Me({ definition: s.definition }),
        new Se({
          definition: [new he({ terminalType: s.separator })].concat(s.definition)
        })
      ];
      return a(c);
    } else if (s instanceof Qe) {
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
      if (s instanceof et)
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
function Pc(t, e, n, r) {
  const i = "EXIT_NONE_TERMINAL", o = [i], a = "EXIT_ALTERNATIVE";
  let s = !1;
  const c = e.length, u = c - r - 1, p = [], T = [];
  for (T.push({
    idx: -1,
    def: t,
    ruleStack: [],
    occurrenceStack: []
  }); !ce(T); ) {
    const A = T.pop();
    if (A === a) {
      s && rn(T).idx <= u && T.pop();
      continue;
    }
    const S = A.def, C = A.idx, k = A.ruleStack, U = A.occurrenceStack;
    if (ce(S))
      continue;
    const P = S[0];
    if (P === i) {
      const m = {
        idx: C,
        def: be(S),
        ruleStack: Sn(k),
        occurrenceStack: Sn(U)
      };
      T.push(m);
    } else if (P instanceof he)
      if (C < c - 1) {
        const m = C + 1, y = e[m];
        if (n(y, P.terminalType)) {
          const I = {
            idx: m,
            def: be(S),
            ruleStack: k,
            occurrenceStack: U
          };
          T.push(I);
        }
      } else if (C === c - 1)
        p.push({
          nextTokenType: P.terminalType,
          nextTokenOccurrence: P.idx,
          ruleStack: k,
          occurrenceStack: U
        }), s = !0;
      else
        throw Error("non exhaustive match");
    else if (P instanceof De) {
      const m = Re(k);
      m.push(P.nonTerminalName);
      const y = Re(U);
      y.push(P.idx);
      const I = {
        idx: C,
        def: P.definition.concat(o, be(S)),
        ruleStack: m,
        occurrenceStack: y
      };
      T.push(I);
    } else if (P instanceof xe) {
      const m = {
        idx: C,
        def: be(S),
        ruleStack: k,
        occurrenceStack: U
      };
      T.push(m), T.push(a);
      const y = {
        idx: C,
        def: P.definition.concat(be(S)),
        ruleStack: k,
        occurrenceStack: U
      };
      T.push(y);
    } else if (P instanceof lt) {
      const m = new Se({
        definition: P.definition,
        idx: P.idx
      }), y = P.definition.concat([m], be(S)), I = {
        idx: C,
        def: y,
        ruleStack: k,
        occurrenceStack: U
      };
      T.push(I);
    } else if (P instanceof ft) {
      const m = new he({
        terminalType: P.separator
      }), y = new Se({
        definition: [m].concat(P.definition),
        idx: P.idx
      }), I = P.definition.concat([y], be(S)), x = {
        idx: C,
        def: I,
        ruleStack: k,
        occurrenceStack: U
      };
      T.push(x);
    } else if (P instanceof Qe) {
      const m = {
        idx: C,
        def: be(S),
        ruleStack: k,
        occurrenceStack: U
      };
      T.push(m), T.push(a);
      const y = new he({
        terminalType: P.separator
      }), I = new Se({
        definition: [y].concat(P.definition),
        idx: P.idx
      }), x = P.definition.concat([I], be(S)), z = {
        idx: C,
        def: x,
        ruleStack: k,
        occurrenceStack: U
      };
      T.push(z);
    } else if (P instanceof Se) {
      const m = {
        idx: C,
        def: be(S),
        ruleStack: k,
        occurrenceStack: U
      };
      T.push(m), T.push(a);
      const y = new Se({
        definition: P.definition,
        idx: P.idx
      }), I = P.definition.concat([y], be(S)), x = {
        idx: C,
        def: I,
        ruleStack: k,
        occurrenceStack: U
      };
      T.push(x);
    } else if (P instanceof et)
      for (let m = P.definition.length - 1; m >= 0; m--) {
        const y = P.definition[m], I = {
          idx: C,
          def: y.definition.concat(be(S)),
          ruleStack: k,
          occurrenceStack: U
        };
        T.push(I), T.push(a);
      }
    else if (P instanceof Me)
      T.push({
        idx: C,
        def: P.definition.concat(be(S)),
        ruleStack: k,
        occurrenceStack: U
      });
    else if (P instanceof an)
      T.push(Wm(P, C, k, U));
    else
      throw Error("non exhaustive match");
  }
  return p;
}
function Wm(t, e, n, r) {
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
function wc(t) {
  if (t instanceof xe || t === "Option")
    return de.OPTION;
  if (t instanceof Se || t === "Repetition")
    return de.REPETITION;
  if (t instanceof lt || t === "RepetitionMandatory")
    return de.REPETITION_MANDATORY;
  if (t instanceof ft || t === "RepetitionMandatoryWithSeparator")
    return de.REPETITION_MANDATORY_WITH_SEPARATOR;
  if (t instanceof Qe || t === "RepetitionWithSeparator")
    return de.REPETITION_WITH_SEPARATOR;
  if (t instanceof et || t === "Alternation")
    return de.ALTERNATION;
  throw Error("non exhaustive match");
}
function Vm(t, e, n, r, i, o) {
  const a = So(t, e, n), s = xc(a) ? cr : wn;
  return o(a, r, s, i);
}
function Km(t, e, n, r, i, o) {
  const a = Oo(t, e, i, n), s = xc(a) ? cr : wn;
  return o(a[0], s, r);
}
function zm(t, e, n, r) {
  const i = t.length, o = Ye(t, (a) => Ye(a, (s) => s.length === 1));
  if (e)
    return function(a) {
      const s = D(a, (c) => c.GATE);
      for (let c = 0; c < i; c++) {
        const u = t[c], p = u.length, T = s[c];
        if (!(T !== void 0 && T.call(this) === !1))
          e: for (let A = 0; A < p; A++) {
            const S = u[A], C = S.length;
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
    const a = D(t, (c) => He(c)), s = je(a, (c, u, p) => (W(u, (T) => {
      G(c, T.tokenTypeIdx) || (c[T.tokenTypeIdx] = p), W(T.categoryMatches, (A) => {
        G(c, A) || (c[A] = p);
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
          const p = s[u], T = p.length;
          for (let A = 0; A < T; A++) {
            const S = this.LA(A + 1);
            if (n(S, p[A]) === !1)
              continue e;
          }
          return a;
        }
      }
    };
}
function Hm(t, e, n) {
  const r = Ye(t, (o) => o.length === 1), i = t.length;
  if (r && !n) {
    const o = He(t);
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
class Ym extends xr {
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
class Cc extends sn {
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
function hi(t) {
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
function Xm(t, e, n) {
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
function Lc(t, e) {
  const n = D(t, (a) => Mi([a], 1)), r = rs(n.length), i = D(n, (a) => {
    const s = {};
    return W(a, (c) => {
      const u = hi(c.partialPath);
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
        const T = u[p].partialPath, A = u[p].suffixDef, S = hi(T);
        if (Xm(i, S, c) || ce(A) || T.length === e) {
          const k = r[c];
          if (Fi(k, T) === !1) {
            k.push(T);
            for (let U = 0; U < S.length; U++) {
              const P = S[U];
              i[c][P] = !0;
            }
          }
        } else {
          const k = Mi(A, a + 1, T);
          o[c] = o[c].concat(k), W(k, (U) => {
            const P = hi(U.partialPath);
            W(P, (m) => {
              i[c][m] = !0;
            });
          });
        }
      }
    }
  }
  return r;
}
function So(t, e, n, r) {
  const i = new Cc(t, de.ALTERNATION, r);
  return e.accept(i), Lc(i.result, n);
}
function Oo(t, e, n, r) {
  const i = new Cc(t, n);
  e.accept(i);
  const o = i.result, s = new Ym(e, t, n).startWalking(), c = new Me({ definition: o }), u = new Me({ definition: s });
  return Lc([c, u], r);
}
function Fi(t, e) {
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
function Jm(t, e) {
  return t.length < e.length && Ye(t, (n, r) => {
    const i = e[r];
    return n === i || i.categoryMatchesMap[n.tokenTypeIdx];
  });
}
function xc(t) {
  return Ye(t, (e) => Ye(e, (n) => Ye(n, (r) => ce(r.categoryMatches))));
}
function Zm(t) {
  const e = t.lookaheadStrategy.validate({
    rules: t.rules,
    tokenTypes: t.tokenTypes,
    grammarName: t.grammarName
  });
  return D(e, (n) => Object.assign({ type: Ce.CUSTOM_LOOKAHEAD_VALIDATION }, n));
}
function Qm(t, e, n, r) {
  const i = Ge(t, (c) => eE(c, n)), o = hE(t, e, n), a = Ge(t, (c) => cE(c, n)), s = Ge(t, (c) => rE(c, t, r, n));
  return i.concat(o, a, s);
}
function eE(t, e) {
  const n = new nE();
  t.accept(n);
  const r = n.allProductions, i = dy(r, tE), o = Ze(i, (s) => s.length > 1);
  return D(ve(o), (s) => {
    const c = Je(s), u = e.buildDuplicateFoundError(t, s), p = rt(c), T = {
      message: u,
      type: Ce.DUPLICATE_PRODUCTIONS,
      ruleName: t.name,
      dslName: p,
      occurrence: c.idx
    }, A = kc(c);
    return A && (T.parameter = A), T;
  });
}
function tE(t) {
  return `${rt(t)}_#_${t.idx}_#_${kc(t)}`;
}
function kc(t) {
  return t instanceof he ? t.terminalType.name : t instanceof De ? t.nonTerminalName : "";
}
class nE extends sn {
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
function rE(t, e, n, r) {
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
function iE(t, e, n) {
  const r = [];
  let i;
  return Le(e, t) || (i = `Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${n}<-as it is not defined in any of the super grammars `, r.push({
    message: i,
    type: Ce.INVALID_RULE_OVERRIDE,
    ruleName: t
  })), r;
}
function Mc(t, e, n, r = []) {
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
    const c = Cr(o, r.concat([t])), u = Ge(c, (p) => {
      const T = Re(r);
      return T.push(p), Mc(t, p, n, T);
    });
    return i.concat(u);
  }
}
function Xn(t) {
  let e = [];
  if (ce(t))
    return e;
  const n = Je(t);
  if (n instanceof De)
    e.push(n.referencedRule);
  else if (n instanceof Me || n instanceof xe || n instanceof lt || n instanceof ft || n instanceof Qe || n instanceof Se)
    e = e.concat(Xn(n.definition));
  else if (n instanceof et)
    e = He(D(n.definition, (o) => Xn(o.definition)));
  else if (!(n instanceof he)) throw Error("non exhaustive match");
  const r = ir(n), i = t.length > 1;
  if (r && i) {
    const o = be(t);
    return e.concat(Xn(o));
  } else
    return e;
}
class Io extends sn {
  constructor() {
    super(...arguments), this.alternations = [];
  }
  visitAlternation(e) {
    this.alternations.push(e);
  }
}
function oE(t, e) {
  const n = new Io();
  t.accept(n);
  const r = n.alternations;
  return Ge(r, (o) => {
    const a = Sn(o.definition);
    return Ge(a, (s, c) => {
      const u = Pc([s], [], wn, 1);
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
function aE(t, e, n) {
  const r = new Io();
  t.accept(r);
  let i = r.alternations;
  return i = Lr(i, (a) => a.ignoreAmbiguities === !0), Ge(i, (a) => {
    const s = a.idx, c = a.maxLookahead || e, u = So(s, t, c, a), p = lE(u, a, t, n), T = fE(u, a, t, n);
    return p.concat(T);
  });
}
class sE extends sn {
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
function cE(t, e) {
  const n = new Io();
  t.accept(n);
  const r = n.alternations;
  return Ge(r, (o) => o.definition.length > 255 ? [
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
function uE(t, e, n) {
  const r = [];
  return W(t, (i) => {
    const o = new sE();
    i.accept(o);
    const a = o.allProductions;
    W(a, (s) => {
      const c = wc(s), u = s.maxLookahead || e, p = s.idx, A = Oo(p, i, c, u)[0];
      if (ce(He(A))) {
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
function lE(t, e, n, r) {
  const i = [], o = je(t, (s, c, u) => (e.definition[u].ignoreAmbiguities === !0 || W(c, (p) => {
    const T = [u];
    W(t, (A, S) => {
      u !== S && Fi(A, p) && // ignore (skip) ambiguities with this "other" alternative
      e.definition[S].ignoreAmbiguities !== !0 && T.push(S);
    }), T.length > 1 && !Fi(i, p) && (i.push(p), s.push({
      alts: T,
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
function fE(t, e, n, r) {
  const i = je(t, (a, s, c) => {
    const u = D(s, (p) => ({ idx: c, path: p }));
    return a.concat(u);
  }, []);
  return _n(Ge(i, (a) => {
    if (e.definition[a.idx].ignoreAmbiguities === !0)
      return [];
    const c = a.idx, u = a.path, p = ze(i, (A) => (
      // ignore (skip) ambiguities with this "other" alternative
      e.definition[A.idx].ignoreAmbiguities !== !0 && A.idx < c && // checking for strict prefix because identical lookaheads
      // will be be detected using a different validation.
      Jm(A.path, u)
    ));
    return D(p, (A) => {
      const S = [A.idx + 1, c + 1], C = e.idx === 0 ? "" : e.idx;
      return {
        message: r.buildAlternationPrefixAmbiguityError({
          topLevelRule: n,
          alternation: e,
          ambiguityIndices: S,
          prefixPath: A.path
        }),
        type: Ce.AMBIGUOUS_PREFIX_ALTS,
        ruleName: n.name,
        occurrence: C,
        alternatives: S
      };
    });
  }));
}
function hE(t, e, n) {
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
function dE(t) {
  const e = yo(t, {
    errMsgProvider: $m
  }), n = {};
  return W(t.rules, (r) => {
    n[r.name] = r;
  }), Um(n, e.errMsgProvider);
}
function pE(t) {
  return t = yo(t, {
    errMsgProvider: xt
  }), Qm(t.rules, t.tokenTypes, t.errMsgProvider, t.grammarName);
}
const Fc = "MismatchedTokenException", $c = "NoViableAltException", Uc = "EarlyExitException", jc = "NotAllInputParsedException", Dc = [
  Fc,
  $c,
  Uc,
  jc
];
Object.freeze(Dc);
function ur(t) {
  return Le(Dc, t.name);
}
class Fr extends Error {
  constructor(e, n) {
    super(e), this.token = n, this.resyncedTokens = [], Object.setPrototypeOf(this, new.target.prototype), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
}
class Bc extends Fr {
  constructor(e, n, r) {
    super(e, n), this.previousToken = r, this.name = Fc;
  }
}
class gE extends Fr {
  constructor(e, n, r) {
    super(e, n), this.previousToken = r, this.name = $c;
  }
}
class yE extends Fr {
  constructor(e, n) {
    super(e, n), this.name = jc;
  }
}
class mE extends Fr {
  constructor(e, n, r) {
    super(e, n), this.previousToken = r, this.name = Uc;
  }
}
const di = {}, qc = "InRuleRecoveryException";
class EE extends Error {
  constructor(e) {
    super(e), this.name = qc;
  }
}
class TE {
  initRecoverable(e) {
    this.firstAfterRepMap = {}, this.resyncFollows = {}, this.recoveryEnabled = G(e, "recoveryEnabled") ? e.recoveryEnabled : At.recoveryEnabled, this.recoveryEnabled && (this.attemptInRepetitionRecovery = AE);
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
    const T = () => {
      const A = this.LA(0), S = this.errorMessageProvider.buildMismatchTokenMessage({
        expected: i,
        actual: u,
        previous: A,
        ruleName: this.getCurrRuleFullName()
      }), C = new Bc(S, u, this.LA(0));
      C.resyncedTokens = Sn(s), this.SAVE_ERROR(C);
    };
    for (; !c; )
      if (this.tokenMatcher(p, i)) {
        T();
        return;
      } else if (r.call(this)) {
        T(), e.apply(this, n);
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
    throw new EE("sad sad panda");
  }
  canPerformInRuleRecovery(e, n) {
    return this.canRecoverWithSingleTokenInsertion(e, n) || this.canRecoverWithSingleTokenDeletion(e);
  }
  canRecoverWithSingleTokenInsertion(e, n) {
    if (!this.canTokenTypeBeInsertedInRecovery(e) || ce(n))
      return !1;
    const r = this.LA(1);
    return on(n, (o) => this.tokenMatcher(r, o)) !== void 0;
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
      const i = on(e, (o) => Fm(n, o));
      if (i !== void 0)
        return i;
      n = this.LA(r), r++;
    }
  }
  getCurrFollowKey() {
    if (this.RULE_STACK.length === 1)
      return di;
    const e = this.getLastExplicitRuleShortName(), n = this.getLastExplicitRuleOccurrenceIndex(), r = this.getPreviousExplicitRuleShortName();
    return {
      ruleName: this.shortRuleNameToFullName(e),
      idxInCallingRule: n,
      inRule: this.shortRuleNameToFullName(r)
    };
  }
  buildFullFollowKeyStack() {
    const e = this.RULE_STACK, n = this.RULE_OCCURRENCE_STACK;
    return D(e, (r, i) => i === 0 ? di : {
      ruleName: this.shortRuleNameToFullName(r),
      idxInCallingRule: n[i],
      inRule: this.shortRuleNameToFullName(e[i - 1])
    });
  }
  flattenFollowSet() {
    const e = D(this.buildFullFollowKeyStack(), (n) => this.getFollowSetFromFollowKey(n));
    return He(e);
  }
  getFollowSetFromFollowKey(e) {
    if (e === di)
      return [jt];
    const n = e.ruleName + e.idxInCallingRule + Ec + e.inRule;
    return this.resyncFollows[n];
  }
  // It does not make any sense to include a virtual EOF token in the list of resynced tokens
  // as EOF does not really exist and thus does not contain any useful information (line/column numbers)
  addToResyncTokens(e, n) {
    return this.tokenMatcher(e, jt) || n.push(e), n;
  }
  reSyncTo(e) {
    const n = [];
    let r = this.LA(1);
    for (; this.tokenMatcher(r, e) === !1; )
      r = this.SKIP_TOKEN(), this.addToResyncTokens(r, n);
    return Sn(n);
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
function AE(t, e, n, r, i, o, a) {
  const s = this.getKeyForAutomaticLookahead(r, i);
  let c = this.firstAfterRepMap[s];
  if (c === void 0) {
    const A = this.getCurrRuleFullName(), S = this.getGAstProductions()[A];
    c = new o(S, i).startWalking(), this.firstAfterRepMap[s] = c;
  }
  let u = c.token, p = c.occurrence;
  const T = c.isEndOfRule;
  this.RULE_STACK.length === 1 && T && u === void 0 && (u = jt, p = 1), !(u === void 0 || p === void 0) && this.shouldInRepetitionRecoveryBeTried(u, p, a) && this.tryInRepetitionRecovery(t, e, n, u);
}
const vE = 4, Pt = 8, Gc = 1 << Pt, Wc = 2 << Pt, $i = 3 << Pt, Ui = 4 << Pt, ji = 5 << Pt, Jn = 6 << Pt;
function pi(t, e, n) {
  return n | e | t;
}
class SE {
  constructor(e) {
    var n;
    this.maxLookahead = (n = e?.maxLookahead) !== null && n !== void 0 ? n : At.maxLookahead;
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
    return Ge(e, (n) => Mc(n, n, xt));
  }
  validateEmptyOrAlternatives(e) {
    return Ge(e, (n) => oE(n, xt));
  }
  validateAmbiguousAlternationAlternatives(e, n) {
    return Ge(e, (r) => aE(r, n, xt));
  }
  validateSomeNonEmptyLookaheadPath(e, n) {
    return uE(e, n, xt);
  }
  buildLookaheadForAlternation(e) {
    return Vm(e.prodOccurrence, e.rule, e.maxLookahead, e.hasPredicates, e.dynamicTokensEnabled, zm);
  }
  buildLookaheadForOptional(e) {
    return Km(e.prodOccurrence, e.rule, e.maxLookahead, e.dynamicTokensEnabled, wc(e.prodType), Hm);
  }
}
class OE {
  initLooksAhead(e) {
    this.dynamicTokensEnabled = G(e, "dynamicTokensEnabled") ? e.dynamicTokensEnabled : At.dynamicTokensEnabled, this.maxLookahead = G(e, "maxLookahead") ? e.maxLookahead : At.maxLookahead, this.lookaheadStrategy = G(e, "lookaheadStrategy") ? e.lookaheadStrategy : new SE({ maxLookahead: this.maxLookahead }), this.lookAheadFuncsCache = /* @__PURE__ */ new Map();
  }
  preComputeLookaheadFunctions(e) {
    W(e, (n) => {
      this.TRACE_INIT(`${n.name} Rule Lookahead`, () => {
        const { alternation: r, repetition: i, option: o, repetitionMandatory: a, repetitionMandatoryWithSeparator: s, repetitionWithSeparator: c } = bE(n);
        W(r, (u) => {
          const p = u.idx === 0 ? "" : u.idx;
          this.TRACE_INIT(`${rt(u)}${p}`, () => {
            const T = this.lookaheadStrategy.buildLookaheadForAlternation({
              prodOccurrence: u.idx,
              rule: n,
              maxLookahead: u.maxLookahead || this.maxLookahead,
              hasPredicates: u.hasPredicates,
              dynamicTokensEnabled: this.dynamicTokensEnabled
            }), A = pi(this.fullRuleNameToShort[n.name], Gc, u.idx);
            this.setLaFuncCache(A, T);
          });
        }), W(i, (u) => {
          this.computeLookaheadFunc(n, u.idx, $i, "Repetition", u.maxLookahead, rt(u));
        }), W(o, (u) => {
          this.computeLookaheadFunc(n, u.idx, Wc, "Option", u.maxLookahead, rt(u));
        }), W(a, (u) => {
          this.computeLookaheadFunc(n, u.idx, Ui, "RepetitionMandatory", u.maxLookahead, rt(u));
        }), W(s, (u) => {
          this.computeLookaheadFunc(n, u.idx, Jn, "RepetitionMandatoryWithSeparator", u.maxLookahead, rt(u));
        }), W(c, (u) => {
          this.computeLookaheadFunc(n, u.idx, ji, "RepetitionWithSeparator", u.maxLookahead, rt(u));
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
      }), c = pi(this.fullRuleNameToShort[e.name], r, n);
      this.setLaFuncCache(c, s);
    });
  }
  // this actually returns a number, but it is always used as a string (object prop key)
  getKeyForAutomaticLookahead(e, n) {
    const r = this.getLastExplicitRuleShortName();
    return pi(r, e, n);
  }
  getLaFuncFromCache(e) {
    return this.lookAheadFuncsCache.get(e);
  }
  /* istanbul ignore next */
  setLaFuncCache(e, n) {
    this.lookAheadFuncsCache.set(e, n);
  }
}
class IE extends sn {
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
const Un = new IE();
function bE(t) {
  Un.reset(), t.accept(Un);
  const e = Un.dslMethods;
  return Un.reset(), e;
}
function is(t, e) {
  isNaN(t.startOffset) === !0 ? (t.startOffset = e.startOffset, t.endOffset = e.endOffset) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset);
}
function os(t, e) {
  isNaN(t.startOffset) === !0 ? (t.startOffset = e.startOffset, t.startColumn = e.startColumn, t.startLine = e.startLine, t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine);
}
function RE(t, e, n) {
  t.children[n] === void 0 ? t.children[n] = [e] : t.children[n].push(e);
}
function NE(t, e, n) {
  t.children[e] === void 0 ? t.children[e] = [n] : t.children[e].push(n);
}
const _E = "name";
function Vc(t, e) {
  Object.defineProperty(t, _E, {
    enumerable: !1,
    configurable: !0,
    writable: !1,
    value: e
  });
}
function PE(t, e) {
  const n = Ke(t), r = n.length;
  for (let i = 0; i < r; i++) {
    const o = n[i], a = t[o], s = a.length;
    for (let c = 0; c < s; c++) {
      const u = a[c];
      u.tokenTypeIdx === void 0 && this[u.name](u.children, e);
    }
  }
}
function wE(t, e) {
  const n = function() {
  };
  Vc(n, t + "BaseSemantics");
  const r = {
    visit: function(i, o) {
      if (te(i) && (i = i[0]), !Tt(i))
        return this[i.name](i.children, o);
    },
    validateVisitor: function() {
      const i = LE(this, e);
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
function CE(t, e, n) {
  const r = function() {
  };
  Vc(r, t + "BaseSemanticsWithDefaults");
  const i = Object.create(n.prototype);
  return W(e, (o) => {
    i[o] = PE;
  }), r.prototype = i, r.prototype.constructor = r, r;
}
var Di;
(function(t) {
  t[t.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", t[t.MISSING_METHOD = 1] = "MISSING_METHOD";
})(Di || (Di = {}));
function LE(t, e) {
  return xE(t, e);
}
function xE(t, e) {
  const n = ze(e, (i) => St(t[i]) === !1), r = D(n, (i) => ({
    msg: `Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,
    type: Di.MISSING_METHOD,
    methodName: i
  }));
  return _n(r);
}
class kE {
  initTreeBuilder(e) {
    if (this.CST_STACK = [], this.outputCst = e.outputCst, this.nodeLocationTracking = G(e, "nodeLocationTracking") ? e.nodeLocationTracking : At.nodeLocationTracking, !this.outputCst)
      this.cstInvocationStateUpdate = Ae, this.cstFinallyStateUpdate = Ae, this.cstPostTerminal = Ae, this.cstPostNonTerminal = Ae, this.cstPostRule = Ae;
    else if (/full/i.test(this.nodeLocationTracking))
      this.recoveryEnabled ? (this.setNodeLocationFromToken = os, this.setNodeLocationFromNode = os, this.cstPostRule = Ae, this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery) : (this.setNodeLocationFromToken = Ae, this.setNodeLocationFromNode = Ae, this.cstPostRule = this.cstPostRuleFull, this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular);
    else if (/onlyOffset/i.test(this.nodeLocationTracking))
      this.recoveryEnabled ? (this.setNodeLocationFromToken = is, this.setNodeLocationFromNode = is, this.cstPostRule = Ae, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery) : (this.setNodeLocationFromToken = Ae, this.setNodeLocationFromNode = Ae, this.cstPostRule = this.cstPostRuleOnlyOffset, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular);
    else if (/none/i.test(this.nodeLocationTracking))
      this.setNodeLocationFromToken = Ae, this.setNodeLocationFromNode = Ae, this.cstPostRule = Ae, this.setInitialNodeLocation = Ae;
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
    RE(r, n, e), this.setNodeLocationFromToken(r.location, n);
  }
  cstPostNonTerminal(e, n) {
    const r = this.CST_STACK[this.CST_STACK.length - 1];
    NE(r, n, e), this.setNodeLocationFromNode(r.location, e.location);
  }
  getBaseCstVisitorConstructor() {
    if (Tt(this.baseCstVisitorConstructor)) {
      const e = wE(this.className, Ke(this.gastProductionsCache));
      return this.baseCstVisitorConstructor = e, e;
    }
    return this.baseCstVisitorConstructor;
  }
  getBaseCstVisitorConstructorWithDefaults() {
    if (Tt(this.baseCstVisitorWithDefaultsConstructor)) {
      const e = CE(this.className, Ke(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
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
class ME {
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
class FE {
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
        message: xt.buildDuplicateRuleNameError({
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
    const i = iE(e, this.definedRulesNames, this.className);
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
    return Uy(ve(this.gastProductionsCache));
  }
}
class $E {
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
    else if (G(e, "modes") && Ye(He(ve(e.modes)), Lm)) {
      const o = He(ve(e.modes)), a = mo(o);
      this.tokensMap = je(a, (s, c) => (s[c.name] = c, s), {});
    } else if (Ve(e))
      this.tokensMap = Re(e);
    else
      throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
    this.tokensMap.EOF = jt;
    const r = G(e, "modes") ? He(ve(e.modes)) : ve(e), i = Ye(r, (o) => ce(o.categoryMatches));
    this.tokenMatcher = i ? cr : wn, Cn(ve(this.tokensMap));
  }
  defineRule(e, n, r) {
    if (this.selfAnalysisDone)
      throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
    const i = G(r, "resyncEnabled") ? r.resyncEnabled : hr.resyncEnabled, o = G(r, "recoveryValueFunc") ? r.recoveryValueFunc : hr.recoveryValueFunc, a = this.ruleShortNameIdx << vE + Pt;
    this.ruleShortNameIdx++, this.shortRuleNameToFull[a] = e, this.fullRuleNameToShort[e] = a;
    let s;
    return this.outputCst === !0 ? s = function(...p) {
      try {
        this.ruleInvocationStateUpdate(a, e, this.subruleIdx), n.apply(this, p);
        const T = this.CST_STACK[this.CST_STACK.length - 1];
        return this.cstPostRule(T), T;
      } catch (T) {
        return this.invokeRuleCatch(T, i, o);
      } finally {
        this.ruleFinallyStateUpdate();
      }
    } : s = function(...p) {
      try {
        return this.ruleInvocationStateUpdate(a, e, this.subruleIdx), n.apply(this, p);
      } catch (T) {
        return this.invokeRuleCatch(T, i, o);
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
    const r = this.getKeyForAutomaticLookahead(Wc, n);
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
    const r = this.getKeyForAutomaticLookahead(Ui, e);
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
    this.attemptInRepetitionRecovery(this.atLeastOneInternal, [e, n], i, Ui, e, Gm);
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
    const r = this.getKeyForAutomaticLookahead($i, e);
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
      $i,
      e,
      qm,
      // The notStuck parameter is only relevant when "attemptInRepetitionRecovery"
      // is invoked from manyInternal, in the MANY_SEP case and AT_LEAST_ONE[_SEP]
      // An infinite loop cannot occur as:
      // - Either the lookahead is guaranteed to consume something (Single Token Separator)
      // - AT_LEAST_ONE by definition is guaranteed to consume something (or error out).
      a
    );
  }
  manySepFirstInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(ji, e);
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
      ], s, ji, e, ts);
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
    const r = this.getKeyForAutomaticLookahead(Gc, n), i = te(e) ? e : e.DEF, a = this.getLaFuncFromCache(r).call(this, i);
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
      this.SAVE_ERROR(new yE(n, e));
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
    }), this.SAVE_ERROR(new Bc(i, n, o));
  }
  consumeInternalRecovery(e, n, r) {
    if (this.recoveryEnabled && // TODO: more robust checking of the exception type. Perhaps Typescript extending expressions?
    r.name === "MismatchedTokenException" && !this.isBackTracking()) {
      const i = this.getFollowsForInRuleRecovery(e, n);
      try {
        return this.tryInRuleRecovery(e, i);
      } catch (o) {
        throw o.name === qc ? r : o;
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
    return this.tokenMatcher(this.LA(1), jt);
  }
  reset() {
    this.resetLexerState(), this.subruleIdx = 0, this.isBackTrackingStack = [], this.errors = [], this.RULE_STACK = [], this.CST_STACK = [], this.RULE_OCCURRENCE_STACK = [];
  }
}
class UE {
  initErrorHandler(e) {
    this._errors = [], this.errorMessageProvider = G(e, "errorMessageProvider") ? e.errorMessageProvider : At.errorMessageProvider;
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
    throw this.SAVE_ERROR(new mE(u, this.LA(1), this.LA(0)));
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
    throw this.SAVE_ERROR(new gE(c, this.LA(1), s));
  }
}
class jE {
  initContentAssist() {
  }
  computeContentAssist(e, n) {
    const r = this.gastProductionsCache[e];
    if (Tt(r))
      throw Error(`Rule ->${e}<- does not exist in this grammar.`);
    return Pc([r], n, this.tokenMatcher, this.maxLookahead);
  }
  // TODO: should this be a member method or a utility? it does not have any state or usage of 'this'...
  // TODO: should this be more explicitly part of the public API?
  getNextPossibleTokenTypes(e) {
    const n = Je(e.ruleStack), i = this.getGAstProductions()[n];
    return new Bm(i, e).startWalking();
  }
}
const $r = {
  description: "This Object indicates the Parser is during Recording Phase"
};
Object.freeze($r);
const as = !0, ss = Math.pow(2, Pt) - 1, Kc = Ao({ name: "RECORDING_PHASE_TOKEN", pattern: $e.NA });
Cn([Kc]);
const zc = vo(
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
Object.freeze(zc);
const DE = {
  name: `This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,
  children: {}
};
class BE {
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
      const r = new an({ definition: [], name: e });
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
    return dn.call(this, xe, e, n);
  }
  atLeastOneInternalRecord(e, n) {
    dn.call(this, lt, n, e);
  }
  atLeastOneSepFirstInternalRecord(e, n) {
    dn.call(this, ft, n, e, as);
  }
  manyInternalRecord(e, n) {
    dn.call(this, Se, n, e);
  }
  manySepFirstInternalRecord(e, n) {
    dn.call(this, Qe, n, e, as);
  }
  orInternalRecord(e, n) {
    return qE.call(this, e, n);
  }
  subruleInternalRecord(e, n, r) {
    if (lr(n), !e || G(e, "ruleName") === !1) {
      const s = new Error(`<SUBRULE${cs(n)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw s.KNOWN_RECORDER_ERROR = !0, s;
    }
    const i = rn(this.recordingProdStack), o = e.ruleName, a = new De({
      idx: n,
      nonTerminalName: o,
      label: r?.LABEL,
      // The resolving of the `referencedRule` property will be done once all the Rule's GASTs have been created
      referencedRule: void 0
    });
    return i.definition.push(a), this.outputCst ? DE : $r;
  }
  consumeInternalRecord(e, n, r) {
    if (lr(n), !Rc(e)) {
      const a = new Error(`<CONSUME${cs(n)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw a.KNOWN_RECORDER_ERROR = !0, a;
    }
    const i = rn(this.recordingProdStack), o = new he({
      idx: n,
      terminalType: e,
      label: r?.LABEL
    });
    return i.definition.push(o), zc;
  }
}
function dn(t, e, n, r = !1) {
  lr(n);
  const i = rn(this.recordingProdStack), o = St(e) ? e : e.DEF, a = new t({ definition: [], idx: n });
  return r && (a.separator = e.SEP), G(e, "MAX_LOOKAHEAD") && (a.maxLookahead = e.MAX_LOOKAHEAD), this.recordingProdStack.push(a), o.call(this), i.definition.push(a), this.recordingProdStack.pop(), $r;
}
function qE(t, e) {
  lr(e);
  const n = rn(this.recordingProdStack), r = te(t) === !1, i = r === !1 ? t : t.DEF, o = new et({
    definition: [],
    idx: e,
    ignoreAmbiguities: r && t.IGNORE_AMBIGUITIES === !0
  });
  G(t, "MAX_LOOKAHEAD") && (o.maxLookahead = t.MAX_LOOKAHEAD);
  const a = pc(i, (s) => St(s.GATE));
  return o.hasPredicates = a, n.definition.push(o), W(i, (s) => {
    const c = new Me({ definition: [] });
    o.definition.push(c), G(s, "IGNORE_AMBIGUITIES") ? c.ignoreAmbiguities = s.IGNORE_AMBIGUITIES : G(s, "GATE") && (c.ignoreAmbiguities = !0), this.recordingProdStack.push(c), s.ALT.call(this), this.recordingProdStack.pop();
  }), $r;
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
class GE {
  initPerformanceTracer(e) {
    if (G(e, "traceInitPerf")) {
      const n = e.traceInitPerf, r = typeof n == "number";
      this.traceInitMaxIdent = r ? n : 1 / 0, this.traceInitPerf = r ? n > 0 : n;
    } else
      this.traceInitMaxIdent = 0, this.traceInitPerf = At.traceInitPerf;
    this.traceInitIndent = -1;
  }
  TRACE_INIT(e, n) {
    if (this.traceInitPerf === !0) {
      this.traceInitIndent++;
      const r = new Array(this.traceInitIndent + 1).join("	");
      this.traceInitIndent < this.traceInitMaxIdent && console.log(`${r}--> <${e}>`);
      const { time: i, value: o } = yc(n), a = i > 10 ? console.warn : console.log;
      return this.traceInitIndent < this.traceInitMaxIdent && a(`${r}<-- <${e}> time: ${i}ms`), this.traceInitIndent--, o;
    } else
      return n();
  }
}
function WE(t, e) {
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
const fr = vo(jt, "", NaN, NaN, NaN, NaN, NaN, NaN);
Object.freeze(fr);
const At = Object.freeze({
  recoveryEnabled: !1,
  maxLookahead: 3,
  dynamicTokensEnabled: !1,
  outputCst: !0,
  errorMessageProvider: _c,
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
class Ln {
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
        mc(this);
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
        r = dE({
          rules: ve(this.gastProductionsCache)
        }), this.definitionErrors = this.definitionErrors.concat(r);
      }), this.TRACE_INIT("Grammar Validations", () => {
        if (ce(r) && this.skipValidations === !1) {
          const i = pE({
            rules: ve(this.gastProductionsCache),
            tokenTypes: ve(this.tokensMap),
            errMsgProvider: xt,
            grammarName: n
          }), o = Zm({
            lookaheadStrategy: this.lookaheadStrategy,
            rules: ve(this.gastProductionsCache),
            tokenTypes: ve(this.tokensMap),
            grammarName: n
          });
          this.definitionErrors = this.definitionErrors.concat(i, o);
        }
      }), ce(this.definitionErrors) && (this.recoveryEnabled && this.TRACE_INIT("computeAllProdsFollows", () => {
        const i = Vy(ve(this.gastProductionsCache));
        this.resyncFollows = i;
      }), this.TRACE_INIT("ComputeLookaheadFunctions", () => {
        var i, o;
        (o = (i = this.lookaheadStrategy).initialize) === null || o === void 0 || o.call(i, {
          rules: ve(this.gastProductionsCache)
        }), this.preComputeLookaheadFunctions(ve(this.gastProductionsCache));
      })), !Ln.DEFER_DEFINITION_ERRORS_HANDLING && !ce(this.definitionErrors))
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
    this.skipValidations = G(n, "skipValidations") ? n.skipValidations : At.skipValidations;
  }
}
Ln.DEFER_DEFINITION_ERRORS_HANDLING = !1;
WE(Ln, [
  TE,
  OE,
  kE,
  ME,
  $E,
  FE,
  UE,
  jE,
  BE,
  GE
]);
let VE = class extends Ln {
  constructor(e, n = At) {
    const r = Re(n);
    r.outputCst = !1, super(e, r);
  }
};
const wt = Ao, Hc = $e, bo = wt({ name: "LCurly", pattern: /{/ }), Ro = wt({ name: "RCurly", pattern: /}/ }), No = wt({ name: "LSquare", pattern: /\[/ }), _o = wt({ name: "RSquare", pattern: /]/ }), dr = wt({ name: "Comma", pattern: /,/ }), Po = wt({ name: "Colon", pattern: /:/ }), Bi = wt({
  name: "StringLiteral",
  pattern: /(\w|\.)+/
}), KE = wt({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Hc.SKIPPED
}), Yc = [
  KE,
  Bi,
  Ro,
  bo,
  No,
  _o,
  dr,
  Po
], zE = new Hc(Yc);
bo.LABEL = "'{'";
Ro.LABEL = "'}'";
No.LABEL = "'['";
_o.LABEL = "']'";
dr.LABEL = "','";
Po.LABEL = "':'";
const HE = VE;
class YE extends HE {
  constructor() {
    super(Yc, { recoveryEnabled: !0 });
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
      return n = e.CONSUME(Bi), e.CONSUME(Po), i = e.SUBRULE(e.value), r = n.isInsertedInRecovery ? "BAD_KEY" : n.image, o[r] = i, o;
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
          ALT: () => e.CONSUME(Bi).image
        },
        { ALT: () => e.SUBRULE(e.object) },
        { ALT: () => e.SUBRULE(e.array) }
      ])
    ), this.performSelfAnalysis();
  }
}
const gi = new YE();
function XE(t) {
  const e = zE.tokenize(t);
  return gi.input = e.tokens, {
    cst: gi.value(),
    lexErrors: e.errors,
    parseErrors: gi.errors
  };
}
function pr(t) {
  if (t === "true")
    return !0;
  if (t === "false")
    return !1;
  throw new Error("invalid boolean string");
}
function IT(t) {
  return t ? "true" : "false";
}
function Be(t, e) {
  return t.split(e)[0];
}
function JE(t) {
  return BigInt(Be(t, "i8"));
}
function bT(t) {
  return `${t}i8`;
}
function ZE(t) {
  return BigInt(Be(t, "i16"));
}
function RT(t) {
  return `${t}i16`;
}
function QE(t) {
  return BigInt(Be(t, "i32"));
}
function NT(t) {
  return `${t}i32`;
}
function eT(t) {
  return BigInt(Be(t, "i64"));
}
function _T(t) {
  return `${t}i64`;
}
function tT(t) {
  return BigInt(Be(t, "i128"));
}
function PT(t) {
  return `${t}i128`;
}
function Xc(t) {
  return BigInt(Be(t, "u8"));
}
function it(t) {
  return `${t}u8`;
}
function nT(t) {
  return BigInt(Be(t, "u16"));
}
function wT(t) {
  return `${t}u16`;
}
function qi(t) {
  return BigInt(Be(t, "u32"));
}
function rT(t) {
  return `${t}u32`;
}
function yt(t) {
  return BigInt(Be(t, "u64"));
}
function yi(t) {
  return `${t}u64`;
}
function Gi(t) {
  return BigInt(Be(t, "u128"));
}
function CT(t) {
  return `${t}u128`;
}
function Jc(t) {
  return BigInt(Be(t, "field"));
}
function LT(t) {
  return `${t}field`;
}
function iT(t) {
  return BigInt(Be(t, "group"));
}
function xT(t) {
  return `${t}group`;
}
function oT(t) {
  return BigInt(Be(t, "scalar"));
}
function kT(t) {
  return `${t}scalar`;
}
class Ur {
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
function aT(t) {
  try {
    return t.startsWith("aleo1") ? t : t === "true" || t === "false" ? pr(t) : t.endsWith("field") ? Jc(t) : t.endsWith("group") ? iT(t) : t.endsWith("i8") ? JE(t) : t.endsWith("i16") ? ZE(t) : t.endsWith("i32") ? QE(t) : t.endsWith("i64") ? eT(t) : t.endsWith("i128") ? tT(t) : t.endsWith("u8") ? Xc(t) : t.endsWith("u16") ? nT(t) : t.endsWith("u32") ? qi(t) : t.endsWith("u64") ? yt(t) : t.endsWith("u128") ? Gi(t) : t.endsWith("scalar") ? oT(t) : t;
  } catch {
    return t;
  }
}
function Wi(t) {
  return Array.isArray(t) ? t.map((e) => Wi(e)) : typeof t == "object" ? Object.fromEntries(
    Object.entries(t).map(([e, n]) => [e, Wi(n)])
  ) : aT(t);
}
function Ft(t) {
  Vn(t !== "null", "plaintext cannot be null"), t = t.replaceAll("\\n", `
`).replaceAll('"', ""), t = t.trim();
  const { cst: e, lexErrors: n, parseErrors: r } = XE(t);
  return Vn(n.length === 0, n.join(`
`)), Vn(r.length === 0, r.join(`
`)), Wi(e);
}
let mi;
async function Zc() {
  return mi || (globalThis.Worker || (globalThis.Worker = class extends EventTarget {
    postMessage() {
    }
    unref() {
    }
  }), mi = await import("@aleohq/sdk")), mi;
}
async function Qc(t) {
  return (await Zc()).Plaintext.fromString(t).hashBhp256().toString();
}
async function sT(t) {
  return (await Zc()).ProgramID.fromString(t).toAddress();
}
class FT extends Ur {
  /**
   * Get the state of the committee for an **active** validator.
   * @param validator
   * @returns The committee state or null if the validator is not in the committee.
   */
  async getCommitteeState(e) {
    const n = await this.getMappingValueOrNull("committee", e);
    return n === null ? null : Ft(n);
  }
  /**
   * Get the total number of **active** validators in the committee.
   */
  async getCommitteeValidatorsCount() {
    return yt(
      await this.getMappingValueOrDefault(
        "metadata",
        "aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc",
        yi(0)
      )
    );
  }
  /**
   * Get the total number of delegators (not including validators).
   */
  async getDelegatorsCount() {
    return yt(
      await this.getMappingValueOrDefault(
        "metadata",
        "aleo1qgqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqanmpl0",
        yi(0)
      )
    );
  }
  /**
   * Get the total amount of microcredits that are prebonded and bonded to a validator.
   * Note: It includes both prebonded and bonded microcredits. However, it does not contain unbonding microcredits.
   * @param validator
   */
  async getDelegated(e) {
    return yt(await this.getMappingValueOrDefault("delegated", e, yi(0)));
  }
  /**
   * Get the bond state of the staker.
   * @param staker The staker (validator or delegator)
   */
  async getBonded(e) {
    const n = await this.getMappingValueOrNull("bonded", e);
    return n === null ? null : Ft(n);
  }
  /**
   * Get the unbonding state of the staker.
   * @param staker The staker (validator or delegator)
   */
  async getUnbonding(e) {
    const n = await this.getMappingValueOrNull("unbonding", e);
    return n === null ? null : Ft(n);
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
    return yt(await this.getMappingValueOrDefault("account", e, "0"));
  }
}
class $T extends Ur {
  async isInitialized() {
    return pr(await this.getMappingValueOrDefault("initialized", "0u8", "false"));
  }
  async hasRole(e, n) {
    const r = await Qc(`{
      account: ${n},
      role: ${it(e)}
    }`);
    return pr(await this.getMappingValueOrDefault("grants", r, "false"));
  }
  async isRoleAdmin(e, n) {
    const r = Number(
      Xc(await this.getMappingValueOrDefault("role_admins", it(e), it(tf)))
    );
    return typeof n == "number" ? n === r : this.hasRole(r, n);
  }
}
var cT = /* @__PURE__ */ ((t) => (t[t.TOTAL_WITHDRAW_KEY = 0] = "TOTAL_WITHDRAW_KEY", t[t.TOTAL_PENDING_WITHDRAW_KEY = 1] = "TOTAL_PENDING_WITHDRAW_KEY", t[t.TOTAL_BONDED_KEY = 2] = "TOTAL_BONDED_KEY", t[t.TOTAL_UNBONDING_KEY = 3] = "TOTAL_UNBONDING_KEY", t[t.PROTOCOL_FEE_KEY = 4] = "PROTOCOL_FEE_KEY", t))(cT || {}), uT = /* @__PURE__ */ ((t) => (t[t.INVALID = 0] = "INVALID", t[t.IN_PROGRESS = 1] = "IN_PROGRESS", t[t.VALID = 2] = "VALID", t))(uT || {});
class UT extends Ur {
  constructor(e, n) {
    super(e), this.credits = n;
  }
  async getTotalSupply() {
    return yt(await this.getMappingValueOrDefault("total_supply", it(0), "0"));
  }
  async getPublicBalance(e) {
    return yt(await this.getMappingValueOrDefault("account", e, "0"));
  }
  async getApproval(e, n) {
    const r = await Qc(`{
      approver: ${e},
      spender: ${n}
    }`);
    return yt(await this.getMappingValueOrDefault("approvals", r, "0"));
  }
  async getConfig() {
    const e = await this.getMappingValueOrNull("config", it(0));
    return e === null ? null : Ft(e);
  }
  async isInitialized() {
    const e = await this.getConfig();
    return e !== null && e.initialized;
  }
  async isPaused() {
    const e = await this.getConfig();
    return e !== null && e.paused;
  }
  async getState(e) {
    return Jc(await this.getMappingValue("state", it(e)));
  }
  async getCacheState() {
    return Ft(await this.getMappingValue("cache_state", it(0)));
  }
  async getWithdraw(e) {
    const n = await this.getMappingValueOrNull("withdraws", e);
    return n === null ? null : Ft(n);
  }
  async getPendingWithdrawResolved() {
    return qi(await this.getMappingValue("pending_resolved", it(0)));
  }
  isWithdrawClaimable(e, n, r, i) {
    return n.height <= (n.pending ? r : i);
  }
  async getValidatorsCount() {
    return qi(await this.getMappingValue("validators_count", it(0)));
  }
  async getValidator(e) {
    return await this.getMappingValueOrNull("validators", rT(e));
  }
  async hasValidator(e) {
    return await this.getMappingValueOrNull("validator_delegators", e) !== null;
  }
  async hasDelegator(e) {
    return pr(await this.getMappingValueOrDefault("delegators", e, "false"));
  }
  async getValidatorDelegator(e) {
    const n = await this.getMappingValue("validator_delegators", e);
    return n === ef ? null : n;
  }
  async getValidatorBonded(e) {
    return yt(await this.getMappingValueOrDefault("validator_bonded", e, "0"));
  }
  async getTotalBuffered() {
    return this.credits.getPublicBalance(await sT(nf()));
  }
  async getTotalBonded() {
    return this.getState(
      2
      /* TOTAL_BONDED_KEY */
    );
  }
  async getTotalUnbonding() {
    return this.getState(
      3
      /* TOTAL_UNBONDING_KEY */
    );
  }
  async getTotalWithdraw() {
    return this.getState(
      0
      /* TOTAL_WITHDRAW_KEY */
    );
  }
  async getTotalPendingWithdraw() {
    return this.getState(
      1
      /* TOTAL_PENDING_WITHDRAW_KEY */
    );
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
}
class jT extends Ur {
  /**
   * Get the total supply of points.
   */
  async getTotalSupply() {
    return Gi(await this.getMappingValueOrDefault("total_supply", it(0), "0"));
  }
  /**
   * Get the balance of points for an account.
   * @param account
   */
  async getBalance(e) {
    return Gi(await this.getMappingValueOrDefault("account", e, "0"));
  }
  /**
   * Get the state of an account.
   * @param account
   */
  async getState(e) {
    const n = await this.getMappingValueOrNull("state", e);
    return n === null ? {
      stcredits: 0n,
      height: 0n
    } : Ft(n);
  }
}
export {
  mT as ACCESS_CONTROL_PROGRAM,
  ET as ACL_MANAGER_PROGRAM,
  gT as ASSET_LISTING_ADMIN_ROLE,
  $T as AccessControlProgram,
  uT as CacheStateEnum,
  FT as CreditsProgram,
  tf as DEFAULT_ADMIN_ROLE,
  dT as EMERGENCY_ADMIN_ROLE,
  hT as POOL_ADMIN_ROLE,
  Us as PREFIX,
  Ur as ProgramBase,
  pT as RISK_ADMIN_ROLE,
  lT as STAKING_ADMIN_ROLE,
  fT as STAKING_OPERATOR_ROLE,
  yT as STCREDITS_CACHE_BATCH_NUM,
  TT as STCREDITS_POINTS_PROGRAM,
  nf as STCREDITS_PROGRAM,
  jT as StCreditsPointsProgram,
  UT as StCreditsProgram,
  cT as StateEnum,
  $s as VERSION,
  ef as ZERO_ADDRESS,
  Qc as bhp256HashToField,
  pr as bool,
  IT as boolStr,
  AT as delegatorProgramName,
  Jc as field,
  LT as fieldStr,
  iT as group,
  xT as groupStr,
  tT as i128,
  PT as i128Str,
  ZE as i16,
  RT as i16Str,
  QE as i32,
  NT as i32Str,
  eT as i64,
  _T as i64Str,
  JE as i8,
  bT as i8Str,
  Zc as importAleo,
  vT as initialize,
  aT as parseLiteral,
  Ft as parsePlaintext,
  sT as programAddress,
  oT as scalar,
  kT as scalarStr,
  Gi as u128,
  CT as u128Str,
  nT as u16,
  wT as u16Str,
  qi as u32,
  rT as u32Str,
  yt as u64,
  yi as u64Str,
  Xc as u8,
  it as u8Str
};
