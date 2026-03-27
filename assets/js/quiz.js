/**
 * Quiz questions and logic
 */

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "Como avalias a tua experiência geral no TikTok?",
    options: [
      { emoji: "😍", text: "Excelente" },
      { emoji: "😊", text: "Boa" },
      { emoji: "😐", text: "Regular" },
      { emoji: "😒", text: "Ruim" }
    ]
  },
  {
    id: 2,
    question: "Qual é o teu formato de vídeo favorito no TikTok?",
    options: [
      { emoji: "🎥", text: "Vídeo curto" },
      { emoji: "📹", text: "Vídeo médio" },
      { emoji: "⏳", text: "Vídeo longo" },
      { emoji: "📺", text: "Live" }
    ]
  },
  {
    id: 3,
    question: "Como descobres novos vídeos no TikTok?",
    options: [
      { emoji: "🎯", text: "Feed \"Para ti\"" },
      { emoji: "👤", text: "Seguindo criadores" },
      { emoji: "🔍", text: "Através de hashtags" },
      { emoji: "📜", text: "Feed \"Seguindo\"" },
      { emoji: "💡", text: "Recomendações" }
    ]
  },
  {
    id: 4,
    question: "Quantas horas por dia passas no TikTok?",
    options: [
      { emoji: "⏳", text: "Menos de 1 hora" },
      { emoji: "⏳", text: "1 a 2 horas" },
      { emoji: "⏳", text: "2 a 4 horas" },
      { emoji: "⏳", text: "4 a 6 horas" },
      { emoji: "⏳", text: "Mais de 6 horas" }
    ]
  },
  {
    id: 5,
    question: "O que te faz seguir um criador no TikTok?",
    options: [
      { emoji: "🎉", text: "Conteúdo divertido" },
      { emoji: "📚", text: "Conteúdo educativo" },
      { emoji: "🤝", text: "Conexão pessoal" },
      { emoji: "🔥", text: "Participação em desafios" },
      { emoji: "📅", text: "Frequência de postagens" }
    ]
  },
  {
    id: 6,
    question: "Qual destes temas de conteúdo mais gostas de ver no TikTok?",
    options: [
      { emoji: "😂", text: "Comédia" },
      { emoji: "💃", text: "Dança" },
      { emoji: "ℹ️", text: "Tutoriais e dicas" },
      { emoji: "📹", text: "Vlogs diários" },
      { emoji: "💄", text: "Moda e beleza" }
    ]
  },
  {
    id: 7,
    question: "Qual horário do dia mais usas o TikTok?",
    options: [
      { emoji: "🌅", text: "Manhã" },
      { emoji: "🌞", text: "Tarde" },
      { emoji: "🌜", text: "Noite" },
      { emoji: "🌙", text: "Madrugada" }
    ]
  },
  {
    id: 8,
    question: "Qual secção do TikTok mais acedes?",
    options: [
      { emoji: "🎯", text: "Para Ti" },
      { emoji: "👥", text: "Seguindo" },
      { emoji: "📺", text: "TikTok Live" },
      { emoji: "🔍", text: "Descobrir" },
      { emoji: "➕", text: "Outro" }
    ]
  },
  {
    id: 9,
    question: "Com que frequência comentas em vídeos do TikTok?",
    options: [
      { emoji: "🔄", text: "Sempre" },
      { emoji: "📆", text: "Frequentemente" },
      { emoji: "⏳", text: "Às vezes" },
      { emoji: "🌧️", text: "Raramente" },
      { emoji: "🚫", text: "Nunca" }
    ]
  },
  {
    id: 10,
    question: "Que tipo de interacção mais fazes nos vídeos do TikTok?",
    options: [
      { emoji: "👍", text: "Curtir" },
      { emoji: "💬", text: "Comentar" },
      { emoji: "🔄", text: "Partilhar" },
      { emoji: "📌", text: "Salvar" },
      { emoji: "🚫", text: "Nenhuma" }
    ]
  },
  {
    id: 11,
    question: "Qual é a tua faixa etária?",
    options: [
      { emoji: "🧑‍🎓", text: "13-17 anos" },
      { emoji: "🎉", text: "18-24 anos" },
      { emoji: "👩‍💼", text: "25-34 anos" },
      { emoji: "👵", text: "35 anos ou mais" }
    ]
  }
];

// Quiz state
let currentQuestionIndex = 0;
let selectedOption = null;
const quizContainer = document.getElementById('quiz-container');

// Render a question
function renderQuestion(questionIndex) {
  const question = quizQuestions[questionIndex];
  
  // Update progress
  updateProgressBar(questionIndex, quizQuestions.length);
  
  // Create the question HTML
  const questionHTML = `
    <div class="quiz-title">${question.question}</div>
    <div class="quiz-subtitle">Selecciona uma opção para continuares:</div>
    <div class="options-container">
      ${question.options.map((option, index) => `
        <div class="option" data-index="${index}">
          <div class="option-content">
            <div class="option-emoji">${option.emoji}</div>
            <div class="option-text">${option.text}</div>
          </div>
          <div class="custom-checkbox"></div>
        </div>
      `).join('')}
    </div>
    <button id="continue-btn" class="continue-btn" disabled>Continuar</button>
    <div class="bonus-text">Concorre a um bónus adicional</div>
    <div class="divider"></div>
  `;
  
  // Set the HTML
  quizContainer.innerHTML = questionHTML;
  
  // Add event listeners to options
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.addEventListener('click', () => {
      // Remove selection from all options
      options.forEach(opt => opt.classList.remove('selected'));
      
      // Select this option
      option.classList.add('selected');
      
      // Enable the continue button
      document.getElementById('continue-btn').disabled = false;
      
      // Store the selected option
      selectedOption = parseInt(option.dataset.index);
      
      // Rastrear interação (Contact event)
      if (typeof trackContact === 'function') {
        trackContact();
      }
    });
  });
  
  // Add event listener to continue button
  document.getElementById('continue-btn').addEventListener('click', () => {
    if (selectedOption !== null) {
      // Notificar resposta da pergunta
      const selectedAnswer = question.options[selectedOption].text;
      if (typeof notifyQuestionAnswered === 'function') {
        notifyQuestionAnswered(questionIndex + 1, selectedAnswer);
      }
      
      // Show reward
      showReward(currentQuestionIndex);
    }
  });
  
  // Animate the new question in
  animateElement(quizContainer, 'fade-in');
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  selectedOption = null;
  
  if (currentQuestionIndex < quizQuestions.length) {
    renderQuestion(currentQuestionIndex);
  } else {
    // Show final reward
    showFinalReward();
  }
}

// Reset the quiz
function resetQuiz() {
  currentQuestionIndex = 0;
  selectedOption = null;
  totalEarned = 0;
  rewards = generateRewards();
  currentBalance.textContent = "0";
  renderQuestion(currentQuestionIndex);
}