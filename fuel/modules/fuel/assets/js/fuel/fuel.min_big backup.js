(function(a, b) {
    function d(b) {
        return !a(b).parents().andSelf().filter(function() {
            return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
        }).length
    }

    function c(b, c) {
        var e = b.nodeName.toLowerCase();
        if ("area" === e) {
            var f = b.parentNode,
                g = f.name,
                h;
            if (!b.href || !g || f.nodeName.toLowerCase() !== "map") return !1;
            h = a("img[usemap=#" + g + "]")[0];
            return !!h && d(h)
        }
        return (/input|select|textarea|button|object/.test(e) ? !b.disabled : "a" == e ? b.href || c : c) && d(b)
    }
    a.ui = a.ui || {};
    a.ui.version || (a.extend(a.ui, {
        version: "1.8.17",
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        }
    }), a.fn.extend({
        propAttr: a.fn.prop || a.fn.attr,
        _focus: a.fn.focus,
        focus: function(b, c) {
            return typeof b == "number" ? this.each(function() {
                var d =
                    this;
                setTimeout(function() {
                    a(d).focus(), c && c.call(d)
                }, b)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var b;
            a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
            }).eq(0) : b = this.parents().filter(function() {
                return /(auto|scroll)/.test(a.curCSS(this,
                    "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
            }).eq(0);
            return /fixed/.test(this.css("position")) || !b.length ? a(document) : b
        },
        zIndex: function(c) {
            if (c !== b) return this.css("zIndex", c);
            if (this.length) {
                var d = a(this[0]),
                    e, f;
                while (d.length && d[0] !== document) {
                    e = d.css("position");
                    if (e === "absolute" || e === "relative" || e === "fixed") {
                        f = parseInt(d.css("zIndex"), 10);
                        if (!isNaN(f) && f !== 0) return f
                    }
                    d = d.parent()
                }
            }
            return 0
        },
        disableSelection: function() {
            return this.bind((a.support.selectstart ? "selectstart" :
                "mousedown") + ".ui-disableSelection", function(a) {
                a.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), a.each(["Width", "Height"], function(c, d) {
        function h(b, c, d, f) {
            a.each(e, function() {
                c -= parseFloat(a.curCSS(b, "padding" + this, !0)) || 0, d && (c -= parseFloat(a.curCSS(b, "border" + this + "Width", !0)) || 0), f && (c -= parseFloat(a.curCSS(b, "margin" + this, !0)) || 0)
            });
            return c
        }
        var e = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
            f = d.toLowerCase(),
            g = {
                innerWidth: a.fn.innerWidth,
                innerHeight: a.fn.innerHeight,
                outerWidth: a.fn.outerWidth,
                outerHeight: a.fn.outerHeight
            };
        a.fn["inner" + d] = function(c) {
            if (c === b) return g["inner" + d].call(this);
            return this.each(function() {
                a(this).css(f, h(this, c) + "px")
            })
        }, a.fn["outer" + d] = function(b, c) {
            if (typeof b != "number") return g["outer" + d].call(this, b);
            return this.each(function() {
                a(this).css(f, h(this, b, !0, c) + "px")
            })
        }
    }), a.extend(a.expr[":"], {
        data: function(b, c, d) {
            return !!a.data(b, d[3])
        },
        focusable: function(b) {
            return c(b, !isNaN(a.attr(b, "tabindex")))
        },
        tabbable: function(b) {
            var d = a.attr(b,
                    "tabindex"),
                e = isNaN(d);
            return (e || d >= 0) && c(b, !e)
        }
    }), a(function() {
        var b = document.body,
            c = b.appendChild(c = document.createElement("div"));
        a.extend(c.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }), a.support.minHeight = c.offsetHeight === 100, a.support.selectstart = "onselectstart" in c, b.removeChild(c).style.display = "none"
    }), a.extend(a.ui, {
        plugin: {
            add: function(b, c, d) {
                var e = a.ui[b].prototype;
                for (var f in d) e.plugins[f] = e.plugins[f] || [], e.plugins[f].push([c, d[f]])
            },
            call: function(a, b, c) {
                var d = a.plugins[b];
                if (!!d && !!a.element[0].parentNode)
                    for (var e = 0; e < d.length; e++) a.options[d[e][0]] && d[e][1].apply(a.element, c)
            }
        },
        contains: function(a, b) {
            return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
        },
        hasScroll: function(b, c) {
            if (a(b).css("overflow") === "hidden") return !1;
            var d = c && c === "left" ? "scrollLeft" : "scrollTop",
                e = !1;
            if (b[d] > 0) return !0;
            b[d] = 1, e = b[d] > 0, b[d] = 0;
            return e
        },
        isOverAxis: function(a, b, c) {
            return a > b && a < b + c
        },
        isOver: function(b, c, d, e, f, g) {
            return a.ui.isOverAxis(b, d, f) &&
                a.ui.isOverAxis(c, e, g)
        }
    }))
})(jQuery);
(function(a, b) {
    if (a.cleanData) {
        var c = a.cleanData;
        a.cleanData = function(b) {
            for (var d = 0, e;
                (e = b[d]) != null; d++) try {
                a(e).triggerHandler("remove")
            } catch (f) {}
            c(b)
        }
    } else {
        var d = a.fn.remove;
        a.fn.remove = function(b, c) {
            return this.each(function() {
                c || (!b || a.filter(b, [this]).length) && a("*", this).add([this]).each(function() {
                    try {
                        a(this).triggerHandler("remove")
                    } catch (b) {}
                });
                return d.call(a(this), b, c)
            })
        }
    }
    a.widget = function(b, c, d) {
        var e = b.split(".")[0],
            f;
        b = b.split(".")[1], f = e + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][f] =
            function(c) {
                return !!a.data(c, b)
            }, a[e] = a[e] || {}, a[e][b] = function(a, b) {
                arguments.length && this._createWidget(a, b)
            };
        var g = new c;
        g.options = a.extend(!0, {}, g.options), a[e][b].prototype = a.extend(!0, g, {
            namespace: e,
            widgetName: b,
            widgetEventPrefix: a[e][b].prototype.widgetEventPrefix || b,
            widgetBaseClass: f
        }, d), a.widget.bridge(b, a[e][b])
    }, a.widget.bridge = function(c, d) {
        a.fn[c] = function(e) {
            var f = typeof e == "string",
                g = Array.prototype.slice.call(arguments, 1),
                h = this;
            e = !f && g.length ? a.extend.apply(null, [!0, e].concat(g)) :
                e;
            if (f && e.charAt(0) === "_") return h;
            f ? this.each(function() {
                var d = a.data(this, c),
                    f = d && a.isFunction(d[e]) ? d[e].apply(d, g) : d;
                if (f !== d && f !== b) {
                    h = f;
                    return !1
                }
            }) : this.each(function() {
                var b = a.data(this, c);
                b ? b.option(e || {})._init() : a.data(this, c, new d(e, this))
            });
            return h
        }
    }, a.Widget = function(a, b) {
        arguments.length && this._createWidget(a, b)
    }, a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: !1
        },
        _createWidget: function(b, c) {
            a.data(c, this.widgetName, this), this.element = a(c), this.options =
                a.extend(!0, {}, this.options, this._getCreateOptions(), b);
            var d = this;
            this.element.bind("remove." + this.widgetName, function() {
                d.destroy()
            }), this._create(), this._trigger("create"), this._init()
        },
        _getCreateOptions: function() {
            return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass +
                "-disabled " + "ui-state-disabled")
        },
        widget: function() {
            return this.element
        },
        option: function(c, d) {
            var e = c;
            if (arguments.length === 0) return a.extend({}, this.options);
            if (typeof c == "string") {
                if (d === b) return this.options[c];
                e = {}, e[c] = d
            }
            this._setOptions(e);
            return this
        },
        _setOptions: function(b) {
            var c = this;
            a.each(b, function(a, b) {
                c._setOption(a, b)
            });
            return this
        },
        _setOption: function(a, b) {
            this.options[a] = b, a === "disabled" && this.widget()[b ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled",
                b);
            return this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _trigger: function(b, c, d) {
            var e, f, g = this.options[b];
            d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent;
            if (f)
                for (e in f) e in c || (c[e] = f[e]);
            this.element.trigger(c, d);
            return !(a.isFunction(g) && g.call(this.element[0], c, d) === !1 || c.isDefaultPrevented())
        }
    }
})(jQuery);
(function(a, b) {
    var c = !1;
    a(document).mouseup(function(a) {
        c = !1
    }), a.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var b = this;
            this.element.bind("mousedown." + this.widgetName, function(a) {
                return b._mouseDown(a)
            }).bind("click." + this.widgetName, function(c) {
                if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent")) {
                    a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation();
                    return !1
                }
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." +
                this.widgetName)
        },
        _mouseDown: function(b) {
            if (!c) {
                this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
                var d = this,
                    e = b.which == 1,
                    f = typeof this.options.cancel == "string" && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
                if (!e || f || !this._mouseCapture(b)) return !0;
                this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    d.mouseDelayMet = !0
                }, this.options.delay));
                if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
                    this._mouseStarted =
                        this._mouseStart(b) !== !1;
                    if (!this._mouseStarted) {
                        b.preventDefault();
                        return !0
                    }
                }!0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(a) {
                    return d._mouseMove(a)
                }, this._mouseUpDelegate = function(a) {
                    return d._mouseUp(a)
                }, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), c = !0;
                return !0
            }
        },
        _mouseMove: function(b) {
            if (a.browser.msie &&
                !(document.documentMode >= 9) && !b.button) return this._mouseUp(b);
            if (this._mouseStarted) {
                this._mouseDrag(b);
                return b.preventDefault()
            }
            this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b));
            return !this._mouseStarted
        },
        _mouseUp: function(b) {
            a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted &&
                (this._mouseStarted = !1, b.target == this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b));
            return !1
        },
        _mouseDistanceMet: function(a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function(a) {
            return this.mouseDelayMet
        },
        _mouseStart: function(a) {},
        _mouseDrag: function(a) {},
        _mouseStop: function(a) {},
        _mouseCapture: function(a) {
            return !0
        }
    })
})(jQuery);
(function(a, b) {
    a.ui = a.ui || {};
    var c = /left|center|right/,
        d = /top|center|bottom/,
        e = "center",
        f = {},
        g = a.fn.position,
        h = a.fn.offset;
    a.fn.position = function(b) {
            if (!b || !b.of) return g.apply(this, arguments);
            b = a.extend({}, b);
            var h = a(b.of),
                i = h[0],
                j = (b.collision || "flip").split(" "),
                k = b.offset ? b.offset.split(" ") : [0, 0],
                l, m, n;
            i.nodeType === 9 ? (l = h.width(), m = h.height(), n = {
                    top: 0,
                    left: 0
                }) : i.setTimeout ? (l = h.width(), m = h.height(), n = {
                    top: h.scrollTop(),
                    left: h.scrollLeft()
                }) : i.preventDefault ? (b.at = "left top", l = m = 0, n = {
                    top: b.of.pageY,
                    left: b.of.pageX
                }) : (l = h.outerWidth(), m = h.outerHeight(), n = h.offset()), a.each(["my", "at"], function() {
                    var a = (b[this] || "").split(" ");
                    a.length === 1 && (a = c.test(a[0]) ? a.concat([e]) : d.test(a[0]) ? [e].concat(a) : [e, e]), a[0] = c.test(a[0]) ? a[0] : e, a[1] = d.test(a[1]) ? a[1] : e, b[this] = a
                }), j.length === 1 && (j[1] = j[0]), k[0] = parseInt(k[0], 10) || 0, k.length === 1 && (k[1] = k[0]), k[1] = parseInt(k[1], 10) || 0, b.at[0] === "right" ? n.left += l : b.at[0] === e && (n.left += l / 2), b.at[1] === "bottom" ? n.top += m : b.at[1] === e && (n.top += m / 2), n.left += k[0], n.top +=
                k[1];
            return this.each(function() {
                var c = a(this),
                    d = c.outerWidth(),
                    g = c.outerHeight(),
                    h = parseInt(a.curCSS(this, "marginLeft", !0)) || 0,
                    i = parseInt(a.curCSS(this, "marginTop", !0)) || 0,
                    o = d + h + (parseInt(a.curCSS(this, "marginRight", !0)) || 0),
                    p = g + i + (parseInt(a.curCSS(this, "marginBottom", !0)) || 0),
                    q = a.extend({}, n),
                    r;
                b.my[0] === "right" ? q.left -= d : b.my[0] === e && (q.left -= d / 2), b.my[1] === "bottom" ? q.top -= g : b.my[1] === e && (q.top -= g / 2), f.fractions || (q.left = Math.round(q.left), q.top = Math.round(q.top)), r = {
                        left: q.left - h,
                        top: q.top - i
                    },
                    a.each(["left", "top"], function(c, e) {
                        a.ui.position[j[c]] && a.ui.position[j[c]][e](q, {
                            targetWidth: l,
                            targetHeight: m,
                            elemWidth: d,
                            elemHeight: g,
                            collisionPosition: r,
                            collisionWidth: o,
                            collisionHeight: p,
                            offset: k,
                            my: b.my,
                            at: b.at
                        })
                    }), a.fn.bgiframe && c.bgiframe(), c.offset(a.extend(q, {
                        using: b.using
                    }))
            })
        }, a.ui.position = {
            fit: {
                left: function(b, c) {
                    var d = a(window),
                        e = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft();
                    b.left = e > 0 ? b.left - e : Math.max(b.left - c.collisionPosition.left, b.left)
                },
                top: function(b, c) {
                    var d =
                        a(window),
                        e = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop();
                    b.top = e > 0 ? b.top - e : Math.max(b.top - c.collisionPosition.top, b.top)
                }
            },
            flip: {
                left: function(b, c) {
                    if (c.at[0] !== e) {
                        var d = a(window),
                            f = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft(),
                            g = c.my[0] === "left" ? -c.elemWidth : c.my[0] === "right" ? c.elemWidth : 0,
                            h = c.at[0] === "left" ? c.targetWidth : -c.targetWidth,
                            i = -2 * c.offset[0];
                        b.left += c.collisionPosition.left < 0 ? g + h + i : f > 0 ? g + h + i : 0
                    }
                },
                top: function(b, c) {
                    if (c.at[1] !== e) {
                        var d = a(window),
                            f = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop(),
                            g = c.my[1] === "top" ? -c.elemHeight : c.my[1] === "bottom" ? c.elemHeight : 0,
                            h = c.at[1] === "top" ? c.targetHeight : -c.targetHeight,
                            i = -2 * c.offset[1];
                        b.top += c.collisionPosition.top < 0 ? g + h + i : f > 0 ? g + h + i : 0
                    }
                }
            }
        }, a.offset.setOffset || (a.offset.setOffset = function(b, c) {
            /static/.test(a.curCSS(b, "position")) && (b.style.position = "relative");
            var d = a(b),
                e = d.offset(),
                f = parseInt(a.curCSS(b, "top", !0), 10) || 0,
                g = parseInt(a.curCSS(b, "left", !0), 10) || 0,
                h = {
                    top: c.top - e.top +
                        f,
                    left: c.left - e.left + g
                };
            "using" in c ? c.using.call(b, h) : d.css(h)
        }, a.fn.offset = function(b) {
            var c = this[0];
            if (!c || !c.ownerDocument) return null;
            if (b) return this.each(function() {
                a.offset.setOffset(this, b)
            });
            return h.call(this)
        }),
        function() {
            var b = document.getElementsByTagName("body")[0],
                c = document.createElement("div"),
                d, e, g, h, i;
            d = document.createElement(b ? "div" : "body"), g = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            }, b && jQuery.extend(g, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
            for (var j in g) d.style[j] = g[j];
            d.appendChild(c), e = b || document.documentElement, e.insertBefore(d, e.firstChild), c.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", h = a(c).offset(function(a, b) {
                return b
            }).offset(), d.innerHTML = "", e.removeChild(d), i = h.top + h.left + (b ? 2E3 : 0), f.fractions = i > 21 && i < 22
        }()
})(jQuery);
(function(a, b) {
    a.widget("ui.draggable", a.ui.mouse, {
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1
            },
            _create: function() {
                this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) &&
                    (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
            },
            destroy: function() {
                if (!!this.element.data("draggable")) {
                    this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy();
                    return this
                }
            },
            _mouseCapture: function(b) {
                var c = this.options;
                if (this.helper || c.disabled || a(b.target).is(".ui-resizable-handle")) return !1;
                this.handle = this._getHandle(b);
                if (!this.handle) return !1;
                c.iframeFix && a(c.iframeFix === !0 ? "iframe" : c.iframeFix).each(function() {
                    a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                        width: this.offsetWidth + "px",
                        height: this.offsetHeight + "px",
                        position: "absolute",
                        opacity: "0.001",
                        zIndex: 1E3
                    }).css(a(this).offset()).appendTo("body")
                });
                return !0
            },
            _mouseStart: function(b) {
                var c = this.options;
                this.helper = this._createHelper(b), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current =
                        this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                        top: this.offset.top - this.margins.top,
                        left: this.offset.left - this.margins.left
                    }, a.extend(this.offset, {
                        click: {
                            left: b.pageX - this.offset.left,
                            top: b.pageY - this.offset.top
                        },
                        parent: this._getParentOffset(),
                        relative: this._getRelativeOffset()
                    }), this.originalPosition = this.position = this._generatePosition(b), this.originalPageX = b.pageX,
                    this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), c.containment && this._setContainment();
                if (this._trigger("start", b) === !1) {
                    this._clear();
                    return !1
                }
                this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.helper.addClass("ui-draggable-dragging"), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b);
                return !0
            },
            _mouseDrag: function(b, c) {
                this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute");
                if (!c) {
                    var d = this._uiHash();
                    if (this._trigger("drag", b, d) === !1) {
                        this._mouseUp({});
                        return !1
                    }
                    this.position = d.position
                }
                if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
                if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
                a.ui.ddmanager && a.ui.ddmanager.drag(this, b);
                return !1
            },
            _mouseStop: function(b) {
                var c = !1;
                a.ui.ddmanager && !this.options.dropBehaviour && (c = a.ui.ddmanager.drop(this, b)), this.dropped && (c = this.dropped, this.dropped = !1);
                if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original") return !1;
                if (this.options.revert == "invalid" && !c || this.options.revert == "valid" && c || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, c)) {
                    var d = this;
                    a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                        d._trigger("stop", b) !== !1 && d._clear()
                    })
                } else this._trigger("stop", b) !== !1 && this._clear();
                return !1
            },
            _mouseUp: function(b) {
                this.options.iframeFix ===
                    !0 && a("div.ui-draggable-iframeFix").each(function() {
                        this.parentNode.removeChild(this)
                    }), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b);
                return a.ui.mouse.prototype._mouseUp.call(this, b)
            },
            cancel: function() {
                this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
                return this
            },
            _getHandle: function(b) {
                var c = !this.options.handle || !a(this.options.handle, this.element).length ? !0 : !1;
                a(this.options.handle, this.element).find("*").andSelf().each(function() {
                    this == b.target && (c = !0)
                });
                return c
            },
            _createHelper: function(b) {
                var c =
                    this.options,
                    d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : c.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
                d.parents("body").length || d.appendTo(c.appendTo == "parent" ? this.element[0].parentNode : c.appendTo), d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css("position")) && d.css("position", "absolute");
                return d
            },
            _adjustOffsetFromHelper: function(b) {
                typeof b == "string" && (b = b.split(" ")), a.isArray(b) && (b = {
                    left: +b[0],
                    top: +b[1] || 0
                }), "left" in b && (this.offset.click.left =
                    b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                this.offsetParent = this.helper.offsetParent();
                var b = this.offsetParent.offset();
                this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left +=
                    this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
                if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) b = {
                    top: 0,
                    left: 0
                };
                return {
                    top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if (this.cssPosition == "relative") {
                    var a = this.element.position();
                    return {
                        top: a.top - (parseInt(this.helper.css("top"),
                            10) || 0) + this.scrollParent.scrollTop(),
                        left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var b = this.options;
                b.containment == "parent" && (b.containment = this.helper[0].parentNode);
                if (b.containment == "document" || b.containment == "window") this.containment = [b.containment == "document" ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, b.containment == "document" ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (b.containment == "document" ? 0 : a(window).scrollLeft()) + a(b.containment == "document" ? document : window).width() - this.helperProportions.width -
                    this.margins.left, (b.containment == "document" ? 0 : a(window).scrollTop()) + (a(b.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
                ];
                if (!/^(document|window|parent)$/.test(b.containment) && b.containment.constructor != Array) {
                    var c = a(b.containment),
                        d = c[0];
                    if (!d) return;
                    var e = c.offset(),
                        f = a(d).css("overflow") != "hidden";
                    this.containment = [(parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0), (parseInt(a(d).css("borderTopWidth"),
                        10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0), (f ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = c
                } else b.containment.constructor ==
                    Array && (this.containment = b.containment)
            },
            _convertPositionTo: function(b, c) {
                c || (c = this.position);
                var d = b == "absolute" ? 1 : -1,
                    e = this.options,
                    f = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                    g = /(html|body)/i.test(f[0].tagName);
                return {
                    top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() :
                        g ? 0 : f.scrollTop()) * d),
                    left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)
                }
            },
            _generatePosition: function(b) {
                var c = this.options,
                    d = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                    e = /(html|body)/i.test(d[0].tagName),
                    f = b.pageX,
                    g = b.pageY;
                if (this.originalPosition) {
                    var h;
                    if (this.containment) {
                        if (this.relative_container) {
                            var i = this.relative_container.offset();
                            h = [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]
                        } else h = this.containment;
                        b.pageX - this.offset.click.left < h[0] && (f = h[0] + this.offset.click.left), b.pageY - this.offset.click.top < h[1] && (g = h[1] + this.offset.click.top), b.pageX - this.offset.click.left > h[2] && (f = h[2] + this.offset.click.left), b.pageY - this.offset.click.top > h[3] && (g = h[3] +
                            this.offset.click.top)
                    }
                    if (c.grid) {
                        var j = c.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY;
                        g = h ? j - this.offset.click.top < h[1] || j - this.offset.click.top > h[3] ? j - this.offset.click.top < h[1] ? j + c.grid[1] : j - c.grid[1] : j : j;
                        var k = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
                        f = h ? k - this.offset.click.left < h[0] || k - this.offset.click.left > h[2] ? k - this.offset.click.left < h[0] ? k + c.grid[0] : k - c.grid[0] : k : k
                    }
                }
                return {
                    top: g -
                        this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
                    left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
                }
            },
            _clear: function() {
                this.helper.removeClass("ui-draggable-dragging"),
                    this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
            },
            _trigger: function(b, c, d) {
                d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d]), b == "drag" && (this.positionAbs = this._convertPositionTo("absolute"));
                return a.Widget.prototype._trigger.call(this, b, c, d)
            },
            plugins: {},
            _uiHash: function(a) {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                }
            }
        }), a.extend(a.ui.draggable, {
            version: "1.8.17"
        }),
        a.ui.plugin.add("draggable", "connectToSortable", {
            start: function(b, c) {
                var d = a(this).data("draggable"),
                    e = d.options,
                    f = a.extend({}, c, {
                        item: d.element
                    });
                d.sortables = [], a(e.connectToSortable).each(function() {
                    var c = a.data(this, "sortable");
                    c && !c.options.disabled && (d.sortables.push({
                        instance: c,
                        shouldRevert: c.options.revert
                    }), c.refreshPositions(), c._trigger("activate", b, f))
                })
            },
            stop: function(b, c) {
                var d = a(this).data("draggable"),
                    e = a.extend({}, c, {
                        item: d.element
                    });
                a.each(d.sortables, function() {
                    this.instance.isOver ?
                        (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, d.options.helper == "original" && this.instance.currentItem.css({
                            top: "auto",
                            left: "auto"
                        })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e))
                })
            },
            drag: function(b, c) {
                var d = a(this).data("draggable"),
                    e = this,
                    f = function(b) {
                        var c = this.offset.click.top,
                            d = this.offset.click.left,
                            e = this.positionAbs.top,
                            f = this.positionAbs.left,
                            g = b.height,
                            h = b.width,
                            i = b.top,
                            j = b.left;
                        return a.ui.isOver(e + c, f + d, i, j, g, h)
                    };
                a.each(d.sortables, function(f) {
                    this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                            return c.helper[0]
                        }, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top,
                        d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder &&
                        this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1)
                })
            }
        }), a.ui.plugin.add("draggable", "cursor", {
            start: function(b, c) {
                var d = a("body"),
                    e = a(this).data("draggable").options;
                d.css("cursor") && (e._cursor = d.css("cursor")), d.css("cursor", e.cursor)
            },
            stop: function(b, c) {
                var d = a(this).data("draggable").options;
                d._cursor && a("body").css("cursor", d._cursor)
            }
        }), a.ui.plugin.add("draggable", "opacity", {
            start: function(b, c) {
                var d = a(c.helper),
                    e = a(this).data("draggable").options;
                d.css("opacity") &&
                    (e._opacity = d.css("opacity")), d.css("opacity", e.opacity)
            },
            stop: function(b, c) {
                var d = a(this).data("draggable").options;
                d._opacity && a(c.helper).css("opacity", d._opacity)
            }
        }), a.ui.plugin.add("draggable", "scroll", {
            start: function(b, c) {
                var d = a(this).data("draggable");
                d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML" && (d.overflowOffset = d.scrollParent.offset())
            },
            drag: function(b, c) {
                var d = a(this).data("draggable"),
                    e = d.options,
                    f = !1;
                if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
                    if (!e.axis ||
                        e.axis != "x") d.overflowOffset.top + d.scrollParent[0].offsetHeight - b.pageY < e.scrollSensitivity ? d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop - e.scrollSpeed);
                    if (!e.axis || e.axis != "y") d.overflowOffset.left + d.scrollParent[0].offsetWidth - b.pageX < e.scrollSensitivity ? d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity &&
                        (d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft - e.scrollSpeed)
                } else {
                    if (!e.axis || e.axis != "x") b.pageY - a(document).scrollTop() < e.scrollSensitivity ? f = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < e.scrollSensitivity && (f = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed));
                    if (!e.axis || e.axis != "y") b.pageX - a(document).scrollLeft() < e.scrollSensitivity ? f = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed) :
                        a(window).width() - (b.pageX - a(document).scrollLeft()) < e.scrollSensitivity && (f = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed))
                }
                f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b)
            }
        }), a.ui.plugin.add("draggable", "snap", {
            start: function(b, c) {
                var d = a(this).data("draggable"),
                    e = d.options;
                d.snapElements = [], a(e.snap.constructor != String ? e.snap.items || ":data(draggable)" : e.snap).each(function() {
                    var b = a(this),
                        c = b.offset();
                    this != d.element[0] && d.snapElements.push({
                        item: this,
                        width: b.outerWidth(),
                        height: b.outerHeight(),
                        top: c.top,
                        left: c.left
                    })
                })
            },
            drag: function(b, c) {
                var d = a(this).data("draggable"),
                    e = d.options,
                    f = e.snapTolerance,
                    g = c.offset.left,
                    h = g + d.helperProportions.width,
                    i = c.offset.top,
                    j = i + d.helperProportions.height;
                for (var k = d.snapElements.length - 1; k >= 0; k--) {
                    var l = d.snapElements[k].left,
                        m = l + d.snapElements[k].width,
                        n = d.snapElements[k].top,
                        o = n + d.snapElements[k].height;
                    if (!(l - f < g && g < m + f && n - f < i && i < o + f || l - f < g && g < m + f && n - f < j && j < o + f || l - f < h && h < m + f && n - f < i && i < o + f || l - f < h && h < m + f &&
                            n - f < j && j < o + f)) {
                        d.snapElements[k].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {
                            snapItem: d.snapElements[k].item
                        })), d.snapElements[k].snapping = !1;
                        continue
                    }
                    if (e.snapMode != "inner") {
                        var p = Math.abs(n - j) <= f,
                            q = Math.abs(o - i) <= f,
                            r = Math.abs(l - h) <= f,
                            s = Math.abs(m - g) <= f;
                        p && (c.position.top = d._convertPositionTo("relative", {
                                top: n - d.helperProportions.height,
                                left: 0
                            }).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {
                                top: o,
                                left: 0
                            }).top - d.margins.top),
                            r && (c.position.left = d._convertPositionTo("relative", {
                                top: 0,
                                left: l - d.helperProportions.width
                            }).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {
                                top: 0,
                                left: m
                            }).left - d.margins.left)
                    }
                    var t = p || q || r || s;
                    if (e.snapMode != "outer") {
                        var p = Math.abs(n - i) <= f,
                            q = Math.abs(o - j) <= f,
                            r = Math.abs(l - g) <= f,
                            s = Math.abs(m - h) <= f;
                        p && (c.position.top = d._convertPositionTo("relative", {
                            top: n,
                            left: 0
                        }).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {
                                top: o - d.helperProportions.height,
                                left: 0
                            }).top -
                            d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {
                            top: 0,
                            left: l
                        }).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {
                            top: 0,
                            left: m - d.helperProportions.width
                        }).left - d.margins.left)
                    }!d.snapElements[k].snapping && (p || q || r || s || t) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {
                        snapItem: d.snapElements[k].item
                    })), d.snapElements[k].snapping = p || q || r || s || t
                }
            }
        }), a.ui.plugin.add("draggable", "stack", {
            start: function(b, c) {
                var d = a(this).data("draggable").options,
                    e = a.makeArray(a(d.stack)).sort(function(b, c) {
                        return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
                    });
                if (!!e.length) {
                    var f = parseInt(e[0].style.zIndex) || 0;
                    a(e).each(function(a) {
                        this.style.zIndex = f + a
                    }), this[0].style.zIndex = f + e.length
                }
            }
        }), a.ui.plugin.add("draggable", "zIndex", {
            start: function(b, c) {
                var d = a(c.helper),
                    e = a(this).data("draggable").options;
                d.css("zIndex") && (e._zIndex = d.css("zIndex")), d.css("zIndex", e.zIndex)
            },
            stop: function(b, c) {
                var d = a(this).data("draggable").options;
                d._zIndex && a(c.helper).css("zIndex", d._zIndex)
            }
        })
})(jQuery);
(function(a, b) {
    a.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function() {
            var b = this.options,
                c = b.accept;
            this.isover = 0, this.isout = 1, this.accept = a.isFunction(c) ? c : function(a) {
                    return a.is(c)
                }, this.proportions = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                }, a.ui.ddmanager.droppables[b.scope] = a.ui.ddmanager.droppables[b.scope] || [], a.ui.ddmanager.droppables[b.scope].push(this),
                b.addClasses && this.element.addClass("ui-droppable")
        },
        destroy: function() {
            var b = a.ui.ddmanager.droppables[this.options.scope];
            for (var c = 0; c < b.length; c++) b[c] == this && b.splice(c, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
            return this
        },
        _setOption: function(b, c) {
            b == "accept" && (this.accept = a.isFunction(c) ? c : function(a) {
                return a.is(c)
            }), a.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(b) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass &&
                this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c))
        },
        _deactivate: function(b) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", b, this.ui(c))
        },
        _over: function(b) {
            var c = a.ui.ddmanager.current;
            !!c && (c.currentItem || c.element)[0] != this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over",
                b, this.ui(c)))
        },
        _out: function(b) {
            var c = a.ui.ddmanager.current;
            !!c && (c.currentItem || c.element)[0] != this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)))
        },
        _drop: function(b, c) {
            var d = c || a.ui.ddmanager.current;
            if (!d || (d.currentItem || d.element)[0] == this.element[0]) return !1;
            var e = !1;
            this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
                var b =
                    a.data(this, "droppable");
                if (b.options.greedy && !b.options.disabled && b.options.scope == d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, {
                        offset: b.element.offset()
                    }), b.options.tolerance)) {
                    e = !0;
                    return !1
                }
            });
            if (e) return !1;
            if (this.accept.call(this.element[0], d.currentItem || d.element)) {
                this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop",
                    b, this.ui(d));
                return this.element
            }
            return !1
        },
        ui: function(a) {
            return {
                draggable: a.currentItem || a.element,
                helper: a.helper,
                position: a.position,
                offset: a.positionAbs
            }
        }
    }), a.extend(a.ui.droppable, {
        version: "1.8.17"
    }), a.ui.intersect = function(b, c, d) {
        if (!c.offset) return !1;
        var e = (b.positionAbs || b.position.absolute).left,
            f = e + b.helperProportions.width,
            g = (b.positionAbs || b.position.absolute).top,
            h = g + b.helperProportions.height,
            i = c.offset.left,
            j = i + c.proportions.width,
            k = c.offset.top,
            l = k + c.proportions.height;
        switch (d) {
            case "fit":
                return i <=
                    e && f <= j && k <= g && h <= l;
            case "intersect":
                return i < e + b.helperProportions.width / 2 && f - b.helperProportions.width / 2 < j && k < g + b.helperProportions.height / 2 && h - b.helperProportions.height / 2 < l;
            case "pointer":
                var m = (b.positionAbs || b.position.absolute).left + (b.clickOffset || b.offset.click).left,
                    n = (b.positionAbs || b.position.absolute).top + (b.clickOffset || b.offset.click).top,
                    o = a.ui.isOver(n, m, k, i, c.proportions.height, c.proportions.width);
                return o;
            case "touch":
                return (g >= k && g <= l || h >= k && h <= l || g < k && h > l) && (e >= i && e <= j || f >= i &&
                    f <= j || e < i && f > j);
            default:
                return !1
        }
    }, a.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(b, c) {
            var d = a.ui.ddmanager.droppables[b.options.scope] || [],
                e = c ? c.type : null,
                f = (b.currentItem || b.element).find(":data(droppable)").andSelf();
            droppablesLoop: for (var g = 0; g < d.length; g++) {
                if (d[g].options.disabled || b && !d[g].accept.call(d[g].element[0], b.currentItem || b.element)) continue;
                for (var h = 0; h < f.length; h++)
                    if (f[h] == d[g].element[0]) {
                        d[g].proportions.height = 0;
                        continue droppablesLoop
                    }
                d[g].visible =
                    d[g].element.css("display") != "none";
                if (!d[g].visible) continue;
                e == "mousedown" && d[g]._activate.call(d[g], c), d[g].offset = d[g].element.offset(), d[g].proportions = {
                    width: d[g].element[0].offsetWidth,
                    height: d[g].element[0].offsetHeight
                }
            }
        },
        drop: function(b, c) {
            var d = !1;
            a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
                !this.options || (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0],
                    b.currentItem || b.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, c)))
            });
            return d
        },
        dragStart: function(b, c) {
            b.element.parents(":not(body,html)").bind("scroll.droppable", function() {
                b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
            })
        },
        drag: function(b, c) {
            b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
                if (!(this.options.disabled || this.greedyChild || !this.visible)) {
                    var d = a.ui.intersect(b, this, this.options.tolerance),
                        e = !d && this.isover == 1 ? "isout" : d && this.isover == 0 ? "isover" : null;
                    if (!e) return;
                    var f;
                    if (this.options.greedy) {
                        var g = this.element.parents(":data(droppable):eq(0)");
                        g.length && (f = a.data(g[0], "droppable"), f.greedyChild = e == "isover" ? 1 : 0)
                    }
                    f && e == "isover" && (f.isover = 0, f.isout = 1, f._out.call(f, c)), this[e] = 1, this[e == "isout" ? "isover" : "isout"] = 0, this[e == "isover" ? "_over" : "_out"].call(this, c), f && e == "isout" && (f.isout = 0, f.isover = 1, f._over.call(f, c))
                }
            })
        },
        dragStop: function(b, c) {
            b.element.parents(":not(body,html)").unbind("scroll.droppable"),
                b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
        }
    }
})(jQuery);
(function(a, b) {
    a.widget("ui.resizable", a.ui.mouse, {
            widgetEventPrefix: "resize",
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: "slow",
                animateEasing: "swing",
                aspectRatio: !1,
                autoHide: !1,
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: "e,s,se",
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 1E3
            },
            _create: function() {
                var b = this,
                    c = this.options;
                this.element.addClass("ui-resizable"), a.extend(this, {
                    _aspectRatio: !!c.aspectRatio,
                    aspectRatio: c.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: c.helper || c.ghost || c.animate ? c.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (/relative/.test(this.element.css("position")) && a.browser.opera && this.element.css({
                        position: "relative",
                        top: "auto",
                        left: "auto"
                    }), this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                        position: this.element.css("position"),
                        width: this.element.outerWidth(),
                        height: this.element.outerHeight(),
                        top: this.element.css("top"),
                        left: this.element.css("left")
                    })),
                    this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
                        marginLeft: this.originalElement.css("marginLeft"),
                        marginTop: this.originalElement.css("marginTop"),
                        marginRight: this.originalElement.css("marginRight"),
                        marginBottom: this.originalElement.css("marginBottom")
                    }), this.originalElement.css({
                        marginLeft: 0,
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize",
                        "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                        position: "static",
                        zoom: 1,
                        display: "block"
                    })), this.originalElement.css({
                        margin: this.originalElement.css("margin")
                    }), this._proportionallyResize()), this.handles = c.handles || (a(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se");
                if (this.handles.constructor == String) {
                    this.handles ==
                        "all" && (this.handles = "n,e,s,w,se,sw,ne,nw");
                    var d = this.handles.split(",");
                    this.handles = {};
                    for (var e = 0; e < d.length; e++) {
                        var f = a.trim(d[e]),
                            g = "ui-resizable-" + f,
                            h = a('<div class="ui-resizable-handle ' + g + '"></div>');
                        /sw|se|ne|nw/.test(f) && h.css({
                            zIndex: ++c.zIndex
                        }), "se" == f && h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[f] = ".ui-resizable-" + f, this.element.append(h)
                    }
                }
                this._renderAxis = function(b) {
                        b = b || this.element;
                        for (var c in this.handles) {
                            this.handles[c].constructor == String && (this.handles[c] =
                                a(this.handles[c], this.element).show());
                            if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                                var d = a(this.handles[c], this.element),
                                    e = 0;
                                e = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth();
                                var f = ["padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left"].join("");
                                b.css(f, e), this._proportionallyResize()
                            }
                            if (!a(this.handles[c]).length) continue
                        }
                    }, this._renderAxis(this.element), this._handles = a(".ui-resizable-handle", this.element).disableSelection(),
                    this._handles.mouseover(function() {
                        if (!b.resizing) {
                            if (this.className) var a = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                            b.axis = a && a[1] ? a[1] : "se"
                        }
                    }), c.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").hover(function() {
                        c.disabled || (a(this).removeClass("ui-resizable-autohide"), b._handles.show())
                    }, function() {
                        c.disabled || b.resizing || (a(this).addClass("ui-resizable-autohide"), b._handles.hide())
                    })), this._mouseInit()
            },
            destroy: function() {
                this._mouseDestroy();
                var b = function(b) {
                    a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
                };
                if (this.elementIsWrapper) {
                    b(this.element);
                    var c = this.element;
                    c.after(this.originalElement.css({
                        position: c.css("position"),
                        width: c.outerWidth(),
                        height: c.outerHeight(),
                        top: c.css("top"),
                        left: c.css("left")
                    })).remove()
                }
                this.originalElement.css("resize", this.originalResizeStyle), b(this.originalElement);
                return this
            },
            _mouseCapture: function(b) {
                var c = !1;
                for (var d in this.handles) a(this.handles[d])[0] == b.target && (c = !0);
                return !this.options.disabled && c
            },
            _mouseStart: function(b) {
                var d = this.options,
                    e = this.element.position(),
                    f = this.element;
                this.resizing = !0, this.documentScroll = {
                    top: a(document).scrollTop(),
                    left: a(document).scrollLeft()
                }, (f.is(".ui-draggable") || /absolute/.test(f.css("position"))) && f.css({
                    position: "absolute",
                    top: e.top,
                    left: e.left
                }), a.browser.opera && /relative/.test(f.css("position")) && f.css({
                    position: "relative",
                    top: "auto",
                    left: "auto"
                }), this._renderProxy();
                var g = c(this.helper.css("left")),
                    h = c(this.helper.css("top"));
                d.containment && (g += a(d.containment).scrollLeft() || 0, h += a(d.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                    left: g,
                    top: h
                }, this.size = this._helper ? {
                    width: f.outerWidth(),
                    height: f.outerHeight()
                } : {
                    width: f.width(),
                    height: f.height()
                }, this.originalSize = this._helper ? {
                    width: f.outerWidth(),
                    height: f.outerHeight()
                } : {
                    width: f.width(),
                    height: f.height()
                }, this.originalPosition = {
                    left: g,
                    top: h
                }, this.sizeDiff = {
                    width: f.outerWidth() -
                        f.width(),
                    height: f.outerHeight() - f.height()
                }, this.originalMousePosition = {
                    left: b.pageX,
                    top: b.pageY
                }, this.aspectRatio = typeof d.aspectRatio == "number" ? d.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
                var i = a(".ui-resizable-" + this.axis).css("cursor");
                a("body").css("cursor", i == "auto" ? this.axis + "-resize" : i), f.addClass("ui-resizable-resizing"), this._propagate("start", b);
                return !0
            },
            _mouseDrag: function(b) {
                var c = this.helper,
                    d = this.options,
                    e = {},
                    f = this,
                    g = this.originalMousePosition,
                    h = this.axis,
                    i = b.pageX - g.left || 0,
                    j = b.pageY - g.top || 0,
                    k = this._change[h];
                if (!k) return !1;
                var l = k.apply(this, [b, i, j]),
                    m = a.browser.msie && a.browser.version < 7,
                    n = this.sizeDiff;
                this._updateVirtualBoundaries(b.shiftKey);
                if (this._aspectRatio || b.shiftKey) l = this._updateRatio(l, b);
                l = this._respectSize(l, b), this._propagate("resize", b), c.css({
                        top: this.position.top + "px",
                        left: this.position.left + "px",
                        width: this.size.width + "px",
                        height: this.size.height + "px"
                    }), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(),
                    this._updateCache(l), this._trigger("resize", b, this.ui());
                return !1
            },
            _mouseStop: function(b) {
                this.resizing = !1;
                var c = this.options,
                    d = this;
                if (this._helper) {
                    var e = this._proportionallyResizeElements,
                        f = e.length && /textarea/i.test(e[0].nodeName),
                        g = f && a.ui.hasScroll(e[0], "left") ? 0 : d.sizeDiff.height,
                        h = f ? 0 : d.sizeDiff.width,
                        i = {
                            width: d.helper.width() - h,
                            height: d.helper.height() - g
                        },
                        j = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null,
                        k = parseInt(d.element.css("top"), 10) + (d.position.top -
                            d.originalPosition.top) || null;
                    c.animate || this.element.css(a.extend(i, {
                        top: k,
                        left: j
                    })), d.helper.height(d.size.height), d.helper.width(d.size.width), this._helper && !c.animate && this._proportionallyResize()
                }
                a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove();
                return !1
            },
            _updateVirtualBoundaries: function(a) {
                var b = this.options,
                    c, e, f, g, h;
                h = {
                    minWidth: d(b.minWidth) ? b.minWidth : 0,
                    maxWidth: d(b.maxWidth) ? b.maxWidth : Infinity,
                    minHeight: d(b.minHeight) ? b.minHeight : 0,
                    maxHeight: d(b.maxHeight) ? b.maxHeight : Infinity
                };
                if (this._aspectRatio || a) c = h.minHeight * this.aspectRatio, f = h.minWidth / this.aspectRatio, e = h.maxHeight * this.aspectRatio, g = h.maxWidth / this.aspectRatio, c > h.minWidth && (h.minWidth = c), f > h.minHeight && (h.minHeight = f), e < h.maxWidth && (h.maxWidth = e), g < h.maxHeight && (h.maxHeight = g);
                this._vBoundaries = h
            },
            _updateCache: function(a) {
                var b = this.options;
                this.offset = this.helper.offset(), d(a.left) && (this.position.left = a.left), d(a.top) && (this.position.top =
                    a.top), d(a.height) && (this.size.height = a.height), d(a.width) && (this.size.width = a.width)
            },
            _updateRatio: function(a, b) {
                var c = this.options,
                    e = this.position,
                    f = this.size,
                    g = this.axis;
                d(a.height) ? a.width = a.height * this.aspectRatio : d(a.width) && (a.height = a.width / this.aspectRatio), g == "sw" && (a.left = e.left + (f.width - a.width), a.top = null), g == "nw" && (a.top = e.top + (f.height - a.height), a.left = e.left + (f.width - a.width));
                return a
            },
            _respectSize: function(a, b) {
                var c = this.helper,
                    e = this._vBoundaries,
                    f = this._aspectRatio || b.shiftKey,
                    g = this.axis,
                    h = d(a.width) && e.maxWidth && e.maxWidth < a.width,
                    i = d(a.height) && e.maxHeight && e.maxHeight < a.height,
                    j = d(a.width) && e.minWidth && e.minWidth > a.width,
                    k = d(a.height) && e.minHeight && e.minHeight > a.height;
                j && (a.width = e.minWidth), k && (a.height = e.minHeight), h && (a.width = e.maxWidth), i && (a.height = e.maxHeight);
                var l = this.originalPosition.left + this.originalSize.width,
                    m = this.position.top + this.size.height,
                    n = /sw|nw|w/.test(g),
                    o = /nw|ne|n/.test(g);
                j && n && (a.left = l - e.minWidth), h && n && (a.left = l - e.maxWidth), k && o && (a.top =
                    m - e.minHeight), i && o && (a.top = m - e.maxHeight);
                var p = !a.width && !a.height;
                p && !a.left && a.top ? a.top = null : p && !a.top && a.left && (a.left = null);
                return a
            },
            _proportionallyResize: function() {
                var b = this.options;
                if (!!this._proportionallyResizeElements.length) {
                    var c = this.helper || this.element;
                    for (var d = 0; d < this._proportionallyResizeElements.length; d++) {
                        var e = this._proportionallyResizeElements[d];
                        if (!this.borderDif) {
                            var f = [e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth")],
                                g = [e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft")];
                            this.borderDif = a.map(f, function(a, b) {
                                var c = parseInt(a, 10) || 0,
                                    d = parseInt(g[b], 10) || 0;
                                return c + d
                            })
                        }
                        if (a.browser.msie && (!!a(c).is(":hidden") || !!a(c).parents(":hidden").length)) continue;
                        e.css({
                            height: c.height() - this.borderDif[0] - this.borderDif[2] || 0,
                            width: c.width() - this.borderDif[1] - this.borderDif[3] || 0
                        })
                    }
                }
            },
            _renderProxy: function() {
                var b = this.element,
                    c = this.options;
                this.elementOffset = b.offset();
                if (this._helper) {
                    this.helper =
                        this.helper || a('<div style="overflow:hidden;"></div>');
                    var d = a.browser.msie && a.browser.version < 7,
                        e = d ? 1 : 0,
                        f = d ? 2 : -1;
                    this.helper.addClass(this._helper).css({
                        width: this.element.outerWidth() + f,
                        height: this.element.outerHeight() + f,
                        position: "absolute",
                        left: this.elementOffset.left - e + "px",
                        top: this.elementOffset.top - e + "px",
                        zIndex: ++c.zIndex
                    }), this.helper.appendTo("body").disableSelection()
                } else this.helper = this.element
            },
            _change: {
                e: function(a, b, c) {
                    return {
                        width: this.originalSize.width + b
                    }
                },
                w: function(a, b, c) {
                    var d =
                        this.options,
                        e = this.originalSize,
                        f = this.originalPosition;
                    return {
                        left: f.left + b,
                        width: e.width - b
                    }
                },
                n: function(a, b, c) {
                    var d = this.options,
                        e = this.originalSize,
                        f = this.originalPosition;
                    return {
                        top: f.top + c,
                        height: e.height - c
                    }
                },
                s: function(a, b, c) {
                    return {
                        height: this.originalSize.height + c
                    }
                },
                se: function(b, c, d) {
                    return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
                },
                sw: function(b, c, d) {
                    return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
                },
                ne: function(b,
                    c, d) {
                    return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
                },
                nw: function(b, c, d) {
                    return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
                }
            },
            _propagate: function(b, c) {
                a.ui.plugin.call(this, b, [c, this.ui()]), b != "resize" && this._trigger(b, c, this.ui())
            },
            plugins: {},
            ui: function() {
                return {
                    originalElement: this.originalElement,
                    element: this.element,
                    helper: this.helper,
                    position: this.position,
                    size: this.size,
                    originalSize: this.originalSize,
                    originalPosition: this.originalPosition
                }
            }
        }),
        a.extend(a.ui.resizable, {
            version: "1.8.17"
        }), a.ui.plugin.add("resizable", "alsoResize", {
            start: function(b, c) {
                var d = a(this).data("resizable"),
                    e = d.options,
                    f = function(b) {
                        a(b).each(function() {
                            var b = a(this);
                            b.data("resizable-alsoresize", {
                                width: parseInt(b.width(), 10),
                                height: parseInt(b.height(), 10),
                                left: parseInt(b.css("left"), 10),
                                top: parseInt(b.css("top"), 10),
                                position: b.css("position")
                            })
                        })
                    };
                typeof e.alsoResize == "object" && !e.alsoResize.parentNode ? e.alsoResize.length ? (e.alsoResize = e.alsoResize[0], f(e.alsoResize)) :
                    a.each(e.alsoResize, function(a) {
                        f(a)
                    }) : f(e.alsoResize)
            },
            resize: function(b, c) {
                var d = a(this).data("resizable"),
                    e = d.options,
                    f = d.originalSize,
                    g = d.originalPosition,
                    h = {
                        height: d.size.height - f.height || 0,
                        width: d.size.width - f.width || 0,
                        top: d.position.top - g.top || 0,
                        left: d.position.left - g.left || 0
                    },
                    i = function(b, e) {
                        a(b).each(function() {
                            var b = a(this),
                                f = a(this).data("resizable-alsoresize"),
                                g = {},
                                i = e && e.length ? e : b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                            a.each(i, function(a,
                                b) {
                                var c = (f[b] || 0) + (h[b] || 0);
                                c && c >= 0 && (g[b] = c || null)
                            }), a.browser.opera && /relative/.test(b.css("position")) && (d._revertToRelativePosition = !0, b.css({
                                position: "absolute",
                                top: "auto",
                                left: "auto"
                            })), b.css(g)
                        })
                    };
                typeof e.alsoResize == "object" && !e.alsoResize.nodeType ? a.each(e.alsoResize, function(a, b) {
                    i(a, b)
                }) : i(e.alsoResize)
            },
            stop: function(b, c) {
                var d = a(this).data("resizable"),
                    e = d.options,
                    f = function(b) {
                        a(b).each(function() {
                            var b = a(this);
                            b.css({
                                position: b.data("resizable-alsoresize").position
                            })
                        })
                    };
                d._revertToRelativePosition &&
                    (d._revertToRelativePosition = !1, typeof e.alsoResize == "object" && !e.alsoResize.nodeType ? a.each(e.alsoResize, function(a) {
                        f(a)
                    }) : f(e.alsoResize)), a(this).removeData("resizable-alsoresize")
            }
        }), a.ui.plugin.add("resizable", "animate", {
            stop: function(b, c) {
                var d = a(this).data("resizable"),
                    e = d.options,
                    f = d._proportionallyResizeElements,
                    g = f.length && /textarea/i.test(f[0].nodeName),
                    h = g && a.ui.hasScroll(f[0], "left") ? 0 : d.sizeDiff.height,
                    i = g ? 0 : d.sizeDiff.width,
                    j = {
                        width: d.size.width - i,
                        height: d.size.height - h
                    },
                    k = parseInt(d.element.css("left"),
                        10) + (d.position.left - d.originalPosition.left) || null,
                    l = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
                d.element.animate(a.extend(j, l && k ? {
                    top: l,
                    left: k
                } : {}), {
                    duration: e.animateDuration,
                    easing: e.animateEasing,
                    step: function() {
                        var c = {
                            width: parseInt(d.element.css("width"), 10),
                            height: parseInt(d.element.css("height"), 10),
                            top: parseInt(d.element.css("top"), 10),
                            left: parseInt(d.element.css("left"), 10)
                        };
                        f && f.length && a(f[0]).css({
                                width: c.width,
                                height: c.height
                            }), d._updateCache(c),
                            d._propagate("resize", b)
                    }
                })
            }
        }), a.ui.plugin.add("resizable", "containment", {
            start: function(b, d) {
                var e = a(this).data("resizable"),
                    f = e.options,
                    g = e.element,
                    h = f.containment,
                    i = h instanceof a ? h.get(0) : /parent/.test(h) ? g.parent().get(0) : h;
                if (!!i) {
                    e.containerElement = a(i);
                    if (/document/.test(h) || h == document) e.containerOffset = {
                        left: 0,
                        top: 0
                    }, e.containerPosition = {
                        left: 0,
                        top: 0
                    }, e.parentData = {
                        element: a(document),
                        left: 0,
                        top: 0,
                        width: a(document).width(),
                        height: a(document).height() || document.body.parentNode.scrollHeight
                    };
                    else {
                        var j = a(i),
                            k = [];
                        a(["Top", "Right", "Left", "Bottom"]).each(function(a, b) {
                            k[a] = c(j.css("padding" + b))
                        }), e.containerOffset = j.offset(), e.containerPosition = j.position(), e.containerSize = {
                            height: j.innerHeight() - k[3],
                            width: j.innerWidth() - k[1]
                        };
                        var l = e.containerOffset,
                            m = e.containerSize.height,
                            n = e.containerSize.width,
                            o = a.ui.hasScroll(i, "left") ? i.scrollWidth : n,
                            p = a.ui.hasScroll(i) ? i.scrollHeight : m;
                        e.parentData = {
                            element: i,
                            left: l.left,
                            top: l.top,
                            width: o,
                            height: p
                        }
                    }
                }
            },
            resize: function(b, c) {
                var d = a(this).data("resizable"),
                    e = d.options,
                    f = d.containerSize,
                    g = d.containerOffset,
                    h = d.size,
                    i = d.position,
                    j = d._aspectRatio || b.shiftKey,
                    k = {
                        top: 0,
                        left: 0
                    },
                    l = d.containerElement;
                l[0] != document && /static/.test(l.css("position")) && (k = g), i.left < (d._helper ? g.left : 0) && (d.size.width = d.size.width + (d._helper ? d.position.left - g.left : d.position.left - k.left), j && (d.size.height = d.size.width / e.aspectRatio), d.position.left = e.helper ? g.left : 0), i.top < (d._helper ? g.top : 0) && (d.size.height = d.size.height + (d._helper ? d.position.top - g.top : d.position.top), j && (d.size.width =
                    d.size.height * e.aspectRatio), d.position.top = d._helper ? g.top : 0), d.offset.left = d.parentData.left + d.position.left, d.offset.top = d.parentData.top + d.position.top;
                var m = Math.abs((d._helper ? d.offset.left - k.left : d.offset.left - k.left) + d.sizeDiff.width),
                    n = Math.abs((d._helper ? d.offset.top - k.top : d.offset.top - g.top) + d.sizeDiff.height),
                    o = d.containerElement.get(0) == d.element.parent().get(0),
                    p = /relative|absolute/.test(d.containerElement.css("position"));
                o && p && (m -= d.parentData.left), m + d.size.width >= d.parentData.width &&
                    (d.size.width = d.parentData.width - m, j && (d.size.height = d.size.width / d.aspectRatio)), n + d.size.height >= d.parentData.height && (d.size.height = d.parentData.height - n, j && (d.size.width = d.size.height * d.aspectRatio))
            },
            stop: function(b, c) {
                var d = a(this).data("resizable"),
                    e = d.options,
                    f = d.position,
                    g = d.containerOffset,
                    h = d.containerPosition,
                    i = d.containerElement,
                    j = a(d.helper),
                    k = j.offset(),
                    l = j.outerWidth() - d.sizeDiff.width,
                    m = j.outerHeight() - d.sizeDiff.height;
                d._helper && !e.animate && /relative/.test(i.css("position")) && a(this).css({
                    left: k.left -
                        h.left - g.left,
                    width: l,
                    height: m
                }), d._helper && !e.animate && /static/.test(i.css("position")) && a(this).css({
                    left: k.left - h.left - g.left,
                    width: l,
                    height: m
                })
            }
        }), a.ui.plugin.add("resizable", "ghost", {
            start: function(b, c) {
                var d = a(this).data("resizable"),
                    e = d.options,
                    f = d.size;
                d.ghost = d.originalElement.clone(), d.ghost.css({
                    opacity: .25,
                    display: "block",
                    position: "relative",
                    height: f.height,
                    width: f.width,
                    margin: 0,
                    left: 0,
                    top: 0
                }).addClass("ui-resizable-ghost").addClass(typeof e.ghost == "string" ? e.ghost : ""), d.ghost.appendTo(d.helper)
            },
            resize: function(b, c) {
                var d = a(this).data("resizable"),
                    e = d.options;
                d.ghost && d.ghost.css({
                    position: "relative",
                    height: d.size.height,
                    width: d.size.width
                })
            },
            stop: function(b, c) {
                var d = a(this).data("resizable"),
                    e = d.options;
                d.ghost && d.helper && d.helper.get(0).removeChild(d.ghost.get(0))
            }
        }), a.ui.plugin.add("resizable", "grid", {
            resize: function(b, c) {
                var d = a(this).data("resizable"),
                    e = d.options,
                    f = d.size,
                    g = d.originalSize,
                    h = d.originalPosition,
                    i = d.axis,
                    j = e._aspectRatio || b.shiftKey;
                e.grid = typeof e.grid == "number" ? [e.grid,
                    e.grid
                ] : e.grid;
                var k = Math.round((f.width - g.width) / (e.grid[0] || 1)) * (e.grid[0] || 1),
                    l = Math.round((f.height - g.height) / (e.grid[1] || 1)) * (e.grid[1] || 1);
                /^(se|s|e)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l) : /^(ne)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l) : /^(sw)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.left = h.left - k) : (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l, d.position.left = h.left - k)
            }
        });
    var c =
        function(a) {
            return parseInt(a, 10) || 0
        },
        d = function(a) {
            return !isNaN(parseInt(a, 10))
        }
})(jQuery);
(function(a, b) {
    a.widget("ui.selectable", a.ui.mouse, {
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        },
        _create: function() {
            var b = this;
            this.element.addClass("ui-selectable"), this.dragged = !1;
            var c;
            this.refresh = function() {
                c = a(b.options.filter, b.element[0]), c.addClass("ui-selectee"), c.each(function() {
                    var b = a(this),
                        c = b.offset();
                    a.data(this, "selectable-item", {
                        element: this,
                        $element: b,
                        left: c.left,
                        top: c.top,
                        right: c.left + b.outerWidth(),
                        bottom: c.top + b.outerHeight(),
                        startselected: !1,
                        selected: b.hasClass("ui-selected"),
                        selecting: b.hasClass("ui-selecting"),
                        unselecting: b.hasClass("ui-unselecting")
                    })
                })
            }, this.refresh(), this.selectees = c.addClass("ui-selectee"), this._mouseInit(), this.helper = a("<div class='ui-selectable-helper'></div>")
        },
        destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"), this._mouseDestroy();
            return this
        },
        _mouseStart: function(b) {
            var c =
                this;
            this.opos = [b.pageX, b.pageY];
            if (!this.options.disabled) {
                var d = this.options;
                this.selectees = a(d.filter, this.element[0]), this._trigger("start", b), a(d.appendTo).append(this.helper), this.helper.css({
                    left: b.clientX,
                    top: b.clientY,
                    width: 0,
                    height: 0
                }), d.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                    var d = a.data(this, "selectable-item");
                    d.startselected = !0, !b.metaKey && !b.ctrlKey && (d.$element.removeClass("ui-selected"), d.selected = !1, d.$element.addClass("ui-unselecting"),
                        d.unselecting = !0, c._trigger("unselecting", b, {
                            unselecting: d.element
                        }))
                }), a(b.target).parents().andSelf().each(function() {
                    var d = a.data(this, "selectable-item");
                    if (d) {
                        var e = !b.metaKey && !b.ctrlKey || !d.$element.hasClass("ui-selected");
                        d.$element.removeClass(e ? "ui-unselecting" : "ui-selected").addClass(e ? "ui-selecting" : "ui-unselecting"), d.unselecting = !e, d.selecting = e, d.selected = e, e ? c._trigger("selecting", b, {
                            selecting: d.element
                        }) : c._trigger("unselecting", b, {
                            unselecting: d.element
                        });
                        return !1
                    }
                })
            }
        },
        _mouseDrag: function(b) {
            var c =
                this;
            this.dragged = !0;
            if (!this.options.disabled) {
                var d = this.options,
                    e = this.opos[0],
                    f = this.opos[1],
                    g = b.pageX,
                    h = b.pageY;
                if (e > g) {
                    var i = g;
                    g = e, e = i
                }
                if (f > h) {
                    var i = h;
                    h = f, f = i
                }
                this.helper.css({
                    left: e,
                    top: f,
                    width: g - e,
                    height: h - f
                }), this.selectees.each(function() {
                    var i = a.data(this, "selectable-item");
                    if (!!i && i.element != c.element[0]) {
                        var j = !1;
                        d.tolerance == "touch" ? j = !(i.left > g || i.right < e || i.top > h || i.bottom < f) : d.tolerance == "fit" && (j = i.left > e && i.right < g && i.top > f && i.bottom < h), j ? (i.selected && (i.$element.removeClass("ui-selected"),
                            i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, c._trigger("selecting", b, {
                            selecting: i.element
                        }))) : (i.selecting && ((b.metaKey || b.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), c._trigger("unselecting",
                            b, {
                                unselecting: i.element
                            }))), i.selected && !b.metaKey && !b.ctrlKey && !i.startselected && (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, c._trigger("unselecting", b, {
                            unselecting: i.element
                        })))
                    }
                });
                return !1
            }
        },
        _mouseStop: function(b) {
            var c = this;
            this.dragged = !1;
            var d = this.options;
            a(".ui-unselecting", this.element[0]).each(function() {
                var d = a.data(this, "selectable-item");
                d.$element.removeClass("ui-unselecting"), d.unselecting = !1, d.startselected = !1, c._trigger("unselected",
                    b, {
                        unselected: d.element
                    })
            }), a(".ui-selecting", this.element[0]).each(function() {
                var d = a.data(this, "selectable-item");
                d.$element.removeClass("ui-selecting").addClass("ui-selected"), d.selecting = !1, d.selected = !0, d.startselected = !0, c._trigger("selected", b, {
                    selected: d.element
                })
            }), this._trigger("stop", b), this.helper.remove();
            return !1
        }
    }), a.extend(a.ui.selectable, {
        version: "1.8.17"
    })
})(jQuery);
(function(a, b) {
    a.widget("ui.sortable", a.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1E3
        },
        _create: function() {
            var a = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"),
                this.refresh(), this.floating = this.items.length ? a.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1, this.offset = this.element.offset(), this._mouseInit()
        },
        destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
            for (var a = this.items.length - 1; a >= 0; a--) this.items[a].item.removeData(this.widgetName + "-item");
            return this
        },
        _setOption: function(b, c) {
            b === "disabled" ? (this.options[b] = c, this.widget()[c ?
                "addClass" : "removeClass"]("ui-sortable-disabled")) : a.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function(b, c) {
            var d = this;
            if (this.reverting) return !1;
            if (this.options.disabled || this.options.type == "static") return !1;
            this._refreshItems(b);
            var e = null,
                f = this,
                g = a(b.target).parents().each(function() {
                    if (a.data(this, d.widgetName + "-item") == f) {
                        e = a(this);
                        return !1
                    }
                });
            a.data(b.target, d.widgetName + "-item") == f && (e = a(b.target));
            if (!e) return !1;
            if (this.options.handle && !c) {
                var h = !1;
                a(this.options.handle,
                    e).find("*").andSelf().each(function() {
                    this == b.target && (h = !0)
                });
                if (!h) return !1
            }
            this.currentItem = e, this._removeCurrentsFromItems();
            return !0
        },
        _mouseStart: function(b, c, d) {
            var e = this.options,
                f = this;
            this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                },
                this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), a.extend(this.offset, {
                    click: {
                        left: b.pageX - this.offset.left,
                        top: b.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] != this.currentItem[0] &&
                this.currentItem.hide(), this._createPlaceholder(), e.containment && this._setContainment(), e.cursor && (a("body").css("cursor") && (this._storedCursor = a("body").css("cursor")), a("body").css("cursor", e.cursor)), e.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", e.opacity)), e.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", e.zIndex)), this.scrollParent[0] != document && this.scrollParent[0].tagName !=
                "HTML" && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions();
            if (!d)
                for (var g = this.containers.length - 1; g >= 0; g--) this.containers[g]._trigger("activate", b, f._uiHash(this));
            a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(b);
            return !0
        },
        _mouseDrag: function(b) {
            this.position =
                this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs);
            if (this.options.scroll) {
                var c = this.options,
                    d = !1;
                this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < c.scrollSensitivity ? this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop + c.scrollSpeed : b.pageY - this.overflowOffset.top < c.scrollSensitivity && (this.scrollParent[0].scrollTop =
                    d = this.scrollParent[0].scrollTop - c.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < c.scrollSensitivity ? this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft + c.scrollSpeed : b.pageX - this.overflowOffset.left < c.scrollSensitivity && (this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft - c.scrollSpeed)) : (b.pageY - a(document).scrollTop() < c.scrollSensitivity ? d = a(document).scrollTop(a(document).scrollTop() - c.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) <
                    c.scrollSensitivity && (d = a(document).scrollTop(a(document).scrollTop() + c.scrollSpeed)), b.pageX - a(document).scrollLeft() < c.scrollSensitivity ? d = a(document).scrollLeft(a(document).scrollLeft() - c.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < c.scrollSensitivity && (d = a(document).scrollLeft(a(document).scrollLeft() + c.scrollSpeed))), d !== !1 && a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis ||
                this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            for (var e = this.items.length - 1; e >= 0; e--) {
                var f = this.items[e],
                    g = f.item[0],
                    h = this._intersectsWithPointer(f);
                if (!h) continue;
                if (g != this.currentItem[0] && this.placeholder[h == 1 ? "next" : "prev"]()[0] != g && !a.ui.contains(this.placeholder[0], g) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], g) : !0)) {
                    this.direction = h == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(f)) this._rearrange(b, f);
                    else break;
                    this._trigger("change", b, this._uiHash());
                    break
                }
            }
            this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs;
            return !1
        },
        _mouseStop: function(b, c) {
            if (!!b) {
                a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b);
                if (this.options.revert) {
                    var d = this,
                        e = d.placeholder.offset();
                    d.reverting = !0, a(this.helper).animate({
                        left: e.left -
                            this.offset.parent.left - d.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: e.top - this.offset.parent.top - d.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    }, parseInt(this.options.revert, 10) || 500, function() {
                        d._clear(b)
                    })
                } else this._clear(b, c);
                return !1
            }
        },
        cancel: function() {
            var b = this;
            if (this.dragging) {
                this._mouseUp({
                        target: null
                    }), this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") :
                    this.currentItem.show();
                for (var c = this.containers.length - 1; c >= 0; c--) this.containers[c]._trigger("deactivate", null, b._uiHash(this)), this.containers[c].containerCache.over && (this.containers[c]._trigger("out", null, b._uiHash(this)), this.containers[c].containerCache.over = 0)
            }
            this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem));
            return this
        },
        serialize: function(b) {
            var c = this._getItemsAsjQuery(b && b.connected),
                d = [];
            b = b || {}, a(c).each(function() {
                var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[-=_](.+)/);
                c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]))
            }), !d.length && b.key && d.push(b.key + "=");
            return d.join("&")
        },
        toArray: function(b) {
            var c =
                this._getItemsAsjQuery(b && b.connected),
                d = [];
            b = b || {}, c.each(function() {
                d.push(a(b.item || this).attr(b.attribute || "id") || "")
            });
            return d
        },
        _intersectsWith: function(a) {
            var b = this.positionAbs.left,
                c = b + this.helperProportions.width,
                d = this.positionAbs.top,
                e = d + this.helperProportions.height,
                f = a.left,
                g = f + a.width,
                h = a.top,
                i = h + a.height,
                j = this.offset.click.top,
                k = this.offset.click.left,
                l = d + j > h && d + j < i && b + k > f && b + k < g;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance !=
                "pointer" && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? l : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i
        },
        _intersectsWithPointer: function(b) {
            var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top, b.height),
                d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left, b.width),
                e = c && d,
                f = this._getDragVerticalDirection(),
                g = this._getDragHorizontalDirection();
            if (!e) return !1;
            return this.floating ? g && g == "right" || f == "down" ? 2 : 1 : f && (f == "down" ? 2 : 1)
        },
        _intersectsWithSides: function(b) {
            var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top + b.height / 2, b.height),
                d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left + b.width / 2, b.width),
                e = this._getDragVerticalDirection(),
                f = this._getDragHorizontalDirection();
            return this.floating && f ? f == "right" && d || f == "left" && !d : e && (e == "down" && c || e == "up" && !c)
        },
        _getDragVerticalDirection: function() {
            var a = this.positionAbs.top -
                this.lastPositionAbs.top;
            return a != 0 && (a > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var a = this.positionAbs.left - this.lastPositionAbs.left;
            return a != 0 && (a > 0 ? "right" : "left")
        },
        refresh: function(a) {
            this._refreshItems(a), this.refreshPositions();
            return this
        },
        _connectWith: function() {
            var a = this.options;
            return a.connectWith.constructor == String ? [a.connectWith] : a.connectWith
        },
        _getItemsAsjQuery: function(b) {
            var c = this,
                d = [],
                e = [],
                f = this._connectWith();
            if (f && b)
                for (var g = f.length - 1; g >= 0; g--) {
                    var h = a(f[g]);
                    for (var i = h.length - 1; i >= 0; i--) {
                        var j = a.data(h[i], this.widgetName);
                        j && j != this && !j.options.disabled && e.push([a.isFunction(j.options.items) ? j.options.items.call(j.element) : a(j.options.items, j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), j])
                    }
                }
            e.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (var g =
                    e.length - 1; g >= 0; g--) e[g][0].each(function() {
                d.push(this)
            });
            return a(d)
        },
        _removeCurrentsFromItems: function() {
            var a = this.currentItem.find(":data(" + this.widgetName + "-item)");
            for (var b = 0; b < this.items.length; b++)
                for (var c = 0; c < a.length; c++) a[c] == this.items[b].item[0] && this.items.splice(b, 1)
        },
        _refreshItems: function(b) {
            this.items = [], this.containers = [this];
            var c = this.items,
                d = this,
                e = [
                    [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {
                            item: this.currentItem
                        }) : a(this.options.items, this.element),
                        this
                    ]
                ],
                f = this._connectWith();
            if (f)
                for (var g = f.length - 1; g >= 0; g--) {
                    var h = a(f[g]);
                    for (var i = h.length - 1; i >= 0; i--) {
                        var j = a.data(h[i], this.widgetName);
                        j && j != this && !j.options.disabled && (e.push([a.isFunction(j.options.items) ? j.options.items.call(j.element[0], b, {
                            item: this.currentItem
                        }) : a(j.options.items, j.element), j]), this.containers.push(j))
                    }
                }
            for (var g = e.length - 1; g >= 0; g--) {
                var k = e[g][1],
                    l = e[g][0];
                for (var i = 0, m = l.length; i < m; i++) {
                    var n = a(l[i]);
                    n.data(this.widgetName + "-item", k), c.push({
                        item: n,
                        instance: k,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function(b) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            for (var c = this.items.length - 1; c >= 0; c--) {
                var d = this.items[c];
                if (d.instance != this.currentContainer && this.currentContainer && d.item[0] != this.currentItem[0]) continue;
                var e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item;
                b || (d.width = e.outerWidth(), d.height = e.outerHeight());
                var f = e.offset();
                d.left = f.left, d.top = f.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else
                for (var c = this.containers.length - 1; c >= 0; c--) {
                    var f = this.containers[c].element.offset();
                    this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight()
                }
            return this
        },
        _createPlaceholder: function(b) {
            var c = b || this,
                d = c.options;
            if (!d.placeholder || d.placeholder.constructor == String) {
                var e = d.placeholder;
                d.placeholder = {
                    element: function() {
                        var b = a(document.createElement(c.currentItem[0].nodeName)).addClass(e || c.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        e || (b.style.visibility = "hidden");
                        return b
                    },
                    update: function(a, b) {
                        if (!e || !!d.forcePlaceholderSize) b.height() || b.height(c.currentItem.innerHeight() - parseInt(c.currentItem.css("paddingTop") || 0, 10) - parseInt(c.currentItem.css("paddingBottom") || 0, 10)), b.width() || b.width(c.currentItem.innerWidth() - parseInt(c.currentItem.css("paddingLeft") ||
                            0, 10) - parseInt(c.currentItem.css("paddingRight") || 0, 10))
                    }
                }
            }
            c.placeholder = a(d.placeholder.element.call(c.element, c.currentItem)), c.currentItem.after(c.placeholder), d.placeholder.update(c, c.placeholder)
        },
        _contactContainers: function(b) {
            var c = null,
                d = null;
            for (var e = this.containers.length - 1; e >= 0; e--) {
                if (a.ui.contains(this.currentItem[0], this.containers[e].element[0])) continue;
                if (this._intersectsWith(this.containers[e].containerCache)) {
                    if (c && a.ui.contains(this.containers[e].element[0], c.element[0])) continue;
                    c = this.containers[e], d = e
                } else this.containers[e].containerCache.over && (this.containers[e]._trigger("out", b, this._uiHash(this)), this.containers[e].containerCache.over = 0)
            }
            if (!!c)
                if (this.containers.length === 1) this.containers[d]._trigger("over", b, this._uiHash(this)), this.containers[d].containerCache.over = 1;
                else if (this.currentContainer != this.containers[d]) {
                var f = 1E4,
                    g = null,
                    h = this.positionAbs[this.containers[d].floating ? "left" : "top"];
                for (var i = this.items.length - 1; i >= 0; i--) {
                    if (!a.ui.contains(this.containers[d].element[0],
                            this.items[i].item[0])) continue;
                    var j = this.items[i][this.containers[d].floating ? "left" : "top"];
                    Math.abs(j - h) < f && (f = Math.abs(j - h), g = this.items[i])
                }
                if (!g && !this.options.dropOnEmpty) return;
                this.currentContainer = this.containers[d], g ? this._rearrange(b, g, null, !0) : this._rearrange(b, null, this.containers[d].element, !0), this._trigger("change", b, this._uiHash()), this.containers[d]._trigger("change", b, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[d]._trigger("over",
                    b, this._uiHash(this)), this.containers[d].containerCache.over = 1
            }
        },
        _createHelper: function(b) {
            var c = this.options,
                d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : c.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            d.parents("body").length || a(c.appendTo != "parent" ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] == this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), (d[0].style.width == "" || c.forceHelperSize) && d.width(this.currentItem.width()), (d[0].style.height == "" || c.forceHelperSize) && d.height(this.currentItem.height());
            return d
        },
        _adjustOffsetFromHelper: function(b) {
            typeof b == "string" && (b = b.split(" ")), a.isArray(b) && (b = {
                    left: +b[0],
                    top: +b[1] || 0
                }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left),
                "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName &&
                this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) b = {
                top: 0,
                left: 0
            };
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var a = this.currentItem.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var b = this.options;
            b.containment == "parent" && (b.containment = this.helper[0].parentNode);
            if (b.containment == "document" || b.containment == "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left,
                0 - this.offset.relative.top - this.offset.parent.top, a(b.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(b.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
            ];
            if (!/^(document|window|parent)$/.test(b.containment)) {
                var c = a(b.containment)[0],
                    d = a(b.containment).offset(),
                    e = a(c).css("overflow") != "hidden";
                this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) ||
                    0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (e ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (e ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"),
                    10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function(b, c) {
            c || (c = this.position);
            var d = b == "absolute" ? 1 : -1,
                e = this.options,
                f = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                g = /(html|body)/i.test(f[0].tagName);
            return {
                top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() :
                    g ? 0 : f.scrollTop()) * d),
                left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)
            }
        },
        _generatePosition: function(b) {
            var c = this.options,
                d = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                e = /(html|body)/i.test(d[0].tagName);
            this.cssPosition == "relative" && (this.scrollParent[0] ==
                document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
            var f = b.pageX,
                g = b.pageY;
            if (this.originalPosition) {
                this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] &&
                    (g = this.containment[3] + this.offset.click.top));
                if (c.grid) {
                    var h = this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1];
                    g = this.containment ? h - this.offset.click.top < this.containment[1] || h - this.offset.click.top > this.containment[3] ? h - this.offset.click.top < this.containment[1] ? h + c.grid[1] : h - c.grid[1] : h : h;
                    var i = this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0];
                    f = this.containment ? i - this.offset.click.left < this.containment[0] || i - this.offset.click.left > this.containment[2] ?
                        i - this.offset.click.left < this.containment[0] ? i + c.grid[0] : i - c.grid[0] : i : i
                }
            }
            return {
                top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
            }
        },
        _rearrange: function(a,
            b, c, d) {
            c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var e = this,
                f = this.counter;
            window.setTimeout(function() {
                f == e.counter && e.refreshPositions(!d)
            }, 0)
        },
        _clear: function(b, c) {
            this.reverting = !1;
            var d = [],
                e = this;
            !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var f in this._storedCSS)
                    if (this._storedCSS[f] ==
                        "auto" || this._storedCSS[f] == "static") this._storedCSS[f] = "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            this.fromOutside && !c && d.push(function(a) {
                this._trigger("receive", a, this._uiHash(this.fromOutside))
            }), (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !c && d.push(function(a) {
                this._trigger("update", a, this._uiHash())
            });
            if (!a.ui.contains(this.element[0],
                    this.currentItem[0])) {
                c || d.push(function(a) {
                    this._trigger("remove", a, this._uiHash())
                });
                for (var f = this.containers.length - 1; f >= 0; f--) a.ui.contains(this.containers[f].element[0], this.currentItem[0]) && !c && (d.push(function(a) {
                    return function(b) {
                        a._trigger("receive", b, this._uiHash(this))
                    }
                }.call(this, this.containers[f])), d.push(function(a) {
                    return function(b) {
                        a._trigger("update", b, this._uiHash(this))
                    }
                }.call(this, this.containers[f])))
            }
            for (var f = this.containers.length - 1; f >= 0; f--) c || d.push(function(a) {
                return function(b) {
                    a._trigger("deactivate",
                        b, this._uiHash(this))
                }
            }.call(this, this.containers[f])), this.containers[f].containerCache.over && (d.push(function(a) {
                return function(b) {
                    a._trigger("out", b, this._uiHash(this))
                }
            }.call(this, this.containers[f])), this.containers[f].containerCache.over = 0);
            this._storedCursor && a("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex), this.dragging = !1;
            if (this.cancelHelperRemoval) {
                if (!c) {
                    this._trigger("beforeStop",
                        b, this._uiHash());
                    for (var f = 0; f < d.length; f++) d[f].call(this, b);
                    this._trigger("stop", b, this._uiHash())
                }
                return !1
            }
            c || this._trigger("beforeStop", b, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null;
            if (!c) {
                for (var f = 0; f < d.length; f++) d[f].call(this, b);
                this._trigger("stop", b, this._uiHash())
            }
            this.fromOutside = !1;
            return !0
        },
        _trigger: function() {
            a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function(b) {
            var c = b || this;
            return {
                helper: c.helper,
                placeholder: c.placeholder || a([]),
                position: c.position,
                originalPosition: c.originalPosition,
                offset: c.positionAbs,
                item: c.currentItem,
                sender: b ? b.element : null
            }
        }
    }), a.extend(a.ui.sortable, {
        version: "1.8.17"
    })
})(jQuery);
(function(a, b) {
    a.widget("ui.accordion", {
        options: {
            active: 0,
            animated: "slide",
            autoHeight: !0,
            clearStyle: !1,
            collapsible: !1,
            event: "click",
            fillSpace: !1,
            header: "> li > :first-child,> :not(li):even",
            icons: {
                header: "ui-icon-triangle-1-e",
                headerSelected: "ui-icon-triangle-1-s"
            },
            navigation: !1,
            navigationFilter: function() {
                return this.href.toLowerCase() === location.href.toLowerCase()
            }
        },
        _create: function() {
            var b = this,
                c = b.options;
            b.running = 0, b.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"),
                b.headers = b.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function() {
                    c.disabled || a(this).addClass("ui-state-hover")
                }).bind("mouseleave.accordion", function() {
                    c.disabled || a(this).removeClass("ui-state-hover")
                }).bind("focus.accordion", function() {
                    c.disabled || a(this).addClass("ui-state-focus")
                }).bind("blur.accordion", function() {
                    c.disabled || a(this).removeClass("ui-state-focus")
                }), b.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
            if (c.navigation) {
                var d = b.element.find("a").filter(c.navigationFilter).eq(0);
                if (d.length) {
                    var e = d.closest(".ui-accordion-header");
                    e.length ? b.active = e : b.active = d.closest(".ui-accordion-content").prev()
                }
            }
            b.active = b._findActive(b.active || c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"), b.active.next().addClass("ui-accordion-content-active"), b._createIcons(), b.resize(), b.element.attr("role", "tablist"), b.headers.attr("role", "tab").bind("keydown.accordion",
                function(a) {
                    return b._keydown(a)
                }).next().attr("role", "tabpanel"), b.headers.not(b.active || "").attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).next().hide(), b.active.length ? b.active.attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }) : b.headers.eq(0).attr("tabIndex", 0), a.browser.safari || b.headers.find("a").attr("tabIndex", -1), c.event && b.headers.bind(c.event.split(" ").join(".accordion ") + ".accordion", function(a) {
                b._clickHandler.call(b, a, this), a.preventDefault()
            })
        },
        _createIcons: function() {
            var b =
                this.options;
            b.icons && (a("<span></span>").addClass("ui-icon " + b.icons.header).prependTo(this.headers), this.active.children(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected), this.element.addClass("ui-accordion-icons"))
        },
        _destroyIcons: function() {
            this.headers.children(".ui-icon").remove(), this.element.removeClass("ui-accordion-icons")
        },
        destroy: function() {
            var b = this.options;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"),
                this.headers.find("a").removeAttr("tabIndex"), this._destroyIcons();
            var c = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
            (b.autoHeight || b.fillHeight) && c.css("height", "");
            return a.Widget.prototype.destroy.call(this)
        },
        _setOption: function(b, c) {
            a.Widget.prototype._setOption.apply(this, arguments), b == "active" && this.activate(c), b == "icons" && (this._destroyIcons(),
                c && this._createIcons()), b == "disabled" && this.headers.add(this.headers.next())[c ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
        },
        _keydown: function(b) {
            if (!(this.options.disabled || b.altKey || b.ctrlKey)) {
                var c = a.ui.keyCode,
                    d = this.headers.length,
                    e = this.headers.index(b.target),
                    f = !1;
                switch (b.keyCode) {
                    case c.RIGHT:
                    case c.DOWN:
                        f = this.headers[(e + 1) % d];
                        break;
                    case c.LEFT:
                    case c.UP:
                        f = this.headers[(e - 1 + d) % d];
                        break;
                    case c.SPACE:
                    case c.ENTER:
                        this._clickHandler({
                            target: b.target
                        }, b.target), b.preventDefault()
                }
                if (f) {
                    a(b.target).attr("tabIndex", -1), a(f).attr("tabIndex", 0), f.focus();
                    return !1
                }
                return !0
            }
        },
        resize: function() {
            var b = this.options,
                c;
            if (b.fillSpace) {
                if (a.browser.msie) {
                    var d = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden")
                }
                c = this.element.parent().height(), a.browser.msie && this.element.parent().css("overflow", d), this.headers.each(function() {
                    c -= a(this).outerHeight(!0)
                }), this.headers.next().each(function() {
                    a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()))
                }).css("overflow", "auto")
            } else b.autoHeight &&
                (c = 0, this.headers.next().each(function() {
                    c = Math.max(c, a(this).height("").height())
                }).height(c));
            return this
        },
        activate: function(a) {
            this.options.active = a;
            var b = this._findActive(a)[0];
            this._clickHandler({
                target: b
            }, b);
            return this
        },
        _findActive: function(b) {
            return b ? typeof b == "number" ? this.headers.filter(":eq(" + b + ")") : this.headers.not(this.headers.not(b)) : b === !1 ? a([]) : this.headers.filter(":eq(0)")
        },
        _clickHandler: function(b, c) {
            var d = this.options;
            if (!d.disabled) {
                if (!b.target) {
                    if (!d.collapsible) return;
                    this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header),
                        this.active.next().addClass("ui-accordion-content-active");
                    var e = this.active.next(),
                        f = {
                            options: d,
                            newHeader: a([]),
                            oldHeader: d.active,
                            newContent: a([]),
                            oldContent: e
                        },
                        g = this.active = a([]);
                    this._toggle(g, e, f);
                    return
                }
                var h = a(b.currentTarget || c),
                    i = h[0] === this.active[0];
                d.active = d.collapsible && i ? !1 : this.headers.index(h);
                if (this.running || !d.collapsible && i) return;
                var j = this.active,
                    g = h.next(),
                    e = this.active.next(),
                    f = {
                        options: d,
                        newHeader: i && d.collapsible ? a([]) : h,
                        oldHeader: this.active,
                        newContent: i && d.collapsible ?
                            a([]) : g,
                        oldContent: e
                    },
                    k = this.headers.index(this.active[0]) > this.headers.index(h[0]);
                this.active = i ? a([]) : h, this._toggle(g, e, f, i, k), j.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header), i || (h.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected), h.next().addClass("ui-accordion-content-active"));
                return
            }
        },
        _toggle: function(b, c, d, e, f) {
            var g = this,
                h = g.options;
            g.toShow = b, g.toHide = c, g.data = d;
            var i = function() {
                if (!!g) return g._completed.apply(g, arguments)
            };
            g._trigger("changestart", null, g.data), g.running = c.size() === 0 ? b.size() : c.size();
            if (h.animated) {
                var j = {};
                h.collapsible && e ? j = {
                    toShow: a([]),
                    toHide: c,
                    complete: i,
                    down: f,
                    autoHeight: h.autoHeight || h.fillSpace
                } : j = {
                    toShow: b,
                    toHide: c,
                    complete: i,
                    down: f,
                    autoHeight: h.autoHeight || h.fillSpace
                }, h.proxied || (h.proxied = h.animated), h.proxiedDuration || (h.proxiedDuration =
                    h.duration), h.animated = a.isFunction(h.proxied) ? h.proxied(j) : h.proxied, h.duration = a.isFunction(h.proxiedDuration) ? h.proxiedDuration(j) : h.proxiedDuration;
                var k = a.ui.accordion.animations,
                    l = h.duration,
                    m = h.animated;
                m && !k[m] && !a.easing[m] && (m = "slide"), k[m] || (k[m] = function(a) {
                    this.slide(a, {
                        easing: m,
                        duration: l || 700
                    })
                }), k[m](j)
            } else h.collapsible && e ? b.toggle() : (c.hide(), b.show()), i(!0);
            c.prev().attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).blur(), b.prev().attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }).focus()
        },
        _completed: function(a) {
            this.running = a ? 0 : --this.running;
            this.running || (this.options.clearStyle && this.toShow.add(this.toHide).css({
                height: "",
                overflow: ""
            }), this.toHide.removeClass("ui-accordion-content-active"), this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className), this._trigger("change", null, this.data))
        }
    }), a.extend(a.ui.accordion, {
        version: "1.8.17",
        animations: {
            slide: function(b, c) {
                b = a.extend({
                        easing: "swing",
                        duration: 300
                    },
                    b, c);
                if (!b.toHide.size()) b.toShow.animate({
                    height: "show",
                    paddingTop: "show",
                    paddingBottom: "show"
                }, b);
                else {
                    if (!b.toShow.size()) {
                        b.toHide.animate({
                            height: "hide",
                            paddingTop: "hide",
                            paddingBottom: "hide"
                        }, b);
                        return
                    }
                    var d = b.toShow.css("overflow"),
                        e = 0,
                        f = {},
                        g = {},
                        h = ["height", "paddingTop", "paddingBottom"],
                        i, j = b.toShow;
                    i = j[0].style.width, j.width(j.parent().width() - parseFloat(j.css("paddingLeft")) - parseFloat(j.css("paddingRight")) - (parseFloat(j.css("borderLeftWidth")) || 0) - (parseFloat(j.css("borderRightWidth")) ||
                        0)), a.each(h, function(c, d) {
                        g[d] = "hide";
                        var e = ("" + a.css(b.toShow[0], d)).match(/^([\d+-.]+)(.*)$/);
                        f[d] = {
                            value: e[1],
                            unit: e[2] || "px"
                        }
                    }), b.toShow.css({
                        height: 0,
                        overflow: "hidden"
                    }).show(), b.toHide.filter(":hidden").each(b.complete).end().filter(":visible").animate(g, {
                        step: function(a, c) {
                            c.prop == "height" && (e = c.end - c.start === 0 ? 0 : (c.now - c.start) / (c.end - c.start)), b.toShow[0].style[c.prop] = e * f[c.prop].value + f[c.prop].unit
                        },
                        duration: b.duration,
                        easing: b.easing,
                        complete: function() {
                            b.autoHeight || b.toShow.css("height",
                                ""), b.toShow.css({
                                width: i,
                                overflow: d
                            }), b.complete()
                        }
                    })
                }
            },
            bounceslide: function(a) {
                this.slide(a, {
                    easing: a.down ? "easeOutBounce" : "swing",
                    duration: a.down ? 1E3 : 200
                })
            }
        }
    })
})(jQuery);
(function(a, b) {
    var c = 0;
    a.widget("ui.autocomplete", {
        options: {
            appendTo: "body",
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null
        },
        pending: 0,
        _create: function() {
            var b = this,
                c = this.element[0].ownerDocument,
                d;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                    role: "textbox",
                    "aria-autocomplete": "list",
                    "aria-haspopup": "true"
                }).bind("keydown.autocomplete", function(c) {
                    if (!b.options.disabled && !b.element.propAttr("readOnly")) {
                        d = !1;
                        var e = a.ui.keyCode;
                        switch (c.keyCode) {
                            case e.PAGE_UP:
                                b._move("previousPage", c);
                                break;
                            case e.PAGE_DOWN:
                                b._move("nextPage", c);
                                break;
                            case e.UP:
                                b._move("previous", c), c.preventDefault();
                                break;
                            case e.DOWN:
                                b._move("next", c), c.preventDefault();
                                break;
                            case e.ENTER:
                            case e.NUMPAD_ENTER:
                                b.menu.active && (d = !0, c.preventDefault());
                            case e.TAB:
                                if (!b.menu.active) return;
                                b.menu.select(c);
                                break;
                            case e.ESCAPE:
                                b.element.val(b.term), b.close(c);
                                break;
                            default:
                                clearTimeout(b.searching), b.searching = setTimeout(function() {
                                    b.term !=
                                        b.element.val() && (b.selectedItem = null, b.search(null, c))
                                }, b.options.delay)
                        }
                    }
                }).bind("keypress.autocomplete", function(a) {
                    d && (d = !1, a.preventDefault())
                }).bind("focus.autocomplete", function() {
                    b.options.disabled || (b.selectedItem = null, b.previous = b.element.val())
                }).bind("blur.autocomplete", function(a) {
                    b.options.disabled || (clearTimeout(b.searching), b.closing = setTimeout(function() {
                        b.close(a), b._change(a)
                    }, 150))
                }), this._initSource(), this.response = function() {
                    return b._response.apply(b, arguments)
                }, this.menu = a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo ||
                    "body", c)[0]).mousedown(function(c) {
                    var d = b.menu.element[0];
                    a(c.target).closest(".ui-menu-item").length || setTimeout(function() {
                        a(document).one("mousedown", function(c) {
                            c.target !== b.element[0] && c.target !== d && !a.ui.contains(d, c.target) && b.close()
                        })
                    }, 1), setTimeout(function() {
                        clearTimeout(b.closing)
                    }, 13)
                }).menu({
                    focus: function(a, c) {
                        var d = c.item.data("item.autocomplete");
                        !1 !== b._trigger("focus", a, {
                            item: d
                        }) && /^key/.test(a.originalEvent.type) && b.element.val(d.value)
                    },
                    selected: function(a, d) {
                        var e = d.item.data("item.autocomplete"),
                            f = b.previous;
                        b.element[0] !== c.activeElement && (b.element.focus(), b.previous = f, setTimeout(function() {
                            b.previous = f, b.selectedItem = e
                        }, 1)), !1 !== b._trigger("select", a, {
                            item: e
                        }) && b.element.val(e.value), b.term = b.element.val(), b.close(a), b.selectedItem = e
                    },
                    blur: function(a, c) {
                        b.menu.element.is(":visible") && b.element.val() !== b.term && b.element.val(b.term)
                    }
                }).zIndex(this.element.zIndex() + 1).css({
                    top: 0,
                    left: 0
                }).hide().data("menu"), a.fn.bgiframe && this.menu.element.bgiframe(), b.beforeunloadHandler = function() {
                    b.element.removeAttr("autocomplete")
                },
                a(window).bind("beforeunload", b.beforeunloadHandler)
        },
        destroy: function() {
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"), this.menu.element.remove(), a(window).unbind("beforeunload", this.beforeunloadHandler), a.Widget.prototype.destroy.call(this)
        },
        _setOption: function(b, c) {
            a.Widget.prototype._setOption.apply(this, arguments), b === "source" && this._initSource(), b === "appendTo" && this.menu.element.appendTo(a(c ||
                "body", this.element[0].ownerDocument)[0]), b === "disabled" && c && this.xhr && this.xhr.abort()
        },
        _initSource: function() {
            var b = this,
                d, e;
            a.isArray(this.options.source) ? (d = this.options.source, this.source = function(b, c) {
                c(a.ui.autocomplete.filter(d, b.term))
            }) : typeof this.options.source == "string" ? (e = this.options.source, this.source = function(d, f) {
                b.xhr && b.xhr.abort(), b.xhr = a.ajax({
                    url: e,
                    data: d,
                    dataType: "json",
                    autocompleteRequest: ++c,
                    success: function(a, b) {
                        this.autocompleteRequest === c && f(a)
                    },
                    error: function() {
                        this.autocompleteRequest ===
                            c && f([])
                    }
                })
            }) : this.source = this.options.source
        },
        search: function(a, b) {
            a = a != null ? a : this.element.val(), this.term = this.element.val();
            if (a.length < this.options.minLength) return this.close(b);
            clearTimeout(this.closing);
            if (this._trigger("search", b) !== !1) return this._search(a)
        },
        _search: function(a) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.source({
                term: a
            }, this.response)
        },
        _response: function(a) {
            !this.options.disabled && a && a.length ? (a = this._normalize(a), this._suggest(a), this._trigger("open")) :
                this.close(), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading")
        },
        close: function(a) {
            clearTimeout(this.closing), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.deactivate(), this._trigger("close", a))
        },
        _change: function(a) {
            this.previous !== this.element.val() && this._trigger("change", a, {
                item: this.selectedItem
            })
        },
        _normalize: function(b) {
            if (b.length && b[0].label && b[0].value) return b;
            return a.map(b, function(b) {
                if (typeof b == "string") return {
                    label: b,
                    value: b
                };
                return a.extend({
                    label: b.label ||
                        b.value,
                    value: b.value || b.label
                }, b)
            })
        },
        _suggest: function(b) {
            var c = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(c, b), this.menu.deactivate(), this.menu.refresh(), c.show(), this._resizeMenu(), c.position(a.extend({
                of: this.element
            }, this.options.position)), this.options.autoFocus && this.menu.next(new a.Event("mouseover"))
        },
        _resizeMenu: function() {
            var a = this.menu.element;
            a.outerWidth(Math.max(a.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(b, c) {
            var d =
                this;
            a.each(c, function(a, c) {
                d._renderItem(b, c)
            })
        },
        _renderItem: function(b, c) {
            return a("<li></li>").data("item.autocomplete", c).append(a("<a></a>").text(c.label)).appendTo(b)
        },
        _move: function(a, b) {
            if (!this.menu.element.is(":visible")) this.search(null, b);
            else {
                if (this.menu.first() && /^previous/.test(a) || this.menu.last() && /^next/.test(a)) {
                    this.element.val(this.term), this.menu.deactivate();
                    return
                }
                this.menu[a](b)
            }
        },
        widget: function() {
            return this.menu.element
        }
    }), a.extend(a.ui.autocomplete, {
        escapeRegex: function(a) {
            return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,
                "\\$&")
        },
        filter: function(b, c) {
            var d = new RegExp(a.ui.autocomplete.escapeRegex(c), "i");
            return a.grep(b, function(a) {
                return d.test(a.label || a.value || a)
            })
        }
    })
})(jQuery),
function(a) {
    a.widget("ui.menu", {
        _create: function() {
            var b = this;
            this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                role: "listbox",
                "aria-activedescendant": "ui-active-menuitem"
            }).click(function(c) {
                !a(c.target).closest(".ui-menu-item a").length || (c.preventDefault(), b.select(c))
            }), this.refresh()
        },
        refresh: function() {
            var b =
                this,
                c = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
            c.children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function(c) {
                b.activate(c, a(this).parent())
            }).mouseleave(function() {
                b.deactivate()
            })
        },
        activate: function(a, b) {
            this.deactivate();
            if (this.hasScroll()) {
                var c = b.offset().top - this.element.offset().top,
                    d = this.element.scrollTop(),
                    e = this.element.height();
                c < 0 ? this.element.scrollTop(d + c) : c >= e && this.element.scrollTop(d + c - e + b.height())
            }
            this.active =
                b.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end(), this._trigger("focus", a, {
                    item: b
                })
        },
        deactivate: function() {
            !this.active || (this.active.children("a").removeClass("ui-state-hover").removeAttr("id"), this._trigger("blur"), this.active = null)
        },
        next: function(a) {
            this.move("next", ".ui-menu-item:first", a)
        },
        previous: function(a) {
            this.move("prev", ".ui-menu-item:last", a)
        },
        first: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        last: function() {
            return this.active &&
                !this.active.nextAll(".ui-menu-item").length
        },
        move: function(a, b, c) {
            if (!this.active) this.activate(c, this.element.children(b));
            else {
                var d = this.active[a + "All"](".ui-menu-item").eq(0);
                d.length ? this.activate(c, d) : this.activate(c, this.element.children(b))
            }
        },
        nextPage: function(b) {
            if (this.hasScroll()) {
                if (!this.active || this.last()) {
                    this.activate(b, this.element.children(".ui-menu-item:first"));
                    return
                }
                var c = this.active.offset().top,
                    d = this.element.height(),
                    e = this.element.children(".ui-menu-item").filter(function() {
                        var b =
                            a(this).offset().top - c - d + a(this).height();
                        return b < 10 && b > -10
                    });
                e.length || (e = this.element.children(".ui-menu-item:last")), this.activate(b, e)
            } else this.activate(b, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
        },
        previousPage: function(b) {
            if (this.hasScroll()) {
                if (!this.active || this.first()) {
                    this.activate(b, this.element.children(".ui-menu-item:last"));
                    return
                }
                var c = this.active.offset().top,
                    d = this.element.height();
                result = this.element.children(".ui-menu-item").filter(function() {
                    var b =
                        a(this).offset().top - c + d - a(this).height();
                    return b < 10 && b > -10
                }), result.length || (result = this.element.children(".ui-menu-item:first")), this.activate(b, result)
            } else this.activate(b, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
        },
        hasScroll: function() {
            return this.element.height() < this.element[a.fn.prop ? "prop" : "attr"]("scrollHeight")
        },
        select: function(a) {
            this._trigger("selected", a, {
                item: this.active
            })
        }
    })
}(jQuery);
(function(a, b) {
    var c = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
        d = {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        e = {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        },
        f = a.attrFn || {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0,
            click: !0
        };
    a.widget("ui.dialog", {
        options: {
            autoOpen: !0,
            buttons: {},
            closeOnEscape: !0,
            closeText: "close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: !1,
            maxWidth: !1,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                collision: "fit",
                using: function(b) {
                    var c = a(this).css(b).offset().top;
                    c < 0 && a(this).css("top", b.top - c)
                }
            },
            resizable: !0,
            show: null,
            stack: !0,
            title: "",
            width: 300,
            zIndex: 1E3
        },
        _create: function() {
            this.originalTitle = this.element.attr("title"), typeof this.originalTitle != "string" && (this.originalTitle = ""), this.options.title = this.options.title || this.originalTitle;
            var b = this,
                d = b.options,
                e = d.title || "&#160;",
                f = a.ui.dialog.getTitleId(b.element),
                g = (b.uiDialog = a("<div></div>")).appendTo(document.body).hide().addClass(c +
                    d.dialogClass).css({
                    zIndex: d.zIndex
                }).attr("tabIndex", -1).css("outline", 0).keydown(function(c) {
                    d.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault())
                }).attr({
                    role: "dialog",
                    "aria-labelledby": f
                }).mousedown(function(a) {
                    b.moveToTop(!1, a)
                }),
                h = b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g),
                i = (b.uiDialogTitlebar = a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),
                j = a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function() {
                    j.addClass("ui-state-hover")
                }, function() {
                    j.removeClass("ui-state-hover")
                }).focus(function() {
                    j.addClass("ui-state-focus")
                }).blur(function() {
                    j.removeClass("ui-state-focus")
                }).click(function(a) {
                    b.close(a);
                    return !1
                }).appendTo(i),
                k = (b.uiDialogTitlebarCloseText = a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(j),
                l = a("<span></span>").addClass("ui-dialog-title").attr("id",
                    f).html(e).prependTo(i);
            a.isFunction(d.beforeclose) && !a.isFunction(d.beforeClose) && (d.beforeClose = d.beforeclose), i.find("*").add(i).disableSelection(), d.draggable && a.fn.draggable && b._makeDraggable(), d.resizable && a.fn.resizable && b._makeResizable(), b._createButtons(d.buttons), b._isOpen = !1, a.fn.bgiframe && g.bgiframe()
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        destroy: function() {
            var a = this;
            a.overlay && a.overlay.destroy(), a.uiDialog.hide(), a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),
                a.uiDialog.remove(), a.originalTitle && a.element.attr("title", a.originalTitle);
            return a
        },
        widget: function() {
            return this.uiDialog
        },
        close: function(b) {
            var c = this,
                d, e;
            if (!1 !== c._trigger("beforeClose", b)) {
                c.overlay && c.overlay.destroy(), c.uiDialog.unbind("keypress.ui-dialog"), c._isOpen = !1, c.options.hide ? c.uiDialog.hide(c.options.hide, function() {
                    c._trigger("close", b)
                }) : (c.uiDialog.hide(), c._trigger("close", b)), a.ui.dialog.overlay.resize(), c.options.modal && (d = 0, a(".ui-dialog").each(function() {
                    this !== c.uiDialog[0] &&
                        (e = a(this).css("z-index"), isNaN(e) || (d = Math.max(d, e)))
                }), a.ui.dialog.maxZ = d);
                return c
            }
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function(b, c) {
            var d = this,
                e = d.options,
                f;
            if (e.modal && !b || !e.stack && !e.modal) return d._trigger("focus", c);
            e.zIndex > a.ui.dialog.maxZ && (a.ui.dialog.maxZ = e.zIndex), d.overlay && (a.ui.dialog.maxZ += 1, d.overlay.$el.css("z-index", a.ui.dialog.overlay.maxZ = a.ui.dialog.maxZ)), f = {
                scrollTop: d.element.scrollTop(),
                scrollLeft: d.element.scrollLeft()
            }, a.ui.dialog.maxZ += 1, d.uiDialog.css("z-index",
                a.ui.dialog.maxZ), d.element.attr(f), d._trigger("focus", c);
            return d
        },
        open: function() {
            if (!this._isOpen) {
                var b = this,
                    c = b.options,
                    d = b.uiDialog;
                b.overlay = c.modal ? new a.ui.dialog.overlay(b) : null, b._size(), b._position(c.position), d.show(c.show), b.moveToTop(!0), c.modal && d.bind("keydown.ui-dialog", function(b) {
                        if (b.keyCode === a.ui.keyCode.TAB) {
                            var c = a(":tabbable", this),
                                d = c.filter(":first"),
                                e = c.filter(":last");
                            if (b.target === e[0] && !b.shiftKey) {
                                d.focus(1);
                                return !1
                            }
                            if (b.target === d[0] && b.shiftKey) {
                                e.focus(1);
                                return !1
                            }
                        }
                    }),
                    a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus(), b._isOpen = !0, b._trigger("open");
                return b
            }
        },
        _createButtons: function(b) {
            var c = this,
                d = !1,
                e = a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
                g = a("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);
            c.uiDialog.find(".ui-dialog-buttonpane").remove(), typeof b == "object" && b !== null && a.each(b, function() {
                return !(d = !0)
            }), d && (a.each(b, function(b,
                d) {
                d = a.isFunction(d) ? {
                    click: d,
                    text: b
                } : d;
                var e = a('<button type="button"></button>').click(function() {
                    d.click.apply(c.element[0], arguments)
                }).appendTo(g);
                a.each(d, function(a, b) {
                    a !== "click" && (a in f ? e[a](b) : e.attr(a, b))
                }), a.fn.button && e.button()
            }), e.appendTo(c.uiDialog))
        },
        _makeDraggable: function() {
            function f(a) {
                return {
                    position: a.position,
                    offset: a.offset
                }
            }
            var b = this,
                c = b.options,
                d = a(document),
                e;
            b.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(d, g) {
                    e = c.height === "auto" ? "auto" : a(this).height(), a(this).height(a(this).height()).addClass("ui-dialog-dragging"), b._trigger("dragStart", d, f(g))
                },
                drag: function(a, c) {
                    b._trigger("drag", a, f(c))
                },
                stop: function(g, h) {
                    c.position = [h.position.left - d.scrollLeft(), h.position.top - d.scrollTop()], a(this).removeClass("ui-dialog-dragging").height(e), b._trigger("dragStop", g, f(h)), a.ui.dialog.overlay.resize()
                }
            })
        },
        _makeResizable: function(c) {
            function h(a) {
                return {
                    originalPosition: a.originalPosition,
                    originalSize: a.originalSize,
                    position: a.position,
                    size: a.size
                }
            }
            c = c === b ? this.options.resizable : c;
            var d = this,
                e = d.options,
                f = d.uiDialog.css("position"),
                g = typeof c == "string" ? c : "n,e,s,w,se,sw,ne,nw";
            d.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: d.element,
                maxWidth: e.maxWidth,
                maxHeight: e.maxHeight,
                minWidth: e.minWidth,
                minHeight: d._minHeight(),
                handles: g,
                start: function(b, c) {
                    a(this).addClass("ui-dialog-resizing"), d._trigger("resizeStart", b, h(c))
                },
                resize: function(a, b) {
                    d._trigger("resize", a, h(b))
                },
                stop: function(b,
                    c) {
                    a(this).removeClass("ui-dialog-resizing"), e.height = a(this).height(), e.width = a(this).width(), d._trigger("resizeStop", b, h(c)), a.ui.dialog.overlay.resize()
                }
            }).css("position", f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        },
        _minHeight: function() {
            var a = this.options;
            return a.height === "auto" ? a.minHeight : Math.min(a.minHeight, a.height)
        },
        _position: function(b) {
            var c = [],
                d = [0, 0],
                e;
            if (b) {
                if (typeof b == "string" || typeof b == "object" && "0" in b) c = b.split ? b.split(" ") : [b[0], b[1]], c.length ===
                    1 && (c[1] = c[0]), a.each(["left", "top"], function(a, b) {
                        +c[a] === c[a] && (d[a] = c[a], c[a] = b)
                    }), b = {
                        my: c.join(" "),
                        at: c.join(" "),
                        offset: d.join(" ")
                    };
                b = a.extend({}, a.ui.dialog.prototype.options.position, b)
            } else b = a.ui.dialog.prototype.options.position;
            e = this.uiDialog.is(":visible"), e || this.uiDialog.show(), this.uiDialog.css({
                top: 0,
                left: 0
            }).position(a.extend({
                of: window
            }, b)), e || this.uiDialog.hide()
        },
        _setOptions: function(b) {
            var c = this,
                f = {},
                g = !1;
            a.each(b, function(a, b) {
                c._setOption(a, b), a in d && (g = !0), a in e && (f[a] =
                    b)
            }), g && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", f)
        },
        _setOption: function(b, d) {
            var e = this,
                f = e.uiDialog;
            switch (b) {
                case "beforeclose":
                    b = "beforeClose";
                    break;
                case "buttons":
                    e._createButtons(d);
                    break;
                case "closeText":
                    e.uiDialogTitlebarCloseText.text("" + d);
                    break;
                case "dialogClass":
                    f.removeClass(e.options.dialogClass).addClass(c + d);
                    break;
                case "disabled":
                    d ? f.addClass("ui-dialog-disabled") : f.removeClass("ui-dialog-disabled");
                    break;
                case "draggable":
                    var g = f.is(":data(draggable)");
                    g && !d && f.draggable("destroy"), !g && d && e._makeDraggable();
                    break;
                case "position":
                    e._position(d);
                    break;
                case "resizable":
                    var h = f.is(":data(resizable)");
                    h && !d && f.resizable("destroy"), h && typeof d == "string" && f.resizable("option", "handles", d), !h && d !== !1 && e._makeResizable(d);
                    break;
                case "title":
                    a(".ui-dialog-title", e.uiDialogTitlebar).html("" + (d || "&#160;"))
            }
            a.Widget.prototype._setOption.apply(e, arguments)
        },
        _size: function() {
            var b = this.options,
                c, d, e = this.uiDialog.is(":visible");
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                height: 0
            }), b.minWidth > b.width && (b.width = b.minWidth), c = this.uiDialog.css({
                height: "auto",
                width: b.width
            }).height(), d = Math.max(0, b.minHeight - c);
            if (b.height === "auto")
                if (a.support.minHeight) this.element.css({
                    minHeight: d,
                    height: "auto"
                });
                else {
                    this.uiDialog.show();
                    var f = this.element.css("height", "auto").height();
                    e || this.uiDialog.hide(), this.element.height(Math.max(f, d))
                } else this.element.height(Math.max(b.height - c, 0));
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight",
                this._minHeight())
        }
    }), a.extend(a.ui.dialog, {
        version: "1.8.17",
        uuid: 0,
        maxZ: 0,
        getTitleId: function(a) {
            var b = a.attr("id");
            b || (this.uuid += 1, b = this.uuid);
            return "ui-dialog-title-" + b
        },
        overlay: function(b) {
            this.$el = a.ui.dialog.overlay.create(b)
        }
    }), a.extend(a.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function(a) {
            return a + ".dialog-overlay"
        }).join(" "),
        create: function(b) {
            this.instances.length === 0 && (setTimeout(function() {
                a.ui.dialog.overlay.instances.length &&
                    a(document).bind(a.ui.dialog.overlay.events, function(b) {
                        if (a(b.target).zIndex() < a.ui.dialog.overlay.maxZ) return !1
                    })
            }, 1), a(document).bind("keydown.dialog-overlay", function(c) {
                b.options.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault())
            }), a(window).bind("resize.dialog-overlay", a.ui.dialog.overlay.resize));
            var c = (this.oldInstances.pop() || a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            });
            a.fn.bgiframe && c.bgiframe(), this.instances.push(c);
            return c
        },
        destroy: function(b) {
            var c = a.inArray(b, this.instances);
            c != -1 && this.oldInstances.push(this.instances.splice(c, 1)[0]), this.instances.length === 0 && a([document, window]).unbind(".dialog-overlay"), b.remove();
            var d = 0;
            a.each(this.instances, function() {
                d = Math.max(d, this.css("z-index"))
            }), this.maxZ = d
        },
        height: function() {
            var b, c;
            if (a.browser.msie && a.browser.version < 7) {
                b = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), c = Math.max(document.documentElement.offsetHeight,
                    document.body.offsetHeight);
                return b < c ? a(window).height() + "px" : b + "px"
            }
            return a(document).height() + "px"
        },
        width: function() {
            var b, c;
            if (a.browser.msie) {
                b = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), c = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                return b < c ? a(window).width() + "px" : b + "px"
            }
            return a(document).width() + "px"
        },
        resize: function() {
            var b = a([]);
            a.each(a.ui.dialog.overlay.instances, function() {
                b = b.add(this)
            }), b.css({
                width: 0,
                height: 0
            }).css({
                width: a.ui.dialog.overlay.width(),
                height: a.ui.dialog.overlay.height()
            })
        }
    }), a.extend(a.ui.dialog.overlay.prototype, {
        destroy: function() {
            a.ui.dialog.overlay.destroy(this.$el)
        }
    })
})(jQuery);
(function(a, b) {
    var c = 5;
    a.widget("ui.slider", a.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null
        },
        _create: function() {
            var b = this,
                d = this.options,
                e = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                f = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                g = d.values && d.values.length || 1,
                h = [];
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex =
                null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all" + (d.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = a([]), d.range && (d.range === !0 && (d.values || (d.values = [this._valueMin(), this._valueMin()]), d.values.length && d.values.length !== 2 && (d.values = [d.values[0], d.values[0]])), this.range = a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (d.range === "min" ||
                    d.range === "max" ? " ui-slider-range-" + d.range : "")));
            for (var i = e.length; i < g; i += 1) h.push(f);
            this.handles = e.add(a(h.join("")).appendTo(b.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function(a) {
                    a.preventDefault()
                }).hover(function() {
                    d.disabled || a(this).addClass("ui-state-hover")
                }, function() {
                    a(this).removeClass("ui-state-hover")
                }).focus(function() {
                    d.disabled ? a(this).blur() : (a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), a(this).addClass("ui-state-focus"))
                }).blur(function() {
                    a(this).removeClass("ui-state-focus")
                }),
                this.handles.each(function(b) {
                    a(this).data("index.ui-slider-handle", b)
                }), this.handles.keydown(function(d) {
                    var e = !0,
                        f = a(this).data("index.ui-slider-handle"),
                        g, h, i, j;
                    if (!b.options.disabled) {
                        switch (d.keyCode) {
                            case a.ui.keyCode.HOME:
                            case a.ui.keyCode.END:
                            case a.ui.keyCode.PAGE_UP:
                            case a.ui.keyCode.PAGE_DOWN:
                            case a.ui.keyCode.UP:
                            case a.ui.keyCode.RIGHT:
                            case a.ui.keyCode.DOWN:
                            case a.ui.keyCode.LEFT:
                                e = !1;
                                if (!b._keySliding) {
                                    b._keySliding = !0, a(this).addClass("ui-state-active"), g = b._start(d, f);
                                    if (g === !1) return
                                }
                        }
                        j =
                            b.options.step, b.options.values && b.options.values.length ? h = i = b.values(f) : h = i = b.value();
                        switch (d.keyCode) {
                            case a.ui.keyCode.HOME:
                                i = b._valueMin();
                                break;
                            case a.ui.keyCode.END:
                                i = b._valueMax();
                                break;
                            case a.ui.keyCode.PAGE_UP:
                                i = b._trimAlignValue(h + (b._valueMax() - b._valueMin()) / c);
                                break;
                            case a.ui.keyCode.PAGE_DOWN:
                                i = b._trimAlignValue(h - (b._valueMax() - b._valueMin()) / c);
                                break;
                            case a.ui.keyCode.UP:
                            case a.ui.keyCode.RIGHT:
                                if (h === b._valueMax()) return;
                                i = b._trimAlignValue(h + j);
                                break;
                            case a.ui.keyCode.DOWN:
                            case a.ui.keyCode.LEFT:
                                if (h ===
                                    b._valueMin()) return;
                                i = b._trimAlignValue(h - j)
                        }
                        b._slide(d, f, i);
                        return e
                    }
                }).keyup(function(c) {
                    var d = a(this).data("index.ui-slider-handle");
                    b._keySliding && (b._keySliding = !1, b._stop(c, d), b._change(c, d), a(this).removeClass("ui-state-active"))
                }), this._refreshValue(), this._animateOff = !1
        },
        destroy: function() {
            this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"),
                this._mouseDestroy();
            return this
        },
        _mouseCapture: function(b) {
            var c = this.options,
                d, e, f, g, h, i, j, k, l;
            if (c.disabled) return !1;
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), d = {
                x: b.pageX,
                y: b.pageY
            }, e = this._normValueFromMouse(d), f = this._valueMax() - this._valueMin() + 1, h = this, this.handles.each(function(b) {
                var c = Math.abs(e - h.values(b));
                f > c && (f = c, g = a(this), i = b)
            }), c.range === !0 && this.values(1) === c.min && (i += 1, g = a(this.handles[i])), j = this._start(b,
                i);
            if (j === !1) return !1;
            this._mouseSliding = !0, h._handleIndex = i, g.addClass("ui-state-active").focus(), k = g.offset(), l = !a(b.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = l ? {
                left: 0,
                top: 0
            } : {
                left: b.pageX - k.left - g.width() / 2,
                top: b.pageY - k.top - g.height() / 2 - (parseInt(g.css("borderTopWidth"), 10) || 0) - (parseInt(g.css("borderBottomWidth"), 10) || 0) + (parseInt(g.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(b, i, e), this._animateOff = !0;
            return !0
        },
        _mouseStart: function(a) {
            return !0
        },
        _mouseDrag: function(a) {
            var b = {
                    x: a.pageX,
                    y: a.pageY
                },
                c = this._normValueFromMouse(b);
            this._slide(a, this._handleIndex, c);
            return !1
        },
        _mouseStop: function(a) {
            this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1;
            return !1
        },
        _detectOrientation: function() {
            this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(a) {
            var b,
                c, d, e, f;
            this.orientation === "horizontal" ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), d < 0 && (d = 0), this.orientation === "vertical" && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e;
            return this._trimAlignValue(f)
        },
        _start: function(a, b) {
            var c = {
                handle: this.handles[b],
                value: this.value()
            };
            this.options.values && this.options.values.length &&
                (c.value = this.values(b), c.values = this.values());
            return this._trigger("start", a, c)
        },
        _slide: function(a, b, c) {
            var d, e, f;
            this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (b === 0 && c > d || b === 1 && c < d) && (c = d), c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger("slide", a, {
                handle: this.handles[b],
                value: c,
                values: e
            }), d = this.values(b ? 0 : 1), f !== !1 && this.values(b, c, !0))) : c !== this.value() && (f = this._trigger("slide", a, {
                handle: this.handles[b],
                value: c
            }), f !== !1 && this.value(c))
        },
        _stop: function(a, b) {
            var c = {
                handle: this.handles[b],
                value: this.value()
            };
            this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("stop", a, c)
        },
        _change: function(a, b) {
            if (!this._keySliding && !this._mouseSliding) {
                var c = {
                    handle: this.handles[b],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("change", a, c)
            }
        },
        value: function(a) {
            if (arguments.length) this.options.value =
                this._trimAlignValue(a), this._refreshValue(), this._change(null, 0);
            else return this._value()
        },
        values: function(b, c) {
            var d, e, f;
            if (arguments.length > 1) this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), this._change(null, b);
            else {
                if (!arguments.length) return this._values();
                if (!a.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(b) : this.value();
                d = this.options.values, e = arguments[0];
                for (f = 0; f < d.length; f += 1) d[f] = this._trimAlignValue(e[f]), this._change(null,
                    f);
                this._refreshValue()
            }
        },
        _setOption: function(b, c) {
            var d, e = 0;
            a.isArray(this.options.values) && (e = this.options.values.length), a.Widget.prototype._setOption.apply(this, arguments);
            switch (b) {
                case "disabled":
                    c ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.propAttr("disabled", !1), this.element.removeClass("ui-disabled"));
                    break;
                case "orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" +
                        this.orientation), this._refreshValue();
                    break;
                case "value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case "values":
                    this._animateOff = !0, this._refreshValue();
                    for (d = 0; d < e; d += 1) this._change(null, d);
                    this._animateOff = !1
            }
        },
        _value: function() {
            var a = this.options.value;
            a = this._trimAlignValue(a);
            return a
        },
        _values: function(a) {
            var b, c, d;
            if (arguments.length) {
                b = this.options.values[a], b = this._trimAlignValue(b);
                return b
            }
            c = this.options.values.slice();
            for (d = 0; d < c.length; d +=
                1) c[d] = this._trimAlignValue(c[d]);
            return c
        },
        _trimAlignValue: function(a) {
            if (a <= this._valueMin()) return this._valueMin();
            if (a >= this._valueMax()) return this._valueMax();
            var b = this.options.step > 0 ? this.options.step : 1,
                c = (a - this._valueMin()) % b,
                d = a - c;
            Math.abs(c) * 2 >= b && (d += c > 0 ? b : -b);
            return parseFloat(d.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var b = this.options.range,
                c = this.options,
                d = this,
                e = this._animateOff ? !1 : c.animate,
                f, g = {},
                h, i, j, k;
            this.options.values && this.options.values.length ? this.handles.each(function(b, i) {
                f = (d.values(b) - d._valueMin()) / (d._valueMax() - d._valueMin()) * 100, g[d.orientation === "horizontal" ? "left" : "bottom"] = f + "%", a(this).stop(1, 1)[e ? "animate" : "css"](g, c.animate), d.options.range === !0 && (d.orientation === "horizontal" ? (b === 0 && d.range.stop(1, 1)[e ? "animate" : "css"]({
                    left: f + "%"
                }, c.animate), b === 1 && d.range[e ? "animate" : "css"]({
                    width: f - h + "%"
                }, {
                    queue: !1,
                    duration: c.animate
                })) : (b === 0 && d.range.stop(1, 1)[e ? "animate" :
                    "css"]({
                    bottom: f + "%"
                }, c.animate), b === 1 && d.range[e ? "animate" : "css"]({
                    height: f - h + "%"
                }, {
                    queue: !1,
                    duration: c.animate
                }))), h = f
            }) : (i = this.value(), j = this._valueMin(), k = this._valueMax(), f = k !== j ? (i - j) / (k - j) * 100 : 0, g[d.orientation === "horizontal" ? "left" : "bottom"] = f + "%", this.handle.stop(1, 1)[e ? "animate" : "css"](g, c.animate), b === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[e ? "animate" : "css"]({
                width: f + "%"
            }, c.animate), b === "max" && this.orientation === "horizontal" && this.range[e ? "animate" : "css"]({
                width: 100 -
                    f + "%"
            }, {
                queue: !1,
                duration: c.animate
            }), b === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[e ? "animate" : "css"]({
                height: f + "%"
            }, c.animate), b === "max" && this.orientation === "vertical" && this.range[e ? "animate" : "css"]({
                height: 100 - f + "%"
            }, {
                queue: !1,
                duration: c.animate
            }))
        }
    }), a.extend(a.ui.slider, {
        version: "1.8.17"
    })
})(jQuery);
(function(a, b) {
    function f() {
        return ++d
    }

    function e() {
        return ++c
    }
    var c = 0,
        d = 0;
    a.widget("ui.tabs", {
        options: {
            add: null,
            ajaxOptions: null,
            cache: !1,
            cookie: null,
            collapsible: !1,
            disable: null,
            disabled: [],
            enable: null,
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            load: null,
            panelTemplate: "<div></div>",
            remove: null,
            select: null,
            show: null,
            spinner: "<em>Loading&#8230;</em>",
            tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
        },
        _create: function() {
            this._tabify(!0)
        },
        _setOption: function(a, b) {
            if (a == "selected") {
                if (this.options.collapsible &&
                    b == this.options.selected) return;
                this.select(b)
            } else this.options[a] = b, this._tabify()
        },
        _tabId: function(a) {
            return a.title && a.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + e()
        },
        _sanitizeSelector: function(a) {
            return a.replace(/:/g, "\\:")
        },
        _cookie: function() {
            var b = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + f());
            return a.cookie.apply(null, [b].concat(a.makeArray(arguments)))
        },
        _ui: function(a, b) {
            return {
                tab: a,
                panel: b,
                index: this.anchors.index(a)
            }
        },
        _cleanup: function() {
            this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function() {
                var b =
                    a(this);
                b.html(b.data("label.tabs")).removeData("label.tabs")
            })
        },
        _tabify: function(c) {
            function m(b, c) {
                b.css("display", ""), !a.support.opacity && c.opacity && b[0].style.removeAttribute("filter")
            }
            var d = this,
                e = this.options,
                f = /^#.+/;
            this.list = this.element.find("ol,ul").eq(0), this.lis = a(" > li:has(a[href])", this.list), this.anchors = this.lis.map(function() {
                    return a("a", this)[0]
                }), this.panels = a([]), this.anchors.each(function(b, c) {
                    var g = a(c).attr("href"),
                        h = g.split("#")[0],
                        i;
                    h && (h === location.toString().split("#")[0] ||
                        (i = a("base")[0]) && h === i.href) && (g = c.hash, c.href = g);
                    if (f.test(g)) d.panels = d.panels.add(d.element.find(d._sanitizeSelector(g)));
                    else if (g && g !== "#") {
                        a.data(c, "href.tabs", g), a.data(c, "load.tabs", g.replace(/#.*$/, ""));
                        var j = d._tabId(c);
                        c.href = "#" + j;
                        var k = d.element.find("#" + j);
                        k.length || (k = a(e.panelTemplate).attr("id", j).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(d.panels[b - 1] || d.list), k.data("destroy.tabs", !0)), d.panels = d.panels.add(k)
                    } else e.disabled.push(b)
                }), c ? (this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"),
                    this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.lis.addClass("ui-state-default ui-corner-top"), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"), e.selected === b ? (location.hash && this.anchors.each(function(a, b) {
                        if (b.hash == location.hash) {
                            e.selected = a;
                            return !1
                        }
                    }), typeof e.selected != "number" && e.cookie && (e.selected = parseInt(d._cookie(), 10)), typeof e.selected != "number" && this.lis.filter(".ui-tabs-selected").length && (e.selected =
                        this.lis.index(this.lis.filter(".ui-tabs-selected"))), e.selected = e.selected || (this.lis.length ? 0 : -1)) : e.selected === null && (e.selected = -1), e.selected = e.selected >= 0 && this.anchors[e.selected] || e.selected < 0 ? e.selected : 0, e.disabled = a.unique(e.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"), function(a, b) {
                        return d.lis.index(a)
                    }))).sort(), a.inArray(e.selected, e.disabled) != -1 && e.disabled.splice(a.inArray(e.selected, e.disabled), 1), this.panels.addClass("ui-tabs-hide"), this.lis.removeClass("ui-tabs-selected ui-state-active"),
                    e.selected >= 0 && this.anchors.length && (d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash)).removeClass("ui-tabs-hide"), this.lis.eq(e.selected).addClass("ui-tabs-selected ui-state-active"), d.element.queue("tabs", function() {
                        d._trigger("show", null, d._ui(d.anchors[e.selected], d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash))[0]))
                    }), this.load(e.selected)), a(window).bind("unload", function() {
                        d.lis.add(d.anchors).unbind(".tabs"), d.lis = d.anchors = d.panels = null
                    })) : e.selected = this.lis.index(this.lis.filter(".ui-tabs-selected")),
                this.element[e.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible"), e.cookie && this._cookie(e.selected, e.cookie);
            for (var g = 0, h; h = this.lis[g]; g++) a(h)[a.inArray(g, e.disabled) != -1 && !a(h).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled");
            e.cache === !1 && this.anchors.removeData("cache.tabs"), this.lis.add(this.anchors).unbind(".tabs");
            if (e.event !== "mouseover") {
                var i = function(a, b) {
                        b.is(":not(.ui-state-disabled)") && b.addClass("ui-state-" + a)
                    },
                    j = function(a, b) {
                        b.removeClass("ui-state-" +
                            a)
                    };
                this.lis.bind("mouseover.tabs", function() {
                    i("hover", a(this))
                }), this.lis.bind("mouseout.tabs", function() {
                    j("hover", a(this))
                }), this.anchors.bind("focus.tabs", function() {
                    i("focus", a(this).closest("li"))
                }), this.anchors.bind("blur.tabs", function() {
                    j("focus", a(this).closest("li"))
                })
            }
            var k, l;
            e.fx && (a.isArray(e.fx) ? (k = e.fx[0], l = e.fx[1]) : k = l = e.fx);
            var n = l ? function(b, c) {
                    a(b).closest("li").addClass("ui-tabs-selected ui-state-active"), c.hide().removeClass("ui-tabs-hide").animate(l, l.duration || "normal", function() {
                        m(c,
                            l), d._trigger("show", null, d._ui(b, c[0]))
                    })
                } : function(b, c) {
                    a(b).closest("li").addClass("ui-tabs-selected ui-state-active"), c.removeClass("ui-tabs-hide"), d._trigger("show", null, d._ui(b, c[0]))
                },
                o = k ? function(a, b) {
                    b.animate(k, k.duration || "normal", function() {
                        d.lis.removeClass("ui-tabs-selected ui-state-active"), b.addClass("ui-tabs-hide"), m(b, k), d.element.dequeue("tabs")
                    })
                } : function(a, b, c) {
                    d.lis.removeClass("ui-tabs-selected ui-state-active"), b.addClass("ui-tabs-hide"), d.element.dequeue("tabs")
                };
            this.anchors.bind(e.event +
                    ".tabs",
                    function() {
                        var b = this,
                            c = a(b).closest("li"),
                            f = d.panels.filter(":not(.ui-tabs-hide)"),
                            g = d.element.find(d._sanitizeSelector(b.hash));
                        if (c.hasClass("ui-tabs-selected") && !e.collapsible || c.hasClass("ui-state-disabled") || c.hasClass("ui-state-processing") || d.panels.filter(":animated").length || d._trigger("select", null, d._ui(this, g[0])) === !1) {
                            this.blur();
                            return !1
                        }
                        e.selected = d.anchors.index(this), d.abort();
                        if (e.collapsible) {
                            if (c.hasClass("ui-tabs-selected")) {
                                e.selected = -1, e.cookie && d._cookie(e.selected,
                                    e.cookie), d.element.queue("tabs", function() {
                                    o(b, f)
                                }).dequeue("tabs"), this.blur();
                                return !1
                            }
                            if (!f.length) {
                                e.cookie && d._cookie(e.selected, e.cookie), d.element.queue("tabs", function() {
                                    n(b, g)
                                }), d.load(d.anchors.index(this)), this.blur();
                                return !1
                            }
                        }
                        e.cookie && d._cookie(e.selected, e.cookie);
                        if (g.length) f.length && d.element.queue("tabs", function() {
                            o(b, f)
                        }), d.element.queue("tabs", function() {
                            n(b, g)
                        }), d.load(d.anchors.index(this));
                        else throw "jQuery UI Tabs: Mismatching fragment identifier.";
                        a.browser.msie && this.blur()
                    }),
                this.anchors.bind("click.tabs", function() {
                    return !1
                })
        },
        _getIndex: function(a) {
            typeof a == "string" && (a = this.anchors.index(this.anchors.filter("[href$=" + a + "]")));
            return a
        },
        destroy: function() {
            var b = this.options;
            this.abort(), this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"), this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.anchors.each(function() {
                var b = a.data(this,
                    "href.tabs");
                b && (this.href = b);
                var c = a(this).unbind(".tabs");
                a.each(["href", "load", "cache"], function(a, b) {
                    c.removeData(b + ".tabs")
                })
            }), this.lis.unbind(".tabs").add(this.panels).each(function() {
                a.data(this, "destroy.tabs") ? a(this).remove() : a(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" "))
            }), b.cookie && this._cookie(null, b.cookie);
            return this
        },
        add: function(c, d, e) {
            e === b && (e = this.anchors.length);
            var f = this,
                g = this.options,
                h = a(g.tabTemplate.replace(/#\{href\}/g, c).replace(/#\{label\}/g, d)),
                i = c.indexOf("#") ? this._tabId(a("a", h)[0]) : c.replace("#", "");
            h.addClass("ui-state-default ui-corner-top").data("destroy.tabs", !0);
            var j = f.element.find("#" + i);
            j.length || (j = a(g.panelTemplate).attr("id", i).data("destroy.tabs", !0)), j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"), e >= this.lis.length ? (h.appendTo(this.list),
                j.appendTo(this.list[0].parentNode)) : (h.insertBefore(this.lis[e]), j.insertBefore(this.panels[e])), g.disabled = a.map(g.disabled, function(a, b) {
                return a >= e ? ++a : a
            }), this._tabify(), this.anchors.length == 1 && (g.selected = 0, h.addClass("ui-tabs-selected ui-state-active"), j.removeClass("ui-tabs-hide"), this.element.queue("tabs", function() {
                f._trigger("show", null, f._ui(f.anchors[0], f.panels[0]))
            }), this.load(0)), this._trigger("add", null, this._ui(this.anchors[e], this.panels[e]));
            return this
        },
        remove: function(b) {
            b = this._getIndex(b);
            var c = this.options,
                d = this.lis.eq(b).remove(),
                e = this.panels.eq(b).remove();
            d.hasClass("ui-tabs-selected") && this.anchors.length > 1 && this.select(b + (b + 1 < this.anchors.length ? 1 : -1)), c.disabled = a.map(a.grep(c.disabled, function(a, c) {
                return a != b
            }), function(a, c) {
                return a >= b ? --a : a
            }), this._tabify(), this._trigger("remove", null, this._ui(d.find("a")[0], e[0]));
            return this
        },
        enable: function(b) {
            b = this._getIndex(b);
            var c = this.options;
            if (a.inArray(b, c.disabled) != -1) {
                this.lis.eq(b).removeClass("ui-state-disabled"), c.disabled =
                    a.grep(c.disabled, function(a, c) {
                        return a != b
                    }), this._trigger("enable", null, this._ui(this.anchors[b], this.panels[b]));
                return this
            }
        },
        disable: function(a) {
            a = this._getIndex(a);
            var b = this,
                c = this.options;
            a != c.selected && (this.lis.eq(a).addClass("ui-state-disabled"), c.disabled.push(a), c.disabled.sort(), this._trigger("disable", null, this._ui(this.anchors[a], this.panels[a])));
            return this
        },
        select: function(a) {
            a = this._getIndex(a);
            if (a == -1)
                if (this.options.collapsible && this.options.selected != -1) a = this.options.selected;
                else return this;
            this.anchors.eq(a).trigger(this.options.event + ".tabs");
            return this
        },
        load: function(b) {
            b = this._getIndex(b);
            var c = this,
                d = this.options,
                e = this.anchors.eq(b)[0],
                f = a.data(e, "load.tabs");
            this.abort();
            if (!f || this.element.queue("tabs").length !== 0 && a.data(e, "cache.tabs")) this.element.dequeue("tabs");
            else {
                this.lis.eq(b).addClass("ui-state-processing");
                if (d.spinner) {
                    var g = a("span", e);
                    g.data("label.tabs", g.html()).html(d.spinner)
                }
                this.xhr = a.ajax(a.extend({}, d.ajaxOptions, {
                    url: f,
                    success: function(f,
                        g) {
                        c.element.find(c._sanitizeSelector(e.hash)).html(f), c._cleanup(), d.cache && a.data(e, "cache.tabs", !0), c._trigger("load", null, c._ui(c.anchors[b], c.panels[b]));
                        try {
                            d.ajaxOptions.success(f, g)
                        } catch (h) {}
                    },
                    error: function(a, f, g) {
                        c._cleanup(), c._trigger("load", null, c._ui(c.anchors[b], c.panels[b]));
                        try {
                            d.ajaxOptions.error(a, f, b, e)
                        } catch (g) {}
                    }
                })), c.element.dequeue("tabs");
                return this
            }
        },
        abort: function() {
            this.element.queue([]), this.panels.stop(!1, !0), this.element.queue("tabs", this.element.queue("tabs").splice(-2,
                2)), this.xhr && (this.xhr.abort(), delete this.xhr), this._cleanup();
            return this
        },
        url: function(a, b) {
            this.anchors.eq(a).removeData("cache.tabs").data("load.tabs", b);
            return this
        },
        length: function() {
            return this.anchors.length
        }
    }), a.extend(a.ui.tabs, {
        version: "1.8.17"
    }), a.extend(a.ui.tabs.prototype, {
        rotation: null,
        rotate: function(a, b) {
            var c = this,
                d = this.options,
                e = c._rotate || (c._rotate = function(b) {
                    clearTimeout(c.rotation), c.rotation = setTimeout(function() {
                            var a = d.selected;
                            c.select(++a < c.anchors.length ? a : 0)
                        }, a),
                        b && b.stopPropagation()
                }),
                f = c._unrotate || (c._unrotate = b ? function(a) {
                    t = d.selected, e()
                } : function(a) {
                    a.clientX && c.rotate(null)
                });
            a ? (this.element.bind("tabsshow", e), this.anchors.bind(d.event + ".tabs", f), e()) : (clearTimeout(c.rotation), this.element.unbind("tabsshow", e), this.anchors.unbind(d.event + ".tabs", f), delete this._rotate, delete this._unrotate);
            return this
        }
    })
})(jQuery);
(function($, undefined) {
    function isArray(a) {
        return a && ($.browser.safari && typeof a == "object" && a.length || a.constructor && a.constructor.toString().match(/\Array\(\)/))
    }

    function extendRemove(a, b) {
        $.extend(a, b);
        for (var c in b)
            if (b[c] == null || b[c] == undefined) a[c] = b[c];
        return a
    }

    function bindHover(a) {
        var b = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return a.bind("mouseout", function(a) {
            var c = $(a.target).closest(b);
            !c.length || c.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
        }).bind("mouseover",
            function(c) {
                var d = $(c.target).closest(b);
                !$.datepicker._isDisabledDatepicker(instActive.inline ? a.parent()[0] : instActive.input[0]) && !!d.length && (d.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), d.addClass("ui-state-hover"), d.hasClass("ui-datepicker-prev") && d.addClass("ui-datepicker-prev-hover"), d.hasClass("ui-datepicker-next") && d.addClass("ui-datepicker-next-hover"))
            })
    }

    function Datepicker() {
        this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
    }
    $.extend($.ui, {
        datepicker: {
            version: "1.8.17"
        }
    });
    var PROP_NAME = "datepicker",
        dpuuid = (new Date).getTime(),
        instActive;
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        log: function() {
            this.debug && console.log.apply("", arguments)
        },
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(a) {
            extendRemove(this._defaults, a || {});
            return this
        },
        _attachDatepicker: function(target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute("date:" + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue)
                    } catch (err) {
                        inlineSettings[attrName] = attrValue
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase(),
                inline = nodeName == "div" || nodeName == "span";
            target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {}), nodeName == "input" ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
        },
        _newInst: function(a, b) {
            var c = a[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
            return {
                id: c,
                input: a,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: b,
                dpDiv: b ? bindHover($('<div class="' + this._inlineClass +
                    ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
            }
        },
        _connectDatepicker: function(a, b) {
            var c = $(a);
            b.append = $([]), b.trigger = $([]);
            c.hasClass(this.markerClassName) || (this._attachments(c, b), c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(a, c, d) {
                b.settings[c] = d
            }).bind("getData.datepicker", function(a, c) {
                return this._get(b, c)
            }), this._autoSize(b), $.data(a, PROP_NAME,
                b), b.settings.disabled && this._disableDatepicker(a))
        },
        _attachments: function(a, b) {
            var c = this._get(b, "appendText"),
                d = this._get(b, "isRTL");
            b.append && b.append.remove(), c && (b.append = $('<span class="' + this._appendClass + '">' + c + "</span>"), a[d ? "before" : "after"](b.append)), a.unbind("focus", this._showDatepicker), b.trigger && b.trigger.remove();
            var e = this._get(b, "showOn");
            (e == "focus" || e == "both") && a.focus(this._showDatepicker);
            if (e == "button" || e == "both") {
                var f = this._get(b, "buttonText"),
                    g = this._get(b, "buttonImage");
                b.trigger = $(this._get(b, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                    src: g,
                    alt: f,
                    title: f
                }) : $('<button type="button"></button>').addClass(this._triggerClass).html(g == "" ? f : $("<img/>").attr({
                    src: g,
                    alt: f,
                    title: f
                }))), a[d ? "before" : "after"](b.trigger), b.trigger.click(function() {
                    $.datepicker._datepickerShowing && $.datepicker._lastInput == a[0] ? $.datepicker._hideDatepicker() : $.datepicker._showDatepicker(a[0]);
                    return !1
                })
            }
        },
        _autoSize: function(a) {
            if (this._get(a, "autoSize") && !a.inline) {
                var b =
                    new Date(2009, 11, 20),
                    c = this._get(a, "dateFormat");
                if (c.match(/[DM]/)) {
                    var d = function(a) {
                        var b = 0,
                            c = 0;
                        for (var d = 0; d < a.length; d++) a[d].length > b && (b = a[d].length, c = d);
                        return c
                    };
                    b.setMonth(d(this._get(a, c.match(/MM/) ? "monthNames" : "monthNamesShort"))), b.setDate(d(this._get(a, c.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - b.getDay())
                }
                a.input.attr("size", this._formatDate(a, b).length)
            }
        },
        _inlineDatepicker: function(a, b) {
            var c = $(a);
            c.hasClass(this.markerClassName) || (c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",
                function(a, c, d) {
                    b.settings[c] = d
                }).bind("getData.datepicker", function(a, c) {
                return this._get(b, c)
            }), $.data(a, PROP_NAME, b), this._setDate(b, this._getDefaultDate(b), !0), this._updateDatepicker(b), this._updateAlternate(b), b.settings.disabled && this._disableDatepicker(a), b.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(a, b, c, d, e) {
            var f = this._dialogInst;
            if (!f) {
                this.uuid += 1;
                var g = "dp" + this.uuid;
                this._dialogInput = $('<input type="text" id="' + g + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>'),
                    this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), f = this._dialogInst = this._newInst(this._dialogInput, !1), f.settings = {}, $.data(this._dialogInput[0], PROP_NAME, f)
            }
            extendRemove(f.settings, d || {}), b = b && b.constructor == Date ? this._formatDate(f, b) : b, this._dialogInput.val(b), this._pos = e ? e.length ? e : [e.pageX, e.pageY] : null;
            if (!this._pos) {
                var h = document.documentElement.clientWidth,
                    i = document.documentElement.clientHeight,
                    j = document.documentElement.scrollLeft || document.body.scrollLeft,
                    k = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [h / 2 - 100 + j, i / 2 - 150 + k]
            }
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), f.settings.onSelect = c, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, f);
            return this
        },
        _destroyDatepicker: function(a) {
            var b = $(a),
                c = $.data(a, PROP_NAME);
            if (!!b.hasClass(this.markerClassName)) {
                var d = a.nodeName.toLowerCase();
                $.removeData(a, PROP_NAME), d == "input" ? (c.append.remove(), c.trigger.remove(), b.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : (d == "div" || d == "span") && b.removeClass(this.markerClassName).empty()
            }
        },
        _enableDatepicker: function(a) {
            var b = $(a),
                c = $.data(a, PROP_NAME);
            if (!!b.hasClass(this.markerClassName)) {
                var d = a.nodeName.toLowerCase();
                if (d == "input") a.disabled = !1, c.trigger.filter("button").each(function() {
                    this.disabled = !1
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                });
                else if (d == "div" || d == "span") {
                    var e = b.children("." + this._inlineClass);
                    e.children().removeClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
                }
                this._disabledInputs = $.map(this._disabledInputs, function(b) {
                    return b == a ? null : b
                })
            }
        },
        _disableDatepicker: function(a) {
            var b = $(a),
                c = $.data(a, PROP_NAME);
            if (!!b.hasClass(this.markerClassName)) {
                var d = a.nodeName.toLowerCase();
                if (d == "input") a.disabled = !0,
                    c.trigger.filter("button").each(function() {
                        this.disabled = !0
                    }).end().filter("img").css({
                        opacity: "0.5",
                        cursor: "default"
                    });
                else if (d == "div" || d == "span") {
                    var e = b.children("." + this._inlineClass);
                    e.children().addClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
                }
                this._disabledInputs = $.map(this._disabledInputs, function(b) {
                    return b == a ? null : b
                }), this._disabledInputs[this._disabledInputs.length] = a
            }
        },
        _isDisabledDatepicker: function(a) {
            if (!a) return !1;
            for (var b = 0; b < this._disabledInputs.length; b++)
                if (this._disabledInputs[b] == a) return !0;
            return !1
        },
        _getInst: function(a) {
            try {
                return $.data(a, PROP_NAME)
            } catch (b) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function(a, b, c) {
            var d = this._getInst(a);
            if (arguments.length == 2 && typeof b == "string") return b == "defaults" ? $.extend({}, $.datepicker._defaults) : d ? b == "all" ? $.extend({}, d.settings) : this._get(d, b) : null;
            var e = b || {};
            typeof b == "string" && (e = {}, e[b] = c);
            if (d) {
                this._curInst == d && this._hideDatepicker();
                var f = this._getDateDatepicker(a, !0),
                    g = this._getMinMaxDate(d, "min"),
                    h = this._getMinMaxDate(d, "max");
                extendRemove(d.settings, e), g !== null && e.dateFormat !== undefined && e.minDate === undefined && (d.settings.minDate = this._formatDate(d, g)), h !== null && e.dateFormat !== undefined && e.maxDate === undefined && (d.settings.maxDate = this._formatDate(d, h)), this._attachments($(a), d), this._autoSize(d), this._setDate(d, f), this._updateAlternate(d), this._updateDatepicker(d)
            }
        },
        _changeDatepicker: function(a, b, c) {
            this._optionDatepicker(a,
                b, c)
        },
        _refreshDatepicker: function(a) {
            var b = this._getInst(a);
            b && this._updateDatepicker(b)
        },
        _setDateDatepicker: function(a, b) {
            var c = this._getInst(a);
            c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c))
        },
        _getDateDatepicker: function(a, b) {
            var c = this._getInst(a);
            c && !c.inline && this._setDateFromField(c, b);
            return c ? this._getDate(c) : null
        },
        _doKeyDown: function(a) {
            var b = $.datepicker._getInst(a.target),
                c = !0,
                d = b.dpDiv.is(".ui-datepicker-rtl");
            b._keyEvent = !0;
            if ($.datepicker._datepickerShowing) switch (a.keyCode) {
                case 9:
                    $.datepicker._hideDatepicker(),
                        c = !1;
                    break;
                case 13:
                    var e = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", b.dpDiv);
                    e[0] && $.datepicker._selectDay(a.target, b.selectedMonth, b.selectedYear, e[0]);
                    var f = $.datepicker._get(b, "onSelect");
                    if (f) {
                        var g = $.datepicker._formatDate(b);
                        f.apply(b.input ? b.input[0] : null, [g, b])
                    } else $.datepicker._hideDatepicker();
                    return !1;
                case 27:
                    $.datepicker._hideDatepicker();
                    break;
                case 33:
                    $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b,
                        "stepMonths"), "M");
                    break;
                case 34:
                    $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M");
                    break;
                case 35:
                    (a.ctrlKey || a.metaKey) && $.datepicker._clearDate(a.target), c = a.ctrlKey || a.metaKey;
                    break;
                case 36:
                    (a.ctrlKey || a.metaKey) && $.datepicker._gotoToday(a.target), c = a.ctrlKey || a.metaKey;
                    break;
                case 37:
                    (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? 1 : -1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target,
                        a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M");
                    break;
                case 38:
                    (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, -7, "D"), c = a.ctrlKey || a.metaKey;
                    break;
                case 39:
                    (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? -1 : 1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M");
                    break;
                case 40:
                    (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target,
                        7, "D"), c = a.ctrlKey || a.metaKey;
                    break;
                default:
                    c = !1
            } else a.keyCode == 36 && a.ctrlKey ? $.datepicker._showDatepicker(this) : c = !1;
            c && (a.preventDefault(), a.stopPropagation())
        },
        _doKeyPress: function(a) {
            var b = $.datepicker._getInst(a.target);
            if ($.datepicker._get(b, "constrainInput")) {
                var c = $.datepicker._possibleChars($.datepicker._get(b, "dateFormat")),
                    d = String.fromCharCode(a.charCode == undefined ? a.keyCode : a.charCode);
                return a.ctrlKey || a.metaKey || d < " " || !c || c.indexOf(d) > -1
            }
        },
        _doKeyUp: function(a) {
            var b = $.datepicker._getInst(a.target);
            if (b.input.val() != b.lastVal) try {
                var c = $.datepicker.parseDate($.datepicker._get(b, "dateFormat"), b.input ? b.input.val() : null, $.datepicker._getFormatConfig(b));
                c && ($.datepicker._setDateFromField(b), $.datepicker._updateAlternate(b), $.datepicker._updateDatepicker(b))
            } catch (a) {
                $.datepicker.log(a)
            }
            return !0
        },
        _showDatepicker: function(a) {
            a = a.target || a, a.nodeName.toLowerCase() != "input" && (a = $("input", a.parentNode)[0]);
            if (!$.datepicker._isDisabledDatepicker(a) && $.datepicker._lastInput != a) {
                var b = $.datepicker._getInst(a);
                $.datepicker._curInst && $.datepicker._curInst != b && ($.datepicker._curInst.dpDiv.stop(!0, !0), b && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
                var c = $.datepicker._get(b, "beforeShow"),
                    d = c ? c.apply(a, [a, b]) : {};
                if (d === !1) return;
                extendRemove(b.settings, d), b.lastVal = null, $.datepicker._lastInput = a, $.datepicker._setDateFromField(b), $.datepicker._inDialog && (a.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(a), $.datepicker._pos[1] += a.offsetHeight);
                var e = !1;
                $(a).parents().each(function() {
                    e |= $(this).css("position") == "fixed";
                    return !e
                }), e && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, $.datepicker._pos[1] -= document.documentElement.scrollTop);
                var f = {
                    left: $.datepicker._pos[0],
                    top: $.datepicker._pos[1]
                };
                $.datepicker._pos = null, b.dpDiv.empty(), b.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), $.datepicker._updateDatepicker(b), f = $.datepicker._checkOffset(b, f, e), b.dpDiv.css({
                    position: $.datepicker._inDialog &&
                        $.blockUI ? "static" : e ? "fixed" : "absolute",
                    display: "none",
                    left: f.left + "px",
                    top: f.top + "px"
                });
                if (!b.inline) {
                    var g = $.datepicker._get(b, "showAnim"),
                        h = $.datepicker._get(b, "duration"),
                        i = function() {
                            var a = b.dpDiv.find("iframe.ui-datepicker-cover");
                            if (!!a.length) {
                                var c = $.datepicker._getBorders(b.dpDiv);
                                a.css({
                                    left: -c[0],
                                    top: -c[1],
                                    width: b.dpDiv.outerWidth(),
                                    height: b.dpDiv.outerHeight()
                                })
                            }
                        };
                    b.dpDiv.zIndex($(a).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects[g] ? b.dpDiv.show(g, $.datepicker._get(b,
                        "showOptions"), h, i) : b.dpDiv[g || "show"](g ? h : null, i), (!g || !h) && i(), b.input.is(":visible") && !b.input.is(":disabled") && b.input.focus(), $.datepicker._curInst = b
                }
            }
        },
        _updateDatepicker: function(a) {
            var b = this;
            b.maxRows = 4;
            var c = $.datepicker._getBorders(a.dpDiv);
            instActive = a, a.dpDiv.empty().append(this._generateHTML(a));
            var d = a.dpDiv.find("iframe.ui-datepicker-cover");
            !d.length || d.css({
                left: -c[0],
                top: -c[1],
                width: a.dpDiv.outerWidth(),
                height: a.dpDiv.outerHeight()
            }), a.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var e = this._getNumberOfMonths(a),
                f = e[1],
                g = 17;
            a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), f > 1 && a.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", g * f + "em"), a.dpDiv[(e[0] != 1 || e[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi"), a.dpDiv[(this._get(a, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), a == $.datepicker._curInst && $.datepicker._datepickerShowing && a.input && a.input.is(":visible") && !a.input.is(":disabled") && a.input[0] != document.activeElement &&
                a.input.focus();
            if (a.yearshtml) {
                var h = a.yearshtml;
                setTimeout(function() {
                    h === a.yearshtml && a.yearshtml && a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml), h = a.yearshtml = null
                }, 0)
            }
        },
        _getBorders: function(a) {
            var b = function(a) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                }[a] || a
            };
            return [parseFloat(b(a.css("border-left-width"))), parseFloat(b(a.css("border-top-width")))]
        },
        _checkOffset: function(a, b, c) {
            var d = a.dpDiv.outerWidth(),
                e = a.dpDiv.outerHeight(),
                f = a.input ? a.input.outerWidth() : 0,
                g = a.input ? a.input.outerHeight() :
                0,
                h = document.documentElement.clientWidth + $(document).scrollLeft(),
                i = document.documentElement.clientHeight + $(document).scrollTop();
            b.left -= this._get(a, "isRTL") ? d - f : 0, b.left -= c && b.left == a.input.offset().left ? $(document).scrollLeft() : 0, b.top -= c && b.top == a.input.offset().top + g ? $(document).scrollTop() : 0, b.left -= Math.min(b.left, b.left + d > h && h > d ? Math.abs(b.left + d - h) : 0), b.top -= Math.min(b.top, b.top + e > i && i > e ? Math.abs(e + g) : 0);
            return b
        },
        _findPos: function(a) {
            var b = this._getInst(a),
                c = this._get(b, "isRTL");
            while (a &&
                (a.type == "hidden" || a.nodeType != 1 || $.expr.filters.hidden(a))) a = a[c ? "previousSibling" : "nextSibling"];
            var d = $(a).offset();
            return [d.left, d.top]
        },
        _hideDatepicker: function(a) {
            var b = this._curInst;
            if (!(!b || a && b != $.data(a, PROP_NAME)) && this._datepickerShowing) {
                var c = this._get(b, "showAnim"),
                    d = this._get(b, "duration"),
                    e = this,
                    f = function() {
                        $.datepicker._tidyDialog(b), e._curInst = null
                    };
                $.effects && $.effects[c] ? b.dpDiv.hide(c, $.datepicker._get(b, "showOptions"), d, f) : b.dpDiv[c == "slideDown" ? "slideUp" : c == "fadeIn" ? "fadeOut" :
                    "hide"](c ? d : null, f), c || f(), this._datepickerShowing = !1;
                var g = this._get(b, "onClose");
                g && g.apply(b.input ? b.input[0] : null, [b.input ? b.input.val() : "", b]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1
            }
        },
        _tidyDialog: function(a) {
            a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(a) {
            if (!!$.datepicker._curInst) {
                var b = $(a.target),
                    c = $.datepicker._getInst(b[0]);
                (b[0].id != $.datepicker._mainDivId && b.parents("#" + $.datepicker._mainDivId).length == 0 && !b.hasClass($.datepicker.markerClassName) && !b.hasClass($.datepicker._triggerClass) && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || b.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != c) && $.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(a, b, c) {
            var d = $(a),
                e = this._getInst(d[0]);
            this._isDisabledDatepicker(d[0]) || (this._adjustInstDate(e, b + (c == "M" ?
                this._get(e, "showCurrentAtPos") : 0), c), this._updateDatepicker(e))
        },
        _gotoToday: function(a) {
            var b = $(a),
                c = this._getInst(b[0]);
            if (this._get(c, "gotoCurrent") && c.currentDay) c.selectedDay = c.currentDay, c.drawMonth = c.selectedMonth = c.currentMonth, c.drawYear = c.selectedYear = c.currentYear;
            else {
                var d = new Date;
                c.selectedDay = d.getDate(), c.drawMonth = c.selectedMonth = d.getMonth(), c.drawYear = c.selectedYear = d.getFullYear()
            }
            this._notifyChange(c), this._adjustDate(b)
        },
        _selectMonthYear: function(a, b, c) {
            var d = $(a),
                e = this._getInst(d[0]);
            e["selected" + (c == "M" ? "Month" : "Year")] = e["draw" + (c == "M" ? "Month" : "Year")] = parseInt(b.options[b.selectedIndex].value, 10), this._notifyChange(e), this._adjustDate(d)
        },
        _selectDay: function(a, b, c, d) {
            var e = $(a);
            if (!$(d).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(e[0])) {
                var f = this._getInst(e[0]);
                f.selectedDay = f.currentDay = $("a", d).html(), f.selectedMonth = f.currentMonth = b, f.selectedYear = f.currentYear = c, this._selectDate(a, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear))
            }
        },
        _clearDate: function(a) {
            var b =
                $(a),
                c = this._getInst(b[0]);
            this._selectDate(b, "")
        },
        _selectDate: function(a, b) {
            var c = $(a),
                d = this._getInst(c[0]);
            b = b != null ? b : this._formatDate(d), d.input && d.input.val(b), this._updateAlternate(d);
            var e = this._get(d, "onSelect");
            e ? e.apply(d.input ? d.input[0] : null, [b, d]) : d.input && d.input.trigger("change"), d.inline ? this._updateDatepicker(d) : (this._hideDatepicker(), this._lastInput = d.input[0], typeof d.input[0] != "object" && d.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function(a) {
            var b = this._get(a, "altField");
            if (b) {
                var c = this._get(a, "altFormat") || this._get(a, "dateFormat"),
                    d = this._getDate(a),
                    e = this.formatDate(c, d, this._getFormatConfig(a));
                $(b).each(function() {
                    $(this).val(e)
                })
            }
        },
        noWeekends: function(a) {
            var b = a.getDay();
            return [b > 0 && b < 6, ""]
        },
        iso8601Week: function(a) {
            var b = new Date(a.getTime());
            b.setDate(b.getDate() + 4 - (b.getDay() || 7));
            var c = b.getTime();
            b.setMonth(0), b.setDate(1);
            return Math.floor(Math.round((c - b) / 864E5) / 7) + 1
        },
        parseDate: function(a, b, c) {
            if (a == null || b == null) throw "Invalid arguments";
            b = typeof b ==
                "object" ? b.toString() : b + "";
            if (b == "") return null;
            var d = (c ? c.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            d = typeof d != "string" ? d : (new Date).getFullYear() % 100 + parseInt(d, 10);
            var e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
                f = (c ? c.dayNames : null) || this._defaults.dayNames,
                g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort,
                h = (c ? c.monthNames : null) || this._defaults.monthNames,
                i = -1,
                j = -1,
                k = -1,
                l = -1,
                m = !1,
                n = function(b) {
                    var c = s + 1 < a.length && a.charAt(s + 1) == b;
                    c && s++;
                    return c
                },
                o = function(a) {
                    var c =
                        n(a),
                        d = a == "@" ? 14 : a == "!" ? 20 : a == "y" && c ? 4 : a == "o" ? 3 : 2,
                        e = new RegExp("^\\d{1," + d + "}"),
                        f = b.substring(r).match(e);
                    if (!f) throw "Missing number at position " + r;
                    r += f[0].length;
                    return parseInt(f[0], 10)
                },
                p = function(a, c, d) {
                    var e = $.map(n(a) ? d : c, function(a, b) {
                            return [
                                [b, a]
                            ]
                        }).sort(function(a, b) {
                            return -(a[1].length - b[1].length)
                        }),
                        f = -1;
                    $.each(e, function(a, c) {
                        var d = c[1];
                        if (b.substr(r, d.length).toLowerCase() == d.toLowerCase()) {
                            f = c[0], r += d.length;
                            return !1
                        }
                    });
                    if (f != -1) return f + 1;
                    throw "Unknown name at position " + r;
                },
                q = function() {
                    if (b.charAt(r) !=
                        a.charAt(s)) throw "Unexpected literal at position " + r;
                    r++
                },
                r = 0;
            for (var s = 0; s < a.length; s++)
                if (m) a.charAt(s) == "'" && !n("'") ? m = !1 : q();
                else switch (a.charAt(s)) {
                    case "d":
                        k = o("d");
                        break;
                    case "D":
                        p("D", e, f);
                        break;
                    case "o":
                        l = o("o");
                        break;
                    case "m":
                        j = o("m");
                        break;
                    case "M":
                        j = p("M", g, h);
                        break;
                    case "y":
                        i = o("y");
                        break;
                    case "@":
                        var t = new Date(o("@"));
                        i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
                        break;
                    case "!":
                        var t = new Date((o("!") - this._ticksTo1970) / 1E4);
                        i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
                        break;
                    case "'":
                        n("'") ? q() : m = !0;
                        break;
                    default:
                        q()
                }
                if (r < b.length) throw "Extra/unparsed characters found in date: " + b.substring(r);
            i == -1 ? i = (new Date).getFullYear() : i < 100 && (i += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (i <= d ? 0 : -100));
            if (l > -1) {
                j = 1, k = l;
                for (;;) {
                    var u = this._getDaysInMonth(i, j - 1);
                    if (k <= u) break;
                    j++, k -= u
                }
            }
            var t = this._daylightSavingAdjust(new Date(i, j - 1, k));
            if (t.getFullYear() != i || t.getMonth() + 1 != j || t.getDate() != k) throw "Invalid date";
            return t
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1E7,
        formatDate: function(a, b, c) {
            if (!b) return "";
            var d = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
                e = (c ? c.dayNames : null) || this._defaults.dayNames,
                f = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort,
                g = (c ? c.monthNames : null) || this._defaults.monthNames,
                h = function(b) {
                    var c = m + 1 < a.length && a.charAt(m + 1) == b;
                    c && m++;
                    return c
                },
                i = function(a, b, c) {
                    var d = "" + b;
                    if (h(a))
                        while (d.length < c) d = "0" + d;
                    return d
                },
                j = function(a, b, c, d) {
                    return h(a) ? d[b] : c[b]
                },
                k = "",
                l = !1;
            if (b)
                for (var m = 0; m < a.length; m++)
                    if (l) a.charAt(m) == "'" && !h("'") ? l = !1 : k += a.charAt(m);
                    else switch (a.charAt(m)) {
                        case "d":
                            k += i("d", b.getDate(), 2);
                            break;
                        case "D":
                            k += j("D", b.getDay(), d, e);
                            break;
                        case "o":
                            k += i("o", Math.round(((new Date(b.getFullYear(), b.getMonth(), b.getDate())).getTime() - (new Date(b.getFullYear(), 0,
                                0)).getTime()) / 864E5), 3);
                            break;
                        case "m":
                            k += i("m", b.getMonth() + 1, 2);
                            break;
                        case "M":
                            k += j("M", b.getMonth(), f, g);
                            break;
                        case "y":
                            k += h("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
                            break;
                        case "@":
                            k += b.getTime();
                            break;
                        case "!":
                            k += b.getTime() * 1E4 + this._ticksTo1970;
                            break;
                        case "'":
                            h("'") ? k += "'" : l = !0;
                            break;
                        default:
                            k += a.charAt(m)
                    }
                    return k
        },
        _possibleChars: function(a) {
            var b = "",
                c = !1,
                d = function(b) {
                    var c = e + 1 < a.length && a.charAt(e + 1) == b;
                    c && e++;
                    return c
                };
            for (var e = 0; e < a.length; e++)
                if (c) a.charAt(e) ==
                    "'" && !d("'") ? c = !1 : b += a.charAt(e);
                else switch (a.charAt(e)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        b += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        d("'") ? b += "'" : c = !0;
                        break;
                    default:
                        b += a.charAt(e)
                }
                return b
        },
        _get: function(a, b) {
            return a.settings[b] !== undefined ? a.settings[b] : this._defaults[b]
        },
        _setDateFromField: function(a, b) {
            if (a.input.val() != a.lastVal) {
                var c = this._get(a, "dateFormat"),
                    d = a.lastVal = a.input ? a.input.val() : null,
                    e, f;
                e = f = this._getDefaultDate(a);
                var g = this._getFormatConfig(a);
                try {
                    e = this.parseDate(c,
                        d, g) || f
                } catch (h) {
                    this.log(h), d = b ? "" : d
                }
                a.selectedDay = e.getDate(), a.drawMonth = a.selectedMonth = e.getMonth(), a.drawYear = a.selectedYear = e.getFullYear(), a.currentDay = d ? e.getDate() : 0, a.currentMonth = d ? e.getMonth() : 0, a.currentYear = d ? e.getFullYear() : 0, this._adjustInstDate(a)
            }
        },
        _getDefaultDate: function(a) {
            return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
        },
        _determineDate: function(a, b, c) {
            var d = function(a) {
                    var b = new Date;
                    b.setDate(b.getDate() + a);
                    return b
                },
                e = function(b) {
                    try {
                        return $.datepicker.parseDate($.datepicker._get(a,
                            "dateFormat"), b, $.datepicker._getFormatConfig(a))
                    } catch (c) {}
                    var d = (b.toLowerCase().match(/^c/) ? $.datepicker._getDate(a) : null) || new Date,
                        e = d.getFullYear(),
                        f = d.getMonth(),
                        g = d.getDate(),
                        h = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                        i = h.exec(b);
                    while (i) {
                        switch (i[2] || "d") {
                            case "d":
                            case "D":
                                g += parseInt(i[1], 10);
                                break;
                            case "w":
                            case "W":
                                g += parseInt(i[1], 10) * 7;
                                break;
                            case "m":
                            case "M":
                                f += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f));
                                break;
                            case "y":
                            case "Y":
                                e += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e,
                                    f))
                        }
                        i = h.exec(b)
                    }
                    return new Date(e, f, g)
                },
                f = b == null || b === "" ? c : typeof b == "string" ? e(b) : typeof b == "number" ? isNaN(b) ? c : d(b) : new Date(b.getTime());
            f = f && f.toString() == "Invalid Date" ? c : f, f && (f.setHours(0), f.setMinutes(0), f.setSeconds(0), f.setMilliseconds(0));
            return this._daylightSavingAdjust(f)
        },
        _daylightSavingAdjust: function(a) {
            if (!a) return null;
            a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0);
            return a
        },
        _setDate: function(a, b, c) {
            var d = !b,
                e = a.selectedMonth,
                f = a.selectedYear,
                g = this._restrictMinMax(a, this._determineDate(a,
                    b, new Date));
            a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), (e != a.selectedMonth || f != a.selectedYear) && !c && this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a))
        },
        _getDate: function(a) {
            var b = !a.currentYear || a.input && a.input.val() == "" ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return b
        },
        _generateHTML: function(a) {
            var b = new Date;
            b = this._daylightSavingAdjust(new Date(b.getFullYear(), b.getMonth(), b.getDate()));
            var c = this._get(a, "isRTL"),
                d = this._get(a, "showButtonPanel"),
                e = this._get(a, "hideIfNoPrevNext"),
                f = this._get(a, "navigationAsDateFormat"),
                g = this._getNumberOfMonths(a),
                h = this._get(a, "showCurrentAtPos"),
                i = this._get(a, "stepMonths"),
                j = g[0] != 1 || g[1] != 1,
                k = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)),
                l = this._getMinMaxDate(a, "min"),
                m = this._getMinMaxDate(a, "max"),
                n = a.drawMonth - h,
                o = a.drawYear;
            n < 0 && (n += 12, o--);
            if (m) {
                var p = this._daylightSavingAdjust(new Date(m.getFullYear(), m.getMonth() - g[0] * g[1] + 1, m.getDate()));
                p = l && p < l ? l : p;
                while (this._daylightSavingAdjust(new Date(o, n, 1)) > p) n--, n < 0 && (n = 11, o--)
            }
            a.drawMonth = n, a.drawYear = o;
            var q = this._get(a, "prevText");
            q = f ? this.formatDate(q, this._daylightSavingAdjust(new Date(o, n - i, 1)), this._getFormatConfig(a)) : q;
            var r = this._canAdjustMonth(a, -1, o, n) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" +
                a.id + "', -" + i + ", 'M');\"" + ' title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + q + "</span></a>" : e ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + q + "</span></a>",
                s = this._get(a, "nextText");
            s = f ? this.formatDate(s, this._daylightSavingAdjust(new Date(o, n + i, 1)), this._getFormatConfig(a)) : s;
            var t = this._canAdjustMonth(a, 1, o, n) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' +
                dpuuid + ".datepicker._adjustDate('#" + a.id + "', +" + i + ", 'M');\"" + ' title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>" : e ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>",
                u = this._get(a, "currentText"),
                v = this._get(a, "gotoCurrent") && a.currentDay ? k : b;
            u = f ? this.formatDate(u, v, this._getFormatConfig(a)) : u;
            var w = a.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' +
                dpuuid + '.datepicker._hideDatepicker();">' + this._get(a, "closeText") + "</button>",
                x = d ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (c ? w : "") + (this._isInRange(a, v) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._gotoToday('#" + a.id + "');\"" + ">" + u + "</button>" : "") + (c ? "" : w) + "</div>" : "",
                y = parseInt(this._get(a, "firstDay"), 10);
            y = isNaN(y) ? 0 : y;
            var z = this._get(a, "showWeek"),
                A = this._get(a, "dayNames"),
                B = this._get(a, "dayNamesShort"),
                C = this._get(a, "dayNamesMin"),
                D = this._get(a, "monthNames"),
                E = this._get(a, "monthNamesShort"),
                F = this._get(a, "beforeShowDay"),
                G = this._get(a, "showOtherMonths"),
                H = this._get(a, "selectOtherMonths"),
                I = this._get(a, "calculateWeek") || this.iso8601Week,
                J = this._getDefaultDate(a),
                K = "";
            for (var L = 0; L < g[0]; L++) {
                var M = "";
                this.maxRows = 4;
                for (var N = 0; N < g[1]; N++) {
                    var O = this._daylightSavingAdjust(new Date(o, n, a.selectedDay)),
                        P = " ui-corner-all",
                        Q = "";
                    if (j) {
                        Q += '<div class="ui-datepicker-group';
                        if (g[1] > 1) switch (N) {
                            case 0:
                                Q += " ui-datepicker-group-first", P = " ui-corner-" + (c ? "right" : "left");
                                break;
                            case g[1] - 1:
                                Q += " ui-datepicker-group-last", P = " ui-corner-" + (c ? "left" : "right");
                                break;
                            default:
                                Q += " ui-datepicker-group-middle", P = ""
                        }
                        Q += '">'
                    }
                    Q += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + P + '">' + (/all|left/.test(P) && L == 0 ? c ? t : r : "") + (/all|right/.test(P) && L == 0 ? c ? r : t : "") + this._generateMonthYearHeader(a, n, o, l, m, L > 0 || N > 0, D, E) + '</div><table class="ui-datepicker-calendar"><thead>' + "<tr>";
                    var R = z ? '<th class="ui-datepicker-week-col">' + this._get(a, "weekHeader") + "</th>" : "";
                    for (var S = 0; S < 7; S++) {
                        var T = (S + y) % 7;
                        R += "<th" + ((S + y + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + ">" + '<span title="' + A[T] + '">' + C[T] + "</span></th>"
                    }
                    Q += R + "</tr></thead><tbody>";
                    var U = this._getDaysInMonth(o, n);
                    o == a.selectedYear && n == a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, U));
                    var V = (this._getFirstDayOfMonth(o, n) - y + 7) % 7,
                        W = Math.ceil((V + U) / 7),
                        X = j ? this.maxRows > W ? this.maxRows : W : W;
                    this.maxRows = X;
                    var Y = this._daylightSavingAdjust(new Date(o,
                        n, 1 - V));
                    for (var Z = 0; Z < X; Z++) {
                        Q += "<tr>";
                        var _ = z ? '<td class="ui-datepicker-week-col">' + this._get(a, "calculateWeek")(Y) + "</td>" : "";
                        for (var S = 0; S < 7; S++) {
                            var ba = F ? F.apply(a.input ? a.input[0] : null, [Y]) : [!0, ""],
                                bb = Y.getMonth() != n,
                                bc = bb && !H || !ba[0] || l && Y < l || m && Y > m;
                            _ += '<td class="' + ((S + y + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (bb ? " ui-datepicker-other-month" : "") + (Y.getTime() == O.getTime() && n == a.selectedMonth && a._keyEvent || J.getTime() == Y.getTime() && J.getTime() == O.getTime() ? " " + this._dayOverClass : "") + (bc ? " " + this._unselectableClass +
                                " ui-state-disabled" : "") + (bb && !G ? "" : " " + ba[1] + (Y.getTime() == k.getTime() ? " " + this._currentClass : "") + (Y.getTime() == b.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!bb || G) && ba[2] ? ' title="' + ba[2] + '"' : "") + (bc ? "" : ' onclick="DP_jQuery_' + dpuuid + ".datepicker._selectDay('#" + a.id + "'," + Y.getMonth() + "," + Y.getFullYear() + ', this);return false;"') + ">" + (bb && !G ? "&#xa0;" : bc ? '<span class="ui-state-default">' + Y.getDate() + "</span>" : '<a class="ui-state-default' + (Y.getTime() == b.getTime() ? " ui-state-highlight" : "") + (Y.getTime() ==
                                k.getTime() ? " ui-state-active" : "") + (bb ? " ui-priority-secondary" : "") + '" href="#">' + Y.getDate() + "</a>") + "</td>", Y.setDate(Y.getDate() + 1), Y = this._daylightSavingAdjust(Y)
                        }
                        Q += _ + "</tr>"
                    }
                    n++, n > 11 && (n = 0, o++), Q += "</tbody></table>" + (j ? "</div>" + (g[0] > 0 && N == g[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""), M += Q
                }
                K += M
            }
            K += x + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !a.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), a._keyEvent = !1;
            return K
        },
        _generateMonthYearHeader: function(a,
            b, c, d, e, f, g, h) {
            var i = this._get(a, "changeMonth"),
                j = this._get(a, "changeYear"),
                k = this._get(a, "showMonthAfterYear"),
                l = '<div class="ui-datepicker-title">',
                m = "";
            if (f || !i) m += '<span class="ui-datepicker-month">' + g[b] + "</span>";
            else {
                var n = d && d.getFullYear() == c,
                    o = e && e.getFullYear() == c;
                m += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + a.id + "', this, 'M');\" " + ">";
                for (var p = 0; p < 12; p++)(!n || p >= d.getMonth()) && (!o || p <= e.getMonth()) && (m += '<option value="' + p + '"' +
                    (p == b ? ' selected="selected"' : "") + ">" + h[p] + "</option>");
                m += "</select>"
            }
            k || (l += m + (f || !i || !j ? "&#xa0;" : ""));
            if (!a.yearshtml) {
                a.yearshtml = "";
                if (f || !j) l += '<span class="ui-datepicker-year">' + c + "</span>";
                else {
                    var q = this._get(a, "yearRange").split(":"),
                        r = (new Date).getFullYear(),
                        s = function(a) {
                            var b = a.match(/c[+-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+-].*/) ? r + parseInt(a, 10) : parseInt(a, 10);
                            return isNaN(b) ? r : b
                        },
                        t = s(q[0]),
                        u = Math.max(t, s(q[1] || ""));
                    t = d ? Math.max(t, d.getFullYear()) : t, u = e ? Math.min(u, e.getFullYear()) :
                        u, a.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + a.id + "', this, 'Y');\" " + ">";
                    for (; t <= u; t++) a.yearshtml += '<option value="' + t + '"' + (t == c ? ' selected="selected"' : "") + ">" + t + "</option>";
                    a.yearshtml += "</select>", l += a.yearshtml, a.yearshtml = null
                }
            }
            l += this._get(a, "yearSuffix"), k && (l += (f || !i || !j ? "&#xa0;" : "") + m), l += "</div>";
            return l
        },
        _adjustInstDate: function(a, b, c) {
            var d = a.drawYear + (c == "Y" ? b : 0),
                e = a.drawMonth + (c == "M" ? b : 0),
                f = Math.min(a.selectedDay,
                    this._getDaysInMonth(d, e)) + (c == "D" ? b : 0),
                g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
            a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), (c == "M" || c == "Y") && this._notifyChange(a)
        },
        _restrictMinMax: function(a, b) {
            var c = this._getMinMaxDate(a, "min"),
                d = this._getMinMaxDate(a, "max"),
                e = c && b < c ? c : b;
            e = d && e > d ? d : e;
            return e
        },
        _notifyChange: function(a) {
            var b = this._get(a, "onChangeMonthYear");
            b && b.apply(a.input ? a.input[0] : null, [a.selectedYear,
                a.selectedMonth + 1, a
            ])
        },
        _getNumberOfMonths: function(a) {
            var b = this._get(a, "numberOfMonths");
            return b == null ? [1, 1] : typeof b == "number" ? [1, b] : b
        },
        _getMinMaxDate: function(a, b) {
            return this._determineDate(a, this._get(a, b + "Date"), null)
        },
        _getDaysInMonth: function(a, b) {
            return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
        },
        _getFirstDayOfMonth: function(a, b) {
            return (new Date(a, b, 1)).getDay()
        },
        _canAdjustMonth: function(a, b, c, d) {
            var e = this._getNumberOfMonths(a),
                f = this._daylightSavingAdjust(new Date(c, d + (b <
                    0 ? b : e[0] * e[1]), 1));
            b < 0 && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth()));
            return this._isInRange(a, f)
        },
        _isInRange: function(a, b) {
            var c = this._getMinMaxDate(a, "min"),
                d = this._getMinMaxDate(a, "max");
            return (!c || b.getTime() >= c.getTime()) && (!d || b.getTime() <= d.getTime())
        },
        _getFormatConfig: function(a) {
            var b = this._get(a, "shortYearCutoff");
            b = typeof b != "string" ? b : (new Date).getFullYear() % 100 + parseInt(b, 10);
            return {
                shortYearCutoff: b,
                dayNamesShort: this._get(a, "dayNamesShort"),
                dayNames: this._get(a, "dayNames"),
                monthNamesShort: this._get(a, "monthNamesShort"),
                monthNames: this._get(a, "monthNames")
            }
        },
        _formatDate: function(a, b, c, d) {
            b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
            var e = b ? typeof b == "object" ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a))
        }
    }), $.fn.datepicker = function(a) {
        if (!this.length) return this;
        $.datepicker.initialized ||
            ($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv), $.datepicker.initialized = !0);
        var b = Array.prototype.slice.call(arguments, 1);
        if (typeof a == "string" && (a == "isDisabled" || a == "getDate" || a == "widget")) return $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(b));
        if (a == "option" && arguments.length == 2 && typeof arguments[1] == "string") return $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(b));
        return this.each(function() {
            typeof a ==
                "string" ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this].concat(b)) : $.datepicker._attachDatepicker(this, a)
        })
    }, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.8.17", window["DP_jQuery_" + dpuuid] = $
})(jQuery);
(function(a, b) {
    a.widget("ui.progressbar", {
        options: {
            value: 0,
            max: 100
        },
        min: 0,
        _create: function() {
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._value()
            }), this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this.oldValue = this._value(), this._refreshValue()
        },
        destroy: function() {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),
                this.valueDiv.remove(), a.Widget.prototype.destroy.apply(this, arguments)
        },
        value: function(a) {
            if (a === b) return this._value();
            this._setOption("value", a);
            return this
        },
        _setOption: function(b, c) {
            b === "value" && (this.options.value = c, this._refreshValue(), this._value() === this.options.max && this._trigger("complete")), a.Widget.prototype._setOption.apply(this, arguments)
        },
        _value: function() {
            var a = this.options.value;
            typeof a != "number" && (a = 0);
            return Math.min(this.options.max, Math.max(this.min, a))
        },
        _percentage: function() {
            return 100 *
                this._value() / this.options.max
        },
        _refreshValue: function() {
            var a = this.value(),
                b = this._percentage();
            this.oldValue !== a && (this.oldValue = a, this._trigger("change")), this.valueDiv.toggle(a > this.min).toggleClass("ui-corner-right", a === this.options.max).width(b.toFixed(0) + "%"), this.element.attr("aria-valuenow", a)
        }
    }), a.extend(a.ui.progressbar, {
        version: "1.8.17"
    })
})(jQuery);
jQuery.effects || function(a, b) {
    function l(b) {
        if (!b || typeof b == "number" || a.fx.speeds[b]) return !0;
        if (typeof b == "string" && !a.effects[b]) return !0;
        return !1
    }

    function k(b, c, d, e) {
        typeof b == "object" && (e = c, d = null, c = b, b = c.effect), a.isFunction(c) && (e = c, d = null, c = {});
        if (typeof c == "number" || a.fx.speeds[c]) e = d, d = c, c = {};
        a.isFunction(d) && (e = d, d = null), c = c || {}, d = d || c.duration, d = a.fx.off ? 0 : typeof d == "number" ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, e = e || c.complete;
        return [b, c, d, e]
    }

    function j(a, b) {
        var c = {
                _: 0
            },
            d;
        for (d in b) a[d] != b[d] && (c[d] = b[d]);
        return c
    }

    function i(b) {
        var c, d;
        for (c in b) d = b[c], (d == null || a.isFunction(d) || c in g || /scrollbar/.test(c) || !/color/i.test(c) && isNaN(parseFloat(d))) && delete b[c];
        return b
    }

    function h() {
        var a = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
            b = {},
            c, d;
        if (a && a.length && a[0] && a[a[0]]) {
            var e = a.length;
            while (e--) c = a[e], typeof a[c] == "string" && (d = c.replace(/\-(\w)/g, function(a, b) {
                return b.toUpperCase()
            }), b[d] = a[c])
        } else
            for (c in a) typeof a[c] ==
                "string" && (b[c] = a[c]);
        return b
    }

    function d(b, d) {
        var e;
        do {
            e = a.curCSS(b, d);
            if (e != "" && e != "transparent" || a.nodeName(b, "body")) break;
            d = "backgroundColor"
        } while (b = b.parentNode);
        return c(e)
    }

    function c(b) {
        var c;
        if (b && b.constructor == Array && b.length == 3) return b;
        if (c = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b)) return [parseInt(c[1], 10), parseInt(c[2], 10), parseInt(c[3], 10)];
        if (c = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b)) return [parseFloat(c[1]) *
            2.55, parseFloat(c[2]) * 2.55, parseFloat(c[3]) * 2.55
        ];
        if (c = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b)) return [parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16)];
        if (c = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b)) return [parseInt(c[1] + c[1], 16), parseInt(c[2] + c[2], 16), parseInt(c[3] + c[3], 16)];
        if (c = /rgba\(0, 0, 0, 0\)/.exec(b)) return e.transparent;
        return e[a.trim(b).toLowerCase()]
    }
    a.effects = {}, a.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor",
        "borderColor", "color", "outlineColor"
    ], function(b, e) {
        a.fx.step[e] = function(a) {
            a.colorInit || (a.start = d(a.elem, e), a.end = c(a.end), a.colorInit = !0), a.elem.style[e] = "rgb(" + Math.max(Math.min(parseInt(a.pos * (a.end[0] - a.start[0]) + a.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[1] - a.start[1]) + a.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[2] - a.start[2]) + a.start[2], 10), 255), 0) + ")"
        }
    });
    var e = {
            aqua: [0, 255, 255],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            black: [0, 0, 0],
            blue: [0, 0,
                255
            ],
            brown: [165, 42, 42],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgrey: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkviolet: [148, 0, 211],
            fuchsia: [255, 0, 255],
            gold: [255, 215, 0],
            green: [0, 128, 0],
            indigo: [75, 0, 130],
            khaki: [240, 230, 140],
            lightblue: [173, 216, 230],
            lightcyan: [224, 255, 255],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255,
                182, 193
            ],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            navy: [0, 0, 128],
            olive: [128, 128, 0],
            orange: [255, 165, 0],
            pink: [255, 192, 203],
            purple: [128, 0, 128],
            violet: [128, 0, 128],
            red: [255, 0, 0],
            silver: [192, 192, 192],
            white: [255, 255, 255],
            yellow: [255, 255, 0],
            transparent: [255, 255, 255]
        },
        f = ["add", "remove", "toggle"],
        g = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
    a.effects.animateClass = function(b, c, d, e) {
        a.isFunction(d) && (e = d,
            d = null);
        return this.queue(function() {
            var g = a(this),
                k = g.attr("style") || " ",
                l = i(h.call(this)),
                m, n = g.attr("class");
            a.each(f, function(a, c) {
                b[c] && g[c + "Class"](b[c])
            }), m = i(h.call(this)), g.attr("class", n), g.animate(j(l, m), {
                queue: !1,
                duration: c,
                easing: d,
                complete: function() {
                    a.each(f, function(a, c) {
                        b[c] && g[c + "Class"](b[c])
                    }), typeof g.attr("style") == "object" ? (g.attr("style").cssText = "", g.attr("style").cssText = k) : g.attr("style", k), e && e.apply(this, arguments), a.dequeue(this)
                }
            })
        })
    }, a.fn.extend({
        _addClass: a.fn.addClass,
        addClass: function(b, c, d, e) {
            return c ? a.effects.animateClass.apply(this, [{
                add: b
            }, c, d, e]) : this._addClass(b)
        },
        _removeClass: a.fn.removeClass,
        removeClass: function(b, c, d, e) {
            return c ? a.effects.animateClass.apply(this, [{
                remove: b
            }, c, d, e]) : this._removeClass(b)
        },
        _toggleClass: a.fn.toggleClass,
        toggleClass: function(c, d, e, f, g) {
            return typeof d == "boolean" || d === b ? e ? a.effects.animateClass.apply(this, [d ? {
                add: c
            } : {
                remove: c
            }, e, f, g]) : this._toggleClass(c, d) : a.effects.animateClass.apply(this, [{
                toggle: c
            }, d, e, f])
        },
        switchClass: function(b,
            c, d, e, f) {
            return a.effects.animateClass.apply(this, [{
                add: c,
                remove: b
            }, d, e, f])
        }
    }), a.extend(a.effects, {
        version: "1.8.17",
        save: function(a, b) {
            for (var c = 0; c < b.length; c++) b[c] !== null && a.data("ec.storage." + b[c], a[0].style[b[c]])
        },
        restore: function(a, b) {
            for (var c = 0; c < b.length; c++) b[c] !== null && a.css(b[c], a.data("ec.storage." + b[c]))
        },
        setMode: function(a, b) {
            b == "toggle" && (b = a.is(":hidden") ? "show" : "hide");
            return b
        },
        getBaseline: function(a, b) {
            var c, d;
            switch (a[0]) {
                case "top":
                    c = 0;
                    break;
                case "middle":
                    c = .5;
                    break;
                case "bottom":
                    c =
                        1;
                    break;
                default:
                    c = a[0] / b.height
            }
            switch (a[1]) {
                case "left":
                    d = 0;
                    break;
                case "center":
                    d = .5;
                    break;
                case "right":
                    d = 1;
                    break;
                default:
                    d = a[1] / b.width
            }
            return {
                x: d,
                y: c
            }
        },
        createWrapper: function(b) {
            if (b.parent().is(".ui-effects-wrapper")) return b.parent();
            var c = {
                    width: b.outerWidth(!0),
                    height: b.outerHeight(!0),
                    "float": b.css("float")
                },
                d = a("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                }),
                e = document.activeElement;
            b.wrap(d), (b[0] === e || a.contains(b[0],
                e)) && a(e).focus(), d = b.parent(), b.css("position") == "static" ? (d.css({
                position: "relative"
            }), b.css({
                position: "relative"
            })) : (a.extend(c, {
                position: b.css("position"),
                zIndex: b.css("z-index")
            }), a.each(["top", "left", "bottom", "right"], function(a, d) {
                c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto")
            }), b.css({
                position: "relative",
                top: 0,
                left: 0,
                right: "auto",
                bottom: "auto"
            }));
            return d.css(c).show()
        },
        removeWrapper: function(b) {
            var c, d = document.activeElement;
            if (b.parent().is(".ui-effects-wrapper")) {
                c = b.parent().replaceWith(b), (b[0] === d || a.contains(b[0], d)) && a(d).focus();
                return c
            }
            return b
        },
        setTransition: function(b, c, d, e) {
            e = e || {}, a.each(c, function(a, c) {
                unit = b.cssUnit(c), unit[0] > 0 && (e[c] = unit[0] * d + unit[1])
            });
            return e
        }
    }), a.fn.extend({
        effect: function(b, c, d, e) {
            var f = k.apply(this, arguments),
                g = {
                    options: f[1],
                    duration: f[2],
                    callback: f[3]
                },
                h = g.options.mode,
                i = a.effects[b];
            if (a.fx.off || !i) return h ? this[h](g.duration, g.callback) : this.each(function() {
                g.callback && g.callback.call(this)
            });
            return i.call(this, g)
        },
        _show: a.fn.show,
        show: function(a) {
            if (l(a)) return this._show.apply(this,
                arguments);
            var b = k.apply(this, arguments);
            b[1].mode = "show";
            return this.effect.apply(this, b)
        },
        _hide: a.fn.hide,
        hide: function(a) {
            if (l(a)) return this._hide.apply(this, arguments);
            var b = k.apply(this, arguments);
            b[1].mode = "hide";
            return this.effect.apply(this, b)
        },
        __toggle: a.fn.toggle,
        toggle: function(b) {
            if (l(b) || typeof b == "boolean" || a.isFunction(b)) return this.__toggle.apply(this, arguments);
            var c = k.apply(this, arguments);
            c[1].mode = "toggle";
            return this.effect.apply(this, c)
        },
        cssUnit: function(b) {
            var c = this.css(b),
                d = [];
            a.each(["em", "px", "%", "pt"], function(a, b) {
                c.indexOf(b) > 0 && (d = [parseFloat(c), b])
            });
            return d
        }
    }), a.easing.jswing = a.easing.swing, a.extend(a.easing, {
        def: "easeOutQuad",
        swing: function(b, c, d, e, f) {
            return a.easing[a.easing.def](b, c, d, e, f)
        },
        easeInQuad: function(a, b, c, d, e) {
            return d * (b /= e) * b + c
        },
        easeOutQuad: function(a, b, c, d, e) {
            return -d * (b /= e) * (b - 2) + c
        },
        easeInOutQuad: function(a, b, c, d, e) {
            if ((b /= e / 2) < 1) return d / 2 * b * b + c;
            return -d / 2 * (--b * (b - 2) - 1) + c
        },
        easeInCubic: function(a, b, c, d, e) {
            return d * (b /= e) * b * b + c
        },
        easeOutCubic: function(a,
            b, c, d, e) {
            return d * ((b = b / e - 1) * b * b + 1) + c
        },
        easeInOutCubic: function(a, b, c, d, e) {
            if ((b /= e / 2) < 1) return d / 2 * b * b * b + c;
            return d / 2 * ((b -= 2) * b * b + 2) + c
        },
        easeInQuart: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b + c
        },
        easeOutQuart: function(a, b, c, d, e) {
            return -d * ((b = b / e - 1) * b * b * b - 1) + c
        },
        easeInOutQuart: function(a, b, c, d, e) {
            if ((b /= e / 2) < 1) return d / 2 * b * b * b * b + c;
            return -d / 2 * ((b -= 2) * b * b * b - 2) + c
        },
        easeInQuint: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b * b + c
        },
        easeOutQuint: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b * b * b + 1) + c
        },
        easeInOutQuint: function(a,
            b, c, d, e) {
            if ((b /= e / 2) < 1) return d / 2 * b * b * b * b * b + c;
            return d / 2 * ((b -= 2) * b * b * b * b + 2) + c
        },
        easeInSine: function(a, b, c, d, e) {
            return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
        },
        easeOutSine: function(a, b, c, d, e) {
            return d * Math.sin(b / e * (Math.PI / 2)) + c
        },
        easeInOutSine: function(a, b, c, d, e) {
            return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
        },
        easeInExpo: function(a, b, c, d, e) {
            return b == 0 ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
        },
        easeOutExpo: function(a, b, c, d, e) {
            return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
        },
        easeInOutExpo: function(a, b, c, d, e) {
            if (b == 0) return c;
            if (b ==
                e) return c + d;
            if ((b /= e / 2) < 1) return d / 2 * Math.pow(2, 10 * (b - 1)) + c;
            return d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
        },
        easeInCirc: function(a, b, c, d, e) {
            return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
        },
        easeOutCirc: function(a, b, c, d, e) {
            return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
        },
        easeInOutCirc: function(a, b, c, d, e) {
            if ((b /= e / 2) < 1) return -d / 2 * (Math.sqrt(1 - b * b) - 1) + c;
            return d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
        },
        easeInElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (b == 0) return c;
            if ((b /= e) == 1) return c + d;
            g || (g = e * .3);
            if (h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f =
                g / (2 * Math.PI) * Math.asin(d / h);
            return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c
        },
        easeOutElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (b == 0) return c;
            if ((b /= e) == 1) return c + d;
            g || (g = e * .3);
            if (h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
        },
        easeInOutElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (b == 0) return c;
            if ((b /= e / 2) == 2) return c + d;
            g || (g = e * .3 * 1.5);
            if (h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g /
                (2 * Math.PI) * Math.asin(d / h);
            if (b < 1) return -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c;
            return h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) * .5 + d + c
        },
        easeInBack: function(a, c, d, e, f, g) {
            g == b && (g = 1.70158);
            return e * (c /= f) * c * ((g + 1) * c - g) + d
        },
        easeOutBack: function(a, c, d, e, f, g) {
            g == b && (g = 1.70158);
            return e * ((c = c / f - 1) * c * ((g + 1) * c + g) + 1) + d
        },
        easeInOutBack: function(a, c, d, e, f, g) {
            g == b && (g = 1.70158);
            if ((c /= f / 2) < 1) return e / 2 * c * c * (((g *= 1.525) + 1) * c - g) + d;
            return e / 2 * ((c -= 2) * c * (((g *= 1.525) + 1) * c + g) + 2) + d
        },
        easeInBounce: function(b,
            c, d, e, f) {
            return e - a.easing.easeOutBounce(b, f - c, 0, e, f) + d
        },
        easeOutBounce: function(a, b, c, d, e) {
            return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
        },
        easeInOutBounce: function(b, c, d, e, f) {
            if (c < f / 2) return a.easing.easeInBounce(b, c * 2, 0, e, f) * .5 + d;
            return a.easing.easeOutBounce(b, c * 2 - f, 0, e, f) * .5 + e * .5 + d
        }
    })
}(jQuery);
(function(a, b) {
    a.effects.highlight = function(b) {
        return this.queue(function() {
            var c = a(this),
                d = ["backgroundImage", "backgroundColor", "opacity"],
                e = a.effects.setMode(c, b.options.mode || "show"),
                f = {
                    backgroundColor: c.css("backgroundColor")
                };
            e == "hide" && (f.opacity = 0), a.effects.save(c, d), c.show().css({
                backgroundImage: "none",
                backgroundColor: b.options.color || "#ffff99"
            }).animate(f, {
                queue: !1,
                duration: b.duration,
                easing: b.options.easing,
                complete: function() {
                    e == "hide" && c.hide(), a.effects.restore(c, d), e == "show" && !a.support.opacity &&
                        this.style.removeAttribute("filter"), b.callback && b.callback.apply(this, arguments), c.dequeue()
                }
            })
        })
    }
})(jQuery);
jQuery.extend(jQuery.easing, {
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * (--t * (t - 2) - 1) + b
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
    },
    easeOutSine: function(x, t, b, c, d) {
        return c *
            Math.sin(t / d * (Math.PI / 2)) + b
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
    },
    easeInExpo: function(x, t, b, c, d) {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
    },
    easeOutExpo: function(x, t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
    },
    easeOutCirc: function(x,
        t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 *
            Math.PI) / p) * .5 + c + b
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /=
                d) < 1 / 2.75) return c * (7.5625 * t * t) + b;
        else if (t < 2 / 2.75) return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
        else if (t < 2.5 / 2.75) return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
        else return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b
    }
});
(function($) {
    $.fn.bgIframe = $.fn.bgiframe = function(s) {
        if ($.browser.msie && parseInt($.browser.version) <= 6) {
            s = $.extend({
                top: "auto",
                left: "auto",
                width: "auto",
                height: "auto",
                opacity: true,
                src: "javascript:false;"
            }, s || {});
            var prop = function(n) {
                    return n && n.constructor == Number ? n + "px" : n
                },
                html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + s.src + '"' + 'style="display:block;position:absolute;z-index:-1;' + (s.opacity !== false ? "filter:Alpha(Opacity='0');" : "") + "top:" + (s.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')" :
                    prop(s.top)) + ";" + "left:" + (s.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')" : prop(s.left)) + ";" + "width:" + (s.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')" : prop(s.width)) + ";" + "height:" + (s.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')" : prop(s.height)) + ";" + '"/>';
            return this.each(function() {
                if ($("> iframe.bgiframe", this).length == 0) this.insertBefore(document.createElement(html), this.firstChild)
            })
        }
        return this
    };
    if (!$.browser.version) $.browser.version =
        navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)[1]
})(jQuery);
(function($) {
    var helper = {},
        current, title, tID, IE = $.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent),
        track = false;
    /*$.tooltip = {
        blocked: false,
        defaults: {
            delay: 200,
            showURL: true,
            extraClass: "",
            top: 15,
            left: 15,
            id: "tooltip"
        },
        block: function() {
            $.tooltip.blocked = !$.tooltip.blocked
        }
    };*/
    $.fn.extend({
        /*tooltip: function(settings) {
            settings = $.extend({}, $.tooltip.defaults, settings);
            createHelper(settings);
            return this.each(function() {
                $.data(this, "tooltip-settings", settings);
                this.tooltipText = this.title;
                $(this).removeAttr("title");
                this.alt = ""
            }).hover(save, hide).click(hide)
        },*/
        fixPNG: IE ? function() {
            return this.each(function() {
                var image = $(this).css("backgroundImage");
                if (image.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
                    image = RegExp.$1;
                    $(this).css({
                        "backgroundImage": "none",
                        "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + image + "')"
                    }).each(function() {
                        var position = $(this).css("position");
                        if (position != "absolute" && position != "relative") $(this).css("position", "relative")
                    })
                }
            })
        } : function() {
            return this
        },
        unfixPNG: IE ? function() {
            return this.each(function() {
                $(this).css({
                    "filter": "",
                    backgroundImage: ""
                })
            })
        } : function() {
            return this
        },
        hideWhenEmpty: function() {
            return this.each(function() {
                $(this)[$(this).html() ? "show" : "hide"]()
            })
        },
        url: function() {
            return this.attr("href") || this.attr("src")
        }
    });

    function createHelper(settings) {
        if (helper.parent) return;
        helper.parent = $('<div id="' + settings.id + '"><h3></h3><div class="body"></div><div class="url"></div></div>').appendTo(document.body).hide();
        if ($.fn.bgiframe) helper.parent.bgiframe();
        helper.title = $("h3", helper.parent);
        helper.body = $("div.body", helper.parent);
        helper.url = $("div.url", helper.parent)
    }

    function settings(element) {
        return $.data(element, "tooltip-settings")
    }

    function handle(event) {
        if (settings(this).delay) tID = setTimeout(show, settings(this).delay);
        else show();
        track = !!settings(this).track;
        $(document.body).bind("mousemove", update);
        update(event)
    }

    function save() {
        if ($.tooltip.blocked || this == current || !this.tooltipText && !settings(this).bodyHandler) return;
        current = this;
        title = this.tooltipText;
        if (settings(this).bodyHandler) {
            helper.title.hide();
            var bodyContent = settings(this).bodyHandler.call(this);
            if (bodyContent.nodeType || bodyContent.jquery) helper.body.empty().append(bodyContent);
            else helper.body.html(bodyContent);
            helper.body.show()
        } else if (settings(this).showBody) {
            var parts = title.split(settings(this).showBody);
            helper.title.html(parts.shift()).show();
            helper.body.empty();
            for (var i = 0, part; part = parts[i]; i++) {
                if (i > 0) helper.body.append("<br/>");
                helper.body.append(part)
            }
            helper.body.hideWhenEmpty()
        } else {
            helper.title.html(title).show();
            helper.body.hide()
        }
        if (settings(this).showURL && $(this).url()) helper.url.html($(this).url().replace("http://", "")).show();
        else helper.url.hide();
        helper.parent.addClass(settings(this).extraClass);
        if (settings(this).fixPNG) helper.parent.fixPNG();
        handle.apply(this, arguments)
    }

    function show() {
        tID = null;
        helper.parent.show();
        update()
    }

    function update(event) {
        if ($.tooltip.blocked) return;
        if (!track && helper.parent.is(":visible")) $(document.body).unbind("mousemove", update);
        if (current == null) {
            $(document.body).unbind("mousemove",
                update);
            return
        }
        helper.parent.removeClass("viewport-right").removeClass("viewport-bottom");
        var left = helper.parent[0].offsetLeft;
        var top = helper.parent[0].offsetTop;
        if (event) {
            left = event.pageX + settings(current).left;
            top = event.pageY + settings(current).top;
            helper.parent.css({
                left: left + "px",
                top: top + "px"
            })
        }
        var v = viewport(),
            h = helper.parent[0];
        if (v.x + v.cx < h.offsetLeft + h.offsetWidth) {
            left -= h.offsetWidth + 20 + settings(current).left;
            helper.parent.css({
                left: left + "px"
            }).addClass("viewport-right")
        }
        if (v.y + v.cy < h.offsetTop +
            h.offsetHeight) {
            top -= h.offsetHeight + 20 + settings(current).top;
            helper.parent.css({
                top: top + "px"
            }).addClass("viewport-bottom")
        }
    }

    function viewport() {
        return {
            x: $(window).scrollLeft(),
            y: $(window).scrollTop(),
            cx: $(window).width(),
            cy: $(window).height()
        }
    }

    function hide(event) {
        if ($.tooltip.blocked) return;
        if (tID) clearTimeout(tID);
        current = null;
        helper.parent.hide().removeClass(settings(this).extraClass);
        if (settings(this).fixPNG) helper.parent.unfixPNG()
    }
    $.fn.Tooltip = $.fn.tooltip
})(jQuery);
(function($) {
    var o = $.scrollTo = function(a, b, c) {
        o.window().scrollTo(a, b, c)
    };
    o.defaults = {
        axis: "y",
        duration: 1
    };
    o.window = function() {
        return $($.browser.safari ? "body" : "html")
    };
    $.fn.scrollTo = function(l, m, n) {
        if (typeof m == "object") {
            n = m;
            m = 0
        }
        n = $.extend({}, o.defaults, n);
        m = m || n.speed || n.duration;
        n.queue = n.queue && n.axis.length > 1;
        if (n.queue) m /= 2;
        n.offset = j(n.offset);
        n.over = j(n.over);
        return this.each(function() {
            var a = this,
                b = $(a),
                t = l,
                c, d = {},
                w = b.is("html,body");
            switch (typeof t) {
                case "number":
                case "string":
                    if (/^([+-]=)?\d+(px)?$/.test(t)) {
                        t =
                            j(t);
                        break
                    }
                    t = $(t, this);
                case "object":
                    if (t.is || t.style) c = (t = $(t)).offset()
            }
            $.each(n.axis.split(""), function(i, f) {
                var P = f == "x" ? "Left" : "Top",
                    p = P.toLowerCase(),
                    k = "scroll" + P,
                    e = a[k],
                    D = f == "x" ? "Width" : "Height";
                if (c) {
                    d[k] = c[p] + (w ? 0 : e - b.offset()[p]);
                    if (n.margin) {
                        d[k] -= parseInt(t.css("margin" + P)) || 0;
                        d[k] -= parseInt(t.css("border" + P + "Width")) || 0
                    }
                    d[k] += n.offset[p] || 0;
                    if (n.over[p]) d[k] += t[D.toLowerCase()]() * n.over[p]
                } else d[k] = t[p];
                if (/^\d+$/.test(d[k])) d[k] = d[k] <= 0 ? 0 : Math.min(d[k], h(D));
                if (!i && n.queue) {
                    if (e != d[k]) g(n.onAfterFirst);
                    delete d[k]
                }
            });
            g(n.onAfter);

            function g(a) {
                b.animate(d, m, n.easing, a && function() {
                    a.call(this, l)
                })
            }

            function h(D) {
                var b = w ? $.browser.opera ? document.body : document.documentElement : a;
                return b["scroll" + D] - b["client" + D]
            }
        })
    };

    function j(a) {
        return typeof a == "object" ? a : {
            top: a,
            left: a
        }
    }
})(jQuery);

