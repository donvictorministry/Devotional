/* cover-page.js - Professional, elevated mobile cover for "Don't Give Up!"
 *
 * STANDALONE & ZERO-DEPENDENCY
 * Mobile-only layout guaranteed to never cut off on ANY Android phone.
 * Contract: window.CoverPage.render(containerElement, onBegin)
 * Dispatches "coverpage:begin" CustomEvent on container.
 */
(function () {
  'use strict';
  try {
    var TEXT = {
      line1: "DON\u2019T",
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
      brandDark: '#B3124A',
      brandDeep: '#720A34',
      plum: '#280614',
      ink: '#150B1C',
      inkMuted: '#4D3E57',
      gold: '#FFD342',
      goldPale: '#FFF6D6',
      goldDeep: '#C98D16',
      blush: '#FFEBF2',
      blushSoft: '#FFF6FA',
      pink1: '#FFA6C3',
      pink2: '#F44B84'
    };

    var STYLE_ID = 'cvp-elevated-style';
    var FONT = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

    function css() {
      return [
        /* Root container: strictly 100dvw x 100dvh, no scroll, no cut-off */
        '.cvp{position:fixed;top:0;left:0;right:0;bottom:0;z-index:30;width:100dvw;height:100dvh;min-height:100vh;overflow:hidden;',
        'background:linear-gradient(180deg,#FFFFFF 0%,#FFF8FA 35%,' + C.blushSoft + ' 65%,' + C.blush + ' 100%);',
        'color:' + C.ink + ';font-family:' + FONT + ';-webkit-user-select:none;user-select:none;',
        '-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:flex;flex-direction:column}',
        
        '.cvp *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;margin:0;padding:0}',

        /* Ambient halo behind book */
        '.cvp-ambient{position:absolute;top:max(20px,calc(env(safe-area-inset-top,0px) + 12px));left:50%;transform:translateX(-50%);',
        'width:min(90dvw,340px);height:min(28dvh,220px);border-radius:50%;pointer-events:none;',
        'background:radial-gradient(circle,rgba(255,211,66,.38) 0%,rgba(223,30,90,.14) 50%,transparent 72%);',
        'filter:blur(24px);animation:cvp-glow 4.8s ease-in-out infinite}',

        /* Wave Footer Graphic: sits behind the bottom actions */
        '.cvp-waves{position:absolute;left:0;bottom:0;width:100%;height:clamp(145px,22dvh,190px);pointer-events:none;z-index:1}',
        '.cvp-waves svg{width:100%;height:100%;display:block}',

        /* Main Content Column:
           - Sized to fit comfortably in a single screen without ANY vertical overflow
           - Top padding guarantees clearance from Android camera punch-hole / notch
           - Bottom padding guarantees full visibility above Android navigation pill/bar */
        '.cvp-content{position:relative;z-index:10;width:100%;height:100%;display:flex;flex-direction:column;',
        'align-items:center;text-align:center;justify-content:center;',
        'gap:clamp(6px,1.3dvh,14px);',
        'padding-top:max(24px,calc(env(safe-area-inset-top,0px) + 18px));',
        'padding-bottom:max(24px,calc(env(safe-area-inset-bottom,0px) + 18px));',
        'padding-left:clamp(16px,5vw,24px);padding-right:clamp(16px,5vw,24px)}',

        /* Hero 3D Book: large & crisp, but budgeted so nothing overflows */
        '.cvp-bookwrap{position:relative;flex:0 0 auto;display:flex;justify-content:center;align-items:center;',
        'margin:0 auto;perspective:1000px}',
        '.cvp-book{height:clamp(116px,18dvh,160px);width:auto;display:block;',
        'filter:drop-shadow(0 14px 22px rgba(114,10,52,.32)) drop-shadow(0 4px 8px rgba(0,0,0,.12));',
        'animation:cvp-float 5s ease-in-out infinite}',

        /* Author Pill (Capped at 15px label) */
        '.cvp-pill{flex:0 0 auto;display:inline-flex;align-items:center;gap:6px;padding:clamp(4px,.8dvh,6px) clamp(12px,3.5vw,18px);',
        'border-radius:999px;background:rgba(223,30,90,.08);border:1.5px solid rgba(223,30,90,.22);',
        'color:' + C.brandDark + ';font-size:15px;font-weight:800;letter-spacing:.02em;line-height:1}',
        '.cvp-pill svg{width:14px;height:14px;fill:' + C.brand + ';flex:none}',

        /* Monumental Title: prominent, bold (>= 42px up to 72px) */
        '.cvp-title{flex:0 0 auto;font-family:' + FONT + ';font-style:italic;font-weight:950;line-height:.92;',
        'letter-spacing:-.035em;font-size:clamp(42px,min(14vw,7.2dvh),72px)}',
        '.cvp-t1{display:block;color:' + C.ink + ';text-shadow:0 1px 2px rgba(21,11,28,.1)}',
        '.cvp-t2{display:block;color:' + C.brand + ';text-shadow:0 3px 12px rgba(223,30,90,.22)}',

        /* Subtitle: strictly >= 19px */
        '.cvp-sub{flex:0 0 auto;font-size:clamp(19px,4.5vw,22px);font-weight:800;color:' + C.inkMuted + ';',
        'line-height:1.2;letter-spacing:-.01em}',

        /* Access Tagline: strictly >= 19px */
        '.cvp-tag{flex:0 0 auto;font-size:clamp(19px,4.3vw,21px);font-weight:700;color:' + C.ink + ';line-height:1.24;',
        'text-wrap:balance;max-width:94%}',

        /* "BEGIN JOURNEY" CTA: >= 20px, Jewel & Gold finish */
        '.cvp-begin{position:relative;flex:0 0 auto;width:100%;max-width:380px;height:clamp(52px,7.2dvh,64px);',
        'display:flex;align-items:center;justify-content:center;gap:12px;border-radius:999px;',
        'border:3px solid ' + C.gold + ';cursor:pointer;color:#FFFFFF;',
        'font-family:' + FONT + ';font-weight:950;font-size:clamp(20px,5.4vw,24px);line-height:1;letter-spacing:.05em;',
        'background:linear-gradient(180deg,#F73877 0%,' + C.brand + ' 48%,' + C.brandDeep + ' 100%);',
        'box-shadow:inset 0 2px 0 rgba(255,255,255,.45),inset 0 -5px 12px rgba(40,6,20,.5),0 0 0 2px rgba(255,246,214,.5),0 10px 22px rgba(114,10,52,.36);',
        'transition:transform .12s ease,box-shadow .12s ease;overflow:hidden;margin-top:clamp(2px,.5dvh,6px)}',
        '.cvp-begin::before{content:"";position:absolute;top:0;left:-100%;width:55%;height:100%;',
        'background:linear-gradient(90deg,transparent,rgba(255,255,255,.32),transparent);transform:skewX(-24deg);animation:cvp-sheen 3.4s infinite}',
        '.cvp-begin:active{transform:scale(.97);box-shadow:inset 0 2px 0 rgba(255,255,255,.4),0 4px 12px rgba(40,6,20,.4)}',
        '.cvp-begin:focus-visible{outline:3px solid ' + C.gold + ';outline-offset:3px}',
        '.cvp-begin svg{width:24px;height:20px;flex:none;display:block}',

        /* Dual Mode Buttons: sitting comfortably inside the viewport, capped at 15px */
        '.cvp-dock{flex:0 0 auto;width:100%;max-width:380px;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:0 2px}',
        '.cvp-act{flex:1 1 0;height:clamp(42px,5.5dvh,48px);display:flex;align-items:center;justify-content:center;gap:7px;',
        'background:rgba(255,255,255,.18);border:1.2px solid rgba(255,255,255,.4);border-radius:999px;',
        'color:#FFFFFF;cursor:pointer;font-family:' + FONT + ';font-weight:800;font-size:15px;line-height:1;letter-spacing:.02em;',
        'backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);transition:background .15s ease,transform .12s ease}',
        '.cvp-act:active{background:rgba(255,255,255,.34);transform:scale(.96)}',
        '.cvp-act:focus-visible{outline:2px solid ' + C.goldPale + ';outline-offset:2px}',
        '.cvp-act svg{width:18px;height:18px;flex:none;stroke:#FFFFFF}',

        /* Clean animations */
        '.cvp-in{opacity:0;animation:cvp-rise .6s cubic-bezier(.16,1,.3,1) forwards}',
        '@keyframes cvp-rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}',
        '@keyframes cvp-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}',
        '@keyframes cvp-glow{0%,100%{opacity:.5;transform:translateX(-50%) scale(1)}50%{opacity:.88;transform:translateX(-50%) scale(1.06)}}',
        '@keyframes cvp-sheen{0%{left:-100%}25%{left:140%}100%{left:140%}}',
        '@media (prefers-reduced-motion:reduce){.cvp *{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}'
      ].join('');
    }

    /* 3D Devotional Book SVG */
    function bookSVG() {
      return '<svg class="cvp-book" viewBox="0 0 280 340" aria-hidden="true">' +
        '<defs>' +
        '<linearGradient id="cvpSpineG" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="#F73877"/><stop offset=".4" stop-color="#DF1E5A"/><stop offset=".8" stop-color="#990B38"/><stop offset="1" stop-color="#5E0622"/>' +
        '</linearGradient>' +
        '<linearGradient id="cvpGoldPagesG" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="#B38012"/><stop offset=".35" stop-color="#FFDE72"/><stop offset=".65" stop-color="#FFF5D6"/><stop offset="1" stop-color="#735105"/>' +
        '</linearGradient>' +
        '<linearGradient id="cvpCoverG" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#FFFFFF"/><stop offset=".4" stop-color="#FFF5F8"/><stop offset="1" stop-color="#FFF0F5"/>' +
        '</linearGradient>' +
        '<linearGradient id="cvpSkyG" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#FFF0F5"/><stop offset=".3" stop-color="#FFD6E5"/><stop offset=".68" stop-color="#FFA845"/><stop offset="1" stop-color="#FFD342"/>' +
        '</linearGradient>' +
        '<radialGradient id="cvpSunG" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0" stop-color="#FFFFFF"/><stop offset=".28" stop-color="#FFF6D4"/><stop offset=".62" stop-color="#FFA31A" stop-opacity=".85"/><stop offset="1" stop-color="#DF1E5A" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<linearGradient id="cvpGoldBorderG" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#FFDE72"/><stop offset=".5" stop-color="#C98F18"/><stop offset="1" stop-color="#FFEBB0"/>' +
        '</linearGradient>' +
        '<clipPath id="cvpCoverClip"><rect x="34" y="146" width="222" height="170" rx="2"/></clipPath>' +
        '</defs>' +

        '<ellipse cx="146" cy="334" rx="116" ry="6" fill="#4A051B" opacity=".28"/>' +
        '<rect x="254" y="14" width="16" height="308" rx="2" fill="url(#cvpGoldPagesG)"/>' +
        '<path d="M258 20 V316 M262 20 V316 M266 20 V316" stroke="#664702" stroke-width=".7" opacity=".4"/>' +
        '<rect x="32" y="8" width="226" height="318" rx="4" fill="url(#cvpCoverG)"/>' +
        '<rect x="36" y="12" width="218" height="310" rx="3" fill="none" stroke="url(#cvpGoldBorderG)" stroke-width="1.2" opacity=".65"/>' +

        '<text x="145" y="58" text-anchor="middle" font-family="' + FONT + '" font-style="italic" font-weight="950" font-size="38" fill="' + C.ink + '" letter-spacing="-0.02em">' + TEXT.line1 + '</text>' +
        '<text x="145" y="98" text-anchor="middle" font-family="' + FONT + '" font-style="italic" font-weight="950" font-size="42" fill="' + C.brand + '" letter-spacing="-0.02em">' + TEXT.line2 + '</text>' +
        '<path d="M84 107 C 124 116 166 114 206 105 C 166 111 124 111 84 107 Z" fill="' + C.goldDeep + '"/>' +

        '<text x="145" y="130" text-anchor="middle" font-family="' + FONT + '" font-weight="800" font-size="11" fill="' + C.brandDark + '" letter-spacing=".16em">A FAITH-BASED DEVOTIONAL</text>' +
        '<path d="M68 138 H222" stroke="url(#cvpGoldBorderG)" stroke-width="1" opacity=".7"/>' +

        '<g clip-path="url(#cvpCoverClip)">' +
        '<rect x="34" y="146" width="222" height="170" fill="url(#cvpSkyG)"/>' +
        '<ellipse cx="198" cy="226" rx="72" ry="54" fill="url(#cvpSunG)"/>' +
        '<circle cx="198" cy="226" r="9" fill="#FFFFFF"/>' +
        '<path d="M198 165 V295 M125 226 H270" stroke="#FFF7D6" stroke-width="1.8" opacity=".75"/>' +
        '<path d="M148 178 L248 278 M248 178 L148 278" stroke="#FFF7D6" stroke-width="1" opacity=".35"/>' +
        '<path d="M34 246 L68 232 L96 242 L126 226 L156 240 L196 228 L230 244 L256 236 V320 H34Z" fill="#B83765" opacity=".5"/>' +

        '<g fill="' + C.ink + '">' +
        '<circle cx="132" cy="214" r="7.5"/>' +
        '<path d="M125 225 C 122 234 118 244 110 254 L128 254 C 132 246 135 238 138 230 Z"/>' +
        '<path d="M128 254 L144 255 L147 266 L158 266 L149 253 L132 251 Z"/>' +
        '<path d="M110 254 L94 263 L82 264 L82 269 L98 268 L114 258 Z"/>' +
        '<path d="M130 228 L144 238 L147 224 Z"/>' +
        '</g>' +

        '<path d="M34 320 V278 L56 270 L78 276 L94 262 L126 254 L164 258 L186 268 L220 274 L256 266 V320Z" fill="#240715"/>' +
        '<path d="M56 284 L84 280 M130 264 L164 266 M200 284 L236 286" stroke="#5E1635" stroke-width="1.6" opacity=".7"/>' +
        '</g>' +

        '<rect x="44" y="299" width="202" height="17" rx="3" fill="#1C0913" opacity=".95"/>' +
        '<rect x="44" y="299" width="202" height="17" rx="3" fill="none" stroke="url(#cvpGoldBorderG)" stroke-width=".8"/>' +
        '<text x="145" y="311.5" text-anchor="middle" font-family="' + FONT + '" font-weight="800" font-size="8.8" fill="' + C.goldPale + '" letter-spacing=".12em">REV. DR. CHRIS JOHNSON, PhD</text>' +

        '<path d="M6 8 Q0 8 0 14 V320 Q0 326 6 326 H34 V8Z" fill="url(#cvpSpineG)"/>' +
        '<path d="M33 8 V326" stroke="#FFFFFF" stroke-opacity=".3" stroke-width="1.2"/>' +
        '<text transform="translate(22 165) rotate(90)" text-anchor="middle" font-family="' + FONT + '" font-style="italic" font-weight="950" font-size="18" fill="#FFFFFF" letter-spacing=".04em">Don\u2019t Give Up</text>' +

        '<g transform="translate(8 296)" stroke="#FFDE72" stroke-width="1.8" stroke-linecap="round" fill="none">' +
        '<path d="M9 2 V18 M4 7 H14 M6 18 H12"/>' +
        '</g>' +
        '</svg>';
    }

    /* Wave footer backdrop with brand crimson */
    function waveBackdrop() {
      return '<div class="cvp-waves" aria-hidden="true">' +
        '<svg viewBox="0 0 360 180" preserveAspectRatio="none">' +
        '<defs>' +
        '<linearGradient id="cvpWaveCrimson" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#E82467"/><stop offset="55%" stop-color="' + C.brandDark + '"/><stop offset="100%" stop-color="' + C.plum + '"/>' +
        '</linearGradient>' +
        '</defs>' +
        '<path d="M0 76 C 70 28 150 94 230 62 C 290 38 330 14 360 6 V180 H0Z" fill="' + C.brand + '" opacity=".18"/>' +
        '<path d="M0 36 C 65 10 135 44 215 28 C 275 16 325 6 360 0 V180 H0Z" fill="url(#cvpWaveCrimson)"/>' +
        '<path d="M0 46 C 72 18 144 52 224 36 C 284 24 328 12 360 8" fill="none" stroke="#FFFFFF" stroke-opacity=".35" stroke-width="1.4"/>' +
        '</svg>' +
        '</div>';
    }

    function iconArrow() {
      return '<svg viewBox="0 0 30 24" aria-hidden="true">' +
        '<path d="M2 12 H26 M18 4 L26 12 L18 20" fill="none" stroke="' + C.gold + '" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>';
    }

    function iconBook() {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>' +
        '</svg>';
    }

    function iconDownload() {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>' +
        '</svg>';
    }

    function iconStar() {
      return '<svg viewBox="0 0 16 16" aria-hidden="true">' +
        '<path d="M8 0 L9.8 6.2 L16 8 L9.8 9.8 L8 16 L6.2 9.8 L0 8 L6.2 6.2 Z"/>' +
        '</svg>';
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
        '<section class="cvp" role="region" aria-label="Devotional eBook Cover">' +
        '<div class="cvp-ambient" aria-hidden="true"></div>' +
        waveBackdrop() +

        '<div class="cvp-content">' +

        /* 1. Hero 3D Book */
        '<div class="cvp-bookwrap cvp-in" style="animation-delay:.04s">' +
        bookSVG() +
        '</div>' +

        /* 2. Author Pill (15px label capped) */
        '<div class="cvp-pill cvp-in" style="animation-delay:.12s">' +
        iconStar() + '<span>' + TEXT.author + '</span>' +
        '</div>' +

        /* 3. Bold, Prominent Title (>= 42px up to 72px) */
        '<h1 class="cvp-title cvp-in" style="animation-delay:.20s" aria-label="' + TEXT.line1 + ' ' + TEXT.line2 + '">' +
        '<span class="cvp-t1">' + TEXT.line1 + '</span>' +
        '<span class="cvp-t2">' + TEXT.line2 + '</span>' +
        '</h1>' +

        /* 4. Subtitle (>= 19px) */
        '<h2 class="cvp-sub cvp-in" style="animation-delay:.28s">' +
        TEXT.subtitle +
        '</h2>' +

        /* 5. Access Tagline (>= 19px) */
        '<p class="cvp-tag cvp-in" style="animation-delay:.34s">' +
        TEXT.tag +
        '</p>' +

        /* 6. Primary "BEGIN JOURNEY" CTA (>= 20px) */
        '<button class="cvp-begin cvp-in" type="button" data-mode="journey" style="animation-delay:.42s" aria-label="' + TEXT.button + '">' +
        '<span>' + TEXT.button + '</span>' + iconArrow() +
        '</button>' +

        /* 7. Dual Bottom Actions (15px label capped) with guaranteed on-screen visibility */
        '<div class="cvp-dock cvp-in" style="animation-delay:.50s">' +
        '<button class="cvp-act" type="button" data-mode="online" aria-label="' + TEXT.online + '">' +
        iconBook() + '<span>' + TEXT.online + '</span>' +
        '</button>' +
        '<button class="cvp-act" type="button" data-mode="offline" aria-label="' + TEXT.offline + '">' +
        iconDownload() + '<span>' + TEXT.offline + '</span>' +
        '</button>' +
        '</div>' +

        '</div>' +
        '</section>';

      var btns = container.querySelectorAll('.cvp-begin, .cvp-act');
      function handleAction(evt) {
        var mode = evt.currentTarget.getAttribute('data-mode') || 'journey';
        try {
          var customEvt = new CustomEvent('coverpage:begin', {
            bubbles: true,
            detail: { mode: mode }
          });
          container.dispatchEvent(customEvt);
        } catch (e) { /* ignore fallback */ }
        if (typeof onBegin === 'function') {
          onBegin(mode);
        }
      }

      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', handleAction);
      }
    }

    window.CoverPage = {
      version: '3.4.0-zero-cutoff',
      render: render,
      TEXT: TEXT,
      C: C
    };
  } catch (err) {
    if (console && console.error) {
      console.error('CoverPage error:', err);
    }
  }
})();