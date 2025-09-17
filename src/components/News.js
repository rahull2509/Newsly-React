import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    category: "general",
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      nextPage: null,
    };

    // ✅ API keys from props (App.js)
    this.apiKeys = this.props.apiKeys || [];
    this.apiIndex = 0;

    document.title = `Newsly - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  truncateText = (text, limit, byWords = false) => {
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

  async componentDidMount() {
    this.fetchNews(1);
  }

  // 🔄 Helper to rotate API key
  getApiKey = () => {
    if (this.apiKeys.length === 0) return "";
    const key = this.apiKeys[this.apiIndex];
    this.apiIndex = (this.apiIndex + 1) % this.apiKeys.length;
    return key;
  };

  fetchNews = async (pageNumber, pageToken = "") => {
    this.props.setProgress(20);
    this.setState({ loading: true });

    let success = false;
    let parsedData = {};

    for (let i = 0; i < this.apiKeys.length; i++) {
      let categoryParam =
        this.props.category === "general"
          ? ""
          : `&category=${this.props.category}`;

      let url = `https://newsdata.io/api/1/news?apikey=${this.getApiKey()}&country=in&language=en${categoryParam}${
        pageToken ? `&page=${pageToken}` : ""
      }`;

      try {
        this.props.setProgress(40);
        let data = await fetch(url);
        parsedData = await data.json();

        this.props.setProgress(70);

        // ✅ safe check so "undefined.length" na aaye
        if (parsedData.status === "success" && Array.isArray(parsedData.results)) {
          success = true;
          break;
        }
      } catch (error) {
        console.error("API Error with key:", this.getApiKey(), error);
      }
    }

    this.setState((prevState) => ({
      page: pageNumber,
      articles:
        pageNumber === 1
          ? parsedData.results || []
          : [...prevState.articles, ...(parsedData.results || [])],
      nextPage: parsedData.nextPage || null,
      loading: false,
    }));

    this.props.setProgress(100);

    if (!success) {
      alert("❌ News API is not responding. Please try again later.");
    }
  };

  fetchMoreData = () => {
    if (this.state.nextPage) {
      this.fetchNews(this.state.page + 1, this.state.nextPage);
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">
          Newsly -{" "}
          {this.props.category === "general"
            ? "Top"
            : this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h2>

        <InfiniteScroll
          dataLength={this.state.articles ? this.state.articles.length : 0} // ✅ safe
          next={this.fetchMoreData}
          hasMore={!!this.state.nextPage}
          loader={<Spinner />}
        >
          <div className="row">
            {Array.isArray(this.state.articles) &&
              this.state.articles.map((element) => (
                <div className="col-md-4" key={element.link}>
                  <NewsItem
                    title={element.title || ""}
                    description={this.truncateText(
                      element.description,
                      170,
                      false
                    )}
                    imageUrl={element.image_url}
                    newsUrl={element.link}
                    author={element.creator}
                    date={element.pubDate}
                    source_id={element.source_id || "Unknown"}
                  />
                </div>
              ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
