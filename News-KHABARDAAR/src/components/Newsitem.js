import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, desc, imageurl, newsurl, author, date,source } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
        <span className="position-absolute top-0 end=0 translate-middle badge rounded-pill bg-danger" style={{left:'80% ', zIndex: '1'}}>
                {source}
              </span> 
          <img
            src={
              !imageurl
                ? "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202210/breaking_latest_news_1200x675_1-sixteen_nine_734.jpg?VersionId=RK1VlYGRRL8Kzwp44xce_Q9w2mmoQuJ7"
                : imageurl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}...{" "}

            </h5>
            <p className="card-text">{desc}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                by {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsurl}
              target="_blank"
              className="btn btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
