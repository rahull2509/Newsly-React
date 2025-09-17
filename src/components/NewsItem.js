import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source_id } =
      this.props;

    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem", position: "relative" }}>
          {/* 🔴 Badge shifted to TOP-LEFT */}
          <span
            className="badge rounded-pill bg-danger"
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              zIndex: "1",
            }}
          >
            {source_id}
          </span>

          <img
            src={
              !imageUrl
                ? "https://cdn.mos.cms.futurecdn.net/nWWGtmv3JsN7wtHbMgKGLk.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="news"
          />

          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
