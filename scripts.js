// ページロード時にデータを復元
window.onload = function () {
    loadHealthInfo();
};

// 健康情報を追加
function addInfo() {
    // パスワード確認
    const password = prompt("文献を追加するにはパスワードを入力してください:");
    if (password === null || password.trim() === "") {
        alert("パスワードが入力されていません。");
        return;
    }
    if (password !== "1234") {
        alert("パスワードが間違っています。文献を追加できません。");
        return;
    }

    const title = document.getElementById('title').value.trim();
    const source = document.getElementById('source').value.trim();
    const content = document.getElementById('content').value.trim();

    if (!title || !source || !content) {
        alert("全ての項目を入力してください。");
        return;
    }

    const healthInfoContainer = document.getElementById('healthInfoContainer');
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
    healthInfoContainer.insertBefore(newInfo, healthInfoContainer.firstChild);

    saveHealthInfo();

    // 入力欄をリセット
    document.getElementById('title').value = '';
    document.getElementById('source').value = '';
    document.getElementById('content').value = '';
}

// 個別の文献を削除
function deleteEntry(button) {
    const password = prompt("文献を削除するにはパスワードを入力してください:");
    if (password === null || password.trim() === "") {
        alert("パスワードが入力されていません。");
        return;
    }
    if (password !== "1234") {
        alert("パスワードが間違っています。削除できません。");
        return;
    }

    const entry = button.parentElement;
    entry.remove();
    saveHealthInfo();
}

// データをローカルストレージに保存
function saveHealthInfo() {
    const healthInfoContainer = document.getElementById('healthInfoContainer');
    const entries = healthInfoContainer.getElementsByClassName('health-entry');
    const data = Array.from(entries).map(entry => entry.innerHTML);

    localStorage.setItem('healthInfo', JSON.stringify(data));
}

// ローカルストレージからデータを復元
function loadHealthInfo() {
    const healthInfoContainer = document.getElementById('healthInfoContainer');
    const data = JSON.parse(localStorage.getItem('healthInfo'));

    if (data) {
        data.forEach(entryHTML => {
            const newInfo = document.createElement('div');
            newInfo.className = 'health-entry';
            newInfo.innerHTML = entryHTML;
            healthInfoContainer.appendChild(newInfo);
        });
    }
}
