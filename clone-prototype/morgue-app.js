/**
 * KYAMCH Hospital Information System — Morgue Module (Standalone Clone)
 * Clean controller, client-side router, authentication (admin / admin123),
 * and full route dispatcher for all Morgue module screens.
 */
(function () {
  "use strict";

  const MESSAGES = {"HomePage": {"title": "Hello!", "content": "Welcome to our website"}, "Home": {"hero": {"eyebrowLine1": "Introducing the Essence", "eyebrowLine2": "A Collection for Him & Her", "titleTop": "Beyond", "titleBottom": "the Note.", "subtitle": "Discover a world of profound scent.", "rated": "4.8/5 Rated", "lovedBy": "Loved by Thousands", "cta": "Explore All Products"}, "promoBannerAlt": "THP Promotion", "categories": {"title": "Shop by Categories", "explore": "Explore", "empty": "No categories available."}, "promo": {"limitedOffer": "Limited Offer", "bestSeller": "Best Seller", "productTitle": "Medicine Product", "subtitle": "Home Medical Supplies", "buyNow": "Buy Now"}, "combo": {"title": "Combo Product", "empty": "No combo products yet."}, "featured": {"title": "Featured Product"}, "best": {"title": "Best Product"}, "section": {"viewAll": "View All", "empty": "No products to show yet."}, "blogs": {"eyebrow": "INSIGHTS FOR BETTER HEALTH", "titleTop": "We deliver trusted", "titleBottom": "medical solutions daily", "comments": "{count} comments", "noComments": "No Comments"}, "feedback": {"eyebrow": "CUSTOMER FEEDBACK", "title": "What People Are Saying"}, "carousel": {"pharmacy": "Pharmacy", "relief": "Relief", "expertise": "Expertise", "care": "Care", "health": "Health", "support": "Support", "wellness": "Wellness"}}, "Search": {"title": "Search Products", "placeholder": "Search by name, sku or slug...", "button": "Search", "loading": "Searching...", "noResults": "No products found for \"{query}\"", "viewAll": "View all results for \"{query}\"", "recent": "Recent searches", "clear": "Clear", "comboBadge": "COMBO"}, "SignUpPage": {"title": "Sign Up"}, "Auth": {"signInTitle": "Welcome back", "signInSubtitle": "Sign in to your KYAMCH Hospital Information System workspace.", "forgotPassword": "Forgot Password?", "noAccount": "Don't have an account?", "signUpLink": "Sign Up", "signInGoogle": "Continue with Google", "signInButton": "Sign In", "signUpTitle": "Sign Up", "signUpSubtitle": "Join to enjoy faster checkout, order tracking & recommendations", "name": "Name", "namePlaceholder": "Enter your name", "username": "Username", "usernamePlaceholder": "Enter your username", "email": "Email", "emailPlaceholder": "Enter your email", "phone": "Phone Number", "phonePlaceholder": "Enter your phone number", "password": "Password", "passwordPlaceholder": "Enter password", "confirmPassword": "Confirm Password", "confirmPasswordPlaceholder": "Enter confirm password", "nextButton": "Next", "orContinueWith": "or continue with", "signUpGoogle": "Google", "syncing": "Syncing...", "alreadyHaveAccount": "Already have an account?", "signInLink": "Sign In", "signInHelp": "Need access? Contact your department admin or the IT Help Desk.", "capsLockOn": "Caps Lock is on"}, "UnderDevelopment": {"title": "Under Development", "subtitle": "We're working hard to bring you an amazing new health feature. This section is currently under construction.", "progressTitle": "Development Progress", "overall": "Overall Completion", "comingSoon": "Coming in 2 weeks", "expectedTitle": "Expected Completion", "expectedDesc": "We're working diligently to complete this feature soon.", "waitTitle": "Why the Wait?", "waitDesc": "We're ensuring everything is perfect before launch. Quality takes time!", "returnHome": "Return to Home", "contactSupport": "Contact Support", "exploreMore": "In the meantime, you can explore other sections of our platform."}, "UnderDevModals": {"underDevTitle": "Feature Under Development", "underDevSubtitle": "We're currently perfecting this section to ensure you have the best experience possible.", "progressLabel": "Current Progress", "estimatedTime": "Estimated Launch", "comingSoon": "Coming Soon", "close": "Got it, thanks!", "notifyMe": "Notify Me"}, "Navbar": {"Home": "Home", "Product": "Product", "Blog": "Blog", "Contact": "Contact", "login": "Login", "searchTitle": "Search Products", "searchPlaceholder": "Search..."}, "Footer": {"description": "Explore trusted medicines, health products, and everyday wellness tools crafted to make managing your health easier, safer, and more convenient.", "quickLinks": "QUICK LINKS", "support": "SUPPORT", "help": "HELP", "product": "Product", "blog": "Blog", "beautyAntiAging": "Beauty & Anti-Aging", "basicHealthImmunity": "Basic Health & Immunity", "targetedHealth": "Targeted Health", "deliveryPolicy": "Delivery Policy", "termsConditions": "Terms & Conditions", "privacyPolicy": "Privacy Policy", "cancellationPolicy": "Cancellation Policy", "returnPolicy": "Return Policy", "faq": "FAQ", "contactUs": "Contact Us", "termsOfUse": "Terms of Uses", "copyright": "© {year} Copyright By Essence Lab"}, "ContactPage": {"pageTitle": "Contact", "sectionTitle": "Contact us & our team", "desc1": "We'd love to hear from you! Whether you have a question about your order, need help choosing the right product, or want to share feedback — the Essence Lab team is here to help.", "desc2": "Have something specific in mind? Use the contact form below and we'll get back to you within 24–48 hours.", "hotline": "Hotline Number : +66-2-726-6341", "phone": "+66-2-726-6341", "email": "info@example.com", "nameLabel": "Name", "namePlaceholder": "Enter Your Name", "phoneLabel": "Phone", "phonePlaceholder": "Enter Your Phone Number", "emailLabel": "Email", "emailPlaceholder": "Enter Your Email", "messageLabel": "Message", "messagePlaceholder": "Enter Your Message", "sendButton": "Send Message"}};

  // ---------------------------------------------------------------------------
  // 1. Default Admin JWT Session Helper
  // ---------------------------------------------------------------------------
  function base64UrlEncode(str) {
    return btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  function createAdminToken() {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: "none", typ: "JWT" };
    const payload = {
      sub: "admin",
      id: 1,
      name: "Admin User",
      roleAccess: "ROLE_SUPER_ADMIN",
      authorities: ["ROLE_SUPER_ADMIN"],
      iat: now,
      exp: now + 604800,
    };
    return `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}.mock`;
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\/+^])/g, "\\$1") + "=([^;]*)"));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function setCookie(name, value, maxAgeSeconds) {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
  }

  function removeCookie(name) {
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
  }

  // Automatically sign in as admin unless the user explicitly clicked Logout or is on /signin
  if (!getCookie("accessToken") && sessionStorage.getItem("kyamch_logged_out") !== "1" && !window.location.pathname.endsWith("/signin")) {
    setCookie("accessToken", createAdminToken(), 604800);
  }

  // ---------------------------------------------------------------------------
  // 2. Reactive Client-Side Router (window.__KYAMCH_NAV)
  // ---------------------------------------------------------------------------
  const listeners = new Set();

  function normalizeHref(rawHref) {
    if (!rawHref) return "/en/morgue";
    let href = String(rawHref);
    if (href.startsWith("http://") || href.startsWith("https://")) {
      try {
        const u = new URL(href);
        href = u.pathname + u.search + u.hash;
      } catch {
        return href;
      }
    }
    if (!href.startsWith("/")) href = "/" + href;
    if (href === "/" || href === "/en" || href === "/en/") return "/en/morgue";
    if (href === "/modules-list" || href === "/en/modules-list") return "/en/morgue";
    if (!href.startsWith("/en/") && href !== "/en") {
      href = "/en" + href;
    }
    return href;
  }

  // Normalize initial browser URL if needed
  const initialNormalized = normalizeHref(window.location.pathname + window.location.search + window.location.hash);
  if (window.location.pathname + window.location.search + window.location.hash !== initialNormalized) {
    window.history.replaceState(null, "", initialNormalized);
  }

  function notify() {
    listeners.forEach((fn) => {
      try {
        fn();
      } catch (err) {
        console.error("[KYAMCH_NAV listener error]", err);
      }
    });
  }

  window.addEventListener("popstate", notify);

  window.__KYAMCH_NAV = {
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    notify,
    normalizeHref,
    getSnapshot() {
      return window.location.pathname + window.location.search;
    },
    getPathname() {
      return window.location.pathname;
    },
    getUnprefixedPathname() {
      const p = window.location.pathname;
      if (p === "/en" || p === "/en/") return "/";
      if (p.startsWith("/en/")) return p.slice(3);
      return p;
    },
    push(rawHref, opts) {
      const target = normalizeHref(rawHref);
      const prevPath = window.location.pathname;
      window.history.pushState(null, "", target);
      if (opts?.scroll !== false && window.location.pathname !== prevPath) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      notify();
    },
    replace(rawHref, opts) {
      const target = normalizeHref(rawHref);
      const prevPath = window.location.pathname;
      window.history.replaceState(null, "", target);
      if (opts?.scroll !== false && window.location.pathname !== prevPath) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      notify();
    },
  };

  // ---------------------------------------------------------------------------
  // 3. Turbopack Module Overrides
  // ---------------------------------------------------------------------------
  const TP = globalThis.__TP;
  if (!TP) {
    console.error("Turbopack runtime (__TP) not found!");
    return;
  }

  // 3a. Force 100% Mock Mode for all services (morgue, auth, user, core, hr, opd, billing)
  TP.overrideModule(845484, (e) => {
    "use strict";
    e.s(["mockFor", 0, () => true], 845484);
  });

  // 3b. Client-side Cookie Token Actions (replacing Next.js Server References)
  TP.overrideModule(124097, (e) => {
    "use strict";
    e.s([
      "accessTokenDelete",
      0,
      async () => {
        removeCookie("accessToken");
        sessionStorage.setItem("kyamch_logged_out", "1");
        notify();
      },
    ], 124097);
  });

  TP.overrideModule(81216, (e) => {
    "use strict";
    e.s(["getRefreshToken", 0, async () => getCookie("refreshToken")], 81216);
  });

  TP.overrideModule(303791, (e) => {
    "use strict";
    e.s([
      "refreshDelete",
      0,
      async () => {
        removeCookie("refreshToken");
      },
    ], 303791);
  });

  TP.overrideModule(807475, (e) => {
    "use strict";
    e.s([
      "accessTokenCreate",
      0,
      async (token) => {
        sessionStorage.removeItem("kyamch_logged_out");
        setCookie("accessToken", token, 604800);
        notify();
      },
    ], 807475);
  });

  TP.overrideModule(402557, (e) => {
    "use strict";
    e.s([
      "refreshCreate",
      0,
      async (token) => {
        setCookie("refreshToken", token, 604800);
      },
    ], 402557);
  });

  // 3c. Reactive useUser hook (684112)
  TP.overrideModule(684112, (e) => {
    "use strict";
    const React = e.i(271645);
    const jwtMod = e.i(373315);
    const roleMod = e.i(87219);
    e.s([
      "useUser",
      0,
      function useUser() {
        React.useSyncExternalStore(
          window.__KYAMCH_NAV.subscribe,
          () => getCookie("accessToken") || "",
          () => ""
        );
        const token = getCookie("accessToken");
        const decoded = token ? jwtMod.getDecodedToken(token) : null;
        const role = roleMod.normalizeRole(decoded?.roleAccess ?? decoded?.authorities) || "SUPER_ADMIN";
        return {
          currentUser: decoded,
          userId: decoded?.id ?? 1,
          role,
          name: decoded?.sub ?? "admin",
          isAdmin: true,
          isCustomer: false,
          isAuthenticated: !!decoded,
        };
      },
    ], 684112);
  });

  // 3d. Always grant Morgue module access in useMyModules (242708)
  const morgueSlugs = new Set(["morgue"]);
  TP.overrideModule(242708, (e) => {
    "use strict";
    e.s([
      "useMyModules",
      0,
      function useMyModules() {
        return {
          allowedSlugs: morgueSlugs,
          allowedRoutes: null,
          isUndetermined: false,
          isLoading: false,
          isAdmin: true,
        };
      },
    ], 242708);
  });

  // 3e. Override next/navigation (976562)
  TP.overrideModule(976562, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: true });
    const React = e.r(271645);
    const s = e.r(261994);
    const c = e.r(13957);
    const l = e.r(292838);
    const d = e.r(592805);

    function usePathname() {
      React.useSyncExternalStore(
        window.__KYAMCH_NAV.subscribe,
        window.__KYAMCH_NAV.getSnapshot,
        window.__KYAMCH_NAV.getSnapshot
      );
      return window.__KYAMCH_NAV.getPathname();
    }

    function useSearchParams() {
      const snap = React.useSyncExternalStore(
        window.__KYAMCH_NAV.subscribe,
        window.__KYAMCH_NAV.getSnapshot,
        window.__KYAMCH_NAV.getSnapshot
      );
      return React.useMemo(() => {
        const qIdx = snap.indexOf("?");
        const search = qIdx >= 0 ? snap.slice(qIdx) : "";
        const sp = new URLSearchParams(search);
        return s?.ReadonlyURLSearchParams ? new s.ReadonlyURLSearchParams(sp) : sp;
      }, [snap]);
    }

    function useRouter() {
      return React.useMemo(
        () => ({
          push: (href, opts) => window.__KYAMCH_NAV.push(href, opts),
          replace: (href, opts) => window.__KYAMCH_NAV.replace(href, opts),
          refresh: () => window.__KYAMCH_NAV.notify(),
          back: () => window.history.back(),
          forward: () => window.history.forward(),
          prefetch: () => Promise.resolve(),
        }),
        []
      );
    }

    function useParams() {
      React.useSyncExternalStore(
        window.__KYAMCH_NAV.subscribe,
        window.__KYAMCH_NAV.getSnapshot,
        window.__KYAMCH_NAV.getSnapshot
      );
      return { locale: "en" };
    }

    const exportsObj = {
      ReadonlyURLSearchParams: s?.ReadonlyURLSearchParams || URLSearchParams,
      RedirectType: d?.RedirectType,
      ServerInsertedHTMLContext: c?.ServerInsertedHTMLContext,
      forbidden: d?.forbidden,
      notFound: d?.notFound,
      permanentRedirect: (url) => window.__KYAMCH_NAV.replace(url),
      redirect: (url) => window.__KYAMCH_NAV.replace(url),
      unauthorized: d?.unauthorized,
      unstable_isUnrecognizedActionError: l?.unstable_isUnrecognizedActionError,
      unstable_rethrow: d?.unstable_rethrow,
      useParams,
      usePathname,
      useRouter,
      useSearchParams,
      useSelectedLayoutSegment: () => null,
      useSelectedLayoutSegments: () => [],
      useServerInsertedHTML: c?.useServerInsertedHTML || (() => {}),
    };
    Object.assign(r, exportsObj);
    r.default = r;
    t.exports = r;
  });

  // 3f. Override next-intl Link (77105) and next/link (522016)
  function createClientLink(jsxRuntime, React) {
    return React.forwardRef(function ClientLink(props, ref) {
      const {
        href,
        as,
        locale,
        localeCookie,
        prefetch,
        replace,
        scroll,
        shallow,
        passHref,
        legacyBehavior,
        onNavigate,
        transitionTypes,
        unstable_dynamicOnHover,
        onClick,
        children,
        ...rest
      } = props;

      const rawTarget = as || href;
      const resolvedHref =
        typeof rawTarget === "object" && rawTarget !== null
          ? (rawTarget.pathname || "/") + (rawTarget.search || "")
          : String(rawTarget || "/");

      const finalHref = window.__KYAMCH_NAV.normalizeHref(resolvedHref);

      const handleClick = (ev) => {
        if (onClick) onClick(ev);
        if (
          !ev.defaultPrevented &&
          ev.button === 0 &&
          !ev.metaKey &&
          !ev.ctrlKey &&
          !ev.shiftKey &&
          !ev.altKey &&
          (!rest.target || rest.target === "_self")
        ) {
          ev.preventDefault();
          if (replace) {
            window.__KYAMCH_NAV.replace(finalHref, { scroll });
          } else {
            window.__KYAMCH_NAV.push(finalHref, { scroll });
          }
        }
      };

      return jsxRuntime.jsx("a", {
        ref,
        href: finalHref,
        onClick: handleClick,
        ...rest,
        children,
      });
    });
  }

  TP.overrideModule(77105, (e) => {
    "use strict";
    const jsxRuntime = e.i(843476);
    const React = e.i(271645);
    const ClientLink = createClientLink(jsxRuntime, React);
    e.s(["default", 0, ClientLink], 77105);
  });

  TP.overrideModule(522016, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: true });
    const jsxRuntime = e.r(843476);
    const React = e.r(271645);
    const ClientLink = createClientLink(jsxRuntime, React);
    r.default = ClientLink;
    r.useLinkStatus = () => ({ pending: false });
    t.exports = r;
  });

  // ---------------------------------------------------------------------------
  // 4. Mount Application & Route Dispatcher
  // ---------------------------------------------------------------------------
  const jsxRuntime = TP.importModule(843476);
  const React = TP.importModule(271645);
  const ReactDOMClient = TP.requireModule(88014);

  const QueryProvider = TP.importModule(965018).default;
  const PermissionsPrefetcher = TP.importModule(888106).default;
  const IntlProvider = TP.importModule(175696).default;
  const TooltipProvider = TP.importModule(746798).TooltipProvider;
  const ToastContainer = TP.importModule(170319).ToastContainer;

  const DashboardLayout = TP.importModule(317823).default;
  const ThemeToggle = TP.importModule(22530).default;
  const SignInForm = TP.importModule(551426).default;

  // Morgue Page & Record Modules
  const OverviewPage = TP.importModule(735381).default;
  const ScanPage = TP.importModule(349792).default;
  const SectionPage = TP.importModule(147722).default;
  const BodyProfile = TP.importModule(11715).default;
  const PacketProfile = TP.importModule(497568).default;
  const ClearanceRecord = TP.importModule(823531).ClearanceRecord;
  const ExcursionRecord = TP.importModule(89116).ExcursionRecord;
  const ColdUnitMod = TP.importModule(726981);
  const BelongingsUnitMod = TP.importModule(381773);
  const IntakeEditor = TP.importModule(149174).default;
  const CheckEditor = TP.importModule(149578).default;
  const ReleaseEditor = TP.importModule(747609).default;
  const StatusEditor = TP.importModule(466144).StatusEditor;
  const TempConfigEditor = TP.importModule(105935).TempConfigEditor;
  const AuthRuleEditor = TP.importModule(280635).AuthRuleEditor;

  const DEFAULT_SECTION_TABS = {
    intake: "ipd",
    bodies: "register",
    storage: "board",
    belongings: "packets",
    checks: "register",
    billing: "clearances",
    release: "desk",
    monitoring: "live",
    setup: "cold-storage",
    reports: "r1",
  };

  const SECTION_TITLES = {
    intake: "Intake",
    bodies: "Bodies",
    storage: "Cold Storage",
    belongings: "Belongings",
    checks: "Condition Checks",
    billing: "Billing",
    release: "Release",
    monitoring: "Temperature",
    scan: "Scan",
    reports: "Reports",
    setup: "Morgue Setup",
  };

  function numOrNull(v) {
    if (v === null || v === undefined || v === "" || v === "new") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  function SignInLayout() {
    const h = jsxRuntime.jsx;
    const hs = jsxRuntime.jsxs;
    return hs("div", {
      className: "relative h-dvh overflow-hidden bg-background text-foreground",
      children: [
        h("div", {
          className: "absolute top-4 right-4 z-30",
          children: h(ThemeToggle, {}),
        }),
        hs("div", {
          className: "grid h-full lg:grid-cols-2",
          children: [
            hs("aside", {
              className: "relative isolate hidden overflow-hidden bg-(--forest-900) p-10 text-white lg:flex lg:flex-col xl:p-12",
              children: [
                h("img", {
                  src: "/images/hospital/ward.jpg",
                  alt: "KYAMCH Hospital Campus",
                  className: "animate-drift absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]",
                }),
                h("div", {
                  "aria-hidden": true,
                  className: "absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,40,20,0.72)_0%,rgba(10,40,20,0.35)_28%,rgba(10,40,20,0.55)_50%,rgba(10,40,20,0.94)_74%,#0a2814_100%)]",
                }),
                h("div", {
                  children: hs("span", {
                    className: "flex flex-col items-start gap-1.5",
                    children: [
                      h("img", {
                        src: "/images/logo/kyamch-logo-dark.png",
                        alt: "KYAMCH",
                        className: "w-auto h-8",
                        draggable: false,
                      }),
                      h("span", {
                        className: "pl-0.5 font-medium uppercase tracking-[0.18em] text-[11px] text-white/75",
                        children: "Hospital Information System — Morgue Module",
                      }),
                    ],
                  }),
                }),
                hs("div", {
                  className: "mt-auto",
                  children: [
                    h("h2", {
                      className: "max-w-md font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-balance xl:text-4xl",
                      children: "Morgue Custody, Cold Storage & Release Management.",
                    }),
                    h("p", {
                      className: "mt-4 max-w-md leading-relaxed text-white/80",
                      children: "Bodies in custody, chamber temperatures, belongings, condition checks, billing clearances, and controlled releases.",
                    }),
                    hs("div", {
                      className: "mt-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-sm",
                      children: [
                        hs("div", {
                          children: [
                            h("p", {
                              className: "font-medium text-white/90",
                              children: "Khwaja Yunus Ali Medical College & Hospital",
                            }),
                            h("p", {
                              className: "mt-0.5 text-white/65",
                              children: "Enayetpur, Sirajganj, since 17 May 2004",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            hs("main", {
              className: "relative flex items-center justify-center overflow-hidden bg-linear-to-br from-(--charcoal-100) via-(--charcoal-50) to-white px-4 py-6 sm:px-6 sm:py-8 dark:from-[#0e120f] dark:via-background dark:to-[#161b17]",
              children: [
                h("div", {
                  className: "grid-pattern pointer-events-none absolute inset-0 opacity-60 mask-[radial-gradient(75%_65%_at_50%_42%,#000,transparent)]",
                }),
                h("div", {
                  className: "pointer-events-none absolute -top-24 -right-12 h-72 w-72 rounded-full bg-primary/10 blur-3xl",
                }),
                h("div", {
                  className: "pointer-events-none absolute -bottom-28 -left-12 h-80 w-80 rounded-full bg-pulse/10 blur-3xl",
                }),
                hs("div", {
                  className: "relative z-10 w-full max-w-md",
                  children: [
                    hs("div", {
                      className: "theme-light relative overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-[0_30px_80px_-32px_rgba(12,40,24,0.5)] ring-1 ring-black/[0.06] sm:p-9",
                      children: [
                        h("div", {
                          className: "absolute inset-x-0 top-0 h-1 bg-linear-to-r from-(--forest-600) via-(--pulse-500) to-(--forest-600)",
                        }),
                        h(SignInForm, {}),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  }

  function resolveMorguePage(pathname, searchParams) {
    const h = jsxRuntime.jsx;

    // 1. Overview
    if (pathname === "/" || pathname === "/morgue" || pathname === "/morgue/") {
      document.title = "Morgue · KYAMCH";
      return h(OverviewPage, {});
    }

    // 2. Scan
    if (pathname === "/morgue/scan") {
      document.title = "Scan · Morgue · KYAMCH";
      return h(ScanPage, {});
    }

    // 3. Profiles
    let m = pathname.match(/^\/morgue\/bodies\/profile\/([^/]+)$/);
    if (m) {
      document.title = "Body Record · Morgue · KYAMCH";
      return h(BodyProfile, { bodyId: Number(m[1]) });
    }

    m = pathname.match(/^\/morgue\/belongings\/profile\/([^/]+)$/);
    if (m) {
      document.title = "Belongings Packet · Morgue · KYAMCH";
      return h(PacketProfile, { packetId: Number(m[1]) });
    }

    m = pathname.match(/^\/morgue\/billing\/profile\/([^/]+)$/);
    if (m) {
      document.title = "Billing Clearance · Morgue · KYAMCH";
      return h(ClearanceRecord, { clearanceId: Number(m[1]) });
    }

    m = pathname.match(/^\/morgue\/monitoring\/profile\/([^/]+)$/);
    if (m) {
      document.title = "Temperature Excursion · Morgue · KYAMCH";
      return h(ExcursionRecord, { excursionId: Number(m[1]) });
    }

    m = pathname.match(/^\/morgue\/setup\/profile\/([^/]+)$/);
    if (m) {
      const unitId = Number(m[1]);
      if (searchParams.get("kind") === "belongings-unit") {
        document.title = "Belongings Unit · Morgue · KYAMCH";
        return h(BelongingsUnitMod.BelongingsUnitRecord, { unitId });
      }
      document.title = "Cold Storage Unit · Morgue · KYAMCH";
      return h(ColdUnitMod.ColdUnitRecord, { unitId });
    }

    // 4. Editors
    m = pathname.match(/^\/morgue\/intake\/(ipd|emergency)\/editor\/([^/]+)$/);
    if (m) {
      document.title = "Receive Body · Morgue · KYAMCH";
      return h(IntakeEditor, {
        route: m[1],
        admissionId: numOrNull(searchParams.get("admission")),
        kind: searchParams.get("kind") || null,
      });
    }

    m = pathname.match(/^\/morgue\/checks\/register\/editor\/([^/]+)$/);
    if (m) {
      document.title = "Condition Check · Morgue · KYAMCH";
      return h(CheckEditor, {
        checkId: numOrNull(m[1]),
        bodyId: numOrNull(searchParams.get("body")),
        relocationId: numOrNull(searchParams.get("relocation")),
        excursionId: numOrNull(searchParams.get("excursion")),
      });
    }

    m = pathname.match(/^\/morgue\/release\/desk\/editor\/([^/]+)$/);
    if (m) {
      document.title = "Release Body · Morgue · KYAMCH";
      return h(ReleaseEditor, {
        bodyId: numOrNull(searchParams.get("body")),
        route: searchParams.get("route") || null,
      });
    }

    m = pathname.match(/^\/morgue\/setup\/cold-storage\/editor\/([^/]+)$/);
    if (m) {
      document.title = "Cold Storage Unit Editor · Morgue · KYAMCH";
      return h(ColdUnitMod.ColdUnitEditor, { unitId: numOrNull(m[1]) });
    }

    m = pathname.match(/^\/morgue\/setup\/belongings-storage\/editor\/([^/]+)$/);
    if (m) {
      document.title = "Belongings Storage Editor · Morgue · KYAMCH";
      return h(BelongingsUnitMod.BelongingsUnitEditor, { unitId: numOrNull(m[1]) });
    }

    m = pathname.match(/^\/morgue\/setup\/body-statuses\/editor\/([^/]+)$/);
    if (m) {
      document.title = "Body Status Editor · Morgue · KYAMCH";
      return h(StatusEditor, { statusId: numOrNull(m[1]) });
    }

    m = pathname.match(/^\/morgue\/setup\/temperature\/editor\/([^/]+)$/);
    if (m) {
      document.title = "Temperature Alarm Editor · Morgue · KYAMCH";
      return h(TempConfigEditor, {
        unitId: numOrNull(m[1]) ?? numOrNull(searchParams.get("unit")),
      });
    }

    m = pathname.match(/^\/morgue\/setup\/authorisation\/editor\/([^/]+)$/);
    if (m) {
      document.title = "Authority Rule Editor · Morgue · KYAMCH";
      return h(AuthRuleEditor, { ruleId: numOrNull(m[1]) });
    }

    // 5. Section + Tab pages (/morgue/:section or /morgue/:section/:tab)
    m = pathname.match(/^\/morgue\/([a-z-]+)(?:\/([a-z0-9-]+))?$/);
    if (m && m[1] in DEFAULT_SECTION_TABS) {
      const section = m[1];
      const tab = m[2] || searchParams.get("tab") || DEFAULT_SECTION_TABS[section];
      document.title = `${SECTION_TITLES[section] || "Morgue"} · Morgue · KYAMCH`;
      return h(SectionPage, { section, tab });
    }

    // Fallback to Overview
    document.title = "Morgue · KYAMCH";
    return h(OverviewPage, {});
  }

  function MorgueRootRouter() {
    const snap = React.useSyncExternalStore(
      window.__KYAMCH_NAV.subscribe,
      window.__KYAMCH_NAV.getSnapshot,
      window.__KYAMCH_NAV.getSnapshot
    );
    const unprefixed = window.__KYAMCH_NAV.getUnprefixedPathname();
    const searchParams = React.useMemo(() => {
      const qIdx = snap.indexOf("?");
      return new URLSearchParams(qIdx >= 0 ? snap.slice(qIdx) : "");
    }, [snap]);

    if (unprefixed === "/signin") {
      document.title = "Sign In · Morgue · KYAMCH";
      return jsxRuntime.jsx(SignInLayout, {});
    }

    const pageEl = resolveMorguePage(unprefixed, searchParams);
    return jsxRuntime.jsx(DashboardLayout, { children: pageEl });
  }

  function App() {
    const h = jsxRuntime.jsx;
    const hs = jsxRuntime.jsxs;
    return hs(React.Fragment, {
      children: [
        hs(QueryProvider, {
          children: [
            h(PermissionsPrefetcher, {}),
            h(IntlProvider, {
              locale: "en",
              timeZone: "UTC",
              messages: MESSAGES,
              children: h(TooltipProvider, {
                delayDuration: 150,
                children: h(MorgueRootRouter, {}),
              }),
            }),
          ],
        }),
        h(ToastContainer, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          newestOnTop: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "light",
        }),
      ],
    });
  }

  const rootEl = document.getElementById("morgue-root");
  if (rootEl) {
    const root = ReactDOMClient.createRoot(rootEl);
    root.render(jsxRuntime.jsx(App, {}));
  }
})();
