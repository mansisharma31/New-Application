import React, { Component } from "react";
import Newsitem from "./Newsitem";
// import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    // category: 'general',
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 2,
      totalResults: 0,
      loading: false,

    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}-KHABARDAR`;
  }
  async componentDidMount() {
    // this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2aa8b6269a724768ac0a147a95d8df13&pageSize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
  
    this.setState({
      articles: parsedata.articles,
      totalarticles: parsedata.totalResults,
      loading: false,
    });
    // this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    // this.props.setProgress(0);
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2aa8b6269a724768ac0a147a95d8df13&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
 
    this.setState({
      articles: this.state.articles.concat( parsedata.articles),
      totalarticles: parsedata.totalResults,
      loading:false,
    });
    // this.props.setProgress(100);
  };

  render() {
    return (
      <div className="container">
        <h2 className="text-center">
          {" "}
          Top Headlines of {this.capitalizeFirstLetter(
            this.props.category
          )}{" "}
          Category
        </h2>

        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          // loader={<Spinner/>}
        >
          
        <div className="row">
          {  
          this.state.articles.map((element, index) => {
              return (
                <div className="col-md-4"key={`${index}-${element.url}`}>
                  
                  <Newsitem 
                    imageurl={element.urlToImage}
                    title={element.title}
                    desc={element.description}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevclick}
          >
            {" "}
            &laquo; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlenextclick}
          >
            Next &raquo;
          </button>
          {this.state.page + 1 <= Math.ceil(this.state.totalResults / 18) ? (
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handlenextclick}
            >
              Next &raquo;
            </button>
          ) : null}
        </div> */}
      </div>
      
    );
  }
}

export default News;
