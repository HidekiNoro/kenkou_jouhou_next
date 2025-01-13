// ローカルストレージからデータを読み込む
function loadHealthData() {
    const storedData = localStorage.getItem('healthData');
    if (storedData) {
        return JSON.parse(storedData);
    }
    return [];
}

// ローカルストレージにデータを保存する
function saveHealthData(data) {
    localStorage.setItem('healthData', JSON.stringify(data));
}

function displayHealthData() {
    const healthInfoDiv = document.getElementById('healthInfo');
    healthInfoDiv.innerHTML = ''; // 一度内容をリセット

    const data = loadHealthData();
    data.forEach((item, index) => {
        const newInfo = document.createElement('div');
        newInfo.classList.add('health-entry');
        newInfo.innerHTML = `
            <ul>
                <li><strong>タイトル:</strong> ${item.title}</li>
                <li><strong>文献出所:</strong> ${item.source}</li>
                <li><strong>内容:</strong> ${item.content}</li>
            </ul>
            <button onclick="deleteEntry(${index})">削除</button>
        `;
        healthInfoDiv.appendChild(newInfo);
    });
}

function addInfo() {
    const title = document.getElementById('title').value;
    const source = document.getElementById('source').value;
    const content = document.getElementById('content').value;

    if (!title || !source || !content) {
        alert("全ての項目を入力してください。");
        return;
    }

    const data = loadHealthData();
    data.unshift({ title, source, content }); // 新しいデータを先頭に追加
    saveHealthData(data);

    displayHealthData();

    // 入力欄をリセット
    document.getElementById('title').value = '';
    document.getElementById('source').value = '';
    document.getElementById('content').value = '';
}

function deleteEntry(index) {
    const password = prompt("削除にはパスワードが必要です。パスワードを入力してください：");
    if (password !== 'secret') {
        alert('パスワードが間違っています。');
        return;
    }

    const data = loadHealthData();
    data.splice(index, 1); // 指定したデータを削除
    saveHealthData(data);

    displayHealthData();
}

function deleteAll() {
    const password = prompt("全体を削除するにはパスワードが必要です。パスワードを入力してください：");
    if (password !== 'secret') {
        alert('パスワードが間違っています。');
        return;
    }

    localStorage.removeItem('healthData'); // データを削除
    displayHealthData();
}

// ページ読み込み時にデータを表示
window.onload = displayHealthData;
