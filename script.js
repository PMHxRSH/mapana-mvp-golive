// =====================================================
// MAPANA MVP · Steering Committee · 22 May 2026
// 7-section deck. Section 04 (index 3) is The Climb,
// which runs its own internal 8-stage state machine.
// =====================================================

(() => {

  // ---------- SECTION METADATA ----------
  const SECTIONS = [
    { id: "cover",   name: "Cover" },
    { id: "agenda",  name: "Agenda" },
    { id: "charter", name: "Project Charter" },
    { id: "climb",   name: "The Journey — Key Deliverables" },
    { id: "plan",    name: "All 100% Live" },
    { id: "closing", name: "Wrap-up & Feedback" },
    { id: "thanks",  name: "Thank you" },
  ];
  const CLIMB_INDEX = 3;

  // ---------- CLIMB STAGE DATA ----------
  const STAGES = [
    {
      id: "azure", num: "01", techName: "Azure Setup", title: ["The Field is", "Ready."], tier: "quick",
      tierLabel: "Foundation · Quick delivery", stairName: "Azure — The Field is Ready",
      when: "16 May 2026", whenShort: "T-6 DAYS",
      tagline: "The ground was prepared, the soil ready — the entire production cloud baseline stood up ahead of cutover.",
      bullets: [
        "Production tenant up; networking, identity and secrets in place.",
        "App services, databases and storage validated.",
        "Monitoring, alerts and oncall plumbing armed."
      ],
      doneLabel: "Ground Prepared", fx: "field"
    },
    {
      id: "golive", num: "02", techName: "Production Deployment", title: ["Harvest", "Day."], tier: "achievement",
      tierLabel: "Today · The Launch", stairName: "Production Go-Live",
      when: "22 May 2026 · Today", whenShort: "TODAY · LAUNCH",
      tagline: "Code promoted. Traffic flowing. First production transactions reconciled. The harvest begins.",
      bullets: [
        "All four products live in production.",
        "First live transactions observed and reconciled.",
        "Hyper-care active. War room armed for the first business cycle."
      ],
      doneLabel: "We Are Live", fx: "harvest"
    },
    {
      id: "model-data", num: "03", techName: "Model Data", title: ["Seeds", "Sown."], tier: "done",
      tierLabel: "Today · Pre-launch readiness", stairName: "Model Data",
      when: "22 May 2026 · Earlier today", whenShort: "TODAY · EARLIER",
      tagline: "Every master, every reference, every seed of data — sown clean, ready to grow.",
      bullets: [
        "Master and reference data loaded into production.",
        "Counts and checksums match expected.",
        "Sign-off captured from every data owner."
      ],
      doneLabel: "Sown", fx: "seeds"
    },
    {
      id: "users", num: "04", techName: "User ID Creation", title: ["Hands in", "the Field."], tier: "done",
      tierLabel: "Today · Pre-launch readiness", stairName: "User ID Creation",
      when: "22 May 2026 · Earlier today", whenShort: "TODAY · EARLIER",
      tagline: "Every farmer, every analyst, every lab tech — invited, seated, ready to work.",
      bullets: [
        "Production accounts created across every role band.",
        "SSO, group memberships and role bindings verified.",
        "Credentials dispatched on schedule."
      ],
      doneLabel: "Hands On Deck", fx: "hands"
    },
    {
      id: "api", num: "05", techName: "Integrations & APIs", title: ["Roots", "Connected."], tier: "done",
      tierLabel: "Today · Pre-launch readiness", stairName: "Integrations & APIs",
      when: "22 May 2026 · Earlier today", whenShort: "TODAY · EARLIER",
      tagline: "Mobile to lab, lab to ML, ML back to mobile — connected like roots beneath the soil.",
      bullets: [
        "ML APIs promoted to production and validated under load.",
        "Mobile-to-lab handoff tested end-to-end.",
        "Observability in place — broken contracts page oncall."
      ],
      doneLabel: "Connected", fx: "roots"
    },
    {
      id: "checklist", num: "06", techName: "Pre-Go-Live Checklist", title: ["The", "Inspection."], tier: "done",
      tierLabel: "Today · Pre-launch readiness", stairName: "Pre-Go-Live Checklist",
      when: "22 May 2026 · Earlier today", whenShort: "TODAY · EARLIER",
      tagline: "Every item walked. Every runbook signed. Green at the go-call.",
      bullets: [
        "Smoke tests, backup verification, rollback drill — all green.",
        "Cutover runbook walked through with every owner.",
        "Comms tree, war room and oncall rota armed."
      ],
      doneLabel: "All Green", fx: "checklist"
    },
    {
      id: "handover", num: "07", techName: "Handover Kit", title: ["The Recipe", "Book."], tier: "rigorous",
      tierLabel: "Today · The Rigour Layer", stairName: "Handover Kit — Pre Go Live folder",
      when: "22 May 2026 · Earlier today", whenShort: "TODAY · HANDOVER",
      tagline: "Every page — runbook, owner, escalation path — passed on to the operations team. The Pre Go Live folder is now in their hands.",
      link: { label: "Open Pre Go Live folder", url: "#pre-go-live-folder" },
      bullets: [
        "Procedures, owners and SLAs documented and circulated.",
        "Escalation matrix, on-call rota, war-room protocol packaged.",
        "Kit accepted and counter-signed by operations."
      ],
      doneLabel: "Kit Signed", fx: "book"
    },
    {
      id: "steerco", num: "08", techName: "Steerco Comms", title: ["The", "Gathering."], tier: "achievement",
      tierLabel: "Now · This meeting", stairName: "Steerco Comms",
      when: "22 May 2026 · Now", whenShort: "TODAY · NOW",
      tagline: "This meeting. The moment. Every stage below brought us here.",
      bullets: [
        "The launch story communicated in your language.",
        "Numbers, risks and the next chapter — surfaced.",
        "The next track (Cleanup + Security Review) begins after this call."
      ],
      doneLabel: "The Moment", fx: "gathering"
    }
  ];

  // ---------- EFFORT ANIMATIONS (agri / food-sensory) ----------
  const FX = {
    // Soil horizon being drawn with a sun rising
    field: () => `
      <svg class="fx-field" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
        <circle class="sun" cx="240" cy="120" r="28"/>
        <g class="sun-rays" transform="translate(240 120)">
          <line x1="0" y1="-44" x2="0" y2="-58"/>
          <line x1="32" y1="-32" x2="42" y2="-42"/>
          <line x1="44" y1="0" x2="58" y2="0"/>
          <line x1="32" y1="32" x2="42" y2="42"/>
          <line x1="-32" y1="-32" x2="-42" y2="-42"/>
          <line x1="-44" y1="0" x2="-58" y2="0"/>
        </g>
        <path class="soil" d="M0 170 Q80 162 160 170 T320 170" style="animation-delay:0s"/>
        <path class="soil" d="M0 200 Q80 192 160 200 T320 200" style="animation-delay:.2s"/>
        <path class="soil" d="M0 230 Q80 222 160 230 T320 230" style="animation-delay:.4s"/>
        <path class="soil" d="M0 260 Q80 252 160 260 T320 260" style="animation-delay:.6s"/>
        ${Array.from({length: 18}).map((_, i) => {
          const x = 12 + i * 17, y = 280 + (i % 3) * 6;
          return `<circle class="grain" cx="${x}" cy="${y}" r="2" style="animation-delay:${(i % 6) * 0.15}s"/>`;
        }).join("")}
      </svg>`,
    // A wheat-stalk growing from seedling to full plant with grain heads
    harvest: () => `
      <svg class="fx-harvest" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
        <line class="ground" x1="40" y1="270" x2="280" y2="270"/>
        <g class="plant" transform="translate(160 270)">
          <path class="stalk" d="M0 0 L0 -160"/>
          <g class="leaf" style="animation-delay:.2s">
            <path d="M0 -60 q-30 -16 -50 -8 q14 14 50 8 z"/>
            <path d="M0 -60 q30 -16 50 -8 q-14 14 -50 8 z"/>
          </g>
          <g class="leaf" style="animation-delay:.4s">
            <path d="M0 -100 q-34 -18 -54 -10 q14 16 54 10 z"/>
            <path d="M0 -100 q34 -18 54 -10 q-14 16 -54 10 z"/>
          </g>
          <g class="grain-head" style="animation-delay:.7s">
            <ellipse cx="-10" cy="-150" rx="6" ry="10"/>
            <ellipse cx="0"   cy="-160" rx="6" ry="10"/>
            <ellipse cx="10"  cy="-150" rx="6" ry="10"/>
            <ellipse cx="-6"  cy="-138" rx="5" ry="8"/>
            <ellipse cx="6"   cy="-138" rx="5" ry="8"/>
          </g>
        </g>
      </svg>`,
    // Seed dots falling into soil with sprouts popping up
    seeds: () => {
      const seeds = Array.from({length: 8}).map((_, i) => {
        const x = 60 + i * 26, delay = i * 0.18;
        return `
          <g style="animation-delay:${delay}s" class="seed-drop">
            <ellipse cx="${x}" cy="60" rx="5" ry="7" />
          </g>
          <path class="sprout" d="M${x} 220 q-6 -16 0 -32 q6 16 0 32 z" style="animation-delay:${delay + 0.5}s"/>
        `;
      }).join("");
      return `
      <svg class="fx-seeds" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
        <rect class="soil-band" x="0" y="220" width="320" height="100"/>
        ${seeds}
      </svg>`;
    },
    // Stick figures fading in around a circle
    hands: () => {
      const n = 8, cx = 160, cy = 170, r = 90;
      const figs = Array.from({length: n}).map((_, i) => {
        const a = (Math.PI * 2 * i) / n - Math.PI / 2;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        return `
          <g class="figure" style="animation-delay:${i * 0.12}s">
            <circle cx="${x}" cy="${y - 8}" r="7"/>
            <path d="M${x - 9} ${y + 16} c0 -8 4 -14 9 -14 s9 6 9 14 v4 h-18 z"/>
          </g>`;
      }).join("");
      return `
      <svg class="fx-hands" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
        <circle class="hub" cx="${cx}" cy="${cy}" r="14"/>
        ${figs}
      </svg>`;
    },
    // Root tendrils spreading outward
    roots: () => `
      <svg class="fx-roots" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
        <rect class="soil-band" x="0" y="90" width="320" height="230"/>
        <circle class="trunk" cx="160" cy="90" r="10"/>
        <path class="root" d="M160 90 q-10 50 -50 90 q-20 14 -40 30" style="animation-delay:0s"/>
        <path class="root" d="M160 90 q-30 40 -60 60 q-30 14 -52 20" style="animation-delay:.15s"/>
        <path class="root" d="M160 90 q0 60 -10 130" style="animation-delay:.3s"/>
        <path class="root" d="M160 90 q0 60 10 130" style="animation-delay:.45s"/>
        <path class="root" d="M160 90 q30 40 60 60 q30 14 52 20" style="animation-delay:.6s"/>
        <path class="root" d="M160 90 q10 50 50 90 q20 14 40 30" style="animation-delay:.75s"/>
        <path class="root" d="M160 90 q-20 30 -34 70" style="animation-delay:.9s"/>
        <path class="root" d="M160 90 q20 30 34 70" style="animation-delay:1.05s"/>
      </svg>`,
    // Checklist drawn line by line with checkmarks (sage/orange palette)
    checklist: () => {
      const n = 5;
      return `<svg class="fx-checklist" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
        ${Array.from({length: n}).map((_, i) => `
          <g style="opacity:0; animation: fade-spawn 0.4s ease forwards; animation-delay:${i * 0.32}s">
            <rect class="box" x="50" y="${60 + i * 44}" width="26" height="26" rx="5"/>
            <path class="check" d="M55 ${74 + i * 44} l7 7 l14 -16" style="animation-delay:${i * 0.32 + 0.2}s"/>
            <rect class="line-fill" x="92" y="${70 + i * 44}" width="180" height="8" rx="3"/>
          </g>`).join("")}
      </svg>`;
    },
    // Open book with pages and bookmark
    book: () => `
      <svg class="fx-book" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
        <g class="book-shadow"><ellipse cx="160" cy="252" rx="110" ry="8"/></g>
        <g class="book">
          <path class="page page-left" d="M160 80 L60 100 L60 240 L160 220 Z"/>
          <path class="page page-right" d="M160 80 L260 100 L260 240 L160 220 Z"/>
          <line class="spine" x1="160" y1="80" x2="160" y2="220"/>
          ${Array.from({length: 5}).map((_, i) => `
            <line class="text-line" x1="74" y1="${122 + i * 18}" x2="146" y2="${118 + i * 18}" style="animation-delay:${i * 0.15}s"/>
            <line class="text-line" x1="174" y1="${118 + i * 18}" x2="246" y2="${122 + i * 18}" style="animation-delay:${i * 0.15 + 0.08}s"/>
          `).join("")}
          <path class="bookmark" d="M210 80 L210 140 L222 130 L234 140 L234 80 Z"/>
        </g>
      </svg>`,
    // Warm radial glow with people silhouettes facing in
    gathering: () => {
      const figs = Array.from({length: 6}).map((_, i) => {
        const x = 40 + i * 48;
        return `
          <g class="g-figure" style="animation-delay:${i * 0.12}s">
            <circle cx="${x}" cy="248" r="9"/>
            <path d="M${x - 12} 280 c0 -10 6 -17 12 -17 s12 7 12 17 v6 h-24 z"/>
          </g>`;
      }).join("");
      return `
      <svg class="fx-gathering" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
        <circle class="glow glow-3" cx="160" cy="150" r="110"/>
        <circle class="glow glow-2" cx="160" cy="150" r="80"/>
        <circle class="glow glow-1" cx="160" cy="150" r="50"/>
        <circle class="glow-core" cx="160" cy="150" r="22"/>
        ${figs}
      </svg>`;
    }
  };

  // ---------- DOM ----------
  const deck = document.getElementById("deck");
  const slides = Array.from(deck.querySelectorAll(".slide"));
  const footSecNum = document.getElementById("footSecNum");
  const footSecName = document.getElementById("footSecName");
  const sectionDots = document.getElementById("sectionDots");

  // Climb-section DOM
  const stairs = document.getElementById("staircase");
  const stage = document.getElementById("stage");
  const stageNum = document.getElementById("stageNum");
  const stagePill = document.getElementById("stagePill");
  const stageTitle = document.getElementById("stageTitle");
  const stageTechName = document.getElementById("stageTechName");
  const stageTagline = document.getElementById("stageTagline");
  const stageWhen = document.getElementById("stageWhen");
  const stageBullets = document.getElementById("stageBullets");
  const stateLabel = document.getElementById("stateLabel");
  const effort = document.getElementById("effort");
  const doneLabel = document.getElementById("doneLabel");
  const curIdx = document.getElementById("curIdx");
  const totIdx = document.getElementById("totIdx");
  const barFill = document.getElementById("barFill");

  // ---------- STATE ----------
  let secIdx = 0;
  let stageIdx = 0;
  let climbState = "enter"; // enter | work | done | wait
  let workTimer = null;
  let doneTimer = null;
  let canAdvanceClimb = false;
  let climbStageHistory = []; // tracks which stages have been pushed to staircase

  totIdx.textContent = String(STAGES.length).padStart(2, "0");

  // ---------- DOT INDICATORS ----------
  SECTIONS.forEach((s, i) => {
    const b = document.createElement("button");
    b.className = "section-dot" + (i === 0 ? " active" : "");
    b.setAttribute("aria-label", `Go to section ${i + 1}: ${s.name}`);
    b.addEventListener("click", () => goToSection(i));
    sectionDots.appendChild(b);
  });

  function updateFooter() {
    footSecNum.textContent = `${String(secIdx + 1).padStart(2, "0")} / ${String(SECTIONS.length).padStart(2, "0")}`;
    footSecName.textContent = SECTIONS[secIdx].name;
    Array.from(sectionDots.children).forEach((dot, i) => {
      dot.classList.toggle("active", i === secIdx);
      dot.classList.toggle("complete", i < secIdx);
    });
    // Toggle on-dark class on deck so footer + chrome adapts to maroon slides
    const isDark = slides[secIdx].classList.contains("dark");
    deck.classList.toggle("on-dark", isDark);
  }

  // ---------- SECTION NAVIGATION ----------
  function goToSection(target) {
    if (target < 0 || target >= SECTIONS.length) return;
    if (target === secIdx) return;

    slides[secIdx].classList.remove("active");
    secIdx = target;
    slides[secIdx].classList.add("active");
    updateFooter();

    if (secIdx === CLIMB_INDEX) {
      // Reset climb on re-entry (so it always starts fresh)
      resetClimb();
    }
  }

  function nextSection() { goToSection(secIdx + 1); }
  function prevSection() { goToSection(secIdx - 1); }

  // ---------- CLIMB: STAGE RENDERING ----------
  function ensureStairAtIndex(i) {
    if (stairs.querySelector(`.stair[data-stage="${i}"]`)) return;
    const s = STAGES[i];
    const stair = document.createElement("div");
    stair.className = "stair";
    stair.dataset.stage = String(i);
    stair.dataset.tier = s.tier;
    stair.dataset.state = "active";
    stair.innerHTML = `
      <div class="stair-num">${s.num}</div>
      <div class="stair-body">
        <div class="stair-name">${s.stairName}</div>
        <div class="stair-when">${s.whenShort}</div>
      </div>
      <div class="stair-check">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/></svg>
      </div>
    `;
    stairs.appendChild(stair);
    setTimeout(() => { stairs.scrollTop = 0; }, 100);
  }

  function markStairDone(i) {
    const stair = stairs.querySelector(`.stair[data-stage="${i}"]`);
    if (!stair) return;
    stair.dataset.state = "done";
    const check = stair.querySelector(".stair-check");
    if (!check) return;
    const tier = stair.dataset.tier;
    if (tier === "next") {
      check.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;
    } else {
      check.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg>`;
    }
  }

  function renderStage(i) {
    const s = STAGES[i];
    canAdvanceClimb = false;
    climbState = "enter";
    stage.dataset.tier = s.tier;
    stage.dataset.state = "enter";

    // Clouds only appear on the final stage (Steerco Comms — the gathering)
    const cn = document.querySelector(".coming-next.clouds");
    if (cn) cn.classList.toggle("visible", i === STAGES.length - 1);

    ensureStairAtIndex(i);

    stageNum.textContent = `STAGE ${String(i + 1).padStart(2, "0")} / ${String(STAGES.length).padStart(2, "0")}`;
    stagePill.textContent = s.tierLabel;
    stageWhen.textContent = s.when;
    stageTitle.innerHTML = `${s.title[0]} <span class="accent">${s.title[1]}</span>`;
    if (stageTechName) stageTechName.textContent = s.techName || "";
    stageTagline.textContent = s.tagline;
    doneLabel.textContent = s.doneLabel;

    // Optional inline link (e.g. Pre Go Live folder for Handover stage)
    const existingLink = document.getElementById("stageLink");
    if (existingLink) existingLink.remove();
    if (s.link) {
      const a = document.createElement("a");
      a.id = "stageLink";
      a.className = "stage-link";
      a.href = s.link.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML = `${s.link.label} <span aria-hidden="true">&rarr;</span>`;
      stageTagline.insertAdjacentElement("afterend", a);
    }

    stageBullets.innerHTML = s.bullets.map(b => `
      <li>
        <span class="tick">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg>
        </span>
        <span>${b}</span>
      </li>
    `).join("");

    effort.innerHTML = FX[s.fx] ? FX[s.fx]() : "";

    if (s.tier === "next") {
      stateLabel.textContent = "Scheduled — Working on next";
    } else if (s.tier === "achievement") {
      stateLabel.textContent = "This meeting · live";
    } else {
      stateLabel.textContent = "Work in progress";
    }

    curIdx.textContent = String(i + 1).padStart(2, "0");
    barFill.style.width = `${((i + 1) / STAGES.length) * 100}%`;

    clearTimeout(workTimer);
    clearTimeout(doneTimer);

    requestAnimationFrame(() => {
      setTimeout(() => {
        stage.dataset.state = "work";
        climbState = "work";

        workTimer = setTimeout(() => {
          stage.dataset.state = "done";
          climbState = "done";
          stateLabel.textContent = s.tier === "achievement" ? "The moment captured" : "Work done";
          markStairDone(i);
          doneTimer = setTimeout(() => {
            stage.dataset.state = "wait";
            climbState = "wait";
            canAdvanceClimb = true;
          }, 600);
        }, 1800);
      }, 400);
    });
  }

  function pushToStaircase(s) {
    const stairTier = s.tier;
    const stair = document.createElement("div");
    stair.className = "stair";
    stair.dataset.tier = stairTier;
    stair.innerHTML = `
      <div class="stair-num">${s.num}</div>
      <div class="stair-body">
        <div class="stair-name">${s.stairName}</div>
        <div class="stair-when">${s.whenShort}</div>
      </div>
      <div class="stair-check">
        ${stairTier === "next"
          ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`
          : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg>`}
      </div>
    `;
    stairs.appendChild(stair);
    setTimeout(() => { stairs.scrollTop = 0; }, 100);
  }

  function advanceClimb() {
    if (!canAdvanceClimb) return false;
    climbStageHistory.push(stageIdx);
    stageIdx++;
    if (stageIdx >= STAGES.length) {
      // Climb finished — staircase shows everything. Don't auto-advance section yet;
      // user presses SPACE one more time to move to next section.
      canAdvanceClimb = true;  // Allow one more press to leave the section
      stage.dataset.state = "wait";
      stateLabel.textContent = "The Journey is complete · press SPACE to continue";
      return true;
    }
    renderStage(stageIdx);
    return true;
  }

  function retreatClimb() {
    if (stageIdx === 0) return false;
    const last = stairs.lastElementChild;
    if (last) last.remove();
    climbStageHistory.pop();
    stageIdx--;
    renderStage(stageIdx);
    return true;
  }

  function resetClimb() {
    stairs.innerHTML = "";
    climbStageHistory = [];
    stageIdx = 0;
    renderStage(0);
  }

  // ---------- TOP-LEVEL ADVANCE / RETREAT ----------
  function advance() {
    if (secIdx === CLIMB_INDEX) {
      // Inside the climb
      if (stageIdx >= STAGES.length) {
        // Climb is done — leave section
        nextSection();
        return;
      }
      const handled = advanceClimb();
      if (!handled) return;
      return;
    }
    nextSection();
  }

  function retreat() {
    if (secIdx === CLIMB_INDEX) {
      if (stageIdx === 0) {
        prevSection();
        return;
      }
      retreatClimb();
      return;
    }
    prevSection();
  }

  function restart() {
    // Reset everything: section 0, climb cleared
    slides[secIdx].classList.remove("active");
    secIdx = 0;
    slides[0].classList.add("active");
    updateFooter();
    resetClimb();
  }

  // ---------- INPUT ----------
  document.addEventListener("keydown", (e) => {
    const k = e.key;
    if (k === " " || k === "Enter" || k === "ArrowRight" || k === "PageDown") {
      e.preventDefault();
      advance();
    } else if (k === "ArrowLeft" || k === "PageUp" || k === "Backspace") {
      e.preventDefault();
      retreat();
    } else if (k === "Home") {
      e.preventDefault();
      goToSection(0);
    } else if (k === "End") {
      e.preventDefault();
      goToSection(SECTIONS.length - 1);
    } else if (k === "r" || k === "R") {
      e.preventDefault();
      restart();
    } else if (k === "f" || k === "F") {
      e.preventDefault();
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    }
  });

  // Click anywhere (except interactive elements) on stage panel to advance
  document.addEventListener("click", (e) => {
    if (e.target.closest("button, kbd, a")) return;
    // Only on climb section — clicking on other sections doesn't advance
    if (secIdx === CLIMB_INDEX && e.target.closest(".stage-wrap")) {
      advance();
    }
  });

  // ---------- BOOT ----------
  resetClimb();           // initialise stage 0 ready (rendered but hidden until section 5 is active)
  updateFooter();

  // URL hash deep-link: #2 jumps to section 2 (1-indexed), useful for screenshots
  const hash = window.location.hash.replace("#", "");
  if (hash && /^\d+$/.test(hash)) {
    const target = parseInt(hash, 10) - 1;
    if (target >= 0 && target < SECTIONS.length) {
      goToSection(target);
    }
  }
})();
