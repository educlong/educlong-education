import React from 'react';
import { Team } from '../Models';
import { ContactCards, Forms, Header } from './ContactHandle';

export default function Contact(props) {
    return (
        <section className="py-5">
            <div className="container px-5">    {/* Contact form*/}
                <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                    <Header signIn = {props.signIn}/>
                    <Forms signIn = {props.signIn}/>
                </div>
                <ContactCards/>                 {/**Contact cards */}
                <Team/>
            </div>
        </section>
    );
}