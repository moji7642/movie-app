import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { apiKey, baseUrl } from "../../api";

export default function TrailerMovie() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  async function getVideo() {
    try {
      const { data } = await axios.get(
        `${baseUrl}/movie/${id}?api_key=${apiKey}&append_to_response=videos`
      );
      setMovie(data);
      console.log(movie);
    } catch {
      console.log("error");
    }
  }
  useEffect(() => {
    getVideo();
  }, [id]);
  return (
    <div>
      {movie ? (
        <>
          <div className="pt-28 text-3xl text-center">{movie.title}</div>
          {movie.videos.results.map((item) => {
            return (
               <iframe
               width="50%"
               height="300px"
               className="mx-auto mt-5 mb-5"
                src={`https://www.youtube.com/embed/${item.key}`}
              ></iframe>
            );
          })}
        </>
      ) : (
        <div className="pt-52">loading</div>
      )}
    </div>
  );
}
