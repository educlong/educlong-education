 import { Routes ,Route, Navigate } from 'react-router-dom';
import Home from './home/Home';
import CourseDetail from './courses/CourseDetail';
import NotFoundPage from '../NotFoundPage';
import {categoryCourses} from './Models'
import Contact from './contact/Contact';
import Courses from './courses/Courses';

export default function Routers(props) {    //props._courses_ store all of the data from firebase
    let _courses = props._courses_
    return (
        <div>
            {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
            */}
            <Routes>
                <Route path='/' element={<Home _courses_ = {_courses}/>}/>
                <Route path='/home' element={<Home _courses_ = {_courses}/>}/>
                { _courses.map((course,index)=>( 
                    index >= parseInt(categoryCourses(_courses)) //navigate <Courses/> has to equal navigate <Courses/> in <CourseDetail/>
                    ? ""
                    : <Route key={index} path={'/'+course.key} element={<Courses course = {course} _courses_ = {_courses}/>} /> 
                )) }
                { _courses.map((course,index)=>( 
                    index >= parseInt(categoryCourses(_courses)) 
                    ? ""
                    : <Route key={index} path={"/"+course.key+"/:slug.:id.html"}  element={<CourseDetail _courses_ = {_courses}/>} /> 
                )) }
                {/* <Route path='/news'/> */}
                {/* <Route path='/Partner'/> */}
                {/* <Route path='/blog'/> */}
                <Route path='/contact'  element={<Contact signIn = {false}/>}/>
                {/* <Route path='/about'/> */}
                <Route path='/signin'   element={<Contact signIn = {true}/>}/>
                {/* <Route path='/terms'/> */}
                <Route path='*' element={<Navigate to='/not-found-page'/>}/>
                <Route path='/not-found-page' element={<NotFoundPage loadingPage ={false}/>}/>
            </Routes>
        </div>
    );
}