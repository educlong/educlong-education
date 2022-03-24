import React, { Component } from 'react';
import {
    NavLink
} from "react-router-dom";
import{
    toSlug
} from '../Models.js'
import WOW from 'wowjs'; 
import {linkApiThumbnail, sizeApiThumbnail} from '../Models'

class Course extends Component {
    componentDidMount(){ new WOW.WOW().init()}
    render() {
        return (
            <div className={"col-lg-4 mb-5 wow "+this.props.aData.effectWow} data-wow-interation='2'>
                <div className="card h-100 shadow border-0">
                <img className="card-img-top" src={`${linkApiThumbnail}${this.props.aData.dataChildrent[0].videoId}${sizeApiThumbnail}`} alt="..." />
                <div className="card-body p-4">
                    <div className="badge bg-primary bg-gradient rounded-pill mb-2">{this.props.aData.type}</div>
                    <NavLink to={"/"+this.props.aData.key+"/"+toSlug(this.props.aData.title)+"."+this.props.aData._id+".html"} 
                            className="text-decoration-none link-dark stretched-link">{/*SectionBlog.Chú ý đổi tất cả*/}
                        <h5 className="card-title mb-3">{this.props.aData.title}</h5>{/**thẻ a thành thẻ NavLink*/}
                    </NavLink>    {/**xử lý tạo link friendly dùng slug convert link friendly sang vietnamese*/}
                    <p className="card-text mb-0">{this.props.aData.summary}</p>
                </div>
                <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                    <div className="d-flex align-items-end justify-content-between">
                    <div className="d-flex align-items-center">
                        <img className="rounded-circle me-3" src={this.props.aData.imgAuthor} alt="..." />
                        <div className="small">
                        <div className="fw-bold">{this.props.aData.author}</div>
                        <div className="text-muted">{this.props.aData.date} · {this.props.aData.timeAgo} read</div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Course;