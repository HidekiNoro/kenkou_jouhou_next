// 健康情報を追加する関数
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
    newInfo.className = 'health-entry';
    newInfo.innerHTML = `
        <ul>
            <li><strong>タイトル:</strong> ${title}</li>
            <li><strong>文献出所:</strong> ${source}</li>
            <li><strong>内容:</strong> ${content}</li>
        </ul>
        <button onclick="deleteEntry(this)">削除</button>
    `;
    healthInfoDiv.insertBefore(newInfo, healthInfoDiv.firstChild);

    // 入力欄をリセット
    document.getElementById('title').value = '';
    document.getElementById('source').value = '';
    document.getElementById('content').value = '';
}

// 特定の文献情報を削除する関数
function deleteEntry(button) {
    const entry = button.parentElement;
    entry.remove();
}

// すべての文献情報を削除する関数
function clearAllData() {
    if (confirm("すべての文献情報を削除しますか？")) {
        const healthInfoDiv = document.getElementById('healthInfo');
        healthInfoDiv.innerHTML = '<h2>健康情報</h2>';
    }
}
