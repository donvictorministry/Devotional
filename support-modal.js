/* support-modal.js - the "What you get" full-page modal on the unlock screen.
 *
 * STANDALONE: own CSS, HTML and JavaScript. If you delete this file, the pill button
 * on the unlock screen simply disappears and everything else keeps working.
 *
 * NO PAYMENT HERE. "Check out" only opens your four contact links (email, WhatsApp,
 * Facebook, phone) with a ready-made message. You receive the support yourself and
 * send the access code. The contact links come from book.js (META).
 */
(function () {
  'use strict';
  try {

    /* ============================================================
       EDIT EVERYTHING HERE. Plain words only. No code needed.
       ============================================================ */
    var CONFIG = {

      /* The rounded button at the top of the unlock screen */
      buttonLabel: 'Why get an access code?',

      /* The modal */
      title: 'What you get',
      intro: 'Access codes are for supporters of this ministry.',

      /* The features. icon names are in icons.js. featured = the big highlighted card. */
      features: [
        { icon: 'edit', title: 'Private Notepad', text: 'Write, lock with a PIN and share your notes.', featured: true, badge: 'Powerful' },
        { icon: 'book', title: 'Faith-building chapters' },
        { icon: 'todo', title: 'To-do list' },
        { icon: 'offline', title: 'Read offline' },
        { icon: 'moon', title: 'Dark mode and text size' }
      ],

      /* The support amount. Change both numbers to match today's exchange rate. */
      support: {
        label: 'Support amount',
        usd: '$10',
        usdName: 'US Dollar',
        ngn: '\u20A615,000',
        ngnName: 'Nigerian Naira',
        note: 'One-time support. Your access code is included.'
      },

      /* The Check out button and the contact box it opens */
      checkout: {
        button: 'Check out',
        boxTitle: 'Reach out to complete',
        boxText: 'Choose any link. We will send your access code once your support is received.',
        close: 'Close',
        /* {usd} and {ngn} are filled in from the amounts above */
        message: "Hello, I would like to support with {usd} ({ngn}) and get my access code for Don't Give Up."
      },

      /* Only used if book.js has no contacts */
      contactFallback: { email: '', phone: '', whatsapp: '', facebook: '' }
    };
    /* ================= END OF THE EDIT AREA ================= */


    var STYLE_ID = 'svm-style';
    var el = null, pushed = false;

    function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    function icon(name, size) {
      var p = (window.ICON || {})[name];
      return p ? '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="currentColor" aria-hidden="true"><path d="' + p + '"/></svg>' : '';
    }

    function css() {
      return [
        '.svm{--bg:#FFFFFF;--tx:#121212;--sur:#F8F9FA;--line:#E0E0E0;--mut:#5F6368;--ptx:#DF1E5A;--tonal:rgba(223,30,90,.12);',
        'position:fixed;inset:0;z-index:85;width:100dvw;height:100dvh;display:flex;flex-direction:column;overflow:hidden;background:var(--bg);color:var(--tx);',
        'font:19px/1.35 Roboto,Inter,system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-user-select:none;user-select:none;animation:svmin .28s cubic-bezier(.2,0,0,1)}',
        '.svm.svm-dark{--bg:#121212;--tx:#FFFFFF;--sur:#1E1E1E;--line:#333333;--mut:#B8BBC0;--ptx:#FF7BA3;--tonal:rgba(255,123,163,.16)}',
        '.svm *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}',
        '.svm button{font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer}',
        '.svm h2,.svm p,.svm ul{margin:0;padding:0}',
        '.svm svg{display:block;flex:none}',
        /* top bar */
        '.svm-bar{flex:none;display:flex;align-items:center;gap:6px;min-height:56px;padding:env(safe-area-inset-top,0px) 8px 0;border-bottom:1px solid var(--line)}',
        '.svm-back{width:48px;height:48px;border-radius:50%;display:grid;place-items:center;color:var(--tx)}',
        '.svm-back:active{background:var(--tonal)}',
        '.svm-bar h2{flex:1;font-size:22px;font-weight:700}',
        /* body: spreads out evenly so nothing is crowded, and never needs scrolling */
        '.svm-body{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:space-between;gap:clamp(8px,1.6dvh,16px);',
        'padding:clamp(10px,1.8dvh,18px) 20px calc(env(safe-area-inset-bottom,0px) + 24px);overflow-y:auto}',
        '.svm-intro{text-align:center;color:var(--mut)}',
        '.svm-feats{list-style:none;display:flex;flex-direction:column;gap:clamp(6px,1.1dvh,10px)}',
        '.svm-feat{display:flex;align-items:center;gap:12px;min-height:clamp(42px,6.2dvh,54px);padding:0 14px;border-radius:16px;background:var(--sur);border:1px solid var(--line);font-weight:600}',
        '.svm-feat .ic{color:var(--ptx);display:grid;place-items:center}',
        '.svm-feat.hero{align-items:flex-start;padding:12px 14px;border:0;color:#FFFFFF;background:linear-gradient(135deg,#E3205F 0%,#9C1042 100%);box-shadow:0 8px 22px rgba(179,18,74,.35)}',
        '.svm-feat.hero .ic{width:46px;height:46px;border-radius:14px;background:#FFFFFF;color:#B3124A;flex:none}',
        '.svm-feat.hero .t{font-weight:700;font-size:21px;line-height:1.2}',
        '.svm-feat.hero .d{font-weight:400;opacity:.95;line-height:1.3;margin-top:2px}',
        '.svm-badge{display:inline-block;margin-left:6px;padding:0 10px;border-radius:14px;background:#FFD54A;color:#3A2A00;font-size:19px;font-weight:700;line-height:1.5;vertical-align:middle}',
        /* price card */
        '.svm-price{text-align:center;border-radius:22px;border:1.5px solid #E9B93C;background:linear-gradient(180deg,var(--sur),var(--bg));padding:clamp(10px,1.8dvh,16px) 14px}',
        '.svm-price .lab{color:var(--mut);font-weight:600}',
        '.svm-amts{display:grid;grid-template-columns:1fr 1.5px 1fr;align-items:center;margin:6px 0 4px}',
        '.svm-amts i{display:block;width:1.5px;height:54px;background:var(--line)}',
        '.svm-amt b{display:block;font:700 clamp(30px,5dvh,38px)/1.1 Georgia,"Times New Roman",serif;color:var(--ptx)}',
        '.svm-amt span{display:block;color:var(--mut)}',
        '.svm-price .note{color:var(--mut)}',
        /* check out */
        '.svm-check{flex:none;display:flex;align-items:center;justify-content:center;gap:10px;height:56px;border-radius:28px;color:#FFFFFF;font-size:21px;font-weight:700;letter-spacing:.03em;',
        'background:linear-gradient(180deg,#F23E78 0%,#B3124A 55%,#7A0D38 100%);border:2px solid #E9B93C;box-shadow:inset 0 2px 0 rgba(255,255,255,.3),0 8px 22px rgba(122,13,56,.4)}',
        '.svm-check:active{transform:scale(.98);filter:brightness(.95)}',
        /* contact box */
        '.svm-pop{position:absolute;inset:0;z-index:5;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(0,0,0,.55)}',
        '.svm-card{width:100%;background:var(--bg);border-radius:28px;padding:26px 20px 20px;text-align:center;box-shadow:0 10px 36px rgba(0,0,0,.4)}',
        '.svm-card h2{font-size:24px;margin-bottom:8px}',
        '.svm-card p{color:var(--mut);line-height:1.5}',
        '.svm-cta{display:flex;justify-content:center;gap:18px;margin:22px 0 18px}',
        '.svm-cta a{width:60px;height:60px;border-radius:50%;display:grid;place-items:center;color:#FFFFFF;box-shadow:0 4px 14px rgba(0,0,0,.28)}',
        '.svm-cta .email{background:#8B0000}.svm-cta .whatsapp{background:#25D366}.svm-cta .facebook{background:#1877F2}.svm-cta .phone{background:#1A8A44}',
        '.svm-close{width:100%;height:52px;border-radius:26px;border:2px solid var(--ptx)!important;color:var(--ptx);font-weight:700}',
        '@keyframes svmin{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}',
        '@media (max-height:690px){.svm-intro{display:none}}',
        '@media (max-height:600px){.svm-feat.hero .d{display:none}.svm-price .note{display:none}}',
        '@media (prefers-reduced-motion:reduce){.svm{animation:none}}'
      ].join('');
    }

    function contacts() {
      var M = (window.Book && window.Book.meta) || {}, F = CONFIG.contactFallback;
      return { email: M.email || F.email, phone: M.phone || F.phone, whatsapp: M.whatsapp || F.whatsapp, facebook: M.facebook || F.facebook };
    }
    function message() {
      var S = CONFIG.support;
      return CONFIG.checkout.message.replace('{usd}', S.usd).replace('{ngn}', S.ngn);
    }

    function html() {
      var S = CONFIG.support;
      var list = CONFIG.features.map(function (f) {
        if (f.featured) {
          return '<li class="svm-feat hero"><span class="ic">' + icon(f.icon, 28) + '</span><div><div class="t">' + esc(f.title) +
            (f.badge ? ' <span class="svm-badge">' + esc(f.badge) + '</span>' : '') + '</div>' + (f.text ? '<div class="d">' + esc(f.text) + '</div>' : '') + '</div></li>';
        }
        return '<li class="svm-feat"><span class="ic">' + icon(f.icon, 24) + '</span><span>' + esc(f.title) + '</span></li>';
      }).join('');
      return '<div class="svm-bar"><button class="svm-back" type="button" aria-label="Back to unlock screen">' + icon('back', 24) + '</button><h2>' + esc(CONFIG.title) + '</h2></div>' +
        '<div class="svm-body"><p class="svm-intro">' + esc(CONFIG.intro) + '</p><ul class="svm-feats">' + list + '</ul>' +
        '<section class="svm-price" aria-label="' + esc(S.label) + '"><div class="lab">' + esc(S.label) + '</div>' +
        '<div class="svm-amts"><div class="svm-amt"><b>' + esc(S.usd) + '</b><span>' + esc(S.usdName) + '</span></div><i></i><div class="svm-amt"><b>' + esc(S.ngn) + '</b><span>' + esc(S.ngnName) + '</span></div></div>' +
        '<div class="note">' + esc(S.note) + '</div></section>' +
        '<button class="svm-check" type="button">' + icon('check', 26) + '<span>' + esc(CONFIG.checkout.button) + '</span></button></div>';
    }

    function popHtml() {
      var C = contacts(), msg = message(), digits = String(C.whatsapp || '').replace(/[^0-9]/g, '');
      var mail = 'mailto:' + C.email + '?subject=' + encodeURIComponent('Support and access code') + '&body=' + encodeURIComponent(msg);
      var wa = 'https://wa.me/' + digits + '?text=' + encodeURIComponent(msg);
      return '<div class="svm-pop"><div class="svm-card" role="dialog" aria-modal="true"><h2>' + esc(CONFIG.checkout.boxTitle) + '</h2><p>' + esc(CONFIG.checkout.boxText) + '</p>' +
        '<div class="svm-cta"><a class="email" href="' + esc(mail) + '" aria-label="Email us">' + icon('mail', 30) + '</a>' +
        '<a class="whatsapp" href="' + esc(wa) + '" target="_blank" rel="noopener" aria-label="WhatsApp us">' + icon('whatsapp', 30) + '</a>' +
        '<a class="facebook" href="' + esc(C.facebook) + '" target="_blank" rel="noopener" aria-label="Facebook">' + icon('facebook', 30) + '</a>' +
        '<a class="phone" href="tel:' + esc(C.phone) + '" aria-label="Call us">' + icon('phone', 30) + '</a></div>' +
        '<button class="svm-close" type="button">' + esc(CONFIG.checkout.close) + '</button></div></div>';
    }

    function open() {
      if (el) { return; }
      if (!document.getElementById(STYLE_ID)) {
        var st = document.createElement('style');
        st.id = STYLE_ID; st.textContent = css();
        document.head.appendChild(st);
      }
      var root = document.documentElement, theme = root.getAttribute('data-theme');
      var dark = theme ? theme === 'dark' : !!(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
      el = document.createElement('div');
      el.className = 'svm' + (dark ? ' svm-dark' : '');
      el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', CONFIG.title);
      el.innerHTML = html();
      document.body.appendChild(el);
      try { history.pushState({ svm: 1 }, ''); pushed = true; } catch (e) { pushed = false; }
      el.querySelector('.svm-back').addEventListener('click', function () { close(false); });
      el.querySelector('.svm-check').addEventListener('click', function () {
        var pop = document.createElement('div');
        pop.innerHTML = popHtml();
        el.appendChild(pop.firstChild);
        el.querySelector('.svm-close').addEventListener('click', function () { var p = el.querySelector('.svm-pop'); if (p) { p.remove(); } });
      });
    }

    function close(fromPop) {
      if (!el) { return; }
      el.remove(); el = null;
      if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) { /* ignore */ } }
      pushed = false;
    }
    window.addEventListener('popstate', function () { if (el) { pushed = false; close(true); } });

    window.SupportModal = { version: '1.0.0', config: CONFIG, open: open, close: close };
  } catch (err) {
    /* If this file has a mistake, the pill button simply does not appear. */
  }
})();