// MODAL
(function($) {
    $.fn.jqm = function(o) {
        /*
        var p = {
            overlay: 50,
            overlayClass: "jqmOverlay",
            closeClass: "jqmClose",
            trigger: ".jqModal",
            ajax: F,
            ajaxText: "",
            target: F,
            modal: F,
            toTop: F,
            onShow: F,
            onHide: F,
            onLoad: F
        };
        return this.each(function() {
            if (this._jqm) return H[this._jqm].c = $.extend({}, H[this._jqm].c, o);
            s++;
            this._jqm = s;
            H[s] = {
                c: $.extend(p, $.jqm.params, o),
                a: F,
                w: $(this).addClass("jqmID" + s),
                s: s
            };
            if (p.trigger) $(this).jqmAddTrigger(p.trigger)
        })
        */
        console.log('jqm INIT function()');
    };
    $.fn.jqmAddClose = function(e) {
        return hs(this, e, "jqmHide")
    };
    $.fn.jqmAddTrigger = function(e) {
        return hs(this,
            e, "jqmShow")
    };
    $.fn.jqmShow = function(t) {
        console.log('jqmShow function()');
        /*return this.each(function() {
            $.jqm.open(this._jqm, t)
        })*/
    };
    $.fn.jqmHide = function(t) {
        return this.each(function() {
            //$.jqm.close(this._jqm, t)
            $(this).modal('hide');
        })
    };
    $.jqm = {
        //console.log('jqm function()');
        /*
        hash: {},
        open: function(s, t) {
            var h = H[s],
                c = h.c,
                cc = "." + c.closeClass,
                z = parseInt(h.w.css("z-index")),
                z = z > 0 ? z : 3E3,
                o = $("<div></div>").css({
                    height: "100%",
                    width: "100%",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    "z-index": z - 1,
                    opacity: c.overlay / 100
                });
            if (h.a) return F;
            h.t = t;
            h.a = true;
            h.w.css("z-index", z);
            if (c.modal) {
                if (!A[0]) L("bind");
                A.push(s)
            } else if (c.overlay >
                0) h.w.jqmAddClose(o);
            else o = F;
            h.o = o ? o.addClass(c.overlayClass).prependTo("body") : F;
            if (ie6) {
                $("html,body").css({
                    height: "100%",
                    width: "100%"
                });
                if (o) {
                    o = o.css({
                        position: "absolute"
                    })[0];
                    for (var y in {
                            Top: 1,
                            Left: 1
                        }) o.style.setExpression(y.toLowerCase(), "(_=(document.documentElement.scroll" + y + " || document.body.scroll" + y + "))+'px'")
                }
            }
            if (c.ajax) {
                var r = c.target || h.w,
                    u = c.ajax,
                    r = typeof r == "string" ? $(r, h.w) : $(r),
                    u = u.substr(0, 1) == "@" ? $(t).attr(u.substring(1)) : u;
                r.html(c.ajaxText).load(u, function() {
                    if (c.onLoad) c.onLoad.call(this,
                        h);
                    if (cc) h.w.jqmAddClose($(cc, h.w));
                    e(h)
                })
            } else if (cc) h.w.jqmAddClose($(cc, h.w));
            if (c.toTop && h.o) h.w.before('<span id="jqmP' + h.w[0]._jqm + '"></span>').insertAfter(h.o);
            c.onShow ? c.onShow(h) : h.w.show();
            e(h);
            return F
        },
        close: function(s) {
            var h = H[s];
            if (!h.a) return F;
            h.a = F;
            if (A[0]) {
                A.pop();
                if (!A[0]) L("unbind")
            }
            if (h.c.toTop && h.o) $("#jqmP" + h.w[0]._jqm).after(h.w).remove();
            if (h.c.onHide) h.c.onHide(h);
            else {
                h.w.hide();
                if (h.o) h.o.remove()
            }
            return F
        },
        params: {}
        */
    };
    /*var s = 0,
        H = $.jqm.hash,
        A = [],
        ie6 = $.browser.msie && $.browser.version ==
        "6.0",
        F = false,
        i = $('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({
            opacity: 0
        }),
        e = function(h) {
            if (ie6)
                if (h.o) h.o.html('<p style="width:100%;height:100%"/>').prepend(i);
                else if (!$("iframe.jqm", h.w)[0]) h.w.prepend(i);
            f(h)
        },
        f = function(h) {
            try {
                $(":input:visible", h.w)[0].focus()
            } catch (_) {}
        },
        L = function(t) {
            $()[t]("keypress", m)[t]("keydown", m)[t]("mousedown", m)
        },
        m = function(e) {
            var h = H[A[A.length - 1]],
                r = !$(e.target).parents(".jqmID" + h.s)[0];
            if (r) f(h);
            return !r
        },
        hs = function(w, t,
            c) {
            return w.each(function() {
                var s = this._jqm;
                $(t).each(function() {
                    if (!this[c]) {
                        this[c] = [];
                        $(this).click(function() {
                            for (var i in {
                                    jqmShow: 1,
                                    jqmHide: 1
                                })
                                for (var s in this[i])
                                    if (H[this[i][s]]) H[this[i][s]].w[i](this);
                            return F
                        })
                    }
                    this[c].push(s)
                })
            })
        }
        */
})(jQuery);

