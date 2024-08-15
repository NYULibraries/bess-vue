(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-557bd6d4"], {
    "0339": function(t, e, a) {
        "use strict";
        a("07f5")
    },
    "07f5": function(t, e, a) {},
    "09b8": function(t, e, a) {},
    "14a8": function(t, e, a) {},
    "1cf6": function(t, e, a) {},
    "25f8": function(t, e, a) {
        "use strict";
        a("eb8c")
    },
    "28ab": function(t, e, a) {
        "use strict";
        a("14a8")
    },
    "2b5f": function(t, e) {
        t.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABDCAMAAAAI9LO2AAAAMFBMVEUAAADuOjzuOjzuOjzuOjzuOjzuOjzuOjzuOjzuOjzuOjzuOjzuOjzuOjzuOjzuOjzbF3vpAAAAD3RSTlMAESIzRFVmd4iZqrvM3e5GKvWZAAACgElEQVR42sWX25brIAiGNRrxiO//ttNpd0oMIq652f9Nu2rWB3JKMYNcxpqs0XXmUkA+Dv1X6FRO6r8qksnYP6qaT+F6cGrSpn6prjm+X0I/4dROSiuOw04K7LT1uyiQgkXJpsfhtC1AvvRB2T6jRxjydwdVj3u6SHjHuACpvJQBvL2hhuuho3SRqB4PyH1QjZRuGGIRWPDwpNrtEzWwl5nBqWiMqbPrhtYF4ReVRp9Odi0KgYAKkxRVA6wkbOyKysFJJjw5rnZVeD5JaA58cLDvCB4k+H4vdHJXieBfClCwz1oDaGB8yrHZT9LH6j+tIbmEE1J+X8x+8+j4vdLB+hV449t2K+3678oWWWYYqpP8NZ3C9zh/PgslgdpfmDd0ociehXsbkpz3fj6PPvYtcxufHIp/nJO8mSkRh/lZzJTUZpyjXzoNBwm+h5VD0Wgg47lL3EqzOshk8v6pQN7qIIpDZqBKzi5APBBWMhEUkPZ8oGrVQGMXJMHVbCSQYLkJBoIC4nczo66fHbOMNPAH4bxNiC+U3ikFyU+fr/zfi5SFSNN6Aip8qIiF+lcQ/HfQ+QC5LZCdZM35l4LYnYXSOUv/wepI+svc5nVUxfni8wsDfH4J7Z+pB1fiIUQhdE0DaF3uqBUECTcDKXZlDwRiduLqpSe/KqowX3ZdgsWLLet7CLeKVlieNhe/ujRa+u7ilxYOUQXopKRtY3GPpG+attHO4cTEZzZZuJy+Q55ta80Myvrny+7iC3ynIgXC6IWb+qAKp3tXoIeM44lVi39LacGhd7SuaDbk6uaWpQvWTmVrdnUkGVP8DoFQERXMtmxgC3uFw/xNHlJp7/CWDOcyND/eNWyv2HnlmwAAAABJRU5ErkJggg=="
    },
    3253: function(t, e, a) {},
    3366: function(t, e, a) {
        "use strict";
        a("b266")
    },
    3398: function(t, e, a) {
        "use strict";
        a("09b8")
    },
    "3d78": function(t, e, a) {},
    "4b13": function(t, e, a) {},
    "4ba3": function(t, e, a) {},
    5749: function(t, e, a) {
        "use strict";
        a("7847")
    },
    "60a7": function(t, e, a) {},
    "6ea3": function(t, e, a) {
        "use strict";
        a("60a7")
    },
    7847: function(t, e, a) {},
    "8a67": function(t, e, a) {
        "use strict";
        a("eb2d")
    },
    a813: function(t, e, a) {
        "use strict";
        a("ce4a")
    },
    b266: function(t, e, a) {},
    b7fa: function(t, e, a) {
        "use strict";
        a("4b13")
    },
    ce4a: function(t, e, a) {},
    cf2a: function(t, e, a) {
        "use strict";
        a("4ba3")
    },
    cf5a: function(t, e, a) {
        "use strict";
        a("ff34")
    },
    dad8: function(t, e, a) {
        "use strict";
        a("1cf6")
    },
    df39: function(t, e, a) {
        "use strict";
        a("3d78")
    },
    eb2d: function(t, e, a) {},
    eb8c: function(t, e, a) {},
    f23e: function(t, e, a) {
        "use strict";
        a.r(e);
        var s = function() {
            var t = this
                , e = t._self._c;
            return e("div", {
                staticClass: "home"
            }, [t.showSearch ? t._e() : e("button", {
                staticClass: "customize",
                on: {
                    click: function(e) {
                        t.customize = !t.customize
                    }
                }
            }, [t._v("CUSTOMIZE")]), t.showSearch || t.customize ? t._e() : e("div", [t.loader ? e("load-animation") : t._e(), "" != t.serviceCards || t.noFavorites ? t._e() : e("h1", [t._v("There are currently no cards of this type.")]), t.noFavorites ? e("h1", {
                staticClass: "no-favorites"
            }, [t._v("NO FAVORITES HAVE BEEN SELECTED.")]) : t._e(), e("http-error"), t.loader ? t._e() : e("masonry", {
                attrs: {
                    cols: {
                        default: 2,
                        700: 1
                    },
                    gutter: 30
                }
            }, [t._l(t.serviceCards, (function(a) {
                    return [t.isValidCardType(a) ? e("basic-card", {
                        key: a.id,
                        attrs: {
                            content: a
                        }
                    }) : t._e(), "promo" != a.cardType || t.dismissed(a) ? t._e() : e("tutorial-card", {
                        key: a.id,
                        attrs: {
                            content: a
                        }
                    }), "librariestype" == a.cardType ? e("library-card", {
                        key: a.id,
                        attrs: {
                            content: a
                        }
                    }) : t._e()]
                }
            ))], 2)], 1), t.showSearch ? e("div", [e("search-results")], 1) : t._e(), t.customize ? [e("draggable-customize", {
                attrs: {
                    cards: t.serviceCards
                },
                on: {
                    cardOrderSaved: function(e) {
                        t.customize = !1
                    },
                    cardOrderCancelled: function(e) {
                        t.customize = !1
                    }
                }
            })] : t._e()], 2)
        }
            , i = []
            , n = function() {
            var t = this
                , e = t._self._c;
            return e("article", {
                ref: "container",
                staticClass: "card-contain",
                attrs: {
                    "aria-label": t.cardProps.frontTitle + " Card",
                    tabindex: "0"
                }
            }, [e("div", {
                staticClass: "flipper",
                class: [t.flipClass]
            }, [t.flipped ? t._e() : e("div", {
                staticClass: "front",
                attrs: {
                    "aria-hidden": t.flipped
                }
            }, [e("action-notice", {
                attrs: {
                    activate: t.fav
                }
            }), t.cardProps.frontTitle ? e("h2", {
                staticClass: "title"
            }, [t._v(t._s(t.content.frontTitle))]) : t._e(), e("div", {
                staticClass: "front-content",
                class: {
                    shrink: t.shrinkClass
                }
            }, [t._t("default", (function() {
                    return [t.cardProps.frontContent ? e("vue-markdown", {
                        staticClass: "markdown padding15",
                        attrs: {
                            source: t.content.frontContent,
                            anchorAttributes: {
                                target: "_blank"
                            }
                        }
                    }) : t._e(), t._l(t.cardProps.collapsableSections, (function(a) {
                            return [e("collapse-section", {
                                key: a.id,
                                staticClass: "margin-fix",
                                attrs: {
                                    titleText: a.title,
                                    expanded: !a.userSectionState.collapsed
                                },
                                on: {
                                    toggled: function(e) {
                                        return t.shrinkSection(e, a)
                                    }
                                }
                            }, [e("vue-markdown", {
                                staticClass: "markdown",
                                attrs: {
                                    source: a.collapsableSection,
                                    anchorAttributes: {
                                        target: "_blank"
                                    }
                                }
                            })], 1)]
                        }
                    )), t.feed && t.content && null != t.content.feedType && 0 == t.feed.needsGoogleAuth ? e("collapse-section", {
                        ref: "activityFeed",
                        staticClass: "activity-feed",
                        attrs: {
                            cardId: t.cardProps.id,
                            titleText: "Activity Feed",
                            feedType: t.feed.feedName,
                            refresh: !0,
                            expanded: !t.content.userSettings.feedCollapsed
                        },
                        on: {
                            toggled: function(e) {
                                return t.openFeed(e)
                            }
                        }
                    }, ["GOOGLE_CALENDAR" == t.feed.feedName ? e("calendar-feed", {
                        attrs: {
                            maxItems: t.maxItems,
                            feedType: t.feed.feedName
                        }
                    }) : t._e(), e("general-feed", {
                        attrs: {
                            maxItems: t.maxItems,
                            feedType: t.feed.feedName
                        }
                    })], 1) : t._e()]
                }
            ))], 2), t.content && t.displayNotification ? e("card-notification", {
                attrs: {
                    notification: t.content.notification
                },
                on: {
                    dismiss: function(e) {
                        return t.dismissNotification(e)
                    }
                }
            }) : t._e(), t.feed && t.feed.needsGoogleAuth && null != t.cardProps.feedType && !t.googleNotificationDismissed ? e("card-notification", {
                attrs: {
                    google: !0,
                    hasRefreshTokenExpired: t.feed.hasRefreshTokenExpired
                },
                on: {
                    dismiss: function(e) {
                        return t.dismissGoogleNotification(e)
                    }
                }
            }) : t._e(), e("div", {
                staticClass: "buttons"
            }, [t.cardProps.goContent ? e("a", {
                staticClass: "btn",
                attrs: {
                    href: "".concat(t.appendNetidTo(t.content.goContent, t.user.netId)),
                    target: t.content.goNewWindow ? "_blank" : "_self",
                    "aria-label": t.cardProps.vpnRequired ? "Go to " + t.cardProps.frontTitle + ". VPN is required." : "Go to " + t.cardProps.frontTitle
                }
            }, [t._v("GO")]) : t._e(), t.cardProps.vpnRequired ? e("div", {
                staticClass: "vpn-lock"
            }, [e("svg", {
                staticClass: "vpn-lock-icon",
                attrs: {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "4 0 448 512",
                    alt: "VPN is required for " + t.cardProps.frontTitle,
                    "aria-hidden": "true"
                }
            }, [e("title", [t._v(t._s("VPN is required for " + t.cardProps.frontTitle))]), e("path", {
                attrs: {
                    d: "M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
                }
            })]), e("p", [e("a", {
                attrs: {
                    target: "_blank",
                    href: "//nyu.edu/life/information-technology/infrastructure/network-services/vpn.html"
                }
            }, [t._v("VPN required")])])]) : t._e(), "njtransittype" == t.cardProps.cardType ? e("div", {
                staticClass: "transit-buttons"
            }, [e("a", {
                staticClass: "btn",
                attrs: {
                    href: "https://mtix.njtransit.com/masticketing/studentRegistration.xhtml?university_code=2562&student_id",
                    target: "_blank"
                }
            }, [t._v("ENROLL")]), e("br"), e("a", {
                staticClass: "btn",
                attrs: {
                    href: "https://mtix.njtransit.com/masticketing/studentLogin.xhtml?university_code=2562&student_id=1",
                    target: "_blank"
                }
            }, [t._v("MANAGE")])]) : t._e(), e("settings-button", {
                attrs: {
                    "aria-label": "Flip " + t.cardProps.frontTitle + " Card"
                },
                on: {
                    click: function(e) {
                        return e.preventDefault(),
                            t.flipCard()
                    },
                    keydown: function(e) {
                        return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : (e.preventDefault(),
                            t.flipCard())
                    }
                }
            })], 1), e("collapse-button", {
                attrs: {
                    "aria-label": "Collapse " + t.cardProps.frontTitle + " Card",
                    collapsed: t.shrinkClass
                },
                on: {
                    click: function(e) {
                        return e.preventDefault(),
                            t.shrinkCard()
                    },
                    keydown: function(e) {
                        return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : (e.preventDefault(),
                            t.shrinkCard())
                    }
                }
            }), e("favorite-button", {
                attrs: {
                    favorited: t.favorited,
                    "aria-label": "Favorite " + t.cardProps.frontTitle + " Card"
                },
                on: {
                    click: function(e) {
                        return e.preventDefault(),
                            t.favoriteCard()
                    },
                    keydown: function(e) {
                        return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : (e.preventDefault(),
                            t.favoriteCard())
                    }
                }
            })], 1), t.flipped ? e("div", {
                staticClass: "back",
                attrs: {
                    "aria-hidden": !t.flipped
                }
            }, [t.cardProps.frontTitle ? e("h2", [t._v(t._s(t.content.frontTitle))]) : t._e(), t.cardProps.backContent ? e("vue-markdown", {
                staticClass: "markdown",
                attrs: {
                    source: t.cardProps.backContent,
                    anchorAttributes: {
                        target: "_blank"
                    }
                }
            }) : t._e(), e("collapse-section", {
                attrs: {
                    expanded: !0,
                    titleText: "Settings"
                }
            }, [e("div", {
                staticClass: "options"
            }, [t.feed && t.content && null != t.content.feedType && 0 == t.feed.needsGoogleAuth ? e("div", {
                staticClass: "option"
            }, [e("h3", {
                staticClass: "max"
            }, [t._v("Maximum items to show")]), t.feed && t.content && null != t.content.feedType && 0 == t.feed.needsGoogleAuth ? e("range-slider", {
                attrs: {
                    startVal: t.maxItems
                },
                on: {
                    valueChange: function(e) {
                        return t.changeFeed(e)
                    }
                }
            }) : t._e()], 1) : t._e(), e("div", {
                staticClass: "option"
            }, [e("h3", [t._v("Make this card a favorite?")]), e("toggle-switch", {
                attrs: {
                    prefill: t.favorited,
                    onText: "Yes",
                    offText: "No"
                },
                on: {
                    toggled: function(e) {
                        return t.favoriteCard()
                    }
                }
            })], 1)])]), t.cardProps.helpContent ? e("collapse-section", {
                attrs: {
                    expanded: !0,
                    titleText: "HELP & SUPPORT"
                }
            }, [e("vue-markdown", {
                staticClass: "markdown",
                attrs: {
                    source: t.cardProps.helpContent,
                    anchorAttributes: {
                        target: "_blank"
                    }
                }
            })], 1) : t._e(), e("collapse-section", {
                attrs: {
                    overflowHide: !1,
                    expanded: !1,
                    titleText: "REPORT A PROBLEM OR LEAVE FEEDBACK"
                }
            }, [e("feedback-form", {
                attrs: {
                    inCardName: t.cardProps.frontTitle,
                    inCard: !0
                }
            })], 1), e("settings-button", {
                attrs: {
                    "aria-label": "Flip Card for Settings"
                },
                on: {
                    click: function(e) {
                        return t.flipCard()
                    },
                    keydown: function(e) {
                        return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : (e.preventDefault(),
                            t.flipCard())
                    }
                }
            })], 1) : t._e()])])
        }
            , r = []
            , o = (a("a481"),
            a("444c"))
            , c = a("ce5e")
            , l = (a("7f7f"),
                function() {
                    var t = this
                        , e = t._self._c;
                    return e("div", {
                        staticClass: "slidecontainer"
                    }, [e("div", {
                        staticClass: "slide-range"
                    }, [e("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.rangeVal,
                            expression: "rangeVal"
                        }],
                        staticClass: "slider",
                        attrs: {
                            type: "range",
                            "aria-live": "assertive",
                            "aria-label": t.name + " slider between " + t.minimum + " & " + t.maximum + " changed to " + t.rangeVal,
                            min: t.minimum,
                            max: t.maximum
                        },
                        domProps: {
                            value: t.rangeVal
                        },
                        on: {
                            change: function(e) {
                                return t.slideEmit()
                            },
                            __r: function(e) {
                                t.rangeVal = e.target.value
                            }
                        }
                    }), e("div", {
                        staticClass: "range-value"
                    }, [t._v(t._s(t.rangeVal) + " " + t._s(t.unit))])]), e("div", {
                        staticClass: "min-max"
                    }, [e("span", {
                        staticClass: "min",
                        attrs: {
                            "aria-hidden": "true"
                        }
                    }, [t._v(t._s(t.minimum))]), e("span", {
                        staticClass: "max",
                        attrs: {
                            "aria-hidden": "true"
                        }
                    }, [t._v(t._s(t.maximum))])])])
                }
        )
            , d = []
            , u = {
            name: "RangeSlider",
            data: function() {
                return {
                    rangeVal: this.startVal
                }
            },
            props: {
                min: null,
                max: null,
                units: null,
                startVal: {
                    default: 1
                },
                name: {
                    type: String,
                    default: ""
                }
            },
            methods: {
                slideEmit: function() {
                    this.$emit("valueChange", this.rangeVal)
                }
            },
            computed: {
                minimum: function() {
                    return this.min ? this.min : 1
                },
                maximum: function() {
                    return this.max ? this.max : 10
                },
                unit: function() {
                    return this.units ? this.units : "units"
                }
            }
        }
            , f = u
            , p = (a("3398"),
            a("2877"))
            , h = Object(p["a"])(f, l, d, !1, null, "7796cc2c", null)
            , m = h.exports
            , v = a("b963")
            , g = a("9ce6")
            , C = a.n(g)
            , _ = (a("b54a"),
                function() {
                    var t = this
                        , e = t._self._c;
                    return e("div", {
                        staticClass: "notification"
                    }, [t.notification && !t.google ? e("div", {
                        staticClass: "not-google"
                    }, [e("div", {
                        staticClass: "top-text",
                        attrs: {
                            tabindex: "0"
                        }
                    }, [e("h3", [t._v(t._s(t.notification.title))]), e("p", [t._v(t._s(t.notification.description))])]), e("div", {
                        staticClass: "bottom-section",
                        attrs: {
                            tabindex: "0"
                        }
                    }, [e("a", {
                        staticClass: "dismiss",
                        attrs: {
                            href: "/",
                            "aria-label": "Dismiss"
                        },
                        on: {
                            click: function(e) {
                                return e.preventDefault(),
                                    t.dismiss()
                            }
                        }
                    }), t.notification.link ? e("a", {
                        staticClass: "go-now",
                        attrs: {
                            href: t.notification.link,
                            target: "_blank",
                            "aria-label": "Go Now"
                        }
                    }) : t._e()])]) : t._e(), t.google ? e("div", {
                        staticClass: "google"
                    }, [t._m(0), e("div", {
                        staticClass: "bottom-section"
                    }, [e("a", {
                        staticClass: "dismiss",
                        attrs: {
                            href: "/",
                            "aria-label": "Dismiss"
                        },
                        on: {
                            click: function(e) {
                                return e.preventDefault(),
                                    t.dismissGoogle()
                            }
                        }
                    }), e("a", {
                        staticClass: "go-now",
                        attrs: {
                            target: "_blank",
                            href: "/delegate/service/initializeOauth2?nyuHomeUrl=".concat(t.path),
                            "aria-label": "Authorize Application"
                        }
                    }), e("div", {
                        staticClass: "google-image"
                    })])]) : t._e()])
                }
        )
            , y = [function() {
            var t = this
                , e = t._self._c;
            return e("div", {
                staticClass: "top-text"
            }, [e("h3", [t._v("CONNECT TO GOOGLE")]), e("p", [t._v("In order to display information from your Google Applications, NYU Home will need access to your NYU Google account. Link to your account?")])])
        }
        ]
            , b = {
            name: "CardNotification",
            props: {
                notification: null,
                google: {
                    default: !1
                },
                hasRefreshTokenExpired: {
                    default: !1
                }
            },
            data: function() {
                return {
                    dismissed: !1
                }
            },
            created: function() {
                this.google && this.hasRefreshTokenExpired && this.$store.dispatch("getCardNotificationCounts")
            },
            computed: {
                path: function() {
                    return this.$route.path
                }
            },
            methods: {
                dismiss: function() {
                    var t = new Date;
                    this.dismissed = t.toJSON(),
                        this.$emit("dismiss", this.dismissed)
                },
                dismissGoogle: function() {
                    this.$emit("dismiss", !0)
                }
            }
        }
            , w = b
            , T = (a("cf2a"),
            Object(p["a"])(w, _, y, !1, null, "409cce4c", null))
            , D = T.exports
            , k = function() {
            var t = this
                , e = t._self._c;
            return e("div", {
                staticClass: "feed-contain"
            }, [t.feed && t.feed.items.length > 0 ? e("ul", t._l(t.feed.items, (function(a, s) {
                    return e("li", {
                        key: s
                    }, t._l(a.rows, (function(a, s) {
                            return e("div", {
                                key: s,
                                staticClass: "row"
                            }, t._l(a.fields, (function(a, s) {
                                    return e("div", {
                                        key: s,
                                        staticClass: "field",
                                        class: a.style,
                                        domProps: {
                                            innerHTML: t._s(t.generator(a))
                                        }
                                    })
                                }
                            )), 0)
                        }
                    )), 0)
                }
            )), 0) : t._e(), t.feed && !t.feed.items.length ? e("p", {
                staticClass: "no-activity"
            }, [t._v("You currently have no activity.")]) : t._e()])
        }
            , S = []
            , A = (a("6b54"),
            {
                name: "GeneralFeed",
                data: function() {
                    return {
                        classes: null
                    }
                },
                props: {
                    feedType: null
                },
                computed: {
                    feed: function() {
                        return this.$store.state.services.feeds && this.feedType ? this.$store.state.services.feeds[this.feedType] : []
                    }
                },
                methods: {
                    dateReceived: function(t, e) {
                        var a = new Date(parseInt(t))
                            , s = new Date
                            , i = new Date(s.getFullYear(),s.getMonth(),s.getDate() - 7);
                        if (!0 === e) {
                            var n = a.getMonth() + 1
                                , r = a.getDate()
                                , o = a.getFullYear().toString().substring(2, 4)
                                , c = a.getHours() > 11 ? "PM" : "AM"
                                , l = (a.getHours() + 24) % 12 || 12
                                , d = a.getMinutes()
                                , u = d < 10 ? "0".concat(d) : d;
                            return "".concat(n, "/").concat(r, "/").concat(o, " at ").concat(l, ":").concat(u, " ").concat(c)
                        }
                        if (a < i) {
                            var f = a.getMonth() + 1
                                , p = a.getDate()
                                , h = a.getFullYear().toString().substring(2, 4);
                            return "".concat(f, "/").concat(p, "/").concat(h)
                        }
                        if (s.getDay() == a.getDay() && s.getMonth() == a.getMonth()) {
                            var m = a.getHours() > 11 ? "PM" : "AM"
                                , v = (a.getHours() + 24) % 12 || 12
                                , g = a.getMinutes()
                                , C = g < 10 ? "0".concat(g) : g;
                            return "".concat(v, ":").concat(C, " ").concat(m)
                        }
                        var _ = {
                            weekday: "long"
                        }
                            , y = a.toLocaleDateString("en-US", _);
                        return y
                    },
                    fieldFormatter: function(t) {
                        if (t.url) {
                            var e = '<a class="feed-link" href="'.concat(t.url, '" target="_blank">').concat(t.value, "</a>");
                            return e
                        }
                        return t.value
                    },
                    generator: function(t) {
                        if ("receivedDate" == t.fieldName || "sortDate" == t.fieldName || "postDate" == t.fieldName) {
                            var e = this.dateReceived(t.value, !1);
                            return e
                        }
                        if ("dueDate" == t.fieldName || "availDate" == t.fieldName) {
                            var a = this.dateReceived(t.value, !0);
                            return a
                        }
                        var s = this.fieldFormatter(t);
                        return s
                    }
                }
            })
            , x = A
            , N = (a("b7fa"),
            a("3366"),
            Object(p["a"])(x, k, S, !1, null, "2609d4e1", null))
            , O = N.exports
            , E = function() {
            var t = this
                , e = t._self._c;
            return e("div", {
                staticClass: "feed-contain"
            }, [e("ul", {
                staticClass: "feed-container",
                attrs: {
                    id: "googleCalendarActivityFeedTemplateContainer",
                    "data-timestamp": "Updated: 10:18 AM"
                }
            }, t._l(t.feed.items, (function(a, s) {
                    return e("li", {
                        key: s
                    }, [e("div", {
                        staticClass: "feed-text"
                    }, [e("CalendarEvent", {
                        staticClass: "calendar-item",
                        attrs: {
                            item: a
                        },
                        on: {
                            update: function(e) {
                                return t.sendConfirmation(a, e)
                            }
                        }
                    })], 1)])
                }
            )), 0)])
        }
            , R = []
            , P = function() {
            var t = this
                , e = t._self._c;
            return e("div", {
                staticClass: "calendar-item clearfix"
            }, [e("div", {
                staticClass: "calendar-datetime"
            }, [e("div", {
                staticClass: "calendar-day"
            }, [t._v(t._s(t.formatCalendarFeedDate(t.item.startTime)))]), e("div", {
                staticClass: "calendar-time"
            }, [t._v(t._s(t.formatDateRange(t.item.startTime, t.item.endTime, t.item.allDayEvent)))]), t.item.hasReminders && t.displayAlert(t.item) ? e("div", {
                staticClass: "calendar-alert"
            }, [e("img", {
                staticClass: "calendar-alert-icon",
                attrs: {
                    src: a("2b5f")
                }
            }), t._v("\n    " + t._s(t.displayAlertText(t.item)) + "\n    ")]) : t._e()]), e("div", {
                staticClass: "calendar-details"
            }, [t.item.creatorName ? e("div", {
                staticClass: "feed-item-truncate"
            }, [t._v(t._s(t.item.creatorName))]) : t._e(), t.item.creatorName ? t._e() : e("div", {
                staticClass: "feed-item-truncate"
            }, [t._v(" ")]), t.item.summary ? e("div", {
                staticClass: "feed-item-truncate"
            }, [t._v("\n    " + t._s(t.item.summary) + "\n    "), t.item.location ? e("div", {
                staticClass: "feed-item-truncate calendar-location"
            }, [t._v("\n        " + t._s(t.item.location) + "\n    ")]) : t._e(), t.item.location ? t._e() : e("div", {
                staticClass: "feed-item-truncate calendar-location"
            }, [t._v(" ")]), e("div", {
                staticClass: "calendar-actions"
            }, [e("button", {
                staticClass: "calendar-action",
                class: {
                    "action-taken": "accepted" === this.eventResponse
                },
                on: {
                    click: function(e) {
                        return t.updateEventResponse("accepted")
                    }
                }
            }, [t._v("YES")]), t._v("\n         \n        "), e("button", {
                staticClass: "calendar-action",
                class: {
                    "action-taken": "tentative" === this.eventResponse
                },
                on: {
                    click: function(e) {
                        return t.updateEventResponse("tentative")
                    }
                }
            }, [t._v("MAYBE")]), t._v("\n         \n        "), e("button", {
                staticClass: "calendar-action",
                class: {
                    "action-taken": "declined" === this.eventResponse
                },
                on: {
                    click: function(e) {
                        return t.updateEventResponse("declined")
                    }
                }
            }, [t._v("NO")])])]) : t._e(), t.item.summary ? t._e() : e("div", {
                staticClass: "feed-item"
            }, [t._v(" ")])])])
        }
            , $ = []
            , F = {
            name: "CalendarEvent",
            data: function() {
                return {
                    rsvp: {
                        default: "needsAction",
                        type: String
                    }
                }
            },
            watch: {
                item: function(t) {
                    this.rsvp = this.item.responseStatus
                }
            },
            props: {
                item: null
            },
            computed: {
                eventResponse: function() {
                    return this.rsvp
                }
            },
            mounted: function() {
                this.rsvp = this.item.responseStatus
            },
            methods: {
                updateEventResponse: function(t) {
                    this.rsvp = t,
                        this.$emit("update", t)
                },
                formatDate: function(t) {
                    var e = new Date(t)
                        , a = e.getHours()
                        , s = e.getMinutes()
                        , i = a >= 12 ? "pm" : "am";
                    a %= 12,
                        a = a || 12,
                        s = s < 10 ? "0" + s : s;
                    var n = a + ":" + s + " " + i;
                    return n
                },
                formatDateRange: function(t, e, a) {
                    if (a)
                        return "All Day";
                    var s = this.formatDate(t)
                        , i = this.formatDate(e)
                        , n = s + " - " + i;
                    return n
                },
                formatCalendarFeedDate: function(t) {
                    var e = new Date(t)
                        , a = new Date
                        , s = new Date(a.getFullYear(),a.getMonth(),a.getDate() + 7)
                        , i = (new Date(e),
                        "");
                    if (e > s) {
                        var n = {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                        };
                        i = e.toLocaleDateString("en-US", n)
                    } else if (e.getDay() === a.getDay())
                        i = "Today";
                    else if (e.getDay() === a.getDay() + 1)
                        i = "Tomorrow";
                    else {
                        var r = {
                            weekday: "long"
                        };
                        i = e.toLocaleDateString("en-US", r)
                    }
                    return i
                },
                displayAlert: function(t) {
                    var e = new Date
                        , a = new Date
                        , s = new Date(t.startTime)
                        , i = new Date(t.endTime);
                    return a.setMinutes(a.getMinutes() + 60),
                    a > s || e > s && e < i
                },
                displayAlertText: function(t) {
                    var e = new Date
                        , a = new Date(t.startTime)
                        , s = new Date(t.endTime);
                    if (e > a && e < s)
                        return "NOW";
                    var i = a.getTime() - e.getTime()
                        , n = i / 6e4;
                    return Math.round(n) + " MIN"
                }
            }
        }
            , M = F
            , I = (a("a813"),
            Object(p["a"])(M, P, $, !1, null, "13dc15f7", null))
            , z = I.exports
            , j = {
            name: "CalendarFeed",
            components: {
                CalendarEvent: z
            },
            data: function() {
                return {
                    classes: null
                }
            },
            props: {
                feedType: null
            },
            computed: {
                feed: function() {
                    return this.$store.state.services.feeds ? this.$store.state.services.feeds["GOOGLE_CALENDAR"] : []
                }
            },
            methods: {
                sendConfirmation: function(t, e) {
                    t.responseStatus = e,
                        this.$store.dispatch("sendConfirmation", t)
                },
                formatDate: function(t) {
                    var e = new Date(t)
                        , a = e.getHours()
                        , s = e.getMinutes()
                        , i = a >= 12 ? "pm" : "am";
                    a %= 12,
                        a = a || 12,
                        s = s < 10 ? "0" + s : s;
                    var n = a + ":" + s + " " + i;
                    return n
                },
                formatDateRange: function(t, e, a) {
                    if (a)
                        return "All Day";
                    var s = this.formatDate(t)
                        , i = this.formatDate(e)
                        , n = s + " - " + i;
                    return n
                },
                formatCalendarFeedDate: function(t) {
                    var e = new Date(t)
                        , a = new Date
                        , s = new Date(a.getFullYear(),a.getMonth(),a.getDate() + 7)
                        , i = (new Date(e),
                        "");
                    if (e > s) {
                        var n = {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                        };
                        i = e.toLocaleDateString("en-US", n)
                    } else if (e.getDay() === a.getDay())
                        i = "Today";
                    else if (e.getDay() === a.getDay() + 1)
                        i = "Tomorrow";
                    else {
                        var r = {
                            weekday: "long"
                        };
                        i = e.toLocaleDateString("en-US", r)
                    }
                    return i
                },
                displayAlert: function(t) {
                    var e = new Date
                        , a = new Date
                        , s = new Date(t.startTime)
                        , i = new Date(t.endTime);
                    return a.setMinutes(a.getMinutes() + 60),
                    a > s || e > s && e < i
                },
                displayAlertText: function(t) {
                    var e = new Date
                        , a = new Date(t.startTime)
                        , s = new Date(t.endTime);
                    if (e > a && e < s)
                        return "NOW";
                    var i = a.getTime() - e.getTime()
                        , n = i / 6e4;
                    return Math.round(n) + " MIN"
                }
            }
        }
            , V = j
            , L = (a("5749"),
            a("cf5a"),
            Object(p["a"])(V, E, R, !1, null, "6140aeae", null))
            , H = L.exports
            , U = (a("b047c"),
            a("b238"))
            , G = function() {
            var t = this
                , e = t._self._c;
            return e("button", t._g({
                                        staticClass: "favorite",
                                        attrs: {
                                            id: "nyu_btn-favorite",
                                            tabindex: "0",
                                            "aria-pressed": t.favorited
                                        }
                                    }, t.$listeners), [e("svg", {
                class: {
                    favorited: t.favorited
                },
                attrs: {
                    viewBox: "-2 134 41 54.5",
                    width: "41",
                    height: "54.5",
                    y: "108",
                    version: "1.1",
                    "aria-hidden": "true"
                }
            }, [e("title", [t._v("Favorite")]), e("path", {
                attrs: {
                    fill: "none",
                    stroke: "#559ACD",
                    d: "M9.6 144.5c-.4 0-1.1-.2-1.1.2v32.5c0 .6.6.7 1 .4l9.3-8.8 9.3 9c.2.3.5.2.5-.2v-32.9c0-.4.1-.2-.2-.2H9.6z",
                    id: "path4706"
                }
            })])])
        }
            , Y = []
            , B = {
            name: "FavoriteButton",
            props: {
                favorited: {
                    default: !1,
                    required: !0
                }
            }
        }
            , q = B
            , J = (a("f3d0"),
            Object(p["a"])(q, G, Y, !1, null, "062afdab", null))
            , W = J.exports
            , Z = a("0c85")
            , X = function() {
            var t = this
                , e = t._self._c;
            return e("div", {
                staticClass: "settings-container",
                attrs: {
                    tabindex: "-1"
                }
            }, [e("svg", t._g({
                                  staticClass: "settings",
                                  attrs: {
                                      tabindex: "0",
                                      viewBox: "-4 5 45 25.3",
                                      width: "45",
                                      height: "25.3",
                                      id: "src--main--webapp--images--raw-svgs--nyu_btn-settings",
                                      y: "525",
                                      version: "1.1",
                                      role: "button"
                                  }
                              }, t.$listeners), [e("g", {
                attrs: {
                    fill: "#559ACD",
                    id: "g4780"
                }
            }, [e("path", {
                attrs: {
                    d: "M6 17.6C6 16.2 7.2 15 8.6 15c1.5 0 2.6 1.2 2.6 2.6 0 1.5-1.2 2.6-2.6 2.6-1.4.1-2.6-1.1-2.6-2.6zM15.9 17.6c0-1.5 1.2-2.6 2.6-2.6s2.6 1.2 2.6 2.6c0 1.5-1.2 2.6-2.6 2.6s-2.6-1.1-2.6-2.6zM25.7 17.6c0-1.5 1.2-2.6 2.6-2.6s2.6 1.2 2.6 2.6c0 1.5-1.2 2.6-2.6 2.6s-2.6-1.1-2.6-2.6z",
                    id: "path4778"
                }
            })])])])
        }
            , K = []
            , Q = {
            name: "SettingsButton"
        }
            , tt = Q
            , et = (a("28ab"),
            Object(p["a"])(tt, X, K, !1, null, "1c65b77e", null))
            , at = et.exports
            , st = {
            name: "BasicCard",
            components: {
                ActionNotice: o["a"],
                CollapseSection: c["a"],
                RangeSlider: m,
                ToggleSwitch: v["a"],
                VueMarkdown: C.a,
                CardNotification: D,
                GeneralFeed: O,
                CalendarFeed: H,
                FeedbackForm: U["a"],
                FavoriteButton: W,
                SettingsButton: at,
                CollapseButton: Z["a"]
            },
            props: {
                content: null,
                classes: null,
                width: {
                    type: String,
                    required: !1,
                    default: ""
                }
            },
            data: function() {
                return {
                    googleTimer: null,
                    classTimer: null,
                    randomHeight: "100px",
                    flipped: !1,
                    shrink: !1,
                    fav: null
                }
            },
            mounted: function() {
                if (this.cardProps.feedType) {
                    var t = {
                        cardId: this.cardProps.id,
                        feedType: this.cardProps.feedType
                    };
                    this.$store.dispatch("getFeed", t)
                }
            },
            beforeDestroy: function() {
                clearInterval(this.googleTimer),
                    clearInterval(this.classTimer)
            },
            computed: {
                user: function() {
                    return this.$store.state.profile.user
                },
                feed: function() {
                    return this.cardProps.feedType && this.$store.state.services.feeds ? this.$store.state.services.feeds[this.cardProps.feedType] : {
                        needsGoogleAuth: null
                    }
                },
                maxItems: function() {
                    return this.cardProps.userSettings ? this.cardProps.userSettings.maxVisibleItems : 7
                },
                googleNotificationDismissed: function() {
                    return this.$store.state.profile.user.googleNotificationDismissed
                },
                displayNotification: function() {
                    return !!this.content.notification
                },
                cardProps: function() {
                    return this.content ? this.content : {
                        id: null,
                        name: null,
                        description: null,
                        frontTitle: null,
                        frontContent: null,
                        backTitle: null,
                        backContent: null,
                        goContent: null,
                        feedType: null,
                        collapsableSections: [],
                        userSettings: {
                            favorite: !1,
                            collapsed: !1,
                            notificationDismissed: !1,
                            feedCollapsed: !1,
                            maxVisibleItems: 10,
                            googleNotificationDismissed: !1
                        }
                    }
                },
                favorited: function() {
                    return !!this.cardProps.id && this.cardProps.userSettings.favorite
                },
                flipClass: function() {
                    return this.flipped ? "flip" : ""
                },
                shrinkClass: function() {
                    return !!this.cardProps.id && this.cardProps.userSettings.collapsed
                }
            },
            methods: {
                appendNetidTo: function(t, e) {
                    try {
                        if (e) {
                            var a = t.replace("<NET_ID>", "".concat(e));
                            return a
                        }
                    } catch (s) {}
                    return t
                },
                flipCard: function() {
                    this.flipped = !this.flipped,
                        this.$refs.container.focus()
                },
                shrinkSection: function(t, e) {
                    e.userSectionState.collapsed = t,
                        this.$store.dispatch("postSectionSettings", e)
                },
                shrinkCard: function() {
                    this.cardProps.userSettings.collapsed = !this.cardProps.userSettings.collapsed,
                        this.$store.dispatch("cardSettings", this.content),
                        this.$refs.container.focus()
                },
                favoriteCard: function() {
                    this.cardProps.userSettings.favorite = !this.cardProps.userSettings.favorite,
                        this.fav = this.cardProps.userSettings.favorite,
                        this.$store.dispatch("cardSettings", this.content),
                        this.$refs.container.focus()
                },
                dismissNotification: function(t) {
                    this.content.userSettings.notificationDismissed = t,
                        this.content.notification = null,
                        this.$store.dispatch("cardSettings", this.content)
                },
                dismissGoogleNotification: function(t) {
                    this.googleNotificationDismissed = t,
                        this.$store.dispatch("dismissGoogle", t)
                },
                openFeed: function(t) {
                    this.cardProps.userSettings.feedCollapsed = t,
                        this.$store.dispatch("cardSettings", this.content)
                },
                changeFeed: function(t) {
                    this.cardProps.userSettings.maxVisibleItems = t,
                        this.$store.dispatch("cardSettings", this.content)
                }
            }
        }
            , it = st
            , nt = (a("0339"),
            a("8a67"),
            Object(p["a"])(it, n, r, !1, null, "10f700a6", null))
            , rt = nt.exports
            , ot = a("abad")
            , ct = a("f344")
            , lt = function() {
            var t = this
                , e = t._self._c;
            return e("div", [t.searchResults && "" != t.searchResults ? e("div", {
                staticClass: "search"
            }, ["search" == t.viewType ? e("h3", {
                attrs: {
                    role: "status",
                    "aria-live": "polite"
                }
            }, [e("span", {
                staticClass: "big blue"
            }, [t._v(t._s(t.searchResults.length) + " SEARCH RESULT(S)")]), t._v("\n      found for\n      "), e("span", {
                staticClass: "blue"
            }, [t._v('"' + t._s(this.$route.params.searchTermOrID) + '"')])]) : t._e(), "card" == t.viewType ? e("h3", [e("span", {
                staticClass: "big blue"
            }, [t._v("Below is your selected card:")])]) : t._e(), e("masonry", {
                attrs: {
                    cols: {
                        default: 2,
                        700: 1
                    },
                    gutter: 30
                }
            }, [t._l(t.searchResults, (function(a) {
                    return ["promo" != a.cardType && "librariestype" != a.cardType ? e("basic-card", {
                        key: a.id,
                        attrs: {
                            content: a
                        }
                    }) : t._e(), "promo" == a.cardType ? e("tutorial-card", {
                        key: a.id,
                        attrs: {
                            content: a.notification
                        }
                    }) : t._e(), "librariestype" == a.cardType ? e("library-card", {
                        key: a.id,
                        attrs: {
                            content: a
                        }
                    }) : t._e()]
                }
            ))], 2)], 1) : t.notAuthorized ? e("h1", {
                staticClass: "no-cards"
            }, [t._v("YOU DO NOT HAVE PERMISSION TO VIEW THIS CARD.")]) : e("h1", {
                staticClass: "no-cards"
            }, [e("span", {
                staticClass: "big blue"
            }, [t._v("NO SEARCH RESULT(S) found for\n        "), e("span", {
                staticClass: "big blue"
            }, [t._v(' "' + t._s(this.$route.params.searchTermOrID) + '"')])]), e("p", {
                staticClass: "blue"
            }, [t._v(" You may be able to find what you're looking for at one of these links:")]), t._m(0)])])
        }
            , dt = [function() {
            var t = this
                , e = t._self._c;
            return e("ul", [e("li", [e("a", {
                staticClass: "blue",
                attrs: {
                    href: "https://www.nyu.edu/search",
                    target: "_blank"
                }
            }, [t._v("NYU Search")])]), e("li", [e("a", {
                staticClass: "blue",
                attrs: {
                    href: "https://www.nyu.edu/life/information-technology/getting-started/a-z-list-of-nyu-it-services.html",
                    target: "_blank"
                }
            }, [t._v("NYU IT Services")])]), e("li", [e("a", {
                staticClass: "blue",
                attrs: {
                    href: "https://www.nyu.edu/footer/contact-us.html",
                    target: "_blank"
                }
            }, [t._v("NYU Contacts")])]), e("li", [e("a", {
                staticClass: "blue",
                attrs: {
                    href: "https://www.nyu.edu/life/safety-health-wellness/info-alerts.html",
                    target: "_blank"
                }
            }, [t._v("NYU Alerts")])]), e("li", [e("a", {
                staticClass: "blue",
                attrs: {
                    href: "https://www.nyu.edu/life/safety-health-wellness/public-safety.html",
                    target: "_blank"
                }
            }, [t._v("NYU Public Safety")])]), e("li", [e("a", {
                staticClass: "blue",
                attrs: {
                    href: "https://www.nyu.edu/about/news-publications/news.html",
                    target: "_blank"
                }
            }, [t._v("NYU News")])])])
        }
        ]
            , ut = function() {
            var t = this
                , e = t._self._c;
            return e("basic-card", {
                attrs: {
                    content: t.content
                }
            }, [e("library-search-embed")], 1)
        }
            , ft = []
            , pt = function() {
            var t = this
                , e = t._self._c;
            return e("div", {
                attrs: {
                    id: "primo_explore_search_embed_container_nyu"
                }
            })
        }
            , ht = []
            , mt = {
            name: "LibrarySearch",
            props: {
                content: null
            },
            beforeCreate: function() {
                var t = document.createElement("script");
                t.type = "text/javascript",
                    t.setAttribute("src", "https://cdn-dev.library.nyu.edu/bess-vue/app.min.js?institution=NYU_HOME&element_id=primo_explore_search_embed_container_nyu"),
                    document.body.appendChild(t)
            }
        }
            , vt = mt
            , gt = (a("df39"),
            Object(p["a"])(vt, pt, ht, !1, null, null, null))
            , Ct = gt.exports
            , _t = {
            name: "LibraryCard",
            components: {
                BasicCard: rt,
                LibrarySearchEmbed: Ct
            },
            props: {
                content: null
            },
            data: function() {
                return {
                    presets: {
                        frontTitle: "NYU Libraries"
                    }
                }
            }
        }
            , yt = _t
            , bt = Object(p["a"])(yt, ut, ft, !1, null, null, null)
            , wt = bt.exports
            , Tt = {
            name: "SearchResults",
            components: {
                BasicCard: rt,
                TutorialCard: ot["a"],
                LibraryCard: wt
            },
            props: {
                cardId: null
            },
            data: function() {
                return {
                    showProfile: !1
                }
            },
            computed: {
                searchResults: function() {
                    var t = this.$route.params.viewType;
                    return "card" == t ? [this.$store.state.services.searchResultCards] : "search" == t ? this.$store.state.services.searchedForDisplay : void 0
                },
                viewType: function() {
                    var t = this.$route.params.viewType;
                    return "card" == t ? "card" : "search" == t ? "search" : void 0
                },
                notAuthorized: function() {
                    return this.$store.state.services.notAuthorized
                }
            },
            mounted: function() {
                this.getResults()
            },
            watch: {
                $route: function() {
                    this.getResults()
                }
            },
            methods: {
                getResults: function() {
                    var t = this
                        , e = this.$route.params.viewType
                        , a = this.$route.params.searchTermOrID;
                    "card" == e ? this.$store.dispatch("findCardSingle", a) : "search" == e && this.$store.dispatch("getSearchResults", a).then((function() {
                            t.$store.dispatch("setSearchForDisplay")
                        }
                                                                                                                                                ))
                }
            }
        }
            , Dt = Tt
            , kt = (a("6ea3"),
            Object(p["a"])(Dt, lt, dt, !1, null, "2ef1c3d0", null))
            , St = kt.exports
            , At = function() {
            var t = this
                , e = t._self._c;
            return t.showError ? e("div", {
                staticClass: "error-contain"
            }, [e("span", {
                staticClass: "red"
            }, [t._v("NYU Home encountered an error")]), t._m(0), e("div", {
                staticClass: "closer",
                on: {
                    click: function(e) {
                        return t.closeError()
                    }
                }
            }, [t._v("✖")])]) : t._e()
        }
            , xt = [function() {
            var t = this
                , e = t._self._c;
            return e("p", [t._v("Please try your request again.  If the problem persists, you can "), e("a", {
                attrs: {
                    target: "_blank",
                    href: "/system-error.html"
                }
            }, [t._v("access commonly used services")]), t._v("\n      or "), e("a", {
                attrs: {
                    target: "_blank",
                    href: "/system-error.html"
                }
            }, [t._v("contact the IT Service Desk")]), t._v(".")])
        }
        ]
            , Nt = {
            name: "HttpError",
            computed: {
                showError: function() {
                    return !!(this.$store.state.people.generalError || this.$store.state.services.generalError || this.$store.state.profile.generalError)
                }
            },
            methods: {
                closeError: function() {
                    this.$store.state.people.generalError = !1,
                        this.$store.state.services.generalError = !1,
                        this.$store.state.profile.generalError = !1
                }
            }
        }
            , Ot = Nt
            , Et = (a("dad8"),
            Object(p["a"])(Ot, At, xt, !1, null, "195996a3", null))
            , Rt = Et.exports
            , Pt = a("9bd9")
            , $t = {
            name: "service",
            components: {
                DraggableCustomize: Pt["a"],
                BasicCard: rt,
                TutorialCard: ot["a"],
                LoadAnimation: ct["a"],
                SearchResults: St,
                LibraryCard: wt,
                HttpError: Rt
            },
            data: function() {
                return {
                    showSearch: !1,
                    customize: !1
                }
            },
            mounted: function() {
                var t = this.$route.params.viewType;
                "search" != t && "card" != t ? t ? this.$store.dispatch("getCards", t.toUpperCase()) : this.$store.dispatch("getCards", "FAVORITES") : this.showSearch = !0
            },
            computed: {
                noFavorites: function() {
                    var t = this.$route.path;
                    return "" == this.serviceCards && "/services/favorites" == t
                },
                serviceCards: function() {
                    return this.$store.state.services.cards
                },
                loader: function() {
                    return this.$store.state.services.loader
                },
                cardsOrSearch: function() {
                    return "search" != this.$route.params.viewType || "card" != this.$route.params.viewType
                }
            },
            watch: {
                $route: function() {
                    "search" == this.$route.params.viewType || "card" == this.$route.params.viewType ? this.showSearch = !0 : (this.showSearch = !1,
                        this.$route.params.viewType ? this.$store.dispatch("getCards", this.$route.params.viewType.toUpperCase()) : this.$store.dispatch("getCards", "FAVORITES"))
                }
            },
            methods: {
                dismissed: function(t) {
                    if (t && t.notification && t.userSettings) {
                        var e = function() {
                            var t = new Date((new Date).setFullYear((new Date).getFullYear() - 1));
                            return t.toJSON()
                        }
                            , a = function() {
                            var t = new Date((new Date).setFullYear((new Date).getFullYear() + 1));
                            return t.toJSON()
                        }
                            , s = (new Date).toJSON()
                            , i = t.notification.beginDate ? t.notification.beginDate : e()
                            , n = t.notification.endDate ? t.notification.endDate : a()
                            , r = t.userSettings.notificationDismissed;
                        return !!r && (i < r && r < n || s > n)
                    }
                    return !1
                },
                isValidCardType: function(t) {
                    return "type1" == t.cardType || "njtransittype" == t.cardType || "emailtype" == t.cardType || "drivetype" == t.cardType || "calendartype" == t.cardType || "groupstype" == t.cardType
                }
            }
        }
            , Ft = $t
            , Mt = (a("25f8"),
            Object(p["a"])(Ft, s, i, !1, null, "c6189efc", null));
        e["default"] = Mt.exports
    },
    f3d0: function(t, e, a) {
        "use strict";
        a("3253")
    },
    ff34: function(t, e, a) {}
}]);
