import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./BeatSwiper.css";
import { Howl, Howler } from "howler";
import silence from '../../../assets/silence.mp3'

export default function BeatSwiper({prod_list, viewBeat}) {

  let sound = null;

  const playSound = (event, curr_sound) => {
    Howler.volume(1.0)
    sound = curr_sound;
    sound.play();
  }

  const pauseSound = (event, curr_sound) => {
    if (curr_sound) {
      curr_sound.stop();
      curr_sound.unload();
    }
  }  

  const beatClicked = (event, beatToView) => {
    pauseSound(event, sound);
    viewBeat(event, beatToView)
  }

  let x = 0;
  let groupedProds = [];
  let total_prods = prod_list.length;
  
  let noimage = {
    url: "https://www.transparenttextures.com/patterns/debut-light.png"
  }

  let nosound = {
    url: silence
  }

  let noassets = {nosound, noimage}

  let placeholder = {
    name: "",
    description: "",
    image: noimage,
    assets: noassets,
    showItem: true
  }

  while (x < total_prods) {
    let temp = [];
    if (x + 2 === total_prods) {
      temp.push(prod_list[x]);
      temp.push(prod_list[x + 1]);
      temp.push(placeholder);
      groupedProds.push(temp);
      break;
    } else if (x + 1 === total_prods) {
      temp.push(prod_list[x]);
      temp.push(placeholder);
      temp.push(placeholder);
      groupedProds.push(temp);
      break;
    } else {
      temp.push(prod_list[x]);
      temp.push(prod_list[x + 1]);
      temp.push(prod_list[x + 2]);
      groupedProds.push(temp);
    }
    x += 3;
  }

  return (
      <>
        <div className="beat-swiper">
          <Swiper className="mySwiper">
            {
            groupedProds.map((slide) => (
              <SwiperSlide className="beat-slide">
                <div className="card-container">
                  <img onClick={event => beatClicked(event, slide[0])} onMouseEnter={event => playSound(event, new Howl({src: [slide[0].assets[0].url], html5: true}))} onMouseLeave={event => pauseSound(event, sound)} className={slide[0].showItem ? 'placeholder': 'card'} src={slide[0].image.url} alt="card"/>
                  <h2 className="click-to-view no-hover">Click to View</h2>
                </div>
                <div className={slide[0].showItem ? 'placeholder-text': 'info-text'}>
                  <h2>{slide[0].name}</h2>
                  <p dangerouslySetInnerHTML={{ __html: slide[0].description}}/>
                </div>
                <div className="card-container">
                  <img onClick={event => beatClicked(event, slide[1])} onMouseEnter={event => playSound(event, new Howl({src: [slide[1].assets[0].url], html5: true}))} onMouseLeave={event => pauseSound(event, sound)} className={slide[1].showItem ? 'placeholder': 'card'} src={slide[1].image.url} alt="card"/>
                  <h2 className="click-to-view no-hover">Click to View</h2>
                </div>
                <div className={slide[1].showItem ? 'placeholder-text': 'info-text'}>
                  <h2>{slide[1].name}</h2>
                  <p dangerouslySetInnerHTML={{ __html: slide[1].description}}/>
                </div>
                <div className="card-container">
                  <img onClick={event => beatClicked(event, slide[2])} onMouseEnter={event => playSound(event, new Howl({src: [slide[2].assets[0].url], html5: true}))} onMouseLeave={event => pauseSound(event, sound)} className={slide[2].showItem ? 'placeholder': 'card'} src={slide[2].image.url} alt="card"/>
                  <h2 className="click-to-view no-hover">Click to View</h2>
                </div>
                <div className={slide[2].showItem ? 'placeholder-text': 'info-text'}>
                  <h2>{slide[2].name}</h2>
                  <p dangerouslySetInnerHTML={{ __html: slide[2].description}}/>
                </div>      
              </SwiperSlide>
            ))
            }
          </Swiper>
        </div>
      </>
  );
}