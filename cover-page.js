/* cover-page.js - the cover (welcome) page of "Don't Give Up!"
 * STANDALONE: strictly 100dvw/100dvh, exact screenshot replication.
 */
(function () {
  'use strict';
  try {
    var STYLE_ID = 'cvp-style';

    function css() {
      return [
        '.cvp{position:fixed;inset:0;z-index:30;width:100dvw;height:100dvh;overflow:hidden;background:#FFF;',
        'font-family:Roboto,-apple-system,sans-serif;display:flex;flex-direction:column;align-items:center;',
        '-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}',
        '.cvp *{box-sizing:border-box;margin:0;padding:0}',
        
        /* Hero Section (Top 65%) */
        '.cvp-hero{position:relative;width:100%;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;',
        'padding:env(safe-area-inset-top,20px) 16px 0 16px;overflow:hidden}',
        '.cvp-hero-bg{position:absolute;inset:0;width:100%;height:100%;z-index:0}',
        '.cvp-hero-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;width:100%;margin-top:20px}',
        
        /* Typography matching screenshot */
        '.cvp-title{font-weight:900;text-align:center;line-height:.85;letter-spacing:-0.03em;',
        'font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;z-index:5}',
        '.cvp-t-black{display:block;color:#111111;font-size:clamp(56px,16vw,80px);transform:rotate(-2deg)}',
        '.cvp-t-pink{display:block;color:#DF1E5A;font-size:clamp(68px,20vw,96px);transform:rotate(-2deg);margin-top:4px}',
        
        /* Sweeping Line */
        '.cvp-line{width:80%;max-width:320px;height:16px;margin-top:8px;margin-bottom:12px;z-index:5}',
        
        /* Subtitle */
        '.cvp-sub{text-align:center;color:#1a1b1f;font-family:Georgia,serif;font-style:italic;',
        'font-size:clamp(16px,4.5vw,20px);line-height:1.3;font-weight:600;z-index:5}',
        '.cvp-author{margin-top:12px;font-size:clamp(16px,4.5vw,20px);font-weight:700;color:#DF1E5A;font-family:Roboto,sans-serif;z-index:5}',
        
        /* Ribbon over the image */
        '.cvp-ribbon{position:absolute;bottom:0;left:0;right:0;background:#111;color:#FFF;padding:8px 16px;',
        'text-align:center;font-size:14px;font-weight:700;letter-spacing:2px;z-index:5}',
        
        /* Footer Section (Bottom 35%) */
        '.cvp-footer{position:relative;width:100%;flex:0.8;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;background:#FFF;padding-bottom:env(safe-area-inset-bottom,20px)}',
        
        /* Primary Button */
        '.cvp-btn{position:relative;z-index:2;width:calc(100% - 40px);max-width:360px;height:60px;display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:16px;',
        'border:none;border-radius:30px;cursor:pointer;color:#FFF;font:700 20px/1 Roboto,Inter,sans-serif;letter-spacing:.08em;',
        'background:#DF1E5A;',
        'box-shadow:0 4px 12px rgba(223,30,90,.4);padding:0 12px;transition:transform 0.1s}',
        '.cvp-btn:active{transform:scale(.97)}',
        '.cvp-btn svg{width:30px;height:20px;flex:none;display:block;fill:none;stroke:#FFF;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}',
        
        /* Small elements */
        '.cvp-modes{display:flex;gap:12px;position:relative;z-index:2;width:100%;justify-content:center;}',
        '.cvp-mode-btn{background:rgba(223,30,90,0.08);border:1px solid rgba(223,30,90,0.3);border-radius:20px;',
        'padding:8px 16px;display:flex;align-items:center;gap:8px;color:#DF1E5A;font-size:15px;font-weight:700;cursor:pointer;}',
        '.cvp-mode-btn svg{width:18px;height:18px;fill:#DF1E5A;}',

        '.cvp-in{opacity:0;animation:cvpup .8s cubic-bezier(.2,0,0,1) forwards}',
        '@keyframes cvpup{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}',
        '@media (prefers-reduced-motion:reduce){.cvp *{animation-duration:.01ms!important;animation-iteration-count:1!important;animation-delay:0s!important}}'
      ].join('');
    }

    // SVG Drawing of the Sunrise + Kneeling Man + Rocks
    function svgHero() {
      return `<svg class="cvp-hero-bg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="30%" stop-color="#FFE9F1"/>
            <stop offset="60%" stop-color="#FFC9D9"/>
            <stop offset="80%" stop-color="#FF8E5C"/>
            <stop offset="100%" stop-color="#FFD54A"/>
          </linearGradient>
          <radialGradient id="sun" cx="50%" cy="75%" r="35%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
            <stop offset="30%" stop-color="#FFF3C4" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#FFD54A" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2D0A10"/>
            <stop offset="100%" stop-color="#110205"/>
          </linearGradient>
        </defs>
        <!-- Sky and Sun -->
        <rect width="400" height="400" fill="url(#sky)"/>
        <circle cx="200" cy="300" r="140" fill="url(#sun)"/>
        
        <!-- Distant ground -->
        <path d="M0 280 Q 100 250 200 270 T 400 280 L 400 400 L 0 400 Z" fill="#4A1518"/>
        
        <!-- Foreground Rocks -->
        <path d="M0 320 Q 80 290 180 320 T 400 350 L 400 400 L 0 400 Z" fill="url(#ground)"/>
        
        <!-- Kneeling Silhouette (facing right) -->
        <g fill="#110205">
          <!-- Back and Body -->
          <path d="M220 320 C 230 280 215 260 195 265 C 180 270 170 280 170 295 C 170 310 180 315 190 320 L 220 320 Z"/>
          <!-- Head -->
          <circle cx="205" cy="245" r="14"/>
          <!-- Praying Arms -->
          <path d="M195 265 C 185 260 175 265 175 275 C 175 280 180 285 190 280 Z"/>
        </g>
      </svg>`;
    }

    function svgLine() {
      return `<svg class="cvp-line" viewBox="0 0 320 16" preserveAspectRatio="none">
        <path d="M10 8 Q 160 -6 310 8" fill="none" stroke="#DF1E5A" stroke-width="5" stroke-linecap="round"/>
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
            <div class="cvp-hero-content cvp-in">
              <h1 class="cvp-title">
                <span class="cvp-t-black">Don't</span>
                <span class="cvp-t-pink">Give Up</span>
              </h1>
              ${svgLine()}
              <p class="cvp-sub">Faith, Hope and<br>Endurance in Christ</p>
              <p class="cvp-author">Rev. Dr. Chris Johnson, PhD</p>
            </div>
            
            <div class="cvp-ribbon">A FAITH-BASED DEVOTIONAL</div>
          </div>

          <div class="cvp-footer">
            <button class="cvp-btn cvp-in" id="cvpBtnMain" style="animation-delay:0.2s">
              <svg viewBox="0 0 34 24"><path d="M2 12 H30 M21 3 L31 12 L21 21" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span>BEGIN JOURNEY</span>
            </button>
            
            <div class="cvp-modes cvp-in" style="animation-delay:0.3s">
              <button class="cvp-mode-btn" id="cvpBtnOnline">
                <svg viewBox="0 0 24 24"><path d="M21 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H7V6h14v12zM3 6h2v12H3z"/></svg> Read Online
              </button>
              <button class="cvp-mode-btn" id="cvpBtnOffline">
                <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg> Read Offline
              </button>
            </div>
          </div>

        </section>
      `;

      var triggerBegin = function(mode) {
        try { container.dispatchEvent(new CustomEvent('coverpage:begin', { bubbles: true, detail: { mode: mode } })); } catch (e) {}
        if (typeof onBegin === 'function') { onBegin(mode); }
      };

      container.querySelector('#cvpBtnMain').addEventListener('click', function() { triggerBegin('begin'); });
      container.querySelector('#cvpBtnOnline').addEventListener('click', function() { triggerBegin('online'); });
      container.querySelector('#cvpBtnOffline').addEventListener('click', function() { triggerBegin('offline'); });
    }

    window.CoverPage = { version: '3.0.0', render: render };
  } catch (err) {}
})();