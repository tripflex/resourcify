window.CodeMirror = function() {
    "use strict";

    function w(a, c) {
        if (!(this instanceof w)) return new w(a, c);
        this.options = c = c || {};
        for (var d in Xc)!c.hasOwnProperty(d) && Xc.hasOwnProperty(d) && (c[d] = Xc[d]);
        I(c);
        var e = "string" == typeof c.value ? 0 : c.value.first,
            f = this.display = x(a, e);
        f.wrapper.CodeMirror = this, F(this), c.autofocus && !o && Lb(this), this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: !1,
            focused: !1,
            suppressEdits: !1,
            pasteIncoming: !1,
            draggingText: !1,
            highlight: new Te
        }, D(this), c.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap");
        var g = c.value;
        "string" == typeof g && (g = new ce(c.value, c.mode)), Db(this, ge)(this, g), b && setTimeout(bf(Kb, this, !0), 20), Nb(this);
        var h;
        try {
            h = document.activeElement == f.input
        } catch (i) {}
        h || c.autofocus && !o ? setTimeout(bf(ic, this), 20) : jc(this), Db(this, function() {
            for (var a in Wc) Wc.propertyIsEnumerable(a) && Wc[a](this, c[a], Zc);
            for (var b = 0; b < bd.length; ++b) bd[b](this)
        })()
    }

    function x(a, b) {
        var d = {}, f = d.input = gf("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none; font-size: 4px;");
        return e ? f.style.width = "1000px" : f.setAttribute("wrap", "off"), n && (f.style.border = "1px solid black"), f.setAttribute("autocorrect", "off"), f.setAttribute("autocapitalize", "off"), f.setAttribute("spellcheck", "false"), d.inputDiv = gf("div", [f], null, "overflow: hidden; position: relative; width: 3px; height: 0px;"), d.scrollbarH = gf("div", [gf("div", null, null, "height: 1px")], "CodeMirror-hscrollbar"), d.scrollbarV = gf("div", [gf("div", null, null, "width: 1px")], "CodeMirror-vscrollbar"), d.scrollbarFiller = gf("div", null, "CodeMirror-scrollbar-filler"), d.gutterFiller = gf("div", null, "CodeMirror-gutter-filler"), d.lineDiv = gf("div", null, "CodeMirror-code"), d.selectionDiv = gf("div", null, null, "position: relative; z-index: 1"), d.cursor = gf("div", "\xa0", "CodeMirror-cursor"), d.otherCursor = gf("div", "\xa0", "CodeMirror-cursor CodeMirror-secondarycursor"), d.measure = gf("div", null, "CodeMirror-measure"), d.lineSpace = gf("div", [d.measure, d.selectionDiv, d.lineDiv, d.cursor, d.otherCursor], null, "position: relative; outline: none"), d.mover = gf("div", [gf("div", [d.lineSpace], "CodeMirror-lines")], null, "position: relative"), d.sizer = gf("div", [d.mover], "CodeMirror-sizer"), d.heightForcer = gf("div", null, null, "position: absolute; height: " + Re + "px; width: 1px;"), d.gutters = gf("div", null, "CodeMirror-gutters"), d.lineGutter = null, d.scroller = gf("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll"), d.scroller.setAttribute("tabIndex", "-1"), d.wrapper = gf("div", [d.inputDiv, d.scrollbarH, d.scrollbarV, d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror"), c && (d.gutters.style.zIndex = -1, d.scroller.style.paddingRight = 0), a.appendChild ? a.appendChild(d.wrapper) : a(d.wrapper), n && (f.style.width = "0px"), e || (d.scroller.draggable = !0), j ? (d.inputDiv.style.height = "1px", d.inputDiv.style.position = "absolute") : c && (d.scrollbarH.style.minWidth = d.scrollbarV.style.minWidth = "18px"), d.viewOffset = d.lastSizeC = 0, d.showingFrom = d.showingTo = b, d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null, d.prevInput = "", d.alignWidgets = !1, d.pollingFast = !1, d.poll = new Te, d.cachedCharWidth = d.cachedTextHeight = null, d.measureLineCache = [], d.measureLineCachePos = 0, d.inaccurateSelection = !1, d.maxLine = null, d.maxLineLength = 0, d.maxLineChanged = !1, d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null, d
    }

    function y(a) {
        a.doc.mode = w.getMode(a.options, a.doc.modeOption), a.doc.iter(function(a) {
            a.stateAfter && (a.stateAfter = null), a.styles && (a.styles = null)
        }), a.doc.frontier = a.doc.first, ab(a, 100), a.state.modeGen++, a.curOp && Gb(a)
    }

    function z(a) {
        a.options.lineWrapping ? (a.display.wrapper.className += " CodeMirror-wrap", a.display.sizer.style.minWidth = "") : (a.display.wrapper.className = a.display.wrapper.className.replace(" CodeMirror-wrap", ""), H(a)), B(a), Gb(a), nb(a), setTimeout(function() {
            J(a)
        }, 100)
    }

    function A(a) {
        var b = yb(a.display),
            c = a.options.lineWrapping,
            d = c && Math.max(5, a.display.scroller.clientWidth / zb(a.display) - 3);
        return function(e) {
            return Cd(a.doc, e) ? 0 : c ? (Math.ceil(e.text.length / d) || 1) * b : b
        }
    }

    function B(a) {
        var b = a.doc,
            c = A(a);
        b.iter(function(a) {
            var b = c(a);
            b != a.height && ke(a, b)
        })
    }

    function C(a) {
        var b = gd[a.options.keyMap],
            c = b.style;
        a.display.wrapper.className = a.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (c ? " cm-keymap-" + c : ""), a.state.disableInput = b.disableInput
    }

    function D(a) {
        a.display.wrapper.className = a.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + a.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), nb(a)
    }

    function E(a) {
        F(a), Gb(a), setTimeout(function() {
            L(a)
        }, 20)
    }

    function F(a) {
        var b = a.display.gutters,
            c = a.options.gutters;
        hf(b);
        for (var d = 0; d < c.length; ++d) {
            var e = c[d],
                f = b.appendChild(gf("div", null, "CodeMirror-gutter " + e));
            "CodeMirror-linenumbers" == e && (a.display.lineGutter = f, f.style.width = (a.display.lineNumWidth || 1) + "px")
        }
        b.style.display = d ? "" : "none"
    }

    function G(a, b) {
        if (0 == b.height) return 0;
        for (var d, c = b.text.length, e = b; d = zd(e);) {
            var f = d.find();
            e = he(a, f.from.line), c += f.from.ch - f.to.ch
        }
        for (e = b; d = Ad(e);) {
            var f = d.find();
            c -= e.text.length - f.from.ch, e = he(a, f.to.line), c += e.text.length - f.to.ch
        }
        return c
    }

    function H(a) {
        var b = a.display,
            c = a.doc;
        b.maxLine = he(c, c.first), b.maxLineLength = G(c, b.maxLine), b.maxLineChanged = !0, c.iter(function(a) {
            var d = G(c, a);
            d > b.maxLineLength && (b.maxLineLength = d, b.maxLine = a)
        })
    }

    function I(a) {
        for (var b = !1, c = 0; c < a.gutters.length; ++c) "CodeMirror-linenumbers" == a.gutters[c] && (a.lineNumbers ? b = !0 : a.gutters.splice(c--, 1));
        !b && a.lineNumbers && a.gutters.push("CodeMirror-linenumbers")
    }

    function J(a) {
        var b = a.display,
            c = a.doc.height,
            d = c + fb(b);
        b.sizer.style.minHeight = b.heightForcer.style.top = d + "px", b.gutters.style.height = Math.max(d, b.scroller.clientHeight - Re) + "px";
        var e = Math.max(d, b.scroller.scrollHeight),
            f = b.scroller.scrollWidth > b.scroller.clientWidth + 1,
            g = e > b.scroller.clientHeight + 1;
        g ? (b.scrollbarV.style.display = "block", b.scrollbarV.style.bottom = f ? pf(b.measure) + "px" : "0", b.scrollbarV.firstChild.style.height = e - b.scroller.clientHeight + b.scrollbarV.clientHeight + "px") : b.scrollbarV.style.display = "", f ? (b.scrollbarH.style.display = "block", b.scrollbarH.style.right = g ? pf(b.measure) + "px" : "0", b.scrollbarH.firstChild.style.width = b.scroller.scrollWidth - b.scroller.clientWidth + b.scrollbarH.clientWidth + "px") : b.scrollbarH.style.display = "", f && g ? (b.scrollbarFiller.style.display = "block", b.scrollbarFiller.style.height = b.scrollbarFiller.style.width = pf(b.measure) + "px") : b.scrollbarFiller.style.display = "", f && a.options.coverGutterNextToScrollbar && a.options.fixedGutter ? (b.gutterFiller.style.display = "block", b.gutterFiller.style.height = pf(b.measure) + "px", b.gutterFiller.style.width = b.gutters.offsetWidth + "px") : b.gutterFiller.style.display = "", k && 0 === pf(b.measure) && (b.scrollbarV.style.minWidth = b.scrollbarH.style.minHeight = l ? "18px" : "12px")
    }

    function K(a, b, c) {
        var d = a.scroller.scrollTop,
            e = a.wrapper.clientHeight;
        "number" == typeof c ? d = c : c && (d = c.top, e = c.bottom - c.top), d = Math.floor(d - eb(a));
        var f = Math.ceil(d + e);
        return {
            from: me(b, d),
            to: me(b, f)
        }
    }

    function L(a) {
        var b = a.display;
        if (b.alignWidgets || b.gutters.firstChild && a.options.fixedGutter) {
            for (var c = O(b) - b.scroller.scrollLeft + a.doc.scrollLeft, d = b.gutters.offsetWidth, e = c + "px", f = b.lineDiv.firstChild; f; f = f.nextSibling)
                if (f.alignable)
                    for (var g = 0, h = f.alignable; g < h.length; ++g) h[g].style.left = e;
            a.options.fixedGutter && (b.gutters.style.left = c + d + "px")
        }
    }

    function M(a) {
        if (!a.options.lineNumbers) return !1;
        var b = a.doc,
            c = N(a.options, b.first + b.size - 1),
            d = a.display;
        if (c.length != d.lineNumChars) {
            var e = d.measure.appendChild(gf("div", [gf("div", c)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                f = e.firstChild.offsetWidth,
                g = e.offsetWidth - f;
            return d.lineGutter.style.width = "", d.lineNumInnerWidth = Math.max(f, d.lineGutter.offsetWidth - g), d.lineNumWidth = d.lineNumInnerWidth + g, d.lineNumChars = d.lineNumInnerWidth ? c.length : -1, d.lineGutter.style.width = d.lineNumWidth + "px", !0
        }
        return !1
    }

    function N(a, b) {
        return String(a.lineNumberFormatter(b + a.firstLineNumber))
    }

    function O(a) {
        return lf(a.scroller).left - lf(a.sizer).left
    }

    function P(a, b, c, d) {
        for (var g, e = a.display.showingFrom, f = a.display.showingTo, h = K(a.display, a.doc, c); Q(a, b, h, d) && (d = !1, g = !0, Y(a), J(a), c && (c = Math.min(a.display.scroller.scrollHeight - a.display.scroller.clientHeight, "number" == typeof c ? c : c.top)), h = K(a.display, a.doc, c), !(h.from >= a.display.showingFrom && h.to <= a.display.showingTo));) b = [];
        return g && (Me(a, "update", a), (a.display.showingFrom != e || a.display.showingTo != f) && Me(a, "viewportChange", a, a.display.showingFrom, a.display.showingTo)), g
    }

    function Q(a, b, c, d) {
        var e = a.display,
            f = a.doc;
        if (!e.wrapper.clientWidth) return e.showingFrom = e.showingTo = f.first, e.viewOffset = 0, void 0;
        if (!(!d && 0 == b.length && c.from > e.showingFrom && c.to < e.showingTo)) {
            M(a) && (b = [{
                from: f.first,
                to: f.first + f.size
            }]);
            var g = e.sizer.style.marginLeft = e.gutters.offsetWidth + "px";
            e.scrollbarH.style.left = a.options.fixedGutter ? g : "0";
            var h = 1 / 0;
            if (a.options.lineNumbers)
                for (var i = 0; i < b.length; ++i)
                    if (b[i].diff) {
                        h = b[i].from;
                        break
                    }
            var j = f.first + f.size,
                k = Math.max(c.from - a.options.viewportMargin, f.first),
                l = Math.min(j, c.to + a.options.viewportMargin);
            if (e.showingFrom < k && k - e.showingFrom < 20 && (k = Math.max(f.first, e.showingFrom)), e.showingTo > l && e.showingTo - l < 20 && (l = Math.min(j, e.showingTo)), v)
                for (k = le(Bd(f, he(f, k))); j > l && Cd(f, he(f, l));)++l;
            var m = [{
                from: Math.max(e.showingFrom, f.first),
                to: Math.min(e.showingTo, j)
            }];
            if (m = m[0].from >= m[0].to ? [] : T(m, b), v)
                for (var i = 0; i < m.length; ++i)
                    for (var o, n = m[i]; o = Ad(he(f, n.to - 1));) {
                        var p = o.find().from.line;
                        if (!(p > n.from)) {
                            m.splice(i--, 1);
                            break
                        }
                        n.to = p
                    }
            for (var q = 0, i = 0; i < m.length; ++i) {
                var n = m[i];
                n.from < k && (n.from = k), n.to > l && (n.to = l), n.from >= n.to ? m.splice(i--, 1) : q += n.to - n.from
            }
            if (!d && q == l - k && k == e.showingFrom && l == e.showingTo) return S(a), void 0;
            m.sort(function(a, b) {
                return a.from - b.from
            });
            try {
                var r = document.activeElement
            } catch (s) {}.7 * (l - k) > q && (e.lineDiv.style.display = "none"), V(a, k, l, m, h), e.lineDiv.style.display = "", r && document.activeElement != r && r.offsetHeight && r.focus();
            var t = k != e.showingFrom || l != e.showingTo || e.lastSizeC != e.wrapper.clientHeight;
            return t && (e.lastSizeC = e.wrapper.clientHeight, ab(a, 400)), e.showingFrom = k, e.showingTo = l, R(a), S(a), !0
        }
    }

    function R(a) {
        for (var f, b = a.display, d = b.lineDiv.offsetTop, e = b.lineDiv.firstChild; e; e = e.nextSibling)
            if (e.lineObj) {
                if (c) {
                    var g = e.offsetTop + e.offsetHeight;
                    f = g - d, d = g
                } else {
                    var h = lf(e);
                    f = h.bottom - h.top
                }
                var i = e.lineObj.height - f;
                if (2 > f && (f = yb(b)), i > .001 || -.001 > i) {
                    ke(e.lineObj, f);
                    var j = e.lineObj.widgets;
                    if (j)
                        for (var k = 0; k < j.length; ++k) j[k].height = j[k].node.offsetHeight
                }
            }
    }

    function S(a) {
        var b = a.display.viewOffset = ne(a, he(a.doc, a.display.showingFrom));
        a.display.mover.style.top = b + "px"
    }

    function T(a, b) {
        for (var c = 0, d = b.length || 0; d > c; ++c) {
            for (var e = b[c], f = [], g = e.diff || 0, h = 0, i = a.length; i > h; ++h) {
                var j = a[h];
                e.to <= j.from && e.diff ? f.push({
                    from: j.from + g,
                    to: j.to + g
                }) : e.to <= j.from || e.from >= j.to ? f.push(j) : (e.from > j.from && f.push({
                    from: j.from,
                    to: e.from
                }), e.to < j.to && f.push({
                    from: e.to + g,
                    to: j.to + g
                }))
            }
            a = f
        }
        return a
    }

    function U(a) {
        for (var b = a.display, c = {}, d = {}, e = b.gutters.firstChild, f = 0; e; e = e.nextSibling, ++f) c[a.options.gutters[f]] = e.offsetLeft, d[a.options.gutters[f]] = e.offsetWidth;
        return {
            fixedPos: O(b),
            gutterTotalWidth: b.gutters.offsetWidth,
            gutterLeft: c,
            gutterWidth: d,
            wrapperWidth: b.wrapper.clientWidth
        }
    }

    function V(a, b, c, d, f) {
        function l(b) {
            var c = b.nextSibling;
            return e && p && a.display.currentWheelTarget == b ? (b.style.display = "none", b.lineObj = null) : b.parentNode.removeChild(b), c
        }
        var g = U(a),
            h = a.display,
            i = a.options.lineNumbers;
        d.length || e && a.display.currentWheelTarget || hf(h.lineDiv);
        var j = h.lineDiv,
            k = j.firstChild,
            m = d.shift(),
            n = b;
        for (a.doc.iter(b, c, function(b) {
            if (m && m.to == n && (m = d.shift()), Cd(a.doc, b)) {
                if (0 != b.height && ke(b, 0), b.widgets && k.previousSibling)
                    for (var c = 0; c < b.widgets.length; ++c) {
                        var e = b.widgets[c];
                        if (e.showIfHidden) {
                            var h = k.previousSibling;
                            if (/pre/i.test(h.nodeName)) {
                                var o = gf("div", null, null, "position: relative");
                                h.parentNode.replaceChild(o, h), o.appendChild(h), h = o
                            }
                            var p = h.appendChild(gf("div", [e.node], "CodeMirror-linewidget"));
                            e.handleMouseEvents || (p.ignoreEvents = !0), X(e, p, h, g)
                        }
                    }
            } else if (m && m.from <= n && m.to > n) {
                for (; k.lineObj != b;) k = l(k);
                i && n >= f && k.lineNumber && kf(k.lineNumber, N(a.options, n)), k = k.nextSibling
            } else {
                if (b.widgets)
                    for (var s, q = 0, r = k; r && 20 > q; ++q, r = r.nextSibling)
                        if (r.lineObj == b && /div/i.test(r.nodeName)) {
                            s = r;
                            break
                        }
                var t = W(a, b, n, g, s);
                if (t != s) j.insertBefore(t, k);
                else {
                    for (; k != s;) k = l(k);
                    k = k.nextSibling
                }
                t.lineObj = b
            }++n
        }); k;) k = l(k)
    }

    function W(a, b, d, e, f) {
        var j, g = Td(a, b),
            h = b.gutterMarkers,
            i = a.display;
        if (!(a.options.lineNumbers || h || b.bgClass || b.wrapClass || b.widgets)) return g;
        if (f) {
            f.alignable = null;
            for (var o, k = !0, l = 0, m = null, n = f.firstChild; n; n = o)
                if (o = n.nextSibling, /\bCodeMirror-linewidget\b/.test(n.className)) {
                    for (var p = 0; p < b.widgets.length; ++p) {
                        var q = b.widgets[p];
                        if (q.node == n.firstChild) {
                            q.above || m || (m = n), X(q, n, f, e), ++l;
                            break
                        }
                    }
                    if (p == b.widgets.length) {
                        k = !1;
                        break
                    }
                } else f.removeChild(n);
            f.insertBefore(g, m), k && l == b.widgets.length && (j = f, f.className = b.wrapClass || "")
        }
        if (j || (j = gf("div", null, b.wrapClass, "position: relative"), j.appendChild(g)), b.bgClass && j.insertBefore(gf("div", null, b.bgClass + " CodeMirror-linebackground"), j.firstChild), a.options.lineNumbers || h) {
            var r = j.insertBefore(gf("div", null, null, "position: absolute; left: " + (a.options.fixedGutter ? e.fixedPos : -e.gutterTotalWidth) + "px"), j.firstChild);
            if (a.options.fixedGutter && (j.alignable || (j.alignable = [])).push(r), !a.options.lineNumbers || h && h["CodeMirror-linenumbers"] || (j.lineNumber = r.appendChild(gf("div", N(a.options, d), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + e.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + i.lineNumInnerWidth + "px"))), h)
                for (var s = 0; s < a.options.gutters.length; ++s) {
                    var t = a.options.gutters[s],
                        u = h.hasOwnProperty(t) && h[t];
                    u && r.appendChild(gf("div", [u], "CodeMirror-gutter-elt", "left: " + e.gutterLeft[t] + "px; width: " + e.gutterWidth[t] + "px"))
                }
        }
        if (c && (j.style.zIndex = 2), b.widgets && j != f)
            for (var p = 0, v = b.widgets; p < v.length; ++p) {
                var q = v[p],
                    w = gf("div", [q.node], "CodeMirror-linewidget");
                q.handleMouseEvents || (w.ignoreEvents = !0), X(q, w, j, e), q.above ? j.insertBefore(w, a.options.lineNumbers && 0 != b.height ? r : g) : j.appendChild(w), Me(q, "redraw")
            }
        return j
    }

    function X(a, b, c, d) {
        if (a.noHScroll) {
            (c.alignable || (c.alignable = [])).push(b);
            var e = d.wrapperWidth;
            b.style.left = d.fixedPos + "px", a.coverGutter || (e -= d.gutterTotalWidth, b.style.paddingLeft = d.gutterTotalWidth + "px"), b.style.width = e + "px"
        }
        a.coverGutter && (b.style.zIndex = 5, b.style.position = "relative", a.noHScroll || (b.style.marginLeft = -d.gutterTotalWidth + "px"))
    }

    function Y(a) {
        var b = a.display,
            c = yc(a.doc.sel.from, a.doc.sel.to);
        if (c || a.options.showCursorWhenSelecting ? Z(a) : b.cursor.style.display = b.otherCursor.style.display = "none", c ? b.selectionDiv.style.display = "none" : $(a), a.options.moveInputWithCursor) {
            var d = tb(a, a.doc.sel.head, "div"),
                e = lf(b.wrapper),
                f = lf(b.lineDiv);
            b.inputDiv.style.top = Math.max(0, Math.min(b.wrapper.clientHeight - 10, d.top + f.top - e.top)) + "px", b.inputDiv.style.left = Math.max(0, Math.min(b.wrapper.clientWidth - 10, d.left + f.left - e.left)) + "px"
        }
    }

    function Z(a) {
        var b = a.display,
            c = tb(a, a.doc.sel.head, "div");
        b.cursor.style.left = c.left + "px", b.cursor.style.top = c.top + "px", b.cursor.style.height = Math.max(0, c.bottom - c.top) * a.options.cursorHeight + "px", b.cursor.style.display = "", c.other ? (b.otherCursor.style.display = "", b.otherCursor.style.left = c.other.left + "px", b.otherCursor.style.top = c.other.top + "px", b.otherCursor.style.height = .85 * (c.other.bottom - c.other.top) + "px") : b.otherCursor.style.display = "none"
    }

    function $(a) {
        function h(a, b, c, d) {
            0 > b && (b = 0), e.appendChild(gf("div", null, "CodeMirror-selected", "position: absolute; left: " + a + "px; top: " + b + "px; width: " + (null == c ? f - a : c) + "px; height: " + (d - b) + "px"))
        }

        function i(b, d, e) {
            function m(c, d) {
                return sb(a, xc(b, c), "div", i, d)
            }
            var k, l, i = he(c, b),
                j = i.text.length;
            return wf(oe(i), d || 0, null == e ? j : e, function(a, b, c) {
                var n, o, p, i = m(a, "left");
                if (a == b) n = i, o = p = i.left;
                else {
                    if (n = m(b - 1, "right"), "rtl" == c) {
                        var q = i;
                        i = n, n = q
                    }
                    o = i.left, p = n.right
                }
                null == d && 0 == a && (o = g), n.top - i.top > 3 && (h(o, i.top, null, i.bottom), o = g, i.bottom < n.top && h(o, i.bottom, null, n.top)), null == e && b == j && (p = f), (!k || i.top < k.top || i.top == k.top && i.left < k.left) && (k = i), (!l || n.bottom > l.bottom || n.bottom == l.bottom && n.right > l.right) && (l = n), g + 1 > o && (o = g), h(o, n.top, p - o, n.bottom)
            }), {
                start: k,
                end: l
            }
        }
        var b = a.display,
            c = a.doc,
            d = a.doc.sel,
            e = document.createDocumentFragment(),
            f = b.lineSpace.offsetWidth,
            g = gb(a.display);
        if (d.from.line == d.to.line) i(d.from.line, d.from.ch, d.to.ch);
        else {
            var j = he(c, d.from.line),
                k = he(c, d.to.line),
                l = Bd(c, j) == Bd(c, k),
                m = i(d.from.line, d.from.ch, l ? j.text.length : null).end,
                n = i(d.to.line, l ? 0 : null, d.to.ch).start;
            l && (m.top < n.top - 2 ? (h(m.right, m.top, null, m.bottom), h(g, n.top, n.left, n.bottom)) : h(m.right, m.top, n.left - m.right, m.bottom)), m.bottom < n.top && h(g, m.bottom, null, n.top)
        }
        jf(b.selectionDiv, e), b.selectionDiv.style.display = ""
    }

    function _(a) {
        if (a.state.focused) {
            var b = a.display;
            clearInterval(b.blinker);
            var c = !0;
            b.cursor.style.visibility = b.otherCursor.style.visibility = "", b.blinker = setInterval(function() {
                b.cursor.style.visibility = b.otherCursor.style.visibility = (c = !c) ? "" : "hidden"
            }, a.options.cursorBlinkRate)
        }
    }

    function ab(a, b) {
        a.doc.mode.startState && a.doc.frontier < a.display.showingTo && a.state.highlight.set(b, bf(bb, a))
    }

    function bb(a) {
        var b = a.doc;
        if (b.frontier < b.first && (b.frontier = b.first), !(b.frontier >= a.display.showingTo)) {
            var f, c = +new Date + a.options.workTime,
                d = dd(b.mode, db(a, b.frontier)),
                e = [];
            b.iter(b.frontier, Math.min(b.first + b.size, a.display.showingTo + 500), function(g) {
                if (b.frontier >= a.display.showingFrom) {
                    var h = g.styles;
                    g.styles = Od(a, g, d);
                    for (var i = !h || h.length != g.styles.length, j = 0; !i && j < h.length; ++j) i = h[j] != g.styles[j];
                    i && (f && f.end == b.frontier ? f.end++ : e.push(f = {
                        start: b.frontier,
                        end: b.frontier + 1
                    })), g.stateAfter = dd(b.mode, d)
                } else Qd(a, g, d), g.stateAfter = 0 == b.frontier % 5 ? dd(b.mode, d) : null;
                return ++b.frontier, +new Date > c ? (ab(a, a.options.workDelay), !0) : void 0
            }), e.length && Db(a, function() {
                for (var a = 0; a < e.length; ++a) Gb(this, e[a].start, e[a].end)
            })()
        }
    }

    function cb(a, b, c) {
        for (var d, e, f = a.doc, g = b, h = b - 100; g > h; --g) {
            if (g <= f.first) return f.first;
            var i = he(f, g - 1);
            if (i.stateAfter && (!c || g <= f.frontier)) return g;
            var j = Ue(i.text, null, a.options.tabSize);
            (null == e || d > j) && (e = g - 1, d = j)
        }
        return e
    }

    function db(a, b, c) {
        var d = a.doc,
            e = a.display;
        if (!d.mode.startState) return !0;
        var f = cb(a, b, c),
            g = f > d.first && he(d, f - 1).stateAfter;
        return g = g ? dd(d.mode, g) : ed(d.mode), d.iter(f, b, function(c) {
            Qd(a, c, g);
            var h = f == b - 1 || 0 == f % 5 || f >= e.showingFrom && f < e.showingTo;
            c.stateAfter = h ? dd(d.mode, g) : null, ++f
        }), g
    }

    function eb(a) {
        return a.lineSpace.offsetTop
    }

    function fb(a) {
        return a.mover.offsetHeight - a.lineSpace.offsetHeight
    }

    function gb(a) {
        var b = jf(a.measure, gf("pre", null, null, "text-align: left")).appendChild(gf("span", "x"));
        return b.offsetLeft
    }

    function hb(a, b, c, d, e) {
        var f = -1;
        d = d || kb(a, b);
        for (var g = c;; g += f) {
            var h = d[g];
            if (h) break;
            0 > f && 0 == g && (f = 1)
        }
        return e = g > c ? "left" : c > g ? "right" : e, "left" == e && h.leftSide ? h = h.leftSide : "right" == e && h.rightSide && (h = h.rightSide), {
            left: c > g ? h.right : h.left,
            right: g > c ? h.left : h.right,
            top: h.top,
            bottom: h.bottom
        }
    }

    function ib(a, b) {
        for (var c = a.display.measureLineCache, d = 0; d < c.length; ++d) {
            var e = c[d];
            if (e.text == b.text && e.markedSpans == b.markedSpans && a.display.scroller.clientWidth == e.width && e.classes == b.textClass + "|" + b.bgClass + "|" + b.wrapClass) return e
        }
    }

    function jb(a, b) {
        var c = ib(a, b);
        c && (c.text = c.measure = c.markedSpans = null)
    }

    function kb(a, b) {
        var c = ib(a, b);
        if (c) return c.measure;
        var d = lb(a, b),
            e = a.display.measureLineCache,
            f = {
                text: b.text,
                width: a.display.scroller.clientWidth,
                markedSpans: b.markedSpans,
                measure: d,
                classes: b.textClass + "|" + b.bgClass + "|" + b.wrapClass
            };
        return 16 == e.length ? e[++a.display.measureLineCachePos % 16] = f : e.push(f), d
    }

    function lb(a, e) {
        function t(a) {
            var b = a.top - p.top,
                c = a.bottom - p.top;
            c > s && (c = s), 0 > b && (b = 0);
            for (var d = q.length - 2; d >= 0; d -= 2) {
                var e = q[d],
                    f = q[d + 1];
                if (!(e > c || b > f) && (b >= e && f >= c || e >= b && c >= f || Math.min(c, f) - Math.max(b, e) >= c - b >> 1)) {
                    q[d] = Math.min(b, e), q[d + 1] = Math.max(c, f);
                    break
                }
            }
            return 0 > d && (d = q.length, q.push(b, c)), {
                left: a.left - p.left,
                right: a.right - p.left,
                top: d,
                bottom: null
            }
        }

        function u(a) {
            a.bottom = q[a.top + 1], a.top = q[a.top]
        }
        var f = a.display,
            g = af(e.text.length),
            h = Td(a, e, g, !0);
        if (b && !c && !a.options.lineWrapping && h.childNodes.length > 100) {
            for (var i = document.createDocumentFragment(), j = 10, k = h.childNodes.length, l = 0, m = Math.ceil(k / j); m > l; ++l) {
                for (var n = gf("div", null, null, "display: inline-block"), o = 0; j > o && k; ++o) n.appendChild(h.firstChild), --k;
                i.appendChild(n)
            }
            h.appendChild(i)
        }
        jf(f.measure, h);
        var p = lf(f.lineDiv),
            q = [],
            r = af(e.text.length),
            s = h.offsetHeight;
        d && f.measure.first != h && jf(f.measure, h);
        for (var v, l = 0; l < g.length; ++l)
            if (v = g[l]) {
                var w = v,
                    x = null;
                if (/\bCodeMirror-widget\b/.test(v.className) && v.getClientRects) {
                    1 == v.firstChild.nodeType && (w = v.firstChild);
                    var y = w.getClientRects();
                    y.length > 1 && (x = r[l] = t(y[0]), x.rightSide = t(y[y.length - 1]))
                }
                x || (x = r[l] = t(lf(w))), v.measureRight && (x.right = lf(v.measureRight).left), v.leftSide && (x.leftSide = t(lf(v.leftSide)))
            }
        for (var v, l = 0; l < r.length; ++l)(v = r[l]) && (u(v), v.leftSide && u(v.leftSide), v.rightSide && u(v.rightSide));
        return r
    }

    function mb(a, b) {
        var c = !1;
        if (b.markedSpans)
            for (var d = 0; d < b.markedSpans; ++d) {
                var e = b.markedSpans[d];
                !e.collapsed || null != e.to && e.to != b.text.length || (c = !0)
            }
        var f = !c && ib(a, b);
        if (f) return hb(a, b, b.text.length, f.measure, "right").right;
        var g = Td(a, b, null, !0),
            h = g.appendChild(rf(a.display.measure));
        return jf(a.display.measure, g), lf(h).right - lf(a.display.lineDiv).left
    }

    function nb(a) {
        a.display.measureLineCache.length = a.display.measureLineCachePos = 0, a.display.cachedCharWidth = a.display.cachedTextHeight = null, a.options.lineWrapping || (a.display.maxLineChanged = !0), a.display.lineNumChars = null
    }

    function ob() {
        return window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }

    function pb() {
        return window.pageYOffset || (document.documentElement || document.body).scrollTop
    }

    function qb(a, b, c, d) {
        if (b.widgets)
            for (var e = 0; e < b.widgets.length; ++e)
                if (b.widgets[e].above) {
                    var f = Id(b.widgets[e]);
                    c.top += f, c.bottom += f
                }
        if ("line" == d) return c;
        d || (d = "local");
        var g = ne(a, b);
        if ("local" == d ? g += eb(a.display) : g -= a.display.viewOffset, "page" == d || "window" == d) {
            var h = lf(a.display.lineSpace);
            g += h.top + ("window" == d ? 0 : pb());
            var i = h.left + ("window" == d ? 0 : ob());
            c.left += i, c.right += i
        }
        return c.top += g, c.bottom += g, c
    }

    function rb(a, b, c) {
        if ("div" == c) return b;
        var d = b.left,
            e = b.top;
        if ("page" == c) d -= ob(), e -= pb();
        else if ("local" == c || !c) {
            var f = lf(a.display.sizer);
            d += f.left, e += f.top
        }
        var g = lf(a.display.lineSpace);
        return {
            left: d - g.left,
            top: e - g.top
        }
    }

    function sb(a, b, c, d, e) {
        return d || (d = he(a.doc, b.line)), qb(a, d, hb(a, d, b.ch, null, e), c)
    }

    function tb(a, b, c, d, e) {
        function f(b, f) {
            var g = hb(a, d, b, e, f ? "right" : "left");
            return f ? g.left = g.right : g.right = g.left, qb(a, d, g, c)
        }

        function g(a, b) {
            var c = h[b],
                d = c.level % 2;
            return a == xf(c) && b && c.level < h[b - 1].level ? (c = h[--b], a = yf(c) - (c.level % 2 ? 0 : 1), d = !0) : a == yf(c) && b < h.length - 1 && c.level < h[b + 1].level && (c = h[++b], a = xf(c) - c.level % 2, d = !1), d && a == c.to && a > c.from ? f(a - 1) : f(a, d)
        }
        d = d || he(a.doc, b.line), e || (e = kb(a, d));
        var h = oe(d),
            i = b.ch;
        if (!h) return f(i);
        var j = Ff(h, i),
            k = g(i, j);
        return null != Ef && (k.other = g(i, Ef)), k
    }

    function ub(a, b, c, d) {
        var e = new xc(a, b);
        return e.xRel = d, c && (e.outside = !0), e
    }

    function vb(a, b, c) {
        var d = a.doc;
        if (c += a.display.viewOffset, 0 > c) return ub(d.first, 0, !0, -1);
        var e = me(d, c),
            f = d.first + d.size - 1;
        if (e > f) return ub(d.first + d.size - 1, he(d, f).text.length, !0, 1);
        for (0 > b && (b = 0);;) {
            var g = he(d, e),
                h = wb(a, g, e, b, c),
                i = Ad(g),
                j = i && i.find();
            if (!i || !(h.ch > j.from.ch || h.ch == j.from.ch && h.xRel > 0)) return h;
            e = j.to.line
        }
    }

    function wb(a, b, c, d, e) {
        function j(d) {
            var e = tb(a, xc(c, d), "line", b, i);
            return g = !0, f > e.bottom ? e.left - h : f < e.top ? e.left + h : (g = !1, e.left)
        }
        var f = e - ne(a, b),
            g = !1,
            h = 2 * a.display.wrapper.clientWidth,
            i = kb(a, b),
            k = oe(b),
            l = b.text.length,
            m = zf(b),
            n = Af(b),
            o = j(m),
            p = g,
            q = j(n),
            r = g;
        if (d > q) return ub(c, n, r, 1);
        for (;;) {
            if (k ? n == m || n == Hf(b, m, 1) : 1 >= n - m) {
                for (var s = o > d || q - d >= d - o ? m : n, t = d - (s == m ? o : q); ff.test(b.text.charAt(s));)++s;
                var u = ub(c, s, s == m ? p : r, 0 > t ? -1 : t ? 1 : 0);
                return u
            }
            var v = Math.ceil(l / 2),
                w = m + v;
            if (k) {
                w = m;
                for (var x = 0; v > x; ++x) w = Hf(b, w, 1)
            }
            var y = j(w);
            y > d ? (n = w, q = y, (r = g) && (q += 1e3), l = v) : (m = w, o = y, p = g, l -= v)
        }
    }

    function yb(a) {
        if (null != a.cachedTextHeight) return a.cachedTextHeight;
        if (null == xb) {
            xb = gf("pre");
            for (var b = 0; 49 > b; ++b) xb.appendChild(document.createTextNode("x")), xb.appendChild(gf("br"));
            xb.appendChild(document.createTextNode("x"))
        }
        jf(a.measure, xb);
        var c = xb.offsetHeight / 50;
        return c > 3 && (a.cachedTextHeight = c), hf(a.measure), c || 1
    }

    function zb(a) {
        if (null != a.cachedCharWidth) return a.cachedCharWidth;
        var b = gf("span", "x"),
            c = gf("pre", [b]);
        jf(a.measure, c);
        var d = b.offsetWidth;
        return d > 2 && (a.cachedCharWidth = d), d || 10
    }

    function Bb(a) {
        a.curOp = {
            changes: [],
            forceUpdate: !1,
            updateInput: null,
            userSelChange: null,
            textChanged: null,
            selectionChanged: !1,
            cursorActivity: !1,
            updateMaxLine: !1,
            updateScrollPos: !1,
            id: ++Ab
        }, Le++ || (Ke = [])
    }

    function Cb(a) {
        var b = a.curOp,
            c = a.doc,
            d = a.display;
        if (a.curOp = null, b.updateMaxLine && H(a), d.maxLineChanged && !a.options.lineWrapping && d.maxLine) {
            var e = mb(a, d.maxLine);
            d.sizer.style.minWidth = Math.max(0, e + 3 + Re) + "px", d.maxLineChanged = !1;
            var f = Math.max(0, d.sizer.offsetLeft + d.sizer.offsetWidth - d.scroller.clientWidth);
            f < c.scrollLeft && !b.updateScrollPos && Yb(a, Math.min(d.scroller.scrollLeft, f), !0)
        }
        var g, h;
        if (b.updateScrollPos) g = b.updateScrollPos;
        else if (b.selectionChanged && d.scroller.clientHeight) {
            var i = tb(a, c.sel.head);
            g = Nc(a, i.left, i.top, i.left, i.bottom)
        }(b.changes.length || b.forceUpdate || g && null != g.scrollTop) && (h = P(a, b.changes, g && g.scrollTop, b.forceUpdate), a.display.scroller.offsetHeight && (a.doc.scrollTop = a.display.scroller.scrollTop)), !h && b.selectionChanged && Y(a), b.updateScrollPos ? (d.scroller.scrollTop = d.scrollbarV.scrollTop = c.scrollTop = g.scrollTop, d.scroller.scrollLeft = d.scrollbarH.scrollLeft = c.scrollLeft = g.scrollLeft, L(a), b.scrollToPos && Lc(a, Cc(a.doc, b.scrollToPos), b.scrollToPosMargin)) : g && Kc(a), b.selectionChanged && _(a), a.state.focused && b.updateInput && Kb(a, b.userSelChange);
        var j = b.maybeHiddenMarkers,
            k = b.maybeUnhiddenMarkers;
        if (j)
            for (var l = 0; l < j.length; ++l) j[l].lines.length || Je(j[l], "hide");
        if (k)
            for (var l = 0; l < k.length; ++l) k[l].lines.length && Je(k[l], "unhide");
        var m;
        if (--Le || (m = Ke, Ke = null), b.textChanged && Je(a, "change", a, b.textChanged), b.cursorActivity && Je(a, "cursorActivity", a), m)
            for (var l = 0; l < m.length; ++l) m[l]()
    }

    function Db(a, b) {
        return function() {
            var c = a || this,
                d = !c.curOp;
            d && Bb(c);
            try {
                var e = b.apply(c, arguments)
            } finally {
                d && Cb(c)
            }
            return e
        }
    }

    function Eb(a) {
        return function() {
            var c, b = this.cm && !this.cm.curOp;
            b && Bb(this.cm);
            try {
                c = a.apply(this, arguments)
            } finally {
                b && Cb(this.cm)
            }
            return c
        }
    }

    function Fb(a, b) {
        var d, c = !a.curOp;
        c && Bb(a);
        try {
            d = b()
        } finally {
            c && Cb(a)
        }
        return d
    }

    function Gb(a, b, c, d) {
        null == b && (b = a.doc.first), null == c && (c = a.doc.first + a.doc.size), a.curOp.changes.push({
            from: b,
            to: c,
            diff: d
        })
    }

    function Hb(a) {
        a.display.pollingFast || a.display.poll.set(a.options.pollInterval, function() {
            Jb(a), a.state.focused && Hb(a)
        })
    }

    function Ib(a) {
        function c() {
            var d = Jb(a);
            d || b ? (a.display.pollingFast = !1, Hb(a)) : (b = !0, a.display.poll.set(60, c))
        }
        var b = !1;
        a.display.pollingFast = !0, a.display.poll.set(20, c)
    }

    function Jb(a) {
        var c = a.display.input,
            e = a.display.prevInput,
            f = a.doc,
            g = f.sel;
        if (!a.state.focused || tf(c) || Mb(a) || a.state.disableInput) return !1;
        var h = c.value;
        if (h == e && yc(g.from, g.to)) return !1;
        if (b && !d && a.display.inputHasSelection === h) return Kb(a, !0), !1;
        var i = !a.curOp;
        i && Bb(a), g.shift = !1;
        for (var j = 0, k = Math.min(e.length, h.length); k > j && e.charCodeAt(j) == h.charCodeAt(j);)++j;
        var l = g.from,
            m = g.to;
        j < e.length ? l = xc(l.line, l.ch - (e.length - j)) : a.state.overwrite && yc(l, m) && !a.state.pasteIncoming && (m = xc(m.line, Math.min(he(f, m.line).text.length, m.ch + (h.length - j))));
        var n = a.curOp.updateInput,
            o = {
                from: l,
                to: m,
                text: sf(h.slice(j)),
                origin: a.state.pasteIncoming ? "paste" : "+input"
            };
        return qc(a.doc, o, "end"), a.curOp.updateInput = n, Me(a, "inputRead", a, o), h.length > 1e3 || h.indexOf("\n") > -1 ? c.value = a.display.prevInput = "" : a.display.prevInput = h, i && Cb(a), a.state.pasteIncoming = !1, !0
    }

    function Kb(a, c) {
        var e, f, g = a.doc;
        if (yc(g.sel.from, g.sel.to)) c && (a.display.prevInput = a.display.input.value = "", b && !d && (a.display.inputHasSelection = null));
        else {
            a.display.prevInput = "", e = uf && (g.sel.to.line - g.sel.from.line > 100 || (f = a.getSelection()).length > 1e3);
            var h = e ? "-" : f || a.getSelection();
            a.display.input.value = h, a.state.focused && Ye(a.display.input), b && !d && (a.display.inputHasSelection = h)
        }
        a.display.inaccurateSelection = e
    }

    function Lb(a) {
        "nocursor" == a.options.readOnly || o && document.activeElement == a.display.input || a.display.input.focus()
    }

    function Mb(a) {
        return a.options.readOnly || a.doc.cantEdit
    }

    function Nb(a) {
        function d() {
            a.state.focused && setTimeout(bf(Lb, a), 0)
        }

        function f() {
            null == e && (e = setTimeout(function() {
                e = null, c.cachedCharWidth = c.cachedTextHeight = of = null, nb(a), Fb(a, bf(Gb, a))
            }, 100))
        }

        function g() {
            for (var a = c.wrapper.parentNode; a && a != document.body; a = a.parentNode);
            a ? setTimeout(g, 5e3) : Ie(window, "resize", f)
        }

        function h(b) {
            Ne(a, b) || a.options.onDragEvent && a.options.onDragEvent(a, Ae(b)) || Ee(b)
        }

        function i() {
            c.inaccurateSelection && (c.prevInput = "", c.inaccurateSelection = !1, c.input.value = a.getSelection(), Ye(c.input))
        }
        var c = a.display;
        He(c.scroller, "mousedown", Db(a, Sb)), b ? He(c.scroller, "dblclick", Db(a, function(b) {
            if (!Ne(a, b)) {
                var c = Pb(a, b);
                if (c && !Tb(a, b) && !Ob(a.display, b)) {
                    Be(b);
                    var d = Uc(he(a.doc, c.line).text, c);
                    Fc(a.doc, d.from, d.to)
                }
            }
        })) : He(c.scroller, "dblclick", function(b) {
            Ne(a, b) || Be(b)
        }), He(c.lineSpace, "selectstart", function(a) {
            Ob(c, a) || Be(a)
        }), t || He(c.scroller, "contextmenu", function(b) {
            lc(a, b)
        }), He(c.scroller, "scroll", function() {
            c.scroller.clientHeight && (Xb(a, c.scroller.scrollTop), Yb(a, c.scroller.scrollLeft, !0), Je(a, "scroll", a))
        }), He(c.scrollbarV, "scroll", function() {
            c.scroller.clientHeight && Xb(a, c.scrollbarV.scrollTop)
        }), He(c.scrollbarH, "scroll", function() {
            c.scroller.clientHeight && Yb(a, c.scrollbarH.scrollLeft)
        }), He(c.scroller, "mousewheel", function(b) {
            _b(a, b)
        }), He(c.scroller, "DOMMouseScroll", function(b) {
            _b(a, b)
        }), He(c.scrollbarH, "mousedown", d), He(c.scrollbarV, "mousedown", d), He(c.wrapper, "scroll", function() {
            c.wrapper.scrollTop = c.wrapper.scrollLeft = 0
        });
        var e;
        He(window, "resize", f), setTimeout(g, 5e3), He(c.input, "keyup", Db(a, function(b) {
            Ne(a, b) || a.options.onKeyEvent && a.options.onKeyEvent(a, Ae(b)) || 16 == b.keyCode && (a.doc.sel.shift = !1)
        })), He(c.input, "input", bf(Ib, a)), He(c.input, "keydown", Db(a, gc)), He(c.input, "keypress", Db(a, hc)), He(c.input, "focus", bf(ic, a)), He(c.input, "blur", bf(jc, a)), a.options.dragDrop && (He(c.scroller, "dragstart", function(b) {
            Wb(a, b)
        }), He(c.scroller, "dragenter", h), He(c.scroller, "dragover", h), He(c.scroller, "drop", Db(a, Vb))), He(c.scroller, "paste", function(b) {
            Ob(c, b) || (Lb(a), Ib(a))
        }), He(c.input, "paste", function() {
            a.state.pasteIncoming = !0, Ib(a)
        }), He(c.input, "cut", i), He(c.input, "copy", i), j && He(c.sizer, "mouseup", function() {
            document.activeElement == c.input && c.input.blur(), Lb(a)
        })
    }

    function Ob(a, b) {
        for (var c = Fe(b); c != a.wrapper; c = c.parentNode)
            if (!c || c.ignoreEvents || c.parentNode == a.sizer && c != a.mover) return !0
    }

    function Pb(a, b, c) {
        var d = a.display;
        if (!c) {
            var e = Fe(b);
            if (e == d.scrollbarH || e == d.scrollbarH.firstChild || e == d.scrollbarV || e == d.scrollbarV.firstChild || e == d.scrollbarFiller || e == d.gutterFiller) return null
        }
        var f, g, h = lf(d.lineSpace);
        try {
            f = b.clientX, g = b.clientY
        } catch (b) {
            return null
        }
        return vb(a, f - h.left, g - h.top)
    }

    function Sb(a) {
        function q(a) {
            if (!yc(p, a)) {
                if (p = a, "single" == j) return Fc(c.doc, Cc(f, h), a), void 0;
                if (n = Cc(f, n), o = Cc(f, o), "double" == j) {
                    var b = Uc(he(f, a.line).text, a);
                    zc(a, n) ? Fc(c.doc, b.from, o) : Fc(c.doc, n, b.to)
                } else "triple" == j && (zc(a, n) ? Fc(c.doc, o, Cc(f, xc(a.line, 0))) : Fc(c.doc, n, Cc(f, xc(a.line + 1, 0))))
            }
        }

        function u(a) {
            var b = ++s,
                e = Pb(c, a, !0);
            if (e)
                if (yc(e, l)) {
                    var h = a.clientY < r.top ? -20 : a.clientY > r.bottom ? 20 : 0;
                    h && setTimeout(Db(c, function() {
                        s == b && (d.scroller.scrollTop += h, u(a))
                    }), 50)
                } else {
                    c.state.focused || ic(c), l = e, q(e);
                    var g = K(d, f);
                    (e.line >= g.to || e.line < g.from) && setTimeout(Db(c, function() {
                        s == b && u(a)
                    }), 150)
                }
        }

        function v(a) {
            s = 1 / 0, Be(a), Lb(c), Ie(document, "mousemove", w), Ie(document, "mouseup", x)
        }
        if (!Ne(this, a)) {
            var c = this,
                d = c.display,
                f = c.doc,
                g = f.sel;
            if (g.shift = a.shiftKey, Ob(d, a)) return e || (d.scroller.draggable = !1, setTimeout(function() {
                d.scroller.draggable = !0
            }, 100)), void 0;
            if (!Tb(c, a)) {
                var h = Pb(c, a);
                switch (Ge(a)) {
                    case 3:
                        return t && lc.call(c, c, a), void 0;
                    case 2:
                        return h && Fc(c.doc, h), setTimeout(bf(Lb, c), 20), Be(a), void 0
                }
                if (!h) return Fe(a) == d.scroller && Be(a), void 0;
                c.state.focused || ic(c);
                var i = +new Date,
                    j = "single";
                if (Rb && Rb.time > i - 400 && yc(Rb.pos, h)) j = "triple", Be(a), setTimeout(bf(Lb, c), 20), Vc(c, h.line);
                else if (Qb && Qb.time > i - 400 && yc(Qb.pos, h)) {
                    j = "double", Rb = {
                        time: i,
                        pos: h
                    }, Be(a);
                    var k = Uc(he(f, h.line).text, h);
                    Fc(c.doc, k.from, k.to)
                } else Qb = {
                    time: i,
                    pos: h
                };
                var l = h;
                if (c.options.dragDrop && mf && !Mb(c) && !yc(g.from, g.to) && !zc(h, g.from) && !zc(g.to, h) && "single" == j) {
                    var m = Db(c, function(b) {
                        e && (d.scroller.draggable = !1), c.state.draggingText = !1, Ie(document, "mouseup", m), Ie(d.scroller, "drop", m), Math.abs(a.clientX - b.clientX) + Math.abs(a.clientY - b.clientY) < 10 && (Be(b), Fc(c.doc, h), Lb(c))
                    });
                    return e && (d.scroller.draggable = !0), c.state.draggingText = m, d.scroller.dragDrop && d.scroller.dragDrop(), He(document, "mouseup", m), He(d.scroller, "drop", m), void 0
                }
                Be(a), "single" == j && Fc(c.doc, Cc(f, h));
                var n = g.from,
                    o = g.to,
                    p = h,
                    r = lf(d.wrapper),
                    s = 0,
                    w = Db(c, function(a) {
                        b || Ge(a) ? u(a) : v(a)
                    }),
                    x = Db(c, v);
                He(document, "mousemove", w), He(document, "mouseup", x)
            }
        }
    }

    function Tb(a, b) {
        var c = a.display;
        try {
            var d = b.clientX,
                e = b.clientY
        } catch (b) {
            return !1
        }
        if (d >= Math.floor(lf(c.gutters).right)) return !1;
        if (Be(b), !Pe(a, "gutterClick")) return !0;
        var f = lf(c.lineDiv);
        if (e > f.bottom) return !0;
        e -= f.top - c.viewOffset;
        for (var g = 0; g < a.options.gutters.length; ++g) {
            var h = c.gutters.childNodes[g];
            if (h && lf(h).right >= d) {
                var i = me(a.doc, e),
                    j = a.options.gutters[g];
                Me(a, "gutterClick", a, i, j, b);
                break
            }
        }
        return !0
    }

    function Vb(a) {
        var c = this;
        if (!(Ne(c, a) || Ob(c.display, a) || c.options.onDragEvent && c.options.onDragEvent(c, Ae(a)))) {
            Be(a), b && (Ub = +new Date);
            var d = Pb(c, a, !0),
                e = a.dataTransfer.files;
            if (d && !Mb(c))
                if (e && e.length && window.FileReader && window.File)
                    for (var f = e.length, g = Array(f), h = 0, i = function(a, b) {
                            var e = new FileReader;
                            e.onload = function() {
                                g[b] = e.result, ++h == f && (d = Cc(c.doc, d), qc(c.doc, {
                                    from: d,
                                    to: d,
                                    text: sf(g.join("\n")),
                                    origin: "paste"
                                }, "around"))
                            }, e.readAsText(a)
                        }, j = 0; f > j; ++j) i(e[j], j);
                else {
                    if (c.state.draggingText && !zc(d, c.doc.sel.from) && !zc(c.doc.sel.to, d)) return c.state.draggingText(a), setTimeout(bf(Lb, c), 20), void 0;
                    try {
                        var g = a.dataTransfer.getData("Text");
                        if (g) {
                            var k = c.doc.sel.from,
                                l = c.doc.sel.to;
                            Hc(c.doc, d, d), c.state.draggingText && wc(c.doc, "", k, l, "paste"), c.replaceSelection(g, null, "paste"), Lb(c), ic(c)
                        }
                    } catch (a) {}
                }
        }
    }

    function Wb(a, c) {
        if (b && (!a.state.draggingText || +new Date - Ub < 100)) return Ee(c), void 0;
        if (!Ne(a, c) && !Ob(a.display, c)) {
            var d = a.getSelection();
            if (c.dataTransfer.setData("Text", d), c.dataTransfer.setDragImage && !i) {
                var e = gf("img", null, null, "position: fixed; left: 0; top: 0;");
                h && (e.width = e.height = 1, a.display.wrapper.appendChild(e), e._top = e.offsetTop), c.dataTransfer.setDragImage(e, 0, 0), h && e.parentNode.removeChild(e)
            }
        }
    }

    function Xb(b, c) {
        Math.abs(b.doc.scrollTop - c) < 2 || (b.doc.scrollTop = c, a || P(b, [], c), b.display.scroller.scrollTop != c && (b.display.scroller.scrollTop = c), b.display.scrollbarV.scrollTop != c && (b.display.scrollbarV.scrollTop = c), a && P(b, []), ab(b, 100))
    }

    function Yb(a, b, c) {
        (c ? b == a.doc.scrollLeft : Math.abs(a.doc.scrollLeft - b) < 2) || (b = Math.min(b, a.display.scroller.scrollWidth - a.display.scroller.clientWidth), a.doc.scrollLeft = b, L(a), a.display.scroller.scrollLeft != b && (a.display.scroller.scrollLeft = b), a.display.scrollbarH.scrollLeft != b && (a.display.scrollbarH.scrollLeft = b))
    }

    function _b(b, c) {
        var d = c.wheelDeltaX,
            f = c.wheelDeltaY;
        null == d && c.detail && c.axis == c.HORIZONTAL_AXIS && (d = c.detail), null == f && c.detail && c.axis == c.VERTICAL_AXIS ? f = c.detail : null == f && (f = c.wheelDelta);
        var g = b.display,
            i = g.scroller;
        if (d && i.scrollWidth > i.clientWidth || f && i.scrollHeight > i.clientHeight) {
            if (f && p && e)
                for (var j = c.target; j != i; j = j.parentNode)
                    if (j.lineObj) {
                        b.display.currentWheelTarget = j;
                        break
                    }
            if (d && !a && !h && null != $b) return f && Xb(b, Math.max(0, Math.min(i.scrollTop + f * $b, i.scrollHeight - i.clientHeight))), Yb(b, Math.max(0, Math.min(i.scrollLeft + d * $b, i.scrollWidth - i.clientWidth))), Be(c), g.wheelStartX = null, void 0;
            if (f && null != $b) {
                var k = f * $b,
                    l = b.doc.scrollTop,
                    m = l + g.wrapper.clientHeight;
                0 > k ? l = Math.max(0, l + k - 50) : m = Math.min(b.doc.height, m + k + 50), P(b, [], {
                    top: l,
                    bottom: m
                })
            }
            20 > Zb && (null == g.wheelStartX ? (g.wheelStartX = i.scrollLeft, g.wheelStartY = i.scrollTop, g.wheelDX = d, g.wheelDY = f, setTimeout(function() {
                if (null != g.wheelStartX) {
                    var a = i.scrollLeft - g.wheelStartX,
                        b = i.scrollTop - g.wheelStartY,
                        c = b && g.wheelDY && b / g.wheelDY || a && g.wheelDX && a / g.wheelDX;
                    g.wheelStartX = g.wheelStartY = null, c && ($b = ($b * Zb + c) / (Zb + 1), ++Zb)
                }
            }, 200)) : (g.wheelDX += d, g.wheelDY += f))
        }
    }

    function ac(a, b, c) {
        if ("string" == typeof b && (b = fd[b], !b)) return !1;
        a.display.pollingFast && Jb(a) && (a.display.pollingFast = !1);
        var d = a.doc,
            e = d.sel.shift,
            f = !1;
        try {
            Mb(a) && (a.state.suppressEdits = !0), c && (d.sel.shift = !1), f = b(a) != Se
        } finally {
            d.sel.shift = e, a.state.suppressEdits = !1
        }
        return f
    }

    function bc(a) {
        var b = a.state.keyMaps.slice(0);
        return a.options.extraKeys && b.push(a.options.extraKeys), b.push(a.options.keyMap), b
    }

    function dc(a, b) {
        var c = hd(a.options.keyMap),
            e = c.auto;
        clearTimeout(cc), e && !jd(b) && (cc = setTimeout(function() {
            hd(a.options.keyMap) == c && (a.options.keyMap = e.call ? e.call(null, a) : e, C(a))
        }, 50));
        var f = kd(b, !0),
            g = !1;
        if (!f) return !1;
        var h = bc(a);
        return g = b.shiftKey ? id("Shift-" + f, h, function(b) {
            return ac(a, b, !0)
        }) || id(f, h, function(b) {
            return ("string" == typeof b ? /^go[A-Z]/.test(b) : b.motion) ? ac(a, b) : void 0
        }) : id(f, h, function(b) {
            return ac(a, b)
        }), g && (Be(b), _(a), d && (b.oldKeyCode = b.keyCode, b.keyCode = 0), Me(a, "keyHandled", a, f, b)), g
    }

    function ec(a, b, c) {
        var d = id("'" + c + "'", bc(a), function(b) {
            return ac(a, b, !0)
        });
        return d && (Be(b), _(a), Me(a, "keyHandled", a, "'" + c + "'", b)), d
    }

    function gc(a) {
        var c = this;
        if (c.state.focused || ic(c), b && 27 == a.keyCode && (a.returnValue = !1), !(Ne(c, a) || c.options.onKeyEvent && c.options.onKeyEvent(c, Ae(a)))) {
            var d = a.keyCode;
            c.doc.sel.shift = 16 == d || a.shiftKey;
            var e = dc(c, a);
            h && (fc = e ? d : null, !e && 88 == d && !uf && (p ? a.metaKey : a.ctrlKey) && c.replaceSelection(""))
        }
    }

    function hc(a) {
        var c = this;
        if (!(Ne(c, a) || c.options.onKeyEvent && c.options.onKeyEvent(c, Ae(a)))) {
            var e = a.keyCode,
                f = a.charCode;
            if (h && e == fc) return fc = null, Be(a), void 0;
            if (!(h && (!a.which || a.which < 10) || j) || !dc(c, a)) {
                var g = String.fromCharCode(null == f ? e : f);
                this.options.electricChars && this.doc.mode.electricChars && this.options.smartIndent && !Mb(this) && this.doc.mode.electricChars.indexOf(g) > -1 && setTimeout(Db(c, function() {
                    Qc(c, c.doc.sel.to.line, "smart")
                }), 75), ec(c, a, g) || (b && !d && (c.display.inputHasSelection = null), Ib(c))
            }
        }
    }

    function ic(a) {
        "nocursor" != a.options.readOnly && (a.state.focused || (Je(a, "focus", a), a.state.focused = !0, -1 == a.display.wrapper.className.search(/\bCodeMirror-focused\b/) && (a.display.wrapper.className += " CodeMirror-focused"), Kb(a, !0)), Hb(a), _(a))
    }

    function jc(a) {
        a.state.focused && (Je(a, "blur", a), a.state.focused = !1, a.display.wrapper.className = a.display.wrapper.className.replace(" CodeMirror-focused", "")), clearInterval(a.display.blinker), setTimeout(function() {
            a.state.focused || (a.doc.sel.shift = !1)
        }, 150)
    }

    function lc(a, c) {
        function k() {
            if (null != e.input.selectionStart) {
                var a = e.input.value = " " + (yc(f.from, f.to) ? "" : e.input.value);
                e.prevInput = " ", e.input.selectionStart = 1, e.input.selectionEnd = a.length
            }
        }

        function l() {
            if (e.inputDiv.style.position = "relative", e.input.style.cssText = j, d && (e.scrollbarV.scrollTop = e.scroller.scrollTop = i), Hb(a), null != e.input.selectionStart) {
                (!b || d) && k(), clearTimeout(kc);
                var c = 0,
                    f = function() {
                        " " == e.prevInput && 0 == e.input.selectionStart ? Db(a, fd.selectAll)(a) : c++ < 10 ? kc = setTimeout(f, 500) : Kb(a)
                    };
                kc = setTimeout(f, 200)
            }
        }
        if (!Ne(a, c, "contextmenu")) {
            var e = a.display,
                f = a.doc.sel;
            if (!Ob(e, c)) {
                var g = Pb(a, c),
                    i = e.scroller.scrollTop;
                if (g && !h) {
                    (yc(f.from, f.to) || zc(g, f.from) || !zc(g, f.to)) && Db(a, Hc)(a.doc, g, g);
                    var j = e.input.style.cssText;
                    if (e.inputDiv.style.position = "absolute", e.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (c.clientY - 5) + "px; left: " + (c.clientX - 5) + "px; z-index: 1000; background: white; outline: none;" + "border-width: 0; outline: none; overflow: hidden; opacity: .05; -ms-opacity: .05; filter: alpha(opacity=5);", Lb(a), Kb(a, !0), yc(f.from, f.to) && (e.input.value = e.prevInput = " "), b && !d && k(), t) {
                        Ee(c);
                        var m = function() {
                            Ie(window, "mouseup", m), setTimeout(l, 20)
                        };
                        He(window, "mouseup", m)
                    } else setTimeout(l, 50)
                }
            }
        }
    }

    function nc(a, b, c) {
        if (!zc(b.from, c)) return Cc(a, c);
        var d = b.text.length - 1 - (b.to.line - b.from.line);
        if (c.line > b.to.line + d) {
            var e = c.line - d,
                f = a.first + a.size - 1;
            return e > f ? xc(f, he(a, f).text.length) : Dc(c, he(a, e).text.length)
        }
        if (c.line == b.to.line + d) return Dc(c, Xe(b.text).length + (1 == b.text.length ? b.from.ch : 0) + he(a, b.to.line).text.length - b.to.ch);
        var g = c.line - b.from.line;
        return Dc(c, b.text[g].length + (g ? 0 : b.from.ch))
    }

    function oc(a, b, c) {
        if (c && "object" == typeof c) return {
            anchor: nc(a, b, c.anchor),
            head: nc(a, b, c.head)
        };
        if ("start" == c) return {
            anchor: b.from,
            head: b.from
        };
        var d = mc(b);
        if ("around" == c) return {
            anchor: b.from,
            head: d
        };
        if ("end" == c) return {
            anchor: d,
            head: d
        };
        var e = function(a) {
            if (zc(a, b.from)) return a;
            if (!zc(b.to, a)) return d;
            var c = a.line + b.text.length - (b.to.line - b.from.line) - 1,
                e = a.ch;
            return a.line == b.to.line && (e += d.ch - b.to.ch), xc(c, e)
        };
        return {
            anchor: e(a.sel.anchor),
            head: e(a.sel.head)
        }
    }

    function pc(a, b, c) {
        var d = {
            canceled: !1,
            from: b.from,
            to: b.to,
            text: b.text,
            origin: b.origin,
            cancel: function() {
                this.canceled = !0
            }
        };
        return c && (d.update = function(b, c, d, e) {
            b && (this.from = Cc(a, b)), c && (this.to = Cc(a, c)), d && (this.text = d), void 0 !== e && (this.origin = e)
        }), Je(a, "beforeChange", a, d), a.cm && Je(a.cm, "beforeChange", a.cm, d), d.canceled ? null : {
            from: d.from,
            to: d.to,
            text: d.text,
            origin: d.origin
        }
    }

    function qc(a, b, c, d) {
        if (a.cm) {
            if (!a.cm.curOp) return Db(a.cm, qc)(a, b, c, d);
            if (a.cm.state.suppressEdits) return
        }
        if (!(Pe(a, "beforeChange") || a.cm && Pe(a.cm, "beforeChange")) || (b = pc(a, b, !0))) {
            var e = u && !d && xd(a, b.from, b.to);
            if (e) {
                for (var f = e.length - 1; f >= 1; --f) rc(a, {
                    from: e[f].from,
                    to: e[f].to,
                    text: [""]
                });
                e.length && rc(a, {
                    from: e[0].from,
                    to: e[0].to,
                    text: b.text
                }, c)
            } else rc(a, b, c)
        }
    }

    function rc(a, b, c) {
        var d = oc(a, b, c);
        se(a, b, d, a.cm ? a.cm.curOp.id : 0 / 0), uc(a, b, d, vd(a, b));
        var e = [];
        fe(a, function(a, c) {
            c || -1 != Ze(e, a.history) || (ye(a.history, b), e.push(a.history)), uc(a, b, null, vd(a, b))
        })
    }

    function sc(a, b) {
        if (!a.cm || !a.cm.state.suppressEdits) {
            var c = a.history,
                d = ("undo" == b ? c.done : c.undone).pop();
            if (d) {
                var e = {
                    changes: [],
                    anchorBefore: d.anchorAfter,
                    headBefore: d.headAfter,
                    anchorAfter: d.anchorBefore,
                    headAfter: d.headBefore,
                    generation: c.generation
                };
                ("undo" == b ? c.undone : c.done).push(e), c.generation = d.generation || ++c.maxGeneration;
                for (var f = Pe(a, "beforeChange") || a.cm && Pe(a.cm, "beforeChange"), g = d.changes.length - 1; g >= 0; --g) {
                    var h = d.changes[g];
                    if (h.origin = b, f && !pc(a, h, !1)) return ("undo" == b ? c.done : c.undone).length = 0, void 0;
                    e.changes.push(re(a, h));
                    var i = g ? oc(a, h, null) : {
                        anchor: d.anchorBefore,
                        head: d.headBefore
                    };
                    uc(a, h, i, wd(a, h));
                    var j = [];
                    fe(a, function(a, b) {
                        b || -1 != Ze(j, a.history) || (ye(a.history, h), j.push(a.history)), uc(a, h, null, wd(a, h))
                    })
                }
            }
        }
    }

    function tc(a, b) {
        function c(a) {
            return xc(a.line + b, a.ch)
        }
        a.first += b, a.cm && Gb(a.cm, a.first, a.first, b), a.sel.head = c(a.sel.head), a.sel.anchor = c(a.sel.anchor), a.sel.from = c(a.sel.from), a.sel.to = c(a.sel.to)
    }

    function uc(a, b, c, d) {
        if (a.cm && !a.cm.curOp) return Db(a.cm, uc)(a, b, c, d);
        if (b.to.line < a.first) return tc(a, b.text.length - 1 - (b.to.line - b.from.line)), void 0;
        if (!(b.from.line > a.lastLine())) {
            if (b.from.line < a.first) {
                var e = b.text.length - 1 - (a.first - b.from.line);
                tc(a, e), b = {
                    from: xc(a.first, 0),
                    to: xc(b.to.line + e, b.to.ch),
                    text: [Xe(b.text)],
                    origin: b.origin
                }
            }
            var f = a.lastLine();
            b.to.line > f && (b = {
                from: b.from,
                to: xc(f, he(a, f).text.length),
                text: [b.text[0]],
                origin: b.origin
            }), b.removed = ie(a, b.from, b.to), c || (c = oc(a, b, null)), a.cm ? vc(a.cm, b, d, c) : $d(a, b, d, c)
        }
    }

    function vc(a, b, c, d) {
        var e = a.doc,
            f = a.display,
            g = b.from,
            h = b.to,
            i = !1,
            j = g.line;
        a.options.lineWrapping || (j = le(Bd(e, he(e, g.line))), e.iter(j, h.line + 1, function(a) {
            return a == f.maxLine ? (i = !0, !0) : void 0
        })), zc(e.sel.head, b.from) || zc(b.to, e.sel.head) || (a.curOp.cursorActivity = !0), $d(e, b, c, d, A(a)), a.options.lineWrapping || (e.iter(j, g.line + b.text.length, function(a) {
            var b = G(e, a);
            b > f.maxLineLength && (f.maxLine = a, f.maxLineLength = b, f.maxLineChanged = !0, i = !1)
        }), i && (a.curOp.updateMaxLine = !0)), e.frontier = Math.min(e.frontier, g.line), ab(a, 400);
        var k = b.text.length - (h.line - g.line) - 1;
        if (Gb(a, g.line, h.line + 1, k), Pe(a, "change")) {
            var l = {
                from: g,
                to: h,
                text: b.text,
                removed: b.removed,
                origin: b.origin
            };
            if (a.curOp.textChanged) {
                for (var m = a.curOp.textChanged; m.next; m = m.next);
                m.next = l
            } else a.curOp.textChanged = l
        }
    }

    function wc(a, b, c, d, e) {
        if (d || (d = c), zc(d, c)) {
            var f = d;
            d = c, c = f
        }
        "string" == typeof b && (b = sf(b)), qc(a, {
            from: c,
            to: d,
            text: b,
            origin: e
        }, null)
    }

    function xc(a, b) {
        return this instanceof xc ? (this.line = a, this.ch = b, void 0) : new xc(a, b)
    }

    function yc(a, b) {
        return a.line == b.line && a.ch == b.ch
    }

    function zc(a, b) {
        return a.line < b.line || a.line == b.line && a.ch < b.ch
    }

    function Ac(a) {
        return xc(a.line, a.ch)
    }

    function Bc(a, b) {
        return Math.max(a.first, Math.min(b, a.first + a.size - 1))
    }

    function Cc(a, b) {
        if (b.line < a.first) return xc(a.first, 0);
        var c = a.first + a.size - 1;
        return b.line > c ? xc(c, he(a, c).text.length) : Dc(b, he(a, b.line).text.length)
    }

    function Dc(a, b) {
        var c = a.ch;
        return null == c || c > b ? xc(a.line, b) : 0 > c ? xc(a.line, 0) : a
    }

    function Ec(a, b) {
        return b >= a.first && b < a.first + a.size
    }

    function Fc(a, b, c, d) {
        if (a.sel.shift || a.sel.extend) {
            var e = a.sel.anchor;
            if (c) {
                var f = zc(b, e);
                f != zc(c, e) ? (e = b, b = c) : f != zc(b, c) && (b = c)
            }
            Hc(a, e, b, d)
        } else Hc(a, b, c || b, d);
        a.cm && (a.cm.curOp.userSelChange = !0)
    }

    function Gc(a, b, c) {
        var d = {
            anchor: b,
            head: c
        };
        return Je(a, "beforeSelectionChange", a, d), a.cm && Je(a.cm, "beforeSelectionChange", a.cm, d), d.anchor = Cc(a, d.anchor), d.head = Cc(a, d.head), d
    }

    function Hc(a, b, c, d, e) {
        if (!e && Pe(a, "beforeSelectionChange") || a.cm && Pe(a.cm, "beforeSelectionChange")) {
            var f = Gc(a, b, c);
            c = f.head, b = f.anchor
        }
        var g = a.sel;
        if (g.goalColumn = null, (e || !yc(b, g.anchor)) && (b = Jc(a, b, d, "push" != e)), (e || !yc(c, g.head)) && (c = Jc(a, c, d, "push" != e)), !yc(g.anchor, b) || !yc(g.head, c)) {
            g.anchor = b, g.head = c;
            var h = zc(c, b);
            g.from = h ? c : b, g.to = h ? b : c, a.cm && (a.cm.curOp.updateInput = a.cm.curOp.selectionChanged = a.cm.curOp.cursorActivity = !0), Me(a, "cursorActivity", a)
        }
    }

    function Ic(a) {
        Hc(a.doc, a.doc.sel.from, a.doc.sel.to, null, "push")
    }

    function Jc(a, b, c, d) {
        var e = !1,
            f = b,
            g = c || 1;
        a.cantEdit = !1;
        a: for (;;) {
            var h = he(a, f.line);
            if (h.markedSpans)
                for (var i = 0; i < h.markedSpans.length; ++i) {
                    var j = h.markedSpans[i],
                        k = j.marker;
                    if ((null == j.from || (k.inclusiveLeft ? j.from <= f.ch : j.from < f.ch)) && (null == j.to || (k.inclusiveRight ? j.to >= f.ch : j.to > f.ch))) {
                        if (d && (Je(k, "beforeCursorEnter"), k.explicitlyCleared)) {
                            if (h.markedSpans) {
                                --i;
                                continue
                            }
                            break
                        }
                        if (!k.atomic) continue;
                        var l = k.find()[0 > g ? "from" : "to"];
                        if (yc(l, f) && (l.ch += g, l.ch < 0 ? l = l.line > a.first ? Cc(a, xc(l.line - 1)) : null : l.ch > h.text.length && (l = l.line < a.first + a.size - 1 ? xc(l.line + 1, 0) : null), !l)) {
                            if (e) return d ? (a.cantEdit = !0, xc(a.first, 0)) : Jc(a, b, c, !0);
                            e = !0, l = b, g = -g
                        }
                        f = l;
                        continue a
                    }
                }
            return f
        }
    }

    function Kc(a) {
        var b = Lc(a, a.doc.sel.head, a.options.cursorScrollMargin);
        if (a.state.focused) {
            var c = a.display,
                d = lf(c.sizer),
                e = null;
            if (b.top + d.top < 0 ? e = !0 : b.bottom + d.top > (window.innerHeight || document.documentElement.clientHeight) && (e = !1), null != e && !m) {
                var f = "none" == c.cursor.style.display;
                f && (c.cursor.style.display = "", c.cursor.style.left = b.left + "px", c.cursor.style.top = b.top - c.viewOffset + "px"), c.cursor.scrollIntoView(e), f && (c.cursor.style.display = "none")
            }
        }
    }

    function Lc(a, b, c) {
        for (null == c && (c = 0);;) {
            var d = !1,
                e = tb(a, b),
                f = Nc(a, e.left, e.top - c, e.left, e.bottom + c),
                g = a.doc.scrollTop,
                h = a.doc.scrollLeft;
            if (null != f.scrollTop && (Xb(a, f.scrollTop), Math.abs(a.doc.scrollTop - g) > 1 && (d = !0)), null != f.scrollLeft && (Yb(a, f.scrollLeft), Math.abs(a.doc.scrollLeft - h) > 1 && (d = !0)), !d) return e
        }
    }

    function Mc(a, b, c, d, e) {
        var f = Nc(a, b, c, d, e);
        null != f.scrollTop && Xb(a, f.scrollTop), null != f.scrollLeft && Yb(a, f.scrollLeft)
    }

    function Nc(a, b, c, d, e) {
        var f = a.display,
            g = yb(a.display);
        0 > c && (c = 0);
        var h = f.scroller.clientHeight - Re,
            i = f.scroller.scrollTop,
            j = {}, k = a.doc.height + fb(f),
            l = g > c,
            m = e > k - g;
        if (i > c) j.scrollTop = l ? 0 : c;
        else if (e > i + h) {
            var n = Math.min(c, (m ? k : e) - h);
            n != i && (j.scrollTop = n)
        }
        var o = f.scroller.clientWidth - Re,
            p = f.scroller.scrollLeft;
        b += f.gutters.offsetWidth, d += f.gutters.offsetWidth;
        var q = f.gutters.offsetWidth,
            r = q + 10 > b;
        return p + q > b || r ? (r && (b = 0), j.scrollLeft = Math.max(0, b - 10 - q)) : d > o + p - 3 && (j.scrollLeft = d + 10 - o), j
    }

    function Oc(a, b, c) {
        a.curOp.updateScrollPos = {
            scrollLeft: null == b ? a.doc.scrollLeft : b,
            scrollTop: null == c ? a.doc.scrollTop : c
        }
    }

    function Pc(a, b, c) {
        var d = a.curOp.updateScrollPos || (a.curOp.updateScrollPos = {
            scrollLeft: a.doc.scrollLeft,
            scrollTop: a.doc.scrollTop
        }),
            e = a.display.scroller;
        d.scrollTop = Math.max(0, Math.min(e.scrollHeight - e.clientHeight, d.scrollTop + c)), d.scrollLeft = Math.max(0, Math.min(e.scrollWidth - e.clientWidth, d.scrollLeft + b))
    }

    function Qc(a, b, c, d) {
        var e = a.doc;
        if (null == c && (c = "add"), "smart" == c)
            if (a.doc.mode.indent) var f = db(a, b);
            else c = "prev";
        var k, g = a.options.tabSize,
            h = he(e, b),
            i = Ue(h.text, null, g),
            j = h.text.match(/^\s*/)[0];
        if ("smart" == c && (k = a.doc.mode.indent(f, h.text.slice(j.length), h.text), k == Se)) {
            if (!d) return;
            c = "prev"
        }
        "prev" == c ? k = b > e.first ? Ue(he(e, b - 1).text, null, g) : 0 : "add" == c ? k = i + a.options.indentUnit : "subtract" == c ? k = i - a.options.indentUnit : "number" == typeof c && (k = i + c), k = Math.max(0, k);
        var l = "",
            m = 0;
        if (a.options.indentWithTabs)
            for (var n = Math.floor(k / g); n; --n) m += g, l += "	";
        k > m && (l += We(k - m)), l != j && wc(a.doc, l, xc(b, 0), xc(b, j.length), "+input"), h.stateAfter = null
    }

    function Rc(a, b, c) {
        var d = b,
            e = b,
            f = a.doc;
        return "number" == typeof b ? e = he(f, Bc(f, b)) : d = le(b), null == d ? null : c(e, d) ? (Gb(a, d, d + 1), e) : null
    }

    function Sc(a, b, c, d, e) {
        function k() {
            var b = f + c;
            return b < a.first || b >= a.first + a.size ? j = !1 : (f = b, i = he(a, b))
        }

        function l(a) {
            var b = (e ? Hf : If)(i, g, c, !0);
            if (null == b) {
                if (a || !k()) return j = !1;
                g = e ? (0 > c ? Af : zf)(i) : 0 > c ? i.text.length : 0
            } else g = b;
            return !0
        }
        var f = b.line,
            g = b.ch,
            h = c,
            i = he(a, f),
            j = !0;
        if ("char" == d) l();
        else if ("column" == d) l(!0);
        else if ("word" == d || "group" == d)
            for (var m = null, n = "group" == d, o = !0; !(0 > c) || l(!o); o = !1) {
                var p = i.text.charAt(g) || "\n",
                    q = df(p) ? "w" : n ? /\s/.test(p) ? null : "p" : null;
                if (m && m != q) {
                    0 > c && (c = 1, l());
                    break
                }
                if (q && (m = q), c > 0 && !l(!o)) break
            }
        var r = Jc(a, xc(f, g), h, !0);
        return j || (r.hitSide = !0), r
    }

    function Tc(a, b, c, d) {
        var g, e = a.doc,
            f = b.left;
        if ("page" == d) {
            var h = Math.min(a.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
            g = b.top + c * (h - (0 > c ? 1.5 : .5) * yb(a.display))
        } else "line" == d && (g = c > 0 ? b.bottom + 3 : b.top - 3);
        for (;;) {
            var i = vb(a, f, g);
            if (!i.outside) break;
            if (0 > c ? 0 >= g : g >= e.height) {
                i.hitSide = !0;
                break
            }
            g += 5 * c
        }
        return i
    }

    function Uc(a, b) {
        var c = b.ch,
            d = b.ch;
        if (a) {
            (b.xRel < 0 || d == a.length) && c ? --c : ++d;
            for (var e = a.charAt(c), f = df(e) ? df : /\s/.test(e) ? function(a) {
                    return /\s/.test(a)
                } : function(a) {
                    return !/\s/.test(a) && !df(a)
                }; c > 0 && f(a.charAt(c - 1));)--c;
            for (; d < a.length && f(a.charAt(d));)++d
        }
        return {
            from: xc(b.line, c),
            to: xc(b.line, d)
        }
    }

    function Vc(a, b) {
        Fc(a.doc, xc(b, 0), Cc(a.doc, xc(b + 1, 0)))
    }

    function Yc(a, b, c, d) {
        w.defaults[a] = b, c && (Wc[a] = d ? function(a, b, d) {
            d != Zc && c(a, b, d)
        } : c)
    }

    function dd(a, b) {
        if (b === !0) return b;
        if (a.copyState) return a.copyState(b);
        var c = {};
        for (var d in b) {
            var e = b[d];
            e instanceof Array && (e = e.concat([])), c[d] = e
        }
        return c
    }

    function ed(a, b, c) {
        return a.startState ? a.startState(b, c) : !0
    }

    function hd(a) {
        return "string" == typeof a ? gd[a] : a
    }

    function id(a, b, c) {
        function d(b) {
            b = hd(b);
            var e = b[a];
            if (e === !1) return "stop";
            if (null != e && c(e)) return !0;
            if (b.nofallthrough) return "stop";
            var f = b.fallthrough;
            if (null == f) return !1;
            if ("[object Array]" != Object.prototype.toString.call(f)) return d(f);
            for (var g = 0, h = f.length; h > g; ++g) {
                var i = d(f[g]);
                if (i) return i
            }
            return !1
        }
        for (var e = 0; e < b.length; ++e) {
            var f = d(b[e]);
            if (f) return "stop" != f
        }
    }

    function jd(a) {
        var b = vf[a.keyCode];
        return "Ctrl" == b || "Alt" == b || "Shift" == b || "Mod" == b
    }

    function kd(a, b) {
        if (h && 34 == a.keyCode && a["char"]) return !1;
        var c = vf[a.keyCode];
        return null == c || a.altGraphKey ? !1 : (a.altKey && (c = "Alt-" + c), (s ? a.metaKey : a.ctrlKey) && (c = "Ctrl-" + c), (s ? a.ctrlKey : a.metaKey) && (c = "Cmd-" + c), !b && a.shiftKey && (c = "Shift-" + c), c)
    }

    function ld(a, b) {
        this.pos = this.start = 0, this.string = a, this.tabSize = b || 8, this.lastColumnPos = this.lastColumnValue = 0
    }

    function md(a, b) {
        this.lines = [], this.type = b, this.doc = a
    }

    function nd(a, b, c, d, e) {
        if (d && d.shared) return pd(a, b, c, d, e);
        if (a.cm && !a.cm.curOp) return Db(a.cm, nd)(a, b, c, d, e);
        var f = new md(a, e);
        if ("range" == e && !zc(b, c)) return f;
        d && _e(d, f), f.replacedWith && (f.collapsed = !0, f.replacedWith = gf("span", [f.replacedWith], "CodeMirror-widget"), d.handleMouseEvents || (f.replacedWith.ignoreEvents = !0)), f.collapsed && (v = !0), f.addToHistory && se(a, {
            from: b,
            to: c,
            origin: "markText"
        }, {
            head: a.sel.head,
            anchor: a.sel.anchor
        }, 0 / 0);
        var i, j, l, g = b.line,
            h = 0,
            k = a.cm;
        if (a.iter(g, c.line + 1, function(d) {
            k && f.collapsed && !k.options.lineWrapping && Bd(a, d) == k.display.maxLine && (l = !0);
            var e = {
                from: null,
                to: null,
                marker: f
            };
            h += d.text.length, g == b.line && (e.from = b.ch, h -= b.ch), g == c.line && (e.to = c.ch, h -= d.text.length - c.ch), f.collapsed && (g == c.line && (j = yd(d, c.ch)), g == b.line ? i = yd(d, b.ch) : ke(d, 0)), sd(d, e), ++g
        }), f.collapsed && a.iter(b.line, c.line + 1, function(b) {
            Cd(a, b) && ke(b, 0)
        }), f.clearOnEnter && He(f, "beforeCursorEnter", function() {
            f.clear()
        }), f.readOnly && (u = !0, (a.history.done.length || a.history.undone.length) && a.clearHistory()), f.collapsed) {
            if (i != j) throw new Error("Inserting collapsed marker overlapping an existing one");
            f.size = h, f.atomic = !0
        }
        return k && (l && (k.curOp.updateMaxLine = !0), (f.className || f.title || f.startStyle || f.endStyle || f.collapsed) && Gb(k, b.line, c.line + 1), f.atomic && Ic(k)), f
    }

    function od(a, b) {
        this.markers = a, this.primary = b;
        for (var c = 0, d = this; c < a.length; ++c) a[c].parent = this, He(a[c], "clear", function() {
            d.clear()
        })
    }

    function pd(a, b, c, d, e) {
        d = _e(d), d.shared = !1;
        var f = [nd(a, b, c, d, e)],
            g = f[0],
            h = d.replacedWith;
        return fe(a, function(a) {
            h && (d.replacedWith = h.cloneNode(!0)), f.push(nd(a, Cc(a, b), Cc(a, c), d, e));
            for (var i = 0; i < a.linked.length; ++i)
                if (a.linked[i].isParent) return;
            g = Xe(f)
        }), new od(f, g)
    }

    function qd(a, b) {
        if (a)
            for (var c = 0; c < a.length; ++c) {
                var d = a[c];
                if (d.marker == b) return d
            }
    }

    function rd(a, b) {
        for (var c, d = 0; d < a.length; ++d) a[d] != b && (c || (c = [])).push(a[d]);
        return c
    }

    function sd(a, b) {
        a.markedSpans = a.markedSpans ? a.markedSpans.concat([b]) : [b], b.marker.attachLine(a)
    }

    function td(a, b, c) {
        if (a)
            for (var e, d = 0; d < a.length; ++d) {
                var f = a[d],
                    g = f.marker,
                    h = null == f.from || (g.inclusiveLeft ? f.from <= b : f.from < b);
                if (h || "bookmark" == g.type && f.from == b && (!c || !f.marker.insertLeft)) {
                    var i = null == f.to || (g.inclusiveRight ? f.to >= b : f.to > b);
                    (e || (e = [])).push({
                        from: f.from,
                        to: i ? null : f.to,
                        marker: g
                    })
                }
            }
        return e
    }

    function ud(a, b, c) {
        if (a)
            for (var e, d = 0; d < a.length; ++d) {
                var f = a[d],
                    g = f.marker,
                    h = null == f.to || (g.inclusiveRight ? f.to >= b : f.to > b);
                if (h || "bookmark" == g.type && f.from == b && (!c || f.marker.insertLeft)) {
                    var i = null == f.from || (g.inclusiveLeft ? f.from <= b : f.from < b);
                    (e || (e = [])).push({
                        from: i ? null : f.from - b,
                        to: null == f.to ? null : f.to - b,
                        marker: g
                    })
                }
            }
        return e
    }

    function vd(a, b) {
        var c = Ec(a, b.from.line) && he(a, b.from.line).markedSpans,
            d = Ec(a, b.to.line) && he(a, b.to.line).markedSpans;
        if (!c && !d) return null;
        var e = b.from.ch,
            f = b.to.ch,
            g = yc(b.from, b.to),
            h = td(c, e, g),
            i = ud(d, f, g),
            j = 1 == b.text.length,
            k = Xe(b.text).length + (j ? e : 0);
        if (h)
            for (var l = 0; l < h.length; ++l) {
                var m = h[l];
                if (null == m.to) {
                    var n = qd(i, m.marker);
                    n ? j && (m.to = null == n.to ? null : n.to + k) : m.to = e
                }
            }
        if (i)
            for (var l = 0; l < i.length; ++l) {
                var m = i[l];
                if (null != m.to && (m.to += k), null == m.from) {
                    var n = qd(h, m.marker);
                    n || (m.from = k, j && (h || (h = [])).push(m))
                } else m.from += k, j && (h || (h = [])).push(m)
            }
        if (j && h) {
            for (var l = 0; l < h.length; ++l) null != h[l].from && h[l].from == h[l].to && "bookmark" != h[l].marker.type && h.splice(l--, 1);
            h.length || (h = null)
        }
        var o = [h];
        if (!j) {
            var q, p = b.text.length - 2;
            if (p > 0 && h)
                for (var l = 0; l < h.length; ++l) null == h[l].to && (q || (q = [])).push({
                    from: null,
                    to: null,
                    marker: h[l].marker
                });
            for (var l = 0; p > l; ++l) o.push(q);
            o.push(i)
        }
        return o
    }

    function wd(a, b) {
        var c = ue(a, b),
            d = vd(a, b);
        if (!c) return d;
        if (!d) return c;
        for (var e = 0; e < c.length; ++e) {
            var f = c[e],
                g = d[e];
            if (f && g) a: for (var h = 0; h < g.length; ++h) {
                for (var i = g[h], j = 0; j < f.length; ++j)
                    if (f[j].marker == i.marker) continue a;
                f.push(i)
            } else g && (c[e] = g)
        }
        return c
    }

    function xd(a, b, c) {
        var d = null;
        if (a.iter(b.line, c.line + 1, function(a) {
            if (a.markedSpans)
                for (var b = 0; b < a.markedSpans.length; ++b) {
                    var c = a.markedSpans[b].marker;
                    !c.readOnly || d && -1 != Ze(d, c) || (d || (d = [])).push(c)
                }
        }), !d) return null;
        for (var e = [{
            from: b,
            to: c
        }], f = 0; f < d.length; ++f)
            for (var g = d[f], h = g.find(), i = 0; i < e.length; ++i) {
                var j = e[i];
                if (!zc(j.to, h.from) && !zc(h.to, j.from)) {
                    var k = [i, 1];
                    (zc(j.from, h.from) || !g.inclusiveLeft && yc(j.from, h.from)) && k.push({
                        from: j.from,
                        to: h.from
                    }), (zc(h.to, j.to) || !g.inclusiveRight && yc(j.to, h.to)) && k.push({
                        from: h.to,
                        to: j.to
                    }), e.splice.apply(e, k), i += k.length - 1
                }
            }
        return e
    }

    function yd(a, b) {
        var d, c = v && a.markedSpans;
        if (c)
            for (var e, f = 0; f < c.length; ++f) e = c[f], e.marker.collapsed && (null == e.from || e.from < b) && (null == e.to || e.to > b) && (!d || d.width < e.marker.width) && (d = e.marker);
        return d
    }

    function zd(a) {
        return yd(a, -1)
    }

    function Ad(a) {
        return yd(a, a.text.length + 1)
    }

    function Bd(a, b) {
        for (var c; c = zd(b);) b = he(a, c.find().from.line);
        return b
    }

    function Cd(a, b) {
        var c = v && b.markedSpans;
        if (c)
            for (var d, e = 0; e < c.length; ++e)
                if (d = c[e], d.marker.collapsed) {
                    if (null == d.from) return !0;
                    if (!d.marker.replacedWith && 0 == d.from && d.marker.inclusiveLeft && Dd(a, b, d)) return !0
                }
    }

    function Dd(a, b, c) {
        if (null == c.to) {
            var d = c.marker.find().to,
                e = he(a, d.line);
            return Dd(a, e, qd(e.markedSpans, c.marker))
        }
        if (c.marker.inclusiveRight && c.to == b.text.length) return !0;
        for (var f, g = 0; g < b.markedSpans.length; ++g)
            if (f = b.markedSpans[g], f.marker.collapsed && !f.marker.replacedWith && f.from == c.to && (f.marker.inclusiveLeft || c.marker.inclusiveRight) && Dd(a, b, f)) return !0
    }

    function Ed(a) {
        var b = a.markedSpans;
        if (b) {
            for (var c = 0; c < b.length; ++c) b[c].marker.detachLine(a);
            a.markedSpans = null
        }
    }

    function Fd(a, b) {
        if (b) {
            for (var c = 0; c < b.length; ++c) b[c].marker.attachLine(a);
            a.markedSpans = b
        }
    }

    function Hd(a) {
        return function() {
            var b = !this.cm.curOp;
            b && Bb(this.cm);
            try {
                var c = a.apply(this, arguments)
            } finally {
                b && Cb(this.cm)
            }
            return c
        }
    }

    function Id(a) {
        return null != a.height ? a.height : (a.node.parentNode && 1 == a.node.parentNode.nodeType || jf(a.cm.display.measure, gf("div", [a.node], null, "position: relative")), a.height = a.node.offsetHeight)
    }

    function Jd(a, b, c, d) {
        var e = new Gd(a, c, d);
        return e.noHScroll && (a.display.alignWidgets = !0), Rc(a, b, function(b) {
            var c = b.widgets || (b.widgets = []);
            if (null == e.insertAt ? c.push(e) : c.splice(Math.min(c.length - 1, Math.max(0, e.insertAt)), 0, e), e.line = b, !Cd(a.doc, b) || e.showIfHidden) {
                var d = ne(a, b) < a.doc.scrollTop;
                ke(b, b.height + Id(e)), d && Pc(a, 0, e.height)
            }
            return !0
        }), e
    }

    function Ld(a, b, c, d) {
        a.text = b, a.stateAfter && (a.stateAfter = null), a.styles && (a.styles = null), null != a.order && (a.order = null), Ed(a), Fd(a, c);
        var e = d ? d(a) : 1;
        e != a.height && ke(a, e)
    }

    function Md(a) {
        a.parent = null, Ed(a)
    }

    function Nd(a, b, c, d, e) {
        var f = c.flattenSpans;
        null == f && (f = a.options.flattenSpans);
        var j, g = 0,
            h = null,
            i = new ld(b, a.options.tabSize);
        for ("" == b && c.blankLine && c.blankLine(d); !i.eol();) i.pos > a.options.maxHighlightLength ? (f = !1, i.pos = Math.min(b.length, i.start + 5e4), j = null) : j = c.token(i, d), f && h == j || (g < i.start && e(i.start, h), g = i.start, h = j), i.start = i.pos;
        g < i.pos && e(i.pos, h)
    }

    function Od(a, b, c) {
        var d = [a.state.modeGen];
        Nd(a, b.text, a.doc.mode, c, function(a, b) {
            d.push(a, b)
        });
        for (var e = 0; e < a.state.overlays.length; ++e) {
            var f = a.state.overlays[e],
                g = 1,
                h = 0;
            Nd(a, b.text, f.mode, !0, function(a, b) {
                for (var c = g; a > h;) {
                    var e = d[g];
                    e > a && d.splice(g, 1, a, d[g + 1], e), g += 2, h = Math.min(a, e)
                }
                if (b)
                    if (f.opaque) d.splice(c, g - c, a, b), g = c + 2;
                    else
                        for (; g > c; c += 2) {
                            var i = d[c + 1];
                            d[c + 1] = i ? i + " " + b : b
                        }
            })
        }
        return d
    }

    function Pd(a, b) {
        return b.styles && b.styles[0] == a.state.modeGen || (b.styles = Od(a, b, b.stateAfter = db(a, le(b)))), b.styles
    }

    function Qd(a, b, c) {
        var d = a.doc.mode,
            e = new ld(b.text, a.options.tabSize);
        for ("" == b.text && d.blankLine && d.blankLine(c); !e.eol() && e.pos <= a.options.maxHighlightLength;) d.token(e, c), e.start = e.pos
    }

    function Sd(a) {
        return a ? Rd[a] || (Rd[a] = "cm-" + a.replace(/ +/g, " cm-")) : null
    }

    function Td(a, c, d, f) {
        for (var g, h = c, i = !0; g = zd(h);) h = he(a.doc, g.find().from.line);
        var j = {
            pre: gf("pre"),
            col: 0,
            pos: 0,
            measure: null,
            measuredSomething: !1,
            cm: a,
            copyWidgets: f
        };
        h.textClass && (j.pre.className = h.textClass);
        do {
            h.text && (i = !1), j.measure = h == c && d, j.pos = 0, j.addToken = j.measure ? Wd : Vd, (b || e) && a.getOption("lineWrapping") && (j.addToken = Xd(j.addToken));
            var k = Zd(h, j, Pd(a, h));
            d && h == c && !j.measuredSomething && (d[0] = j.pre.appendChild(rf(a.display.measure)), j.measuredSomething = !0), k && (h = he(a.doc, k.to.line))
        } while (k);
        !d || j.measuredSomething || d[0] || (d[0] = j.pre.appendChild(i ? gf("span", "\xa0") : rf(a.display.measure))), j.pre.firstChild || Cd(a.doc, c) || j.pre.appendChild(document.createTextNode("\xa0"));
        var l;
        if (d && b && (l = oe(h))) {
            var m = l.length - 1;
            l[m].from == l[m].to && --m;
            var n = l[m],
                o = l[m - 1];
            if (n.from + 1 == n.to && o && n.level < o.level) {
                var p = d[j.pos - 1];
                p && p.parentNode.insertBefore(p.measureRight = rf(a.display.measure), p.nextSibling)
            }
        }
        return Je(a, "renderLine", a, c, j.pre), j.pre
    }

    function Vd(a, b, c, d, e, f) {
        if (b) {
            if (Ud.test(b))
                for (var g = document.createDocumentFragment(), h = 0;;) {
                    Ud.lastIndex = h;
                    var i = Ud.exec(b),
                        j = i ? i.index - h : b.length - h;
                    if (j && (g.appendChild(document.createTextNode(b.slice(h, h + j))), a.col += j), !i) break;
                    if (h += j + 1, "	" == i[0]) {
                        var k = a.cm.options.tabSize,
                            l = k - a.col % k;
                        g.appendChild(gf("span", We(l), "cm-tab")), a.col += l
                    } else {
                        var m = gf("span", "\u2022", "cm-invalidchar");
                        m.title = "\\u" + i[0].charCodeAt(0).toString(16), g.appendChild(m), a.col += 1
                    }
                } else {
                    a.col += b.length;
                    var g = document.createTextNode(b)
                } if (c || d || e || a.measure) {
                    var n = c || "";
                    d && (n += d), e && (n += e);
                    var m = gf("span", [g], n);
                    return f && (m.title = f), a.pre.appendChild(m)
                }
            a.pre.appendChild(g)
        }
    }

    function Wd(a, c, d, e, f) {
        for (var g = a.cm.options.lineWrapping, h = 0; h < c.length; ++h) {
            var i = c.charAt(h),
                j = 0 == h;
            i >= "\ud800" && "\udbff" > i && h < c.length - 1 ? (i = c.slice(h, h + 2), ++h) : h && g && nf(c, h) && a.pre.appendChild(gf("wbr"));
            var k = a.measure[a.pos],
                l = a.measure[a.pos] = Vd(a, i, d, j && e, h == c.length - 1 && f);
            k && (l.leftSide = k.leftSide || k), b && g && " " == i && h && !/\s/.test(c.charAt(h - 1)) && h < c.length - 1 && !/\s/.test(c.charAt(h + 1)) && (l.style.whiteSpace = "normal"), a.pos += i.length
        }
        c.length && (a.measuredSomething = !0)
    }

    function Xd(a) {
        function b(a) {
            for (var b = " ", c = 0; c < a.length - 2; ++c) b += c % 2 ? " " : "\xa0";
            return b += " "
        }
        return function(c, d, e, f, g, h) {
            return a(c, d.replace(/ {3,}/, b), e, f, g, h)
        }
    }

    function Yd(a, b, c, d) {
        var e = !d && c.replacedWith;
        if (e && (a.copyWidgets && (e = e.cloneNode(!0)), a.pre.appendChild(e), a.measure)) {
            if (b) a.measure[a.pos] = e;
            else {
                var f = a.measure[a.pos] = rf(a.cm.display.measure);
                "bookmark" != c.type || c.insertLeft ? a.pre.insertBefore(f, e) : a.pre.appendChild(f)
            }
            a.measuredSomething = !0
        }
        a.pos += b
    }

    function Zd(a, b, c) {
        var d = a.markedSpans,
            e = a.text,
            f = 0;
        if (d)
            for (var k, m, n, o, p, q, h = e.length, i = 0, g = 1, j = "", l = 0;;) {
                if (l == i) {
                    m = n = o = p = "", q = null, l = 1 / 0;
                    for (var r = null, s = 0; s < d.length; ++s) {
                        var t = d[s],
                            u = t.marker;
                        t.from <= i && (null == t.to || t.to > i) ? (null != t.to && l > t.to && (l = t.to, n = ""), u.className && (m += " " + u.className), u.startStyle && t.from == i && (o += " " + u.startStyle), u.endStyle && t.to == l && (n += " " + u.endStyle), u.title && !p && (p = u.title), u.collapsed && (!q || q.marker.size < u.size) && (q = t)) : t.from > i && l > t.from && (l = t.from), "bookmark" == u.type && t.from == i && u.replacedWith && (r = u)
                    }
                    if (q && (q.from || 0) == i && (Yd(b, (null == q.to ? h : q.to) - i, q.marker, null == q.from), null == q.to)) return q.marker.find();
                    r && !q && Yd(b, 0, r)
                }
                if (i >= h) break;
                for (var v = Math.min(h, l);;) {
                    if (j) {
                        var w = i + j.length;
                        if (!q) {
                            var x = w > v ? j.slice(0, v - i) : j;
                            b.addToken(b, x, k ? k + m : m, o, i + x.length == l ? n : "", p)
                        }
                        if (w >= v) {
                            j = j.slice(v - i), i = v;
                            break
                        }
                        i = w, o = ""
                    }
                    j = e.slice(f, f = c[g++]), k = Sd(c[g++])
                }
            } else
                for (var g = 1; g < c.length; g += 2) b.addToken(b, e.slice(f, f = c[g]), Sd(c[g + 1]))
    }

    function $d(a, b, c, d, e) {
        function f(a) {
            return c ? c[a] : null
        }

        function g(a, c, d) {
            Ld(a, c, d, e), Me(a, "change", a, b)
        }
        var h = b.from,
            i = b.to,
            j = b.text,
            k = he(a, h.line),
            l = he(a, i.line),
            m = Xe(j),
            n = f(j.length - 1),
            o = i.line - h.line;
        if (0 == h.ch && 0 == i.ch && "" == m) {
            for (var p = 0, q = j.length - 1, r = []; q > p; ++p) r.push(new Kd(j[p], f(p), e));
            g(l, l.text, n), o && a.remove(h.line, o), r.length && a.insert(h.line, r)
        } else if (k == l)
            if (1 == j.length) g(k, k.text.slice(0, h.ch) + m + k.text.slice(i.ch), n);
            else {
                for (var r = [], p = 1, q = j.length - 1; q > p; ++p) r.push(new Kd(j[p], f(p), e));
                r.push(new Kd(m + k.text.slice(i.ch), n, e)), g(k, k.text.slice(0, h.ch) + j[0], f(0)), a.insert(h.line + 1, r)
            } else
        if (1 == j.length) g(k, k.text.slice(0, h.ch) + j[0] + l.text.slice(i.ch), f(0)), a.remove(h.line + 1, o);
        else {
            g(k, k.text.slice(0, h.ch) + j[0], f(0)), g(l, m + l.text.slice(i.ch), n);
            for (var p = 1, q = j.length - 1, r = []; q > p; ++p) r.push(new Kd(j[p], f(p), e));
            o > 1 && a.remove(h.line + 1, o - 1), a.insert(h.line + 1, r)
        }
        Me(a, "change", a, b), Hc(a, d.anchor, d.head, null, !0)
    }

    function _d(a) {
        this.lines = a, this.parent = null;
        for (var b = 0, c = a.length, d = 0; c > b; ++b) a[b].parent = this, d += a[b].height;
        this.height = d
    }

    function ae(a) {
        this.children = a;
        for (var b = 0, c = 0, d = 0, e = a.length; e > d; ++d) {
            var f = a[d];
            b += f.chunkSize(), c += f.height, f.parent = this
        }
        this.size = b, this.height = c, this.parent = null
    }

    function fe(a, b, c) {
        function d(a, e, f) {
            if (a.linked)
                for (var g = 0; g < a.linked.length; ++g) {
                    var h = a.linked[g];
                    if (h.doc != e) {
                        var i = f && h.sharedHist;
                        (!c || i) && (b(h.doc, i), d(h.doc, a, i))
                    }
                }
        }
        d(a, null, !0)
    }

    function ge(a, b) {
        if (b.cm) throw new Error("This document is already in use.");
        a.doc = b, b.cm = a, B(a), y(a), a.options.lineWrapping || H(a), a.options.mode = b.modeOption, Gb(a)
    }

    function he(a, b) {
        for (b -= a.first; !a.lines;)
            for (var c = 0;; ++c) {
                var d = a.children[c],
                    e = d.chunkSize();
                if (e > b) {
                    a = d;
                    break
                }
                b -= e
            }
        return a.lines[b]
    }

    function ie(a, b, c) {
        var d = [],
            e = b.line;
        return a.iter(b.line, c.line + 1, function(a) {
            var f = a.text;
            e == c.line && (f = f.slice(0, c.ch)), e == b.line && (f = f.slice(b.ch)), d.push(f), ++e
        }), d
    }

    function je(a, b, c) {
        var d = [];
        return a.iter(b, c, function(a) {
            d.push(a.text)
        }), d
    }

    function ke(a, b) {
        for (var c = b - a.height, d = a; d; d = d.parent) d.height += c
    }

    function le(a) {
        if (null == a.parent) return null;
        for (var b = a.parent, c = Ze(b.lines, a), d = b.parent; d; b = d, d = d.parent)
            for (var e = 0; d.children[e] != b; ++e) c += d.children[e].chunkSize();
        return c + b.first
    }

    function me(a, b) {
        var c = a.first;
        a: do {
            for (var d = 0, e = a.children.length; e > d; ++d) {
                var f = a.children[d],
                    g = f.height;
                if (g > b) {
                    a = f;
                    continue a
                }
                b -= g, c += f.chunkSize()
            }
            return c
        } while (!a.lines);
        for (var d = 0, e = a.lines.length; e > d; ++d) {
            var h = a.lines[d],
                i = h.height;
            if (i > b) break;
            b -= i
        }
        return c + d
    }

    function ne(a, b) {
        b = Bd(a.doc, b);
        for (var c = 0, d = b.parent, e = 0; e < d.lines.length; ++e) {
            var f = d.lines[e];
            if (f == b) break;
            c += f.height
        }
        for (var g = d.parent; g; d = g, g = d.parent)
            for (var e = 0; e < g.children.length; ++e) {
                var h = g.children[e];
                if (h == d) break;
                c += h.height
            }
        return c
    }

    function oe(a) {
        var b = a.order;
        return null == b && (b = a.order = Jf(a.text)), b
    }

    function pe(a) {
        return {
            done: [],
            undone: [],
            undoDepth: 1 / 0,
            lastTime: 0,
            lastOp: null,
            lastOrigin: null,
            generation: a || 1,
            maxGeneration: a || 1
        }
    }

    function qe(a, b, c, d) {
        var e = b["spans_" + a.id],
            f = 0;
        a.iter(Math.max(a.first, c), Math.min(a.first + a.size, d), function(c) {
            c.markedSpans && ((e || (e = b["spans_" + a.id] = {}))[f] = c.markedSpans), ++f
        })
    }

    function re(a, b) {
        var c = {
            line: b.from.line,
            ch: b.from.ch
        }, d = {
                from: c,
                to: mc(b),
                text: ie(a, b.from, b.to)
            };
        return qe(a, d, b.from.line, b.to.line + 1), fe(a, function(a) {
            qe(a, d, b.from.line, b.to.line + 1)
        }, !0), d
    }

    function se(a, b, c, d) {
        var e = a.history;
        e.undone.length = 0;
        var f = +new Date,
            g = Xe(e.done);
        if (g && (e.lastOp == d || e.lastOrigin == b.origin && b.origin && ("+" == b.origin.charAt(0) && a.cm && e.lastTime > f - a.cm.options.historyEventDelay || "*" == b.origin.charAt(0)))) {
            var h = Xe(g.changes);
            yc(b.from, b.to) && yc(b.from, h.to) ? h.to = mc(b) : g.changes.push(re(a, b)), g.anchorAfter = c.anchor, g.headAfter = c.head
        } else
            for (g = {
                changes: [re(a, b)],
                generation: e.generation,
                anchorBefore: a.sel.anchor,
                headBefore: a.sel.head,
                anchorAfter: c.anchor,
                headAfter: c.head
            }, e.done.push(g), e.generation = ++e.maxGeneration; e.done.length > e.undoDepth;) e.done.shift();
        e.lastTime = f, e.lastOp = d, e.lastOrigin = b.origin
    }

    function te(a) {
        if (!a) return null;
        for (var c, b = 0; b < a.length; ++b) a[b].marker.explicitlyCleared ? c || (c = a.slice(0, b)) : c && c.push(a[b]);
        return c ? c.length ? c : null : a
    }

    function ue(a, b) {
        var c = b["spans_" + a.id];
        if (!c) return null;
        for (var d = 0, e = []; d < b.text.length; ++d) e.push(te(c[d]));
        return e
    }

    function ve(a, b) {
        for (var c = 0, d = []; c < a.length; ++c) {
            var e = a[c],
                f = e.changes,
                g = [];
            d.push({
                changes: g,
                anchorBefore: e.anchorBefore,
                headBefore: e.headBefore,
                anchorAfter: e.anchorAfter,
                headAfter: e.headAfter
            });
            for (var h = 0; h < f.length; ++h) {
                var j, i = f[h];
                if (g.push({
                    from: i.from,
                    to: i.to,
                    text: i.text
                }), b)
                    for (var k in i)(j = k.match(/^spans_(\d+)$/)) && Ze(b, Number(j[1])) > -1 && (Xe(g)[k] = i[k], delete i[k])
            }
        }
        return d
    }

    function we(a, b, c, d) {
        c < a.line ? a.line += d : b < a.line && (a.line = b, a.ch = 0)
    }

    function xe(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            for (var f = a[e], g = !0, h = 0; h < f.changes.length; ++h) {
                var i = f.changes[h];
                if (f.copied || (i.from = Ac(i.from), i.to = Ac(i.to)), c < i.from.line) i.from.line += d, i.to.line += d;
                else if (b <= i.to.line) {
                    g = !1;
                    break
                }
            }
            f.copied || (f.anchorBefore = Ac(f.anchorBefore), f.headBefore = Ac(f.headBefore), f.anchorAfter = Ac(f.anchorAfter), f.readAfter = Ac(f.headAfter), f.copied = !0), g ? (we(f.anchorBefore), we(f.headBefore), we(f.anchorAfter), we(f.headAfter)) : (a.splice(0, e + 1), e = 0)
        }
    }

    function ye(a, b) {
        var c = b.from.line,
            d = b.to.line,
            e = b.text.length - (d - c) - 1;
        xe(a.done, c, d, e), xe(a.undone, c, d, e)
    }

    function ze() {
        Ee(this)
    }

    function Ae(a) {
        return a.stop || (a.stop = ze), a
    }

    function Be(a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }

    function Ce(a) {
        a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
    }

    function De(a) {
        return null != a.defaultPrevented ? a.defaultPrevented : 0 == a.returnValue
    }

    function Ee(a) {
        Be(a), Ce(a)
    }

    function Fe(a) {
        return a.target || a.srcElement
    }

    function Ge(a) {
        var b = a.which;
        return null == b && (1 & a.button ? b = 1 : 2 & a.button ? b = 3 : 4 & a.button && (b = 2)), p && a.ctrlKey && 1 == b && (b = 3), b
    }

    function He(a, b, c) {
        if (a.addEventListener) a.addEventListener(b, c, !1);
        else if (a.attachEvent) a.attachEvent("on" + b, c);
        else {
            var d = a._handlers || (a._handlers = {}),
                e = d[b] || (d[b] = []);
            e.push(c)
        }
    }

    function Ie(a, b, c) {
        if (a.removeEventListener) a.removeEventListener(b, c, !1);
        else if (a.detachEvent) a.detachEvent("on" + b, c);
        else {
            var d = a._handlers && a._handlers[b];
            if (!d) return;
            for (var e = 0; e < d.length; ++e)
                if (d[e] == c) {
                    d.splice(e, 1);
                    break
                }
        }
    }

    function Je(a, b) {
        var c = a._handlers && a._handlers[b];
        if (c)
            for (var d = Array.prototype.slice.call(arguments, 2), e = 0; e < c.length; ++e) c[e].apply(null, d)
    }

    function Me(a, b) {
        function e(a) {
            return function() {
                a.apply(null, d)
            }
        }
        var c = a._handlers && a._handlers[b];
        if (c) {
            var d = Array.prototype.slice.call(arguments, 2);
            Ke || (++Le, Ke = [], setTimeout(Oe, 0));
            for (var f = 0; f < c.length; ++f) Ke.push(e(c[f]))
        }
    }

    function Ne(a, b, c) {
        return Je(a, c || b.type, a, b), De(b) || b.codemirrorIgnore
    }

    function Oe() {
        --Le;
        var a = Ke;
        Ke = null;
        for (var b = 0; b < a.length; ++b) a[b]()
    }

    function Pe(a, b) {
        var c = a._handlers && a._handlers[b];
        return c && c.length > 0
    }

    function Qe(a) {
        a.prototype.on = function(a, b) {
            He(this, a, b)
        }, a.prototype.off = function(a, b) {
            Ie(this, a, b)
        }
    }

    function Te() {
        this.id = null
    }

    function Ue(a, b, c, d, e) {
        null == b && (b = a.search(/[^\s\u00a0]/), -1 == b && (b = a.length));
        for (var f = d || 0, g = e || 0; b > f; ++f) "	" == a.charAt(f) ? g += c - g % c : ++g;
        return g
    }

    function We(a) {
        for (; Ve.length <= a;) Ve.push(Xe(Ve) + " ");
        return Ve[a]
    }

    function Xe(a) {
        return a[a.length - 1]
    }

    function Ye(a) {
        if (n) a.selectionStart = 0, a.selectionEnd = a.value.length;
        else try {
            a.select()
        } catch (b) {}
    }

    function Ze(a, b) {
        if (a.indexOf) return a.indexOf(b);
        for (var c = 0, d = a.length; d > c; ++c)
            if (a[c] == b) return c;
        return -1
    }

    function $e(a, b) {
        function c() {}
        c.prototype = a;
        var d = new c;
        return b && _e(b, d), d
    }

    function _e(a, b) {
        b || (b = {});
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
        return b
    }

    function af(a) {
        for (var b = [], c = 0; a > c; ++c) b.push(void 0);
        return b
    }

    function bf(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return function() {
            return a.apply(null, b)
        }
    }

    function df(a) {
        return /\w/.test(a) || a > "\x80" && (a.toUpperCase() != a.toLowerCase() || cf.test(a))
    }

    function ef(a) {
        for (var b in a)
            if (a.hasOwnProperty(b) && a[b]) return !1;
        return !0
    }

    function gf(a, b, c, d) {
        var e = document.createElement(a);
        if (c && (e.className = c), d && (e.style.cssText = d), "string" == typeof b) kf(e, b);
        else if (b)
            for (var f = 0; f < b.length; ++f) e.appendChild(b[f]);
        return e
    }

    function hf(a) {
        for (var b = a.childNodes.length; b > 0; --b) a.removeChild(a.firstChild);
        return a
    }

    function jf(a, b) {
        return hf(a).appendChild(b)
    }

    function kf(a, b) {
        d ? (a.innerHTML = "", a.appendChild(document.createTextNode(b))) : a.textContent = b
    }

    function lf(a) {
        return a.getBoundingClientRect()
    }

    function nf() {
        return !1
    }

    function pf(a) {
        if (null != of) return of;
        var b = gf("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
        return jf(a, b), b.offsetWidth && (of = b.offsetHeight - b.clientHeight), of || 0
    }

    function rf(a) {
        if (null == qf) {
            var b = gf("span", "\u200b");
            jf(a, gf("span", [b, document.createTextNode("x")])), 0 != a.firstChild.offsetHeight && (qf = b.offsetWidth <= 1 && b.offsetHeight > 2 && !c)
        }
        return qf ? gf("span", "\u200b") : gf("span", "\xa0", null, "display: inline-block; width: 1px; margin-right: -1px")
    }

    function wf(a, b, c, d) {
        if (!a) return d(b, c, "ltr");
        for (var e = !1, f = 0; f < a.length; ++f) {
            var g = a[f];
            (g.from < c && g.to > b || b == c && g.to == b) && (d(Math.max(g.from, b), Math.min(g.to, c), 1 == g.level ? "rtl" : "ltr"), e = !0)
        }
        e || d(b, c, "ltr")
    }

    function xf(a) {
        return a.level % 2 ? a.to : a.from
    }

    function yf(a) {
        return a.level % 2 ? a.from : a.to
    }

    function zf(a) {
        var b = oe(a);
        return b ? xf(b[0]) : 0
    }

    function Af(a) {
        var b = oe(a);
        return b ? yf(Xe(b)) : a.text.length
    }

    function Bf(a, b) {
        var c = he(a.doc, b),
            d = Bd(a.doc, c);
        d != c && (b = le(d));
        var e = oe(d),
            f = e ? e[0].level % 2 ? Af(d) : zf(d) : 0;
        return xc(b, f)
    }

    function Cf(a, b) {
        for (var c, d; c = Ad(d = he(a.doc, b));) b = c.find().to.line;
        var e = oe(d),
            f = e ? e[0].level % 2 ? zf(d) : Af(d) : d.text.length;
        return xc(b, f)
    }

    function Df(a, b, c) {
        var d = a[0].level;
        return b == d ? !0 : c == d ? !1 : c > b
    }

    function Ff(a, b) {
        for (var d, c = 0; c < a.length; ++c) {
            var e = a[c];
            if (e.from < b && e.to > b) return Ef = null, c;
            if (e.from == b || e.to == b) {
                if (null != d) return Df(a, e.level, a[d].level) ? (Ef = d, c) : (Ef = c, d);
                d = c
            }
        }
        return Ef = null, d
    }

    function Gf(a, b, c, d) {
        if (!d) return b + c;
        do b += c; while (b > 0 && ff.test(a.text.charAt(b)));
        return b
    }

    function Hf(a, b, c, d) {
        var e = oe(a);
        if (!e) return If(a, b, c, d);
        for (var f = Ff(e, b), g = e[f], h = Gf(a, b, g.level % 2 ? -c : c, d);;) {
            if (h > g.from && h < g.to) return h;
            if (h == g.from || h == g.to) return Ff(e, h) == f ? h : (g = e[f += c], c > 0 == g.level % 2 ? g.to : g.from);
            if (g = e[f += c], !g) return null;
            h = c > 0 == g.level % 2 ? Gf(a, g.to, -1, d) : Gf(a, g.from, 1, d)
        }
    }

    function If(a, b, c, d) {
        var e = b + c;
        if (d)
            for (; e > 0 && ff.test(a.text.charAt(e));) e += c;
        return 0 > e || e > a.text.length ? null : e
    }
    var a = /gecko\/\d/i.test(navigator.userAgent),
        b = /MSIE \d/.test(navigator.userAgent),
        c = b && (null == document.documentMode || document.documentMode < 8),
        d = b && (null == document.documentMode || document.documentMode < 9),
        e = /WebKit\//.test(navigator.userAgent),
        f = e && /Qt\/\d+\.\d+/.test(navigator.userAgent),
        g = /Chrome\//.test(navigator.userAgent),
        h = /Opera\//.test(navigator.userAgent),
        i = /Apple Computer/.test(navigator.vendor),
        j = /KHTML\//.test(navigator.userAgent),
        k = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent),
        l = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),
        m = /PhantomJS/.test(navigator.userAgent),
        n = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent),
        o = n || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent),
        p = n || /Mac/.test(navigator.platform),
        q = /windows/i.test(navigator.platform),
        r = h && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
    r && (r = Number(r[1])), r && r >= 15 && (h = !1, e = !0);
    var xb, Qb, Rb, s = p && (f || h && (null == r || 12.11 > r)),
        t = a || b && !d,
        u = !1,
        v = !1,
        Ab = 0,
        Ub = 0,
        Zb = 0,
        $b = null;
    b ? $b = -.53 : a ? $b = 15 : g ? $b = -.7 : i && ($b = -1 / 3);
    var cc, kc, fc = null,
        mc = w.changeEnd = function(a) {
            return a.text ? xc(a.from.line + a.text.length - 1, Xe(a.text).length + (1 == a.text.length ? a.from.ch : 0)) : a.to
        };
    w.Pos = xc, w.prototype = {
        constructor: w,
        focus: function() {
            window.focus(), Lb(this), ic(this), Ib(this)
        },
        setOption: function(a, b) {
            var c = this.options,
                d = c[a];
            (c[a] != b || "mode" == a) && (c[a] = b, Wc.hasOwnProperty(a) && Db(this, Wc[a])(this, b, d))
        },
        getOption: function(a) {
            return this.options[a]
        },
        getDoc: function() {
            return this.doc
        },
        addKeyMap: function(a, b) {
            this.state.keyMaps[b ? "push" : "unshift"](a)
        },
        removeKeyMap: function(a) {
            for (var b = this.state.keyMaps, c = 0; c < b.length; ++c)
                if (b[c] == a || "string" != typeof b[c] && b[c].name == a) return b.splice(c, 1), !0
        },
        addOverlay: Db(null, function(a, b) {
            var c = a.token ? a : w.getMode(this.options, a);
            if (c.startState) throw new Error("Overlays may not be stateful.");
            this.state.overlays.push({
                mode: c,
                modeSpec: a,
                opaque: b && b.opaque
            }), this.state.modeGen++, Gb(this)
        }),
        removeOverlay: Db(null, function(a) {
            for (var b = this.state.overlays, c = 0; c < b.length; ++c) {
                var d = b[c].modeSpec;
                if (d == a || "string" == typeof a && d.name == a) return b.splice(c, 1), this.state.modeGen++, Gb(this), void 0
            }
        }),
        indentLine: Db(null, function(a, b, c) {
            "string" != typeof b && "number" != typeof b && (b = null == b ? this.options.smartIndent ? "smart" : "prev" : b ? "add" : "subtract"), Ec(this.doc, a) && Qc(this, a, b, c)
        }),
        indentSelection: Db(null, function(a) {
            var b = this.doc.sel;
            if (yc(b.from, b.to)) return Qc(this, b.from.line, a);
            for (var c = b.to.line - (b.to.ch ? 0 : 1), d = b.from.line; c >= d; ++d) Qc(this, d, a)
        }),
        getTokenAt: function(a, b) {
            var c = this.doc;
            a = Cc(c, a);
            for (var d = db(this, a.line, b), e = this.doc.mode, f = he(c, a.line), g = new ld(f.text, this.options.tabSize); g.pos < a.ch && !g.eol();) {
                g.start = g.pos;
                var h = e.token(g, d)
            }
            return {
                start: g.start,
                end: g.pos,
                string: g.current(),
                className: h || null,
                type: h || null,
                state: d
            }
        },
        getTokenTypeAt: function(a) {
            a = Cc(this.doc, a);
            var b = Pd(this, he(this.doc, a.line)),
                c = 0,
                d = (b.length - 1) / 2,
                e = a.ch;
            if (0 == e) return b[2];
            for (;;) {
                var f = c + d >> 1;
                if ((f ? b[2 * f - 1] : 0) >= e) d = f;
                else {
                    if (!(b[2 * f + 1] < e)) return b[2 * f + 2];
                    c = f + 1
                }
            }
        },
        getModeAt: function(a) {
            var b = this.doc.mode;
            return b.innerMode ? w.innerMode(b, this.getTokenAt(a).state).mode : b
        },
        getHelper: function(a, b) {
            if (cd.hasOwnProperty(b)) {
                var c = cd[b],
                    d = this.getModeAt(a);
                return d[b] && c[d[b]] || d.helperType && c[d.helperType] || c[d.name]
            }
        },
        getStateAfter: function(a, b) {
            var c = this.doc;
            return a = Bc(c, null == a ? c.first + c.size - 1 : a), db(this, a + 1, b)
        },
        cursorCoords: function(a, b) {
            var c, d = this.doc.sel;
            return c = null == a ? d.head : "object" == typeof a ? Cc(this.doc, a) : a ? d.from : d.to, tb(this, c, b || "page")
        },
        charCoords: function(a, b) {
            return sb(this, Cc(this.doc, a), b || "page")
        },
        coordsChar: function(a, b) {
            return a = rb(this, a, b || "page"), vb(this, a.left, a.top)
        },
        lineAtHeight: function(a, b) {
            return a = rb(this, {
                top: a,
                left: 0
            }, b || "page").top, me(this.doc, a + this.display.viewOffset)
        },
        heightAtLine: function(a, b) {
            var c = !1,
                d = this.doc.first + this.doc.size - 1;
            a < this.doc.first ? a = this.doc.first : a > d && (a = d, c = !0);
            var e = he(this.doc, a);
            return qb(this, he(this.doc, a), {
                top: 0,
                left: 0
            }, b || "page").top + (c ? e.height : 0)
        },
        defaultTextHeight: function() {
            return yb(this.display)
        },
        defaultCharWidth: function() {
            return zb(this.display)
        },
        setGutterMarker: Db(null, function(a, b, c) {
            return Rc(this, a, function(a) {
                var d = a.gutterMarkers || (a.gutterMarkers = {});
                return d[b] = c, !c && ef(d) && (a.gutterMarkers = null), !0
            })
        }),
        clearGutter: Db(null, function(a) {
            var b = this,
                c = b.doc,
                d = c.first;
            c.iter(function(c) {
                c.gutterMarkers && c.gutterMarkers[a] && (c.gutterMarkers[a] = null, Gb(b, d, d + 1), ef(c.gutterMarkers) && (c.gutterMarkers = null)), ++d
            })
        }),
        addLineClass: Db(null, function(a, b, c) {
            return Rc(this, a, function(a) {
                var d = "text" == b ? "textClass" : "background" == b ? "bgClass" : "wrapClass";
                if (a[d]) {
                    if (new RegExp("(?:^|\\s)" + c + "(?:$|\\s)").test(a[d])) return !1;
                    a[d] += " " + c
                } else a[d] = c;
                return !0
            })
        }),
        removeLineClass: Db(null, function(a, b, c) {
            return Rc(this, a, function(a) {
                var d = "text" == b ? "textClass" : "background" == b ? "bgClass" : "wrapClass",
                    e = a[d];
                if (!e) return !1;
                if (null == c) a[d] = null;
                else {
                    var f = e.match(new RegExp("(?:^|\\s+)" + c + "(?:$|\\s+)"));
                    if (!f) return !1;
                    var g = f.index + f[0].length;
                    a[d] = e.slice(0, f.index) + (f.index && g != e.length ? " " : "") + e.slice(g) || null
                }
                return !0
            })
        }),
        addLineWidget: Db(null, function(a, b, c) {
            return Jd(this, a, b, c)
        }),
        removeLineWidget: function(a) {
            a.clear()
        },
        lineInfo: function(a) {
            if ("number" == typeof a) {
                if (!Ec(this.doc, a)) return null;
                var b = a;
                if (a = he(this.doc, a), !a) return null
            } else {
                var b = le(a);
                if (null == b) return null
            }
            return {
                line: b,
                handle: a,
                text: a.text,
                gutterMarkers: a.gutterMarkers,
                textClass: a.textClass,
                bgClass: a.bgClass,
                wrapClass: a.wrapClass,
                widgets: a.widgets
            }
        },
        getViewport: function() {
            return {
                from: this.display.showingFrom,
                to: this.display.showingTo
            }
        },
        addWidget: function(a, b, c, d, e) {
            var f = this.display;
            a = tb(this, Cc(this.doc, a));
            var g = a.bottom,
                h = a.left;
            if (b.style.position = "absolute", f.sizer.appendChild(b), "over" == d) g = a.top;
            else if ("above" == d || "near" == d) {
                var i = Math.max(f.wrapper.clientHeight, this.doc.height),
                    j = Math.max(f.sizer.clientWidth, f.lineSpace.clientWidth);
                ("above" == d || a.bottom + b.offsetHeight > i) && a.top > b.offsetHeight ? g = a.top - b.offsetHeight : a.bottom + b.offsetHeight <= i && (g = a.bottom), h + b.offsetWidth > j && (h = j - b.offsetWidth)
            }
            b.style.top = g + "px", b.style.left = b.style.right = "", "right" == e ? (h = f.sizer.clientWidth - b.offsetWidth, b.style.right = "0px") : ("left" == e ? h = 0 : "middle" == e && (h = (f.sizer.clientWidth - b.offsetWidth) / 2), b.style.left = h + "px"), c && Mc(this, h, g, h + b.offsetWidth, g + b.offsetHeight)
        },
        triggerOnKeyDown: Db(null, gc),
        execCommand: function(a) {
            return fd[a](this)
        },
        findPosH: function(a, b, c, d) {
            var e = 1;
            0 > b && (e = -1, b = -b);
            for (var f = 0, g = Cc(this.doc, a); b > f && (g = Sc(this.doc, g, e, c, d), !g.hitSide); ++f);
            return g
        },
        moveH: Db(null, function(a, b) {
            var d, c = this.doc.sel;
            d = c.shift || c.extend || yc(c.from, c.to) ? Sc(this.doc, c.head, a, b, this.options.rtlMoveVisually) : 0 > a ? c.from : c.to, Fc(this.doc, d, d, a)
        }),
        deleteH: Db(null, function(a, b) {
            var c = this.doc.sel;
            yc(c.from, c.to) ? wc(this.doc, "", c.from, Sc(this.doc, c.head, a, b, !1), "+delete") : wc(this.doc, "", c.from, c.to, "+delete"), this.curOp.userSelChange = !0
        }),
        findPosV: function(a, b, c, d) {
            var e = 1,
                f = d;
            0 > b && (e = -1, b = -b);
            for (var g = 0, h = Cc(this.doc, a); b > g; ++g) {
                var i = tb(this, h, "div");
                if (null == f ? f = i.left : i.left = f, h = Tc(this, i, e, c), h.hitSide) break
            }
            return h
        },
        moveV: Db(null, function(a, b) {
            var c = this.doc.sel,
                d = tb(this, c.head, "div");
            null != c.goalColumn && (d.left = c.goalColumn);
            var e = Tc(this, d, a, b);
            "page" == b && Pc(this, 0, sb(this, e, "div").top - d.top), Fc(this.doc, e, e, a), c.goalColumn = d.left
        }),
        toggleOverwrite: function(a) {
            (null == a || a != this.state.overwrite) && ((this.state.overwrite = !this.state.overwrite) ? this.display.cursor.className += " CodeMirror-overwrite" : this.display.cursor.className = this.display.cursor.className.replace(" CodeMirror-overwrite", ""))
        },
        hasFocus: function() {
            return this.state.focused
        },
        scrollTo: Db(null, function(a, b) {
            Oc(this, a, b)
        }),
        getScrollInfo: function() {
            var a = this.display.scroller,
                b = Re;
            return {
                left: a.scrollLeft,
                top: a.scrollTop,
                height: a.scrollHeight - b,
                width: a.scrollWidth - b,
                clientHeight: a.clientHeight - b,
                clientWidth: a.clientWidth - b
            }
        },
        scrollIntoView: Db(null, function(a, b) {
            "number" == typeof a && (a = xc(a, 0)), b || (b = 0);
            var c = a;
            a && null == a.line || (this.curOp.scrollToPos = a ? Cc(this.doc, a) : this.doc.sel.head, this.curOp.scrollToPosMargin = b, c = tb(this, this.curOp.scrollToPos));
            var d = Nc(this, c.left, c.top - b, c.right, c.bottom + b);
            Oc(this, d.scrollLeft, d.scrollTop)
        }),
        setSize: Db(null, function(a, b) {
            function c(a) {
                return "number" == typeof a || /^\d+$/.test(String(a)) ? a + "px" : a
            }
            null != a && (this.display.wrapper.style.width = c(a)), null != b && (this.display.wrapper.style.height = c(b)), this.options.lineWrapping && (this.display.measureLineCache.length = this.display.measureLineCachePos = 0), this.curOp.forceUpdate = !0
        }),
        operation: function(a) {
            return Fb(this, a)
        },
        refresh: Db(null, function() {
            nb(this), Oc(this, this.doc.scrollLeft, this.doc.scrollTop), Gb(this)
        }),
        swapDoc: Db(null, function(a) {
            var b = this.doc;
            return b.cm = null, ge(this, a), nb(this), Kb(this, !0), Oc(this, a.scrollLeft, a.scrollTop), b
        }),
        getInputField: function() {
            return this.display.input
        },
        getWrapperElement: function() {
            return this.display.wrapper
        },
        getScrollerElement: function() {
            return this.display.scroller
        },
        getGutterElement: function() {
            return this.display.gutters
        }
    }, Qe(w);
    var Wc = w.optionHandlers = {}, Xc = w.defaults = {}, Zc = w.Init = {
            toString: function() {
                return "CodeMirror.Init"
            }
        };
    Yc("value", "", function(a, b) {
        a.setValue(b)
    }, !0), Yc("mode", null, function(a, b) {
        a.doc.modeOption = b, y(a)
    }, !0), Yc("indentUnit", 2, y, !0), Yc("indentWithTabs", !1), Yc("smartIndent", !0), Yc("tabSize", 4, function(a) {
        y(a), nb(a), Gb(a)
    }, !0), Yc("electricChars", !0), Yc("rtlMoveVisually", !q), Yc("theme", "default", function(a) {
        D(a), E(a)
    }, !0), Yc("keyMap", "default", C), Yc("extraKeys", null), Yc("onKeyEvent", null), Yc("onDragEvent", null), Yc("lineWrapping", !1, z, !0), Yc("gutters", [], function(a) {
        I(a.options), E(a)
    }, !0), Yc("fixedGutter", !0, function(a, b) {
        a.display.gutters.style.left = b ? O(a.display) + "px" : "0", a.refresh()
    }, !0), Yc("coverGutterNextToScrollbar", !1, J, !0), Yc("lineNumbers", !1, function(a) {
        I(a.options), E(a)
    }, !0), Yc("firstLineNumber", 1, E, !0), Yc("lineNumberFormatter", function(a) {
        return a
    }, E, !0), Yc("showCursorWhenSelecting", !1, Y, !0), Yc("readOnly", !1, function(a, b) {
        "nocursor" == b ? (jc(a), a.display.input.blur()) : b || Kb(a, !0)
    }), Yc("dragDrop", !0), Yc("cursorBlinkRate", 530), Yc("cursorScrollMargin", 0), Yc("cursorHeight", 1), Yc("workTime", 100), Yc("workDelay", 100), Yc("flattenSpans", !0), Yc("pollInterval", 100), Yc("undoDepth", 40, function(a, b) {
        a.doc.history.undoDepth = b
    }), Yc("historyEventDelay", 500), Yc("viewportMargin", 10, function(a) {
        a.refresh()
    }, !0), Yc("maxHighlightLength", 1e4, function(a) {
        y(a), a.refresh()
    }, !0), Yc("moveInputWithCursor", !0, function(a, b) {
        b || (a.display.inputDiv.style.top = a.display.inputDiv.style.left = 0)
    }), Yc("tabindex", null, function(a, b) {
        a.display.input.tabIndex = b || ""
    }), Yc("autofocus", null);
    var $c = w.modes = {}, _c = w.mimeModes = {};
    w.defineMode = function(a, b) {
        if (w.defaults.mode || "null" == a || (w.defaults.mode = a), arguments.length > 2) {
            b.dependencies = [];
            for (var c = 2; c < arguments.length; ++c) b.dependencies.push(arguments[c])
        }
        $c[a] = b
    }, w.defineMIME = function(a, b) {
        _c[a] = b
    }, w.resolveMode = function(a) {
        if ("string" == typeof a && _c.hasOwnProperty(a)) a = _c[a];
        else if (a && "string" == typeof a.name && _c.hasOwnProperty(a.name)) {
            var b = _c[a.name];
            a = $e(b, a), a.name = b.name
        } else if ("string" == typeof a && /^[\w\-]+\/[\w\-]+\+xml$/.test(a)) return w.resolveMode("application/xml");
        return "string" == typeof a ? {
            name: a
        } : a || {
            name: "null"
        }
    }, w.getMode = function(a, b) {
        var b = w.resolveMode(b),
            c = $c[b.name];
        if (!c) return w.getMode(a, "text/plain");
        var d = c(a, b);
        if (ad.hasOwnProperty(b.name)) {
            var e = ad[b.name];
            for (var f in e) e.hasOwnProperty(f) && (d.hasOwnProperty(f) && (d["_" + f] = d[f]), d[f] = e[f])
        }
        return d.name = b.name, d
    }, w.defineMode("null", function() {
        return {
            token: function(a) {
                a.skipToEnd()
            }
        }
    }), w.defineMIME("text/plain", "null");
    var ad = w.modeExtensions = {};
    w.extendMode = function(a, b) {
        var c = ad.hasOwnProperty(a) ? ad[a] : ad[a] = {};
        _e(b, c)
    }, w.defineExtension = function(a, b) {
        w.prototype[a] = b
    }, w.defineDocExtension = function(a, b) {
        ce.prototype[a] = b
    }, w.defineOption = Yc;
    var bd = [];
    w.defineInitHook = function(a) {
        bd.push(a)
    };
    var cd = w.helpers = {};
    w.registerHelper = function(a, b, c) {
        cd.hasOwnProperty(a) || (cd[a] = w[a] = {}), cd[a][b] = c
    }, w.isWordChar = df, w.copyState = dd, w.startState = ed, w.innerMode = function(a, b) {
        for (; a.innerMode;) {
            var c = a.innerMode(b);
            if (!c || c.mode == a) break;
            b = c.state, a = c.mode
        }
        return c || {
            mode: a,
            state: b
        }
    };
    var fd = w.commands = {
        selectAll: function(a) {
            a.setSelection(xc(a.firstLine(), 0), xc(a.lastLine()))
        },
        killLine: function(a) {
            var b = a.getCursor(!0),
                c = a.getCursor(!1),
                d = !yc(b, c);
            d || a.getLine(b.line).length != b.ch ? a.replaceRange("", b, d ? c : xc(b.line), "+delete") : a.replaceRange("", b, xc(b.line + 1, 0), "+delete")
        },
        deleteLine: function(a) {
            var b = a.getCursor().line;
            a.replaceRange("", xc(b, 0), xc(b), "+delete")
        },
        delLineLeft: function(a) {
            var b = a.getCursor();
            a.replaceRange("", xc(b.line, 0), b, "+delete")
        },
        undo: function(a) {
            a.undo()
        },
        redo: function(a) {
            a.redo()
        },
        goDocStart: function(a) {
            a.extendSelection(xc(a.firstLine(), 0))
        },
        goDocEnd: function(a) {
            a.extendSelection(xc(a.lastLine()))
        },
        goLineStart: function(a) {
            a.extendSelection(Bf(a, a.getCursor().line))
        },
        goLineStartSmart: function(a) {
            var b = a.getCursor(),
                c = Bf(a, b.line),
                d = a.getLineHandle(c.line),
                e = oe(d);
            if (e && 0 != e[0].level) a.extendSelection(c);
            else {
                var f = Math.max(0, d.text.search(/\S/)),
                    g = b.line == c.line && b.ch <= f && b.ch;
                a.extendSelection(xc(c.line, g ? 0 : f))
            }
        },
        goLineEnd: function(a) {
            a.extendSelection(Cf(a, a.getCursor().line))
        },
        goLineRight: function(a) {
            var b = a.charCoords(a.getCursor(), "div").top + 5;
            a.extendSelection(a.coordsChar({
                left: a.display.lineDiv.offsetWidth + 100,
                top: b
            }, "div"))
        },
        goLineLeft: function(a) {
            var b = a.charCoords(a.getCursor(), "div").top + 5;
            a.extendSelection(a.coordsChar({
                left: 0,
                top: b
            }, "div"))
        },
        goLineUp: function(a) {
            a.moveV(-1, "line")
        },
        goLineDown: function(a) {
            a.moveV(1, "line")
        },
        goPageUp: function(a) {
            a.moveV(-1, "page")
        },
        goPageDown: function(a) {
            a.moveV(1, "page")
        },
        goCharLeft: function(a) {
            a.moveH(-1, "char")
        },
        goCharRight: function(a) {
            a.moveH(1, "char")
        },
        goColumnLeft: function(a) {
            a.moveH(-1, "column")
        },
        goColumnRight: function(a) {
            a.moveH(1, "column")
        },
        goWordLeft: function(a) {
            a.moveH(-1, "word")
        },
        goGroupRight: function(a) {
            a.moveH(1, "group")
        },
        goGroupLeft: function(a) {
            a.moveH(-1, "group")
        },
        goWordRight: function(a) {
            a.moveH(1, "word")
        },
        delCharBefore: function(a) {
            a.deleteH(-1, "char")
        },
        delCharAfter: function(a) {
            a.deleteH(1, "char")
        },
        delWordBefore: function(a) {
            a.deleteH(-1, "word")
        },
        delWordAfter: function(a) {
            a.deleteH(1, "word")
        },
        delGroupBefore: function(a) {
            a.deleteH(-1, "group")
        },
        delGroupAfter: function(a) {
            a.deleteH(1, "group")
        },
        indentAuto: function(a) {
            a.indentSelection("smart")
        },
        indentMore: function(a) {
            a.indentSelection("add")
        },
        indentLess: function(a) {
            a.indentSelection("subtract")
        },
        insertTab: function(a) {
            a.replaceSelection("	", "end", "+input")
        },
        defaultTab: function(a) {
            a.somethingSelected() ? a.indentSelection("add") : a.replaceSelection("	", "end", "+input")
        },
        transposeChars: function(a) {
            var b = a.getCursor(),
                c = a.getLine(b.line);
            b.ch > 0 && b.ch < c.length - 1 && a.replaceRange(c.charAt(b.ch) + c.charAt(b.ch - 1), xc(b.line, b.ch - 1), xc(b.line, b.ch + 1))
        },
        newlineAndIndent: function(a) {
            Db(a, function() {
                a.replaceSelection("\n", "end", "+input"), a.indentLine(a.getCursor().line, null, !0)
            })()
        },
        toggleOverwrite: function(a) {
            a.toggleOverwrite()
        }
    }, gd = w.keyMap = {};
    gd.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite"
    }, gd.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Alt-Up": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Down": "goDocEnd",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        fallthrough: "basic"
    }, gd.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineStart",
        "Cmd-Right": "goLineEnd",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delLineLeft",
        fallthrough: ["basic", "emacsy"]
    }, gd["default"] = p ? gd.macDefault : gd.pcDefault, gd.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars"
    }, w.lookupKey = id, w.isModifierKey = jd, w.keyName = kd, w.fromTextArea = function(a, b) {
        function e() {
            a.value = i.getValue()
        }
        if (b || (b = {}), b.value = a.value, !b.tabindex && a.tabindex && (b.tabindex = a.tabindex), !b.placeholder && a.placeholder && (b.placeholder = a.placeholder), null == b.autofocus) {
            var c = document.body;
            try {
                c = document.activeElement
            } catch (d) {}
            b.autofocus = c == a || null != a.getAttribute("autofocus") && c == document.body
        }
        if (a.form && (He(a.form, "submit", e), !b.leaveSubmitMethodAlone)) {
            var f = a.form,
                g = f.submit;
            try {
                var h = f.submit = function() {
                    e(), f.submit = g, f.submit(), f.submit = h
                }
            } catch (d) {}
        }
        a.style.display = "none";
        var i = w(function(b) {
            a.parentNode.insertBefore(b, a.nextSibling)
        }, b);
        return i.save = e, i.getTextArea = function() {
            return a
        }, i.toTextArea = function() {
            e(), a.parentNode.removeChild(i.getWrapperElement()), a.style.display = "", a.form && (Ie(a.form, "submit", e), "function" == typeof a.form.submit && (a.form.submit = g))
        }, i
    }, ld.prototype = {
        eol: function() {
            return this.pos >= this.string.length
        },
        sol: function() {
            return 0 == this.pos
        },
        peek: function() {
            return this.string.charAt(this.pos) || void 0
        },
        next: function() {
            return this.pos < this.string.length ? this.string.charAt(this.pos++) : void 0
        },
        eat: function(a) {
            var b = this.string.charAt(this.pos);
            if ("string" == typeof a) var c = b == a;
            else var c = b && (a.test ? a.test(b) : a(b));
            return c ? (++this.pos, b) : void 0
        },
        eatWhile: function(a) {
            for (var b = this.pos; this.eat(a););
            return this.pos > b
        },
        eatSpace: function() {
            for (var a = this.pos;
                /[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;
            return this.pos > a
        },
        skipToEnd: function() {
            this.pos = this.string.length
        },
        skipTo: function(a) {
            var b = this.string.indexOf(a, this.pos);
            return b > -1 ? (this.pos = b, !0) : void 0
        },
        backUp: function(a) {
            this.pos -= a
        },
        column: function() {
            return this.lastColumnPos < this.start && (this.lastColumnValue = Ue(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue
        },
        indentation: function() {
            return Ue(this.string, null, this.tabSize)
        },
        match: function(a, b, c) {
            if ("string" != typeof a) {
                var f = this.string.slice(this.pos).match(a);
                return f && f.index > 0 ? null : (f && b !== !1 && (this.pos += f[0].length), f)
            }
            var d = function(a) {
                return c ? a.toLowerCase() : a
            }, e = this.string.substr(this.pos, a.length);
            return d(e) == d(a) ? (b !== !1 && (this.pos += a.length), !0) : void 0
        },
        current: function() {
            return this.string.slice(this.start, this.pos)
        }
    }, w.StringStream = ld, w.TextMarker = md, Qe(md), md.prototype.clear = function() {
        if (!this.explicitlyCleared) {
            var a = this.doc.cm,
                b = a && !a.curOp;
            if (b && Bb(a), Pe(this, "clear")) {
                var c = this.find();
                c && Me(this, "clear", c.from, c.to)
            }
            for (var d = null, e = null, f = 0; f < this.lines.length; ++f) {
                var g = this.lines[f],
                    h = qd(g.markedSpans, this);
                null != h.to && (e = le(g)), g.markedSpans = rd(g.markedSpans, h), null != h.from ? d = le(g) : this.collapsed && !Cd(this.doc, g) && a && ke(g, yb(a.display))
            }
            if (a && this.collapsed && !a.options.lineWrapping)
                for (var f = 0; f < this.lines.length; ++f) {
                    var i = Bd(a.doc, this.lines[f]),
                        j = G(a.doc, i);
                    j > a.display.maxLineLength && (a.display.maxLine = i, a.display.maxLineLength = j, a.display.maxLineChanged = !0)
                }
            null != d && a && Gb(a, d, e + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, a && Ic(a)), b && Cb(a)
        }
    }, md.prototype.find = function() {
        for (var a, b, c = 0; c < this.lines.length; ++c) {
            var d = this.lines[c],
                e = qd(d.markedSpans, this);
            if (null != e.from || null != e.to) {
                var f = le(d);
                null != e.from && (a = xc(f, e.from)), null != e.to && (b = xc(f, e.to))
            }
        }
        return "bookmark" == this.type ? a : a && {
            from: a,
            to: b
        }
    }, md.prototype.changed = function() {
        var a = this.find(),
            b = this.doc.cm;
        if (a && b) {
            var c = he(this.doc, a.from.line);
            if (jb(b, c), a.from.line >= b.display.showingFrom && a.from.line < b.display.showingTo) {
                for (var d = b.display.lineDiv.firstChild; d; d = d.nextSibling)
                    if (d.lineObj == c) {
                        d.offsetHeight != c.height && ke(c, d.offsetHeight);
                        break
                    }
                Fb(b, function() {
                    b.curOp.selectionChanged = b.curOp.forceUpdate = b.curOp.updateMaxLine = !0
                })
            }
        }
    }, md.prototype.attachLine = function(a) {
        if (!this.lines.length && this.doc.cm) {
            var b = this.doc.cm.curOp;
            b.maybeHiddenMarkers && -1 != Ze(b.maybeHiddenMarkers, this) || (b.maybeUnhiddenMarkers || (b.maybeUnhiddenMarkers = [])).push(this)
        }
        this.lines.push(a)
    }, md.prototype.detachLine = function(a) {
        if (this.lines.splice(Ze(this.lines, a), 1), !this.lines.length && this.doc.cm) {
            var b = this.doc.cm.curOp;
            (b.maybeHiddenMarkers || (b.maybeHiddenMarkers = [])).push(this)
        }
    }, w.SharedTextMarker = od, Qe(od), od.prototype.clear = function() {
        if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var a = 0; a < this.markers.length; ++a) this.markers[a].clear();
            Me(this, "clear")
        }
    }, od.prototype.find = function() {
        return this.primary.find()
    };
    var Gd = w.LineWidget = function(a, b, c) {
        if (c)
            for (var d in c) c.hasOwnProperty(d) && (this[d] = c[d]);
        this.cm = a, this.node = b
    };
    Qe(Gd), Gd.prototype.clear = Hd(function() {
        var a = this.line.widgets,
            b = le(this.line);
        if (null != b && a) {
            for (var c = 0; c < a.length; ++c) a[c] == this && a.splice(c--, 1);
            a.length || (this.line.widgets = null);
            var d = ne(this.cm, this.line) < this.cm.doc.scrollTop;
            ke(this.line, Math.max(0, this.line.height - Id(this))), d && Pc(this.cm, 0, -this.height), Gb(this.cm, b, b + 1)
        }
    }), Gd.prototype.changed = Hd(function() {
        var a = this.height;
        this.height = null;
        var b = Id(this) - a;
        if (b) {
            ke(this.line, this.line.height + b);
            var c = le(this.line);
            Gb(this.cm, c, c + 1)
        }
    });
    var Kd = w.Line = function(a, b, c) {
        this.text = a, Fd(this, b), this.height = c ? c(this) : 1
    };
    Qe(Kd);
    var Rd = {}, Ud = /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\uFEFF]/g;
    _d.prototype = {
        chunkSize: function() {
            return this.lines.length
        },
        removeInner: function(a, b) {
            for (var c = a, d = a + b; d > c; ++c) {
                var e = this.lines[c];
                this.height -= e.height, Md(e), Me(e, "delete")
            }
            this.lines.splice(a, b)
        },
        collapse: function(a) {
            a.splice.apply(a, [a.length, 0].concat(this.lines))
        },
        insertInner: function(a, b, c) {
            this.height += c, this.lines = this.lines.slice(0, a).concat(b).concat(this.lines.slice(a));
            for (var d = 0, e = b.length; e > d; ++d) b[d].parent = this
        },
        iterN: function(a, b, c) {
            for (var d = a + b; d > a; ++a)
                if (c(this.lines[a])) return !0
        }
    }, ae.prototype = {
        chunkSize: function() {
            return this.size
        },
        removeInner: function(a, b) {
            this.size -= b;
            for (var c = 0; c < this.children.length; ++c) {
                var d = this.children[c],
                    e = d.chunkSize();
                if (e > a) {
                    var f = Math.min(b, e - a),
                        g = d.height;
                    if (d.removeInner(a, f), this.height -= g - d.height, e == f && (this.children.splice(c--, 1), d.parent = null), 0 == (b -= f)) break;
                    a = 0
                } else a -= e
            }
            if (this.size - b < 25) {
                var h = [];
                this.collapse(h), this.children = [new _d(h)], this.children[0].parent = this
            }
        },
        collapse: function(a) {
            for (var b = 0, c = this.children.length; c > b; ++b) this.children[b].collapse(a)
        },
        insertInner: function(a, b, c) {
            this.size += b.length, this.height += c;
            for (var d = 0, e = this.children.length; e > d; ++d) {
                var f = this.children[d],
                    g = f.chunkSize();
                if (g >= a) {
                    if (f.insertInner(a, b, c), f.lines && f.lines.length > 50) {
                        for (; f.lines.length > 50;) {
                            var h = f.lines.splice(f.lines.length - 25, 25),
                                i = new _d(h);
                            f.height -= i.height, this.children.splice(d + 1, 0, i), i.parent = this
                        }
                        this.maybeSpill()
                    }
                    break
                }
                a -= g
            }
        },
        maybeSpill: function() {
            if (!(this.children.length <= 10)) {
                var a = this;
                do {
                    var b = a.children.splice(a.children.length - 5, 5),
                        c = new ae(b);
                    if (a.parent) {
                        a.size -= c.size, a.height -= c.height;
                        var e = Ze(a.parent.children, a);
                        a.parent.children.splice(e + 1, 0, c)
                    } else {
                        var d = new ae(a.children);
                        d.parent = a, a.children = [d, c], a = d
                    }
                    c.parent = a.parent
                } while (a.children.length > 10);
                a.parent.maybeSpill()
            }
        },
        iterN: function(a, b, c) {
            for (var d = 0, e = this.children.length; e > d; ++d) {
                var f = this.children[d],
                    g = f.chunkSize();
                if (g > a) {
                    var h = Math.min(b, g - a);
                    if (f.iterN(a, h, c)) return !0;
                    if (0 == (b -= h)) break;
                    a = 0
                } else a -= g
            }
        }
    };
    var be = 0,
        ce = w.Doc = function(a, b, c) {
            if (!(this instanceof ce)) return new ce(a, b, c);
            null == c && (c = 0), ae.call(this, [new _d([new Kd("", null)])]), this.first = c, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.history = pe(), this.cleanGeneration = 1, this.frontier = c;
            var d = xc(c, 0);
            this.sel = {
                from: d,
                to: d,
                head: d,
                anchor: d,
                shift: !1,
                extend: !1,
                goalColumn: null
            }, this.id = ++be, this.modeOption = b, "string" == typeof a && (a = sf(a)), $d(this, {
                from: d,
                to: d,
                text: a
            }, null, {
                head: d,
                anchor: d
            })
        };
    ce.prototype = $e(ae.prototype, {
        constructor: ce,
        iter: function(a, b, c) {
            c ? this.iterN(a - this.first, b - a, c) : this.iterN(this.first, this.first + this.size, a)
        },
        insert: function(a, b) {
            for (var c = 0, d = 0, e = b.length; e > d; ++d) c += b[d].height;
            this.insertInner(a - this.first, b, c)
        },
        remove: function(a, b) {
            this.removeInner(a - this.first, b)
        },
        getValue: function(a) {
            var b = je(this, this.first, this.first + this.size);
            return a === !1 ? b : b.join(a || "\n")
        },
        setValue: function(a) {
            var b = xc(this.first, 0),
                c = this.first + this.size - 1;
            qc(this, {
                from: b,
                to: xc(c, he(this, c).text.length),
                text: sf(a),
                origin: "setValue"
            }, {
                head: b,
                anchor: b
            }, !0)
        },
        replaceRange: function(a, b, c, d) {
            b = Cc(this, b), c = c ? Cc(this, c) : b, wc(this, a, b, c, d)
        },
        getRange: function(a, b, c) {
            var d = ie(this, Cc(this, a), Cc(this, b));
            return c === !1 ? d : d.join(c || "\n")
        },
        getLine: function(a) {
            var b = this.getLineHandle(a);
            return b && b.text
        },
        setLine: function(a, b) {
            Ec(this, a) && wc(this, b, xc(a, 0), Cc(this, xc(a)))
        },
        removeLine: function(a) {
            a ? wc(this, "", Cc(this, xc(a - 1)), Cc(this, xc(a))) : wc(this, "", xc(0, 0), Cc(this, xc(1, 0)))
        },
        getLineHandle: function(a) {
            return Ec(this, a) ? he(this, a) : void 0
        },
        getLineNumber: function(a) {
            return le(a)
        },
        getLineHandleVisualStart: function(a) {
            return "number" == typeof a && (a = he(this, a)), Bd(this, a)
        },
        lineCount: function() {
            return this.size
        },
        firstLine: function() {
            return this.first
        },
        lastLine: function() {
            return this.first + this.size - 1
        },
        clipPos: function(a) {
            return Cc(this, a)
        },
        getCursor: function(a) {
            var c, b = this.sel;
            return c = null == a || "head" == a ? b.head : "anchor" == a ? b.anchor : "end" == a || a === !1 ? b.to : b.from, Ac(c)
        },
        somethingSelected: function() {
            return !yc(this.sel.head, this.sel.anchor)
        },
        setCursor: Eb(function(a, b, c) {
            var d = Cc(this, "number" == typeof a ? xc(a, b || 0) : a);
            c ? Fc(this, d) : Hc(this, d, d)
        }),
        setSelection: Eb(function(a, b) {
            Hc(this, Cc(this, a), Cc(this, b || a))
        }),
        extendSelection: Eb(function(a, b) {
            Fc(this, Cc(this, a), b && Cc(this, b))
        }),
        getSelection: function(a) {
            return this.getRange(this.sel.from, this.sel.to, a)
        },
        replaceSelection: function(a, b, c) {
            qc(this, {
                from: this.sel.from,
                to: this.sel.to,
                text: sf(a),
                origin: c
            }, b || "around")
        },
        undo: Eb(function() {
            sc(this, "undo")
        }),
        redo: Eb(function() {
            sc(this, "redo")
        }),
        setExtending: function(a) {
            this.sel.extend = a
        },
        historySize: function() {
            var a = this.history;
            return {
                undo: a.done.length,
                redo: a.undone.length
            }
        },
        clearHistory: function() {
            this.history = pe(this.history.maxGeneration)
        },
        markClean: function() {
            this.cleanGeneration = this.changeGeneration()
        },
        changeGeneration: function() {
            return this.history.lastOp = this.history.lastOrigin = null, this.history.generation
        },
        isClean: function(a) {
            return this.history.generation == (a || this.cleanGeneration)
        },
        getHistory: function() {
            return {
                done: ve(this.history.done),
                undone: ve(this.history.undone)
            }
        },
        setHistory: function(a) {
            var b = this.history = pe(this.history.maxGeneration);
            b.done = a.done.slice(0), b.undone = a.undone.slice(0)
        },
        markText: function(a, b, c) {
            return nd(this, Cc(this, a), Cc(this, b), c, "range")
        },
        setBookmark: function(a, b) {
            var c = {
                replacedWith: b && (null == b.nodeType ? b.widget : b),
                insertLeft: b && b.insertLeft
            };
            return a = Cc(this, a), nd(this, a, a, c, "bookmark")
        },
        findMarksAt: function(a) {
            a = Cc(this, a);
            var b = [],
                c = he(this, a.line).markedSpans;
            if (c)
                for (var d = 0; d < c.length; ++d) {
                    var e = c[d];
                    (null == e.from || e.from <= a.ch) && (null == e.to || e.to >= a.ch) && b.push(e.marker.parent || e.marker)
                }
            return b
        },
        getAllMarks: function() {
            var a = [];
            return this.iter(function(b) {
                var c = b.markedSpans;
                if (c)
                    for (var d = 0; d < c.length; ++d) null != c[d].from && a.push(c[d].marker)
            }), a
        },
        posFromIndex: function(a) {
            var b, c = this.first;
            return this.iter(function(d) {
                var e = d.text.length + 1;
                return e > a ? (b = a, !0) : (a -= e, ++c, void 0)
            }), Cc(this, xc(c, b))
        },
        indexFromPos: function(a) {
            a = Cc(this, a);
            var b = a.ch;
            return a.line < this.first || a.ch < 0 ? 0 : (this.iter(this.first, a.line, function(a) {
                b += a.text.length + 1
            }), b)
        },
        copy: function(a) {
            var b = new ce(je(this, this.first, this.first + this.size), this.modeOption, this.first);
            return b.scrollTop = this.scrollTop, b.scrollLeft = this.scrollLeft, b.sel = {
                from: this.sel.from,
                to: this.sel.to,
                head: this.sel.head,
                anchor: this.sel.anchor,
                shift: this.sel.shift,
                extend: !1,
                goalColumn: this.sel.goalColumn
            }, a && (b.history.undoDepth = this.history.undoDepth, b.setHistory(this.getHistory())), b
        },
        linkedDoc: function(a) {
            a || (a = {});
            var b = this.first,
                c = this.first + this.size;
            null != a.from && a.from > b && (b = a.from), null != a.to && a.to < c && (c = a.to);
            var d = new ce(je(this, b, c), a.mode || this.modeOption, b);
            return a.sharedHist && (d.history = this.history), (this.linked || (this.linked = [])).push({
                doc: d,
                sharedHist: a.sharedHist
            }), d.linked = [{
                doc: this,
                isParent: !0,
                sharedHist: a.sharedHist
            }], d
        },
        unlinkDoc: function(a) {
            if (a instanceof w && (a = a.doc), this.linked)
                for (var b = 0; b < this.linked.length; ++b) {
                    var c = this.linked[b];
                    if (c.doc == a) {
                        this.linked.splice(b, 1), a.unlinkDoc(this);
                        break
                    }
                }
            if (a.history == this.history) {
                var d = [a.id];
                fe(a, function(a) {
                    d.push(a.id)
                }, !0), a.history = pe(), a.history.done = ve(this.history.done, d), a.history.undone = ve(this.history.undone, d)
            }
        },
        iterLinkedDocs: function(a) {
            fe(this, a)
        },
        getMode: function() {
            return this.mode
        },
        getEditor: function() {
            return this.cm
        }
    }), ce.prototype.eachLine = ce.prototype.iter;
    var de = "iter insert remove copy getEditor".split(" ");
    for (var ee in ce.prototype) ce.prototype.hasOwnProperty(ee) && Ze(de, ee) < 0 && (w.prototype[ee] = function(a) {
        return function() {
            return a.apply(this.doc, arguments)
        }
    }(ce.prototype[ee]));
    Qe(ce), w.e_stop = Ee, w.e_preventDefault = Be, w.e_stopPropagation = Ce;
    var Ke, Le = 0;
    w.on = He, w.off = Ie, w.signal = Je;
    var Re = 30,
        Se = w.Pass = {
            toString: function() {
                return "CodeMirror.Pass"
            }
        };
    Te.prototype = {
        set: function(a, b) {
            clearTimeout(this.id), this.id = setTimeout(b, a)
        }
    }, w.countColumn = Ue;
    var Ve = [""],
        cf = /[\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
        ff = /[\u0300-\u036F\u0483-\u0487\u0488-\u0489\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\uA66F\uA670-\uA672\uA674-\uA67D\uA69F\udc00-\udfff]/;
    w.replaceGetRect = function(a) {
        lf = a
    };
    var mf = function() {
        if (d) return !1;
        var a = gf("div");
        return "draggable" in a || "dragDrop" in a
    }();
    a ? nf = function(a, b) {
        return 36 == a.charCodeAt(b - 1) && 39 == a.charCodeAt(b)
    } : i && !/Version\/([6-9]|\d\d)\b/.test(navigator.userAgent) ? nf = function(a, b) {
        return /\-[^ \-?]|\?[^ !\'\"\),.\-\/:;\?\]\}]/.test(a.slice(b - 1, b + 1))
    } : e && !/Chrome\/(?:29|[3-9]\d|\d\d\d)\./.test(navigator.userAgent) && (nf = function(a, b) {
        if (b > 1 && 45 == a.charCodeAt(b - 1)) {
            if (/\w/.test(a.charAt(b - 2)) && /[^\-?\.]/.test(a.charAt(b))) return !0;
            if (b > 2 && /[\d\.,]/.test(a.charAt(b - 2)) && /[\d\.,]/.test(a.charAt(b))) return !1
        }
        return /[~!#%&*)=+}\]|\"\.>,:;][({[<]|-[^\-?\.\u2010-\u201f\u2026]|\?[\w~`@#$%\^&*(_=+{[|><]|\u2026[\w~`@#$%\^&*(_=+{[><]/.test(a.slice(b - 1, b + 1))
    });
    var of, qf, sf = 3 != "\n\nb".split(/\n/).length ? function(a) {
            for (var b = 0, c = [], d = a.length; d >= b;) {
                var e = a.indexOf("\n", b); - 1 == e && (e = a.length);
                var f = a.slice(b, "\r" == a.charAt(e - 1) ? e - 1 : e),
                    g = f.indexOf("\r"); - 1 != g ? (c.push(f.slice(0, g)), b += g + 1) : (c.push(f), b = e + 1)
            }
            return c
        } : function(a) {
            return a.split(/\r\n?|\n/)
        };
    w.splitLines = sf;
    var tf = window.getSelection ? function(a) {
            try {
                return a.selectionStart != a.selectionEnd
            } catch (b) {
                return !1
            }
        } : function(a) {
            try {
                var b = a.ownerDocument.selection.createRange()
            } catch (c) {}
            return b && b.parentElement() == a ? 0 != b.compareEndPoints("StartToEnd", b) : !1
        }, uf = function() {
            var a = gf("div");
            return "oncopy" in a ? !0 : (a.setAttribute("oncopy", "return;"), "function" == typeof a.oncopy)
        }(),
        vf = {
            3: "Enter",
            8: "Backspace",
            9: "Tab",
            13: "Enter",
            16: "Shift",
            17: "Ctrl",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Esc",
            32: "Space",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down",
            44: "PrintScrn",
            45: "Insert",
            46: "Delete",
            59: ";",
            91: "Mod",
            92: "Mod",
            93: "Mod",
            109: "-",
            107: "=",
            127: "Delete",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'",
            63276: "PageUp",
            63277: "PageDown",
            63275: "End",
            63273: "Home",
            63234: "Left",
            63232: "Up",
            63235: "Right",
            63233: "Down",
            63302: "Insert",
            63272: "Delete"
        };
    w.keyNames = vf,
    function() {
        for (var a = 0; 10 > a; a++) vf[a + 48] = String(a);
        for (var a = 65; 90 >= a; a++) vf[a] = String.fromCharCode(a);
        for (var a = 1; 12 >= a; a++) vf[a + 111] = vf[a + 63235] = "F" + a
    }();
    var Ef, Jf = function() {
            function c(c) {
                return 255 >= c ? a.charAt(c) : c >= 1424 && 1524 >= c ? "R" : c >= 1536 && 1791 >= c ? b.charAt(c - 1536) : c >= 1792 && 2220 >= c ? "r" : "L"
            }
            var a = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLL",
                b = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmmrrrrrrrrrrrrrrrrrr",
                d = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
                e = /[stwN]/,
                f = /[LRr]/,
                g = /[Lb1n]/,
                h = /[1n]/,
                i = "L";
            return function(a) {
                if (!d.test(a)) return !1;
                for (var l, b = a.length, j = [], k = 0; b > k; ++k) j.push(l = c(a.charCodeAt(k)));
                for (var k = 0, m = i; b > k; ++k) {
                    var l = j[k];
                    "m" == l ? j[k] = m : m = l
                }
                for (var k = 0, n = i; b > k; ++k) {
                    var l = j[k];
                    "1" == l && "r" == n ? j[k] = "n" : f.test(l) && (n = l, "r" == l && (j[k] = "R"))
                }
                for (var k = 1, m = j[0]; b - 1 > k; ++k) {
                    var l = j[k];
                    "+" == l && "1" == m && "1" == j[k + 1] ? j[k] = "1" : "," != l || m != j[k + 1] || "1" != m && "n" != m || (j[k] = m), m = l
                }
                for (var k = 0; b > k; ++k) {
                    var l = j[k];
                    if ("," == l) j[k] = "N";
                    else if ("%" == l) {
                        for (var o = k + 1; b > o && "%" == j[o]; ++o);
                        for (var p = k && "!" == j[k - 1] || b - 1 > o && "1" == j[o] ? "1" : "N", q = k; o > q; ++q) j[q] = p;
                        k = o - 1
                    }
                }
                for (var k = 0, n = i; b > k; ++k) {
                    var l = j[k];
                    "L" == n && "1" == l ? j[k] = "L" : f.test(l) && (n = l)
                }
                for (var k = 0; b > k; ++k)
                    if (e.test(j[k])) {
                        for (var o = k + 1; b > o && e.test(j[o]); ++o);
                        for (var r = "L" == (k ? j[k - 1] : i), s = "L" == (b - 1 > o ? j[o] : i), p = r || s ? "L" : "R", q = k; o > q; ++q) j[q] = p;
                        k = o - 1
                    }
                for (var u, t = [], k = 0; b > k;)
                    if (g.test(j[k])) {
                        var v = k;
                        for (++k; b > k && g.test(j[k]); ++k);
                        t.push({
                            from: v,
                            to: k,
                            level: 0
                        })
                    } else {
                        var w = k,
                            x = t.length;
                        for (++k; b > k && "L" != j[k]; ++k);
                        for (var q = w; k > q;)
                            if (h.test(j[q])) {
                                q > w && t.splice(x, 0, {
                                    from: w,
                                    to: q,
                                    level: 1
                                });
                                var y = q;
                                for (++q; k > q && h.test(j[q]); ++q);
                                t.splice(x, 0, {
                                    from: y,
                                    to: q,
                                    level: 2
                                }), w = q
                            } else ++q;
                        k > w && t.splice(x, 0, {
                            from: w,
                            to: k,
                            level: 1
                        })
                    }
                return 1 == t[0].level && (u = a.match(/^\s+/)) && (t[0].from = u[0].length, t.unshift({
                    from: 0,
                    to: u[0].length,
                    level: 0
                })), 1 == Xe(t).level && (u = a.match(/\s+$/)) && (Xe(t).to -= u[0].length, t.push({
                    from: b - u[0].length,
                    to: b,
                    level: 0
                })), t[0].level != Xe(t).level && t.push({
                    from: b,
                    to: b,
                    level: t[0].level
                }), t
            }
        }();
    return w.version = "3.15.0", w
}(), CodeMirror.defineMode("clike", function(a, b) {
    function n(a, b) {
        var c = a.next();
        if (j[c]) {
            var d = j[c](a, b);
            if (d !== !1) return d
        }
        if ('"' == c || "'" == c) return b.tokenize = o(c), b.tokenize(a, b);
        if (/[\[\]{}\(\),;\:\.]/.test(c)) return m = c, null;
        if (/\d/.test(c)) return a.eatWhile(/[\w\.]/), "number";
        if ("/" == c) {
            if (a.eat("*")) return b.tokenize = p, p(a, b);
            if (a.eat("/")) return a.skipToEnd(), "comment"
        }
        if (l.test(c)) return a.eatWhile(l), "operator";
        a.eatWhile(/[\w\$_]/);
        var e = a.current();
        return f.propertyIsEnumerable(e) ? (h.propertyIsEnumerable(e) && (m = "newstatement"), "keyword") : g.propertyIsEnumerable(e) ? (h.propertyIsEnumerable(e) && (m = "newstatement"), "builtin") : i.propertyIsEnumerable(e) ? "atom" : "variable"
    }

    function o(a) {
        return function(b, c) {
            for (var e, d = !1, f = !1; null != (e = b.next());) {
                if (e == a && !d) {
                    f = !0;
                    break
                }
                d = !d && "\\" == e
            }
            return (f || !d && !k) && (c.tokenize = null), "string"
        }
    }

    function p(a, b) {
        for (var d, c = !1; d = a.next();) {
            if ("/" == d && c) {
                b.tokenize = null;
                break
            }
            c = "*" == d
        }
        return "comment"
    }

    function q(a, b, c, d, e) {
        this.indented = a, this.column = b, this.type = c, this.align = d, this.prev = e
    }

    function r(a, b, c) {
        var d = a.indented;
        return a.context && "statement" == a.context.type && (d = a.context.indented), a.context = new q(d, b, c, null, a.context)
    }

    function s(a) {
        var b = a.context.type;
        return (")" == b || "]" == b || "}" == b) && (a.indented = a.context.indented), a.context = a.context.prev
    }
    var m, c = a.indentUnit,
        d = b.statementIndentUnit || c,
        e = b.dontAlignCalls,
        f = b.keywords || {}, g = b.builtin || {}, h = b.blockKeywords || {}, i = b.atoms || {}, j = b.hooks || {}, k = b.multiLineStrings,
        l = /[+\-*&%=<>!?|\/]/;
    return {
        startState: function(a) {
            return {
                tokenize: null,
                context: new q((a || 0) - c, 0, "top", !1),
                indented: 0,
                startOfLine: !0
            }
        },
        token: function(a, b) {
            var c = b.context;
            if (a.sol() && (null == c.align && (c.align = !1), b.indented = a.indentation(), b.startOfLine = !0), a.eatSpace()) return null;
            m = null;
            var d = (b.tokenize || n)(a, b);
            if ("comment" == d || "meta" == d) return d;
            if (null == c.align && (c.align = !0), ";" != m && ":" != m && "," != m || "statement" != c.type)
                if ("{" == m) r(b, a.column(), "}");
                else
            if ("[" == m) r(b, a.column(), "]");
            else if ("(" == m) r(b, a.column(), ")");
            else if ("}" == m) {
                for (;
                    "statement" == c.type;) c = s(b);
                for ("}" == c.type && (c = s(b));
                    "statement" == c.type;) c = s(b)
            } else m == c.type ? s(b) : (("}" == c.type || "top" == c.type) && ";" != m || "statement" == c.type && "newstatement" == m) && r(b, a.column(), "statement");
            else s(b);
            return b.startOfLine = !1, d
        },
        indent: function(a, b) {
            if (a.tokenize != n && null != a.tokenize) return CodeMirror.Pass;
            var f = a.context,
                g = b && b.charAt(0);
            "statement" == f.type && "}" == g && (f = f.prev);
            var h = g == f.type;
            return "statement" == f.type ? f.indented + ("{" == g ? 0 : d) : !f.align || e && ")" == f.type ? ")" != f.type || h ? f.indented + (h ? 0 : c) : f.indented + d : f.column + (h ? 0 : 1)
        },
        electricChars: "{}",
        blockCommentStart: "/*",
        blockCommentEnd: "*/",
        lineComment: "//",
        fold: "brace"
    }
}),
function() {
    function a(a) {
        for (var b = {}, c = a.split(" "), d = 0; d < c.length; ++d) b[c[d]] = !0;
        return b
    }

    function c(a, b) {
        if (!b.startOfLine) return !1;
        for (;;) {
            if (!a.skipTo("\\")) {
                a.skipToEnd(), b.tokenize = null;
                break
            }
            if (a.next(), a.eol()) {
                b.tokenize = c;
                break
            }
        }
        return "meta"
    }

    function d(a, b) {
        for (var c; null != (c = a.next());)
            if ('"' == c && !a.eat('"')) {
                b.tokenize = null;
                break
            }
        return "string"
    }

    function e(a, b) {
        for (var c = 0; c < a.length; ++c) CodeMirror.defineMIME(a[c], b)
    }
    var b = "auto if break int case long char register continue return default short do sizeof double static else struct entry switch extern typedef float union for unsigned goto while enum void const signed volatile";
    e(["text/x-csrc", "text/x-c", "text/x-chdr"], {
        name: "clike",
        keywords: a(b),
        blockKeywords: a("case do else for if switch while struct"),
        atoms: a("null"),
        hooks: {
            "#": c
        }
    }), e(["text/x-c++src", "text/x-c++hdr"], {
        name: "clike",
        keywords: a(b + " asm dynamic_cast namespace reinterpret_cast try bool explicit new " + "static_cast typeid catch operator template typename class friend private " + "this using const_cast inline public throw virtual delete mutable protected " + "wchar_t"),
        blockKeywords: a("catch class do else finally for if struct switch try while"),
        atoms: a("true false null"),
        hooks: {
            "#": c
        }
    }), CodeMirror.defineMIME("text/x-java", {
        name: "clike",
        keywords: a("abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while"),
        blockKeywords: a("catch class do else finally for if switch try while"),
        atoms: a("true false null"),
        hooks: {
            "@": function(a) {
                return a.eatWhile(/[\w\$_]/), "meta"
            }
        }
    }), CodeMirror.defineMIME("text/x-csharp", {
        name: "clike",
        keywords: a("abstract as base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),
        blockKeywords: a("catch class do else finally for foreach if struct switch try while"),
        builtin: a("Boolean Byte Char DateTime DateTimeOffset Decimal Double Guid Int16 Int32 Int64 Object SByte Single String TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),
        atoms: a("true false null"),
        hooks: {
            "@": function(a, b) {
                return a.eat('"') ? (b.tokenize = d, d(a, b)) : (a.eatWhile(/[\w\$_]/), "meta")
            }
        }
    }), CodeMirror.defineMIME("text/x-scala", {
        name: "clike",
        keywords: a("abstract case catch class def do else extends false final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try trye type val var while with yield _ : = => <- <: <% >: # @ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector :: #:: Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),
        blockKeywords: a("catch class do else finally for forSome if match switch try while"),
        atoms: a("true false null"),
        hooks: {
            "@": function(a) {
                return a.eatWhile(/[\w\$_]/), "meta"
            }
        }
    }), e(["x-shader/x-vertex", "x-shader/x-fragment"], {
        name: "clike",
        keywords: a("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4 sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadowconst attribute uniform varying break continue discard return for while do if else struct in out inout"),
        blockKeywords: a("for while do if else struct"),
        builtin: a("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smootstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),
        atoms: a("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragColor gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),
        hooks: {
            "#": c
        }
    })
}(), CodeMirror.defineMode("css", function(a) {
    return CodeMirror.getMode(a, "text/css")
}), CodeMirror.defineMode("css-base", function(a, b) {
    "use strict";

    function l(a, b) {
        return k = b, a
    }

    function m(a, b) {
        var c = a.next();
        if (d[c]) {
            var e = d[c](a, b);
            if (e !== !1) return e
        }
        if ("@" == c) return a.eatWhile(/[\w\\\-]/), l("def", a.current());
        if ("=" == c) l(null, "compare");
        else {
            if (("~" == c || "|" == c) && a.eat("=")) return l(null, "compare");
            if ('"' == c || "'" == c) return b.tokenize = n(c), b.tokenize(a, b);
            if ("#" == c) return a.eatWhile(/[\w\\\-]/), l("atom", "hash");
            if ("!" == c) return a.match(/^\s*\w*/), l("keyword", "important");
            if (/\d/.test(c)) return a.eatWhile(/[\w.%]/), l("number", "unit");
            if ("-" !== c) return /[,+>*\/]/.test(c) ? l(null, "select-op") : "." == c && a.match(/^-?[_a-z][_a-z0-9-]*/i) ? l("qualifier", "qualifier") : ":" == c ? l("operator", c) : /[;{}\[\]\(\)]/.test(c) ? l(null, c) : "u" == c && a.match("rl(") ? (a.backUp(1), b.tokenize = o, l("property", "variable")) : (a.eatWhile(/[\w\\\-]/), l("property", "variable"));
            if (/\d/.test(a.peek())) return a.eatWhile(/[\w.%]/), l("number", "unit");
            if (a.match(/^[^-]+-/)) return l("meta", "meta")
        }
    }

    function n(a, b) {
        return function(c, d) {
            for (var f, e = !1; null != (f = c.next()) && (f != a || e);) e = !e && "\\" == f;
            return e || (b && c.backUp(1), d.tokenize = m), l("string", "string")
        }
    }

    function o(a, b) {
        return a.next(), b.tokenize = a.match(/\s*[\"\']/, !1) ? m : n(")", !0), l(null, "(")
    }
    var c = a.indentUnit,
        d = b.hooks || {}, e = b.atMediaTypes || {}, f = b.atMediaFeatures || {}, g = b.propertyKeywords || {}, h = b.colorKeywords || {}, i = b.valueKeywords || {}, j = !! b.allowNested,
        k = null;
    return {
        startState: function(a) {
            return {
                tokenize: m,
                baseIndent: a || 0,
                stack: [],
                lastToken: null
            }
        },
        token: function(a, b) {
            if (b.tokenize = b.tokenize || m, b.tokenize == m && a.eatSpace()) return null;
            var c = b.tokenize(a, b);
            c && "string" != typeof c && (c = l(c[0], c[1]));
            var d = b.stack[b.stack.length - 1];
            if ("variable" == c) return "variable-definition" == k && b.stack.push("propertyValue"), b.lastToken = "variable-2";
            if ("property" == c) {
                var n = a.current().toLowerCase();
                "propertyValue" == d ? c = i.hasOwnProperty(n) ? "string-2" : h.hasOwnProperty(n) ? "keyword" : "variable-2" : "rule" == d ? g.hasOwnProperty(n) || (c += " error") : "block" == d ? c = g.hasOwnProperty(n) ? "property" : h.hasOwnProperty(n) ? "keyword" : i.hasOwnProperty(n) ? "string-2" : "tag" : d && "@media{" != d ? "@media" == d ? c = e[a.current()] ? "attribute" : /^(only|not)$/.test(n) ? "keyword" : "and" == n ? "error" : f.hasOwnProperty(n) ? "error" : "attribute error" : "@mediaType" == d ? c = e.hasOwnProperty(n) ? "attribute" : "and" == n ? "operator" : /^(only|not)$/.test(n) ? "error" : "error" : "@mediaType(" == d ? g.hasOwnProperty(n) || (e.hasOwnProperty(n) ? c = "error" : "and" == n ? c = "operator" : /^(only|not)$/.test(n) ? c = "error" : c += " error") : c = "@import" == d ? "tag" : "error" : c = "tag"
            } else "atom" == c ? d && "@media{" != d && "block" != d ? "propertyValue" == d ? /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(a.current()) || (c += " error") : c = "error" : c = "builtin" : "@media" == d && "{" == k && (c = "error"); if ("{" == k)
                if ("@media" == d || "@mediaType" == d) b.stack[b.stack.length - 1] = "@media{";
                else {
                    var o = j ? "block" : "rule";
                    b.stack.push(o)
                } else "}" == k ? ("interpolation" == d && (c = "operator"), b.stack.pop(), "propertyValue" == d && b.stack.pop()) : "interpolation" == k ? b.stack.push("interpolation") : "@media" == k ? b.stack.push("@media") : "@import" == k ? b.stack.push("@import") : "@media" == d && /\b(keyword|attribute)\b/.test(c) ? b.stack[b.stack.length - 1] = "@mediaType" : "@mediaType" == d && "," == a.current() ? b.stack[b.stack.length - 1] = "@media" : "(" == k ? ("@media" == d || "@mediaType" == d) && (b.stack[b.stack.length - 1] = "@mediaType", b.stack.push("@mediaType(")) : ")" == k ? "propertyValue" == d && "@mediaType(" == b.stack[b.stack.length - 2] ? (b.stack.pop(), b.stack.pop()) : "@mediaType(" == d && b.stack.pop() : ":" == k && "property" == b.lastToken ? b.stack.push("propertyValue") : "propertyValue" == d && ";" == k ? b.stack.pop() : "@import" == d && ";" == k && b.stack.pop();
            return b.lastToken = c
        },
        indent: function(a, b) {
            var d = a.stack.length;
            return /^\}/.test(b) && (d -= "propertyValue" == a.stack[d - 1] ? 2 : 1), a.baseIndent + d * c
        },
        electricChars: "}",
        blockCommentStart: "/*",
        blockCommentEnd: "*/",
        fold: "brace"
    }
}),
function() {
    function a(a) {
        for (var b = {}, c = 0; c < a.length; ++c) b[a[c]] = !0;
        return b
    }

    function g(a, b) {
        for (var d, c = !1; null != (d = a.next());) {
            if (c && "/" == d) {
                b.tokenize = null;
                break
            }
            c = "*" == d
        }
        return ["comment", "comment"]
    }
    var b = a(["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"]),
        c = a(["width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid"]),
        d = a(["align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "font", "font-feature-settings", "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "grid-cell", "grid-column", "grid-column-align", "grid-column-sizing", "grid-column-span", "grid-columns", "grid-flow", "grid-row", "grid-row-align", "grid-row-sizing", "grid-row-span", "grid-rows", "grid-template", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "justify-content", "left", "letter-spacing", "line-break", "line-height", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "max-height", "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow", "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index", "zoom", "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "kerning", "text-anchor", "writing-mode"]),
        e = a(["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"]),
        f = a(["above", "absolute", "activeborder", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "auto", "avoid", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break-all", "break-word", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "compact", "condensed", "contain", "content", "content-box", "context-menu", "continuous", "copy", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "disc", "discard", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ew-resize", "expanded", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hebrew", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "justify", "kannada", "katakana", "katakana-iroha", "khmer", "landscape", "lao", "large", "larger", "left", "level", "lighter", "line-through", "linear", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "malayalam", "match", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "nw-resize", "nwse-resize", "oblique", "octal", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "overlay", "overline", "padding", "padding-box", "painted", "paused", "persian", "plus-darker", "plus-lighter", "pointer", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radio", "read-only", "read-write", "read-write-plaintext-only", "relative", "repeat", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "round", "row-resize", "rtl", "run-in", "running", "s-resize", "sans-serif", "scroll", "scrollbar", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "single", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "square", "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub", "subpixel-antialiased", "super", "sw-resize", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "transparent", "ultra-condensed", "ultra-expanded", "underline", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "x-large", "x-small", "xor", "xx-large", "xx-small"]);
    CodeMirror.defineMIME("text/css", {
        atMediaTypes: b,
        atMediaFeatures: c,
        propertyKeywords: d,
        colorKeywords: e,
        valueKeywords: f,
        hooks: {
            "<": function(a, b) {
                function c(a, b) {
                    for (var d, c = 0; null != (d = a.next());) {
                        if (c >= 2 && ">" == d) {
                            b.tokenize = null;
                            break
                        }
                        c = "-" == d ? c + 1 : 0
                    }
                    return ["comment", "comment"]
                }
                return a.eat("!") ? (b.tokenize = c, c(a, b)) : void 0
            },
            "/": function(a, b) {
                return a.eat("*") ? (b.tokenize = g, g(a, b)) : !1
            }
        },
        name: "css-base"
    }), CodeMirror.defineMIME("text/x-scss", {
        atMediaTypes: b,
        atMediaFeatures: c,
        propertyKeywords: d,
        colorKeywords: e,
        valueKeywords: f,
        allowNested: !0,
        hooks: {
            $: function(a) {
                return a.match(/^[\w-]+/), ":" == a.peek() ? ["variable", "variable-definition"] : ["variable", "variable"]
            },
            "/": function(a, b) {
                return a.eat("/") ? (a.skipToEnd(), ["comment", "comment"]) : a.eat("*") ? (b.tokenize = g, g(a, b)) : ["operator", "operator"]
            },
            "#": function(a) {
                return a.eat("{") ? ["operator", "interpolation"] : (a.eatWhile(/[\w\\\-]/), ["atom", "hash"])
            }
        },
        name: "css-base"
    })
}(), CodeMirror.defineMode("htmlmixed", function(a, b) {
    function i(a, b) {
        var f = b.htmlState.tagName,
            g = c.token(a, b.htmlState);
        if ("script" == f && /\btag\b/.test(g) && ">" == a.current()) {
            var h = a.string.slice(Math.max(0, a.pos - 100), a.pos).match(/\btype\s*=\s*("[^"]+"|'[^']+'|\S+)[^<]*$/i);
            h = h ? h[1] : "", h && /[\"\']/.test(h.charAt(0)) && (h = h.slice(1, h.length - 1));
            for (var i = 0; i < e.length; ++i) {
                var j = e[i];
                if ("string" == typeof j.matches ? h == j.matches : j.matches.test(h)) {
                    j.mode && (b.token = k, b.localMode = j.mode, b.localState = j.mode.startState && j.mode.startState(c.indent(b.htmlState, "")));
                    break
                }
            }
        } else "style" == f && /\btag\b/.test(g) && ">" == a.current() && (b.token = l, b.localMode = d, b.localState = d.startState(c.indent(b.htmlState, "")));
        return g
    }

    function j(a, b, c) {
        var f, d = a.current(),
            e = d.search(b);
        return e > -1 ? a.backUp(d.length - e) : (f = d.match(/<\/?$/)) && (a.backUp(d.length), a.match(b, !1) || a.match(d[0])), c
    }

    function k(a, b) {
        return a.match(/^<\/\s*script\s*>/i, !1) ? (b.token = i, b.localState = b.localMode = null, i(a, b)) : j(a, /<\/\s*script\s*>/, b.localMode.token(a, b.localState))
    }

    function l(a, b) {
        return a.match(/^<\/\s*style\s*>/i, !1) ? (b.token = i, b.localState = b.localMode = null, i(a, b)) : j(a, /<\/\s*style\s*>/, d.token(a, b.localState))
    }
    var c = CodeMirror.getMode(a, {
        name: "xml",
        htmlMode: !0
    }),
        d = CodeMirror.getMode(a, "css"),
        e = [],
        f = b && b.scriptTypes;
    if (e.push({
        matches: /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^$/i,
        mode: CodeMirror.getMode(a, "javascript")
    }), f)
        for (var g = 0; g < f.length; ++g) {
            var h = f[g];
            e.push({
                matches: h.matches,
                mode: h.mode && CodeMirror.getMode(a, h.mode)
            })
        }
    return e.push({
        matches: /./,
        mode: CodeMirror.getMode(a, "text/plain")
    }), {
        startState: function() {
            var a = c.startState();
            return {
                token: i,
                localMode: null,
                localState: null,
                htmlState: a
            }
        },
        copyState: function(a) {
            if (a.localState) var b = CodeMirror.copyState(a.localMode, a.localState);
            return {
                token: a.token,
                localMode: a.localMode,
                localState: b,
                htmlState: CodeMirror.copyState(c, a.htmlState)
            }
        },
        token: function(a, b) {
            return b.token(a, b)
        },
        indent: function(a, b) {
            return !a.localMode || /^\s*<\//.test(b) ? c.indent(a.htmlState, b) : a.localMode.indent ? a.localMode.indent(a.localState, b) : CodeMirror.Pass
        },
        electricChars: "/{}:",
        innerMode: function(a) {
            return {
                state: a.localState || a.htmlState,
                mode: a.localMode || c
            }
        }
    }
}, "xml", "javascript", "css"), CodeMirror.defineMIME("text/html", "htmlmixed"), CodeMirror.defineMode("javascript", function(a, b) {
    function i(a, b, c) {
        return b.tokenize = c, c(a, b)
    }

    function j(a, b) {
        for (var d, c = !1; null != (d = a.next());) {
            if (d == b && !c) return !1;
            c = !c && "\\" == d
        }
        return c
    }

    function m(a, b, c) {
        return k = a, l = c, b
    }

    function n(a, b) {
        var c = a.next();
        if ('"' == c || "'" == c) return i(a, b, o(c));
        if (/[\[\]{}\(\),;\:\.]/.test(c)) return m(c);
        if ("0" == c && a.eat(/x/i)) return a.eatWhile(/[\da-f]/i), m("number", "number");
        if (/\d/.test(c) || "-" == c && a.eat(/\d/)) return a.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), m("number", "number");
        if ("/" == c) return a.eat("*") ? i(a, b, p) : a.eat("/") ? (a.skipToEnd(), m("comment", "comment")) : "operator" == b.lastType || "keyword c" == b.lastType || /^[\[{}\(,;:]$/.test(b.lastType) ? (j(a, "/"), a.eatWhile(/[gimy]/), m("regexp", "string-2")) : (a.eatWhile(h), m("operator", null, a.current()));
        if ("#" == c) return a.skipToEnd(), m("error", "error");
        if (h.test(c)) return a.eatWhile(h), m("operator", null, a.current());
        a.eatWhile(/[\w\$_]/);
        var d = a.current(),
            e = g.propertyIsEnumerable(d) && g[d];
        return e && "." != b.lastType ? m(e.type, e.style, d) : m("variable", "variable", d)
    }

    function o(a) {
        return function(b, c) {
            return j(b, a) || (c.tokenize = n), m("string", "string")
        }
    }

    function p(a, b) {
        for (var d, c = !1; d = a.next();) {
            if ("/" == d && c) {
                b.tokenize = n;
                break
            }
            c = "*" == d
        }
        return m("comment", "comment")
    }

    function r(a, b, c, d, e, f) {
        this.indented = a, this.column = b, this.type = c, this.prev = e, this.info = f, null != d && (this.align = d)
    }

    function s(a, b) {
        for (var c = a.localVars; c; c = c.next)
            if (c.name == b) return !0
    }

    function t(a, b, c, d, f) {
        var g = a.cc;
        for (u.state = a, u.stream = f, u.marked = null, u.cc = g, a.lexical.hasOwnProperty("align") || (a.lexical.align = !0);;) {
            var h = g.length ? g.pop() : e ? F : E;
            if (h(c, d)) {
                for (; g.length && g[g.length - 1].lex;) g.pop()();
                return u.marked ? u.marked : "variable" == c && s(a, d) ? "variable-2" : b
            }
        }
    }

    function v() {
        for (var a = arguments.length - 1; a >= 0; a--) u.cc.push(arguments[a])
    }

    function w() {
        return v.apply(null, arguments), !0
    }

    function x(a) {
        function b(b) {
            for (var c = b; c; c = c.next)
                if (c.name == a) return !0;
            return !1
        }
        var c = u.state;
        if (c.context) {
            if (u.marked = "def", b(c.localVars)) return;
            c.localVars = {
                name: a,
                next: c.localVars
            }
        } else {
            if (b(c.globalVars)) return;
            c.globalVars = {
                name: a,
                next: c.globalVars
            }
        }
    }

    function z() {
        u.state.context = {
            prev: u.state.context,
            vars: u.state.localVars
        }, u.state.localVars = y
    }

    function A() {
        u.state.localVars = u.state.context.vars, u.state.context = u.state.context.prev
    }

    function B(a, b) {
        var c = function() {
            var c = u.state,
                d = c.indented;
            "stat" == c.lexical.type && (d = c.lexical.indented), c.lexical = new r(d, u.stream.column(), a, null, c.lexical, b)
        };
        return c.lex = !0, c
    }

    function C() {
        var a = u.state;
        a.lexical.prev && (")" == a.lexical.type && (a.indented = a.lexical.indented), a.lexical = a.lexical.prev)
    }

    function D(a) {
        return function(b) {
            return b == a ? w() : ";" == a ? v() : w(arguments.callee)
        }
    }

    function E(a) {
        return "var" == a ? w(B("vardef"), U, D(";"), C) : "keyword a" == a ? w(B("form"), F, E, C) : "keyword b" == a ? w(B("form"), E, C) : "{" == a ? w(B("}"), R, C) : ";" == a ? w() : "if" == a ? w(B("form"), F, E, C, W) : "function" == a ? w(_) : "for" == a ? w(B("form"), D("("), B(")"), X, D(")"), C, E, C) : "variable" == a ? w(B("stat"), M) : "switch" == a ? w(B("form"), F, B("}", "switch"), D("{"), R, C, C) : "case" == a ? w(F, D(":")) : "default" == a ? w(D(":")) : "catch" == a ? w(B("form"), z, D("("), ab, D(")"), E, C, A) : v(B("stat"), F, D(";"), C)
    }

    function F(a) {
        return H(a, !1)
    }

    function G(a) {
        return H(a, !0)
    }

    function H(a, b) {
        var c = b ? L : K;
        return q.hasOwnProperty(a) ? w(c) : "function" == a ? w(_) : "keyword c" == a ? w(b ? J : I) : "(" == a ? w(B(")"), I, D(")"), C, c) : "operator" == a ? w(b ? G : F) : "[" == a ? w(B("]"), Q(G, "]"), C, c) : "{" == a ? w(B("}"), Q(O, "}"), C, c) : w()
    }

    function I(a) {
        return a.match(/[;\}\)\],]/) ? v() : v(F)
    }

    function J(a) {
        return a.match(/[;\}\)\],]/) ? v() : v(G)
    }

    function K(a, b) {
        return "," == a ? w(F) : L(a, b, !1)
    }

    function L(a, b, c) {
        var d = 0 == c ? K : L,
            e = 0 == c ? F : G;
        return "operator" == a ? /\+\+|--/.test(b) ? w(d) : "?" == b ? w(F, D(":"), e) : w(e) : ";" != a ? "(" == a ? w(B(")", "call"), Q(G, ")"), C, d) : "." == a ? w(N, d) : "[" == a ? w(B("]"), I, D("]"), C, d) : void 0 : void 0
    }

    function M(a) {
        return ":" == a ? w(C, E) : v(K, D(";"), C)
    }

    function N(a) {
        return "variable" == a ? (u.marked = "property", w()) : void 0
    }

    function O(a, b) {
        if ("variable" == a) {
            if (u.marked = "property", "get" == b || "set" == b) return w(P)
        } else("number" == a || "string" == a) && (u.marked = a + " property");
        return q.hasOwnProperty(a) ? w(D(":"), G) : void 0
    }

    function P(a) {
        return ":" == a ? w(F) : "variable" != a ? w(D(":"), F) : (u.marked = "property", w(_))
    }

    function Q(a, b) {
        function c(d) {
            if ("," == d) {
                var e = u.state.lexical;
                return "call" == e.info && (e.pos = (e.pos || 0) + 1), w(a, c)
            }
            return d == b ? w() : w(D(b))
        }
        return function(d) {
            return d == b ? w() : v(a, c)
        }
    }

    function R(a) {
        return "}" == a ? w() : v(E, R)
    }

    function S(a) {
        return ":" == a ? w(T) : v()
    }

    function T(a) {
        return "variable" == a ? (u.marked = "variable-3", w()) : v()
    }

    function U(a, b) {
        return "variable" == a ? (x(b), f ? w(S, V) : w(V)) : v()
    }

    function V(a, b) {
        return "=" == b ? w(G, V) : "," == a ? w(U) : void 0
    }

    function W(a, b) {
        return "keyword b" == a && "else" == b ? w(B("form"), E, C) : void 0
    }

    function X(a) {
        return "var" == a ? w(U, D(";"), Z) : ";" == a ? w(Z) : "variable" == a ? w(Y) : v(F, D(";"), Z)
    }

    function Y(a, b) {
        return "in" == b ? w(F) : w(K, Z)
    }

    function Z(a, b) {
        return ";" == a ? w($) : "in" == b ? w(F) : v(F, D(";"), $)
    }

    function $(a) {
        ")" != a && w(F)
    }

    function _(a, b) {
        return "variable" == a ? (x(b), w(_)) : "(" == a ? w(B(")"), z, Q(ab, ")"), C, E, A) : void 0
    }

    function ab(a, b) {
        return "variable" == a ? (x(b), f ? w(S) : w()) : void 0
    }
    var k, l, c = a.indentUnit,
        d = b.statementIndent,
        e = b.json,
        f = b.typescript,
        g = function() {
            function a(a) {
                return {
                    type: a,
                    style: "keyword"
                }
            }
            var b = a("keyword a"),
                c = a("keyword b"),
                d = a("keyword c"),
                e = a("operator"),
                g = {
                    type: "atom",
                    style: "atom"
                }, h = {
                    "if": a("if"),
                    "while": b,
                    "with": b,
                    "else": c,
                    "do": c,
                    "try": c,
                    "finally": c,
                    "return": d,
                    "break": d,
                    "continue": d,
                    "new": d,
                    "delete": d,
                    "throw": d,
                    "var": a("var"),
                    "const": a("var"),
                    let: a("var"),
                    "function": a("function"),
                    "catch": a("catch"),
                    "for": a("for"),
                    "switch": a("switch"),
                    "case": a("case"),
                    "default": a("default"),
                    "in": e,
                    "typeof": e,
                    "instanceof": e,
                    "true": g,
                    "false": g,
                    "null": g,
                    undefined: g,
                    NaN: g,
                    Infinity: g,
                    "this": a("this")
                };
            if (f) {
                var i = {
                    type: "variable",
                    style: "variable-3"
                }, j = {
                        "interface": a("interface"),
                        "class": a("class"),
                        "extends": a("extends"),
                        constructor: a("constructor"),
                        "public": a("public"),
                        "private": a("private"),
                        "protected": a("protected"),
                        "static": a("static"),
                        "super": a("super"),
                        string: i,
                        number: i,
                        bool: i,
                        any: i
                    };
                for (var k in j) h[k] = j[k]
            }
            return h
        }(),
        h = /[+\-*&%=<>!?|~^]/,
        q = {
            atom: !0,
            number: !0,
            variable: !0,
            string: !0,
            regexp: !0,
            "this": !0
        }, u = {
            state: null,
            column: null,
            marked: null,
            cc: null
        }, y = {
            name: "this",
            next: {
                name: "arguments"
            }
        };
    return C.lex = !0, {
        startState: function(a) {
            return {
                tokenize: n,
                lastType: null,
                cc: [],
                lexical: new r((a || 0) - c, 0, "block", !1),
                localVars: b.localVars,
                globalVars: b.globalVars,
                context: b.localVars && {
                    vars: b.localVars
                },
                indented: 0
            }
        },
        token: function(a, b) {
            if (a.sol() && (b.lexical.hasOwnProperty("align") || (b.lexical.align = !1), b.indented = a.indentation()), b.tokenize != p && a.eatSpace()) return null;
            var c = b.tokenize(a, b);
            return "comment" == k ? c : (b.lastType = "operator" != k || "++" != l && "--" != l ? k : "incdec", t(b, c, k, l, a))
        },
        indent: function(a, e) {
            if (a.tokenize == p) return CodeMirror.Pass;
            if (a.tokenize != n) return 0;
            for (var f = e && e.charAt(0), g = a.lexical, h = a.cc.length - 1; h >= 0; --h) {
                var i = a.cc[h];
                if (i == C) g = g.prev;
                else if (i != W || /^else\b/.test(e)) break
            }
            "stat" == g.type && "}" == f && (g = g.prev), d && ")" == g.type && "stat" == g.prev.type && (g = g.prev);
            var j = g.type,
                k = f == j;
            return "vardef" == j ? g.indented + ("operator" == a.lastType || "," == a.lastType ? 4 : 0) : "form" == j && "{" == f ? g.indented : "form" == j ? g.indented + c : "stat" == j ? g.indented + ("operator" == a.lastType || "," == a.lastType ? d || c : 0) : "switch" != g.info || k || 0 == b.doubleIndentSwitch ? g.align ? g.column + (k ? 0 : 1) : g.indented + (k ? 0 : c) : g.indented + (/^(?:case|default)\b/.test(e) ? c : 2 * c)
        },
        electricChars: ":{}",
        blockCommentStart: e ? null : "/*",
        blockCommentEnd: e ? null : "*/",
        lineComment: e ? null : "//",
        fold: "brace",
        helperType: e ? "json" : "javascript",
        jsonMode: e
    }
}), CodeMirror.defineMIME("text/javascript", "javascript"), CodeMirror.defineMIME("text/ecmascript", "javascript"), CodeMirror.defineMIME("application/javascript", "javascript"), CodeMirror.defineMIME("application/ecmascript", "javascript"), CodeMirror.defineMIME("application/json", {
    name: "javascript",
    json: !0
}), CodeMirror.defineMIME("application/x-json", {
    name: "javascript",
    json: !0
}), CodeMirror.defineMIME("text/typescript", {
    name: "javascript",
    typescript: !0
}), CodeMirror.defineMIME("application/typescript", {
    name: "javascript",
    typescript: !0
}),
function() {
    function a(a) {
        for (var b = {}, c = a.split(" "), d = 0; d < c.length; ++d) b[c[d]] = !0;
        return b
    }

    function b(a) {
        return function(b, c) {
            return b.match(a) ? c.tokenize = null : b.skipToEnd(), "string"
        }
    }
    var c = {
        name: "clike",
        keywords: a("abstract and array as break case catch class clone const continue declare default do else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach function global goto if implements interface instanceof namespace new or private protected public static switch throw trait try use var while xor die echo empty exit eval include include_once isset list require require_once return print unset __halt_compiler self static parent"),
        blockKeywords: a("catch do else elseif for foreach if switch try while"),
        atoms: a("true false null TRUE FALSE NULL __CLASS__ __DIR__ __FILE__ __LINE__ __METHOD__ __FUNCTION__ __NAMESPACE__"),
        builtin: a("func_num_args func_get_arg func_get_args strlen strcmp strncmp strcasecmp strncasecmp each error_reporting define defined trigger_error user_error set_error_handler restore_error_handler get_declared_classes get_loaded_extensions extension_loaded get_extension_funcs debug_backtrace constant bin2hex sleep usleep time mktime gmmktime strftime gmstrftime strtotime date gmdate getdate localtime checkdate flush wordwrap htmlspecialchars htmlentities html_entity_decode md5 md5_file crc32 getimagesize image_type_to_mime_type phpinfo phpversion phpcredits strnatcmp strnatcasecmp substr_count strspn strcspn strtok strtoupper strtolower strpos strrpos strrev hebrev hebrevc nl2br basename dirname pathinfo stripslashes stripcslashes strstr stristr strrchr str_shuffle str_word_count strcoll substr substr_replace quotemeta ucfirst ucwords strtr addslashes addcslashes rtrim str_replace str_repeat count_chars chunk_split trim ltrim strip_tags similar_text explode implode setlocale localeconv parse_str str_pad chop strchr sprintf printf vprintf vsprintf sscanf fscanf parse_url urlencode urldecode rawurlencode rawurldecode readlink linkinfo link unlink exec system escapeshellcmd escapeshellarg passthru shell_exec proc_open proc_close rand srand getrandmax mt_rand mt_srand mt_getrandmax base64_decode base64_encode abs ceil floor round is_finite is_nan is_infinite bindec hexdec octdec decbin decoct dechex base_convert number_format fmod ip2long long2ip getenv putenv getopt microtime gettimeofday getrusage uniqid quoted_printable_decode set_time_limit get_cfg_var magic_quotes_runtime set_magic_quotes_runtime get_magic_quotes_gpc get_magic_quotes_runtime import_request_variables error_log serialize unserialize memory_get_usage var_dump var_export debug_zval_dump print_r highlight_file show_source highlight_string ini_get ini_get_all ini_set ini_alter ini_restore get_include_path set_include_path restore_include_path setcookie header headers_sent connection_aborted connection_status ignore_user_abort parse_ini_file is_uploaded_file move_uploaded_file intval floatval doubleval strval gettype settype is_null is_resource is_bool is_long is_float is_int is_integer is_double is_real is_numeric is_string is_array is_object is_scalar ereg ereg_replace eregi eregi_replace split spliti join sql_regcase dl pclose popen readfile rewind rmdir umask fclose feof fgetc fgets fgetss fread fopen fpassthru ftruncate fstat fseek ftell fflush fwrite fputs mkdir rename copy tempnam tmpfile file file_get_contents stream_select stream_context_create stream_context_set_params stream_context_set_option stream_context_get_options stream_filter_prepend stream_filter_append fgetcsv flock get_meta_tags stream_set_write_buffer set_file_buffer set_socket_blocking stream_set_blocking socket_set_blocking stream_get_meta_data stream_register_wrapper stream_wrapper_register stream_set_timeout socket_set_timeout socket_get_status realpath fnmatch fsockopen pfsockopen pack unpack get_browser crypt opendir closedir chdir getcwd rewinddir readdir dir glob fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype file_exists is_writable is_writeable is_readable is_executable is_file is_dir is_link stat lstat chown touch clearstatcache mail ob_start ob_flush ob_clean ob_end_flush ob_end_clean ob_get_flush ob_get_clean ob_get_length ob_get_level ob_get_status ob_get_contents ob_implicit_flush ob_list_handlers ksort krsort natsort natcasesort asort arsort sort rsort usort uasort uksort shuffle array_walk count end prev next reset current key min max in_array array_search extract compact array_fill range array_multisort array_push array_pop array_shift array_unshift array_splice array_slice array_merge array_merge_recursive array_keys array_values array_count_values array_reverse array_reduce array_pad array_flip array_change_key_case array_rand array_unique array_intersect array_intersect_assoc array_diff array_diff_assoc array_sum array_filter array_map array_chunk array_key_exists pos sizeof key_exists assert assert_options version_compare ftok str_rot13 aggregate session_name session_module_name session_save_path session_id session_regenerate_id session_decode session_register session_unregister session_is_registered session_encode session_start session_destroy session_unset session_set_save_handler session_cache_limiter session_cache_expire session_set_cookie_params session_get_cookie_params session_write_close preg_match preg_match_all preg_replace preg_replace_callback preg_split preg_quote preg_grep overload ctype_alnum ctype_alpha ctype_cntrl ctype_digit ctype_lower ctype_graph ctype_print ctype_punct ctype_space ctype_upper ctype_xdigit virtual apache_request_headers apache_note apache_lookup_uri apache_child_terminate apache_setenv apache_response_headers apache_get_version getallheaders mysql_connect mysql_pconnect mysql_close mysql_select_db mysql_create_db mysql_drop_db mysql_query mysql_unbuffered_query mysql_db_query mysql_list_dbs mysql_list_tables mysql_list_fields mysql_list_processes mysql_error mysql_errno mysql_affected_rows mysql_insert_id mysql_result mysql_num_rows mysql_num_fields mysql_fetch_row mysql_fetch_array mysql_fetch_assoc mysql_fetch_object mysql_data_seek mysql_fetch_lengths mysql_fetch_field mysql_field_seek mysql_free_result mysql_field_name mysql_field_table mysql_field_len mysql_field_type mysql_field_flags mysql_escape_string mysql_real_escape_string mysql_stat mysql_thread_id mysql_client_encoding mysql_get_client_info mysql_get_host_info mysql_get_proto_info mysql_get_server_info mysql_info mysql mysql_fieldname mysql_fieldtable mysql_fieldlen mysql_fieldtype mysql_fieldflags mysql_selectdb mysql_createdb mysql_dropdb mysql_freeresult mysql_numfields mysql_numrows mysql_listdbs mysql_listtables mysql_listfields mysql_db_name mysql_dbname mysql_tablename mysql_table_name pg_connect pg_pconnect pg_close pg_connection_status pg_connection_busy pg_connection_reset pg_host pg_dbname pg_port pg_tty pg_options pg_ping pg_query pg_send_query pg_cancel_query pg_fetch_result pg_fetch_row pg_fetch_assoc pg_fetch_array pg_fetch_object pg_fetch_all pg_affected_rows pg_get_result pg_result_seek pg_result_status pg_free_result pg_last_oid pg_num_rows pg_num_fields pg_field_name pg_field_num pg_field_size pg_field_type pg_field_prtlen pg_field_is_null pg_get_notify pg_get_pid pg_result_error pg_last_error pg_last_notice pg_put_line pg_end_copy pg_copy_to pg_copy_from pg_trace pg_untrace pg_lo_create pg_lo_unlink pg_lo_open pg_lo_close pg_lo_read pg_lo_write pg_lo_read_all pg_lo_import pg_lo_export pg_lo_seek pg_lo_tell pg_escape_string pg_escape_bytea pg_unescape_bytea pg_client_encoding pg_set_client_encoding pg_meta_data pg_convert pg_insert pg_update pg_delete pg_select pg_exec pg_getlastoid pg_cmdtuples pg_errormessage pg_numrows pg_numfields pg_fieldname pg_fieldsize pg_fieldtype pg_fieldnum pg_fieldprtlen pg_fieldisnull pg_freeresult pg_result pg_loreadall pg_locreate pg_lounlink pg_loopen pg_loclose pg_loread pg_lowrite pg_loimport pg_loexport echo print global static exit array empty eval isset unset die include require include_once require_once"),
        multiLineStrings: !0,
        hooks: {
            $: function(a) {
                return a.eatWhile(/[\w\$_]/), "variable-2"
            },
            "<": function(a, c) {
                return a.match(/<</) ? (a.eatWhile(/[\w\.]/), c.tokenize = b(a.current().slice(3)), c.tokenize(a, c)) : !1
            },
            "#": function(a) {
                for (; !a.eol() && !a.match("?>", !1);) a.next();
                return "comment"
            },
            "/": function(a) {
                if (a.eat("/")) {
                    for (; !a.eol() && !a.match("?>", !1);) a.next();
                    return "comment"
                }
                return !1
            }
        }
    };
    CodeMirror.defineMode("php", function(a, b) {
        function f(a, b) {
            var c = b.curMode == e;
            if (a.sol() && '"' != b.pending && (b.pending = null), c) return c && null == b.php.tokenize && a.match("?>") ? (b.curMode = d, b.curState = b.html, "meta") : e.token(a, b.curState);
            if (a.match(/^<\?\w*/)) return b.curMode = e, b.curState = b.php, "meta";
            if ('"' == b.pending) {
                for (; !a.eol() && '"' != a.next(););
                var f = "string"
            } else if (b.pending && a.pos < b.pending.end) {
                a.pos = b.pending.end;
                var f = b.pending.style
            } else var f = d.token(a, b.curState);
            b.pending = null;
            var g = a.current(),
                h = g.search(/<\?/);
            return -1 != h && (b.pending = "string" == f && /\"$/.test(g) && !/\?>/.test(g) ? '"' : {
                end: a.pos,
                style: f
            }, a.backUp(g.length - h)), f
        }
        var d = CodeMirror.getMode(a, "text/html"),
            e = CodeMirror.getMode(a, c);
        return {
            startState: function() {
                var a = CodeMirror.startState(d),
                    c = CodeMirror.startState(e);
                return {
                    html: a,
                    php: c,
                    curMode: b.startOpen ? e : d,
                    curState: b.startOpen ? c : a,
                    pending: null
                }
            },
            copyState: function(a) {
                var h, b = a.html,
                    c = CodeMirror.copyState(d, b),
                    f = a.php,
                    g = CodeMirror.copyState(e, f);
                return h = a.curMode == d ? c : g, {
                    html: c,
                    php: g,
                    curMode: a.curMode,
                    curState: h,
                    pending: a.pending
                }
            },
            token: f,
            indent: function(a, b) {
                return a.curMode != e && /^\s*<\//.test(b) || a.curMode == e && /^\?>/.test(b) ? d.indent(a.html, b) : a.curMode.indent(a.curState, b)
            },
            electricChars: "/{}:",
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            lineComment: "//",
            innerMode: function(a) {
                return {
                    state: a.curState,
                    mode: a.curMode
                }
            }
        }
    }, "htmlmixed", "clike"), CodeMirror.defineMIME("application/x-httpd-php", "php"), CodeMirror.defineMIME("application/x-httpd-php-open", {
        name: "php",
        startOpen: !0
    }), CodeMirror.defineMIME("text/x-php", c)
}(), CodeMirror.defineMode("xml", function(a, b) {
    function j(a, b) {
        function c(c) {
            return b.tokenize = c, c(a, b)
        }
        var d = a.next();
        if ("<" == d) {
            if (a.eat("!")) return a.eat("[") ? a.match("CDATA[") ? c(m("atom", "]]>")) : null : a.match("--") ? c(m("comment", "-->")) : a.match("DOCTYPE", !0, !0) ? (a.eatWhile(/[\w\._\-]/), c(n(1))) : null;
            if (a.eat("?")) return a.eatWhile(/[\w\._\-]/), b.tokenize = m("meta", "?>"), "meta";
            var e = a.eat("/");
            h = "";
            for (var f; f = a.eat(/[^\s\u00a0=<>\"\'\/?]/);) h += f;
            return h ? (i = e ? "closeTag" : "openTag", b.tokenize = k, "tag") : "error"
        }
        if ("&" == d) {
            var g;
            return g = a.eat("#") ? a.eat("x") ? a.eatWhile(/[a-fA-F\d]/) && a.eat(";") : a.eatWhile(/[\d]/) && a.eat(";") : a.eatWhile(/[\w\.\-:]/) && a.eat(";"), g ? "atom" : "error"
        }
        return a.eatWhile(/[^&<]/), null
    }

    function k(a, b) {
        var c = a.next();
        return ">" == c || "/" == c && a.eat(">") ? (b.tokenize = j, i = ">" == c ? "endTag" : "selfcloseTag", "tag") : "=" == c ? (i = "equals", null) : "<" == c ? "error" : /[\'\"]/.test(c) ? (b.tokenize = l(c), b.stringStartCol = a.column(), b.tokenize(a, b)) : (a.eatWhile(/[^\s\u00a0=<>\"\']/), "word")
    }

    function l(a) {
        var b = function(b, c) {
            for (; !b.eol();)
                if (b.next() == a) {
                    c.tokenize = k;
                    break
                }
            return "string"
        };
        return b.isInAttribute = !0, b
    }

    function m(a, b) {
        return function(c, d) {
            for (; !c.eol();) {
                if (c.match(b)) {
                    d.tokenize = j;
                    break
                }
                c.next()
            }
            return a
        }
    }

    function n(a) {
        return function(b, c) {
            for (var d; null != (d = b.next());) {
                if ("<" == d) return c.tokenize = n(a + 1), c.tokenize(b, c);
                if (">" == d) {
                    if (1 == a) {
                        c.tokenize = j;
                        break
                    }
                    return c.tokenize = n(a - 1), c.tokenize(b, c)
                }
            }
            return "meta"
        }
    }

    function r() {
        for (var a = arguments.length - 1; a >= 0; a--) o.cc.push(arguments[a])
    }

    function s() {
        return r.apply(null, arguments), !0
    }

    function t(a, b) {
        var c = f.doNotIndent.hasOwnProperty(a) || o.context && o.context.noIndent;
        o.context = {
            prev: o.context,
            tagName: a,
            indent: o.indented,
            startOfLine: b,
            noIndent: c
        }
    }

    function u() {
        o.context && (o.context = o.context.prev)
    }

    function v(a) {
        if ("openTag" == a) return o.tagName = h, o.tagStart = p.column(), s(z, w(o.startOfLine));
        if ("closeTag" == a) {
            var b = !1;
            return o.context ? o.context.tagName != h && (f.implicitlyClosed.hasOwnProperty(o.context.tagName.toLowerCase()) && u(), b = !o.context || o.context.tagName != h) : b = !0, b && (q = "error"), s(x(b))
        }
        return s()
    }

    function w(a) {
        return function(b) {
            var c = o.tagName;
            return o.tagName = o.tagStart = null, "selfcloseTag" == b || "endTag" == b && f.autoSelfClosers.hasOwnProperty(c.toLowerCase()) ? (y(c.toLowerCase()), s()) : "endTag" == b ? (y(c.toLowerCase()), t(c, a), s()) : s()
        }
    }

    function x(a) {
        return function(b) {
            return a && (q = "error"), "endTag" == b ? (u(), s()) : (q = "error", s(arguments.callee))
        }
    }

    function y(a) {
        for (var b;;) {
            if (!o.context) return;
            if (b = o.context.tagName.toLowerCase(), !f.contextGrabbers.hasOwnProperty(b) || !f.contextGrabbers[b].hasOwnProperty(a)) return;
            u()
        }
    }

    function z(a) {
        return "word" == a ? (q = "attribute", s(A, z)) : "endTag" == a || "selfcloseTag" == a ? r() : (q = "error", s(z))
    }

    function A(a) {
        return "equals" == a ? s(B, z) : (f.allowMissing ? "word" == a && (q = "attribute") : q = "error", "endTag" == a || "selfcloseTag" == a ? r() : s())
    }

    function B(a) {
        return "string" == a ? s(C) : "word" == a && f.allowUnquoted ? (q = "string", s()) : (q = "error", "endTag" == a || "selfCloseTag" == a ? r() : s())
    }

    function C(a) {
        return "string" == a ? s(C) : r()
    }
    var h, i, o, p, q, c = a.indentUnit,
        d = b.multilineTagIndentFactor || 1,
        e = b.multilineTagIndentPastTag || !0,
        f = b.htmlMode ? {
            autoSelfClosers: {
                area: !0,
                base: !0,
                br: !0,
                col: !0,
                command: !0,
                embed: !0,
                frame: !0,
                hr: !0,
                img: !0,
                input: !0,
                keygen: !0,
                link: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0
            },
            implicitlyClosed: {
                dd: !0,
                li: !0,
                optgroup: !0,
                option: !0,
                p: !0,
                rp: !0,
                rt: !0,
                tbody: !0,
                td: !0,
                tfoot: !0,
                th: !0,
                tr: !0
            },
            contextGrabbers: {
                dd: {
                    dd: !0,
                    dt: !0
                },
                dt: {
                    dd: !0,
                    dt: !0
                },
                li: {
                    li: !0
                },
                option: {
                    option: !0,
                    optgroup: !0
                },
                optgroup: {
                    optgroup: !0
                },
                p: {
                    address: !0,
                    article: !0,
                    aside: !0,
                    blockquote: !0,
                    dir: !0,
                    div: !0,
                    dl: !0,
                    fieldset: !0,
                    footer: !0,
                    form: !0,
                    h1: !0,
                    h2: !0,
                    h3: !0,
                    h4: !0,
                    h5: !0,
                    h6: !0,
                    header: !0,
                    hgroup: !0,
                    hr: !0,
                    menu: !0,
                    nav: !0,
                    ol: !0,
                    p: !0,
                    pre: !0,
                    section: !0,
                    table: !0,
                    ul: !0
                },
                rp: {
                    rp: !0,
                    rt: !0
                },
                rt: {
                    rp: !0,
                    rt: !0
                },
                tbody: {
                    tbody: !0,
                    tfoot: !0
                },
                td: {
                    td: !0,
                    th: !0
                },
                tfoot: {
                    tbody: !0
                },
                th: {
                    td: !0,
                    th: !0
                },
                thead: {
                    tbody: !0,
                    tfoot: !0
                },
                tr: {
                    tr: !0
                }
            },
            doNotIndent: {
                pre: !0
            },
            allowUnquoted: !0,
            allowMissing: !0
        } : {
            autoSelfClosers: {},
            implicitlyClosed: {},
            contextGrabbers: {},
            doNotIndent: {},
            allowUnquoted: !1,
            allowMissing: !1
        }, g = b.alignCDATA;
    return {
        startState: function() {
            return {
                tokenize: j,
                cc: [],
                indented: 0,
                startOfLine: !0,
                tagName: null,
                tagStart: null,
                context: null
            }
        },
        token: function(a, b) {
            if (!b.tagName && a.sol() && (b.startOfLine = !0, b.indented = a.indentation()), a.eatSpace()) return null;
            q = i = h = null;
            var c = b.tokenize(a, b);
            if (b.type = i, (c || i) && "comment" != c)
                for (o = b, p = a;;) {
                    var d = b.cc.pop() || v;
                    if (d(i || c)) break
                }
            return b.startOfLine = !1, q || c
        },
        indent: function(a, b, f) {
            var h = a.context;
            if (a.tokenize.isInAttribute) return a.stringStartCol + 1;
            if (a.tokenize != k && a.tokenize != j || h && h.noIndent) return f ? f.match(/^(\s*)/)[0].length : 0;
            if (a.tagName) return e ? a.tagStart + a.tagName.length + 2 : a.tagStart + c * d;
            if (g && /<!\[CDATA\[/.test(b)) return 0;
            for (h && /^<\//.test(b) && (h = h.prev); h && !h.startOfLine;) h = h.prev;
            return h ? h.indent + c : 0
        },
        electricChars: "/",
        blockCommentStart: "<!--",
        blockCommentEnd: "-->",
        configuration: b.htmlMode ? "html" : "xml",
        helperType: b.htmlMode ? "html" : "xml"
    }
}), CodeMirror.defineMIME("text/xml", "xml"), CodeMirror.defineMIME("application/xml", "xml"), CodeMirror.mimeModes.hasOwnProperty("text/html") || CodeMirror.defineMIME("text/html", {
    name: "xml",
    htmlMode: !0
}),
function() {
    function a(a, b, c) {
        var e, d = a.getWrapperElement();
        return e = d.appendChild(document.createElement("div")), e.className = c ? "CodeMirror-dialog CodeMirror-dialog-bottom" : "CodeMirror-dialog CodeMirror-dialog-top", e.innerHTML = b, e
    }
    CodeMirror.defineExtension("openDialog", function(b, c, d) {
        function h() {
            f || (f = !0, e.parentNode.removeChild(e))
        }
        var j, e = a(this, b, d && d.bottom),
            f = !1,
            g = this,
            i = e.getElementsByTagName("input")[0];
        return i ? (CodeMirror.on(i, "keydown", function(a) {
            d && d.onKeyDown && d.onKeyDown(a, i.value, h) || (13 == a.keyCode || 27 == a.keyCode) && (CodeMirror.e_stop(a), h(), g.focus(), 13 == a.keyCode && c(i.value))
        }), d && d.onKeyUp && CodeMirror.on(i, "keyup", function(a) {
            d.onKeyUp(a, i.value, h)
        }), d && d.value && (i.value = d.value), i.focus(), CodeMirror.on(i, "blur", h)) : (j = e.getElementsByTagName("button")[0]) && (CodeMirror.on(j, "click", function() {
            h(), g.focus()
        }), j.focus(), CodeMirror.on(j, "blur", h)), h
    }), CodeMirror.defineExtension("openConfirm", function(b, c, d) {
        function j() {
            g || (g = !0, e.parentNode.removeChild(e), h.focus())
        }
        var e = a(this, b, d && d.bottom),
            f = e.getElementsByTagName("button"),
            g = !1,
            h = this,
            i = 1;
        f[0].focus();
        for (var k = 0; k < f.length; ++k) {
            var l = f[k];
            ! function(a) {
                CodeMirror.on(l, "click", function(b) {
                    CodeMirror.e_preventDefault(b), j(), a && a(h)
                })
            }(c[k]), CodeMirror.on(l, "blur", function() {
                --i, setTimeout(function() {
                    0 >= i && j()
                }, 200)
            }), CodeMirror.on(l, "focus", function() {
                ++i
            })
        }
    })
}(),
function() {
    function b(a, b) {
        for (var c = 0, d = a.length; d > c; ++c) b(a[c])
    }

    function c(a, b) {
        if (!Array.prototype.indexOf) {
            for (var c = a.length; c--;)
                if (a[c] === b) return !0;
            return !1
        }
        return -1 != a.indexOf(b)
    }

    function d(b, c, d, e) {
        var f = b.getCursor(),
            g = d(b, f),
            h = g;
        for (g.state = CodeMirror.innerMode(b.getMode(), g.state).state, /^[\w$_]*$/.test(g.string) || (g = h = {
                start: f.ch,
                end: f.ch,
                string: "",
                state: g.state,
                type: "." == g.string ? "property" : null
            });
            "property" == h.type;) {
            if (h = d(b, a(f.line, h.start)), "." != h.string) return;
            if (h = d(b, a(f.line, h.start)), ")" == h.string) {
                var i = 1;
                do switch (h = d(b, a(f.line, h.start)), h.string) {
                    case ")":
                        i++;
                        break;
                    case "(":
                        i--
                }
                while (i > 0);
                if (h = d(b, a(f.line, h.start)), 0 !== h.type.indexOf("variable")) return;
                h.type = "function"
            }
            if (!j) var j = [];
            j.push(h)
        }
        return {
            list: m(g, j, c, e),
            from: a(f.line, g.start),
            to: a(f.line, g.end)
        }
    }

    function e(a, b) {
        return d(a, k, function(a, b) {
            return a.getTokenAt(b)
        }, b)
    }

    function f(a, b) {
        var c = a.getTokenAt(b);
        return b.ch == c.start + 1 && "." == c.string.charAt(0) ? (c.end = c.start, c.string = ".", c.type = "property") : /^\.[\w$_]*$/.test(c.string) && (c.type = "property", c.start++, c.string = c.string.replace(/\./, "")), c
    }

    function g(a, b) {
        return d(a, l, f, b)
    }

    function m(a, d, e, f) {
        function l(a) {
            0 != a.indexOf(k) || c(g, a) || g.push(a)
        }

        function m(a) {
            "string" == typeof a ? b(h, l) : a instanceof Array ? b(i, l) : a instanceof Function && b(j, l);
            for (var c in a) l(c)
        }
        var g = [],
            k = a.string;
        if (d) {
            var o, n = d.pop();
            for (0 === n.type.indexOf("variable") ? (f && f.additionalContext && (o = f.additionalContext[n.string]), o = o || window[n.string]) : "string" == n.type ? o = "" : "atom" == n.type ? o = 1 : "function" == n.type && (null == window.jQuery || "$" != n.string && "jQuery" != n.string || "function" != typeof window.jQuery ? null != window._ && "_" == n.string && "function" == typeof window._ && (o = window._()) : o = window.jQuery()); null != o && d.length;) o = o[d.pop().string];
            null != o && m(o)
        } else {
            for (var p = a.state.localVars; p; p = p.next) l(p.name);
            for (var p = a.state.globalVars; p; p = p.next) l(p.name);
            m(window), b(e, l)
        }
        return g
    }
    var a = CodeMirror.Pos;
    CodeMirror.javascriptHint = e, CodeMirror.registerHelper("hint", "javascript", e), CodeMirror.coffeescriptHint = g, CodeMirror.registerHelper("hint", "coffeescript", g);
    var h = "charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search".split(" "),
        i = "length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight ".split(" "),
        j = "prototype apply call bind".split(" "),
        k = "break case catch continue debugger default delete do else false finally for function if in instanceof new null return switch throw true try typeof var void while with".split(" "),
        l = "and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes".split(" ")
}(), CodeMirror.multiplexingMode = function(a) {
    function d(a, b, c) {
        if ("string" == typeof b) return a.indexOf(b, c);
        var d = b.exec(c ? a.slice(c) : a);
        return d ? d.index + c : -1
    }
    var b = Array.prototype.slice.call(arguments, 1),
        c = b.length;
    return {
        startState: function() {
            return {
                outer: CodeMirror.startState(a),
                innerActive: null,
                inner: null
            }
        },
        copyState: function(b) {
            return {
                outer: CodeMirror.copyState(a, b.outer),
                innerActive: b.innerActive,
                inner: b.innerActive && CodeMirror.copyState(b.innerActive.mode, b.inner)
            }
        },
        token: function(e, f) {
            if (f.innerActive) {
                var m = f.innerActive,
                    h = e.string,
                    k = d(h, m.close, e.pos);
                if (k == e.pos) return e.match(m.close), f.innerActive = f.inner = null, m.delimStyle;
                k > -1 && (e.string = h.slice(0, k));
                var n = m.mode.token(e, f.inner);
                k > -1 && (e.string = h);
                var o = e.current(),
                    k = o.indexOf(m.close);
                return k > -1 && e.backUp(o.length - k), m.innerStyle && (n = n ? n + " " + m.innerStyle : m.innerStyle), n
            }
            for (var g = 1 / 0, h = e.string, i = 0; c > i; ++i) {
                var j = b[i],
                    k = d(h, j.open, e.pos);
                if (k == e.pos) return e.match(j.open), f.innerActive = j, f.inner = CodeMirror.startState(j.mode, a.indent ? a.indent(f.outer, "") : 0), j.delimStyle; - 1 != k && g > k && (g = k)
            }
            1 / 0 != g && (e.string = h.slice(0, g));
            var l = a.token(e, f.outer);
            return 1 / 0 != g && (e.string = h), l
        },
        indent: function(b, c) {
            var d = b.innerActive ? b.innerActive.mode : a;
            return d.indent ? d.indent(b.innerActive ? b.inner : b.outer, c) : CodeMirror.Pass
        },
        blankLine: function(d) {
            var e = d.innerActive ? d.innerActive.mode : a;
            if (e.blankLine && e.blankLine(d.innerActive ? d.inner : d.outer), d.innerActive) "\n" === d.innerActive.close && (d.innerActive = d.inner = null);
            else
                for (var f = 0; c > f; ++f) {
                    var g = b[f];
                    "\n" === g.open && (d.innerActive = g, d.inner = CodeMirror.startState(g.mode, e.indent ? e.indent(d.outer, "") : 0))
                }
        },
        electricChars: a.electricChars,
        innerMode: function(b) {
            return b.inner ? {
                state: b.inner,
                mode: b.innerActive.mode
            } : {
                state: b.outer,
                mode: a
            }
        }
    }
}, CodeMirror.overlayMode = CodeMirror.overlayParser = function(a, b, c) {
    return {
        startState: function() {
            return {
                base: CodeMirror.startState(a),
                overlay: CodeMirror.startState(b),
                basePos: 0,
                baseCur: null,
                overlayPos: 0,
                overlayCur: null
            }
        },
        copyState: function(c) {
            return {
                base: CodeMirror.copyState(a, c.base),
                overlay: CodeMirror.copyState(b, c.overlay),
                basePos: c.basePos,
                baseCur: null,
                overlayPos: c.overlayPos,
                overlayCur: null
            }
        },
        token: function(d, e) {
            return d.start == e.basePos && (e.baseCur = a.token(d, e.base), e.basePos = d.pos), d.start == e.overlayPos && (d.pos = d.start, e.overlayCur = b.token(d, e.overlay), e.overlayPos = d.pos), d.pos = Math.min(e.basePos, e.overlayPos), d.eol() && (e.basePos = e.overlayPos = 0), null == e.overlayCur ? e.baseCur : null != e.baseCur && c ? e.baseCur + " " + e.overlayCur : e.overlayCur
        },
        indent: a.indent && function(b, c) {
            return a.indent(b.base, c)
        },
        electricChars: a.electricChars,
        innerMode: function(b) {
            return {
                state: b.base,
                mode: a
            }
        },
        blankLine: function(c) {
            a.blankLine && a.blankLine(c.base), b.blankLine && b.blankLine(c.overlay)
        }
    }
},
function() {
    function a(a) {
        return "string" == typeof a ? {
            token: function(b) {
                return b.match(a) ? "searching" : (b.next(), b.skipTo(a.charAt(0)) || b.skipToEnd(), void 0)
            }
        } : {
            token: function(b) {
                if (b.match(a)) return "searching";
                for (; !b.eol() && (b.next(), !b.match(a, !1)););
            }
        }
    }

    function b() {
        this.posFrom = this.posTo = this.query = null, this.overlay = null
    }

    function c(a) {
        return a.state.search || (a.state.search = new b)
    }

    function d(a, b, c) {
        return a.getSearchCursor(b, c, "string" == typeof b && b == b.toLowerCase())
    }

    function e(a, b, c, d) {
        a.openDialog ? a.openDialog(b, d) : d(prompt(c, ""))
    }

    function f(a, b, c, d) {
        a.openConfirm ? a.openConfirm(b, d) : confirm(c) && d[0]()
    }

    function g(a) {
        var b = a.match(/^\/(.*)\/([a-z]*)$/);
        return b ? new RegExp(b[1], -1 == b[2].indexOf("i") ? "" : "i") : a
    }

    function i(b, d) {
        var f = c(b);
        return f.query ? j(b, d) : (e(b, h, "Search for:", function(c) {
            b.operation(function() {
                c && !f.query && (f.query = g(c), b.removeOverlay(f.overlay), f.overlay = a(f.query), b.addOverlay(f.overlay), f.posFrom = f.posTo = b.getCursor(), j(b, d))
            })
        }), void 0)
    }

    function j(a, b) {
        a.operation(function() {
            var e = c(a),
                f = d(a, e.query, b ? e.posFrom : e.posTo);
            (f.find(b) || (f = d(a, e.query, b ? CodeMirror.Pos(a.lastLine()) : CodeMirror.Pos(a.firstLine(), 0)), f.find(b))) && (a.setSelection(f.from(), f.to()), e.posFrom = f.from(), e.posTo = f.to())
        })
    }

    function k(a) {
        a.operation(function() {
            var b = c(a);
            b.query && (b.query = null, a.removeOverlay(b.overlay))
        })
    }

    function o(a, b) {
        e(a, l, "Replace:", function(c) {
            c && (c = g(c), e(a, m, "Replace with:", function(e) {
                if (b) a.operation(function() {
                    for (var b = d(a, c); b.findNext();)
                        if ("string" != typeof c) {
                            var f = a.getRange(b.from(), b.to()).match(c);
                            b.replace(e.replace(/\$(\d)/, function(a, b) {
                                return f[b]
                            }))
                        } else b.replace(e)
                });
                else {
                    k(a);
                    var g = d(a, c, a.getCursor()),
                        h = function() {
                            var e, b = g.from();
                            !(e = g.findNext()) && (g = d(a, c), !(e = g.findNext()) || b && g.from().line == b.line && g.from().ch == b.ch) || (a.setSelection(g.from(), g.to()), f(a, n, "Replace?", [

                                function() {
                                    i(e)
                                },
                                h
                            ]))
                        }, i = function(a) {
                            g.replace("string" == typeof c ? e : e.replace(/\$(\d)/, function(b, c) {
                                return a[c]
                            })), h()
                        };
                    h()
                }
            }))
        })
    }
    var h = 'Search: <input type="text" style="width: 10em"/> <span style="color: #888">(Use /re/ syntax for regexp search)</span>',
        l = 'Replace: <input type="text" style="width: 10em"/> <span style="color: #888">(Use /re/ syntax for regexp search)</span>',
        m = 'With: <input type="text" style="width: 10em"/>',
        n = "Replace? <button>Yes</button> <button>No</button> <button>Stop</button>";
    CodeMirror.commands.find = function(a) {
        k(a), i(a)
    }, CodeMirror.commands.findNext = i, CodeMirror.commands.findPrev = function(a) {
        i(a, !0)
    }, CodeMirror.commands.clearSearch = k, CodeMirror.commands.replace = o, CodeMirror.commands.replaceAll = function(a) {
        o(a, !0)
    }
}(),
function() {
    function b(b, c, d, e) {
        if (this.atOccurrence = !1, this.doc = b, null == e && "string" == typeof c && (e = !1), d = d ? b.clipPos(d) : a(0, 0), this.pos = {
            from: d,
            to: d
        }, "string" != typeof c) c.global || (c = new RegExp(c.source, c.ignoreCase ? "ig" : "g")), this.matches = function(d, e) {
            if (d) {
                c.lastIndex = 0;
                for (var h, i, f = b.getLine(e.line).slice(0, e.ch), g = 0;;) {
                    c.lastIndex = g;
                    var j = c.exec(f);
                    if (!j) break;
                    if (h = j, i = h.index, g = h.index + (h[0].length || 1), g == f.length) break
                }
                var k = h && h[0].length || 0;
                k || (0 == i && 0 == f.length ? h = void 0 : i != b.getLine(e.line).length && k++)
            } else {
                c.lastIndex = e.ch;
                var f = b.getLine(e.line),
                    h = c.exec(f),
                    k = h && h[0].length || 0,
                    i = h && h.index;
                i + k == f.length || k || (k = 1)
            }
            return h && k ? {
                from: a(e.line, i),
                to: a(e.line, i + k),
                match: h
            } : void 0
        };
        else {
            e && (c = c.toLowerCase());
            var f = e ? function(a) {
                    return a.toLowerCase()
                } : function(a) {
                    return a
                }, g = c.split("\n");
            this.matches = 1 == g.length ? c.length ? function(d, e) {
                var i, g = f(b.getLine(e.line)),
                    h = c.length;
                return (d ? e.ch >= h && -1 != (i = g.lastIndexOf(c, e.ch - h)) : -1 != (i = g.indexOf(c, e.ch))) ? {
                    from: a(e.line, i),
                    to: a(e.line, i + h)
                } : void 0
            } : function() {} : function(c, d) {
                var e = d.line,
                    h = c ? g.length - 1 : 0,
                    i = g[h],
                    j = f(b.getLine(e)),
                    k = c ? j.indexOf(i) + i.length : j.lastIndexOf(i);
                if (!(c ? k >= d.ch || k != i.length : k <= d.ch || k != j.length - i.length))
                    for (;;) {
                        if (c ? !e : e == b.lineCount() - 1) return;
                        if (j = f(b.getLine(e += c ? -1 : 1)), i = g[c ? --h : ++h], !(h > 0 && h < g.length - 1)) {
                            var l = c ? j.lastIndexOf(i) : j.indexOf(i) + i.length;
                            if (c ? l != j.length - i.length : l != i.length) return;
                            var m = a(d.line, k),
                                n = a(e, l);
                            return {
                                from: c ? n : m,
                                to: c ? m : n
                            }
                        }
                        if (j != i) return
                    }
            }
        }
    }
    var a = CodeMirror.Pos;
    b.prototype = {
        findNext: function() {
            return this.find(!1)
        },
        findPrevious: function() {
            return this.find(!0)
        },
        find: function(b) {
            function e(b) {
                var d = a(b, 0);
                return c.pos = {
                    from: d,
                    to: d
                }, c.atOccurrence = !1, !1
            }
            for (var c = this, d = this.doc.clipPos(b ? this.pos.from : this.pos.to);;) {
                if (this.pos = this.matches(b, d)) return this.pos.from && this.pos.to || console.log(this.matches, this.pos), this.atOccurrence = !0, this.pos.match || !0;
                if (b) {
                    if (!d.line) return e(0);
                    d = a(d.line - 1, this.doc.getLine(d.line - 1).length)
                } else {
                    var f = this.doc.lineCount();
                    if (d.line == f - 1) return e(f);
                    d = a(d.line + 1, 0)
                }
            }
        },
        from: function() {
            return this.atOccurrence ? this.pos.from : void 0
        },
        to: function() {
            return this.atOccurrence ? this.pos.to : void 0
        },
        replace: function(b) {
            if (this.atOccurrence) {
                var c = CodeMirror.splitLines(b);
                this.doc.replaceRange(c, this.pos.from, this.pos.to), this.pos.to = a(this.pos.from.line + c.length - 1, c[c.length - 1].length + (1 == c.length ? this.pos.from.ch : 0))
            }
        }
    }, CodeMirror.defineExtension("getSearchCursor", function(a, c, d) {
        return new b(this.doc, a, c, d)
    }), CodeMirror.defineDocExtension("getSearchCursor", function(a, c, d) {
        return new b(this, a, c, d)
    })
}(),
function() {
    "use strict";

    function a(a, b, c) {
        this.cm = a, this.getHints = b, this.options = c, this.widget = this.onClose = null
    }

    function b(a) {
        return "string" == typeof a ? a : a.text
    }

    function c(a, b) {
        function e(a, e) {
            var f;
            f = "string" != typeof e ? function(a) {
                return e(a, b)
            } : c.hasOwnProperty(e) ? c[e] : e, d[a] = f
        }
        var c = {
            Up: function() {
                b.moveFocus(-1)
            },
            Down: function() {
                b.moveFocus(1)
            },
            PageUp: function() {
                b.moveFocus(-b.menuSize())
            },
            PageDown: function() {
                b.moveFocus(b.menuSize())
            },
            Home: function() {
                b.setFocus(0)
            },
            End: function() {
                b.setFocus(b.length)
            },
            Enter: b.pick,
            Tab: b.pick,
            Esc: b.close
        }, d = a.customKeys ? {} : c;
        if (a.customKeys)
            for (var f in a.customKeys) a.customKeys.hasOwnProperty(f) && e(f, a.customKeys[f]);
        if (a.extraKeys)
            for (var f in a.extraKeys) a.extraKeys.hasOwnProperty(f) && e(f, a.extraKeys[f]);
        return d
    }

    function d(a, d) {
        this.completion = a, this.data = d;
        var e = this,
            f = a.cm,
            g = a.options,
            h = this.hints = document.createElement("ul");
        h.className = "CodeMirror-hints", this.selectedHint = 0;
        for (var i = d.list, j = 0; j < i.length; ++j) {
            var k = h.appendChild(document.createElement("li")),
                l = i[j],
                m = "CodeMirror-hint" + (j ? "" : " CodeMirror-hint-active");
            null != l.className && (m = l.className + " " + m), k.className = m, l.render ? l.render(k, d, l) : k.appendChild(document.createTextNode(l.displayText || b(l))), k.hintId = j
        }
        var n = f.cursorCoords(g.alignWithWord !== !1 ? d.from : null),
            o = n.left,
            p = n.bottom,
            q = !0;
        h.style.left = o + "px", h.style.top = p + "px";
        var r = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth),
            s = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
            t = h.getBoundingClientRect(),
            u = t.right - r,
            v = t.bottom - s;
        if (u > 0 && (t.right - t.left > r && (h.style.width = r - 5 + "px", u -= t.right - t.left - r), h.style.left = (o = n.left - u) + "px"), v > 0) {
            var w = t.bottom - t.top;
            t.top - (n.bottom - n.top) - w > 0 ? (v = w + (n.bottom - n.top), q = !1) : w > s && (h.style.height = s - 5 + "px", v -= w - s), h.style.top = (p = n.bottom - v) + "px"
        }
        if ((g.container || document.body).appendChild(h), f.addKeyMap(this.keyMap = c(g, {
            moveFocus: function(a) {
                e.changeActive(e.selectedHint + a)
            },
            setFocus: function(a) {
                e.changeActive(a)
            },
            menuSize: function() {
                return e.screenAmount()
            },
            length: i.length,
            close: function() {
                a.close()
            },
            pick: function() {
                e.pick()
            }
        })), g.closeOnUnfocus !== !1) {
            var x;
            f.on("blur", this.onBlur = function() {
                x = setTimeout(function() {
                    a.close()
                }, 100)
            }), f.on("focus", this.onFocus = function() {
                clearTimeout(x)
            })
        }
        var y = f.getScrollInfo();
        return f.on("scroll", this.onScroll = function() {
            var b = f.getScrollInfo(),
                c = f.getWrapperElement().getBoundingClientRect(),
                d = p + y.top - b.top,
                e = d - (window.pageYOffset || (document.documentElement || document.body).scrollTop);
            return q || (e += h.offsetHeight), e <= c.top || e >= c.bottom ? a.close() : (h.style.top = d + "px", h.style.left = o + y.left - b.left + "px", void 0)
        }), CodeMirror.on(h, "dblclick", function(a) {
            var b = a.target || a.srcElement;
            null != b.hintId && (e.changeActive(b.hintId), e.pick())
        }), CodeMirror.on(h, "click", function(a) {
            var b = a.target || a.srcElement;
            null != b.hintId && e.changeActive(b.hintId)
        }), CodeMirror.on(h, "mousedown", function() {
            setTimeout(function() {
                f.focus()
            }, 20)
        }), CodeMirror.signal(d, "select", i[0], h.firstChild), !0
    }
    CodeMirror.showHint = function(b, c, d) {
        if (!b.somethingSelected() && (null == c && (c = b.getHelper(b.getCursor(), "hint")), null != c)) {
            b.state.completionActive && b.state.completionActive.close();
            var e = b.state.completionActive = new a(b, c, d || {});
            return CodeMirror.signal(b, "startCompletion", b), e.options.async ? (c(b, function(a) {
                e.showHints(a)
            }, e.options), void 0) : e.showHints(c(b, e.options))
        }
    }, a.prototype = {
        close: function() {
            this.active() && (this.cm.state.completionActive = null, this.widget && this.widget.close(), this.onClose && this.onClose(), CodeMirror.signal(this.cm, "endCompletion", this.cm))
        },
        active: function() {
            return this.cm.state.completionActive == this
        },
        pick: function(a, c) {
            var d = a.list[c];
            d.hint ? d.hint(this.cm, a, d) : this.cm.replaceRange(b(d), a.from, a.to), this.close()
        },
        showHints: function(a) {
            return a && a.list.length && this.active() ? (0 != this.options.completeSingle && 1 == a.list.length ? this.pick(a, 0) : this.showWidget(a), void 0) : this.close()
        },
        showWidget: function(a) {
            function i() {
                e || (e = !0, c.close(), c.cm.off("cursorActivity", m), CodeMirror.signal(a, "close"))
            }

            function j() {
                return e ? !0 : c.widget ? void 0 : (i(), !0)
            }

            function k() {
                j() || (CodeMirror.signal(a, "update"), c.options.async ? c.getHints(c.cm, l, c.options) : l(c.getHints(c.cm, c.options)))
            }

            function l(b) {
                if (a = b, !j()) {
                    if (!a || !a.list.length) return i();
                    c.widget.close(), c.widget = new d(c, a)
                }
            }

            function m() {
                clearTimeout(b);
                var a = c.cm.getCursor(),
                    d = c.cm.getLine(a.line);
                a.line != g.line || d.length - a.ch != h - g.ch || a.ch < g.ch || c.cm.somethingSelected() || a.ch && f.test(d.charAt(a.ch - 1)) ? c.close() : b = setTimeout(k, 170)
            }
            this.widget = new d(this, a), CodeMirror.signal(a, "shown");
            var e, b = null,
                c = this,
                f = this.options.closeCharacters || /[\s()\[\]{};:>,]/,
                g = this.cm.getCursor(),
                h = this.cm.getLine(g.line).length;
            this.cm.on("cursorActivity", m), this.onClose = i
        }
    }, d.prototype = {
        close: function() {
            if (this.completion.widget == this) {
                this.completion.widget = null, this.hints.parentNode.removeChild(this.hints), this.completion.cm.removeKeyMap(this.keyMap);
                var a = this.completion.cm;
                this.completion.options.closeOnUnfocus !== !1 && (a.off("blur", this.onBlur), a.off("focus", this.onFocus)), a.off("scroll", this.onScroll)
            }
        },
        pick: function() {
            this.completion.pick(this.data, this.selectedHint)
        },
        changeActive: function(a) {
            if (a = Math.max(0, Math.min(a, this.data.list.length - 1)), this.selectedHint != a) {
                var b = this.hints.childNodes[this.selectedHint];
                b.className = b.className.replace(" CodeMirror-hint-active", ""), b = this.hints.childNodes[this.selectedHint = a], b.className += " CodeMirror-hint-active", b.offsetTop < this.hints.scrollTop ? this.hints.scrollTop = b.offsetTop - 3 : b.offsetTop + b.offsetHeight > this.hints.scrollTop + this.hints.clientHeight && (this.hints.scrollTop = b.offsetTop + b.offsetHeight - this.hints.clientHeight + 3), CodeMirror.signal(this.data, "select", this.data.list[this.selectedHint], b)
            }
        },
        screenAmount: function() {
            return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1
        }
    }
}(),
function() {
    "use strict";

    function b(b, c) {
        var d = c && c.schemaInfo,
            e = c && c.quoteChar || '"';
        if (d) {
            var f = b.getCursor(),
                g = b.getTokenAt(f),
                h = CodeMirror.innerMode(b.getMode(), g.state);
            if ("xml" == h.mode.name) {
                var k, i = [],
                    j = !1,
                    l = "<" == g.string.charAt(0);
                if (!h.state.tagName || l) {
                    l && (k = g.string.slice(1), j = !0);
                    var m = h.state.context,
                        n = m && d[m.tagName],
                        o = m ? n && n.children : d["!top"];
                    if (o)
                        for (var p = 0; p < o.length; ++p) k && 0 != o[p].indexOf(k) || i.push("<" + o[p]);
                    else
                        for (var q in d)!d.hasOwnProperty(q) || "!top" == q || k && 0 != q.indexOf(k) || i.push("<" + q);
                    !m || k && 0 != ("/" + m.tagName).indexOf(k) || i.push("</" + m.tagName + ">")
                } else {
                    var n = d[h.state.tagName],
                        r = n && n.attrs;
                    if (!r) return;
                    if ("string" == g.type || "=" == g.string) {
                        var u, s = b.getRange(a(f.line, Math.max(0, f.ch - 60)), a(f.line, "string" == g.type ? g.start : g.end)),
                            t = s.match(/([^\s\u00a0=<>\"\']+)=$/);
                        if (!t || !r.hasOwnProperty(t[1]) || !(u = r[t[1]])) return;
                        "string" == g.type && (k = g.string, /['"]/.test(g.string.charAt(0)) && (e = g.string.charAt(0), k = g.string.slice(1)), j = !0);
                        for (var p = 0; p < u.length; ++p) k && 0 != u[p].indexOf(k) || i.push(e + u[p] + e)
                    } else {
                        "attribute" == g.type && (k = g.string, j = !0);
                        for (var v in r)!r.hasOwnProperty(v) || k && 0 != v.indexOf(k) || i.push(v)
                    }
                }
                return {
                    list: i,
                    from: j ? a(f.line, g.start) : f,
                    to: j ? a(f.line, g.end) : f
                }
            }
        }
    }
    var a = CodeMirror.Pos;
    CodeMirror.xmlHint = b, CodeMirror.registerHelper("hint", "xml", b)
}();
(function() {

    CodeMirror.extendMode("css", {
        commentStart: "/*",
        commentEnd: "*/",
        newlineAfterToken: function(_type, content) {
            return /^[;{}]$/.test(content);
        }
    });

    CodeMirror.extendMode("javascript", {
        commentStart: "/*",
        commentEnd: "*/",
        // FIXME semicolons inside of for
        newlineAfterToken: function(_type, content, textAfter, state) {
            if (this.jsonMode) {
                return /^[\[,{]$/.test(content) || /^}/.test(textAfter);
            } else {
                if (content == ";" && state.lexical && state.lexical.type == ")") return false;
                return /^[;{}]$/.test(content) && !/^;/.test(textAfter);
            }
        }
    });

    var inlineElements = /^(a|abbr|acronym|area|base|bdo|big|br|button|caption|cite|code|col|colgroup|dd|del|dfn|em|frame|hr|iframe|img|input|ins|kbd|label|legend|link|map|object|optgroup|option|param|q|samp|script|select|small|span|strong|sub|sup|textarea|tt|var)$/;

    CodeMirror.extendMode("xml", {
        commentStart: "<!--",
        commentEnd: "-->",
        newlineAfterToken: function(type, content, textAfter, state) {
            var inline = false;
            if (this.configuration == "html")
                inline = state.context ? inlineElements.test(state.context.tagName) : false;
            return !inline && ((type == "tag" && />$/.test(content) && state.context) ||
                /^</.test(textAfter));
        }
    });

    // Comment/uncomment the specified range
    CodeMirror.defineExtension("commentRange", function(isComment, from, to) {
        var cm = this,
            curMode = CodeMirror.innerMode(cm.getMode(), cm.getTokenAt(from).state).mode;
        cm.operation(function() {
            if (isComment) { // Comment range
                cm.replaceRange(curMode.commentEnd, to);
                cm.replaceRange(curMode.commentStart, from);
                if (from.line == to.line && from.ch == to.ch) // An empty comment inserted - put cursor inside
                    cm.setCursor(from.line, from.ch + curMode.commentStart.length);
            } else { // Uncomment range
                var selText = cm.getRange(from, to);
                var startIndex = selText.indexOf(curMode.commentStart);
                var endIndex = selText.lastIndexOf(curMode.commentEnd);
                if (startIndex > -1 && endIndex > -1 && endIndex > startIndex) {
                    // Take string till comment start
                    selText = selText.substr(0, startIndex)
                    // From comment start till comment end
                    + selText.substring(startIndex + curMode.commentStart.length, endIndex)
                    // From comment end till string end
                    + selText.substr(endIndex + curMode.commentEnd.length);
                }
                cm.replaceRange(selText, from, to);
            }
        });
    });

    // Applies automatic mode-aware indentation to the specified range
    CodeMirror.defineExtension("autoIndentRange", function(from, to) {
        var cmInstance = this;
        this.operation(function() {
            for (var i = from.line; i <= to.line; i++) {
                cmInstance.indentLine(i, "smart");
            }
        });
    });

    // Applies automatic formatting to the specified range
    CodeMirror.defineExtension("autoFormatRange", function(from, to) {
        var cm = this;
        var outer = cm.getMode(),
            text = cm.getRange(from, to).split("\n");
        var state = CodeMirror.copyState(outer, cm.getTokenAt(from).state);
        var tabSize = cm.getOption("tabSize");

        var out = "",
            lines = 0,
            atSol = from.ch == 0;

        function newline() {
            out += "\n";
            atSol = true;
            ++lines;
        }

        for (var i = 0; i < text.length; ++i) {
            var stream = new CodeMirror.StringStream(text[i], tabSize);
            while (!stream.eol()) {
                var inner = CodeMirror.innerMode(outer, state);
                var style = outer.token(stream, state),
                    cur = stream.current();
                stream.start = stream.pos;
                if (!atSol || /\S/.test(cur)) {
                    out += cur;
                    atSol = false;
                }
                if (!atSol && inner.mode.newlineAfterToken &&
                    inner.mode.newlineAfterToken(style, cur, stream.string.slice(stream.pos) || text[i + 1] || "", inner.state))
                    newline();
            }
            if (!stream.pos && outer.blankLine) outer.blankLine(state);
            if (!atSol && i < text.length - 1) newline();
        }

        cm.operation(function() {
            cm.replaceRange(out, from, to);
            for (var cur = from.line + 1, end = from.line + lines; cur <= end; ++cur)
                cm.indentLine(cur, "smart");
            cm.setSelection(from, cm.getCursor(false));
        });
    });
})();


jQuery(function($) {
    $('.resourcify_codemirror_code_editor').each(function() {

        var mode = $(this).data('mode'),
            editor = CodeMirror.fromTextArea(this, {
                lineNumbers: true,
                matchBrackets: true,
                mode: mode,
                indentUnit: 4,
                indentWithTabs: true,
                enterMode: "keep",
                tabMode: "shift",
                lineWrapping: true
            });

        $('#field_use_template').change(function(event) {
            editor.setValue('<h4>{{resourcify_count}} {{resourcify_count_title}}</h4><ul>{{#resourcify_sources}}<li><a target="_blank" href="{{source_url}}">{{source_title}}</a></li>{{/resourcify_sources}}</ul>');
            CodeMirror.commands["selectAll"](editor);
            autoFormatSelection(editor);
        });

        function getSelectedRange(editor) {
            return {
                from: editor.getCursor(true),
                to: editor.getCursor(false)
            };
        }

        function autoFormatSelection(editor) {
            var range = getSelectedRange(editor);
            editor.autoFormatRange(range.from, range.to);
            CodeMirror.commands['goPageUp'](editor);
        }

        $('body').on('click', '.resourcify-metabox-config-nav li a, .resourcify-shortcode-config-nav li a, .resourcify-settings-config-nav li a, .resourcify-widget-config-nav li a', function() {
            editor.refresh();
        });
    });
});