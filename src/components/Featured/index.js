import React from "react";
import './index.css'
import homeBg from '../../assets/homeBG.mp4'
import Cube from './Cube/index.js'

export default function Featured({featuredBeats}) {
    return (
        <div className="featured-section" id="featured">
            <video className="featured-vid" src={homeBg} autoPlay loop muted/>
            <Cube featuredBeats={featuredBeats}/>
            <div>
                <h1 className="featured-title">Hover over the image to listen to the beat!</h1>
            </div>
        </div>
    )
}