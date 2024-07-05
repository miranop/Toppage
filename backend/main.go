package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/mmcdole/gofeed"
)

func fetchRSSfeed(url string) (*gofeed.Feed, error) {
	fp := gofeed.NewParser()
	feed, err := fp.ParseURL(url)
	if err != nil {
		return nil, err
	}
	return feed, nil
}

func rssHandler(w http.ResponseWriter, r *http.Request) {
	rssURLs := []string{
		"https://www.gdm.or.jp/feed",
		"https://news.yahoo.co.jp/rss/topics/top-picks.xml",
		"https://news.yahoo.co.jp/rss/topics/it.xml",
		"https://news.yahoo.co.jp/rss/topics/business.xml",
	}

	var feeds []map[string]interface{}

	for _, rssURL := range rssURLs {
		feed, err := fetchRSSfeed(rssURL)
		if err != nil {
			log.Printf("RSSの処理に失敗しました %s: %v", rssURL, err)
			continue
		}

		feedData := map[string]interface{}{
			"title": feed.Title,
			"items": []map[string]string{},
		}

		for _, item := range feed.Items {
			feedData["items"] = append(feedData["items"].([]map[string]string), map[string]string{
				"title":       item.Title,
				"link":        item.Link,
				"description": item.Description,
			})
		}

		feeds = append(feeds, feedData)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(feeds)
}

func main() {
	mux := http.NewServeMux()

	// 静的ファイルの提供
	fs := http.FileServer(http.Dir("../frontend/static"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	// ニュースページのハンドラー
	mux.HandleFunc("/news", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "../frontend/pages/news.html")
	})

	// RSSハンドラー
	mux.HandleFunc("/api/rss", rssHandler)

	// ホームページのハンドラー
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		http.ServeFile(w, r, "../frontend/pages/home.html")
	})

	// サーバーを起動
	fmt.Println("Listening on :8080...")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
