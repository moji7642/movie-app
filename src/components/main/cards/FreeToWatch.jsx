import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { apiKey, baseUrl } from "../../../api";
import MovieCard from "../styleCard/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css/navigation";
import { mench } from "../../services/mench";

export default function FreeToWatch() {
  const [card, setCard] = useState([]);
  async function freeToWatch() {
    const { data } = await mench.get(`movie/popular`);
    setCard(data.results);
  }
  useEffect(() => {
    freeToWatch();
  }, []);
  return (
    <div className="py-4 px-6">
      <h1 className="text-2xl my-2">Free To Watch</h1>
      <Swiper
        rewind={true}
        navigation={true}
        slidesPerView={1}
        spaceBetween={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 6,
            spaceBetween: 15,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {card.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
