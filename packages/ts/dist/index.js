var fs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function nu(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function ru(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var hs = { exports: {} }, ye = hs.exports = {}, rt, it;
function Ti() {
  throw new Error("setTimeout has not been defined");
}
function vi() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? rt = setTimeout : rt = Ti;
  } catch {
    rt = Ti;
  }
  try {
    typeof clearTimeout == "function" ? it = clearTimeout : it = vi;
  } catch {
    it = vi;
  }
})();
function ds(t) {
  if (rt === setTimeout)
    return setTimeout(t, 0);
  if ((rt === Ti || !rt) && setTimeout)
    return rt = setTimeout, setTimeout(t, 0);
  try {
    return rt(t, 0);
  } catch {
    try {
      return rt.call(null, t, 0);
    } catch {
      return rt.call(this, t, 0);
    }
  }
}
function iu(t) {
  if (it === clearTimeout)
    return clearTimeout(t);
  if ((it === vi || !it) && clearTimeout)
    return it = clearTimeout, clearTimeout(t);
  try {
    return it(t);
  } catch {
    try {
      return it.call(null, t);
    } catch {
      return it.call(this, t);
    }
  }
}
var yt = [], Jt = !1, xt, Gn = -1;
function ou() {
  !Jt || !xt || (Jt = !1, xt.length ? yt = xt.concat(yt) : Gn = -1, yt.length && ps());
}
function ps() {
  if (!Jt) {
    var t = ds(ou);
    Jt = !0;
    for (var e = yt.length; e; ) {
      for (xt = yt, yt = []; ++Gn < e; )
        xt && xt[Gn].run();
      Gn = -1, e = yt.length;
    }
    xt = null, Jt = !1, iu(t);
  }
}
ye.nextTick = function(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var n = 1; n < arguments.length; n++)
      e[n - 1] = arguments[n];
  yt.push(new gs(t, e)), yt.length === 1 && !Jt && ds(ps);
};
function gs(t, e) {
  this.fun = t, this.array = e;
}
gs.prototype.run = function() {
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
var au = hs.exports;
const Ee = /* @__PURE__ */ ru(au);
var Br = { exports: {} }, qr = {}, en = {}, ys = {}, zi = function() {
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
}, su = zi, Hi = function() {
  return su() && !!Symbol.toStringTag;
}, cu = Error, uu = EvalError, lu = RangeError, fu = ReferenceError, ms = SyntaxError, Er = TypeError, hu = URIError, Lo = typeof Symbol < "u" && Symbol, du = zi, pu = function() {
  return typeof Lo != "function" || typeof Symbol != "function" || typeof Lo("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : du();
}, Gr = {
  __proto__: null,
  foo: {}
}, gu = Object, yu = function() {
  return { __proto__: Gr }.foo === Gr.foo && !(Gr instanceof gu);
}, mu = "Function.prototype.bind called on incompatible ", Eu = Object.prototype.toString, Au = Math.max, Tu = "[object Function]", xo = function(e, n) {
  for (var r = [], i = 0; i < e.length; i += 1)
    r[i] = e[i];
  for (var o = 0; o < n.length; o += 1)
    r[o + e.length] = n[o];
  return r;
}, vu = function(e, n) {
  for (var r = [], i = n, o = 0; i < e.length; i += 1, o += 1)
    r[o] = e[i];
  return r;
}, Su = function(t, e) {
  for (var n = "", r = 0; r < t.length; r += 1)
    n += t[r], r + 1 < t.length && (n += e);
  return n;
}, Ou = function(e) {
  var n = this;
  if (typeof n != "function" || Eu.apply(n) !== Tu)
    throw new TypeError(mu + n);
  for (var r = vu(arguments, 1), i, o = function() {
    if (this instanceof i) {
      var p = n.apply(
        this,
        xo(r, arguments)
      );
      return Object(p) === p ? p : this;
    }
    return n.apply(
      e,
      xo(r, arguments)
    );
  }, a = Au(0, n.length - r.length), s = [], c = 0; c < a; c++)
    s[c] = "$" + c;
  if (i = Function("binder", "return function (" + Su(s, ",") + "){ return binder.apply(this,arguments); }")(o), n.prototype) {
    var u = function() {
    };
    u.prototype = n.prototype, i.prototype = new u(), u.prototype = null;
  }
  return i;
}, Iu = Ou, Ki = Function.prototype.bind || Iu, bu = Function.prototype.call, Ru = Object.prototype.hasOwnProperty, Nu = Ki, _u = Nu.call(bu, Ru), Q, wu = cu, Pu = uu, Cu = lu, Lu = fu, tn = ms, Zt = Er, xu = hu, Es = Function, Wr = function(t) {
  try {
    return Es('"use strict"; return (' + t + ").constructor;")();
  } catch {
  }
}, Ft = Object.getOwnPropertyDescriptor;
if (Ft)
  try {
    Ft({}, "");
  } catch {
    Ft = null;
  }
var Vr = function() {
  throw new Zt();
}, ku = Ft ? function() {
  try {
    return arguments.callee, Vr;
  } catch {
    try {
      return Ft(arguments, "callee").get;
    } catch {
      return Vr;
    }
  }
}() : Vr, zt = pu(), Mu = yu(), Oe = Object.getPrototypeOf || (Mu ? function(t) {
  return t.__proto__;
} : null), Yt = {}, Fu = typeof Uint8Array > "u" || !Oe ? Q : Oe(Uint8Array), $t = {
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
  "%Error%": wu,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": Pu,
  "%Float32Array%": typeof Float32Array > "u" ? Q : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? Q : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? Q : FinalizationRegistry,
  "%Function%": Es,
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
  "%RangeError%": Cu,
  "%ReferenceError%": Lu,
  "%Reflect%": typeof Reflect > "u" ? Q : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? Q : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !zt || !Oe ? Q : Oe((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? Q : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": zt && Oe ? Oe(""[Symbol.iterator]()) : Q,
  "%Symbol%": zt ? Symbol : Q,
  "%SyntaxError%": tn,
  "%ThrowTypeError%": ku,
  "%TypedArray%": Fu,
  "%TypeError%": Zt,
  "%Uint8Array%": typeof Uint8Array > "u" ? Q : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? Q : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? Q : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? Q : Uint32Array,
  "%URIError%": xu,
  "%WeakMap%": typeof WeakMap > "u" ? Q : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? Q : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? Q : WeakSet
};
if (Oe)
  try {
    null.error;
  } catch (t) {
    var $u = Oe(Oe(t));
    $t["%Error.prototype%"] = $u;
  }
var Uu = function t(e) {
  var n;
  if (e === "%AsyncFunction%")
    n = Wr("async function () {}");
  else if (e === "%GeneratorFunction%")
    n = Wr("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    n = Wr("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var r = t("%AsyncGeneratorFunction%");
    r && (n = r.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var i = t("%AsyncGenerator%");
    i && Oe && (n = Oe(i.prototype));
  }
  return $t[e] = n, n;
}, ko = {
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
}, bn = Ki, tr = _u, ju = bn.call(Function.call, Array.prototype.concat), Du = bn.call(Function.apply, Array.prototype.splice), Mo = bn.call(Function.call, String.prototype.replace), nr = bn.call(Function.call, String.prototype.slice), Bu = bn.call(Function.call, RegExp.prototype.exec), qu = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Gu = /\\(\\)?/g, Wu = function(e) {
  var n = nr(e, 0, 1), r = nr(e, -1);
  if (n === "%" && r !== "%")
    throw new tn("invalid intrinsic syntax, expected closing `%`");
  if (r === "%" && n !== "%")
    throw new tn("invalid intrinsic syntax, expected opening `%`");
  var i = [];
  return Mo(e, qu, function(o, a, s, c) {
    i[i.length] = s ? Mo(c, Gu, "$1") : a || o;
  }), i;
}, Vu = function(e, n) {
  var r = e, i;
  if (tr(ko, r) && (i = ko[r], r = "%" + i[0] + "%"), tr($t, r)) {
    var o = $t[r];
    if (o === Yt && (o = Uu(r)), typeof o > "u" && !n)
      throw new Zt("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: i,
      name: r,
      value: o
    };
  }
  throw new tn("intrinsic " + e + " does not exist!");
}, Rn = function(e, n) {
  if (typeof e != "string" || e.length === 0)
    throw new Zt("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof n != "boolean")
    throw new Zt('"allowMissing" argument must be a boolean');
  if (Bu(/^%?[^%]*%?$/, e) === null)
    throw new tn("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var r = Wu(e), i = r.length > 0 ? r[0] : "", o = Vu("%" + i + "%", n), a = o.name, s = o.value, c = !1, u = o.alias;
  u && (i = u[0], Du(r, ju([0, 1], u)));
  for (var p = 1, m = !0; p < r.length; p += 1) {
    var E = r[p], S = nr(E, 0, 1), C = nr(E, -1);
    if ((S === '"' || S === "'" || S === "`" || C === '"' || C === "'" || C === "`") && S !== C)
      throw new tn("property names with quotes must have matching quotes");
    if ((E === "constructor" || !m) && (c = !0), i += "." + E, a = "%" + i + "%", tr($t, a))
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
        m = tr(s, E), s = s[E];
      m && !c && ($t[a] = s);
    }
  }
  return s;
}, As = { exports: {} }, zr, Fo;
function Yi() {
  if (Fo) return zr;
  Fo = 1;
  var t = Rn, e = t("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return zr = e, zr;
}
var zu = Rn, Wn = zu("%Object.getOwnPropertyDescriptor%", !0);
if (Wn)
  try {
    Wn([], "length");
  } catch {
    Wn = null;
  }
var Xi = Wn, $o = Yi(), Hu = ms, Ht = Er, Uo = Xi, Ts = function(e, n, r) {
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
  var i = arguments.length > 3 ? arguments[3] : null, o = arguments.length > 4 ? arguments[4] : null, a = arguments.length > 5 ? arguments[5] : null, s = arguments.length > 6 ? arguments[6] : !1, c = !!Uo && Uo(e, n);
  if ($o)
    $o(e, n, {
      configurable: a === null && c ? c.configurable : !a,
      enumerable: i === null && c ? c.enumerable : !i,
      value: r,
      writable: o === null && c ? c.writable : !o
    });
  else if (s || !i && !o && !a)
    e[n] = r;
  else
    throw new Hu("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, Si = Yi(), vs = function() {
  return !!Si;
};
vs.hasArrayLengthDefineBug = function() {
  if (!Si)
    return null;
  try {
    return Si([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Ss = vs, Ku = Rn, jo = Ts, Yu = Ss(), Do = Xi, Bo = Er, Xu = Ku("%Math.floor%"), Ju = function(e, n) {
  if (typeof e != "function")
    throw new Bo("`fn` is not a function");
  if (typeof n != "number" || n < 0 || n > 4294967295 || Xu(n) !== n)
    throw new Bo("`length` must be a positive 32-bit integer");
  var r = arguments.length > 2 && !!arguments[2], i = !0, o = !0;
  if ("length" in e && Do) {
    var a = Do(e, "length");
    a && !a.configurable && (i = !1), a && !a.writable && (o = !1);
  }
  return (i || o || !r) && (Yu ? jo(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    n,
    !0,
    !0
  ) : jo(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    n
  )), e;
};
(function(t) {
  var e = Ki, n = Rn, r = Ju, i = Er, o = n("%Function.prototype.apply%"), a = n("%Function.prototype.call%"), s = n("%Reflect.apply%", !0) || e.call(a, o), c = Yi(), u = n("%Math.max%");
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
})(As);
var Ar = As.exports, Os = Rn, Is = Ar, Zu = Is(Os("String.prototype.indexOf")), Tr = function(e, n) {
  var r = Os(e, !!n);
  return typeof r == "function" && Zu(e, ".prototype.") > -1 ? Is(r) : r;
}, Qu = Hi(), el = Tr, Oi = el("Object.prototype.toString"), vr = function(e) {
  return Qu && e && typeof e == "object" && Symbol.toStringTag in e ? !1 : Oi(e) === "[object Arguments]";
}, bs = function(e) {
  return vr(e) ? !0 : e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && Oi(e) !== "[object Array]" && Oi(e.callee) === "[object Function]";
}, tl = function() {
  return vr(arguments);
}();
vr.isLegacyArguments = bs;
var nl = tl ? vr : bs, rl = Object.prototype.toString, il = Function.prototype.toString, ol = /^\s*(?:function)?\*/, Rs = Hi(), Hr = Object.getPrototypeOf, al = function() {
  if (!Rs)
    return !1;
  try {
    return Function("return function*() {}")();
  } catch {
  }
}, Kr, sl = function(e) {
  if (typeof e != "function")
    return !1;
  if (ol.test(il.call(e)))
    return !0;
  if (!Rs) {
    var n = rl.call(e);
    return n === "[object GeneratorFunction]";
  }
  if (!Hr)
    return !1;
  if (typeof Kr > "u") {
    var r = al();
    Kr = r ? Hr(r) : !1;
  }
  return Hr(e) === Kr;
}, Ns = Function.prototype.toString, Xt = typeof Reflect == "object" && Reflect !== null && Reflect.apply, Ii, Vn;
if (typeof Xt == "function" && typeof Object.defineProperty == "function")
  try {
    Ii = Object.defineProperty({}, "length", {
      get: function() {
        throw Vn;
      }
    }), Vn = {}, Xt(function() {
      throw 42;
    }, null, Ii);
  } catch (t) {
    t !== Vn && (Xt = null);
  }
else
  Xt = null;
var cl = /^\s*class\b/, bi = function(e) {
  try {
    var n = Ns.call(e);
    return cl.test(n);
  } catch {
    return !1;
  }
}, Yr = function(e) {
  try {
    return bi(e) ? !1 : (Ns.call(e), !0);
  } catch {
    return !1;
  }
}, zn = Object.prototype.toString, ul = "[object Object]", ll = "[object Function]", fl = "[object GeneratorFunction]", hl = "[object HTMLAllCollection]", dl = "[object HTML document.all class]", pl = "[object HTMLCollection]", gl = typeof Symbol == "function" && !!Symbol.toStringTag, yl = !(0 in [,]), Ri = function() {
  return !1;
};
if (typeof document == "object") {
  var ml = document.all;
  zn.call(ml) === zn.call(document.all) && (Ri = function(e) {
    if ((yl || !e) && (typeof e > "u" || typeof e == "object"))
      try {
        var n = zn.call(e);
        return (n === hl || n === dl || n === pl || n === ul) && e("") == null;
      } catch {
      }
    return !1;
  });
}
var El = Xt ? function(e) {
  if (Ri(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  try {
    Xt(e, null, Ii);
  } catch (n) {
    if (n !== Vn)
      return !1;
  }
  return !bi(e) && Yr(e);
} : function(e) {
  if (Ri(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  if (gl)
    return Yr(e);
  if (bi(e))
    return !1;
  var n = zn.call(e);
  return n !== ll && n !== fl && !/^\[object HTML/.test(n) ? !1 : Yr(e);
}, Al = El, Tl = Object.prototype.toString, _s = Object.prototype.hasOwnProperty, vl = function(e, n, r) {
  for (var i = 0, o = e.length; i < o; i++)
    _s.call(e, i) && (r == null ? n(e[i], i, e) : n.call(r, e[i], i, e));
}, Sl = function(e, n, r) {
  for (var i = 0, o = e.length; i < o; i++)
    r == null ? n(e.charAt(i), i, e) : n.call(r, e.charAt(i), i, e);
}, Ol = function(e, n, r) {
  for (var i in e)
    _s.call(e, i) && (r == null ? n(e[i], i, e) : n.call(r, e[i], i, e));
}, Il = function(e, n, r) {
  if (!Al(n))
    throw new TypeError("iterator must be a function");
  var i;
  arguments.length >= 3 && (i = r), Tl.call(e) === "[object Array]" ? vl(e, n, i) : typeof e == "string" ? Sl(e, n, i) : Ol(e, n, i);
}, bl = Il, Rl = [
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
], Xr = Rl, Nl = typeof globalThis > "u" ? fs : globalThis, _l = function() {
  for (var e = [], n = 0; n < Xr.length; n++)
    typeof Nl[Xr[n]] == "function" && (e[e.length] = Xr[n]);
  return e;
}, rr = bl, wl = _l, qo = Ar, Ji = Tr, Hn = Xi, Pl = Ji("Object.prototype.toString"), ws = Hi(), Go = typeof globalThis > "u" ? fs : globalThis, Ni = wl(), Zi = Ji("String.prototype.slice"), Jr = Object.getPrototypeOf, Cl = Ji("Array.prototype.indexOf", !0) || function(e, n) {
  for (var r = 0; r < e.length; r += 1)
    if (e[r] === n)
      return r;
  return -1;
}, ir = { __proto__: null };
ws && Hn && Jr ? rr(Ni, function(t) {
  var e = new Go[t]();
  if (Symbol.toStringTag in e) {
    var n = Jr(e), r = Hn(n, Symbol.toStringTag);
    if (!r) {
      var i = Jr(n);
      r = Hn(i, Symbol.toStringTag);
    }
    ir["$" + t] = qo(r.get);
  }
}) : rr(Ni, function(t) {
  var e = new Go[t](), n = e.slice || e.set;
  n && (ir["$" + t] = qo(n));
});
var Ll = function(e) {
  var n = !1;
  return rr(
    // eslint-disable-next-line no-extra-parens
    /** @type {Record<`\$${TypedArrayName}`, Getter>} */
    /** @type {any} */
    ir,
    /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
    function(r, i) {
      if (!n)
        try {
          "$" + r(e) === i && (n = Zi(i, 1));
        } catch {
        }
    }
  ), n;
}, xl = function(e) {
  var n = !1;
  return rr(
    // eslint-disable-next-line no-extra-parens
    /** @type {Record<`\$${TypedArrayName}`, Getter>} */
    /** @type {any} */
    ir,
    /** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */
    function(r, i) {
      if (!n)
        try {
          r(e), n = Zi(i, 1);
        } catch {
        }
    }
  ), n;
}, Ps = function(e) {
  if (!e || typeof e != "object")
    return !1;
  if (!ws) {
    var n = Zi(Pl(e), 8, -1);
    return Cl(Ni, n) > -1 ? n : n !== "Object" ? !1 : xl(e);
  }
  return Hn ? Ll(e) : null;
}, kl = Ps, Ml = function(e) {
  return !!kl(e);
};
(function(t) {
  var e = nl, n = sl, r = Ps, i = Ml;
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
})(ys);
var Fl = function(e) {
  return e && typeof e == "object" && typeof e.copy == "function" && typeof e.fill == "function" && typeof e.readUInt8 == "function";
}, _i = { exports: {} };
typeof Object.create == "function" ? _i.exports = function(e, n) {
  n && (e.super_ = n, e.prototype = Object.create(n.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : _i.exports = function(e, n) {
  if (n) {
    e.super_ = n;
    var r = function() {
    };
    r.prototype = n.prototype, e.prototype = new r(), e.prototype.constructor = e;
  }
};
var $l = _i.exports;
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
  t.types = ys;
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
  t.isPrimitive = ue, t.isBuffer = Fl;
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
  }, t.inherits = $l, t._extend = function(f, T) {
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
var Wo;
function Cs() {
  if (Wo) return qr;
  Wo = 1;
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
    m === void 0 && (m = wi()), m(typeof A == "string", "'name' must be a string");
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
    m === void 0 && (m = wi()), m(y.length > 0, "At least one arg needs to be specified");
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
  }, TypeError), qr.codes = p, qr;
}
var Zr, Vo;
function Ul() {
  if (Vo) return Zr;
  Vo = 1;
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
  var y = en, I = y.inspect, x = Cs(), H = x.codes.ERR_INVALID_ARG_TYPE;
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
      var $e = L - l;
      if (O.length < L + 1)
        $e > 1 && L > 2 && ($e > 4 ? (T += `
`.concat(z, "...").concat(X), d = !0) : $e > 3 && (T += `
  `.concat(b[L - 2]), we++), T += `
  `.concat(b[L - 1]), we++), l = L, f += `
`.concat(oe, "-").concat(X, " ").concat(b[L]), we++;
      else if (b.length < L + 1)
        $e > 1 && L > 2 && ($e > 4 ? (T += `
`.concat(z, "...").concat(X), d = !0) : $e > 3 && (T += `
  `.concat(O[L - 2]), we++), T += `
  `.concat(O[L - 1]), we++), l = L, T += `
`.concat(ie, "+").concat(X, " ").concat(O[L]), we++;
      else {
        var Lt = b[L], pt = O[L], g = pt !== Lt && (!F(pt, ",") || pt.slice(0, -1) !== Lt);
        g && F(Lt, ",") && Lt.slice(0, -1) === pt && (g = !1, pt += ","), g ? ($e > 1 && L > 2 && ($e > 4 ? (T += `
`.concat(z, "...").concat(X), d = !0) : $e > 3 && (T += `
  `.concat(O[L - 2]), we++), T += `
  `.concat(O[L - 1]), we++), l = L, T += `
`.concat(ie, "+").concat(X, " ").concat(pt), f += `
`.concat(oe, "-").concat(X, " ").concat(Lt), we += 2) : (T += f, f = "", ($e === 1 || L === 0) && (T += `
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
  return Zr = Ae, Zr;
}
var zo = Object.prototype.toString, Ls = function(e) {
  var n = zo.call(e), r = n === "[object Arguments]";
  return r || (r = n !== "[object Array]" && e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && zo.call(e.callee) === "[object Function]"), r;
}, Qr, Ho;
function jl() {
  if (Ho) return Qr;
  Ho = 1;
  var t;
  if (!Object.keys) {
    var e = Object.prototype.hasOwnProperty, n = Object.prototype.toString, r = Ls, i = Object.prototype.propertyIsEnumerable, o = !i.call({ toString: null }, "toString"), a = i.call(function() {
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
  return Qr = t, Qr;
}
var Dl = Array.prototype.slice, Bl = Ls, Ko = Object.keys, Kn = Ko ? function(e) {
  return Ko(e);
} : jl(), Yo = Object.keys;
Kn.shim = function() {
  if (Object.keys) {
    var e = function() {
      var n = Object.keys(arguments);
      return n && n.length === arguments.length;
    }(1, 2);
    e || (Object.keys = function(r) {
      return Bl(r) ? Yo(Dl.call(r)) : Yo(r);
    });
  } else
    Object.keys = Kn;
  return Object.keys || Kn;
};
var xs = Kn, ql = xs, ks = zi(), Ms = Tr, Xo = Object, Gl = Ms("Array.prototype.push"), Jo = Ms("Object.prototype.propertyIsEnumerable"), Wl = ks ? Object.getOwnPropertySymbols : null, Vl = function(e, n) {
  if (e == null)
    throw new TypeError("target must be an object");
  var r = Xo(e);
  if (arguments.length === 1)
    return r;
  for (var i = 1; i < arguments.length; ++i) {
    var o = Xo(arguments[i]), a = ql(o), s = ks && (Object.getOwnPropertySymbols || Wl);
    if (s)
      for (var c = s(o), u = 0; u < c.length; ++u) {
        var p = c[u];
        Jo(o, p) && Gl(a, p);
      }
    for (var m = 0; m < a.length; ++m) {
      var E = a[m];
      if (Jo(o, E)) {
        var S = o[E];
        r[E] = S;
      }
    }
  }
  return r;
}, ei = Vl, zl = function() {
  if (!Object.assign)
    return !1;
  for (var t = "abcdefghijklmnopqrst", e = t.split(""), n = {}, r = 0; r < e.length; ++r)
    n[e[r]] = e[r];
  var i = Object.assign({}, n), o = "";
  for (var a in i)
    o += a;
  return t !== o;
}, Hl = function() {
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
  return !Object.assign || zl() || Hl() ? ei : Object.assign;
}, Zo = function(t) {
  return t !== t;
}, Fs = function(e, n) {
  return e === 0 && n === 0 ? 1 / e === 1 / n : !!(e === n || Zo(e) && Zo(n));
}, Yl = Fs, Qi = function() {
  return typeof Object.is == "function" ? Object.is : Yl;
}, ti, Qo;
function Sr() {
  if (Qo) return ti;
  Qo = 1;
  var t = xs, e = typeof Symbol == "function" && typeof Symbol("foo") == "symbol", n = Object.prototype.toString, r = Array.prototype.concat, i = Ts, o = function(u) {
    return typeof u == "function" && n.call(u) === "[object Function]";
  }, a = Ss(), s = function(u, p, m, E) {
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
  return c.supportsDescriptors = !!a, ti = c, ti;
}
var ni, ea;
function Xl() {
  if (ea) return ni;
  ea = 1;
  var t = Qi, e = Sr();
  return ni = function() {
    var r = t();
    return e(Object, { is: r }, {
      is: function() {
        return Object.is !== r;
      }
    }), r;
  }, ni;
}
var ri, ta;
function Jl() {
  if (ta) return ri;
  ta = 1;
  var t = Sr(), e = Ar, n = Fs, r = Qi, i = Xl(), o = e(r(), Object);
  return t(o, {
    getPolyfill: r,
    implementation: n,
    shim: i
  }), ri = o, ri;
}
var ii, na;
function $s() {
  return na || (na = 1, ii = function(e) {
    return e !== e;
  }), ii;
}
var oi, ra;
function Us() {
  if (ra) return oi;
  ra = 1;
  var t = $s();
  return oi = function() {
    return Number.isNaN && Number.isNaN(NaN) && !Number.isNaN("a") ? Number.isNaN : t;
  }, oi;
}
var ai, ia;
function Zl() {
  if (ia) return ai;
  ia = 1;
  var t = Sr(), e = Us();
  return ai = function() {
    var r = e();
    return t(Number, { isNaN: r }, {
      isNaN: function() {
        return Number.isNaN !== r;
      }
    }), r;
  }, ai;
}
var si, oa;
function Ql() {
  if (oa) return si;
  oa = 1;
  var t = Ar, e = Sr(), n = $s(), r = Us(), i = Zl(), o = t(r(), Number);
  return e(o, {
    getPolyfill: r,
    implementation: n,
    shim: i
  }), si = o, si;
}
var ci, aa;
function ef() {
  if (aa) return ci;
  aa = 1;
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
  }, p = Object.is ? Object.is : Jl(), m = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function() {
    return [];
  }, E = Number.isNaN ? Number.isNaN : Ql();
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
    var fn = $e(g, v, M, J, j, B);
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
  function $e(g, v, M, j, B, J) {
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
  return ci = {
    isDeepEqual: Lt,
    isDeepStrictEqual: pt
  }, ci;
}
var sa;
function wi() {
  if (sa) return Br.exports;
  sa = 1;
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
  var r = Cs(), i = r.codes, o = i.ERR_AMBIGUOUS_ARGUMENT, a = i.ERR_INVALID_ARG_TYPE, s = i.ERR_INVALID_ARG_VALUE, c = i.ERR_INVALID_RETURN_VALUE, u = i.ERR_MISSING_ARGS, p = Ul(), m = en, E = m.inspect, S = en.types, C = S.isPromise, k = S.isRegExp, U = Kl(), w = Qi(), A = Tr("RegExp.prototype.test"), y, I;
  function x() {
    var l = ef();
    y = l.isDeepEqual, I = l.isDeepStrictEqual;
  }
  var H = !1, F = Br.exports = X, ee = {};
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
  }), F.strict.strict = F.strict, Br.exports;
}
var tf = wi();
const js = /* @__PURE__ */ nu(tf), yA = "aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc", nf = 0, mA = 1, EA = 2, AA = 3, TA = 4, vA = 5, SA = 6, rf = 360n, OA = 10n, of = 10000n, af = 0n, IA = 16n, bA = 8n, sf = "v1", cf = "spectre", Ds = "staking";
function eo(t, e, n) {
  return `${e}_${t}_${sf}${mt.programSuffix ? "_" + mt.programSuffix : ""}${n ? "_" + n : ""}.aleo`;
}
function Bs(t) {
  return eo(t, cf);
}
function qs(t) {
  return eo(t, Ds);
}
const RA = () => Bs(mt.programs.spectre.accessControl), NA = () => Bs(mt.programs.spectre.aclManager), uf = () => qs(mt.programs.staking.stcredits), _A = () => qs(mt.programs.staking.stcreditsPoints);
function wA(t) {
  const e = (t + 1).toString().padStart(3, "0");
  return eo(mt.programs.staking.delegator, Ds, e);
}
let mt;
function PA(t) {
  js(!mt), mt = t;
}
const Fn = globalThis || void 0 || self;
var Gs = typeof Fn == "object" && Fn && Fn.Object === Object && Fn, lf = typeof self == "object" && self && self.Object === Object && self, st = Gs || lf || Function("return this")(), ze = st.Symbol, Ws = Object.prototype, ff = Ws.hasOwnProperty, hf = Ws.toString, hn = ze ? ze.toStringTag : void 0;
function df(t) {
  var e = ff.call(t, hn), n = t[hn];
  try {
    t[hn] = void 0;
    var r = !0;
  } catch {
  }
  var i = hf.call(t);
  return r && (e ? t[hn] = n : delete t[hn]), i;
}
var pf = Object.prototype, gf = pf.toString;
function yf(t) {
  return gf.call(t);
}
var mf = "[object Null]", Ef = "[object Undefined]", ca = ze ? ze.toStringTag : void 0;
function wt(t) {
  return t == null ? t === void 0 ? Ef : mf : ca && ca in Object(t) ? df(t) : yf(t);
}
function Ze(t) {
  return t != null && typeof t == "object";
}
var Af = "[object Symbol]";
function Or(t) {
  return typeof t == "symbol" || Ze(t) && wt(t) == Af;
}
function Ir(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, i = Array(r); ++n < r; )
    i[n] = e(t[n], n, t);
  return i;
}
var te = Array.isArray, Tf = 1 / 0, ua = ze ? ze.prototype : void 0, la = ua ? ua.toString : void 0;
function Vs(t) {
  if (typeof t == "string")
    return t;
  if (te(t))
    return Ir(t, Vs) + "";
  if (Or(t))
    return la ? la.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -Tf ? "-0" : e;
}
var vf = /\s/;
function Sf(t) {
  for (var e = t.length; e-- && vf.test(t.charAt(e)); )
    ;
  return e;
}
var Of = /^\s+/;
function If(t) {
  return t && t.slice(0, Sf(t) + 1).replace(Of, "");
}
function He(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var fa = NaN, bf = /^[-+]0x[0-9a-f]+$/i, Rf = /^0b[01]+$/i, Nf = /^0o[0-7]+$/i, _f = parseInt;
function wf(t) {
  if (typeof t == "number")
    return t;
  if (Or(t))
    return fa;
  if (He(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = He(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = If(t);
  var n = Rf.test(t);
  return n || Nf.test(t) ? _f(t.slice(2), n ? 2 : 8) : bf.test(t) ? fa : +t;
}
var ha = 1 / 0, Pf = 17976931348623157e292;
function Cf(t) {
  if (!t)
    return t === 0 ? t : 0;
  if (t = wf(t), t === ha || t === -ha) {
    var e = t < 0 ? -1 : 1;
    return e * Pf;
  }
  return t === t ? t : 0;
}
function br(t) {
  var e = Cf(t), n = e % 1;
  return e === e ? n ? e - n : e : 0;
}
function nn(t) {
  return t;
}
var Lf = "[object AsyncFunction]", xf = "[object Function]", kf = "[object GeneratorFunction]", Mf = "[object Proxy]";
function St(t) {
  if (!He(t))
    return !1;
  var e = wt(t);
  return e == xf || e == kf || e == Lf || e == Mf;
}
var ui = st["__core-js_shared__"], da = function() {
  var t = /[^.]+$/.exec(ui && ui.keys && ui.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Ff(t) {
  return !!da && da in t;
}
var $f = Function.prototype, Uf = $f.toString;
function Bt(t) {
  if (t != null) {
    try {
      return Uf.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var jf = /[\\^$.*+?()[\]{}|]/g, Df = /^\[object .+?Constructor\]$/, Bf = Function.prototype, qf = Object.prototype, Gf = Bf.toString, Wf = qf.hasOwnProperty, Vf = RegExp(
  "^" + Gf.call(Wf).replace(jf, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function zf(t) {
  if (!He(t) || Ff(t))
    return !1;
  var e = St(t) ? Vf : Df;
  return e.test(Bt(t));
}
function Hf(t, e) {
  return t?.[e];
}
function qt(t, e) {
  var n = Hf(t, e);
  return zf(n) ? n : void 0;
}
var Pi = qt(st, "WeakMap"), pa = Object.create, Kf = /* @__PURE__ */ function() {
  function t() {
  }
  return function(e) {
    if (!He(e))
      return {};
    if (pa)
      return pa(e);
    t.prototype = e;
    var n = new t();
    return t.prototype = void 0, n;
  };
}();
function Yf(t, e, n) {
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
function Xf(t, e) {
  var n = -1, r = t.length;
  for (e || (e = Array(r)); ++n < r; )
    e[n] = t[n];
  return e;
}
var Jf = 800, Zf = 16, Qf = Date.now;
function eh(t) {
  var e = 0, n = 0;
  return function() {
    var r = Qf(), i = Zf - (r - n);
    if (n = r, i > 0) {
      if (++e >= Jf)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
function th(t) {
  return function() {
    return t;
  };
}
var or = function() {
  try {
    var t = qt(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}(), nh = or ? function(t, e) {
  return or(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: th(e),
    writable: !0
  });
} : nn, rh = eh(nh);
function zs(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r && e(t[n], n, t) !== !1; )
    ;
  return t;
}
function Hs(t, e, n, r) {
  for (var i = t.length, o = n + -1; ++o < i; )
    if (e(t[o], o, t))
      return o;
  return -1;
}
function ih(t) {
  return t !== t;
}
function oh(t, e, n) {
  for (var r = n - 1, i = t.length; ++r < i; )
    if (t[r] === e)
      return r;
  return -1;
}
function to(t, e, n) {
  return e === e ? oh(t, e, n) : Hs(t, ih, n);
}
function Ks(t, e) {
  var n = t == null ? 0 : t.length;
  return !!n && to(t, e, 0) > -1;
}
var ah = 9007199254740991, sh = /^(?:0|[1-9]\d*)$/;
function Rr(t, e) {
  var n = typeof t;
  return e = e ?? ah, !!e && (n == "number" || n != "symbol" && sh.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function no(t, e, n) {
  e == "__proto__" && or ? or(t, e, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : t[e] = n;
}
function Nn(t, e) {
  return t === e || t !== t && e !== e;
}
var ch = Object.prototype, uh = ch.hasOwnProperty;
function Nr(t, e, n) {
  var r = t[e];
  (!(uh.call(t, e) && Nn(r, n)) || n === void 0 && !(e in t)) && no(t, e, n);
}
function ro(t, e, n, r) {
  var i = !n;
  n || (n = {});
  for (var o = -1, a = e.length; ++o < a; ) {
    var s = e[o], c = void 0;
    c === void 0 && (c = t[s]), i ? no(n, s, c) : Nr(n, s, c);
  }
  return n;
}
var ga = Math.max;
function lh(t, e, n) {
  return e = ga(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var r = arguments, i = -1, o = ga(r.length - e, 0), a = Array(o); ++i < o; )
      a[i] = r[e + i];
    i = -1;
    for (var s = Array(e + 1); ++i < e; )
      s[i] = r[i];
    return s[e] = n(a), Yf(t, this, s);
  };
}
function io(t, e) {
  return rh(lh(t, e, nn), t + "");
}
var fh = 9007199254740991;
function oo(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= fh;
}
function ct(t) {
  return t != null && oo(t.length) && !St(t);
}
function Ys(t, e, n) {
  if (!He(n))
    return !1;
  var r = typeof e;
  return (r == "number" ? ct(n) && Rr(e, n.length) : r == "string" && e in n) ? Nn(n[e], t) : !1;
}
function hh(t) {
  return io(function(e, n) {
    var r = -1, i = n.length, o = i > 1 ? n[i - 1] : void 0, a = i > 2 ? n[2] : void 0;
    for (o = t.length > 3 && typeof o == "function" ? (i--, o) : void 0, a && Ys(n[0], n[1], a) && (o = i < 3 ? void 0 : o, i = 1), e = Object(e); ++r < i; ) {
      var s = n[r];
      s && t(e, s, r, o);
    }
    return e;
  });
}
var dh = Object.prototype;
function _n(t) {
  var e = t && t.constructor, n = typeof e == "function" && e.prototype || dh;
  return t === n;
}
function ph(t, e) {
  for (var n = -1, r = Array(t); ++n < t; )
    r[n] = e(n);
  return r;
}
var gh = "[object Arguments]";
function ya(t) {
  return Ze(t) && wt(t) == gh;
}
var Xs = Object.prototype, yh = Xs.hasOwnProperty, mh = Xs.propertyIsEnumerable, _r = ya(/* @__PURE__ */ function() {
  return arguments;
}()) ? ya : function(t) {
  return Ze(t) && yh.call(t, "callee") && !mh.call(t, "callee");
};
function Eh() {
  return !1;
}
var Js = typeof exports == "object" && exports && !exports.nodeType && exports, ma = Js && typeof module == "object" && module && !module.nodeType && module, Ah = ma && ma.exports === Js, Ea = Ah ? st.Buffer : void 0, Th = Ea ? Ea.isBuffer : void 0, vn = Th || Eh, vh = "[object Arguments]", Sh = "[object Array]", Oh = "[object Boolean]", Ih = "[object Date]", bh = "[object Error]", Rh = "[object Function]", Nh = "[object Map]", _h = "[object Number]", wh = "[object Object]", Ph = "[object RegExp]", Ch = "[object Set]", Lh = "[object String]", xh = "[object WeakMap]", kh = "[object ArrayBuffer]", Mh = "[object DataView]", Fh = "[object Float32Array]", $h = "[object Float64Array]", Uh = "[object Int8Array]", jh = "[object Int16Array]", Dh = "[object Int32Array]", Bh = "[object Uint8Array]", qh = "[object Uint8ClampedArray]", Gh = "[object Uint16Array]", Wh = "[object Uint32Array]", le = {};
le[Fh] = le[$h] = le[Uh] = le[jh] = le[Dh] = le[Bh] = le[qh] = le[Gh] = le[Wh] = !0;
le[vh] = le[Sh] = le[kh] = le[Oh] = le[Mh] = le[Ih] = le[bh] = le[Rh] = le[Nh] = le[_h] = le[wh] = le[Ph] = le[Ch] = le[Lh] = le[xh] = !1;
function Vh(t) {
  return Ze(t) && oo(t.length) && !!le[wt(t)];
}
function wr(t) {
  return function(e) {
    return t(e);
  };
}
var Zs = typeof exports == "object" && exports && !exports.nodeType && exports, En = Zs && typeof module == "object" && module && !module.nodeType && module, zh = En && En.exports === Zs, li = zh && Gs.process, Nt = function() {
  try {
    var t = En && En.require && En.require("util").types;
    return t || li && li.binding && li.binding("util");
  } catch {
  }
}(), Aa = Nt && Nt.isTypedArray, ao = Aa ? wr(Aa) : Vh, Hh = Object.prototype, Kh = Hh.hasOwnProperty;
function Qs(t, e) {
  var n = te(t), r = !n && _r(t), i = !n && !r && vn(t), o = !n && !r && !i && ao(t), a = n || r || i || o, s = a ? ph(t.length, String) : [], c = s.length;
  for (var u in t)
    (e || Kh.call(t, u)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    Rr(u, c))) && s.push(u);
  return s;
}
function ec(t, e) {
  return function(n) {
    return t(e(n));
  };
}
var Yh = ec(Object.keys, Object), Xh = Object.prototype, Jh = Xh.hasOwnProperty;
function tc(t) {
  if (!_n(t))
    return Yh(t);
  var e = [];
  for (var n in Object(t))
    Jh.call(t, n) && n != "constructor" && e.push(n);
  return e;
}
function Ke(t) {
  return ct(t) ? Qs(t) : tc(t);
}
var Zh = Object.prototype, Qh = Zh.hasOwnProperty, je = hh(function(t, e) {
  if (_n(e) || ct(e)) {
    ro(e, Ke(e), t);
    return;
  }
  for (var n in e)
    Qh.call(e, n) && Nr(t, n, e[n]);
});
function ed(t) {
  var e = [];
  if (t != null)
    for (var n in Object(t))
      e.push(n);
  return e;
}
var td = Object.prototype, nd = td.hasOwnProperty;
function rd(t) {
  if (!He(t))
    return ed(t);
  var e = _n(t), n = [];
  for (var r in t)
    r == "constructor" && (e || !nd.call(t, r)) || n.push(r);
  return n;
}
function nc(t) {
  return ct(t) ? Qs(t, !0) : rd(t);
}
var id = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, od = /^\w*$/;
function so(t, e) {
  if (te(t))
    return !1;
  var n = typeof t;
  return n == "number" || n == "symbol" || n == "boolean" || t == null || Or(t) ? !0 : od.test(t) || !id.test(t) || e != null && t in Object(e);
}
var Sn = qt(Object, "create");
function ad() {
  this.__data__ = Sn ? Sn(null) : {}, this.size = 0;
}
function sd(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var cd = "__lodash_hash_undefined__", ud = Object.prototype, ld = ud.hasOwnProperty;
function fd(t) {
  var e = this.__data__;
  if (Sn) {
    var n = e[t];
    return n === cd ? void 0 : n;
  }
  return ld.call(e, t) ? e[t] : void 0;
}
var hd = Object.prototype, dd = hd.hasOwnProperty;
function pd(t) {
  var e = this.__data__;
  return Sn ? e[t] !== void 0 : dd.call(e, t);
}
var gd = "__lodash_hash_undefined__";
function yd(t, e) {
  var n = this.__data__;
  return this.size += this.has(t) ? 0 : 1, n[t] = Sn && e === void 0 ? gd : e, this;
}
function Ut(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Ut.prototype.clear = ad;
Ut.prototype.delete = sd;
Ut.prototype.get = fd;
Ut.prototype.has = pd;
Ut.prototype.set = yd;
function md() {
  this.__data__ = [], this.size = 0;
}
function Pr(t, e) {
  for (var n = t.length; n--; )
    if (Nn(t[n][0], e))
      return n;
  return -1;
}
var Ed = Array.prototype, Ad = Ed.splice;
function Td(t) {
  var e = this.__data__, n = Pr(e, t);
  if (n < 0)
    return !1;
  var r = e.length - 1;
  return n == r ? e.pop() : Ad.call(e, n, 1), --this.size, !0;
}
function vd(t) {
  var e = this.__data__, n = Pr(e, t);
  return n < 0 ? void 0 : e[n][1];
}
function Sd(t) {
  return Pr(this.__data__, t) > -1;
}
function Od(t, e) {
  var n = this.__data__, r = Pr(n, t);
  return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this;
}
function Ot(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Ot.prototype.clear = md;
Ot.prototype.delete = Td;
Ot.prototype.get = vd;
Ot.prototype.has = Sd;
Ot.prototype.set = Od;
var On = qt(st, "Map");
function Id() {
  this.size = 0, this.__data__ = {
    hash: new Ut(),
    map: new (On || Ot)(),
    string: new Ut()
  };
}
function bd(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Cr(t, e) {
  var n = t.__data__;
  return bd(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
}
function Rd(t) {
  var e = Cr(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function Nd(t) {
  return Cr(this, t).get(t);
}
function _d(t) {
  return Cr(this, t).has(t);
}
function wd(t, e) {
  var n = Cr(this, t), r = n.size;
  return n.set(t, e), this.size += n.size == r ? 0 : 1, this;
}
function It(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
It.prototype.clear = Id;
It.prototype.delete = Rd;
It.prototype.get = Nd;
It.prototype.has = _d;
It.prototype.set = wd;
var Pd = "Expected a function";
function co(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Pd);
  var n = function() {
    var r = arguments, i = e ? e.apply(this, r) : r[0], o = n.cache;
    if (o.has(i))
      return o.get(i);
    var a = t.apply(this, r);
    return n.cache = o.set(i, a) || o, a;
  };
  return n.cache = new (co.Cache || It)(), n;
}
co.Cache = It;
var Cd = 500;
function Ld(t) {
  var e = co(t, function(r) {
    return n.size === Cd && n.clear(), r;
  }), n = e.cache;
  return e;
}
var xd = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, kd = /\\(\\)?/g, Md = Ld(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(xd, function(n, r, i, o) {
    e.push(i ? o.replace(kd, "$1") : r || n);
  }), e;
});
function Fd(t) {
  return t == null ? "" : Vs(t);
}
function Lr(t, e) {
  return te(t) ? t : so(t, e) ? [t] : Md(Fd(t));
}
var $d = 1 / 0;
function wn(t) {
  if (typeof t == "string" || Or(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -$d ? "-0" : e;
}
function uo(t, e) {
  e = Lr(e, t);
  for (var n = 0, r = e.length; t != null && n < r; )
    t = t[wn(e[n++])];
  return n && n == r ? t : void 0;
}
function Ud(t, e, n) {
  var r = t == null ? void 0 : uo(t, e);
  return r === void 0 ? n : r;
}
function lo(t, e) {
  for (var n = -1, r = e.length, i = t.length; ++n < r; )
    t[i + n] = e[n];
  return t;
}
var Ta = ze ? ze.isConcatSpreadable : void 0;
function jd(t) {
  return te(t) || _r(t) || !!(Ta && t && t[Ta]);
}
function fo(t, e, n, r, i) {
  var o = -1, a = t.length;
  for (n || (n = jd), i || (i = []); ++o < a; ) {
    var s = t[o];
    n(s) ? lo(i, s) : r || (i[i.length] = s);
  }
  return i;
}
function Xe(t) {
  var e = t == null ? 0 : t.length;
  return e ? fo(t) : [];
}
var rc = ec(Object.getPrototypeOf, Object);
function ic(t, e, n) {
  var r = -1, i = t.length;
  e < 0 && (e = -e > i ? 0 : i + e), n = n > i ? i : n, n < 0 && (n += i), i = e > n ? 0 : n - e >>> 0, e >>>= 0;
  for (var o = Array(i); ++r < i; )
    o[r] = t[r + e];
  return o;
}
function Dd(t, e, n, r) {
  var i = -1, o = t == null ? 0 : t.length;
  for (r && o && (n = t[++i]); ++i < o; )
    n = e(n, t[i], i, t);
  return n;
}
function Bd() {
  this.__data__ = new Ot(), this.size = 0;
}
function qd(t) {
  var e = this.__data__, n = e.delete(t);
  return this.size = e.size, n;
}
function Gd(t) {
  return this.__data__.get(t);
}
function Wd(t) {
  return this.__data__.has(t);
}
var Vd = 200;
function zd(t, e) {
  var n = this.__data__;
  if (n instanceof Ot) {
    var r = n.__data__;
    if (!On || r.length < Vd - 1)
      return r.push([t, e]), this.size = ++n.size, this;
    n = this.__data__ = new It(r);
  }
  return n.set(t, e), this.size = n.size, this;
}
function at(t) {
  var e = this.__data__ = new Ot(t);
  this.size = e.size;
}
at.prototype.clear = Bd;
at.prototype.delete = qd;
at.prototype.get = Gd;
at.prototype.has = Wd;
at.prototype.set = zd;
function Hd(t, e) {
  return t && ro(e, Ke(e), t);
}
var oc = typeof exports == "object" && exports && !exports.nodeType && exports, va = oc && typeof module == "object" && module && !module.nodeType && module, Kd = va && va.exports === oc, Sa = Kd ? st.Buffer : void 0, Oa = Sa ? Sa.allocUnsafe : void 0;
function Yd(t, e) {
  var n = t.length, r = Oa ? Oa(n) : new t.constructor(n);
  return t.copy(r), r;
}
function ho(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, i = 0, o = []; ++n < r; ) {
    var a = t[n];
    e(a, n, t) && (o[i++] = a);
  }
  return o;
}
function ac() {
  return [];
}
var Xd = Object.prototype, Jd = Xd.propertyIsEnumerable, Ia = Object.getOwnPropertySymbols, po = Ia ? function(t) {
  return t == null ? [] : (t = Object(t), ho(Ia(t), function(e) {
    return Jd.call(t, e);
  }));
} : ac;
function Zd(t, e) {
  return ro(t, po(t), e);
}
var Qd = Object.getOwnPropertySymbols, ep = Qd ? function(t) {
  for (var e = []; t; )
    lo(e, po(t)), t = rc(t);
  return e;
} : ac;
function sc(t, e, n) {
  var r = e(t);
  return te(t) ? r : lo(r, n(t));
}
function Ci(t) {
  return sc(t, Ke, po);
}
function tp(t) {
  return sc(t, nc, ep);
}
var Li = qt(st, "DataView"), xi = qt(st, "Promise"), Qt = qt(st, "Set"), ba = "[object Map]", np = "[object Object]", Ra = "[object Promise]", Na = "[object Set]", _a = "[object WeakMap]", wa = "[object DataView]", rp = Bt(Li), ip = Bt(On), op = Bt(xi), ap = Bt(Qt), sp = Bt(Pi), Ge = wt;
(Li && Ge(new Li(new ArrayBuffer(1))) != wa || On && Ge(new On()) != ba || xi && Ge(xi.resolve()) != Ra || Qt && Ge(new Qt()) != Na || Pi && Ge(new Pi()) != _a) && (Ge = function(t) {
  var e = wt(t), n = e == np ? t.constructor : void 0, r = n ? Bt(n) : "";
  if (r)
    switch (r) {
      case rp:
        return wa;
      case ip:
        return ba;
      case op:
        return Ra;
      case ap:
        return Na;
      case sp:
        return _a;
    }
  return e;
});
var cp = Object.prototype, up = cp.hasOwnProperty;
function lp(t) {
  var e = t.length, n = new t.constructor(e);
  return e && typeof t[0] == "string" && up.call(t, "index") && (n.index = t.index, n.input = t.input), n;
}
var ar = st.Uint8Array;
function fp(t) {
  var e = new t.constructor(t.byteLength);
  return new ar(e).set(new ar(t)), e;
}
function hp(t, e) {
  var n = t.buffer;
  return new t.constructor(n, t.byteOffset, t.byteLength);
}
var dp = /\w*$/;
function pp(t) {
  var e = new t.constructor(t.source, dp.exec(t));
  return e.lastIndex = t.lastIndex, e;
}
var Pa = ze ? ze.prototype : void 0, Ca = Pa ? Pa.valueOf : void 0;
function gp(t) {
  return Ca ? Object(Ca.call(t)) : {};
}
function yp(t, e) {
  var n = t.buffer;
  return new t.constructor(n, t.byteOffset, t.length);
}
var mp = "[object Boolean]", Ep = "[object Date]", Ap = "[object Map]", Tp = "[object Number]", vp = "[object RegExp]", Sp = "[object Set]", Op = "[object String]", Ip = "[object Symbol]", bp = "[object ArrayBuffer]", Rp = "[object DataView]", Np = "[object Float32Array]", _p = "[object Float64Array]", wp = "[object Int8Array]", Pp = "[object Int16Array]", Cp = "[object Int32Array]", Lp = "[object Uint8Array]", xp = "[object Uint8ClampedArray]", kp = "[object Uint16Array]", Mp = "[object Uint32Array]";
function Fp(t, e, n) {
  var r = t.constructor;
  switch (e) {
    case bp:
      return fp(t);
    case mp:
    case Ep:
      return new r(+t);
    case Rp:
      return hp(t);
    case Np:
    case _p:
    case wp:
    case Pp:
    case Cp:
    case Lp:
    case xp:
    case kp:
    case Mp:
      return yp(t);
    case Ap:
      return new r();
    case Tp:
    case Op:
      return new r(t);
    case vp:
      return pp(t);
    case Sp:
      return new r();
    case Ip:
      return gp(t);
  }
}
function $p(t) {
  return typeof t.constructor == "function" && !_n(t) ? Kf(rc(t)) : {};
}
var Up = "[object Map]";
function jp(t) {
  return Ze(t) && Ge(t) == Up;
}
var La = Nt && Nt.isMap, Dp = La ? wr(La) : jp, Bp = "[object Set]";
function qp(t) {
  return Ze(t) && Ge(t) == Bp;
}
var xa = Nt && Nt.isSet, Gp = xa ? wr(xa) : qp, cc = "[object Arguments]", Wp = "[object Array]", Vp = "[object Boolean]", zp = "[object Date]", Hp = "[object Error]", uc = "[object Function]", Kp = "[object GeneratorFunction]", Yp = "[object Map]", Xp = "[object Number]", lc = "[object Object]", Jp = "[object RegExp]", Zp = "[object Set]", Qp = "[object String]", eg = "[object Symbol]", tg = "[object WeakMap]", ng = "[object ArrayBuffer]", rg = "[object DataView]", ig = "[object Float32Array]", og = "[object Float64Array]", ag = "[object Int8Array]", sg = "[object Int16Array]", cg = "[object Int32Array]", ug = "[object Uint8Array]", lg = "[object Uint8ClampedArray]", fg = "[object Uint16Array]", hg = "[object Uint32Array]", se = {};
se[cc] = se[Wp] = se[ng] = se[rg] = se[Vp] = se[zp] = se[ig] = se[og] = se[ag] = se[sg] = se[cg] = se[Yp] = se[Xp] = se[lc] = se[Jp] = se[Zp] = se[Qp] = se[eg] = se[ug] = se[lg] = se[fg] = se[hg] = !0;
se[Hp] = se[uc] = se[tg] = !1;
function Yn(t, e, n, r, i, o) {
  var a;
  if (a !== void 0)
    return a;
  if (!He(t))
    return t;
  var s = te(t);
  if (s)
    return a = lp(t), Xf(t, a);
  var c = Ge(t), u = c == uc || c == Kp;
  if (vn(t))
    return Yd(t);
  if (c == lc || c == cc || u && !i)
    return a = u ? {} : $p(t), Zd(t, Hd(a, t));
  if (!se[c])
    return i ? t : {};
  a = Fp(t, c), o || (o = new at());
  var p = o.get(t);
  if (p)
    return p;
  o.set(t, a), Gp(t) ? t.forEach(function(S) {
    a.add(Yn(S, e, n, S, t, o));
  }) : Dp(t) && t.forEach(function(S, C) {
    a.set(C, Yn(S, e, n, C, t, o));
  });
  var m = Ci, E = s ? void 0 : m(t);
  return zs(E || t, function(S, C) {
    E && (C = S, S = t[C]), Nr(a, C, Yn(S, e, n, C, t, o));
  }), a;
}
var dg = 4;
function Re(t) {
  return Yn(t, dg);
}
function Pn(t) {
  for (var e = -1, n = t == null ? 0 : t.length, r = 0, i = []; ++e < n; ) {
    var o = t[e];
    o && (i[r++] = o);
  }
  return i;
}
var pg = "__lodash_hash_undefined__";
function gg(t) {
  return this.__data__.set(t, pg), this;
}
function yg(t) {
  return this.__data__.has(t);
}
function rn(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.__data__ = new It(); ++e < n; )
    this.add(t[e]);
}
rn.prototype.add = rn.prototype.push = gg;
rn.prototype.has = yg;
function fc(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r; )
    if (e(t[n], n, t))
      return !0;
  return !1;
}
function go(t, e) {
  return t.has(e);
}
var mg = 1, Eg = 2;
function hc(t, e, n, r, i, o) {
  var a = n & mg, s = t.length, c = e.length;
  if (s != c && !(a && c > s))
    return !1;
  var u = o.get(t), p = o.get(e);
  if (u && p)
    return u == e && p == t;
  var m = -1, E = !0, S = n & Eg ? new rn() : void 0;
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
      if (!fc(e, function(w, A) {
        if (!go(S, A) && (C === w || i(C, w, n, r, o)))
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
function Ag(t) {
  var e = -1, n = Array(t.size);
  return t.forEach(function(r, i) {
    n[++e] = [i, r];
  }), n;
}
function yo(t) {
  var e = -1, n = Array(t.size);
  return t.forEach(function(r) {
    n[++e] = r;
  }), n;
}
var Tg = 1, vg = 2, Sg = "[object Boolean]", Og = "[object Date]", Ig = "[object Error]", bg = "[object Map]", Rg = "[object Number]", Ng = "[object RegExp]", _g = "[object Set]", wg = "[object String]", Pg = "[object Symbol]", Cg = "[object ArrayBuffer]", Lg = "[object DataView]", ka = ze ? ze.prototype : void 0, fi = ka ? ka.valueOf : void 0;
function xg(t, e, n, r, i, o, a) {
  switch (n) {
    case Lg:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      t = t.buffer, e = e.buffer;
    case Cg:
      return !(t.byteLength != e.byteLength || !o(new ar(t), new ar(e)));
    case Sg:
    case Og:
    case Rg:
      return Nn(+t, +e);
    case Ig:
      return t.name == e.name && t.message == e.message;
    case Ng:
    case wg:
      return t == e + "";
    case bg:
      var s = Ag;
    case _g:
      var c = r & Tg;
      if (s || (s = yo), t.size != e.size && !c)
        return !1;
      var u = a.get(t);
      if (u)
        return u == e;
      r |= vg, a.set(t, e);
      var p = hc(s(t), s(e), r, i, o, a);
      return a.delete(t), p;
    case Pg:
      if (fi)
        return fi.call(t) == fi.call(e);
  }
  return !1;
}
var kg = 1, Mg = Object.prototype, Fg = Mg.hasOwnProperty;
function $g(t, e, n, r, i, o) {
  var a = n & kg, s = Ci(t), c = s.length, u = Ci(e), p = u.length;
  if (c != p && !a)
    return !1;
  for (var m = c; m--; ) {
    var E = s[m];
    if (!(a ? E in e : Fg.call(e, E)))
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
var Ug = 1, Ma = "[object Arguments]", Fa = "[object Array]", $n = "[object Object]", jg = Object.prototype, $a = jg.hasOwnProperty;
function Dg(t, e, n, r, i, o) {
  var a = te(t), s = te(e), c = a ? Fa : Ge(t), u = s ? Fa : Ge(e);
  c = c == Ma ? $n : c, u = u == Ma ? $n : u;
  var p = c == $n, m = u == $n, E = c == u;
  if (E && vn(t)) {
    if (!vn(e))
      return !1;
    a = !0, p = !1;
  }
  if (E && !p)
    return o || (o = new at()), a || ao(t) ? hc(t, e, n, r, i, o) : xg(t, e, c, n, r, i, o);
  if (!(n & Ug)) {
    var S = p && $a.call(t, "__wrapped__"), C = m && $a.call(e, "__wrapped__");
    if (S || C) {
      var k = S ? t.value() : t, U = C ? e.value() : e;
      return o || (o = new at()), i(k, U, n, r, o);
    }
  }
  return E ? (o || (o = new at()), $g(t, e, n, r, i, o)) : !1;
}
function mo(t, e, n, r, i) {
  return t === e ? !0 : t == null || e == null || !Ze(t) && !Ze(e) ? t !== t && e !== e : Dg(t, e, n, r, mo, i);
}
var Bg = 1, qg = 2;
function Gg(t, e, n, r) {
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
      if (!(m === void 0 ? mo(u, c, Bg | qg, r, p) : m))
        return !1;
    }
  }
  return !0;
}
function dc(t) {
  return t === t && !He(t);
}
function Wg(t) {
  for (var e = Ke(t), n = e.length; n--; ) {
    var r = e[n], i = t[r];
    e[n] = [r, i, dc(i)];
  }
  return e;
}
function pc(t, e) {
  return function(n) {
    return n == null ? !1 : n[t] === e && (e !== void 0 || t in Object(n));
  };
}
function Vg(t) {
  var e = Wg(t);
  return e.length == 1 && e[0][2] ? pc(e[0][0], e[0][1]) : function(n) {
    return n === t || Gg(n, t, e);
  };
}
function zg(t, e) {
  return t != null && e in Object(t);
}
function gc(t, e, n) {
  e = Lr(e, t);
  for (var r = -1, i = e.length, o = !1; ++r < i; ) {
    var a = wn(e[r]);
    if (!(o = t != null && n(t, a)))
      break;
    t = t[a];
  }
  return o || ++r != i ? o : (i = t == null ? 0 : t.length, !!i && oo(i) && Rr(a, i) && (te(t) || _r(t)));
}
function Hg(t, e) {
  return t != null && gc(t, e, zg);
}
var Kg = 1, Yg = 2;
function Xg(t, e) {
  return so(t) && dc(e) ? pc(wn(t), e) : function(n) {
    var r = Ud(n, t);
    return r === void 0 && r === e ? Hg(n, t) : mo(e, r, Kg | Yg);
  };
}
function Jg(t) {
  return function(e) {
    return e?.[t];
  };
}
function Zg(t) {
  return function(e) {
    return uo(e, t);
  };
}
function Qg(t) {
  return so(t) ? Jg(wn(t)) : Zg(t);
}
function ut(t) {
  return typeof t == "function" ? t : t == null ? nn : typeof t == "object" ? te(t) ? Xg(t[0], t[1]) : Vg(t) : Qg(t);
}
function ey(t, e, n, r) {
  for (var i = -1, o = t == null ? 0 : t.length; ++i < o; ) {
    var a = t[i];
    e(r, a, n(a), t);
  }
  return r;
}
function ty(t) {
  return function(e, n, r) {
    for (var i = -1, o = Object(e), a = r(e), s = a.length; s--; ) {
      var c = a[++i];
      if (n(o[c], c, o) === !1)
        break;
    }
    return e;
  };
}
var ny = ty();
function ry(t, e) {
  return t && ny(t, e, Ke);
}
function iy(t, e) {
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
var Gt = iy(ry);
function oy(t, e, n, r) {
  return Gt(t, function(i, o, a) {
    e(r, i, n(i), a);
  }), r;
}
function ay(t, e) {
  return function(n, r) {
    var i = te(n) ? ey : oy, o = e ? e() : {};
    return i(n, t, ut(r), o);
  };
}
var yc = Object.prototype, sy = yc.hasOwnProperty, Eo = io(function(t, e) {
  t = Object(t);
  var n = -1, r = e.length, i = r > 2 ? e[2] : void 0;
  for (i && Ys(e[0], e[1], i) && (r = 1); ++n < r; )
    for (var o = e[n], a = nc(o), s = -1, c = a.length; ++s < c; ) {
      var u = a[s], p = t[u];
      (p === void 0 || Nn(p, yc[u]) && !sy.call(t, u)) && (t[u] = o[u]);
    }
  return t;
});
function Ua(t) {
  return Ze(t) && ct(t);
}
var cy = 200;
function uy(t, e, n, r) {
  var i = -1, o = Ks, a = !0, s = t.length, c = [], u = e.length;
  if (!s)
    return c;
  e.length >= cy && (o = go, a = !1, e = new rn(e));
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
var xr = io(function(t, e) {
  return Ua(t) ? uy(t, fo(e, 1, Ua, !0)) : [];
});
function on(t) {
  var e = t == null ? 0 : t.length;
  return e ? t[e - 1] : void 0;
}
function be(t, e, n) {
  var r = t == null ? 0 : t.length;
  return r ? (e = e === void 0 ? 1 : br(e), ic(t, e < 0 ? 0 : e, r)) : [];
}
function In(t, e, n) {
  var r = t == null ? 0 : t.length;
  return r ? (e = e === void 0 ? 1 : br(e), e = r - e, ic(t, 0, e < 0 ? 0 : e)) : [];
}
function ly(t) {
  return typeof t == "function" ? t : nn;
}
function W(t, e) {
  var n = te(t) ? zs : Gt;
  return n(t, ly(e));
}
function fy(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r; )
    if (!e(t[n], n, t))
      return !1;
  return !0;
}
function hy(t, e) {
  var n = !0;
  return Gt(t, function(r, i, o) {
    return n = !!e(r, i, o), n;
  }), n;
}
function Je(t, e, n) {
  var r = te(t) ? fy : hy;
  return r(t, ut(e));
}
function mc(t, e) {
  var n = [];
  return Gt(t, function(r, i, o) {
    e(r, i, o) && n.push(r);
  }), n;
}
function Ye(t, e) {
  var n = te(t) ? ho : mc;
  return n(t, ut(e));
}
function dy(t) {
  return function(e, n, r) {
    var i = Object(e);
    if (!ct(e)) {
      var o = ut(n);
      e = Ke(e), n = function(s) {
        return o(i[s], s, i);
      };
    }
    var a = t(e, n, r);
    return a > -1 ? i[o ? e[a] : a] : void 0;
  };
}
var py = Math.max;
function gy(t, e, n) {
  var r = t == null ? 0 : t.length;
  if (!r)
    return -1;
  var i = n == null ? 0 : br(n);
  return i < 0 && (i = py(r + i, 0)), Hs(t, ut(e), i);
}
var an = dy(gy);
function Qe(t) {
  return t && t.length ? t[0] : void 0;
}
function yy(t, e) {
  var n = -1, r = ct(t) ? Array(t.length) : [];
  return Gt(t, function(i, o, a) {
    r[++n] = e(i, o, a);
  }), r;
}
function D(t, e) {
  var n = te(t) ? Ir : yy;
  return n(t, ut(e));
}
function Ve(t, e) {
  return fo(D(t, e));
}
var my = Object.prototype, Ey = my.hasOwnProperty, Ay = ay(function(t, e, n) {
  Ey.call(t, n) ? t[n].push(e) : no(t, n, [e]);
}), Ty = Object.prototype, vy = Ty.hasOwnProperty;
function Sy(t, e) {
  return t != null && vy.call(t, e);
}
function G(t, e) {
  return t != null && gc(t, e, Sy);
}
var Oy = "[object String]";
function Me(t) {
  return typeof t == "string" || !te(t) && Ze(t) && wt(t) == Oy;
}
function Iy(t, e) {
  return Ir(e, function(n) {
    return t[n];
  });
}
function ve(t) {
  return t == null ? [] : Iy(t, Ke(t));
}
var by = Math.max;
function Le(t, e, n, r) {
  t = ct(t) ? t : ve(t), n = n && !r ? br(n) : 0;
  var i = t.length;
  return n < 0 && (n = by(i + n, 0)), Me(t) ? n <= i && t.indexOf(e, n) > -1 : !!i && to(t, e, n) > -1;
}
function ja(t, e, n) {
  var r = t == null ? 0 : t.length;
  if (!r)
    return -1;
  var i = 0;
  return to(t, e, i);
}
var Ry = "[object Map]", Ny = "[object Set]", _y = Object.prototype, wy = _y.hasOwnProperty;
function ce(t) {
  if (t == null)
    return !0;
  if (ct(t) && (te(t) || typeof t == "string" || typeof t.splice == "function" || vn(t) || ao(t) || _r(t)))
    return !t.length;
  var e = Ge(t);
  if (e == Ry || e == Ny)
    return !t.size;
  if (_n(t))
    return !tc(t).length;
  for (var n in t)
    if (wy.call(t, n))
      return !1;
  return !0;
}
var Py = "[object RegExp]";
function Cy(t) {
  return Ze(t) && wt(t) == Py;
}
var Da = Nt && Nt.isRegExp, Et = Da ? wr(Da) : Cy;
function At(t) {
  return t === void 0;
}
var Ly = "Expected a function";
function xy(t) {
  if (typeof t != "function")
    throw new TypeError(Ly);
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
function ky(t, e, n, r) {
  if (!He(t))
    return t;
  e = Lr(e, t);
  for (var i = -1, o = e.length, a = o - 1, s = t; s != null && ++i < o; ) {
    var c = wn(e[i]), u = n;
    if (c === "__proto__" || c === "constructor" || c === "prototype")
      return t;
    if (i != a) {
      var p = s[c];
      u = void 0, u === void 0 && (u = He(p) ? p : Rr(e[i + 1]) ? [] : {});
    }
    Nr(s, c, u), s = s[c];
  }
  return t;
}
function My(t, e, n) {
  for (var r = -1, i = e.length, o = {}; ++r < i; ) {
    var a = e[r], s = uo(t, a);
    n(s, a) && ky(o, Lr(a, t), s);
  }
  return o;
}
function et(t, e) {
  if (t == null)
    return {};
  var n = Ir(tp(t), function(r) {
    return [r];
  });
  return e = ut(e), My(t, n, function(r, i) {
    return e(r, i[0]);
  });
}
function Fy(t, e, n, r, i) {
  return i(t, function(o, a, s) {
    n = r ? (r = !1, o) : e(n, o, a, s);
  }), n;
}
function De(t, e, n) {
  var r = te(t) ? Dd : Fy, i = arguments.length < 3;
  return r(t, ut(e), n, i, Gt);
}
function kr(t, e) {
  var n = te(t) ? ho : mc;
  return n(t, xy(ut(e)));
}
function $y(t, e) {
  var n;
  return Gt(t, function(r, i, o) {
    return n = e(r, i, o), !n;
  }), !!n;
}
function Ec(t, e, n) {
  var r = te(t) ? fc : $y;
  return r(t, ut(e));
}
var Uy = 1 / 0, jy = Qt && 1 / yo(new Qt([, -0]))[1] == Uy ? function(t) {
  return new Qt(t);
} : Te, Dy = 200;
function By(t, e, n) {
  var r = -1, i = Ks, o = t.length, a = !0, s = [], c = s;
  if (o >= Dy) {
    var u = jy(t);
    if (u)
      return yo(u);
    a = !1, i = go, c = new rn();
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
function Ao(t) {
  return t && t.length ? By(t) : [];
}
function ki(t) {
  console && console.error && console.error(`Error: ${t}`);
}
function Ac(t) {
  console && console.warn && console.warn(`Warning: ${t}`);
}
function Tc(t) {
  const e = (/* @__PURE__ */ new Date()).getTime(), n = t();
  return { time: (/* @__PURE__ */ new Date()).getTime() - e, value: n };
}
function vc(t) {
  function e() {
  }
  e.prototype = t;
  const n = new e();
  function r() {
    return typeof n.bar;
  }
  return r(), r(), t;
}
function qy(t) {
  return Gy(t) ? t.LABEL : t.name;
}
function Gy(t) {
  return Me(t.LABEL) && t.LABEL !== "";
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
class Be extends lt {
  constructor(e) {
    super([]), this.idx = 1, je(this, et(e, (n) => n !== void 0));
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
    super(e.definition), this.orgText = "", je(this, et(e, (n) => n !== void 0));
  }
}
class Fe extends lt {
  constructor(e) {
    super(e.definition), this.ignoreAmbiguities = !1, je(this, et(e, (n) => n !== void 0));
  }
}
class ke extends lt {
  constructor(e) {
    super(e.definition), this.idx = 1, je(this, et(e, (n) => n !== void 0));
  }
}
class ft extends lt {
  constructor(e) {
    super(e.definition), this.idx = 1, je(this, et(e, (n) => n !== void 0));
  }
}
class ht extends lt {
  constructor(e) {
    super(e.definition), this.idx = 1, je(this, et(e, (n) => n !== void 0));
  }
}
class Se extends lt {
  constructor(e) {
    super(e.definition), this.idx = 1, je(this, et(e, (n) => n !== void 0));
  }
}
class tt extends lt {
  constructor(e) {
    super(e.definition), this.idx = 1, je(this, et(e, (n) => n !== void 0));
  }
}
class nt extends lt {
  get definition() {
    return this._definition;
  }
  set definition(e) {
    this._definition = e;
  }
  constructor(e) {
    super(e.definition), this.idx = 1, this.ignoreAmbiguities = !1, this.hasPredicates = !1, je(this, et(e, (n) => n !== void 0));
  }
}
class he {
  constructor(e) {
    this.idx = 1, je(this, et(e, (n) => n !== void 0));
  }
  accept(e) {
    e.visit(this);
  }
}
function Wy(t) {
  return D(t, Xn);
}
function Xn(t) {
  function e(n) {
    return D(n, Xn);
  }
  if (t instanceof Be) {
    const n = {
      type: "NonTerminal",
      name: t.nonTerminalName,
      idx: t.idx
    };
    return Me(t.label) && (n.label = t.label), n;
  } else {
    if (t instanceof Fe)
      return {
        type: "Alternative",
        definition: e(t.definition)
      };
    if (t instanceof ke)
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
        separator: Xn(new he({ terminalType: t.separator })),
        definition: e(t.definition)
      };
    if (t instanceof tt)
      return {
        type: "RepetitionWithSeparator",
        idx: t.idx,
        separator: Xn(new he({ terminalType: t.separator })),
        definition: e(t.definition)
      };
    if (t instanceof Se)
      return {
        type: "Repetition",
        idx: t.idx,
        definition: e(t.definition)
      };
    if (t instanceof nt)
      return {
        type: "Alternation",
        idx: t.idx,
        definition: e(t.definition)
      };
    if (t instanceof he) {
      const n = {
        type: "Terminal",
        name: t.terminalType.name,
        label: qy(t.terminalType),
        idx: t.idx
      };
      Me(t.label) && (n.terminalLabel = t.label);
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
      case Be:
        return this.visitNonTerminal(n);
      case Fe:
        return this.visitAlternative(n);
      case ke:
        return this.visitOption(n);
      case ft:
        return this.visitRepetitionMandatory(n);
      case ht:
        return this.visitRepetitionMandatoryWithSeparator(n);
      case tt:
        return this.visitRepetitionWithSeparator(n);
      case Se:
        return this.visitRepetition(n);
      case nt:
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
function Vy(t) {
  return t instanceof Fe || t instanceof ke || t instanceof Se || t instanceof ft || t instanceof ht || t instanceof tt || t instanceof he || t instanceof sn;
}
function sr(t, e = []) {
  return t instanceof ke || t instanceof Se || t instanceof tt ? !0 : t instanceof nt ? Ec(t.definition, (r) => sr(r, e)) : t instanceof Be && Le(e, t) ? !1 : t instanceof lt ? (t instanceof Be && e.push(t), Je(t.definition, (r) => sr(r, e))) : !1;
}
function zy(t) {
  return t instanceof nt;
}
function ot(t) {
  if (t instanceof Be)
    return "SUBRULE";
  if (t instanceof ke)
    return "OPTION";
  if (t instanceof nt)
    return "OR";
  if (t instanceof ft)
    return "AT_LEAST_ONE";
  if (t instanceof ht)
    return "AT_LEAST_ONE_SEP";
  if (t instanceof tt)
    return "MANY_SEP";
  if (t instanceof Se)
    return "MANY";
  if (t instanceof he)
    return "CONSUME";
  throw Error("non exhaustive match");
}
class Mr {
  walk(e, n = []) {
    W(e.definition, (r, i) => {
      const o = be(e.definition, i + 1);
      if (r instanceof Be)
        this.walkProdRef(r, o, n);
      else if (r instanceof he)
        this.walkTerminal(r, o, n);
      else if (r instanceof Fe)
        this.walkFlat(r, o, n);
      else if (r instanceof ke)
        this.walkOption(r, o, n);
      else if (r instanceof ft)
        this.walkAtLeastOne(r, o, n);
      else if (r instanceof ht)
        this.walkAtLeastOneSep(r, o, n);
      else if (r instanceof tt)
        this.walkManySep(r, o, n);
      else if (r instanceof Se)
        this.walkMany(r, o, n);
      else if (r instanceof nt)
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
      new ke({ definition: e.definition })
    ].concat(n, r);
    this.walk(e, i);
  }
  walkAtLeastOneSep(e, n, r) {
    const i = Ba(e, n, r);
    this.walk(e, i);
  }
  walkMany(e, n, r) {
    const i = [
      new ke({ definition: e.definition })
    ].concat(n, r);
    this.walk(e, i);
  }
  walkManySep(e, n, r) {
    const i = Ba(e, n, r);
    this.walk(e, i);
  }
  walkOr(e, n, r) {
    const i = n.concat(r);
    W(e.definition, (o) => {
      const a = new Fe({ definition: [o] });
      this.walk(a, i);
    });
  }
}
function Ba(t, e, n) {
  return [
    new ke({
      definition: [
        new he({ terminalType: t.separator })
      ].concat(t.definition)
    })
  ].concat(e, n);
}
function Cn(t) {
  if (t instanceof Be)
    return Cn(t.referencedRule);
  if (t instanceof he)
    return Yy(t);
  if (Vy(t))
    return Hy(t);
  if (zy(t))
    return Ky(t);
  throw Error("non exhaustive match");
}
function Hy(t) {
  let e = [];
  const n = t.definition;
  let r = 0, i = n.length > r, o, a = !0;
  for (; i && a; )
    o = n[r], a = sr(o), e = e.concat(Cn(o)), r = r + 1, i = n.length > r;
  return Ao(e);
}
function Ky(t) {
  const e = D(t.definition, (n) => Cn(n));
  return Ao(Xe(e));
}
function Yy(t) {
  return [t.terminalType];
}
const Sc = "_~IN~_";
class Xy extends Mr {
  constructor(e) {
    super(), this.topProd = e, this.follows = {};
  }
  startWalking() {
    return this.walk(this.topProd), this.follows;
  }
  walkTerminal(e, n, r) {
  }
  walkProdRef(e, n, r) {
    const i = Zy(e.referencedRule, e.idx) + this.topProd.name, o = n.concat(r), a = new Fe({ definition: o }), s = Cn(a);
    this.follows[i] = s;
  }
}
function Jy(t) {
  const e = {};
  return W(t, (n) => {
    const r = new Xy(n).startWalking();
    je(e, r);
  }), e;
}
function Zy(t, e) {
  return t.name + e + Sc;
}
function V(t) {
  return t.charCodeAt(0);
}
function hi(t, e) {
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
function Qy() {
  throw Error("Internal Error - Should never get here!");
}
function qa(t) {
  return t.type === "Character";
}
const cr = [];
for (let t = V("0"); t <= V("9"); t++)
  cr.push(t);
const ur = [V("_")].concat(cr);
for (let t = V("a"); t <= V("z"); t++)
  ur.push(t);
for (let t = V("A"); t <= V("Z"); t++)
  ur.push(t);
const Ga = [
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
], em = /[0-9a-fA-F]/, Un = /[0-9]/, tm = /[1-9]/;
class nm {
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
    return Qy();
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
        e = cr;
        break;
      case "D":
        e = cr, n = !0;
        break;
      case "s":
        e = Ga;
        break;
      case "S":
        e = Ga, n = !0;
        break;
      case "w":
        e = ur;
        break;
      case "W":
        e = ur, n = !0;
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
      if (r.type, qa(r) && this.isRangeDash()) {
        this.consumeChar("-");
        const i = this.classAtom();
        if (i.type, qa(i)) {
          if (i.value < r.value)
            throw Error("Range out of order in character class");
          e.push({ from: r.value, to: i.value });
        } else
          hi(r.value, e), e.push(V("-")), hi(i.value, e);
      } else
        hi(r.value, e);
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
    if (tm.test(e) === !1)
      throw Error("Expecting a positive integer");
    for (; Un.test(this.peekChar(0)); )
      e += this.popChar();
    return parseInt(e, 10);
  }
  integerIncludingZero() {
    let e = this.popChar();
    if (Un.test(e) === !1)
      throw Error("Expecting an integer");
    for (; Un.test(this.peekChar(0)); )
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
    return Un.test(this.peekChar(0));
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
      if (em.test(o) === !1)
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
class To {
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
let Jn = {};
const rm = new nm();
function Fr(t) {
  const e = t.toString();
  if (Jn.hasOwnProperty(e))
    return Jn[e];
  {
    const n = rm.pattern(e);
    return Jn[e] = n, n;
  }
}
function im() {
  Jn = {};
}
const Oc = "Complement Sets are not supported for first char optimization", lr = `Unable to use "first char" lexer optimizations:
`;
function om(t, e = !1) {
  try {
    const n = Fr(t);
    return Mi(n.value, {}, n.flags.ignoreCase);
  } catch (n) {
    if (n.message === Oc)
      e && Ac(`${lr}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
    else {
      let r = "";
      e && (r = `
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`), ki(`${lr}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + r);
    }
  }
  return [];
}
function Mi(t, e, n) {
  switch (t.type) {
    case "Disjunction":
      for (let i = 0; i < t.value.length; i++)
        Mi(t.value[i], e, n);
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
            jn(a.value, e, n);
            break;
          case "Set":
            if (a.complement === !0)
              throw Error(Oc);
            W(a.value, (c) => {
              if (typeof c == "number")
                jn(c, e, n);
              else {
                const u = c;
                if (n === !0)
                  for (let p = u.from; p <= u.to; p++)
                    jn(p, e, n);
                else {
                  for (let p = u.from; p <= u.to && p < yn; p++)
                    jn(p, e, n);
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
            Mi(a.value, e, n);
            break;
          default:
            throw Error("Non Exhaustive Match");
        }
        const s = a.quantifier !== void 0 && a.quantifier.atLeast === 0;
        if (
          // A group may be optional due to empty contents /(?:)/
          // or if everything inside it is optional /((a)?)/
          a.type === "Group" && Fi(a) === !1 || // If this term is not a group it may only be optional if it has an optional quantifier
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
function jn(t, e, n) {
  const r = _t(t);
  e[r] = r, n === !0 && am(t, e);
}
function am(t, e) {
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
function Wa(t, e) {
  return an(t.value, (n) => {
    if (typeof n == "number")
      return Le(e, n);
    {
      const r = n;
      return an(e, (i) => r.from <= i && i <= r.to) !== void 0;
    }
  });
}
function Fi(t) {
  const e = t.quantifier;
  return e && e.atLeast === 0 ? !0 : t.value ? te(t.value) ? Je(t.value, Fi) : Fi(t.value) : !1;
}
class sm extends To {
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
    e.complement ? Wa(e, this.targetCharCodes) === void 0 && (this.found = !0) : Wa(e, this.targetCharCodes) !== void 0 && (this.found = !0);
  }
}
function vo(t, e) {
  if (e instanceof RegExp) {
    const n = Fr(e), r = new sm(t);
    return r.visit(n), r.found;
  } else
    return an(e, (n) => Le(t, n.charCodeAt(0))) !== void 0;
}
const jt = "PATTERN", gn = "defaultMode", Dn = "modes";
let Ic = typeof new RegExp("(?:)").sticky == "boolean";
function cm(t, e) {
  e = Eo(e, {
    useSticky: Ic,
    debug: !1,
    safeMode: !1,
    positionTracking: "full",
    lineTerminatorCharacters: ["\r", `
`],
    tracer: (A, y) => y()
  });
  const n = e.tracer;
  n("initCharCodeToOptimizedIndexMap", () => {
    Cm();
  });
  let r;
  n("Reject Lexer.NA", () => {
    r = kr(t, (A) => A[jt] === Ue.NA);
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
        ], I[1]) ? I[1] : e.useSticky ? za(y) : Va(y);
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
            return e.useSticky ? za(x) : Va(x);
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
      if (y !== Ue.SKIPPED) {
        if (Me(y))
          return y;
        if (At(y))
          return !1;
        throw Error("non exhaustive match");
      }
    }), c = D(r, (A) => {
      const y = A.LONGER_ALT;
      if (y)
        return te(y) ? D(y, (x) => ja(r, x)) : [ja(r, y)];
    }), u = D(r, (A) => A.PUSH_MODE), p = D(r, (A) => G(A, "POP_MODE"));
  });
  let m;
  n("Line Terminator Handling", () => {
    const A = Nc(e.lineTerminatorCharacters);
    m = D(r, (y) => !1), e.positionTracking !== "onlyOffset" && (m = D(r, (y) => G(y, "LINE_BREAKS") ? !!y.LINE_BREAKS : Rc(y, A) === !1 && vo(A, y.PATTERN)));
  });
  let E, S, C, k;
  n("Misc Mapping #2", () => {
    E = D(r, bc), S = D(o, _m), C = De(r, (A, y) => {
      const I = y.GROUP;
      return Me(I) && I !== Ue.SKIPPED && (A[I] = []), A;
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
    w = De(r, (A, y, I) => {
      if (typeof y.PATTERN == "string") {
        const x = y.PATTERN.charCodeAt(0), H = _t(x);
        di(A, H, k[I]);
      } else if (te(y.START_CHARS_HINT)) {
        let x;
        W(y.START_CHARS_HINT, (H) => {
          const F = typeof H == "string" ? H.charCodeAt(0) : H, ee = _t(F);
          x !== ee && (x = ee, di(A, ee, k[I]));
        });
      } else if (Et(y.PATTERN))
        if (y.PATTERN.unicode)
          U = !1, e.ensureOptimizations && ki(`${lr}	Unable to analyze < ${y.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
        else {
          const x = om(y.PATTERN, e.ensureOptimizations);
          ce(x) && (U = !1), W(x, (H) => {
            di(A, H, k[I]);
          });
        }
      else
        e.ensureOptimizations && ki(`${lr}	TokenType: <${y.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
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
function um(t, e) {
  let n = [];
  const r = fm(t);
  n = n.concat(r.errors);
  const i = hm(r.valid), o = i.valid;
  return n = n.concat(i.errors), n = n.concat(lm(o)), n = n.concat(Tm(o)), n = n.concat(vm(o, e)), n = n.concat(Sm(o)), n;
}
function lm(t) {
  let e = [];
  const n = Ye(t, (r) => Et(r[jt]));
  return e = e.concat(pm(n)), e = e.concat(mm(n)), e = e.concat(Em(n)), e = e.concat(Am(n)), e = e.concat(gm(n)), e;
}
function fm(t) {
  const e = Ye(t, (i) => !G(i, jt)), n = D(e, (i) => ({
    message: "Token Type: ->" + i.name + "<- missing static 'PATTERN' property",
    type: pe.MISSING_PATTERN,
    tokenTypes: [i]
  })), r = xr(t, e);
  return { errors: n, valid: r };
}
function hm(t) {
  const e = Ye(t, (i) => {
    const o = i[jt];
    return !Et(o) && !St(o) && !G(o, "exec") && !Me(o);
  }), n = D(e, (i) => ({
    message: "Token Type: ->" + i.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
    type: pe.INVALID_PATTERN,
    tokenTypes: [i]
  })), r = xr(t, e);
  return { errors: n, valid: r };
}
const dm = /[^\\][$]/;
function pm(t) {
  class e extends To {
    constructor() {
      super(...arguments), this.found = !1;
    }
    visitEndAnchor(o) {
      this.found = !0;
    }
  }
  const n = Ye(t, (i) => {
    const o = i.PATTERN;
    try {
      const a = Fr(o), s = new e();
      return s.visit(a), s.found;
    } catch {
      return dm.test(o.source);
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
function gm(t) {
  const e = Ye(t, (r) => r.PATTERN.test(""));
  return D(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'PATTERN' must not match an empty string",
    type: pe.EMPTY_MATCH_PATTERN,
    tokenTypes: [r]
  }));
}
const ym = /[^\\[][\^]|^\^/;
function mm(t) {
  class e extends To {
    constructor() {
      super(...arguments), this.found = !1;
    }
    visitStartAnchor(o) {
      this.found = !0;
    }
  }
  const n = Ye(t, (i) => {
    const o = i.PATTERN;
    try {
      const a = Fr(o), s = new e();
      return s.visit(a), s.found;
    } catch {
      return ym.test(o.source);
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
function Em(t) {
  const e = Ye(t, (r) => {
    const i = r[jt];
    return i instanceof RegExp && (i.multiline || i.global);
  });
  return D(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
    type: pe.UNSUPPORTED_FLAGS_FOUND,
    tokenTypes: [r]
  }));
}
function Am(t) {
  const e = [];
  let n = D(t, (o) => De(t, (a, s) => (o.PATTERN.source === s.PATTERN.source && !Le(e, s) && s.PATTERN !== Ue.NA && (e.push(s), a.push(s)), a), []));
  n = Pn(n);
  const r = Ye(n, (o) => o.length > 1);
  return D(r, (o) => {
    const a = D(o, (c) => c.name);
    return {
      message: `The same RegExp pattern ->${Qe(o).PATTERN}<-has been used in all of the following Token Types: ${a.join(", ")} <-`,
      type: pe.DUPLICATE_PATTERNS_FOUND,
      tokenTypes: o
    };
  });
}
function Tm(t) {
  const e = Ye(t, (r) => {
    if (!G(r, "GROUP"))
      return !1;
    const i = r.GROUP;
    return i !== Ue.SKIPPED && i !== Ue.NA && !Me(i);
  });
  return D(e, (r) => ({
    message: "Token Type: ->" + r.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
    type: pe.INVALID_GROUP_TYPE_FOUND,
    tokenTypes: [r]
  }));
}
function vm(t, e) {
  const n = Ye(t, (i) => i.PUSH_MODE !== void 0 && !Le(e, i.PUSH_MODE));
  return D(n, (i) => ({
    message: `Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,
    type: pe.PUSH_MODE_DOES_NOT_EXIST,
    tokenTypes: [i]
  }));
}
function Sm(t) {
  const e = [], n = De(t, (r, i, o) => {
    const a = i.PATTERN;
    return a === Ue.NA || (Me(a) ? r.push({ str: a, idx: o, tokenType: i }) : Et(a) && Im(a) && r.push({ str: a.source, idx: o, tokenType: i })), r;
  }, []);
  return W(t, (r, i) => {
    W(n, ({ str: o, idx: a, tokenType: s }) => {
      if (i < a && Om(o, r.PATTERN)) {
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
function Om(t, e) {
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
function Im(t) {
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
function Va(t) {
  const e = t.ignoreCase ? "i" : "";
  return new RegExp(`^(?:${t.source})`, e);
}
function za(t) {
  const e = t.ignoreCase ? "iy" : "y";
  return new RegExp(`${t.source}`, e);
}
function bm(t, e, n) {
  const r = [];
  return G(t, gn) || r.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + gn + `> property in its definition
`,
    type: pe.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
  }), G(t, Dn) || r.push({
    message: "A MultiMode Lexer cannot be initialized without a <" + Dn + `> property in its definition
`,
    type: pe.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
  }), G(t, Dn) && G(t, gn) && !G(t.modes, t.defaultMode) && r.push({
    message: `A MultiMode Lexer cannot be initialized with a ${gn}: <${t.defaultMode}>which does not exist
`,
    type: pe.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
  }), G(t, Dn) && W(t.modes, (i, o) => {
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
function Rm(t, e, n) {
  const r = [];
  let i = !1;
  const o = Pn(Xe(ve(t.modes))), a = kr(o, (c) => c[jt] === Ue.NA), s = Nc(n);
  return e && W(a, (c) => {
    const u = Rc(c, s);
    if (u !== !1) {
      const m = {
        message: Pm(c, u),
        type: u.issue,
        tokenType: c
      };
      r.push(m);
    } else
      G(c, "LINE_BREAKS") ? c.LINE_BREAKS === !0 && (i = !0) : vo(s, c.PATTERN) && (i = !0);
  }), e && !i && r.push({
    message: `Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,
    type: pe.NO_LINE_BREAKS_FLAGS
  }), r;
}
function Nm(t) {
  const e = {}, n = Ke(t);
  return W(n, (r) => {
    const i = t[r];
    if (te(i))
      e[r] = [];
    else
      throw Error("non exhaustive match");
  }), e;
}
function bc(t) {
  const e = t.PATTERN;
  if (Et(e))
    return !1;
  if (St(e))
    return !0;
  if (G(e, "exec"))
    return !0;
  if (Me(e))
    return !1;
  throw Error("non exhaustive match");
}
function _m(t) {
  return Me(t) && t.length === 1 ? t.charCodeAt(0) : !1;
}
const wm = {
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
function Rc(t, e) {
  if (G(t, "LINE_BREAKS"))
    return !1;
  if (Et(t.PATTERN)) {
    try {
      vo(e, t.PATTERN);
    } catch (n) {
      return {
        issue: pe.IDENTIFY_TERMINATOR,
        errMsg: n.message
      };
    }
    return !1;
  } else {
    if (Me(t.PATTERN))
      return !1;
    if (bc(t))
      return { issue: pe.CUSTOM_LINE_BREAK };
    throw Error("non exhaustive match");
  }
}
function Pm(t, e) {
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
function Nc(t) {
  return D(t, (n) => Me(n) ? n.charCodeAt(0) : n);
}
function di(t, e, n) {
  t[e] === void 0 ? t[e] = [n] : t[e].push(n);
}
const yn = 256;
let Zn = [];
function _t(t) {
  return t < yn ? t : Zn[t];
}
function Cm() {
  if (ce(Zn)) {
    Zn = new Array(65536);
    for (let t = 0; t < 65536; t++)
      Zn[t] = t > 255 ? 255 + ~~(t / 255) : t;
  }
}
function Ln(t, e) {
  const n = t.tokenTypeIdx;
  return n === e.tokenTypeIdx ? !0 : e.isParent === !0 && e.categoryMatchesMap[n] === !0;
}
function fr(t, e) {
  return t.tokenTypeIdx === e.tokenTypeIdx;
}
let Ha = 1;
const _c = {};
function xn(t) {
  const e = Lm(t);
  xm(e), Mm(e), km(e), W(e, (n) => {
    n.isParent = n.categoryMatches.length > 0;
  });
}
function Lm(t) {
  let e = Re(t), n = t, r = !0;
  for (; r; ) {
    n = Pn(Xe(D(n, (o) => o.CATEGORIES)));
    const i = xr(n, e);
    e = e.concat(i), ce(i) ? r = !1 : n = i;
  }
  return e;
}
function xm(t) {
  W(t, (e) => {
    Pc(e) || (_c[Ha] = e, e.tokenTypeIdx = Ha++), Ka(e) && !te(e.CATEGORIES) && (e.CATEGORIES = [e.CATEGORIES]), Ka(e) || (e.CATEGORIES = []), Fm(e) || (e.categoryMatches = []), $m(e) || (e.categoryMatchesMap = {});
  });
}
function km(t) {
  W(t, (e) => {
    e.categoryMatches = [], W(e.categoryMatchesMap, (n, r) => {
      e.categoryMatches.push(_c[r].tokenTypeIdx);
    });
  });
}
function Mm(t) {
  W(t, (e) => {
    wc([], e);
  });
}
function wc(t, e) {
  W(t, (n) => {
    e.categoryMatchesMap[n.tokenTypeIdx] = !0;
  }), W(e.CATEGORIES, (n) => {
    const r = t.concat(e);
    Le(r, n) || wc(r, n);
  });
}
function Pc(t) {
  return G(t, "tokenTypeIdx");
}
function Ka(t) {
  return G(t, "CATEGORIES");
}
function Fm(t) {
  return G(t, "categoryMatches");
}
function $m(t) {
  return G(t, "categoryMatchesMap");
}
function Um(t) {
  return G(t, "tokenTypeIdx");
}
const jm = {
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
  errorMessageProvider: jm,
  traceInitPerf: !1,
  skipValidations: !1,
  recoveryEnabled: !0
};
Object.freeze(mn);
let Ue = class {
  constructor(e, n = mn) {
    if (this.lexerDefinition = e, this.lexerDefinitionErrors = [], this.lexerDefinitionWarning = [], this.patternIdxToConfig = {}, this.charCodeToPatternIdxToConfig = {}, this.modes = [], this.emptyGroups = {}, this.trackStartLines = !0, this.trackEndLines = !0, this.hasCustom = !1, this.canModeBeOptimized = {}, this.TRACE_INIT = (i, o) => {
      if (this.traceInitPerf === !0) {
        this.traceInitIndent++;
        const a = new Array(this.traceInitIndent + 1).join("	");
        this.traceInitIndent < this.traceInitMaxIdent && console.log(`${a}--> <${i}>`);
        const { time: s, value: c } = Tc(o), u = s > 10 ? console.warn : console.log;
        return this.traceInitIndent < this.traceInitMaxIdent && u(`${a}<-- <${i}> time: ${s}ms`), this.traceInitIndent--, c;
      } else
        return o();
    }, typeof n == "boolean")
      throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);
    this.config = je({}, mn, n);
    const r = this.config.traceInitPerf;
    r === !0 ? (this.traceInitMaxIdent = 1 / 0, this.traceInitPerf = !0) : typeof r == "number" && (this.traceInitMaxIdent = r, this.traceInitPerf = !0), this.traceInitIndent = -1, this.TRACE_INIT("Lexer Constructor", () => {
      let i, o = !0;
      this.TRACE_INIT("Lexer Config handling", () => {
        if (this.config.lineTerminatorsPattern === mn.lineTerminatorsPattern)
          this.config.lineTerminatorsPattern = wm;
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
        this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(bm(i, this.trackStartLines, this.config.lineTerminatorCharacters));
      }), this.TRACE_INIT("performWarningRuntimeChecks", () => {
        this.lexerDefinitionWarning = this.lexerDefinitionWarning.concat(Rm(i, this.trackStartLines, this.config.lineTerminatorCharacters));
      })), i.modes = i.modes ? i.modes : {}, W(i.modes, (s, c) => {
        i.modes[c] = kr(s, (u) => At(u));
      });
      const a = Ke(i.modes);
      if (W(i.modes, (s, c) => {
        this.TRACE_INIT(`Mode: <${c}> processing`, () => {
          if (this.modes.push(c), this.config.skipValidations === !1 && this.TRACE_INIT("validatePatterns", () => {
            this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(um(s, a));
          }), ce(this.lexerDefinitionErrors)) {
            xn(s);
            let u;
            this.TRACE_INIT("analyzeTokenTypes", () => {
              u = cm(s, {
                lineTerminatorCharacters: this.config.lineTerminatorCharacters,
                positionTracking: n.positionTracking,
                ensureOptimizations: n.ensureOptimizations,
                safeMode: n.safeMode,
                tracer: this.TRACE_INIT
              });
            }), this.patternIdxToConfig[c] = u.patternIdxToConfig, this.charCodeToPatternIdxToConfig[c] = u.charCodeToPatternIdxToConfig, this.emptyGroups = je({}, this.emptyGroups, u.emptyGroups), this.hasCustom = u.hasCustom || this.hasCustom, this.canModeBeOptimized[c] = u.canBeOptimized;
          }
        });
      }), this.defaultMode = i.defaultMode, !ce(this.lexerDefinitionErrors) && !this.config.deferDefinitionErrorsHandling) {
        const c = D(this.lexerDefinitionErrors, (u) => u.message).join(`-----------------------
`);
        throw new Error(`Errors detected in definition of Lexer:
` + c);
      }
      W(this.lexerDefinitionWarning, (s) => {
        Ac(s.message);
      }), this.TRACE_INIT("Choosing sub-methods implementations", () => {
        if (Ic ? (this.chopInput = nn, this.match = this.matchWithTest) : (this.updateLastIndex = Te, this.match = this.matchWithExec), o && (this.handleModes = Te), this.trackStartLines === !1 && (this.computeNewColumn = nn), this.trackEndLines === !1 && (this.updateTokenEndLineColumnLocation = Te), /full/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createFullToken;
        else if (/onlyStart/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createStartOnlyToken;
        else if (/onlyOffset/i.test(this.config.positionTracking))
          this.createTokenInstance = this.createOffsetOnlyToken;
        else
          throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);
        this.hasCustom ? (this.addToken = this.addTokenUsingPush, this.handlePayload = this.handlePayloadWithCustom) : (this.addToken = this.addTokenUsingMemberAccess, this.handlePayload = this.handlePayloadNoCustom);
      }), this.TRACE_INIT("Failed Optimization Warnings", () => {
        const s = De(this.canModeBeOptimized, (c, u, p) => (u === !1 && c.push(p), c), []);
        if (n.ensureOptimizations && !ce(s))
          throw Error(`Lexer Modes: < ${s.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
      }), this.TRACE_INIT("clearRegExpParserCache", () => {
        im();
      }), this.TRACE_INIT("toFastProperties", () => {
        vc(this);
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
    const oe = Nm(this.emptyGroups), X = this.trackStartLines, ue = this.config.lineTerminatorsPattern;
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
Ue.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
Ue.NA = /NOT_APPLICABLE/;
function An(t) {
  return Cc(t) ? t.LABEL : t.name;
}
function Cc(t) {
  return Me(t.LABEL) && t.LABEL !== "";
}
const Dm = "parent", Ya = "categories", Xa = "label", Ja = "group", Za = "push_mode", Qa = "pop_mode", es = "longer_alt", ts = "line_breaks", ns = "start_chars_hint";
function So(t) {
  return Bm(t);
}
function Bm(t) {
  const e = t.pattern, n = {};
  if (n.name = t.name, At(e) || (n.PATTERN = e), G(t, Dm))
    throw `The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;
  return G(t, Ya) && (n.CATEGORIES = t[Ya]), xn([n]), G(t, Xa) && (n.LABEL = t[Xa]), G(t, Ja) && (n.GROUP = t[Ja]), G(t, Qa) && (n.POP_MODE = t[Qa]), G(t, Za) && (n.PUSH_MODE = t[Za]), G(t, es) && (n.LONGER_ALT = t[es]), G(t, ts) && (n.LINE_BREAKS = t[ts]), G(t, ns) && (n.START_CHARS_HINT = t[ns]), n;
}
const Dt = So({ name: "EOF", pattern: Ue.NA });
xn([Dt]);
function Oo(t, e, n, r, i, o, a, s) {
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
function qm(t, e) {
  return Ln(t, e);
}
const Lc = {
  buildMismatchTokenMessage({ expected: t, actual: e, previous: n, ruleName: r }) {
    return `Expecting ${Cc(t) ? `--> ${An(t)} <--` : `token of type --> ${t.name} <--`} but found --> '${e.image}' <--`;
  },
  buildNotAllInputParsedMessage({ firstRedundant: t, ruleName: e }) {
    return "Redundant input, expecting EOF but found: " + t.image;
  },
  buildNoViableAltMessage({ expectedPathsPerAlt: t, actual: e, previous: n, customUserDescription: r, ruleName: i }) {
    const o = "Expecting: ", s = `
but found: '` + Qe(e).image + "'";
    if (r)
      return o + r + s;
    {
      const c = De(t, (E, S) => E.concat(S), []), u = D(c, (E) => `[${D(E, (S) => An(S)).join(", ")}]`), m = `one of these possible Token sequences:
${D(u, (E, S) => `  ${S + 1}. ${E}`).join(`
`)}`;
      return o + m + s;
    }
  },
  buildEarlyExitMessage({ expectedIterationPaths: t, actual: e, customUserDescription: n, ruleName: r }) {
    const i = "Expecting: ", a = `
but found: '` + Qe(e).image + "'";
    if (n)
      return i + n + a;
    {
      const c = `expecting at least one iteration which starts with one of these possible Token sequences::
  <${D(t, (u) => `[${D(u, (p) => An(p)).join(",")}]`).join(" ,")}>`;
      return i + c + a;
    }
  }
};
Object.freeze(Lc);
const Gm = {
  buildRuleNotFoundError(t, e) {
    return "Invalid grammar, reference to a rule which is not defined: ->" + e.nonTerminalName + `<-
inside top level rule: ->` + t.name + "<-";
  }
}, kt = {
  buildDuplicateFoundError(t, e) {
    function n(p) {
      return p instanceof he ? p.terminalType.name : p instanceof Be ? p.nonTerminalName : "";
    }
    const r = t.name, i = Qe(e), o = i.idx, a = ot(i), s = n(i), c = o > 0;
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
    let e = ot(t.repetition);
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
function Wm(t, e) {
  const n = new Vm(t, e);
  return n.resolveRefs(), n.errors;
}
class Vm extends cn {
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
class zm extends Mr {
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
class Hm extends zm {
  constructor(e, n) {
    super(e, n), this.path = n, this.nextTerminalName = "", this.nextTerminalOccurrence = 0, this.nextTerminalName = this.path.lastTok.name, this.nextTerminalOccurrence = this.path.lastTokOccurrence;
  }
  walkTerminal(e, n, r) {
    if (this.isAtEndOfPath && e.terminalType.name === this.nextTerminalName && e.idx === this.nextTerminalOccurrence && !this.found) {
      const i = n.concat(r), o = new Fe({ definition: i });
      this.possibleTokTypes = Cn(o), this.found = !0;
    }
  }
}
class $r extends Mr {
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
class Km extends $r {
  walkMany(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Qe(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof he && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkMany(e, n, r);
  }
}
class rs extends $r {
  walkManySep(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Qe(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof he && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkManySep(e, n, r);
  }
}
class Ym extends $r {
  walkAtLeastOne(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Qe(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof he && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkAtLeastOne(e, n, r);
  }
}
class is extends $r {
  walkAtLeastOneSep(e, n, r) {
    if (e.idx === this.occurrence) {
      const i = Qe(n.concat(r));
      this.result.isEndOfRule = i === void 0, i instanceof he && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
    } else
      super.walkAtLeastOneSep(e, n, r);
  }
}
function $i(t, e, n = []) {
  n = Re(n);
  let r = [], i = 0;
  function o(s) {
    return s.concat(be(t, i + 1));
  }
  function a(s) {
    const c = $i(o(s), e, n);
    return r.concat(c);
  }
  for (; n.length < e && i < t.length; ) {
    const s = t[i];
    if (s instanceof Fe)
      return a(s.definition);
    if (s instanceof Be)
      return a(s.definition);
    if (s instanceof ke)
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
        new Fe({ definition: s.definition }),
        new Se({
          definition: [new he({ terminalType: s.separator })].concat(s.definition)
        })
      ];
      return a(c);
    } else if (s instanceof tt) {
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
      if (s instanceof nt)
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
function xc(t, e, n, r) {
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
        ruleStack: In(k),
        occurrenceStack: In(U)
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
    else if (w instanceof Be) {
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
    } else if (w instanceof ke) {
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
    } else if (w instanceof tt) {
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
    } else if (w instanceof nt)
      for (let A = w.definition.length - 1; A >= 0; A--) {
        const y = w.definition[A], I = {
          idx: C,
          def: y.definition.concat(be(S)),
          ruleStack: k,
          occurrenceStack: U
        };
        m.push(I), m.push(a);
      }
    else if (w instanceof Fe)
      m.push({
        idx: C,
        def: w.definition.concat(be(S)),
        ruleStack: k,
        occurrenceStack: U
      });
    else if (w instanceof sn)
      m.push(Xm(w, C, k, U));
    else
      throw Error("non exhaustive match");
  }
  return p;
}
function Xm(t, e, n, r) {
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
function kc(t) {
  if (t instanceof ke || t === "Option")
    return de.OPTION;
  if (t instanceof Se || t === "Repetition")
    return de.REPETITION;
  if (t instanceof ft || t === "RepetitionMandatory")
    return de.REPETITION_MANDATORY;
  if (t instanceof ht || t === "RepetitionMandatoryWithSeparator")
    return de.REPETITION_MANDATORY_WITH_SEPARATOR;
  if (t instanceof tt || t === "RepetitionWithSeparator")
    return de.REPETITION_WITH_SEPARATOR;
  if (t instanceof nt || t === "Alternation")
    return de.ALTERNATION;
  throw Error("non exhaustive match");
}
function Jm(t, e, n, r, i, o) {
  const a = Io(t, e, n), s = $c(a) ? fr : Ln;
  return o(a, r, s, i);
}
function Zm(t, e, n, r, i, o) {
  const a = bo(t, e, i, n), s = $c(a) ? fr : Ln;
  return o(a[0], s, r);
}
function Qm(t, e, n, r) {
  const i = t.length, o = Je(t, (a) => Je(a, (s) => s.length === 1));
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
    const a = D(t, (c) => Xe(c)), s = De(a, (c, u, p) => (W(u, (m) => {
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
function eE(t, e, n) {
  const r = Je(t, (o) => o.length === 1), i = t.length;
  if (r && !n) {
    const o = Xe(t);
    if (o.length === 1 && ce(o[0].categoryMatches)) {
      const s = o[0].tokenTypeIdx;
      return function() {
        return this.LA(1).tokenTypeIdx === s;
      };
    } else {
      const a = De(o, (s, c, u) => (s[c.tokenTypeIdx] = !0, W(c.categoryMatches, (p) => {
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
class tE extends Mr {
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
class Mc extends cn {
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
function os(t) {
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
function nE(t, e, n) {
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
function Fc(t, e) {
  const n = D(t, (a) => $i([a], 1)), r = os(n.length), i = D(n, (a) => {
    const s = {};
    return W(a, (c) => {
      const u = pi(c.partialPath);
      W(u, (p) => {
        s[p] = !0;
      });
    }), s;
  });
  let o = n;
  for (let a = 1; a <= e; a++) {
    const s = o;
    o = os(s.length);
    for (let c = 0; c < s.length; c++) {
      const u = s[c];
      for (let p = 0; p < u.length; p++) {
        const m = u[p].partialPath, E = u[p].suffixDef, S = pi(m);
        if (nE(i, S, c) || ce(E) || m.length === e) {
          const k = r[c];
          if (Ui(k, m) === !1) {
            k.push(m);
            for (let U = 0; U < S.length; U++) {
              const w = S[U];
              i[c][w] = !0;
            }
          }
        } else {
          const k = $i(E, a + 1, m);
          o[c] = o[c].concat(k), W(k, (U) => {
            const w = pi(U.partialPath);
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
function Io(t, e, n, r) {
  const i = new Mc(t, de.ALTERNATION, r);
  return e.accept(i), Fc(i.result, n);
}
function bo(t, e, n, r) {
  const i = new Mc(t, n);
  e.accept(i);
  const o = i.result, s = new tE(e, t, n).startWalking(), c = new Fe({ definition: o }), u = new Fe({ definition: s });
  return Fc([c, u], r);
}
function Ui(t, e) {
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
function rE(t, e) {
  return t.length < e.length && Je(t, (n, r) => {
    const i = e[r];
    return n === i || i.categoryMatchesMap[n.tokenTypeIdx];
  });
}
function $c(t) {
  return Je(t, (e) => Je(e, (n) => Je(n, (r) => ce(r.categoryMatches))));
}
function iE(t) {
  const e = t.lookaheadStrategy.validate({
    rules: t.rules,
    tokenTypes: t.tokenTypes,
    grammarName: t.grammarName
  });
  return D(e, (n) => Object.assign({ type: Ce.CUSTOM_LOOKAHEAD_VALIDATION }, n));
}
function oE(t, e, n, r) {
  const i = Ve(t, (c) => aE(c, n)), o = EE(t, e, n), a = Ve(t, (c) => pE(c, n)), s = Ve(t, (c) => uE(c, t, r, n));
  return i.concat(o, a, s);
}
function aE(t, e) {
  const n = new cE();
  t.accept(n);
  const r = n.allProductions, i = Ay(r, sE), o = et(i, (s) => s.length > 1);
  return D(ve(o), (s) => {
    const c = Qe(s), u = e.buildDuplicateFoundError(t, s), p = ot(c), m = {
      message: u,
      type: Ce.DUPLICATE_PRODUCTIONS,
      ruleName: t.name,
      dslName: p,
      occurrence: c.idx
    }, E = Uc(c);
    return E && (m.parameter = E), m;
  });
}
function sE(t) {
  return `${ot(t)}_#_${t.idx}_#_${Uc(t)}`;
}
function Uc(t) {
  return t instanceof he ? t.terminalType.name : t instanceof Be ? t.nonTerminalName : "";
}
class cE extends cn {
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
function uE(t, e, n, r) {
  const i = [];
  if (De(e, (a, s) => s.name === t.name ? a + 1 : a, 0) > 1) {
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
function lE(t, e, n) {
  const r = [];
  let i;
  return Le(e, t) || (i = `Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${n}<-as it is not defined in any of the super grammars `, r.push({
    message: i,
    type: Ce.INVALID_RULE_OVERRIDE,
    ruleName: t
  })), r;
}
function jc(t, e, n, r = []) {
  const i = [], o = Qn(e.definition);
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
    const c = xr(o, r.concat([t])), u = Ve(c, (p) => {
      const m = Re(r);
      return m.push(p), jc(t, p, n, m);
    });
    return i.concat(u);
  }
}
function Qn(t) {
  let e = [];
  if (ce(t))
    return e;
  const n = Qe(t);
  if (n instanceof Be)
    e.push(n.referencedRule);
  else if (n instanceof Fe || n instanceof ke || n instanceof ft || n instanceof ht || n instanceof tt || n instanceof Se)
    e = e.concat(Qn(n.definition));
  else if (n instanceof nt)
    e = Xe(D(n.definition, (o) => Qn(o.definition)));
  else if (!(n instanceof he)) throw Error("non exhaustive match");
  const r = sr(n), i = t.length > 1;
  if (r && i) {
    const o = be(t);
    return e.concat(Qn(o));
  } else
    return e;
}
class Ro extends cn {
  constructor() {
    super(...arguments), this.alternations = [];
  }
  visitAlternation(e) {
    this.alternations.push(e);
  }
}
function fE(t, e) {
  const n = new Ro();
  t.accept(n);
  const r = n.alternations;
  return Ve(r, (o) => {
    const a = In(o.definition);
    return Ve(a, (s, c) => {
      const u = xc([s], [], Ln, 1);
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
function hE(t, e, n) {
  const r = new Ro();
  t.accept(r);
  let i = r.alternations;
  return i = kr(i, (a) => a.ignoreAmbiguities === !0), Ve(i, (a) => {
    const s = a.idx, c = a.maxLookahead || e, u = Io(s, t, c, a), p = yE(u, a, t, n), m = mE(u, a, t, n);
    return p.concat(m);
  });
}
class dE extends cn {
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
function pE(t, e) {
  const n = new Ro();
  t.accept(n);
  const r = n.alternations;
  return Ve(r, (o) => o.definition.length > 255 ? [
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
function gE(t, e, n) {
  const r = [];
  return W(t, (i) => {
    const o = new dE();
    i.accept(o);
    const a = o.allProductions;
    W(a, (s) => {
      const c = kc(s), u = s.maxLookahead || e, p = s.idx, E = bo(p, i, c, u)[0];
      if (ce(Xe(E))) {
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
function yE(t, e, n, r) {
  const i = [], o = De(t, (s, c, u) => (e.definition[u].ignoreAmbiguities === !0 || W(c, (p) => {
    const m = [u];
    W(t, (E, S) => {
      u !== S && Ui(E, p) && // ignore (skip) ambiguities with this "other" alternative
      e.definition[S].ignoreAmbiguities !== !0 && m.push(S);
    }), m.length > 1 && !Ui(i, p) && (i.push(p), s.push({
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
function mE(t, e, n, r) {
  const i = De(t, (a, s, c) => {
    const u = D(s, (p) => ({ idx: c, path: p }));
    return a.concat(u);
  }, []);
  return Pn(Ve(i, (a) => {
    if (e.definition[a.idx].ignoreAmbiguities === !0)
      return [];
    const c = a.idx, u = a.path, p = Ye(i, (E) => (
      // ignore (skip) ambiguities with this "other" alternative
      e.definition[E.idx].ignoreAmbiguities !== !0 && E.idx < c && // checking for strict prefix because identical lookaheads
      // will be be detected using a different validation.
      rE(E.path, u)
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
function EE(t, e, n) {
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
function AE(t) {
  const e = Eo(t, {
    errMsgProvider: Gm
  }), n = {};
  return W(t.rules, (r) => {
    n[r.name] = r;
  }), Wm(n, e.errMsgProvider);
}
function TE(t) {
  return t = Eo(t, {
    errMsgProvider: kt
  }), oE(t.rules, t.tokenTypes, t.errMsgProvider, t.grammarName);
}
const Dc = "MismatchedTokenException", Bc = "NoViableAltException", qc = "EarlyExitException", Gc = "NotAllInputParsedException", Wc = [
  Dc,
  Bc,
  qc,
  Gc
];
Object.freeze(Wc);
function hr(t) {
  return Le(Wc, t.name);
}
class Ur extends Error {
  constructor(e, n) {
    super(e), this.token = n, this.resyncedTokens = [], Object.setPrototypeOf(this, new.target.prototype), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
}
class Vc extends Ur {
  constructor(e, n, r) {
    super(e, n), this.previousToken = r, this.name = Dc;
  }
}
class vE extends Ur {
  constructor(e, n, r) {
    super(e, n), this.previousToken = r, this.name = Bc;
  }
}
class SE extends Ur {
  constructor(e, n) {
    super(e, n), this.name = Gc;
  }
}
class OE extends Ur {
  constructor(e, n, r) {
    super(e, n), this.previousToken = r, this.name = qc;
  }
}
const gi = {}, zc = "InRuleRecoveryException";
class IE extends Error {
  constructor(e) {
    super(e), this.name = zc;
  }
}
class bE {
  initRecoverable(e) {
    this.firstAfterRepMap = {}, this.resyncFollows = {}, this.recoveryEnabled = G(e, "recoveryEnabled") ? e.recoveryEnabled : Tt.recoveryEnabled, this.recoveryEnabled && (this.attemptInRepetitionRecovery = RE);
  }
  getTokenToInsert(e) {
    const n = Oo(e, "", NaN, NaN, NaN, NaN, NaN, NaN);
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
      }), C = new Vc(S, u, this.LA(0));
      C.resyncedTokens = In(s), this.SAVE_ERROR(C);
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
    throw new IE("sad sad panda");
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
      const i = an(e, (o) => qm(n, o));
      if (i !== void 0)
        return i;
      n = this.LA(r), r++;
    }
  }
  getCurrFollowKey() {
    if (this.RULE_STACK.length === 1)
      return gi;
    const e = this.getLastExplicitRuleShortName(), n = this.getLastExplicitRuleOccurrenceIndex(), r = this.getPreviousExplicitRuleShortName();
    return {
      ruleName: this.shortRuleNameToFullName(e),
      idxInCallingRule: n,
      inRule: this.shortRuleNameToFullName(r)
    };
  }
  buildFullFollowKeyStack() {
    const e = this.RULE_STACK, n = this.RULE_OCCURRENCE_STACK;
    return D(e, (r, i) => i === 0 ? gi : {
      ruleName: this.shortRuleNameToFullName(r),
      idxInCallingRule: n[i],
      inRule: this.shortRuleNameToFullName(e[i - 1])
    });
  }
  flattenFollowSet() {
    const e = D(this.buildFullFollowKeyStack(), (n) => this.getFollowSetFromFollowKey(n));
    return Xe(e);
  }
  getFollowSetFromFollowKey(e) {
    if (e === gi)
      return [Dt];
    const n = e.ruleName + e.idxInCallingRule + Sc + e.inRule;
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
    return In(n);
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
function RE(t, e, n, r, i, o, a) {
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
const NE = 4, Pt = 8, Hc = 1 << Pt, Kc = 2 << Pt, ji = 3 << Pt, Di = 4 << Pt, Bi = 5 << Pt, er = 6 << Pt;
function yi(t, e, n) {
  return n | e | t;
}
class _E {
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
    return Ve(e, (n) => jc(n, n, kt));
  }
  validateEmptyOrAlternatives(e) {
    return Ve(e, (n) => fE(n, kt));
  }
  validateAmbiguousAlternationAlternatives(e, n) {
    return Ve(e, (r) => hE(r, n, kt));
  }
  validateSomeNonEmptyLookaheadPath(e, n) {
    return gE(e, n, kt);
  }
  buildLookaheadForAlternation(e) {
    return Jm(e.prodOccurrence, e.rule, e.maxLookahead, e.hasPredicates, e.dynamicTokensEnabled, Qm);
  }
  buildLookaheadForOptional(e) {
    return Zm(e.prodOccurrence, e.rule, e.maxLookahead, e.dynamicTokensEnabled, kc(e.prodType), eE);
  }
}
class wE {
  initLooksAhead(e) {
    this.dynamicTokensEnabled = G(e, "dynamicTokensEnabled") ? e.dynamicTokensEnabled : Tt.dynamicTokensEnabled, this.maxLookahead = G(e, "maxLookahead") ? e.maxLookahead : Tt.maxLookahead, this.lookaheadStrategy = G(e, "lookaheadStrategy") ? e.lookaheadStrategy : new _E({ maxLookahead: this.maxLookahead }), this.lookAheadFuncsCache = /* @__PURE__ */ new Map();
  }
  preComputeLookaheadFunctions(e) {
    W(e, (n) => {
      this.TRACE_INIT(`${n.name} Rule Lookahead`, () => {
        const { alternation: r, repetition: i, option: o, repetitionMandatory: a, repetitionMandatoryWithSeparator: s, repetitionWithSeparator: c } = CE(n);
        W(r, (u) => {
          const p = u.idx === 0 ? "" : u.idx;
          this.TRACE_INIT(`${ot(u)}${p}`, () => {
            const m = this.lookaheadStrategy.buildLookaheadForAlternation({
              prodOccurrence: u.idx,
              rule: n,
              maxLookahead: u.maxLookahead || this.maxLookahead,
              hasPredicates: u.hasPredicates,
              dynamicTokensEnabled: this.dynamicTokensEnabled
            }), E = yi(this.fullRuleNameToShort[n.name], Hc, u.idx);
            this.setLaFuncCache(E, m);
          });
        }), W(i, (u) => {
          this.computeLookaheadFunc(n, u.idx, ji, "Repetition", u.maxLookahead, ot(u));
        }), W(o, (u) => {
          this.computeLookaheadFunc(n, u.idx, Kc, "Option", u.maxLookahead, ot(u));
        }), W(a, (u) => {
          this.computeLookaheadFunc(n, u.idx, Di, "RepetitionMandatory", u.maxLookahead, ot(u));
        }), W(s, (u) => {
          this.computeLookaheadFunc(n, u.idx, er, "RepetitionMandatoryWithSeparator", u.maxLookahead, ot(u));
        }), W(c, (u) => {
          this.computeLookaheadFunc(n, u.idx, Bi, "RepetitionWithSeparator", u.maxLookahead, ot(u));
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
      }), c = yi(this.fullRuleNameToShort[e.name], r, n);
      this.setLaFuncCache(c, s);
    });
  }
  // this actually returns a number, but it is always used as a string (object prop key)
  getKeyForAutomaticLookahead(e, n) {
    const r = this.getLastExplicitRuleShortName();
    return yi(r, e, n);
  }
  getLaFuncFromCache(e) {
    return this.lookAheadFuncsCache.get(e);
  }
  /* istanbul ignore next */
  setLaFuncCache(e, n) {
    this.lookAheadFuncsCache.set(e, n);
  }
}
class PE extends cn {
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
const Bn = new PE();
function CE(t) {
  Bn.reset(), t.accept(Bn);
  const e = Bn.dslMethods;
  return Bn.reset(), e;
}
function as(t, e) {
  isNaN(t.startOffset) === !0 ? (t.startOffset = e.startOffset, t.endOffset = e.endOffset) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset);
}
function ss(t, e) {
  isNaN(t.startOffset) === !0 ? (t.startOffset = e.startOffset, t.startColumn = e.startColumn, t.startLine = e.startLine, t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine);
}
function LE(t, e, n) {
  t.children[n] === void 0 ? t.children[n] = [e] : t.children[n].push(e);
}
function xE(t, e, n) {
  t.children[e] === void 0 ? t.children[e] = [n] : t.children[e].push(n);
}
const kE = "name";
function Yc(t, e) {
  Object.defineProperty(t, kE, {
    enumerable: !1,
    configurable: !0,
    writable: !1,
    value: e
  });
}
function ME(t, e) {
  const n = Ke(t), r = n.length;
  for (let i = 0; i < r; i++) {
    const o = n[i], a = t[o], s = a.length;
    for (let c = 0; c < s; c++) {
      const u = a[c];
      u.tokenTypeIdx === void 0 && this[u.name](u.children, e);
    }
  }
}
function FE(t, e) {
  const n = function() {
  };
  Yc(n, t + "BaseSemantics");
  const r = {
    visit: function(i, o) {
      if (te(i) && (i = i[0]), !At(i))
        return this[i.name](i.children, o);
    },
    validateVisitor: function() {
      const i = UE(this, e);
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
function $E(t, e, n) {
  const r = function() {
  };
  Yc(r, t + "BaseSemanticsWithDefaults");
  const i = Object.create(n.prototype);
  return W(e, (o) => {
    i[o] = ME;
  }), r.prototype = i, r.prototype.constructor = r, r;
}
var qi;
(function(t) {
  t[t.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", t[t.MISSING_METHOD = 1] = "MISSING_METHOD";
})(qi || (qi = {}));
function UE(t, e) {
  return jE(t, e);
}
function jE(t, e) {
  const n = Ye(e, (i) => St(t[i]) === !1), r = D(n, (i) => ({
    msg: `Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,
    type: qi.MISSING_METHOD,
    methodName: i
  }));
  return Pn(r);
}
class DE {
  initTreeBuilder(e) {
    if (this.CST_STACK = [], this.outputCst = e.outputCst, this.nodeLocationTracking = G(e, "nodeLocationTracking") ? e.nodeLocationTracking : Tt.nodeLocationTracking, !this.outputCst)
      this.cstInvocationStateUpdate = Te, this.cstFinallyStateUpdate = Te, this.cstPostTerminal = Te, this.cstPostNonTerminal = Te, this.cstPostRule = Te;
    else if (/full/i.test(this.nodeLocationTracking))
      this.recoveryEnabled ? (this.setNodeLocationFromToken = ss, this.setNodeLocationFromNode = ss, this.cstPostRule = Te, this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery) : (this.setNodeLocationFromToken = Te, this.setNodeLocationFromNode = Te, this.cstPostRule = this.cstPostRuleFull, this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular);
    else if (/onlyOffset/i.test(this.nodeLocationTracking))
      this.recoveryEnabled ? (this.setNodeLocationFromToken = as, this.setNodeLocationFromNode = as, this.cstPostRule = Te, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery) : (this.setNodeLocationFromToken = Te, this.setNodeLocationFromNode = Te, this.cstPostRule = this.cstPostRuleOnlyOffset, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular);
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
    LE(r, n, e), this.setNodeLocationFromToken(r.location, n);
  }
  cstPostNonTerminal(e, n) {
    const r = this.CST_STACK[this.CST_STACK.length - 1];
    xE(r, n, e), this.setNodeLocationFromNode(r.location, e.location);
  }
  getBaseCstVisitorConstructor() {
    if (At(this.baseCstVisitorConstructor)) {
      const e = FE(this.className, Ke(this.gastProductionsCache));
      return this.baseCstVisitorConstructor = e, e;
    }
    return this.baseCstVisitorConstructor;
  }
  getBaseCstVisitorConstructorWithDefaults() {
    if (At(this.baseCstVisitorWithDefaultsConstructor)) {
      const e = $E(this.className, Ke(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
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
class BE {
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
    return this.currIdx <= this.tokVector.length - 2 ? (this.consumeToken(), this.LA(1)) : pr;
  }
  // Lexer (accessing Token vector) related methods which can be overridden to implement lazy lexers
  // or lexers dependent on parser context.
  LA(e) {
    const n = this.currIdx + e;
    return n < 0 || this.tokVectorLength <= n ? pr : this.tokVector[n];
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
class qE {
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
  RULE(e, n, r = gr) {
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
  OVERRIDE_RULE(e, n, r = gr) {
    const i = lE(e, this.definedRulesNames, this.className);
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
        if (hr(i))
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
    return Wy(ve(this.gastProductionsCache));
  }
}
class GE {
  initRecognizerEngine(e, n) {
    if (this.className = this.constructor.name, this.shortRuleNameToFull = {}, this.fullRuleNameToShort = {}, this.ruleShortNameIdx = 256, this.tokenMatcher = fr, this.subruleIdx = 0, this.definedRulesNames = [], this.tokensMap = {}, this.isBackTrackingStack = [], this.RULE_STACK = [], this.RULE_OCCURRENCE_STACK = [], this.gastProductionsCache = {}, G(n, "serializedGrammar"))
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
      this.tokensMap = De(e, (o, a) => (o[a.name] = a, o), {});
    else if (G(e, "modes") && Je(Xe(ve(e.modes)), Um)) {
      const o = Xe(ve(e.modes)), a = Ao(o);
      this.tokensMap = De(a, (s, c) => (s[c.name] = c, s), {});
    } else if (He(e))
      this.tokensMap = Re(e);
    else
      throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
    this.tokensMap.EOF = Dt;
    const r = G(e, "modes") ? Xe(ve(e.modes)) : ve(e), i = Je(r, (o) => ce(o.categoryMatches));
    this.tokenMatcher = i ? fr : Ln, xn(ve(this.tokensMap));
  }
  defineRule(e, n, r) {
    if (this.selfAnalysisDone)
      throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
    const i = G(r, "resyncEnabled") ? r.resyncEnabled : gr.resyncEnabled, o = G(r, "recoveryValueFunc") ? r.recoveryValueFunc : gr.recoveryValueFunc, a = this.ruleShortNameIdx << NE + Pt;
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
    if (hr(e)) {
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
    const r = this.getKeyForAutomaticLookahead(Kc, n);
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
    const r = this.getKeyForAutomaticLookahead(Di, e);
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
    this.attemptInRepetitionRecovery(this.atLeastOneInternal, [e, n], i, Di, e, Ym);
  }
  atLeastOneSepFirstInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(er, e);
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
        is
      ], s, er, e, is);
    } else
      throw this.raiseEarlyExitException(e, de.REPETITION_MANDATORY_WITH_SEPARATOR, n.ERR_MSG);
  }
  manyInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(ji, e);
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
      ji,
      e,
      Km,
      // The notStuck parameter is only relevant when "attemptInRepetitionRecovery"
      // is invoked from manyInternal, in the MANY_SEP case and AT_LEAST_ONE[_SEP]
      // An infinite loop cannot occur as:
      // - Either the lookahead is guaranteed to consume something (Single Token Separator)
      // - AT_LEAST_ONE by definition is guaranteed to consume something (or error out).
      a
    );
  }
  manySepFirstInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(Bi, e);
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
        rs
      ], s, Bi, e, rs);
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
    ], r, er, e, o);
  }
  doSingleRepetition(e) {
    const n = this.getLexerPosition();
    return e.call(this), this.getLexerPosition() > n;
  }
  orInternal(e, n) {
    const r = this.getKeyForAutomaticLookahead(Hc, n), i = te(e) ? e : e.DEF, a = this.getLaFuncFromCache(r).call(this, i);
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
      this.SAVE_ERROR(new SE(n, e));
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
    throw hr(e) && e.partialCstResult !== void 0 && (this.cstPostNonTerminal(e.partialCstResult, n !== void 0 && n.LABEL !== void 0 ? n.LABEL : r), delete e.partialCstResult), e;
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
    }), this.SAVE_ERROR(new Vc(i, n, o));
  }
  consumeInternalRecovery(e, n, r) {
    if (this.recoveryEnabled && // TODO: more robust checking of the exception type. Perhaps Typescript extending expressions?
    r.name === "MismatchedTokenException" && !this.isBackTracking()) {
      const i = this.getFollowsForInRuleRecovery(e, n);
      try {
        return this.tryInRuleRecovery(e, i);
      } catch (o) {
        throw o.name === zc ? r : o;
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
class WE {
  initErrorHandler(e) {
    this._errors = [], this.errorMessageProvider = G(e, "errorMessageProvider") ? e.errorMessageProvider : Tt.errorMessageProvider;
  }
  SAVE_ERROR(e) {
    if (hr(e))
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
    const i = this.getCurrRuleFullName(), o = this.getGAstProductions()[i], s = bo(e, o, n, this.maxLookahead)[0], c = [];
    for (let p = 1; p <= this.maxLookahead; p++)
      c.push(this.LA(p));
    const u = this.errorMessageProvider.buildEarlyExitMessage({
      expectedIterationPaths: s,
      actual: c,
      previous: this.LA(0),
      customUserDescription: r,
      ruleName: i
    });
    throw this.SAVE_ERROR(new OE(u, this.LA(1), this.LA(0)));
  }
  // TODO: consider caching the error message computed information
  raiseNoAltException(e, n) {
    const r = this.getCurrRuleFullName(), i = this.getGAstProductions()[r], o = Io(e, i, this.maxLookahead), a = [];
    for (let u = 1; u <= this.maxLookahead; u++)
      a.push(this.LA(u));
    const s = this.LA(0), c = this.errorMessageProvider.buildNoViableAltMessage({
      expectedPathsPerAlt: o,
      actual: a,
      previous: s,
      customUserDescription: n,
      ruleName: this.getCurrRuleFullName()
    });
    throw this.SAVE_ERROR(new vE(c, this.LA(1), s));
  }
}
class VE {
  initContentAssist() {
  }
  computeContentAssist(e, n) {
    const r = this.gastProductionsCache[e];
    if (At(r))
      throw Error(`Rule ->${e}<- does not exist in this grammar.`);
    return xc([r], n, this.tokenMatcher, this.maxLookahead);
  }
  // TODO: should this be a member method or a utility? it does not have any state or usage of 'this'...
  // TODO: should this be more explicitly part of the public API?
  getNextPossibleTokenTypes(e) {
    const n = Qe(e.ruleStack), i = this.getGAstProductions()[n];
    return new Hm(i, e).startWalking();
  }
}
const jr = {
  description: "This Object indicates the Parser is during Recording Phase"
};
Object.freeze(jr);
const cs = !0, us = Math.pow(2, Pt) - 1, Xc = So({ name: "RECORDING_PHASE_TOKEN", pattern: Ue.NA });
xn([Xc]);
const Jc = Oo(
  Xc,
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
Object.freeze(Jc);
const zE = {
  name: `This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,
  children: {}
};
class HE {
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
    return pr;
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
    return pn.call(this, ke, e, n);
  }
  atLeastOneInternalRecord(e, n) {
    pn.call(this, ft, n, e);
  }
  atLeastOneSepFirstInternalRecord(e, n) {
    pn.call(this, ht, n, e, cs);
  }
  manyInternalRecord(e, n) {
    pn.call(this, Se, n, e);
  }
  manySepFirstInternalRecord(e, n) {
    pn.call(this, tt, n, e, cs);
  }
  orInternalRecord(e, n) {
    return KE.call(this, e, n);
  }
  subruleInternalRecord(e, n, r) {
    if (dr(n), !e || G(e, "ruleName") === !1) {
      const s = new Error(`<SUBRULE${ls(n)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw s.KNOWN_RECORDER_ERROR = !0, s;
    }
    const i = on(this.recordingProdStack), o = e.ruleName, a = new Be({
      idx: n,
      nonTerminalName: o,
      label: r?.LABEL,
      // The resolving of the `referencedRule` property will be done once all the Rule's GASTs have been created
      referencedRule: void 0
    });
    return i.definition.push(a), this.outputCst ? zE : jr;
  }
  consumeInternalRecord(e, n, r) {
    if (dr(n), !Pc(e)) {
      const a = new Error(`<CONSUME${ls(n)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
      throw a.KNOWN_RECORDER_ERROR = !0, a;
    }
    const i = on(this.recordingProdStack), o = new he({
      idx: n,
      terminalType: e,
      label: r?.LABEL
    });
    return i.definition.push(o), Jc;
  }
}
function pn(t, e, n, r = !1) {
  dr(n);
  const i = on(this.recordingProdStack), o = St(e) ? e : e.DEF, a = new t({ definition: [], idx: n });
  return r && (a.separator = e.SEP), G(e, "MAX_LOOKAHEAD") && (a.maxLookahead = e.MAX_LOOKAHEAD), this.recordingProdStack.push(a), o.call(this), i.definition.push(a), this.recordingProdStack.pop(), jr;
}
function KE(t, e) {
  dr(e);
  const n = on(this.recordingProdStack), r = te(t) === !1, i = r === !1 ? t : t.DEF, o = new nt({
    definition: [],
    idx: e,
    ignoreAmbiguities: r && t.IGNORE_AMBIGUITIES === !0
  });
  G(t, "MAX_LOOKAHEAD") && (o.maxLookahead = t.MAX_LOOKAHEAD);
  const a = Ec(i, (s) => St(s.GATE));
  return o.hasPredicates = a, n.definition.push(o), W(i, (s) => {
    const c = new Fe({ definition: [] });
    o.definition.push(c), G(s, "IGNORE_AMBIGUITIES") ? c.ignoreAmbiguities = s.IGNORE_AMBIGUITIES : G(s, "GATE") && (c.ignoreAmbiguities = !0), this.recordingProdStack.push(c), s.ALT.call(this), this.recordingProdStack.pop();
  }), jr;
}
function ls(t) {
  return t === 0 ? "" : `${t}`;
}
function dr(t) {
  if (t < 0 || t > us) {
    const e = new Error(
      // The stack trace will contain all the needed details
      `Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${us + 1}`
    );
    throw e.KNOWN_RECORDER_ERROR = !0, e;
  }
}
class YE {
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
      const { time: i, value: o } = Tc(n), a = i > 10 ? console.warn : console.log;
      return this.traceInitIndent < this.traceInitMaxIdent && a(`${r}<-- <${e}> time: ${i}ms`), this.traceInitIndent--, o;
    } else
      return n();
  }
}
function XE(t, e) {
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
const pr = Oo(Dt, "", NaN, NaN, NaN, NaN, NaN, NaN);
Object.freeze(pr);
const Tt = Object.freeze({
  recoveryEnabled: !1,
  maxLookahead: 3,
  dynamicTokensEnabled: !1,
  outputCst: !0,
  errorMessageProvider: Lc,
  nodeLocationTracking: "none",
  traceInitPerf: !1,
  skipValidations: !1
}), gr = Object.freeze({
  recoveryValueFunc: () => {
  },
  resyncEnabled: !0
});
var Ce;
(function(t) {
  t[t.INVALID_RULE_NAME = 0] = "INVALID_RULE_NAME", t[t.DUPLICATE_RULE_NAME = 1] = "DUPLICATE_RULE_NAME", t[t.INVALID_RULE_OVERRIDE = 2] = "INVALID_RULE_OVERRIDE", t[t.DUPLICATE_PRODUCTIONS = 3] = "DUPLICATE_PRODUCTIONS", t[t.UNRESOLVED_SUBRULE_REF = 4] = "UNRESOLVED_SUBRULE_REF", t[t.LEFT_RECURSION = 5] = "LEFT_RECURSION", t[t.NONE_LAST_EMPTY_ALT = 6] = "NONE_LAST_EMPTY_ALT", t[t.AMBIGUOUS_ALTS = 7] = "AMBIGUOUS_ALTS", t[t.CONFLICT_TOKENS_RULES_NAMESPACE = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE", t[t.INVALID_TOKEN_NAME = 9] = "INVALID_TOKEN_NAME", t[t.NO_NON_EMPTY_LOOKAHEAD = 10] = "NO_NON_EMPTY_LOOKAHEAD", t[t.AMBIGUOUS_PREFIX_ALTS = 11] = "AMBIGUOUS_PREFIX_ALTS", t[t.TOO_MANY_ALTS = 12] = "TOO_MANY_ALTS", t[t.CUSTOM_LOOKAHEAD_VALIDATION = 13] = "CUSTOM_LOOKAHEAD_VALIDATION";
})(Ce || (Ce = {}));
class kn {
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
        vc(this);
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
        r = AE({
          rules: ve(this.gastProductionsCache)
        }), this.definitionErrors = this.definitionErrors.concat(r);
      }), this.TRACE_INIT("Grammar Validations", () => {
        if (ce(r) && this.skipValidations === !1) {
          const i = TE({
            rules: ve(this.gastProductionsCache),
            tokenTypes: ve(this.tokensMap),
            errMsgProvider: kt,
            grammarName: n
          }), o = iE({
            lookaheadStrategy: this.lookaheadStrategy,
            rules: ve(this.gastProductionsCache),
            tokenTypes: ve(this.tokensMap),
            grammarName: n
          });
          this.definitionErrors = this.definitionErrors.concat(i, o);
        }
      }), ce(this.definitionErrors) && (this.recoveryEnabled && this.TRACE_INIT("computeAllProdsFollows", () => {
        const i = Jy(ve(this.gastProductionsCache));
        this.resyncFollows = i;
      }), this.TRACE_INIT("ComputeLookaheadFunctions", () => {
        var i, o;
        (o = (i = this.lookaheadStrategy).initialize) === null || o === void 0 || o.call(i, {
          rules: ve(this.gastProductionsCache)
        }), this.preComputeLookaheadFunctions(ve(this.gastProductionsCache));
      })), !kn.DEFER_DEFINITION_ERRORS_HANDLING && !ce(this.definitionErrors))
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
kn.DEFER_DEFINITION_ERRORS_HANDLING = !1;
XE(kn, [
  bE,
  wE,
  DE,
  BE,
  GE,
  qE,
  WE,
  VE,
  HE,
  YE
]);
let JE = class extends kn {
  constructor(e, n = Tt) {
    const r = Re(n);
    r.outputCst = !1, super(e, r);
  }
};
const Ct = So, Zc = Ue, No = Ct({ name: "LCurly", pattern: /{/ }), _o = Ct({ name: "RCurly", pattern: /}/ }), wo = Ct({ name: "LSquare", pattern: /\[/ }), Po = Ct({ name: "RSquare", pattern: /]/ }), yr = Ct({ name: "Comma", pattern: /,/ }), Co = Ct({ name: "Colon", pattern: /:/ }), Gi = Ct({
  name: "StringLiteral",
  pattern: /(\w|\.)+/
}), ZE = Ct({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Zc.SKIPPED
}), Qc = [ZE, Gi, _o, No, wo, Po, yr, Co], QE = new Zc(Qc);
No.LABEL = "'{'";
_o.LABEL = "'}'";
wo.LABEL = "'['";
Po.LABEL = "']'";
yr.LABEL = "','";
Co.LABEL = "':'";
const eA = JE;
class tA extends eA {
  constructor() {
    super(Qc, { recoveryEnabled: !0 });
    const e = this;
    e.RULE("object", () => {
      const n = {};
      return e.CONSUME(No), e.MANY_SEP({
        SEP: yr,
        DEF: () => {
          Object.assign(n, e.SUBRULE(e.objectItem));
        }
      }), e.CONSUME(_o), n;
    }), e.RULE("objectItem", () => {
      let n, r, i;
      const o = {};
      return n = e.CONSUME(Gi), e.CONSUME(Co), i = e.SUBRULE(e.value), r = n.isInsertedInRecovery ? "BAD_KEY" : n.image, o[r] = i, o;
    }), e.RULE("array", () => {
      const n = [];
      return e.CONSUME(wo), e.MANY_SEP({
        SEP: yr,
        DEF: () => {
          n.push(e.SUBRULE(e.value));
        }
      }), e.CONSUME(Po), n;
    }), e.RULE(
      "value",
      () => e.OR([
        {
          ALT: () => e.CONSUME(Gi).image
        },
        { ALT: () => e.SUBRULE(e.object) },
        { ALT: () => e.SUBRULE(e.array) }
      ])
    ), this.performSelfAnalysis();
  }
}
const mi = new tA();
function nA(t) {
  const e = QE.tokenize(t);
  return mi.input = e.tokens, {
    cst: mi.value(),
    lexErrors: e.errors,
    parseErrors: mi.errors
  };
}
function mr(t) {
  if (t === "true")
    return !0;
  if (t === "false")
    return !1;
  throw new Error("invalid boolean string");
}
function xA(t) {
  return t ? "true" : "false";
}
function qe(t, e) {
  return t.split(e)[0];
}
function rA(t) {
  return BigInt(qe(t, "i8"));
}
function kA(t) {
  return `${t}i8`;
}
function iA(t) {
  return BigInt(qe(t, "i16"));
}
function MA(t) {
  return `${t}i16`;
}
function oA(t) {
  return BigInt(qe(t, "i32"));
}
function FA(t) {
  return `${t}i32`;
}
function aA(t) {
  return BigInt(qe(t, "i64"));
}
function $A(t) {
  return `${t}i64`;
}
function sA(t) {
  return BigInt(qe(t, "i128"));
}
function UA(t) {
  return `${t}i128`;
}
function eu(t) {
  return BigInt(qe(t, "u8"));
}
function We(t) {
  return `${t}u8`;
}
function cA(t) {
  return BigInt(qe(t, "u16"));
}
function jA(t) {
  return `${t}u16`;
}
function Mt(t) {
  return BigInt(qe(t, "u32"));
}
function Wi(t) {
  return `${t}u32`;
}
function Rt(t) {
  return BigInt(qe(t, "u64"));
}
function Ei(t) {
  return `${t}u64`;
}
function tu(t) {
  return BigInt(qe(t, "u128"));
}
function DA(t) {
  return `${t}u128`;
}
function uA(t) {
  return BigInt(qe(t, "field"));
}
function qn(t) {
  return `${t}field`;
}
function lA(t) {
  return BigInt(qe(t, "group"));
}
function BA(t) {
  return `${t}group`;
}
function fA(t) {
  return BigInt(qe(t, "scalar"));
}
function qA(t) {
  return `${t}scalar`;
}
class Mn {
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
function hA(t) {
  try {
    return t.startsWith("aleo1") ? t : t === "true" || t === "false" ? mr(t) : t.endsWith("field") ? uA(t) : t.endsWith("group") ? lA(t) : t.endsWith("i8") ? rA(t) : t.endsWith("i16") ? iA(t) : t.endsWith("i32") ? oA(t) : t.endsWith("i64") ? aA(t) : t.endsWith("i128") ? sA(t) : t.endsWith("u8") ? eu(t) : t.endsWith("u16") ? cA(t) : t.endsWith("u32") ? Mt(t) : t.endsWith("u64") ? Rt(t) : t.endsWith("u128") ? tu(t) : t.endsWith("scalar") ? fA(t) : t;
  } catch {
    return t;
  }
}
function Vi(t) {
  return Array.isArray(t) ? t.map((e) => Vi(e)) : typeof t == "object" ? Object.fromEntries(Object.entries(t).map(([e, n]) => [e, Vi(n)])) : hA(t);
}
function xe(t) {
  js(t !== "null", "plaintext cannot be null"), t = t.replaceAll("\\n", `
`).replaceAll('"', ""), t = t.trim();
  const { cst: e, lexErrors: n, parseErrors: r } = nA(t);
  return n.length > 0 && (console.error("Lex errors:", n.map((i) => JSON.stringify(i)).join(`
`)), console.log(`Plaintext: "${t}"`)), r.length > 0 && (console.error("Parse errors:", r.map((i) => JSON.stringify(i)).join(`
`)), console.log(`Plaintext: "${t}"`)), Vi(e);
}
let Ai;
async function Dr() {
  return Ai || (globalThis.Worker || (globalThis.Worker = class extends EventTarget {
    postMessage() {
    }
    unref() {
    }
  }), Ai = await import("@aleohq/sdk")), Ai;
}
async function Tn(t) {
  return (await Dr()).Plaintext.fromString(t).hashBhp256().toString();
}
async function dA(t) {
  return (await Dr()).ProgramID.fromString(t).toAddress();
}
async function WA(t) {
  return (await Dr()).Address.from_string(t).to_field().toString();
}
async function VA(t) {
  return (await Dr()).Field.fromString(t).toAddress().to_string();
}
class zA extends Mn {
  /**
   * Get the state of the committee for an **active** validator.
   * @param validator
   * @returns The committee state or null if the validator is not in the committee.
   */
  async getCommitteeState(e) {
    const n = await this.getMappingValueOrNull("committee", e);
    return n === null ? null : xe(n);
  }
  /**
   * Get the total number of **active** validators in the committee.
   */
  async getCommitteeValidatorsCount() {
    return Rt(
      await this.getMappingValueOrDefault(
        "metadata",
        "aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc",
        Ei(0)
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
        Ei(0)
      )
    );
  }
  /**
   * Get the total amount of microcredits that are prebonded and bonded to a validator.
   * Note: It includes both prebonded and bonded microcredits. However, it does not contain unbonding microcredits.
   * @param validator
   */
  async getDelegated(e) {
    return Rt(await this.getMappingValueOrDefault("delegated", e, Ei(0)));
  }
  /**
   * Get the bond state of the staker.
   * @param staker The staker (validator or delegator)
   */
  async getBonded(e) {
    const n = await this.getMappingValueOrNull("bonded", e);
    return n === null ? null : xe(n);
  }
  /**
   * Get the unbonding state of the staker.
   * @param staker The staker (validator or delegator)
   */
  async getUnbonding(e) {
    const n = await this.getMappingValueOrNull("unbonding", e);
    return n === null ? null : xe(n);
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
class HA extends Mn {
  async isInitialized() {
    return mr(await this.getMappingValueOrDefault("initialized", "0u8", "false"));
  }
  async hasRole(e, n) {
    const r = await Tn(`{
      account: ${n},
      role: ${We(e)}
    }`);
    return mr(await this.getMappingValueOrDefault("grants", r, "false"));
  }
  async isRoleAdmin(e, n) {
    const r = Number(
      eu(await this.getMappingValueOrDefault("role_admins", We(e), We(nf)))
    );
    return typeof n == "number" ? n === r : this.hasRole(r, n);
  }
}
function pA(t) {
  return new Promise((e) => setTimeout(e, t));
}
var gA = /* @__PURE__ */ ((t) => (t[t.INVALID = 0] = "INVALID", t[t.IN_PROGRESS = 1] = "IN_PROGRESS", t[t.VALID = 2] = "VALID", t))(gA || {});
class KA extends Mn {
  constructor(e, n) {
    super(e), this.credits = n;
  }
  async getTotalSupply() {
    return Rt(await this.getMappingValueOrDefault("total_supply", We(0), "0"));
  }
  async getPublicBalance(e) {
    return Rt(await this.getMappingValueOrDefault("account", e, "0"));
  }
  async getApproval(e, n) {
    const r = await Tn(`{
      approver: ${e},
      spender: ${n}
    }`);
    return Rt(await this.getMappingValueOrDefault("approvals", r, "0"));
  }
  async getConfig() {
    const e = await this.getMappingValueOrNull("config", We(0));
    return e === null ? null : xe(e);
  }
  async isInitialized() {
    return await this.getConfig() !== null;
  }
  async isPaused() {
    const e = await this.getConfig();
    return e !== null && e.paused;
  }
  async getState() {
    return xe(await this.getMappingValue("state", We(0)));
  }
  async getCacheState() {
    const e = xe(await this.getMappingValue("cache_state", We(0)));
    return e.status = Number(e.status), e;
  }
  async getWithdraw(e) {
    const n = await this.getMappingValueOrNull("withdraws", e);
    return n === null ? null : xe(n);
  }
  isWithdrawClaimable(e, n, r, i) {
    return e.height <= (e.pending ? r + rf : i) && e.amount <= n;
  }
  async getDelegatorsCount() {
    return Mt(await this.getMappingValue("delegators_count", We(0)));
  }
  async getDelegator(e) {
    const n = await this.getMappingValueOrNull("delegators", Wi(e));
    return n === null ? null : xe(n);
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
    return this.credits.getPublicBalance(await dA(uf()));
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
    return Mt(await this.getMappingValue("reward_history_count", We(0)));
  }
  async getRewardHistory(e) {
    return xe(await this.getMappingValue("reward_history", Wi(e)));
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
      await pA(n);
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
class YA extends Mn {
  /**
   * Whether the program is paused.
   */
  async isPaused() {
    return mr(await this.getMappingValueOrDefault("paused", We(0), "true"));
  }
  /**
   * Get the points for an account, including the unsettled points.
   * @param account
   * @param currentHeight
   */
  async getEstimatedPoints(e, n) {
    const r = await this.getState(e);
    if (!r)
      return 0n;
    const i = r.stcredits * (n - r.height);
    return r.points + i;
  }
  /**
   * Get the state of an account.
   * @param account
   */
  async getState(e) {
    const n = await this.getMappingValueOrNull("state", e);
    return n === null ? null : xe(n);
  }
  /**
   * Get the stats of the program.
   */
  async getStats() {
    const e = await this.getMappingValueOrNull("stats", We(0));
    return e === null ? {
      stcredits: 0n,
      points: 0n
    } : xe(e);
  }
  /**
   * Get the inviter by the invite code.
   * @param code
   */
  async getInviterByCode(e) {
    return await this.getMappingValueOrNull("inviters", Wi(e));
  }
  /**
   * Get the invite code by the inviter.
   * @param inviter
   */
  async getInviteCode(e) {
    return Mt(await this.getMappingValueOrDefault("invite_codes", e, String(af)));
  }
  /**
   * Get the invite code counter.
   */
  async getInviteCodeCounter() {
    return Mt(await this.getMappingValueOrDefault("invite_code_counter", We(0), String(of)));
  }
}
class XA extends Mn {
  async getRegisteredTokens(e) {
    const n = await this.getMappingValueOrNull("registered_tokens", qn(e));
    return n === null ? null : xe(n);
  }
  async getBalance(e, n) {
    const r = await Tn(`{
      account: ${n},
      token_id: ${qn(e)}
    }`), i = await this.getMappingValueOrNull("balances", r);
    return i === null ? {
      token_id: e,
      account: n,
      balance: 0n,
      authorized_until: 0n
    } : xe(i);
  }
  async getAuthorizedBalances(e, n) {
    const r = await Tn(`{
      account: ${n},
      token_id: ${qn(e)}
    }`), i = await this.getMappingValueOrNull("authorized_balances", r);
    return i === null ? {
      token_id: e,
      account: n,
      balance: 0n,
      authorized_until: 0n
    } : xe(i);
  }
  async getAllowance(e, n, r) {
    const i = await Tn(`{
      account: ${n},
      spender: ${r},
      token_id: ${qn(e)}
    }`), o = await this.getMappingValueOrNull("allowances", i);
    return o === null ? 0n : tu(o);
  }
}
export {
  RA as ACCESS_CONTROL_PROGRAM,
  NA as ACL_MANAGER_PROGRAM,
  SA as ASSET_LISTING_ADMIN_ROLE,
  HA as AccessControlProgram,
  gA as CacheStatus,
  zA as CreditsProgram,
  nf as DEFAULT_ADMIN_ROLE,
  TA as EMERGENCY_ADMIN_ROLE,
  af as EMPTY_INVITE_CODE,
  bA as INVITER_OF_INVITER_REWARD,
  IA as INVITER_REWARD,
  XA as MtspProgram,
  AA as POOL_ADMIN_ROLE,
  Mn as ProgramBase,
  vA as RISK_ADMIN_ROLE,
  cf as SPECTRE,
  Ds as STAKING,
  mA as STAKING_ADMIN_ROLE,
  EA as STAKING_OPERATOR_ROLE,
  of as START_INVITE_CODE,
  OA as STCREDITS_CACHE_BATCH_NUM,
  _A as STCREDITS_POINTS_PROGRAM,
  uf as STCREDITS_PROGRAM,
  YA as StCreditsPointsProgram,
  KA as StCreditsProgram,
  sf as VERSION,
  rf as WITHDRAW_DELAY,
  yA as ZERO_ADDRESS,
  WA as addressToField,
  Tn as bhp256HashToField,
  mr as bool,
  xA as boolStr,
  wA as delegatorProgramName,
  uA as field,
  qn as fieldStr,
  VA as fieldToAddress,
  lA as group,
  BA as groupStr,
  sA as i128,
  UA as i128Str,
  iA as i16,
  MA as i16Str,
  oA as i32,
  FA as i32Str,
  aA as i64,
  $A as i64Str,
  rA as i8,
  kA as i8Str,
  Dr as importAleo,
  PA as initialize,
  hA as parseLiteral,
  xe as parsePlaintext,
  dA as programAddress,
  fA as scalar,
  qA as scalarStr,
  tu as u128,
  DA as u128Str,
  cA as u16,
  jA as u16Str,
  Mt as u32,
  Wi as u32Str,
  Rt as u64,
  Ei as u64Str,
  eu as u8,
  We as u8Str
};
