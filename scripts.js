// ページロード時にデータを復元
window.onload = function () {
    loadHealthInfo();
};

// 健康情報を追加
function addInfo() {
    // パスワード確認
    if (!confirmPassword()) {
        alert("パスワードが間違っています。文献を追加できません。");
        return;
    }

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

    saveHealthInfo();

    // 入力欄をリセット
    document.getElementById('title').value = '';
    document.getElementById('source').value = '';
    document.getElementById('content').value = '';
}

// 個別の文献を削除
function deleteEntry(button) {
    if (confirmPassword()) {
        const entry = button.parentElement;
        entry.remove();
        saveHealthInfo();
    } else {
        alert("パスワードが間違っています。削除できません。");
    }
}

// データをローカルストレージに保存
function saveHealthInfo() {
    const healthInfoDiv = document.getElementById('healthInfo');
    const entries = healthInfoDiv.getElementsByClassName('health-entry');
    const data = Array.from(entries).map(entry => entry.innerHTML);

    localStorage.setItem('healthInfo', JSON.stringify(data));
}

// ローカルストレージからデータを復元
function loadHealthInfo() {
    const healthInfoDiv = document.getElementById('healthInfo');
    const data = JSON.parse(localStorage.getItem('healthInfo'));

    if (data) {
        data.forEach(entryHTML => {
            const newInfo = document.createElement('div');
            newInfo.className = 'health-entry';
            newInfo.innerHTML = entryHTML;
            healthInfoDiv.appendChild(newInfo);
        });
    }
}

// パスワード確認
function confirmPassword() {
    const password = prompt("操作を実行するにはパスワードを入力してください:");
    return password === "1234";
}
