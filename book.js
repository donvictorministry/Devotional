/* book.js - book metadata, offline copy of the unlocked content, and the text parser.
   The chapters themselves live in the "Book" sheet and arrive only after a valid unlock.
   Edit the placeholder values in META below. */
(function () {
  'use strict';

  var META = {
    title: "Don't Give Up!",
    subtitle: 'A Journey of Faith and Perseverance',
    author: 'Rev. Dr. Chris Johnson, PhD',
    edition: 'Edition 1.0, 2025',
    kicker: 'A Christian devotional',

    /* LOGO: paste your hosted logo image URL here. It is used in the header, both
       side menus and the front cover, always inside a circle with a rotating gear ring. */
    logo: 'https://REPLACE-WITH-YOUR-HOSTED-URL/logo.png',

    about: [
      "Don't Give Up! is a faith-based devotional for anyone walking through a dark valley. Drawing on Jeremiah 29:11 and the stories of Joseph, David, the woman with the issue of blood, and Paul and Silas, it shows how God's faithfulness prevails in every season of struggle.",
      'Each chapter ends with a short declaration you can speak aloud. Read one chapter at a time, or follow the Table of Contents in any order.'
    ],

    /* Contact: replace every placeholder below */
    email: 'ministry@ebook.org',
    phone: '+10000000000',
    whatsapp: '10000000000',
    facebook: 'https://www.facebook.com/YOUR-PAGE',

    /* Link people get when they tap Share App. Leave empty to share the current page. */
    shareUrl: '',
    shareText: "Read \"Don't Give Up!\" by Rev. Dr. Chris Johnson.",

    developer: {
      name: 'Developer Name',
      role: 'Software Developer',
      bio: 'Write a short bio here. Describe who built this app and why.',
      photo: 'https://REPLACE-WITH-YOUR-HOSTED-URL/developer.png'
    }
  };


  /* =====================================================================
     INFO PAGES (left menu). Edit the words freely.
     Each page is a list of blocks:
       ['h',  'Heading']              ['p', 'Paragraph']
       ['ul', ['item', 'item']]       ['ol', ['step', 'step']]    (bullets / numbers)
       ['about']  the About text above   ['dev']  developer card
       ['cta']    the four contact circles   ['cta-code']  contact circles with the access-code message
     In any text: {title} {author} {edition} {email} {phone} are filled in automatically,
     and **double stars** make bold text.
     ===================================================================== */
  var PAGES = {
    about: { title: 'About the Book', blocks: [
      ['h', '{title}'],
      ['about'],
      ['p', '**Author:** {author}'],
      ['p', '**Edition:** {edition}'],
      ['cta']
    ] },
    dev: { title: 'About Developer', center: true, blocks: [
      ['dev'],
      ['cta']
    ] },
    how: { title: 'How to Use', blocks: [
      ['h', 'Unlock'],
      ['ol', ['Type the access code you received and tap Unlock Book.', 'Each code works on one device only. Do not share it.']],
      ['h', 'Move through the book'],
      ['ul', ['**TOC** opens the Table of Contents.', '**Home** returns to the home page.', '**Prev** and **Next** turn the page.', '**Dark** switches dark and light mode.']],
      ['h', 'Menus'],
      ['ul', ['The left menu has information about the book and the ministry.', 'The right menu has the notepad, text size, dark mode, your to-do list, Install App and Share App.']],
      ['h', 'Offline'],
      ['p', 'After you unlock the book once, it works without internet. It checks your access again when you are online.']
    ] },
    terms: { title: 'Terms of Use', blocks: [
      ['h', 'Copyright'],
      ['p', 'Copyright 2025 {author}. All rights reserved.'],
      ['h', 'One-device license'],
      ['p', 'Your access code unlocks this book on one device only, for your personal reading and spiritual growth.'],
      ['h', 'You may'],
      ['ul', ['Read the book on your unlocked device.', 'Quote short passages with full credit for non-commercial ministry use.', 'Share the app link so others can ask for their own code.']],
      ['h', 'You may not'],
      ['ul', ['Share, sell, or give away your access code.', 'Copy, republish, or redistribute the text.', 'Create derivative works without written permission.']],
      ['h', 'Access changes'],
      ['p', 'Codes that are shared or resold can be disabled without notice.'],
      ['h', 'Permissions'],
      ['p', 'Write to {email} for permission requests.']
    ] },
    support: { title: 'Support Us', blocks: [
      ['p', 'This ministry flourishes because of people who faithfully stand with us. Here is how you can help.'],
      ['ul', ['**Pray** for the lives this message reaches.', '**Give** to fund ministry outreach and new resources. Contact us for giving details.', '**Share** the app with someone who needs encouragement.', '**Volunteer** your time and skills.']],
      ['p', 'Heaven records every seed sown for the Gospel. Thank you for partnering with us.'],
      ['cta']
    ] },
    contact: { title: 'Contact Us', blocks: [
      ['p', 'Need a prayer, a testimony to share, an access code, or help with the app? Reach out. We reply within 48 hours.'],
      ['p', '**Email:** {email}'],
      ['p', '**Phone:** {phone}'],
      ['cta-code']
    ] }
  };

  var KEY = 'ebook_book_v1';
  var chapters = [];

  function load() {
    try {
      var d = JSON.parse(localStorage.getItem(KEY) || 'null');
      chapters = Array.isArray(d) ? d.filter(valid) : [];
    } catch (e) { chapters = []; }
  }
  function valid(c) { return c && typeof c.id === 'string' && typeof c.title === 'string' && typeof c.body === 'string'; }
  function save(list) {
    chapters = (Array.isArray(list) ? list : []).filter(valid);
    try { localStorage.setItem(KEY, JSON.stringify(chapters)); } catch (e) {}
  }
  function clear() {
    chapters = [];
    try { localStorage.removeItem(KEY); } catch (e) {}
  }
  function has() { return chapters.length > 0; }
  function list() { return chapters.slice(); }
  function find(id) {
    for (var i = 0; i < chapters.length; i++) { if (chapters[i].id === id) { return chapters[i]; } }
    return null;
  }
  /* Reading order: front page first, then every chapter. */
  function ids() { return ['front'].concat(chapters.map(function (c) { return c.id; })); }
  function sections() {
    var out = [], map = {};
    chapters.forEach(function (c) {
      var s = c.section || 'Contents';
      if (!map[s]) { map[s] = { name: s, items: [] }; out.push(map[s]); }
      map[s].items.push(c);
    });
    return out;
  }

  /* Body format: blank line = paragraph; "> text -- Ref" = scripture; "# " = sub-heading; "* " = declaration */
  function parse(body) {
    return String(body || '').split(/\n\s*\n/).map(function (raw) {
      var b = raw.trim();
      if (!b) { return null; }
      if (b.indexOf('> ') === 0) {
        var t = b.slice(2), c = '', i = t.lastIndexOf(' -- ');
        if (i > -1) { c = t.slice(i + 4); t = t.slice(0, i); }
        return { t: 'quote', text: t, cite: c };
      }
      if (b.indexOf('# ') === 0) { return { t: 'sub', text: b.slice(2) }; }
      if (b.indexOf('* ') === 0) { return { t: 'decl', text: b.slice(2) }; }
      return { t: 'p', text: b };
    }).filter(Boolean);
  }

  load();
  window.Book = { meta: META, pages: PAGES, load: load, save: save, clear: clear, has: has, list: list, find: find, ids: ids, sections: sections, parse: parse };
})();
