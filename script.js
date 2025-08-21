(function () {
  // Dynamically load and render timeline entries
  async function loadTimeline() {
    const container = document.getElementById('timelineConnected');
    if (!container) return;
    try {
      const res = await fetch('data/timeline.json');
      if (!res.ok) throw new Error('Failed to load timeline');
      const timeline = await res.json();
      container.innerHTML = '';
      timeline.forEach(entry => {
        const row = document.createElement('div');
        row.className = 'timeline-entry-connected';
        row.innerHTML = `
          <div class="timeline-year-connected">${entry.year}</div>
          <div class="timeline-dot-connected"></div>
          <div class="timeline-content-connected">
            <div class="timeline-title"><span class="timeline-icon">${entry.icon || ''}</span>${entry.title}</div>
            <div class="timeline-desc">${entry.desc}</div>
          </div>
        `;
        container.appendChild(row);
      });
    } catch (e) {
      container.innerHTML = '<p style="color:var(--danger)">Failed to load timeline.</p>';
    }
  }

  // Dynamically load and render project cards
  async function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    try {
      const res = await fetch('data/projects.json');
      if (!res.ok) throw new Error('Failed to load projects');
      const projects = await res.json();
      grid.innerHTML = '';
      projects.forEach(project => {
        const card = document.createElement('a');
        card.className = 'project card';
        card.href = project.link;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.style.textDecoration = 'none';
        card.innerHTML = `
          <div class="project-body">
            <span style="font-size:2rem;line-height:1;vertical-align:middle;">${project.icon ? project.icon : '💡'}</span>
            <h3 style="display:inline-block;vertical-align:middle; margin:0;">${project.title}</h3>
            <br>
            <p style="margin:0; margin-top: 1rem;">${project.desc}</p>
          </div>
        `;
        grid.appendChild(card);
      });
    } catch (e) {
      grid.innerHTML = '<p style="color:var(--danger)">Failed to load projects.</p>';
    }
  }

  // Dynamically load and render technical accounts icons using SVG sprite and icon id
  async function loadAccounts() {
    const grid = document.getElementById('accountsGrid');
    if (!grid) return;

    const res = await fetch('./data/svg.html');
    if (!res.ok) throw new Error('Failed to load accounts');
    let accounts = await res.text();
    accounts = accounts.split('\n')

    grid.innerHTML = '';
    accounts.forEach(account => {
      const a = document.createElement('a');
      a.innerHTML = account
      let svg = a.firstElementChild
      a.href = svg.getAttribute('link');

      a.className = 'account-icon';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      // a.setAttribute('aria-label', account.name);

      a.setAttribute('title', svg.getAttribute('name'));
      svg.setAttribute('width', '40');
      svg.setAttribute('height', '40');

      grid.appendChild(a);
    });

  }
  document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadTimeline();
    loadAccounts();
  });
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const toObserve = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    toObserve.forEach((el) => observer.observe(el));
  } else {
    toObserve.forEach((el) => el.classList.add('visible'));
  }

  const lightbox = document.getElementById('lightbox');
  const closeBtn = lightbox?.querySelector('.lightbox-close');
  const nextBtn = lightbox?.querySelector('.lightbox-next');
  const prevBtn = lightbox?.querySelector('.lightbox-prev');
  const lightboxImg = lightbox?.querySelector('.lightbox-img');
  const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
  let currentIndex = -1;
  let galleryItems = [];

  function openLightbox(src, alt, caption, index = -1) {
    if (!lightbox || !lightboxImg || !lightboxCaption) return;
    lightboxImg.setAttribute('src', src);
    lightboxImg.setAttribute('alt', alt || 'Certificate');
    lightboxCaption.textContent = caption || '';
    lightbox.removeAttribute('hidden');
    currentIndex = index;
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('hidden', '');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', () => step(1));
  if (prevBtn) prevBtn.addEventListener('click', () => step(-1));
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.hasAttribute('hidden')) closeLightbox();
      if (e.key === 'ArrowRight' && !lightbox.hasAttribute('hidden')) step(1);
      if (e.key === 'ArrowLeft' && !lightbox.hasAttribute('hidden')) step(-1);
    });
  }

  function step(delta) {
    if (!galleryItems.length) return;
    currentIndex = (currentIndex + delta + galleryItems.length) % galleryItems.length;
    const { src, alt, caption } = galleryItems[currentIndex];
    openLightbox(src, alt, caption, currentIndex);
  }

  const certGrid = document.querySelector('.cert-grid');
  if (certGrid) {
    galleryItems = Array.from(certGrid.querySelectorAll('figure')).map((fig) => {
      const img = fig.querySelector('img');
      const caption = fig.querySelector('figcaption')?.textContent?.trim() || '';
      return { src: img?.getAttribute('src') || '', alt: img?.getAttribute('alt') || '', caption };
    });

    certGrid.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const img = target.closest('img');
      const fig = target.closest('figure');
      if (img && fig) {
        const caption = fig.querySelector('figcaption')?.textContent?.trim() || '';
        const index = Array.from(certGrid.querySelectorAll('figure')).indexOf(fig);
        openLightbox(img.getAttribute('src') || '', img.getAttribute('alt') || '', caption, index);
      }
    });

    const figures = certGrid.querySelectorAll('figure');
    figures.forEach((fig) => {
      const img = fig.querySelector('img');
      if (!img) return;
      function applyOrientation() {
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;
        if (!w || !h) return;
        img.classList.toggle('landscape', w >= h);
        img.classList.toggle('portrait', h > w);
      }
      if (img.complete) applyOrientation();
      else img.addEventListener('load', applyOrientation, { once: true });
    });

    const images = Array.from(certGrid.querySelectorAll('img'));
    Promise.all(images.map((img) => img.complete ? Promise.resolve() : new Promise((res) => img.addEventListener('load', res, { once: true }))))
      .then(() => {
        const figureData = Array.from(certGrid.querySelectorAll('figure')).map((fig, index) => {
          const img = fig.querySelector('img');
          const w = (img?.naturalWidth || img?.width || 0);
          const h = (img?.naturalHeight || img?.height || 0);
          const orientation = w >= h ? 'landscape' : 'portrait';
          const area = w * h;
          const ratio = h ? w / h : 1;
          return { fig, index, orientation, area, ratio };
        });

        figureData.sort((a, b) => {
          if (a.orientation !== b.orientation) return a.orientation === 'landscape' ? -1 : 1;
          return b.area - a.area;
        });

        const fragment = document.createDocumentFragment();
        figureData.forEach(({ fig }) => fragment.appendChild(fig));
        certGrid.appendChild(fragment);

        galleryItems = Array.from(certGrid.querySelectorAll('figure')).map((fig) => {
          const img = fig.querySelector('img');
          const caption = fig.querySelector('figcaption')?.textContent?.trim() || '';
          return { src: img?.getAttribute('src') || '', alt: img?.getAttribute('alt') || '', caption };
        });
      });
  }

  const skillsSvg = document.getElementById('skillsChartSvg');
  const languageSvg = document.getElementById('languageChartSvg');

  function polarToCartesian(cx, cy, r, deg) {
    const rad = (deg - 90) * Math.PI / 180.0;
    return {
      x: cx + (r * Math.cos(rad)),
      y: cy + (r * Math.sin(rad))
    };
  }

  function describeDonutSlice(cx, cy, inner, outer, startAngle, endAngle) {
    const p1 = polarToCartesian(cx, cy, outer, endAngle);
    const p2 = polarToCartesian(cx, cy, outer, startAngle);
    const p3 = polarToCartesian(cx, cy, inner, startAngle);
    const p4 = polarToCartesian(cx, cy, inner, endAngle);
    const large = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      `M ${p1.x} ${p1.y}`,
      `A ${outer} ${outer} 0 ${large} 0 ${p2.x} ${p2.y}`,
      `L ${p3.x} ${p3.y}`,
      `A ${inner} ${inner} 0 ${large} 1 ${p4.x} ${p4.y}`,
      'Z'
    ].join(' ');
  }



    async function loadPieCharts() {
      try {
        const res = await fetch('data/skills.json');
        if (!res.ok) throw new Error('Failed to load pie chart data');
        const charts = await res.json();
        // charts should be an array of { selector, title, subtitle, data }
        charts.forEach(chart => {
          const svg = document.querySelector(chart.selector);
          if (svg instanceof SVGElement) {
            renderPie(svg, chart.data, chart.title, chart.subtitle);
            window.addEventListener('resize', () => renderPie(svg, chart.data, chart.title, chart.subtitle));
          }
        });
      } catch (e) {
        // fallback: do nothing
      }
    }

  function renderPie(svg, data, title, subtitle) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const box = svg.viewBox.baseVal;
    const cx = box.width / 2;
    const cy = box.height / 2;
    const radius = Math.min(cx, cy) - 6;
    const ring = Math.max(12, radius * 0.3);
    const inner = radius - ring;

    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    let start = -180;

    const chartTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    chartTitle.textContent = title;
    chartTitle.setAttribute('x', '100');
    chartTitle.setAttribute('y', '88');
    chartTitle.setAttribute('text-anchor', 'middle');
    chartTitle.setAttribute('dominant-baseline', 'central');
    chartTitle.setAttribute('fill', 'rgba(230,232,240,0.92)');
    chartTitle.setAttribute('font-size', '22');
    svg.appendChild(chartTitle);

    const chartSubtitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    chartSubtitle.textContent = subtitle;
    chartSubtitle.setAttribute('x', '100');
    chartSubtitle.setAttribute('y', '113');
    chartSubtitle.setAttribute('text-anchor', 'middle');
    chartSubtitle.setAttribute('dominant-baseline', 'central');
    chartSubtitle.setAttribute('fill', 'rgba(230,232,240,0.65)');
    chartSubtitle.setAttribute('font-size', '15');
    svg.appendChild(chartSubtitle);

    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    bg.setAttribute('cx', String(cx));
    bg.setAttribute('cy', String(cy));
    bg.setAttribute('r', String((inner + radius) / 2));
    bg.setAttribute('fill', 'none');
    bg.setAttribute('stroke', 'rgba(255,255,255,0.10)');
    bg.setAttribute('stroke-width', String(ring));
    svg.appendChild(bg);

    data.forEach((item, idx) => {
      const angle = (item.value / total) * 360;
      const end = start + angle;

      const pathData = describeDonutSlice(cx, cy, inner, radius, start, end);
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', pathData);
      p.setAttribute('fill', item.color);
      p.setAttribute('fill-opacity', '0.9');
      svg.appendChild(p);

      const textRadius = (inner + radius) / 2;
      const midAngle = start + (angle / 2);

      if (midAngle > -90 && midAngle < 90) {
        const startPoint = polarToCartesian(cx, cy, textRadius, start);
        const endPoint = polarToCartesian(cx, cy, textRadius, end);
        const largeArc = angle > 180 ? 1 : 0;

        const pathId = `textPath-${svg.id}-${idx}`;
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('id', pathId);
        path.setAttribute('d', `M ${startPoint.x} ${startPoint.y} A ${textRadius} ${textRadius} 0 ${largeArc} 1 ${endPoint.x} ${endPoint.y}`);
        path.setAttribute('fill', 'none');
        defs.appendChild(path);
        svg.appendChild(defs);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', '#fff');
        text.setAttribute('font-size', '11');
        text.setAttribute('letter-spacing', '-0.7');

        const textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
        textPath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${pathId}`);
        textPath.setAttribute('startOffset', '50%');
        textPath.setAttribute('text-anchor', 'middle');
        textPath.textContent = item.label;
        text.appendChild(textPath);
        svg.appendChild(text);
      } else {
        const pathId = `textPath-${svg.id}-${idx}`;
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        const startPoint = polarToCartesian(cx, cy, textRadius, start);
        const endPoint = polarToCartesian(cx, cy, textRadius, end);
        const largeArc = angle > 180 ? 1 : 0;

        const reversePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const reverseId = `${pathId}-reverse`;
        reversePath.setAttribute('id', reverseId);
        reversePath.setAttribute('d', `M ${endPoint.x} ${endPoint.y} A ${textRadius} ${textRadius} 0 ${largeArc} 0 ${startPoint.x} ${startPoint.y}`);
        defs.appendChild(reversePath);
        svg.appendChild(defs);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', '#fff');
        text.setAttribute('font-size', '11');
        text.setAttribute('letter-spacing', '-0.7');

        const textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
        textPath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${reverseId}`);
        textPath.setAttribute('startOffset', '50%');
        textPath.setAttribute('text-anchor', 'middle');
        textPath.textContent = item.label;
        text.appendChild(textPath);
        svg.appendChild(text);
      }

      start = end;
    });
  }

  loadPieCharts();
})();
