import React from "react";
import './index.css'
import contactBG from "../../assets/contactBG.mp4"
import emailjs from 'emailjs-com'
import Form from './Form/index.js'
import { useRef } from "react";

export default function Contact() {
    const form = useRef();

    function sendEmail(e) {
        
            e.preventDefault();

            emailjs.sendForm('service_kxkrwwe', 'template_gi4gjwg', form.current, process.env.REACT_APP_CHEC_PUBLIC_KEY_EMAILJS)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            e.target.reset()
            alert("Your message has been sent successfully!");
    };

    return (
            <div className="contact-section" id="contact">
                <video className="contact-vid" src={contactBG} autoPlay loop muted/>
                <div className="form-container">
                    <Form/>
                    <form className="contact-form" ref={form} onSubmit={sendEmail}>
                        <label>Name:</label>
                        <input className="name-input" type="text" name="user_name" placeholder="Enter your name here..." required='true' />
                        <label>Email:</label>
                        <input className="email-input" type="email" name="user_email" placeholder="Enter your email here..." required='true' />
                        <label>Message:</label>
                        <textarea className="message-input" name="message" placeholder="Enter your message here..." required='true' />
                        <input className="send-button" type="submit" value="Send" />
                    </form>
                </div>
                <div className="youtube">
                    <a href="https://www.youtube.com/c/YunginzPROD" target='_blank' rel="noreferrer">
                        <img className="yt-img" src="https://www.freeiconspng.com/thumbs/youtube-logo-png/hd-youtube-logo-png-transparent-background-20.png" alt="YouTube"/>
                    </a>
                </div>
                <div className="instagram">
                    <a href="https://www.instagram.com/yunginz.prod/" target='_blank' rel="noreferrer">
                        <img className="ig-img" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" alt="YouTube"/>
                    </a>
                </div>
            </div>
    )
}