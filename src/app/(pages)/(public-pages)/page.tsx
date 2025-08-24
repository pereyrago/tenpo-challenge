import Login from "@/components/forms/Login";
import { FlickeringGrid } from "@/components/ui/shadcn-io/flickering-grid";
import Image from "next/image";
import s from "./page.module.css";

export default function Home() {
  return (
    <div className={"mx-auto flex flex-row h-screen items-center"}>
      <div className="h-full flex grow flex-1 relative">
        <Image
          src="/images/card.png"
          alt="Tenpo card"
          width={300}
          height={300}
          className={`m-auto z-10 ${s.card}`}
        />
        <FlickeringGrid
          className="absolute inset-0"
          squareSize={6}
          gridGap={8}
          flickerChance={0.3}
          color="rgb(100, 100, 100)"
          maxOpacity={0.25}
        />
      </div>
      <div className="sm:w-fit w-screen flex justify-center shadow-2xl h-screen items-center">
        <Login />
      </div>
    </div>
  );
}
