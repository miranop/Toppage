
function createBookmarkIcons(){//ブックマークの処理
    const bookmarkicon = document.getElementById('bookmark-icon');
    if(!bookmarkicon) return;

    //ここにブックマークの状況を記述する
    const bookmarks = [
        {name: 'Github', url: 'https://github.com/' ,icon: 'views/images/github.png'},
        {name: 'Google', url: 'https://www.google.com/' ,icon: './images/google.png'},
        {name: 'Youtube', url: 'https://youtube.com/' ,icon: './images/Youtube.png'},
        {name: 'manaba', url: 'https://cit.manaba.jp/ct/home' ,icon: './images/manaba.jpg'},
        {name: 'CIT', url: 'https://portal.it-chiba.ac.jp/uprx/' ,icon: './images/chibany.png'},
        {name: 'yafoku', url: 'https://auctions.yahoo.co.jp/' ,icon: './images/ヤフオク.png'},
        {name: 'amazon', url: 'https://www.amazon.co.jp/ref=as_li_ss_tl?ie=UTF8&linkCode=ll2&tag=jajp-edge-ntp-topsites-22' ,icon: './images/amazon.png'},
        {name: 'chatgpt', url: 'https://chat.openai.com/' ,icon: './images/chat.png'},
        {name: 'Danime', url: 'https://anime.dmkt-sp.jp/animestore/tp_pc' ,icon: './images/danime.png'},
        {name: 'amazonmusic', url: 'https://music.amazon.co.jp/?ref=dm_lnd_ac_listn_f99f85a7./images/github.png',icon: './images/music.png'},
    ]

    bookmarks.forEach(bookmark => {

        //アイコン側の処理、追加して処理する
        const iconEle = document.createElement('a');
        iconEle.href = bookmark.url;
        iconEle.classList.add('bookmark-icon');

        const imgElement = document.createElement('img');
        imgElement.src = bookmark.icon;
        imgElement.alt = bookmark.name;

        iconEle.appendChild(imgElement);
        bookmarkicon.appendChild(iconEle);
    });
}

// サイドバーを開閉する関数
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar?.classList.toggle('sidebar-open');
}

// DOMContentLoadedイベントで実行する処理
document.addEventListener('DOMContentLoaded', function() {
    // トグルボタンを生成してページに挿入
    const toggleButton = document.createElement('button');
    toggleButton.textContent = '≡'; // トグルボタンのテキスト
    toggleButton.classList.add('toggle-button');
    document.body.insertBefore(toggleButton, document.body.firstChild);

    // トグルボタンにクリックイベントを追加してサイドバーメニューを開閉する
    toggleButton.addEventListener('click', toggleSidebar);
});

// ページが読み込まれたときにブックマークを生成する
window.addEventListener('load', createBookmarkIcons);