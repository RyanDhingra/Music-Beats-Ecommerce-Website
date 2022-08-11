import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "./index.css";
import { EffectCube, Pagination, Autoplay } from "swiper";
import { Howler, Howl } from "howler";

export default function Cube({featuredBeats}) {

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

  return (
    <>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        }}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        modules={[EffectCube, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="cube-img" onMouseEnter={event => playSound(event, new Howl({src: [featuredBeats[0].assets[0].url], html5: true}))} onMouseLeave={event => pauseSound(event, sound)} src={featuredBeats[0] ? featuredBeats[0].image.url:'https://glyric.com/modules/custom/glyrics_custom/images/player_default_cover.png'} alt="Track 1" />
          <h1 className="featured-beat-title">{featuredBeats[0] ? featuredBeats[0].name:"Beat 1"}</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img className="cube-img" onMouseEnter={event => playSound(event, new Howl({src: [featuredBeats[1].assets[0].url], html5: true}))} onMouseLeave={event => pauseSound(event, sound)} src={featuredBeats[1] ? featuredBeats[1].image.url:'https://glyric.com/modules/custom/glyrics_custom/images/player_default_cover.png'} alt="Track 2" />
          <h1 className="featured-beat-title">{featuredBeats[1] ? featuredBeats[1].name:"Beat 2"}</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img className="cube-img" onMouseEnter={event => playSound(event, new Howl({src: [featuredBeats[2].assets[0].url], html5: true}))} onMouseLeave={event => pauseSound(event, sound)} src={featuredBeats[2] ? featuredBeats[2].image.url:'https://glyric.com/modules/custom/glyrics_custom/images/player_default_cover.png'} alt="Track 3" />
          <h1 className="featured-beat-title">{featuredBeats[2] ? featuredBeats[2].name:"Beat 3"}</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img className="cube-img" onMouseEnter={event => playSound(event, new Howl({src: [featuredBeats[3].assets[0].url], html5: true}))} onMouseLeave={event => pauseSound(event, sound)} src={featuredBeats[3] ? featuredBeats[3].image.url:'https://glyric.com/modules/custom/glyrics_custom/images/player_default_cover.png'} alt="Track 4" />
          <h1 className="featured-beat-title">{featuredBeats[3] ? featuredBeats[3].name:"Beat 4"}</h1>
        </SwiperSlide>
      </Swiper>
    </>
  );
}