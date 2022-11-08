import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiKey, baseUrl, baseUrlImage } from "../../api";

export default function Movie() {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  async function dynamicMovie() {
    const { data } = await axios.get(
      `${baseUrl}/movie/${id}?api_key=${apiKey}`
    );
    console.log(data);
    setMovie(data);
  }

  useEffect(() => {
    dynamicMovie();
  }, [id]);
  return (
    <div>
      <div className="pt-20 bg-slate-900  ">
        <div className="flex gap-8 p-10">
          <div>
            <img
              src={`${baseUrlImage}/w1280/${movie.poster_path}`}
              className="object-cover w-72 h-68 "
              alt="test"
            />
          </div>
          <div>
            <div className="text-3xl font-bold">{movie.title}</div>
            <div className="text-lg">
              {movie.release_date} {movie.vote_average}
            </div>
            <div className="flex gap-24">
              <i className="bi bi-list-nested "></i>
              <i className="bi bi-heart-fill"></i>
              <i className="bi bi-caret-down-square-fill"></i>
              <i className="bi bi-star-fill"></i>
              <Link to={`/videos/${movie.id}`}>
              <button>
                <i className="bi bi-play-fill"></i>
                Play Trailer
              </button>
              </Link>
            </div>
            <div>
              <h1>overview</h1>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
