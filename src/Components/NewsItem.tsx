import React from "react";

interface NewsItemProps {
  title: string;
  description: string;
  imageUrl?: string | undefined;
  newsUrl: string;
  author?: string | undefined;
  date?: string | undefined;
  source_id?: string | undefined;
}

const NewsItem: React.FC<NewsItemProps> = ({
  title,
  description,
  imageUrl,
  newsUrl,
  author,
  date,
  source_id,
}) => {
  return (
    <div className="my-3">
      <div className="card" style={{ width: "18rem", position: "relative" }}>
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
            imageUrl
              ? imageUrl
              : "https://cdn.mos.cms.futurecdn.net/nWWGtmv3JsN7wtHbMgKGLk.jpg"
          }
          className="card-img-top"
          alt="news"
        />

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {author || "Unknown"} on{" "}
              {date ? new Date(date).toUTCString() : "Unknown Date"}
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
};

export default NewsItem;
