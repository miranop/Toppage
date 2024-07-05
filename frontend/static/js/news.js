document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/rss')
        .then(response => response.json())
        .then(data => {
            const newsContents = document.getElementById('news-contents');
            data.forEach(feed => {
                feed.items.forEach(item => {
                    const article = document.createElement('div');
                    article.className = 'news-article';
                    article.innerHTML = `
                        <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
                        <p>${item.description}</p>
                    `;
                    newsContents.appendChild(article);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching the RSS feed:', error);
        });
});

// サイドバーを開閉する関数
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    sidebar === null || sidebar === void 0 ? void 0 : sidebar.classList.toggle('sidebar-open');
}
// DOMContentLoadedイベントで実行する処理
document.addEventListener('DOMContentLoaded', function () {
    // トグルボタンを生成してページに挿入
    var toggleButton = document.createElement('button');
    toggleButton.textContent = '≡'; // トグルボタンのテキスト
    toggleButton.classList.add('toggle-button');
    document.body.insertBefore(toggleButton, document.body.firstChild);
    // トグルボタンにクリックイベントを追加してサイドバーメニューを開閉する
    toggleButton.addEventListener('click', toggleSidebar);
});
// ページが読み込まれたときにブックマークを生成する
window.addEventListener('load', createBookmarkIcons);