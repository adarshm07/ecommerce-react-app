import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

export default function Slider({ sliders, ...props }) {
  return (
    <Swiper
      pagination={true}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
      loop={true}
      {...props}
    >
      {sliders && sliders.map((slider) => <SwiperSlide>{slider}</SwiperSlide>)}
    </Swiper>
  );
}
