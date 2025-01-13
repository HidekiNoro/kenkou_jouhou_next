// ローカルストレージからデータを読み込み表示
function loadHealthInfo() {
    const storedData = localStorage.getItem("healthInfo");
    const healthInfoDiv = document.getElementById("healthInfo");

    if (storedData) {
        const healthData = JSON.parse(storedData);
        healthData.forEach(item => {
            const newInfo = document.createElement("div");
            newInfo.classList.add("info-box");
            newInfo.innerHTML = `
                <ul>
                    <li><strong>タイトル:</strong> ${item.title}</li>
                    <li><strong>文献出所:</strong> ${item.source}</li>
                    <li><strong>内容:</strong> ${item.content}</li>
                </ul>
                <button class="delete-button">削除</button>
            `;
            healthInfoDiv.appendChild(newInfo);

            // 削除ボタンのイベントリスナー
            const deleteButton = newInfo.querySelector(".delete-button");
            deleteButton.addEventListener("click", () => {
                deleteHealthInfo(newInfo, item);
            });
        });
    }
}

// 文献データの追加
function addInfo() {
    const title = document.getElementById("title").value;
    const source = document.getElementById("source").value;
    const content = document.getElementById("content").value;

    if (!title || !source || !content) {
        alert("全ての項目を入力してください。");
        return;
    }

    const healthInfoDiv = document.getElementById("healthInfo");
    const newInfo = document.createElement("div");
    newInfo.classList.add("info-box");
    newInfo.innerHTML = `
        <ul>
            <li><strong>タイトル:</strong> ${title}</li>
            <li><strong>文献出所:</strong> ${source}</li>
            <li><strong>内容:</strong> ${content}</li>
        </ul>
        <button class="delete-button">削除</button>
    `;
    healthInfoDiv.prepend(newInfo);

    // ローカルストレージに保存
    const storedData = localStorage.getItem("healthInfo");
    const healthData = storedData ? JSON.parse(storedData) : [];
    healthData.unshift({ title, source, content });
    localStorage.setItem("healthInfo", JSON.stringify(healthData));

    // 削除ボタンのイベントリスナー
    const deleteButton = newInfo.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        deleteHealthInfo(newInfo, { title, source, content });
    });

    // 入力欄をリセット
    document.getElementById("title").value = '';
    document.getElementById("source").value = '';
    document.getElementById("content").value = '';
}

// 文献データの削除
function deleteHealthInfo(element, item) {
    const storedData = localStorage.getItem("healthInfo");
    let healthData = storedData ? JSON.parse(storedData) : [];
    healthData = healthData.filter(data => 
        data.title !== item.title || 
        data.source !== item.source || 
        data.content !== item.content
    );
    localStorage.setItem("healthInfo", JSON.stringify(healthData));
    element.remove();
}

// 初期化
window.onload = () => {
    loadHealthInfo();
    document.getElementById("addButton").addEventListener("click", addInfo);
};
