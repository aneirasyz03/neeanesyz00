
/* =========================================================
   NEEANESYZ — Cute Princess Interaction Pack
   ========================================================= */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Custom princess cursor
  if (!reduceMotion && matchMedia("(hover:hover) and (pointer:fine)").matches) {
    const cursor = document.createElement("div");
    cursor.className = "nn-cursor";
    cursor.innerHTML = `
      <div class="nn-crown">♕</div>
      <div class="nn-face">
        <span class="nn-eye left"></span>
        <span class="nn-eye right"></span>
        <span class="nn-blush left"></span>
        <span class="nn-blush right"></span>
      </div>
      <span class="nn-sparkle s1">✦</span>
      <span class="nn-sparkle s2">✧</span>
    `;
    document.body.appendChild(cursor);

    let tx = -100, ty = -100, x = -100, y = -100;
    window.addEventListener("mousemove", e => {
      tx = e.clientX; ty = e.clientY;
    }, {passive:true});

    const loop = () => {
      x += (tx-x)*0.22;
      y += (ty-y)*0.22;
      cursor.style.transform = `translate3d(${x-23}px,${y-23}px,0)`;
      requestAnimationFrame(loop);
    };
    loop();

    const interactive = "a,button,input,textarea,select,[role='button'],summary,.btn";
    document.addEventListener("mouseover", e => {
      if (e.target.closest(interactive)) cursor.classList.add("nn-hover");
    });
    document.addEventListener("mouseout", e => {
      if (e.target.closest(interactive)) cursor.classList.remove("nn-hover");
    });

    document.addEventListener("click", e => {
      cursor.classList.remove("nn-click");
      void cursor.offsetWidth;
      cursor.classList.add("nn-click");
      if (!reduceMotion) makeMagic(e.clientX, e.clientY, 9);
    });

    window.addEventListener("mouseout", e => {
      if (!e.relatedTarget) cursor.style.opacity = "0";
    });
    window.addEventListener("mouseover", () => cursor.style.opacity = "1");
  }

  // Rainbow/pastel magic on click
  function makeMagic(cx, cy, count=7){
    const colors = ["#ff8fbe","#c9b6ff","#a9d9ff","#ffe89a","#b9f2d0","#ffb8d2"];
    for(let i=0;i<count;i++){
      const p = document.createElement("span");
      p.className = "nn-particle";
      const angle = (Math.PI*2*i/count) + Math.random()*.35;
      const dist = 22 + Math.random()*35;
      p.style.left = `${cx}px`;
      p.style.top = `${cy}px`;
      p.style.setProperty("--dx", `${Math.cos(angle)*dist}px`);
      p.style.setProperty("--dy", `${Math.sin(angle)*dist}px`);
      p.style.setProperty("--p-color", colors[i % colors.length]);
      document.body.appendChild(p);
      setTimeout(()=>p.remove(),850);
    }
  }

  // Reveal sections/cards as they enter the viewport
  const candidates = document.querySelectorAll(
    "section, .card, .project, .project-card, .skill, .about-card, .contact-card, article"
  );
  candidates.forEach((el,i)=>{
    if (!el.classList.contains("nn-reveal")) {
      el.classList.add("nn-reveal");
      el.style.transitionDelay = `${Math.min((i%5)*70,280)}ms`;
    }
  });

  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("nn-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:.12, rootMargin:"0px 0px -35px"});
    document.querySelectorAll(".nn-reveal").forEach(el=>observer.observe(el));
  } else {
    document.querySelectorAll(".nn-reveal").forEach(el=>el.classList.add("nn-visible"));
  }

  // Smooth navigation even if an existing stylesheet overrides it
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener("click", e=>{
      const id = link.getAttribute("href");
      if(!id || id==="#") return;
      const target = document.querySelector(id);
      if(!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior: reduceMotion ? "auto" : "smooth", block:"start"});
      history.replaceState(null,"",id);
    });
  });

  // Auto-close common mobile nav patterns after clicking a link
  document.querySelectorAll("nav a, .navbar a, .nav-links a, .menu a").forEach(a=>{
    a.addEventListener("click", ()=>{
      document.documentElement.classList.remove("menu-open","nav-open");
      document.body.classList.remove("menu-open","nav-open");
    });
  });

  // Add a tiny "scroll progress" indicator, non-intrusive.
  const progress = document.createElement("div");
  progress.id = "nn-scroll-progress";
  Object.assign(progress.style,{
    position:"fixed",left:"0",top:"0",height:"3px",width:"0%",
    zIndex:"2147483645",pointerEvents:"none",
    background:"linear-gradient(90deg,#ff8fbe,#c9b6ff,#a9d9ff,#ffe89a)",
    transition:"width .08s linear"
  });
  document.body.appendChild(progress);

  const updateProgress = ()=>{
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = max > 0 ? `${(scrollY/max)*100}%` : "0%";
  };
  addEventListener("scroll", updateProgress, {passive:true});
  addEventListener("resize", updateProgress);
  updateProgress();
})();
