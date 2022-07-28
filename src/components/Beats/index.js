import { useState } from "react";
import './index.css'
import beatsBG from "../../assets/beatsBG.mp4"
import BeatSwiper from "./BeatSwiper/index.js"
import { Howl, Howler } from "howler";
import stop from '../../assets/stop.png'
import backButton from '../../assets/backButton.png'
import TypeAnimation from "react-type-animation";
import skip from '../../assets/skip.png'

export default function Beats({ beats1, beats2, kits, onAddToCart }) { 
    const [returnData, setReturnData] = useState(false);
    const [currBeat, setCurrBeat] = useState(null);
    const [sound, setSound] = useState(null);
    const [image, setImage] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/DYoung.svg/120px-DYoung.svg.png');

    const playSound = () => {
      sound.stop();
      sound.unload();
      Howler.volume(1.0);
      sound.play()
    }

    const seekSound = () => {
        sound.pause()
        let currTime = sound.seek()
        sound.stop()
        sound.unload()
        sound.seek([currTime + 10], [sound.play()])
    }
  
    const stopSound = () => {
      sound.stop();
      sound.unload();
    }  

    const goBack = (event) => {
        stopSound(event)
        handleReturnData(event, null)
    }

    const handleReturnData = (event, beatToView) => {
        setCurrBeat(beatToView);
        if (beatToView != null) {
            setSound(new Howl({src: [beatToView.assets[0].url], html5: true}));
            setImage(beatToView.image.url)
        }
        setReturnData(!returnData);
    }
    console.log(currBeat)

    const prices = {
        Exclusive: "$300",
        "Lease MP3": "$25",
        "Lease WAV": "$65",
        "Unlimited Lease": "$80"
    }

    return (
        <div className="beats-section" id="browse">
            <video className="beats-vid" src={beatsBG} autoPlay loop muted/>
            <div className="beats-display">
                <h1 className={returnData ? "beats-title inactive":"beats-title"}>Beats</h1>
                <div className={returnData ? "beats-slider1 inactive":"beats-slider1"}>
                    <BeatSwiper prod_list={beats1} viewBeat={handleReturnData}/>
                </div>
                <div className={returnData ? "beats-slider2 inactive":"beats-slider2"}>
                    <BeatSwiper prod_list={beats2} viewBeat={handleReturnData}/>
                </div>
            </div>
            <div className="kits-display">
                <h1 className={returnData ? "kits-title inactive":"kits-title"}>Kits</h1>
                <div className={returnData ? "kits-slider inactive":"kits-slider"}>
                    <BeatSwiper prod_list={kits} viewBeat={handleReturnData}/>
                </div>
            </div>
            <div className={returnData ? "view-item":"view-item inactive"}>
                <img className={returnData ? "view-image": "view-image inactive"} src={image} alt="Sound Cover"/>
                <img className={returnData ? "play-button": "play-button inactive"} src='https://icon-library.com/images/video-play-icon-transparent/video-play-icon-transparent-5.jpg' alt="Play" onClick={returnData ? () => playSound(): null}/>
                <img className={returnData ? "stop-button": "stop-button inactive"} src={stop} alt="Stop" onClick={returnData ? () => stopSound(): null}/>
                <img className={returnData ? "seek-button": "seek-button inactive"} src={skip} alt="Seek" onClick={returnData ? () => seekSound(): null}/>
                <TypeAnimation cursor={false} sequence={[1500, returnData ? currBeat.name:""]} className={returnData ? "view-title": "view-title inactive"}/>
                <p className={returnData ? "view-desc": "view-desc inactive"} dangerouslySetInnerHTML={{ __html: returnData ? currBeat.description:""}} />
                <button onClick={event => goBack(event)} className={returnData ? "back-button": "back-button inactive"}>
                    <img className={returnData ? "arrow": "arrow inactive"} src={backButton} alt="Go Back"/>
                </button>
                <div className={returnData ? "variants": "variants inactive"}>
                    {currBeat?.variant_groups[0].options.map((variant) => (
                        <button onClick={returnData ? () => onAddToCart(currBeat.id, currBeat.variant_groups[0].id, variant.id):null} className={returnData ? "cart-button": "cart-button inactive"}>
                            {variant.name} <br/> {prices[variant.name]}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}