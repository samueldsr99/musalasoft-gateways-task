import type { NextPage } from "next";

import Button from "@/components/atom/button";
import Typography from "@/components/atom/typography";
import Navbar from "@/components/navbar";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="px-8 pt-20 sm:px-20">
        <Typography as="h1" weight="bold" size="5xl" align="center">
          Gateways management
        </Typography>
        <div className="mx-auto mt-20 flex max-w-sm flex-col gap-8">
          <Link href="/gateways">
            <Button className="w-full" size="xl" textCentered>
              Manage Gateways
            </Button>
          </Link>
          <Link href="/gateways/new">
            <Button
              className="w-full"
              variant="secondary"
              size="xl"
              textCentered
            >
              Add Gateway
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
