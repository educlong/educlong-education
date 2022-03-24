import React, {useEffect, useState} from 'react';
import Course from './Course';
import { Button  } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel2';
import { Image  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { Container, Nav, Navbar } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './ImageSlider.css';
import {categoryCourses} from '../Models';
import { faBuilding, faChartBar, faFileWord, faFileCode } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import test_enrolling from '../../images/test_enrolling.png'
import { unSubscriber } from '../../stores/FirebaseConfig';


function HeaderHome(home){
    return (
        <header className="bg-light py-5">
            <div className="container px-5">
                <div className={"gx-5 align-items-center justify-content-center "+home.column}>
                    <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                    </div>
                    <div className="col-lg-8 col-xl-7 col-xxl-6">
                        <div className="my-5 text-center text-xl-start">
                        <h1 className={"display-5 fw-bolder  mb-2 text-"+home.textColor}>{home.titleHeader}</h1>
                        <p className={"lead fw-normal mb-4 text-"+home.textColor+"-50 text-"+home.textColor}>
                            {home.contentHeader1}<br/>
                            {home.contentHeader2}<br/>
                            {home.contentHeader3}
                        </p>
                        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                            <NavLink to={"/"+home.navLink} className="btn btn-primary btn-lg px-4 me-sm-3 text-white">{home.btnHeader}</NavLink>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
export function ImageSlider(props){
    let courses = props._courses
    let slides = []
    courses.forEach(element => {
        if(element._id <= parseInt(categoryCourses(courses)))
            slides.push(element);
    });
    return (
        <section className='slider-banner'>
            <Carousel className='main-slide' dynamicHeight infiniteLoop autoPlay showArrows={true} centerSlidePercentage={100}>
                {
                    slides.map((slide, index)=>(
                        <div key={index}>
                            <Image src={slide.image}/>
                            <p className="legend">{slide.legend}</p>
                            <HeaderHome textColor={slide.textColor}
                                column = {slide.column}
                                navLink = {slide.key}
                                titleHeader={slide.type+" Test"}
                                contentHeader1={slide.contentHeader}
                                btnHeader ='Get Started'/>
                        </div>
                    )
                )}
            </Carousel>
            
        </section>
    )
}

function Courses(courses){    //courses._course store all of the data from firebase
    const [isMore, setMore] = useState(false);
    const _course = courses._course;
    const data_course = courses.listCourses;
    return (
        <section id={_course !== 'all' ? _course.key : "all"}>
            <div className="container my-5">
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-8 col-xl-6">
                        <div className="text-center">
                        <h2 className="fw-bolder">{_course !== 'all' ? _course.name : "All Courses"}</h2>
                        <p className="lead fw-normal text-muted mb-5">{_course !== 'all' ? _course.intro : ""}</p>
                        </div>
                    </div>
                </div>
                <div className="row gx-5">
                    {
                        data_course.map((aData, key) => (  /**duyệt hết các phần tử trong mảng Data.json và truyền vào view */
                            (!isMore &&
                                ((_course !== 'all' && aData.key === _course.key && aData.indexCourse < 7) || (_course === 'all' && key < 6)))
                            || (isMore && ((_course !== 'all' && aData.key === _course.key) || _course === 'all')) ?
                                (
                                    <Course key={key}  aData = {aData} />
                                )
                            : ""
                        ))
                    }
                    <div className='d-flex justify-content-center'>
                        <Button variant={(!isMore ? "outline-" : "")+"secondary"} type='button' size='lg' className='rounded-pill'>
                            <div className="text-decoration-none text-dark" onClick={()=>{ setMore(!isMore) }}>
                                {isMore ? "Less " : "More "} Courses... 
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

    );
}

const optionsFeedback = {
    items: 3,
    nav: true,
    dots: true,
    autoplay: true,
    loop: true,
};
export function Feedbacks(){
    
    const [loading, setLoading] = useState(true);
    const [feedbacks, setDataFeedbacks] = useState([])
    useEffect(() => {
        return unSubscriber(setDataFeedbacks, setLoading, 'Feedbacks', []);
    }, []);

    if(loading){
        return (
            <Container>
                <h2 className="title">Students' feedback</h2>
            </Container>
        )
    }
    return(<div>
        {
          feedbacks.length <= 0
            ? 
                (
                    <Container>
                        <h2 className="title">Students' feedback</h2>
                    </Container>
                )
            : 
                (
                    <section id="feedback" className="feedback-hachium mt-5 pt-5" style={{}}>
                        <div className="container">
                            <h2 className="title text-center hachium" >Students' feedback</h2>
                            <OwlCarousel  options={optionsFeedback} margin={20}>
                                {
                                    feedbacks.map((feedback, index)=>(
                                        <div className='item' style={{margin: '0 0 0 20px'}} key={index}>
                                            <div className="item-feedback">
                                                <div className="quote-icon">
                                                    <FontAwesomeIcon icon={faQuoteLeft} className="h1"/>
                                                </div>
                                                <div className="description"  style={{minHeight: '158px', textAlign: 'left'}}>
                                                    <p >
                                                        <span className="small">
                                                            {feedback.content1}<br/><br/>{feedback.content2}
                                                        </span>
                                                        <br />
                                                    </p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="info-learner hachiumd-flex d-flex justify-content-center">
                                                        <Image className="feedback-ava w-25 border border-warning rounded-circle" src={feedback.avatar} alt={feedback.student}  />
                                                    </div>
                                                    <h5 className="name_learner text-center hachium" >
                                                        {feedback.student}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </OwlCarousel>
                        </div>
                    </section>
                )
            }
        </div> 
    );
}
export function Navigation(props){    //props._courses_ store all of the data from firebase
    let _courses = props._courses_;
    const [_course, set_course] = useState(null);
    const [chooseCourse, setchooseCourse] = useState(0);
    function setCourse(whichCourse, _chooseCourse){
        set_course(whichCourse);
        setchooseCourse(_chooseCourse);
    }
    return (
        <>
            <Container>
                <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark" className='w-100 mt-3'>
                    <Container fluid className='d-flex justify-content-center'>
                        <Navbar.Collapse>
                            <Container fluid className="d-flex justify-content-center">
                                <Nav className="d-flex justify-content-center">
                                    <div className={"nav-link text-dark border border-success rounded-pill rounded border-bottom-0 rounded-bottom bg-"
                                        + (chooseCourse === 0 ? "warning h5 px-4" : " h6 px-4")}
                                        style={{fontWeight : "bold"}}  onClick={()=>{setCourse(null,0)}}> All Course </div>
                                    {
                                        _courses.map((course,index)=>(
                                            index > 3 ? "" :
                                            <div key={index} className={"nav-link text-dark border border-success rounded-pill rounded border-bottom-0 rounded-bottom bg-"
                                                + (chooseCourse === (index+1) ? "warning h5 px-4" : " h6 px-4")}
                                                style={{fontWeight : "bold"}}  onClick={()=>{setCourse(course, index+1)}}>{course.name}</div>
                                        ))
                                    }
                                </Nav>
                            </Container>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
            {/* List of courses section */}
            {_course !== null ? <Courses _course = {_course} listCourses = {_courses}/> : <Courses _course = "all" listCourses = {_courses}/> }
        </>
    );
}

// const lengthReasons = Object.keys(_Reasons).length;
const optionsReason = (lengthReasons) => {
    return({
        items: lengthReasons,
        nav: true,
        dots: true,
        autoplay: true,
        loop: true,
    })
};
const width = (lengthReasons) => 'calc(100%/'+{lengthReasons}+')';
export default function Reasons(){
    const [loading, setLoading] = useState(true);
    const [_Reasons, setDataReasons] = useState([])
    useEffect(() => {
        return unSubscriber(setDataReasons, setLoading, 'Reasons', []);
    }, []);

    if(loading){
        return (
            <Container>
                <h2 className="title">Why do you choose us?</h2>
            </Container>
        )
    }
    return(<div>
        {
          _Reasons.length <= 0
            ? 
                (
                    <Container>
                        <h2 className="title">Why do you choose us?</h2>
                    </Container>
                )
            : 
                (
                    <div className="container">
                        <h2 className="title">Why do you choose us?</h2>
                        <div className="content-text-images row mb-5">
                            <OwlCarousel options={optionsReason(_Reasons.length)} margin={10}>
                                {
                                    _Reasons.map((reason, index)=>(
                                        <div className="item mx-3" style={{width: width(_Reasons.length)}} key={index}>
                                            <Image src={reason.image} fluid={false}/>
                                        </div>  
                                    ))
                                }
                            </OwlCarousel>
                        </div>
                        <div className="content-text-images row mt-5">
                            <OwlCarousel options={optionsReason(_Reasons.length)} margin={10}>
                                {
                                    _Reasons.map((reason, index)=>(
                                        <div className="item mx-2" style={{width: width(_Reasons.length)}} key={index}>
                                            <h4 className="title" style={{fontWeight: 'bold'}}>{reason.title}</h4>
                                            <div className="description">
                                                <p>{reason.content}</p>
                                            </div>
                                        </div>  
                                    ))
                                }
                            </OwlCarousel>
                        </div>
                    </div>
                )
            }
        </div> 
    );
}

export function Partner(_parner){
    return (
        <div className="col mb-5 mb-5 mb-xl-0">
            <div className="text-center">
            <img className="img-fluid mb-4 px-4" src={_parner.imgPartner} alt="..." />
            <h5 className="fw-bolder">{_parner.name}</h5>
            </div>
        </div>
    );
}
export const Partners = () => {
    const [loading, setLoading] = useState(true);
    const [partners, setDataPartners] = useState([])
    useEffect(() => {
        return unSubscriber(setDataPartners, setLoading, 'Partners', []);
    }, []);
    if(loading){
        return (
            <Container>
                <h4 className="title">Our Partners</h4>
            </Container>
        )
    }
    return (<div>
        {
          partners.length <= 0
            ? 
                (
                    <Container>
                        <h2 className="title">Our Partners</h2>
                    </Container>
                )
            : 
                (
                    <section className="py-5 bg-light">
                        <Container className=" px-5 my-5">
                            <div className="text-center">
                                <h2 className="fw-bolder">Our Partners</h2>
                            </div>
                            <div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4 justify-content-center">
                                {
                                    partners.map((partner, index)=>(
                                        <Partner key={index} imgPartner ={partner.avatar} name={partner.name}/>
                                    ))
                                }
                            </div>
                        </Container>
                    </section>
                )
            }
        </div> 
    );
}
export function Quotation(quote) {
    return ( /**Testimonial section */
        <div className="py-5 bg-light">
            <div className="container px-5 my-5">
                <div className="row gx-5 justify-content-center">
                <div className="col-lg-10 col-xl-7">
                    <div className="text-center">
                    <div className="fs-4 mb-4 fst-italic">{quote.quotation}</div>
                    <div className="d-flex align-items-center justify-content-center">
                        <img className="rounded-circle me-3" src={quote.quotationImage} alt="..." />
                        <div className="fw-bold">
                        {quote.quotationAuthor}
                        <span className="fw-bold text-primary mx-1">/</span>
                        {quote.quotationPosition}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
export function Section(sec) {  
    return (
        <div className="col mb-5 h-100 text-decoration-none">
            <div className='d-flex justify-content-center'>
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3 w-25 h1 pt-3 pb-3">
                    <FontAwesomeIcon icon={sec.iconSectionHome} />
                </div>
            </div>
            <h2 className="h5 text-dark">{sec.featuredTitleHome}</h2>
            <p className="mb-0 text-dark">{sec.contentTitleHome}</p>
        </div>
    );
}
const faIcon = [faBuilding, faChartBar, faFileCode, faFileWord]
export function Sections(props) {   //props._courses store all of the data from firebase
    return(
        <section className="py-5 bg-light" id="features">
            <div className="container px-5 my-5">
                <div className="row gx-5 d-flex align-items-center">
                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <h2 className="fw-bolder mb-0">A better way to start your career</h2>
                        <Image className={'img-fluid rounded-3 my-5'} src={test_enrolling}/>
                    </div>
                    <div className="col-lg-8">
                        <div className="row gx-5 row-cols-1 row-cols-md-2">
                            {
                                props._courses.map((course,index)=>(
                                    index > parseInt(categoryCourses(props._courses)-1) ? "" :
                                        <Link key={index} to={"/"+course.key} className="text-decoration-none text-dark" >
                                            <Section 
                                                section={course.key}
                                                contentTitleHome={course.content} 
                                                featuredTitleHome={course.name}
                                                iconSectionHome={faIcon[index]}/>      
                                        </Link>  
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function SectionsMember(aMember) {
    return (
        <div className="col mb-5 mb-5 mb-xl-0">
            <div className="text-center">
            <img className="img-fluid rounded-circle mb-4 px-4" src={aMember.imgMember} alt="..." />
            <h5 className="fw-bolder">{aMember.member}</h5>
            <div className="fst-italic text-muted">{aMember.position}</div>
            </div>
        </div>
    );
}