import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { apiKey, baseUrl, baseUrlImage } from "../../../api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

export default function UpComingCard() {
  const [bg, setBg] = useState("../../../images/home1.jpg");
  const [card, setCard] = useState([]);
  async function apiCard() {
    const { data } = await axios.get(
      `${baseUrl}/movie/upcoming?api_key=${apiKey}`
    );
    setCard(data.results);
  }
  useEffect(() => {
    apiCard();
  }, []);
  return (
    <div className=" h-fit" style={{ backgroundImage: `url('${bg}')` }}>
      <div className="py-4 px-6">
        <h1 className="text-2xl my-2">Up Coming</h1>
        <Swiper
          rewind={true}
          slidesPerView={1}
          spaceBetween={1}
          loop={true}
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
              slidesPerView: 4,
              spaceBetween: 15,
            },
          }}
          className="mySwiper"
        >
          {card.map((movie) => {
            function getImage (id) {
              return `${baseUrlImage}/w1280/${movie.backdrop_path}`
            }
            return (
              <SwiperSlide key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                <img
                  onMouseOver={(e) => setBg(getImage(movie.id))}
                  src={getImage(movie.id)}
                  className="object-cover w-full h-full rounded mt-2"
                  alt="test"
                />

                <div className="flex flex-col justify-center items-center mt-4  w-full h-full ">
                  <h3>{movie.title}</h3>
                  <h3>{movie.release_date}</h3>
                </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}