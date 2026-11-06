/* cover-page.js - the cover (welcome) page of "Don't Give Up!"
 *
 * STANDALONE: this file carries its own CSS, HTML and JavaScript.
 * The book works without it. If you delete or edit this file, the app simply
 * skips the cover and opens the access-code screen. Nothing else is affected.
 *
 * Contract with the app (the only link between them):
 *     window.CoverPage.render(containerElement, onBegin)
 * It also fires a "coverpage:begin" event on the container when "Read Online"
 * or "Read Offline" is tapped.
 */
(function () {
  'use strict';
  try {
    /* ---------- edit the words and colours here ---------- */
    var TEXT = {
      line1: "Don\u2019t",
      line2: 'Give Up',
      subtitle1: 'Faith, Hope and',
      subtitle2: 'Endurance in Christ',
      spine: "Don\u2019t Give Up",
      footer: 'A FAITH-BASED DEVOTIONAL',
      name: 'Rev. Dr. Chris Johnson, PhD',
      tag1: 'Unlock it with your access code',
      tag2: 'and read online or offline.',
      button: 'BEGIN JOURNEY',
      online: 'Read Online',
      offline: 'Read Offline'
    };
    var C = {
      brand: '#DF1E5A', brandDark: '#B3124A', brandDeep: '#7A0D38', plum: '#3A0A1F',
      ink: '#1A1325', gold: '#FFD54A', goldPale: '#FFF3C4', blush: '#FFE9F1',
      pink1: '#FFC9DA', pink2: '#F7A0BE', rock: '#24101A'
    };
    /* ----------------------------------------------------- */

    var STYLE_ID = 'cvp-style';
    var FONT = '"Montserrat","Poppins",Inter,Roboto,"Helvetica Neue",Arial,sans-serif';

    function css() {
      return [
        '.cvp{--foot:clamp(150px,23dvh,206px);position:fixed;top:0;left:0;right:0;bottom:0;z-index:30;width:100dvw;height:100dvh;min-height:100vh;overflow:hidden;color:' + C.ink + ';',
        'background:linear-gradient(180deg,#FFFFFF 0%,#FFF7FA 55%,' + C.blush + ' 100%);',
        'font-family:' + FONT + ';-webkit-user-select:none;user-select:none}',
        '.cvp *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}',
        '.cvp-w1,.cvp-w2{position:absolute;left:0;width:100%;display:block}',
        '.cvp-w1{bottom:0;height:calc(var(--foot) + 92px)}',
        '.cvp-w2{bottom:0;height:calc(var(--foot) + env(safe-area-inset-bottom,0px))}',
        '.cvp-content{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;align-items:center;text-align:center;',
        'padding:calc(env(safe-area-inset-top,0px) + clamp(6px,1.6dvh,16px)) 20px 0}',
        '.cvp-bookwrap{flex:0 1 auto;display:flex;justify-content:center;margin-top:0}',
        '.cvp-book{height:clamp(96px,17dvh,180px);width:auto;display:block;filter:drop-shadow(0 10px 16px rgba(110,10,46,.32));animation:cvpfloat 6s ease-in-out infinite}',
        '.cvp-bt{font-family:' + FONT + ';font-style:italic;font-weight:900;letter-spacing:-.02em}',
        '.cvp-bs{font-family:' + FONT + ';font-style:italic;font-weight:600}',
        '.cvp-bc{font-family:' + FONT + ';font-weight:700;letter-spacing:.1em}',
        '.cvp-gap{flex:1 1 0;min-height:4px}',
        '.cvp-title{margin:clamp(2px,.8dvh,8px) 0 0;font-family:' + FONT + ';font-style:italic;font-weight:900;letter-spacing:-.03em;line-height:.96;font-size:clamp(44px,min(17.5vw,9dvh),104px)}',
        '.cvp-l1{display:block;color:' + C.ink + '}',
        '.cvp-l2{display:block;color:' + C.brand + '}',
        '.cvp-swoosh{display:block;width:min(66%,300px);height:clamp(9px,1.9dvh,16px);margin:clamp(1px,.5dvh,6px) auto 0}',
        '.cvp-pill{margin-top:clamp(6px,1.6dvh,16px);padding:clamp(8px,1.5dvh,13px) clamp(14px,4vw,26px);border-radius:999px;background:' + C.brand + ';color:#FFFFFF;',
        'font-weight:800;font-size:clamp(13px,4.2vw,22px);line-height:1.15;letter-spacing:.01em;white-space:nowrap;max-width:92vw;overflow:hidden;text-overflow:ellipsis;',
        'box-shadow:0 6px 16px rgba(179,18,74,.32)}',
        '.cvp-tag{margin:clamp(6px,1.6dvh,14px) 0 0;font-style:italic;font-weight:800;font-size:clamp(16px,5.6vw,25px);line-height:1.26;color:' + C.ink + '}',
        '.cvp-begin{flex:none;width:min(88%,380px);height:clamp(56px,8.6dvh,74px);margin:clamp(8px,2dvh,20px) 0 clamp(14px,2.4dvh,22px);transform:translateY(-4px);display:flex;align-items:center;justify-content:center;gap:14px;',
        'border:3px solid #E9B93C;border-radius:999px;cursor:pointer;color:#FFFFFF;font-family:' + FONT + ';font-weight:900;font-size:clamp(19px,6vw,26px);line-height:1;letter-spacing:.08em;padding:0 12px;',
        'background:linear-gradient(180deg,#F23E78 0%,' + C.brandDark + ' 52%,' + C.brandDeep + ' 100%);',
        'box-shadow:inset 0 2px 0 rgba(255,255,255,.35),inset 0 -5px 12px rgba(58,10,31,.45),0 0 0 2px rgba(255,243,196,.45),0 8px 20px rgba(58,10,31,.35);animation:cvpglow 2.6s ease-in-out infinite}',
        '.cvp-begin:active{transform:translateY(-4px) scale(.97);filter:brightness(.95)}',
        '.cvp-begin:focus-visible{outline:3px solid ' + C.gold + ';outline-offset:3px}',
        '.cvp-begin svg{width:32px;height:24px;flex:none;display:block}',
        '@keyframes cvpglow{0%,100%{box-shadow:inset 0 2px 0 rgba(255,255,255,.35),inset 0 -5px 12px rgba(58,10,31,.45),0 0 0 2px rgba(255,243,196,.45),0 8px 20px rgba(58,10,31,.35)}50%{box-shadow:inset 0 2px 0 rgba(255,255,255,.35),inset 0 -5px 12px rgba(58,10,31,.45),0 0 0 6px rgba(255,213,74,.4),0 8px 26px rgba(255,213,74,.55)}}',
        '.cvp-foot{position:relative;z-index:3;flex:none;width:calc(100% + 40px);height:var(--foot);display:flex;align-items:center;justify-content:center;',
        'padding:clamp(28px,5dvh,46px) 18px calc(env(safe-area-inset-bottom,0px) + clamp(34px,5.6dvh,56px));margin:0 -20px}',
        '.cvp-act{flex:1 1 0;height:100%;max-height:96px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(4px,1dvh,9px);',
        'background:none;border:0;border-radius:14px;color:#FFFFFF;cursor:pointer;font-family:' + FONT + ';font-weight:700;font-size:clamp(15px,4.5vw,20px);line-height:1;padding:0}',
        '.cvp-act:active{transform:scale(.95);opacity:.9}',
        '.cvp-act:focus-visible{outline:3px solid ' + C.goldPale + ';outline-offset:2px}',
        '.cvp-act svg{width:clamp(38px,11.5vw,50px);height:clamp(30px,9vw,40px);display:block}',
        '.cvp-div{flex:none;width:2px;height:clamp(44px,8dvh,64px);background:rgba(255,255,255,.85);border-radius:1px}',
        '.cvp-tw{animation:cvptw 3.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}',
        '.cvp-in{opacity:0;animation:cvpup .8s cubic-bezier(.2,0,0,1) forwards}',
        '@keyframes cvpfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}',
        '@keyframes cvptw{0%,100%{opacity:.35;transform:scale(.8)}50%{opacity:1;transform:scale(1.15)}}',
        '@keyframes cvpup{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}',
        '@media (prefers-reduced-motion:reduce){.cvp *{animation-duration:.01ms!important;animation-iteration-count:1!important;animation-delay:0s!important}}'
      ].join('');
    }

    function sparkle(x, y, s, d) {
      return '<path class="cvp-tw" style="animation-delay:' + d + 's" transform="translate(' + x + ' ' + y + ') scale(' + s + ')" ' +
        'd="M0 -9 L2.2 -2.2 L9 0 L2.2 2.2 L0 9 L-2.2 2.2 L-9 0 L-2.2 -2.2Z" fill="#FFFFFF"/>';
    }

    function swoosh() {
      return '<svg class="cvp-swoosh" viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true">' +
        '<path d="M2 9 C 70 16 190 14 298 1 C 200 7 80 6 2 9 Z" fill="' + C.brand + '"/></svg>';
    }

    /* The 3D book: magenta spine, pink-to-white cover, sunset prayer scene */
    function book() {
      var ink = '#1A0A10';
      return '<svg class="cvp-book" viewBox="0 0 268 350" aria-hidden="true">' +
        '<defs>' +
        '<linearGradient id="cvpSpine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F0356F"/><stop offset=".55" stop-color="#DF1E5A"/><stop offset="1" stop-color="#A80F44"/></linearGradient>' +
        '<linearGradient id="cvpTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F8A6C4"/><stop offset=".55" stop-color="#FFD3E2"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>' +
        '<linearGradient id="cvpSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/><stop offset=".28" stop-color="#FFC7A6"/><stop offset=".62" stop-color="#FF9B3D"/><stop offset="1" stop-color="#FFD54A"/></linearGradient>' +
        '<radialGradient id="cvpSun" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".22" stop-color="#FFF3C4"/><stop offset=".55" stop-color="#FFC23A" stop-opacity=".7"/><stop offset="1" stop-color="#FF8A2A" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="cvpRock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A1A26"/><stop offset="1" stop-color="#1A0A10"/></linearGradient>' +
        '<linearGradient id="cvpPages" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E8D9DF"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient>' +
        '<clipPath id="cvpClip"><rect x="30" y="168" width="220" height="162"/></clipPath>' +
        '</defs>' +
        '<ellipse cx="140" cy="342" rx="118" ry="6" fill="#6E0A2E" opacity=".28"/>' +
        '<rect x="246" y="14" width="14" height="314" rx="2" fill="url(#cvpPages)"/>' +
        '<path d="M250 20 V324 M254 20 V324 M257 20 V324" stroke="#D9C3CC" stroke-width=".7"/>' +
        '<rect x="30" y="8" width="220" height="322" rx="3" fill="#FFFFFF"/>' +
        '<rect x="30" y="8" width="220" height="190" rx="3" fill="url(#cvpTop)"/>' +
        '<text class="cvp-bt" x="142" y="66" text-anchor="middle" font-size="40" fill="' + ink + '">' + TEXT.line1 + '</text>' +
        '<text class="cvp-bt" x="142" y="106" text-anchor="middle" font-size="43" fill="' + C.brand + '">' + TEXT.line2 + '</text>' +
        '<path d="M80 114 C 120 124 180 122 218 108 C 178 116 120 116 80 114 Z" fill="' + C.brand + '"/>' +
        '<text class="cvp-bs" x="142" y="140" text-anchor="middle" font-size="11" fill="#2A1520">' + TEXT.subtitle1 + '</text>' +
        '<text class="cvp-bs" x="142" y="154" text-anchor="middle" font-size="11" fill="#2A1520">' + TEXT.subtitle2 + '</text>' +
        /* your name inside the book — enlarged and weighted */
        '<text class="cvp-bc" x="142" y="184" text-anchor="middle" font-size="13.5" fill="' + C.brandDark + '">' + TEXT.name + '</text>' +
        '<g clip-path="url(#cvpClip)">' +
        '<rect x="30" y="168" width="220" height="162" fill="url(#cvpSky)"/>' +
        '<ellipse cx="196" cy="262" rx="70" ry="52" fill="url(#cvpSun)"/>' +
        '<circle cx="196" cy="262" r="8" fill="#FFFFFF"/>' +
        '<path d="M110 262 H282 M130 250 H262 M150 240 H242" stroke="#FFF3C4" stroke-width="1.4" opacity=".5"/>' +
        '<path d="M196 214 V310" stroke="#FFF3C4" stroke-width="1" opacity=".5"/>' +
        '<path d="M30 266 L58 254 L84 264 L112 250 L140 262 L170 252 L204 264 L232 256 L250 262 V300 H30Z" fill="#B5527A" opacity=".55"/>' +
        '<rect x="40" y="200" width="60" height="2.2" rx="1.1" fill="#FFFFFF" opacity=".45"/><rect x="150" y="190" width="70" height="2.2" rx="1.1" fill="#FFFFFF" opacity=".4"/>' +
        sparkle(196, 262, 1.5, 0) +
        '<g fill="none" stroke="' + ink + '" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M124 232 L106 258" stroke-width="15"/>' +
        '<path d="M106 258 L140 260" stroke-width="12"/>' +
        '<path d="M140 260 L144 272" stroke-width="10"/><path d="M144 272 L154 272" stroke-width="6"/>' +
        '<path d="M106 258 L90 270" stroke-width="11"/><path d="M90 270 L74 272" stroke-width="6"/>' +
        '<path d="M126 234 L140 246 L145 228" stroke-width="6"/>' +
        '</g>' +
        '<circle cx="129" cy="219" r="8.5" fill="' + ink + '"/>' +
        '<path d="M30 332 V292 L48 286 L62 292 L74 278 L98 270 L148 272 L166 284 L190 288 L214 298 L250 292 V332Z" fill="url(#cvpRock)"/>' +
        '<path d="M52 300 L70 296 M120 282 L146 280 M190 300 L226 304" stroke="#5A2A3C" stroke-width="1.4" opacity=".6"/>' +
        '</g>' +
        '<path d="M44 313 H70 M210 313 H236" stroke="#FFFFFF" stroke-width="1" opacity=".7"/>' +
        '<text class="cvp-bc" x="140" y="316.5" text-anchor="middle" font-size="8.4" fill="#FFFFFF">' + TEXT.footer + '</text>' +
        '<path d="M6 8 Q0 8 0 14 V324 Q0 330 6 330 H32 V8Z" fill="url(#cvpSpine)"/>' +
        '<path d="M31 8 V330" stroke="#FFFFFF" stroke-opacity=".28" stroke-width="1"/>' +
        '<text class="cvp-bt" transform="translate(21 160) rotate(90)" text-anchor="middle" font-size="18" fill="#FFFFFF">' + TEXT.spine + '</text>' +
        '<g transform="translate(5 304)" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">' +
        '<path d="M1 3 C 5 1 9 2 11 4 C 13 2 17 1 21 3 V16 C 17 14 13 15 11 17 C 9 15 5 14 1 16Z"/><path d="M11 4 V17"/></g>' +
        '</svg>';
    }

    function waves() {
      return '<svg class="cvp-w1" viewBox="0 0 360 240" preserveAspectRatio="none" aria-hidden="true">' +
        '<path d="M0 96 C 70 40 150 108 230 74 C 290 48 330 20 360 8 V240 H0Z" fill="' + C.pink1 + '" opacity=".75"/>' +
        '<path d="M0 138 C 80 90 170 150 250 118 C 305 96 340 78 360 70 V240 H0Z" fill="' + C.pink2 + '" opacity=".8"/></svg>' +
        '<svg class="cvp-w2" viewBox="0 0 360 160" preserveAspectRatio="none" aria-hidden="true"><defs>' +
        '<linearGradient id="cvpCrim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E8286A"/><stop offset="1" stop-color="' + C.brandDark + '"/></linearGradient></defs>' +
        '<path d="M0 34 C 60 8 130 40 210 26 C 270 16 320 4 360 0 V160 H0Z" fill="url(#cvpCrim)"/>' +
        '<path d="M0 44 C 70 20 140 52 220 38 C 280 28 326 14 360 10" fill="none" stroke="#FFFFFF" stroke-opacity=".3" stroke-width="1.2"/></svg>';
    }

    function iconBook() {
      return '<svg viewBox="0 0 50 40" aria-hidden="true"><g fill="none" stroke="#FFFFFF" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round">' +
        '<path d="M3 6 C 11 3 20 4 25 9 C 30 4 39 3 47 6 V33 C 39 30 30 31 25 36 C 20 31 11 30 3 33 Z"/><path d="M25 9 V36"/></g>' +
        '<path d="M7 11 C 13 9 19 10 22 13 V30 C 19 28 13 28 7 30Z M43 11 C 37 9 31 10 28 13 V30 C 31 28 37 28 43 30Z" fill="#FFFFFF" opacity=".22"/></svg>';
    }

    function iconDown() {
      return '<svg viewBox="0 0 50 40" aria-hidden="true"><g fill="none" stroke="#FFFFFF" stroke-width="3.8" stroke-linejoin="round" stroke-linecap="round">' +
        '<path d="M25 3 V24 M15 15 L25 25 L35 15"/><path d="M6 25 V35 H44 V25"/></g></svg>';
    }

    function iconArrow() {
      return '<svg viewBox="0 0 34 24" aria-hidden="true"><path d="M2 12 H30 M21 3 L31 12 L21 21" fill="none" stroke="' + C.gold + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }

    function injectStyle() {
      if (document.getElementById(STYLE_ID)) { return; }
      var st = document.createElement('style');
      st.id = STYLE_ID;
      st.textContent = css();
      document.head.appendChild(st);
    }

    function render(container, onBegin) {
      if (!container) { return; }
      injectStyle();
      container.innerHTML =
        '<section class="cvp" role="region" aria-label="Cover">' + waves() +
        '<div class="cvp-content">' +
        '<div class="cvp-bookwrap cvp-in" style="animation-delay:.05s">' + book() + '</div>' +
        '<h2 class="cvp-title cvp-in" style="animation-delay:.25s" aria-label="' + TEXT.line1 + ' ' + TEXT.line2 + '"><span class="cvp-l1">' + TEXT.line1 + '</span><span class="cvp-l2">' + TEXT.line2 + '</span></h2>' +
        '<div class="cvp-in" style="animation-delay:.35s;width:100%">' + swoosh() + '</div>' +
        '<div class="cvp-pill cvp-in" style="animation-delay:.5s">' + TEXT.name + '</div>' +
        '<p class="cvp-tag cvp-in" style="animation-delay:.65s">' + TEXT.tag1 + '<br>' + TEXT.tag2 + '</p>' +
        '<div class="cvp-gap"></div>' +
        '<button class="cvp-begin cvp-in" type="button" style="animation-delay:.8s" aria-label="' + TEXT.button.toLowerCase() + '"><span>' + TEXT.button + '</span>' + iconArrow() + '</button>' +
        '<div class="cvp-foot cvp-in" style="animation-delay:.9s">' +
        '<button class="cvp-act" type="button" data-mode="online" aria-label="' + TEXT.online.toLowerCase() + '">' + iconBook() + '<span>' + TEXT.online + '</span></button>' +
        '<span class="cvp-div" aria-hidden="true"></span>' +
        '<button class="cvp-act" type="button" data-mode="offline" aria-label="' + TEXT.offline.toLowerCase() + '">' + iconDown() + '<span>' + TEXT.offline + '</span></button>' +
        '</div></div></section>';
      var btns = container.querySelectorAll('.cvp-act, .cvp-begin'), i;
      function go() {
        try { container.dispatchEvent(new CustomEvent('coverpage:begin', { bubbles: true })); } catch (e) { /* ignore */ }
        if (typeof onBegin === 'function') { onBegin(); }
      }
      for (i = 0; i < btns.length; i++) { btns[i].addEventListener('click', go); }
    }

    window.CoverPage = { version: '2.0.0', render: render };
  } catch (err) {
    /* If this file has a mistake, the app just skips the cover. */
  }
})();