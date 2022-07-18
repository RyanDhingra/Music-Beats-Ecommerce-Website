import React from "react";
import TypeAnimation from "react-type-animation";
import './index.css'

const Form = () => {
    return (
        <div className="header-text">
            <h1>
                <TypeAnimation cursor={false} sequence={["Need something more specific? Send a message for further inquiries..."]}/>
            </h1>
        </div>
    );
}

export default Form