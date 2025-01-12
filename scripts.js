// ページが読み込まれたときにローカルストレージからデータを復元
document.addEventListener('DOMContentLoaded', loadSavedEntries);

// 健康情報を追加する関数
function addInfo() {
    const title = document.getElementById('title').value;
    const source = document.getElementById('source').value;
    const content = document.getElementById('content').value;

    if (!title || !source || !content) {
        alert("全ての項目を入力してください。");
        return;
    }

    const newEntry = {
        title: title,
        source: source,
        content: content,
    };

    // ローカルストレージに保存
    saveEntryToLocalStorage(newEntry);

    // 表示を更新
    addEntryToDOM(newEntry);

    // 入力欄をリセット
    document.getElementById('title').value = '';
    document.getElementById('source').value = '';
    document.getElementById('content').value = '';
}

// 特定の文献情報を削除する関数
function deleteEntry(button, index) {
    if (confirm("この文献情報を削除しますか？")) {
        const entry = button.parentElement;
        entry.remove();

        // ローカルストレージから削除
        deleteEntryFromLocalStorage(index);
    }
}

// すべての文献情報を削除する関数
function clearAllData() {
    if (confirm("すべての文献情報を削除しますか？")) {
        const healthInfoDiv = document.getElementById('healthInfo');
        healthInfoDiv.innerHTML = '<h2>健康情報</h2>';

        // ローカルストレージをクリア
        localStorage.removeItem('healthEntries');
    }
}

// ローカルストレージにデータを保存
function saveEntryToLocalStorage(entry) {
    const entries = JSON.parse(localStorage.getItem('healthEntries')) || [];
    entries.unshift(entry); // 新しいデータを先頭に追加
    localStorage.setItem('healthEntries', JSON.stringify(entries));
}

// ローカルストレージからデータを削除
function deleteEntryFromLocalStorage(index) {
    const entries = JSON.parse(localStorage.getItem('healthEntries')) || [];
    entries.splice(index, 1); // 指定されたインデックスのデータを削除
    localStorage.setItem('healthEntries', JSON.stringify(entries));
}

// ローカルストレージからデータを読み込み、画面に表示
function loadSavedEntries() {
    const entries = JSON.parse(localStorage.getItem('healthEntries')) || [];
    entries.forEach((entry, index) => {
        addEntryToDOM(entry, index);
    });
}

// 文献情報をDOMに追加
function addEntryToDOM(entry, index) {
    const healthInfoDiv = document.getElementById('healthInfo');
    const newInfo = document.createElement('div');
    newInfo.className = 'health-entry';
    newInfo.innerHTML = `
        <ul>
            <li><strong>タイトル:</strong> ${entry.title}</li>
            <li><strong>文献出所:</strong> ${entry.source}</li>
            <li><strong>内容:</strong> ${entry.content}</li>
        </ul>
        <button onclick="deleteEntry(this, ${index})">削除</button>
    `;
    healthInfoDiv.insertBefore(newInfo, healthInfoDiv.firstChild);
}
