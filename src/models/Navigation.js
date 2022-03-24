import React from 'react';
import {NavLink} from "react-router-dom";   /**Import NavLink để đổi tất cả các thẻ a thành NavLink (để thực hiện link trong single wep app) */
import { Navbar, Container, Nav, NavDropdown, Image, Row, Col  } from 'react-bootstrap';
import logo from '../images/favicon.ico'
import {categoryCourses} from './Models'
import SlideBar from './slidebar/SlideBar';

export default function Navigation(props) { //props._courses_ store all of the data from firebase
    let _courses = props._courses_; 
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='w-100 position-fixed sticky-top'>
            <Container fluid>
                <SlideBar _courses={props._courses_}/>
                <Navbar.Brand href="/home" className='m-0 p-0'>
                    <Row className='m-0 p-0'>
                        <Col sm={3} className="mr-0 pr-0">
                            <Image src={logo} className="mb-3 w-100" />
                        </Col>
                        <Col sm={8} className='d-sm-block d-none ml-0 pl-0 mt-4 pt-3'>
                            <span >EDUCLONG EDUCATION</span>
                        </Col>
                    </Row>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className='mt-4 pt-2' />
                <Navbar.Collapse id="responsive-navbar-nav " className='mt-4 pt-3'>
                    <Nav className="ms-auto">
                        <NavLink to="/home" className="nav-link h6">Home</NavLink>
                        <NavDropdown title="Courses" id="collasible-nav-dropdown" className='bg-dark h6'>
                            {
                                _courses.map((course,index)=>(
                                    index > parseInt(categoryCourses(_courses)-1) ? "" :
                                        <NavLink key={index} to={"/"+course.key} className="nav-link bg-dark ">{course.name}</NavLink>       
                                ))
                            }
                        </NavDropdown>
                        {/* <NavLink to="/news" className="nav-link h6">News</NavLink> */}
                        {/* <NavLink to="/blog" className="nav-link h6">Blog</NavLink> */}
                        <NavLink to="/contact" className="nav-link h6">Contact - About us</NavLink>
                        <NavLink to="/signin" className="nav-link h6">Sign In</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}