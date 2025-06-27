(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-662abbee"], {
    "14a8": function(t, e, r) {},
    "1cf6": function(t, e, r) {},
    "28ab": function(t, e, r) {
        "use strict";
        r("14a8")
    },
    3253: function(t, e, r) {},
    "3d78": function(t, e, r) {},
    "4e38": function(t, e, r) {},
    "66cf": function(t, e, r) {},
    "6a05": function(t, e, r) {},
    9573: function(t, e, r) {},
    a111: function(t, e, r) {
        "use strict";
        r("4e38")
    },
    a31e: function(t, e, r) {
        "use strict";
        r("66cf")
    },
    aabb: function(t, e, r) {
        "use strict";
        r("6a05")
    },
    c6b1: function(t, e, r) {},
    dad8: function(t, e, r) {
        "use strict";
        r("1cf6")
    },
    df39: function(t, e, r) {
        "use strict";
        r("3d78")
    },
    e81b: function(t, e, r) {
        "use strict";
        r("c6b1")
    },
    f23e: function(t, e, r) {
        "use strict";
        r.r(e);
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
            }, [t._l(t.serviceCards, (function(r) {
                return [t.isValidCardType(r) ? e("basic-card", {
                    key: r.id,
                    attrs: {
                        content: r
                    }
                }) : t._e(), "promo" != r.cardType || t.dismissed(r) ? t._e() : e("tutorial-card", {
                    key: r.id,
                    attrs: {
                        content: r
                    }
                }), "librariestype" == r.cardType ? e("library-card", {
                    key: r.id,
                    attrs: {
                        content: r
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
          , a = []
          , i = function() {
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
                }) : t._e(), t._l(t.cardProps.collapsableSections, (function(r) {
                    return [e("collapse-section", {
                        key: r.id,
                        staticClass: "margin-fix",
                        attrs: {
                            titleText: r.title,
                            expanded: !r.userSectionState.collapsed
                        },
                        on: {
                            toggled: function(e) {
                                return t.shrinkSection(e, r)
                            }
                        }
                    }, [e("vue-markdown", {
                        staticClass: "markdown",
                        attrs: {
                            source: r.collapsableSection,
                            anchorAttributes: {
                                target: "_blank"
                            }
                        }
                    })], 1)]
                }
                ))]
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
            }, [e("div", {
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
                    inCardId: t.cardProps.id,
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
          , n = []
          , o = (r("a481"),
        r("444c"))
          , c = r("ce5e")
          , l = r("b963")
          , u = r("9ce6")
          , d = r.n(u)
          , f = (r("b54a"),
        function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                staticClass: "notification"
            }, [t.notification ? e("div", [e("div", {
                staticClass: "top-text",
                attrs: {
                    tabindex: "0"
                }
            }, [e("h3", [t._v(t._s(t.notification.title))]), e("vue-markdown", {
                staticClass: "markdown",
                attrs: {
                    source: t.notification.description,
                    anchorAttributes: {
                        target: "_blank"
                    }
                }
            })], 1), e("div", {
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
            }) : t._e()])]) : t._e()])
        }
        )
          , p = []
          , h = {
            name: "CardNotification",
            props: {
                notification: null
            },
            components: {
                VueMarkdown: d.a
            },
            data: function() {
                return {
                    dismissed: !1
                }
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
                }
            }
        }
          , v = h
          , b = (r("f481"),
        r("2877"))
          , m = Object(b["a"])(v, f, p, !1, null, "7a6e4b3b", null)
          , _ = m.exports
          , C = (r("b047c"),
        r("b238"))
          , y = function() {
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
          , g = []
          , w = {
            name: "FavoriteButton",
            props: {
                favorited: {
                    default: !1,
                    required: !0
                }
            }
        }
          , k = w
          , S = (r("f3d0"),
        Object(b["a"])(k, y, g, !1, null, "062afdab", null))
          , T = S.exports
          , P = r("0c85")
          , $ = function() {
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
          , x = []
          , E = {
            name: "SettingsButton"
        }
          , O = E
          , N = (r("28ab"),
        Object(b["a"])(O, $, x, !1, null, "1c65b77e", null))
          , D = N.exports
          , R = {
            name: "BasicCard",
            components: {
                ActionNotice: o["a"],
                CollapseSection: c["a"],
                ToggleSwitch: l["a"],
                VueMarkdown: d.a,
                CardNotification: _,
                FeedbackForm: C["a"],
                FavoriteButton: T,
                SettingsButton: D,
                CollapseButton: P["a"]
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
                    randomHeight: "100px",
                    flipped: !1,
                    shrink: !1,
                    fav: null
                }
            },
            computed: {
                user: function() {
                    return this.$store.state.profile.user
                },
                maxItems: function() {
                    return this.cardProps.userSettings ? this.cardProps.userSettings.maxVisibleItems : 7
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
                            maxVisibleItems: 10
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
                            var r = t.replace("<NET_ID>", "".concat(e));
                            return r
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
                }
            }
        }
          , A = R
          , F = (r("aabb"),
        r("e81b"),
        Object(b["a"])(A, i, n, !1, null, "252a04f2", null))
          , I = F.exports
          , z = r("abad")
          , V = r("f344")
          , L = function() {
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
            }, [t._l(t.searchResults, (function(r) {
                return ["promo" != r.cardType && "librariestype" != r.cardType ? e("basic-card", {
                    key: r.id,
                    attrs: {
                        content: r
                    }
                }) : t._e(), "promo" == r.cardType ? e("tutorial-card", {
                    key: r.id,
                    attrs: {
                        content: r.notification
                    }
                }) : t._e(), "librariestype" == r.cardType ? e("library-card", {
                    key: r.id,
                    attrs: {
                        content: r
                    }
                }) : t._e()]
            }
            ))], 2)], 1) : t.notAuthorized ? e("h1", {
                staticClass: "no-cards"
            }, [t._v("YOU DO NOT HAVE PERMISSION TO VIEW THIS CARD.")]) : t.pendingSearch ? [e("load-animation")] : e("h1", {
                staticClass: "no-cards"
            }, [e("span", {
                staticClass: "big blue"
            }, [t._v("NO SEARCH RESULT(S) found for\n        "), e("span", {
                staticClass: "big blue"
            }, [t._v(' "' + t._s(this.$route.params.searchTermOrID) + '"')])]), e("p", {
                staticClass: "blue"
            }, [t._v(" You may be able to find what you're looking for at one of these links:")]), t._m(0)])], 2)
        }
          , B = [function() {
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
          , U = function() {
            var t = this
              , e = t._self._c;
            return e("basic-card", {
                attrs: {
                    content: t.content
                }
            }, [e("library-search-embed")], 1)
        }
          , Y = []
          , j = function() {
            var t = this
              , e = t._self._c;
            return e("div", {
                attrs: {
                    id: "primo_explore_search_embed_container_nyu"
                }
            })
        }
          , H = []
          , M = {
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
          , q = M
          , J = (r("df39"),
        Object(b["a"])(q, j, H, !1, null, null, null))
          , G = J.exports
          , W = {
            name: "LibraryCard",
            components: {
                BasicCard: I,
                LibrarySearchEmbed: G
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
          , K = W
          , Z = Object(b["a"])(K, U, Y, !1, null, null, null)
          , Q = Z.exports
          , X = {
            name: "SearchResults",
            components: {
                BasicCard: I,
                TutorialCard: z["a"],
                LibraryCard: Q,
                LoadAnimation: V["a"]
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
                pendingSearch: function() {
                    return this.$store.state.services.isSearchActive
                },
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
                      , r = this.$route.params.searchTermOrID;
                    "card" == e ? this.$store.dispatch("findCardSingle", r) : "search" == e && this.$store.dispatch("getSearchResults", r).then((function() {
                        t.$store.dispatch("setSearchForDisplay")
                    }
                    ))
                }
            }
        }
          , tt = X
          , et = (r("a111"),
        Object(b["a"])(tt, L, B, !1, null, "22b2f0a4", null))
          , rt = et.exports
          , st = function() {
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
          , at = [function() {
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
          , it = {
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
          , nt = it
          , ot = (r("dad8"),
        Object(b["a"])(nt, st, at, !1, null, "195996a3", null))
          , ct = ot.exports
          , lt = r("9bd9")
          , ut = {
            name: "service",
            components: {
                DraggableCustomize: lt["a"],
                BasicCard: I,
                TutorialCard: z["a"],
                LoadAnimation: V["a"],
                SearchResults: rt,
                LibraryCard: Q,
                HttpError: ct
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
                          , r = function() {
                            var t = new Date((new Date).setFullYear((new Date).getFullYear() + 1));
                            return t.toJSON()
                        }
                          , s = (new Date).toJSON()
                          , a = t.notification.beginDate ? t.notification.beginDate : e()
                          , i = t.notification.endDate ? t.notification.endDate : r()
                          , n = t.userSettings.notificationDismissed;
                        return !!n && (a < n && n < i || s > i)
                    }
                    return !1
                },
                isValidCardType: function(t) {
                    return "type1" == t.cardType || "njtransittype" == t.cardType || "emailtype" == t.cardType || "drivetype" == t.cardType || "calendartype" == t.cardType || "groupstype" == t.cardType
                }
            }
        }
          , dt = ut
          , ft = (r("a31e"),
        Object(b["a"])(dt, s, a, !1, null, "6fb4a2f0", null));
        e["default"] = ft.exports
    },
    f3d0: function(t, e, r) {
        "use strict";
        r("3253")
    },
    f481: function(t, e, r) {
        "use strict";
        r("9573")
    }
}]);