jQuery.checksave = function(context) {
    var pageVals = {};
    var _this = this;
    var $elems = jQuery("input:text, input:checked, textarea, select", context);
    $elems.each(function(i) {
        jQuery(this).data("checksaveStartValue", jQuery(this).val())
    });
    window.onbeforeunload = function(e) {
        var msg = "";
        var changedMsg = "You are about to lose unsaved data. Do you want to continue?";
        $elems.each(function(i) {
            if (jQuery(this).data("checksaveStartValue") != undefined && jQuery(this).data("checksaveStartValue").toString() != jQuery(this).val().toString()) {
                msg =
                    changedMsg;
                return changedMsg
            }
        });
        if (msg.length) return msg
    }
};
jQuery.removeChecksave = function() {
    window.onbeforeunload = null
};
jQuery.removeChecksaveValue = function(elem) {
    jQuery(elem).data("checksaveStartValue", null)
};
jQuery.changeChecksaveValue = function(elem, val) {
    jQuery(elem).data("checksaveStartValue", val)
};
jQuery.refreshChecksaveValue = function(elem) {
    var val = jQuery(elem).val();
    jQuery.changeChecksaveValue(elem, val)
};
(function($) {
    jQuery.fn.checksave = function(o) {
        return this.each(function() {})
    }
})(jQuery);
(function($) {
    $.fn.ajaxSubmit = function(options) {
        if (!this.length) {
            log("ajaxSubmit: skipping submit process - no element selected");
            return this
        }
        var method, action, url, $form = this;
        if (typeof options == "function") options = {
            success: options
        };
        method = this.attr("method");
        action = this.attr("action");
        url = typeof action === "string" ? $.trim(action) : "";
        url = url || window.location.href || "";
        if (url) url = (url.match(/^([^#]+)/) || [])[1];
        options = $.extend(true, {
            url: url,
            success: $.ajaxSettings.success,
            type: method || "GET",
            iframeSrc: /^https/i.test(window.location.href ||
                "") ? "javascript:false" : "about:blank"
        }, options);
        var veto = {};
        this.trigger("form-pre-serialize", [this, options, veto]);
        if (veto.veto) {
            log("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
            return this
        }
        if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
            log("ajaxSubmit: submit aborted via beforeSerialize callback");
            return this
        }
        var traditional = options.traditional;
        if (traditional === undefined) traditional = $.ajaxSettings.traditional;
        var qx, n, v, a = this.formToArray(options.semantic);
        if (options.data) {
            options.extraData = options.data;
            qx = $.param(options.data, traditional)
        }
        if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
            log("ajaxSubmit: submit aborted via beforeSubmit callback");
            return this
        }
        this.trigger("form-submit-validate", [a, this, options, veto]);
        if (veto.veto) {
            log("ajaxSubmit: submit vetoed via form-submit-validate trigger");
            return this
        }
        var q = $.param(a, traditional);
        if (qx) q = q ? q + "&" + qx : qx;
        if (options.type.toUpperCase() == "GET") {
            options.url += (options.url.indexOf("?") >=
                0 ? "&" : "?") + q;
            options.data = null
        } else options.data = q;
        var callbacks = [];
        if (options.resetForm) callbacks.push(function() {
            $form.resetForm()
        });
        if (options.clearForm) callbacks.push(function() {
            $form.clearForm(options.includeHidden)
        });
        if (!options.dataType && options.target) {
            var oldSuccess = options.success || function() {};
            callbacks.push(function(data) {
                var fn = options.replaceTarget ? "replaceWith" : "html";
                $(options.target)[fn](data).each(oldSuccess, arguments)
            })
        } else if (options.success) callbacks.push(options.success);
        options.success =
            function(data, status, xhr) {
                var context = options.context || options;
                for (var i = 0, max = callbacks.length; i < max; i++) callbacks[i].apply(context, [data, status, xhr || $form, $form])
            };
        var fileInputs = $("input:file:enabled[value]", this);
        var hasFileInputs = fileInputs.length > 0;
        var mp = "multipart/form-data";
        var multipart = $form.attr("enctype") == mp || $form.attr("encoding") == mp;
        var fileAPI = !!(hasFileInputs && fileInputs.get(0).files && window.FormData);
        log("fileAPI :" + fileAPI);
        var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;
        if (options.iframe !== false && (options.iframe || shouldUseFrame))
            if (options.closeKeepAlive) $.get(options.closeKeepAlive, function() {
                fileUploadIframe(a)
            });
            else fileUploadIframe(a);
        else if ((hasFileInputs || multipart) && fileAPI) {
            options.progress = options.progress || $.noop;
            fileUploadXhr(a)
        } else $.ajax(options);
        this.trigger("form-submit-notify", [this, options]);
        return this;

        function fileUploadXhr(a) {
            var formdata = new FormData;
            for (var i = 0; i < a.length; i++) {
                if (a[i].type == "file") continue;
                formdata.append(a[i].name, a[i].value)
            }
            $form.find("input:file:enabled").each(function() {
                var name =
                    $(this).attr("name"),
                    files = this.files;
                if (name)
                    for (var i = 0; i < files.length; i++) formdata.append(name, files[i])
            });
            options.data = null;
            var _beforeSend = options.beforeSend;
            options.beforeSend = function(xhr, options) {
                options.data = formdata;
                if (xhr.upload) xhr.upload.onprogress = function(event) {
                    options.progress(event.position, event.total)
                };
                if (_beforeSend) _beforeSend.call(options, xhr, options)
            };
            $.ajax(options)
        }

        function fileUploadIframe(a) {
            var form = $form[0],
                el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
            var useProp = !!$.fn.prop;
            if (a)
                if (useProp)
                    for (i = 0; i < a.length; i++) {
                        el = $(form[a[i].name]);
                        el.prop("disabled", false)
                    } else
                        for (i = 0; i < a.length; i++) {
                            el = $(form[a[i].name]);
                            el.removeAttr("disabled")
                        }
                if ($(":input[name=submit],:input[id=submit]", form).length) {
                    alert('Error: Form elements must not have name or id of "submit".');
                    return
                }
            s = $.extend(true, {}, $.ajaxSettings, options);
            s.context = s.context || s;
            id = "jqFormIO" + (new Date).getTime();
            if (s.iframeTarget) {
                $io = $(s.iframeTarget);
                n = $io.attr("name");
                if (n == null) $io.attr("name", id);
                else id = n
            } else {
                $io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />');
                $io.css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                })
            }
            io = $io[0];
            xhr = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(status) {
                    var e = status === "timeout" ? "timeout" : "aborted";
                    log("aborting upload... " + e);
                    this.aborted = 1;
                    $io.attr("src", s.iframeSrc);
                    xhr.error = e;
                    s.error && s.error.call(s.context, xhr,
                        e, status);
                    g && $.event.trigger("ajaxError", [xhr, s, e]);
                    s.complete && s.complete.call(s.context, xhr, e)
                }
            };
            g = s.global;
            if (g && !$.active++) $.event.trigger("ajaxStart");
            if (g) $.event.trigger("ajaxSend", [xhr, s]);
            if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
                if (s.global) $.active--;
                return
            }
            if (xhr.aborted) return;
            sub = form.clk;
            if (sub) {
                n = sub.name;
                if (n && !sub.disabled) {
                    s.extraData = s.extraData || {};
                    s.extraData[n] = sub.value;
                    if (sub.type == "image") {
                        s.extraData[n + ".x"] = form.clk_x;
                        s.extraData[n + ".y"] = form.clk_y
                    }
                }
            }
            var CLIENT_TIMEOUT_ABORT =
                1;
            var SERVER_ABORT = 2;

            function getDoc(frame) {
                var doc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument ? frame.contentDocument : frame.document;
                return doc
            }
            var csrf_token = $("meta[name=csrf-token]").attr("content");
            var csrf_param = $("meta[name=csrf-param]").attr("content");
            if (csrf_param && csrf_token) {
                s.extraData = s.extraData || {};
                s.extraData[csrf_param] = csrf_token
            }

            function doSubmit() {
                var t = $form.attr("target"),
                    a = $form.attr("action");
                form.setAttribute("target", id);
                if (!method) form.setAttribute("method",
                    "POST");
                if (a != s.url) form.setAttribute("action", s.url);
                if (!s.skipEncodingOverride && (!method || /post/i.test(method))) $form.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                });
                if (s.timeout) timeoutHandle = setTimeout(function() {
                    timedOut = true;
                    cb(CLIENT_TIMEOUT_ABORT)
                }, s.timeout);

                function checkState() {
                    try {
                        var state = getDoc(io).readyState;
                        log("state = " + state);
                        if (state.toLowerCase() == "uninitialized") setTimeout(checkState, 50)
                    } catch (e) {
                        log("Server abort: ", e, " (", e.name, ")");
                        cb(SERVER_ABORT);
                        timeoutHandle && clearTimeout(timeoutHandle);
                        timeoutHandle = undefined
                    }
                }
                var extraInputs = [];
                try {
                    if (s.extraData)
                        for (var n in s.extraData) extraInputs.push($('<input type="hidden" name="' + n + '">').attr("value", s.extraData[n]).appendTo(form)[0]);
                    if (!s.iframeTarget) {
                        $io.appendTo("body");
                        io.attachEvent ? io.attachEvent("onload", cb) : io.addEventListener("load", cb, false)
                    }
                    setTimeout(checkState, 15);
                    form.submit()
                } finally {
                    form.setAttribute("action", a);
                    if (t) form.setAttribute("target", t);
                    else $form.removeAttr("target");
                    $(extraInputs).remove()
                }
            }
            if (s.forceSync) doSubmit();
            else setTimeout(doSubmit, 10);
            var data, doc, domCheckCount = 50,
                callbackProcessed;

            function cb(e) {
                if (xhr.aborted || callbackProcessed) return;
                try {
                    doc = getDoc(io)
                } catch (ex) {
                    log("cannot access response document: ", ex);
                    e = SERVER_ABORT
                }
                if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                    xhr.abort("timeout");
                    return
                } else if (e == SERVER_ABORT && xhr) {
                    xhr.abort("server abort");
                    return
                }
                if (!doc || doc.location.href == s.iframeSrc)
                    if (!timedOut) return;
                io.detachEvent ? io.detachEvent("onload", cb) : io.removeEventListener("load",
                    cb, false);
                var status = "success",
                    errMsg;
                try {
                    if (timedOut) throw "timeout";
                    var isXml = s.dataType == "xml" || doc.XMLDocument || $.isXMLDoc(doc);
                    log("isXml=" + isXml);
                    if (!isXml && window.opera && (doc.body == null || doc.body.innerHTML == ""))
                        if (--domCheckCount) {
                            log("requeing onLoad callback, DOM not available");
                            setTimeout(cb, 250);
                            return
                        }
                    var docRoot = doc.body ? doc.body : doc.documentElement;
                    xhr.responseText = docRoot ? docRoot.innerHTML : null;
                    xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                    if (isXml) s.dataType = "xml";
                    xhr.getResponseHeader =
                        function(header) {
                            var headers = {
                                "content-type": s.dataType
                            };
                            return headers[header]
                        };
                    if (docRoot) {
                        xhr.status = Number(docRoot.getAttribute("status")) || xhr.status;
                        xhr.statusText = docRoot.getAttribute("statusText") || xhr.statusText
                    }
                    var dt = (s.dataType || "").toLowerCase();
                    var scr = /(json|script|text)/.test(dt);
                    if (scr || s.textarea) {
                        var ta = doc.getElementsByTagName("textarea")[0];
                        if (ta) {
                            xhr.responseText = ta.value;
                            xhr.status = Number(ta.getAttribute("status")) || xhr.status;
                            xhr.statusText = ta.getAttribute("statusText") || xhr.statusText
                        } else if (scr) {
                            var pre =
                                doc.getElementsByTagName("pre")[0];
                            var b = doc.getElementsByTagName("body")[0];
                            if (pre) xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
                            else if (b) xhr.responseText = b.textContent ? b.textContent : b.innerText
                        }
                    } else if (dt == "xml" && !xhr.responseXML && xhr.responseText != null) xhr.responseXML = toXml(xhr.responseText);
                    try {
                        data = httpData(xhr, dt, s)
                    } catch (e) {
                        status = "parsererror";
                        xhr.error = errMsg = e || status
                    }
                } catch (e) {
                    log("error caught: ", e);
                    status = "error";
                    xhr.error = errMsg = e || status
                }
                if (xhr.aborted) {
                    log("upload aborted");
                    status = null
                }
                if (xhr.status) status = xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 ? "success" : "error";
                if (status === "success") {
                    s.success && s.success.call(s.context, data, "success", xhr);
                    g && $.event.trigger("ajaxSuccess", [xhr, s])
                } else if (status) {
                    if (errMsg == undefined) errMsg = xhr.statusText;
                    s.error && s.error.call(s.context, xhr, status, errMsg);
                    g && $.event.trigger("ajaxError", [xhr, s, errMsg])
                }
                g && $.event.trigger("ajaxComplete", [xhr, s]);
                if (g && !--$.active) $.event.trigger("ajaxStop");
                s.complete && s.complete.call(s.context,
                    xhr, status);
                callbackProcessed = true;
                if (s.timeout) clearTimeout(timeoutHandle);
                setTimeout(function() {
                    if (!s.iframeTarget) $io.remove();
                    xhr.responseXML = null
                }, 100)
            }
            var toXml = $.parseXML || function(s, doc) {
                if (window.ActiveXObject) {
                    doc = new ActiveXObject("Microsoft.XMLDOM");
                    doc.async = "false";
                    doc.loadXML(s)
                } else doc = (new DOMParser).parseFromString(s, "text/xml");
                return doc && doc.documentElement && doc.documentElement.nodeName != "parsererror" ? doc : null
            };
            var parseJSON = $.parseJSON || function(s) {
                return window["eval"]("(" +
                    s + ")")
            };
            var httpData = function(xhr, type, s) {
                var ct = xhr.getResponseHeader("content-type") || "",
                    xml = type === "xml" || !type && ct.indexOf("xml") >= 0,
                    data = xml ? xhr.responseXML : xhr.responseText;
                if (xml && data.documentElement.nodeName === "parsererror") $.error && $.error("parsererror");
                if (s && s.dataFilter) data = s.dataFilter(data, type);
                if (typeof data === "string")
                    if (type === "json" || !type && ct.indexOf("json") >= 0) data = parseJSON(data);
                    else if (type === "script" || !type && ct.indexOf("javascript") >= 0) $.globalEval(data);
                return data
            }
        }
    };
    $.fn.ajaxForm = function(options) {
        if (this.length === 0) {
            var o = {
                s: this.selector,
                c: this.context
            };
            if (!$.isReady && o.s) {
                log("DOM not ready, queuing ajaxForm");
                $(function() {
                    $(o.s, o.c).ajaxForm(options)
                });
                return this
            }
            log("terminating; zero elements found by selector" + ($.isReady ? "" : " (DOM not ready)"));
            return this
        }
        return this.ajaxFormUnbind().bind("submit.form-plugin", function(e) {
            if (!e.isDefaultPrevented()) {
                e.preventDefault();
                $(this).ajaxSubmit(options)
            }
        }).bind("click.form-plugin", function(e) {
            var target = e.target;
            var $el = $(target);
            if (!$el.is(":submit,input:image")) {
                var t = $el.closest(":submit");
                if (t.length == 0) return;
                target = t[0]
            }
            var form = this;
            form.clk = target;
            if (target.type == "image")
                if (e.offsetX != undefined) {
                    form.clk_x = e.offsetX;
                    form.clk_y = e.offsetY
                } else if (typeof $.fn.offset == "function") {
                var offset = $el.offset();
                form.clk_x = e.pageX - offset.left;
                form.clk_y = e.pageY - offset.top
            } else {
                form.clk_x = e.pageX - target.offsetLeft;
                form.clk_y = e.pageY - target.offsetTop
            }
            setTimeout(function() {
                form.clk = form.clk_x = form.clk_y = null
            }, 100)
        })
    };
    $.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    };
    $.fn.formToArray = function(semantic) {
        var a = [];
        if (this.length === 0) return a;
        var form = this[0];
        var els = semantic ? form.getElementsByTagName("*") : form.elements;
        if (!els) return a;
        var i, j, n, v, el, max, jmax;
        for (i = 0, max = els.length; i < max; i++) {
            el = els[i];
            n = el.name;
            if (!n) continue;
            if (semantic && form.clk && el.type == "image") {
                if (!el.disabled && form.clk == el) {
                    a.push({
                        name: n,
                        value: $(el).val(),
                        type: el.type
                    });
                    a.push({
                        name: n + ".x",
                        value: form.clk_x
                    }, {
                        name: n + ".y",
                        value: form.clk_y
                    })
                }
                continue
            }
            v = $.fieldValue(el, true);
            if (v && v.constructor == Array)
                for (j = 0, jmax = v.length; j < jmax; j++) a.push({
                    name: n,
                    value: v[j]
                });
            else if (v !== null && typeof v != "undefined") a.push({
                name: n,
                value: v,
                type: el.type
            })
        }
        if (!semantic && form.clk) {
            var $input = $(form.clk),
                input = $input[0];
            n = input.name;
            if (n && !input.disabled && input.type == "image") {
                a.push({
                    name: n,
                    value: $input.val()
                });
                a.push({
                    name: n + ".x",
                    value: form.clk_x
                }, {
                    name: n + ".y",
                    value: form.clk_y
                })
            }
        }
        return a
    };
    $.fn.formSerialize = function(semantic) {
        return $.param(this.formToArray(semantic))
    };
    $.fn.fieldSerialize = function(successful) {
        var a = [];
        this.each(function() {
            var n = this.name;
            if (!n) return;
            var v = $.fieldValue(this, successful);
            if (v && v.constructor == Array)
                for (var i = 0, max = v.length; i < max; i++) a.push({
                    name: n,
                    value: v[i]
                });
            else if (v !== null && typeof v != "undefined") a.push({
                name: this.name,
                value: v
            })
        });
        return $.param(a)
    };
    $.fn.fieldValue = function(successful) {
        for (var val = [], i = 0, max = this.length; i < max; i++) {
            var el = this[i];
            var v = $.fieldValue(el, successful);
            if (v === null || typeof v == "undefined" || v.constructor ==
                Array && !v.length) continue;
            v.constructor == Array ? $.merge(val, v) : val.push(v)
        }
        return val
    };
    $.fieldValue = function(el, successful) {
        var n = el.name,
            t = el.type,
            tag = el.tagName.toLowerCase();
        if (successful === undefined) successful = true;
        if (successful && (!n || el.disabled || t == "reset" || t == "button" || (t == "checkbox" || t == "radio") && !el.checked || (t == "submit" || t == "image") && el.form && el.form.clk != el || tag == "select" && el.selectedIndex == -1)) return null;
        if (tag == "select") {
            var index = el.selectedIndex;
            if (index < 0) return null;
            var a = [],
                ops =
                el.options;
            var one = t == "select-one";
            var max = one ? index + 1 : ops.length;
            for (var i = one ? index : 0; i < max; i++) {
                var op = ops[i];
                if (op.selected) {
                    var v = op.value;
                    if (!v) v = op.attributes && op.attributes["value"] && !op.attributes["value"].specified ? op.text : op.value;
                    if (one) return v;
                    a.push(v)
                }
            }
            return a
        }
        return $(el).val()
    };
    $.fn.clearForm = function(includeHidden) {
        return this.each(function() {
            $("input,select,textarea", this).clearFields(includeHidden)
        })
    };
    $.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
        var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var t = this.type,
                tag = this.tagName.toLowerCase();
            if (re.test(t) || tag == "textarea" || includeHidden && /hidden/.test(t)) this.value = "";
            else if (t == "checkbox" || t == "radio") this.checked = false;
            else if (tag == "select") this.selectedIndex = -1
        })
    };
    $.fn.resetForm = function() {
        return this.each(function() {
            if (typeof this.reset == "function" || typeof this.reset == "object" && !this.reset.nodeType) this.reset()
        })
    };
    $.fn.enable = function(b) {
        if (b === undefined) b = true;
        return this.each(function() {
            this.disabled = !b
        })
    };
    $.fn.selected = function(select) {
        if (select === undefined) select = true;
        return this.each(function() {
            var t = this.type;
            if (t == "checkbox" || t == "radio") this.checked = select;
            else if (this.tagName.toLowerCase() == "option") {
                var $sel = $(this).parent("select");
                if (select && $sel[0] && $sel[0].type == "select-one") $sel.find("option").selected(false);
                this.selected = select
            }
        })
    };
    $.fn.ajaxSubmit.debug = false;

    function log() {
        if (!$.fn.ajaxSubmit.debug) return;
        var msg = "[jquery.form] " + Array.prototype.join.call(arguments, "");
        if (window.console &&
            window.console.log) window.console.log(msg);
        else if (window.opera && window.opera.postError) window.opera.postError(msg)
    }
})(jQuery);
(function($) {
    $.extend($.fn, {
        swapClass: function(c1, c2) {
            var c1Elements = this.filter("." + c1);
            this.filter("." + c2).removeClass(c2).addClass(c1);
            c1Elements.removeClass(c1).addClass(c2);
            return this
        },
        replaceClass: function(c1, c2) {
            return this.filter("." + c1).removeClass(c1).addClass(c2).end()
        },
        hoverClass: function(className) {
            className = className || "hover";
            return this.hover(function() {
                $(this).addClass(className)
            }, function() {
                $(this).removeClass(className)
            })
        },
        heightToggle: function(animated, callback) {
            animated ? this.animate({
                    height: "toggle"
                },
                animated, callback) : this.each(function() {
                jQuery(this)[jQuery(this).is(":hidden") ? "show" : "hide"]();
                if (callback) callback.apply(this, arguments)
            })
        },
        heightHide: function(animated, callback) {
            if (animated) this.animate({
                height: "hide"
            }, animated, callback);
            else {
                this.hide();
                if (callback) this.each(callback)
            }
        },
        prepareBranches: function(settings) {
            if (!settings.prerendered) {
                this.filter(":last-child:not(ul)").addClass(CLASSES.last);
                this.filter((settings.collapsed ? "" : "." + CLASSES.closed) + ":not(." + CLASSES.open + ")").find(">ul").hide()
            }
            return this.filter(":has(>ul)")
        },
        applyClasses: function(settings, toggler) {
            this.filter(":has(>ul):not(:has(>a))").find(">span").unbind("click.treeview").bind("click.treeview", function(event) {
                if (this == event.target) toggler.apply($(this).next())
            }).add($("a", this)).hoverClass();
            if (!settings.prerendered) {
                this.filter(":has(>ul:hidden)").addClass(CLASSES.expandable).replaceClass(CLASSES.last, CLASSES.lastExpandable);
                this.not(":has(>ul:hidden)").addClass(CLASSES.collapsable).replaceClass(CLASSES.last, CLASSES.lastCollapsable);
                var hitarea = this.find("div." +
                    CLASSES.hitarea);
                if (!hitarea.length) hitarea = this.prepend('<div class="' + CLASSES.hitarea + '"/>').find("div." + CLASSES.hitarea);
                hitarea.removeClass().addClass(CLASSES.hitarea).each(function() {
                    var classes = "";
                    $.each($(this).parent().attr("class").split(" "), function() {
                        classes += this + "-hitarea "
                    });
                    $(this).addClass(classes)
                })
            }
            this.find("div." + CLASSES.hitarea).click(toggler)
        },
        treeview: function(settings) {
            settings = $.extend({
                cookieId: "treeview",
                groupCookieId: "treeview"
            }, settings);
            if (settings.toggle) {
                var callback =
                    settings.toggle;
                settings.toggle = function() {
                    return callback.apply($(this).parent()[0], arguments)
                }
            }

            function treeController(tree, control) {
                function handler(filter) {
                    return function() {
                        toggler.apply($("div." + CLASSES.hitarea, tree).filter(function() {
                            return filter ? $(this).parent("." + filter).length : true
                        }));
                        return false
                    }
                }
                $("a:eq(0)", control).click(handler(CLASSES.collapsable));
                $("a:eq(1)", control).click(handler(CLASSES.expandable));
                $("a:eq(2)", control).click(handler())
            }

            function toggler() {
                $(this).parent().find(">.hitarea").swapClass(CLASSES.collapsableHitarea,
                    CLASSES.expandableHitarea).swapClass(CLASSES.lastCollapsableHitarea, CLASSES.lastExpandableHitarea).end().swapClass(CLASSES.collapsable, CLASSES.expandable).swapClass(CLASSES.lastCollapsable, CLASSES.lastExpandable).find(">ul").heightToggle(settings.animated, settings.toggle);
                if (settings.unique) $(this).parent().siblings().find(">.hitarea").replaceClass(CLASSES.collapsableHitarea, CLASSES.expandableHitarea).replaceClass(CLASSES.lastCollapsableHitarea, CLASSES.lastExpandableHitarea).end().replaceClass(CLASSES.collapsable,
                    CLASSES.expandable).replaceClass(CLASSES.lastCollapsable, CLASSES.lastExpandable).find(">ul").heightHide(settings.animated, settings.toggle)
            }
            this.data("toggler", toggler);

            function serialize() {
                function binary(arg) {
                    return arg ? 1 : 0
                }
                var data = [];
                branches.each(function(i, e) {
                    data[i] = $(e).is(":has(>ul:visible)") ? 1 : 0
                });
                $.supercookie(settings.groupCookieId, settings.cookieId, data.join(""), settings.cookieOptions)
            }

            function deserialize() {
                var stored = $.supercookie(settings.groupCookieId, settings.cookieId);
                if (stored) {
                    var data =
                        stored.split("");
                    branches.each(function(i, e) {
                        $(e).find(">ul")[parseInt(data[i]) ? "show" : "hide"]()
                    })
                }
            }
            this.addClass("treeview");
            var branches = this.find("li").prepareBranches(settings);
            switch (settings.persist) {
                case "cookie":
                    var toggleCallback = settings.toggle;
                    settings.toggle = function() {
                        serialize();
                        if (toggleCallback) toggleCallback.apply(this, arguments)
                    };
                    deserialize();
                    break;
                case "location":
                    var current = this.find("a").filter(function() {
                        return this.href.toLowerCase() == location.href.toLowerCase()
                    });
                    if (current.length) {
                        var items =
                            current.addClass("selected").parents("ul, li").add(current.next()).show();
                        if (settings.prerendered) items.filter("li").swapClass(CLASSES.collapsable, CLASSES.expandable).swapClass(CLASSES.lastCollapsable, CLASSES.lastExpandable).find(">.hitarea").swapClass(CLASSES.collapsableHitarea, CLASSES.expandableHitarea).swapClass(CLASSES.lastCollapsableHitarea, CLASSES.lastExpandableHitarea)
                    }
                    break
            }
            branches.applyClasses(settings, toggler);
            if (settings.control) {
                treeController(this, settings.control);
                $(settings.control).show()
            }
            return this
        }
    });
    $.treeview = {};
    var CLASSES = $.treeview.classes = {
        open: "open",
        closed: "closed",
        expandable: "expandable",
        expandableHitarea: "expandable-hitarea",
        lastExpandableHitarea: "lastExpandable-hitarea",
        collapsable: "collapsable",
        collapsableHitarea: "collapsable-hitarea",
        lastCollapsableHitarea: "lastCollapsable-hitarea",
        lastCollapsable: "lastCollapsable",
        lastExpandable: "lastExpandable",
        last: "last",
        hitarea: "hitarea"
    }
})(jQuery);
jQuery.serialize = function(_obj) {
    if (typeof _obj.toSource !== "undefined" && typeof _obj.callee === "undefined") return _obj.toSource();
    switch (typeof _obj) {
        case "number":
        case "boolean":
        case "function":
            return _obj;
            break;
        case "string":
            return '"' + _obj + '"';
            break;
        case "object":
            var str;
            if (_obj.constructor === Array || typeof _obj.callee !== "undefined") {
                str = "[";
                var i, len = _obj.length;
                for (i = 0; i < len - 1; i++) str += jQuery.serialize(_obj[i]) + ",";
                str += serialize(_obj[i]) + "]"
            } else {
                str = "{";
                var key;
                for (key in _obj) str += '"' + key + '":' +
                    jQuery.serialize(_obj[key]) + ",";
                str = str.replace(/\,$/, "") + "}"
            }
            return str;
            break;
        default:
            return "UNKNOWN";
            break
    }
};
jQuery.cookie = function(name, value, options) {
    if (typeof value != "undefined") {
        options = options || {};
        if (value === null) {
            value = "";
            options.expires = -1
        }
        var expires = "";
        if (options.expires && (typeof options.expires == "number" || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == "number") {
                date = new Date;
                date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1E3)
            } else date = options.expires;
            expires = "; expires=" + date.toUTCString()
        }
        var path = options.path ? "; path=" + options.path : "";
        var domain = options.domain ? "; domain=" +
            options.domain : "";
        var secure = options.secure ? "; secure" : "";
        document.cookie = [name, "=", encodeURIComponent(value), expires, path, domain, secure].join("")
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != "") {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == name + "=") {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break
                }
            }
        }
        return cookieValue
    }
};
jQuery.supercookie = function(name, key, value, options) {
    if (typeof value != "undefined") {
        var cookieObj = jQuery.supercookie(name);
        cookieObj[key] = value;
        var cookieVal = escape(jQuery.serialize(cookieObj));
        jQuery.cookie(name, cookieVal, options)
    } else {
        var cookie = jQuery.cookie(name);
        var cookieObj = null;
        if (cookie) eval("cookieObj = " + unescape(cookie));
        if (!cookieObj) cookieObj = {};
        if (key)
            if (cookieObj[key]) return cookieObj[key];
            else return null;
        else return cookieObj
    }
};
(function(jQuery) {
    jQuery.hotkeys = {
        version: "0.8",
        specialKeys: {
            8: "backspace",
            9: "tab",
            13: "return",
            16: "shift",
            17: "ctrl",
            18: "alt",
            19: "pause",
            20: "capslock",
            27: "esc",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
            45: "insert",
            46: "del",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
            106: "*",
            107: "+",
            109: "-",
            110: ".",
            111: "/",
            112: "f1",
            113: "f2",
            114: "f3",
            115: "f4",
            116: "f5",
            117: "f6",
            118: "f7",
            119: "f8",
            120: "f9",
            121: "f10",
            122: "f11",
            123: "f12",
            144: "numlock",
            145: "scroll",
            191: "/",
            224: "meta"
        },
        shiftNums: {
            "`": "~",
            1: "!",
            2: "@",
            3: "#",
            4: "$",
            5: "%",
            6: "^",
            7: "&",
            8: "*",
            9: "(",
            0: ")",
            "-": "_",
            "=": "+",
            ";": ": ",
            "'": '"',
            ",": "<",
            ".": ">",
            "/": "?",
            "\\": "|"
        }
    };

    function keyHandler(handleObj) {
        if (typeof handleObj.data !== "string") return;
        var origHandler = handleObj.handler,
            keys = handleObj.data.toLowerCase().split(" ");
        handleObj.handler = function(event) {
            if (this !== event.target && (/textarea|select/i.test(event.target.nodeName) || event.target.type === "text")) return;
            var special =
                event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which],
                character = String.fromCharCode(event.which).toLowerCase(),
                key, modif = "",
                possible = {};
            if (event.altKey && special !== "alt") modif += "alt+";
            if (event.ctrlKey && special !== "ctrl") modif += "ctrl+";
            if (event.metaKey && !event.ctrlKey && special !== "meta") modif += "meta+";
            if (event.shiftKey && special !== "shift") modif += "shift+";
            if (special) possible[modif + special] = true;
            else {
                possible[modif + character] = true;
                possible[modif + jQuery.hotkeys.shiftNums[character]] = true;
                if (modif ===
                    "shift+") possible[jQuery.hotkeys.shiftNums[character]] = true
            }
            for (var i = 0, l = keys.length; i < l; i++)
                if (possible[keys[i]]) return origHandler.apply(this, arguments)
        }
    }
    jQuery.each(["keydown", "keyup", "keypress"], function() {
        jQuery.event.special[this] = {
            add: keyHandler
        }
    })
})(jQuery);
jQuery.cookie = function(name, value, options) {
    if (typeof value != "undefined") {
        options = options || {};
        if (value === null) {
            value = "";
            options.expires = -1
        }
        var expires = "";
        if (options.expires && (typeof options.expires == "number" || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == "number") {
                date = new Date;
                date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1E3)
            } else date = options.expires;
            expires = "; expires=" + date.toUTCString()
        }
        var path = options.path ? "; path=" + options.path : "";
        var domain = options.domain ? "; domain=" +
            options.domain : "";
        var secure = options.secure ? "; secure" : "";
        document.cookie = [name, "=", encodeURIComponent(value), expires, path, domain, secure].join("")
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != "") {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == name + "=") {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break
                }
            }
        }
        return cookieValue
    }
};
(function($) {
    jQuery.fn.simpleTab = function(settings) {
        var s = jQuery.extend({
            startIndex: 0,
            childrenSelector: null,
            cookie: false
        }, settings);
        var activeTab = null;
        var activeContent = null;
        var hasCookie = s.cookie && s.cookie.group && s.cookie.name;
        return this.each(function() {
            var _this = this;
            $(this).find("a").each(function(i) {
                var id = $(this).attr("href");
                $(id).hide()
            });
            $children = s.childrenSelector ? $(this).find(s.childrenSelector) : $(this).children();
            $children.click(function() {
                $this = $(this);
                var index = $this.index();
                if (isNaN(index)) index =
                    0;
                if (!activeTab || $this.find("a").attr("href") != activeTab.find("a").attr("href")) {
                    if (activeTab) activeTab.removeClass("active");
                    if (activeContent) activeContent.hide();
                    $this.addClass("active");
                    var id = $(this).find("a").attr("href");
                    activeContent = $(id);
                    activeContent.show();
                    activeTab = $this;
                    $(_this).trigger("tabClicked", [index, activeTab, activeContent, s]);
                    if (hasCookie) $.supercookie(s.cookie.group, s.cookie.name, index.toString(), s.cookie.params);
                    else s.startIndex = 0
                }
                return false
            });
            if (hasCookie) s.startIndex = parseInt($.supercookie(s.cookie.group,
                s.cookie.name));
            if (isNaN(s.startIndex) || $children.size() - 1 < s.startIndex) s.startIndex = 0;
            $(this).children().eq(s.startIndex).click();
            return this
        })
    }
})(jQuery);
jQuery.tableDnD = {
    currentTable: null,
    dragObject: null,
    mouseOffset: null,
    oldY: 0,
    build: function(options) {
        this.each(function() {
            this.tableDnDConfig = jQuery.extend({
                onDragStyle: null,
                onDropStyle: null,
                onDragClass: "tDnD_whileDrag",
                onDrop: null,
                onDragStart: null,
                scrollAmount: 5,
                serializeRegexp: /[^\-]*$/,
                serializeParamName: null,
                dragHandle: null
            }, options || {});
            jQuery.tableDnD.makeDraggable(this)
        });
        jQuery(document).bind("mousemove", jQuery.tableDnD.mousemove).bind("mouseup", jQuery.tableDnD.mouseup);
        return this
    },
    makeDraggable: function(table) {
        var config =
            table.tableDnDConfig;
        if (table.tableDnDConfig.dragHandle) {
            var cells = jQuery("td." + table.tableDnDConfig.dragHandle, table);
            cells.each(function() {
                jQuery(this).mousedown(function(ev) {
                    jQuery.tableDnD.dragObject = this.parentNode;
                    jQuery.tableDnD.currentTable = table;
                    jQuery.tableDnD.mouseOffset = jQuery.tableDnD.getMouseOffset(this, ev);
                    if (config.onDragStart) config.onDragStart(table, this);
                    return false
                })
            })
        } else {
            var rows = jQuery("tr", table);
            rows.each(function() {
                var row = jQuery(this);
                if (!row.hasClass("nodrag")) row.mousedown(function(ev) {
                    if (ev.target.tagName ==
                        "TD") {
                        jQuery.tableDnD.dragObject = this;
                        jQuery.tableDnD.currentTable = table;
                        jQuery.tableDnD.mouseOffset = jQuery.tableDnD.getMouseOffset(this, ev);
                        if (config.onDragStart) config.onDragStart(table, this);
                        return false
                    }
                }).css("cursor", "move")
            })
        }
    },
    updateTables: function() {
        this.each(function() {
            if (this.tableDnDConfig) jQuery.tableDnD.makeDraggable(this)
        })
    },
    mouseCoords: function(ev) {
        if (ev.pageX || ev.pageY) return {
            x: ev.pageX,
            y: ev.pageY
        };
        return {
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY +
                document.body.scrollTop - document.body.clientTop
        }
    },
    getMouseOffset: function(target, ev) {
        ev = ev || window.event;
        var docPos = this.getPosition(target);
        var mousePos = this.mouseCoords(ev);
        return {
            x: mousePos.x - docPos.x,
            y: mousePos.y - docPos.y
        }
    },
    getPosition: function(e) {
        var left = 0;
        var top = 0;
        if (e.offsetHeight == 0) e = e.firstChild;
        while (e.offsetParent) {
            left += e.offsetLeft;
            top += e.offsetTop;
            e = e.offsetParent
        }
        left += e.offsetLeft;
        top += e.offsetTop;
        return {
            x: left,
            y: top
        }
    },
    mousemove: function(ev) {
        if (jQuery.tableDnD.dragObject == null) return;
        var dragObj = jQuery(jQuery.tableDnD.dragObject);
        var config = jQuery.tableDnD.currentTable.tableDnDConfig;
        var mousePos = jQuery.tableDnD.mouseCoords(ev);
        var y = mousePos.y - jQuery.tableDnD.mouseOffset.y;
        var yOffset = window.pageYOffset;
        if (document.all)
            if (typeof document.compatMode != "undefined" && document.compatMode != "BackCompat") yOffset = document.documentElement.scrollTop;
            else if (typeof document.body != "undefined") yOffset = document.body.scrollTop;
        if (mousePos.y - yOffset < config.scrollAmount) window.scrollBy(0, -config.scrollAmount);
        else {
            var windowHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
            if (windowHeight - (mousePos.y - yOffset) < config.scrollAmount) window.scrollBy(0, config.scrollAmount)
        }
        if (y != jQuery.tableDnD.oldY) {
            var movingDown = y > jQuery.tableDnD.oldY;
            jQuery.tableDnD.oldY = y;
            if (config.onDragClass) dragObj.addClass(config.onDragClass);
            else dragObj.css(config.onDragStyle);
            var currentRow = jQuery.tableDnD.findDropTargetRow(dragObj,
                y);
            if (currentRow)
                if (movingDown && jQuery.tableDnD.dragObject != currentRow) try {
                    jQuery.tableDnD.dragObject.parentNode.insertBefore(jQuery.tableDnD.dragObject, currentRow.nextSibling)
                } catch (e) {} else if (!movingDown && jQuery.tableDnD.dragObject != currentRow) try {
                    jQuery.tableDnD.dragObject.parentNode.insertBefore(jQuery.tableDnD.dragObject, currentRow)
                } catch (e) {}
        }
        return false
    },
    findDropTargetRow: function(draggedRow, y) {
        var rows = jQuery.tableDnD.currentTable.rows;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var rowY =
                this.getPosition(row).y;
            var rowHeight = parseInt(row.offsetHeight) / 2;
            if (row.offsetHeight == 0) {
                rowY = this.getPosition(row.firstChild).y;
                rowHeight = parseInt(row.firstChild.offsetHeight) / 2
            }
            if (y > rowY - rowHeight && y < rowY + rowHeight) {
                if (row == draggedRow) return null;
                var config = jQuery.tableDnD.currentTable.tableDnDConfig;
                if (config.onAllowDrop)
                    if (config.onAllowDrop(draggedRow, row)) return row;
                    else return null;
                else {
                    var nodrop = jQuery(row).hasClass("nodrop");
                    if (!nodrop) return row;
                    else return null
                }
                return row
            }
        }
        return null
    },
    mouseup: function(e) {
        if (jQuery.tableDnD.currentTable && jQuery.tableDnD.dragObject) {
            var droppedRow = jQuery.tableDnD.dragObject;
            var config = jQuery.tableDnD.currentTable.tableDnDConfig;
            if (config.onDragClass) jQuery(droppedRow).removeClass(config.onDragClass);
            else jQuery(droppedRow).css(config.onDropStyle);
            jQuery.tableDnD.dragObject = null;
            if (config.onDrop) config.onDrop(jQuery.tableDnD.currentTable, droppedRow);
            jQuery.tableDnD.currentTable = null
        }
    },
    serialize: function() {
        if (jQuery.tableDnD.currentTable) return jQuery.tableDnD.serializeTable(jQuery.tableDnD.currentTable);
        else return "Error: No Table id set, you need to set an id on your table and every row"
    },
    serializeTable: function(table) {
        var result = "";
        var tableId = table.id;
        var rows = table.rows;
        for (var i = 0; i < rows.length; i++) {
            if (result.length > 0) result += "&";
            var rowId = rows[i].id;
            if (rowId && rowId && table.tableDnDConfig && table.tableDnDConfig.serializeRegexp) rowId = rowId.match(table.tableDnDConfig.serializeRegexp)[0];
            result += tableId + "[]=" + rowId
        }
        return result
    },
    serializeTables: function() {
        var result = "";
        this.each(function() {
            result +=
                jQuery.tableDnD.serializeTable(this)
        });
        return result
    }
};
jQuery.fn.extend({
    tableDnD: jQuery.tableDnD.build,
    tableDnDUpdate: jQuery.tableDnD.updateTables,
    tableDnDSerialize: jQuery.tableDnD.serializeTables
});
(function(f, h, $) {
    var a = "placeholder" in h.createElement("input"),
        d = "placeholder" in h.createElement("textarea"),
        i = $.fn,
        c = $.valHooks,
        k, j;
    if (a && d) {
        j = i.placeholder = function() {
            return this
        };
        j.input = j.textarea = true
    } else {
        j = i.placeholder = function() {
            return this.filter((a ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
                "focus.placeholder": b,
                "blur.placeholder": e
            }).data("placeholder-enabled", true).trigger("blur.placeholder").end()
        };
        j.input = a;
        j.textarea = d;
        k = {
            get: function(m) {
                var l = $(m);
                return l.data("placeholder-enabled") &&
                    l.hasClass("placeholder") ? "" : m.value
            },
            set: function(m, n) {
                var l = $(m);
                if (!l.data("placeholder-enabled")) return m.value = n;
                if (n == "") {
                    m.value = n;
                    e.call(m)
                } else if (l.hasClass("placeholder")) b.call(m, true, n) || (m.value = n);
                else m.value = n;
                return l
            }
        };
        a || (c.input = k);
        d || (c.textarea = k);
        $(function() {
            $(h).delegate("form", "submit.placeholder", function() {
                var l = $(".placeholder", this).each(b);
                setTimeout(function() {
                    l.each(e)
                }, 10)
            })
        });
        $(f).bind("beforeunload.placeholder", function() {
            $(".placeholder").each(function() {
                this.value =
                    ""
            })
        })
    }

    function g(m) {
        var l = {},
            n = /^jQuery\d+$/;
        $.each(m.attributes, function(p, o) {
            if (o.specified && !n.test(o.name)) l[o.name] = o.value
        });
        return l
    }

    function b(m, n) {
        var l = this,
            o = $(l);
        if (l.value == o.attr("placeholder") && o.hasClass("placeholder"))
            if (o.data("placeholder-password")) {
                o = o.hide().next().show().attr("id", o.removeAttr("id").data("placeholder-id"));
                if (m === true) return o[0].value = n;
                o.focus()
            } else {
                l.value = "";
                o.removeClass("placeholder")
            }
    }

    function e() {
        var q, l = this,
            p = $(l),
            m = p,
            o = this.id;
        if (l.value == "") {
            if (l.type ==
                "password") {
                if (!p.data("placeholder-textinput")) {
                    try {
                        q = p.clone().attr({
                            type: "text"
                        })
                    } catch (n) {
                        q = $("<input>").attr($.extend(g(this), {
                            type: "text"
                        }))
                    }
                    q.removeAttr("name").data({
                        "placeholder-password": true,
                        "placeholder-id": o
                    }).bind("focus.placeholder", b);
                    p.data({
                        "placeholder-textinput": q,
                        "placeholder-id": o
                    }).before(q)
                }
                p = p.removeAttr("id").hide().prev().attr("id", o).show()
            }
            p.addClass("placeholder");
            p[0].value = p.attr("placeholder")
        } else p.removeClass("placeholder")
    }
})(this, document, jQuery);
(function($) {
    $.extend({
        selso: {
            defaults: {
                type: "alpha",
                orderBy: "span.value",
                direction: "asc"
            },
            extractVal: function(type, text) {
                if (type == "num") return 1 * text;
                return text
            },
            accentsTidy: function(s) {
                var r = s.toLowerCase();
                r = r.replace(new RegExp(/\s/g), "");
                r = r.replace(new RegExp(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]/g), "a");
                r = r.replace(new RegExp(/\u00e6/g), "ae");
                r = r.replace(new RegExp(/\u00e7/g), "c");
                r = r.replace(new RegExp(/[\u00e8\u00e9\u00ea\u00eb]/g), "e");
                r = r.replace(new RegExp(/[\u00ec\u00ed\u00ee\u00ef]/g),
                    "i");
                r = r.replace(new RegExp(/\u00f1/g), "n");
                r = r.replace(new RegExp(/[\u00f2\u00f3\u00f4\u00f5\u00f6]/g), "o");
                r = r.replace(new RegExp(/\u0153/g), "oe");
                r = r.replace(new RegExp(/[\u00f9\u00fa\u00fb\u00fc]/g), "u");
                r = r.replace(new RegExp(/[\u00fd\u00ff]/g), "y");
                r = r.replace(new RegExp(/\W/g), "");
                return r
            },
            orderAlpha: function(a, b) {
                var l = Math.min(a.length, b.length);
                for (var i = 0; i < l; i++)
                    if (a.charAt(i) < b.charAt(i)) return -1;
                    else if (a.charAt(i) > b.charAt(i)) return 1;
                if (a.length > b.length) return 1;
                if (a.length < b.length) return -1;
                return 0
            },
            alphaGreaterThan: function(s1, s2) {
                return this.orderAlpha(s1, s2)
            },
            stablesort: function(a, of) {
                var r = a;
                var s;
                for (var i = 1; i < r.length; i++) {
                    var j = 1;
                    while (i >= j && of(r[i - j], r[i]) > 0) j++;
                    if (j > 0) {
                        s = r.slice(0, i - j + 1);
                        s.push(r[i]);
                        s = s.concat(r.slice(i - j + 1, i));
                        if (i < r.length - 1) s = s.concat(r.slice(i + 1));
                        r = s
                    }
                }
                return r
            }
        }
    });
    $.fn.extend({
        outhtml: function() {
            if (this.length) return $("<div>").append($(this[0]).clone()).html();
            return null
        },
        prependToParent: function() {
            return this.each(function() {
                $(this).parent().prepend($(this).remove())
            })
        },
        selso: function(settings) {
            var tt = settings.type || $.selso.defaults.type;
            var to = settings.orderBy || $.selso.defaults.orderBy;
            var td = settings.direction || $.selso.defaults.direction;
            var te = settings.extract;
            var of = settings.orderFn;
            if (!$.isFunction(te)) te = function(obj) {
                return $.selso.extractVal(tt, $(to, obj).text())
            };
            var arr = [];
            this.each(function() {
                arr.unshift({
                    id: this.id,
                    val: te(this)
                })
            });
            if ($.isFunction(of));
            else if (tt == "num") of = function(a, b) {
                return a.val - b.val
            };
            else {
                if (tt == "accents") $.map(arr, function(n) {
                    n.val =
                        $.selso.accentsTidy(n.val)
                });
                of = function(a, b) {
                    return $.selso.alphaGreaterThan(a.val, b.val)
                }
            }
            var off = of;
            if (td == "asc") off = function(a, b) {
                return -1 * of(a, b)
            };
            arr = $.selso.stablesort(arr, off);
            for (var i = 0; i < arr.length; i++) $("#" + arr[i].id).prependToParent();
            return this
        }
    })
})(jQuery);
(function($) {
    if ($.browser.mozilla) {
        $.fn.disableTextSelect = function() {
            return this.each(function() {
                $(this).css({
                    "MozUserSelect": "none"
                })
            })
        };
        $.fn.enableTextSelect = function() {
            return this.each(function() {
                $(this).css({
                    "MozUserSelect": ""
                })
            })
        }
    } else if ($.browser.msie) {
        $.fn.disableTextSelect = function() {
            return this.each(function() {
                $(this).bind("selectstart.disableTextSelect", function() {
                    return false
                })
            })
        };
        $.fn.enableTextSelect = function() {
            return this.each(function() {
                $(this).unbind("selectstart.disableTextSelect")
            })
        }
    } else {
        $.fn.disableTextSelect =
            function() {
                return this.each(function() {
                    $(this).bind("mousedown.disableTextSelect", function() {
                        return false
                    })
                })
            };
        $.fn.enableTextSelect = function() {
            return this.each(function() {
                $(this).unbind("mousedown.disableTextSelect")
            })
        }
    }
})(jQuery);
(function($) {
    jQuery.fn.supercomboselect = function(settings) {
        settings = jQuery.extend({
            addButton: " &rarr; ",
            removeButton: " &larr; ",
            optionsIdPrefix: "auto",
            wrapperId: "auto",
            selectedClass: "selected",
            isSortable: false,
            isSearchable: "auto",
            searchableAutoLimit: 10,
            autoSort: true,
            valuesEmptyString: "There are no more values to select",
            selectedEmptyString: "Select from the values on the left",
            defaultSearchBoxString: "Filter your search",
            minNumOfSearchChars: 3,
            selectedOrdering: []
        }, settings);
        this.each(function(i) {
            var _this =
                this;
            var selectID = this.id;
            var leftID = selectID + "_left";
            var rightID = selectID + "_right";
            var isShiftDown = false;
            var isCtrlDown = false;
            var lastSelected = null;
            var theForm = $(this).parents("form");
            var combo = "";
            var refs;
            var searchBox = null;
            if (!settings.optionsIdPrefix || settings.optionsIdPrefix == "auto" || settings.optionsIdPrefix.length === 0) settings.optionsIdPrefix = selectID + "_";
            if (!settings.wrapperId || settings.wrapperId == "auto" || settings.optionsIdPrefix.length === 0) settings.wrapperId = selectID + "_wrapper";
            if (settings.isSearchable ==
                "auto")
                if ($("#" + selectID).find("option").length >= settings.searchableAutoLimit) settings.isSearchable = true;
                else settings.isSearchable = false;
            var customSelectedSorting = settings.isSortable && settings.selectedOrdering;
            $("#" + settings.wrapperId).remove();
            combo += '<div id="' + settings.wrapperId + '" class="supercomboselect_wrapper col-xs-12">';
            combo += '<div class="supercomboselect_left col-xs-12 col-sm-5 panel panel-default">';
            combo += '<div class="supercomboselect panel-body">';
            combo += '<div class="supercomboselect_empty_msg supercomboselect_left_empty_msg text-muted">' + settings.valuesEmptyString +
                "</div>";
            combo += '<ul id="' + leftID + '" class="supercomboselect_list list-group">';
            combo += "</ul>";
            combo += "</div>";
            combo += "</div>";
            combo += '<div class="supercomboselect_btns col-xs-1">';
            combo += '<input type="button" class="csadd btn btn-success" value="' + settings.addButton + '" />';
            combo += '<input type="button" class="csremove btn btn-warning" value="' + settings.removeButton + '" />';
            combo += "</div>";
            combo += '<div class="supercomboselect_right col-xs-12 col-sm-5 panel panel-default">';
            combo += '<div class="supercomboselect panel-body">';
            combo += '<div class="supercomboselect_empty_msg supercomboselect_right_empty_msg text-muted">' +
                settings.selectedEmptyString + "</div>";
            combo += '<ul id="' + rightID + '" class="supercomboselect_list list-group">';
            combo += "</ul>";
            combo += "</div>";
            combo += '<div style="clear: both; height: 0px; line-height: 0px; font-size: 0px;"></div>';
            combo += "</div>";
            combo += "</div>";
            $(this).hide().after(combo);
            $("#" + leftID + " li").die();
            $("#" + rightID + " li").die();
            $(document).on("dblclick", "#" + leftID + ' li[class!="option_disabled"]', function(e) {
                addSelectedToRight()
            });
            $(document).on("dblclick", "#" + rightID + " li", function(e) {
                removeSelectedFromRight()
            });
            $(document).on("click", "#" + leftID + " li", function(e) {
                if ($(this).hasClass("optgrp") === false)
                    if (isCtrlDown) $(this).removeClass(settings.selectedClass);
                    else markForMove(this, leftID)
            });
            $(document).on("click", "#" + rightID + " li", function(e) {
                if (isCtrlDown) $(this).removeClass(settings.selectedClass);
                else markForMove(this, rightID)
            });
            $(document).on("keydown", function(e) {
                if (e.shiftKey) isShiftDown = true;
                else if (e.metaKey || e.ctrlKey) isCtrlDown = true;
                else if (e.keyCode == 38) {
                    if (lastSelected) markForMove($(lastSelected).prev())
                } else if (e.keyCode ==
                    40)
                    if (lastSelected) markForMove($(lastSelected).next())
            });
            $(document).on("keyup", function(e) {
                isShiftDown = false;
                isCtrlDown = false
            });
            $("#" + settings.wrapperId + " .csadd").click(function() {
                addSelectedToRight()
            });
            $("#" + settings.wrapperId + " .csremove").click(function() {
                removeSelectedFromRight()
            });
            $("#" + settings.wrapperId + " .supercomboselect_left_empty_msg, #" + settings.wrapperId + " .supercomboselect_right_empty_msg").hide();
            if (settings.isSortable) $("#" + rightID).sortable();
            if (settings.isSortable) theForm.submit(function() {
                onFormSubmit();
                return true
            });
            theForm.bind("form-pre-serialize", function() {
                onFormSubmit()
            });
            if (settings.isSearchable) {
                var prevSearchText = "";
                var nonSearchableChars = [13, 37, 38, 39, 40, 18, 17];
                var searchBoxHTML = '<div class="supercomboselect_search">';
                searchBoxHTML += '<input type="text" value="" name="supercomboselect_search" class="supercomboselect_search_text" /> <a href="#" class="supercomboselect_search_clear" style="display: none;">Clear Filter</a>';
                searchBoxHTML += "</div>";
                $("#" + leftID).parent().after(searchBoxHTML);
                searchBox = $("#" + leftID).parent().parent().find(".supercomboselect_search_text");
                searchBox.attr("placeholder", settings.defaultSearchBoxString).keyup(function(e) {
                    isShiftDown = false;
                    isCtrlDown = false;
                    if (e.shiftKey || e.metaKey || e.altKey || e.ctrlKey || $.inArray(e.keyCode, nonSearchableChars) != -1) return false;
                    var searchTerm = searchBox.val(),
                        $searchClear = searchBox.siblings(".supercomboselect_search_clear");
                    $searchClear.hide();
                    if (searchTerm.length) $searchClear.show();
                    if (searchTerm.length >= settings.minNumOfSearchChars ||
                        searchTerm.length === 0) {
                        if (searchTerm.substr(0, prevSearchText.length) != prevSearchText || searchTerm.length === 0) refreshLists();
                        var val = $(this).val().toLowerCase();
                        if (val.length) {
                            var filtered = $("#" + leftID + " li:not(.optgrp)").filter(function() {
                                var text = $(this).data("label");
                                if (!text) return false;
                                var index = text.toLowerCase().indexOf(val);
                                if (index == -1) return false;
                                else {
                                    var highlightedText = "";
                                    highlightedText += text.substr(0, index);
                                    highlightedText += '<span class="supercomboselect_search_highlight">' + text.substr(index,
                                        val.length) + "</span>";
                                    highlightedText += text.substr(index + val.length);
                                    $(this).html(highlightedText);
                                    return true
                                }
                            });
                            $("#" + leftID).empty().append(filtered)
                        }
                    } else if (searchTerm.length == settings.minNumOfSearchChars - 1 && searchTerm.substr(0, prevSearchText.length) != prevSearchText && searchTerm.length !== 0) refreshLists();
                    prevSearchText = searchTerm;
                    return false
                }).keydown(function(e) {
                    if (e.keyCode == 13) {
                        $(e.currentTarget).blur();
                        return false
                    }
                });
                searchBox.siblings(".supercomboselect_search_clear").click(function(e) {
                    e.preventDefault();
                    refreshLists();
                    searchBox.val("");
                    $(this).hide()
                })
            }

            function refreshLists(init) {
                var leftOpts = [];
                var rightOpts = [];
                refs = [];
                var idNum = 0;
                var maxSelected = typeof settings.selectedOrdering == "boolean" ? 0 : settings.selectedOrdering.length;
                var flippedSelectedOrder = {};
                if (customSelectedSorting && typeof settings.selectedOrdering == "object")
                    for (var n in settings.selectedOrdering) flippedSelectedOrder[settings.selectedOrdering[n]] = n;
                var $select = $("#" + selectID),
                    $optgroup = $select.find("optgroup");
                $select.find("option").each(function(i) {
                    var text =
                        $(this).text(),
                        value = $(this).attr("value"),
                        id = settings.optionsIdPrefix + idNum,
                        opt = "",
                        $opt = $("<li/>");
                    $opt.text(text);
                    $opt.attr("id", id);
                    //$opt.attr("class", "list-group-item");
                    $opt.attr("data-label", text);
                    if ($(this).is(":disabled")) $opt.addClass("option_disabled");
                    if (customSelectedSorting) {
                        var optSpanVal = flippedSelectedOrder[value] ? flippedSelectedOrder[value] : maxSelected;
                        $opt.append("<span/>");
                        $opt.find("span").attr("id", id + "_val").text(optSpanVal).hide()
                    }
                    opt = $opt[0].outerHTML;
                    if (!$(this).is("[selected]") && $(this).parent().is("optgroup") &&
                        $(this).parent().find("option:not([selected])")[0] === $(this)[0]) opt = '<li class="optgrp">' + $(this).parent().attr("label") + "</li>" + opt;
                    if ($(this).attr("selected")) rightOpts.push(opt);
                    else leftOpts.push(opt);
                    refs[idNum] = this;
                    idNum++
                });
                leftOpts = leftOpts.join("\n");
                rightOpts = rightOpts.join("\n");
                theForm.find("#" + leftID).empty().append(leftOpts);
                if (!customSelectedSorting || init) theForm.find("#" + rightID).empty().append(rightOpts);
                $("#" + settings.wrapperId + " .supercomboselect_left_empty_msg").hide();
                $("#" +
                    settings.wrapperId + " .supercomboselect_right_empty_msg").hide();
                if (!$("#" + leftID).children().length) $("#" + settings.wrapperId + " .supercomboselect_left_empty_msg").show();
                if (!$("#" + rightID).children().length) $("#" + settings.wrapperId + " .supercomboselect_right_empty_msg").show();
                isShiftDown = false;
                isCtrlDown = false;
                $(".supercomboselect").css({
                    overflowY: "hidden"
                }).css({
                    overflowY: "auto"
                }).disableTextSelect();
                $("#form").trigger("supercombo_list_refreshed");
                autoSort()
            }

            function addSelectedToRight() {
                $selectedOpts =
                    $("#" + leftID + " li[class=" + settings.selectedClass + "]");
                var selected = [];
                $selectedOpts.each(function(i) {
                    if (customSelectedSorting) theForm.find("#" + rightID).append($(this).removeClass(settings.selectedClass).html($(this).html()));
                    var opt = $(getOptionSourceRef(getIdNum(this)));
                    opt.attr("selected", "selected");
                    selected.push(opt.attr("value"))
                });
                $(_this).trigger("selectionAdded", [selected]);
                if (searchBox && searchBox.val().length) {
                    searchBox.val("");
                    searchBox.focus()
                }
                refreshLists()
            }

            function removeSelectedFromRight() {
                $selectedOpts =
                    $("#" + rightID + " li[class=" + settings.selectedClass + "]");
                var selected = [];
                $selectedOpts.each(function(i) {
                    if (customSelectedSorting) $(this).remove();
                    var opt = $(getOptionSourceRef(getIdNum(this)));
                    opt.removeAttr("selected", "selected");
                    selected.push(opt.attr("value"))
                });
                $(_this).trigger("selectionRemoved", [selected]);
                refreshLists()
            }

            function markForMove(selector) {
                if (isShiftDown && lastSelected) {
                    var lis = $(selector).parents("ul").find("li");
                    var num1 = lis.index($(selector));
                    var num2 = lis.index($(lastSelected));
                    if (num1 <
                        num2) {
                        startNum = num1;
                        endNum = num2
                    } else {
                        startNum = num2;
                        endNum = num1
                    }
                    if (startNum > -1) lis.slice(startNum, endNum + 1).addClass(settings.selectedClass)
                } else {
                    $(selector).addClass(settings.selectedClass);
                    lastSelected = selector
                }
                if (searchBox) searchBox.blur()
            }

            function getOptionSourceRef(idNum) {
                return refs[idNum]
            }

            function getIdNum(selector) {
                var id = $(selector).attr("id");
                var idNum = id ? parseInt(id.substr(settings.optionsIdPrefix.length), 10) : 0;
                return idNum
            }

            function autoSort() {
                if (settings.autoSort && !settings.isSortable) {
                    var beginIndex =
                        settings.optionsIdPrefix.length;
                    $("#" + rightID).find("li").selso({
                        type: "alpha",
                        extract: function(o) {
                            return $(o).text().toLowerCase()
                        }
                    })
                }
            }

            function onFormSubmit() {
                $("#" + rightID + " li").each(function(i) {
                    var src = $(getOptionSourceRef(getIdNum(this)));
                    $(this).prepend('<input type="hidden" name="' + $("#" + selectID).attr("name") + '" value="' + src.attr("value") + '"" class="sorted_val" />')
                });
                $("#" + selectID).remove()
            }
            refreshLists(true);
            if (customSelectedSorting) $("#" + rightID).find("li").selso({
                type: "num",
                orderBy: "span",
                direction: "asc"
            })
        });
        return this
    }
})(jQuery);
if (window.jQuery)(function($) {
    $.fn.MultiFile = function(options) {
        if (this.length == 0) return this;
        if (typeof arguments[0] == "string") {
            if (this.length > 1) {
                var args = arguments;
                return this.each(function() {
                    $.fn.MultiFile.apply($(this), args)
                })
            }
            $.fn.MultiFile[arguments[0]].apply(this, $.makeArray(arguments).slice(1) || []);
            return this
        }
        var options = $.extend({}, $.fn.MultiFile.options, options || {});
        $("form").not("MultiFile-intercepted").addClass("MultiFile-intercepted").submit($.fn.MultiFile.disableEmpty);
        if ($.fn.MultiFile.options.autoIntercept) {
            $.fn.MultiFile.intercept($.fn.MultiFile.options.autoIntercept);
            $.fn.MultiFile.options.autoIntercept = null
        }
        this.not(".MultiFile-applied").addClass("MultiFile-applied").each(function() {
            window.MultiFile = (window.MultiFile || 0) + 1;
            var group_count = window.MultiFile;
            var MultiFile = {
                e: this,
                E: $(this),
                clone: $(this).clone()
            };
            if (typeof options == "number") options = {
                max: options
            };
            var o = $.extend({}, $.fn.MultiFile.options, options || {}, ($.metadata ? MultiFile.E.metadata() : $.meta ? MultiFile.E.data() : null) || {}, {});
            if (!(o.max > 0)) {
                o.max = MultiFile.E.attr("maxlength");
                if (!(o.max > 0)) {
                    o.max = (String(MultiFile.e.className.match(/\b(max|limit)\-([0-9]+)\b/gi) || [""]).match(/[0-9]+/gi) || [""])[0];
                    if (!(o.max > 0)) o.max = -1;
                    else o.max = String(o.max).match(/[0-9]+/gi)[0]
                }
            }
            o.max = new Number(o.max);
            o.accept = o.accept || MultiFile.E.attr("accept") || "";
            if (!o.accept) {
                o.accept = MultiFile.e.className.match(/\b(accept\-[\w\|]+)\b/gi) || "";
                o.accept = (new String(o.accept)).replace(/^(accept|ext)\-/i, "")
            }
            $.extend(MultiFile, o || {});
            MultiFile.STRING = $.extend({}, $.fn.MultiFile.options.STRING, MultiFile.STRING);
            $.extend(MultiFile, {
                n: 0,
                slaves: [],
                files: [],
                instanceKey: MultiFile.e.id || "MultiFile" +
                    String(group_count),
                generateID: function(z) {
                    return MultiFile.instanceKey + (z > 0 ? "_F" + String(z) : "")
                },
                trigger: function(event, element) {
                    var handler = MultiFile[event],
                        value = $(element).attr("value");
                    if (handler) {
                        var returnValue = handler(element, value, MultiFile);
                        if (returnValue != null) return returnValue
                    }
                    return true
                }
            });
            if (String(MultiFile.accept).length > 1) {
                MultiFile.accept = MultiFile.accept.replace(/\W+/g, "|").replace(/^\W|\W$/g, "");
                MultiFile.rxAccept = new RegExp("\\.(" + (MultiFile.accept ? MultiFile.accept : "") + ")$",
                    "gi")
            }
            MultiFile.wrapID = MultiFile.instanceKey + "_wrap";
            MultiFile.E.wrap('<div class="MultiFile-wrap" id="' + MultiFile.wrapID + '"></div>');
            MultiFile.wrapper = $("#" + MultiFile.wrapID + "");
            MultiFile.e.name = MultiFile.e.name || "file" + group_count + "[]";
            if (!MultiFile.list) {
                MultiFile.wrapper.append('<div class="MultiFile-list" id="' + MultiFile.wrapID + '_list"></div>');
                MultiFile.list = $("#" + MultiFile.wrapID + "_list")
            }
            MultiFile.list = $(MultiFile.list);
            MultiFile.addSlave = function(slave, slave_count) {
                MultiFile.n++;
                slave.MultiFile =
                    MultiFile;
                if (slave_count > 0) slave.id = slave.name = "";
                if (slave_count > 0) slave.id = MultiFile.generateID(slave_count);
                slave.name = String(MultiFile.namePattern.replace(/\$name/gi, $(MultiFile.clone).attr("name")).replace(/\$id/gi, $(MultiFile.clone).attr("id")).replace(/\$g/gi, group_count).replace(/\$i/gi, slave_count));
                if (MultiFile.max > 0 && MultiFile.n - 1 > MultiFile.max) slave.disabled = true;
                MultiFile.current = MultiFile.slaves[slave_count] = slave;
                slave = $(slave);
                slave.val("").attr("value", "")[0].value = "";
                slave.addClass("MultiFile-applied");
                slave.change(function() {
                    $(this).blur();
                    if (!MultiFile.trigger("onFileSelect", this, MultiFile)) return false;
                    var ERROR = "",
                        v = String(this.value || "");
                    if (MultiFile.accept && v && !v.match(MultiFile.rxAccept)) ERROR = MultiFile.STRING.denied.replace("$ext", String(v.match(/\.\w{1,4}$/gi)));
                    for (var f in MultiFile.slaves)
                        if (MultiFile.slaves[f] && MultiFile.slaves[f] != this)
                            if (MultiFile.slaves[f].value == v) ERROR = MultiFile.STRING.duplicate.replace("$file", v.match(/[^\/\\]+$/gi));
                    var newEle = $(MultiFile.clone).clone();
                    newEle.addClass("MultiFile");
                    if (ERROR != "") {
                        MultiFile.error(ERROR);
                        MultiFile.n--;
                        MultiFile.addSlave(newEle[0], slave_count);
                        slave.parent().prepend(newEle);
                        slave.remove();
                        return false
                    }
                    $(this).css({
                        position: "absolute",
                        top: "-3000px"
                    });
                    slave.after(newEle);
                    MultiFile.addToList(this, slave_count);
                    MultiFile.addSlave(newEle[0], slave_count + 1);
                    if (!MultiFile.trigger("afterFileSelect", this, MultiFile)) return false
                });
                $(slave).data("MultiFile", MultiFile)
            };
            MultiFile.addToList = function(slave, slave_count) {
                if (!MultiFile.trigger("onFileAppend", slave,
                        MultiFile)) return false;
                var r = $('<div class="MultiFile-label"></div>'),
                    v = String(slave.value || ""),
                    a = $('<span class="MultiFile-title" title="' + MultiFile.STRING.selected.replace("$file", v) + '">' + MultiFile.STRING.file.replace("$file", v.match(/[^\/\\]+$/gi)[0]) + "</span>"),
                    b = $('<a class="MultiFile-remove" href="#' + MultiFile.wrapID + '">' + MultiFile.STRING.remove + "</a>");
                MultiFile.list.append(r.append(b, " ", a));
                b.click(function() {
                    if (!MultiFile.trigger("onFileRemove", slave, MultiFile)) return false;
                    MultiFile.n--;
                    MultiFile.current.disabled = false;
                    MultiFile.slaves[slave_count] = null;
                    $(slave).remove();
                    $(this).parent().remove();
                    $(MultiFile.current).css({
                        position: "",
                        top: ""
                    });
                    $(MultiFile.current).reset().val("").attr("value", "")[0].value = "";
                    if (!MultiFile.trigger("afterFileRemove", slave, MultiFile)) return false;
                    return false
                });
                if (!MultiFile.trigger("afterFileAppend", slave, MultiFile)) return false
            };
            if (!MultiFile.MultiFile) MultiFile.addSlave(MultiFile.e, 0);
            MultiFile.n++;
            MultiFile.E.data("MultiFile", MultiFile)
        })
    };
    $.extend($.fn.MultiFile, {
        reset: function() {
            var settings = $(this).data("MultiFile");
            if (settings) settings.list.find("a.MultiFile-remove").click();
            return $(this)
        },
        disableEmpty: function(klass) {
            klass = (typeof klass == "string" ? klass : "") || "mfD";
            var o = [];
            $("input:file.MultiFile").each(function() {
                if ($(this).val() == "") o[o.length] = this
            });
            return $(o).each(function() {
                this.disabled = true
            }).addClass(klass)
        },
        reEnableEmpty: function(klass) {
            klass = (typeof klass == "string" ? klass : "") || "mfD";
            return $("input:file." + klass).removeClass(klass).each(function() {
                this.disabled =
                    false
            })
        },
        intercepted: {},
        intercept: function(methods, context, args) {
            var method, value;
            args = args || [];
            if (args.constructor.toString().indexOf("Array") < 0) args = [args];
            if (typeof methods == "function") {
                $.fn.MultiFile.disableEmpty();
                value = methods.apply(context || window, args);
                setTimeout(function() {
                    $.fn.MultiFile.reEnableEmpty()
                }, 1E3);
                return value
            }
            if (methods.constructor.toString().indexOf("Array") < 0) methods = [methods];
            for (var i = 0; i < methods.length; i++) {
                method = methods[i] + "";
                if (method)(function(method) {
                    $.fn.MultiFile.intercepted[method] =
                        $.fn[method] || function() {};
                    $.fn[method] = function() {
                        $.fn.MultiFile.disableEmpty();
                        value = $.fn.MultiFile.intercepted[method].apply(this, arguments);
                        setTimeout(function() {
                            $.fn.MultiFile.reEnableEmpty()
                        }, 1E3);
                        return value
                    }
                })(method)
            }
        }
    });
    $.fn.MultiFile.options = {
        accept: "",
        max: -1,
        namePattern: "$name",
        STRING: {
            remove: "x",
            denied: "You cannot select a $ext file.\nTry again...",
            file: "$file",
            selected: "File selected: $file",
            duplicate: "This file has already been selected:\n$file"
        },
        autoIntercept: ["submit", "ajaxSubmit",
            "ajaxForm", "validate", "valid"
        ],
        error: function(s) {
            alert(s)
        }
    };
    $.fn.reset = function() {
        return this.each(function() {
            try {
                this.reset()
            } catch (e) {}
        })
    };
    $(function() {
        $("input[type=file].multi").MultiFile()
    })
})(jQuery);

