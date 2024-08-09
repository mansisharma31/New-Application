import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    // category: 'general',
    
  }
  static propTypes= {
    country: PropTypes.string,
    category: PropTypes.string,
   
  }

  // capitalizeFirstLetter=(string)=>{
  //   return string.charAt(0).toUpperCase + string.slice(1);
  // }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
    };
    // document.title=`${this.capitalizeFirstLetter(this.props.category)}-KHABAR  
  }
  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2aa8b6269a724768ac0a147a95d8df13&pageSize=18`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      articles: parsedata.articles,
      totalarticles: parsedata.totalResults,
      loading: false,
    });
  }

  handleprevclick = async () => {
    // this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2aa8b6269a724768ac0a147a95d8df13&page=${
      this.state.page - 1
    }&pageSize=18`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedata.articles,
      loading: false,
    });
    // this.props.setProgress(100);
  };
  handlenextclick = async () => {
    // this.props.setProgress(0);
    // console.log(this.state.page)
    // console.log(this.state.totalarticles)
    // console.log(Math.ceil(this.state.totalarticles / 18))
    if (this.state.page + 1 > Math.ceil(this.state.totalarticles / 18)) {
      return;
    } else {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2aa8b6269a724768ac0a147a95d8df13&page=${
          this.state.page + 1
        }&pageSize=18`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedata = await data.json();
      // if (parsedata.totalResults <= this.state.totalResults) {
      //     return;
      // }

      this.setState({
        page: this.state.page + 1,
        articles: parsedata.articles,
        loading: false,
        // totalResults: parsedata.totalResults
      });
      // this.props.setProgress(100);
    }
  };

  render() {
    return (
      <div className="container">
        <h2 className="text-center"> DAILY NEWS</h2>
        
       {this.state.loading && <Spinner/>}
       {/* {!this.state.loading && this.state.articles.length === 0 && <div className="text-center my-5"><h3>No news available for this category.</h3></div>} */}

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
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
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevclick}
          >
            {" "}
            &laquo; Previous
          </button>
          <button type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next &raquo;</button> 
          {this.state.page + 1 <= Math.ceil(this.state.totalResults / 18) ? (
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handlenextclick}
            >
              Next &raquo;
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default News;
