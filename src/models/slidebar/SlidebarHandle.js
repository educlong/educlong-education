import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import {courses} from '../Models';

const SlidebarLink = styled(Link)`
    display: flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    font-weight: bold;
    height: 60px;
    text-decoration: none;
    font-size: 18px;
    &:hover{
        background: #ced4da;
        border-left: 4px solid #632ce4;
        cursor: pointer;
    }
`
const SlidebarLabel = styled.span`
    margin-left: 16px;
`
const DropdownList = styled(Link)`
    background: #414757;
    height: 60px;
    font-weight: bold;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    &:hover{
        background: #ced4da;
        cursor: pointer;
    }
`
export const SubMenu = (item) =>{
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);
    return(
        <>
            <SlidebarLink to={item.item.subNav ? "#" : item.item.path} onClick={item.item.subNav && showSubnav}>
                <div>
                    {item.item.icon}
                    <SlidebarLabel>
                        {item.item.title}
                    </SlidebarLabel>
                </div>
                <div>
                    {item.item.subNav && subnav ? item.item.iconOpened : (item.item.subNav ? item.item.iconClodsed : null)}
                </div>
            </SlidebarLink>
            {subnav &&  item.item.subNav.map((_item, index) => {
                return(
                    <DropdownList to={_item.path} key={index}>
                        {_item.icon}
                        <SlidebarLabel>
                            {_item.title}
                        </SlidebarLabel>
                    </DropdownList>
                )
            })}
        </>
    )
}

// data for slide bar
export const SlideBarData = (props) => [
    {
        title: 'Home',
        path: "/home",
        icon: <AiIcons.AiFillHome/>,
        iconClodsed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>
    },
    {
        title: 'Courses',
        path: "/courses",
        icon: <AiIcons.AiFillBook/>,
        iconClodsed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: courses(props)
    },
    {
        title: 'News',
        path: "/news",
        icon: <FaIcons.FaNewspaper/>,
    },
    {
        title: 'Blog',
        path: "/blog",
        icon: <FaIcons.FaBlog/>,
    },
    {
        title: 'Contact',
        path: "/contact",
        icon: <AiIcons.AiFillMail/>,
    },
]