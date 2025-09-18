import React, { useEffect, useState, useCallback } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ category = "general", apiKeys = [], setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [lastKeyIndex, setLastKeyIndex] = useState(0); 

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const truncateText = (text, limit, byWords = false) => {
    if (!text) return "";
    if (byWords) {
      let words = text.split(" ");
      return words.length > limit
        ? words.slice(0, limit).join(" ") + "..."
        : text;
    } else {
      return text.length > limit ? text.substring(0, limit) + "..." : text;
    }
  };

  //  Fetch News with fallback for all keys
  const fetchNews = useCallback(
    async (pageNumber, pageToken = "") => {
      if (loading) return;
      setProgress(20);
      setLoading(true);

      let parsedData = {};
      let success = false;

      // Start from last successful key
      for (let i = lastKeyIndex; i < apiKeys.length; i++) {
        let categoryParam = category === "general" ? "" : `&category=${category}`;
        let url = `https://newsdata.io/api/1/news?apikey=${apiKeys[i]}&country=in&language=en${categoryParam}${
          pageToken ? `&page=${pageToken}` : ""
        }`;

        try {
          setProgress(40);
          const response = await fetch(url);
          parsedData = await response.json();
          console.log(`API Key ${i + 1} Response:`, parsedData);

          setProgress(70);

          if (parsedData.status === "success" && Array.isArray(parsedData.results)) {
            success = true;
            setLastKeyIndex(i); 
            break;
          }
        } catch (error) {
          console.error(`API Error with key ${i + 1}:`, error);
        }
      }

      setPage(pageNumber);

      setArticles((prevArticles) =>
        pageNumber === 1
          ? Array.isArray(parsedData.results)
            ? parsedData.results
            : []
          : [
              ...prevArticles,
              ...(Array.isArray(parsedData.results) ? parsedData.results : []),
            ]
      );

      setNextPage(parsedData.nextPage || null);
      setLoading(false);
      setProgress(100);

      if (!success) {
        alert("All API keys exhausted or API not responding. Please try later.");
      }
    },
    [apiKeys, category, setProgress, loading, lastKeyIndex]
  );

  useEffect(() => {
    document.title = `Newsly - ${capitalizeFirstLetter(category)}`;
    fetchNews(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const fetchMoreData = () => {
    if (nextPage && !loading) {
      fetchNews(page + 1, nextPage);
    }
  };

  return (
    <div className="container my-3">
      <h2
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "80px" }}
      >
        Newsly -{" "}
        {category === "general"
          ? "Top"
          : capitalizeFirstLetter(category)}{" "}
        Headlines
      </h2>

      {loading && page === 1 && <Spinner />}

      {!loading && articles.length === 0 && (
        <h4 className="text-center text-muted">No articles found</h4>
      )}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={!!nextPage}
        loader={<Spinner />}
      >
        <div className="row">
          {Array.isArray(articles) &&
            articles.map((element, index) => (
              <div className="col-md-4" key={element.link || index}>
                <NewsItem
                  title={element.title || ""}
                  description={truncateText(element.description, 170, false)}
                  imageUrl={element.image_url}
                  newsUrl={element.link}
                  author={
                    Array.isArray(element.creator)
                      ? element.creator[0]
                      : element.creator || "Unknown"
                  }
                  date={element.pubDate}
                  source_id={element.source_id || "Unknown"}
                />
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default News;
