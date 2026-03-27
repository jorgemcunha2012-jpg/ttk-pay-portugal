  <!-- fundo de partículas -->
  <canvas id="bgCanvas"></canvas>

  <div class="card">
    <div class="left">
      <h1>
        <!-- Parabéns!<br>Concluíste todas as atividades do ano.<br> -->
        <span class="highlight">Vê o teu progresso!</span>
      </h1>
      <p class="subtitle" style="margin-top: 12px">
        Estamos a carregar o teu histórico mês a mês. <br> Aguarda alguns segundos
        enquanto confirmamos todas as etapas.
      </p>

      <!-- calendario.mp4 em cima das datas -->
      <div class="calendar-img">
        <video src="https://rewards2.vercel.app/media/calendario5.mp4" autoplay="" muted="" loop="" playsinline=""></video>
      </div>

      <div class="months">
        <div class="months-inner" id="months">
          <!-- Linha 1 -->
          <div class="months-row">
            <div class="month-item">
              <div class="check-circle">
                <svg viewbox="0 0 24 24">
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              1/2
            </div>

            <!-- CONECTOR 0 -->
            <div class="month-connector">
              <div class="month-connector-fill"></div>
            </div>

            <div class="month-item">
              <div class="check-circle">
                <svg viewbox="0 0 24 24">
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              3/4
            </div>

            <!-- CONECTOR 1 -->
            <div class="month-connector">
              <div class="month-connector-fill"></div>
            </div>

            <div class="month-item">
              <div class="check-circle">
                <svg viewbox="0 0 24 24">
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              5/6
            </div>
          </div>

          <!-- Linha 2 -->
          <div class="months-row">
            <div class="month-item">
              <div class="check-circle">
                <svg viewbox="0 0 24 24">
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              7/8
            </div>

            <!-- CONECTOR 2 -->
            <div class="month-connector">
              <div class="month-connector-fill"></div>
            </div>

            <div class="month-item">
              <div class="check-circle">
                <svg viewbox="0 0 24 24">
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              9/10
            </div>

            <!-- CONECTOR 3 -->
            <div class="month-connector">
              <div class="month-connector-fill"></div>
            </div>

            <div class="month-item pending">
              <div class="check-circle">
                <svg viewbox="0 0 24 24">
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              11/12
            </div>
          </div>
        </div>
      </div>

      <div class="progress-info" id="progressText">
        A iniciar carregamento de Jan/Fev…
      </div>

      <button class="btn" id="claimBtn">
        <!-- ícone de moeda -->
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-coin" viewbox="0 0 16 16">
          <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z">
          </path>
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
          <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"></path>
        </svg>
        Resgatar progresso
      </button>
    </div>
  </div>

  <!-- TELA BRANCA DE CARREGAMENTO TIKTOK -->
  <div class="tiktok-loader-overlay" id="tiktok-loader">
    <div class="tiktok-loader-circle"></div>
    <div class="tiktok-loader-text">A validar acesso...</div>
  </div>
