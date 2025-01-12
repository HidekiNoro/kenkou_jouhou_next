function deleteItem(event) {
    const password = prompt("削除するにはパスワードを入力してください:");
    if (password !== "1234") {
        alert("パスワードが違います。");
        return;
    }
    const item = event.target.closest('.health-info-item');
    item.remove();

    // Update local storage
    saveData();
}

function clearAll() {
    const password = prompt("全て削除するにはパスワードを入力してください:");
    if (password !== "1234") {
        alert("パスワードが違います。");
        return;
    }
    document.getElementById('healthInfo').innerHTML = '';

    // Update local storage
    localStorage.removeItem('healthData');
}

function saveData() {
    const items = document.querySelectorAll('.health-info-item');
    const data = [];
    items.forEach(item => {
        const title = item.querySelector('.title').textContent;
        const source = item.querySelector('.source').textContent;
        const content = item.querySelector('.content').textContent;
        data.push({ title, source, content });
    });
    localStorage.setItem('healthData', JSON.stringify(data));
}

// On page load, restore data
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
                <button onclick="deleteItem(event)">削除</button>
            `;
            healthInfoDiv.appendChild(item);
        });
    }
}

window.onload = loadData;
