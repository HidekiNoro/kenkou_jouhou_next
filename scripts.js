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

function deleteEntry(button) {
    if (confirmPassword()) {
        const entry = button.parentElement;
        entry.remove();
    } else {
        alert("パスワードが間違っています。");
    }
}

function confirmPassword() {
    const password = prompt("削除するにはパスワードを入力してください:");
    return password === "1234"; // パスワードをここで設定
}

function deleteAllEntries() {
    if (confirmPassword()) {
        const healthInfoDiv = document.getElementById('healthInfo');
        healthInfoDiv.innerHTML = '';
    } else {
        alert("パスワードが間違っています。");
    }
}
