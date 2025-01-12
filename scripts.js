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

    // 入力欄をリセット
    document.getElementById('title').value = '';
    document.getElementById('source').value = '';
    document.getElementById('content').value = '';
}

// 各文献の削除
function deleteEntry(button) {
    const entry = button.closest('.entry');
    entry.remove();
}

// 全体削除
function deleteAll() {
    const healthInfoDiv = document.getElementById('healthInfo');
    healthInfoDiv.innerHTML = '<h2>健康情報</h2>';
    alert("すべての文献が削除されました。");
}
