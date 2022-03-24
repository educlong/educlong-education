import React, { useState } from 'react';
import Courses from './Courses';
import { useParams } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FacebookProvider, Comments } from 'react-facebook';
import { Author, Content } from './CoursesHandle';

const LecturePass = styled.div`
    font-size: 20px;
    color: black;
    text-decoration: none;
    text-align: left
`
const LecturePassLi = styled.li`
    border: 1px solid #6c757d;
    border-left: none;
    border-right: none;
    border-radius: 20px;
    line-height: 21px;
    min-height: 42px;
    overflow: hidden;
    margin-left: 0px;
    font-size: 16px;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    position: relative;
    padding-right: 5px;
    margin: 0px;
    cursor: pointer;
    list-style: none;
`

export default function CourseDetail(props) {   //props._courses_ store all of the data from firebase
    let {id} = useParams();
    let datas = props._courses_;

    // state to get videoId
    const [_videoId, set_videoId] = useState(()=>{
        let _videoId_ = null;
        datas.forEach(aCourse => {
            if(parseInt(aCourse._id) === parseInt(id)) 
                _videoId_ = aCourse.dataChildrent[0].videoId;
        });
        return _videoId_
    });
    
    const aLession = (video, index) => (
        <LecturePass  key={index}  className="lecture-pass" onClick={()=>{
            set_videoId(video.videoId);
        }}>
            <LecturePassLi className="lecture-title" lecture_id={25871} id="lecture-title-25871" free_preview={0}>
                <FontAwesomeIcon icon={faYoutube} className="h2 mx-2 mt-3"/>
                <span className="left-lecture-icon" style={{}}>
                    <span>
                        <span>
                            {video.videoTitle}
                        </span>
                    </span>
                </span>
            </LecturePassLi>
        </LecturePass>
    )
    const content = (aCourse, video, index) =>(
        _videoId !== video.videoId ? "" :
            (
                <div key={index} >
                    <Content dataContent={aCourse} 
                        video = {video}/>
                </div>
            )
    )
    return (
        <section className="py-5">
            {
                datas.map((aCourse, index) => (
                    aCourse._id !== parseInt(id) ? "" :
                        (
                            <section className="py-5" key={index}>
                                <Container className=" px-5 my-5">
                                    <Row className='gx-5'>
                                        <Col xs={12} sm={12} md={12} lg={4}>
                                            <Author avatarAuthor={aCourse.imgAuthor}
                                                    nameAuthor ={aCourse.author}
                                                    positionAuthor={aCourse.position}/>
                                            {
                                                aCourse.dataChildrent.map((video, index)=>(
                                                    aLession(video, index)
                                                ))
                                            }
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={8}>
                                            {
                                                aCourse.dataChildrent.map((video, index)=>(
                                                    content(aCourse, video, index)
                                                ))
                                            }
                                            <FacebookProvider appId="3893240514136810">
                                                <Comments href="http://www.facebook.com" />
                                            </FacebookProvider>
                                        </Col>
                                    </Row>
                                </Container>
                                <Courses isCourseID={aCourse._id} course={aCourse} _courses_ = {datas}/>
                            </section>
                        )
                ) )
            }
        </section>

    );
}