function addInfo() {
    const title = document.getElementById('title').value.trim();
    const source = document.getElementById('source').value.trim();
    const content = document.getElementById('content').value.trim();

    if (!title || !source || !content) {
        alert("全ての項目を入力してください。");
        return;
    }

    const healthInfoDiv = document.getElementById('healthInfo');
    const newInfo = document.createElement('div');
    newInfo.className = 'health-info-item';
    newInfo.innerHTML = `
        <ul>
            <li><strong class="title">タイトル:</strong> ${title}</li>
            <li><strong class="source">文献出所:</strong> ${source}</li>
            <li><strong class="content">内容:</strong> ${content}</li>
        </ul>
        <button onclick="deleteItem(event)" class="delete-button">削除</button>
    `;
    healthInfoDiv.prepend(newInfo);

    // データを保存
    saveData();

    // 入力欄をクリア
    document.getElementById('title').value = '';
    document.getElementById('source').value = '';
    document.getElementById('content').value = '';
}

function deleteItem(event) {
    const password = prompt("削除するにはパスワードを入力してください:");
    if (password !== "1234") {
        alert("パスワードが違います。");
        return;
    }
    const item = event.target.closest('.health-info-item');
    item.remove();
    saveData();
}

function clearAll() {
    const password = prompt("全て削除するにはパスワードを入力してください:");
    if (password !== "1234") {
        alert("パスワードが違います。");
        return;
    }
    document.getElementById('healthInfo').innerHTML = '';
    localStorage.removeItem('healthData');
}

function saveData() {
    const items = document.querySelectorAll('.health-info-item');
    const data = [];
    items.forEach(item => {
        const title = item.querySelector('.title').textContent.replace('タイトル:', '').trim();
        const source = item.querySelector('.source').textContent.replace('文献出所:', '').trim();
        const content = item.querySelector('.content').textContent.replace('内容:', '').trim();
        data.push({ title, source, content });
    });
    localStorage.setItem('healthData', JSON.stringify(data));
}

function loadData() {
    const storedData = localStorage.getItem('healthData');
    if (storedData) {
        const data = JSON.parse(storedData);
        const healthInfoDiv = document.getElementById('healthInfo');
        data.forEach(entry => {
            const item = document.createElement('div');
            item.className = 'health-info-item';
            item.innerHTML = `
                <ul>
                    <li><strong class="title">タイトル:</strong> ${entry.title}</li>
                    <li><strong class="source">文献出所:</strong> ${entry.source}</li>
                    <li><strong class="content">内容:</strong> ${entry.content}</li>
                </ul>
                <button onclick="deleteItem(event)" class="delete-button">削除</button>
            `;
            healthInfoDiv.prepend(item);
        });
    }
}

window.onload = loadData;

