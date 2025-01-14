// 文献情報を保存するためのローカルストレージキー
const STORAGE_KEY = "healthInfo";

// ページ読み込み時にローカルストレージのデータを表示
window.onload = function () {
    loadHealthInfo();
};

function loadHealthInfo() {
    const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const healthInfoDiv = document.getElementById("healthInfo");

    // 既存の情報をクリア
    healthInfoDiv.innerHTML = "<h2>健康情報</h2>";

    // 保存されているデータを表示
    storedData.forEach((item, index) => {
        const newInfo = document.createElement("div");
        newInfo.classList.add("info-box");
        newInfo.innerHTML = `
            <ul>
                <li><strong>タイトル:</strong> ${item.title}</li>
                <li><strong>文献出所:</strong> ${item.source}</li>
                <li><strong>内容:</strong> ${item.content}</li>
            </ul>
            <button class="delete-button" onclick="deleteInfo(${index})">削除</button>
        `;
        healthInfoDiv.appendChild(newInfo);
    });
}

function addInfo() {
    const title = document.getElementById("title").value;
    const source = document.getElementById("source").value;
    const content = document.getElementById("content").value;

    if (!title || !source || !content) {
        alert("全ての項目を入力してください。");
        return;
    }

    const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // 新しい情報を追加
    const newEntry = { title, source, content };
    storedData.unshift(newEntry); // 最新の情報を先頭に追加

    // ローカルストレージを更新
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));

    // 入力欄をリセット
    document.getElementById("title").value = "";
    document.getElementById("source").value = "";
    document.getElementById("content").value = "";

    // 表示を更新
    loadHealthInfo();
}

function deleteInfo(index) {
    const password = prompt("削除するにはパスワードを入力してください：");

    if (password === "1234") {
        const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        // 指定されたインデックスの情報を削除
        storedData.splice(index, 1);

        // ローカルストレージを更新
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));

        // 表示を更新
        loadHealthInfo();

        alert("削除されました。");
    } else {
        alert("パスワードが間違っています。");
    }
}
