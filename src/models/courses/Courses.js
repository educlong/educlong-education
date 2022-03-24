import { Col, Container, Dropdown, DropdownButton, FormControl, InputGroup, Row } from "react-bootstrap";
import Course from "../home/Course";
import * as FaIcons from 'react-icons/fa';
import { useState } from "react";
import styled from "styled-components";


const DropdownButtons = styled(DropdownButton)`
    button:first-child{
        background-color: transparent;
        color: black;
        border-color: gray;
    }
`

export default function Courses(_courses){      //_courses._courses_ store all of the data from firebase
    const [search, setSearch] = useState('');   //_courses.course store a course from Routers.js that is transfered
    let dataCourses = _courses._courses_;
    return(
        <section className="py-5">
            <Container className="px-0">
                <Row>
                    <Col xs={12} sm={12} md={4} className="my-4">
                        <InputGroup size="lg">
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" 
                                placeholder="Search courses" 
                                onChange={(event)=>{
                                    setSearch(event.target.value)
                                }}/>
                            <InputGroup.Text id="inputGroup-sizing-lg" className="bg-transparent">
                                <FaIcons.FaSearch/>
                            </InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col xs={12} sm={12} md={{ span: 4, offset: 4 }} className="pull-right my-4">
                        <DropdownButtons id="dropdown-item-button" title="Search Professor " style={{backgroundColor: "transparent"}} size="lg">
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" 
                                placeholder="Search Professor" className="border-0" 
                                onChange={(event)=>{
                                    setSearch(event.target.value)
                                }}/>
                                <Dropdown.Item as="button" onClick={()=>setSearch('')}>All</Dropdown.Item>
                            {
                                dataCourses.map((aCourse, index) => (
                                    <Dropdown.Item as="button" key={index} onClick={()=>{
                                        setSearch(aCourse.author)
                                    }}>{aCourse.author}</Dropdown.Item>
                                ))
                            }
                        </DropdownButtons>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Container fluid >
                            <h2 className=" mb-2">{_courses.course.name}</h2>
                            <h4 className="lead fw-normal text-muted mb-5">{_courses.course.intro}</h4>
                            <Row>
                                {
                                    dataCourses.map((aCourse, index)=>(
                                        (_courses.course.key !== aCourse.key) ? null :
                                            (
                                                aCourse._id === _courses.isCourseID ? null :
                                                    (
                                                        !(aCourse.title.toLowerCase().trim().includes(search.toLowerCase().trim())
                                                        || aCourse.author.toLowerCase().trim().includes(search.toLowerCase().trim()))
                                                        ? "" :
                                                        <Course key={index}  aData = {aCourse} />
                                                    )
                                            )
                                    ))
                                }
                            </Row>
                        </Container>
                    </Col>
                </Row>
                
            </Container>
        </section>
    )
}