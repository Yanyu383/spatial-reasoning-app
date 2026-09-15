// ==========================================
// 1. API Key 管理邏輯
// ==========================================
const apiKeyInput = document.getElementById('api-key-input');
const saveKeyBtn = document.getElementById('save-key-btn');
const keyStatus = document.getElementById('key-status');

if (apiKeyInput && saveKeyBtn) {
  const savedKey = localStorage.getItem('GEMINI_API_KEY');
  if (savedKey) {
    apiKeyInput.value = savedKey;
    if (keyStatus) keyStatus.textContent = '已載入儲存的 API Key';
  }

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

// ==========================================
// 2. 題目與互動邏輯
// ==========================================
const questionBank = [
  { id: 1, image: "images/1.png", answer: "B" },
    { id: 2, image: "images/2.png", answer: "C" },
    { id: 3, image: "images/3.png", answer: "E" },
    { id: 4, image: "images/4.png", answer: "C" },
    { id: 5, image: "images/5.png", answer: "D" },
    { id: 6, image: "images/6.png", answer: "D" },
    { id: 7, image: "images/7.png", answer: "E" },
    { id: 8, image: "images/8.png", answer: "E" },
    { id: 9, image: "images/9.png", answer: "A" },
    { id: 10, image: "images/10.png", answer: "D" },
    { id: 11, image: "images/11.png", answer: "C" },
    { id: 12, image: "images/12.png", answer: "D" },
    { id: 13, image: "images/13.png", answer: "D" },
    { id: 14, image: "images/14.png", answer: "A" },
    { id: 15, image: "images/15.png", answer: "E" },
    { id: 16, image: "images/16.png", answer: "B" },
    { id: 17, image: "images/17.png", answer: "C" },
    { id: 18, image: "images/18.png", answer: "C" },
    { id: 19, image: "images/19.png", answer: "C" },
    { id: 20, image: "images/20.png", answer: "A" },
    { id: 21, image: "images/21.png", answer: "B" },
    { id: 22, image: "images/22.png", answer: "A" },
    { id: 23, image: "images/23.png", answer: "D" },
    { id: 24, image: "images/24.png", answer: "E" },
    { id: 25, image: "images/25.png", answer: "D" },
    { id: 26, image: "images/26.png", answer: "B" },
    { id: 27, image: "images/27.png", answer: "A" },
    { id: 28, image: "images/28.png", answer: "E" },
    { id: 29, image: "images/29.png", answer: "A" },
    { id: 30, image: "images/30.png", answer: "C" },
    { id: 31, image: "images/31.png", answer: "E" },
    { id: 32, image: "images/32.png", answer: "C" },
    { id: 33, image: "images/33.png", answer: "D" },
    { id: 34, image: "images/34.png", answer: "B" },
    { id: 35, image: "images/35.png", answer: "D" },
    { id: 36, image: "images/36.png", answer: "A" },
    { id: 37, image: "images/37.png", answer: "A" },
    { id: 38, image: "images/38.png", answer: "D" },
    { id: 39, image: "images/39.png", answer: "E" },
    { id: 40, image: "images/40.png", answer: "D" },
    { id: 41, image: "images/41.png", answer: "D" },
    { id: 42, image: "images/42.png", answer: "B" },
    { id: 43, image: "images/43.png", answer: "A" },
    { id: 44, image: "images/44.png", answer: "C" },
    { id: 45, image: "images/45.png", answer: "B" },
    { id: 46, image: "images/46.png", answer: "D" },
    { id: 47, image: "images/47.png", answer: "D" },
    { id: 48, image: "images/48.png", answer: "D" },
    { id: 49, image: "images/49.png", answer: "E" },
    { id: 50, image: "images/50.png", answer: "C" },
    { id: 51, image: "images/51.png", answer: "C" },
    { id: 52, image: "images/52.png", answer: "E" },
    { id: 53, image: "images/53.png", answer: "A" },
    { id: 54, image: "images/54.png", answer: "A" },
    { id: 55, image: "images/55.png", answer: "C" },
    { id: 56, image: "images/56.png", answer: "B" },
    { id: 57, image: "images/57.png", answer: "E" },
    { id: 58, image: "images/58.png", answer: "C" },
    { id: 59, image: "images/59.png", answer: "A" },
    { id: 60, image: "images/60.png", answer: "C" },
    { id: 61, image: "images/61.png", answer: "A" },
    { id: 62, image: "images/62.png", answer: "E" },
    { id: 63, image: "images/63.png", answer: "A" },
    { id: 64, image: "images/64.png", answer: "E" },
    { id: 65, image: "images/65.png", answer: "C" },
    { id: 66, image: "images/66.png", answer: "E" },
    { id: 67, image: "images/67.png", answer: "D" },
    { id: 68, image: "images/68.png", answer: "C" },
    { id: 69, image: "images/69.png", answer: "B" },
    { id: 70, image: "images/70.png", answer: "B" },
    { id: 71, image: "images/71.png", answer: "E" },
    { id: 72, image: "images/72.png", answer: "E" },
    { id: 73, image: "images/73.png", answer: "E" },
    { id: 74, image: "images/74.png", answer: "E" },
    { id: 75, image: "images/75.png", answer: "A" },
    { id: 76, image: "images/76.png", answer: "C" },
    { id: 77, image: "images/77.png", answer: "D" },
    { id: 78, image: "images/78.png", answer: "C" },
    { id: 79, image: "images/79.png", answer: "A" },
    { id: 80, image: "images/80.png", answer: "C" },
    { id: 81, image: "images/81.png", answer: "A" },
    { id: 82, image: "images/82.png", answer: "E" },
    { id: 83, image: "images/83.png", answer: "E" },
    { id: 84, image: "images/84.png", answer: "D" },
    { id: 85, image: "images/85.png", answer: "D" },
    { id: 86, image: "images/86.png", answer: "B" },
    { id: 87, image: "images/87.png", answer: "C" },
    { id: 88, image: "images/88.png", answer: "B" },
    { id: 89, image: "images/89.png", answer: "B" },
    { id: 90, image: "images/90.png", answer: "B" },
    { id: 91, image: "images/91.png", answer: "D" },
    { id: 92, image: "images/92.png", answer: "E" },
    { id: 93, image: "images/93.png", answer: "C" },
    { id: 94, image: "images/94.png", answer: "B" },
    { id: 95, image: "images/95.png", answer: "D" },
    { id: 96, image: "images/96.png", answer: "A" },
    { id: 97, image: "images/97.png", answer: "B" },
    { id: 98, image: "images/98.png", answer: "B" },
    { id: 99, image: "images/99.png", answer: "B" },
    { id: 100, image: "images/100.png", answer: "E" },
    { id: 101, image: "images/101.png", answer: "E" },
    { id: 102, image: "images/102.png", answer: "C" },
    { id: 103, image: "images/103.png", answer: "B" },
    { id: 104, image: "images/104.png", answer: "A" },
    { id: 105, image: "images/105.png", answer: "C" },
    { id: 106, image: "images/106.png", answer: "A" },
    { id: 107, image: "images/107.png", answer: "C" }
];

let currentQuestion = null;
let isEliminateMode = false;

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

// ==========================================
// 3. AI 解析呼叫邏輯
// ==========================================
async function askAI() {
  const apiKey = localStorage.getItem('GEMINI_API_KEY') || (typeof apiKeyInput !== 'undefined' && apiKeyInput ? apiKeyInput.value.trim() : '');

  if (!apiKey) {
    alert('請先在頁面上方輸入並儲存 Gemini API Key！');
    return;
  }

  const loadingText = document.getElementById('loading-text');
  const expBox = document.getElementById('explanation-box');
  const aiResult = document.getElementById('ai-result');

  if (loadingText) loadingText.style.display = 'block';

  try {
    const imgElement = document.getElementById('question-img');
    if (!imgElement || !imgElement.src) {
      throw new Error("【檢查關卡 1 失敗】畫面上找不到有效的圖片來源。");
    }

    // 將圖片轉為 Base64
    let base64Data = "";
    try {
      const canvas = document.createElement('canvas');
      canvas.width = imgElement.naturalWidth || imgElement.width;
      canvas.height = imgElement.naturalHeight || imgElement.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(imgElement, 0, 0);
      base64Data = canvas.toDataURL('image/png').split(',')[1];
    } catch (canvasErr) {
      throw new Error("【檢查關卡 2 失敗】Canvas 轉檔被安全機制攔截：" + canvasErr.message);
    }

    const promptText = `請直接分析這張圖形邏輯推理題目，說明為何正確答案是 ${currentQuestion ? currentQuestion.answer : ''}，並條列出規律。

要求：
1. 嚴禁自我介紹與廢話開場白。
2. 請直接從「規律分析」開始說明。
3. 避免重複性的過程敘述。
4. 表示對角線方向時，請直接使用純文字與符號（如：左上至右下 \\ 或 左下至右上 /）。`;

    // 發送請求至 Gemini 3.6 Flash
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
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
    if (data.error) {
      throw new Error("【檢查關卡 3：API 回傳錯誤】" + data.error.message);
    }

    if (!data.candidates || !data.candidates[0].content.parts[0].text) {
      throw new Error("【檢查關卡 3：API 未回傳有效文字】");
    }

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

    if (aiResult) aiResult.innerText = cleanText;
    if (expBox) expBox.style.display = 'block';
  } catch (err) {
    alert("執行失敗！原因：" + err.message);
    console.error(err);
  } finally {
    if (loadingText) loadingText.style.display = 'none';
  }
}

nextQuestion();
