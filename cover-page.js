/* cover-page.js
 * DON'T GIVE UP! Premium Full-Screen Cover
 * Version: 4.0.0
 * Standalone. Zero dependencies.
 *
 * Contract:
 * window.CoverPage.render(containerElement, onBegin)
 *
 * Modes:
 * journey | online | offline
 */
(function () {
  'use strict';

  var TEXT = {
    line1: "DON'T",
    line2: 'GIVE UP!',
    author: 'Rev. Dr. Chris Johnson, PhD',
    subtitle: 'Faith, Hope and Endurance in Christ',
    tag: 'Enter your access code to unlock your spiritual breakthrough.',
    button: 'BEGIN JOURNEY',
    online: 'Read Online',
    offline: 'Read Offline'
  };

  var C = {
    brand: '#DF1E5A',
    dark: '#B3124A',
    deep: '#720A34',
    ink: '#190C18',
    muted: '#594653',
    gold: '#FFD342',
    goldDeep: '#C98D16',
    white: '#FFFFFF',
    blush: '#FFF5F8',
    pale: '#FFF9FB'
  };

  var STYLE_ID = 'cvp-premium-style';
  var FONT = 'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif';

  function css() {
    return [

      /* Full-screen foundation */

      '.cvp{position:fixed;inset:0;z-index:30;',
      'width:100%;height:100vh;height:100dvh;',
      'display:flex;flex-direction:column;overflow:hidden;',
      'background:linear-gradient(155deg,#fff 0%,#fff8fa 48%,#ffedf3 100%);',
      'color:' + C.ink + ';font-family:' + FONT + ';',
      '-webkit-font-smoothing:antialiased;user-select:none}',

      '.cvp *{box-sizing:border-box;margin:0;padding:0;',
      '-webkit-tap-highlight-color:transparent}',

      /* Decorative background */

      '.cvp-glow{position:absolute;top:5%;left:50%;',
      'width:min(90vw,390px);height:260px;',
      'transform:translateX(-50%);border-radius:50%;',
      'background:radial-gradient(circle,rgba(255,211,66,.32),rgba(223,30,90,.10) 48%,transparent 72%);',
      'filter:blur(28px);pointer-events:none}',

      '.cvp-decoration{position:absolute;inset:0;pointer-events:none;',
      'background:radial-gradient(ellipse at 50% 40%,transparent 40%,rgba(223,30,90,.035) 100%)}',

      /* Main content */

      '.cvp-main{position:relative;z-index:2;',
      'flex:1 1 auto;min-height:0;width:100%;',
      'display:flex;flex-direction:column;',
      'align-items:center;justify-content:center;',
      'text-align:center;overflow-y:auto;overscroll-behavior:contain;',
      'padding:clamp(10px,2dvh,22px) 20px 12px;',
      'gap:clamp(7px,1.4dvh,15px)}',

      /* Book */

      '.cvp-bookwrap{position:relative;flex:0 0 auto;',
      'display:flex;justify-content:center;align-items:center;',

      'padding:5px 0 9px}',

      '.cvp-book{display:block;',
      'height:clamp(112px,19dvh,180px);',
      'width:auto;max-width:65vw;',
      'filter:drop-shadow(0 15px 20px rgba(114,10,52,.25));',
      'animation:cvp-float 5s ease-in-out infinite}',

      /* Title */

      '.cvp-title{flex:0 0 auto;',
      'font-size:clamp(46px,14vw,76px);',
      'font-weight:950;font-style:italic;',
      'line-height:.91;letter-spacing:-.055em;',
      'text-align:center}',

      '.cvp-title span{display:block}',

      '.cvp-t1{color:' + C.ink + ';}',

      '.cvp-t2{color:' + C.brand + ';',
      'text-shadow:0 4px 15px rgba(223,30,90,.16)}',

      /* Subtitle */

      '.cvp-sub{flex:0 0 auto;',
      'font-size:clamp(19px,4.8vw,23px);',
      'font-weight:750;color:' + C.muted + ';',
      'line-height:1.25;max-width:340px}',

      /* Author attribution */

      '.cvp-author{flex:0 0 auto;',
      'display:flex;align-items:center;justify-content:center;',
      'gap:9px;font-size:clamp(16px,4vw,19px);',
      'font-weight:850;color:' + C.dark + ';',
      'line-height:1.3}',

      '.cvp-author:before,.cvp-author:after{',
      'content:"";width:22px;height:1px;',
      'background:linear-gradient(90deg,transparent,' + C.goldDeep + ')}',

      '.cvp-author:after{transform:rotate(180deg)}',

      /* Tagline */

      '.cvp-tag{flex:0 0 auto;',
      'max-width:340px;width:100%;',
      'font-size:clamp(19px,4.4vw,21px);',
      'font-weight:650;line-height:1.35;',
      'color:' + C.ink + ';text-wrap:balance}',

      /* Main action */

      '.cvp-begin{position:relative;flex:0 0 auto;',
      'width:100%;max-width:380px;',
      'height:clamp(54px,7.5dvh,64px);',
      'display:flex;align-items:center;justify-content:center;gap:14px;',
      'border:2px solid ' + C.gold + ';border-radius:999px;',
      'background:linear-gradient(145deg,#F64A80,' + C.brand + ' 55%,' + C.deep + ');',
      'color:#fff;font-family:' + FONT + ';',
      'font-size:clamp(20px,5vw,24px);font-weight:950;',
      'letter-spacing:.055em;cursor:pointer;',
      'box-shadow:inset 0 2px 0 rgba(255,255,255,.35),',
      '0 9px 24px rgba(114,10,52,.25);',
      'margin-top:clamp(3px,1dvh,10px);',
      'transition:transform .15s ease}',

      '.cvp-begin:active{transform:scale(.975)}',

      '.cvp-begin:focus-visible,.cvp-act:focus-visible{',
      'outline:3px solid ' + C.gold + ';outline-offset:4px}',

      '.cvp-arrow{width:25px;height:25px;flex:none}',

      /* Footer */

      '.cvp-footer{position:relative;z-index:5;',
      'flex:0 0 auto;width:100%;',
      'padding:20px 18px calc(env(safe-area-inset-bottom,0px) + 22px);',
      'background:linear-gradient(160deg,#E82467 0%,' + C.dark + ' 48%,' + C.deep + ' 100%);',
      'box-shadow:0 -7px 25px rgba(114,10,52,.12);',

      'display:flex;align-items:center;justify-content:center}',

      '.cvp-footer:before{content:"";position:absolute;',
      'top:-19px;left:0;width:100%;height:20px;',
      'background:' + C.brand + ';',
      'clip-path:ellipse(65% 100% at 50% 100%)}',

      '.cvp-dock{position:relative;width:100%;',
      'max-width:380px;display:flex;gap:12px}',

      '.cvp-act{flex:1;min-width:0;',
      'height:clamp(48px,6.5dvh,56px);',
      'display:flex;align-items:center;justify-content:center;',
      'gap:8px;padding:0 8px;',
      'border:1.5px solid rgba(255,255,255,.48);',
      'border-radius:999px;',
      'background:rgba(255,255,255,.13);',
      'color:#fff;font-family:' + FONT + ';',
      'font-size:clamp(16px,4vw,18px);font-weight:800;',
      'white-space:nowrap;cursor:pointer;',
      'transition:background .15s,transform .15s}',

      '.cvp-act:active{background:rgba(255,255,255,.3);transform:scale(.97)}',

      '.cvp-act svg{width:21px;height:21px;flex:none}',

      /* Animations */

      '@keyframes cvp-float{',
      '0%,100%{transform:translateY(0)}',
      '50%{transform:translateY(-5px)}}',

      '@media(max-height:700px){',
      '.cvp-main{gap:6px;padding-top:6px;padding-bottom:6px}',
      '.cvp-book{height:clamp(100px,16dvh,125px)}',
      '.cvp-title{font-size:clamp(42px,12vw,58px)}',
      '.cvp-footer{padding-top:15px;padding-bottom:calc(env(safe-area-inset-bottom,0px) + 14px)}',
      '.cvp-begin{margin-top:2px}}',

      '@media(max-height:580px){',
      '.cvp-main{justify-content:flex-start}',
      '.cvp-book{height:95px}',
      '.cvp-title{font-size:42px}',
      '.cvp-footer{padding-top:12px;padding-bottom:calc(env(safe-area-inset-bottom,0px) + 10px)}}',

      '@media(prefers-reduced-motion:reduce){',
      '.cvp *{animation:none!important;transition:none!important}}'

    ].join('');
  }

  /* Book illustration */

  function bookSVG() {
    return '<svg class="cvp-book" viewBox="0 0 280 340" role="img" aria-label="Illustrated cover of the devotional Don't Give Up">' +

      '<defs>' +

      '<linearGradient id="cvpSpine" x2="1">' +
      '<stop stop-color="#F73877"/>' +
      '<stop offset="1" stop-color="#720A34"/>' +
      '</linearGradient>' +

      '<linearGradient id="cvpPages" x2="1">' +
      '<stop stop-color="#B38012"/>' +
      '<stop offset=".5" stop-color="#FFF5D6"/>' +
      '<stop offset="1" stop-color="#C98D16"/>' +
      '</linearGradient>' +

      '<linearGradient id="cvpCover" x2="0" y2="1">' +
      '<stop stop-color="#FFFFFF"/>' +
      '<stop offset="1" stop-color="#FFF0F5"/>' +
      '</linearGradient>' +

      '<linearGradient id="cvpSky" x2="0" y2="1">' +
      '<stop stop-color="#FFF0F5"/>' +
      '<stop offset=".45" stop-color="#FFA845"/>' +
      '<stop offset="1" stop-color="#FFD342"/>' +
      '</linearGradient>' +

      '<clipPath id="cvpClip">' +
      '<rect x="34" y="146" width="222" height="170" rx="2"/>' +
      '</clipPath>' +

      '</defs>' +

      '<ellipse cx="146" cy="334" rx="116" ry="6" fill="#4A051B" opacity=".25"/>' +

      '<rect x="254" y="14" width="16" height="308" fill="url(#cvpPages)"/>' +

      '<rect x="32" y="8" width="226" height="318" rx="4" fill="url(#cvpCover)"/>' +

      '<rect x="36" y="12" width="218" height="310" fill="none" stroke="#C98D16" opacity=".65"/>' +

      '<text x="145" y="58" text-anchor="middle" font-family="Arial" font-style="italic" font-weight="900" font-size="38" fill="#190C18">DON&#8217;T</text>' +

      '<text x="145" y="98" text-anchor="middle" font-family="Arial" font-style="italic" font-weight="900" font-size="42" fill="#DF1E5A">GIVE UP!</text>' +

      '<path d="M84 107 Q145 120 206 105" stroke="#C98D16" fill="none" stroke-width="2"/>' +

      '<text x="145" y="130" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="10" fill="#B3124A" letter-spacing="1.4">A FAITH-BASED DEVOTIONAL</text>' +

      '<path d="M68 138 H222" stroke="#C98D16"/>' +

      '<g clip-path="url(#cvpClip)">' +

      '<rect x="34" y="146" width="222" height="170" fill="url(#cvpSky)"/>' +

      '<circle cx="198" cy="226" r="48" fill="#FFF5D6" opacity=".65"/>' +

      '<circle cx="198" cy="226" r="11" fill="#FFFFFF"/>' +

      '<path d="M34 246 L68 232 96 242 126 226 156 240 196 228 230 244 256 236 V320 H34Z" fill="#B83765" opacity=".5"/>' +

      '<g fill="#240715">' +
      '<circle cx="132" cy="214" r="7.5"/>' +
      '<path d="M125 225 L110 254 H128 L138 230Z"/>' +
      '<path d="M128 254 L144 255 147 266 158 266 149 253Z"/>' +
      '<path d="M110 254 L94 263 82 264 V269 L98 268 114 258Z"/>' +
      '</g>' +

      '<path d="M34 320 V278 L56 270 78 276 94 262 126 254 164 258 186 268 220 274 256 266 V320Z" fill="#240715"/>' +

      '</g>' +

      '<rect x="44" y="299" width="202" height="17" rx="3" fill="#1C0913"/>' +

      '<text x="145" y="311.5" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="8.5" fill="#FFF6D6" letter-spacing=".7">REV. DR. CHRIS JOHNSON, PhD</text>' +

      '<path d="M6 8 Q0 8 0 14 V320 Q0 326 6 326 H34 V8Z" fill="url(#cvpSpine)"/>' +

      '<path d="M33 8 V326" stroke="#fff" stroke-opacity=".4"/>' +

      '<text transform="translate(22 165) rotate(90)" text-anchor="middle" font-family="Arial" font-style="italic" font-weight="bold" font-size="18" fill="#fff">Don&#8217;t Give Up</text>' +

      '</svg>';
  }

  function iconArrow() {
    return '<svg class="cvp-arrow" viewBox="0 0 30 24" aria-hidden="true">' +
      '<path d="M2 12 H26 M18 4 L26 12 L18 20" fill="none" stroke="#FFD342" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';
  }

  function iconBook() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>' +
      '<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>' +
      '</svg>';
  }

  function iconDownload() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>' +
      '<path d="M7 10l5 5 5-5M12 15V3"/>' +
      '</svg>';
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css();
    document.head.appendChild(style);
  }

  function render(container, onBegin) {
    if (!container || !container.appendChild) return;

    injectStyle();

    container.innerHTML =

      '<section class="cvp" role="region" aria-label="Don’t Give Up devotional cover">' +

      '<div class="cvp-glow" aria-hidden="true"></div>' +
      '<div class="cvp-decoration" aria-hidden="true"></div>' +

      '<main class="cvp-main">' +

      '<div class="cvp-bookwrap">' +
      bookSVG() +
      '</div>' +

      '<h1 class="cvp-title">' +
      '<span class="cvp-t1">' + TEXT.line1 + '</span>' +
      '<span class="cvp-t2">' + TEXT.line2 + '</span>' +
      '</h1>' +

      '<h2 class="cvp-sub">' +
      TEXT.subtitle +
      '</h2>' +

      '<div class="cvp-author">' +
      TEXT.author +
      '</div>' +

      '<p class="cvp-tag">' +
      TEXT.tag +
      '</p>' +

      '<button class="cvp-begin" type="button" data-mode="journey">' +
      '<span>' + TEXT.button + '</span>' +
      iconArrow() +
      '</button>' +

      '</main>' +

      '<footer class="cvp-footer">' +

      '<div class="cvp-dock">' +

      '<button class="cvp-act" type="button" data-mode="online">' +
      iconBook() +
      '<span>' + TEXT.online + '</span>' +
      '</button>' +

      '<button class="cvp-act" type="button" data-mode="offline">' +
      iconDownload() +
      '<span>' + TEXT.offline + '</span>' +
      '</button>' +

      '</div>' +

      '</footer>' +

      '</section>';

    var buttons = container.querySelectorAll(
      '.cvp-begin,.cvp-act'
    );

    function handleAction(evt) {
      var mode = evt.currentTarget.getAttribute('data-mode');

      try {
        container.dispatchEvent(new CustomEvent(
          'coverpage:begin',
          {
            bubbles: true,
            detail: { mode: mode }
          }
        ));
      } catch (e) {
        /* Callback remains available as fallback. */
      }

      if (typeof onBegin === 'function') {
        onBegin(mode);
      }
    }

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', handleAction);
    }
  }

  window.CoverPage = {
    version: '4.0.0-premium',
    render: render,
    TEXT: TEXT,
    C: C
  };

})();