function mirror(text) {
    return text
}

function url_title(text) {
    text = text.replace(/([^_-a-zA-Z0-9\s]|\,|\&)+/gi, "");
    text = text.replace(/\s+/gi, "-");
    text = text.toLowerCase();
    return text
}

function strtolower(text) {
    return text.toLowerCase()
}

function strtoupper(text) {
        return text.toUpperCase()
    }
    (function($) {
        $.fn.numeric = function(config, callback) {
            if (typeof config === "boolean") config = {
                decimal: config
            };
            config = config || {};
            if (typeof config.negative == "undefined") config.negative = true;
            var decimal = config.decimal === false ? "" : config.decimal || ".";
            var negative = config.negative === true ? true : false;
            var callback = typeof callback == "function" ? callback : function() {};
            return this.data("numeric.decimal", decimal).data("numeric.negative", negative).data("numeric.callback", callback).keypress($.fn.numeric.keypress).keyup($.fn.numeric.keyup).blur($.fn.numeric.blur)
        };
        $.fn.numeric.keypress = function(e) {
            var decimal = $.data(this, "numeric.decimal");
            var negative = $.data(this, "numeric.negative");
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13 && this.nodeName.toLowerCase() == "input") return true;
            else if (key == 13) return false;
            var allow = false;
            if (e.ctrlKey && key == 97 || e.ctrlKey && key == 65) return true;
            if (e.ctrlKey && key == 120 || e.ctrlKey && key == 88) return true;
            if (e.ctrlKey && key == 99 || e.ctrlKey && key == 67) return true;
            if (e.ctrlKey && key == 122 || e.ctrlKey && key == 90) return true;
            if (e.ctrlKey &&
                key == 118 || e.ctrlKey && key == 86 || e.shiftKey && key == 45) return true;
            if (key < 48 || key > 57) {
                if (this.value.indexOf("-") != 0 && negative && key == 45 && (this.value.length == 0 || $.fn.getSelectionStart(this) == 0)) return true;
                if (decimal && key == decimal.charCodeAt(0) && this.value.indexOf(decimal) != -1) allow = false;
                if (key != 8 && key != 9 && key != 13 && key != 35 && key != 36 && key != 37 && key != 39 && key != 46) allow = false;
                else if (typeof e.charCode != "undefined")
                    if (e.keyCode == e.which && e.which != 0) {
                        allow = true;
                        if (e.which == 46) allow = false
                    } else if (e.keyCode != 0 &&
                    e.charCode == 0 && e.which == 0) allow = true;
                if (decimal && key == decimal.charCodeAt(0))
                    if (this.value.indexOf(decimal) == -1) allow = true;
                    else allow = false
            } else allow = true;
            return allow
        };
        $.fn.numeric.keyup = function(e) {
            var val = this.value;
            if (val.length > 0) {
                var carat = $.fn.getSelectionStart(this);
                var decimal = $.data(this, "numeric.decimal");
                var negative = $.data(this, "numeric.negative");
                if (decimal != "") {
                    var dot = val.indexOf(decimal);
                    if (dot == 0) this.value = "0" + val;
                    if (dot == 1 && val.charAt(0) == "-") this.value = "-0" + val.substring(1);
                    val =
                        this.value
                }
                var validChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "-", decimal];
                var length = val.length;
                for (var i = length - 1; i >= 0; i--) {
                    var ch = val.charAt(i);
                    if (i != 0 && ch == "-") val = val.substring(0, i) + val.substring(i + 1);
                    else if (i == 0 && !negative && ch == "-") val = val.substring(1);
                    var validChar = false;
                    for (var j = 0; j < validChars.length; j++)
                        if (ch == validChars[j]) {
                            validChar = true;
                            break
                        }
                    if (!validChar || ch == " ") val = val.substring(0, i) + val.substring(i + 1)
                }
                var firstDecimal = val.indexOf(decimal);
                if (firstDecimal > 0)
                    for (var i = length - 1; i > firstDecimal; i--) {
                        var ch =
                            val.charAt(i);
                        if (ch == decimal) val = val.substring(0, i) + val.substring(i + 1)
                    }
                this.value = val;
                $.fn.setSelection(this, carat)
            }
        };
        $.fn.numeric.blur = function() {
            var decimal = $.data(this, "numeric.decimal");
            var callback = $.data(this, "numeric.callback");
            var val = this.value;
            if (val != "") {
                var re = new RegExp("^\\d+$|\\d*" + decimal + "\\d+");
                if (!re.exec(val)) callback.apply(this)
            }
        };
        $.fn.removeNumeric = function() {
            return this.data("numeric.decimal", null).data("numeric.negative", null).data("numeric.callback", null).unbind("keypress",
                $.fn.numeric.keypress).unbind("blur", $.fn.numeric.blur)
        };
        $.fn.getSelectionStart = function(o) {
            try {
                if (o.createTextRange) {
                    var r = document.selection.createRange().duplicate();
                    r.moveEnd("character", o.value.length);
                    if (r.text == "") return o.value.length;
                    return o.value.lastIndexOf(r.text)
                } else return o.selectionStart
            } catch (e) {}
        };
        $.fn.setSelection = function(o, p) {
            if (typeof p == "number") p = [p, p];
            if (p && p.constructor == Array && p.length == 2)
                if (o.createTextRange) {
                    var r = o.createTextRange();
                    r.collapse(true);
                    r.moveStart("character",
                        p[0]);
                    r.moveEnd("character", p[1]);
                    r.select()
                } else if (o.setSelectionRange) {
                o.focus();
                o.setSelectionRange(p[0], p[1])
            }
        }
    })(jQuery);
