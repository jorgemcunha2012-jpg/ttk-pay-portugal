(function () {
  const monthItems = Array.from(document.querySelectorAll('.month-item'));
  const connectorFills = Array.from(document.querySelectorAll('.month-connector-fill'));
  const progressText = document.getElementById('progressText');
  const claimBtn = document.getElementById('claimBtn');

  const labels = [
    'Jan/Fev',
    'Mar/Abr',
    'Mai/Jun',
    'Jul/Ago',
    'Set/Out',
    'Nov/Dez'
  ];

  let currentIndex = 0;
  const totalSteps = labels.length;
  const stepTime = 900;
  let loop;

  function updateStep() {
    monthItems.forEach((item, i) => {
      const isLast = (i === totalSteps - 1);
      item.classList.toggle('active', i === currentIndex);
      const completed = !isLast && i < currentIndex;
      item.classList.toggle('completed', completed);
    });

    connectorFills.forEach((fill, i) => {
      let fillIt = false;
      if (i === 0 && currentIndex >= 1) fillIt = true;
      if (i === 1 && currentIndex >= 2) fillIt = true;
      if (i === 2 && currentIndex >= 4) fillIt = true;
      if (i === 3 && currentIndex >= 5) fillIt = true;
      fill.style.width = fillIt ? '100%' : '0%';
    });

    if (currentIndex < totalSteps - 2) {
      progressText.textContent = 'A carregar ' + labels[currentIndex + 1] + '…';
    } else if (currentIndex === totalSteps - 2) {
      progressText.textContent = 'A carregar último período (Nov/Dez)…';
    } else {
      const lastItem = monthItems[totalSteps - 1];
      lastItem.classList.remove('pending');
      lastItem.classList.add('completed');
      progressText.textContent = 'O teu progresso foi concluído com sucesso!';
      claimBtn.classList.add('visible');
      clearInterval(loop);
    }
  }

  updateStep();

  loop = setInterval(() => {
    if (currentIndex < totalSteps - 1) {
      currentIndex++;
      updateStep();
    }
  }, stepTime);

  function mostrarLoaderTikTok() {
    const loader = document.getElementById('tiktok-loader');
    if (loader) loader.style.display = 'flex';
    const card = document.querySelector('.card');
    if (card) card.style.visibility = 'hidden';

    setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const finalUrl = 'index.php' + (urlParams.toString() ? '?' + urlParams.toString() : '');
      window.location.href = finalUrl;
    }, 3000);
  }

  claimBtn.addEventListener('click', () => {
    mostrarLoaderTikTok();
  });

  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width = window.innerWidth;
  let height = window.innerHeight;

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function createParticles(count) {
    const palette = [
      { r: 244, g: 63, b: 94 },
      { r: 56, g: 189, b: 248 },
      { r: 248, g: 250, b: 252 }
    ];
    particles = [];
    for (let i = 0; i < count; i++) {
      const color = palette[Math.floor(Math.random() * palette.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 2 + Math.random() * 3.5,
        speedY: 0.25 + Math.random() * 0.6,
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: 0.4 + Math.random() * 0.4,
        color
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.color.r + ',' + p.color.g + ',' + p.color.b + ',' + p.alpha + ')';
      ctx.fill();
      p.y += p.speedY;
      p.x += p.speedX;
      if (p.y - p.r > height) {
        p.y = -p.r;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
    });
    requestAnimationFrame(drawParticles);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles(45);
  });

  resizeCanvas();
  createParticles(45);
  drawParticles();
})();
