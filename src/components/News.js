import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
export class News extends Component {
  static defaultProps={
    country:"in",
    pageSize:8,
    category:'general',
  };
  static propTypes={
     country:PropTypes.string,
     pageSize:PropTypes.number,
     category:PropTypes.string,

  }
  constructor(props) {//it is mandotary for making state
    super(props);
    this.state = {//object  // here i will set the state
      articles: [],
      loading: false,
      page: 1,

    }
    document.title=this.props.category;
  }
  async componentDidMount() {//using componentdid mount i am able to use api by fetching
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c2495166b04e4d32acedd67a5cffe2f5&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData.articles,totalResult:parseData.totalResults,loading:false })
  }
  handlePrevClick= async()=>{
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c2495166b04e4d32acedd67a5cffe2f5&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data = await fetch(url);
  let parseData = await data.json();
  console.log(parseData);
  this.setState({ articles: parseData.articles })
    console.log("previous");
    this.setState({
      page:this.state.page-1,
      loading:false
    })
  }
  handleNextClick=async()=>{
    if(!(this.state.page+1>Math.ceil(this.state.totalResult/this.props.pageSize))){

    

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c2495166b04e4d32acedd67a5cffe2f5&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
  let data = await fetch(url);

  let parseData = await data.json();
  console.log(parseData);

    console.log("next");
    this.setState({
      page:this.state.page+1,
       articles: parseData.articles ,
       loading:false
    })
  }
}
  render() {
    return (
      <div className='container my-3'>
        <h2 className="text-center">Mahajan News top headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">

          {!this.state.loading &&this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url} >
              <NewsItem title={element.title ? element.title.slice(0, 44) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt}/>
            </div>
          })}


        </div>
        {/* <NewsItem  title="mytitle" description='mydesc'/>
        <NewsItem/>
        <NewsItem/>
        <NewsItem/>
        <NewsItem/>
        <NewsItem/> */}
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-primary"onClick={this.handlePrevClick}>&larr;Previous</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResult/this.props.pageSize)} type="button" className="btn btn-secondary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
