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

  const slug = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const cardHTML = (p, i, k) => `
      <button class="project" data-index="${i}" data-cat="${esc(p.category)}" style="--d:${(k % 4) * 0.06}s${p.focus ? `;--pos:${esc(p.focus)}` : ""}" aria-label="Ver projeto ${esc(p.title)}">
        <div class="project__media">${p.video ? `<img src="${esc(p.poster || "")}" alt="${esc(p.title)}" loading="lazy" /><span class="project__play" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></span>` : mediaHTML(p, i)}</div>
        ${p.video ? "" : imagesOf(p).length > 1 ? `<span class="project__count" title="${imagesOf(p).length} imagens">${STACK_ICON}${imagesOf(p).length}</span>` : ""}
        <div class="project__info">
          <div><small>${esc(p.category)}</small><h3>${esc(p.title)}</h3></div>
          <span class="project__arrow" aria-hidden="true">↗</span>
        </div>
      </button>`;

  // blocos por tipo de serviço, na ordem de CATEGORIES
  const cats = (window.CATEGORIES || []).filter((c) => projects.some((p) => p.category === c));
  const visibleIdx = [];
  grid.innerHTML = cats
    .map((c) => {
      const items = projects.map((p, i) => [p, i]).filter(([p]) => p.category === c);
      items.forEach(([, i]) => visibleIdx.push(i));
      return `
      <div class="pgroup pgroup--${slug(c)} reveal" id="port-${slug(c)}">
        <h3 class="pgroup__title">${esc(c)} <span>${items.length}</span></h3>
        <div class="pgroup__marquee${items.length < 3 ? " is-static" : ""}">
          <div class="pgroup__track" data-set="${encodeURIComponent(items.map(([p, i], k) => cardHTML(p, i, k)).join(""))}"></div>
        </div>
      </div>`;
    })
    .join("");

  /* Carrosséis com movimento contínuo: o conjunto de cards é repetido até
     cobrir a tela e duplicado; a animação desloca exatamente um conjunto. */
  const SPEED = 38; // pixels por segundo
  const buildMarquees = () => {
    $$(".pgroup__track", grid).forEach((track, g) => {
      const set = decodeURIComponent(track.dataset.set);
      const box = track.parentElement;
      if (box.classList.contains("is-static") || reduceMotion) {
        track.innerHTML = set;
        track.style.animation = "none";
        return;
      }
      track.innerHTML = set;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const setW = track.children.length * (track.children[0].getBoundingClientRect().width + gap);
      const reps = Math.max(1, Math.ceil(box.clientWidth / setW));
      const block = set.repeat(reps);
      const clone = block.replace(/<button class="project"/g, '<button class="project" tabindex="-1" aria-hidden="true"');
      track.innerHTML = block + clone;
      track.style.setProperty("--shift", `${-setW * reps}px`);
      track.style.setProperty("--dur", `${(setW * reps) / SPEED}s`);
      track.style.animationDirection = g % 2 ? "reverse" : "normal";
    });
  };
  buildMarquees();
  let rsz;
  let lastW = innerWidth;
  window.addEventListener("resize", () => {
    clearTimeout(rsz);
    rsz = setTimeout(() => { if (innerWidth !== lastW) { lastW = innerWidth; buildMarquees(); } }, 250);
  });
  // segura o carrossel enquanto o dedo está sobre ele
  grid.addEventListener("touchstart", (e) => e.target.closest(".pgroup__marquee")?.classList.add("is-paused"), { passive: true });
  grid.addEventListener("touchend", (e) => e.target.closest(".pgroup__marquee")?.classList.remove("is-paused"));

  // botões do topo levam até o bloco do serviço
  filtersEl.setAttribute("role", "navigation");
  filtersEl.setAttribute("aria-label", "Ir para o tipo de serviço");
  filtersEl.innerHTML = cats.map((c) => `<a class="filter" href="#port-${slug(c)}">${esc(c)}</a>`).join("");

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
    } else if (p.video) {
      lbImg = 0;
      lbMedia.innerHTML = `<video class="lb-video" src="${esc(p.video)}" ${p.poster ? `poster="${esc(p.poster)}"` : ""} controls autoplay muted loop playsinline></video>`;
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
  const stopLbVideo = () => $$("video", lbMedia).forEach((v) => v.pause());
  $("#lbClose").addEventListener("click", () => { stopLbVideo(); closeModal(lb); });
  $("#lbPrev").addEventListener("click", () => stepLb(-1));
  $("#lbNext").addEventListener("click", () => stepLb(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) { stopLbVideo(); closeModal(lb); } });

  document.addEventListener("keydown", (e) => {
    if (!lb.hidden) {
      if (e.key === "Escape") { stopLbVideo(); closeModal(lb); }
      if (e.key === "ArrowRight") stepAny(1);
      if (e.key === "ArrowLeft") stepAny(-1);
    } else if (nav.classList.contains("is-open") && e.key === "Escape") {
      setMenu(false);
    }
  });

  /* ---------- Depoimentos (conversas de WhatsApp) ---------- */
  const testimonials = window.TESTIMONIALS || [];
  const CHECKS = '<svg viewBox="0 0 18 12" width="16" height="11" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6.5 4.5 10 11 2M7 9.5l.5.5L14 2"/></svg>';
  $("#chats").innerHTML = testimonials
    .map(
      (t, k) => `
      <figure class="chat reveal" style="--d:${k * 0.12}s">
        <figcaption class="chat__head">
          <span class="chat__avatar" aria-hidden="true">${esc((t.segment || "C").charAt(0).toUpperCase())}</span>
          <span><strong>${esc(t.name || "Cliente")}</strong><small>${esc(t.segment || "")}</small></span>
        </figcaption>
        <div class="chat__body">
          ${t.messages
            .map((m) =>
              m.images
                ? `<div class="bubble bubble--media${m.me ? " bubble--me" : ""}" role="img" aria-label="Imagens enviadas ao cliente (borradas para preservar o trabalho)">
                    <div class="bubble__grid">${m.images.map((src, n) => `<span style="background-image:url('${esc(src)}')">${m.more && n === m.images.length - 1 ? `<b>+${m.more}</b>` : ""}</span>`).join("")}</div>
                    <time>${esc(m.time || "")}${m.me ? CHECKS : ""}</time>
                  </div>`
                : `<p class="bubble${m.me ? " bubble--me" : ""}">${esc(m.text)}<time>${esc(m.time || "")}${m.me ? CHECKS : ""}</time></p>`
            )
            .join("")}
        </div>
      </figure>`
    )
    .join("");

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
