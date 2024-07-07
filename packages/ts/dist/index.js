const pn = "001", yn = {
  accessControl: "spectre_access_control_v1",
  aclManager: "spectre_acl_manager_v1",
  stcredits: "spectre_stcredits_v1",
  stcreditsPoints: "spectre_stcredits_points_v1",
  delegator: "spectre_delegator_v1"
}, _t = {
  programSuffix: pn,
  programs: yn
}, gn = "aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc", dn = 0, Bi = 1, Mi = 2, Fi = 3, Ui = 4, Vi = 5, Wi = 6, Gi = 10n;
function ie(t) {
  return `${t}_${_t.programSuffix}.aleo`;
}
const Li = ie(_t.programs.accessControl), Ci = ie(_t.programs.aclManager), hn = ie(_t.programs.stcredits), ki = ie(_t.programs.stcreditsPoints);
function zi(t) {
  const e = (t + 1).toString().padStart(3, "0");
  return `${_t.programs.delegator}_${_t.programSuffix}_${e}.aleo`;
}
var _r = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function bn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function vn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Dr = { exports: {} }, et = Dr.exports = {}, vt, mt;
function Me() {
  throw new Error("setTimeout has not been defined");
}
function Fe() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? vt = setTimeout : vt = Me;
  } catch {
    vt = Me;
  }
  try {
    typeof clearTimeout == "function" ? mt = clearTimeout : mt = Fe;
  } catch {
    mt = Fe;
  }
})();
function $r(t) {
  if (vt === setTimeout)
    return setTimeout(t, 0);
  if ((vt === Me || !vt) && setTimeout)
    return vt = setTimeout, setTimeout(t, 0);
  try {
    return vt(t, 0);
  } catch {
    try {
      return vt.call(null, t, 0);
    } catch {
      return vt.call(this, t, 0);
    }
  }
}
function mn(t) {
  if (mt === clearTimeout)
    return clearTimeout(t);
  if ((mt === Fe || !mt) && clearTimeout)
    return mt = clearTimeout, clearTimeout(t);
  try {
    return mt(t);
  } catch {
    try {
      return mt.call(null, t);
    } catch {
      return mt.call(this, t);
    }
  }
}
var Et = [], Vt = !1, Tt, Yt = -1;
function wn() {
  !Vt || !Tt || (Vt = !1, Tt.length ? Et = Tt.concat(Et) : Yt = -1, Et.length && Br());
}
function Br() {
  if (!Vt) {
    var t = $r(wn);
    Vt = !0;
    for (var e = Et.length; e; ) {
      for (Tt = Et, Et = []; ++Yt < e; )
        Tt && Tt[Yt].run();
      Yt = -1, e = Et.length;
    }
    Tt = null, Vt = !1, mn(t);
  }
}
et.nextTick = function(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var n = 1; n < arguments.length; n++)
      e[n - 1] = arguments[n];
  Et.push(new Mr(t, e)), Et.length === 1 && !Vt && $r(Br);
};
function Mr(t, e) {
  this.fun = t, this.array = e;
}
Mr.prototype.run = function() {
  this.fun.apply(null, this.array);
};
et.title = "browser";
et.browser = !0;
et.env = {};
et.argv = [];
et.version = "";
et.versions = {};
function Pt() {
}
et.on = Pt;
et.addListener = Pt;
et.once = Pt;
et.off = Pt;
et.removeListener = Pt;
et.removeAllListeners = Pt;
et.emit = Pt;
et.prependListener = Pt;
et.prependOnceListener = Pt;
et.listeners = function(t) {
  return [];
};
et.binding = function(t) {
  throw new Error("process.binding is not supported");
};
et.cwd = function() {
  return "/";
};
et.chdir = function(t) {
  throw new Error("process.chdir is not supported");
};
et.umask = function() {
  return 0;
};
var Sn = Dr.exports;
const ot = /* @__PURE__ */ vn(Sn);
var pe = { exports: {} }, ye = {}, Gt = {}, Fr = {}, He = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var e = {}, n = Symbol("test"), f = Object(n);
  if (typeof n == "string" || Object.prototype.toString.call(n) !== "[object Symbol]" || Object.prototype.toString.call(f) !== "[object Symbol]")
    return !1;
  var l = 42;
  e[n] = l;
  for (n in e)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
    return !1;
  var w = Object.getOwnPropertySymbols(e);
  if (w.length !== 1 || w[0] !== n || !Object.prototype.propertyIsEnumerable.call(e, n))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var A = Object.getOwnPropertyDescriptor(e, n);
    if (A.value !== l || A.enumerable !== !0)
      return !1;
  }
  return !0;
}, On = He, Ye = function() {
  return On() && !!Symbol.toStringTag;
}, An = Error, En = EvalError, jn = RangeError, Pn = ReferenceError, Ur = SyntaxError, ae = TypeError, qn = URIError, rr = typeof Symbol < "u" && Symbol, In = He, Tn = function() {
  return typeof rr != "function" || typeof Symbol != "function" || typeof rr("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : In();
}, ge = {
  __proto__: null,
  foo: {}
}, Rn = Object, Nn = function() {
  return { __proto__: ge }.foo === ge.foo && !(ge instanceof Rn);
}, _n = "Function.prototype.bind called on incompatible ", Dn = Object.prototype.toString, $n = Math.max, Bn = "[object Function]", nr = function(e, n) {
  for (var f = [], l = 0; l < e.length; l += 1)
    f[l] = e[l];
  for (var w = 0; w < n.length; w += 1)
    f[w + e.length] = n[w];
  return f;
}, Mn = function(e, n) {
  for (var f = [], l = n, w = 0; l < e.length; l += 1, w += 1)
    f[w] = e[l];
  return f;
}, Fn = function(t, e) {
  for (var n = "", f = 0; f < t.length; f += 1)
    n += t[f], f + 1 < t.length && (n += e);
  return n;
}, Un = function(e) {
  var n = this;
  if (typeof n != "function" || Dn.apply(n) !== Bn)
    throw new TypeError(_n + n);
  for (var f = Mn(arguments, 1), l, w = function() {
    if (this instanceof l) {
      var D = n.apply(
        this,
        nr(f, arguments)
      );
      return Object(D) === D ? D : this;
    }
    return n.apply(
      e,
      nr(f, arguments)
    );
  }, A = $n(0, n.length - f.length), B = [], R = 0; R < A; R++)
    B[R] = "$" + R;
  if (l = Function("binder", "return function (" + Fn(B, ",") + "){ return binder.apply(this,arguments); }")(w), n.prototype) {
    var $ = function() {
    };
    $.prototype = n.prototype, l.prototype = new $(), $.prototype = null;
  }
  return l;
}, Vn = Un, Je = Function.prototype.bind || Vn, Wn = Function.prototype.call, Gn = Object.prototype.hasOwnProperty, Ln = Je, Cn = Ln.call(Wn, Gn), L, kn = An, zn = En, xn = jn, Hn = Pn, Lt = Ur, Wt = ae, Yn = qn, Vr = Function, de = function(t) {
  try {
    return Vr('"use strict"; return (' + t + ").constructor;")();
  } catch {
  }
}, Rt = Object.getOwnPropertyDescriptor;
if (Rt)
  try {
    Rt({}, "");
  } catch {
    Rt = null;
  }
var he = function() {
  throw new Wt();
}, Jn = Rt ? function() {
  try {
    return arguments.callee, he;
  } catch {
    try {
      return Rt(arguments, "callee").get;
    } catch {
      return he;
    }
  }
}() : he, Bt = Tn(), Kn = Nn(), it = Object.getPrototypeOf || (Kn ? function(t) {
  return t.__proto__;
} : null), Ft = {}, Qn = typeof Uint8Array > "u" || !it ? L : it(Uint8Array), Nt = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? L : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? L : ArrayBuffer,
  "%ArrayIteratorPrototype%": Bt && it ? it([][Symbol.iterator]()) : L,
  "%AsyncFromSyncIteratorPrototype%": L,
  "%AsyncFunction%": Ft,
  "%AsyncGenerator%": Ft,
  "%AsyncGeneratorFunction%": Ft,
  "%AsyncIteratorPrototype%": Ft,
  "%Atomics%": typeof Atomics > "u" ? L : Atomics,
  "%BigInt%": typeof BigInt > "u" ? L : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? L : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? L : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? L : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": kn,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": zn,
  "%Float32Array%": typeof Float32Array > "u" ? L : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? L : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? L : FinalizationRegistry,
  "%Function%": Vr,
  "%GeneratorFunction%": Ft,
  "%Int8Array%": typeof Int8Array > "u" ? L : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? L : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? L : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": Bt && it ? it(it([][Symbol.iterator]())) : L,
  "%JSON%": typeof JSON == "object" ? JSON : L,
  "%Map%": typeof Map > "u" ? L : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !Bt || !it ? L : it((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? L : Promise,
  "%Proxy%": typeof Proxy > "u" ? L : Proxy,
  "%RangeError%": xn,
  "%ReferenceError%": Hn,
  "%Reflect%": typeof Reflect > "u" ? L : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? L : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !Bt || !it ? L : it((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? L : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": Bt && it ? it(""[Symbol.iterator]()) : L,
  "%Symbol%": Bt ? Symbol : L,
  "%SyntaxError%": Lt,
  "%ThrowTypeError%": Jn,
  "%TypedArray%": Qn,
  "%TypeError%": Wt,
  "%Uint8Array%": typeof Uint8Array > "u" ? L : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? L : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? L : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? L : Uint32Array,
  "%URIError%": Yn,
  "%WeakMap%": typeof WeakMap > "u" ? L : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? L : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? L : WeakSet
};
if (it)
  try {
    null.error;
  } catch (t) {
    var Xn = it(it(t));
    Nt["%Error.prototype%"] = Xn;
  }
var Zn = function t(e) {
  var n;
  if (e === "%AsyncFunction%")
    n = de("async function () {}");
  else if (e === "%GeneratorFunction%")
    n = de("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    n = de("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var f = t("%AsyncGeneratorFunction%");
    f && (n = f.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var l = t("%AsyncGenerator%");
    l && it && (n = it(l.prototype));
  }
  return Nt[e] = n, n;
}, or = {
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
}, xt = Je, te = Cn, to = xt.call(Function.call, Array.prototype.concat), eo = xt.call(Function.apply, Array.prototype.splice), ir = xt.call(Function.call, String.prototype.replace), ee = xt.call(Function.call, String.prototype.slice), ro = xt.call(Function.call, RegExp.prototype.exec), no = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, oo = /\\(\\)?/g, io = function(e) {
  var n = ee(e, 0, 1), f = ee(e, -1);
  if (n === "%" && f !== "%")
    throw new Lt("invalid intrinsic syntax, expected closing `%`");
  if (f === "%" && n !== "%")
    throw new Lt("invalid intrinsic syntax, expected opening `%`");
  var l = [];
  return ir(e, no, function(w, A, B, R) {
    l[l.length] = B ? ir(R, oo, "$1") : A || w;
  }), l;
}, ao = function(e, n) {
  var f = e, l;
  if (te(or, f) && (l = or[f], f = "%" + l[0] + "%"), te(Nt, f)) {
    var w = Nt[f];
    if (w === Ft && (w = Zn(f)), typeof w > "u" && !n)
      throw new Wt("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: l,
      name: f,
      value: w
    };
  }
  throw new Lt("intrinsic " + e + " does not exist!");
}, Ht = function(e, n) {
  if (typeof e != "string" || e.length === 0)
    throw new Wt("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof n != "boolean")
    throw new Wt('"allowMissing" argument must be a boolean');
  if (ro(/^%?[^%]*%?$/, e) === null)
    throw new Lt("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var f = io(e), l = f.length > 0 ? f[0] : "", w = ao("%" + l + "%", n), A = w.name, B = w.value, R = !1, $ = w.alias;
  $ && (l = $[0], eo(f, to([0, 1], $)));
  for (var D = 1, F = !0; D < f.length; D += 1) {
    var E = f[D], q = ee(E, 0, 1), x = ee(E, -1);
    if ((q === '"' || q === "'" || q === "`" || x === '"' || x === "'" || x === "`") && q !== x)
      throw new Lt("property names with quotes must have matching quotes");
    if ((E === "constructor" || !F) && (R = !0), l += "." + E, A = "%" + l + "%", te(Nt, A))
      B = Nt[A];
    else if (B != null) {
      if (!(E in B)) {
        if (!n)
          throw new Wt("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (Rt && D + 1 >= f.length) {
        var Q = Rt(B, E);
        F = !!Q, F && "get" in Q && !("originalValue" in Q.get) ? B = Q.get : B = B[E];
      } else
        F = te(B, E), B = B[E];
      F && !R && (Nt[A] = B);
    }
  }
  return B;
}, Wr = { exports: {} }, be, ar;
function Ke() {
  if (ar) return be;
  ar = 1;
  var t = Ht, e = t("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return be = e, be;
}
var uo = Ht, Jt = uo("%Object.getOwnPropertyDescriptor%", !0);
if (Jt)
  try {
    Jt([], "length");
  } catch {
    Jt = null;
  }
var Qe = Jt, ur = Ke(), fo = Ur, Mt = ae, fr = Qe, Gr = function(e, n, f) {
  if (!e || typeof e != "object" && typeof e != "function")
    throw new Mt("`obj` must be an object or a function`");
  if (typeof n != "string" && typeof n != "symbol")
    throw new Mt("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new Mt("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new Mt("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new Mt("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new Mt("`loose`, if provided, must be a boolean");
  var l = arguments.length > 3 ? arguments[3] : null, w = arguments.length > 4 ? arguments[4] : null, A = arguments.length > 5 ? arguments[5] : null, B = arguments.length > 6 ? arguments[6] : !1, R = !!fr && fr(e, n);
  if (ur)
    ur(e, n, {
      configurable: A === null && R ? R.configurable : !A,
      enumerable: l === null && R ? R.enumerable : !l,
      value: f,
      writable: w === null && R ? R.writable : !w
    });
  else if (B || !l && !w && !A)
    e[n] = f;
  else
    throw new fo("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, Ue = Ke(), Lr = function() {
  return !!Ue;
};
Lr.hasArrayLengthDefineBug = function() {
  if (!Ue)
    return null;
  try {
    return Ue([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Cr = Lr, co = Ht, cr = Gr, so = Cr(), sr = Qe, lr = ae, lo = co("%Math.floor%"), po = function(e, n) {
  if (typeof e != "function")
    throw new lr("`fn` is not a function");
  if (typeof n != "number" || n < 0 || n > 4294967295 || lo(n) !== n)
    throw new lr("`length` must be a positive 32-bit integer");
  var f = arguments.length > 2 && !!arguments[2], l = !0, w = !0;
  if ("length" in e && sr) {
    var A = sr(e, "length");
    A && !A.configurable && (l = !1), A && !A.writable && (w = !1);
  }
  return (l || w || !f) && (so ? cr(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    n,
    !0,
    !0
  ) : cr(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    n
  )), e;
};
(function(t) {
  var e = Je, n = Ht, f = po, l = ae, w = n("%Function.prototype.apply%"), A = n("%Function.prototype.call%"), B = n("%Reflect.apply%", !0) || e.call(A, w), R = Ke(), $ = n("%Math.max%");
  t.exports = function(E) {
    if (typeof E != "function")
      throw new l("a function is required");
    var q = B(e, A, arguments);
    return f(
      q,
      1 + $(0, E.length - (arguments.length - 1)),
      !0
    );
  };
  var D = function() {
    return B(e, w, arguments);
  };
  R ? R(t.exports, "apply", { value: D }) : t.exports.apply = D;
})(Wr);
var ue = Wr.exports, kr = Ht, zr = ue, yo = zr(kr("String.prototype.indexOf")), fe = function(e, n) {
  var f = kr(e, !!n);
  return typeof f == "function" && yo(e, ".prototype.") > -1 ? zr(f) : f;
}, go = Ye(), ho = fe, Ve = ho("Object.prototype.toString"), ce = function(e) {
  return go && e && typeof e == "object" && Symbol.toStringTag in e ? !1 : Ve(e) === "[object Arguments]";
}, xr = function(e) {
  return ce(e) ? !0 : e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && Ve(e) !== "[object Array]" && Ve(e.callee) === "[object Function]";
}, bo = function() {
  return ce(arguments);
}();
ce.isLegacyArguments = xr;
var vo = bo ? ce : xr, mo = Object.prototype.toString, wo = Function.prototype.toString, So = /^\s*(?:function)?\*/, Hr = Ye(), ve = Object.getPrototypeOf, Oo = function() {
  if (!Hr)
    return !1;
  try {
    return Function("return function*() {}")();
  } catch {
  }
}, me, Ao = function(e) {
  if (typeof e != "function")
    return !1;
  if (So.test(wo.call(e)))
    return !0;
  if (!Hr) {
    var n = mo.call(e);
    return n === "[object GeneratorFunction]";
  }
  if (!ve)
    return !1;
  if (typeof me > "u") {
    var f = Oo();
    me = f ? ve(f) : !1;
  }
  return ve(e) === me;
}, Yr = Function.prototype.toString, Ut = typeof Reflect == "object" && Reflect !== null && Reflect.apply, We, Kt;
if (typeof Ut == "function" && typeof Object.defineProperty == "function")
  try {
    We = Object.defineProperty({}, "length", {
      get: function() {
        throw Kt;
      }
    }), Kt = {}, Ut(function() {
      throw 42;
    }, null, We);
  } catch (t) {
    t !== Kt && (Ut = null);
  }
else
  Ut = null;
var Eo = /^\s*class\b/, Ge = function(e) {
  try {
    var n = Yr.call(e);
    return Eo.test(n);
  } catch {
    return !1;
  }
}, we = function(e) {
  try {
    return Ge(e) ? !1 : (Yr.call(e), !0);
  } catch {
    return !1;
  }
}, Qt = Object.prototype.toString, jo = "[object Object]", Po = "[object Function]", qo = "[object GeneratorFunction]", Io = "[object HTMLAllCollection]", To = "[object HTML document.all class]", Ro = "[object HTMLCollection]", No = typeof Symbol == "function" && !!Symbol.toStringTag, _o = !(0 in [,]), Le = function() {
  return !1;
};
if (typeof document == "object") {
  var Do = document.all;
  Qt.call(Do) === Qt.call(document.all) && (Le = function(e) {
    if ((_o || !e) && (typeof e > "u" || typeof e == "object"))
      try {
        var n = Qt.call(e);
        return (n === Io || n === To || n === Ro || n === jo) && e("") == null;
      } catch {
      }
    return !1;
  });
}
var $o = Ut ? function(e) {
  if (Le(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  try {
    Ut(e, null, We);
  } catch (n) {
    if (n !== Kt)
      return !1;
  }
  return !Ge(e) && we(e);
} : function(e) {
  if (Le(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  if (No)
    return we(e);
  if (Ge(e))
    return !1;
  var n = Qt.call(e);
  return n !== Po && n !== qo && !/^\[object HTML/.test(n) ? !1 : we(e);
}, Bo = $o, Mo = Object.prototype.toString, Jr = Object.prototype.hasOwnProperty, Fo = function(e, n, f) {
  for (var l = 0, w = e.length; l < w; l++)
    Jr.call(e, l) && (f == null ? n(e[l], l, e) : n.call(f, e[l], l, e));
}, Uo = function(e, n, f) {
  for (var l = 0, w = e.length; l < w; l++)
    f == null ? n(e.charAt(l), l, e) : n.call(f, e.charAt(l), l, e);
}, Vo = function(e, n, f) {
  for (var l in e)
    Jr.call(e, l) && (f == null ? n(e[l], l, e) : n.call(f, e[l], l, e));
}, Wo = function(e, n, f) {
  if (!Bo(n))
    throw new TypeError("iterator must be a function");
  var l;
  arguments.length >= 3 && (l = f), Mo.call(e) === "[object Array]" ? Fo(e, n, l) : typeof e == "string" ? Uo(e, n, l) : Vo(e, n, l);
}, Go = Wo, Lo = [
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
], Se = Lo, Co = typeof globalThis > "u" ? _r : globalThis, ko = function() {
  for (var e = [], n = 0; n < Se.length; n++)
    typeof Co[Se[n]] == "function" && (e[e.length] = Se[n]);
  return e;
}, re = Go, zo = ko, pr = ue, Xe = fe, Xt = Qe, xo = Xe("Object.prototype.toString"), Kr = Ye(), yr = typeof globalThis > "u" ? _r : globalThis, Ce = zo(), Ze = Xe("String.prototype.slice"), Oe = Object.getPrototypeOf, Ho = Xe("Array.prototype.indexOf", !0) || function(e, n) {
  for (var f = 0; f < e.length; f += 1)
    if (e[f] === n)
      return f;
  return -1;
}, ne = { __proto__: null };
Kr && Xt && Oe ? re(Ce, function(t) {
  var e = new yr[t]();
  if (Symbol.toStringTag in e) {
    var n = Oe(e), f = Xt(n, Symbol.toStringTag);
    if (!f) {
      var l = Oe(n);
      f = Xt(l, Symbol.toStringTag);
    }
    ne["$" + t] = pr(f.get);
  }
}) : re(Ce, function(t) {
  var e = new yr[t](), n = e.slice || e.set;
  n && (ne["$" + t] = pr(n));
});
var Yo = function(e) {
  var n = !1;
  return re(
    // eslint-disable-next-line no-extra-parens
    /** @type {Record<`\$${TypedArrayName}`, Getter>} */
    /** @type {any} */
    ne,
    /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
    function(f, l) {
      if (!n)
        try {
          "$" + f(e) === l && (n = Ze(l, 1));
        } catch {
        }
    }
  ), n;
}, Jo = function(e) {
  var n = !1;
  return re(
    // eslint-disable-next-line no-extra-parens
    /** @type {Record<`\$${TypedArrayName}`, Getter>} */
    /** @type {any} */
    ne,
    /** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */
    function(f, l) {
      if (!n)
        try {
          f(e), n = Ze(l, 1);
        } catch {
        }
    }
  ), n;
}, Qr = function(e) {
  if (!e || typeof e != "object")
    return !1;
  if (!Kr) {
    var n = Ze(xo(e), 8, -1);
    return Ho(Ce, n) > -1 ? n : n !== "Object" ? !1 : Jo(e);
  }
  return Xt ? Yo(e) : null;
}, Ko = Qr, Qo = function(e) {
  return !!Ko(e);
};
(function(t) {
  var e = vo, n = Ao, f = Qr, l = Qo;
  function w(y) {
    return y.call.bind(y);
  }
  var A = typeof BigInt < "u", B = typeof Symbol < "u", R = w(Object.prototype.toString), $ = w(Number.prototype.valueOf), D = w(String.prototype.valueOf), F = w(Boolean.prototype.valueOf);
  if (A)
    var E = w(BigInt.prototype.valueOf);
  if (B)
    var q = w(Symbol.prototype.valueOf);
  function x(y, Dt) {
    if (typeof y != "object")
      return !1;
    try {
      return Dt(y), !0;
    } catch {
      return !1;
    }
  }
  t.isArgumentsObject = e, t.isGeneratorFunction = n, t.isTypedArray = l;
  function Q(y) {
    return typeof Promise < "u" && y instanceof Promise || y !== null && typeof y == "object" && typeof y.then == "function" && typeof y.catch == "function";
  }
  t.isPromise = Q;
  function rt(y) {
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(y) : l(y) || c(y);
  }
  t.isArrayBufferView = rt;
  function C(y) {
    return f(y) === "Uint8Array";
  }
  t.isUint8Array = C;
  function b(y) {
    return f(y) === "Uint8ClampedArray";
  }
  t.isUint8ClampedArray = b;
  function m(y) {
    return f(y) === "Uint16Array";
  }
  t.isUint16Array = m;
  function j(y) {
    return f(y) === "Uint32Array";
  }
  t.isUint32Array = j;
  function _(y) {
    return f(y) === "Int8Array";
  }
  t.isInt8Array = _;
  function k(y) {
    return f(y) === "Int16Array";
  }
  t.isInt16Array = k;
  function T(y) {
    return f(y) === "Int32Array";
  }
  t.isInt32Array = T;
  function K(y) {
    return f(y) === "Float32Array";
  }
  t.isFloat32Array = K;
  function U(y) {
    return f(y) === "Float64Array";
  }
  t.isFloat64Array = U;
  function nt(y) {
    return f(y) === "BigInt64Array";
  }
  t.isBigInt64Array = nt;
  function Z(y) {
    return f(y) === "BigUint64Array";
  }
  t.isBigUint64Array = Z;
  function G(y) {
    return R(y) === "[object Map]";
  }
  G.working = typeof Map < "u" && G(/* @__PURE__ */ new Map());
  function tt(y) {
    return typeof Map > "u" ? !1 : G.working ? G(y) : y instanceof Map;
  }
  t.isMap = tt;
  function ct(y) {
    return R(y) === "[object Set]";
  }
  ct.working = typeof Set < "u" && ct(/* @__PURE__ */ new Set());
  function gt(y) {
    return typeof Set > "u" ? !1 : ct.working ? ct(y) : y instanceof Set;
  }
  t.isSet = gt;
  function at(y) {
    return R(y) === "[object WeakMap]";
  }
  at.working = typeof WeakMap < "u" && at(/* @__PURE__ */ new WeakMap());
  function bt(y) {
    return typeof WeakMap > "u" ? !1 : at.working ? at(y) : y instanceof WeakMap;
  }
  t.isWeakMap = bt;
  function ft(y) {
    return R(y) === "[object WeakSet]";
  }
  ft.working = typeof WeakSet < "u" && ft(/* @__PURE__ */ new WeakSet());
  function h(y) {
    return ft(y);
  }
  t.isWeakSet = h;
  function v(y) {
    return R(y) === "[object ArrayBuffer]";
  }
  v.working = typeof ArrayBuffer < "u" && v(new ArrayBuffer());
  function P(y) {
    return typeof ArrayBuffer > "u" ? !1 : v.working ? v(y) : y instanceof ArrayBuffer;
  }
  t.isArrayBuffer = P;
  function o(y) {
    return R(y) === "[object DataView]";
  }
  o.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && o(new DataView(new ArrayBuffer(1), 0, 1));
  function c(y) {
    return typeof DataView > "u" ? !1 : o.working ? o(y) : y instanceof DataView;
  }
  t.isDataView = c;
  var r = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
  function i(y) {
    return R(y) === "[object SharedArrayBuffer]";
  }
  function u(y) {
    return typeof r > "u" ? !1 : (typeof i.working > "u" && (i.working = i(new r())), i.working ? i(y) : y instanceof r);
  }
  t.isSharedArrayBuffer = u;
  function d(y) {
    return R(y) === "[object AsyncFunction]";
  }
  t.isAsyncFunction = d;
  function p(y) {
    return R(y) === "[object Map Iterator]";
  }
  t.isMapIterator = p;
  function g(y) {
    return R(y) === "[object Set Iterator]";
  }
  t.isSetIterator = g;
  function S(y) {
    return R(y) === "[object Generator]";
  }
  t.isGeneratorObject = S;
  function M(y) {
    return R(y) === "[object WebAssembly.Module]";
  }
  t.isWebAssemblyCompiledModule = M;
  function z(y) {
    return x(y, $);
  }
  t.isNumberObject = z;
  function J(y) {
    return x(y, D);
  }
  t.isStringObject = J;
  function X(y) {
    return x(y, F);
  }
  t.isBooleanObject = X;
  function dt(y) {
    return A && x(y, E);
  }
  t.isBigIntObject = dt;
  function qt(y) {
    return B && x(y, q);
  }
  t.isSymbolObject = qt;
  function St(y) {
    return z(y) || J(y) || X(y) || dt(y) || qt(y);
  }
  t.isBoxedPrimitive = St;
  function st(y) {
    return typeof Uint8Array < "u" && (P(y) || u(y));
  }
  t.isAnyArrayBuffer = st, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(y) {
    Object.defineProperty(t, y, {
      enumerable: !1,
      value: function() {
        throw new Error(y + " is not supported in userland");
      }
    });
  });
})(Fr);
var Xo = function(e) {
  return e && typeof e == "object" && typeof e.copy == "function" && typeof e.fill == "function" && typeof e.readUInt8 == "function";
}, ke = { exports: {} };
typeof Object.create == "function" ? ke.exports = function(e, n) {
  n && (e.super_ = n, e.prototype = Object.create(n.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : ke.exports = function(e, n) {
  if (n) {
    e.super_ = n;
    var f = function() {
    };
    f.prototype = n.prototype, e.prototype = new f(), e.prototype.constructor = e;
  }
};
var Zo = ke.exports;
(function(t) {
  var e = Object.getOwnPropertyDescriptors || function(c) {
    for (var r = Object.keys(c), i = {}, u = 0; u < r.length; u++)
      i[r[u]] = Object.getOwnPropertyDescriptor(c, r[u]);
    return i;
  }, n = /%[sdj%]/g;
  t.format = function(o) {
    if (!_(o)) {
      for (var c = [], r = 0; r < arguments.length; r++)
        c.push(A(arguments[r]));
      return c.join(" ");
    }
    for (var r = 1, i = arguments, u = i.length, d = String(o).replace(n, function(g) {
      if (g === "%%") return "%";
      if (r >= u) return g;
      switch (g) {
        case "%s":
          return String(i[r++]);
        case "%d":
          return Number(i[r++]);
        case "%j":
          try {
            return JSON.stringify(i[r++]);
          } catch {
            return "[Circular]";
          }
        default:
          return g;
      }
    }), p = i[r]; r < u; p = i[++r])
      b(p) || !U(p) ? d += " " + p : d += " " + A(p);
    return d;
  }, t.deprecate = function(o, c) {
    if (typeof ot < "u" && ot.noDeprecation === !0)
      return o;
    if (typeof ot > "u")
      return function() {
        return t.deprecate(o, c).apply(this, arguments);
      };
    var r = !1;
    function i() {
      if (!r) {
        if (ot.throwDeprecation)
          throw new Error(c);
        ot.traceDeprecation ? console.trace(c) : console.error(c), r = !0;
      }
      return o.apply(this, arguments);
    }
    return i;
  };
  var f = {}, l = /^$/;
  if (ot.env.NODE_DEBUG) {
    var w = ot.env.NODE_DEBUG;
    w = w.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), l = new RegExp("^" + w + "$", "i");
  }
  t.debuglog = function(o) {
    if (o = o.toUpperCase(), !f[o])
      if (l.test(o)) {
        var c = ot.pid;
        f[o] = function() {
          var r = t.format.apply(t, arguments);
          console.error("%s %d: %s", o, c, r);
        };
      } else
        f[o] = function() {
        };
    return f[o];
  };
  function A(o, c) {
    var r = {
      seen: [],
      stylize: R
    };
    return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), C(c) ? r.showHidden = c : c && t._extend(r, c), T(r.showHidden) && (r.showHidden = !1), T(r.depth) && (r.depth = 2), T(r.colors) && (r.colors = !1), T(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = B), D(r, o, r.depth);
  }
  t.inspect = A, A.colors = {
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
  }, A.styles = {
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
  function B(o, c) {
    var r = A.styles[c];
    return r ? "\x1B[" + A.colors[r][0] + "m" + o + "\x1B[" + A.colors[r][1] + "m" : o;
  }
  function R(o, c) {
    return o;
  }
  function $(o) {
    var c = {};
    return o.forEach(function(r, i) {
      c[r] = !0;
    }), c;
  }
  function D(o, c, r) {
    if (o.customInspect && c && G(c.inspect) && // Filter out the util module, it's inspect function is special
    c.inspect !== t.inspect && // Also filter out any prototype objects using the circular check.
    !(c.constructor && c.constructor.prototype === c)) {
      var i = c.inspect(r, o);
      return _(i) || (i = D(o, i, r)), i;
    }
    var u = F(o, c);
    if (u)
      return u;
    var d = Object.keys(c), p = $(d);
    if (o.showHidden && (d = Object.getOwnPropertyNames(c)), Z(c) && (d.indexOf("message") >= 0 || d.indexOf("description") >= 0))
      return E(c);
    if (d.length === 0) {
      if (G(c)) {
        var g = c.name ? ": " + c.name : "";
        return o.stylize("[Function" + g + "]", "special");
      }
      if (K(c))
        return o.stylize(RegExp.prototype.toString.call(c), "regexp");
      if (nt(c))
        return o.stylize(Date.prototype.toString.call(c), "date");
      if (Z(c))
        return E(c);
    }
    var S = "", M = !1, z = ["{", "}"];
    if (rt(c) && (M = !0, z = ["[", "]"]), G(c)) {
      var J = c.name ? ": " + c.name : "";
      S = " [Function" + J + "]";
    }
    if (K(c) && (S = " " + RegExp.prototype.toString.call(c)), nt(c) && (S = " " + Date.prototype.toUTCString.call(c)), Z(c) && (S = " " + E(c)), d.length === 0 && (!M || c.length == 0))
      return z[0] + S + z[1];
    if (r < 0)
      return K(c) ? o.stylize(RegExp.prototype.toString.call(c), "regexp") : o.stylize("[Object]", "special");
    o.seen.push(c);
    var X;
    return M ? X = q(o, c, r, p, d) : X = d.map(function(dt) {
      return x(o, c, r, p, dt, M);
    }), o.seen.pop(), Q(X, S, z);
  }
  function F(o, c) {
    if (T(c))
      return o.stylize("undefined", "undefined");
    if (_(c)) {
      var r = "'" + JSON.stringify(c).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return o.stylize(r, "string");
    }
    if (j(c))
      return o.stylize("" + c, "number");
    if (C(c))
      return o.stylize("" + c, "boolean");
    if (b(c))
      return o.stylize("null", "null");
  }
  function E(o) {
    return "[" + Error.prototype.toString.call(o) + "]";
  }
  function q(o, c, r, i, u) {
    for (var d = [], p = 0, g = c.length; p < g; ++p)
      ft(c, String(p)) ? d.push(x(
        o,
        c,
        r,
        i,
        String(p),
        !0
      )) : d.push("");
    return u.forEach(function(S) {
      S.match(/^\d+$/) || d.push(x(
        o,
        c,
        r,
        i,
        S,
        !0
      ));
    }), d;
  }
  function x(o, c, r, i, u, d) {
    var p, g, S;
    if (S = Object.getOwnPropertyDescriptor(c, u) || { value: c[u] }, S.get ? S.set ? g = o.stylize("[Getter/Setter]", "special") : g = o.stylize("[Getter]", "special") : S.set && (g = o.stylize("[Setter]", "special")), ft(i, u) || (p = "[" + u + "]"), g || (o.seen.indexOf(S.value) < 0 ? (b(r) ? g = D(o, S.value, null) : g = D(o, S.value, r - 1), g.indexOf(`
`) > -1 && (d ? g = g.split(`
`).map(function(M) {
      return "  " + M;
    }).join(`
`).slice(2) : g = `
` + g.split(`
`).map(function(M) {
      return "   " + M;
    }).join(`
`))) : g = o.stylize("[Circular]", "special")), T(p)) {
      if (d && u.match(/^\d+$/))
        return g;
      p = JSON.stringify("" + u), p.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (p = p.slice(1, -1), p = o.stylize(p, "name")) : (p = p.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), p = o.stylize(p, "string"));
    }
    return p + ": " + g;
  }
  function Q(o, c, r) {
    var i = o.reduce(function(u, d) {
      return d.indexOf(`
`) >= 0, u + d.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    return i > 60 ? r[0] + (c === "" ? "" : c + `
 `) + " " + o.join(`,
  `) + " " + r[1] : r[0] + c + " " + o.join(", ") + " " + r[1];
  }
  t.types = Fr;
  function rt(o) {
    return Array.isArray(o);
  }
  t.isArray = rt;
  function C(o) {
    return typeof o == "boolean";
  }
  t.isBoolean = C;
  function b(o) {
    return o === null;
  }
  t.isNull = b;
  function m(o) {
    return o == null;
  }
  t.isNullOrUndefined = m;
  function j(o) {
    return typeof o == "number";
  }
  t.isNumber = j;
  function _(o) {
    return typeof o == "string";
  }
  t.isString = _;
  function k(o) {
    return typeof o == "symbol";
  }
  t.isSymbol = k;
  function T(o) {
    return o === void 0;
  }
  t.isUndefined = T;
  function K(o) {
    return U(o) && ct(o) === "[object RegExp]";
  }
  t.isRegExp = K, t.types.isRegExp = K;
  function U(o) {
    return typeof o == "object" && o !== null;
  }
  t.isObject = U;
  function nt(o) {
    return U(o) && ct(o) === "[object Date]";
  }
  t.isDate = nt, t.types.isDate = nt;
  function Z(o) {
    return U(o) && (ct(o) === "[object Error]" || o instanceof Error);
  }
  t.isError = Z, t.types.isNativeError = Z;
  function G(o) {
    return typeof o == "function";
  }
  t.isFunction = G;
  function tt(o) {
    return o === null || typeof o == "boolean" || typeof o == "number" || typeof o == "string" || typeof o == "symbol" || // ES6 symbol
    typeof o > "u";
  }
  t.isPrimitive = tt, t.isBuffer = Xo;
  function ct(o) {
    return Object.prototype.toString.call(o);
  }
  function gt(o) {
    return o < 10 ? "0" + o.toString(10) : o.toString(10);
  }
  var at = [
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
  function bt() {
    var o = /* @__PURE__ */ new Date(), c = [
      gt(o.getHours()),
      gt(o.getMinutes()),
      gt(o.getSeconds())
    ].join(":");
    return [o.getDate(), at[o.getMonth()], c].join(" ");
  }
  t.log = function() {
    console.log("%s - %s", bt(), t.format.apply(t, arguments));
  }, t.inherits = Zo, t._extend = function(o, c) {
    if (!c || !U(c)) return o;
    for (var r = Object.keys(c), i = r.length; i--; )
      o[r[i]] = c[r[i]];
    return o;
  };
  function ft(o, c) {
    return Object.prototype.hasOwnProperty.call(o, c);
  }
  var h = typeof Symbol < "u" ? Symbol("util.promisify.custom") : void 0;
  t.promisify = function(c) {
    if (typeof c != "function")
      throw new TypeError('The "original" argument must be of type Function');
    if (h && c[h]) {
      var r = c[h];
      if (typeof r != "function")
        throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      return Object.defineProperty(r, h, {
        value: r,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), r;
    }
    function r() {
      for (var i, u, d = new Promise(function(S, M) {
        i = S, u = M;
      }), p = [], g = 0; g < arguments.length; g++)
        p.push(arguments[g]);
      p.push(function(S, M) {
        S ? u(S) : i(M);
      });
      try {
        c.apply(this, p);
      } catch (S) {
        u(S);
      }
      return d;
    }
    return Object.setPrototypeOf(r, Object.getPrototypeOf(c)), h && Object.defineProperty(r, h, {
      value: r,
      enumerable: !1,
      writable: !1,
      configurable: !0
    }), Object.defineProperties(
      r,
      e(c)
    );
  }, t.promisify.custom = h;
  function v(o, c) {
    if (!o) {
      var r = new Error("Promise was rejected with a falsy value");
      r.reason = o, o = r;
    }
    return c(o);
  }
  function P(o) {
    if (typeof o != "function")
      throw new TypeError('The "original" argument must be of type Function');
    function c() {
      for (var r = [], i = 0; i < arguments.length; i++)
        r.push(arguments[i]);
      var u = r.pop();
      if (typeof u != "function")
        throw new TypeError("The last argument must be of type Function");
      var d = this, p = function() {
        return u.apply(d, arguments);
      };
      o.apply(this, r).then(
        function(g) {
          ot.nextTick(p.bind(null, null, g));
        },
        function(g) {
          ot.nextTick(v.bind(null, g, p));
        }
      );
    }
    return Object.setPrototypeOf(c, Object.getPrototypeOf(o)), Object.defineProperties(
      c,
      e(o)
    ), c;
  }
  t.callbackify = P;
})(Gt);
var gr;
function Xr() {
  if (gr) return ye;
  gr = 1;
  function t(b) {
    "@babel/helpers - typeof";
    return t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(m) {
      return typeof m;
    } : function(m) {
      return m && typeof Symbol == "function" && m.constructor === Symbol && m !== Symbol.prototype ? "symbol" : typeof m;
    }, t(b);
  }
  function e(b, m, j) {
    return Object.defineProperty(b, "prototype", { writable: !1 }), b;
  }
  function n(b, m) {
    if (!(b instanceof m))
      throw new TypeError("Cannot call a class as a function");
  }
  function f(b, m) {
    if (typeof m != "function" && m !== null)
      throw new TypeError("Super expression must either be null or a function");
    b.prototype = Object.create(m && m.prototype, { constructor: { value: b, writable: !0, configurable: !0 } }), Object.defineProperty(b, "prototype", { writable: !1 }), m && l(b, m);
  }
  function l(b, m) {
    return l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(_, k) {
      return _.__proto__ = k, _;
    }, l(b, m);
  }
  function w(b) {
    var m = R();
    return function() {
      var _ = $(b), k;
      if (m) {
        var T = $(this).constructor;
        k = Reflect.construct(_, arguments, T);
      } else
        k = _.apply(this, arguments);
      return A(this, k);
    };
  }
  function A(b, m) {
    if (m && (t(m) === "object" || typeof m == "function"))
      return m;
    if (m !== void 0)
      throw new TypeError("Derived constructors may only return object or undefined");
    return B(b);
  }
  function B(b) {
    if (b === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return b;
  }
  function R() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), !0;
    } catch {
      return !1;
    }
  }
  function $(b) {
    return $ = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(j) {
      return j.__proto__ || Object.getPrototypeOf(j);
    }, $(b);
  }
  var D = {}, F, E;
  function q(b, m, j) {
    j || (j = Error);
    function _(T, K, U) {
      return typeof m == "string" ? m : m(T, K, U);
    }
    var k = /* @__PURE__ */ function(T) {
      f(U, T);
      var K = w(U);
      function U(nt, Z, G) {
        var tt;
        return n(this, U), tt = K.call(this, _(nt, Z, G)), tt.code = b, tt;
      }
      return e(U);
    }(j);
    D[b] = k;
  }
  function x(b, m) {
    if (Array.isArray(b)) {
      var j = b.length;
      return b = b.map(function(_) {
        return String(_);
      }), j > 2 ? "one of ".concat(m, " ").concat(b.slice(0, j - 1).join(", "), ", or ") + b[j - 1] : j === 2 ? "one of ".concat(m, " ").concat(b[0], " or ").concat(b[1]) : "of ".concat(m, " ").concat(b[0]);
    } else
      return "of ".concat(m, " ").concat(String(b));
  }
  function Q(b, m, j) {
    return b.substr(0, m.length) === m;
  }
  function rt(b, m, j) {
    return (j === void 0 || j > b.length) && (j = b.length), b.substring(j - m.length, j) === m;
  }
  function C(b, m, j) {
    return typeof j != "number" && (j = 0), j + m.length > b.length ? !1 : b.indexOf(m, j) !== -1;
  }
  return q("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError), q("ERR_INVALID_ARG_TYPE", function(b, m, j) {
    F === void 0 && (F = ze()), F(typeof b == "string", "'name' must be a string");
    var _;
    typeof m == "string" && Q(m, "not ") ? (_ = "must not be", m = m.replace(/^not /, "")) : _ = "must be";
    var k;
    if (rt(b, " argument"))
      k = "The ".concat(b, " ").concat(_, " ").concat(x(m, "type"));
    else {
      var T = C(b, ".") ? "property" : "argument";
      k = 'The "'.concat(b, '" ').concat(T, " ").concat(_, " ").concat(x(m, "type"));
    }
    return k += ". Received type ".concat(t(j)), k;
  }, TypeError), q("ERR_INVALID_ARG_VALUE", function(b, m) {
    var j = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "is invalid";
    E === void 0 && (E = Gt);
    var _ = E.inspect(m);
    return _.length > 128 && (_ = "".concat(_.slice(0, 128), "...")), "The argument '".concat(b, "' ").concat(j, ". Received ").concat(_);
  }, TypeError), q("ERR_INVALID_RETURN_VALUE", function(b, m, j) {
    var _;
    return j && j.constructor && j.constructor.name ? _ = "instance of ".concat(j.constructor.name) : _ = "type ".concat(t(j)), "Expected ".concat(b, ' to be returned from the "').concat(m, '"') + " function but got ".concat(_, ".");
  }, TypeError), q("ERR_MISSING_ARGS", function() {
    for (var b = arguments.length, m = new Array(b), j = 0; j < b; j++)
      m[j] = arguments[j];
    F === void 0 && (F = ze()), F(m.length > 0, "At least one arg needs to be specified");
    var _ = "The ", k = m.length;
    switch (m = m.map(function(T) {
      return '"'.concat(T, '"');
    }), k) {
      case 1:
        _ += "".concat(m[0], " argument");
        break;
      case 2:
        _ += "".concat(m[0], " and ").concat(m[1], " arguments");
        break;
      default:
        _ += m.slice(0, k - 1).join(", "), _ += ", and ".concat(m[k - 1], " arguments");
        break;
    }
    return "".concat(_, " must be specified");
  }, TypeError), ye.codes = D, ye;
}
var Ae, dr;
function ti() {
  if (dr) return Ae;
  dr = 1;
  function t(h, v) {
    var P = Object.keys(h);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(h);
      v && (o = o.filter(function(c) {
        return Object.getOwnPropertyDescriptor(h, c).enumerable;
      })), P.push.apply(P, o);
    }
    return P;
  }
  function e(h) {
    for (var v = 1; v < arguments.length; v++) {
      var P = arguments[v] != null ? arguments[v] : {};
      v % 2 ? t(Object(P), !0).forEach(function(o) {
        n(h, o, P[o]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(h, Object.getOwnPropertyDescriptors(P)) : t(Object(P)).forEach(function(o) {
        Object.defineProperty(h, o, Object.getOwnPropertyDescriptor(P, o));
      });
    }
    return h;
  }
  function n(h, v, P) {
    return v = A(v), v in h ? Object.defineProperty(h, v, { value: P, enumerable: !0, configurable: !0, writable: !0 }) : h[v] = P, h;
  }
  function f(h, v) {
    if (!(h instanceof v))
      throw new TypeError("Cannot call a class as a function");
  }
  function l(h, v) {
    for (var P = 0; P < v.length; P++) {
      var o = v[P];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(h, A(o.key), o);
    }
  }
  function w(h, v, P) {
    return v && l(h.prototype, v), Object.defineProperty(h, "prototype", { writable: !1 }), h;
  }
  function A(h) {
    var v = B(h, "string");
    return b(v) === "symbol" ? v : String(v);
  }
  function B(h, v) {
    if (b(h) !== "object" || h === null) return h;
    var P = h[Symbol.toPrimitive];
    if (P !== void 0) {
      var o = P.call(h, v || "default");
      if (b(o) !== "object") return o;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (v === "string" ? String : Number)(h);
  }
  function R(h, v) {
    if (typeof v != "function" && v !== null)
      throw new TypeError("Super expression must either be null or a function");
    h.prototype = Object.create(v && v.prototype, { constructor: { value: h, writable: !0, configurable: !0 } }), Object.defineProperty(h, "prototype", { writable: !1 }), v && rt(h, v);
  }
  function $(h) {
    var v = x();
    return function() {
      var o = C(h), c;
      if (v) {
        var r = C(this).constructor;
        c = Reflect.construct(o, arguments, r);
      } else
        c = o.apply(this, arguments);
      return D(this, c);
    };
  }
  function D(h, v) {
    if (v && (b(v) === "object" || typeof v == "function"))
      return v;
    if (v !== void 0)
      throw new TypeError("Derived constructors may only return object or undefined");
    return F(h);
  }
  function F(h) {
    if (h === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return h;
  }
  function E(h) {
    var v = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
    return E = function(o) {
      if (o === null || !Q(o)) return o;
      if (typeof o != "function")
        throw new TypeError("Super expression must either be null or a function");
      if (typeof v < "u") {
        if (v.has(o)) return v.get(o);
        v.set(o, c);
      }
      function c() {
        return q(o, arguments, C(this).constructor);
      }
      return c.prototype = Object.create(o.prototype, { constructor: { value: c, enumerable: !1, writable: !0, configurable: !0 } }), rt(c, o);
    }, E(h);
  }
  function q(h, v, P) {
    return x() ? q = Reflect.construct.bind() : q = function(c, r, i) {
      var u = [null];
      u.push.apply(u, r);
      var d = Function.bind.apply(c, u), p = new d();
      return i && rt(p, i.prototype), p;
    }, q.apply(null, arguments);
  }
  function x() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), !0;
    } catch {
      return !1;
    }
  }
  function Q(h) {
    return Function.toString.call(h).indexOf("[native code]") !== -1;
  }
  function rt(h, v) {
    return rt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, c) {
      return o.__proto__ = c, o;
    }, rt(h, v);
  }
  function C(h) {
    return C = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(P) {
      return P.__proto__ || Object.getPrototypeOf(P);
    }, C(h);
  }
  function b(h) {
    "@babel/helpers - typeof";
    return b = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(v) {
      return typeof v;
    } : function(v) {
      return v && typeof Symbol == "function" && v.constructor === Symbol && v !== Symbol.prototype ? "symbol" : typeof v;
    }, b(h);
  }
  var m = Gt, j = m.inspect, _ = Xr(), k = _.codes.ERR_INVALID_ARG_TYPE;
  function T(h, v, P) {
    return (P === void 0 || P > h.length) && (P = h.length), h.substring(P - v.length, P) === v;
  }
  function K(h, v) {
    if (v = Math.floor(v), h.length == 0 || v == 0) return "";
    var P = h.length * v;
    for (v = Math.floor(Math.log(v) / Math.log(2)); v; )
      h += h, v--;
    return h += h.substring(0, P - h.length), h;
  }
  var U = "", nt = "", Z = "", G = "", tt = {
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
  }, ct = 10;
  function gt(h) {
    var v = Object.keys(h), P = Object.create(Object.getPrototypeOf(h));
    return v.forEach(function(o) {
      P[o] = h[o];
    }), Object.defineProperty(P, "message", {
      value: h.message
    }), P;
  }
  function at(h) {
    return j(h, {
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
  function bt(h, v, P) {
    var o = "", c = "", r = 0, i = "", u = !1, d = at(h), p = d.split(`
`), g = at(v).split(`
`), S = 0, M = "";
    if (P === "strictEqual" && b(h) === "object" && b(v) === "object" && h !== null && v !== null && (P = "strictEqualObject"), p.length === 1 && g.length === 1 && p[0] !== g[0]) {
      var z = p[0].length + g[0].length;
      if (z <= ct) {
        if ((b(h) !== "object" || h === null) && (b(v) !== "object" || v === null) && (h !== 0 || v !== 0))
          return "".concat(tt[P], `

`) + "".concat(p[0], " !== ").concat(g[0], `
`);
      } else if (P !== "strictEqualObject") {
        var J = ot.stderr && ot.stderr.isTTY ? ot.stderr.columns : 80;
        if (z < J) {
          for (; p[0][S] === g[0][S]; )
            S++;
          S > 2 && (M = `
  `.concat(K(" ", S), "^"), S = 0);
        }
      }
    }
    for (var X = p[p.length - 1], dt = g[g.length - 1]; X === dt && (S++ < 2 ? i = `
  `.concat(X).concat(i) : o = X, p.pop(), g.pop(), !(p.length === 0 || g.length === 0)); )
      X = p[p.length - 1], dt = g[g.length - 1];
    var qt = Math.max(p.length, g.length);
    if (qt === 0) {
      var St = d.split(`
`);
      if (St.length > 30)
        for (St[26] = "".concat(U, "...").concat(G); St.length > 27; )
          St.pop();
      return "".concat(tt.notIdentical, `

`).concat(St.join(`
`), `
`);
    }
    S > 3 && (i = `
`.concat(U, "...").concat(G).concat(i), u = !0), o !== "" && (i = `
  `.concat(o).concat(i), o = "");
    var st = 0, y = tt[P] + `
`.concat(nt, "+ actual").concat(G, " ").concat(Z, "- expected").concat(G), Dt = " ".concat(U, "...").concat(G, " Lines skipped");
    for (S = 0; S < qt; S++) {
      var pt = S - r;
      if (p.length < S + 1)
        pt > 1 && S > 2 && (pt > 4 ? (c += `
`.concat(U, "...").concat(G), u = !0) : pt > 3 && (c += `
  `.concat(g[S - 2]), st++), c += `
  `.concat(g[S - 1]), st++), r = S, o += `
`.concat(Z, "-").concat(G, " ").concat(g[S]), st++;
      else if (g.length < S + 1)
        pt > 1 && S > 2 && (pt > 4 ? (c += `
`.concat(U, "...").concat(G), u = !0) : pt > 3 && (c += `
  `.concat(p[S - 2]), st++), c += `
  `.concat(p[S - 1]), st++), r = S, c += `
`.concat(nt, "+").concat(G, " ").concat(p[S]), st++;
      else {
        var It = g[S], Ot = p[S], a = Ot !== It && (!T(Ot, ",") || Ot.slice(0, -1) !== It);
        a && T(It, ",") && It.slice(0, -1) === Ot && (a = !1, Ot += ","), a ? (pt > 1 && S > 2 && (pt > 4 ? (c += `
`.concat(U, "...").concat(G), u = !0) : pt > 3 && (c += `
  `.concat(p[S - 2]), st++), c += `
  `.concat(p[S - 1]), st++), r = S, c += `
`.concat(nt, "+").concat(G, " ").concat(Ot), o += `
`.concat(Z, "-").concat(G, " ").concat(It), st += 2) : (c += o, o = "", (pt === 1 || S === 0) && (c += `
  `.concat(Ot), st++));
      }
      if (st > 20 && S < qt - 2)
        return "".concat(y).concat(Dt, `
`).concat(c, `
`).concat(U, "...").concat(G).concat(o, `
`) + "".concat(U, "...").concat(G);
    }
    return "".concat(y).concat(u ? Dt : "", `
`).concat(c).concat(o).concat(i).concat(M);
  }
  var ft = /* @__PURE__ */ function(h, v) {
    R(o, h);
    var P = $(o);
    function o(c) {
      var r;
      if (f(this, o), b(c) !== "object" || c === null)
        throw new k("options", "Object", c);
      var i = c.message, u = c.operator, d = c.stackStartFn, p = c.actual, g = c.expected, S = Error.stackTraceLimit;
      if (Error.stackTraceLimit = 0, i != null)
        r = P.call(this, String(i));
      else if (ot.stderr && ot.stderr.isTTY && (ot.stderr && ot.stderr.getColorDepth && ot.stderr.getColorDepth() !== 1 ? (U = "\x1B[34m", nt = "\x1B[32m", G = "\x1B[39m", Z = "\x1B[31m") : (U = "", nt = "", G = "", Z = "")), b(p) === "object" && p !== null && b(g) === "object" && g !== null && "stack" in p && p instanceof Error && "stack" in g && g instanceof Error && (p = gt(p), g = gt(g)), u === "deepStrictEqual" || u === "strictEqual")
        r = P.call(this, bt(p, g, u));
      else if (u === "notDeepStrictEqual" || u === "notStrictEqual") {
        var M = tt[u], z = at(p).split(`
`);
        if (u === "notStrictEqual" && b(p) === "object" && p !== null && (M = tt.notStrictEqualObject), z.length > 30)
          for (z[26] = "".concat(U, "...").concat(G); z.length > 27; )
            z.pop();
        z.length === 1 ? r = P.call(this, "".concat(M, " ").concat(z[0])) : r = P.call(this, "".concat(M, `

`).concat(z.join(`
`), `
`));
      } else {
        var J = at(p), X = "", dt = tt[u];
        u === "notDeepEqual" || u === "notEqual" ? (J = "".concat(tt[u], `

`).concat(J), J.length > 1024 && (J = "".concat(J.slice(0, 1021), "..."))) : (X = "".concat(at(g)), J.length > 512 && (J = "".concat(J.slice(0, 509), "...")), X.length > 512 && (X = "".concat(X.slice(0, 509), "...")), u === "deepEqual" || u === "equal" ? J = "".concat(dt, `

`).concat(J, `

should equal

`) : X = " ".concat(u, " ").concat(X)), r = P.call(this, "".concat(J).concat(X));
      }
      return Error.stackTraceLimit = S, r.generatedMessage = !i, Object.defineProperty(F(r), "name", {
        value: "AssertionError [ERR_ASSERTION]",
        enumerable: !1,
        writable: !0,
        configurable: !0
      }), r.code = "ERR_ASSERTION", r.actual = p, r.expected = g, r.operator = u, Error.captureStackTrace && Error.captureStackTrace(F(r), d), r.stack, r.name = "AssertionError", D(r);
    }
    return w(o, [{
      key: "toString",
      value: function() {
        return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
      }
    }, {
      key: v,
      value: function(r, i) {
        return j(this, e(e({}, i), {}, {
          customInspect: !1,
          depth: 0
        }));
      }
    }]), o;
  }(/* @__PURE__ */ E(Error), j.custom);
  return Ae = ft, Ae;
}
var hr = Object.prototype.toString, Zr = function(e) {
  var n = hr.call(e), f = n === "[object Arguments]";
  return f || (f = n !== "[object Array]" && e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && hr.call(e.callee) === "[object Function]"), f;
}, Ee, br;
function ei() {
  if (br) return Ee;
  br = 1;
  var t;
  if (!Object.keys) {
    var e = Object.prototype.hasOwnProperty, n = Object.prototype.toString, f = Zr, l = Object.prototype.propertyIsEnumerable, w = !l.call({ toString: null }, "toString"), A = l.call(function() {
    }, "prototype"), B = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"
    ], R = function(E) {
      var q = E.constructor;
      return q && q.prototype === E;
    }, $ = {
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
    }, D = function() {
      if (typeof window > "u")
        return !1;
      for (var E in window)
        try {
          if (!$["$" + E] && e.call(window, E) && window[E] !== null && typeof window[E] == "object")
            try {
              R(window[E]);
            } catch {
              return !0;
            }
        } catch {
          return !0;
        }
      return !1;
    }(), F = function(E) {
      if (typeof window > "u" || !D)
        return R(E);
      try {
        return R(E);
      } catch {
        return !1;
      }
    };
    t = function(q) {
      var x = q !== null && typeof q == "object", Q = n.call(q) === "[object Function]", rt = f(q), C = x && n.call(q) === "[object String]", b = [];
      if (!x && !Q && !rt)
        throw new TypeError("Object.keys called on a non-object");
      var m = A && Q;
      if (C && q.length > 0 && !e.call(q, 0))
        for (var j = 0; j < q.length; ++j)
          b.push(String(j));
      if (rt && q.length > 0)
        for (var _ = 0; _ < q.length; ++_)
          b.push(String(_));
      else
        for (var k in q)
          !(m && k === "prototype") && e.call(q, k) && b.push(String(k));
      if (w)
        for (var T = F(q), K = 0; K < B.length; ++K)
          !(T && B[K] === "constructor") && e.call(q, B[K]) && b.push(B[K]);
      return b;
    };
  }
  return Ee = t, Ee;
}
var ri = Array.prototype.slice, ni = Zr, vr = Object.keys, Zt = vr ? function(e) {
  return vr(e);
} : ei(), mr = Object.keys;
Zt.shim = function() {
  if (Object.keys) {
    var e = function() {
      var n = Object.keys(arguments);
      return n && n.length === arguments.length;
    }(1, 2);
    e || (Object.keys = function(f) {
      return ni(f) ? mr(ri.call(f)) : mr(f);
    });
  } else
    Object.keys = Zt;
  return Object.keys || Zt;
};
var tn = Zt, oi = tn, en = He(), rn = fe, wr = Object, ii = rn("Array.prototype.push"), Sr = rn("Object.prototype.propertyIsEnumerable"), ai = en ? Object.getOwnPropertySymbols : null, ui = function(e, n) {
  if (e == null)
    throw new TypeError("target must be an object");
  var f = wr(e);
  if (arguments.length === 1)
    return f;
  for (var l = 1; l < arguments.length; ++l) {
    var w = wr(arguments[l]), A = oi(w), B = en && (Object.getOwnPropertySymbols || ai);
    if (B)
      for (var R = B(w), $ = 0; $ < R.length; ++$) {
        var D = R[$];
        Sr(w, D) && ii(A, D);
      }
    for (var F = 0; F < A.length; ++F) {
      var E = A[F];
      if (Sr(w, E)) {
        var q = w[E];
        f[E] = q;
      }
    }
  }
  return f;
}, je = ui, fi = function() {
  if (!Object.assign)
    return !1;
  for (var t = "abcdefghijklmnopqrst", e = t.split(""), n = {}, f = 0; f < e.length; ++f)
    n[e[f]] = e[f];
  var l = Object.assign({}, n), w = "";
  for (var A in l)
    w += A;
  return t !== w;
}, ci = function() {
  if (!Object.assign || !Object.preventExtensions)
    return !1;
  var t = Object.preventExtensions({ 1: 2 });
  try {
    Object.assign(t, "xy");
  } catch {
    return t[1] === "y";
  }
  return !1;
}, si = function() {
  return !Object.assign || fi() || ci() ? je : Object.assign;
}, Or = function(t) {
  return t !== t;
}, nn = function(e, n) {
  return e === 0 && n === 0 ? 1 / e === 1 / n : !!(e === n || Or(e) && Or(n));
}, li = nn, tr = function() {
  return typeof Object.is == "function" ? Object.is : li;
}, Pe, Ar;
function se() {
  if (Ar) return Pe;
  Ar = 1;
  var t = tn, e = typeof Symbol == "function" && typeof Symbol("foo") == "symbol", n = Object.prototype.toString, f = Array.prototype.concat, l = Gr, w = function($) {
    return typeof $ == "function" && n.call($) === "[object Function]";
  }, A = Cr(), B = function($, D, F, E) {
    if (D in $) {
      if (E === !0) {
        if ($[D] === F)
          return;
      } else if (!w(E) || !E())
        return;
    }
    A ? l($, D, F, !0) : l($, D, F);
  }, R = function($, D) {
    var F = arguments.length > 2 ? arguments[2] : {}, E = t(D);
    e && (E = f.call(E, Object.getOwnPropertySymbols(D)));
    for (var q = 0; q < E.length; q += 1)
      B($, E[q], D[E[q]], F[E[q]]);
  };
  return R.supportsDescriptors = !!A, Pe = R, Pe;
}
var qe, Er;
function pi() {
  if (Er) return qe;
  Er = 1;
  var t = tr, e = se();
  return qe = function() {
    var f = t();
    return e(Object, { is: f }, {
      is: function() {
        return Object.is !== f;
      }
    }), f;
  }, qe;
}
var Ie, jr;
function yi() {
  if (jr) return Ie;
  jr = 1;
  var t = se(), e = ue, n = nn, f = tr, l = pi(), w = e(f(), Object);
  return t(w, {
    getPolyfill: f,
    implementation: n,
    shim: l
  }), Ie = w, Ie;
}
var Te, Pr;
function on() {
  return Pr || (Pr = 1, Te = function(e) {
    return e !== e;
  }), Te;
}
var Re, qr;
function an() {
  if (qr) return Re;
  qr = 1;
  var t = on();
  return Re = function() {
    return Number.isNaN && Number.isNaN(NaN) && !Number.isNaN("a") ? Number.isNaN : t;
  }, Re;
}
var Ne, Ir;
function gi() {
  if (Ir) return Ne;
  Ir = 1;
  var t = se(), e = an();
  return Ne = function() {
    var f = e();
    return t(Number, { isNaN: f }, {
      isNaN: function() {
        return Number.isNaN !== f;
      }
    }), f;
  }, Ne;
}
var _e, Tr;
function di() {
  if (Tr) return _e;
  Tr = 1;
  var t = ue, e = se(), n = on(), f = an(), l = gi(), w = t(f(), Number);
  return e(w, {
    getPolyfill: f,
    implementation: n,
    shim: l
  }), _e = w, _e;
}
var De, Rr;
function hi() {
  if (Rr) return De;
  Rr = 1;
  function t(a, s) {
    return w(a) || l(a, s) || n(a, s) || e();
  }
  function e() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function n(a, s) {
    if (a) {
      if (typeof a == "string") return f(a, s);
      var O = Object.prototype.toString.call(a).slice(8, -1);
      if (O === "Object" && a.constructor && (O = a.constructor.name), O === "Map" || O === "Set") return Array.from(a);
      if (O === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(O)) return f(a, s);
    }
  }
  function f(a, s) {
    (s == null || s > a.length) && (s = a.length);
    for (var O = 0, I = new Array(s); O < s; O++) I[O] = a[O];
    return I;
  }
  function l(a, s) {
    var O = a == null ? null : typeof Symbol < "u" && a[Symbol.iterator] || a["@@iterator"];
    if (O != null) {
      var I, N, W, V, H = [], Y = !0, ut = !1;
      try {
        if (W = (O = O.call(a)).next, s !== 0) for (; !(Y = (I = W.call(O)).done) && (H.push(I.value), H.length !== s); Y = !0) ;
      } catch (lt) {
        ut = !0, N = lt;
      } finally {
        try {
          if (!Y && O.return != null && (V = O.return(), Object(V) !== V)) return;
        } finally {
          if (ut) throw N;
        }
      }
      return H;
    }
  }
  function w(a) {
    if (Array.isArray(a)) return a;
  }
  function A(a) {
    "@babel/helpers - typeof";
    return A = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(s) {
      return typeof s;
    } : function(s) {
      return s && typeof Symbol == "function" && s.constructor === Symbol && s !== Symbol.prototype ? "symbol" : typeof s;
    }, A(a);
  }
  var B = /a/g.flags !== void 0, R = function(s) {
    var O = [];
    return s.forEach(function(I) {
      return O.push(I);
    }), O;
  }, $ = function(s) {
    var O = [];
    return s.forEach(function(I, N) {
      return O.push([N, I]);
    }), O;
  }, D = Object.is ? Object.is : yi(), F = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function() {
    return [];
  }, E = Number.isNaN ? Number.isNaN : di();
  function q(a) {
    return a.call.bind(a);
  }
  var x = q(Object.prototype.hasOwnProperty), Q = q(Object.prototype.propertyIsEnumerable), rt = q(Object.prototype.toString), C = Gt.types, b = C.isAnyArrayBuffer, m = C.isArrayBufferView, j = C.isDate, _ = C.isMap, k = C.isRegExp, T = C.isSet, K = C.isNativeError, U = C.isBoxedPrimitive, nt = C.isNumberObject, Z = C.isStringObject, G = C.isBooleanObject, tt = C.isBigIntObject, ct = C.isSymbolObject, gt = C.isFloat32Array, at = C.isFloat64Array;
  function bt(a) {
    if (a.length === 0 || a.length > 10) return !0;
    for (var s = 0; s < a.length; s++) {
      var O = a.charCodeAt(s);
      if (O < 48 || O > 57) return !0;
    }
    return a.length === 10 && a >= Math.pow(2, 32);
  }
  function ft(a) {
    return Object.keys(a).filter(bt).concat(F(a).filter(Object.prototype.propertyIsEnumerable.bind(a)));
  }
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   */
  function h(a, s) {
    if (a === s)
      return 0;
    for (var O = a.length, I = s.length, N = 0, W = Math.min(O, I); N < W; ++N)
      if (a[N] !== s[N]) {
        O = a[N], I = s[N];
        break;
      }
    return O < I ? -1 : I < O ? 1 : 0;
  }
  var v = !0, P = !1, o = 0, c = 1, r = 2, i = 3;
  function u(a, s) {
    return B ? a.source === s.source && a.flags === s.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(s);
  }
  function d(a, s) {
    if (a.byteLength !== s.byteLength)
      return !1;
    for (var O = 0; O < a.byteLength; O++)
      if (a[O] !== s[O])
        return !1;
    return !0;
  }
  function p(a, s) {
    return a.byteLength !== s.byteLength ? !1 : h(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(s.buffer, s.byteOffset, s.byteLength)) === 0;
  }
  function g(a, s) {
    return a.byteLength === s.byteLength && h(new Uint8Array(a), new Uint8Array(s)) === 0;
  }
  function S(a, s) {
    return nt(a) ? nt(s) && D(Number.prototype.valueOf.call(a), Number.prototype.valueOf.call(s)) : Z(a) ? Z(s) && String.prototype.valueOf.call(a) === String.prototype.valueOf.call(s) : G(a) ? G(s) && Boolean.prototype.valueOf.call(a) === Boolean.prototype.valueOf.call(s) : tt(a) ? tt(s) && BigInt.prototype.valueOf.call(a) === BigInt.prototype.valueOf.call(s) : ct(s) && Symbol.prototype.valueOf.call(a) === Symbol.prototype.valueOf.call(s);
  }
  function M(a, s, O, I) {
    if (a === s)
      return a !== 0 ? !0 : O ? D(a, s) : !0;
    if (O) {
      if (A(a) !== "object")
        return typeof a == "number" && E(a) && E(s);
      if (A(s) !== "object" || a === null || s === null || Object.getPrototypeOf(a) !== Object.getPrototypeOf(s))
        return !1;
    } else {
      if (a === null || A(a) !== "object")
        return s === null || A(s) !== "object" ? a == s : !1;
      if (s === null || A(s) !== "object")
        return !1;
    }
    var N = rt(a), W = rt(s);
    if (N !== W)
      return !1;
    if (Array.isArray(a)) {
      if (a.length !== s.length)
        return !1;
      var V = ft(a), H = ft(s);
      return V.length !== H.length ? !1 : J(a, s, O, I, c, V);
    }
    if (N === "[object Object]" && (!_(a) && _(s) || !T(a) && T(s)))
      return !1;
    if (j(a)) {
      if (!j(s) || Date.prototype.getTime.call(a) !== Date.prototype.getTime.call(s))
        return !1;
    } else if (k(a)) {
      if (!k(s) || !u(a, s))
        return !1;
    } else if (K(a) || a instanceof Error) {
      if (a.message !== s.message || a.name !== s.name)
        return !1;
    } else if (m(a)) {
      if (!O && (gt(a) || at(a))) {
        if (!d(a, s))
          return !1;
      } else if (!p(a, s))
        return !1;
      var Y = ft(a), ut = ft(s);
      return Y.length !== ut.length ? !1 : J(a, s, O, I, o, Y);
    } else {
      if (T(a))
        return !T(s) || a.size !== s.size ? !1 : J(a, s, O, I, r);
      if (_(a))
        return !_(s) || a.size !== s.size ? !1 : J(a, s, O, I, i);
      if (b(a)) {
        if (!g(a, s))
          return !1;
      } else if (U(a) && !S(a, s))
        return !1;
    }
    return J(a, s, O, I, o);
  }
  function z(a, s) {
    return s.filter(function(O) {
      return Q(a, O);
    });
  }
  function J(a, s, O, I, N, W) {
    if (arguments.length === 5) {
      W = Object.keys(a);
      var V = Object.keys(s);
      if (W.length !== V.length)
        return !1;
    }
    for (var H = 0; H < W.length; H++)
      if (!x(s, W[H]))
        return !1;
    if (O && arguments.length === 5) {
      var Y = F(a);
      if (Y.length !== 0) {
        var ut = 0;
        for (H = 0; H < Y.length; H++) {
          var lt = Y[H];
          if (Q(a, lt)) {
            if (!Q(s, lt))
              return !1;
            W.push(lt), ut++;
          } else if (Q(s, lt))
            return !1;
        }
        var Ct = F(s);
        if (Y.length !== Ct.length && z(s, Ct).length !== ut)
          return !1;
      } else {
        var $t = F(s);
        if ($t.length !== 0 && z(s, $t).length !== 0)
          return !1;
      }
    }
    if (W.length === 0 && (N === o || N === c && a.length === 0 || a.size === 0))
      return !0;
    if (I === void 0)
      I = {
        val1: /* @__PURE__ */ new Map(),
        val2: /* @__PURE__ */ new Map(),
        position: 0
      };
    else {
      var kt = I.val1.get(a);
      if (kt !== void 0) {
        var At = I.val2.get(s);
        if (At !== void 0)
          return kt === At;
      }
      I.position++;
    }
    I.val1.set(a, I.position), I.val2.set(s, I.position);
    var zt = pt(a, s, O, W, I, N);
    return I.val1.delete(a), I.val2.delete(s), zt;
  }
  function X(a, s, O, I) {
    for (var N = R(a), W = 0; W < N.length; W++) {
      var V = N[W];
      if (M(s, V, O, I))
        return a.delete(V), !0;
    }
    return !1;
  }
  function dt(a) {
    switch (A(a)) {
      case "undefined":
        return null;
      case "object":
        return;
      case "symbol":
        return !1;
      case "string":
        a = +a;
      case "number":
        if (E(a))
          return !1;
    }
    return !0;
  }
  function qt(a, s, O) {
    var I = dt(O);
    return I ?? (s.has(I) && !a.has(I));
  }
  function St(a, s, O, I, N) {
    var W = dt(O);
    if (W != null)
      return W;
    var V = s.get(W);
    return V === void 0 && !s.has(W) || !M(I, V, !1, N) ? !1 : !a.has(W) && M(I, V, !1, N);
  }
  function st(a, s, O, I) {
    for (var N = null, W = R(a), V = 0; V < W.length; V++) {
      var H = W[V];
      if (A(H) === "object" && H !== null)
        N === null && (N = /* @__PURE__ */ new Set()), N.add(H);
      else if (!s.has(H)) {
        if (O || !qt(a, s, H))
          return !1;
        N === null && (N = /* @__PURE__ */ new Set()), N.add(H);
      }
    }
    if (N !== null) {
      for (var Y = R(s), ut = 0; ut < Y.length; ut++) {
        var lt = Y[ut];
        if (A(lt) === "object" && lt !== null) {
          if (!X(N, lt, O, I)) return !1;
        } else if (!O && !a.has(lt) && !X(N, lt, O, I))
          return !1;
      }
      return N.size === 0;
    }
    return !0;
  }
  function y(a, s, O, I, N, W) {
    for (var V = R(a), H = 0; H < V.length; H++) {
      var Y = V[H];
      if (M(O, Y, N, W) && M(I, s.get(Y), N, W))
        return a.delete(Y), !0;
    }
    return !1;
  }
  function Dt(a, s, O, I) {
    for (var N = null, W = $(a), V = 0; V < W.length; V++) {
      var H = t(W[V], 2), Y = H[0], ut = H[1];
      if (A(Y) === "object" && Y !== null)
        N === null && (N = /* @__PURE__ */ new Set()), N.add(Y);
      else {
        var lt = s.get(Y);
        if (lt === void 0 && !s.has(Y) || !M(ut, lt, O, I)) {
          if (O || !St(a, s, Y, ut, I)) return !1;
          N === null && (N = /* @__PURE__ */ new Set()), N.add(Y);
        }
      }
    }
    if (N !== null) {
      for (var Ct = $(s), $t = 0; $t < Ct.length; $t++) {
        var kt = t(Ct[$t], 2), At = kt[0], zt = kt[1];
        if (A(At) === "object" && At !== null) {
          if (!y(N, a, At, zt, O, I)) return !1;
        } else if (!O && (!a.has(At) || !M(a.get(At), zt, !1, I)) && !y(N, a, At, zt, !1, I))
          return !1;
      }
      return N.size === 0;
    }
    return !0;
  }
  function pt(a, s, O, I, N, W) {
    var V = 0;
    if (W === r) {
      if (!st(a, s, O, N))
        return !1;
    } else if (W === i) {
      if (!Dt(a, s, O, N))
        return !1;
    } else if (W === c)
      for (; V < a.length; V++)
        if (x(a, V)) {
          if (!x(s, V) || !M(a[V], s[V], O, N))
            return !1;
        } else {
          if (x(s, V))
            return !1;
          for (var H = Object.keys(a); V < H.length; V++) {
            var Y = H[V];
            if (!x(s, Y) || !M(a[Y], s[Y], O, N))
              return !1;
          }
          return H.length === Object.keys(s).length;
        }
    for (V = 0; V < I.length; V++) {
      var ut = I[V];
      if (!M(a[ut], s[ut], O, N))
        return !1;
    }
    return !0;
  }
  function It(a, s) {
    return M(a, s, P);
  }
  function Ot(a, s) {
    return M(a, s, v);
  }
  return De = {
    isDeepEqual: It,
    isDeepStrictEqual: Ot
  }, De;
}
var Nr;
function ze() {
  if (Nr) return pe.exports;
  Nr = 1;
  function t(r) {
    "@babel/helpers - typeof";
    return t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(i) {
      return typeof i;
    } : function(i) {
      return i && typeof Symbol == "function" && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i;
    }, t(r);
  }
  function e(r, i, u) {
    return Object.defineProperty(r, "prototype", { writable: !1 }), r;
  }
  function n(r, i) {
    if (!(r instanceof i))
      throw new TypeError("Cannot call a class as a function");
  }
  var f = Xr(), l = f.codes, w = l.ERR_AMBIGUOUS_ARGUMENT, A = l.ERR_INVALID_ARG_TYPE, B = l.ERR_INVALID_ARG_VALUE, R = l.ERR_INVALID_RETURN_VALUE, $ = l.ERR_MISSING_ARGS, D = ti(), F = Gt, E = F.inspect, q = Gt.types, x = q.isPromise, Q = q.isRegExp, rt = si(), C = tr(), b = fe("RegExp.prototype.test"), m, j;
  function _() {
    var r = hi();
    m = r.isDeepEqual, j = r.isDeepStrictEqual;
  }
  var k = !1, T = pe.exports = G, K = {};
  function U(r) {
    throw r.message instanceof Error ? r.message : new D(r);
  }
  function nt(r, i, u, d, p) {
    var g = arguments.length, S;
    if (g === 0)
      S = "Failed";
    else if (g === 1)
      u = r, r = void 0;
    else {
      if (k === !1) {
        k = !0;
        var M = ot.emitWarning ? ot.emitWarning : console.warn.bind(console);
        M("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094");
      }
      g === 2 && (d = "!=");
    }
    if (u instanceof Error) throw u;
    var z = {
      actual: r,
      expected: i,
      operator: d === void 0 ? "fail" : d,
      stackStartFn: p || nt
    };
    u !== void 0 && (z.message = u);
    var J = new D(z);
    throw S && (J.message = S, J.generatedMessage = !0), J;
  }
  T.fail = nt, T.AssertionError = D;
  function Z(r, i, u, d) {
    if (!u) {
      var p = !1;
      if (i === 0)
        p = !0, d = "No value argument passed to `assert.ok()`";
      else if (d instanceof Error)
        throw d;
      var g = new D({
        actual: u,
        expected: !0,
        message: d,
        operator: "==",
        stackStartFn: r
      });
      throw g.generatedMessage = p, g;
    }
  }
  function G() {
    for (var r = arguments.length, i = new Array(r), u = 0; u < r; u++)
      i[u] = arguments[u];
    Z.apply(void 0, [G, i.length].concat(i));
  }
  T.ok = G, T.equal = function r(i, u, d) {
    if (arguments.length < 2)
      throw new $("actual", "expected");
    i != u && U({
      actual: i,
      expected: u,
      message: d,
      operator: "==",
      stackStartFn: r
    });
  }, T.notEqual = function r(i, u, d) {
    if (arguments.length < 2)
      throw new $("actual", "expected");
    i == u && U({
      actual: i,
      expected: u,
      message: d,
      operator: "!=",
      stackStartFn: r
    });
  }, T.deepEqual = function r(i, u, d) {
    if (arguments.length < 2)
      throw new $("actual", "expected");
    m === void 0 && _(), m(i, u) || U({
      actual: i,
      expected: u,
      message: d,
      operator: "deepEqual",
      stackStartFn: r
    });
  }, T.notDeepEqual = function r(i, u, d) {
    if (arguments.length < 2)
      throw new $("actual", "expected");
    m === void 0 && _(), m(i, u) && U({
      actual: i,
      expected: u,
      message: d,
      operator: "notDeepEqual",
      stackStartFn: r
    });
  }, T.deepStrictEqual = function r(i, u, d) {
    if (arguments.length < 2)
      throw new $("actual", "expected");
    m === void 0 && _(), j(i, u) || U({
      actual: i,
      expected: u,
      message: d,
      operator: "deepStrictEqual",
      stackStartFn: r
    });
  }, T.notDeepStrictEqual = tt;
  function tt(r, i, u) {
    if (arguments.length < 2)
      throw new $("actual", "expected");
    m === void 0 && _(), j(r, i) && U({
      actual: r,
      expected: i,
      message: u,
      operator: "notDeepStrictEqual",
      stackStartFn: tt
    });
  }
  T.strictEqual = function r(i, u, d) {
    if (arguments.length < 2)
      throw new $("actual", "expected");
    C(i, u) || U({
      actual: i,
      expected: u,
      message: d,
      operator: "strictEqual",
      stackStartFn: r
    });
  }, T.notStrictEqual = function r(i, u, d) {
    if (arguments.length < 2)
      throw new $("actual", "expected");
    C(i, u) && U({
      actual: i,
      expected: u,
      message: d,
      operator: "notStrictEqual",
      stackStartFn: r
    });
  };
  var ct = /* @__PURE__ */ e(function r(i, u, d) {
    var p = this;
    n(this, r), u.forEach(function(g) {
      g in i && (d !== void 0 && typeof d[g] == "string" && Q(i[g]) && b(i[g], d[g]) ? p[g] = d[g] : p[g] = i[g]);
    });
  });
  function gt(r, i, u, d, p, g) {
    if (!(u in r) || !j(r[u], i[u])) {
      if (!d) {
        var S = new ct(r, p), M = new ct(i, p, r), z = new D({
          actual: S,
          expected: M,
          operator: "deepStrictEqual",
          stackStartFn: g
        });
        throw z.actual = r, z.expected = i, z.operator = g.name, z;
      }
      U({
        actual: r,
        expected: i,
        message: d,
        operator: g.name,
        stackStartFn: g
      });
    }
  }
  function at(r, i, u, d) {
    if (typeof i != "function") {
      if (Q(i)) return b(i, r);
      if (arguments.length === 2)
        throw new A("expected", ["Function", "RegExp"], i);
      if (t(r) !== "object" || r === null) {
        var p = new D({
          actual: r,
          expected: i,
          message: u,
          operator: "deepStrictEqual",
          stackStartFn: d
        });
        throw p.operator = d.name, p;
      }
      var g = Object.keys(i);
      if (i instanceof Error)
        g.push("name", "message");
      else if (g.length === 0)
        throw new B("error", i, "may not be an empty object");
      return m === void 0 && _(), g.forEach(function(S) {
        typeof r[S] == "string" && Q(i[S]) && b(i[S], r[S]) || gt(r, i, S, u, g, d);
      }), !0;
    }
    return i.prototype !== void 0 && r instanceof i ? !0 : Error.isPrototypeOf(i) ? !1 : i.call({}, r) === !0;
  }
  function bt(r) {
    if (typeof r != "function")
      throw new A("fn", "Function", r);
    try {
      r();
    } catch (i) {
      return i;
    }
    return K;
  }
  function ft(r) {
    return x(r) || r !== null && t(r) === "object" && typeof r.then == "function" && typeof r.catch == "function";
  }
  function h(r) {
    return Promise.resolve().then(function() {
      var i;
      if (typeof r == "function") {
        if (i = r(), !ft(i))
          throw new R("instance of Promise", "promiseFn", i);
      } else if (ft(r))
        i = r;
      else
        throw new A("promiseFn", ["Function", "Promise"], r);
      return Promise.resolve().then(function() {
        return i;
      }).then(function() {
        return K;
      }).catch(function(u) {
        return u;
      });
    });
  }
  function v(r, i, u, d) {
    if (typeof u == "string") {
      if (arguments.length === 4)
        throw new A("error", ["Object", "Error", "Function", "RegExp"], u);
      if (t(i) === "object" && i !== null) {
        if (i.message === u)
          throw new w("error/message", 'The error message "'.concat(i.message, '" is identical to the message.'));
      } else if (i === u)
        throw new w("error/message", 'The error "'.concat(i, '" is identical to the message.'));
      d = u, u = void 0;
    } else if (u != null && t(u) !== "object" && typeof u != "function")
      throw new A("error", ["Object", "Error", "Function", "RegExp"], u);
    if (i === K) {
      var p = "";
      u && u.name && (p += " (".concat(u.name, ")")), p += d ? ": ".concat(d) : ".";
      var g = r.name === "rejects" ? "rejection" : "exception";
      U({
        actual: void 0,
        expected: u,
        operator: r.name,
        message: "Missing expected ".concat(g).concat(p),
        stackStartFn: r
      });
    }
    if (u && !at(i, u, d, r))
      throw i;
  }
  function P(r, i, u, d) {
    if (i !== K) {
      if (typeof u == "string" && (d = u, u = void 0), !u || at(i, u)) {
        var p = d ? ": ".concat(d) : ".", g = r.name === "doesNotReject" ? "rejection" : "exception";
        U({
          actual: i,
          expected: u,
          operator: r.name,
          message: "Got unwanted ".concat(g).concat(p, `
`) + 'Actual message: "'.concat(i && i.message, '"'),
          stackStartFn: r
        });
      }
      throw i;
    }
  }
  T.throws = function r(i) {
    for (var u = arguments.length, d = new Array(u > 1 ? u - 1 : 0), p = 1; p < u; p++)
      d[p - 1] = arguments[p];
    v.apply(void 0, [r, bt(i)].concat(d));
  }, T.rejects = function r(i) {
    for (var u = arguments.length, d = new Array(u > 1 ? u - 1 : 0), p = 1; p < u; p++)
      d[p - 1] = arguments[p];
    return h(i).then(function(g) {
      return v.apply(void 0, [r, g].concat(d));
    });
  }, T.doesNotThrow = function r(i) {
    for (var u = arguments.length, d = new Array(u > 1 ? u - 1 : 0), p = 1; p < u; p++)
      d[p - 1] = arguments[p];
    P.apply(void 0, [r, bt(i)].concat(d));
  }, T.doesNotReject = function r(i) {
    for (var u = arguments.length, d = new Array(u > 1 ? u - 1 : 0), p = 1; p < u; p++)
      d[p - 1] = arguments[p];
    return h(i).then(function(g) {
      return P.apply(void 0, [r, g].concat(d));
    });
  }, T.ifError = function r(i) {
    if (i != null) {
      var u = "ifError got unwanted exception: ";
      t(i) === "object" && typeof i.message == "string" ? i.message.length === 0 && i.constructor ? u += i.constructor.name : u += i.message : u += E(i);
      var d = new D({
        actual: i,
        expected: null,
        operator: "ifError",
        message: u,
        stackStartFn: r
      }), p = i.stack;
      if (typeof p == "string") {
        var g = p.split(`
`);
        g.shift();
        for (var S = d.stack.split(`
`), M = 0; M < g.length; M++) {
          var z = S.indexOf(g[M]);
          if (z !== -1) {
            S = S.slice(0, z);
            break;
          }
        }
        d.stack = "".concat(S.join(`
`), `
`).concat(g.join(`
`));
      }
      throw d;
    }
  };
  function o(r, i, u, d, p) {
    if (!Q(i))
      throw new A("regexp", "RegExp", i);
    var g = p === "match";
    if (typeof r != "string" || b(i, r) !== g) {
      if (u instanceof Error)
        throw u;
      var S = !u;
      u = u || (typeof r != "string" ? 'The "string" argument must be of type string. Received type ' + "".concat(t(r), " (").concat(E(r), ")") : (g ? "The input did not match the regular expression " : "The input was expected to not match the regular expression ") + "".concat(E(i), `. Input:

`).concat(E(r), `
`));
      var M = new D({
        actual: r,
        expected: i,
        message: u,
        operator: p,
        stackStartFn: d
      });
      throw M.generatedMessage = S, M;
    }
  }
  T.match = function r(i, u, d) {
    o(i, u, d, r, "match");
  }, T.doesNotMatch = function r(i, u, d) {
    o(i, u, d, r, "doesNotMatch");
  };
  function c() {
    for (var r = arguments.length, i = new Array(r), u = 0; u < r; u++)
      i[u] = arguments[u];
    Z.apply(void 0, [c, i.length].concat(i));
  }
  return T.strict = rt(c, T, {
    equal: T.strictEqual,
    deepEqual: T.deepStrictEqual,
    notEqual: T.notStrictEqual,
    notDeepEqual: T.notDeepStrictEqual
  }), T.strict.strict = T.strict, pe.exports;
}
var bi = ze();
const er = /* @__PURE__ */ bn(bi);
function oe(t) {
  if (t === "true")
    return !0;
  if (t === "false")
    return !1;
  throw new Error("invalid boolean string");
}
function xi(t) {
  return t ? "true" : "false";
}
function yt(t, e) {
  return t.split(e)[0];
}
function vi(t) {
  return BigInt(yt(t, "i8"));
}
function Hi(t) {
  return `${t}i8`;
}
function mi(t) {
  return BigInt(yt(t, "i16"));
}
function Yi(t) {
  return `${t}i16`;
}
function wi(t) {
  return BigInt(yt(t, "i32"));
}
function Ji(t) {
  return `${t}i32`;
}
function Si(t) {
  return BigInt(yt(t, "i64"));
}
function Ki(t) {
  return `${t}i64`;
}
function Oi(t) {
  return BigInt(yt(t, "i128"));
}
function Qi(t) {
  return `${t}i128`;
}
function un(t) {
  return BigInt(yt(t, "u8"));
}
function wt(t) {
  return `${t}u8`;
}
function Ai(t) {
  return BigInt(yt(t, "u16"));
}
function Xi(t) {
  return `${t}u16`;
}
function fn(t) {
  return BigInt(yt(t, "u32"));
}
function Ei(t) {
  return `${t}u32`;
}
function jt(t) {
  return BigInt(yt(t, "u64"));
}
function $e(t) {
  return `${t}u64`;
}
function xe(t) {
  return BigInt(yt(t, "u128"));
}
function Zi(t) {
  return `${t}u128`;
}
function cn(t) {
  return BigInt(yt(t, "field"));
}
function ji(t) {
  return `${t}field`;
}
function Pi(t) {
  return BigInt(yt(t, "group"));
}
function ta(t) {
  return `${t}group`;
}
function qi(t) {
  return BigInt(yt(t, "scalar"));
}
function ea(t) {
  return `${t}scalar`;
}
class le {
  constructor(e) {
    this.getMappingValueString = e;
  }
  async getMappingValueOrNull(e, n) {
    const f = await this.getMappingValueString(e, n);
    return f === "null" ? null : f;
  }
  async getMappingValue(e, n) {
    const f = await this.getMappingValueOrNull(e, n);
    if (f === null)
      throw new Error(`Mapping value not found for key: ${n}`);
    return f;
  }
  async getMappingValueOrDefault(e, n, f) {
    const l = await this.getMappingValueOrNull(e, n);
    return l === null ? f : l;
  }
}
function Ii(t) {
  return t.startsWith("aleo1") ? t : t === "true" || t === "false" ? oe(t) : t.endsWith("field") ? cn(t) : t.endsWith("group") ? Pi(t) : t.endsWith("i8") ? vi(t) : t.endsWith("i16") ? mi(t) : t.endsWith("i32") ? wi(t) : t.endsWith("i64") ? Si(t) : t.endsWith("i128") ? Oi(t) : t.endsWith("u8") ? un(t) : t.endsWith("u16") ? Ai(t) : t.endsWith("u32") ? fn(t) : t.endsWith("u64") ? jt(t) : t.endsWith("u128") ? xe(t) : t.endsWith("scalar") ? qi(t) : t;
}
function Ti(t) {
  er(t.startsWith("{") || t.endsWith("}"), "invalid struct");
  const n = t.replace("{", "").replace("}", "").split(",").map((l) => l.split(":").map((w) => w.trim())), f = new Map(n.map(([l, w]) => [l, ht(w)]));
  return Object.fromEntries(f);
}
function Ri(t) {
  return er(t.startsWith("[") || t.endsWith("]"), "invalid array"), t.replace("[", "").replace("]", "").split(",").map((n) => n.trim()).map(ht);
}
function ht(t) {
  er(t !== "null", "plaintext cannot be null"), t = t.replaceAll("\\n", `
`).replaceAll('"', ""), t = t.trim();
  try {
    return Ti(t);
  } catch {
  }
  try {
    return Ri(t);
  } catch {
  }
  return Ii(t);
}
let Be;
async function sn() {
  return Be || (globalThis.Worker || (globalThis.Worker = class extends EventTarget {
    postMessage() {
    }
    unref() {
    }
  }), Be = await import("@aleohq/sdk")), Be;
}
async function ln(t) {
  return (await sn()).Plaintext.fromString(t).hashBhp256().toString();
}
async function Ni(t) {
  return (await sn()).ProgramID.fromString(t).toAddress();
}
class _i extends le {
  /**
   * Get the state of the committee for an **active** validator.
   * @param validator
   * @returns The committee state or null if the validator is not in the committee.
   */
  async getCommitteeState(e) {
    const n = await this.getMappingValueOrNull("committee", e);
    return n === null ? null : ht(n);
  }
  /**
   * Get the total number of **active** validators in the committee.
   */
  async getCommitteeValidatorsCount() {
    return jt(
      await this.getMappingValueOrDefault(
        "metadata",
        "aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc",
        $e(0)
      )
    );
  }
  /**
   * Get the total number of delegators (not including validators).
   */
  async getDelegatorsCount() {
    return jt(
      await this.getMappingValueOrDefault(
        "metadata",
        "aleo1qgqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqanmpl0",
        $e(0)
      )
    );
  }
  /**
   * Get the total amount of microcredits that are prebonded and bonded to a validator.
   * Note: It includes both prebonded and bonded microcredits. However, it does not contain unbonding microcredits.
   * @param validator
   */
  async getDelegated(e) {
    return jt(await this.getMappingValueOrDefault("delegated", e, $e(0)));
  }
  /**
   * Get the bond state of the staker.
   * @param staker The staker (validator or delegator)
   */
  async getBonded(e) {
    const n = await this.getMappingValueOrNull("bonded", e);
    return n === null ? null : ht(n);
  }
  /**
   * Get the unbonding state of the staker.
   * @param staker The staker (validator or delegator)
   */
  async getUnbonding(e) {
    const n = await this.getMappingValueOrNull("unbonding", e);
    return n === null ? null : ht(n);
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
    return jt(await this.getMappingValueOrDefault("account", e, "0"));
  }
}
class na extends le {
  async isInitialized() {
    return oe(await this.getMappingValueOrDefault("initialized", "0u8", "false"));
  }
  async hasRole(e, n) {
    const f = await ln(`{
      account: ${n},
      role: ${wt(e)}
    }`);
    return oe(await this.getMappingValueOrDefault("grants", f, "false"));
  }
  async isRoleAdmin(e, n) {
    const f = Number(
      un(await this.getMappingValueOrDefault("role_admins", wt(e), wt(dn)))
    );
    return typeof n == "number" ? n === f : this.hasRole(f, n);
  }
}
var Di = /* @__PURE__ */ ((t) => (t[t.TOTAL_WITHDRAW_KEY = 0] = "TOTAL_WITHDRAW_KEY", t[t.TOTAL_PENDING_WITHDRAW_KEY = 1] = "TOTAL_PENDING_WITHDRAW_KEY", t[t.TOTAL_BONDED_KEY = 2] = "TOTAL_BONDED_KEY", t[t.TOTAL_UNBONDING_KEY = 3] = "TOTAL_UNBONDING_KEY", t[t.PROTOCOL_FEE_KEY = 4] = "PROTOCOL_FEE_KEY", t))(Di || {}), $i = /* @__PURE__ */ ((t) => (t[t.INVALID = 0] = "INVALID", t[t.IN_PROGRESS = 1] = "IN_PROGRESS", t[t.VALID = 2] = "VALID", t))($i || {});
class oa extends le {
  credits;
  constructor(e) {
    super(e), this.credits = new _i(e);
  }
  async getTotalSupply() {
    return jt(await this.getMappingValueOrDefault("total_supply", wt(0), "0"));
  }
  async getPublicBalance(e) {
    return jt(await this.getMappingValueOrDefault("account", e, "0"));
  }
  async getApproval(e, n) {
    const f = await ln(`{
      approver: ${e},
      spender: ${n}
    }`);
    return jt(await this.getMappingValueOrDefault("approvals", f, "0"));
  }
  async getConfig() {
    const e = await this.getMappingValueOrNull("config", wt(0));
    return e === null ? null : ht(e);
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
    return cn(await this.getMappingValue("state", wt(e)));
  }
  async getCacheState() {
    return ht(await this.getMappingValue("cache_state", wt(0)));
  }
  async getWithdraw(e) {
    const n = await this.getMappingValueOrNull("withdraws", e);
    return n === null ? null : ht(n);
  }
  async getPendingWithdraw(e) {
    const n = await this.getMappingValueOrNull("pending_withdraws", e);
    return n === null ? null : ht(n);
  }
  async getPendingQueueUser(e) {
    return await this.getMappingValueOrNull("pending_queue", ji(e));
  }
  async getPendingQueueStartEnd() {
    return ht(await this.getMappingValue("pending_queue_start_end", wt(0)));
  }
  async getValidatorsCount() {
    return fn(await this.getMappingValue("validators_count", wt(0)));
  }
  async getValidator(e) {
    return await this.getMappingValueOrNull("validators", Ei(e));
  }
  async hasValidator(e) {
    return await this.getMappingValueOrNull("validator_delegators", e) !== null;
  }
  async hasDelegator(e) {
    return oe(await this.getMappingValueOrDefault("delegators", e, "false"));
  }
  async getValidatorDelegator(e) {
    const n = await this.getMappingValue("validator_delegators", e);
    return n === gn ? null : n;
  }
  async getValidatorBonded(e) {
    return jt(await this.getMappingValueOrDefault("validator_bonded", e, "0"));
  }
  async getTotalBuffered() {
    return this.credits.getPublicBalance(await Ni(hn));
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
  getTotalPooled(e, n, f, l, w) {
    return e + n + f - l - w;
  }
  getStCreditsFromCredits(e, n, f) {
    return e * (f > 0n ? f : 1n) / (n > 0n ? n : 1n);
  }
  getCreditsFromStCredits(e, n, f) {
    return e * (n > 0n ? n : 1n) / (f > 0n ? f : 1n);
  }
}
class ia extends le {
  /**
   * Get the total supply of points.
   */
  async getTotalSupply() {
    return xe(await this.getMappingValueOrDefault("total_supply", wt(0), "0"));
  }
  /**
   * Get the balance of points for an account.
   * @param account
   */
  async getBalance(e) {
    return xe(await this.getMappingValueOrDefault("account", e, "0"));
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
    } : ht(n);
  }
}
export {
  Li as ACCESS_CONTROL_PROGRAM,
  Ci as ACL_MANAGER_PROGRAM,
  Wi as ASSET_LISTING_ADMIN_ROLE,
  na as AccessControlProgram,
  $i as CacheStateEnum,
  _i as CreditsProgram,
  dn as DEFAULT_ADMIN_ROLE,
  Ui as EMERGENCY_ADMIN_ROLE,
  Fi as POOL_ADMIN_ROLE,
  le as ProgramBase,
  Vi as RISK_ADMIN_ROLE,
  Bi as STAKING_ADMIN_ROLE,
  Mi as STAKING_OPERATOR_ROLE,
  Gi as STCREDITS_CACHE_BATCH_NUM,
  ki as STCREDITS_POINTS_PROGRAM,
  hn as STCREDITS_PROGRAM,
  ia as StCreditsPointsProgram,
  oa as StCreditsProgram,
  Di as StateEnum,
  gn as ZERO_ADDRESS,
  ln as bhp256HashToField,
  oe as bool,
  xi as boolStr,
  zi as delegatorProgram,
  cn as field,
  ji as fieldStr,
  Pi as group,
  ta as groupStr,
  Oi as i128,
  Qi as i128Str,
  mi as i16,
  Yi as i16Str,
  wi as i32,
  Ji as i32Str,
  Si as i64,
  Ki as i64Str,
  vi as i8,
  Hi as i8Str,
  sn as importAleo,
  Ii as parseLiteral,
  ht as parsePlaintext,
  Ni as programAddress,
  qi as scalar,
  ea as scalarStr,
  xe as u128,
  Zi as u128Str,
  Ai as u16,
  Xi as u16Str,
  fn as u32,
  Ei as u32Str,
  jt as u64,
  $e as u64Str,
  un as u8,
  wt as u8Str
};
