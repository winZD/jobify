import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";
import Logo from "../public/logo.svg";
import Link from "next/link";
import LandingImg from "../public/business_plan.svg";

export default function Home() {
  return (
    <main>
      <header className="max-w-6xl px-4 sm:px-8 pt-6">
        <Image src={Logo} alt="logo" />
      </header>
      <section className="max-w-6xl pt-6 mx-auto px-4 justify-center sm:justify-start sm:px-8  h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            job <span className="text-primary">tracking</span> app
          </h1>
          <p className="leading-loose max-w-md mt-4 ">
            Track and analyze your job aplications.
          </p>
          <Button asChild className="mt-4">
            <Link href="/add-job">Get Started</Link>
          </Button>
        </div>
        <Image src={LandingImg} alt="landing" className="hidden lg:block " />
      </section>
    </main>
  );
}
