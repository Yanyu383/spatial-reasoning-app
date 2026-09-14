// === API Key 管理邏輯（放在檔案最上方） ===
const apiKeyInput = document.getElementById('api-key-input');
const saveKeyBtn = document.getElementById('save-key-btn');
const keyStatus = document.getElementById('key-status');

// 頁面載入時檢查是否有儲存過的 Key
if (apiKeyInput && saveKeyBtn) {
  const savedKey = localStorage.getItem('GEMINI_API_KEY');
  if (savedKey) {
    apiKeyInput.value = savedKey;
    if (keyStatus) keyStatus.textContent = '已載入儲存的 API Key';
  }

  // 綁定儲存按鈕點擊事件
  saveKeyBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (key) {
      localStorage.setItem('GEMINI_API_KEY', key);
      if (keyStatus) keyStatus.textContent = 'API Key 已成功儲存！';
    } else {
      localStorage.removeItem('GEMINI_API_KEY');
      if (keyStatus) keyStatus.textContent = '已清除 API Key';
    }
  });
}








const questionBank = [
  { id: 1, image: "images/1.png", answer: "B" },
  { id: 2, image: "images/2.png", answer: "C" }
];

let currentQuestion = null;
let isEliminateMode = false; // 紀錄劃掉模式狀態

// 切換劃掉模式
function toggleMode() {
  isEliminateMode = !isEliminateMode;
  const toggleBtn = document.getElementById('mode-toggle-btn');
  
  if (isEliminateMode) {
    toggleBtn.innerText = '✏️ 劃掉模式：開啟中';
    toggleBtn.classList.add('mode-active');
  } else {
    toggleBtn.innerText = '✏️ 劃掉模式：關閉';
    toggleBtn.classList.remove('mode-active');
  }
}

// 統一點擊處理
function handleOptionClick(selected, btnElement) {
  if (isEliminateMode) {
    btnElement.classList.toggle('eliminated');
  } else {
    checkAnswer(selected);
  }
}

function nextQuestion() {
  document.getElementById('result-text').innerText = '';
  document.getElementById('explanation-box').style.display = 'none';
  document.getElementById('ai-btn').style.display = 'none';
  
  // 重置劃線狀態
  const optionBtns = document.querySelectorAll('#options-container button');
  optionBtns.forEach(btn => btn.classList.remove('eliminated'));

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * questionBank.length);
  } while (questionBank.length > 1 && currentQuestion && questionBank[randomIndex].id === currentQuestion.id);

  currentQuestion = questionBank[randomIndex];

  document.getElementById('question-title').innerText = `圖形推理 (第 ${currentQuestion.id} 題)`;
  document.getElementById('question-img').src = currentQuestion.image;
}

function checkAnswer(selected) {
  const resultText = document.getElementById('result-text');
  const aiBtn = document.getElementById('ai-btn');

  if (selected === currentQuestion.answer) {
    resultText.innerText = "🎉 答對了！";
    resultText.style.color = "#28a745";
  } else {
    resultText.innerText = `❌ 答錯了！正確答案是 ${currentQuestion.answer}`;
    resultText.style.color = "#dc3545";
  }
  aiBtn.style.display = 'block';
}

async function askAI() {
  const loadingText = document.getElementById('loading-text');
  const expBox = document.getElementById('explanation-box');
  const aiResult = document.getElementById('ai-result');

  loadingText.style.display = 'block';

  try {
    let base64Data = "";
    try {
      const responseImg = await fetch(currentQuestion.image);
      const blob = await responseImg.blob();
      base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (imgErr) {
      throw new Error("圖片讀取失敗，請確認圖片路徑是否正確。");
    }

    const promptText = `請直接分析這張圖形邏輯推理題目，說明為何正確答案是 ${currentQuestion.answer}，並條列出規律。

要求：
1. 嚴禁自我介紹（例如：我是圖形邏輯推理專家）與廢話開場白（例如：這是一道非常經典的題目...）。
2. 請直接從「規律分析」開始說明。
3. 避免重複性的過程敘述（例如前一步已說過剩餘選項，後續步驟就不要重複贅述）。
4. 表示對角線方向時，請直接使用純文字與符號（如：左上至右下 \\ 或 左下至右上 /）。`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: promptText },
            { inline_data: { mime_type: "image/png", data: base64Data } }
          ]
        }],
        generationConfig: {
          temperature: 0.1
        }
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    let originalText = data.candidates[0].content.parts[0].text;

    let cleanText = originalText
      .replace(/\$?\$?\\rightarrow\$?\$?/g, '>')
      .replace(/\$?\$?\\(backslash|setminus)\$?\$?/g, '\\')
      .replace(/\$?\$?\\(slash)\$?\$?/g, '/')
      .replace(/\(\s*\\\s*\)/g, '( \\ )')
      .replace(/\(\s*\/\s*\)/g, '( / )')
      .replace(/#{1,6}\s?/g, '')
      .replace(/(\*\*|__|\*|_)/g, '')
      .replace(/`{1,3}.*?`{1,3}/g, '')
      .replace(/^\s*[-+*]\s+/gm, '• ')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/^\s*>\s+/gm, '')
      .replace(/={3,}|-{3,}/g, '')
      .replace(/\$\$/g, '')
      .replace(/\$/g, '');

    aiResult.innerText = cleanText;
    expBox.style.display = 'block';
  } catch (err) {
    alert("呼叫失敗！原因：" + err.message);
    console.error(err);
  } finally {
    loadingText.style.display = 'none';
  }
}

// 頁面初次載入
nextQuestion();
