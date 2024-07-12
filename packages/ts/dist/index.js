var us = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function eu(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function tu(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ls = { exports: {} }, ye = ls.exports = {}, nt, rt;
function Ai() {
  throw new Error("setTimeout has not been defined");
}
function Ti() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? nt = setTimeout : nt = Ai;
  } catch {
    nt = Ai;
  }
  try {
    typeof clearTimeout == "function" ? rt = clearTimeout : rt = Ti;
  } catch {
    rt = Ti;
  }
})();
function fs(t) {
  if (nt === setTimeout)
    return setTimeout(t, 0);
  if ((nt === Ai || !nt) && setTimeout)
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
function nu(t) {
  if (rt === clearTimeout)
    return clearTimeout(t);
  if ((rt === Ti || !rt) && clearTimeout)
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
var yt = [], Xt = !1, xt, Dn = -1;
function ru() {
  !Xt || !xt || (Xt = !1, xt.length ? yt = xt.concat(yt) : Dn = -1, yt.length && hs());
}
function hs() {
  if (!Xt) {
    var t = fs(ru);
    Xt = !0;
    for (var e = yt.length; e; ) {
      for (xt = yt, yt = []; ++Dn < e; )
        xt && xt[Dn].run();
      Dn = -1, e = yt.length;
    }
    xt = null, Xt = !1, nu(t);
  }
}
ye.nextTick = function(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var n = 1; n < arguments.length; n++)
      e[n - 1] = arguments[n];
  yt.push(new ps(t, e)), yt.length === 1 && !Xt && fs(hs);
};
function ps(t, e) {
  this.fun = t, this.array = e;
}
ps.prototype.run = function() {
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
var Dr = { exports: {} }, Br = {}, en = {}, ds = {}, Vi = function() {
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
}, ou = Vi, zi = function() {
  return ou() && !!Symbol.toStringTag;
}, au = Error, su = EvalError, cu = RangeError, uu = ReferenceError, gs = SyntaxError, yr = TypeError, lu = URIError, Po = typeof Symbol < "u" && Symbol, fu = Vi, hu = function() {
  return typeof Po != "function" || typeof Symbol != "function" || typeof Po("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : fu();
}, qr = {
  __proto__: null,
  foo: {}
}, pu = Object, du = function() {
  return { __proto__: qr }.foo === qr.foo && !(qr instanceof pu);
}, gu = "Function.prototype.bind called on incompatible ", yu = Object.prototype.toString, mu = Math.max, Eu = "[object Function]", Co = function(e, n) {
  for (var r = [], i = 0; i < e.length; i += 1)
    r[i] = e[i];
  for (var o = 0; o < n.length; o += 1)
    r[o + e.length] = n[o];
  return r;
}, Au = function(e, n) {
  for (var r = [], i = n, o = 0; i < e.length; i += 1, o += 1)
    r[o] = e[i];
  return r;
}, Tu = function(t, e) {
  for (var n = "", r = 0; r < t.length; r += 1)
    n += t[r], r + 1 < t.length && (n += e);
  return n;
}, vu = function(e) {
  var n = this;
  if (typeof n != "function" || yu.apply(n) !== Eu)
    throw new TypeError(gu + n);
  for (var r = Au(arguments, 1), i, o = function() {
    if (this instanceof i) {
      var d = n.apply(
        this,
        Co(r, arguments)
      );
      return Object(d) === d ? d : this;
    }
    return n.apply(
      e,
      Co(r, arguments)
    );
  }, a = mu(0, n.length - r.length), s = [], c = 0; c < a; c++)
    s[c] = "$" + c;
  if (i = Function("binder", "return function (" + Tu(s, ",") + "){ return binder.apply(this,arguments); }")(o), n.prototype) {
    var u = function() {
    };
    u.prototype = n.prototype, i.prototype = new u(), u.prototype = null;
  }
  return i;
}, Su = vu, Ki = Function.prototype.bind || Su, Ou = Function.prototype.call, Iu = Object.prototype.hasOwnProperty, bu = Ki, Ru = bu.call(Ou, Iu), Q, Nu = au, _u = su, wu = cu, Pu = uu, tn = gs, Jt = yr, Cu = lu, ys = Function, Gr = function(t) {
  try {
    return ys('"use strict"; return (' + t + ").constructor;")();
  } catch {
  }
}, Mt = Object.getOwnPropertyDescriptor;
if (Mt)
  try {
    Mt({}, "");
  } catch {
    Mt = null;
  }
var Wr = function() {
  throw new Jt();
}, Lu = Mt ? function() {
  try {
    return arguments.callee, Wr;
  } catch {
    try {
      return Mt(arguments, "callee").get;
    } catch {
      return Wr;
    }
  }
}() : Wr, Vt = hu(), xu = du(), Oe = Object.getPrototypeOf || (xu ? function(t) {
  return t.__proto__;
} : null), Ht = {}, ku = typeof Uint8Array > "u" || !Oe ? Q : Oe(Uint8Array), Ft = {
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
  "%RangeError%": wu,
  "%ReferenceError%": Pu,
  "%Reflect%": typeof Reflect > "u" ? Q : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? Q : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !Vt || !Oe ? Q : Oe((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? Q : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": Vt && Oe ? Oe(""[Symbol.iterator]()) : Q,
  "%Symbol%": Vt ? Symbol : Q,
  "%SyntaxError%": tn,
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
    Ft["%Error.prototype%"] = Mu;
  }
var Fu = function t(e) {
  var n;
  if (e === "%AsyncFunction%")
    n = Gr("async function () {}");
  else if (e === "%GeneratorFunction%")
    n = Gr("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    n = Gr("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var r = t("%AsyncGeneratorFunction%");
    r && (n = r.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var i = t("%AsyncGenerator%");
    i && Oe && (n = Oe(i.prototype));
  }
  return Ft[e] = n, n;
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
}, In = Ki, Qn = Ru, $u = In.call(Function.call, Array.prototype.concat), Uu = In.call(Function.apply, Array.prototype.splice), xo = In.call(Function.call, String.prototype.replace), er = In.call(Function.call, String.prototype.slice), ju = In.call(Function.call, RegExp.prototype.exec), Du = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Bu = /\\(\\)?/g, qu = function(e) {
  var n = er(e, 0, 1), r = er(e, -1);
  if (n === "%" && r !== "%")
    throw new tn("invalid intrinsic syntax, expected closing `%`");
  if (r === "%" && n !== "%")
    throw new tn("invalid intrinsic syntax, expected opening `%`");
  var i = [];
  return xo(e, Du, function(o, a, s, c) {
    i[i.length] = s ? xo(c, Bu, "$1") : a || o;
  }), i;
}, Gu = function(e, n) {
  var r = e, i;
  if (Qn(Lo, r) && (i = Lo[r], r = "%" + i[0] + "%"), Qn(Ft, r)) {
    var o = Ft[r];
    if (o === Ht && (o = Fu(r)), typeof o > "u" && !n)
      throw new Jt("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: i,
      name: r,
      value: o
    };
  }
  throw new tn("intrinsic " + e + " does not exist!");
}, bn = function(e, n) {
  if (typeof e != "string" || e.length === 0)
    throw new Jt("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof n != "boolean")
    throw new Jt('"allowMissing" argument must be a boolean');
  if (ju(/^%?[^%]*%?$/, e) === null)
    throw new tn("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var r = qu(e), i = r.length > 0 ? r[0] : "", o = Gu("%" + i + "%", n), a = o.name, s = o.value, c = !1, u = o.alias;
  u && (i = u[0], Uu(r, $u([0, 1], u)));
  for (var d = 1, A = !0; d < r.length; d += 1) {
    var T = r[d], S = er(T, 0, 1), C = er(T, -1);
    if ((S === '"' || S === "'" || S === "`" || C === '"' || C === "'" || C === "`") && S !== C)
      throw new tn("property names with quotes must have matching quotes");
    if ((T === "constructor" || !A) && (c = !0), i += "." + T, a = "%" + i + "%", Qn(Ft, a))
      s = Ft[a];
    else if (s != null) {
      if (!(T in s)) {
        if (!n)
          throw new Jt("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (Mt && d + 1 >= r.length) {
        var k = Mt(s, T);
        A = !!k, A && "get" in k && !("originalValue" in k.get) ? s = k.get : s = s[T];
      } else
        A = Qn(s, T), s = s[T];
      A && !c && (Ft[a] = s);
    }
  }
  return s;
}, ms = { exports: {} }, Vr, ko;
function Hi() {
  if (ko) return Vr;
  ko = 1;
  var t = bn, e = t("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return Vr = e, Vr;
}
var Wu = bn, Bn = Wu("%Object.getOwnPropertyDescriptor%", !0);
if (Bn)
  try {
    Bn([], "length");
  } catch {
    Bn = null;
  }
var Yi = Bn, Mo = Hi(), Vu = gs, zt = yr, Fo = Yi, Es = function(e, n, r) {
  if (!e || typeof e != "object" && typeof e != "function")
    throw new zt("`obj` must be an object or a function`");
  if (typeof n != "string" && typeof n != "symbol")
    throw new zt("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new zt("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new zt("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new zt("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new zt("`loose`, if provided, must be a boolean");
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
}, vi = Hi(), As = function() {
  return !!vi;
};
As.hasArrayLengthDefineBug = function() {
  if (!vi)
    return null;
  try {
    return vi([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Ts = As, zu = bn, $o = Es, Ku = Ts(), Uo = Yi, jo = yr, Hu = zu("%Math.floor%"), Yu = function(e, n) {
  if (typeof e != "function")
    throw new jo("`fn` is not a function");
  if (typeof n != "number" || n < 0 || n > 4294967295 || Hu(n) !== n)
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
  var e = Ki, n = bn, r = Yu, i = yr, o = n("%Function.prototype.apply%"), a = n("%Function.prototype.call%"), s = n("%Reflect.apply%", !0) || e.call(a, o), c = Hi(), u = n("%Math.max%");
  t.exports = function(T) {
    if (typeof T != "function")
      throw new i("a function is required");
    var S = s(e, a, arguments);
    return r(
      S,
      1 + u(0, T.length - (arguments.length - 1)),
      !0
    );
  };
  var d = function() {
    return s(e, o, arguments);
  };
  c ? c(t.exports, "apply", { value: d }) : t.exports.apply = d;
})(ms);
var mr = ms.exports, vs = bn, Ss = mr, Xu = Ss(vs("String.prototype.indexOf")), Er = function(e, n) {
  var r = vs(e, !!n);
  return typeof r == "function" && Xu(e, ".prototype.") > -1 ? Ss(r) : r;
}, Ju = zi(), Zu = Er, Si = Zu("Object.prototype.toString"), Ar = function(e) {
  return Ju && e && typeof e == "object" && Symbol.toStringTag in e ? !1 : Si(e) === "[object Arguments]";
}, Os = function(e) {
  return Ar(e) ? !0 : e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && Si(e) !== "[object Array]" && Si(e.callee) === "[object Function]";
}, Qu = function() {
  return Ar(arguments);
}();
Ar.isLegacyArguments = Os;
var el = Qu ? Ar : Os, tl = Object.prototype.toString, nl = Function.prototype.toString, rl = /^\s*(?:function)?\*/, Is = zi(), zr = Object.getPrototypeOf, il = function() {
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
  if (!zr)
    return !1;
  if (typeof Kr > "u") {
    var r = il();
    Kr = r ? zr(r) : !1;
  }
  return zr(e) === Kr;
}, bs = Function.prototype.toString, Yt = typeof Reflect == "object" && Reflect !== null && Reflect.apply, Oi, qn;
if (typeof Yt == "function" && typeof Object.defineProperty == "function")
  try {
    Oi = Object.defineProperty({}, "length", {
      get: function() {
        throw qn;
      }
    }), qn = {}, Yt(function() {
      throw 42;
    }, null, Oi);
  } catch (t) {
    t !== qn && (Yt = null);
  }
else
  Yt = null;
var al = /^\s*class\b/, Ii = function(e) {
  try {
    var n = bs.call(e);
    return al.test(n);
  } catch {
    return !1;
  }
}, Hr = function(e) {
  try {
    return Ii(e) ? !1 : (bs.call(e), !0);
  } catch {
    return !1;
  }
}, Gn = Object.prototype.toString, sl = "[object Object]", cl = "[object Function]", ul = "[object GeneratorFunction]", ll = "[object HTMLAllCollection]", fl = "[object HTML document.all class]", hl = "[object HTMLCollection]", pl = typeof Symbol == "function" && !!Symbol.toStringTag, dl = !(0 in [,]), bi = function() {
  return !1;
};
if (typeof document == "object") {
  var gl = document.all;
  Gn.call(gl) === Gn.call(document.all) && (bi = function(e) {
    if ((dl || !e) && (typeof e > "u" || typeof e == "object"))
      try {
        var n = Gn.call(e);
        return (n === ll || n === fl || n === hl || n === sl) && e("") == null;
      } catch {
      }
    return !1;
  });
}
var yl = Yt ? function(e) {
  if (bi(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  try {
    Yt(e, null, Oi);
  } catch (n) {
    if (n !== qn)
      return !1;
  }
  return !Ii(e) && Hr(e);
} : function(e) {
  if (bi(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  if (pl)
    return Hr(e);
  if (Ii(e))
    return !1;
  var n = Gn.call(e);
  return n !== cl && n !== ul && !/^\[object HTML/.test(n) ? !1 : Hr(e);
}, ml = yl, El = Object.prototype.toString, Rs = Object.prototype.hasOwnProperty, Al = function(e, n, r) {
  for (var i = 0, o = e.length; i < o; i++)
    Rs.call(e, i) && (r == null ? n(e[i], i, e) : n.call(r, e[i], i, e));
}, Tl = function(e, n, r) {
  for (var i = 0, o = e.length; i < o; i++)
    r == null ? n(e.charAt(i), i, e) : n.call(r, e.charAt(i), i, e);
}, vl = function(e, n, r) {
  for (var i in e)
    Rs.call(e, i) && (r == null ? n(e[i], i, e) : n.call(r, e[i], i, e));
}, Sl = function(e, n, r) {
  if (!ml(n))
    throw new TypeError("iterator must be a function");
  var i;
  arguments.length >= 3 && (i = r), El.call(e) === "[object Array]" ? Al(e, n, i) : typeof e == "string" ? Tl(e, n, i) : vl(e, n, i);
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
], Yr = Il, bl = typeof globalThis > "u" ? us : globalThis, Rl = function() {
  for (var e = [], n = 0; n < Yr.length; n++)
    typeof bl[Yr[n]] == "function" && (e[e.length] = Yr[n]);
  return e;
}, tr = Ol, Nl = Rl, Do = mr, Xi = Er, Wn = Yi, _l = Xi("Object.prototype.toString"), Ns = zi(), Bo = typeof globalThis > "u" ? us : globalThis, Ri = Nl(), Ji = Xi("String.prototype.slice"), Xr = Object.getPrototypeOf, wl = Xi("Array.prototype.indexOf", !0) || function(e, n) {
  for (var r = 0; r < e.length; r += 1)
    if (e[r] === n)
      return r;
  return -1;
}, nr = { __proto__: null };
Ns && Wn && Xr ? tr(Ri, function(t) {
  var e = new Bo[t]();
  if (Symbol.toStringTag in e) {
    var n = Xr(e), r = Wn(n, Symbol.toStringTag);
    if (!r) {
      var i = Xr(n);
      r = Wn(i, Symbol.toStringTag);
    }
    nr["$" + t] = Do(r.get);
  }
}) : tr(Ri, function(t) {
  var e = new Bo[t](), n = e.slice || e.set;
  n && (nr["$" + t] = Do(n));
});
var Pl = function(e) {
  var n = !1;
  return tr(
    // eslint-disable-next-line no-extra-parens
    /** @type {Record<`\$${TypedArrayName}`, Getter>} */
    /** @type {any} */
    nr,
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
  return tr(
    // eslint-disable-next-line no-extra-parens
    /** @type {Record<`\$${TypedArrayName}`, Getter>} */
    /** @type {any} */
    nr,
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
    return wl(Ri, n) > -1 ? n : n !== "Object" ? !1 : Cl(e);
  }
  return Wn ? Pl(e) : null;
}, Ll = _s, xl = function(e) {
  return !!Ll(e);
};
(function(t) {
  var e = el, n = ol, r = _s, i = xl;
  function o(N) {
    return N.call.bind(N);
  }
  var a = typeof BigInt < "u", s = typeof Symbol < "u", c = o(Object.prototype.toString), u = o(Number.prototype.valueOf), d = o(String.prototype.valueOf), A = o(Boolean.prototype.valueOf);
  if (a)
    var T = o(BigInt.prototype.valueOf);
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
  function w(N) {
    return r(N) === "Uint8Array";
  }
  t.isUint8Array = w;
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
  function K(N) {
    return r(N) === "Int16Array";
  }
  t.isInt16Array = K;
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
  function E(N) {
    return typeof DataView > "u" ? !1 : f.working ? f(N) : N instanceof DataView;
  }
  t.isDataView = E;
  var l = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
  function h(N) {
    return c(N) === "[object SharedArrayBuffer]";
  }
  function p(N) {
    return typeof l > "u" ? !1 : (typeof h.working > "u" && (h.working = h(new l())), h.working ? h(N) : N instanceof l);
  }
  t.isSharedArrayBuffer = p;
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
    return C(N, d);
  }
  t.isStringObject = Z;
  function ae(N) {
    return C(N, A);
  }
  t.isBooleanObject = ae;
  function _e(N) {
    return a && C(N, T);
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
  function we(N) {
    return typeof Uint8Array < "u" && ($(N) || p(N));
  }
  t.isAnyArrayBuffer = we, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(N) {
    Object.defineProperty(t, N, {
      enumerable: !1,
      value: function() {
        throw new Error(N + " is not supported in userland");
      }
    });
  });
})(ds);
var kl = function(e) {
  return e && typeof e == "object" && typeof e.copy == "function" && typeof e.fill == "function" && typeof e.readUInt8 == "function";
}, Ni = { exports: {} };
typeof Object.create == "function" ? Ni.exports = function(e, n) {
  n && (e.super_ = n, e.prototype = Object.create(n.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : Ni.exports = function(e, n) {
  if (n) {
    e.super_ = n;
    var r = function() {
    };
    r.prototype = n.prototype, e.prototype = new r(), e.prototype.constructor = e;
  }
};
var Ml = Ni.exports;
(function(t) {
  var e = Object.getOwnPropertyDescriptors || function(E) {
    for (var l = Object.keys(E), h = {}, p = 0; p < l.length; p++)
      h[l[p]] = Object.getOwnPropertyDescriptor(E, l[p]);
    return h;
  }, n = /%[sdj%]/g;
  t.format = function(f) {
    if (!x(f)) {
      for (var E = [], l = 0; l < arguments.length; l++)
        E.push(a(arguments[l]));
      return E.join(" ");
    }
    for (var l = 1, h = arguments, p = h.length, R = String(f).replace(n, function(b) {
      if (b === "%%") return "%";
      if (l >= p) return b;
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
    }), O = h[l]; l < p; O = h[++l])
      m(O) || !z(O) ? R += " " + O : R += " " + a(O);
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
    return arguments.length >= 3 && (l.depth = arguments[2]), arguments.length >= 4 && (l.colors = arguments[3]), w(E) ? l.showHidden = E : E && t._extend(l, E), F(l.showHidden) && (l.showHidden = !1), F(l.depth) && (l.depth = 2), F(l.colors) && (l.colors = !1), F(l.customInspect) && (l.customInspect = !0), l.colors && (l.stylize = s), d(l, f, l.depth);
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
  function d(f, E, l) {
    if (f.customInspect && E && X(E.inspect) && // Filter out the util module, it's inspect function is special
    E.inspect !== t.inspect && // Also filter out any prototype objects using the circular check.
    !(E.constructor && E.constructor.prototype === E)) {
      var h = E.inspect(l, f);
      return x(h) || (h = d(f, h, l)), h;
    }
    var p = A(f, E);
    if (p)
      return p;
    var R = Object.keys(E), O = u(R);
    if (f.showHidden && (R = Object.getOwnPropertyNames(E)), oe(E) && (R.indexOf("message") >= 0 || R.indexOf("description") >= 0))
      return T(E);
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
        return T(E);
    }
    var L = "", q = !1, H = ["{", "}"];
    if (U(E) && (q = !0, H = ["[", "]"]), X(E)) {
      var Z = E.name ? ": " + E.name : "";
      L = " [Function" + Z + "]";
    }
    if (ee(E) && (L = " " + RegExp.prototype.toString.call(E)), ie(E) && (L = " " + Date.prototype.toUTCString.call(E)), oe(E) && (L = " " + T(E)), R.length === 0 && (!q || E.length == 0))
      return H[0] + L + H[1];
    if (l < 0)
      return ee(E) ? f.stylize(RegExp.prototype.toString.call(E), "regexp") : f.stylize("[Object]", "special");
    f.seen.push(E);
    var ae;
    return q ? ae = S(f, E, l, O, R) : ae = R.map(function(_e) {
      return C(f, E, l, O, _e, q);
    }), f.seen.pop(), k(ae, L, H);
  }
  function A(f, E) {
    if (F(E))
      return f.stylize("undefined", "undefined");
    if (x(E)) {
      var l = "'" + JSON.stringify(E).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return f.stylize(l, "string");
    }
    if (I(E))
      return f.stylize("" + E, "number");
    if (w(E))
      return f.stylize("" + E, "boolean");
    if (m(E))
      return f.stylize("null", "null");
  }
  function T(f) {
    return "[" + Error.prototype.toString.call(f) + "]";
  }
  function S(f, E, l, h, p) {
    for (var R = [], O = 0, b = E.length; O < b; ++O)
      Ae(E, String(O)) ? R.push(C(
        f,
        E,
        l,
        h,
        String(O),
        !0
      )) : R.push("");
    return p.forEach(function(L) {
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
  function C(f, E, l, h, p, R) {
    var O, b, L;
    if (L = Object.getOwnPropertyDescriptor(E, p) || { value: E[p] }, L.get ? L.set ? b = f.stylize("[Getter/Setter]", "special") : b = f.stylize("[Getter]", "special") : L.set && (b = f.stylize("[Setter]", "special")), Ae(h, p) || (O = "[" + p + "]"), b || (f.seen.indexOf(L.value) < 0 ? (m(l) ? b = d(f, L.value, null) : b = d(f, L.value, l - 1), b.indexOf(`
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
      if (R && p.match(/^\d+$/))
        return b;
      O = JSON.stringify("" + p), O.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (O = O.slice(1, -1), O = f.stylize(O, "name")) : (O = O.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), O = f.stylize(O, "string"));
    }
    return O + ": " + b;
  }
  function k(f, E, l) {
    var h = f.reduce(function(p, R) {
      return R.indexOf(`
`) >= 0, p + R.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    return h > 60 ? l[0] + (E === "" ? "" : E + `
 `) + " " + f.join(`,
  `) + " " + l[1] : l[0] + E + " " + f.join(", ") + " " + l[1];
  }
  t.types = ds;
  function U(f) {
    return Array.isArray(f);
  }
  t.isArray = U;
  function w(f) {
    return typeof f == "boolean";
  }
  t.isBoolean = w;
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
  function K(f) {
    return typeof f == "symbol";
  }
  t.isSymbol = K;
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
    if (!E || !z(E)) return f;
    for (var l = Object.keys(E), h = l.length; h--; )
      f[l[h]] = E[l[h]];
    return f;
  };
  function Ae(f, E) {
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
      for (var h, p, R = new Promise(function(L, q) {
        h = L, p = q;
      }), O = [], b = 0; b < arguments.length; b++)
        O.push(arguments[b]);
      O.push(function(L, q) {
        L ? p(L) : h(q);
      });
      try {
        E.apply(this, O);
      } catch (L) {
        p(L);
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
  function P(f, E) {
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
      var p = l.pop();
      if (typeof p != "function")
        throw new TypeError("The last argument must be of type Function");
      var R = this, O = function() {
        return p.apply(R, arguments);
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
    return Object.setPrototypeOf(E, Object.getPrototypeOf(f)), Object.defineProperties(
      E,
      e(f)
    ), E;
  }
  t.callbackify = $;
})(en);
var qo;
function ws() {
  if (qo) return Br;
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
    return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(x, K) {
      return x.__proto__ = K, x;
    }, i(m, y);
  }
  function o(m) {
    var y = c();
    return function() {
      var x = u(m), K;
      if (y) {
        var F = u(this).constructor;
        K = Reflect.construct(x, arguments, F);
      } else
        K = x.apply(this, arguments);
      return a(this, K);
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
  var d = {}, A, T;
  function S(m, y, I) {
    I || (I = Error);
    function x(F, ee, z) {
      return typeof y == "string" ? y : y(F, ee, z);
    }
    var K = /* @__PURE__ */ function(F) {
      r(z, F);
      var ee = o(z);
      function z(ie, oe, X) {
        var ue;
        return n(this, z), ue = ee.call(this, x(ie, oe, X)), ue.code = m, ue;
      }
      return e(z);
    }(I);
    d[m] = K;
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
  function w(m, y, I) {
    return typeof I != "number" && (I = 0), I + y.length > m.length ? !1 : m.indexOf(y, I) !== -1;
  }
  return S("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError), S("ERR_INVALID_ARG_TYPE", function(m, y, I) {
    A === void 0 && (A = _i()), A(typeof m == "string", "'name' must be a string");
    var x;
    typeof y == "string" && k(y, "not ") ? (x = "must not be", y = y.replace(/^not /, "")) : x = "must be";
    var K;
    if (U(m, " argument"))
      K = "The ".concat(m, " ").concat(x, " ").concat(C(y, "type"));
    else {
      var F = w(m, ".") ? "property" : "argument";
      K = 'The "'.concat(m, '" ').concat(F, " ").concat(x, " ").concat(C(y, "type"));
    }
    return K += ". Received type ".concat(t(I)), K;
  }, TypeError), S("ERR_INVALID_ARG_VALUE", function(m, y) {
    var I = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "is invalid";
    T === void 0 && (T = en);
    var x = T.inspect(y);
    return x.length > 128 && (x = "".concat(x.slice(0, 128), "...")), "The argument '".concat(m, "' ").concat(I, ". Received ").concat(x);
  }, TypeError), S("ERR_INVALID_RETURN_VALUE", function(m, y, I) {
    var x;
    return I && I.constructor && I.constructor.name ? x = "instance of ".concat(I.constructor.name) : x = "type ".concat(t(I)), "Expected ".concat(m, ' to be returned from the "').concat(y, '"') + " function but got ".concat(x, ".");
  }, TypeError), S("ERR_MISSING_ARGS", function() {
    for (var m = arguments.length, y = new Array(m), I = 0; I < m; I++)
      y[I] = arguments[I];
    A === void 0 && (A = _i()), A(y.length > 0, "At least one arg needs to be specified");
    var x = "The ", K = y.length;
    switch (y = y.map(function(F) {
      return '"'.concat(F, '"');
    }), K) {
      case 1:
        x += "".concat(y[0], " argument");
        break;
      case 2:
        x += "".concat(y[0], " and ").concat(y[1], " arguments");
        break;
      default:
        x += y.slice(0, K - 1).join(", "), x += ", and ".concat(y[K - 1], " arguments");
        break;
    }
    return "".concat(x, " must be specified");
  }, TypeError), Br.codes = d, Br;
}
var Jr, Go;
function Fl() {
  if (Go) return Jr;
  Go = 1;
  function t(_, P) {
    var $ = Object.keys(_);
    if (Object.getOwnPropertySymbols) {
      var f = Object.getOwnPropertySymbols(_);
      P && (f = f.filter(function(E) {
        return Object.getOwnPropertyDescriptor(_, E).enumerable;
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
    return m(P) === "symbol" ? P : String(P);
  }
  function s(_, P) {
    if (m(_) !== "object" || _ === null) return _;
    var $ = _[Symbol.toPrimitive];
    if ($ !== void 0) {
      var f = $.call(_, P || "default");
      if (m(f) !== "object") return f;
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
      var f = w(_), E;
      if (P) {
        var l = w(this).constructor;
        E = Reflect.construct(f, arguments, l);
      } else
        E = f.apply(this, arguments);
      return d(this, E);
    };
  }
  function d(_, P) {
    if (P && (m(P) === "object" || typeof P == "function"))
      return P;
    if (P !== void 0)
      throw new TypeError("Derived constructors may only return object or undefined");
    return A(_);
  }
  function A(_) {
    if (_ === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return _;
  }
  function T(_) {
    var P = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
    return T = function(f) {
      if (f === null || !k(f)) return f;
      if (typeof f != "function")
        throw new TypeError("Super expression must either be null or a function");
      if (typeof P < "u") {
        if (P.has(f)) return P.get(f);
        P.set(f, E);
      }
      function E() {
        return S(f, arguments, w(this).constructor);
      }
      return E.prototype = Object.create(f.prototype, { constructor: { value: E, enumerable: !1, writable: !0, configurable: !0 } }), U(E, f);
    }, T(_);
  }
  function S(_, P, $) {
    return C() ? S = Reflect.construct.bind() : S = function(E, l, h) {
      var p = [null];
      p.push.apply(p, l);
      var R = Function.bind.apply(E, p), O = new R();
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
    return U = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(f, E) {
      return f.__proto__ = E, f;
    }, U(_, P);
  }
  function w(_) {
    return w = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function($) {
      return $.__proto__ || Object.getPrototypeOf($);
    }, w(_);
  }
  function m(_) {
    "@babel/helpers - typeof";
    return m = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(P) {
      return typeof P;
    } : function(P) {
      return P && typeof Symbol == "function" && P.constructor === Symbol && P !== Symbol.prototype ? "symbol" : typeof P;
    }, m(_);
  }
  var y = en, I = y.inspect, x = ws(), K = x.codes.ERR_INVALID_ARG_TYPE;
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
    var f = "", E = "", l = 0, h = "", p = !1, R = fe(_), O = R.split(`
`), b = fe(P).split(`
`), L = 0, q = "";
    if ($ === "strictEqual" && m(_) === "object" && m(P) === "object" && _ !== null && P !== null && ($ = "strictEqualObject"), O.length === 1 && b.length === 1 && O[0] !== b[0]) {
      var H = O[0].length + b[0].length;
      if (H <= me) {
        if ((m(_) !== "object" || _ === null) && (m(P) !== "object" || P === null) && (_ !== 0 || P !== 0))
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
        for (ht[26] = "".concat(z, "...").concat(X); ht.length > 27; )
          ht.pop();
      return "".concat(ue.notIdentical, `

`).concat(ht.join(`
`), `
`);
    }
    L > 3 && (h = `
`.concat(z, "...").concat(X).concat(h), p = !0), f !== "" && (h = `
  `.concat(f).concat(h), f = "");
    var we = 0, N = ue[$] + `
`.concat(ie, "+ actual").concat(X, " ").concat(oe, "- expected").concat(X), Gt = " ".concat(z, "...").concat(X, " Lines skipped");
    for (L = 0; L < bt; L++) {
      var Fe = L - l;
      if (O.length < L + 1)
        Fe > 1 && L > 2 && (Fe > 4 ? (E += `
`.concat(z, "...").concat(X), p = !0) : Fe > 3 && (E += `
  `.concat(b[L - 2]), we++), E += `
  `.concat(b[L - 1]), we++), l = L, f += `
`.concat(oe, "-").concat(X, " ").concat(b[L]), we++;
      else if (b.length < L + 1)
        Fe > 1 && L > 2 && (Fe > 4 ? (E += `
`.concat(z, "...").concat(X), p = !0) : Fe > 3 && (E += `
  `.concat(O[L - 2]), we++), E += `
  `.concat(O[L - 1]), we++), l = L, E += `
`.concat(ie, "+").concat(X, " ").concat(O[L]), we++;
      else {
        var Lt = b[L], pt = O[L], g = pt !== Lt && (!F(pt, ",") || pt.slice(0, -1) !== Lt);
        g && F(Lt, ",") && Lt.slice(0, -1) === pt && (g = !1, pt += ","), g ? (Fe > 1 && L > 2 && (Fe > 4 ? (E += `
`.concat(z, "...").concat(X), p = !0) : Fe > 3 && (E += `
  `.concat(O[L - 2]), we++), E += `
  `.concat(O[L - 1]), we++), l = L, E += `
`.concat(ie, "+").concat(X, " ").concat(pt), f += `
`.concat(oe, "-").concat(X, " ").concat(Lt), we += 2) : (E += f, f = "", (Fe === 1 || L === 0) && (E += `
  `.concat(pt), we++));
      }
      if (we > 20 && L < bt - 2)
        return "".concat(N).concat(Gt, `
`).concat(E, `
`).concat(z, "...").concat(X).concat(f, `
`) + "".concat(z, "...").concat(X);
    }
    return "".concat(N).concat(p ? Gt : "", `
`).concat(E).concat(f).concat(h).concat(q);
  }
  var Ae = /* @__PURE__ */ function(_, P) {
    c(f, _);
    var $ = u(f);
    function f(E) {
      var l;
      if (r(this, f), m(E) !== "object" || E === null)
        throw new K("options", "Object", E);
      var h = E.message, p = E.operator, R = E.stackStartFn, O = E.actual, b = E.expected, L = Error.stackTraceLimit;
      if (Error.stackTraceLimit = 0, h != null)
        l = $.call(this, String(h));
      else if (Ee.stderr && Ee.stderr.isTTY && (Ee.stderr && Ee.stderr.getColorDepth && Ee.stderr.getColorDepth() !== 1 ? (z = "\x1B[34m", ie = "\x1B[32m", X = "\x1B[39m", oe = "\x1B[31m") : (z = "", ie = "", X = "", oe = "")), m(O) === "object" && O !== null && m(b) === "object" && b !== null && "stack" in O && O instanceof Error && "stack" in b && b instanceof Error && (O = ge(O), b = ge(b)), p === "deepStrictEqual" || p === "strictEqual")
        l = $.call(this, Ne(O, b, p));
      else if (p === "notDeepStrictEqual" || p === "notStrictEqual") {
        var q = ue[p], H = fe(O).split(`
`);
        if (p === "notStrictEqual" && m(O) === "object" && O !== null && (q = ue.notStrictEqualObject), H.length > 30)
          for (H[26] = "".concat(z, "...").concat(X); H.length > 27; )
            H.pop();
        H.length === 1 ? l = $.call(this, "".concat(q, " ").concat(H[0])) : l = $.call(this, "".concat(q, `

`).concat(H.join(`
`), `
`));
      } else {
        var Z = fe(O), ae = "", _e = ue[p];
        p === "notDeepEqual" || p === "notEqual" ? (Z = "".concat(ue[p], `

`).concat(Z), Z.length > 1024 && (Z = "".concat(Z.slice(0, 1021), "..."))) : (ae = "".concat(fe(b)), Z.length > 512 && (Z = "".concat(Z.slice(0, 509), "...")), ae.length > 512 && (ae = "".concat(ae.slice(0, 509), "...")), p === "deepEqual" || p === "equal" ? Z = "".concat(_e, `

`).concat(Z, `

should equal

`) : ae = " ".concat(p, " ").concat(ae)), l = $.call(this, "".concat(Z).concat(ae));
      }
      return Error.stackTraceLimit = L, l.generatedMessage = !h, Object.defineProperty(A(l), "name", {
        value: "AssertionError [ERR_ASSERTION]",
        enumerable: !1,
        writable: !0,
        configurable: !0
      }), l.code = "ERR_ASSERTION", l.actual = O, l.expected = b, l.operator = p, Error.captureStackTrace && Error.captureStackTrace(A(l), R), l.stack, l.name = "AssertionError", d(l);
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
  }(/* @__PURE__ */ T(Error), I.custom);
  return Jr = Ae, Jr;
}
var Wo = Object.prototype.toString, Ps = function(e) {
  var n = Wo.call(e), r = n === "[object Arguments]";
  return r || (r = n !== "[object Array]" && e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && Wo.call(e.callee) === "[object Function]"), r;
}, Zr, Vo;
function $l() {
  if (Vo) return Zr;
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
    ], c = function(T) {
      var S = T.constructor;
      return S && S.prototype === T;
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
    }, d = function() {
      if (typeof window > "u")
        return !1;
      for (var T in window)
        try {
          if (!u["$" + T] && e.call(window, T) && window[T] !== null && typeof window[T] == "object")
            try {
              c(window[T]);
            } catch {
              return !0;
            }
        } catch {
          return !0;
        }
      return !1;
    }(), A = function(T) {
      if (typeof window > "u" || !d)
        return c(T);
      try {
        return c(T);
      } catch {
        return !1;
      }
    };
    t = function(S) {
      var C = S !== null && typeof S == "object", k = n.call(S) === "[object Function]", U = r(S), w = C && n.call(S) === "[object String]", m = [];
      if (!C && !k && !U)
        throw new TypeError("Object.keys called on a non-object");
      var y = a && k;
      if (w && S.length > 0 && !e.call(S, 0))
        for (var I = 0; I < S.length; ++I)
          m.push(String(I));
      if (U && S.length > 0)
        for (var x = 0; x < S.length; ++x)
          m.push(String(x));
      else
        for (var K in S)
          !(y && K === "prototype") && e.call(S, K) && m.push(String(K));
      if (o)
        for (var F = A(S), ee = 0; ee < s.length; ++ee)
          !(F && s[ee] === "constructor") && e.call(S, s[ee]) && m.push(s[ee]);
      return m;
    };
  }
  return Zr = t, Zr;
}
var Ul = Array.prototype.slice, jl = Ps, zo = Object.keys, Vn = zo ? function(e) {
  return zo(e);
} : $l(), Ko = Object.keys;
Vn.shim = function() {
  if (Object.keys) {
    var e = function() {
      var n = Object.keys(arguments);
      return n && n.length === arguments.length;
    }(1, 2);
    e || (Object.keys = function(r) {
      return jl(r) ? Ko(Ul.call(r)) : Ko(r);
    });
  } else
    Object.keys = Vn;
  return Object.keys || Vn;
};
var Cs = Vn, Dl = Cs, Ls = Vi(), xs = Er, Ho = Object, Bl = xs("Array.prototype.push"), Yo = xs("Object.prototype.propertyIsEnumerable"), ql = Ls ? Object.getOwnPropertySymbols : null, Gl = function(e, n) {
  if (e == null)
    throw new TypeError("target must be an object");
  var r = Ho(e);
  if (arguments.length === 1)
    return r;
  for (var i = 1; i < arguments.length; ++i) {
    var o = Ho(arguments[i]), a = Dl(o), s = Ls && (Object.getOwnPropertySymbols || ql);
    if (s)
      for (var c = s(o), u = 0; u < c.length; ++u) {
        var d = c[u];
        Yo(o, d) && Bl(a, d);
      }
    for (var A = 0; A < a.length; ++A) {
      var T = a[A];
      if (Yo(o, T)) {
        var S = o[T];
        r[T] = S;
      }
    }
  }
  return r;
}, Qr = Gl, Wl = function() {
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
}, zl = function() {
  return !Object.assign || Wl() || Vl() ? Qr : Object.assign;
}, Xo = function(t) {
  return t !== t;
}, ks = function(e, n) {
  return e === 0 && n === 0 ? 1 / e === 1 / n : !!(e === n || Xo(e) && Xo(n));
}, Kl = ks, Zi = function() {
  return typeof Object.is == "function" ? Object.is : Kl;
}, ei, Jo;
function Tr() {
  if (Jo) return ei;
  Jo = 1;
  var t = Cs, e = typeof Symbol == "function" && typeof Symbol("foo") == "symbol", n = Object.prototype.toString, r = Array.prototype.concat, i = Es, o = function(u) {
    return typeof u == "function" && n.call(u) === "[object Function]";
  }, a = Ts(), s = function(u, d, A, T) {
    if (d in u) {
      if (T === !0) {
        if (u[d] === A)
          return;
      } else if (!o(T) || !T())
        return;
    }
    a ? i(u, d, A, !0) : i(u, d, A);
  }, c = function(u, d) {
    var A = arguments.length > 2 ? arguments[2] : {}, T = t(d);
    e && (T = r.call(T, Object.getOwnPropertySymbols(d)));
    for (var S = 0; S < T.length; S += 1)
      s(u, T[S], d[T[S]], A[T[S]]);
  };
  return c.supportsDescriptors = !!a, ei = c, ei;
}
var ti, Zo;
function Hl() {
  if (Zo) return ti;
  Zo = 1;
  var t = Zi, e = Tr();
  return ti = function() {
    var r = t();
    return e(Object, { is: r }, {
      is: function() {
        return Object.is !== r;
      }
    }), r;
  }, ti;
}
var ni, Qo;
function Yl() {
  if (Qo) return ni;
  Qo = 1;
  var t = Tr(), e = mr, n = ks, r = Zi, i = Hl(), o = e(r(), Object);
  return t(o, {
    getPolyfill: r,
    implementation: n,
    shim: i
  }), ni = o, ni;
}
var ri, ea;
function Ms() {
  return ea || (ea = 1, ri = function(e) {
    return e !== e;
  }), ri;
}
var ii, ta;
function Fs() {
  if (ta) return ii;
  ta = 1;
  var t = Ms();
  return ii = function() {
    return Number.isNaN && Number.isNaN(NaN) && !Number.isNaN("a") ? Number.isNaN : t;
  }, ii;
}
var oi, na;
function Xl() {
  if (na) return oi;
  na = 1;
  var t = Tr(), e = Fs();
  return oi = function() {
    var r = e();
    return t(Number, { isNaN: r }, {
      isNaN: function() {
        return Number.isNaN !== r;
      }
    }), r;
  }, oi;
}
var ai, ra;
function Jl() {
  if (ra) return ai;
  ra = 1;
  var t = mr, e = Tr(), n = Ms(), r = Fs(), i = Xl(), o = t(r(), Number);
  return e(o, {
    getPolyfill: r,
    implementation: n,
    shim: i
  }), ai = o, ai;
}
var si, ia;
function Zl() {
  if (ia) return si;
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
  }, d = Object.is ? Object.is : Yl(), A = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function() {
    return [];
  }, T = Number.isNaN ? Number.isNaN : Jl();
  function S(g) {
    return g.call.bind(g);
  }
  var C = S(Object.prototype.hasOwnProperty), k = S(Object.prototype.propertyIsEnumerable), U = S(Object.prototype.toString), w = en.types, m = w.isAnyArrayBuffer, y = w.isArrayBufferView, I = w.isDate, x = w.isMap, K = w.isRegExp, F = w.isSet, ee = w.isNativeError, z = w.isBoxedPrimitive, ie = w.isNumberObject, oe = w.isStringObject, X = w.isBooleanObject, ue = w.isBigIntObject, me = w.isSymbolObject, ge = w.isFloat32Array, fe = w.isFloat64Array;
  function Ne(g) {
    if (g.length === 0 || g.length > 10) return !0;
    for (var v = 0; v < g.length; v++) {
      var M = g.charCodeAt(v);
      if (M < 48 || M > 57) return !0;
    }
    return g.length === 10 && g >= Math.pow(2, 32);
  }
  function Ae(g) {
    return Object.keys(g).filter(Ne).concat(A(g).filter(Object.prototype.propertyIsEnumerable.bind(g)));
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
  var P = !0, $ = !1, f = 0, E = 1, l = 2, h = 3;
  function p(g, v) {
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
    return ie(g) ? ie(v) && d(Number.prototype.valueOf.call(g), Number.prototype.valueOf.call(v)) : oe(g) ? oe(v) && String.prototype.valueOf.call(g) === String.prototype.valueOf.call(v) : X(g) ? X(v) && Boolean.prototype.valueOf.call(g) === Boolean.prototype.valueOf.call(v) : ue(g) ? ue(v) && BigInt.prototype.valueOf.call(g) === BigInt.prototype.valueOf.call(v) : me(v) && Symbol.prototype.valueOf.call(g) === Symbol.prototype.valueOf.call(v);
  }
  function q(g, v, M, j) {
    if (g === v)
      return g !== 0 ? !0 : M ? d(g, v) : !0;
    if (M) {
      if (a(g) !== "object")
        return typeof g == "number" && T(g) && T(v);
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
      return Y.length !== ne.length ? !1 : Z(g, v, M, j, E, Y);
    }
    if (B === "[object Object]" && (!x(g) && x(v) || !F(g) && F(v)))
      return !1;
    if (I(g)) {
      if (!I(v) || Date.prototype.getTime.call(g) !== Date.prototype.getTime.call(v))
        return !1;
    } else if (K(g)) {
      if (!K(v) || !p(g, v))
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
      if (m(g)) {
        if (!b(g, v))
          return !1;
      } else if (z(g) && !L(g, v))
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
      var re = A(g);
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
        var un = A(v);
        if (re.length !== un.length && H(v, un).length !== Ie)
          return !1;
      } else {
        var Wt = A(v);
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
      var ln = j.val1.get(g);
      if (ln !== void 0) {
        var dt = j.val2.get(v);
        if (dt !== void 0)
          return ln === dt;
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
        if (T(g))
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
  function Gt(g, v, M, j) {
    for (var B = null, J = u(g), Y = 0; Y < J.length; Y++) {
      var ne = t(J[Y], 2), re = ne[0], Ie = ne[1];
      if (a(re) === "object" && re !== null)
        B === null && (B = /* @__PURE__ */ new Set()), B.add(re);
      else {
        var Pe = v.get(re);
        if (Pe === void 0 && !v.has(re) || !q(Ie, Pe, M, j)) {
          if (M || !ht(g, v, re, Ie, j)) return !1;
          B === null && (B = /* @__PURE__ */ new Set()), B.add(re);
        }
      }
    }
    if (B !== null) {
      for (var un = u(v), Wt = 0; Wt < un.length; Wt++) {
        var ln = t(un[Wt], 2), dt = ln[0], fn = ln[1];
        if (a(dt) === "object" && dt !== null) {
          if (!N(B, g, dt, fn, M, j)) return !1;
        } else if (!M && (!g.has(dt) || !q(g.get(dt), fn, !1, j)) && !N(B, g, dt, fn, !1, j))
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
  function Lt(g, v) {
    return q(g, v, $);
  }
  function pt(g, v) {
    return q(g, v, P);
  }
  return si = {
    isDeepEqual: Lt,
    isDeepStrictEqual: pt
  }, si;
}
var oa;
function _i() {
  if (oa) return Dr.exports;
  oa = 1;
  function t(l) {
    "@babel/helpers - typeof";
    return t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(h) {
      return typeof h;
    } : function(h) {
      return h && typeof Symbol == "function" && h.constructor === Symbol && h !== Symbol.prototype ? "symbol" : typeof h;
    }, t(l);
  }
  function e(l, h, p) {
    return Object.defineProperty(l, "prototype", { writable: !1 }), l;
  }
  function n(l, h) {
    if (!(l instanceof h))
      throw new TypeError("Cannot call a class as a function");
  }
  var r = ws(), i = r.codes, o = i.ERR_AMBIGUOUS_ARGUMENT, a = i.ERR_INVALID_ARG_TYPE, s = i.ERR_INVALID_ARG_VALUE, c = i.ERR_INVALID_RETURN_VALUE, u = i.ERR_MISSING_ARGS, d = Fl(), A = en, T = A.inspect, S = en.types, C = S.isPromise, k = S.isRegExp, U = zl(), w = Zi(), m = Er("RegExp.prototype.test"), y, I;
  function x() {
    var l = Zl();
    y = l.isDeepEqual, I = l.isDeepStrictEqual;
  }
  var K = !1, F = Dr.exports = X, ee = {};
  function z(l) {
    throw l.message instanceof Error ? l.message : new d(l);
  }
  function ie(l, h, p, R, O) {
    var b = arguments.length, L;
    if (b === 0)
      L = "Failed";
    else if (b === 1)
      p = l, l = void 0;
    else {
      if (K === !1) {
        K = !0;
        var q = Ee.emitWarning ? Ee.emitWarning : console.warn.bind(console);
        q("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094");
      }
      b === 2 && (R = "!=");
    }
    if (p instanceof Error) throw p;
    var H = {
      actual: l,
      expected: h,
      operator: R === void 0 ? "fail" : R,
      stackStartFn: O || ie
    };
    p !== void 0 && (H.message = p);
    var Z = new d(H);
    throw L && (Z.message = L, Z.generatedMessage = !0), Z;
  }
  F.fail = ie, F.AssertionError = d;
  function oe(l, h, p, R) {
    if (!p) {
      var O = !1;
      if (h === 0)
        O = !0, R = "No value argument passed to `assert.ok()`";
      else if (R instanceof Error)
        throw R;
      var b = new d({
        actual: p,
        expected: !0,
        message: R,
        operator: "==",
        stackStartFn: l
      });
      throw b.generatedMessage = O, b;
    }
  }
  function X() {
    for (var l = arguments.length, h = new Array(l), p = 0; p < l; p++)
      h[p] = arguments[p];
    oe.apply(void 0, [X, h.length].concat(h));
  }
  F.ok = X, F.equal = function l(h, p, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    h != p && z({
      actual: h,
      expected: p,
      message: R,
      operator: "==",
      stackStartFn: l
    });
  }, F.notEqual = function l(h, p, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    h == p && z({
      actual: h,
      expected: p,
      message: R,
      operator: "!=",
      stackStartFn: l
    });
  }, F.deepEqual = function l(h, p, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    y === void 0 && x(), y(h, p) || z({
      actual: h,
      expected: p,
      message: R,
      operator: "deepEqual",
      stackStartFn: l
    });
  }, F.notDeepEqual = function l(h, p, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    y === void 0 && x(), y(h, p) && z({
      actual: h,
      expected: p,
      message: R,
      operator: "notDeepEqual",
      stackStartFn: l
    });
  }, F.deepStrictEqual = function l(h, p, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    y === void 0 && x(), I(h, p) || z({
      actual: h,
      expected: p,
      message: R,
      operator: "deepStrictEqual",
      stackStartFn: l
    });
  }, F.notDeepStrictEqual = ue;
  function ue(l, h, p) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    y === void 0 && x(), I(l, h) && z({
      actual: l,
      expected: h,
      message: p,
      operator: "notDeepStrictEqual",
      stackStartFn: ue
    });
  }
  F.strictEqual = function l(h, p, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    w(h, p) || z({
      actual: h,
      expected: p,
      message: R,
      operator: "strictEqual",
      stackStartFn: l
    });
  }, F.notStrictEqual = function l(h, p, R) {
    if (arguments.length < 2)
      throw new u("actual", "expected");
    w(h, p) && z({
      actual: h,
      expected: p,
      message: R,
      operator: "notStrictEqual",
      stackStartFn: l
    });
  };
  var me = /* @__PURE__ */ e(function l(h, p, R) {
    var O = this;
    n(this, l), p.forEach(function(b) {
      b in h && (R !== void 0 && typeof R[b] == "string" && k(h[b]) && m(h[b], R[b]) ? O[b] = R[b] : O[b] = h[b]);
    });
  });
  function ge(l, h, p, R, O, b) {
    if (!(p in l) || !I(l[p], h[p])) {
      if (!R) {
        var L = new me(l, O), q = new me(h, O, l), H = new d({
          actual: L,
          expected: q,
          operator: "deepStrictEqual",
          stackStartFn: b
        });
        throw H.actual = l, H.expected = h, H.operator = b.name, H;
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
  function fe(l, h, p, R) {
    if (typeof h != "function") {
      if (k(h)) return m(h, l);
      if (arguments.length === 2)
        throw new a("expected", ["Function", "RegExp"], h);
      if (t(l) !== "object" || l === null) {
        var O = new d({
          actual: l,
          expected: h,
          message: p,
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
        typeof l[L] == "string" && k(h[L]) && m(h[L], l[L]) || ge(l, h, L, p, b, R);
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
      }).catch(function(p) {
        return p;
      });
    });
  }
  function P(l, h, p, R) {
    if (typeof p == "string") {
      if (arguments.length === 4)
        throw new a("error", ["Object", "Error", "Function", "RegExp"], p);
      if (t(h) === "object" && h !== null) {
        if (h.message === p)
          throw new o("error/message", 'The error message "'.concat(h.message, '" is identical to the message.'));
      } else if (h === p)
        throw new o("error/message", 'The error "'.concat(h, '" is identical to the message.'));
      R = p, p = void 0;
    } else if (p != null && t(p) !== "object" && typeof p != "function")
      throw new a("error", ["Object", "Error", "Function", "RegExp"], p);
    if (h === ee) {
      var O = "";
      p && p.name && (O += " (".concat(p.name, ")")), O += R ? ": ".concat(R) : ".";
      var b = l.name === "rejects" ? "rejection" : "exception";
      z({
        actual: void 0,
        expected: p,
        operator: l.name,
        message: "Missing expected ".concat(b).concat(O),
        stackStartFn: l
      });
    }
    if (p && !fe(h, p, R, l))
      throw h;
  }
  function $(l, h, p, R) {
    if (h !== ee) {
      if (typeof p == "string" && (R = p, p = void 0), !p || fe(h, p)) {
        var O = R ? ": ".concat(R) : ".", b = l.name === "doesNotReject" ? "rejection" : "exception";
        z({
          actual: h,
          expected: p,
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
    for (var p = arguments.length, R = new Array(p > 1 ? p - 1 : 0), O = 1; O < p; O++)
      R[O - 1] = arguments[O];
    P.apply(void 0, [l, Ne(h)].concat(R));
  }, F.rejects = function l(h) {
    for (var p = arguments.length, R = new Array(p > 1 ? p - 1 : 0), O = 1; O < p; O++)
      R[O - 1] = arguments[O];
    return _(h).then(function(b) {
      return P.apply(void 0, [l, b].concat(R));
    });
  }, F.doesNotThrow = function l(h) {
    for (var p = arguments.length, R = new Array(p > 1 ? p - 1 : 0), O = 1; O < p; O++)
      R[O - 1] = arguments[O];
    $.apply(void 0, [l, Ne(h)].concat(R));
  }, F.doesNotReject = function l(h) {
    for (var p = arguments.length, R = new Array(p > 1 ? p - 1 : 0), O = 1; O < p; O++)
      R[O - 1] = arguments[O];
    return _(h).then(function(b) {
      return $.apply(void 0, [l, b].concat(R));
    });
  }, F.ifError = function l(h) {
    if (h != null) {
      var p = "ifError got unwanted exception: ";
      t(h) === "object" && typeof h.message == "string" ? h.message.length === 0 && h.constructor ? p += h.constructor.name : p += h.message : p += T(h);
      var R = new d({
        actual: h,
        expected: null,
        operator: "ifError",
        message: p,
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
  function f(l, h, p, R, O) {
    if (!k(h))
      throw new a("regexp", "RegExp", h);
    var b = O === "match";
    if (typeof l != "string" || m(h, l) !== b) {
      if (p instanceof Error)
        throw p;
      var L = !p;
      p = p || (typeof l != "string" ? 'The "string" argument must be of type string. Received type ' + "".concat(t(l), " (").concat(T(l), ")") : (b ? "The input did not match the regular expression " : "The input was expected to not match the regular expression ") + "".concat(T(h), `. Input:

`).concat(T(l), `
`));
      var q = new d({
        actual: l,
        expected: h,
        message: p,
        operator: O,
        stackStartFn: R
      });
      throw q.generatedMessage = L, q;
    }
  }
  F.match = function l(h, p, R) {
    f(h, p, R, l, "match");
  }, F.doesNotMatch = function l(h, p, R) {
    f(h, p, R, l, "doesNotMatch");
  };
  function E() {
    for (var l = arguments.length, h = new Array(l), p = 0; p < l; p++)
      h[p] = arguments[p];
    oe.apply(void 0, [E, h.length].concat(h));
  }
  return F.strict = U(E, F, {
    equal: F.strictEqual,
    deepEqual: F.deepStrictEqual,
    notEqual: F.notStrictEqual,
    notDeepEqual: F.notDeepStrictEqual
  }), F.strict.strict = F.strict, Dr.exports;
}
var Ql = _i();
const zn = /* @__PURE__ */ eu(Ql), fA = "aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc", ef = 0, hA = 1, pA = 2, dA = 3, gA = 4, yA = 5, mA = 6, tf = 360n, EA = 10n, nf = 10000n, rf = 0n, $s = "v1", Us = "spectre";
function vr(t) {
  return `${Us}_${t}_${$s}_${mt.programSuffix}.aleo`;
}
const AA = () => vr(mt.programs.accessControl), TA = () => vr(mt.programs.aclManager), of = () => vr(mt.programs.stcredits), vA = () => vr(mt.programs.stcreditsPoints);
function SA(t) {
  const e = (t + 1).toString().padStart(3, "0");
  return `${Us}_${mt.programs.delegator}_${$s}_${mt.programSuffix}_${e}.aleo`;
}
let mt;
function OA(t) {
  zn(!mt), mt = t;
}
const kn = globalThis || void 0 || self;
var js = typeof kn == "object" && kn && kn.Object === Object && kn, af = typeof self == "object" && self && self.Object === Object && self, at = js || af || Function("return this")(), We = at.Symbol, Ds = Object.prototype, sf = Ds.hasOwnProperty, cf = Ds.toString, hn = We ? We.toStringTag : void 0;
function uf(t) {
  var e = sf.call(t, hn), n = t[hn];
  try {
    t[hn] = void 0;
    var r = !0;
  } catch {
  }
  var i = cf.call(t);
  return r && (e ? t[hn] = n : delete t[hn]), i;
}
var lf = Object.prototype, ff = lf.toString;
function hf(t) {
  return ff.call(t);
}
var pf = "[object Null]", df = "[object Undefined]", aa = We ? We.toStringTag : void 0;
function wt(t) {
  return t == null ? t === void 0 ? df : pf : aa && aa in Object(t) ? uf(t) : hf(t);
}
function Je(t) {
  return t != null && typeof t == "object";
}
var gf = "[object Symbol]";
function Sr(t) {
  return typeof t == "symbol" || Je(t) && wt(t) == gf;
}
function Or(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, i = Array(r); ++n < r; )
    i[n] = e(t[n], n, t);
  return i;
}
var te = Array.isArray, yf = 1 / 0, sa = We ? We.prototype : void 0, ca = sa ? sa.toString : void 0;
function Bs(t) {
  if (typeof t == "string")
    return t;
  if (te(t))
    return Or(t, Bs) + "";
  if (Sr(t))
    return ca ? ca.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -yf ? "-0" : e;
}
var mf = /\s/;
function Ef(t) {
  for (var e = t.length; e-- && mf.test(t.charAt(e)); )
    ;
  return e;
}
var Af = /^\s+/;
function Tf(t) {
  return t && t.slice(0, Ef(t) + 1).replace(Af, "");
}
function Ve(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var ua = NaN, vf = /^[-+]0x[0-9a-f]+$/i, Sf = /^0b[01]+$/i, Of = /^0o[0-7]+$/i, If = parseInt;
function bf(t) {
  if (typeof t == "number")
    return t;
  if (Sr(t))
    return ua;
  if (Ve(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = Ve(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = Tf(t);
  var n = Sf.test(t);
  return n || Of.test(t) ? If(t.slice(2), n ? 2 : 8) : vf.test(t) ? ua : +t;
}
var la = 1 / 0, Rf = 17976931348623157e292;
function Nf(t) {
  if (!t)
    return t === 0 ? t : 0;
  if (t = bf(t), t === la || t === -la) {
    var e = t < 0 ? -1 : 1;
    return e * Rf;
  }
  return t === t ? t : 0;
}
function Ir(t) {
  var e = Nf(t), n = e % 1;
  return e === e ? n ? e - n : e : 0;
}
function nn(t) {
  return t;
}
var _f = "[object AsyncFunction]", wf = "[object Function]", Pf = "[object GeneratorFunction]", Cf = "[object Proxy]";
function St(t) {
  if (!Ve(t))
    return !1;
  var e = wt(t);
  return e == wf || e == Pf || e == _f || e == Cf;
}
var ci = at["__core-js_shared__"], fa = function() {
  var t = /[^.]+$/.exec(ci && ci.keys && ci.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Lf(t) {
  return !!fa && fa in t;
}
var xf = Function.prototype, kf = xf.toString;
function Dt(t) {
  if (t != null) {
    try {
      return kf.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Mf = /[\\^$.*+?()[\]{}|]/g, Ff = /^\[object .+?Constructor\]$/, $f = Function.prototype, Uf = Object.prototype, jf = $f.toString, Df = Uf.hasOwnProperty, Bf = RegExp(
  "^" + jf.call(Df).replace(Mf, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function qf(t) {
  if (!Ve(t) || Lf(t))
    return !1;
  var e = St(t) ? Bf : Ff;
  return e.test(Dt(t));
}
function Gf(t, e) {
  return t?.[e];
}
function Bt(t, e) {
  var n = Gf(t, e);
  return qf(n) ? n : void 0;
}
var wi = Bt(at, "WeakMap"), ha = Object.create, Wf = /* @__PURE__ */ function() {
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
function Vf(t, e, n) {
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
function zf(t, e) {
  var n = -1, r = t.length;
  for (e || (e = Array(r)); ++n < r; )
    e[n] = t[n];
  return e;
}
var Kf = 800, Hf = 16, Yf = Date.now;
function Xf(t) {
  var e = 0, n = 0;
  return function() {
    var r = Yf(), i = Hf - (r - n);
    if (n = r, i > 0) {
      if (++e >= Kf)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
function Jf(t) {
  return function() {
    return t;
  };
}
var rr = function() {
  try {
    var t = Bt(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}(), Zf = rr ? function(t, e) {
  return rr(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Jf(e),
    writable: !0
  });
} : nn, Qf = Xf(Zf);
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
function eh(t) {
  return t !== t;
}
function th(t, e, n) {
  for (var r = n - 1, i = t.length; ++r < i; )
    if (t[r] === e)
      return r;
  return -1;
}
function Qi(t, e, n) {
  return e === e ? th(t, e, n) : Gs(t, eh, n);
}
function Ws(t, e) {
  var n = t == null ? 0 : t.length;
  return !!n && Qi(t, e, 0) > -1;
}
var nh = 9007199254740991, rh = /^(?:0|[1-9]\d*)$/;
function br(t, e) {
  var n = typeof t;
  return e = e ?? nh, !!e && (n == "number" || n != "symbol" && rh.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function eo(t, e, n) {
  e == "__proto__" && rr ? rr(t, e, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : t[e] = n;
}
function Rn(t, e) {
  return t === e || t !== t && e !== e;
}
var ih = Object.prototype, oh = ih.hasOwnProperty;
function Rr(t, e, n) {
  var r = t[e];
  (!(oh.call(t, e) && Rn(r, n)) || n === void 0 && !(e in t)) && eo(t, e, n);
}
function to(t, e, n, r) {
  var i = !n;
  n || (n = {});
  for (var o = -1, a = e.length; ++o < a; ) {
    var s = e[o], c = void 0;
    c === void 0 && (c = t[s]), i ? eo(n, s, c) : Rr(n, s, c);
  }
  return n;
}
var pa = Math.max;
function ah(t, e, n) {
  return e = pa(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var r = arguments, i = -1, o = pa(r.length - e, 0), a = Array(o); ++i < o; )
      a[i] = r[e + i];
    i = -1;
    for (var s = Array(e + 1); ++i < e; )
      s[i] = r[i];
    return s[e] = n(a), Vf(t, this, s);
  };
}
function no(t, e) {
  return Qf(ah(t, e, nn), t + "");
}
var sh = 9007199254740991;
function ro(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= sh;
}
function st(t) {
  return t != null && ro(t.length) && !St(t);
}
function Vs(t, e, n) {
  if (!Ve(n))
    return !1;
  var r = typeof e;
  return (r == "number" ? st(n) && br(e, n.length) : r == "string" && e in n) ? Rn(n[e], t) : !1;
}
function ch(t) {
  return no(function(e, n) {
    var r = -1, i = n.length, o = i > 1 ? n[i - 1] : void 0, a = i > 2 ? n[2] : void 0;
    for (o = t.length > 3 && typeof o == "function" ? (i--, o) : void 0, a && Vs(n[0], n[1], a) && (o = i < 3 ? void 0 : o, i = 1), e = Object(e); ++r < i; ) {
      var s = n[r];
      s && t(e, s, r, o);
    }
    return e;
  });
}
var uh = Object.prototype;
function Nn(t) {
  var e = t && t.constructor, n = typeof e == "function" && e.prototype || uh;
  return t === n;
}
function lh(t, e) {
  for (var n = -1, r = Array(t); ++n < t; )
    r[n] = e(n);
  return r;
}
var fh = "[object Arguments]";
function da(t) {
  return Je(t) && wt(t) == fh;
}
var zs = Object.prototype, hh = zs.hasOwnProperty, ph = zs.propertyIsEnumerable, Nr = da(/* @__PURE__ */ function() {
  return arguments;
}()) ? da : function(t) {
  return Je(t) && hh.call(t, "callee") && !ph.call(t, "callee");
};
function dh() {
  return !1;
}
var Ks = typeof exports == "object" && exports && !exports.nodeType && exports, ga = Ks && typeof module == "object" && module && !module.nodeType && module, gh = ga && ga.exports === Ks, ya = gh ? at.Buffer : void 0, yh = ya ? ya.isBuffer : void 0, Tn = yh || dh, mh = "[object Arguments]", Eh = "[object Array]", Ah = "[object Boolean]", Th = "[object Date]", vh = "[object Error]", Sh = "[object Function]", Oh = "[object Map]", Ih = "[object Number]", bh = "[object Object]", Rh = "[object RegExp]", Nh = "[object Set]", _h = "[object String]", wh = "[object WeakMap]", Ph = "[object ArrayBuffer]", Ch = "[object DataView]", Lh = "[object Float32Array]", xh = "[object Float64Array]", kh = "[object Int8Array]", Mh = "[object Int16Array]", Fh = "[object Int32Array]", $h = "[object Uint8Array]", Uh = "[object Uint8ClampedArray]", jh = "[object Uint16Array]", Dh = "[object Uint32Array]", le = {};
le[Lh] = le[xh] = le[kh] = le[Mh] = le[Fh] = le[$h] = le[Uh] = le[jh] = le[Dh] = !0;
le[mh] = le[Eh] = le[Ph] = le[Ah] = le[Ch] = le[Th] = le[vh] = le[Sh] = le[Oh] = le[Ih] = le[bh] = le[Rh] = le[Nh] = le[_h] = le[wh] = !1;
function Bh(t) {
  return Je(t) && ro(t.length) && !!le[wt(t)];
}
function _r(t) {
  return function(e) {
    return t(e);
  };
}
var Hs = typeof exports == "object" && exports && !exports.nodeType && exports, En = Hs && typeof module == "object" && module && !module.nodeType && module, qh = En && En.exports === Hs, ui = qh && js.process, Nt = function() {
  try {
    var t = En && En.require && En.require("util").types;
    return t || ui && ui.binding && ui.binding("util");
  } catch {
  }
}(), ma = Nt && Nt.isTypedArray, io = ma ? _r(ma) : Bh, Gh = Object.prototype, Wh = Gh.hasOwnProperty;
function Ys(t, e) {
  var n = te(t), r = !n && Nr(t), i = !n && !r && Tn(t), o = !n && !r && !i && io(t), a = n || r || i || o, s = a ? lh(t.length, String) : [], c = s.length;
  for (var u in t)
    (e || Wh.call(t, u)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    br(u, c))) && s.push(u);
  return s;
}
function Xs(t, e) {
  return function(n) {
    return t(e(n));
  };
}
var Vh = Xs(Object.keys, Object), zh = Object.prototype, Kh = zh.hasOwnProperty;
function Js(t) {
  if (!Nn(t))
    return Vh(t);
  var e = [];
  for (var n in Object(t))
    Kh.call(t, n) && n != "constructor" && e.push(n);
  return e;
}
function ze(t) {
  return st(t) ? Ys(t) : Js(t);
}
var Hh = Object.prototype, Yh = Hh.hasOwnProperty, Ue = ch(function(t, e) {
  if (Nn(e) || st(e)) {
    to(e, ze(e), t);
    return;
  }
  for (var n in e)
    Yh.call(e, n) && Rr(t, n, e[n]);
});
function Xh(t) {
  var e = [];
  if (t != null)
    for (var n in Object(t))
      e.push(n);
  return e;
}
var Jh = Object.prototype, Zh = Jh.hasOwnProperty;
function Qh(t) {
  if (!Ve(t))
    return Xh(t);
  var e = Nn(t), n = [];
  for (var r in t)
    r == "constructor" && (e || !Zh.call(t, r)) || n.push(r);
  return n;
}
function Zs(t) {
  return st(t) ? Ys(t, !0) : Qh(t);
}
var ep = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, tp = /^\w*$/;
function oo(t, e) {
  if (te(t))
    return !1;
  var n = typeof t;
  return n == "number" || n == "symbol" || n == "boolean" || t == null || Sr(t) ? !0 : tp.test(t) || !ep.test(t) || e != null && t in Object(e);
}
var vn = Bt(Object, "create");
function np() {
  this.__data__ = vn ? vn(null) : {}, this.size = 0;
}
function rp(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var ip = "__lodash_hash_undefined__", op = Object.prototype, ap = op.hasOwnProperty;
function sp(t) {
  var e = this.__data__;
  if (vn) {
    var n = e[t];
    return n === ip ? void 0 : n;
  }
  return ap.call(e, t) ? e[t] : void 0;
}
var cp = Object.prototype, up = cp.hasOwnProperty;
function lp(t) {
  var e = this.__data__;
  return vn ? e[t] !== void 0 : up.call(e, t);
}
var fp = "__lodash_hash_undefined__";
function hp(t, e) {
  var n = this.__data__;
  return this.size += this.has(t) ? 0 : 1, n[t] = vn && e === void 0 ? fp : e, this;
}
function $t(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
$t.prototype.clear = np;
$t.prototype.delete = rp;
$t.prototype.get = sp;
$t.prototype.has = lp;
$t.prototype.set = hp;
function pp() {
  this.__data__ = [], this.size = 0;
}
function wr(t, e) {
  for (var n = t.length; n--; )
    if (Rn(t[n][0], e))
      return n;
  return -1;
}
var dp = Array.prototype, gp = dp.splice;
function yp(t) {
  var e = this.__data__, n = wr(e, t);
  if (n < 0)
    return !1;
  var r = e.length - 1;
  return n == r ? e.pop() : gp.call(e, n, 1), --this.size, !0;
}
function mp(t) {
  var e = this.__data__, n = wr(e, t);
  return n < 0 ? void 0 : e[n][1];
}
function Ep(t) {
  return wr(this.__data__, t) > -1;
}
function Ap(t, e) {
  var n = this.__data__, r = wr(n, t);
  return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this;
}
function Ot(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Ot.prototype.clear = pp;
Ot.prototype.delete = yp;
Ot.prototype.get = mp;
Ot.prototype.has = Ep;
Ot.prototype.set = Ap;
var Sn = Bt(at, "Map");
function Tp() {
  this.size = 0, this.__data__ = {
    hash: new $t(),
    map: new (Sn || Ot)(),
    string: new $t()
  };
}
function vp(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Pr(t, e) {
  var n = t.__data__;
  return vp(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
}
function Sp(t) {
  var e = Pr(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function Op(t) {
  return Pr(this, t).get(t);
}
function Ip(t) {
  return Pr(this, t).has(t);
}
function bp(t, e) {
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
It.prototype.clear = Tp;
It.prototype.delete = Sp;
It.prototype.get = Op;
It.prototype.has = Ip;
It.prototype.set = bp;
var Rp = "Expected a function";
function ao(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Rp);
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
var Np = 500;
function _p(t) {
  var e = ao(t, function(r) {
    return n.size === Np && n.clear(), r;
  }), n = e.cache;
  return e;
}
var wp = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Pp = /\\(\\)?/g, Cp = _p(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(wp, function(n, r, i, o) {
    e.push(i ? o.replace(Pp, "$1") : r || n);
  }), e;
});
function Lp(t) {
  return t == null ? "" : Bs(t);
}
function Cr(t, e) {
  return te(t) ? t : oo(t, e) ? [t] : Cp(Lp(t));
}
var xp = 1 / 0;
function _n(t) {
  if (typeof t == "string" || Sr(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -xp ? "-0" : e;
}
function so(t, e) {
  e = Cr(e, t);
  for (var n = 0, r = e.length; t != null && n < r; )
    t = t[_n(e[n++])];
  return n && n == r ? t : void 0;
}
function kp(t, e, n) {
  var r = t == null ? void 0 : so(t, e);
  return r === void 0 ? n : r;
}
function co(t, e) {
  for (var n = -1, r = e.length, i = t.length; ++n < r; )
    t[i + n] = e[n];
  return t;
}
var Ea = We ? We.isConcatSpreadable : void 0;
function Mp(t) {
  return te(t) || Nr(t) || !!(Ea && t && t[Ea]);
}
function uo(t, e, n, r, i) {
  var o = -1, a = t.length;
  for (n || (n = Mp), i || (i = []); ++o < a; ) {
    var s = t[o];
    n(s) ? co(i, s) : r || (i[i.length] = s);
  }
  return i;
}
function Ye(t) {
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
function Fp(t, e, n, r) {
  var i = -1, o = t == null ? 0 : t.length;
  for (r && o && (n = t[++i]); ++i < o; )
    n = e(n, t[i], i, t);
  return n;
}
function $p() {
  this.__data__ = new Ot(), this.size = 0;
}
function Up(t) {
  var e = this.__data__, n = e.delete(t);
  return this.size = e.size, n;
}
function jp(t) {
  return this.__data__.get(t);
}
function Dp(t) {
  return this.__data__.has(t);
}
var Bp = 200;
function qp(t, e) {
  var n = this.__data__;
  if (n instanceof Ot) {
    var r = n.__data__;
    if (!Sn || r.length < Bp - 1)
      return r.push([t, e]), this.size = ++n.size, this;
    n = this.__data__ = new It(r);
  }
  return n.set(t, e), this.size = n.size, this;
}
function ot(t) {
  var e = this.__data__ = new Ot(t);
  this.size = e.size;
}
ot.prototype.clear = $p;
ot.prototype.delete = Up;
ot.prototype.get = jp;
ot.prototype.has = Dp;
ot.prototype.set = qp;
function Gp(t, e) {
  return t && to(e, ze(e), t);
}
var tc = typeof exports == "object" && exports && !exports.nodeType && exports, Aa = tc && typeof module == "object" && module && !module.nodeType && module, Wp = Aa && Aa.exports === tc, Ta = Wp ? at.Buffer : void 0, va = Ta ? Ta.allocUnsafe : void 0;
function Vp(t, e) {
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
var zp = Object.prototype, Kp = zp.propertyIsEnumerable, Sa = Object.getOwnPropertySymbols, fo = Sa ? function(t) {
  return t == null ? [] : (t = Object(t), lo(Sa(t), function(e) {
    return Kp.call(t, e);
  }));
} : nc;
function Hp(t, e) {
  return to(t, fo(t), e);
}
var Yp = Object.getOwnPropertySymbols, Xp = Yp ? function(t) {
  for (var e = []; t; )
    co(e, fo(t)), t = Qs(t);
  return e;
} : nc;
function rc(t, e, n) {
  var r = e(t);
  return te(t) ? r : co(r, n(t));
}
function Pi(t) {
  return rc(t, ze, fo);
}
function Jp(t) {
  return rc(t, Zs, Xp);
}
var Ci = Bt(at, "DataView"), Li = Bt(at, "Promise"), Zt = Bt(at, "Set"), Oa = "[object Map]", Zp = "[object Object]", Ia = "[object Promise]", ba = "[object Set]", Ra = "[object WeakMap]", Na = "[object DataView]", Qp = Dt(Ci), ed = Dt(Sn), td = Dt(Li), nd = Dt(Zt), rd = Dt(wi), qe = wt;
(Ci && qe(new Ci(new ArrayBuffer(1))) != Na || Sn && qe(new Sn()) != Oa || Li && qe(Li.resolve()) != Ia || Zt && qe(new Zt()) != ba || wi && qe(new wi()) != Ra) && (qe = function(t) {
  var e = wt(t), n = e == Zp ? t.constructor : void 0, r = n ? Dt(n) : "";
  if (r)
    switch (r) {
      case Qp:
        return Na;
      case ed:
        return Oa;
      case td:
        return Ia;
      case nd:
        return ba;
      case rd:
        return Ra;
    }
  return e;
});
var id = Object.prototype, od = id.hasOwnProperty;
function ad(t) {
  var e = t.length, n = new t.constructor(e);
  return e && typeof t[0] == "string" && od.call(t, "index") && (n.index = t.index, n.input = t.input), n;
}
var ir = at.Uint8Array;
function sd(t) {
  var e = new t.constructor(t.byteLength);
  return new ir(e).set(new ir(t)), e;
}
function cd(t, e) {
  var n = t.buffer;
  return new t.constructor(n, t.byteOffset, t.byteLength);
}
var ud = /\w*$/;
function ld(t) {
  var e = new t.constructor(t.source, ud.exec(t));
  return e.lastIndex = t.lastIndex, e;
}
var _a = We ? We.prototype : void 0, wa = _a ? _a.valueOf : void 0;
function fd(t) {
  return wa ? Object(wa.call(t)) : {};
}
function hd(t, e) {
  var n = t.buffer;
  return new t.constructor(n, t.byteOffset, t.length);
}
var pd = "[object Boolean]", dd = "[object Date]", gd = "[object Map]", yd = "[object Number]", md = "[object RegExp]", Ed = "[object Set]", Ad = "[object String]", Td = "[object Symbol]", vd = "[object ArrayBuffer]", Sd = "[object DataView]", Od = "[object Float32Array]", Id = "[object Float64Array]", bd = "[object Int8Array]", Rd = "[object Int16Array]", Nd = "[object Int32Array]", _d = "[object Uint8Array]", wd = "[object Uint8ClampedArray]", Pd = "[object Uint16Array]", Cd = "[object Uint32Array]";
function Ld(t, e, n) {
  var r = t.constructor;
  switch (e) {
    case vd:
      return sd(t);
    case pd:
    case dd:
      return new r(+t);
    case Sd:
      return cd(t);
    case Od:
    case Id:
    case bd:
    case Rd:
    case Nd:
    case _d:
    case wd:
    case Pd:
    case Cd:
      return hd(t);
    case gd:
      return new r();
    case yd:
    case Ad:
      return new r(t);
    case md:
      return ld(t);
    case Ed:
      return new r();
    case Td:
      return fd(t);
  }
}
function xd(t) {
  return typeof t.constructor == "function" && !Nn(t) ? Wf(Qs(t)) : {};
}
var kd = "[object Map]";
function Md(t) {
  return Je(t) && qe(t) == kd;
}
var Pa = Nt && Nt.isMap, Fd = Pa ? _r(Pa) : Md, $d = "[object Set]";
function Ud(t) {
  return Je(t) && qe(t) == $d;
}
var Ca = Nt && Nt.isSet, jd = Ca ? _r(Ca) : Ud, ic = "[object Arguments]", Dd = "[object Array]", Bd = "[object Boolean]", qd = "[object Date]", Gd = "[object Error]", oc = "[object Function]", Wd = "[object GeneratorFunction]", Vd = "[object Map]", zd = "[object Number]", ac = "[object Object]", Kd = "[object RegExp]", Hd = "[object Set]", Yd = "[object String]", Xd = "[object Symbol]", Jd = "[object WeakMap]", Zd = "[object ArrayBuffer]", Qd = "[object DataView]", eg = "[object Float32Array]", tg = "[object Float64Array]", ng = "[object Int8Array]", rg = "[object Int16Array]", ig = "[object Int32Array]", og = "[object Uint8Array]", ag = "[object Uint8ClampedArray]", sg = "[object Uint16Array]", cg = "[object Uint32Array]", se = {};
se[ic] = se[Dd] = se[Zd] = se[Qd] = se[Bd] = se[qd] = se[eg] = se[tg] = se[ng] = se[rg] = se[ig] = se[Vd] = se[zd] = se[ac] = se[Kd] = se[Hd] = se[Yd] = se[Xd] = se[og] = se[ag] = se[sg] = se[cg] = !0;
se[Gd] = se[oc] = se[Jd] = !1;
function Kn(t, e, n, r, i, o) {
  var a;
  if (a !== void 0)
    return a;
  if (!Ve(t))
    return t;
  var s = te(t);
  if (s)
    return a = ad(t), zf(t, a);
  var c = qe(t), u = c == oc || c == Wd;
  if (Tn(t))
    return Vp(t);
  if (c == ac || c == ic || u && !i)
    return a = u ? {} : xd(t), Hp(t, Gp(a, t));
  if (!se[c])
    return i ? t : {};
  a = Ld(t, c), o || (o = new ot());
  var d = o.get(t);
  if (d)
    return d;
  o.set(t, a), jd(t) ? t.forEach(function(S) {
    a.add(Kn(S, e, n, S, t, o));
  }) : Fd(t) && t.forEach(function(S, C) {
    a.set(C, Kn(S, e, n, C, t, o));
  });
  var A = Pi, T = s ? void 0 : A(t);
  return qs(T || t, function(S, C) {
    T && (C = S, S = t[C]), Rr(a, C, Kn(S, e, n, C, t, o));
  }), a;
}
var ug = 4;
function Re(t) {
  return Kn(t, ug);
}
function wn(t) {
  for (var e = -1, n = t == null ? 0 : t.length, r = 0, i = []; ++e < n; ) {
    var o = t[e];
    o && (i[r++] = o);
  }
  return i;
}
var lg = "__lodash_hash_undefined__";
function fg(t) {
  return this.__data__.set(t, lg), this;
}
function hg(t) {
  return this.__data__.has(t);
}
function rn(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.__data__ = new It(); ++e < n; )
    this.add(t[e]);
}
rn.prototype.add = rn.prototype.push = fg;
rn.prototype.has = hg;
function sc(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r; )
    if (e(t[n], n, t))
      return !0;
  return !1;
}
function ho(t, e) {
  return t.has(e);
}
var pg = 1, dg = 2;
function cc(t, e, n, r, i, o) {
  var a = n & pg, s = t.length, c = e.length;
  if (s != c && !(a && c > s))
    return !1;
  var u = o.get(t), d = o.get(e);
  if (u && d)
    return u == e && d == t;
  var A = -1, T = !0, S = n & dg ? new rn() : void 0;
  for (o.set(t, e), o.set(e, t); ++A < s; ) {
    var C = t[A], k = e[A];
    if (r)
      var U = a ? r(k, C, A, e, t, o) : r(C, k, A, t, e, o);
    if (U !== void 0) {
      if (U)
        continue;
      T = !1;
      break;
    }
    if (S) {
      if (!sc(e, function(w, m) {
        if (!ho(S, m) && (C === w || i(C, w, n, r, o)))
          return S.push(m);
      })) {
        T = !1;
        break;
      }
    } else if (!(C === k || i(C, k, n, r, o))) {
      T = !1;
      break;
    }
  }
  return o.delete(t), o.delete(e), T;
}
function gg(t) {
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
var yg = 1, mg = 2, Eg = "[object Boolean]", Ag = "[object Date]", Tg = "[object Error]", vg = "[object Map]", Sg = "[object Number]", Og = "[object RegExp]", Ig = "[object Set]", bg = "[object String]", Rg = "[object Symbol]", Ng = "[object ArrayBuffer]", _g = "[object DataView]", La = We ? We.prototype : void 0, li = La ? La.valueOf : void 0;
function wg(t, e, n, r, i, o, a) {
  switch (n) {
    case _g:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      t = t.buffer, e = e.buffer;
    case Ng:
      return !(t.byteLength != e.byteLength || !o(new ir(t), new ir(e)));
    case Eg:
    case Ag:
    case Sg:
      return Rn(+t, +e);
    case Tg:
      return t.name == e.name && t.message == e.message;
    case Og:
    case bg:
      return t == e + "";
    case vg:
      var s = gg;
    case Ig:
      var c = r & yg;
      if (s || (s = po), t.size != e.size && !c)
        return !1;
      var u = a.get(t);
      if (u)
        return u == e;
      r |= mg, a.set(t, e);
      var d = cc(s(t), s(e), r, i, o, a);
      return a.delete(t), d;
    case Rg:
      if (li)
        return li.call(t) == li.call(e);
  }
  return !1;
}
var Pg = 1, Cg = Object.prototype, Lg = Cg.hasOwnProperty;
function xg(t, e, n, r, i, o) {
  var a = n & Pg, s = Pi(t), c = s.length, u = Pi(e), d = u.length;
  if (c != d && !a)
    return !1;
  for (var A = c; A--; ) {
    var T = s[A];
    if (!(a ? T in e : Lg.call(e, T)))
      return !1;
  }
  var S = o.get(t), C = o.get(e);
  if (S && C)
    return S == e && C == t;
  var k = !0;
  o.set(t, e), o.set(e, t);
  for (var U = a; ++A < c; ) {
    T = s[A];
    var w = t[T], m = e[T];
    if (r)
      var y = a ? r(m, w, T, e, t, o) : r(w, m, T, t, e, o);
    if (!(y === void 0 ? w === m || i(w, m, n, r, o) : y)) {
      k = !1;
      break;
    }
    U || (U = T == "constructor");
  }
  if (k && !U) {
    var I = t.constructor, x = e.constructor;
    I != x && "constructor" in t && "constructor" in e && !(typeof I == "function" && I instanceof I && typeof x == "function" && x instanceof x) && (k = !1);
  }
  return o.delete(t), o.delete(e), k;
}
var kg = 1, xa = "[object Arguments]", ka = "[object Array]", Mn = "[object Object]", Mg = Object.prototype, Ma = Mg.hasOwnProperty;
function Fg(t, e, n, r, i, o) {
  var a = te(t), s = te(e), c = a ? ka : qe(t), u = s ? ka : qe(e);
  c = c == xa ? Mn : c, u = u == xa ? Mn : u;
  var d = c == Mn, A = u == Mn, T = c == u;
  if (T && Tn(t)) {
    if (!Tn(e))
      return !1;
    a = !0, d = !1;
  }
  if (T && !d)
    return o || (o = new ot()), a || io(t) ? cc(t, e, n, r, i, o) : wg(t, e, c, n, r, i, o);
  if (!(n & kg)) {
    var S = d && Ma.call(t, "__wrapped__"), C = A && Ma.call(e, "__wrapped__");
    if (S || C) {
      var k = S ? t.value() : t, U = C ? e.value() : e;
      return o || (o = new ot()), i(k, U, n, r, o);
    }
  }
  return T ? (o || (o = new ot()), xg(t, e, n, r, i, o)) : !1;
}
function go(t, e, n, r, i) {
  return t === e ? !0 : t == null || e == null || !Je(t) && !Je(e) ? t !== t && e !== e : Fg(t, e, n, r, go, i);
}
var $g = 1, Ug = 2;
function jg(t, e, n, r) {
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
      var d = new ot(), A;
      if (!(A === void 0 ? go(u, c, $g | Ug, r, d) : A))
        return !1;
    }
  }
  return !0;
}
function uc(t) {
  return t === t && !Ve(t);
}
function Dg(t) {
  for (var e = ze(t), n = e.length; n--; ) {
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
function Bg(t) {
  var e = Dg(t);
  return e.length == 1 && e[0][2] ? lc(e[0][0], e[0][1]) : function(n) {
    return n === t || jg(n, t, e);
  };
}
function qg(t, e) {
  return t != null && e in Object(t);
}
function fc(t, e, n) {
  e = Cr(e, t);
  for (var r = -1, i = e.length, o = !1; ++r < i; ) {
    var a = _n(e[r]);
    if (!(o = t != null && n(t, a)))
      break;
    t = t[a];
  }
  return o || ++r != i ? o : (i = t == null ? 0 : t.length, !!i && ro(i) && br(a, i) && (te(t) || Nr(t)));
}
function Gg(t, e) {
  return t != null && fc(t, e, qg);
}
var Wg = 1, Vg = 2;
function zg(t, e) {
  return oo(t) && uc(e) ? lc(_n(t), e) : function(n) {
    var r = kp(n, t);
    return r === void 0 && r === e ? Gg(n, t) : go(e, r, Wg | Vg);
  };
}
function Kg(t) {
  return function(e) {
    return e?.[t];
  };
}
function Hg(t) {
  return function(e) {
    return so(e, t);
  };
}
function Yg(t) {
  return oo(t) ? Kg(_n(t)) : Hg(t);
}
function ct(t) {
  return typeof t == "function" ? t : t == null ? nn : typeof t == "object" ? te(t) ? zg(t[0], t[1]) : Bg(t) : Yg(t);
}
function Xg(t, e, n, r) {
  for (var i = -1, o = t == null ? 0 : t.length; ++i < o; ) {
    var a = t[i];
    e(r, a, n(a), t);
  }
  return r;
}
function Jg(t) {
  return function(e, n, r) {
    for (var i = -1, o = Object(e), a = r(e), s = a.length; s--; ) {
      var c = a[++i];
      if (n(o[c], c, o) === !1)
        break;
    }
    return e;
  };
}
var Zg = Jg();
function Qg(t, e) {
  return t && Zg(t, e, ze);
}
function ey(t, e) {
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
var qt = ey(Qg);
function ty(t, e, n, r) {
  return qt(t, function(i, o, a) {
    e(r, i, n(i), a);
  }), r;
}
function ny(t, e) {
  return function(n, r) {
    var i = te(n) ? Xg : ty, o = e ? e() : {};
    return i(n, t, ct(r), o);
  };
}
var hc = Object.prototype, ry = hc.hasOwnProperty, yo = no(function(t, e) {
  t = Object(t);
  var n = -1, r = e.length, i = r > 2 ? e[2] : void 0;
  for (i && Vs(e[0], e[1], i) && (r = 1); ++n < r; )
    for (var o = e[n], a = Zs(o), s = -1, c = a.length; ++s < c; ) {
      var u = a[s], d = t[u];
      (d === void 0 || Rn(d, hc[u]) && !ry.call(t, u)) && (t[u] = o[u]);
    }
  return t;
});
function Fa(t) {
  return Je(t) && st(t);
}
var iy = 200;
function oy(t, e, n, r) {
  var i = -1, o = Ws, a = !0, s = t.length, c = [], u = e.length;
  if (!s)
    return c;
  e.length >= iy && (o = ho, a = !1, e = new rn(e));
  e:
    for (; ++i < s; ) {
      var d = t[i], A = d;
      if (d = d !== 0 ? d : 0, a && A === A) {
        for (var T = u; T--; )
          if (e[T] === A)
            continue e;
        c.push(d);
      } else o(e, A, r) || c.push(d);
    }
  return c;
}
var Lr = no(function(t, e) {
  return Fa(t) ? oy(t, uo(e, 1, Fa, !0)) : [];
});
function on(t) {
  var e = t == null ? 0 : t.length;
  return e ? t[e - 1] : void 0;
}
function be(t, e, n) {
  var r = t == null ? 0 : t.length;
  return r ? (e = e === void 0 ? 1 : Ir(e), ec(t, e < 0 ? 0 : e, r)) : [];
}
function On(t, e, n) {
  var r = t == null ? 0 : t.length;
  return r ? (e = e === void 0 ? 1 : Ir(e), e = r - e, ec(t, 0, e < 0 ? 0 : e)) : [];
}
function ay(t) {
  return typeof t == "function" ? t : nn;
}
function W(t, e) {
  var n = te(t) ? qs : qt;
  return n(t, ay(e));
}
function sy(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r; )
    if (!e(t[n], n, t))
      return !1;
  return !0;
}
function cy(t, e) {
  var n = !0;
  return qt(t, function(r, i, o) {
    return n = !!e(r, i, o), n;
  }), n;
}
function Xe(t, e, n) {
  var r = te(t) ? sy : cy;
  return r(t, ct(e));
}
function pc(t, e) {
  var n = [];
  return qt(t, function(r, i, o) {
    e(r, i, o) && n.push(r);
  }), n;
}
function Ke(t, e) {
  var n = te(t) ? lo : pc;
  return n(t, ct(e));
}
function uy(t) {
  return function(e, n, r) {
    var i = Object(e);
    if (!st(e)) {
      var o = ct(n);
      e = ze(e), n = function(s) {
        return o(i[s], s, i);
      };
    }
    var a = t(e, n, r);
    return a > -1 ? i[o ? e[a] : a] : void 0;
  };
}
var ly = Math.max;
function fy(t, e, n) {
  var r = t == null ? 0 : t.length;
  if (!r)
    return -1;
  var i = n == null ? 0 : Ir(n);
  return i < 0 && (i = ly(r + i, 0)), Gs(t, ct(e), i);
}
var an = uy(fy);
function Ze(t) {
  return t && t.length ? t[0] : void 0;
}
function hy(t, e) {
  var n = -1, r = st(t) ? Array(t.length) : [];
  return qt(t, function(i, o, a) {
    r[++n] = e(i, o, a);
  }), r;
}
function D(t, e) {
  var n = te(t) ? Or : hy;
  return n(t, ct(e));
}
function Ge(t, e) {
  return uo(D(t, e));
}
var py = Object.prototype, dy = py.hasOwnProperty, gy = ny(function(t, e, n) {
  dy.call(t, n) ? t[n].push(e) : eo(t, n, [e]);
}), yy = Object.prototype, my = yy.hasOwnProperty;
function Ey(t, e) {
  return t != null && my.call(t, e);
}
function G(t, e) {
  return t != null && fc(t, e, Ey);
}
var Ay = "[object String]";
function ke(t) {
  return typeof t == "string" || !te(t) && Je(t) && wt(t) == Ay;
}
function Ty(t, e) {
  return Or(e, function(n) {
    return t[n];
  });
}
function ve(t) {
  return t == null ? [] : Ty(t, ze(t));
}
var vy = Math.max;
function Le(t, e, n, r) {
  t = st(t) ? t : ve(t), n = n && !r ? Ir(n) : 0;
  var i = t.length;
  return n < 0 && (n = vy(i + n, 0)), ke(t) ? n <= i && t.indexOf(e, n) > -1 : !!i && Qi(t, e, n) > -1;
}
function $a(t, e, n) {
  var r = t == null ? 0 : t.length;
  if (!r)
    return -1;
  var i = 0;
  return Qi(t, e, i);
}
var Sy = "[object Map]", Oy = "[object Set]", Iy = Object.prototype, by = Iy.hasOwnProperty;
function ce(t) {
  if (t == null)
    return !0;
  if (st(t) && (te(t) || typeof t == "string" || typeof t.splice == "function" || Tn(t) || io(t) || Nr(t)))
    return !t.length;
  var e = qe(t);
  if (e == Sy || e == Oy)
    return !t.size;
  if (Nn(t))
    return !Js(t).length;
  for (var n in t)
    if (by.call(t, n))
      return !1;
  return !0;
}
var Ry = "[object RegExp]";
function Ny(t) {
  return Je(t) && wt(t) == Ry;
}
var Ua = Nt && Nt.isRegExp, Et = Ua ? _r(Ua) : Ny;
function At(t) {
  return t === void 0;
}
var _y = "Expected a function";
function wy(t) {
  if (typeof t != "function")
    throw new TypeError(_y);
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
function Py(t, e, n, r) {
  if (!Ve(t))
    return t;
  e = Cr(e, t);
  for (var i = -1, o = e.length, a = o - 1, s = t; s != null && ++i < o; ) {
    var c = _n(e[i]), u = n;
    if (c === "__proto__" || c === "constructor" || c === "prototype")
      return t;
    if (i != a) {
      var d = s[c];
      u = void 0, u === void 0 && (u = Ve(d) ? d : br(e[i + 1]) ? [] : {});
    }
    Rr(s, c, u), s = s[c];
  }
  return t;
}
function Cy(t, e, n) {
  for (var r = -1, i = e.length, o = {}; ++r < i; ) {
    var a = e[r], s = so(t, a);
    n(s, a) && Py(o, Cr(a, t), s);
  }
  return o;
}
function Qe(t, e) {
  if (t == null)
    return {};
  var n = Or(Jp(t), function(r) {
    return [r];
  });
  return e = ct(e), Cy(t, n, function(r, i) {
    return e(r, i[0]);
  });
}
function Ly(t, e, n, r, i) {
  return i(t, function(o, a, s) {
    n = r ? (r = !1, o) : e(n, o, a, s);
  }), n;
}
function je(t, e, n) {
  var r = te(t) ? Fp : Ly, i = arguments.length < 3;
  return r(t, ct(e), n, i, qt);
}
function xr(t, e) {
  var n = te(t) ? lo : pc;
  return n(t, wy(ct(e)));
}
function xy(t, e) {
  var n;
  return qt(t, function(r, i, o) {
    return n = e(r, i, o), !n;
  }), !!n;
}
function dc(t, e, n) {
  var r = te(t) ? sc : xy;
  return r(t, ct(e));
}
var ky = 1 / 0, My = Zt && 1 / po(new Zt([, -0]))[1] == ky ? function(t) {
  return new Zt(t);
} : Te, Fy = 200;
function $y(t, e, n) {
  var r = -1, i = Ws, o = t.length, a = !0, s = [], c = s;
  if (o >= Fy) {
    var u = My(t);
    if (u)
      return po(u);
    a = !1, i = ho, c = new rn();
  } else
    c = s;
  e:
    for (; ++r < o; ) {
      var d = t[r], A = d;
      if (d = d !== 0 ? d : 0, a && A === A) {
        for (var T = c.length; T--; )
          if (c[T] === A)
            continue e;
        s.push(d);
      } else i(c, A, n) || (c !== s && c.push(A), s.push(d));
    }
  return s;
}
function mo(t) {
  return t && t.length ? $y(t) : [];
}
function xi(t) {
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
function Uy(t) {
  return jy(t) ? t.LABEL : t.name;
}
function jy(t) {
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
class sn extends ut {
  constructor(e) {
    super(e.definition), this.orgText = "", Ue(this, Qe(e, (n) => n !== void 0));
  }
}
class Me extends ut {
  constructor(e) {
    super(e.definition), this.ignoreAmbiguities = !1, Ue(this, Qe(e, (n) => n !== void 0));
  }
}
class xe extends ut {
  constructor(e) {
    super(e.definition), this.idx = 1, Ue(this, Qe(e, (n) => n !== void 0));
  }
}
class lt extends ut {
  constructor(e) {
    super(e.definition), this.idx = 1, Ue(this, Qe(e, (n) => n !== void 0));
  }
}
class ft extends ut {
  constructor(e) {
    super(e.definition), this.idx = 1, Ue(this, Qe(e, (n) => n !== void 0));
  }
}
class Se extends ut {
  constructor(e) {
    super(e.definition), this.idx = 1, Ue(this, Qe(e, (n) => n !== void 0));
  }
}
class et extends ut {
  constructor(e) {
    super(e.definition), this.idx = 1, Ue(this, Qe(e, (n) => n !== void 0));
  }
}
class tt extends ut {
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
function Dy(t) {
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
        label: Uy(t.terminalType),
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
      case lt:
        return this.visitRepetitionMandatory(n);
      case ft:
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
function By(t) {
  return t instanceof Me || t instanceof xe || t instanceof Se || t instanceof lt || t instanceof ft || t instanceof et || t instanceof he || t instanceof sn;
}
function or(t, e = []) {
  return t instanceof xe || t instanceof Se || t instanceof et ? !0 : t instanceof tt ? dc(t.definition, (r) => or(r, e)) : t instanceof De && Le(e, t) ? !1 : t instanceof ut ? (t instanceof De && e.push(t), Xe(t.definition, (r) => or(r, e))) : !1;
}
function qy(t) {
  return t instanceof tt;
}
function it(t) {
  if (t instanceof De)
    return "SUBRULE";
  if (t instanceof xe)
    return "OPTION";
  if (t instanceof tt)
    return "OR";
  if (t instanceof lt)
    return "AT_LEAST_ONE";
  if (t instanceof ft)
    return "AT_LEAST_ONE_SEP";
  if (t instanceof et)
    return "MANY_SEP";
  if (t instanceof Se)
    return "MANY";
  if (t instanceof he)
    return "CONSUME";
  throw Error("non exhaustive match");
}
class kr {
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
    return Vy(t);
  if (By(t))
    return Gy(t);
  if (qy(t))
    return Wy(t);
  throw Error("non exhaustive match");
}
function Gy(t) {
  let e = [];
  const n = t.definition;
  let r = 0, i = n.length > r, o, a = !0;
  for (; i && a; )
    o = n[r], a = or(o), e = e.concat(Pn(o)), r = r + 1, i = n.length > r;
  return mo(e);
}
function Wy(t) {
  const e = D(t.definition, (n) => Pn(n));
  return mo(Ye(e));
}
function Vy(t) {
  return [t.terminalType];
}
const Ec = "_~IN~_";
class zy extends kr {
  constructor(e) {
    super(), this.topProd = e, this.follows = {};
  }
  startWalking() {
    return this.walk(this.topProd), this.follows;
  }
  walkTerminal(e, n, r) {
  }
  walkProdRef(e, n, r) {
    const i = Hy(e.referencedRule, e.idx) + this.topProd.name, o = n.concat(r), a = new Me({ definition: o }), s = Pn(a);
    this.follows[i] = s;
  }
}
function Ky(t) {
  const e = {};
  return W(t, (n) => {
    const r = new zy(n).startWalking();
    Ue(e, r);
  }), e;
}
function Hy(t, e) {
  return t.name + e + Ec;
}
function V(t) {
  return t.charCodeAt(0);
}
function fi(t, e) {
  Array.isArray(t) ? t.forEach(function(n) {
    e.push(n);
  }) : e.push(t);
}
function pn(t, e) {
  if (t[e] === !0)
    throw "duplicate flag " + e;
  t[e], t[e] = !0;
}
function Kt(t) {
  if (t === void 0)
    throw Error("Internal Error - Should never get here!");
  return !0;
}
function Yy() {
  throw Error("Internal Error - Should never get here!");
}
function Da(t) {
  return t.type === "Character";
}
const ar = [];
for (let t = V("0"); t <= V("9"); t++)
  ar.push(t);
const sr = [V("_")].concat(ar);
for (let t = V("a"); t <= V("z"); t++)
  sr.push(t);
for (let t = V("A"); t <= V("Z"); t++)
  sr.push(t);
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
], Xy = /[0-9a-fA-F]/, Fn = /[0-9]/, Jy = /[1-9]/;
class Zy {
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
          pn(r, "global");
          break;
        case "i":
          pn(r, "ignoreCase");
          break;
        case "m":
          pn(r, "multiLine");
          break;
        case "u":
          pn(r, "unicode");
          break;
        case "y":
          pn(r, "sticky");
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
    return Yy();
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
        e = ar;
        break;
      case "D":
        e = ar, n = !0;
        break;
      case "s":
        e = Ba;
        break;
      case "S":
        e = Ba, n = !0;
        break;
      case "w":
        e = sr;
        break;
      case "W":
        e = sr, n = !0;
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
          fi(r.value, e), e.push(V("-")), fi(i.value, e);
      } else
        fi(r.value, e);
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
    if (Jy.test(e) === !1)
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
      if (Xy.test(o) === !1)
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
let Yn = {};
const Qy = new Zy();
function Mr(t) {
  const e = t.toString();
  if (Yn.hasOwnProperty(e))
    return Yn[e];
  {
    const n = Qy.pattern(e);
    return Yn[e] = n, n;
  }
}
function em() {
  Yn = {};
}
const Ac = "Complement Sets are not supported for first char optimization", cr = `Unable to use "first char" lexer optimizations:
`;
function tm(t, e = !1) {
  try {
    const n = Mr(t);
    return ki(n.value, {}, n.flags.ignoreCase);
  } catch (n) {
    if (n.message === Ac)
      e && gc(`${cr}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
    else {
      let r = "";
      e && (r = `
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`), xi(`${cr}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + r);
    }
  }
  return [];
}
function ki(t, e, n) {
  switch (t.type) {
    case "Disjunction":
      for (let i = 0; i < t.value.length; i++)
        ki(t.value[i], e, n);
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
              throw Error(Ac);
            W(a.value, (c) => {
              if (typeof c == "number")
                $n(c, e, n);
              else {
                const u = c;
                if (n === !0)
                  for (let d = u.from; d <= u.to; d++)
                    $n(d, e, n);
                else {
                  for (let d = u.from; d <= u.to && d < yn; d++)
                    $n(d, e, n);
                  if (u.to >= yn) {
                    const d = u.from >= yn ? u.from : yn, A = u.to, T = _t(d), S = _t(A);
                    for (let C = T; C <= S; C++)
                      e[C] = C;
                  }
                }
              }
            });
            break;
          case "Group":
            ki(a.value, e, n);
            break;
          default:
            throw Error("Non Exhaustive Match");
        }
        const s = a.quantifier !== void 0 && a.quantifier.atLeast === 0;
        if (
          // A group may be optional due to empty contents /(?:)/
          // or if everything inside it is optional /((a)?)/
          a.type === "Group" && Mi(a) === !1 || // If this term is not a group it may only be optional if it has an optional quantifier
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
  e[r] = r, n === !0 && nm(t, e);
}
function nm(t, e) {
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
function Mi(t) {
  const e = t.quantifier;
  return e && e.atLeast === 0 ? !0 : t.value ? te(t.value) ? Xe(t.value, Mi) : Mi(t.value) : !1;
}
class rm extends Eo {
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
    const n = Mr(e), r = new rm(t);
    return r.visit(n), r.found;
  } else
    return an(e, (n) => Le(t, n.charCodeAt(0))) !== void 0;
}
const Ut = "PATTERN", gn = "defaultMode", Un = "modes";
let Tc = typeof new RegExp("(?:)").sticky == "boolean";
function im(t, e) {
  e = yo(e, {
    useSticky: Tc,
    debug: !1,
    safeMode: !1,
    positionTracking: "full",
    lineTerminatorCharacters: ["\r", `
`],
    tracer: (m, y) => y()
  });
  const n = e.tracer;
  n("initCharCodeToOptimizedIndexMap", () => {
    Nm();
  });
  let r;
  n("Reject Lexer.NA", () => {
    r = xr(t, (m) => m[Ut] === $e.NA);
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
  let a, s, c, u, d;
  n("misc mapping", () => {
    a = D(r, (m) => m.tokenTypeIdx), s = D(r, (m) => {
      const y = m.GROUP;
      if (y !== $e.SKIPPED) {
        if (ke(y))
          return y;
        if (At(y))
          return !1;
        throw Error("non exhaustive match");
      }
    }), c = D(r, (m) => {
      const y = m.LONGER_ALT;
      if (y)
        return te(y) ? D(y, (x) => $a(r, x)) : [$a(r, y)];
    }), u = D(r, (m) => m.PUSH_MODE), d = D(r, (m) => G(m, "POP_MODE"));
  });
  let A;
  n("Line Terminator Handling", () => {
    const m = Oc(e.lineTerminatorCharacters);
    A = D(r, (y) => !1), e.positionTracking !== "onlyOffset" && (A = D(r, (y) => G(y, "LINE_BREAKS") ? !!y.LINE_BREAKS : Sc(y, m) === !1 && Ao(m, y.PATTERN)));
  });
  let T, S, C, k;
  n("Misc Mapping #2", () => {
    T = D(r, vc), S = D(o, Im), C = je(r, (m, y) => {
      const I = y.GROUP;
      return ke(I) && I !== $e.SKIPPED && (m[I] = []), m;
    }, {}), k = D(o, (m, y) => ({
      pattern: o[y],
      longerAlt: c[y],
      canLineTerminator: A[y],
      isCustom: T[y],
      short: S[y],
      group: s[y],
      push: u[y],
      pop: d[y],
      tokenTypeIdx: a[y],
      tokenType: r[y]
    }));
  });
  let U = !0, w = [];
  return e.safeMode || n("First Char Optimization", () => {
    w = je(r, (m, y, I) => {
      if (typeof y.PATTERN == "string") {
        const x = y.PATTERN.charCodeAt(0), K = _t(x);
        hi(m, K, k[I]);
      } else if (te(y.START_CHARS_HINT)) {
        let x;
        W(y.START_CHARS_HINT, (K) => {
          const F = typeof K == "string" ? K.charCodeAt(0) : K, ee = _t(F);
          x !== ee && (x = ee, hi(m, ee, k[I]));
        });
      } else if (Et(y.PATTERN))
        if (y.PATTERN.unicode)
          U = !1, e.ensureOptimizations && xi(`${cr}	Unable to analyze < ${y.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
        else {
          const x = tm(y.PATTERN, e.ensureOptimizations);
          ce(x) && (U = !1), W(x, (K) => {
            hi(m, K, k[I]);
          });
        }
      else
        e.ensureOptimizations && xi(`${cr}	TokenType: <${y.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`), U = !1;
      return m;
    }, []);
  }), {
    emptyGroups: C,
    patternIdxToConfig: k,
    charCodeToPatternIdxToConfig: w,
    hasCustom: i,
    canBeOptimized: U
  };
}
function om(t, e) {
  let n = [];
  const r = sm(t);
  n = n.concat(r.errors);
  const i = cm(r.valid), o = i.valid;
  return n = n.concat(i.errors), n = n.concat(am(o)), n = n.concat(ym(o)), n = n.concat(mm(o, e)), n = n.concat(Em(o)), n;
}
function am(t) {
  let e = [];
  const n = Ke(t, (r) => Et(r[Ut]));
  return e = e.concat(lm(n)), e = e.concat(pm(n)), e = e.concat(dm(n)), e = e.concat(gm(n)), e = e.concat(fm(n)), e;
}
function sm(t) {
  const e = Ke(t, (i) => !G(i, Ut)), n = D(e, (i) => ({
    message: "Token Type: ->" + i.name + "<- missing static 'PATTERN' property",
    type: de.MISSING_PATTERN,
    tokenTypes: [i]
  })), r = Lr(t, e);
  return { errors: n, valid: r };
}
function cm(t) {
  const e = Ke(t, (i) => {
    const o = i[Ut];
    return !Et(o) && !St(o) && !G(o, "exec") && !ke(o);
  }), n = D(e, (i) => ({
    message: "Token Type: ->" + i.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
    type: de.INVALID_PATTERN,
    tokenTypes: [i]
  })), r = Lr(t, e);
  return { errors: n, valid: r };
}
const um = /[^\\][$]/;
function lm(t) {
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
      const a = Mr(o), s = new e();
      return s.visit(a), s.found;
    } catch {
      return um.test(o.source);
    }
  });
  return D(n, (i) => ({
    message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + i.name + `<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,
    type: de.EOI_ANCHOR_FOUND,
    tokenTypes: [i]
  }));
}
function fm(t) {
  const e = Ke(t, (r) => r.PATTERN.test(""));
  return D(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'PATTERN' must not match an empty string",
    type: de.EMPTY_MATCH_PATTERN,
    tokenTypes: [r]
  }));
}
const hm = /[^\\[][\^]|^\^/;
function pm(t) {
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
      const a = Mr(o), s = new e();
      return s.visit(a), s.found;
    } catch {
      return hm.test(o.source);
    }
  });
  return D(n, (i) => ({
    message: `Unexpected RegExp Anchor Error:
	Token Type: ->` + i.name + `<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,
    type: de.SOI_ANCHOR_FOUND,
    tokenTypes: [i]
  }));
}
function dm(t) {
  const e = Ke(t, (r) => {
    const i = r[Ut];
    return i instanceof RegExp && (i.multiline || i.global);
  });
  return D(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
    type: de.UNSUPPORTED_FLAGS_FOUND,
    tokenTypes: [r]
  }));
}
function gm(t) {
  const e = [];
  let n = D(t, (o) => je(t, (a, s) => (o.PATTERN.source === s.PATTERN.source && !Le(e, s) && s.PATTERN !== $e.NA && (e.push(s), a.push(s)), a), []));
  n = wn(n);
  const r = Ke(n, (o) => o.length > 1);
  return D(r, (o) => {
    const a = D(o, (c) => c.name);
    return {
      message: `The same RegExp pattern ->${Ze(o).PATTERN}<-has been used in all of the following Token Types: ${a.join(", ")} <-`,
      type: de.DUPLICATE_PATTERNS_FOUND,
      tokenTypes: o
    };
  });
}
function ym(t) {
  const e = Ke(t, (r) => {
    if (!G(r, "GROUP"))
      return !1;
    const i = r.GROUP;
    return i !== $e.SKIPPED && i !== $e.NA && !ke(i);
  });
  return D(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
    type: de.INVALID_GROUP_TYPE_FOUND,
    tokenTypes: [r]
  }));
}
function mm(t, e) {
  const n = Ke(t, (i) => i.PUSH_MODE !== void 0 && !Le(e, i.PUSH_MODE));
  return D(n, (i) => ({
    message: `Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,
    type: de.PUSH_MODE_DOES_NOT_EXIST,
    tokenTypes: [i]
  }));
}
function Em(t) {
  const e = [], n = je(t, (r, i, o) => {
    const a = i.PATTERN;
    return a === $e.NA || (ke(a) ? r.push({ str: a, idx: o, tokenType: i }) : Et(a) && Tm(a) && r.push({ str: a.source, idx: o, tokenType: i })), r;
  }, []);
  return W(t, (r, i) => {
    W(n, ({ str: o, idx: a, tokenType: s }) => {
      if (i < a && Am(o, r.PATTERN)) {
        const c = `Token: ->${s.name}<- can never be matched.
Because it appears AFTER the Token Type ->${r.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
        e.push({
          message: c,
          type: de.UNREACHABLE_PATTERN,
          tokenTypes: [r, s]
        });
      }
    });
  }), e;
}
function Am(t, e) {
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
function Tm(t) {
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
function vm(t, e, n) {
  const r = [];
  return G(t, gn) || r.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + gn + `> property in its definition
`,
    type: de.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
  }), G(t, Un) || r.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + Un + `> property in its definition
`,
    type: de.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
  }), G(t, Un) && G(t, gn) && !G(t.modes, t.defaultMode) && r.push({
    message: `A MultiMode Lexer cannot be initialized with a ${gn}: <${t.defaultMode}>which does not exist
`,
    type: de.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
  }), G(t, Un) && W(t.modes, (i, o) => {
    W(i, (a, s) => {
      if (At(a))
        r.push({
          message: `A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${s}>
`,
          type: de.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
        });
      else if (G(a, "LONGER_ALT")) {
        const c = te(a.LONGER_ALT) ? a.LONGER_ALT : [a.LONGER_ALT];
        W(c, (u) => {
          !At(u) && !Le(i, u) && r.push({
            message: `A MultiMode Lexer cannot be initialized with a longer_alt <${u.name}> on token <${a.name}> outside of mode <${o}>
`,
            type: de.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE
          });
        });
      }
    });
  }), r;
}
function Sm(t, e, n) {
  const r = [];
  let i = !1;
  const o = wn(Ye(ve(t.modes))), a = xr(o, (c) => c[Ut] === $e.NA), s = Oc(n);
  return e && W(a, (c) => {
    const u = Sc(c, s);
    if (u !== !1) {
      const A = {
        message: Rm(c, u),
        type: u.issue,
        tokenType: c
      };
      r.push(A);
    } else
      G(c, "LINE_BREAKS") ? c.LINE_BREAKS === !0 && (i = !0) : Ao(s, c.PATTERN) && (i = !0);
  }), e && !i && r.push({
    message: `Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,
    type: de.NO_LINE_BREAKS_FLAGS
  }), r;
}
function Om(t) {
  const e = {}, n = ze(t);
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
function Im(t) {
  return ke(t) && t.length === 1 ? t.charCodeAt(0) : !1;
}
const bm = {
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
      Ao(e, t.PATTERN);
    } catch (n) {
      return {
        issue: de.IDENTIFY_TERMINATOR,
        errMsg: n.message
      };
    }
    return !1;
  } else {
    if (ke(t.PATTERN))
      return !1;
    if (vc(t))
      return { issue: de.CUSTOM_LINE_BREAK };
    throw Error("non exhaustive match");
  }
}
function Rm(t, e) {
  if (e.issue === de.IDENTIFY_TERMINATOR)
    return `Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;
  if (e.issue === de.CUSTOM_LINE_BREAK)
    return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;
  throw Error("non exhaustive match");
}
function Oc(t) {
  return D(t, (n) => ke(n) ? n.charCodeAt(0) : n);
}
function hi(t, e, n) {
  t[e] === void 0 ? t[e] = [n] : t[e].push(n);
}
const yn = 256;
let Xn = [];
function _t(t) {
  return t < yn ? t : Xn[t];
}
function Nm() {
  if (ce(Xn)) {
    Xn = new Array(65536);
    for (let t = 0; t < 65536; t++)
      Xn[t] = t > 255 ? 255 + ~~(t / 255) : t;
  }
}
function Cn(t, e) {
  const n = t.tokenTypeIdx;
  return n === e.tokenTypeIdx ? !0 : e.isParent === !0 && e.categoryMatchesMap[n] === !0;
}
function ur(t, e) {
  return t.tokenTypeIdx === e.tokenTypeIdx;
}
let Va = 1;
const Ic = {};
function Ln(t) {
  const e = _m(t);
  wm(e), Cm(e), Pm(e), W(e, (n) => {
    n.isParent = n.categoryMatches.length > 0;
  });
}
function _m(t) {
  let e = Re(t), n = t, r = !0;
  for (; r; ) {
    n = wn(Ye(D(n, (o) => o.CATEGORIES)));
    const i = Lr(n, e);
    e = e.concat(i), ce(i) ? r = !1 : n = i;
  }
  return e;
}
function wm(t) {
  W(t, (e) => {
    Rc(e) || (Ic[Va] = e, e.tokenTypeIdx = Va++), za(e) && !te(e.CATEGORIES) && (e.CATEGORIES = [e.CATEGORIES]), za(e) || (e.CATEGORIES = []), Lm(e) || (e.categoryMatches = []), xm(e) || (e.categoryMatchesMap = {});
  });
}
function Pm(t) {
  W(t, (e) => {
    e.categoryMatches = [], W(e.categoryMatchesMap, (n, r) => {
      e.categoryMatches.push(Ic[r].tokenTypeIdx);
    });
  });
}
function Cm(t) {
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
function za(t) {
  return G(t, "CATEGORIES");
}
function Lm(t) {
  return G(t, "categoryMatches");
}
function xm(t) {
  return G(t, "categoryMatchesMap");
}
function km(t) {
  return G(t, "tokenTypeIdx");
}
const Mm = {
  buildUnableToPopLexerModeMessage(t) {
    return `Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`;
  },
  buildUnexpectedCharactersMessage(t, e, n, r, i) {
    return `unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${n} characters.`;
  }
};
var de;
(function(t) {
  t[t.MISSING_PATTERN = 0] = "MISSING_PATTERN", t[t.INVALID_PATTERN = 1] = "INVALID_PATTERN", t[t.EOI_ANCHOR_FOUND = 2] = "EOI_ANCHOR_FOUND", t[t.UNSUPPORTED_FLAGS_FOUND = 3] = "UNSUPPORTED_FLAGS_FOUND", t[t.DUPLICATE_PATTERNS_FOUND = 4] = "DUPLICATE_PATTERNS_FOUND", t[t.INVALID_GROUP_TYPE_FOUND = 5] = "INVALID_GROUP_TYPE_FOUND", t[t.PUSH_MODE_DOES_NOT_EXIST = 6] = "PUSH_MODE_DOES_NOT_EXIST", t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE", t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY", t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST", t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED", t[t.SOI_ANCHOR_FOUND = 11] = "SOI_ANCHOR_FOUND", t[t.EMPTY_MATCH_PATTERN = 12] = "EMPTY_MATCH_PATTERN", t[t.NO_LINE_BREAKS_FLAGS = 13] = "NO_LINE_BREAKS_FLAGS", t[t.UNREACHABLE_PATTERN = 14] = "UNREACHABLE_PATTERN", t[t.IDENTIFY_TERMINATOR = 15] = "IDENTIFY_TERMINATOR", t[t.CUSTOM_LINE_BREAK = 16] = "CUSTOM_LINE_BREAK", t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE = 17] = "MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE";
})(de || (de = {}));
const mn = {
  deferDefinitionErrorsHandling: !1,
  positionTracking: "full",
  lineTerminatorsPattern: /\n|\r\n?/g,
  lineTerminatorCharacters: [`
`, "\r"],
  ensureOptimizations: !1,
  safeMode: !1,
  errorMessageProvider: Mm,
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
        const { time: s, value: c } = yc(o), u = s > 10 ? console.warn : console.log;
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
          this.config.lineTerminatorsPattern = bm;
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
        this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(vm(i, this.trackStartLines, this.config.lineTerminatorCharacters));
      }), this.TRACE_INIT("performWarningRuntimeChecks", () => {
        this.lexerDefinitionWarning = this.lexerDefinitionWarning.concat(Sm(i, this.trackStartLines, this.config.lineTerminatorCharacters));
      })), i.modes = i.modes ? i.modes : {}, W(i.modes, (s, c) => {
        i.modes[c] = xr(s, (u) => At(u));
      });
      const a = ze(i.modes);
      if (W(i.modes, (s, c) => {
        this.TRACE_INIT(`Mode: <${c}> processing`, () => {
          if (this.modes.push(c), this.config.skipValidations === !1 && this.TRACE_INIT("validatePatterns", () => {
            this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(om(s, a));
          }), ce(this.lexerDefinitionErrors)) {
            Ln(s);
            let u;
            this.TRACE_INIT("analyzeTokenTypes", () => {
              u = im(s, {
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
        if (Tc ? (this.chopInput = nn, this.match = this.matchWithTest) : (this.updateLastIndex = Te, this.match = this.matchWithExec), o && (this.handleModes = Te), this.trackStartLines === !1 && (this.computeNewColumn = nn), this.trackEndLines === !1 && (this.updateTokenEndLineColumnLocation = Te), /full/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createFullToken;
        else if (/onlyStart/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createStartOnlyToken;
        else if (/onlyOffset/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createOffsetOnlyToken;
        else
          throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);
        this.hasCustom ? (this.addToken = this.addTokenUsingPush, this.handlePayload = this.handlePayloadWithCustom) : (this.addToken = this.addTokenUsingMemberAccess, this.handlePayload = this.handlePayloadNoCustom);
      }), this.TRACE_INIT("Failed Optimization Warnings", () => {
        const s = je(this.canModeBeOptimized, (c, u, d) => (u === !1 && c.push(d), c), []);
        if (n.ensureOptimizations && !ce(s))
          throw Error(`Lexer Modes: < ${s.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
      }), this.TRACE_INIT("clearRegExpParserCache", () => {
        em();
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
    let r, i, o, a, s, c, u, d, A, T, S, C, k, U, w;
    const m = e, y = m.length;
    let I = 0, x = 0;
    const K = this.hasCustom ? 0 : Math.floor(e.length / 10), F = new Array(K), ee = [];
    let z = this.trackStartLines ? 1 : void 0, ie = this.trackStartLines ? 1 : void 0;
    const oe = Om(this.emptyGroups), X = this.trackStartLines, ue = this.config.lineTerminatorsPattern;
    let me = 0, ge = [], fe = [];
    const Ne = [], Ae = [];
    Object.freeze(Ae);
    let _;
    function P() {
      return ge;
    }
    function $(p) {
      const R = _t(p), O = fe[R];
      return O === void 0 ? Ae : O;
    }
    const f = (p) => {
      if (Ne.length === 1 && // if we have both a POP_MODE and a PUSH_MODE this is in-fact a "transition"
      // So no error should occur.
      p.tokenType.PUSH_MODE === void 0) {
        const R = this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(p);
        ee.push({
          offset: p.startOffset,
          line: p.startLine,
          column: p.startColumn,
          length: p.image.length,
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
    function E(p) {
      Ne.push(p), fe = this.charCodeToPatternIdxToConfig[p], ge = this.patternIdxToConfig[p], me = ge.length, me = ge.length;
      const R = this.canModeBeOptimized[p] && this.config.safeMode === !1;
      fe && R ? _ = $ : _ = P;
    }
    E.call(this, n);
    let l;
    const h = this.config.recoveryEnabled;
    for (; I < y; ) {
      c = null;
      const p = m.charCodeAt(I), R = _(p), O = R.length;
      for (r = 0; r < O; r++) {
        l = R[r];
        const b = l.pattern;
        u = null;
        const L = l.short;
        if (L !== !1 ? p === L && (c = b) : l.isCustom === !0 ? (w = b.exec(m, I, F, oe), w !== null ? (c = w[0], w.payload !== void 0 && (u = w.payload)) : c = null) : (this.updateLastIndex(b, I), c = this.match(b, e, I)), c !== null) {
          if (s = l.longerAlt, s !== void 0) {
            const q = s.length;
            for (o = 0; o < q; o++) {
              const H = ge[s[o]], Z = H.pattern;
              if (d = null, H.isCustom === !0 ? (w = Z.exec(m, I, F, oe), w !== null ? (a = w[0], w.payload !== void 0 && (d = w.payload)) : a = null) : (this.updateLastIndex(Z, I), a = this.match(Z, e, I)), a && a.length > c.length) {
                c = a, u = d, l = H;
                break;
              }
            }
          }
          break;
        }
      }
      if (c !== null) {
        if (A = c.length, T = l.group, T !== void 0 && (S = l.tokenTypeIdx, C = this.createTokenInstance(c, I, S, l.tokenType, z, ie, A), this.handlePayload(C, u), T === !1 ? x = this.addToken(F, x, C) : oe[T].push(C)), e = this.chopInput(e, A), I = I + A, ie = this.computeNewColumn(ie, A), X === !0 && l.canLineTerminator === !0) {
          let b = 0, L, q;
          ue.lastIndex = 0;
          do
            L = ue.test(c), L === !0 && (q = ue.lastIndex - 1, b++);
          while (L === !0);
          b !== 0 && (z = z + b, ie = A - q, this.updateTokenEndLineColumnLocation(C, T, q, b, z, ie, A));
        }
        this.handleModes(l, f, E, C);
      } else {
        const b = I, L = z, q = ie;
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
function An(t) {
  return Nc(t) ? t.LABEL : t.name;
}
function Nc(t) {
  return ke(t.LABEL) && t.LABEL !== "";
}
const Fm = "parent", Ka = "categories", Ha = "label", Ya = "group", Xa = "push_mode", Ja = "pop_mode", Za = "longer_alt", Qa = "line_breaks", es = "start_chars_hint";
function To(t) {
  return $m(t);
}
function $m(t) {
  const e = t.pattern, n = {};
  if (n.name = t.name, At(e) || (n.PATTERN = e), G(t, Fm))
    throw `The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;
  return G(t, Ka) && (n.CATEGORIES = t[Ka]), Ln([n]), G(t, Ha) && (n.LABEL = t[Ha]), G(t, Ya) && (n.GROUP = t[Ya]), G(t, Ja) && (n.POP_MODE = t[Ja]), G(t, Xa) && (n.PUSH_MODE = t[Xa]), G(t, Za) && (n.LONGER_ALT = t[Za]), G(t, Qa) && (n.LINE_BREAKS = t[Qa]), G(t, es) && (n.START_CHARS_HINT = t[es]), n;
}
const jt = To({ name: "EOF", pattern: $e.NA });
Ln([jt]);
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
function Um(t, e) {
  return Cn(t, e);
}
const _c = {
  buildMismatchTokenMessage({ expected: t, actual: e, previous: n, ruleName: r }) {
    return `Expecting ${Nc(t) ? `--> ${An(t)} <--` : `token of type --> ${t.name} <--`} but found --> '${e.image}' <--`;
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
      const c = je(t, (T, S) => T.concat(S), []), u = D(c, (T) => `[${D(T, (S) => An(S)).join(", ")}]`), A = `one of these possible Token sequences:
${D(u, (T, S) => `  ${S + 1}. ${T}`).join(`
`)}`;
      return o + A + s;
    }
  },
  buildEarlyExitMessage({ expectedIterationPaths: t, actual: e, customUserDescription: n, ruleName: r }) {
    const i = "Expecting: ", a = `
but found: '` + Ze(e).image + "'";
    if (n)
      return i + n + a;
    {
      const c = `expecting at least one iteration which starts with one of these possible Token sequences::
  <${D(t, (u) => `[${D(u, (d) => An(d)).join(",")}]`).join(" ,")}>`;
      return i + c + a;
    }
  }
};
Object.freeze(_c);
const jm = {
  buildRuleNotFoundError(t, e) {
    return "Invalid grammar, reference to a rule which is not defined: ->" + e.nonTerminalName + `<-
inside top level rule: ->` + t.name + "<-";
  }
}, kt = {
  buildDuplicateFoundError(t, e) {
    function n(d) {
      return d instanceof he ? d.terminalType.name : d instanceof De ? d.nonTerminalName : "";
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
function Dm(t, e) {
  const n = new Bm(t, e);
  return n.resolveRefs(), n.errors;
}
class Bm extends cn {
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
class qm extends kr {
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
class Gm extends qm {
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
class Fr extends kr {
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
class Wm extends Fr {
  walkMany(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Ze(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof he && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkMany(e, n, r);
  }
}
class ts extends Fr {
  walkManySep(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Ze(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof he && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkManySep(e, n, r);
  }
}
class Vm extends Fr {
  walkAtLeastOne(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Ze(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof he && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkAtLeastOne(e, n, r);
  }
}
class ns extends Fr {
  walkAtLeastOneSep(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Ze(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof he && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkAtLeastOneSep(e, n, r);
  }
}
function Fi(t, e, n = []) {
  n = Re(n);
  let r = [], i = 0;
  function o(s) {
    return s.concat(be(t, i + 1));
  }
  function a(s) {
    const c = Fi(o(s), e, n);
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
function wc(t, e, n, r) {
  const i = "EXIT_NONE_TERMINAL", o = [i], a = "EXIT_ALTERNATIVE";
  let s = !1;
  const c = e.length, u = c - r - 1, d = [], A = [];
  for (A.push({
    idx: -1,
    def: t,
    ruleStack: [],
    occurrenceStack: []
  }); !ce(A); ) {
    const T = A.pop();
    if (T === a) {
      s && on(A).idx <= u && A.pop();
      continue;
    }
    const S = T.def, C = T.idx, k = T.ruleStack, U = T.occurrenceStack;
    if (ce(S))
      continue;
    const w = S[0];
    if (w === i) {
      const m = {
        idx: C,
        def: be(S),
        ruleStack: On(k),
        occurrenceStack: On(U)
      };
      A.push(m);
    } else if (w instanceof he)
      if (C < c - 1) {
        const m = C + 1, y = e[m];
        if (n(y, w.terminalType)) {
          const I = {
            idx: m,
            def: be(S),
            ruleStack: k,
            occurrenceStack: U
          };
          A.push(I);
        }
      } else if (C === c - 1)
        d.push({
          nextTokenType: w.terminalType,
          nextTokenOccurrence: w.idx,
          ruleStack: k,
          occurrenceStack: U
        }), s = !0;
      else
        throw Error("non exhaustive match");
    else if (w instanceof De) {
      const m = Re(k);
      m.push(w.nonTerminalName);
      const y = Re(U);
      y.push(w.idx);
      const I = {
        idx: C,
        def: w.definition.concat(o, be(S)),
        ruleStack: m,
        occurrenceStack: y
      };
      A.push(I);
    } else if (w instanceof xe) {
      const m = {
        idx: C,
        def: be(S),
        ruleStack: k,
        occurrenceStack: U
      };
      A.push(m), A.push(a);
      const y = {
        idx: C,
        def: w.definition.concat(be(S)),
        ruleStack: k,
        occurrenceStack: U
      };
      A.push(y);
    } else if (w instanceof lt) {
      const m = new Se({
        definition: w.definition,
        idx: w.idx
      }), y = w.definition.concat([m], be(S)), I = {
        idx: C,
        def: y,
        ruleStack: k,
        occurrenceStack: U
      };
      A.push(I);
    } else if (w instanceof ft) {
      const m = new he({
        terminalType: w.separator
      }), y = new Se({
        definition: [m].concat(w.definition),
        idx: w.idx
      }), I = w.definition.concat([y], be(S)), x = {
        idx: C,
        def: I,
        ruleStack: k,
        occurrenceStack: U
      };
      A.push(x);
    } else if (w instanceof et) {
      const m = {
        idx: C,
        def: be(S),
        ruleStack: k,
        occurrenceStack: U
      };
      A.push(m), A.push(a);
      const y = new he({
        terminalType: w.separator
      }), I = new Se({
        definition: [y].concat(w.definition),
        idx: w.idx
      }), x = w.definition.concat([I], be(S)), K = {
        idx: C,
        def: x,
        ruleStack: k,
        occurrenceStack: U
      };
      A.push(K);
    } else if (w instanceof Se) {
      const m = {
        idx: C,
        def: be(S),
        ruleStack: k,
        occurrenceStack: U
      };
      A.push(m), A.push(a);
      const y = new Se({
        definition: w.definition,
        idx: w.idx
      }), I = w.definition.concat([y], be(S)), x = {
        idx: C,
        def: I,
        ruleStack: k,
        occurrenceStack: U
      };
      A.push(x);
    } else if (w instanceof tt)
      for (let m = w.definition.length - 1; m >= 0; m--) {
        const y = w.definition[m], I = {
          idx: C,
          def: y.definition.concat(be(S)),
          ruleStack: k,
          occurrenceStack: U
        };
        A.push(I), A.push(a);
      }
    else if (w instanceof Me)
      A.push({
        idx: C,
        def: w.definition.concat(be(S)),
        ruleStack: k,
        occurrenceStack: U
      });
    else if (w instanceof sn)
      A.push(zm(w, C, k, U));
    else
      throw Error("non exhaustive match");
  }
  return d;
}
function zm(t, e, n, r) {
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
var pe;
(function(t) {
  t[t.OPTION = 0] = "OPTION", t[t.REPETITION = 1] = "REPETITION", t[t.REPETITION_MANDATORY = 2] = "REPETITION_MANDATORY", t[t.REPETITION_MANDATORY_WITH_SEPARATOR = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR", t[t.REPETITION_WITH_SEPARATOR = 4] = "REPETITION_WITH_SEPARATOR", t[t.ALTERNATION = 5] = "ALTERNATION";
})(pe || (pe = {}));
function Pc(t) {
  if (t instanceof xe || t === "Option")
    return pe.OPTION;
  if (t instanceof Se || t === "Repetition")
    return pe.REPETITION;
  if (t instanceof lt || t === "RepetitionMandatory")
    return pe.REPETITION_MANDATORY;
  if (t instanceof ft || t === "RepetitionMandatoryWithSeparator")
    return pe.REPETITION_MANDATORY_WITH_SEPARATOR;
  if (t instanceof et || t === "RepetitionWithSeparator")
    return pe.REPETITION_WITH_SEPARATOR;
  if (t instanceof tt || t === "Alternation")
    return pe.ALTERNATION;
  throw Error("non exhaustive match");
}
function Km(t, e, n, r, i, o) {
  const a = So(t, e, n), s = xc(a) ? ur : Cn;
  return o(a, r, s, i);
}
function Hm(t, e, n, r, i, o) {
  const a = Oo(t, e, i, n), s = xc(a) ? ur : Cn;
  return o(a[0], s, r);
}
function Ym(t, e, n, r) {
  const i = t.length, o = Xe(t, (a) => Xe(a, (s) => s.length === 1));
  if (e)
    return function(a) {
      const s = D(a, (c) => c.GATE);
      for (let c = 0; c < i; c++) {
        const u = t[c], d = u.length, A = s[c];
        if (!(A !== void 0 && A.call(this) === !1))
          e: for (let T = 0; T < d; T++) {
            const S = u[T], C = S.length;
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
    const a = D(t, (c) => Ye(c)), s = je(a, (c, u, d) => (W(u, (A) => {
      G(c, A.tokenTypeIdx) || (c[A.tokenTypeIdx] = d), W(A.categoryMatches, (T) => {
        G(c, T) || (c[T] = d);
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
          const d = s[u], A = d.length;
          for (let T = 0; T < A; T++) {
            const S = this.LA(T + 1);
            if (n(S, d[T]) === !1)
              continue e;
          }
          return a;
        }
      }
    };
}
function Xm(t, e, n) {
  const r = Xe(t, (o) => o.length === 1), i = t.length;
  if (r && !n) {
    const o = Ye(t);
    if (o.length === 1 && ce(o[0].categoryMatches)) {
      const s = o[0].tokenTypeIdx;
      return function() {
        return this.LA(1).tokenTypeIdx === s;
      };
    } else {
      const a = je(o, (s, c, u) => (s[c.tokenTypeIdx] = !0, W(c.categoryMatches, (d) => {
        s[d] = !0;
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
class Jm extends kr {
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
    this.checkIsTarget(e, pe.OPTION, n, r) || super.walkOption(e, n, r);
  }
  walkAtLeastOne(e, n, r) {
    this.checkIsTarget(e, pe.REPETITION_MANDATORY, n, r) || super.walkOption(e, n, r);
  }
  walkAtLeastOneSep(e, n, r) {
    this.checkIsTarget(e, pe.REPETITION_MANDATORY_WITH_SEPARATOR, n, r) || super.walkOption(e, n, r);
  }
  walkMany(e, n, r) {
    this.checkIsTarget(e, pe.REPETITION, n, r) || super.walkOption(e, n, r);
  }
  walkManySep(e, n, r) {
    this.checkIsTarget(e, pe.REPETITION_WITH_SEPARATOR, n, r) || super.walkOption(e, n, r);
  }
}
class Cc extends cn {
  constructor(e, n, r) {
    super(), this.targetOccurrence = e, this.targetProdType = n, this.targetRef = r, this.result = [];
  }
  checkIsTarget(e, n) {
    e.idx === this.targetOccurrence && this.targetProdType === n && (this.targetRef === void 0 || e === this.targetRef) && (this.result = e.definition);
  }
  visitOption(e) {
    this.checkIsTarget(e, pe.OPTION);
  }
  visitRepetition(e) {
    this.checkIsTarget(e, pe.REPETITION);
  }
  visitRepetitionMandatory(e) {
    this.checkIsTarget(e, pe.REPETITION_MANDATORY);
  }
  visitRepetitionMandatoryWithSeparator(e) {
    this.checkIsTarget(e, pe.REPETITION_MANDATORY_WITH_SEPARATOR);
  }
  visitRepetitionWithSeparator(e) {
    this.checkIsTarget(e, pe.REPETITION_WITH_SEPARATOR);
  }
  visitAlternation(e) {
    this.checkIsTarget(e, pe.ALTERNATION);
  }
}
function rs(t) {
  const e = new Array(t);
  for (let n = 0; n < t; n++)
    e[n] = [];
  return e;
}
function pi(t) {
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
function Zm(t, e, n) {
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
  const n = D(t, (a) => Fi([a], 1)), r = rs(n.length), i = D(n, (a) => {
    const s = {};
    return W(a, (c) => {
      const u = pi(c.partialPath);
      W(u, (d) => {
        s[d] = !0;
      });
    }), s;
  });
  let o = n;
  for (let a = 1; a <= e; a++) {
    const s = o;
    o = rs(s.length);
    for (let c = 0; c < s.length; c++) {
      const u = s[c];
      for (let d = 0; d < u.length; d++) {
        const A = u[d].partialPath, T = u[d].suffixDef, S = pi(A);
        if (Zm(i, S, c) || ce(T) || A.length === e) {
          const k = r[c];
          if ($i(k, A) === !1) {
            k.push(A);
            for (let U = 0; U < S.length; U++) {
              const w = S[U];
              i[c][w] = !0;
            }
          }
        } else {
          const k = Fi(T, a + 1, A);
          o[c] = o[c].concat(k), W(k, (U) => {
            const w = pi(U.partialPath);
            W(w, (m) => {
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
  const i = new Cc(t, pe.ALTERNATION, r);
  return e.accept(i), Lc(i.result, n);
}
function Oo(t, e, n, r) {
  const i = new Cc(t, n);
  e.accept(i);
  const o = i.result, s = new Jm(e, t, n).startWalking(), c = new Me({ definition: o }), u = new Me({ definition: s });
  return Lc([c, u], r);
}
function $i(t, e) {
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
function Qm(t, e) {
  return t.length < e.length && Xe(t, (n, r) => {
    const i = e[r];
    return n === i || i.categoryMatchesMap[n.tokenTypeIdx];
  });
}
function xc(t) {
  return Xe(t, (e) => Xe(e, (n) => Xe(n, (r) => ce(r.categoryMatches))));
}
function eE(t) {
  const e = t.lookaheadStrategy.validate({
    rules: t.rules,
    tokenTypes: t.tokenTypes,
    grammarName: t.grammarName
  });
  return D(e, (n) => Object.assign({ type: Ce.CUSTOM_LOOKAHEAD_VALIDATION }, n));
}
function tE(t, e, n, r) {
  const i = Ge(t, (c) => nE(c, n)), o = dE(t, e, n), a = Ge(t, (c) => lE(c, n)), s = Ge(t, (c) => oE(c, t, r, n));
  return i.concat(o, a, s);
}
function nE(t, e) {
  const n = new iE();
  t.accept(n);
  const r = n.allProductions, i = gy(r, rE), o = Qe(i, (s) => s.length > 1);
  return D(ve(o), (s) => {
    const c = Ze(s), u = e.buildDuplicateFoundError(t, s), d = it(c), A = {
      message: u,
      type: Ce.DUPLICATE_PRODUCTIONS,
      ruleName: t.name,
      dslName: d,
      occurrence: c.idx
    }, T = kc(c);
    return T && (A.parameter = T), A;
  });
}
function rE(t) {
  return `${it(t)}_#_${t.idx}_#_${kc(t)}`;
}
function kc(t) {
  return t instanceof he ? t.terminalType.name : t instanceof De ? t.nonTerminalName : "";
}
class iE extends cn {
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
function oE(t, e, n, r) {
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
function aE(t, e, n) {
  const r = [];
  let i;
  return Le(e, t) || (i = `Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${n}<-as it is not defined in any of the super grammars `, r.push({
    message: i,
    type: Ce.INVALID_RULE_OVERRIDE,
    ruleName: t
  })), r;
}
function Mc(t, e, n, r = []) {
  const i = [], o = Jn(e.definition);
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
    const c = Lr(o, r.concat([t])), u = Ge(c, (d) => {
      const A = Re(r);
      return A.push(d), Mc(t, d, n, A);
    });
    return i.concat(u);
  }
}
function Jn(t) {
  let e = [];
  if (ce(t))
    return e;
  const n = Ze(t);
  if (n instanceof De)
    e.push(n.referencedRule);
  else if (n instanceof Me || n instanceof xe || n instanceof lt || n instanceof ft || n instanceof et || n instanceof Se)
    e = e.concat(Jn(n.definition));
  else if (n instanceof tt)
    e = Ye(D(n.definition, (o) => Jn(o.definition)));
  else if (!(n instanceof he)) throw Error("non exhaustive match");
  const r = or(n), i = t.length > 1;
  if (r && i) {
    const o = be(t);
    return e.concat(Jn(o));
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
function sE(t, e) {
  const n = new Io();
  t.accept(n);
  const r = n.alternations;
  return Ge(r, (o) => {
    const a = On(o.definition);
    return Ge(a, (s, c) => {
      const u = wc([s], [], Cn, 1);
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
function cE(t, e, n) {
  const r = new Io();
  t.accept(r);
  let i = r.alternations;
  return i = xr(i, (a) => a.ignoreAmbiguities === !0), Ge(i, (a) => {
    const s = a.idx, c = a.maxLookahead || e, u = So(s, t, c, a), d = hE(u, a, t, n), A = pE(u, a, t, n);
    return d.concat(A);
  });
}
class uE extends cn {
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
function lE(t, e) {
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
function fE(t, e, n) {
  const r = [];
  return W(t, (i) => {
    const o = new uE();
    i.accept(o);
    const a = o.allProductions;
    W(a, (s) => {
      const c = Pc(s), u = s.maxLookahead || e, d = s.idx, T = Oo(d, i, c, u)[0];
      if (ce(Ye(T))) {
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
function hE(t, e, n, r) {
  const i = [], o = je(t, (s, c, u) => (e.definition[u].ignoreAmbiguities === !0 || W(c, (d) => {
    const A = [u];
    W(t, (T, S) => {
      u !== S && $i(T, d) && // ignore (skip) ambiguities with this "other" alternative
      e.definition[S].ignoreAmbiguities !== !0 && A.push(S);
    }), A.length > 1 && !$i(i, d) && (i.push(d), s.push({
      alts: A,
      path: d
    }));
  }), s), []);
  return D(o, (s) => {
    const c = D(s.alts, (d) => d + 1);
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
function pE(t, e, n, r) {
  const i = je(t, (a, s, c) => {
    const u = D(s, (d) => ({ idx: c, path: d }));
    return a.concat(u);
  }, []);
  return wn(Ge(i, (a) => {
    if (e.definition[a.idx].ignoreAmbiguities === !0)
      return [];
    const c = a.idx, u = a.path, d = Ke(i, (T) => (
      // ignore (skip) ambiguities with this "other" alternative
      e.definition[T.idx].ignoreAmbiguities !== !0 && T.idx < c && // checking for strict prefix because identical lookaheads
      // will be be detected using a different validation.
      Qm(T.path, u)
    ));
    return D(d, (T) => {
      const S = [T.idx + 1, c + 1], C = e.idx === 0 ? "" : e.idx;
      return {
        message: r.buildAlternationPrefixAmbiguityError({
          topLevelRule: n,
          alternation: e,
          ambiguityIndices: S,
          prefixPath: T.path
        }),
        type: Ce.AMBIGUOUS_PREFIX_ALTS,
        ruleName: n.name,
        occurrence: C,
        alternatives: S
      };
    });
  }));
}
function dE(t, e, n) {
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
function gE(t) {
  const e = yo(t, {
    errMsgProvider: jm
  }), n = {};
  return W(t.rules, (r) => {
    n[r.name] = r;
  }), Dm(n, e.errMsgProvider);
}
function yE(t) {
  return t = yo(t, {
    errMsgProvider: kt
  }), tE(t.rules, t.tokenTypes, t.errMsgProvider, t.grammarName);
}
const Fc = "MismatchedTokenException", $c = "NoViableAltException", Uc = "EarlyExitException", jc = "NotAllInputParsedException", Dc = [
  Fc,
  $c,
  Uc,
  jc
];
Object.freeze(Dc);
function lr(t) {
  return Le(Dc, t.name);
}
class $r extends Error {
  constructor(e, n) {
    super(e), this.token = n, this.resyncedTokens = [], Object.setPrototypeOf(this, new.target.prototype), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
}
class Bc extends $r {
  constructor(e, n, r) {
    super(e, n), this.previousToken = r, this.name = Fc;
  }
}
class mE extends $r {
  constructor(e, n, r) {
    super(e, n), this.previousToken = r, this.name = $c;
  }
}
class EE extends $r {
  constructor(e, n) {
    super(e, n), this.name = jc;
  }
}
class AE extends $r {
  constructor(e, n, r) {
    super(e, n), this.previousToken = r, this.name = Uc;
  }
}
const di = {}, qc = "InRuleRecoveryException";
class TE extends Error {
  constructor(e) {
    super(e), this.name = qc;
  }
}
class vE {
  initRecoverable(e) {
    this.firstAfterRepMap = {}, this.resyncFollows = {}, this.recoveryEnabled = G(e, "recoveryEnabled") ? e.recoveryEnabled : Tt.recoveryEnabled, this.recoveryEnabled && (this.attemptInRepetitionRecovery = SE);
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
    let d = this.LA(1);
    const A = () => {
      const T = this.LA(0), S = this.errorMessageProvider.buildMismatchTokenMessage({
        expected: i,
        actual: u,
        previous: T,
        ruleName: this.getCurrRuleFullName()
      }), C = new Bc(S, u, this.LA(0));
      C.resyncedTokens = On(s), this.SAVE_ERROR(C);
    };
    for (; !c; )
      if (this.tokenMatcher(d, i)) {
        A();
        return;
      } else if (r.call(this)) {
        A(), e.apply(this, n);
        return;
      } else this.tokenMatcher(d, o) ? c = !0 : (d = this.SKIP_TOKEN(), this.addToResyncTokens(d, s));
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
    throw new TE("sad sad panda");
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
      const i = an(e, (o) => Um(n, o));
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
    return Ye(e);
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
function SE(t, e, n, r, i, o, a) {
  const s = this.getKeyForAutomaticLookahead(r, i);
  let c = this.firstAfterRepMap[s];
  if (c === void 0) {
    const T = this.getCurrRuleFullName(), S = this.getGAstProductions()[T];
    c = new o(S, i).startWalking(), this.firstAfterRepMap[s] = c;
  }
  let u = c.token, d = c.occurrence;
  const A = c.isEndOfRule;
  this.RULE_STACK.length === 1 && A && u === void 0 && (u = jt, d = 1), !(u === void 0 || d === void 0) && this.shouldInRepetitionRecoveryBeTried(u, d, a) && this.tryInRepetitionRecovery(t, e, n, u);
}
const OE = 4, Pt = 8, Gc = 1 << Pt, Wc = 2 << Pt, Ui = 3 << Pt, ji = 4 << Pt, Di = 5 << Pt, Zn = 6 << Pt;
function gi(t, e, n) {
  return n | e | t;
}
class IE {
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
    return Ge(e, (n) => Mc(n, n, kt));
  }
  validateEmptyOrAlternatives(e) {
    return Ge(e, (n) => sE(n, kt));
  }
  validateAmbiguousAlternationAlternatives(e, n) {
    return Ge(e, (r) => cE(r, n, kt));
  }
  validateSomeNonEmptyLookaheadPath(e, n) {
    return fE(e, n, kt);
  }
  buildLookaheadForAlternation(e) {
    return Km(e.prodOccurrence, e.rule, e.maxLookahead, e.hasPredicates, e.dynamicTokensEnabled, Ym);
  }
  buildLookaheadForOptional(e) {
    return Hm(e.prodOccurrence, e.rule, e.maxLookahead, e.dynamicTokensEnabled, Pc(e.prodType), Xm);
  }
}
class bE {
  initLooksAhead(e) {
    this.dynamicTokensEnabled = G(e, "dynamicTokensEnabled") ? e.dynamicTokensEnabled : Tt.dynamicTokensEnabled, this.maxLookahead = G(e, "maxLookahead") ? e.maxLookahead : Tt.maxLookahead, this.lookaheadStrategy = G(e, "lookaheadStrategy") ? e.lookaheadStrategy : new IE({ maxLookahead: this.maxLookahead }), this.lookAheadFuncsCache = /* @__PURE__ */ new Map();
  }
  preComputeLookaheadFunctions(e) {
    W(e, (n) => {
      this.TRACE_INIT(`${n.name} Rule Lookahead`, () => {
        const { alternation: r, repetition: i, option: o, repetitionMandatory: a, repetitionMandatoryWithSeparator: s, repetitionWithSeparator: c } = NE(n);
        W(r, (u) => {
          const d = u.idx === 0 ? "" : u.idx;
          this.TRACE_INIT(`${it(u)}${d}`, () => {
            const A = this.lookaheadStrategy.buildLookaheadForAlternation({
              prodOccurrence: u.idx,
              rule: n,
              maxLookahead: u.maxLookahead || this.maxLookahead,
              hasPredicates: u.hasPredicates,
              dynamicTokensEnabled: this.dynamicTokensEnabled
            }), T = gi(this.fullRuleNameToShort[n.name], Gc, u.idx);
            this.setLaFuncCache(T, A);
          });
        }), W(i, (u) => {
          this.computeLookaheadFunc(n, u.idx, Ui, "Repetition", u.maxLookahead, it(u));
        }), W(o, (u) => {
          this.computeLookaheadFunc(n, u.idx, Wc, "Option", u.maxLookahead, it(u));
        }), W(a, (u) => {
          this.computeLookaheadFunc(n, u.idx, ji, "RepetitionMandatory", u.maxLookahead, it(u));
        }), W(s, (u) => {
          this.computeLookaheadFunc(n, u.idx, Zn, "RepetitionMandatoryWithSeparator", u.maxLookahead, it(u));
        }), W(c, (u) => {
          this.computeLookaheadFunc(n, u.idx, Di, "RepetitionWithSeparator", u.maxLookahead, it(u));
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
      }), c = gi(this.fullRuleNameToShort[e.name], r, n);
      this.setLaFuncCache(c, s);
    });
  }
  // this actually returns a number, but it is always used as a string (object prop key)
  getKeyForAutomaticLookahead(e, n) {
    const r = this.getLastExplicitRuleShortName();
    return gi(r, e, n);
  }
  getLaFuncFromCache(e) {
    return this.lookAheadFuncsCache.get(e);
  }
  /* istanbul ignore next */
  setLaFuncCache(e, n) {
    this.lookAheadFuncsCache.set(e, n);
  }
}
class RE extends cn {
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
const jn = new RE();
function NE(t) {
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
function _E(t, e, n) {
  t.children[n] === void 0 ? t.children[n] = [e] : t.children[n].push(e);
}
function wE(t, e, n) {
  t.children[e] === void 0 ? t.children[e] = [n] : t.children[e].push(n);
}
const PE = "name";
function Vc(t, e) {
  Object.defineProperty(t, PE, {
    enumerable: !1,
    configurable: !0,
    writable: !1,
    value: e
  });
}
function CE(t, e) {
  const n = ze(t), r = n.length;
  for (let i = 0; i < r; i++) {
    const o = n[i], a = t[o], s = a.length;
    for (let c = 0; c < s; c++) {
      const u = a[c];
      u.tokenTypeIdx === void 0 && this[u.name](u.children, e);
    }
  }
}
function LE(t, e) {
  const n = function() {
  };
  Vc(n, t + "BaseSemantics");
  const r = {
    visit: function(i, o) {
      if (te(i) && (i = i[0]), !At(i))
        return this[i.name](i.children, o);
    },
    validateVisitor: function() {
      const i = kE(this, e);
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
function xE(t, e, n) {
  const r = function() {
  };
  Vc(r, t + "BaseSemanticsWithDefaults");
  const i = Object.create(n.prototype);
  return W(e, (o) => {
    i[o] = CE;
  }), r.prototype = i, r.prototype.constructor = r, r;
}
var Bi;
(function(t) {
  t[t.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", t[t.MISSING_METHOD = 1] = "MISSING_METHOD";
})(Bi || (Bi = {}));
function kE(t, e) {
  return ME(t, e);
}
function ME(t, e) {
  const n = Ke(e, (i) => St(t[i]) === !1), r = D(n, (i) => ({
    msg: `Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,
    type: Bi.MISSING_METHOD,
    methodName: i
  }));
  return wn(r);
}
class FE {
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
    _E(r, n, e), this.setNodeLocationFromToken(r.location, n);
  }
  cstPostNonTerminal(e, n) {
    const r = this.CST_STACK[this.CST_STACK.length - 1];
    wE(r, n, e), this.setNodeLocationFromNode(r.location, e.location);
  }
  getBaseCstVisitorConstructor() {
    if (At(this.baseCstVisitorConstructor)) {
      const e = LE(this.className, ze(this.gastProductionsCache));
      return this.baseCstVisitorConstructor = e, e;
    }
    return this.baseCstVisitorConstructor;
  }
  getBaseCstVisitorConstructorWithDefaults() {
    if (At(this.baseCstVisitorWithDefaultsConstructor)) {
      const e = xE(this.className, ze(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
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
class $E {
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
    return this.currIdx <= this.tokVector.length - 2 ? (this.consumeToken(), this.LA(1)) : hr;
  }
  // Lexer (accessing Token vector) related methods which can be overridden to implement lazy lexers
  // or lexers dependent on parser context.
  LA(e) {
    const n = this.currIdx + e;
    return n < 0 || this.tokVectorLength <= n ? hr : this.tokVector[n];
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
class UE {
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
  RULE(e, n, r = pr) {
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
  OVERRIDE_RULE(e, n, r = pr) {
    const i = aE(e, this.definedRulesNames, this.className);
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
        if (lr(i))
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
    return Dy(ve(this.gastProductionsCache));
  }
}
class jE {
  initRecognizerEngine(e, n) {
    if (this.className = this.constructor.name, this.shortRuleNameToFull = {}, this.fullRuleNameToShort = {}, this.ruleShortNameIdx = 256, this.tokenMatcher = ur, this.subruleIdx = 0, this.definedRulesNames = [], this.tokensMap = {}, this.isBackTrackingStack = [], this.RULE_STACK = [], this.RULE_OCCURRENCE_STACK = [], this.gastProductionsCache = {}, G(n, "serializedGrammar"))
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
    else if (G(e, "modes") && Xe(Ye(ve(e.modes)), km)) {
      const o = Ye(ve(e.modes)), a = mo(o);
      this.tokensMap = je(a, (s, c) => (s[c.name] = c, s), {});
    } else if (Ve(e))
      this.tokensMap = Re(e);
    else
      throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
    this.tokensMap.EOF = jt;
    const r = G(e, "modes") ? Ye(ve(e.modes)) : ve(e), i = Xe(r, (o) => ce(o.categoryMatches));
    this.tokenMatcher = i ? ur : Cn, Ln(ve(this.tokensMap));
  }
  defineRule(e, n, r) {
    if (this.selfAnalysisDone)
      throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
    const i = G(r, "resyncEnabled") ? r.resyncEnabled : pr.resyncEnabled, o = G(r, "recoveryValueFunc") ? r.recoveryValueFunc : pr.recoveryValueFunc, a = this.ruleShortNameIdx << OE + Pt;
    this.ruleShortNameIdx++, this.shortRuleNameToFull[a] = e, this.fullRuleNameToShort[e] = a;
    let s;
    return this.outputCst === !0 ? s = function(...d) {
      try {
        this.ruleInvocationStateUpdate(a, e, this.subruleIdx), n.apply(this, d);
        const A = this.CST_STACK[this.CST_STACK.length - 1];
        return this.cstPostRule(A), A;
      } catch (A) {
        return this.invokeRuleCatch(A, i, o);
      } finally {
        this.ruleFinallyStateUpdate();
      }
    } : s = function(...d) {
      try {
        return this.ruleInvocationStateUpdate(a, e, this.subruleIdx), n.apply(this, d);
      } catch (A) {
        return this.invokeRuleCatch(A, i, o);
      } finally {
        this.ruleFinallyStateUpdate();
      }
    }, Object.assign(s, { ruleName: e, originalGrammarAction: n });
  }
  invokeRuleCatch(e, n, r) {
    const i = this.RULE_STACK.length === 1, o = n && !this.isBackTracking() && this.recoveryEnabled;
    if (lr(e)) {
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
    const r = this.getKeyForAutomaticLookahead(ji, e);
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
      throw this.raiseEarlyExitException(e, pe.REPETITION_MANDATORY, n.ERR_MSG);
    this.attemptInRepetitionRecovery(this.atLeastOneInternal, [e, n], i, ji, e, Vm);
  }
  atLeastOneSepFirstInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(Zn, e);
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
      ], s, Zn, e, ns);
    } else
      throw this.raiseEarlyExitException(e, pe.REPETITION_MANDATORY_WITH_SEPARATOR, n.ERR_MSG);
  }
  manyInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(Ui, e);
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
      Ui,
      e,
      Wm,
      // The notStuck parameter is only relevant when "attemptInRepetitionRecovery"
      // is invoked from manyInternal, in the MANY_SEP case and AT_LEAST_ONE[_SEP]
      // An infinite loop cannot occur as:
      // - Either the lookahead is guaranteed to consume something (Single Token Separator)
      // - AT_LEAST_ONE by definition is guaranteed to consume something (or error out).
      a
    );
  }
  manySepFirstInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(Di, e);
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
      ], s, Di, e, ts);
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
    ], r, Zn, e, o);
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
      this.SAVE_ERROR(new EE(n, e));
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
    throw lr(e) && e.partialCstResult !== void 0 && (this.cstPostNonTerminal(e.partialCstResult, n !== void 0 && n.LABEL !== void 0 ? n.LABEL : r), delete e.partialCstResult), e;
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
class DE {
  initErrorHandler(e) {
    this._errors = [], this.errorMessageProvider = G(e, "errorMessageProvider") ? e.errorMessageProvider : Tt.errorMessageProvider;
  }
  SAVE_ERROR(e) {
    if (lr(e))
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
    for (let d = 1; d <= this.maxLookahead; d++)
      c.push(this.LA(d));
    const u = this.errorMessageProvider.buildEarlyExitMessage({
      expectedIterationPaths: s,
      actual: c,
      previous: this.LA(0),
      customUserDescription: r,
      ruleName: i
    });
    throw this.SAVE_ERROR(new AE(u, this.LA(1), this.LA(0)));
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
    throw this.SAVE_ERROR(new mE(c, this.LA(1), s));
  }
}
class BE {
  initContentAssist() {
  }
  computeContentAssist(e, n) {
    const r = this.gastProductionsCache[e];
    if (At(r))
      throw Error(`Rule ->${e}<- does not exist in this grammar.`);
    return wc([r], n, this.tokenMatcher, this.maxLookahead);
  }
  // TODO: should this be a member method or a utility? it does not have any state or usage of 'this'...
  // TODO: should this be more explicitly part of the public API?
  getNextPossibleTokenTypes(e) {
    const n = Ze(e.ruleStack), i = this.getGAstProductions()[n];
    return new Gm(i, e).startWalking();
  }
}
const Ur = {
  description: "This Object indicates the Parser is during Recording Phase"
};
Object.freeze(Ur);
const as = !0, ss = Math.pow(2, Pt) - 1, zc = To({ name: "RECORDING_PHASE_TOKEN", pattern: $e.NA });
Ln([zc]);
const Kc = vo(
  zc,
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
Object.freeze(Kc);
const qE = {
  name: `This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,
  children: {}
};
class GE {
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
    return hr;
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
    dn.call(this, et, n, e, as);
  }
  orInternalRecord(e, n) {
    return WE.call(this, e, n);
  }
  subruleInternalRecord(e, n, r) {
    if (fr(n), !e || G(e, "ruleName") === !1) {
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
    return i.definition.push(a), this.outputCst ? qE : Ur;
  }
  consumeInternalRecord(e, n, r) {
    if (fr(n), !Rc(e)) {
      const a = new Error(`<CONSUME${cs(n)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw a.KNOWN_RECORDER_ERROR = !0, a;
    }
    const i = on(this.recordingProdStack), o = new he({
      idx: n,
      terminalType: e,
      label: r?.LABEL
    });
    return i.definition.push(o), Kc;
  }
}
function dn(t, e, n, r = !1) {
  fr(n);
  const i = on(this.recordingProdStack), o = St(e) ? e : e.DEF, a = new t({ definition: [], idx: n });
  return r && (a.separator = e.SEP), G(e, "MAX_LOOKAHEAD") && (a.maxLookahead = e.MAX_LOOKAHEAD), this.recordingProdStack.push(a), o.call(this), i.definition.push(a), this.recordingProdStack.pop(), Ur;
}
function WE(t, e) {
  fr(e);
  const n = on(this.recordingProdStack), r = te(t) === !1, i = r === !1 ? t : t.DEF, o = new tt({
    definition: [],
    idx: e,
    ignoreAmbiguities: r && t.IGNORE_AMBIGUITIES === !0
  });
  G(t, "MAX_LOOKAHEAD") && (o.maxLookahead = t.MAX_LOOKAHEAD);
  const a = dc(i, (s) => St(s.GATE));
  return o.hasPredicates = a, n.definition.push(o), W(i, (s) => {
    const c = new Me({ definition: [] });
    o.definition.push(c), G(s, "IGNORE_AMBIGUITIES") ? c.ignoreAmbiguities = s.IGNORE_AMBIGUITIES : G(s, "GATE") && (c.ignoreAmbiguities = !0), this.recordingProdStack.push(c), s.ALT.call(this), this.recordingProdStack.pop();
  }), Ur;
}
function cs(t) {
  return t === 0 ? "" : `${t}`;
}
function fr(t) {
  if (t < 0 || t > ss) {
    const e = new Error(
      // The stack trace will contain all the needed details
      `Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${ss + 1}`
    );
    throw e.KNOWN_RECORDER_ERROR = !0, e;
  }
}
class VE {
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
      const { time: i, value: o } = yc(n), a = i > 10 ? console.warn : console.log;
      return this.traceInitIndent < this.traceInitMaxIdent && a(`${r}<-- <${e}> time: ${i}ms`), this.traceInitIndent--, o;
    } else
      return n();
  }
}
function zE(t, e) {
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
const hr = vo(jt, "", NaN, NaN, NaN, NaN, NaN, NaN);
Object.freeze(hr);
const Tt = Object.freeze({
  recoveryEnabled: !1,
  maxLookahead: 3,
  dynamicTokensEnabled: !1,
  outputCst: !0,
  errorMessageProvider: _c,
  nodeLocationTracking: "none",
  traceInitPerf: !1,
  skipValidations: !1
}), pr = Object.freeze({
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
        r = gE({
          rules: ve(this.gastProductionsCache)
        }), this.definitionErrors = this.definitionErrors.concat(r);
      }), this.TRACE_INIT("Grammar Validations", () => {
        if (ce(r) && this.skipValidations === !1) {
          const i = yE({
            rules: ve(this.gastProductionsCache),
            tokenTypes: ve(this.tokensMap),
            errMsgProvider: kt,
            grammarName: n
          }), o = eE({
            lookaheadStrategy: this.lookaheadStrategy,
            rules: ve(this.gastProductionsCache),
            tokenTypes: ve(this.tokensMap),
            grammarName: n
          });
          this.definitionErrors = this.definitionErrors.concat(i, o);
        }
      }), ce(this.definitionErrors) && (this.recoveryEnabled && this.TRACE_INIT("computeAllProdsFollows", () => {
        const i = Ky(ve(this.gastProductionsCache));
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
zE(xn, [
  vE,
  bE,
  FE,
  $E,
  jE,
  UE,
  DE,
  BE,
  GE,
  VE
]);
let KE = class extends xn {
  constructor(e, n = Tt) {
    const r = Re(n);
    r.outputCst = !1, super(e, r);
  }
};
const Ct = To, Hc = $e, bo = Ct({ name: "LCurly", pattern: /{/ }), Ro = Ct({ name: "RCurly", pattern: /}/ }), No = Ct({ name: "LSquare", pattern: /\[/ }), _o = Ct({ name: "RSquare", pattern: /]/ }), dr = Ct({ name: "Comma", pattern: /,/ }), wo = Ct({ name: "Colon", pattern: /:/ }), qi = Ct({
  name: "StringLiteral",
  pattern: /(\w|\.)+/
}), HE = Ct({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Hc.SKIPPED
}), Yc = [
  HE,
  qi,
  Ro,
  bo,
  No,
  _o,
  dr,
  wo
], YE = new Hc(Yc);
bo.LABEL = "'{'";
Ro.LABEL = "'}'";
No.LABEL = "'['";
_o.LABEL = "']'";
dr.LABEL = "','";
wo.LABEL = "':'";
const XE = KE;
class JE extends XE {
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
      return n = e.CONSUME(qi), e.CONSUME(wo), i = e.SUBRULE(e.value), r = n.isInsertedInRecovery ? "BAD_KEY" : n.image, o[r] = i, o;
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
          ALT: () => e.CONSUME(qi).image
        },
        { ALT: () => e.SUBRULE(e.object) },
        { ALT: () => e.SUBRULE(e.array) }
      ])
    ), this.performSelfAnalysis();
  }
}
const yi = new JE();
function ZE(t) {
  const e = YE.tokenize(t);
  return yi.input = e.tokens, {
    cst: yi.value(),
    lexErrors: e.errors,
    parseErrors: yi.errors
  };
}
function gr(t) {
  if (t === "true")
    return !0;
  if (t === "false")
    return !1;
  throw new Error("invalid boolean string");
}
function RA(t) {
  return t ? "true" : "false";
}
function Be(t, e) {
  return t.split(e)[0];
}
function QE(t) {
  return BigInt(Be(t, "i8"));
}
function NA(t) {
  return `${t}i8`;
}
function eA(t) {
  return BigInt(Be(t, "i16"));
}
function _A(t) {
  return `${t}i16`;
}
function tA(t) {
  return BigInt(Be(t, "i32"));
}
function wA(t) {
  return `${t}i32`;
}
function nA(t) {
  return BigInt(Be(t, "i64"));
}
function PA(t) {
  return `${t}i64`;
}
function rA(t) {
  return BigInt(Be(t, "i128"));
}
function CA(t) {
  return `${t}i128`;
}
function Xc(t) {
  return BigInt(Be(t, "u8"));
}
function He(t) {
  return `${t}u8`;
}
function iA(t) {
  return BigInt(Be(t, "u16"));
}
function LA(t) {
  return `${t}u16`;
}
function Qt(t) {
  return BigInt(Be(t, "u32"));
}
function Jc(t) {
  return `${t}u32`;
}
function Rt(t) {
  return BigInt(Be(t, "u64"));
}
function mi(t) {
  return `${t}u64`;
}
function Gi(t) {
  return BigInt(Be(t, "u128"));
}
function xA(t) {
  return `${t}u128`;
}
function oA(t) {
  return BigInt(Be(t, "field"));
}
function kA(t) {
  return `${t}field`;
}
function aA(t) {
  return BigInt(Be(t, "group"));
}
function MA(t) {
  return `${t}group`;
}
function sA(t) {
  return BigInt(Be(t, "scalar"));
}
function FA(t) {
  return `${t}scalar`;
}
class jr {
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
function cA(t) {
  try {
    return t.startsWith("aleo1") ? t : t === "true" || t === "false" ? gr(t) : t.endsWith("field") ? oA(t) : t.endsWith("group") ? aA(t) : t.endsWith("i8") ? QE(t) : t.endsWith("i16") ? eA(t) : t.endsWith("i32") ? tA(t) : t.endsWith("i64") ? nA(t) : t.endsWith("i128") ? rA(t) : t.endsWith("u8") ? Xc(t) : t.endsWith("u16") ? iA(t) : t.endsWith("u32") ? Qt(t) : t.endsWith("u64") ? Rt(t) : t.endsWith("u128") ? Gi(t) : t.endsWith("scalar") ? sA(t) : t;
  } catch {
    return t;
  }
}
function Wi(t) {
  return Array.isArray(t) ? t.map((e) => Wi(e)) : typeof t == "object" ? Object.fromEntries(
    Object.entries(t).map(([e, n]) => [e, Wi(n)])
  ) : cA(t);
}
function gt(t) {
  zn(t !== "null", "plaintext cannot be null"), t = t.replaceAll("\\n", `
`).replaceAll('"', ""), t = t.trim();
  const { cst: e, lexErrors: n, parseErrors: r } = ZE(t);
  return zn(n.length === 0, n.join(`
`)), zn(r.length === 0, r.join(`
`)), Wi(e);
}
let Ei;
async function Zc() {
  return Ei || (globalThis.Worker || (globalThis.Worker = class extends EventTarget {
    postMessage() {
    }
    unref() {
    }
  }), Ei = await import("@aleohq/sdk")), Ei;
}
async function Qc(t) {
  return (await Zc()).Plaintext.fromString(t).hashBhp256().toString();
}
async function uA(t) {
  return (await Zc()).ProgramID.fromString(t).toAddress();
}
class UA extends jr {
  /**
   * Get the state of the committee for an **active** validator.
   * @param validator
   * @returns The committee state or null if the validator is not in the committee.
   */
  async getCommitteeState(e) {
    const n = await this.getMappingValueOrNull("committee", e);
    return n === null ? null : gt(n);
  }
  /**
   * Get the total number of **active** validators in the committee.
   */
  async getCommitteeValidatorsCount() {
    return Rt(
      await this.getMappingValueOrDefault(
        "metadata",
        "aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc",
        mi(0)
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
        mi(0)
      )
    );
  }
  /**
   * Get the total amount of microcredits that are prebonded and bonded to a validator.
   * Note: It includes both prebonded and bonded microcredits. However, it does not contain unbonding microcredits.
   * @param validator
   */
  async getDelegated(e) {
    return Rt(await this.getMappingValueOrDefault("delegated", e, mi(0)));
  }
  /**
   * Get the bond state of the staker.
   * @param staker The staker (validator or delegator)
   */
  async getBonded(e) {
    const n = await this.getMappingValueOrNull("bonded", e);
    return n === null ? null : gt(n);
  }
  /**
   * Get the unbonding state of the staker.
   * @param staker The staker (validator or delegator)
   */
  async getUnbonding(e) {
    const n = await this.getMappingValueOrNull("unbonding", e);
    return n === null ? null : gt(n);
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
class jA extends jr {
  async isInitialized() {
    return gr(await this.getMappingValueOrDefault("initialized", "0u8", "false"));
  }
  async hasRole(e, n) {
    const r = await Qc(`{
      account: ${n},
      role: ${He(e)}
    }`);
    return gr(await this.getMappingValueOrDefault("grants", r, "false"));
  }
  async isRoleAdmin(e, n) {
    const r = Number(
      Xc(await this.getMappingValueOrDefault("role_admins", He(e), He(ef)))
    );
    return typeof n == "number" ? n === r : this.hasRole(r, n);
  }
}
var lA = /* @__PURE__ */ ((t) => (t[t.INVALID = 0] = "INVALID", t[t.IN_PROGRESS = 1] = "IN_PROGRESS", t[t.VALID = 2] = "VALID", t))(lA || {});
class DA extends jr {
  constructor(e, n) {
    super(e), this.credits = n;
  }
  async getTotalSupply() {
    return Rt(await this.getMappingValueOrDefault("total_supply", He(0), "0"));
  }
  async getPublicBalance(e) {
    return Rt(await this.getMappingValueOrDefault("account", e, "0"));
  }
  async getApproval(e, n) {
    const r = await Qc(`{
      approver: ${e},
      spender: ${n}
    }`);
    return Rt(await this.getMappingValueOrDefault("approvals", r, "0"));
  }
  async getConfig() {
    const e = await this.getMappingValueOrNull("config", He(0));
    return e === null ? null : gt(e);
  }
  async isInitialized() {
    return await this.getConfig() !== null;
  }
  async isPaused() {
    const e = await this.getConfig();
    return e !== null && e.paused;
  }
  async getState() {
    return gt(await this.getMappingValue("state", He(0)));
  }
  async getCacheState() {
    const e = gt(await this.getMappingValue("cache_state", He(0)));
    return e.status = Number(e.status), e;
  }
  async getWithdraw(e) {
    const n = await this.getMappingValueOrNull("withdraws", e);
    return n === null ? null : gt(n);
  }
  isWithdrawClaimable(e, n, r, i) {
    return e.height <= (e.pending ? r + tf : i) && e.amount <= n;
  }
  async getDelegatorsCount() {
    return Qt(await this.getMappingValue("delegators_count", He(0)));
  }
  async getDelegator(e) {
    const n = await this.getMappingValueOrNull("delegators", Jc(e));
    return n === null ? null : gt(n);
  }
  async getDelegatorIndex(e) {
    const n = await this.getMappingValueOrNull("delegator_pos", e);
    return n === null ? null : Qt(n);
  }
  async getValidatorIndex(e) {
    const n = await this.getMappingValueOrNull("validator_pos", e);
    return n === null ? null : Qt(n);
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
    return this.credits.getPublicBalance(await uA(of()));
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
class BA extends jr {
  /**
   * Whether the program is paused.
   */
  async isPaused() {
    return gr(await this.getMappingValueOrDefault("paused", He(0), "true"));
  }
  /**
   * Get the total supply of points.
   */
  async getTotalSupply() {
    return Gi(await this.getMappingValueOrDefault("total_supply", He(0), "0"));
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
    return n === null ? null : gt(n);
  }
  /**
   * Get the inviter by the invite code.
   * @param code
   */
  async getInviterByCode(e) {
    return await this.getMappingValueOrNull("inviters", Jc(e));
  }
  /**
   * Get the invite code by the inviter.
   * @param inviter
   */
  async getInviteCode(e) {
    return Qt(await this.getMappingValueOrDefault("invite_codes", e, String(rf)));
  }
  /**
   * Get the invite code counter.
   */
  async getInviteCodeCounter() {
    return Qt(await this.getMappingValueOrDefault("invite_code_counter", He(0), String(nf)));
  }
}
export {
  AA as ACCESS_CONTROL_PROGRAM,
  TA as ACL_MANAGER_PROGRAM,
  mA as ASSET_LISTING_ADMIN_ROLE,
  jA as AccessControlProgram,
  lA as CacheStatus,
  UA as CreditsProgram,
  ef as DEFAULT_ADMIN_ROLE,
  gA as EMERGENCY_ADMIN_ROLE,
  rf as EMPTY_INVITE_CODE,
  dA as POOL_ADMIN_ROLE,
  Us as PREFIX,
  jr as ProgramBase,
  yA as RISK_ADMIN_ROLE,
  hA as STAKING_ADMIN_ROLE,
  pA as STAKING_OPERATOR_ROLE,
  nf as START_INVITE_CODE,
  EA as STCREDITS_CACHE_BATCH_NUM,
  vA as STCREDITS_POINTS_PROGRAM,
  of as STCREDITS_PROGRAM,
  BA as StCreditsPointsProgram,
  DA as StCreditsProgram,
  $s as VERSION,
  tf as WITHDRAW_DELAY,
  fA as ZERO_ADDRESS,
  Qc as bhp256HashToField,
  gr as bool,
  RA as boolStr,
  SA as delegatorProgramName,
  oA as field,
  kA as fieldStr,
  aA as group,
  MA as groupStr,
  rA as i128,
  CA as i128Str,
  eA as i16,
  _A as i16Str,
  tA as i32,
  wA as i32Str,
  nA as i64,
  PA as i64Str,
  QE as i8,
  NA as i8Str,
  Zc as importAleo,
  OA as initialize,
  cA as parseLiteral,
  gt as parsePlaintext,
  uA as programAddress,
  sA as scalar,
  FA as scalarStr,
  Gi as u128,
  xA as u128Str,
  iA as u16,
  LA as u16Str,
  Qt as u32,
  Jc as u32Str,
  Rt as u64,
  mi as u64Str,
  Xc as u8,
  He as u8Str
};
