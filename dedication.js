/* dedication.js - Edge-to-edge, card-based Dedication module
 * 100dvh, strictly >= 19px fonts, zero max-width restrictions.
 * Flawless dark mode switching and app-wide icon integration.
 * Auto-injects into the left sidebar as the second item.
 */
(function () {
  'use strict';

  /* Generates SVG using the app's global icons.js library */
  function svg(name, size) {
    var path = window.ICON && window.ICON[name] ? window.ICON[name] : '';
    var s = size || 24;
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="currentColor" aria-hidden="true"><path d="' + path + '"/></svg>';
  }

  function injectCSS() {
    var style = document.createElement('style');
    style.id = 'ddc-styles';
    style.textContent = [
      /* Base Layout - Edge to edge, 100% width, fixed outer shell to pin header */
      '.ddc-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100dvh; z-index: 9999; overflow: hidden; display: flex; flex-direction: column; transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); font-family: system-ui, -apple-system, sans-serif; }',
      '.ddc-modal.open { transform: translateY(0); }',
      '.ddc-modal * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0; padding: 0; }',
      
      /* Pinned Header */
      '.ddc-hdr { display: flex; align-items: center; padding: max(16px, calc(env(safe-area-inset-top, 0px) + 16px)) 16px 16px 16px; flex-shrink: 0; z-index: 10; }',
      '.ddc-back { background: none; border: none; color: inherit; display: flex; align-items: center; justify-content: center; padding: 8px; margin-right: 12px; margin-left: -8px; cursor: pointer; }',
      '.ddc-hdr h2 { font-size: 24px; font-weight: 900; letter-spacing: -0.02em; }',
      
      /* Scrollable Body & Full-Width Stacked Cards */
      '.ddc-body { padding: 0 0 calc(env(safe-area-inset-bottom, 0px) + 32px) 0; display: flex; flex-direction: column; width: 100%; flex: 1; overflow-y: auto; }',
      '.ddc-card { width: 100%; padding: 24px 20px; }',
      '.ddc-card h3 { font-size: 22px; font-weight: 800; margin-bottom: 14px; line-height: 1.2; }',
      '.ddc-card p { font-size: 19px; font-weight: 500; line-height: 1.5; margin-bottom: 16px; }',
      '.ddc-card p:last-child { margin-bottom: 0; }',

      /* Light Mode Colors (Default) */
      '.ddc-modal { background: #FFFFFF; color: #150B1C; }',
      '.ddc-hdr { background: #FFFFFF; border-bottom: 1px solid #EEEEEE; }',
      '.ddc-card { background: #FFFFFF; border-bottom: 8px solid #F7F7F7; }',
      '.ddc-card h3 { color: #DF1E5A; }',
      '.ddc-card p { color: #150B1C; }',

      /* Dark Mode Colors (Hooks into app's data-theme="dark") */
      '[data-theme="dark"] .ddc-modal { background: #121212; color: #FFFFFF; }',
      '[data-theme="dark"] .ddc-hdr { background: #121212; border-bottom: 1px solid #2A2A2A; }',
      '[data-theme="dark"] .ddc-card { background: #121212; border-bottom: 8px solid #000000; }',
      '[data-theme="dark"] .ddc-card h3 { color: #F44B84; }',
      '[data-theme="dark"] .ddc-card p { color: #E0E0E0; }'
    ].join('');
    document.head.appendChild(style);
  }

  function injectHTML() {
    var wrap = document.createElement('div');
    wrap.id = 'ddcModal';
    wrap.className = 'ddc-modal';
    wrap.setAttribute('role', 'dialog');
    wrap.innerHTML = 
      '<div class="ddc-hdr">' +
        '<button class="ddc-back" id="ddcBtnClose" aria-label="Close Dedication">' + svg('back', 26) + '</button>' +
        '<h2>Dedication</h2>' +
      '</div>' +
      '<div class="ddc-body">' +
        '<div class="ddc-card">' +
          '<h3>To Our Lord Jesus Christ</h3>' +
          '<p>With profound gratitude to the Almighty, who is the ultimate author and finisher of our faith.</p>' +
        '</div>' +
        '<div class="ddc-card">' +
          '<h3>To My Family</h3>' +
          '<p>For your unwavering love, patience, and steadfast support that have sustained this vision.</p>' +
        '</div>' +
        '<div class="ddc-card">' +
          '<h3>To The Reader</h3>' +
          '<p>This work is dedicated to every soul seeking hope, strength, and endurance.</p>' +
          '<p>We pray that as you open this book, the Holy Spirit will illuminate your heart and equip you with the courage to never give up.</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);
  }

  /* History API for Native Android Back Button */
  var isOpen = false;
  function openModal() {
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
      /* Uses the global 'star' icon from icons.js for the menu button */
      btn.innerHTML = '<span class="dr-ic">' + svg('star') + '</span><span class="dr-txt">Dedication</span>';
      btn.onclick = openModal;
      
      /* Injects precisely as the second item in the menu list */
      var target = list.children.length > 1 ? list.children[1] : null;
      list.insertBefore(btn, target);
      return true;
    }
    return false;
  }

  function boot() {
    injectCSS();
    injectHTML();
    document.getElementById('ddcBtnClose').addEventListener('click', closeModal);
    
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