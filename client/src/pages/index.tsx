import type { NextPage } from "next";

import Navbar from "@/components/navbar";

const Home: NextPage = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="px-20 pt-20">
        <h1>Gateways management</h1>
        <section>Hero</section>
      </main>
    </div>
  );
};

export default Home;
