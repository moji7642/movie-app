import React from "react";
import FreeToWatch from "./cards/FreeToWatch";
import NowPlayingCard from "./cards/NowPlayingCard";
import PopularCard from "./cards/PopularCard";
import TopRateCard from "./cards/TopRateCard";
import TrendingCard from "./cards/TrendingCard";
import UpComingCard from "./cards/UpComingCard";

export default function Main() {
  return (
    <>
      <TopRateCard />
      <NowPlayingCard />
      <UpComingCard />
      <FreeToWatch />
      <PopularCard />
      <TrendingCard />
    </>
  );
}
