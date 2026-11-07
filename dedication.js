/* dedication.js - Edge-to-edge, card-based Dedication module
 * 100dvh, strictly >= 19px fonts, zero max-width restrictions.
 * Auto-injects into the left sidebar as the first item.
 */
(function () {
  'use strict';

  var C = {
    brand: '#DF1E5A',
    ink: '#150B1C',
    bg: '#FFF6FA',
    card: '#FFFFFF'
  };

  var FONT = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  function injectCSS() {
    var style = document.createElement('style');
    style.id = 'ddc-styles';
    style.textContent = [
      '.ddc-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100dvh; z-index: 9999; background: ' + C.bg + '; color: ' + C.ink + '; font-family: ' + FONT + '; overflow-y: auto; overflow-x: hidden; display: flex; flex-direction: column; transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }',
      '.ddc-modal.open { transform: translateY(0); }',
      '.ddc-modal * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0; padding: 0; }',
      
      /* Header */
      '.ddc-hdr { display: flex; align-items: center; padding: max(16px, calc(env(safe-area-inset-top, 0px) + 16px)) 16px 16px 16px; background: ' + C.card + '; box-shadow: 0 4px 12px rgba(223,30,90,0.08); position: sticky; top: 0; z-index: 10; }',
      '.ddc-back { background: none; border: none; color: ' + C.brand + '; display: flex; align-items: center; justify-content: center; padding: 8px; margin-right: 12px; margin-left: -8px; cursor: pointer; }',
      '.ddc-hdr h2 { font-size: 24px; font-weight: 900; color: ' + C.ink + '; letter-spacing: -0.02em; }',
      
      /* Card Layout (100% width, no computer centering, 19px minimum text) */
      '.ddc-body { padding: 16px 0 calc(env(safe-area-inset-bottom, 0px) + 32px) 0; display: flex; flex-direction: column; gap: 16px; }',
      '.ddc-card { background: ' + C.card + '; margin: 0 16px; padding: 24px 20px; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); border-left: 5px solid ' + C.brand + '; }',
      '.ddc-card h3 { font-size: 22px; font-weight: 800; color: ' + C.brand + '; margin-bottom: 14px; line-height: 1.2; }',
      '.ddc-card p { font-size: 19px; font-weight: 500; line-height: 1.5; color: ' + C.ink + '; margin-bottom: 16px; }',
      '.ddc-card p:last-child { margin-bottom: 0; }'
    ].join('');
    document.head.appendChild(style);
  }

  /* Pure SVGs - Zero Unicode */
  var svgBack = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>';
  var svgBookmark = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>';

  function injectHTML() {
    var wrap = document.createElement('div');
    wrap.id = 'ddcModal';
    wrap.className = 'ddc-modal';
    wrap.setAttribute('role', 'dialog');
    wrap.innerHTML = 
      '<div class="ddc-hdr">' +
        '<button class="ddc-back" id="ddcBtnClose" aria-label="Close Dedication">' + svgBack + '</button>' +
        '<h2>Dedication</h2>' +
      '</div>' +
      '<div class="ddc-body">' +
        '<div class="ddc-card">' +
          '<h3>To The Reader</h3>' +
          '<p>This work is dedicated to every soul seeking hope, strength, and endurance in Christ Jesus.</p>' +
          '<p>May these words be a beacon of light in your darkest hours and a firm foundation of faith in your daily walk.</p>' +
        '</div>' +
        '<div class="ddc-card">' +
          '<h3>Acknowledgements</h3>' +
          '<p>With profound gratitude to the Almighty, who is the ultimate author and finisher of our faith.</p>' +
          '<p>To the ministry partners, devoted leaders, and faithful intercessors whose steadfast prayers have sustained this vision.</p>' +
        '</div>' +
        '<div class="ddc-card">' +
          '<h3>A Prayer For You</h3>' +
          '<p>We pray that as you open this book, the Holy Spirit will illuminate your heart and equip you with the courage to never give up.</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);
  }

  /* History API for Native Android Back Button */
  var isOpen = false;
  function openModal() {
    /* Auto-close the left sidebar if it is open so the UI remains clean behind the modal */
    var leftDrawer = document.getElementById('drawerLeft');
    if (leftDrawer && leftDrawer.classList.contains('open')) {
      history.back(); 
    }
    
    setTimeout(function() {
      document.getElementById('ddcModal').classList.add('open');
      history.pushState({ ddc: 1 }, '');
      isOpen = true;
    }, 50);
  }

  function closeModal() {
    if (isOpen) {
      history.back();
    }
  }

  window.addEventListener('popstate', function (e) {
    if (isOpen && (!e.state || !e.state.ddc)) {
      document.getElementById('ddcModal').classList.remove('open');
      isOpen = false;
    }
  });

  function hijackSidebar() {
    var list = document.getElementById('leftList');
    if (list && !document.getElementById('miDedication')) {
      var btn = document.createElement('button');
      btn.className = 'dr-item';
      btn.id = 'miDedication';
      btn.innerHTML = '<span class="dr-ic">' + svgBookmark + '</span><span class="dr-txt">Dedication</span>';
      btn.onclick = openModal;
      
      /* Inject precisely at the top of the list */
      list.insertBefore(btn, list.firstChild);
      return true;
    }
    return false;
  }

  /* Boot Sequence */
  function boot() {
    injectCSS();
    injectHTML();
    document.getElementById('ddcBtnClose').addEventListener('click', closeModal);
    
    /* Poll briefly until app.js has built the menus, then inject the button */
    var attempts = 0;
    var timer = setInterval(function () {
      if (hijackSidebar() || attempts > 20) {
        clearInterval(timer);
      }
      attempts++;
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();