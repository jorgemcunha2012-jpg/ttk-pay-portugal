(function () {
  const verifyButton = document.getElementById('verifyButton');
  const progressContainer = document.getElementById('progressContainer');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const verificationCard = document.getElementById('verificationCard');
  const iconShield = document.getElementById('iconShield');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const successIcon = document.getElementById('successIcon');
  const successState = document.getElementById('successState');
  const iconContainer = document.getElementById('iconContainer');
  const confettiContainer = document.getElementById('confettiContainer');

  function createConfetti() {
    const colors = ['#ef4444', '#22c55e', '#3b82f6', '#f59e0b'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = Math.random() * 10 + 5 + 'px';
      confetti.style.height = Math.random() * 10 + 5 + 'px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      const angle = Math.random() * 360;
      const delay = Math.random() * 0.5;
      confetti.style.animation = `confettiFall ${2 + Math.random()}s ${delay}s linear forwards`;
      confetti.style.transform = `rotate(${angle}deg)`;
      confettiContainer.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  }

  verifyButton.addEventListener('click', function () {
    verifyButton.style.display = 'none';
    iconShield.style.display = 'none';
    loadingSpinner.classList.add('active');
    progressContainer.classList.add('active');
    verificationCard.classList.add('verifying-state');

    const timer = document.getElementById('timer');
    if (timer) timer.style.display = 'none';

    let progress = 0;
    const duration = 3000;
    const interval = 30;
    const increment = 100 / (duration / interval);

    const progressInterval = setInterval(() => {
      progress += increment;

      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);

        setTimeout(() => {
          loadingSpinner.classList.remove('active');
          iconContainer.classList.add('success');
          successIcon.classList.add('active');
          progressText.textContent = 'Verificando... 100%';
          createConfetti();
          setTimeout(() => {
            progressContainer.style.display = 'none';
            successState.classList.add('active');
          }, 500);
          setTimeout(() => redirectWithParams(), 2000);
        }, 200);
      }

      progressBar.style.width = progress + '%';
      progressText.textContent = `A verificar... ${Math.round(progress)}%`;
    }, interval);
  });

  function redirectWithParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const presell2Url = 'presell2.php';
    const finalUrl = presell2Url + (urlParams.toString() ? '?' + urlParams.toString() : '');
    window.location.href = finalUrl;
  }

  function startTimer(duration, display) {
    let timer = duration;
    const tick = setInterval(() => {
      let minutes = Math.floor(timer / 60);
      let seconds = timer % 60;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      display.textContent = minutes + ':' + seconds;
      if (--timer < 0) {
        clearInterval(tick);
        display.textContent = 'Tempo esgotado! Atualize a página para poder realizar a confirmação';
      }
    }, 1000);
  }

  window.addEventListener('load', () => {
    const display = document.getElementById('timer');
    if (display) startTimer(30, display);
  });
})();
