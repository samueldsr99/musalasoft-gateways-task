import type { NextPage } from "next";

import BaseLayout from "@/layouts/base";
import Image from "next/image";
import githubLogo from "/public/github-logo.svg";
import Link from "next/link";

const About: NextPage = () => {
  return (
    <BaseLayout title="About me">
      <div className="mx-auto">
        <Image
          width={164}
          height={164}
          alt="Profile picture"
          className="mx-auto -translate-y-4 rounded-full object-cover"
          src="https://avatars.githubusercontent.com/u/42628316?v=4"
        />
        <h2 className="text-center font-mono font-bold">samueldsr99</h2>

        <div className="mx-auto mt-8 max-w-3xl space-y-4 rounded-md bg-zinc-600 px-4 py-8">
          <p>
            My name is Samuel David Suárez Rodríguez, I&apos;m a fullstack js
            developer from University of Havana, Cuba.
          </p>
          <p>
            The frontend stack was developed using React / Nextjs + Typescript.
            Used Tailwindcss + Headlessui for fast css prototyping due to the
            limited time for this project, react-query as the cache library,
            axios to communicate with the REST backend, react-hook-form + zod
            for form logic and validations.
          </p>
          <p>
            The backend stack mainly uses Express / Typescript due to the
            simplicity of the API. Also was used MongoDB as database system +
            Prisma as ORM(ODM in this case lol), zod as the validation library.
          </p>
          <p>
            Vercel is the hosting service on both (frontend & backend) sides.
            Using vercel edge functions in backend endpoints which makes the
            response time pretty fast for requests in all over the world.
          </p>
          <p>Hope you like this project as much as I did ;-{")"}.</p>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <Link href="https://github.com/samueldsr99" target="_blank">
          <Image
            src={githubLogo as string}
            alt="github-logo"
            className="h-12 w-12"
          />
        </Link>
      </div>
    </BaseLayout>
  );
};

export default About;
