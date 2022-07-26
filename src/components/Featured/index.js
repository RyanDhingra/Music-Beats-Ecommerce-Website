import React from "react";
import './index.css'
import homeBg from '../../assets/homeBG.mp4'
import Cube from './Cube/index.js'
import headphones from '../../assets/headphones.png'
import download from '../../assets/download.png'

export default function Featured({featuredBeats}) {
    return (
        <div className="featured-section" id="featured">
            <video className="featured-vid" src={homeBg} autoPlay loop muted/>
            <Cube featuredBeats={featuredBeats}/>
            <div>
                <h1 className="featured-title">Hover over the image to listen to the beat!</h1>
            </div>
            <div className="top-label">
                <h3>Professional Beats</h3>
                <img className="top-label-image" src={headphones} alt="Professional Beats"/>
            </div>
            <div className="mid-label">
                <h3>Secure Payments</h3>
                <img className="mid-label-image" src="https://www.pngkit.com/png/full/333-3331142_white-lock-png-download-white-padlock-icon-png.png" alt="Secure Payments"/>
            </div>
            <div className="bot-label">
                <h3>Easy Downloads</h3>
                <img className="bot-label-image" src={download} alt="Less Than 24h Delivery"/>
            </div>
        </div>
    )
}