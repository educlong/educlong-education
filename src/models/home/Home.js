import React from 'react';
import { Team } from '../Models';
import './Home.css';
import Reasons, { Feedbacks, ImageSlider, Navigation, Partners, Quotation, Sections } from './HomeHandle';



export default function Home(props){    //props._courses_ store all of the data from firebase
    let _courses = props._courses_;
    return (
        <div>
            {/* Slide bar handle (Banner)*/}
            <ImageSlider _courses = {props._courses_}/>
            {/* Introduce section (Welcome page) */}
            <Sections _courses={_courses}/>
            {/* Navigation for courses and List of courses section */}
            <Navigation _courses_={_courses}/>
            {/* Quotation section */}
            <Quotation quotation='"Working with Start Bootstrap templates has saved me tons of development time when building new projects! Starting with a Bootstrap template just makes things easier!"' 
                quotationAuthor='Tom Ato' 
                quotationPosition='CEO, Pomodoro'
                quotationImage = "https://dummyimage.com/40x40/ced4da/6c757d"/>
            {/* Partners section */}
            <Partners/>
            {/* Reasons section */}
            <Reasons/>
            {/* Team section */}
            <Team/>
            {/* Feedback section */}
            <Feedbacks/>
        </div>
    );
}

