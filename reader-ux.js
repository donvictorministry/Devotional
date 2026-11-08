/* reader-ux.js - Self-contained Progress Bar and Swipe Gestures module 
 * Auto-injects CSS and HTML. Listens for user interactions without modifying the core app.
 */
(function () {
  'use strict';

  /* --- 1. Scroll Progress Bar Engine --- */
  function initProgressBar() {
    var style = document.createElement('style');
    style.id = 'ux-progress-style';
    style.textContent = [
      '.ux-progress-wrap { position: fixed; top: 0; left: 0; width: 100%; height: 3px; z-index: 9999; background: transparent; pointer-events: none; }',
      '.ux-progress-bar { height: 100%; width: 0%; background: #DF1E5A; transition: width 0.1s ease-out; }',
      /* Ensure dark mode contrast if needed */
      '[data-theme="dark"] .ux-progress-bar { background: #F44B84; }'
    ].join('');
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.className = 'ux-progress-wrap';
    wrap.innerHTML = '<div class="ux-progress-bar" id="uxProgressBar"></div>';
    document.body.appendChild(wrap);

    var bar = document.getElementById('uxProgressBar');
    var main = document.getElementById('main');

    main.addEventListener('scroll', function () {
      var scrollTotal = main.scrollHeight - main.clientHeight;
      if (scrollTotal <= 0) {
        bar.style.width = '0%';
        return;
      }
      var percent = (main.scrollTop / scrollTotal) * 100;
      bar.style.width = percent + '%';
    }, { passive: true });
  }

  /* --- 2. Swipe Gesture Engine (The Ghost Clicker) --- */
  function initSwipe() {
    var startX = 0;
    var startY = 0;
    var threshold = 50; /* Minimum horizontal swipe distance to trigger */
    var restraint = 50; /* Maximum vertical drift allowed (so scrolling isn't mistaken for swiping) */

    document.addEventListener('touchstart', function (e) {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      var touchobj = e.changedTouches[0];
      startX = touchobj.pageX;
      startY = touchobj.pageY;
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      var touchobj = e.changedTouches[0];
      var endX = touchobj.pageX;
      var endY = touchobj.pageY;

      var distX = endX - startX;
      var distY = endY - startY;

      /* Check if swipe is a clean horizontal line */
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        
        /* Do not trigger swipes if any menu, sheet, or overlay is currently open */
        var leftOpen = document.getElementById('drawerLeft') && document.getElementById('drawerLeft').classList.contains('open');
        var rightOpen = document.getElementById('drawerRight') && document.getElementById('drawerRight').classList.contains('open');
        var sheetOpen = document.getElementById('sheet') && document.getElementById('sheet').classList.contains('open');
        
        if (leftOpen || rightOpen || sheetOpen) return;

        if (distX < 0) {
          /* Swipe Left -> Simulate clicking "Next" */
          var nextBtn = document.getElementById('navNext');
          if (nextBtn && !nextBtn.disabled) { nextBtn.click(); }
        } else {
          /* Swipe Right -> Simulate clicking "Prev" */
          var prevBtn = document.getElementById('navPrev');
          if (prevBtn && !prevBtn.disabled) { prevBtn.click(); }
        }
      }
    }, { passive: true });
  }

  /* --- Boot Sequence --- */
  function boot() {
    /* Poll briefly until app.js has fully rendered the #main container */
    var attempts = 0;
    var timer = setInterval(function() {
      if (document.getElementById('main') || attempts > 20) {
        clearInterval(timer);
        if (document.getElementById('main')) {
          initProgressBar();
          initSwipe();
        }
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