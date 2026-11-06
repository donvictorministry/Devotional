/* cover-page.js - the cover (welcome) page of "Don't Give Up!"
 *
 * STANDALONE: this file carries its own CSS, HTML and JavaScript.
 * The book works without it. If you delete or edit this file, the app simply
 * skips the cover and opens the access-code screen. Nothing else is affected.
 *
 * Contract with the app (the only link between them):
 *     window.CoverPage.render(containerElement, onBegin)
 * It also fires a "coverpage:begin" event on the container when a button is tapped.
 */
(function () {
  'use strict';
  try {
    var STYLE_ID = 'cvp-style';

    function css() {
      return [
        '.cvp{position:fixed;inset:0;z-index:30;width:100dvw;height:100dvh;overflow:hidden;background:#FFFFFF;',
        'font-family:Roboto,-apple-system,sans-serif;display:flex;flex-direction:column;align-items:center;',
        '-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}',
        '.cvp *{box-sizing:border-box;margin:0;padding:0}',
        
        /* Hero Section */
        '.cvp-hero{position:relative;width:100%;flex:1.2;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;',
        'padding:env(safe-area-inset-top,20px) 16px 0 16px;overflow:hidden}',
        '.cvp-hero-bg{position:absolute;inset:0;width:100%;height:100%;z-index:0}',
        '.cvp-hero-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;width:100%}',
        
        /* Typography */
        '.cvp-title{font-weight:900;text-align:center;line-height:.85;letter-spacing:-0.03em;',
        'font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}',
        '.cvp-t-black{display:block;color:#111111;font-size:clamp(56px,16vw,80px);transform:rotate(-2deg)}',
        '.cvp-t-pink{display:block;color:#DF1E5A;font-size:clamp(68px,20vw,96px);transform:rotate(-2deg);margin-top:4px}',
        
        /* Sweeping Line */
        '.cvp-line{width:80%;max-width:320px;height:12px;margin-top:8px;margin-bottom:12px}',
        
        /* Subtitle */
        '.cvp-sub{text-align:center;color:#1a1b1f;font-family:Georgia,serif;font-style:italic;',
        'font-size:clamp(16px,4.5vw,20px);line-height:1.3;font-weight:600}',
        
        /* Footer Section */
        '.cvp-footer{position:relative;width:100%;flex:0.8;display:flex;flex-direction:column;justify-content:flex-end;align-items:center}',
        '.cvp-wave-bg{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:0}',
        '.cvp-footer-content{position:relative;z-index:2;width:100%;display:flex;flex-direction:column;align-items:center;padding-bottom:env(safe-area-inset-bottom,20px)}',
        
        /* Pill */
        '.cvp-pill{background:#DF1E5A;border-radius:40px;padding:12px 24px;color:#FFFFFF;',
        'font-size:clamp(16px,4.5vw,19px);font-weight:700;text-align:center;margin-bottom:12px;',
        'box-shadow:0 4px 12px rgba(223,30,90,0.3)}',
        
        '.cvp-desc{color:#111111;font-weight:600;text-align:center;font-size:clamp(16px,4.5vw,19px);',
        'line-height:1.4;margin-bottom:24px;padding:0 20px}',
        
        /* Buttons */
        '.cvp-btns{display:flex;width:100%;max-width:400px;justify-content:center;gap:20px;padding:0 20px}',
        '.cvp-btn{display:flex;flex-direction:column;align-items:center;gap:8px;background:none;border:none;',
        'color:#FFFFFF;cursor:pointer;flex:1;padding:12px;transition:opacity 0.2s}',
        '.cvp-btn:active{opacity:0.7}',
        '.cvp-btn svg{width:44px;height:44px;fill:#FFFFFF}',
        '.cvp-btn span{font-size:clamp(14px,4vw,18px);font-weight:600}',

        '@media (max-height:700px){.cvp-hero{flex:1}.cvp-footer{flex:1}}'
      ].join('');
    }

    function svgHero() {
      return `<svg class="cvp-hero-bg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFE9F1"/>
            <stop offset="40%" stop-color="#FFC9D9"/>
            <stop offset="70%" stop-color="#FF8E5C"/>
            <stop offset="100%" stop-color="#FFD54A"/>
          </linearGradient>
          <radialGradient id="sun" cx="50%" cy="80%" r="30%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
            <stop offset="50%" stop-color="#FFF3C4" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#FFD54A" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2D0A10"/>
            <stop offset="100%" stop-color="#110205"/>
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#sky)"/>
        <circle cx="200" cy="320" r="120" fill="url(#sun)"/>
        <path d="M0 320 Q 100 280 200 300 T 400 320 L 400 400 L 0 400 Z" fill="url(#ground)"/>
        <!-- Silhouette -->
        <g fill="#110205">
          <path d="M230 300 C 230 260 210 250 200 260 C 190 250 180 260 180 280 C 180 290 185 300 190 310 L 230 300 Z"/>
          <circle cx="205" cy="235" r="12"/>
          <path d="M195 245 C 180 250 170 260 175 265 C 180 270 190 260 200 250 Z"/>
        </g>
      </svg>`;
    }

    function svgLine() {
      return `<svg class="cvp-line" viewBox="0 0 320 12" preserveAspectRatio="none">
        <path d="M10 6 Q 160 -4 310 6" fill="none" stroke="#DF1E5A" stroke-width="4" stroke-linecap="round"/>
      </svg>`;
    }

    function svgWaveFooter() {
      return `<svg class="cvp-wave-bg" viewBox="0 0 400 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 60 C 120 100 280 0 400 40 L 400 300 L 0 300 Z" fill="#BD1049"/>
        <path d="M0 80 C 120 120 280 20 400 60 L 400 300 L 0 300 Z" fill="#A60B3E"/>
      </svg>`;
    }

    function injectStyle() {
      if (document.getElementById(STYLE_ID)) return;
      var st = document.createElement('style');
      st.id = STYLE_ID;
      st.textContent = css();
      document.head.appendChild(st);
    }

    function render(container, onBegin) {
      if (!container) return;
      injectStyle();
      container.innerHTML = `
        <section class="cvp" role="region" aria-label="Cover">
          
          <div class="cvp-hero">
            ${svgHero()}
            <div class="cvp-hero-content">
              <h1 class="cvp-title">
                <span class="cvp-t-black">Don't</span>
                <span class="cvp-t-pink">Give Up</span>
              </h1>
              ${svgLine()}
              <p class="cvp-sub">Faith, Hope and<br>Endurance in Christ</p>
            </div>
          </div>

          <div class="cvp-footer">
            ${svgWaveFooter()}
            <div class="cvp-footer-content">
              <div class="cvp-pill">A faith-based devotional ebook.</div>
              <p class="cvp-desc">Unlock it with your access code<br>and read online or offline.</p>
              
              <div class="cvp-btns">
                <button class="cvp-btn" id="cvpBtnOnline">
                  <svg viewBox="0 0 24 24"><path d="M21 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H7V6h14v12zM3 6h2v12H3z"/></svg>
                  <span>Read Online</span>
                </button>
                <button class="cvp-btn" id="cvpBtnOffline">
                  <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                  <span>Read Offline</span>
                </button>
              </div>
            </div>
          </div>

        </section>
      `;

      var triggerBegin = function(mode) {
        try { container.dispatchEvent(new CustomEvent('coverpage:begin', { bubbles: true, detail: { mode: mode } })); } catch (e) {}
        if (typeof onBegin === 'function') { onBegin(mode); }
      };

      container.querySelector('#cvpBtnOnline').addEventListener('click', function() { triggerBegin('online'); });
      container.querySelector('#cvpBtnOffline').addEventListener('click', function() { triggerBegin('offline'); });
    }

    window.CoverPage = { version: '2.0.0', render: render };
  } catch (err) {}
})();