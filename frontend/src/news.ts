document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/rss')
        .then(response => response.json())
        .then(data => {
            const newsContents = document.getElementById('news-contents');
            if (newsContents) {
                let html = '';
                data.forEach(feed => {
                    html += `<h1>${feed.title}</h1>`;
                    feed.items.forEach(item => {
                        html += `
                            <article>
                                <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
                                <p>${item.description}</p>
                            </article>
                        `;
                    });
                });
                newsContents.innerHTML = html;
            } else {
                console.error('Element with id "news-contents" not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching the RSS feed:', error);
        });
});