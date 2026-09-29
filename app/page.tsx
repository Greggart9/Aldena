import React from "react";
import LandingPage from "@/app/landingPage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Home = () => {
  return (
    <main>
      <LandingPage />
    </main>
  );
};

export default Home;