import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,imageurl,newsurl,author,date}=this.props;// this is props by using destructiing
    return (
      <div className='my-3'>
      <div className="card" style={{width: "18rem"}}>
  <img src={!imageurl?"https://images.news18.com/ibnlive/uploads/2022/02/oneplus-10-pro-front.jpg":imageurl}className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p class="card-text"><small class="text-muted">By{author?author:"unknow"} on {new Date(date).toGMTString()}</small></p>
    <a rel="noreferrer" href={newsurl} target="_blank" className='btn btn-sm btn-primary' >Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
