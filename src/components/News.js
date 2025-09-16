import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

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
      pagesData: {},
      articles: [],
      loading: false,
      page: 1,
      nextPage: null,
    };

    this.apiKeys = [
      "pub_e7ff87bf69374c2cbfbcfc22bc963ee0",
      "pub_87249cbadfc04004b70395ef4ccf1525",
    ];
    this.apiIndex = 0;
    document.title = `Newsly - ${this.capitalizeFirstLetter(this.props.category)} `;
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

  fetchNews = async (pageNumber, pageToken = "") => {
    if (this.state.pagesData[pageNumber]) {
      this.setState({
        page: pageNumber,
        articles: this.state.pagesData[pageNumber],
      });
      return;
    }

    this.setState({ loading: true });

    let success = false;
    let parsedData = {};

    for (let i = 0; i < this.apiKeys.length; i++) {
      // ✅ FIX: if category is general → don’t add category param
      let categoryParam = this.props.category === "general" ? "" : `&category=${this.props.category}`;

      let url = `https://newsdata.io/api/1/news?apikey=${this.apiKeys[i]}&country=in&language=en${categoryParam}${
        pageToken ? `&page=${pageToken}` : ""
      }`;

      try {
        let data = await fetch(url);
        parsedData = await data.json();

        if (parsedData.status === "success") {
          this.apiIndex = i;
          success = true;
          break;
        }
      } catch (error) {
        console.error("API Error with key:", this.apiKeys[i], error);
      }
    }

    this.setState((prevState) => ({
      page: pageNumber,
      articles: parsedData.results || [],
      nextPage: parsedData.nextPage || null,
      pagesData: {
        ...prevState.pagesData,
        [pageNumber]: parsedData.results || [],
      },
      loading: false,
    }));

    if (!success) {
      alert("❌ News API is not responding. Please try again later.");
    }
  };

  handleNextClick = () => {
    if (this.state.nextPage) {
      this.fetchNews(this.state.page + 1, this.state.nextPage);
    }
  };

  handlePrevClick = () => {
    if (this.state.page > 1) {
      this.fetchNews(this.state.page - 1);
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">
          Newsly - {this.props.category === "general" ? "Top" : this.props.category.toUpperCase()} Headlines
        </h2>

        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading &&
            Array.isArray(this.state.articles) &&
            this.state.articles.map((element) => (
              <div className="col-md-4" key={element.link}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={this.truncateText(element.description, 170, false)}
                  imageUrl={element.image_url}
                  newsUrl={element.link}
                  author={element.creator}
                  date={element.pubDate}
               source_id={element.source_id || "Unknown"}

                />
              </div>
            ))}
        </div>

        <div className="container d-flex justify-content-between my-3">
          <button
            disabled={this.state.page <= 1 || this.state.loading}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={!this.state.nextPage || this.state.loading}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
