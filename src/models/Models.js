import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import * as IoIcons from 'react-icons/io';
import { unSubscriber } from "../stores/FirebaseConfig";


export const linkApiThumbnail = "https://img.youtube.com/vi/";
export const sizeApiThumbnail = "/sddefault.jpg";
export const mapApiKey = "AIzaSyCbsua4EskTMpwMIvO5vkvTgw35rhCwTfs";

// calculate the total of kind of course in page
export const categoryCourses = (courses) =>  {    //lengthCourses store all of the data from firebase
    let count = 0;
    courses.forEach(element => {
        if(element._id < 1000) count++
    });
    return count;
};
//get a list of kind of courses in page
export function courses(props){    //props._courses store all of the data from firebase
    let dataCourses = (props._courses)
    let listCourses = []
    dataCourses.forEach((element, index) => {
        if(index < categoryCourses(props._courses))
            listCourses.push({
                title: element.type,
                path: "/"+element.key,
                icon: <IoIcons.IoIosPaper/>
        });
    });
    return listCourses;
} 
// friendly-link (SEO)
export const toSlug = (str) =>{
    // Chuyển hết sang chữ thường
    str = str.toString().toLowerCase();
    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
}

//call this function in App.js
export function AsideDelivered(){
    return ( /* Call to action*/
        <aside className="bg-primary bg-gradient rounded-3 p-4 p-sm-5 mt-5">
            <div className="d-flex align-items-center justify-content-between flex-column flex-xl-row text-center text-xl-start">
                <div className="mb-4 mb-xl-0">
                    <div className="fs-3 fw-bold text-white">New products, delivered to you.</div>
                    <div className="text-white-50">Sign up for our newsletter for the latest updates.</div>
                </div>
                <div className="ms-xl-4">
                    <div className="input-group mb-2">
                        <input className="form-control" type="text" placeholder="Email address..." aria-label="Email address..." aria-describedby="button-newsletter" />
                        <button className="btn btn-primary" id="button-newsletter" type="button">
                            <a href="mailto: educlong@gmail.com" className="text-decoration-none text-white bg-primary" >
                                Sign up 
                            </a>
                        </button>
                    </div>
                    <div className="small text-white-50">We care about privacy, and will never share your data.</div>
                </div>
            </div>
        </aside>
    );
}
export  function Team(){
    
    const [loading, setLoading] = useState(true);
    const [members, setDataTeam] = useState([])
    useEffect(() => {
        return unSubscriber(setDataTeam, setLoading, 'Team', []);
    }, []);

    if(loading){
        return (
            <Container>
                <h2 className="title">Our team</h2>
            </Container>
        )
    }
    return (<div>
        {
          members.length <= 0
            ? 
                (
                    <Container>
                        <h2 className="title">Our team</h2>
                    </Container>
                )
            : 
                (
                    <section className="py-5 bg-light">
                        <div className="container px-5 my-5">
                            <div className="text-center">
                                <h2 className="fw-bolder">Our team</h2>
                                <p className="lead fw-normal text-muted mb-5">Dedicated to quality and your success</p>
                            </div>
                            <div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4 justify-content-center">
                                {
                                    members.map((member, index)=>(
                                        <SectionsMember key={index} imgMember={member.avatar}
                                                member={member.name} position={member.position}/>
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                )
            }
        </div> 
    );
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