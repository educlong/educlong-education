import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {NavLink} from "react-router-dom";   /**Import NavLink để đổi tất cả các thẻ a thành NavLink (để thực hiện link trong single wep app) */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faTwitter, faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {mapApiKey} from './Models'

const containerStyle = {
    position: 'relative',  
    width: '100%',
    height: '100%'
  }
class Footer extends Component {
    render() {
        
        return (    /**Footer */
            <footer className="bg-dark py-4 mt-auto">
                <Container className='px5 text-white' fluid>
                    <Row>
                        <Col sm={5}  className='d-flex justify-content-center'>
                            <Container fluid>
                                <h5>EDUCLONG EDUCATION - Programming &#38; Multimedia</h5>
                                The study system of educlongeducation <br/> 
                                Download document in: educlongeducation.ca<br/>
                                Address: 81 West 1st St., Hamilton, Ontario, L9C 3C5, Canada <br/>
                                Hotline: (+1)-289-933-7974 (Nguyen Duc Long)<br/>
                                Email: educlong@gmail.com<br/>

                                <a href="https://www.linkedin.com/in/educlong/" target="_blank" className="text-decoration-none text-white">
                                    <FontAwesomeIcon icon={faLinkedin} className="h2 mx-2 mt-3" />
                                </a>
                                <a href="https://github.com/educlong/" target="_blank" className="text-decoration-none text-white">
                                    <FontAwesomeIcon icon={faGithub} className="h2 mx-2 mt-3" />
                                </a>
                                <a href="https://www.facebook.com/long.hx/" target="_blank" className="text-decoration-none text-white">
                                    <FontAwesomeIcon icon={faFacebook} className="h2 mx-2 mt-3" />
                                </a>
                                <a href="https://twitter.com/eDucLong" target="_blank" className="text-decoration-none text-white">
                                    <FontAwesomeIcon icon={faTwitter} className="h2 mx-2 mt-3"/>
                                </a>
                                <a href="https://www.instagram.com/educlong/" target="_blank" className="text-decoration-none text-white">
                                    <FontAwesomeIcon icon={faInstagram} className="h2 mx-2 mt-3"/>
                                </a>
                                <Row className="d-flex justify-content-center ">
                                    <div className="col-auto"><div className="small m-0 text-white">Copyright © Educlong Education {new Date().getFullYear()}</div></div>
                                </Row>
                                <Row className="d-flex justify-content-center ">
                                    <div className="col-auto">
                                        <NavLink className="link-light small" to="/news">News</NavLink>
                                        <span className="text-white mx-1">·</span>
                                        <NavLink className="link-light small" to="/terms">Terms</NavLink>
                                        <span className="text-white mx-1">·</span>
                                        <NavLink className="link-light small" to="/contact">Contact</NavLink>
                                    </div>
                                </Row>
                            </Container>
                        </Col>
                        <Col sm={7}  className='d-flex justify-content-center'>
                            <Map google={this.props.google} 
                                zoom={11} 
                                initialCenter={{lat:43.23171098933786, lng: -79.88095271660325 }}
                                containerStyle={containerStyle}>
                                <Marker onClick={this.onMarkerClick}
                                        name={'ELONG'} />
                                <InfoWindow onClose={this.onInfoWindowClose}>
                                    <div>
                                        <h1>ELONG</h1>
                                    </div>
                                </InfoWindow>
                            </Map>
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }
}
export default GoogleApiWrapper(
    (props) => ({
      apiKey: `${mapApiKey}`,
    }
))(Footer)