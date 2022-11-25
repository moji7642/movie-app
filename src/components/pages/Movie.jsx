import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { baseUrlImage } from "../../api";
import { UserContext } from "../../context/UserContext";
import { mench } from "../services/mench";
import ReactStars from "react-rating-stars-component";

export default function Movie() {
  const [movie, setMovie] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const { user, session, favoriteMovies } = useContext(UserContext);

  useEffect(() => {
    if (session && favoriteMovies.length) {
      const favMovie = favoriteMovies.find((f) => f?.id === movie?.id);
      setIsFavorite(Boolean(favMovie));
    }
  }, [movie, favoriteMovies]);
  console.log(isFavorite);

  async function handleWatch() {
    if (session) {
      const result = await mench.post(`account/${user.id}/favorite`, {
        media_type: "movie",
        media_id: movie.id,
        favorite: true,
      });
      toast.success(`${movie.title} has been added to your favorites `);
    } else {
      toast.error("please login");
    }
  }

  async function dynamicMovie() {
    const { data } = await mench.get(`movie/${id}`);
    setMovie(data);
  }
  async function ratingChanged(rate) {
    if (session) {
      mench.post(`movie/${movie.id}/rating`, { value: rate * 2 });
      toast.success("you voted successfully");
    } else {
      toast.error("please login");
    }
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
              {isFavorite ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              )}
              <i className="bi bi-caret-down-square-fill"></i>
              <div className="grid grid-cols-4 items-center">
                <div className="col-span-1  pr-5">vote!:</div>
                <div className="col-span-3 ">
                  {movie.vote_average ? (
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      value={movie.vote_average / 2}
                      emptyIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      }
                      filledIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="gold"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      }
                      activeColor="#ffd700"
                    />
                  ) : (
                    <div>TEST</div>
                  )}
                </div>
              </div>
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
            <button
              onClick={handleWatch}
              class="bg-violet-500 mt-3 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ..."
            >
              Add To Favorites!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
