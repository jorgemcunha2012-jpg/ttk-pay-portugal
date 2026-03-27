  <div id="method-modal" class="method-modal" style="display: none;">
    <div class="method-modal-content">
      <div class="method-modal-header">
        <h2>Adicionar método de saque</h2>
        <button class="method-modal-close" onclick="closeMethodModal()">×</button>
      </div>
      <div class="method-options">
        <div class="method-option" onclick="selectMethod('mbway')">
          <div class="method-option-left">
            <div class="method-logo mbway-logo">
              <img src="images/mbway-logo.png" alt="MB Way" style="width: 50px; height: 35px; object-fit: contain;">
            </div>
            <div class="method-option-text">
              <div class="method-option-name">MB Way</div>
              <div class="method-option-subtitle">Recebimento Imediato</div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #999;">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
        <div class="method-option" onclick="selectMethod('iban')">
          <div class="method-option-left">
            <div class="method-logo iban-logo">
              <img src="images/iban-logo.png" alt="IBAN" style="width: 50px; height: 35px; object-fit: contain;">
            </div>
            <div class="method-option-text">
              <div class="method-option-name">IBAN</div>
              <div class="method-option-subtitle">Recebimento Imediato</div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #999;">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
