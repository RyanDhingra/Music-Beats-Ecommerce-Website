import React from "react";
import './index.css'
import vidBg from '../../assets/videoBG.mp4'
import Cube from './Cube/index.js'

export default function Featured({featuredBeats}) {
    return (
        <div className="featured-section" id="featured">
            <video className="featured-vid" src={vidBg} autoPlay loop muted/>
            <Cube featuredBeats={featuredBeats}/>
            <div>
                <h1 className="featured-title">Hover over the image to listen to the beat!</h1>
                <h3 className="featured-text">Try it for yourself!</h3>
            </div>
        </div>
    )
}