(function($) {
    jQuery.fn.repeatable = function(o) {
        var options = $.extend({
            addButtonText: "Add Another",
            addButtonClass: "add_another",
            removeButtonClass: "remove",
            removeButtonText: "Remove",
            repeatableSelector: ".repeatable",
            repeatableParentSelector: ".repeatable_container",
            removeSelector: ".remove",
            contentSelector: ".repeatable_content",
            warnBeforeDelete: true,
            warnBeforeDeleteMessage: "Are you sure you want to delete this item?",
            addNewTitle: "New",
            sortableSelector: ".grabber",
            sortable: true,
            initDisplay: false,
            dblClickBehavior: "toggle",
            max: null,
            min: null,
            depth: 1,
            allowCollapsingContent: true,
            removeable: true
        }, o || {});
        var $checked = null;
        var parseTemplate = function(elem, i) {
            var $childTemplates = $(elem).find(options.repeatableSelector);
            var depth = $(elem).parent().attr("data-depth");
            var titleField = $(elem).parent().attr("data-title_field");
            var title = $(elem).find('input[name$="[' + titleField + ']"]').val();
            if (!depth) depth = 0;
            var depthSuffix = depth > 0 ? "_" + depth : "";
            $(".num" + depthSuffix, elem).html(i + 1);
            $(".index" + depthSuffix, elem).html(i);
            $(".title" + depthSuffix,
                elem).html(title);
            $(elem).find("label,input,textarea,select").addClass("field_depth_0");
            var parseAttribute = function(elem, attr) {
                var newId = $(elem).attr(attr);
                if (newId && newId.length) {
                    newId = newId.replace(/\{index\}/g, i);
                    newId = newId.replace(/([-_a-zA-Z0-9]+_)\d+(_[-_a-zA-Z0-9]+)$/, "$1" + i + "$2");
                    $(elem).attr(attr, newId)
                }
            };
            var $childRepeatables = $(elem).find(options.repeatableSelector);
            if (depth == 0 && $childTemplates.length) $childRepeatables.each(function(i) {
                $(this).find("input,textarea,select").each(function(j) {
                    $(this).removeClass("field_depth_0");
                    $(this).addClass("field_depth_1")
                })
            });
            $("label,.field_depth_" + depth, elem).each(function(j) {
                var newName = $(this).attr("name");
                if (newName && newName.length) {
                    newName = newName.replace(/([-_a-zA-Z0-9\[\]]+)\[\d+\]([-_a-zA-Z0-9\[\]]+)$/, "$1[" + i + "]$2");
                    newName = newName.replace(/([-_a-zA-Z0-9]+)_\d+_([-_a-zA-Z0-9]+)$/, "$1_" + i + "_$2");
                    newName = newName.replace("[", "[");
                    newName = newName.replace("]", "]");
                    $(this).attr("name", newName);
                    if ($checked) setTimeout(function() {
                            $checked.each(function() {
                                $(this).attr("checked", "checked")
                            })
                        },
                        0)
                }
                if ($(this).is("label")) parseAttribute(this, "for");
                else {
                    parseAttribute(this, "id");
                    $(this).attr("data-index", i)
                }
            });
            var $parentElem = $(elem).has(options.repeatableSelector + " " + options.repeatableSelector);
            var parentIndex = null;
            if ($parentElem.length > 0) parentIndex = $parentElem.attr("data-index");
            if (depth == 0 && $childTemplates.length) $childRepeatables.each(function(i) {
                $(this).find("input,textarea,select").each(function(j) {
                    var newName = $(this).attr("name");
                    if (newName && newName.length && parentIndex != null) {
                        newName =
                            newName.replace(/([-_a-zA-Z0-9]+\[)\d+(\]\[[-_a-zA-Z0-9]+\]\[[-_a-zA-Z0-9]+\])/g, "$1" + parentIndex + "$2");
                        newName = newName.replace(/([-_a-zA-Z0-9]+)_\d+_([-_a-zA-Z0-9]+_[-_a-zA-Z0-9]+)/g, "$1_" + parentIndex + "_$2");
                        newName = newName.replace("[", "[");
                        newName = newName.replace("]", "]");
                        $(this).attr("name", newName)
                    }
                    var newId = $(this).attr("id");
                    if (newId && newId.length && parentIndex != null) {
                        newId = newId.replace(/([-_a-zA-Z]+)_\d+_([-_a-zA-Z]+_[-_a-zA-Z0-9]+_[-_a-zA-Z])/g, "$1_" + parentIndex + "_$2");
                        $(this).attr("id", newId)
                    }
                })
            })
        };
        var createRemoveButton = function(elem) {
            if (!options.removeable) return;
            $elem = $(elem);
            $elem.children(options.removeSelector).remove();
            $elem.append('<a href="#" class="' + options.removeButtonClass + '">' + options.removeButtonText + " </a>");
            $(document).on("click", options.repeatableSelector + " ." + options.removeButtonClass, function(e) {
                var $this = $(this).closest(options.repeatableParentSelector);
                var max = $this.attr("data-max") ? parseInt($this.attr("data-max")) : null;
                var min = $this.attr("data-min") ? parseInt($this.attr("data-min")) :
                    null;
                if (options.warnBeforeDelete == false || confirm(options.warnBeforeDeleteMessage)) {
                    $(this).closest(options.repeatableSelector).remove();
                    var $children = $this.children(options.repeatableSelector);
                    if ($children.length < max) $this.next().show();
                    reOrder($this)
                }
                checkMin($this, min);
                $this.trigger("removed");
                e.stopImmediatePropagation();
                return false
            })
        };
        var reOrder = function($elem) {
            $checked = $('input[type="radio"]', $elem).filter(":checked");
            $elem.children(options.repeatableSelector).each(function(i) {
                $(this).attr("data-index",
                    i);
                parseTemplate(this, i)
            })
        };
        var checkMax = function($elem, max) {
            if (max && $elem.children(options.repeatableSelector).length != 0 && $elem.children(options.repeatableSelector).length >= max) $elem.next().hide();
            else $elem.next().show()
        };
        var checkMin = function($elem, min) {
            $children = $elem.children(options.repeatableSelector);
            min = parseInt(min);
            if (min && $children.length != 0 && $children.length <= min) $children.find("." + options.removeButtonClass + ":first").hide();
            else $children.find("." + options.removeButtonClass + ":first").show()
        };
        var cloneRepeatableNode = function($elem) {
            $clone = $elem.children(options.repeatableSelector + ":first").clone(false);
            return $clone
        };
        var createCollapsingContent = function($elem) {
            if (options.allowCollapsingContent) $($elem).find(options.sortableSelector).unbind("dblclick").dblclick(function(e) {
                $parent = $(this).closest(options.repeatableSelector).parent();
                var dblclick = $parent.attr("data-dblclick") ? $parent.attr("data-dblclick") : null;
                var $elems = $(this).closest(options.repeatableSelector).find(options.contentSelector +
                    ":first");
                if (dblclick == "accordion" || dblclick == "accordian") {
                    $parent.find(options.contentSelector).hide();
                    $elems.show()
                } else $elems.toggle()
            })
        };
        var createAddButton = function($elem) {
            $("." + options.addButtonClass).each(function(i) {
                var $prev = $(this).prev();
                var $clone = cloneRepeatableNode($prev);
                $(this).data("clone", $clone)
            })
        };
        $(document).on("click", "." + options.addButtonClass, function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var $prev = $(this).prev();
            var max = $prev.attr("data-max") ? parseInt($prev.attr("data-max")) :
                null;
            var min = $prev.attr("data-min") ? parseInt($prev.attr("data-min")) : null;
            var dblclick = $prev.attr("data-dblclick") ? $prev.attr("data-dblclick") : null;
            if (!$(e.currentTarget).data("clone")) {
                var $clone = cloneRepeatableNode($prev);
                $(e.currentTarget).data("clone", $clone)
            } else var $clone = $(e.currentTarget).data("clone");
            var $this = $(this).prev();
            var $clonecopy = $clone.clone(false);
            $clonecopy.addClass("noclone");
            $clonecopy.find(options.contentSelector + ":first").show();
            if (dblclick == "accordian" || dblclick == "accordion") $prev.find(options.contentSelector).hide();
            createCollapsingContent($clonecopy);
            var $children = $this.children(options.repeatableSelector);
            if (max && $children.length >= max) return false;
            var index = $children.length;
            parseTemplate($clonecopy, index);
            createRemoveButton($clonecopy);
            $this.append($clonecopy);
            $clonecopy.find("input,select,textarea").not('input[type="radio"], input[type="checkbox"], input[type="button"], .noclear').val("");
            $clonecopy.find('input[type="checkbox"]').not(".noclear").prop("checked", false);
            $clonecopy.find('input[type="radio"]').not(".noclear").each(function() {
                if (parseInt($(this).data("orig_checked")) ==
                    1) $(this).prop("checked", true);
                else $(this).prop("checked", false)
            });
            $clonecopy.find(".noclone").remove();
            reOrder($this);
            if (max && $children.length != 0 && $children.length >= max - 1) $(this).hide();
            checkMin($prev, min);
            $this.trigger({
                type: "cloned",
                clonedNode: $clonecopy
            })
        });
        var index = 0;
        return this.each(function() {
            var $this = $(this);
            var $repeatables = $this.children(options.repeatableSelector);
            if (!$this.is(".__applied__")) $repeatables.each(function(i) {
                parseTemplate(this, i);
                createRemoveButton(this)
            });
            $parent = $this.parent();
            if (options.max) $this.attr("data-max", options.max);
            if (options.min) $this.attr("data-min", options.min);
            if (options.dblClickBehavior) $this.attr("data-dblclick", options.dblClickBehavior);
            if (options.initDisplay && !$this.is(".__applied__")) {
                $this.attr("data-init_display", options.init_display);
                if ($repeatables.closest(options.contentSelector).length) $toDisplay = $repeatables.find(options.contentSelector);
                else $toDisplay = $repeatables.find(options.contentSelector).not(options.contentSelector + " " + options.contentSelector);
                if (options.initDisplay == "first") $toDisplay.not(":first").hide();
                else if (options.initDisplay == "none" || options.initDisplay == "closed") $toDisplay.hide()
            }
            if ($parent.find(options.addButtonClass).length == 0 && !$this.hasClass("__applied__")) $parent.append('<a href="#" class="' + options.addButtonClass + '">' + options.addButtonText + " </a>");
            if (options.sortable) $this.sortable({
                cursor: "move",
                handle: options.sortableSelector,
                start: function(event, ui) {
                    $this.trigger({
                        type: "sortStarted",
                        clonedNode: $this
                    })
                },
                stop: function(event,
                    ui) {
                    reOrder($(this));
                    $this.trigger({
                        type: "sortStopped",
                        clonedNode: $this
                    })
                }
            });
            if (!$this.hasClass("__applied__")) createAddButton($this);
            if ($this.attr("data-max")) checkMax($this, options.max);
            if ($this.attr("data-min")) checkMin($this, options.min);
            createCollapsingContent($this);
            index++;
            $this.addClass("__applied__");
            return this
        })
    }
})(jQuery);
(function($) {
    var pushStackOrig, pushStackChrome;
    pushStackOrig = $.fn.pushStack;
    pushStackChrome = function(elems, name, selector) {
        var ret = new jQuery.fn.init;
        if (jQuery.isArray(elems)) push.apply(ret, elems);
        else jQuery.merge(ret, elems);
        ret.prevObject = this;
        ret.context = this.context;
        if (name === "find") ret.selector = this.selector + (this.selector ? " " : "") + selector;
        else if (name) ret.selector = this.selector + "." + name + "(" + selector + ")";
        return ret
    };
    $.fn.pushStack = function(elems, name, selector) {
        var ret;
        try {
            ret = pushStackOrig.call(this,
                elems, name, selector);
            return ret
        } catch (e) {
            if (e instanceof TypeError)
                if (!(ret instanceof jQuery.fn.init)) {
                    ret = pushStackChrome.call(this, elems, name, selector);
                    return ret
                }
            throw e;
        }
    }
}).call(this, jQuery);
jQuery.fn.exists = function() {
    return this.size() > 0
};
jQuery.fn.setClass = function(cssClass) {
    var j = jQuery(this).attr("className", cssClass);
    return j
};
jQuery.fn.isHidden = function() {
    if (jQuery(this).css("display") == "none") return true;
    return false
};
jQuery.include = function(file, type) {
    if (!type) type = "script";
    $.ajax({
        async: false,
        url: file,
        dataType: type,
        error: function() {
            var msg = new jqx.lib.Message("There was an error in loading the file" + file, "error");
            msg.display()
        }
    })
};

