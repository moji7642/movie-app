import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper";
import axios from "axios";
import { apiKey, baseUrl, baseUrlImage } from "../../../api";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ImgSlider() {
  const [movies, setMovies] = useState([]);
  async function getMovie() {
    const { data } = await axios.get(
      `${baseUrl}/trending/all/day?api_key=${apiKey}`
    );
    setMovies(data.results);
  }
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {movies.map(
          (movie) => {
            return (
              <SwiperSlide key={movie.id} className="imgSliders">
                <img src={`${baseUrlImage}/w1280/${movie.backdrop_path}`} />
                <div className="gap-8 w-2/4 leading-7 z-50 absolute top-9 left-8 lg:top-40 left-8 ">
                  <h1 className="text-3xl uppercase font-bold">{movie.title}</h1>
                  <p className="mt-8">{movie.overview}</p>
                  <div>{movie.vote_average}</div>
                  <div>{movie.release_date}</div>
                  <Link to={`/videos/${movie.id}`}>
                    <button className="mt-8 bg-sky-400 px-6 py-1 rounded">
                      <i class="bi bi-play-fill"></i>Play Now
                    </button>
                  </Link>
                </div>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </>
  );
}
