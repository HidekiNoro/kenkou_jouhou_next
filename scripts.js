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
    newInfo.className = 'health-item';
    newInfo.innerHTML = `
        <ul>
            <li><strong>タイトル:</strong> ${title}</li>
            <li><strong>文献出所:</strong> ${source}</li>
            <li><strong>内容:</strong> ${content}</li>
        </ul>
        <button class="delete" onclick="deleteInfo(this)">削除</button>
    `;
    healthInfoDiv.prepend(newInfo);

    // 入力欄をリセット
    document.getElementById('title').value = '';
    document.getElementById('source').value = '';
    document.getElementById('content').value = '';
}

function deleteInfo(button) {
    const password = prompt("削除するにはパスワードを入力してください：");
    const correctPassword = "1234"; // あなたが設定したパスワード

    if (password === correctPassword) {
        const infoDiv = button.parentElement;
        infoDiv.remove();
        alert("文献が削除されました。");
    } else {
        alert("パスワードが間違っています。削除できません。");
    }
}