function initFuelNamespace() {
    var f;
    if (window.fuel == undefined)
        if (top.window.fuel != undefined) f = top.window.fuel;
        else f = {};
    else f = window.fuel;
    return f
}
if (typeof window.fuel == "undefined") window.fuel = {};
fuel.lang = function(key) {
    return __FUEL_LOCALIZED__[key]
};
fuel.getFieldId = function(field, context) {
    if (window.__FUEL_INLINE_EDITING != undefined) {
        var val = $(".__fuel_module__", context).attr("id");
        var prefix = val.split("--")[0];
        return prefix + "--" + field
    } else return field
};
fuel.getModule = function(context) {
    if (window.__FUEL_INLINE_EDITING != undefined) return $(".__fuel_module__", context).val();
    else return page.module
};
fuel.modalWindow = function(html, cssClass, autoResize, onLoadCallback, onCloseCallback) {
    console.log(html);
    var modalId = "__FUEL_modal__";
    if (!cssClass) cssClass = "";
    var $context = $("body", window.document);
    //if (!$("#" + modalId, $context).length) var modalHTML = '<div id="' + modalId + '"><div class="loader"></div><a href="#" class="modal_close jqmClose"></a><div class="modal_content"></div></div>';
    if (!$("#" + modalId, $context).length) {
        //var modalHTML = '<div id="' + modalId + '"><div class="loader"></div><a href="#" class="modal_close jqmClose"></a><div class="modal_content"></div></div>';    
        var modalHTML = '<div id="' + modalId + '" class="modal fade" aria-labelledby="'+modalId+'_label" aria-hidden="true" role="dialog"><div class="modal-dialog"><div class="modal-content">'
                +'<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                +'<h4 class="modal-title" id="'+modalId+'_label">Modal</h4></div>'
                +'<div class="modal-body"></div>' //<div class="modal-footer"></div>
                +'</div></div></div>';
    }
    /*else { 
        console.log('ELSE');
        $("#" + modalId, $context).html('<div class="modal-content"></div>'); 
    }*/
    /*var modalOnHide = function() {
        $("#" + modalId, $context).hide();
        //$(".jqmOverlay", $context).remove();
        if (onCloseCallback) onCloseCallback()
    };*/
    $context.append(modalHTML);
    $modal = $("#" + modalId, $context);
    //$modal.attr("class", "__fuel__ __fuel_modal__ jqmWindow " + cssClass);
    $modal.attr("class", "modal fade __fuel__ __fuel_modal__ " + cssClass);
    //var modalWidth = $modal.outerWidth();
    //var centerWidth = -(modalWidth / 2);
    //$modal.css("marginLeft", centerWidth + "px");
    /*var jqmOpts = {
        onHide: modalOnHide,
        toTop: true
    };*/
    //if (onLoadCallback) jqmOpts.onLoad = onLoadCallback;
    //$modal.jqm(jqmOpts).jqmShow();
    
    // Show Twitter Bootstrap modal
    $('#__FUEL_modal__').modal('show');
    
    //$modal.find(".modal_content").empty().append(html);
    $modal.find(".modal-body").html(html);
    $modal.find("iframe").load(function() {
        //$(".jqmWindow .loader", $context).hide();
        var iframe = this;
        var contentDoc = iframe.contentDocument;
        /*$(".cancel", contentDoc).add(".modal_close").click(function(e) {
            e.preventDefault();
            //$modal.jqmHide()
        });*/
        console.log('autoresize: '+autoResize);
        if (autoResize) {
            docHeight = fuel.calcHeight(contentDoc);
            $(iframe).height(docHeight);
            $(iframe).width('100%');
        }

        /*if (autoResize) setTimeout(function() {
            docHeight = fuel.calcHeight(contentDoc);
            $(iframe.contentWindow.parent.document).find("#" + modalId + "iframe").height(docHeight);
            fuel.cascadeIframeWindowSize(docHeight);
            $(iframe).height(docHeight)
        }, 250)*/
        
    });
    return $modal
};
fuel.closeModal = function() {
    var modalId = "__FUEL_modal__";
    // Hide Twitter Bootstrap modal
    $("#" + modalId).modal('hide');
    //$("#" + modalId).jqmHide()
};
fuel.getModule = function(context) {
    if (window.fuel && window.fuel.module) return window.fuel.module;
    if (context == undefined) context = null;
    var module = $(".__fuel_module__", context).length ? $(".__fuel_module__", context).val() : null;
    return module
};
fuel.getModuleURI = function(context) {
    if (context == undefined) context = null;
    var module = $(".__fuel_module_uri__").length ? $(".__fuel_module_uri__").val() : null;
    return module
};
fuel.isTop = function() {
    return self == top
};
fuel.windowLevel = function() {
    var level = 0;
    var win = window;
    while (win != top && win.parent != null) {
        level++;
        win = win.parent
    }
    return level
};
fuel.calcHeight = function(context) {
    var height = 0;
    if ($("#login", context).length) var elems = "#login";
    else var elems = "#fuel_main_top_panel, #fuel_actions, #fuel_notification, #fuel_main_content_inner, #list_container, .instructions";
    $(elems, context).each(function(i) {
        var outerHeight = parseInt($(this).outerHeight(false));
        if (outerHeight) height += outerHeight
    });
    if (height > 480) height = 480;
    else height += 30;
    return height
};
fuel.adjustIframeWindowSize = function() {
    var iframe = $(".inline_iframe", top.window.document);
    if (iframe.length) {
        iframe = iframe[0];
        var contentDoc = iframe.contentDocument;
        var height = parseInt(fuel.calcHeight(contentDoc));
        var width = parseInt($("#fuel_main_content_inner .form", contentDoc).width()) + 50;
        $(iframe).height(height);
        $(iframe).width(width)
    }
};
fuel.cascadeIframeWindowSize = function(height) {
    var level = 0;
    if (height) height = height + 100;
    $(".inline_iframe", top.window.document).height(height)
};