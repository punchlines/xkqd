!function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.VOD = t() : e.VOD = t()
}(window, function () {
  return function (e) {
    var t = {};

    function n(r) {
      if (t[r]) return t[r].exports;
      var o = t[r] = {i: r, l: !1, exports: {}};
      return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }

    return n.m = e, n.c = t, n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
    }, n.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, n.t = function (e, t) {
      if (1 & t && (e = n(e)), 8 & t) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e) for (var o in e) n.d(r, o, function (t) {
        return e[t]
      }.bind(null, o));
      return r
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return n.d(t, "a", t), t
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 1)
  }([function (e, t, n) {
    e.exports = function (e) {
      function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {i: r, l: !1, exports: {}};
        return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
      }

      var n = {};
      return t.m = e, t.c = n, t.i = function (e) {
        return e
      }, t.d = function (e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {configurable: !1, enumerable: !0, get: r})
      }, t.n = function (e) {
        var n = e && e.__esModule ? function () {
          return e.default
        } : function () {
          return e
        };
        return t.d(n, "a", n), n
      }, t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }, t.p = "E:\\tx\\manageconsole_vod_qcloud_proj\\branches\\wx_web_sdk\\module\\statics\\source\\wx_sdk\\cos-wx-sdk-v5-master\\demo\\lib", t(t.s = 4)
    }([function (e, t, n) {
      "use strict";
      (function (t) {
        function r(e) {
          return encodeURIComponent(e).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A")
        }

        function o(e) {
          return c(e, function (e) {
            return "object" == typeof e ? o(e) : e
          })
        }

        function i(e, t) {
          return s(t, function (n, r) {
            e[r] = t[r]
          }), e
        }

        function a(e) {
          return e instanceof Array
        }

        function s(e, t) {
          for (var n in e) e.hasOwnProperty(n) && t(e[n], n)
        }

        function c(e, t) {
          var n = a(e) ? [] : {};
          for (var r in e) e.hasOwnProperty(r) && (n[r] = t(e[r], r));
          return n
        }

        var u = n(8), l = n(6), d = n(10), f = n(7), h = n(5), p = (h.atob, h.btoa), g = function (e) {
          var t = {};
          for (var n in e) void 0 !== e[n] && null !== e[n] && (t[n] = e[n]);
          return t
        }, m = {
          apiWrapper: function (e, t) {
            return function (n, r) {
              "function" == typeof n && (r = n, n = {});
              var o = (n = i({}, n)).Headers || {};
              n && "object" == typeof n && (function () {
                for (var e in n) n.hasOwnProperty(e) && e.indexOf("x-cos-") > -1 && (o[e] = n[e])
              }(), o["x-cos-mfa"] = n.MFA, o["Content-MD5"] = n.ContentMD5, o["Content-Length"] = n.ContentLength, o["Content-Type"] = n.ContentType, o.Expect = n.Expect, o.Expires = n.Expires, o["Cache-Control"] = n.CacheControl, o["Content-Disposition"] = n.ContentDisposition, o["Content-Encoding"] = n.ContentEncoding, o.Range = n.Range, o["If-Modified-Since"] = n.IfModifiedSince, o["If-Unmodified-Since"] = n.IfUnmodifiedSince, o["If-Match"] = n.IfMatch, o["If-None-Match"] = n.IfNoneMatch, o["x-cos-copy-source"] = n.CopySource, o["x-cos-copy-source-Range"] = n.CopySourceRange, o["x-cos-metadata-directive"] = n.MetadataDirective, o["x-cos-copy-source-If-Modified-Since"] = n.CopySourceIfModifiedSince, o["x-cos-copy-source-If-Unmodified-Since"] = n.CopySourceIfUnmodifiedSince, o["x-cos-copy-source-If-Match"] = n.CopySourceIfMatch, o["x-cos-copy-source-If-None-Match"] = n.CopySourceIfNoneMatch, o["x-cos-server-side-encryption"] = n.ServerSideEncryption, o["x-cos-acl"] = n.ACL, o["x-cos-grant-read"] = n.GrantRead, o["x-cos-grant-write"] = n.GrantWrite, o["x-cos-grant-full-control"] = n.GrantFullControl, o["x-cos-grant-read-acp"] = n.GrantReadAcp, o["x-cos-grant-write-acp"] = n.GrantWriteAcp, o["x-cos-storage-class"] = n.StorageClass, n.Headers = g(o));
              var a = function (e) {
                return e && e.headers && (e.headers["x-cos-version-id"] && (e.VersionId = e.headers["x-cos-version-id"]), e.headers["x-cos-delete-marker"] && (e.DeleteMarker = e.headers["x-cos-delete-marker"])), e
              }, s = function (e, t) {
                r && r(a(e), a(t))
              };
              if ("getService" !== e && "abortUploadTask" !== e) {
                if (!function (e, t) {
                  var n = t.Bucket, r = t.Region, o = t.Key;
                  return e.indexOf("Bucket") > -1 || "deleteMultipleObject" === e || "multipartList" === e || "listObjectVersions" === e ? n && r : !(e.indexOf("Object") > -1 || e.indexOf("multipart") > -1 || "sliceUploadFile" === e || "abortUploadTask" === e) || n && r && o
                }(e, n)) return void s({error: "lack of required params"});
                if (n.Region && -1 === n.Region.indexOf("-") && "yfb" !== n.Region) return void s({error: "Region format error, find help here: https://cloud.tencent.com/document/product/436/6224"});
                if (n.Region && n.Region.indexOf("cos.") > -1) return void s({error: 'Region should not be start with "cos."'});
                if (n.Bucket) {
                  if (!/^(.+)-(\d+)$/.test(n.Bucket)) if (n.AppId) n.Bucket = n.Bucket + "-" + n.AppId; else {
                    if (!this.options.AppId) return void s({error: 'Bucket should format as "test-1250000000".'});
                    n.Bucket = n.Bucket + "-" + this.options.AppId
                  }
                  n.AppId && (console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g Bucket:"test-1250000000" ).'), delete n.AppId)
                }
                n.Key && "/" === n.Key.substr(0, 1) && (n.Key = n.Key.substr(1))
              }
              var c = t.call(this, n, s);
              if ("getAuth" === e || "getObjectUrl" === e) return c
            }
          }, getAuth: function (e) {
            var t = (e = e || {}).SecretId, n = e.SecretKey, i = (e.method || e.Method || "get").toLowerCase(),
                a = e.pathname || e.Key || "/", s = o(e.Query || e.params || {}), c = o(e.Headers || e.headers || {});
            if (0 !== a.indexOf("/") && (a = "/" + a), !t) return console.error("lack of param SecretId");
            if (!n) return console.error("lack of param SecretKey");
            var u = function (e) {
                  var t = [];
                  for (var n in e) e.hasOwnProperty(n) && t.push(n);
                  return t.sort()
                }, d = function (e) {
                  var t, n, o, i = [], a = u(e);
                  for (t = 0; t < a.length; t++) o = void 0 === e[n = a[t]] || null === e[n] ? "" : "" + e[n], n = r(n = n.toLowerCase()), o = r(o) || "", i.push(n + "=" + o);
                  return i.join("&")
                }, f = parseInt((new Date).getTime() / 1e3) - 1, h = f, p = e.Expires || e.expires, g = t,
                m = f + ";" + (h += void 0 === p ? 900 : 1 * p || 0), y = f + ";" + h, v = u(c).join(";").toLowerCase(),
                C = u(s).join(";").toLowerCase(), x = l.HmacSHA1(y, n).toString(),
                b = [i, a, d(s), d(c), ""].join("\n"), A = ["sha1", m, l.SHA1(b).toString(), ""].join("\n");
            return ["q-sign-algorithm=sha1", "q-ak=" + g, "q-sign-time=" + m, "q-key-time=" + y, "q-header-list=" + v, "q-url-param-list=" + C, "q-signature=" + l.HmacSHA1(A, x).toString()].join("&")
          }, xml2json: d, json2xml: f, md5: u, clearKey: g, getFileMd5: function (e, t) {
            !function (e, t) {
              var n, r = new FileReader;
              FileReader.prototype.readAsBinaryString ? (n = FileReader.prototype.readAsBinaryString, r.onload = function () {
                t(this.result)
              }) : FileReader.prototype.readAsArrayBuffer ? n = function (e) {
                var n = "", r = new FileReader;
                r.onload = function (e) {
                  for (var o = new Uint8Array(r.result), i = o.byteLength, a = 0; a < i; a++) n += String.fromCharCode(o[a]);
                  t(n)
                }, r.readAsArrayBuffer(e)
              } : console.error("FileReader not support readAsBinaryString"), n.call(r, e)
            }(e, function (e) {
              var n = u(e);
              t(null, n)
            })
          }, binaryBase64: function (e) {
            var t, n, r, o = "";
            for (t = 0, n = e.length / 2; t < n; t++) r = parseInt(e[2 * t] + e[2 * t + 1], 16), o += String.fromCharCode(r);
            return p(o)
          }, extend: i, isArray: a, isInArray: function (e, t) {
            for (var n = !1, r = 0; r < e.length; r++) if (t === e[r]) {
              n = !0;
              break
            }
            return n
          }, each: s, map: c, filter: function (e, t) {
            var n = a(e), r = n ? [] : {};
            for (var o in e) e.hasOwnProperty(o) && t(e[o], o) && (n ? r.push(e[o]) : r[o] = e[o]);
            return r
          }, clone: o, uuid: function () {
            var e = function () {
              return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            };
            return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
          }, throttleOnProgress: function (e, t) {
            function n() {
              if (o = 0, t && "function" == typeof t) {
                r = Date.now();
                var n, i = Math.max(0, Math.round((s - a) / ((r - c) / 1e3) * 100) / 100);
                n = 0 === s && 0 === e ? 1 : Math.round(s / e * 100) / 100 || 0, c = r, a = s;
                try {
                  t({loaded: s, total: e, speed: i, percent: n})
                } catch (e) {
                }
              }
            }

            var r, o, i = this, a = 0, s = 0, c = Date.now();
            return function (t, r) {
              if (t && (s = t.loaded, e = t.total), r) clearTimeout(o), n(); else {
                if (o) return;
                o = setTimeout(n, i.options.ProgressInterval)
              }
            }
          }, isBrowser: !!t.document
        };
        e.exports = m
      }).call(t, n(11))
    }, function (e, t) {
      function n(e, t) {
        for (var n in e) t[n] = e[n]
      }

      function r(e, t) {
        function r() {
        }

        var o = e.prototype;
        if (Object.create) {
          var i = Object.create(t.prototype);
          o.__proto__ = i
        }
        o instanceof t || (r.prototype = t.prototype, n(o, r = new r), e.prototype = o = r), o.constructor != e && ("function" != typeof e && console.error("unknow Class:" + e), o.constructor = e)
      }

      function o(e, t) {
        if (t instanceof Error) var n = t; else n = this, Error.call(this, J[e]), this.message = J[e], Error.captureStackTrace && Error.captureStackTrace(this, o);
        return n.code = e, t && (this.message = this.message + ": " + t), n
      }

      function i() {
      }

      function a(e, t) {
        this._node = e, this._refresh = t, s(this)
      }

      function s(e) {
        var t = e._node._inc || e._node.ownerDocument._inc;
        if (e._inc != t) {
          var r = e._refresh(e._node);
          F(e, "length", r.length), n(r, e), e._inc = t
        }
      }

      function c() {
      }

      function u(e, t) {
        for (var n = e.length; n--;) if (e[n] === t) return n
      }

      function l(e, t, n, r) {
        if (r ? t[u(t, r)] = n : t[t.length++] = n, e) {
          n.ownerElement = e;
          var o = e.ownerDocument;
          o && (r && y(o, e, r), function (e, t, n) {
            o && o._inc++, "http://www.w3.org/2000/xmlns/" == n.namespaceURI && (t._nsMap[n.prefix ? n.localName : ""] = n.value)
          }(0, e, n))
        }
      }

      function d(e, t, n) {
        var r = u(t, n);
        if (!(r >= 0)) throw o(te, new Error(e.tagName + "@" + n));
        for (var i = t.length - 1; r < i;) t[r] = t[++r];
        if (t.length = i, e) {
          var a = e.ownerDocument;
          a && (y(a, e, n), n.ownerElement = null)
        }
      }

      function f(e) {
        if (this._features = {}, e) for (var t in e) this._features = e[t]
      }

      function h() {
      }

      function p(e) {
        return ("<" == e ? "&lt;" : ">" == e && "&gt;") || "&" == e && "&amp;" || '"' == e && "&quot;" || "&#" + e.charCodeAt() + ";"
      }

      function g(e, t) {
        if (t(e)) return !0;
        if (e = e.firstChild) do {
          if (g(e, t)) return !0
        } while (e = e.nextSibling)
      }

      function m() {
      }

      function y(e, t, n, r) {
        e && e._inc++, "http://www.w3.org/2000/xmlns/" == n.namespaceURI && delete t._nsMap[n.prefix ? n.localName : ""]
      }

      function v(e, t, n) {
        if (e && e._inc) {
          e._inc++;
          var r = t.childNodes;
          if (n) r[r.length++] = n; else {
            for (var o = t.firstChild, i = 0; o;) r[i++] = o, o = o.nextSibling;
            r.length = i
          }
        }
      }

      function C(e, t) {
        var n = t.previousSibling, r = t.nextSibling;
        return n ? n.nextSibling = r : e.firstChild = r, r ? r.previousSibling = n : e.lastChild = n, v(e.ownerDocument, e), t
      }

      function x(e, t, n) {
        var r = t.parentNode;
        if (r && r.removeChild(t), t.nodeType === Q) {
          var o = t.firstChild;
          if (null == o) return t;
          var i = t.lastChild
        } else o = i = t;
        var a = n ? n.previousSibling : e.lastChild;
        o.previousSibling = a, i.nextSibling = n, a ? a.nextSibling = o : e.firstChild = o, null == n ? e.lastChild = i : n.previousSibling = i;
        do {
          o.parentNode = e
        } while (o !== i && (o = o.nextSibling));
        return v(e.ownerDocument || e, e), t.nodeType == Q && (t.firstChild = t.lastChild = null), t
      }

      function b() {
        this._nsMap = {}
      }

      function A() {
      }

      function k() {
      }

      function R() {
      }

      function T() {
      }

      function _() {
      }

      function w() {
      }

      function S() {
      }

      function N() {
      }

      function E() {
      }

      function B() {
      }

      function D() {
      }

      function I() {
      }

      function O(e, t) {
        var n = [], r = 9 == this.nodeType ? this.documentElement : this, o = r.prefix, i = r.namespaceURI;
        if (i && null == o && null == (o = r.lookupPrefix(i))) var a = [{namespace: i, prefix: null}];
        return M(this, n, e, t, a), n.join("")
      }

      function P(e, t, n) {
        var r = e.prefix || "", o = e.namespaceURI;
        if (!r && !o) return !1;
        if ("xml" === r && "http://www.w3.org/XML/1998/namespace" === o || "http://www.w3.org/2000/xmlns/" == o) return !1;
        for (var i = n.length; i--;) {
          var a = n[i];
          if (a.prefix == r) return a.namespace != o
        }
        return !0
      }

      function M(e, t, n, r, o) {
        if (r) {
          if (!(e = r(e))) return;
          if ("string" == typeof e) return void t.push(e)
        }
        switch (e.nodeType) {
          case j:
            o || (o = []);
            var i = (o.length, e.attributes), a = i.length, s = e.firstChild, c = e.tagName;
            n = L === e.namespaceURI || n, t.push("<", c);
            for (var u = 0; u < a; u++) {
              "xmlns" == (l = i.item(u)).prefix ? o.push({
                prefix: l.localName,
                namespace: l.value
              }) : "xmlns" == l.nodeName && o.push({prefix: "", namespace: l.value})
            }
            for (u = 0; u < a; u++) {
              var l;
              if (P(l = i.item(u), 0, o)) {
                var d = l.prefix || "", f = l.namespaceURI, h = d ? " xmlns:" + d : " xmlns";
                t.push(h, '="', f, '"'), o.push({prefix: d, namespace: f})
              }
              M(l, t, n, r, o)
            }
            if (P(e, 0, o)) {
              d = e.prefix || "", f = e.namespaceURI, h = d ? " xmlns:" + d : " xmlns";
              t.push(h, '="', f, '"'), o.push({prefix: d, namespace: f})
            }
            if (s || n && !/^(?:meta|link|img|br|hr|input)$/i.test(c)) {
              if (t.push(">"), n && /^script$/i.test(c)) for (; s;) s.data ? t.push(s.data) : M(s, t, n, r, o), s = s.nextSibling; else for (; s;) M(s, t, n, r, o), s = s.nextSibling;
              t.push("</", c, ">")
            } else t.push("/>");
            return;
          case W:
          case Q:
            for (s = e.firstChild; s;) M(s, t, n, r, o), s = s.nextSibling;
            return;
          case K:
            return t.push(" ", e.name, '="', e.value.replace(/[<&"]/g, p), '"');
          case H:
            return t.push(e.data.replace(/[<&]/g, p));
          case V:
            return t.push("<![CDATA[", e.data, "]]>");
          case X:
            return t.push("\x3c!--", e.data, "--\x3e");
          case $:
            var g = e.publicId, m = e.systemId;
            if (t.push("<!DOCTYPE ", e.name), g) t.push(' PUBLIC "', g), m && "." != m && t.push('" "', m), t.push('">'); else if (m && "." != m) t.push(' SYSTEM "', m, '">'); else {
              var y = e.internalSubset;
              y && t.push(" [", y, "]"), t.push(">")
            }
            return;
          case z:
            return t.push("<?", e.target, " ", e.data, "?>");
          case q:
            return t.push("&", e.nodeName, ";");
          default:
            t.push("??", e.nodeName)
        }
      }

      function F(e, t, n) {
        e[t] = n
      }

      var L = "http://www.w3.org/1999/xhtml", U = {}, j = U.ELEMENT_NODE = 1, K = U.ATTRIBUTE_NODE = 2,
          H = U.TEXT_NODE = 3, V = U.CDATA_SECTION_NODE = 4, q = U.ENTITY_REFERENCE_NODE = 5, G = U.ENTITY_NODE = 6,
          z = U.PROCESSING_INSTRUCTION_NODE = 7, X = U.COMMENT_NODE = 8, W = U.DOCUMENT_NODE = 9,
          $ = U.DOCUMENT_TYPE_NODE = 10, Q = U.DOCUMENT_FRAGMENT_NODE = 11, Z = U.NOTATION_NODE = 12, Y = {}, J = {},
          ee = (Y.INDEX_SIZE_ERR = (J[1] = "Index size error", 1), Y.DOMSTRING_SIZE_ERR = (J[2] = "DOMString size error", 2), Y.HIERARCHY_REQUEST_ERR = (J[3] = "Hierarchy request error", 3)),
          te = (Y.WRONG_DOCUMENT_ERR = (J[4] = "Wrong document", 4), Y.INVALID_CHARACTER_ERR = (J[5] = "Invalid character", 5), Y.NO_DATA_ALLOWED_ERR = (J[6] = "No data allowed", 6), Y.NO_MODIFICATION_ALLOWED_ERR = (J[7] = "No modification allowed", 7), Y.NOT_FOUND_ERR = (J[8] = "Not found", 8)),
          ne = (Y.NOT_SUPPORTED_ERR = (J[9] = "Not supported", 9), Y.INUSE_ATTRIBUTE_ERR = (J[10] = "Attribute in use", 10));
      Y.INVALID_STATE_ERR = (J[11] = "Invalid state", 11), Y.SYNTAX_ERR = (J[12] = "Syntax error", 12), Y.INVALID_MODIFICATION_ERR = (J[13] = "Invalid modification", 13), Y.NAMESPACE_ERR = (J[14] = "Invalid namespace", 14), Y.INVALID_ACCESS_ERR = (J[15] = "Invalid access", 15), o.prototype = Error.prototype, n(Y, o), i.prototype = {
        length: 0,
        item: function (e) {
          return this[e] || null
        },
        toString: function (e, t) {
          for (var n = [], r = 0; r < this.length; r++) M(this[r], n, e, t);
          return n.join("")
        }
      }, a.prototype.item = function (e) {
        return s(this), this[e]
      }, r(a, i), c.prototype = {
        length: 0, item: i.prototype.item, getNamedItem: function (e) {
          for (var t = this.length; t--;) {
            var n = this[t];
            if (n.nodeName == e) return n
          }
        }, setNamedItem: function (e) {
          var t = e.ownerElement;
          if (t && t != this._ownerElement) throw new o(ne);
          var n = this.getNamedItem(e.nodeName);
          return l(this._ownerElement, this, e, n), n
        }, setNamedItemNS: function (e) {
          var t, n = e.ownerElement;
          if (n && n != this._ownerElement) throw new o(ne);
          return t = this.getNamedItemNS(e.namespaceURI, e.localName), l(this._ownerElement, this, e, t), t
        }, removeNamedItem: function (e) {
          var t = this.getNamedItem(e);
          return d(this._ownerElement, this, t), t
        }, removeNamedItemNS: function (e, t) {
          var n = this.getNamedItemNS(e, t);
          return d(this._ownerElement, this, n), n
        }, getNamedItemNS: function (e, t) {
          for (var n = this.length; n--;) {
            var r = this[n];
            if (r.localName == t && r.namespaceURI == e) return r
          }
          return null
        }
      }, f.prototype = {
        hasFeature: function (e, t) {
          var n = this._features[e.toLowerCase()];
          return !(!n || t && !(t in n))
        }, createDocument: function (e, t, n) {
          var r = new m;
          if (r.implementation = this, r.childNodes = new i, r.doctype = n, n && r.appendChild(n), t) {
            var o = r.createElementNS(e, t);
            r.appendChild(o)
          }
          return r
        }, createDocumentType: function (e, t, n) {
          var r = new w;
          return r.name = e, r.nodeName = e, r.publicId = t, r.systemId = n, r
        }
      }, h.prototype = {
        firstChild: null,
        lastChild: null,
        previousSibling: null,
        nextSibling: null,
        attributes: null,
        parentNode: null,
        childNodes: null,
        ownerDocument: null,
        nodeValue: null,
        namespaceURI: null,
        prefix: null,
        localName: null,
        insertBefore: function (e, t) {
          return x(this, e, t)
        },
        replaceChild: function (e, t) {
          this.insertBefore(e, t), t && this.removeChild(t)
        },
        removeChild: function (e) {
          return C(this, e)
        },
        appendChild: function (e) {
          return this.insertBefore(e, null)
        },
        hasChildNodes: function () {
          return null != this.firstChild
        },
        cloneNode: function (e) {
          return function e(t, n, r) {
            var o = new n.constructor;
            for (var a in n) {
              var s = n[a];
              "object" != typeof s && s != o[a] && (o[a] = s)
            }
            switch (n.childNodes && (o.childNodes = new i), o.ownerDocument = t, o.nodeType) {
              case j:
                var u = n.attributes, l = o.attributes = new c, d = u.length;
                l._ownerElement = o;
                for (var f = 0; f < d; f++) o.setAttributeNode(e(t, u.item(f), !0));
                break;
              case K:
                r = !0
            }
            if (r) for (var h = n.firstChild; h;) o.appendChild(e(t, h, r)), h = h.nextSibling;
            return o
          }(this.ownerDocument || this, this, e)
        },
        normalize: function () {
          for (var e = this.firstChild; e;) {
            var t = e.nextSibling;
            t && t.nodeType == H && e.nodeType == H ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), e = t)
          }
        },
        isSupported: function (e, t) {
          return this.ownerDocument.implementation.hasFeature(e, t)
        },
        hasAttributes: function () {
          return this.attributes.length > 0
        },
        lookupPrefix: function (e) {
          for (var t = this; t;) {
            var n = t._nsMap;
            if (n) for (var r in n) if (n[r] == e) return r;
            t = t.nodeType == K ? t.ownerDocument : t.parentNode
          }
          return null
        },
        lookupNamespaceURI: function (e) {
          for (var t = this; t;) {
            var n = t._nsMap;
            if (n && e in n) return n[e];
            t = t.nodeType == K ? t.ownerDocument : t.parentNode
          }
          return null
        },
        isDefaultNamespace: function (e) {
          return null == this.lookupPrefix(e)
        }
      }, n(U, h), n(U, h.prototype), m.prototype = {
        nodeName: "#document",
        nodeType: W,
        doctype: null,
        documentElement: null,
        _inc: 1,
        insertBefore: function (e, t) {
          if (e.nodeType == Q) {
            for (var n = e.firstChild; n;) {
              var r = n.nextSibling;
              this.insertBefore(n, t), n = r
            }
            return e
          }
          return null == this.documentElement && e.nodeType == j && (this.documentElement = e), x(this, e, t), e.ownerDocument = this, e
        },
        removeChild: function (e) {
          return this.documentElement == e && (this.documentElement = null), C(this, e)
        },
        importNode: function (e, t) {
          return function e(t, n, r) {
            var o;
            switch (n.nodeType) {
              case j:
                (o = n.cloneNode(!1)).ownerDocument = t;
              case Q:
                break;
              case K:
                r = !0
            }
            if (o || (o = n.cloneNode(!1)), o.ownerDocument = t, o.parentNode = null, r) for (var i = n.firstChild; i;) o.appendChild(e(t, i, r)), i = i.nextSibling;
            return o
          }(this, e, t)
        },
        getElementById: function (e) {
          var t = null;
          return g(this.documentElement, function (n) {
            if (n.nodeType == j && n.getAttribute("id") == e) return t = n, !0
          }), t
        },
        createElement: function (e) {
          var t = new b;
          return t.ownerDocument = this, t.nodeName = e, t.tagName = e, t.childNodes = new i, (t.attributes = new c)._ownerElement = t, t
        },
        createDocumentFragment: function () {
          var e = new B;
          return e.ownerDocument = this, e.childNodes = new i, e
        },
        createTextNode: function (e) {
          var t = new R;
          return t.ownerDocument = this, t.appendData(e), t
        },
        createComment: function (e) {
          var t = new T;
          return t.ownerDocument = this, t.appendData(e), t
        },
        createCDATASection: function (e) {
          var t = new _;
          return t.ownerDocument = this, t.appendData(e), t
        },
        createProcessingInstruction: function (e, t) {
          var n = new D;
          return n.ownerDocument = this, n.tagName = n.target = e, n.nodeValue = n.data = t, n
        },
        createAttribute: function (e) {
          var t = new A;
          return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t
        },
        createEntityReference: function (e) {
          var t = new E;
          return t.ownerDocument = this, t.nodeName = e, t
        },
        createElementNS: function (e, t) {
          var n = new b, r = t.split(":"), o = n.attributes = new c;
          return n.childNodes = new i, n.ownerDocument = this, n.nodeName = t, n.tagName = t, n.namespaceURI = e, 2 == r.length ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, o._ownerElement = n, n
        },
        createAttributeNS: function (e, t) {
          var n = new A, r = t.split(":");
          return n.ownerDocument = this, n.nodeName = t, n.name = t, n.namespaceURI = e, n.specified = !0, 2 == r.length ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, n
        }
      }, r(m, h), b.prototype = {
        nodeType: j, hasAttribute: function (e) {
          return null != this.getAttributeNode(e)
        }, getAttribute: function (e) {
          var t = this.getAttributeNode(e);
          return t && t.value || ""
        }, getAttributeNode: function (e) {
          return this.attributes.getNamedItem(e)
        }, setAttribute: function (e, t) {
          var n = this.ownerDocument.createAttribute(e);
          n.value = n.nodeValue = "" + t, this.setAttributeNode(n)
        }, removeAttribute: function (e) {
          var t = this.getAttributeNode(e);
          t && this.removeAttributeNode(t)
        }, appendChild: function (e) {
          return e.nodeType === Q ? this.insertBefore(e, null) : function (e, t) {
            var n = t.parentNode;
            if (n) {
              var r = e.lastChild;
              n.removeChild(t);
              r = e.lastChild
            }
            r = e.lastChild;
            return t.parentNode = e, t.previousSibling = r, t.nextSibling = null, r ? r.nextSibling = t : e.firstChild = t, e.lastChild = t, v(e.ownerDocument, e, t), t
          }(this, e)
        }, setAttributeNode: function (e) {
          return this.attributes.setNamedItem(e)
        }, setAttributeNodeNS: function (e) {
          return this.attributes.setNamedItemNS(e)
        }, removeAttributeNode: function (e) {
          return this.attributes.removeNamedItem(e.nodeName)
        }, removeAttributeNS: function (e, t) {
          var n = this.getAttributeNodeNS(e, t);
          n && this.removeAttributeNode(n)
        }, hasAttributeNS: function (e, t) {
          return null != this.getAttributeNodeNS(e, t)
        }, getAttributeNS: function (e, t) {
          var n = this.getAttributeNodeNS(e, t);
          return n && n.value || ""
        }, setAttributeNS: function (e, t, n) {
          var r = this.ownerDocument.createAttributeNS(e, t);
          r.value = r.nodeValue = "" + n, this.setAttributeNode(r)
        }, getAttributeNodeNS: function (e, t) {
          return this.attributes.getNamedItemNS(e, t)
        }, getElementsByTagName: function (e) {
          return new a(this, function (t) {
            var n = [];
            return g(t, function (r) {
              r === t || r.nodeType != j || "*" !== e && r.tagName != e || n.push(r)
            }), n
          })
        }, getElementsByTagNameNS: function (e, t) {
          return new a(this, function (n) {
            var r = [];
            return g(n, function (o) {
              o === n || o.nodeType !== j || "*" !== e && o.namespaceURI !== e || "*" !== t && o.localName != t || r.push(o)
            }), r
          })
        }
      }, m.prototype.getElementsByTagName = b.prototype.getElementsByTagName, m.prototype.getElementsByTagNameNS = b.prototype.getElementsByTagNameNS, r(b, h), A.prototype.nodeType = K, r(A, h), k.prototype = {
        data: "",
        substringData: function (e, t) {
          return this.data.substring(e, e + t)
        },
        appendData: function (e) {
          e = this.data + e, this.nodeValue = this.data = e, this.length = e.length
        },
        insertData: function (e, t) {
          this.replaceData(e, 0, t)
        },
        appendChild: function (e) {
          throw new Error(J[ee])
        },
        deleteData: function (e, t) {
          this.replaceData(e, t, "")
        },
        replaceData: function (e, t, n) {
          n = this.data.substring(0, e) + n + this.data.substring(e + t), this.nodeValue = this.data = n, this.length = n.length
        }
      }, r(k, h), R.prototype = {
        nodeName: "#text", nodeType: H, splitText: function (e) {
          var t = this.data, n = t.substring(e);
          t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
          var r = this.ownerDocument.createTextNode(n);
          return this.parentNode && this.parentNode.insertBefore(r, this.nextSibling), r
        }
      }, r(R, k), T.prototype = {nodeName: "#comment", nodeType: X}, r(T, k), _.prototype = {
        nodeName: "#cdata-section",
        nodeType: V
      }, r(_, k), w.prototype.nodeType = $, r(w, h), S.prototype.nodeType = Z, r(S, h), N.prototype.nodeType = G, r(N, h), E.prototype.nodeType = q, r(E, h), B.prototype.nodeName = "#document-fragment", B.prototype.nodeType = Q, r(B, h), D.prototype.nodeType = z, r(D, h), I.prototype.serializeToString = function (e, t, n) {
        return O.call(e, t, n)
      }, h.prototype.toString = O;
      try {
        Object.defineProperty && (Object.defineProperty(a.prototype, "length", {
          get: function () {
            return s(this), this.$$length
          }
        }), Object.defineProperty(h.prototype, "textContent", {
          get: function () {
            return function e(t) {
              switch (t.nodeType) {
                case j:
                case Q:
                  var n = [];
                  for (t = t.firstChild; t;) 7 !== t.nodeType && 8 !== t.nodeType && n.push(e(t)), t = t.nextSibling;
                  return n.join("");
                default:
                  return t.nodeValue
              }
            }(this)
          }, set: function (e) {
            switch (this.nodeType) {
              case j:
              case Q:
                for (; this.firstChild;) this.removeChild(this.firstChild);
                (e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
                break;
              default:
                this.data = e, this.value = e, this.nodeValue = e
            }
          }
        }), F = function (e, t, n) {
          e["$$" + t] = n
        })
      } catch (e) {
      }
      t.DOMImplementation = f, t.XMLSerializer = I
    }, function (e, t) {
      var n = function (e) {
        var t = {}, n = function (e) {
          return !t[e] && (t[e] = []), t[e]
        };
        e.on = function (e, t) {
          n(e).push(t)
        }, e.off = function (e, t) {
          for (var r = n(e), o = r.length - 1; o >= 0; o--) t === r[o] && r.splice(o, 1)
        }, e.emit = function (e, t) {
          for (var r = n(e).map(function (e) {
            return e
          }), o = 0; o < r.length; o++) r[o](t)
        }
      };
      e.exports.init = n, e.exports.EventProxy = function () {
        n(this)
      }
    }, function (e, t, n) {
      "use strict";
      var r = n(0), o = n(2), i = n(17), a = n(16), s = n(14), c = {
        SecretId: "",
        SecretKey: "",
        FileParallelLimit: 3,
        ChunkParallelLimit: 3,
        ChunkSize: 1048576,
        ProgressInterval: 1e3,
        Domain: "",
        ServiceDomain: "",
        Protocol: ""
      }, u = function (e) {
        this.options = r.extend(r.clone(c), e || {}), o.init(this), i.init(this)
      };
      r.extend(u.prototype, a), r.extend(u.prototype, s), u.getAuthorization = r.getAuth, u.version = "0.6.0", e.exports = u
    }, function (e, t, n) {
      var r = n(3);
      e.exports = r
    }, function (e, t) {
      var n = function (e) {
        var t = (e = e || {}).Base64, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            r = function (e) {
              for (var t = {}, n = 0, r = e.length; n < r; n++) t[e.charAt(n)] = n;
              return t
            }(n), o = String.fromCharCode, i = function (e) {
              if (e.length < 2) return (t = e.charCodeAt(0)) < 128 ? e : t < 2048 ? o(192 | t >>> 6) + o(128 | 63 & t) : o(224 | t >>> 12 & 15) + o(128 | t >>> 6 & 63) + o(128 | 63 & t);
              var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
              return o(240 | t >>> 18 & 7) + o(128 | t >>> 12 & 63) + o(128 | t >>> 6 & 63) + o(128 | 63 & t)
            }, a = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, s = function (e) {
              return e.replace(a, i)
            }, c = function (e) {
              var t = [0, 2, 1][e.length % 3],
                  r = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
              return [n.charAt(r >>> 18), n.charAt(r >>> 12 & 63), t >= 2 ? "=" : n.charAt(r >>> 6 & 63), t >= 1 ? "=" : n.charAt(63 & r)].join("")
            }, u = e.btoa ? function (t) {
              return e.btoa(t)
            } : function (e) {
              return e.replace(/[\s\S]{1,3}/g, c)
            }, l = function (e) {
              return u(s(e))
            }, d = function (e, t) {
              return t ? l(String(e)).replace(/[+\/]/g, function (e) {
                return "+" == e ? "-" : "_"
              }).replace(/=/g, "") : l(String(e))
            }, f = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"), h = function (e) {
              switch (e.length) {
                case 4:
                  var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
                  return o(55296 + (t >>> 10)) + o(56320 + (1023 & t));
                case 3:
                  return o((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
                default:
                  return o((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
              }
            }, p = function (e) {
              return e.replace(f, h)
            }, g = function (e) {
              var t = e.length, n = t % 4,
                  i = (t > 0 ? r[e.charAt(0)] << 18 : 0) | (t > 1 ? r[e.charAt(1)] << 12 : 0) | (t > 2 ? r[e.charAt(2)] << 6 : 0) | (t > 3 ? r[e.charAt(3)] : 0),
                  a = [o(i >>> 16), o(i >>> 8 & 255), o(255 & i)];
              return a.length -= [0, 0, 2, 1][n], a.join("")
            }, m = e.atob ? function (t) {
              return e.atob(t)
            } : function (e) {
              return e.replace(/[\s\S]{1,4}/g, g)
            }, y = function (e) {
              return function (e) {
                return p(m(e))
              }(String(e).replace(/[-_]/g, function (e) {
                return "-" == e ? "+" : "/"
              }).replace(/[^A-Za-z0-9\+\/]/g, ""))
            };
        return {
          VERSION: "2.1.9",
          atob: m,
          btoa: u,
          fromBase64: y,
          toBase64: d,
          utob: s,
          encode: d,
          encodeURI: function (e) {
            return d(e, !0)
          },
          btou: p,
          decode: y,
          noConflict: function () {
            var n = e.Base64;
            return e.Base64 = t, n
          }
        }
      }();
      e.exports = n
    }, function (e, t) {
      var n = n || function (e, t) {
        var n = {}, r = n.lib = {}, o = function () {
        }, i = r.Base = {
          extend: function (e) {
            o.prototype = this;
            var t = new o;
            return e && t.mixIn(e), t.hasOwnProperty("init") || (t.init = function () {
              t.$super.init.apply(this, arguments)
            }), t.init.prototype = t, t.$super = this, t
          }, create: function () {
            var e = this.extend();
            return e.init.apply(e, arguments), e
          }, init: function () {
          }, mixIn: function (e) {
            for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
            e.hasOwnProperty("toString") && (this.toString = e.toString)
          }, clone: function () {
            return this.init.prototype.extend(this)
          }
        }, a = r.WordArray = i.extend({
          init: function (e, t) {
            e = this.words = e || [], this.sigBytes = void 0 != t ? t : 4 * e.length
          }, toString: function (e) {
            return (e || c).stringify(this)
          }, concat: function (e) {
            var t = this.words, n = e.words, r = this.sigBytes;
            if (e = e.sigBytes, this.clamp(), r % 4) for (var o = 0; o < e; o++) t[r + o >>> 2] |= (n[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 24 - (r + o) % 4 * 8; else if (65535 < n.length) for (o = 0; o < e; o += 4) t[r + o >>> 2] = n[o >>> 2]; else t.push.apply(t, n);
            return this.sigBytes += e, this
          }, clamp: function () {
            var t = this.words, n = this.sigBytes;
            t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4)
          }, clone: function () {
            var e = i.clone.call(this);
            return e.words = this.words.slice(0), e
          }, random: function (t) {
            for (var n = [], r = 0; r < t; r += 4) n.push(4294967296 * e.random() | 0);
            return new a.init(n, t)
          }
        }), s = n.enc = {}, c = s.Hex = {
          stringify: function (e) {
            var t = e.words;
            e = e.sigBytes;
            for (var n = [], r = 0; r < e; r++) {
              var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;
              n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16))
            }
            return n.join("")
          }, parse: function (e) {
            for (var t = e.length, n = [], r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
            return new a.init(n, t / 2)
          }
        }, u = s.Latin1 = {
          stringify: function (e) {
            var t = e.words;
            e = e.sigBytes;
            for (var n = [], r = 0; r < e; r++) n.push(String.fromCharCode(t[r >>> 2] >>> 24 - r % 4 * 8 & 255));
            return n.join("")
          }, parse: function (e) {
            for (var t = e.length, n = [], r = 0; r < t; r++) n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
            return new a.init(n, t)
          }
        }, l = s.Utf8 = {
          stringify: function (e) {
            try {
              return decodeURIComponent(escape(u.stringify(e)))
            } catch (e) {
              throw Error("Malformed UTF-8 data")
            }
          }, parse: function (e) {
            return u.parse(unescape(encodeURIComponent(e)))
          }
        }, d = r.BufferedBlockAlgorithm = i.extend({
          reset: function () {
            this._data = new a.init, this._nDataBytes = 0
          }, _append: function (e) {
            "string" == typeof e && (e = l.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
          }, _process: function (t) {
            var n = this._data, r = n.words, o = n.sigBytes, i = this.blockSize, s = o / (4 * i);
            if (t = (s = t ? e.ceil(s) : e.max((0 | s) - this._minBufferSize, 0)) * i, o = e.min(4 * t, o), t) {
              for (var c = 0; c < t; c += i) this._doProcessBlock(r, c);
              c = r.splice(0, t), n.sigBytes -= o
            }
            return new a.init(c, o)
          }, clone: function () {
            var e = i.clone.call(this);
            return e._data = this._data.clone(), e
          }, _minBufferSize: 0
        });
        r.Hasher = d.extend({
          cfg: i.extend(), init: function (e) {
            this.cfg = this.cfg.extend(e), this.reset()
          }, reset: function () {
            d.reset.call(this), this._doReset()
          }, update: function (e) {
            return this._append(e), this._process(), this
          }, finalize: function (e) {
            return e && this._append(e), this._doFinalize()
          }, blockSize: 16, _createHelper: function (e) {
            return function (t, n) {
              return new e.init(n).finalize(t)
            }
          }, _createHmacHelper: function (e) {
            return function (t, n) {
              return new f.HMAC.init(e, n).finalize(t)
            }
          }
        });
        var f = n.algo = {};
        return n
      }(Math);
      !function () {
        var e = n, t = (i = e.lib).WordArray, r = i.Hasher, o = [], i = e.algo.SHA1 = r.extend({
          _doReset: function () {
            this._hash = new t.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
          }, _doProcessBlock: function (e, t) {
            for (var n = this._hash.words, r = n[0], i = n[1], a = n[2], s = n[3], c = n[4], u = 0; 80 > u; u++) {
              if (16 > u) o[u] = 0 | e[t + u]; else {
                var l = o[u - 3] ^ o[u - 8] ^ o[u - 14] ^ o[u - 16];
                o[u] = l << 1 | l >>> 31
              }
              l = (r << 5 | r >>> 27) + c + o[u], l = 20 > u ? l + (1518500249 + (i & a | ~i & s)) : 40 > u ? l + (1859775393 + (i ^ a ^ s)) : 60 > u ? l + ((i & a | i & s | a & s) - 1894007588) : l + ((i ^ a ^ s) - 899497514), c = s, s = a, a = i << 30 | i >>> 2, i = r, r = l
            }
            n[0] = n[0] + r | 0, n[1] = n[1] + i | 0, n[2] = n[2] + a | 0, n[3] = n[3] + s | 0, n[4] = n[4] + c | 0
          }, _doFinalize: function () {
            var e = this._data, t = e.words, n = 8 * this._nDataBytes, r = 8 * e.sigBytes;
            return t[r >>> 5] |= 128 << 24 - r % 32, t[14 + (r + 64 >>> 9 << 4)] = Math.floor(n / 4294967296), t[15 + (r + 64 >>> 9 << 4)] = n, e.sigBytes = 4 * t.length, this._process(), this._hash
          }, clone: function () {
            var e = r.clone.call(this);
            return e._hash = this._hash.clone(), e
          }
        });
        e.SHA1 = r._createHelper(i), e.HmacSHA1 = r._createHmacHelper(i)
      }(), function () {
        var e = n, t = e.enc.Utf8;
        e.algo.HMAC = e.lib.Base.extend({
          init: function (e, n) {
            e = this._hasher = new e.init, "string" == typeof n && (n = t.parse(n));
            var r = e.blockSize, o = 4 * r;
            n.sigBytes > o && (n = e.finalize(n)), n.clamp();
            for (var i = this._oKey = n.clone(), a = this._iKey = n.clone(), s = i.words, c = a.words, u = 0; u < r; u++) s[u] ^= 1549556828, c[u] ^= 909522486;
            i.sigBytes = a.sigBytes = o, this.reset()
          }, reset: function () {
            var e = this._hasher;
            e.reset(), e.update(this._iKey)
          }, update: function (e) {
            return this._hasher.update(e), this
          }, finalize: function (e) {
            var t = this._hasher;
            return e = t.finalize(e), t.reset(), t.finalize(this._oKey.clone().concat(e))
          }
        })
      }(), function () {
        var e = n, t = e.lib.WordArray;
        e.enc.Base64 = {
          stringify: function (e) {
            var t = e.words, n = e.sigBytes, r = this._map;
            e.clamp();
            for (var o = [], i = 0; i < n; i += 3) for (var a = (t[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 16 | (t[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255) << 8 | t[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255, s = 0; s < 4 && i + .75 * s < n; s++) o.push(r.charAt(a >>> 6 * (3 - s) & 63));
            var c = r.charAt(64);
            if (c) for (; o.length % 4;) o.push(c);
            return o.join("")
          }, parse: function (e) {
            var n = e.length, r = this._map, o = r.charAt(64);
            if (o) {
              var i = e.indexOf(o);
              -1 != i && (n = i)
            }
            for (var a = [], s = 0, c = 0; c < n; c++) if (c % 4) {
              var u = r.indexOf(e.charAt(c - 1)) << c % 4 * 2, l = r.indexOf(e.charAt(c)) >>> 6 - c % 4 * 2;
              a[s >>> 2] |= (u | l) << 24 - s % 4 * 8, s++
            }
            return t.create(a, s)
          }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        }
      }(), e.exports = n
    }, function (e, t) {
      function n(e) {
        return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(o, "")
      }

      var r = new RegExp("^([^a-zA-Z_À-ÖØ-öø-ÿͰ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿿、-퟿豈-﷏ﷰ-�])|^((x|X)(m|M)(l|L))|([^a-zA-Z_À-ÖØ-öø-ÿͰ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿿、-퟿豈-﷏ﷰ-�-.0-9·̀-ͯ‿⁀])", "g"),
          o = /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, i = function (e) {
            var t = [];
            if (e instanceof Object) for (var n in e) e.hasOwnProperty(n) && t.push(n);
            return t
          }, a = function (e, t) {
            var o = function (e, n, o, i, a) {
              var s = void 0 !== t.indent ? t.indent : "\t", c = t.prettyPrint ? "\n" + new Array(i).join(s) : "";
              t.removeIllegalNameCharacters && (e = e.replace(r, "_"));
              var u = [c, "<", e, o || ""];
              return n && n.length > 0 ? (u.push(">"), u.push(n), a && u.push(c), u.push("</"), u.push(e), u.push(">")) : u.push("/>"), u.join("")
            };
            return function e(r, a, s) {
              var c = typeof r;
              switch ((Array.isArray ? Array.isArray(r) : r instanceof Array) ? c = "array" : r instanceof Date && (c = "date"), c) {
                case"array":
                  var u = [];
                  return r.map(function (t) {
                    u.push(e(t, 0, s + 1))
                  }), t.prettyPrint && u.push("\n"), u.join("");
                case"date":
                  return r.toJSON ? r.toJSON() : r + "";
                case"object":
                  var l = [];
                  for (var d in r) if (r[d] instanceof Array) for (var f in r[d]) l.push(o(d, e(r[d][f], 0, s + 1), null, s + 1, i(r[d][f]).length)); else l.push(o(d, e(r[d], 0, s + 1), null, s + 1));
                  return t.prettyPrint && l.length > 0 && l.push("\n"), l.join("");
                case"function":
                  return r();
                default:
                  return t.escape ? n(r) : "" + r
              }
            }(e, 0, 0)
          }, s = function (e) {
            var t = ['<?xml version="1.0" encoding="UTF-8"'];
            return e && t.push(' standalone="yes"'), t.push("?>"), t.join("")
          };
      e.exports = function (e, t) {
        if (t || (t = {xmlHeader: {standalone: !0}, prettyPrint: !0, indent: "  "}), "string" == typeof e) try {
          e = JSON.parse(e.toString())
        } catch (e) {
          return !1
        }
        var n = "", r = "";
        return t && ("object" == typeof t ? (t.xmlHeader && (n = s(!!t.xmlHeader.standalone)), void 0 !== t.docType && (r = "<!DOCTYPE " + t.docType + ">")) : n = s()), [n, (t = t || {}).prettyPrint && r ? "\n" : "", r, a(e, t)].join("").replace(/\n{2,}/g, "\n").replace(/\s+$/g, "")
      }
    }, function (e, t) {
      e.exports = function (e) {
        function t(e, t) {
          return e << t | e >>> 32 - t
        }

        function n(e, t) {
          var n, r, o, i, a;
          return o = 2147483648 & e, i = 2147483648 & t, a = (1073741823 & e) + (1073741823 & t), (n = 1073741824 & e) & (r = 1073741824 & t) ? 2147483648 ^ a ^ o ^ i : n | r ? 1073741824 & a ? 3221225472 ^ a ^ o ^ i : 1073741824 ^ a ^ o ^ i : a ^ o ^ i
        }

        function r(e, r, o, i, a, s, c) {
          return n(t(e = n(e, n(n(r & o | ~r & i, a), c)), s), r)
        }

        function o(e, r, o, i, a, s, c) {
          return n(t(e = n(e, n(n(r & i | o & ~i, a), c)), s), r)
        }

        function i(e, r, o, i, a, s, c) {
          return n(t(e = n(e, n(n(r ^ o ^ i, a), c)), s), r)
        }

        function a(e, r, o, i, a, s, c) {
          return n(t(e = n(e, n(n(o ^ (r | ~i), a), c)), s), r)
        }

        function s(e) {
          var t, n = "", r = "";
          for (t = 0; t <= 3; t++) n += (r = "0" + (e >>> 8 * t & 255).toString(16)).substr(r.length - 2, 2);
          return n
        }

        var c, u, l, d, f, h, p, g, m, y = Array();
        for (y = function (e) {
          for (var t, n = e.length, r = n + 8, o = 16 * ((r - r % 64) / 64 + 1), i = Array(o - 1), a = 0, s = 0; s < n;) a = s % 4 * 8, i[t = (s - s % 4) / 4] = i[t] | e.charCodeAt(s) << a, s++;
          return a = s % 4 * 8, i[t = (s - s % 4) / 4] = i[t] | 128 << a, i[o - 2] = n << 3, i[o - 1] = n >>> 29, i
        }(e = function (e) {
          e = e.replace(/\r\n/g, "\n");
          for (var t = "", n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            r < 128 ? t += String.fromCharCode(r) : r > 127 && r < 2048 ? (t += String.fromCharCode(r >> 6 | 192), t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128), t += String.fromCharCode(63 & r | 128))
          }
          return t
        }(e)), h = 1732584193, p = 4023233417, g = 2562383102, m = 271733878, c = 0; c < y.length; c += 16) u = h, l = p, d = g, f = m, p = a(p = a(p = a(p = a(p = i(p = i(p = i(p = i(p = o(p = o(p = o(p = o(p = r(p = r(p = r(p = r(p, g = r(g, m = r(m, h = r(h, p, g, m, y[c + 0], 7, 3614090360), p, g, y[c + 1], 12, 3905402710), h, p, y[c + 2], 17, 606105819), m, h, y[c + 3], 22, 3250441966), g = r(g, m = r(m, h = r(h, p, g, m, y[c + 4], 7, 4118548399), p, g, y[c + 5], 12, 1200080426), h, p, y[c + 6], 17, 2821735955), m, h, y[c + 7], 22, 4249261313), g = r(g, m = r(m, h = r(h, p, g, m, y[c + 8], 7, 1770035416), p, g, y[c + 9], 12, 2336552879), h, p, y[c + 10], 17, 4294925233), m, h, y[c + 11], 22, 2304563134), g = r(g, m = r(m, h = r(h, p, g, m, y[c + 12], 7, 1804603682), p, g, y[c + 13], 12, 4254626195), h, p, y[c + 14], 17, 2792965006), m, h, y[c + 15], 22, 1236535329), g = o(g, m = o(m, h = o(h, p, g, m, y[c + 1], 5, 4129170786), p, g, y[c + 6], 9, 3225465664), h, p, y[c + 11], 14, 643717713), m, h, y[c + 0], 20, 3921069994), g = o(g, m = o(m, h = o(h, p, g, m, y[c + 5], 5, 3593408605), p, g, y[c + 10], 9, 38016083), h, p, y[c + 15], 14, 3634488961), m, h, y[c + 4], 20, 3889429448), g = o(g, m = o(m, h = o(h, p, g, m, y[c + 9], 5, 568446438), p, g, y[c + 14], 9, 3275163606), h, p, y[c + 3], 14, 4107603335), m, h, y[c + 8], 20, 1163531501), g = o(g, m = o(m, h = o(h, p, g, m, y[c + 13], 5, 2850285829), p, g, y[c + 2], 9, 4243563512), h, p, y[c + 7], 14, 1735328473), m, h, y[c + 12], 20, 2368359562), g = i(g, m = i(m, h = i(h, p, g, m, y[c + 5], 4, 4294588738), p, g, y[c + 8], 11, 2272392833), h, p, y[c + 11], 16, 1839030562), m, h, y[c + 14], 23, 4259657740), g = i(g, m = i(m, h = i(h, p, g, m, y[c + 1], 4, 2763975236), p, g, y[c + 4], 11, 1272893353), h, p, y[c + 7], 16, 4139469664), m, h, y[c + 10], 23, 3200236656), g = i(g, m = i(m, h = i(h, p, g, m, y[c + 13], 4, 681279174), p, g, y[c + 0], 11, 3936430074), h, p, y[c + 3], 16, 3572445317), m, h, y[c + 6], 23, 76029189), g = i(g, m = i(m, h = i(h, p, g, m, y[c + 9], 4, 3654602809), p, g, y[c + 12], 11, 3873151461), h, p, y[c + 15], 16, 530742520), m, h, y[c + 2], 23, 3299628645), g = a(g, m = a(m, h = a(h, p, g, m, y[c + 0], 6, 4096336452), p, g, y[c + 7], 10, 1126891415), h, p, y[c + 14], 15, 2878612391), m, h, y[c + 5], 21, 4237533241), g = a(g, m = a(m, h = a(h, p, g, m, y[c + 12], 6, 1700485571), p, g, y[c + 3], 10, 2399980690), h, p, y[c + 10], 15, 4293915773), m, h, y[c + 1], 21, 2240044497), g = a(g, m = a(m, h = a(h, p, g, m, y[c + 8], 6, 1873313359), p, g, y[c + 15], 10, 4264355552), h, p, y[c + 6], 15, 2734768916), m, h, y[c + 13], 21, 1309151649), g = a(g, m = a(m, h = a(h, p, g, m, y[c + 4], 6, 4149444226), p, g, y[c + 11], 10, 3174756917), h, p, y[c + 2], 15, 718787259), m, h, y[c + 9], 21, 3951481745), h = n(h, u), p = n(p, l), g = n(g, d), m = n(m, f);
        return (s(h) + s(p) + s(g) + s(m)).toLowerCase()
      }
    }, function (e, t) {
      e.exports = function (e, t) {
        var n, r = e.filePath, o = e.headers || {}, i = e.url, a = e.method, s = e.onProgress, c = function (e, n) {
          t(e, {statusCode: n.statusCode, headers: n.header}, n.data)
        };
        if (r) {
          var u = i.match(/^(https?:\/\/[^\/]+\/)(.*)$/),
              l = (h = decodeURIComponent(u[2] || "")).substring(0, h.indexOf("/"));
          h = h.substring(h.indexOf("/") + 1), i = u[1];
          var d = {key: h, success_action_status: 200, Signature: o.Authorization},
              f = ["Cache-Control", "Content-Type", "Content-Disposition", "Content-Encoding", "Expires", "x-cos-storage-class", "x-cos-security-token"];
          for (var h in e.headers) e.headers.hasOwnProperty(h) && (h.indexOf("x-cos-meta-") > -1 || f.indexOf(h) > -1) && (d[h] = e.headers[h]);
          console.log(i)
          console.log(a)
          console.log(r)
          console.log(d)
          console.log(l)
          o["x-cos-acl"] && (d.acl = o["x-cos-acl"]), !d["Content-Type"] && (d["Content-Type"] = ""), (n = uni.uploadFile({
            url: i,
            method: a,
            name: "file",
            filePath: r,
            formData: d,
            header: {"Vod-Forward-Cos": l},
            success: function (e) {
              console.log(JSON.stringify(e))

              c(null, e)
            },
            fail: function (e) {
              console.log(JSON.stringify(e))
              c(e.errMsg, e)
            }
          })).onProgressUpdate(function (e) {
            s({loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend, progress: e.progress / 100})
          })
        } else {
          var p = e.qs && function (e) {
            var t, n, r, o = [], i = Object.keys(e);
            for (t = 0; t < i.length; t++) r = e[n = i[t]] || "", o.push(n + "=" + encodeURIComponent(r));
            return o.join("&")
          }(e.qs) || "";
          p && (i += (i.indexOf("?") > -1 ? "&" : "?") + p), o["Content-Length"] && delete o["Content-Length"], uni.request({
            url: i,
            method: a,
            header: o,
            dataType: "text",
            data: e.body,
            success: function (e) {
              c(null, e)
            },
            fail: function (e) {
              c(e.errMsg, e)
            }
          })
        }
        return n
      }
    }, function (e, t, n) {
      var r = n(12).DOMParser;
      e.exports = function (e) {
        if (!e) return null;
        var t = (new r).parseFromString(e, "text/xml"), n = (new function (e) {
          "use strict";

          function t(e) {
            var t = e.localName;
            return null == t && (t = e.baseName), null != t && "" != t || (t = e.nodeName), t
          }

          function n(e) {
            return "string" == typeof e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;") : e
          }

          function o(e, t, n, r) {
            for (var o = 0; o < e.length; o++) {
              var i = e[o];
              if ("string" == typeof i) {
                if (i == r) break
              } else if (i instanceof RegExp) {
                if (i.test(r)) break
              } else if ("function" == typeof i && i(t, n, r)) break
            }
            return o != e.length
          }

          function i(t, n, r) {
            switch (e.arrayAccessForm) {
              case"property":
                t[n] instanceof Array ? t[n + "_asArray"] = t[n] : t[n + "_asArray"] = [t[n]]
            }
            !(t[n] instanceof Array) && e.arrayAccessFormPaths.length > 0 && o(e.arrayAccessFormPaths, t, n, r) && (t[n] = [t[n]])
          }

          function a(e) {
            var t = e.split(/[-T:+Z]/g), n = new Date(t[0], t[1] - 1, t[2]), r = t[5].split(".");
            if (n.setHours(t[3], t[4], r[0]), r.length > 1 && n.setMilliseconds(r[1]), t[6] && t[7]) {
              var o = 60 * t[6] + Number(t[7]);
              o = 0 + ("-" == (/\d\d-\d\d:\d\d$/.test(e) ? "-" : "+") ? -1 * o : o), n.setMinutes(n.getMinutes() - o - n.getTimezoneOffset())
            } else -1 !== e.indexOf("Z", e.length - 1) && (n = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds())));
            return n
          }

          function s(t, n, r) {
            if (e.datetimeAccessFormPaths.length > 0) {
              var i = r.split(".#")[0];
              return o(e.datetimeAccessFormPaths, t, n, i) ? a(t) : t
            }
            return t
          }

          function c(t, n, r, i) {
            return !(n == x.ELEMENT_NODE && e.xmlElementsFilter.length > 0) || o(e.xmlElementsFilter, t, r, i)
          }

          function u(n, r) {
            if (n.nodeType == x.DOCUMENT_NODE) {
              for (var o = new Object, a = n.childNodes, l = 0; l < a.length; l++) (d = a.item(l)).nodeType == x.ELEMENT_NODE && (o[f = t(d)] = u(d, f));
              return o
            }
            if (n.nodeType == x.ELEMENT_NODE) {
              for ((o = new Object).__cnt = 0, a = n.childNodes, l = 0; l < a.length; l++) {
                var d, f = t(d = a.item(l));
                if (d.nodeType != x.COMMENT_NODE) {
                  var h = r + "." + f;
                  c(o, d.nodeType, f, h) && (o.__cnt++, null == o[f] ? (o[f] = u(d, h), i(o, f, h)) : (null != o[f] && (o[f] instanceof Array || (o[f] = [o[f]], i(o, f, h))), o[f][o[f].length] = u(d, h)))
                }
              }
              for (var p = 0; p < n.attributes.length; p++) {
                var g = n.attributes.item(p);
                o.__cnt++, o[e.attributePrefix + g.name] = g.value
              }
              var m = n.prefix;
              return null != m && "" != m && (o.__cnt++, o.__prefix = m), null != o["#text"] && (o.__text = o["#text"], o.__text instanceof Array && (o.__text = o.__text.join("\n")), e.stripWhitespaces && (o.__text = o.__text.trim()), delete o["#text"], "property" == e.arrayAccessForm && delete o["#text_asArray"], o.__text = s(o.__text, f, r + "." + f)), null != o["#cdata-section"] && (o.__cdata = o["#cdata-section"], delete o["#cdata-section"], "property" == e.arrayAccessForm && delete o["#cdata-section_asArray"]), 0 == o.__cnt && "text" == e.emptyNodeForm ? o = "" : 1 == o.__cnt && null != o.__text ? o = o.__text : 1 != o.__cnt || null == o.__cdata || e.keepCData ? o.__cnt > 1 && null != o.__text && e.skipEmptyTextNodesForObj && (e.stripWhitespaces && "" == o.__text || "" == o.__text.trim()) && delete o.__text : o = o.__cdata, delete o.__cnt, !e.enableToStringFunc || null == o.__text && null == o.__cdata || (o.toString = function () {
                return (null != this.__text ? this.__text : "") + (null != this.__cdata ? this.__cdata : "")
              }), o
            }
            if (n.nodeType == x.TEXT_NODE || n.nodeType == x.CDATA_SECTION_NODE) return n.nodeValue
          }

          function l(t, r, o, i) {
            var a = "<" + (null != t && null != t.__prefix ? t.__prefix + ":" : "") + r;
            if (null != o) for (var s = 0; s < o.length; s++) {
              var c = o[s], u = t[c];
              e.escapeMode && (u = n(u)), a += " " + c.substr(e.attributePrefix.length) + "=", e.useDoubleQuotes ? a += '"' + u + '"' : a += "'" + u + "'"
            }
            return a + (i ? "/>" : ">")
          }

          function d(e, t) {
            return "</" + (null != e.__prefix ? e.__prefix + ":" : "") + t + ">"
          }

          function f(t, n) {
            return !!("property" == e.arrayAccessForm && function (e, t) {
              return -1 !== e.indexOf(t, e.length - t.length)
            }(n.toString(), "_asArray") || 0 == n.toString().indexOf(e.attributePrefix) || 0 == n.toString().indexOf("__") || t[n] instanceof Function)
          }

          function h(e) {
            var t = 0;
            if (e instanceof Object) for (var n in e) f(e, n) || t++;
            return t
          }

          function p(t, n, r) {
            return 0 == e.jsonPropertiesFilter.length || "" == r || o(e.jsonPropertiesFilter, t, n, r)
          }

          function g(t) {
            var n = [];
            if (t instanceof Object) for (var r in t) -1 == r.toString().indexOf("__") && 0 == r.toString().indexOf(e.attributePrefix) && n.push(r);
            return n
          }

          function m(t) {
            var r = "";
            return t instanceof Object ? r += function (t) {
              var r = "";
              return null != t.__cdata && (r += "<![CDATA[" + t.__cdata + "]]>"), null != t.__text && (e.escapeMode ? r += n(t.__text) : r += t.__text), r
            }(t) : null != t && (e.escapeMode ? r += n(t) : r += t), r
          }

          function y(e, t) {
            return "" === e ? t : e + "." + t
          }

          function v(e, t, n, r) {
            var o = "";
            if (0 == e.length) o += l(e, t, n, !0); else for (var i = 0; i < e.length; i++) o += l(e[i], t, g(e[i]), !1), o += C(e[i], y(r, t)), o += d(e[i], t);
            return o
          }

          function C(e, t) {
            var n = "";
            if (h(e) > 0) for (var r in e) if (!f(e, r) && ("" == t || p(e, r, y(t, r)))) {
              var o = e[r], i = g(o);
              null == o || void 0 == o ? n += l(o, r, i, !0) : o instanceof Object ? o instanceof Array ? n += v(o, r, i, t) : o instanceof Date ? (n += l(o, r, i, !1), n += o.toISOString(), n += d(o, r)) : h(o) > 0 || null != o.__text || null != o.__cdata ? (n += l(o, r, i, !1), n += C(o, y(t, r)), n += d(o, r)) : n += l(o, r, i, !0) : (n += l(o, r, i, !1), n += m(o), n += d(o, r))
            }
            return n + m(e)
          }

          void 0 === (e = e || {}).escapeMode && (e.escapeMode = !0), e.attributePrefix = e.attributePrefix || "_", e.arrayAccessForm = e.arrayAccessForm || "none", e.emptyNodeForm = e.emptyNodeForm || "text", void 0 === e.enableToStringFunc && (e.enableToStringFunc = !0), e.arrayAccessFormPaths = e.arrayAccessFormPaths || [], void 0 === e.skipEmptyTextNodesForObj && (e.skipEmptyTextNodesForObj = !0), void 0 === e.stripWhitespaces && (e.stripWhitespaces = !0), e.datetimeAccessFormPaths = e.datetimeAccessFormPaths || [], void 0 === e.useDoubleQuotes && (e.useDoubleQuotes = !1), e.xmlElementsFilter = e.xmlElementsFilter || [], e.jsonPropertiesFilter = e.jsonPropertiesFilter || [], void 0 === e.keepCData && (e.keepCData = !1);
          var x = {ELEMENT_NODE: 1, TEXT_NODE: 3, CDATA_SECTION_NODE: 4, COMMENT_NODE: 8, DOCUMENT_NODE: 9};
          this.parseXmlString = function (e) {
            if (void 0 === e) return null;
            var t;
            if (r) {
              var n = new r, o = null;
              try {
                o = n.parseFromString("INVALID", "text/xml").getElementsByTagName("parsererror")[0].namespaceURI
              } catch (e) {
                o = null
              }
              try {
                t = n.parseFromString(e, "text/xml"), null != o && t.getElementsByTagNameNS(o, "parsererror").length > 0 && (t = null)
              } catch (e) {
                t = null
              }
            } else 0 == e.indexOf("<?") && (e = e.substr(e.indexOf("?>") + 2)), (t = new ActiveXObject("Microsoft.XMLDOM")).async = "false", t.loadXML(e);
            return t
          }, this.asArray = function (e) {
            return void 0 === e || null == e ? [] : e instanceof Array ? e : [e]
          }, this.toXmlDateTime = function (e) {
            return e instanceof Date ? e.toISOString() : "number" == typeof e ? new Date(e).toISOString() : null
          }, this.asDateTime = function (e) {
            return "string" == typeof e ? a(e) : e
          }, this.xml2json = function (e) {
            return u(e)
          }, this.xml_str2json = function (e) {
            var t = this.parseXmlString(e);
            return null != t ? this.xml2json(t) : null
          }, this.json2xml_str = function (e) {
            return C(e, "")
          }, this.json2xml = function (e) {
            var t = this.json2xml_str(e);
            return this.parseXmlString(t)
          }, this.getVersion = function () {
            return "1.2.0"
          }
        }).xml2json(t);
        return n.html && n.getElementsByTagName("parsererror").length ? null : n
      }
    }, function (e, t) {
      var n;
      n = function () {
        return this
      }();
      try {
        n = n || Function("return this")() || (0, eval)("this")
      } catch (e) {
        "object" == typeof window && (n = window)
      }
      e.exports = n
    }, function (e, t, n) {
      function r(e) {
        this.options = e || {locator: {}}
      }

      function o(e, t, n) {
        function r(t) {
          var r = e[t];
          !r && a && (r = 2 == e.length ? function (n) {
            e(t, n)
          } : e), o[t] = r && function (e) {
            r("[xmldom " + t + "]\t" + e + s(n))
          } || function () {
          }
        }

        if (!e) {
          if (t instanceof i) return t;
          e = t
        }
        var o = {}, a = e instanceof Function;
        return n = n || {}, r("warning"), r("error"), r("fatalError"), o
      }

      function i() {
        this.cdata = !1
      }

      function a(e, t) {
        t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber
      }

      function s(e) {
        if (e) return "\n@" + (e.systemId || "") + "#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]"
      }

      function c(e, t, n) {
        return "string" == typeof e ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e, t, n) + "" : e
      }

      function u(e, t) {
        e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t)
      }

      r.prototype.parseFromString = function (e, t) {
        var n = this.options, r = new l, a = n.domBuilder || new i, s = n.errorHandler, c = n.locator,
            u = n.xmlns || {}, d = {lt: "<", gt: ">", amp: "&", quot: '"', apos: "'"};
        return c && a.setDocumentLocator(c), r.errorHandler = o(s, a, c), r.domBuilder = n.domBuilder || a, /\/x?html?$/.test(t) && (d.nbsp = " ", d.copy = "©", u[""] = "http://www.w3.org/1999/xhtml"), u.xml = u.xml || "http://www.w3.org/XML/1998/namespace", e ? r.parse(e, u, d) : r.errorHandler.error("invalid doc source"), a.doc
      }, i.prototype = {
        startDocument: function () {
          this.doc = (new d).createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId)
        }, startElement: function (e, t, n, r) {
          var o = this.doc, i = o.createElementNS(e, n || t), s = r.length;
          u(this, i), this.currentElement = i, this.locator && a(this.locator, i);
          for (var c = 0; c < s; c++) {
            e = r.getURI(c);
            var l = r.getValue(c), d = (n = r.getQName(c), o.createAttributeNS(e, n));
            this.locator && a(r.getLocator(c), d), d.value = d.nodeValue = l, i.setAttributeNode(d)
          }
        }, endElement: function (e, t, n) {
          var r = this.currentElement;
          r.tagName, this.currentElement = r.parentNode
        }, startPrefixMapping: function (e, t) {
        }, endPrefixMapping: function (e) {
        }, processingInstruction: function (e, t) {
          var n = this.doc.createProcessingInstruction(e, t);
          this.locator && a(this.locator, n), u(this, n)
        }, ignorableWhitespace: function (e, t, n) {
        }, characters: function (e, t, n) {
          if (e = c.apply(this, arguments)) {
            if (this.cdata) var r = this.doc.createCDATASection(e); else r = this.doc.createTextNode(e);
            this.currentElement ? this.currentElement.appendChild(r) : /^\s*$/.test(e) && this.doc.appendChild(r), this.locator && a(this.locator, r)
          }
        }, skippedEntity: function (e) {
        }, endDocument: function () {
          this.doc.normalize()
        }, setDocumentLocator: function (e) {
          (this.locator = e) && (e.lineNumber = 0)
        }, comment: function (e, t, n) {
          e = c.apply(this, arguments);
          var r = this.doc.createComment(e);
          this.locator && a(this.locator, r), u(this, r)
        }, startCDATA: function () {
          this.cdata = !0
        }, endCDATA: function () {
          this.cdata = !1
        }, startDTD: function (e, t, n) {
          var r = this.doc.implementation;
          if (r && r.createDocumentType) {
            var o = r.createDocumentType(e, t, n);
            this.locator && a(this.locator, o), u(this, o)
          }
        }, warning: function (e) {
          console.warn("[xmldom warning]\t" + e, s(this.locator))
        }, error: function (e) {
          console.error("[xmldom error]\t" + e, s(this.locator))
        }, fatalError: function (e) {
          throw console.error("[xmldom fatalError]\t" + e, s(this.locator)), e
        }
      }, "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function (e) {
        i.prototype[e] = function () {
          return null
        }
      });
      var l = n(13).XMLReader, d = t.DOMImplementation = n(1).DOMImplementation;
      t.XMLSerializer = n(1).XMLSerializer, t.DOMParser = r
    }, function (e, t) {
      function n() {
      }

      function r(e, t, n, r, u) {
        function h(e) {
          var t = e.slice(1, -1);
          return t in n ? n[t] : "#" === t.charAt(0) ? function (e) {
            if (e > 65535) {
              var t = 55296 + ((e -= 65536) >> 10), n = 56320 + (1023 & e);
              return String.fromCharCode(t, n)
            }
            return String.fromCharCode(e)
          }(parseInt(t.substr(1).replace("x", "0x"))) : (u.error("entity not found:" + e), e)
        }

        function p(t) {
          if (t > A) {
            var n = e.substring(A, t).replace(/&#?\w+;/g, h);
            C && g(A), r.characters(n, 0, t - A), A = t
          }
        }

        function g(t, n) {
          for (; t >= y && (n = v.exec(e));) m = n.index, y = m + n[0].length, C.lineNumber++;
          C.columnNumber = t - m + 1
        }

        for (var m = 0, y = 0, v = /.*(?:\r\n?|\n)|.*$/g, C = r.locator, x = [{currentNSMap: t}], b = {}, A = 0; ;) {
          try {
            var k = e.indexOf("<", A);
            if (k < 0) {
              if (!e.substr(A).match(/^\s*$/)) {
                var R = r.doc, T = R.createTextNode(e.substr(A));
                R.appendChild(T), r.currentElement = T
              }
              return
            }
            switch (k > A && p(k), e.charAt(k + 1)) {
              case"/":
                var _ = e.indexOf(">", k + 3), w = e.substring(k + 2, _), S = x.pop();
                _ < 0 ? (w = e.substring(k + 2).replace(/[\s<].*/, ""), u.error("end tag name: " + w + " is not complete:" + S.tagName), _ = k + 1 + w.length) : w.match(/\s</) && (w = w.replace(/[\s<].*/, ""), u.error("end tag name: " + w + " maybe not complete"), _ = k + 1 + w.length);
                var N = S.localNSMap, E = S.tagName == w;
                if (E || S.tagName && S.tagName.toLowerCase() == w.toLowerCase()) {
                  if (r.endElement(S.uri, S.localName, w), N) for (var B in N) r.endPrefixMapping(B);
                  E || u.fatalError("end tag name: " + w + " is not match the current start tagName:" + S.tagName)
                } else x.push(S);
                _++;
                break;
              case"?":
                C && g(k), _ = d(e, k, r);
                break;
              case"!":
                C && g(k), _ = l(e, k, r, u);
                break;
              default:
                C && g(k);
                var D = new f, I = x[x.length - 1].currentNSMap, O = (_ = i(e, k, D, I, h, u), D.length);
                if (!D.closed && c(e, _, D.tagName, b) && (D.closed = !0, n.nbsp || u.warning("unclosed xml attribute")), C && O) {
                  for (var P = o(C, {}), M = 0; M < O; M++) {
                    var F = D[M];
                    g(F.offset), F.locator = o(C, {})
                  }
                  r.locator = P, a(D, r, I) && x.push(D), r.locator = C
                } else a(D, r, I) && x.push(D);
                "http://www.w3.org/1999/xhtml" !== D.uri || D.closed ? _++ : _ = s(e, _, D.tagName, h, r)
            }
          } catch (e) {
            u.error("element parse error: " + e), _ = -1
          }
          _ > A ? A = _ : p(Math.max(k, A) + 1)
        }
      }

      function o(e, t) {
        return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t
      }

      function i(e, t, n, r, o, i) {
        for (var a, s = ++t, c = y; ;) {
          var u = e.charAt(s);
          switch (u) {
            case"=":
              if (c === v) a = e.slice(t, s), c = x; else {
                if (c !== C) throw new Error("attribute equal must after attrName");
                c = x
              }
              break;
            case"'":
            case'"':
              if (c === x || c === v) {
                if (c === v && (i.warning('attribute value must after "="'), a = e.slice(t, s)), t = s + 1, !((s = e.indexOf(u, t)) > 0)) throw new Error("attribute value no end '" + u + "' match");
                l = e.slice(t, s).replace(/&#?\w+;/g, o), n.add(a, l, t - 1), c = A
              } else {
                if (c != b) throw new Error('attribute value must after "="');
                l = e.slice(t, s).replace(/&#?\w+;/g, o), n.add(a, l, t), i.warning('attribute "' + a + '" missed start quot(' + u + ")!!"), t = s + 1, c = A
              }
              break;
            case"/":
              switch (c) {
                case y:
                  n.setTagName(e.slice(t, s));
                case A:
                case k:
                case R:
                  c = R, n.closed = !0;
                case b:
                case v:
                case C:
                  break;
                default:
                  throw new Error("attribute invalid close char('/')")
              }
              break;
            case"":
              return i.error("unexpected end of input"), c == y && n.setTagName(e.slice(t, s)), s;
            case">":
              switch (c) {
                case y:
                  n.setTagName(e.slice(t, s));
                case A:
                case k:
                case R:
                  break;
                case b:
                case v:
                  "/" === (l = e.slice(t, s)).slice(-1) && (n.closed = !0, l = l.slice(0, -1));
                case C:
                  c === C && (l = a), c == b ? (i.warning('attribute "' + l + '" missed quot(")!!'), n.add(a, l.replace(/&#?\w+;/g, o), t)) : ("http://www.w3.org/1999/xhtml" === r[""] && l.match(/^(?:disabled|checked|selected)$/i) || i.warning('attribute "' + l + '" missed value!! "' + l + '" instead!!'), n.add(l, l, t));
                  break;
                case x:
                  throw new Error("attribute value missed!!")
              }
              return s;
            case"":
              u = " ";
            default:
              if (u <= " ") switch (c) {
                case y:
                  n.setTagName(e.slice(t, s)), c = k;
                  break;
                case v:
                  a = e.slice(t, s), c = C;
                  break;
                case b:
                  var l = e.slice(t, s).replace(/&#?\w+;/g, o);
                  i.warning('attribute "' + l + '" missed quot(")!!'), n.add(a, l, t);
                case A:
                  c = k
              } else switch (c) {
                case C:
                  n.tagName, "http://www.w3.org/1999/xhtml" === r[""] && a.match(/^(?:disabled|checked|selected)$/i) || i.warning('attribute "' + a + '" missed value!! "' + a + '" instead2!!'), n.add(a, a, t), t = s, c = v;
                  break;
                case A:
                  i.warning('attribute space is required"' + a + '"!!');
                case k:
                  c = v, t = s;
                  break;
                case x:
                  c = b, t = s;
                  break;
                case R:
                  throw new Error("elements closed character '/' and '>' must be connected to")
              }
          }
          s++
        }
      }

      function a(e, t, n) {
        for (var r = e.tagName, o = null, i = e.length; i--;) {
          var a = e[i], s = a.qName, c = a.value;
          if ((h = s.indexOf(":")) > 0) var l = a.prefix = s.slice(0, h), d = s.slice(h + 1),
              f = "xmlns" === l && d; else d = s, l = null, f = "xmlns" === s && "";
          a.localName = d, !1 !== f && (null == o && (o = {}, u(n, n = {})), n[f] = o[f] = c, a.uri = "http://www.w3.org/2000/xmlns/", t.startPrefixMapping(f, c))
        }
        for (i = e.length; i--;) {
          (l = (a = e[i]).prefix) && ("xml" === l && (a.uri = "http://www.w3.org/XML/1998/namespace"), "xmlns" !== l && (a.uri = n[l || ""]))
        }
        var h;
        (h = r.indexOf(":")) > 0 ? (l = e.prefix = r.slice(0, h), d = e.localName = r.slice(h + 1)) : (l = null, d = e.localName = r);
        var p = e.uri = n[l || ""];
        if (t.startElement(p, d, r, e), !e.closed) return e.currentNSMap = n, e.localNSMap = o, !0;
        if (t.endElement(p, d, r), o) for (l in o) t.endPrefixMapping(l)
      }

      function s(e, t, n, r, o) {
        if (/^(?:script|textarea)$/i.test(n)) {
          var i = e.indexOf("</" + n + ">", t), a = e.substring(t + 1, i);
          if (/[&<]/.test(a)) return /^script$/i.test(n) ? (o.characters(a, 0, a.length), i) : (a = a.replace(/&#?\w+;/g, r), o.characters(a, 0, a.length), i)
        }
        return t + 1
      }

      function c(e, t, n, r) {
        var o = r[n];
        return null == o && ((o = e.lastIndexOf("</" + n + ">")) < t && (o = e.lastIndexOf("</" + n)), r[n] = o), o < t
      }

      function u(e, t) {
        for (var n in e) t[n] = e[n]
      }

      function l(e, t, n, r) {
        switch (e.charAt(t + 2)) {
          case"-":
            return "-" === e.charAt(t + 3) ? (o = e.indexOf("--\x3e", t + 4)) > t ? (n.comment(e, t + 4, o - t - 4), o + 3) : (r.error("Unclosed comment"), -1) : -1;
          default:
            if ("CDATA[" == e.substr(t + 3, 6)) {
              var o = e.indexOf("]]>", t + 9);
              return n.startCDATA(), n.characters(e, t + 9, o - t - 9), n.endCDATA(), o + 3
            }
            var i = function (e, t) {
              var n, r = [], o = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
              for (o.lastIndex = t, o.exec(e); n = o.exec(e);) if (r.push(n), n[1]) return r
            }(e, t), a = i.length;
            if (a > 1 && /!doctype/i.test(i[0][0])) {
              var s = i[1][0], c = a > 3 && /^public$/i.test(i[2][0]) && i[3][0], u = a > 4 && i[4][0], l = i[a - 1];
              return n.startDTD(s, c && c.replace(/^(['"])(.*?)\1$/, "$2"), u && u.replace(/^(['"])(.*?)\1$/, "$2")), n.endDTD(), l.index + l[0].length
            }
        }
        return -1
      }

      function d(e, t, n) {
        var r = e.indexOf("?>", t);
        if (r) {
          var o = e.substring(t, r).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
          return o ? (o[0].length, n.processingInstruction(o[1], o[2]), r + 2) : -1
        }
        return -1
      }

      function f(e) {
      }

      function h(e, t) {
        return e.__proto__ = t, e
      }

      var p = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
          g = new RegExp("[\\-\\.0-9" + p.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"),
          m = new RegExp("^" + p.source + g.source + "*(?::" + p.source + g.source + "*)?$"), y = 0, v = 1, C = 2,
          x = 3, b = 4, A = 5, k = 6, R = 7;
      n.prototype = {
        parse: function (e, t, n) {
          var o = this.domBuilder;
          o.startDocument(), u(t, t = {}), r(e, t, n, o, this.errorHandler), o.endDocument()
        }
      }, f.prototype = {
        setTagName: function (e) {
          if (!m.test(e)) throw new Error("invalid tagName:" + e);
          this.tagName = e
        }, add: function (e, t, n) {
          if (!m.test(e)) throw new Error("invalid attribute:" + e);
          this[this.length++] = {qName: e, value: t, offset: n}
        }, length: 0, getLocalName: function (e) {
          return this[e].localName
        }, getLocator: function (e) {
          return this[e].locator
        }, getQName: function (e) {
          return this[e].qName
        }, getURI: function (e) {
          return this[e].uri
        }, getValue: function (e) {
          return this[e].value
        }
      }, h({}, h.prototype) instanceof h || (h = function (e, t) {
        function n() {
        }

        for (t in n.prototype = t, n = new n, e) n[t] = e[t];
        return n
      }), t.XMLReader = n
    }, function (e, t, n) {
      function r(e, t) {
        var n = e.Bucket, r = e.Region, o = e.Key, i = e.AbortArray, s = e.AsyncLimit || 1, c = this, u = 0,
            l = new Array(i.length);
        a.eachLimit(i, s, function (t, i) {
          var a = u;
          if (o && o != t.Key) return i(null, {KeyNotMatch: !0});
          var s = t.UploadId || t.UploadID;
          c.multipartAbort({Bucket: n, Region: r, Key: t.Key, Headers: e.Headers, UploadId: s}, function (e, o) {
            var c = {Bucket: n, Region: r, Key: t.Key, UploadId: s};
            l[a] = {error: e, task: c}, i(null)
          }), u++
        }, function (e) {
          if (e) return t(e);
          for (var n = [], r = [], o = 0, i = l.length; o < i; o++) {
            var a = l[o];
            a.task && (a.error ? r.push(a.task) : n.push(a.task))
          }
          return t(null, {successList: n, errorList: r})
        })
      }

      function o(e, t) {
        var n = this, r = [], o = {Bucket: e.Bucket, Region: e.Region, Prefix: e.Key}, i = function () {
          n.multipartList(o, function (e, n) {
            if (e) return t(e);
            r.push.apply(r, n.Upload || []), "true" == n.IsTruncated ? (o.KeyMarker = n.NextKeyMarker, o.UploadIdMarker = n.NextUploadIdMarker, i()) : t(null, {UploadList: r})
          })
        };
        i()
      }

      function i(e, t) {
        var n = e.TaskId, r = e.Bucket, o = e.Region, i = e.Key, s = e.CopySource, c = e.UploadId, u = 1 * e.PartNumber,
            l = e.CopySourceRange, d = this.options.ChunkRetryTimes, f = this;
        a.retry(d, function (t) {
          f.uploadPartCopy({
            TaskId: n,
            Bucket: r,
            Region: o,
            Key: i,
            CopySource: s,
            UploadId: c,
            PartNumber: u,
            CopySourceRange: l,
            onProgress: e.onProgress
          }, function (e, n) {
            t(e || null, n)
          })
        }, function (e, n) {
          return t(e, n)
        })
      }

      var a = n(15), s = n(2).EventProxy, c = n(0), u = {
        abortUploadTask: function (e, t) {
          var n = e.Bucket, i = e.Region, a = e.Key, c = e.UploadId, u = e.Level || "task", l = e.AsyncLimit, d = this,
              f = new s;
          if (f.on("error", function (e) {
            return t(e)
          }), f.on("get_abort_array", function (o) {
            r.call(d, {
              Bucket: n,
              Region: i,
              Key: a,
              Headers: e.Headers,
              AsyncLimit: l,
              AbortArray: o
            }, function (e, n) {
              if (e) return t(e);
              t(null, n)
            })
          }), "bucket" === u) o.call(d, {Bucket: n, Region: i}, function (e, n) {
            if (e) return t(e);
            f.emit("get_abort_array", n.UploadList || [])
          }); else if ("file" === u) {
            if (!a) return t({error: "abort_upload_task_no_key"});
            o.call(d, {Bucket: n, Region: i, Key: a}, function (e, n) {
              if (e) return t(e);
              f.emit("get_abort_array", n.UploadList || [])
            })
          } else {
            if ("task" !== u) return t({error: "abort_unknown_level"});
            if (!c) return t({error: "abort_upload_task_no_id"});
            if (!a) return t({error: "abort_upload_task_no_key"});
            f.emit("get_abort_array", [{Key: a, UploadId: c}])
          }
        }, sliceCopyFile: function (e, t) {
          var n, r, o = new s, u = this, l = e.Bucket, d = e.Region, f = e.Key, h = e.CopySource,
              p = h.slice(h.indexOf("/") + 1, h.length), g = Math.min(e.SliceSize, 5368709120),
              m = e.ChunkSize || this.options.ChunkSize, y = this.options.ChunkParallelLimit, v = 0;
          o.on("copy_slice_complete", function (e) {
            u.multipartComplete({
              Bucket: l,
              Region: d,
              Key: f,
              UploadId: e.UploadId,
              Parts: e.PartList
            }, function (e, o) {
              if (e) return r(null, !0), t(e);
              r({loaded: n, total: n}, !0), t(null, o)
            })
          }), o.on("get_copy_data_finish", function (e) {
            a.eachLimit(e.PartList, y, function (o, a) {
              var s = o.PartNumber, c = o.CopySourceRange, p = o.end - o.start, g = 0;
              i.call(u, {
                Bucket: l,
                Region: d,
                Key: f,
                CopySource: h,
                UploadId: e.UploadId,
                PartNumber: s,
                CopySourceRange: c,
                onProgress: function (e) {
                  v += e.loaded - g, g = e.loaded, r({loaded: v, total: n})
                }
              }, function (e, i) {
                if (e) return t(e);
                r({loaded: v, total: n}), v += p - g, o.ETag = i.ETag, a(e || null, i)
              })
            }, function (n) {
              if (n) return r(null, !0), t(n);
              o.emit("copy_slice_complete", e)
            })
          }), o.on("get_file_size_finish", function () {
            !function () {
              for (var t = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 5120], r = 1048576, o = 0; o < t.length && !(n / (r = 1024 * t[o] * 1024) < 1e4); o++) ;
              e.ChunkSize = m = Math.max(m, r);
              for (var i = Math.ceil(n / m), a = [], s = 1; s <= i; s++) {
                var c = (s - 1) * m, u = s * m < n ? s * m : n - 1,
                    l = {PartNumber: s, start: c, end: u, CopySourceRange: "bytes=" + c + "-" + u};
                a.push(l)
              }
              e.PartList = a
            }(), r = c.throttleOnProgress.call(u, n, e.onProgress), u.multipartInit({
              Bucket: l,
              Region: d,
              Key: f
            }, function (n, r) {
              if (n) return t(n);
              e.UploadId = r.UploadId, o.emit("get_copy_data_finish", e)
            })
          }), u.headObject({Bucket: l, Region: d, Key: p}, function (r, i) {
            if (r) return r.statusCode && 404 === r.statusCode ? t({ErrorStatus: p + " Not Exist"}) : void t(r);
            void 0 !== (n = e.FileSize = i.headers["Content-Length"]) && n || t({error: 'get Content-Length error, please add "Content-Length" to CORS ExposeHeader setting.'}), n <= g ? u.putObjectCopy(e, t) : o.emit("get_file_size_finish")
          })
        }
      };
      c.each(u, function (e, n) {
        t[n] = c.apiWrapper(n, e)
      })
    }, function (e, t) {
      e.exports = {
        eachLimit: function (e, t, n, r) {
          if (r = r || function () {
          }, !e.length || t <= 0) return r();
          var o = 0, i = 0, a = 0;
          !function s() {
            if (o >= e.length) return r();
            for (; a < t && i < e.length;) a += 1, n(e[(i += 1) - 1], function (t) {
              t ? (r(t), r = function () {
              }) : (a -= 1, (o += 1) >= e.length ? r() : s())
            })
          }()
        }, retry: function (e, t, n) {
          var r = function (o) {
            t(function (t, i) {
              t && o < e ? r(o + 1) : n(t, i)
            })
          };
          e < 1 ? n() : r(1)
        }
      }
    }, function (e, t, n) {
      "use strict";

      function r(e) {
        var t = {GrantFullControl: [], GrantWrite: [], GrantRead: [], GrantReadAcp: [], GrantWriteAcp: [], ACL: ""},
            n = {
              FULL_CONTROL: "GrantFullControl",
              WRITE: "GrantWrite",
              READ: "GrantRead",
              READ_ACP: "GrantReadAcp",
              WRITE_ACP: "GrantWriteAcp"
            }, r = e.AccessControlList.Grant;
        r && (r = u.isArray(r) ? r : [r]);
        var i = {READ: 0, WRITE: 0, FULL_CONTROL: 0};
        return r.length && u.each(r, function (r) {
          "qcs::cam::anyone:anyone" === r.Grantee.ID || "http://cam.qcloud.com/groups/global/AllUsers" === r.Grantee.URI ? i[r.Permission] = 1 : r.Grantee.ID !== e.Owner.ID && t[n[r.Permission]].push('id="' + r.Grantee.ID + '"')
        }), i.FULL_CONTROL || i.WRITE && i.READ ? t.ACL = "public-read-write" : i.READ ? t.ACL = "public-read" : t.ACL = "private", u.each(n, function (e) {
          t[e] = o(t[e].join(","))
        }), t
      }

      function o(e) {
        var t, n, r = e.split(","), o = {};
        for (t = 0; t < r.length;) o[n = r[t].trim()] ? r.splice(t, 1) : (o[n] = !0, r[t] = n, t++);
        return r.join(",")
      }

      function i(e) {
        var t = e.bucket, n = t.substr(0, t.lastIndexOf("-")), r = t.substr(t.lastIndexOf("-") + 1), o = e.domain,
            i = e.region, a = e.object, s = e.protocol || "https:";
        o || (o = ["cn-south", "cn-south-2", "cn-north", "cn-east", "cn-southwest", "sg"].indexOf(i) > -1 ? "{{Bucket}}-{{AppId}}.{{Region}}.myqcloud.com" : "{{Bucket}}-{{AppId}}.cos.{{Region}}.myqcloud.com"), o = o.replace(/\{\{AppId\}\}/gi, r).replace(/\{\{Bucket\}\}/gi, n).replace(/\{\{Region\}\}/gi, i).replace(/\{\{.*?\}\}/gi, ""), /^[a-zA-Z]+:\/\//.test(o) || (o = s + "//vod2.qcloud.com/" + o), "/" === o.slice(-1) && (o = o.slice(0, -1));
        var c = o;
        return a && (c += "/" + encodeURIComponent(a).replace(/%2F/g, "/")), e.isLocation && (c = c.replace(/^https?:\/\//, "")), c
      }

      function a(e, t) {
        var n = this, r = e.Bucket || "", o = e.Region || "";
        n._StsMap = n._StsMap || {};
        var i = n._StsMap[r + "." + o] || {}, a = function () {
          var n = {
            Authorization: u.getAuth({
              SecretId: i.TmpSecretId,
              SecretKey: i.TmpSecretKey,
              Method: e.Method,
              Key: e.Key || "",
              Query: e.Query,
              Headers: e.Headers
            }),
            XCosSecurityToken: i.XCosSecurityToken || "",
            Token: i.Token || "",
            ClientIP: i.ClientIP || "",
            ClientUA: i.ClientUA || ""
          };
          t && t(n)
        };
        if (i.ExpiredTime && i.ExpiredTime - (Date.now() / 1e3 > 60)) a(); else if (n.options.getAuthorization) n.options.getAuthorization.call(n, {
          Bucket: r,
          Region: o,
          Method: e.Method,
          Key: e.Key || "",
          Query: e.Query,
          Headers: e.Headers
        }, function (e) {
          "string" == typeof e && (e = {Authorization: e}), e.TmpSecretId && e.TmpSecretKey && e.XCosSecurityToken && e.ExpiredTime ? (i = n._StsMap[r + "." + o] = e, a()) : t && t(e)
        }); else {
          if (!n.options.getSTS) {
            var s = u.getAuth({
              SecretId: e.SecretId || n.options.SecretId,
              SecretKey: e.SecretKey || n.options.SecretKey,
              Method: e.Method,
              Key: e.Key || "",
              Query: e.Query,
              Headers: e.Headers
            });
            return t && t({Authorization: s}), s
          }
          n.options.getSTS.call(n, {Bucket: r, Region: o}, function (e) {
            (i = n._StsMap[r + "." + o] = e || {}).TmpSecretId = i.SecretId, i.TmpSecretKey = i.SecretKey, a()
          })
        }
        return ""
      }

      function s(e, t) {
        var n = this;
        !e.headers && (e.headers = {}), !e.qs && (e.qs = {}), e.VersionId && (e.qs.versionId = e.VersionId), e.qs = u.clearKey(e.qs), e.headers && (e.headers = u.clearKey(e.headers)), e.qs && (e.qs = u.clearKey(e.qs));
        var r = u.clone(e.qs);
        e.action && (r[e.action] = ""), a.call(n, {
          Bucket: e.Bucket || "",
          Region: e.Region || "",
          Method: e.method,
          Key: e.filePath && "POST" === e.method ? "" : e.Key,
          Query: r,
          Headers: e.headers
        }, function (r) {
          var o = r.Authorization, a = !1;
          if (o) if (o.indexOf(" ") > -1) a = !1; else if (o.indexOf("q-sign-algorithm=") > -1 && o.indexOf("q-ak=") > -1 && o.indexOf("q-sign-time=") > -1 && o.indexOf("q-key-time=") > -1 && o.indexOf("q-url-param-list=") > -1) a = !0; else try {
            (o = atob(o)).indexOf("a=") > -1 && o.indexOf("k=") > -1 && o.indexOf("t=") > -1 && o.indexOf("r=") > -1 && o.indexOf("b=") > -1 && (a = !0)
          } catch (e) {
          }
          a ? (e.AuthData = r, function (e, t) {
            var n = this, r = e.TaskId;
            if (!r || n._isRunningTask(r)) {
              var o = e.Bucket, a = e.Region, s = e.Key, l = e.method || "GET", d = e.url, f = e.body, h = e.json,
                  p = e.rawBody;
              d = d || i({
                protocol: n.options.Protocol,
                domain: n.options.Domain,
                bucket: o,
                region: a,
                object: s
              }), e.action && (d = d + (s ? "" : "/") + "?" + e.action);
              var g = {method: l, url: d, headers: e.headers, qs: e.qs, filePath: e.filePath, body: f, json: h};
              g.headers.Authorization = e.AuthData.Authorization, e.AuthData.Token && (g.headers.token = e.AuthData.Token), e.AuthData.ClientIP && (g.headers.clientIP = e.AuthData.ClientIP), e.AuthData.ClientUA && (g.headers.clientUA = e.AuthData.ClientUA), e.AuthData.XCosSecurityToken && (g.headers["x-cos-security-token"] = e.AuthData.XCosSecurityToken), g.headers && (g.headers = u.clearKey(g.headers)), g = u.clearKey(g), e.onProgress && "function" == typeof e.onProgress && (g.onProgress = function (t) {
                if (!r || n._isRunningTask(r)) {
                  var o = t ? t.loaded : 0;
                  e.onProgress({loaded: o, total: t.total})
                }
              });
              var m = c(g, function (e, o, i) {
                var a, s = function (e, i) {
                  if (r && n.off("inner-kill-task", y), !a) {
                    a = !0;
                    var s = {};
                    o && o.statusCode && (s.statusCode = o.statusCode), o && o.headers && (s.headers = o.headers), e ? (e = u.extend(e || {}, s), t(e, null)) : (i = u.extend(i || {}, s), t(null, i))
                  }
                };
                if (!e) {
                  var c;
                  try {
                    c = u.xml2json(i) || {}
                  } catch (e) {
                    c = i || {}
                  }
                  var l = o.statusCode;
                  return 2 !== Math.floor(l / 100) ? void s({error: c.Error || c}) : (p && ((c = {}).body = i), c.Error ? void s({error: c.Error}) : void s(null, c))
                }
                s({error: e})
              }), y = function (e) {
                e.TaskId === r && (m && m.abort && m.abort(), n.off("inner-kill-task", y))
              };
              r && n.on("inner-kill-task", y)
            }
          }.call(n, e, t)) : t("authorization error")
        })
      }

      var c = n(9), u = n(0), l = {
        getService: function (e, t) {
          "function" == typeof e && (t = e, e = {});
          var n = this.options.ServiceDomain, r = e.AppId || this.options.appId;
          n ? (n = n.replace(/\{\{AppId\}\}/gi, r || "").replace(/\{\{.*?\}\}/gi, ""), /^[a-zA-Z]+:\/\//.test(n) || (n = "https://" + n), "/" === n.slice(-1) && (n = n.slice(0, -1))) : n = "https://service.cos.myqcloud.com", s.call(this, {
            url: n + "/",
            method: "GET"
          }, function (e, n) {
            if (e) return t(e);
            var r = n && n.ListAllMyBucketsResult && n.ListAllMyBucketsResult.Buckets && n.ListAllMyBucketsResult.Buckets.Bucket || [];
            r = u.isArray(r) ? r : [r], t(null, {Buckets: r, statusCode: n.statusCode, headers: n.headers})
          })
        }, putBucket: function (e, t) {
          var n = this, r = {};
          r["x-cos-acl"] = e.ACL, r["x-cos-grant-read"] = e.GrantRead, r["x-cos-grant-write"] = e.GrantWrite, r["x-cos-grant-read-acp"] = e.GrantReadAcp, r["x-cos-grant-write-acp"] = e.GrantWriteAcp, r["x-cos-grant-full-control"] = e.GrantFullControl, s.call(this, {
            method: "PUT",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: r
          }, function (r, o) {
            if (r) return t(r);
            var a = i({domain: n.options.Domain, bucket: e.Bucket, region: e.Region, isLocation: !0});
            t(null, {Location: a, statusCode: o.statusCode, headers: o.headers})
          })
        }, getBucket: function (e, t) {
          var n = {};
          n.prefix = e.Prefix, n.delimiter = e.Delimiter, n.marker = e.Marker, n["max-keys"] = e.MaxKeys, n["encoding-type"] = e.EncodingType, s.call(this, {
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            qs: n
          }, function (e, n) {
            if (e) return t(e);
            var r = n.ListBucketResult || {}, o = r.Contents || [], i = r.CommonPrefixes || [];
            o = u.isArray(o) ? o : [o], i = u.isArray(i) ? i : [i];
            var a = u.clone(r);
            u.extend(a, {Contents: o, CommonPrefixes: i, statusCode: n.statusCode, headers: n.headers}), t(null, a)
          })
        }, headBucket: function (e, t) {
          s.call(this, {Bucket: e.Bucket, Region: e.Region, headers: e.Headers, method: "HEAD"}, function (e, n) {
            t(e, n)
          })
        }, deleteBucket: function (e, t) {
          s.call(this, {Bucket: e.Bucket, Region: e.Region, headers: e.Headers, method: "DELETE"}, function (e, n) {
            return e && 204 === e.statusCode ? t(null, {statusCode: e.statusCode}) : e ? t(e) : void t(null, {
              statusCode: n.statusCode,
              headers: n.headers
            })
          })
        }, getBucketAcl: function (e, t) {
          s.call(this, {
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "acl"
          }, function (e, n) {
            if (e) return t(e);
            var o = n.AccessControlPolicy || {}, i = o.Owner || {}, a = o.AccessControlList.Grant || [];
            a = u.isArray(a) ? a : [a];
            var s = r(o);
            n.headers && n.headers["x-cos-acl"] && (s.ACL = n.headers["x-cos-acl"]), s = u.extend(s, {
              Owner: i,
              Grants: a,
              statusCode: n.statusCode,
              headers: n.headers
            }), t(null, s)
          })
        }, putBucketAcl: function (e, t) {
          var n = e.Headers, r = "";
          if (e.AccessControlPolicy) {
            var i = u.clone(e.AccessControlPolicy || {}), a = i.Grants || i.Grant;
            a = u.isArray(a) ? a : [a], delete i.Grant, delete i.Grants, i.AccessControlList = {Grant: a}, r = u.json2xml({AccessControlPolicy: i}), n["Content-Type"] = "application/xml", n["Content-MD5"] = u.binaryBase64(u.md5(r))
          }
          u.each(n, function (e, t) {
            0 === t.indexOf("x-cos-grant-") && (n[t] = o(n[t]))
          }), s.call(this, {
            method: "PUT",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: n,
            action: "acl",
            body: r
          }, function (e, n) {
            if (e) return t(e);
            t(null, {statusCode: n.statusCode, headers: n.headers})
          })
        }, getBucketCors: function (e, t) {
          s.call(this, {
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "cors"
          }, function (e, n) {
            if (e) if (404 === e.statusCode && e.error && "NoSuchCORSConfiguration" === e.error.Code) {
              var r = {CORSRules: [], statusCode: e.statusCode};
              e.headers && (r.headers = e.headers), t(null, r)
            } else t(e); else {
              var o = n.CORSConfiguration || {}, i = o.CORSRules || o.CORSRule || [];
              i = u.clone(u.isArray(i) ? i : [i]), u.each(i, function (e) {
                u.each(["AllowedOrigin", "AllowedHeader", "AllowedMethod", "ExposeHeader"], function (t, n) {
                  var r = t + "s", o = e[r] || e[t] || [];
                  delete e[t], e[r] = u.isArray(o) ? o : [o]
                })
              }), t(null, {CORSRules: i, statusCode: n.statusCode, headers: n.headers})
            }
          })
        }, putBucketCors: function (e, t) {
          var n = (e.CORSConfiguration || {}).CORSRules || e.CORSRules || [];
          n = u.clone(u.isArray(n) ? n : [n]), u.each(n, function (e) {
            u.each(["AllowedOrigin", "AllowedHeader", "AllowedMethod", "ExposeHeader"], function (t, n) {
              var r = t + "s", o = e[r] || e[t] || [];
              delete e[r], e[t] = u.isArray(o) ? o : [o]
            })
          });
          var r = u.json2xml({CORSConfiguration: {CORSRule: n}}), o = e.Headers;
          o["Content-Type"] = "application/xml", o["Content-MD5"] = u.binaryBase64(u.md5(r)), s.call(this, {
            method: "PUT",
            Bucket: e.Bucket,
            Region: e.Region,
            body: r,
            action: "cors",
            headers: o
          }, function (e, n) {
            if (e) return t(e);
            t(null, {statusCode: n.statusCode, headers: n.headers})
          })
        }, deleteBucketCors: function (e, t) {
          s.call(this, {
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "cors"
          }, function (e, n) {
            return e && 204 === e.statusCode ? t(null, {statusCode: e.statusCode}) : e ? t(e) : void t(null, {
              statusCode: n.statusCode || e.statusCode,
              headers: n.headers
            })
          })
        }, getBucketLocation: function (e, t) {
          s.call(this, {
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "location"
          }, function (e, n) {
            if (e) return t(e);
            t(null, n)
          })
        }, putBucketTagging: function (e, t) {
          var n = e.Tagging || {}, r = n.TagSet || n.Tags || e.Tags || [];
          r = u.clone(u.isArray(r) ? r : [r]);
          var o = u.json2xml({Tagging: {TagSet: {Tag: r}}}), i = e.Headers;
          i["Content-Type"] = "application/xml", i["Content-MD5"] = u.binaryBase64(u.md5(o)), s.call(this, {
            method: "PUT",
            Bucket: e.Bucket,
            Region: e.Region,
            body: o,
            action: "tagging",
            headers: i
          }, function (e, n) {
            return e && 204 === e.statusCode ? t(null, {statusCode: e.statusCode}) : e ? t(e) : void t(null, {
              statusCode: n.statusCode,
              headers: n.headers
            })
          })
        }, getBucketTagging: function (e, t) {
          s.call(this, {
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "tagging"
          }, function (e, n) {
            if (e) if (404 !== e.statusCode || !e.error || "Not Found" !== e.error && "NoSuchTagSet" !== e.error.Code) t(e); else {
              var r = {Tags: [], statusCode: e.statusCode};
              e.headers && (r.headers = e.headers), t(null, r)
            } else {
              var o = [];
              try {
                o = n.Tagging.TagSet.Tag || []
              } catch (e) {
              }
              o = u.clone(u.isArray(o) ? o : [o]), t(null, {Tags: o, statusCode: n.statusCode, headers: n.headers})
            }
          })
        }, deleteBucketTagging: function (e, t) {
          s.call(this, {
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "tagging"
          }, function (e, n) {
            return e && 204 === e.statusCode ? t(null, {statusCode: e.statusCode}) : e ? t(e) : void t(null, {
              statusCode: n.statusCode,
              headers: n.headers
            })
          })
        }, getBucketPolicy: function (e, t) {
          s.call(this, {
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "policy",
            rawBody: !0
          }, function (e, n) {
            if (e) return t(e.statusCode && 403 === e.statusCode ? {ErrorStatus: "Access Denied"} : e.statusCode && 405 === e.statusCode ? {ErrorStatus: "Method Not Allowed"} : e.statusCode && 404 === e.statusCode ? {ErrorStatus: "Policy Not Found"} : e);
            var r = {};
            try {
              r = JSON.parse(n.body)
            } catch (e) {
            }
            t(null, {Policy: r, statusCode: n.statusCode, headers: n.headers})
          })
        }, putBucketPolicy: function (e, t) {
          var n = e.Policy, r = n;
          try {
            "string" == typeof n ? n = JSON.parse(r) : r = JSON.stringify(n)
          } catch (e) {
            t({error: "Policy format error"})
          }
          var o = e.Headers;
          o["Content-Type"] = "application/json", o["Content-MD5"] = u.binaryBase64(u.md5(r)), s.call(this, {
            method: "PUT",
            Bucket: e.Bucket,
            Region: e.Region,
            action: "policy",
            body: u.isBrowser ? r : n,
            headers: o,
            json: !0
          }, function (e, n) {
            return e && 204 === e.statusCode ? t(null, {statusCode: e.statusCode}) : e ? t(e) : void t(null, {
              statusCode: n.statusCode,
              headers: n.headers
            })
          })
        }, getBucketLifecycle: function (e, t) {
          s.call(this, {
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "lifecycle"
          }, function (e, n) {
            if (e) if (404 === e.statusCode && e.error && "NoSuchLifecycleConfiguration" === e.error.Code) {
              var r = {Rules: [], statusCode: e.statusCode};
              e.headers && (r.headers = e.headers), t(null, r)
            } else t(e); else {
              var o = [];
              try {
                o = n.LifecycleConfiguration.Rule || []
              } catch (e) {
              }
              o = u.clone(u.isArray(o) ? o : [o]), t(null, {Rules: o, statusCode: n.statusCode, headers: n.headers})
            }
          })
        }, putBucketLifecycle: function (e, t) {
          var n = (e.LifecycleConfiguration || {}).Rules || [];
          n = u.clone(n);
          var r = u.json2xml({LifecycleConfiguration: {Rule: n}}), o = e.Headers;
          o["Content-Type"] = "application/xml", o["Content-MD5"] = u.binaryBase64(u.md5(r)), s.call(this, {
            method: "PUT",
            Bucket: e.Bucket,
            Region: e.Region,
            body: r,
            action: "lifecycle",
            headers: o
          }, function (e, n) {
            return e && 204 === e.statusCode ? t(null, {statusCode: e.statusCode}) : e ? t(e) : void t(null, {
              statusCode: n.statusCode,
              headers: n.headers
            })
          })
        }, deleteBucketLifecycle: function (e, t) {
          s.call(this, {
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "lifecycle"
          }, function (e, n) {
            return e && 204 === e.statusCode ? t(null, {statusCode: e.statusCode}) : e ? t(e) : void t(null, {
              statusCode: n.statusCode,
              headers: n.headers
            })
          })
        }, putBucketVersioning: function (e, t) {
          if (e.VersioningConfiguration) {
            var n = e.VersioningConfiguration || {}, r = u.json2xml({VersioningConfiguration: n}), o = e.Headers;
            o["Content-Type"] = "application/xml", o["Content-MD5"] = u.binaryBase64(u.md5(r)), s.call(this, {
              method: "PUT",
              Bucket: e.Bucket,
              Region: e.Region,
              body: r,
              action: "versioning",
              headers: o
            }, function (e, n) {
              return e && 204 === e.statusCode ? t(null, {statusCode: e.statusCode}) : e ? t(e) : void t(null, {
                statusCode: n.statusCode,
                headers: n.headers
              })
            })
          } else t({error: "lack of param VersioningConfiguration"})
        }, getBucketVersioning: function (e, t) {
          s.call(this, {
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "versioning"
          }, function (e, n) {
            e || (!n.VersioningConfiguration && (n.VersioningConfiguration = {}), !n.VersioningConfiguration.MFADelete && (n.VersioningConfiguration.MFADelete = "Disabled"), !n.VersioningConfiguration.Status && (n.VersioningConfiguration.Status = "Disabled")), t(e, n)
          })
        }, putBucketReplication: function (e, t) {
          var n = u.clone(e.ReplicationConfiguration);
          n.Rule = n.Rules, delete n.Rules;
          var r = u.json2xml({ReplicationConfiguration: n}), o = e.Headers;
          o["Content-Type"] = "application/xml", o["Content-MD5"] = u.binaryBase64(u.md5(r)), s.call(this, {
            method: "PUT",
            Bucket: e.Bucket,
            Region: e.Region,
            body: r,
            action: "replication",
            headers: o
          }, function (e, n) {
            return e && 204 === e.statusCode ? t(null, {statusCode: e.statusCode}) : e ? t(e) : void t(null, {
              statusCode: n.statusCode,
              headers: n.headers
            })
          })
        }, getBucketReplication: function (e, t) {
          s.call(this, {
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "replication"
          }, function (e, n) {
            if (e) if (404 !== e.statusCode || !e.error || "Not Found" !== e.error && "ReplicationConfigurationnotFoundError" !== e.error.Code) t(e); else {
              var r = {ReplicationConfiguration: {Rules: []}, statusCode: e.statusCode};
              e.headers && (r.headers = e.headers), t(null, r)
            } else e || !n.ReplicationConfiguration && (n.ReplicationConfiguration = {}), t(e, n)
          })
        }, deleteBucketReplication: function (e, t) {
          s.call(this, {
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            action: "replication"
          }, function (e, n) {
            return e && 204 === e.statusCode ? t(null, {statusCode: e.statusCode}) : e ? t(e) : void t(null, {
              statusCode: n.statusCode,
              headers: n.headers
            })
          })
        }, getObject: function (e, t) {
          var n, r = {};
          r["response-content-type"] = e.ResponseContentType, r["response-content-language"] = e.ResponseContentLanguage, r["response-expires"] = e.ResponseExpires, r["response-cache-control"] = e.ResponseCacheControl, r["response-content-disposition"] = e.ResponseContentDisposition, r["response-content-encoding"] = e.ResponseContentEncoding, n = u.isBrowser ? "string" : "buffer", s.call(this, {
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            VersionId: e.VersionId,
            headers: e.Headers,
            qs: r,
            rawBody: !0
          }, function (r, o) {
            if (r) {
              var i = r.statusCode;
              return e.Headers["If-Modified-Since"] && i && 304 === i ? t(null, {NotModified: !0}) : t(r)
            }
            var a = {};
            "string" === n && (a.Body = o.body), u.extend(a, {statusCode: o.statusCode, headers: o.headers}), t(null, a)
          })
        }, headObject: function (e, t) {
          s.call(this, {
            method: "HEAD",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            VersionId: e.VersionId,
            headers: e.Headers
          }, function (n, r) {
            if (n) {
              var o = n.statusCode;
              return e.Headers["If-Modified-Since"] && o && 304 === o ? t(null, {NotModified: !0, statusCode: o}) : t(n)
            }
            t(null, r)
          })
        }, listObjectVersions: function (e, t) {
          s.call(this, {
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            qs: {prefix: e.Prefix},
            action: "versions"
          }, function (e, n) {
            if (e) return t(e);
            var r = n.ListVersionsResult || {}, o = r.DeleteMarker || [];
            o = u.isArray(o) ? o : [o];
            var i = r.Version || [];
            i = u.isArray(i) ? i : [i];
            var a = u.clone(r);
            delete a.DeleteMarker, delete a.Version, u.extend(a, {
              DeleteMarkers: o,
              Versions: i,
              statusCode: n.statusCode,
              headers: n.headers
            }), t(null, a)
          })
        }, putObject: function (e, t) {
          var n = this, r = e.Headers, o = e.Body;
          o && "string" == typeof o ? (r["Content-Length"] = o.length, s.call(this, {
            TaskId: e.TaskId,
            method: "PUT",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            headers: r,
            body: o
          }, function (r, o) {
            if (r) return t(r);
            if (o && o.headers && o.headers.etag) {
              var a = i({
                protocol: n.options.Protocol,
                domain: n.options.Domain,
                bucket: e.Bucket,
                region: e.Region,
                object: e.Key
              });
              return t(null, {Location: a, ETag: o.headers.etag, statusCode: o.statusCode, headers: o.headers})
            }
            t(null, o)
          })) : t({error: "params body format error, Only allow Buffer, Stream, Blob."})
        }, postObject: function (e, t) {
          var n = this, r = {};
          r["Cache-Control"] = e.CacheControl, r["Content-Disposition"] = e.ContentDisposition, r["Content-Encoding"] = e.ContentEncoding, r["Content-MD5"] = e.ContentMD5, r["Content-Length"] = e.ContentLength, r["Content-Type"] = e.ContentType, r.Expect = e.Expect, r.Expires = e.Expires, r["x-cos-acl"] = e.ACL, r["x-cos-grant-read"] = e.GrantRead, r["x-cos-grant-write"] = e.GrantWrite, r["x-cos-grant-full-control"] = e.GrantFullControl, r["x-cos-storage-class"] = e.StorageClass;
          var o = e.FilePath;
          for (var a in e) (a.indexOf("x-cos-meta-") > -1 || a.indexOf("Vod-Forward-Cos") > -1) && (r[a] = e[a]);
          var c = u.throttleOnProgress.call(n, r["Content-Length"], e.onProgress);
          s.call(this, {
            method: "POST",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            headers: r,
            filePath: o,
            onProgress: c
          }, function (r, o) {
            if (c(null, !0), r) return t(r);
            if (o) {
              var a = i({
                protocol: n.options.Protocol,
                domain: n.options.Domain,
                bucket: e.Bucket,
                region: e.Region,
                object: e.Key
              });
              return t(null, {Location: a, statusCode: o.statusCode})
            }
            t(null, o)
          })
        }, deleteObject: function (e, t) {
          s.call(this, {
            method: "DELETE",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            headers: e.Headers,
            VersionId: e.VersionId
          }, function (e, n) {
            if (e) {
              var r = e.statusCode;
              return r && 204 === r ? t(null, {statusCode: r}) : r && 404 === r ? t(null, {
                BucketNotFound: !0,
                statusCode: r
              }) : t(e)
            }
            t(null, {statusCode: n.statusCode, headers: n.headers})
          })
        }, getObjectAcl: function (e, t) {
          s.call(this, {
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            headers: e.Headers,
            action: "acl"
          }, function (e, n) {
            if (e) return t(e);
            var o = n.AccessControlPolicy || {}, i = o.Owner || {},
                a = o.AccessControlList && o.AccessControlList.Grant || [];
            a = u.isArray(a) ? a : [a];
            var s = r(o);
            n.headers && n.headers["x-cos-acl"] && (s.ACL = n.headers["x-cos-acl"]), s = u.extend(s, {
              Owner: i,
              Grants: a,
              statusCode: n.statusCode,
              headers: n.headers
            }), t(null, s)
          })
        }, putObjectAcl: function (e, t) {
          var n = e.Headers, r = "";
          if (e.AccessControlPolicy) {
            var i = u.clone(e.AccessControlPolicy || {}), a = i.Grants || i.Grant;
            a = u.isArray(a) ? a : [a], delete i.Grant, delete i.Grants, i.AccessControlList = {Grant: a}, r = u.json2xml({AccessControlPolicy: i}), n["Content-Type"] = "application/xml", n["Content-MD5"] = u.binaryBase64(u.md5(r))
          }
          u.each(n, function (e, t) {
            0 === t.indexOf("x-cos-grant-") && (n[t] = o(n[t]))
          }), s.call(this, {
            method: "PUT",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            action: "acl",
            headers: n,
            body: r
          }, function (e, n) {
            if (e) return t(e);
            t(null, {statusCode: n.statusCode, headers: n.headers})
          })
        }, optionsObject: function (e, t) {
          var n = e.Headers;
          n.Origin = e.Origin, n["Access-Control-Request-Method"] = e.AccessControlRequestMethod, n["Access-Control-Request-Headers"] = e.AccessControlRequestHeaders, s.call(this, {
            method: "OPTIONS",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            headers: n
          }, function (e, n) {
            if (e) return e.statusCode && 403 === e.statusCode ? t(null, {
              OptionsForbidden: !0,
              statusCode: e.statusCode
            }) : t(e);
            var r = n.headers || {};
            t(null, {
              AccessControlAllowOrigin: r["access-control-allow-origin"],
              AccessControlAllowMethods: r["access-control-allow-methods"],
              AccessControlAllowHeaders: r["access-control-allow-headers"],
              AccessControlExposeHeaders: r["access-control-expose-headers"],
              AccessControlMaxAge: r["access-control-max-age"],
              statusCode: n.statusCode,
              headers: n.headers
            })
          })
        }, putObjectCopy: function (e, t) {
          s.call(this, {
            method: "PUT",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            VersionId: e.VersionId,
            headers: e.Headers
          }, function (e, n) {
            if (e) return t(e);
            var r = u.clone(n.CopyObjectResult || {});
            u.extend(r, {statusCode: n.statusCode, headers: n.headers}), t(null, r)
          })
        }, restoreObject: function (e, t) {
          var n = e.Headers;
          if (e.RestoreRequest) {
            var r = e.RestoreRequest || {}, o = u.json2xml({RestoreRequest: r});
            n["Content-Type"] = "application/xml", n["Content-MD5"] = u.binaryBase64(u.md5(o)), s.call(this, {
              method: "POST",
              Bucket: e.Bucket,
              Region: e.Region,
              Key: e.Key,
              VersionId: e.VersionId,
              body: o,
              action: "restore",
              headers: n
            }, function (e, n) {
              t(e, n)
            })
          } else t({error: "lack of param RestoreRequest"})
        }, deleteMultipleObject: function (e, t) {
          var n = e.Objects || {}, r = e.Quiet, o = u.json2xml({Delete: {Object: n, Quiet: r || !1}}), i = e.Headers;
          i["Content-Type"] = "application/xml", i["Content-MD5"] = u.binaryBase64(u.md5(o)), s.call(this, {
            method: "POST",
            Bucket: e.Bucket,
            Region: e.Region,
            body: o,
            action: "delete",
            headers: i
          }, function (e, n) {
            if (e) return t(e);
            var r = n.DeleteResult || {}, o = r.Deleted || [], i = r.Error || [];
            o = u.isArray(o) ? o : [o], i = u.isArray(i) ? i : [i];
            var a = u.clone(r);
            u.extend(a, {Error: i, Deleted: o, statusCode: n.statusCode, headers: n.headers}), t(null, a)
          })
        }, uploadPartCopy: function (e, t) {
          s.call(this, {
            method: "PUT",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            VersionId: e.VersionId,
            qs: {partNumber: e.PartNumber, uploadId: e.UploadId},
            headers: e.Headers
          }, function (e, n) {
            if (e) return t(e);
            var r = u.clone(n.CopyPartResult || {});
            u.extend(r, {statusCode: n.statusCode, headers: n.headers}), t(null, r)
          })
        }, multipartInit: function (e, t) {
          s.call(this, {
            method: "POST",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            action: "uploads",
            headers: e.Headers
          }, function (e, n) {
            return e ? t(e) : (n = u.clone(n || {})) && n.InitiateMultipartUploadResult ? t(null, u.extend(n.InitiateMultipartUploadResult, {
              statusCode: n.statusCode,
              headers: n.headers
            })) : void t(null, n)
          })
        }, multipartComplete: function (e, t) {
          for (var n = this, r = e.UploadId, o = e.Parts, a = 0, c = o.length; a < c; a++) 0 !== o[a].ETag.indexOf('"') && (o[a].ETag = '"' + o[a].ETag + '"');
          var l = u.json2xml({CompleteMultipartUpload: {Part: o}}), d = e.Headers;
          d["Content-Type"] = "application/xml", d["Content-MD5"] = u.binaryBase64(u.md5(l)), s.call(this, {
            method: "POST",
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            qs: {uploadId: r},
            body: l,
            headers: d
          }, function (r, o) {
            if (r) return t(r);
            var a = i({
                  protocol: n.options.Protocol,
                  domain: n.options.Domain,
                  bucket: e.Bucket,
                  region: e.Region,
                  object: e.Key,
                  isLocation: !0
                }), s = o.CompleteMultipartUploadResult || {},
                c = u.extend(s, {Location: a, statusCode: o.statusCode, headers: o.headers});
            t(null, c)
          })
        }, multipartList: function (e, t) {
          var n = {};
          n.delimiter = e.Delimiter, n["encoding-type"] = e.EncodingType, n.prefix = e.Prefix, n["max-uploads"] = e.MaxUploads, n["key-marker"] = e.KeyMarker, n["upload-id-marker"] = e.UploadIdMarker, n = u.clearKey(n), s.call(this, {
            method: "GET",
            Bucket: e.Bucket,
            Region: e.Region,
            headers: e.Headers,
            qs: n,
            action: "uploads"
          }, function (e, n) {
            if (e) return t(e);
            if (n && n.ListMultipartUploadsResult) {
              var r = n.ListMultipartUploadsResult.Upload || [], o = n.ListMultipartUploadsResult.CommonPrefixes || [];
              o = u.isArray(o) ? o : [o], r = u.isArray(r) ? r : [r], n.ListMultipartUploadsResult.Upload = r, n.ListMultipartUploadsResult.CommonPrefixes = o
            }
            var i = u.clone(n.ListMultipartUploadsResult || {});
            u.extend(i, {statusCode: n.statusCode, headers: n.headers}), t(null, i)
          })
        }, getObjectUrl: function (e, t) {
          var n = i({
            protocol: this.options.Protocol,
            domain: this.options.Domain,
            bucket: e.Bucket,
            region: e.Region,
            object: e.Key
          });
          if (void 0 !== e.Sign && !e.Sign) return t(null, {Url: n}), n;
          var r = a.call(this, {
            Bucket: e.Bucket || "",
            Region: e.Region || "",
            Method: e.Method || "get",
            Key: e.Key
          }, function (e) {
            if (t) {
              var r = {Url: n + "?sign=" + encodeURIComponent(e.Authorization)};
              e.XCosSecurityToken && (r.XCosSecurityToken = e.XCosSecurityToken), e.ClientIP && (r.ClientIP = e.ClientIP), e.ClientUA && (r.ClientUA = e.ClientUA), e.Token && (r.Token = e.Token), setTimeout(function () {
                t(null, r)
              })
            }
          });
          return r ? n + "?sign=" + encodeURIComponent(r) : n
        }, getAuth: function (e) {
          return u.getAuth({
            SecretId: e.SecretId || this.options.SecretId || "",
            SecretKey: e.SecretKey || this.options.SecretKey || "",
            Method: e.Method,
            Key: e.Key,
            Query: e.Query,
            Headers: e.Headers,
            Expires: e.Expires
          })
        }
      };
      u.each(l, function (e, n) {
        t[n] = u.apiWrapper(n, e)
      })
    }, function (e, t, n) {
      var r = n(0);
      e.exports.init = function (e) {
        var t = [], n = {}, o = 0, i = 0, a = {};
        r.each(["postObject"], function (t) {
          a[t] = e[t], e[t] = function (n, r) {
            e._addTask(t, n, r)
          }
        });
        var s = function (e) {
          var t = {
            id: e.id,
            Bucket: e.Bucket,
            Region: e.Region,
            Key: e.Key,
            FilePath: e.FilePath,
            state: e.state,
            loaded: e.loaded,
            size: e.size,
            speed: e.speed,
            percent: e.percent,
            hashPercent: e.hashPercent
          };
          return e.FilePath && (t.FilePath = e.FilePath), t
        }, c = function () {
          e.emit("list-update", {list: r.map(t, s)})
        }, u = function () {
          if (i < t.length && o < e.options.FileParallelLimit) {
            var n = t[i];
            "waiting" === n.state && (o++, n.state = "checking", !n.params.UploadData && (n.params.UploadData = {}), a[n.api].call(e, n.params, function (t, r) {
              "checking" !== n.state && "uploading" !== n.state || (n.state = t ? "error" : "success", o--, u(e), n.callback && n.callback(t, r), "success" === n.state && (delete n.params, delete n.callback))
            }), c()), i++, u(e)
          }
        }, l = function (t, r) {
          var i = n[t];
          if (i) {
            var a = i && "waiting" === i.state, s = i && ("checking" === i.state || "uploading" === i.state);
            if (a || s || "canceled" === r && "paused" === i.state) {
              if ("paused" === r && i.params.Body && "function" == typeof i.params.Body.pipe) return void console.error("stream not support pause");
              i.state = r, e.emit("inner-kill-task", {TaskId: t}), c(), s && (o--, u(e)), "canceled" === r && (delete i.params, delete i.callback)
            }
          }
        };
        e._addTasks = function (t) {
          r.each(t, function (t) {
            t.params.IgnoreAddEvent = !0, e._addTask(t.api, t.params, t.callback)
          }), c()
        }, e._addTask = function (o, i, a) {
          var s, l = r.uuid();
          i.TaskReady && i.TaskReady(l), i.Body && i.Body.size ? s = i.Body.size : i.Body && i.Body.length ? s = i.Body.length : void 0 !== i.ContentLength && (s = i.ContentLength), void 0 === i.ContentLength && (i.ContentLength = s), i.TaskId = l;
          var d = {
            params: i,
            callback: a,
            api: o,
            index: t.length,
            id: l,
            Bucket: i.Bucket,
            Region: i.Region,
            Key: i.Key,
            FilePath: i.FilePath || "",
            state: "waiting",
            loaded: 0,
            size: s,
            speed: 0,
            percent: 0,
            hashPercent: 0
          }, f = i.onHashProgress;
          i.onHashProgress = function (t) {
            e._isRunningTask(d.id) && (d.hashPercent = t.percent, f && f(t), c())
          };
          var h = i.onProgress;
          return i.onProgress = function (t) {
            e._isRunningTask(d.id) && ("checking" === d.state && (d.state = "uploading"), d.loaded = t.loaded, d.speed = t.speed, d.percent = t.percent, h && h(t), c())
          }, t.push(d), n[l] = d, !i.IgnoreAddEvent && c(), u(e), l
        }, e._isRunningTask = function (e) {
          var t = n[e];
          return !(!t || "checking" !== t.state && "uploading" !== t.state)
        }, e.getTaskList = function () {
          return r.map(t, s)
        }, e.cancelTask = function (e) {
          l(e, "canceled")
        }, e.pauseTask = function (e) {
          l(e, "paused")
        }, e.restartTask = function (e) {
          var t = n[e];
          !t || "paused" !== t.state && "error" !== t.state || (t.state = "waiting", c(), i = Math.min(i, t.index), u())
        }
      }
    }])
  }, function (e, t, n) {
    var r = n(0),
        o = ["WMV", "WM", "ASF", "ASX", "RM", "RMVB", "RA", "RAM", "MPG", "MPEG", "MPE", "VOB", "DAT", "MOV", "3GP", "MP4", "MP4V", "M4V", "MKV", "AVI", "FLV", "F4V"],
        i = {
          getType: function (e) {
            return null === e ? "null" : void 0 === e ? "undefined" : Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
          }, isFunction: function (e) {
            return !e || "function" == this.getType(e)
          }, getFileMessage: function (e, t) {
            var n = {};
            return n.tempFilePath = e.tempFilePath, n.type = e.tempFilePath.substring(e.tempFilePath.lastIndexOf(".") + 1), n.name = "string" == typeof t ? t : "来自小程序", n.size = e.size, n
          }
        }, a = {
          start: function (e) {
            var t = a;
            "object" == i.getType(e) ? e.videoFile ? (t.fileMessage = i.getFileMessage(e.videoFile, e.fileName), -1 != o.indexOf(t.fileMessage.type.toUpperCase()) ? e.getSignature ? i.isFunction(e.getSignature) && i.isFunction(e.success) && i.isFunction(e.error) && i.isFunction(e.progress) && i.isFunction(e.finish) ? (t.opts = e, "undefined" == i.getType(t.retryStartNum) && (t.retryStartNum = 3), e.getSignature(function (n) {
              t.signature = n;
              var r = {
                signature: n,
                videoName: t.fileMessage.name,
                videoType: t.fileMessage.type,
                videoSize: t.fileMessage.size
              };
              uni.request({
                method: "POST",
                url: "https://vod2.qcloud.com/v3/index.php?Action=ApplyUploadUGC",
                data: r,
                dataType: "json",
                success: function (n) {
                  console.log(JSON.stringify(n))
                  0 == n.data.code ? (t.vodSessionKey = n.data.data.vodSessionKey, t.uploadFile(n)) : t.retryStartNum > 0 ? (t.retryStartNum--, t.start(e)) : "function" == typeof t.opts.error && t.opts.error(n)
                },
                fail: function (e) {
                  "function" == typeof t.opts.error && t.opts.error(e)
                }
              })
            })) : uni.showToast({
              title: "getSignature必须为函数，如果有success、error、progress、finish，也必须为函数",
              icon: "error",
              duration: 3e3
            }) : uni.showToast({
              title: "需要getSignature字段",
              icon: "error",
              duration: 3e3
            }) : uni.showToast({
              title: "videoFile必须为视频文件",
              icon: "error",
              duration: 3e3
            })) : uni.showToast({title: "需要videoFile字段", icon: "error", duration: 3e3}) : uni.showToast({
              title: "参数必须为对象类型",
              icon: "error",
              duration: 3e3
            })
          }, uploadFile: function (e) {
            var t = e.data.data, n = {
              bucket: t.storageBucket + "-" + t.storageAppId,
              region: t.storageRegionV5,
              key: t.video.storagePath,
              filePath: this.fileMessage.tempFilePath,
              secretId: t.tempCertificate.secretId,
              secretKey: t.tempCertificate.secretKey,
              token: t.tempCertificate.token,
              expiredTime: t.tempCertificate.expiredTime
            }, o = this;
            console.log(JSON.stringify(t))
            console.log(JSON.stringify(n))
            new r({
              getAuthorization: function (e, t) {
                t({
                  TmpSecretId: n.secretId,
                  TmpSecretKey: n.secretKey,
                  XCosSecurityToken: n.token,
                  ExpiredTime: n.expiredTime
                })
              }
            }).postObject({
              Bucket: n.bucket, Region: n.region, Key: n.key, FilePath: n.filePath, onProgress: function (e) {
                "function" == typeof o.opts.progress && o.opts.progress(e)
              }
            }, this.requestCallback)
          }, requestCallback: function (e, t) {
            var n = a;
            e ? "function" == typeof n.opts.error && n.opts.error(e) : ("function" == typeof n.opts.success && n.opts.success(t), n.finishUpload())
          }, finishUpload: function () {
            var e = {signature: this.signature, vodSessionKey: this.vodSessionKey}, t = this;
            "undefined" == i.getType(t.retryFinishNum) && (t.retryFinishNum = 3), uni.request({
              method: "POST",
              url: "https://vod2.qcloud.com/v3/index.php?Action=CommitUploadUGC",
              data: e,
              dataType: "json",
              success: function (e) {
                if (0 == e.data.code) {
                  var n = e.data.data;
                  "function" == typeof t.opts.finish && t.opts.finish({
                    fileId: n.fileId,
                    videoName: t.fileMessage.name,
                    videoUrl: n.video && n.video.url
                  })
                } else t.retryFinishNum > 0 ? (t.retryFinishNum--, t.finishUpload()) : "function" == typeof t.opts.error && t.opts.error(e)
              },
              fail: function (e) {
                "function" == typeof t.opts.error && t.opts.error(e)
              }
            })
          }
        };
    e.exports = {start: a.start}
  }])
});