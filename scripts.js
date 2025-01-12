// ページ読み込み時にローカルストレージからデータを読み込む
document.addEventListener('DOMContentLoaded', loadSavedData);

// 文献を追加
function addInfo() {
    const title = document.getElementById('title').value;
    const source = document.getElementById('source').value;
    const content = document.getElementById('content').value;

    if (!title || !source || !content) {
        alert("全ての項目を入力してください。");
        return;
    }

    const healthInfoDiv = document.getElementById('healthInfo');
    const newInfo = document.createElement('div');
    newInfo.className = 'entry';
    newInfo.innerHTML = `
        <div>
            <ul>
                <li><strong>タイトル:</strong> ${title}</li>
                <li><strong>文献出所:</strong> ${source}</li>
                <li><strong>内容:</strong> ${content}</li>
            </ul>
        </div>
        <button class="delete" onclick="deleteEntry(this)">削除</button>
    `;

    // 新しい文献を一番上に追加
    healthInfoDiv.insertBefore(newInfo, healthInfoDiv.firstChild);

    // ローカルストレージに保存
    saveToLocalStorage();

    // 入力欄をリセット
    document.getElementById('title').value = '';
    document.getElementById('source').value = '';
    document.getElementById('content').value = '';
}

// 各文献の削除
function deleteEntry(button) {
    const entry = button.closest('.entry');
    entry.remove();

    // ローカルストレージを更新
    saveToLocalStorage();
}

// 全体削除
function deleteAll() {
    const healthInfoDiv = document.getElementById('healthInfo');
    healthInfoDiv.innerHTML = '<h2>健康情報</h2>';
    alert("すべての文献が削除されました。");

    // ローカルストレージをクリア
    localStorage.removeItem('healthData');
}

// ローカルストレージにデータを保存
function saveToLocalStorage() {
    const healthInfoDiv = document.getElementById('healthInfo');
    const entries = Array.from(healthInfoDiv.getElementsByClassName('entry'));
    const data = entries.map(entry => {
        const title = entry.querySelector('li:nth-child(1)').innerText.replace('タイトル:', '').trim();
        const source = entry.querySelector('li:nth-child(2)').innerText.replace('文献出所:', '').trim();
        const content = entry.querySelector('li:nth-child(3)').innerText.replace('内容:', '').trim();
        return { title, source, content };
    });

    localStorage.setItem('healthData', JSON.stringify(data));
}

// ローカルストレージからデータを読み込み、表示
function loadSavedData() {
    const savedData = localStorage.getItem('healthData');
    if (!savedData) return;

    const healthInfoDiv = document.getElementById('healthInfo');
    const data = JSON.parse(savedData);

    data.forEach(item => {
        const newInfo = document.createElement('div');
        newInfo.className = 'entry';
        newInfo.innerHTML = `
            <div>
                <ul>
                    <li><strong>タイトル:</strong> ${item.title}</li>
                    <li><strong>文献出所:</strong> ${item.source}</li>
                    <li><strong>内容:</strong> ${item.content}</li>
                </ul>
            </div>
            <button class="delete" onclick="deleteEntry(this)">削除</button>
        `;

        // 文献情報を表示
        healthInfoDiv.appendChild(newInfo);
    });
}

   

