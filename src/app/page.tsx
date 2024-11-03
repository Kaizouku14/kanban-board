import Header from "@/components/Header/header";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <main className="flex flex-col min-h-screen relative">
      <Header/>
      <article className="flex flex-col items-center justify-center flex-grow gap-y-4 p-8 md:p-12">
        <div className="flex flex-col items-center">
          <h1 className="mt-4 text-4xl font-extrabold text-center">
            Welcome to Your Kanban Board
          </h1>
          <p className="mt-2 text-center text-base text-gray-600 max-w-3xl">
            Unlock your productivity with our intuitive Kanban Board, designed
            to help you manage tasks effortlessly and visualize your workflow.
            Whether youre working on personal projects, team collaborations, or
            tracking your daily to-dos, our tool is here to enhance your
            experience.
          </p>
        </div>

        <Link href={"/home"}
          className="mt-4 px-6 py-2 text-secondary font-semibold rounded-lg bg-primary hover:bg-secondary-dark transition-colors duration-300">
          Get Started
        </Link>
      </article>

      <footer className="text-center p-4 border-t border-neutral-300">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Kaizouku. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
};

export default LandingPage;
