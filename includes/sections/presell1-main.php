  <div class="verification-card" id="verificationCard">
    <div class="security-badge"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Seguro</div>

    <div class="icon-container" id="iconContainer">
      <div class="icon-shield" id="iconShield">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
        </svg>
      </div>
      <div class="loading-spinner" id="loadingSpinner">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg>
      </div>
      <div class="success-icon" id="successIcon">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
      </div>
    </div>

    <h1 id="mainTitle">Verificação de Segurança</h1>
    <p class="description" id="mainDescription">Confirme que és humano para aceder à oferta exclusiva</p>

    <div class="progress-container" id="progressContainer">
      <div class="progress-bar-wrapper">
        <div class="progress-bar" id="progressBar"></div>
      </div>
      <div class="progress-text" id="progressText">Verificando... 0%</div>
    </div>

    <div class="success-state" id="successState">
      <button type="button" class="success-button" id="successButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
        Verificado com sucesso
      </button>
    </div>

    <div class="timer" id="timer">00:30</div>

    <button type="button" class="verify-button" id="verifyButton">Clica para verificar</button>

    <p class="footer-text">Esta verificação protege-nos contra acessos automatizados</p>

    <div class="confetti-container" id="confettiContainer"></div>
  </div>
