(function(){
  "use strict";

  var P = "byq-gem--multiplayer-cursors-01";
  var T = window.__BYQ_MC_TIMERS__ = (window.__BYQ_MC_TIMERS__ || []);
  var ST = window.__BYQ_MC_ST__ = (window.__BYQ_MC_ST__ || { handlers: [] });

  function addT(id){ T.push(id); return id; }
  function clearTimers(){
    T.forEach(function(id){ clearInterval(id); clearTimeout(id); });
    T.length = 0;
  }
  function worldEl(){ return document.querySelector("." + P + "__world"); }
  function isHomePath(){
    var p = window.location.pathname;
    return (p === "/portfolio" || p === "/portfolio/") ||
           (p.indexOf("/portfolio/") === 0 && p.indexOf("/portfolio/projet/") !== 0);
  }

  /* ====== v9p : moteur redemarrable ======
     Semplice charge les pages en AJAX : on detruit proprement en quittant
     la homepage (timers + couche + elements natifs remis a leur place),
     et on reconstruit au retour. Les ecouteurs document ne sont jamais
     dupliques (les anciens sont retires avant d'ajouter les nouveaux). */
  function destroyAll(){
    clearTimers();
    document.body.classList.remove("mc-you-active");
    /* remettre les elements natifs dans leur section d'origine */
    document.querySelectorAll(".mc-arrow").forEach(function(node){
      if (node._origParent && node._origNext &&
          node.parentElement && node.parentElement.classList &&
          node.parentElement.className.indexOf(P + "__world") !== -1){
        try { node._origParent.insertBefore(node, node._origNext); } catch(e){}
      }
    });
    /* retirer les ecouteurs de la session precedente */
    (ST.handlers || []).forEach(function(h){
      document.removeEventListener(h[0], h[1], h[2]);
    });
    ST.handlers = [];
    var w = worldEl();
    if (w) w.remove();
  }

  /* ====== GARDE DE PAGE (v9n) ====== */
  if (!isHomePath()){
    destroyAll();
    return;
  }
  if (worldEl()) return; /* moteur deja vivant */

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", bootWhenReady);
    return;
  }
  bootWhenReady();

  function bootWhenReady(){
    if (worldEl()) return; /* entre-temps, une autre session a demarre */
    startEngine();
  }

  function startEngine(){

  var CONFIG = {
  
  cards: [
      { video: "https://video.gumlet.io/6743d419df514a0b8ae88a93/6af85a0a46afb54468aa4d8e/download.mp4", caption: "Responsive motion", top: "30%", left: "20%", width: "min(10vw, 30rem)", rot: 2 },
	 { video: "https://video.gumlet.io/6743d419df514a0b8ae88a93/6af86b5646afb54468aa6903/download.mp4", caption: "A/B testing", top: "40%", left: "70%", width: "min(10vw, 24rem)", rot: -3 },
	{ video: "https://video.gumlet.io/6743d419df514a0b8ae88a93/6af87aa4ee8085089ab32211/download.mp4", caption: "Vibe coding", top: "70%", left: "70%", width: "min(10vw, 24rem)", rot: -6 },
    ],
  
  
  
  
 
    note: { left: "30%", top: "50%", rot: -2.5 },
    noteWords: ["durables.", "simples.", "utiles.", "vivantes.", "pertinentes."],
    gallery: {
      base: "https://cdn-portfolio.gumlet.io/img-moi/",
      imgs: [
        "portrait-dhomme-dessin-vincent-de-leonardo-da-vinci.png",
        "portrait-d-un-homme-face-a-un-arriere-plan-surréaliste.jpg",
        "portrait-d-un-homme-avec-barbe-et-cheveux-boucles-en-costume-historique.png",
        "collage-art-dada-liberte-anti-art.png",
        "portrait-glitch-homme-barbe-cheveux-boucles.png",
        "portrait-homme-style-vintage-avec-verre-et-plante.png",
        "portrait-illustration-homme-avec-barbe-et-cheveux-boucles.png",
        "portrait-artistique-homme-cheveux-noirs-t-shirt-noir-avec-peinture.png",
        "portrait-homme-cheveux-boucles-t-shirt-noir.png",
        "portrait-polygonal-homme-barbu-t-shirt-noir.png",
        "personnage-masculin-avec-vetements-historiques-dans-un-bar.png",
        "portrait-dun-homme-avec-cheveux-boucles-et-barbe.png",
        "homme-cyborg-avec-armure-technique-dans-un-environnement-futuriste.png",
        "portrait-d-un-homme-avec-cheveux-naturels-et-t-shirt-noir.png",
        "homme-en-pull-dans-un-paysage-automnal-avec-renard.png",
        "portrait-homme-cheveux-longs-beard-cafe.png",
        "portrait-homme-cheveux-boucles-montagnes-nature-illustration.png",
        "portrait-artist-avec-cheveux-boucles-et-barbe.png",
        "portrait-artist-collage-couleurs-vives.png",
        "portrait-rétro-avec-palmier-et-soleil-rose.png",
        "portrait-art-de-style-rétro-homme-barbu.png",
        "portrait-homme-barbu-t-shirt-noir-assis-table.png"
      ],
      speed: 220
    }
  };

  var sections = Array.prototype.slice.call(
    document.querySelectorAll("smp-section.mc-hero, section.mc-hero")
  );
  if (!sections.length) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (reduce || !fine) return;

  function el(tag, cls, css){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (css) n.style.cssText = css;
    return n;
  }
  function pick(a){ return a[Math.floor(Math.random() * a.length)]; }
  function clamp(v, a, b){ return Math.min(b, Math.max(a, v)); }
  function rand(a, b){ return a + Math.random() * (b - a); }

  function docRect(sec){
    var r = sec.getBoundingClientRect();
    return { l: r.left + window.pageXOffset, t: r.top + window.pageYOffset,
             r: r.right + window.pageXOffset, b: r.bottom + window.pageYOffset,
             w: r.width, h: r.height };
  }
  function bounds(){
    var u = null;
    sections.forEach(function(s){
      var d = docRect(s);
      if (!u) u = { l: d.l, t: d.t, r: d.r, b: d.b };
      else {
        u.l = Math.min(u.l, d.l); u.t = Math.min(u.t, d.t);
        u.r = Math.max(u.r, d.r); u.b = Math.max(u.b, d.b);
      }
    });
    return u;
  }

  var world = el("div", P + "__world");
  world.setAttribute("aria-hidden", "true");
  world.style.cssText = "position:absolute;top:0;left:0;width:100%;height:0;pointer-events:none;z-index:90;";
  document.body.appendChild(world);

  function layer(name, z){
    var l = el("div", P + "__" + name);
    l.setAttribute("aria-hidden", "true");
    l.style.zIndex = z;
    world.appendChild(l);
    return l;
  }
  var selLayer = layer("sel-layer", 40);
  var fxLayer = layer("fx", 45);
  var curLayer = layer("cursors", 50);

  /* decoupage : sur une re-init, les textes sont deja en spans ;
     le splitter recense les spans existants sans casser le rendu */
  var groups = [];
  sections.forEach(function(sec){
    sec.querySelectorAll("h1, h2, h3, h4, p").forEach(function(node){
      var list = [];
      function splitIn(parent){
        Array.prototype.slice.call(parent.childNodes).forEach(function(child){
          if (child.nodeType === 3){
            var frag = document.createDocumentFragment();
            child.textContent.split(/(\s+)/).forEach(function(tok){
              if (!tok) return;
              if (/^\s+$/.test(tok)){ frag.appendChild(document.createTextNode(tok)); return; }
              var s = el("span");
              s.textContent = tok;
              frag.appendChild(s);
              list.push(s);
            });
            child.parentNode.replaceChild(frag, child);
          } else if (child.nodeType === 1 && child.tagName !== "BR"){
            splitIn(child);
          }
        });
      }
      splitIn(node);
      if (list.length) groups.push(list);
    });
  });
  function find(list, text){
    var toks = text.split(" ");
    for (var i = 0; i + toks.length <= list.length; i++){
      var ok = true;
      for (var k = 0; k < toks.length; k++){
        if (list[i + k].textContent !== toks[k]){ ok = false; break; }
      }
      if (ok) return list.slice(i, i + toks.length);
    }
    return null;
  }

  var onScreen = true, drag = null, zTop = 30, mx = 0, my = 0, youOn = false, chatBox = null;

  function say(c, text, hold){
    hold = hold || (1500 + Math.random() * 900);
    var id = ++c.chatId;
    c.msg.textContent = "";
    c.node.classList.add("is-chat");
    var chars = Array.from(text);
    var i = 0;
    (function type(){
      if (id !== c.chatId) return;
      if (i < chars.length){
        c.msg.textContent += chars[i++];
        addT(setTimeout(type, 28 + Math.random() * 37));
      } else {
        addT(setTimeout(function(){
          if (id === c.chatId) c.node.classList.remove("is-chat");
        }, hold));
      }
    })();
  }

  function drawSel(spans, color){
    var g = el("div");
    selLayer.appendChild(g);
    var lines = [];
    spans.forEach(function(s){
      var r = s.getBoundingClientRect();
      var dl = r.left + window.pageXOffset, dt = r.top + window.pageYOffset;
      var L = null;
      for (var i = 0; i < lines.length; i++){
        if (Math.abs(lines[i].t - dt) < 6){ L = lines[i]; break; }
      }
      if (L){
        if (dl < L.l) L.l = dl;
        if (r.right + window.pageXOffset > L.r) L.r = r.right + window.pageXOffset;
        if (r.bottom + window.pageYOffset > L.b) L.b = r.bottom + window.pageYOffset;
      } else {
        lines.push({ t: dt, b: r.bottom + window.pageYOffset, l: dl, r: r.right + window.pageXOffset });
      }
    });
    lines.forEach(function(L){
      var d = el("div", P + "__sel",
        "left:" + (L.l - 2) + "px;top:" + L.t + "px;width:" + (L.r - L.l + 4) + "px;height:" + (L.b - L.t) + "px");
      d.style.setProperty("--c", color);
      g.appendChild(d);
    });
    addT(setTimeout(function(){ g.remove(); }, 2600));
  }

  function burst(x, y){
    var set = ["\u2726", "\u2727", "\u2605", "\u2733", "\u2764\uFE0E", "\u2713"];
    var n = 3 + Math.round(Math.random() * 2);
    for (var i = 0; i < n; i++){
      var s = el("span", P + "__emoji");
      s.textContent = pick(set);
      s.style.color = "var(--byq-fg)";
      fxLayer.appendChild(s);
      var dx = Math.random() * 68 - 34, dy = -(70 + Math.random() * 50), rot = Math.random() * 48 - 24;
      var a = s.animate([
        { transform: "translate(" + (x - 12) + "px," + (y - 14) + "px) scale(.3) rotate(0deg)", opacity: 0 },
        { transform: "translate(" + (x - 12 + dx * .3) + "px," + (y - 14 + dy * .3) + "px) scale(1.1) rotate(" + (rot * .5) + "deg)", opacity: 1, offset: .25 },
        { transform: "translate(" + (x - 12 + dx) + "px," + (y - 14 + dy) + "px) scale(.85) rotate(" + rot + "deg)", opacity: 0 }
      ], { duration: 1100 + Math.random() * 400, delay: i * 80, easing: "cubic-bezier(.2,.7,.3,1)", fill: "both" });
      a.onfinish = (function(node){ return function(){ node.remove(); }; })(s);
    }
  }

    function toWorld(fig){
    if (fig.parentElement === world) return;
    var r = fig.getBoundingClientRect();
    fig.style.width = r.width + "px";
    /* v10m : carte vidéo — la hauteur reste fluide tant que le ratio
       réel n'est pas connu, sinon la vidéo serait pillarboxée */
    var v = fig.querySelector("video.mc-video");
    if (v && v.videoWidth){
      fig.style.height = "auto";
    } else {
      fig.style.height = r.height + "px";
    }
    fig.style.position = "absolute";

    fig.style.margin = "0";
    fig.style.top = (r.top + window.pageYOffset) + "px";
    fig.style.left = (r.left + window.pageXOffset) + "px";
    world.appendChild(fig);
  }

  var cards = [];
  var base = docRect(sections[0]);
  CONFIG.cards.forEach(function(cfg, ci){
    var fig = el("figure", P + "__card", "width:" + cfg.width + ";transform:rotate(" + cfg.rot + "deg)");
    fig.dataset.rot = cfg.rot;

    if (cfg.imgs && cfg.imgs.length){
      var gal = el("div", "mc-gal");
      var n = cfg.imgs.length;
      if (n > 1){
        var slot = cfg.slot || 1;
        var fondu = 0.7;
        var Tn = n * slot, q = 100 / n, ph = (fondu / Tn) * 100;
        var kf = "byq-mc-fade-" + ci;
        var st = document.createElement("style");
        st.textContent = "@keyframes " + kf + "{0%{opacity:0}" + ph.toFixed(2) + "%{opacity:1}"
          + q.toFixed(2) + "%{opacity:1}" + (q + ph).toFixed(2) + "%{opacity:0}100%{opacity:0}}";
        document.head.appendChild(st);
        cfg.imgs.forEach(function(u, i){
          var g = el("img", "mc-shot");
          g.src = /^https?:\/\//.test(u) ? u : (cfg.base || "") + u;
          g.alt = i === 0 ? cfg.caption : "";
          g.loading = "lazy";
          g.style.animation = kf + " " + Tn + "s linear infinite";
          g.style.animationDelay = (i * slot) + "s";
          gal.appendChild(g);
        });
      } else {
        var only = el("img", "mc-shot");
        only.src = /^https?:\/\//.test(cfg.imgs[0]) ? cfg.imgs[0] : (cfg.base || "") + cfg.imgs[0];
        only.alt = cfg.caption;
        only.loading = "lazy";
        gal.appendChild(only);
      }
      fig.appendChild(gal);
             } else if (cfg.video){
      /* v10m : carte vidéo — muette, boucle, autoplay,
         ratio réel de la vidéo appliqué dès les métadonnées */
      var v = el("video", "mc-video");
      v.muted = true;
      v.loop = true;
      v.autoplay = true;
      v.playsInline = true;
      v.setAttribute("muted", "");
      v.setAttribute("autoplay", "");
      v.setAttribute("loop", "");
      v.setAttribute("playsinline", "");
      v.preload = "auto";
      v.src = cfg.video;
      v.addEventListener("loadedmetadata", function(){
        v.style.aspectRatio = v.videoWidth + " / " + v.videoHeight;
      });
      v.addEventListener("canplay", function(){ v.play().catch(function(){}); });
      fig.appendChild(v);

    } else if (cfg.img){
      var im = el("img", "mc-shot");
      im.src = cfg.img;
      im.alt = cfg.caption;
      fig.appendChild(im);
    } else {
      fig.appendChild(el("div", "mc-ph"));
    }


    var cap = el("figcaption");
    cap.textContent = cfg.caption;
    fig.appendChild(cap);
    var frame = el("span", P + "__frame");
    frame.innerHTML = "<i></i><i></i><i></i><i></i><b></b>";
    fig.appendChild(frame);
    fig._dims = frame.querySelector("b");
    fig._pos = { leftPct: parseFloat(cfg.left) / 100, topPct: parseFloat(cfg.top) / 100 };
    world.appendChild(fig);
    cards.push(fig);
  });

  var note = el("div", P + "__note", "transform:rotate(" + CONFIG.note.rot + "deg)");
  note.dataset.rot = CONFIG.note.rot;
  note.innerHTML = "<p>\u2714 Des solutions<br><span>durables.</span></p>";
  note._pos = { leftPct: parseFloat(CONFIG.note.left) / 100, topPct: parseFloat(CONFIG.note.top) / 100 };
  world.appendChild(note);
  cards.push(note);
  var noteSpan = note.querySelector("span");

  function positionAll(){
    if (!worldEl()) return;
    var b = docRect(sections[0]);
    cards.forEach(function(f){
      if (!f._pos || f._moved) return;
      f.style.left = (b.l + b.w * f._pos.leftPct) + "px";
      f.style.top = (b.t + b.h * f._pos.topPct) + "px";
    });
  }
  function markMoved(fig){ fig._moved = true; }

    /* ecouteurs window : load/resize enregistres une seule fois ;
     le positionnement, lui, est JOUE A CHAQUE demarrage du moteur */
  if (!ST.winBound){
    ST.winBound = true;
    window.addEventListener("load", function(){ if (worldEl()) positionAll(); });
    window.addEventListener("resize", function(){ if (worldEl()) positionAll(); });
  }
  /* v9q : positionnement a chaque boot — sinon les cartes restent en 0,0
     apres une reactivation AJAX (load/resize ne se reproduisent pas) */
  positionAll();
  addT(setTimeout(function(){ if (worldEl()) positionAll(); }, 300));
  addT(setTimeout(function(){ if (worldEl()) positionAll(); }, 1000));


  /* ====== blocs natifs mc-arrow : reutilisables entre les sessions ====== */
  document.querySelectorAll(".mc-arrow").forEach(function(node){
    if (node._mcCard && node._dims) { cards.push(node); return; }
    if (!node._origParent){
      node._origParent = node.parentNode;
      node._origNext = node.nextSibling;
    }
    node._mcCard = true;
    node.dataset.rot = 0;
    if (!node._dims){
      var frame = el("span", P + "__frame");
      frame.innerHTML = "<i></i><i></i><i></i><i></i><b></b>";
      node.appendChild(frame);
      node._dims = frame.querySelector("b");
    }
    if (getComputedStyle(node).position === "static"){
      node.style.position = "relative";
    }
    cards.push(node);
  });

  /* ====== galeries natives : un seul enregistrement par noeud ====== */
  var galleries = [];
  function imgUrl(u){
    return /^https?:\/\//.test(u) ? u : (CONFIG.gallery.base || "") + u;
  }
  function galHolder(g){
    return g.im.closest(".is-content") || g.im.closest(".smp-image") || g.im.parentElement;
  }
  sections.forEach(function(sec){
    sec.querySelectorAll(".mc-gallery").forEach(function(node){
      var im = node.tagName === "IMG" ? node : node.querySelector("img");
      if (!im) return;
      if (!node._gal){
        node._gal = { node: node, im: im, orig: im.src, i: 0, timer: null, on: false, busy: false };
        node.addEventListener("mouseenter", function(){ galStart(node._gal, ""); });
        node.addEventListener("mouseleave", function(){ galStop(node._gal); });
      }
      galleries.push(node._gal);
    });
  });
  function galStart(g, color){
    if (g.on || !CONFIG.gallery.imgs.length) return;
    g.on = true;
    var border = galHolder(g);
    border.style.borderColor = color || "#040404";
    g.timer = addT(setInterval(function(){
      g.i = (g.i + 1) % CONFIG.gallery.imgs.length;
      g.im.src = imgUrl(CONFIG.gallery.imgs[g.i]);
    }, CONFIG.gallery.speed || 220));
  }
  function galStop(g){
    if (!g.on) return;
    g.on = false;
    clearInterval(g.timer); g.timer = null;
    g.im.src = g.orig;
    var border = galHolder(g);
    border.style.borderColor = "transparent";
  }

  var ARROW = '<svg class="' + P + '__arrow" viewBox="0 0 20 22"><path d="M2 1.6 L2 17.4 L6.25 13.45 L9.1 19.9 L12.05 18.6 L9.25 12.3 L15.1 11.9 Z"/></svg>';
    var people = [
    { name: "Designer UX/UI", color: "#a259ff", g: 0, phrases: ["Disponible", "collaborer"], lines: ["Wireframes", "design mobile-first \u2726", "Tests users"] },
    { name: "Builder No-Code", color: "#1abcfe", g: 0, phrases: ["nouveaux projets"], lines: ["CMS", "responsive \u2713", "SEO"] },
    { name: "Dev Scraper", color: "#0acf83", g: 4, phrases: ["veille quotidienne", "technologies"], lines: ["API", "RPA", "JSON"] },
    { name: "Agent IA", color: "#ff7262", g: 4, phrases: ["solutions qui durent.", "IA."], lines: ["LLMs", "Chatbots", "Ultrathink"] }
  ];

  var actors = [];
     function makeCursor(p, idx){
    var node = el("div", P + "__cursor");
    node.style.setProperty("--c", p.color);
    node.innerHTML = ARROW
      + '<div class="' + P + '__tag"><span class="mc-nm">' + p.name + '</span><span class="' + P + '__msg"></span></div>';
    curLayer.appendChild(node);
    var c = { node: node, msg: node.querySelector("." + P + "__msg"), lines: p.lines, color: p.color, x: 60, y: 60, chatId: 0 };
    /* v10 : chaque profil entre par un coin de la section (100vh) */
    var u = bounds();
    var coins = [
      [u.l + 30, u.t + 30],   /* 0 : haut gauche  */
      [u.r - 70, u.t + 30],   /* 1 : haut droit   */
      [u.l + 30, u.b - 90],   /* 2 : bas gauche   */
      [u.r - 70, u.b - 90]    /* 3 : bas droit    */
    ];
    var k = coins[(idx || 0) % 4];
    node.style.transition = "none";      /* pose sans glisser depuis 0,0 */
    place(c, k[0], k[1]);
    void node.offsetWidth;               /* force le reflow */
    node.style.transition = "";
    actors.push(c);
    return c;
  }



  function place(c, x, y, noClamp){
    if (noClamp){
      c.x = x; c.y = y;
    } else {
      var u = bounds();
      c.x = clamp(x, u.l + 20, u.r - 60);
      c.y = clamp(y, u.t + 20, u.b - 80);
    }
    c.node.style.transform = "translate(" + c.x + "px," + c.y + "px)";
  }

  people.forEach(function(p, idx){
        var c = makeCursor(p, idx);
    function tick(){
      if (!worldEl() || !onScreen || drag) return; /* moteur detruit : stop */
      var u = bounds();
      var roll = Math.random();
      if (roll < .40){
        var spans = find(groups[p.g] || [], pick(p.phrases));
        if (!spans) return;
        var t = rectsFor(spans)[0];
        place(c, t.x + t.w + 8, t.y + t.h - 20);
        addT(setTimeout(function(){
          if (!worldEl() || !onScreen) return;
          drawSel(spans, p.color);
          if (Math.random() < .4) say(c, pick(c.lines));
        }, 1700));
      } else if (roll < .56){
        var x = u.l + (u.r - u.l) * (.55 + Math.random() * .35);
        var y = u.t + (u.b - u.t) * (.2 + Math.random() * .55);
        place(c, x, y);
        addT(setTimeout(function(){ if (worldEl() && onScreen) burst(x, y); }, 1700));
      } else if (roll < .72){
        var libre = cards.filter(function(f){ return !f._mcBusy && f.offsetWidth > 0; });
        if (!libre.length) return;
        var fig = pick(libre);
        var fr = fig.getBoundingClientRect();
        place(c, fr.left + window.pageXOffset + fr.width / 2,
                fr.top + window.pageYOffset + fr.height / 2, true);
        addT(setTimeout(function(){
          if (drag || fig._mcBusy || !worldEl() || !onScreen) return;
          fig._mcBusy = true;
          fig.classList.remove("held-by-you");
          fig.style.setProperty("--c", c.color);
          fig.classList.add("is-held", "is-selected");
          if (fig._dims) fig._dims.textContent = Math.round(fig.offsetWidth) + " \u00d7 " + Math.round(fig.offsetHeight);
          fig.style.zIndex = ++zTop;
          fig.style.transition = "transform 1.6s cubic-bezier(.6,.05,.2,1), box-shadow .3s";
          c.node.classList.add("is-down");
          toWorld(fig);
          markMoved(fig);
          var fr2 = fig.getBoundingClientRect();
          place(c, fr2.left + window.pageXOffset + fr2.width / 2,
                  fr2.top + window.pageYOffset + fr2.height / 2, true);
          var lim = clamp(fig.offsetWidth * 0.1, 10, 34);
          var dx = (Math.random() < .35 ? rand(-4, 4) : rand(-lim, lim));
          var dy = (Math.random() < .35 ? rand(-4, 4) : rand(-lim * .8, lim * .8));
          var rot0 = parseFloat(fig.dataset.rot) || 0;
          place(c, c.x + dx, c.y + dy, true);
          fig.style.transform = "rotate(" + (rot0 - 1.5).toFixed(1) + "deg) translate(" + dx.toFixed(0) + "px," + dy.toFixed(0) + "px)";
          say(c, pick(c.lines));
          addT(setTimeout(function(){
            fig._mcBusy = false;
            if (drag && drag.fig === fig){
              c.node.classList.remove("is-down");
              return;
            }
            fig.classList.remove("is-held");
            fig.style.transition = "";
            fig.style.transform = "rotate(" + (Math.random() * 6 - 3).toFixed(1) + "deg)";
            c.node.classList.remove("is-down");
            addT(setTimeout(function(){
              if (!fig._mcBusy && (!drag || drag.fig !== fig)) fig.classList.remove("is-selected");
            }, 1100));
          }, 1900));
        }, 1700));
      } else if (roll < .82){
        var dispo = galleries.filter(function(g){ return !g.busy && g.im.offsetWidth > 0; });
        if (!dispo.length) return;
        var gg = pick(dispo);
        var gr = gg.im.getBoundingClientRect();
        place(c, gr.left + window.pageXOffset + rand(.3, .7) * gr.width,
                gr.top + window.pageYOffset + rand(.3, .7) * gr.height);
        addT(setTimeout(function(){
          if (!worldEl() || !onScreen || gg.busy) return;
          gg.busy = true;
          c.node.classList.add("is-down");
          galStart(gg, c.color);
          say(c, pick(c.lines));
          addT(setTimeout(function(){
            galStop(gg);
            gg.busy = false;
            c.node.classList.remove("is-down");
          }, 2600));
        }, 1700));
      } else if (Math.random() < .5){
        if (note._typing || !noteSpan) return;
        var nfr = note.getBoundingClientRect();
        var ndl = nfr.left + window.pageXOffset, ndt = nfr.top + window.pageYOffset;
        place(c, ndl + nfr.width * rand(.55, .85), ndt + nfr.height * .6);
        addT(setTimeout(function(){
          if (!worldEl() || !onScreen || note._typing) return;
          note._typing = true;
          c.node.classList.add("is-down");
          var caret = el("i", P + "__caret");
          caret.style.setProperty("--c", c.color);
          caret.style.setProperty("background", c.color, "important");
          noteSpan.after(caret);

          var others = CONFIG.noteWords.filter(function(w){ return w !== noteSpan.textContent; });
          var target = pick(others.length ? others : CONFIG.noteWords);
          if (Math.random() < .5) say(c, pick(c.lines));
          var del = addT(setInterval(function(){
            var cur = noteSpan.textContent;
            if (cur.length){
              noteSpan.textContent = cur.slice(0, -1);
            } else {
              clearInterval(del);
              var k = 0;
              var add = addT(setInterval(function(){
                noteSpan.textContent = target.slice(0, ++k);
                if (k >= target.length){
                  clearInterval(add);
                  addT(setTimeout(function(){
                    if (caret.parentNode) caret.remove();
                    c.node.classList.remove("is-down");
                    note._typing = false;
                  }, 900));
                }
              }, rand(60, 140)));
            }
          }, rand(40, 90)));
        }, 1700));
      } else {
        var u2 = bounds();
        place(c, u2.l + 30 + Math.random() * (u2.r - u2.l - 90), u2.t + 30 + Math.random() * (u2.b - u2.t - 90));
      }
    }
    addT(setInterval(tick, 4200 + idx * 900));
    addT(setTimeout(tick, 1200 + idx * 700));
  });

  function rectsFor(spans){
    return spans.map(function(s){
      var r = s.getBoundingClientRect();
      return { x: r.left + window.pageXOffset, y: r.top + window.pageYOffset, w: r.width, h: r.height };
    });
  }

  var you = (function(){
    var node = el("div", P + "__cursor mc-you is-hidden");
    node.style.setProperty("--c", "var(--byq-fg)");
    node.innerHTML = ARROW + '<div class="' + P + '__tag"><span class="mc-nm">Vous</span><span class="' + P + '__msg"></span></div>';
    curLayer.appendChild(node);
    return { node: node, msg: node.querySelector("." + P + "__msg"), chatId: 0 };
  })();

  function insideAnySection(e){
    return sections.some(function(s){
      var r = s.getBoundingClientRect();
      return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    });
  }

  function youOff(){
    if (!youOn) return;
    youOn = false;
    document.body.classList.remove("mc-you-active");
    you.node.classList.add("is-hidden");
    closeChat();
  }

  function replies(text){
    var t = (text || "").toLowerCase();
    if (/\b(hi|hey|hello|bonjour|salam|alex|alexandre)\b/.test(t)) return pick(["Bonjour \u2726 !", "Comment \u00e7a va ?!", "Bienvenue \u2764\uFE0E !"]);
    if (/\b(mail|email|courrier|contact|contacter|joindre|ecrire)\b/.test(t)) return pick(["alexandre.kotob@gmail.com \u2728", "\u00c9crivez-moi : alexandre.kotob@gmail.com \u2764\uFE0E", "Contact : alexandre.kotob@gmail.com, je réponds vite"]);
    if (/\b(merci|thanks)\b/.test(t)) return pick(["Avec plaisir \u2726", "Quand vous voulez \u2764\uFE0E"]);
    if (/\?\s*$/.test(t)) return pick(["Explorez mes projets !", " \u2709 Envoyez moi un mail !", " \u2713 On s'appelle pour en discuter?"]);
    return pick(["\u2726", "\u2713", "\u2605", "\u2733", "J'adore \u2764\uFE0E", "\u2727"]);
  }
  function pokeNearest(x, y, kind, text){
    var sorted = actors.slice().sort(function(a, b){
      return Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y);
    });
    var count = kind === "chat" ? 1 : 2;
    for (var i = 0; i < Math.min(count, sorted.length); i++){
      (function(c){
        if (kind === "chat"){
          var side = x > 190 ? -1 : 1;
          var tx = x + side * (140 + Math.random() * 30) + (side > 0 ? 60 : -60);
          var ty = y + (Math.random() * 50 - 40);
          place(c, tx, ty);
          addT(setTimeout(function(){ if (worldEl() && onScreen) say(c, replies(text), 2200); }, 1700));
        } else {
          var dx = c.x - x, dy = c.y - y, d = Math.hypot(dx, dy) || 1;
          var k = 40 + Math.random() * 18;
          place(c, x + (dx / d) * k, y + (dy / d) * k);
          addT(setTimeout(function(){
            if (!worldEl() || !onScreen) return;
            if (Math.random() < .5){
              burst(x, y);
            } else {
              say(c, pick(["Hey !", "\u2726", "Oui ?", "On va voir les projets?", "\u2713"]));
            }
          }, 1700));
        }
      })(sorted[i]);
    }
    if (sorted[2] && Math.random() < .5){
      addT(setTimeout(function(){ if (worldEl()) say(sorted[2], pick(["\u2726", "ok", "Alors ?"]), 900); }, 900));
    }
  }

  /* ====== ecouteurs document : enregistres via ST.handlers,
     retires avant chaque nouvelle session (jamais dupliques) ====== */
  function bind(type, fn, opts){
    document.addEventListener(type, fn, opts);
    ST.handlers.push([type, fn, opts]);
  }

  function onMove(e){
    if (!worldEl()) return;
    if (e.pointerType !== "mouse") return;
    var dx = e.pageX, dy = e.pageY;
    if (drag){
      drag.fig.style.left = (dx - drag.dx) + "px";
      drag.fig.style.top = (dy - drag.dy) + "px";
    }
    if (insideAnySection(e)){
      mx = dx; my = dy;
      if (!youOn){
        youOn = true;
        document.body.classList.add("mc-you-active");
        you.node.classList.remove("is-hidden");
      }
      you.node.style.transform = "translate(" + dx + "px," + dy + "px)";
    } else if (youOn){
      youOff();
    }
  }

  function onDown(e){
    if (!worldEl()) return;
    if (e.pointerType !== "mouse") return;
    var dx = e.pageX, dy = e.pageY;
    var dansSection = youOn;
    for (var i = cards.length - 1; i >= 0; i--){
      var fig = cards[i];
      if (fig.offsetWidth === 0) continue;
      var fr = fig.getBoundingClientRect();
      if (e.clientX >= fr.left - 6 && e.clientX <= fr.right + 6 && e.clientY >= fr.top - 6 && e.clientY <= fr.bottom + 6){
        toWorld(fig);
        markMoved(fig);
        drag = { fig: fig, dx: dx - (fr.left + window.pageXOffset), dy: dy - (fr.top + window.pageYOffset) };
        fig.classList.remove("held-by-you");
        fig.style.setProperty("--c", "var(--byq-fg)");
        fig.classList.add("is-held", "is-selected", "held-by-you");
        if (fig._dims) fig._dims.textContent = Math.round(fig.offsetWidth) + " \u00d7 " + Math.round(fig.offsetHeight);
        fig.style.zIndex = ++zTop;
        fig.style.transition = "none";
        fig.style.top = (fr.top + window.pageYOffset) + "px";
        fig.style.left = (fr.left + window.pageXOffset) + "px";
        fig.style.transform = "rotate(" + (parseFloat(fig.dataset.rot) || 0) + "deg) scale(1.04)";
        return;
      }
    }
    if (!dansSection) return;
    if (e.target && e.target.closest && e.target.closest("a")) return;
    var rp = el("div", P + "__ripple", "left:" + dx + "px;top:" + dy + "px;");
    fxLayer.appendChild(rp);
    addT(setTimeout(function(){ rp.remove(); }, 750));
    you.node.classList.add("is-down");
    pokeNearest(dx, dy, "ping", "");
  }

  function onUp(){
    if (!worldEl()) return;
    you.node.classList.remove("is-down");
    if (!drag) return;
    var fig = drag.fig;
    drag = null;
    fig.classList.remove("is-held", "held-by-you");
    fig.style.transition = "";
    fig.style.transform = "rotate(" + (Math.random() * 6 - 3).toFixed(1) + "deg)";
    addT(setTimeout(function(){
      if (!fig._mcBusy && (!drag || drag.fig !== fig)) fig.classList.remove("is-selected");
    }, 1100));
  }

  function onCancel(){
    if (!worldEl()) return;
    drag = null;
  }

  function onKey(e){
    if (!worldEl()) return;
    if (e.key !== "/" || !youOn || chatBox) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    e.preventDefault();
    openChat();
  }

  function closeChat(){
    chatBox = null;
    you.node.classList.remove("is-chat");
    you.msg.textContent = "";
  }
  function openChat(){
    you.chatId++;
    you.msg.textContent = "";
    chatBox = document.createElement("input");
    chatBox.type = "text";
    chatBox.maxLength = 48;
    chatBox.placeholder = "On discute ?";
    chatBox.setAttribute("aria-label", "Message du curseur");
    you.msg.appendChild(chatBox);
    you.node.classList.add("is-chat");
    chatBox.focus({ preventScroll: true });
    chatBox.addEventListener("keydown", function(ev){
      ev.stopPropagation();
      if (ev.key === "Escape"){ ev.preventDefault(); closeChat(); }
      if (ev.key === "Enter"){
        ev.preventDefault();
        var text = chatBox.value.trim();
        if (!text) return closeChat();
        chatBox = null;
        you.msg.textContent = text;
        var id = ++you.chatId;
        pokeNearest(mx, my, "chat", text);
        addT(setTimeout(function(){ if (id === you.chatId) you.node.classList.remove("is-chat"); }, 4200));
      }
    });
    chatBox.addEventListener("blur", function(){
      setTimeout(function(){ if (chatBox && document.activeElement !== chatBox) closeChat(); }, 0);
    });
  }

  bind("pointermove", onMove);
  bind("pointerdown", onDown);
  bind("pointerup", onUp);
  bind("pointercancel", onCancel);
  bind("keydown", onKey);

  /* clic vers une page projet : destruction immediate AVANT la transition */
  bind("click", function(e){
    if (!worldEl()) return;
    var a = e.target && e.target.closest ? e.target.closest("a") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (href.indexOf("/projet/") !== -1) destroyAll();
  }, true);

  window.addEventListener("blur", function(){
    if (!worldEl()) return;
    youOff();
    if (drag){ drag = null; }
    galleries.forEach(galStop);
  });

  var obs = new IntersectionObserver(function(ents){
    if (ents.some(function(en){ return en.isIntersecting; })) onScreen = true;
    else onScreen = false;
  }, { threshold: .05 });
  sections.forEach(function(s){ obs.observe(s); });
    /* v9q : notifie les autres embeds que le moteur (re)demarre */
  try { window.dispatchEvent(new CustomEvent("byq:home-reboot")); } catch(e){}


  } /* fin de startEngine */

  /* ====== SURVEILLANCE D'URL : redemarre le moteur au retour sur la home ====== */
  addT(setInterval(function(){
    if (isHomePath()){
      if (!worldEl() && document.querySelector(".mc-hero")){
        if (document.readyState !== "loading") startEngine();
      }
    } else {
      if (worldEl()) destroyAll();
    }
  }, 500));

})();
