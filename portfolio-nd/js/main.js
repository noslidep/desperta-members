/* =========================================================
   ND Soluções Criativas — interações
   (conteúdo e contatos ficam em js/data.js)
   ========================================================= */
(function () {
  "use strict";

  document.documentElement.classList.add("js");
  const cfg = window.SITE_CONFIG || {};
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Preloader ---------- */
  const preloader = $("#preloader");
  const hidePreloader = () => {
    if (!preloader || preloader.classList.contains("is-done")) return;
    preloader.classList.add("is-done");
    document.body.classList.add("is-loaded");
    // Revela o hero logo após o carregamento
    $$(".hero .reveal").forEach((el, i) => setTimeout(() => el.classList.add("is-visible"), 120 * i));
  };
  window.addEventListener("load", () => setTimeout(hidePreloader, 350));
  setTimeout(hidePreloader, 2500); // segurança

  /* ---------- Contatos ---------- */
  const waLink = (msg) => `https://wa.me/${cfg.whatsapp || ""}?text=${encodeURIComponent(msg || "Olá!")}`;
  $$(".js-whatsapp").forEach((a) => {
    a.href = waLink(a.dataset.msg);
    a.target = "_blank";
    a.rel = "noopener";
  });
  $$(".js-email").forEach((a) => (a.href = `mailto:${cfg.email || ""}`));
  $$(".js-instagram").forEach((a) => (a.href = cfg.instagram || "#"));
  $$(".js-phone-label").forEach((el) => (el.textContent = cfg.whatsappLabel || ""));
  $$(".js-email-label").forEach((el) => (el.textContent = cfg.email || ""));
  $$(".js-instagram-label").forEach((el) => (el.textContent = cfg.instagramLabel || ""));
  // dica ao passar o mouse nos ícones de contato
  const tips = { "js-whatsapp": `WhatsApp ${cfg.whatsappLabel || ""}`, "js-email": cfg.email, "js-instagram": cfg.instagramLabel };
  $$(".social").forEach((a) => {
    const key = Object.keys(tips).find((k) => a.classList.contains(k));
    if (key && tips[key]) a.title = tips[key].trim();
  });
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Vídeo do hero ---------- */
  const heroVideo = $("#heroVideo");
  if (heroVideo) {
    const showVideo = () => heroVideo.classList.add("is-ready");
    const dropVideo = () => heroVideo.remove(); // sem vídeo: fica o fundo animado
    if (reduceMotion) {
      heroVideo.removeAttribute("autoplay");
      heroVideo.pause();
    }
    heroVideo.addEventListener("loadeddata", showVideo);
    const sources = $$("source", heroVideo);
    let failed = 0;
    sources.forEach((s) =>
      s.addEventListener("error", () => {
        failed += 1;
        if (failed === sources.length) dropVideo();
      })
    );
    if (heroVideo.readyState >= 2) showVideo();
  }

  /* ---------- Header: fundo ao rolar, esconde ao descer ---------- */
  const header = $("#header");
  const progress = $("#scrollProgress");
  const waFloat = $(".wa-float");
  let lastY = window.scrollY;
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 30);
    header.classList.toggle("is-hidden", y > lastY && y > 400 && !nav.classList.contains("is-open"));
    lastY = y;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (waFloat) waFloat.classList.toggle("is-visible", y > window.innerHeight * 0.6);
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  /* ---------- Menu mobile ---------- */
  const nav = $("#nav");
  const toggle = $("#menuToggle");
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("is-locked", open);
  };
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* ---------- Link ativo no menu ---------- */
  const navLinks = $$('.nav a[href^="#"]:not(.btn)');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navLinks.forEach((a) => {
    const sec = $(a.getAttribute("href"));
    if (sec) sectionObserver.observe(sec);
  });

  /* ---------- Palavras rotativas ---------- */
  const words = $$(".rotator__word");
  if (words.length > 1 && !reduceMotion) {
    let i = 0;
    setInterval(() => {
      const cur = words[i];
      cur.classList.remove("is-active");
      cur.classList.add("is-leaving");
      setTimeout(() => cur.classList.remove("is-leaving"), 700);
      i = (i + 1) % words.length;
      words[i].classList.add("is-active");
    }, 2600);
  }

  /* ---------- Portfólio ---------- */
  const projects = window.PROJECTS || [];
  const grid = $("#portfolioGrid");
  const filtersEl = $("#filters");
  const initials = (t) => t.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  // um trabalho pode ter várias imagens (images: [...]) ou uma só (image: "...")
  const imagesOf = (p) => (Array.isArray(p.images) && p.images.length ? p.images : p.image ? [p.image] : []);
  const STACK_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="7" y="7" width="13" height="13" rx="2"/><path d="M4 16V5a1 1 0 0 1 1-1h11"/></svg>';
  const mediaHTML = (p, i = projects.indexOf(p)) =>
    imagesOf(p).length
      ? `<img src="${esc(imagesOf(p)[0])}" alt="${esc(p.title)}" loading="lazy" />`
      : `<div class="cover" style="--c1:${esc(p.colors?.[0] || "#3a8c7d")};--c2:${esc(p.colors?.[1] || "#0b3b3d")}"><span>${esc(p.cover || String(i + 1).padStart(2, "0"))}</span></div>`;

  grid.innerHTML = projects
    .map(
      (p, i) => `
      <button class="project ${esc(p.size || "")} reveal" data-index="${i}" data-cat="${esc(p.category)}" style="--d:${(i % 3) * 0.08}s" aria-label="Ver projeto ${esc(p.title)}">
        <div class="project__media">${mediaHTML(p, i)}</div>
        ${imagesOf(p).length > 1 ? `<span class="project__count" title="${imagesOf(p).length} imagens">${STACK_ICON}${imagesOf(p).length}</span>` : ""}
        <div class="project__info">
          <div><small>${esc(p.category)}</small><h3>${esc(p.title)}</h3></div>
          <span class="project__arrow" aria-hidden="true">↗</span>
        </div>
      </button>`
    )
    .join("");

  const cats = (window.CATEGORIES || ["Todos"]).filter((c) => c === "Todos" || projects.some((p) => p.category === c));
  filtersEl.innerHTML = cats
    .map((c, i) => `<button class="filter${i === 0 ? " is-active" : ""}" role="tab" aria-selected="${i === 0}" data-filter="${esc(c)}">${esc(c)}</button>`)
    .join("");

  let visibleIdx = projects.map((_, i) => i);
  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    $$(".filter", filtersEl).forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-selected", String(b === btn));
    });
    const f = btn.dataset.filter;
    visibleIdx = [];
    $$(".project", grid).forEach((el) => {
      const show = f === "Todos" || el.dataset.cat === f;
      el.classList.toggle("is-hidden", !show);
      el.classList.remove("is-entering");
      if (show) {
        visibleIdx.push(Number(el.dataset.index));
        void el.offsetWidth; // reinicia a animação
        el.classList.add("is-entering", "is-visible");
      }
    });
  });

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox");
  let lbIndex = 0;
  let lastFocus = null;
  const openModal = (el) => {
    lastFocus = document.activeElement;
    el.hidden = false;
    requestAnimationFrame(() => el.classList.add("is-open"));
    document.body.classList.add("is-locked");
  };
  const closeModal = (el, after) => {
    el.classList.remove("is-open");
    setTimeout(() => {
      el.hidden = true;
      if (after) after();
    }, 400);
    document.body.classList.remove("is-locked");
    if (lastFocus) lastFocus.focus();
  };
  /* Galeria dentro do trabalho aberto */
  let lbImg = 0;
  const lbMedia = $("#lbMedia");
  const showImg = (n) => {
    const imgs = imagesOf(projects[lbIndex]);
    if (imgs.length < 2) return;
    lbImg = Math.max(0, Math.min(n, imgs.length - 1));
    $(".gal__track", lbMedia).style.transform = `translateX(-${lbImg * 100}%)`;
    $$(".gal__dots button", lbMedia).forEach((d, i) => {
      d.classList.toggle("is-active", i === lbImg);
      d.setAttribute("aria-current", i === lbImg ? "true" : "false");
    });
    $(".gal__count", lbMedia).textContent = `${lbImg + 1} / ${imgs.length}`;
    $(".gal__btn--prev", lbMedia).disabled = lbImg === 0;
    $(".gal__btn--next", lbMedia).disabled = lbImg === imgs.length - 1;
  };
  const renderLb = (startAt = 0) => {
    const p = projects[lbIndex];
    const imgs = imagesOf(p);
    if (imgs.length > 1) {
      lbMedia.innerHTML = `
        <div class="gal" aria-roledescription="carrossel" aria-label="Imagens de ${esc(p.title)}">
          <div class="gal__track">${imgs.map((src, i) => `<div class="gal__slide"><img src="${esc(src)}" alt="${esc(p.title)}, imagem ${i + 1} de ${imgs.length}" /></div>`).join("")}</div>
          <span class="gal__count"></span>
          <button class="gal__btn gal__btn--prev" type="button" aria-label="Imagem anterior">‹</button>
          <button class="gal__btn gal__btn--next" type="button" aria-label="Próxima imagem">›</button>
          <div class="gal__dots">${imgs.map((_, i) => `<button type="button" aria-label="Ver imagem ${i + 1}"></button>`).join("")}</div>
        </div>`;
      showImg(startAt < 0 ? imgs.length - 1 : startAt);
    } else {
      lbImg = 0;
      lbMedia.innerHTML = mediaHTML(p);
    }
    $("#lbCat").textContent = `${p.category}${p.client ? " · " + p.client : ""}`;
    $("#lbTitle").textContent = p.title;
    $("#lbDesc").textContent = p.description || "";
  };
  const stepLb = (dir) => {
    const pos = visibleIdx.indexOf(lbIndex);
    lbIndex = visibleIdx[(pos + dir + visibleIdx.length) % visibleIdx.length];
    renderLb(dir < 0 ? -1 : 0);
  };
  // setas do teclado e arrastar: primeiro percorrem as imagens do trabalho, depois passam para o próximo
  const stepAny = (dir) => {
    const n = imagesOf(projects[lbIndex]).length;
    const next = lbImg + dir;
    if (n > 1 && next >= 0 && next < n) showImg(next);
    else stepLb(dir);
  };
  lbMedia.addEventListener("click", (e) => {
    if (e.target.closest(".gal__btn--prev")) showImg(lbImg - 1);
    else if (e.target.closest(".gal__btn--next")) showImg(lbImg + 1);
    else {
      const dot = e.target.closest(".gal__dots button");
      if (dot) showImg($$(".gal__dots button", lbMedia).indexOf(dot));
    }
  });
  let galX = null;
  lbMedia.addEventListener("touchstart", (e) => (galX = e.touches[0].clientX), { passive: true });
  lbMedia.addEventListener("touchend", (e) => {
    if (galX === null) return;
    const dx = e.changedTouches[0].clientX - galX;
    galX = null;
    if (Math.abs(dx) > 40) stepAny(dx < 0 ? 1 : -1);
  });
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".project");
    if (!card) return;
    lbIndex = Number(card.dataset.index);
    renderLb();
    openModal(lb);
    $("#lbClose").focus();
  });
  $("#lbClose").addEventListener("click", () => closeModal(lb));
  $("#lbPrev").addEventListener("click", () => stepLb(-1));
  $("#lbNext").addEventListener("click", () => stepLb(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeModal(lb); });

  /* ---------- Showreel ---------- */
  const vm = $("#videoModal");
  const vmFrame = $("#vmFrame");
  const openShowreel = () => {
    const src = cfg.showreel || "";
    if (/youtube\.com|youtu\.be|vimeo\.com/.test(src)) {
      const url = src + (src.includes("?") ? "&" : "?") + "autoplay=1";
      vmFrame.innerHTML = `<iframe src="${esc(url)}" title="Showreel" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    } else {
      vmFrame.innerHTML = `<video src="${esc(src)}" controls autoplay playsinline></video>`;
    }
    openModal(vm);
    $("#vmClose").focus();
  };
  $("#showreelPlay").addEventListener("click", openShowreel);
  $("#vmClose").addEventListener("click", () => closeModal(vm, () => (vmFrame.innerHTML = "")));
  vm.addEventListener("click", (e) => { if (e.target === vm) closeModal(vm, () => (vmFrame.innerHTML = "")); });

  document.addEventListener("keydown", (e) => {
    if (!lb.hidden) {
      if (e.key === "Escape") closeModal(lb);
      if (e.key === "ArrowRight") stepAny(1);
      if (e.key === "ArrowLeft") stepAny(-1);
    } else if (!vm.hidden && e.key === "Escape") {
      closeModal(vm, () => (vmFrame.innerHTML = ""));
    } else if (nav.classList.contains("is-open") && e.key === "Escape") {
      setMenu(false);
    }
  });

  /* ---------- Depoimentos ---------- */
  const testimonials = window.TESTIMONIALS || [];
  const track = $("#sliderTrack");
  const dots = $("#sliderDots");
  track.innerHTML = testimonials
    .map(
      (t) => `
      <figure class="quote">
        <blockquote>${esc(t.text)}</blockquote>
        <figcaption>
          <span class="quote__avatar">${esc(initials(t.name))}</span>
          <div><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></div>
        </figcaption>
      </figure>`
    )
    .join("");
  dots.innerHTML = testimonials.map((_, i) => `<button aria-label="Depoimento ${i + 1}"${i === 0 ? ' class="is-active"' : ""}></button>`).join("");
  let slide = 0;
  let autoplay;
  const goTo = (n) => {
    if (!testimonials.length) return;
    slide = (n + testimonials.length) % testimonials.length;
    track.style.transform = `translateX(-${slide * 100}%)`;
    $$("button", dots).forEach((d, i) => d.classList.toggle("is-active", i === slide));
  };
  const startAuto = () => {
    clearInterval(autoplay);
    if (!reduceMotion) autoplay = setInterval(() => goTo(slide + 1), 6000);
  };
  $("#sliderPrev").addEventListener("click", () => { goTo(slide - 1); startAuto(); });
  $("#sliderNext").addEventListener("click", () => { goTo(slide + 1); startAuto(); });
  dots.addEventListener("click", (e) => {
    const i = $$("button", dots).indexOf(e.target);
    if (i >= 0) { goTo(i); startAuto(); }
  });
  // arrastar no celular
  let touchX = null;
  track.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  track.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) { goTo(slide + (dx < 0 ? 1 : -1)); startAuto(); }
    touchX = null;
  });
  startAuto();

  /* ---------- Revelação ao rolar + contadores ---------- */
  const animateCount = (el) => {
    const target = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const dur = 1800;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-visible");
      const counter = e.target.querySelector("[data-count]");
      if (counter) animateCount(counter);
      revealObserver.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => {
    if (!el.closest(".hero")) revealObserver.observe(el);
  });
  // escalonar elementos irmãos
  $$(".services__grid, .process__list, .stats").forEach((group) =>
    $$(".reveal", group).forEach((el, i) => el.style.setProperty("--d", `${i * 0.1}s`))
  );
  const processList = $(".process__list");
  if (processList) {
    new IntersectionObserver(([e], obs) => {
      if (e.isIntersecting) { processList.classList.add("is-visible"); obs.disconnect(); }
    }, { threshold: 0.3 }).observe(processList);
  }

  /* ---------- Efeitos de mouse (somente desktop) ---------- */
  if (finePointer && !reduceMotion) {
    // Cursor personalizado
    const cursor = $("#cursor");
    const dot = $("#cursorDot");
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.body.classList.add("has-cursor");
    window.addEventListener("mousemove", (e) => {
      if (!document.body.classList.contains("cursor-moved")) {
        cx = e.clientX; cy = e.clientY;
        document.body.classList.add("cursor-moved");
      }
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    });
    const loop = () => {
      cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener("mouseover", (e) => {
      cursor.classList.toggle("is-hover", !!e.target.closest("a, button, .project, input, select, textarea"));
    });

    // Botões magnéticos
    $$(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });

    // Cartões com inclinação 3D + brilho seguindo o mouse
    $$(".tilt").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
        el.style.transform = `perspective(900px) rotateY(${(px - 0.5) * 10}deg) rotateX(${(0.5 - py) * 10}deg) translateY(-6px)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });

    // Parallax suave no fundo do hero
    const blobs = $(".hero__blobs");
    window.addEventListener("mousemove", (e) => {
      if (!blobs || window.scrollY > window.innerHeight) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      blobs.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* ---------- Formulário → WhatsApp ---------- */
  const form = $("#contactForm");
  const hint = $("#formHint");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    $$("input, select, textarea", form).forEach((f) => {
      const bad = !f.value.trim();
      f.closest(".field").classList.toggle("is-invalid", bad);
      if (bad) ok = false;
    });
    if (!ok) {
      hint.textContent = "Preencha todos os campos, por favor.";
      return;
    }
    const msg = `Olá! Meu nome é ${form.nome.value.trim()}.\nTenho interesse em: ${form.servico.value}.\n\n${form.mensagem.value.trim()}`;
    hint.textContent = "Abrindo o WhatsApp…";
    window.open(waLink(msg), "_blank", "noopener");
    form.reset();
  });
  $$("input, select, textarea", form).forEach((f) =>
    f.addEventListener("input", () => f.closest(".field").classList.remove("is-invalid"))
  );
})();
