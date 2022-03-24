import React, { useState } from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import {SlideBarData, SubMenu} from './SlidebarHandle';

const Nav = styled.div`
    background: transparent;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`
const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 0px;
`
const SlideBarNav = styled.nav`
    background: #212529;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    position: fixed;
    top: 96px;
    left: ${({slidebar})=>(slidebar ? "0" : '-100%')};
    transition: 350ms;
    z-index: 10;
`
const SlidebarWrap = styled.div`
    width: 100%;
`
const SlideBar = (props) => {   //props._courses store all of the data from firebase (call this funtion in Navigation.js)
    const [slidebar, setSlidebar] = useState(false);
    const showSlidebar = ()=> setSlidebar(!slidebar);
    return (
        <IconContext.Provider value={{color: '#fff'}}>
            <Nav>
                <NavIcon to="#">
                    <FaIcons.FaBars onClick={showSlidebar}/>
                </NavIcon>
            </Nav>
            <SlideBarNav slidebar={slidebar}>
                <SlidebarWrap>
                    <NavIcon to="#">
                        <AiIcons.AiOutlineClose onClick={showSlidebar} style={{transform: "translateX(8px)"}}/>
                    </NavIcon>
                    {SlideBarData(props).map((item, index) =>{
                        return <SubMenu item = {item} key={index}/>
                    })}
                </SlidebarWrap>
            </SlideBarNav>
        </IconContext.Provider>
    )
}

export default SlideBar