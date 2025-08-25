import Login from "@/components/business/Login";
import { FlickeringGrid } from "@/components/ui/shadcn-io/flickering-grid";
import Image from "next/image";
import s from "../page.module.css";
import Aclaration from "@/components/business/aclaration";

export default function Home() {
  return (
    <div className={"mx-auto flex flex-row h-screen items-center"}>
      <aside className="h-full sm:flex hidden grow flex-1 relative">
        <Image
          src="/images/card.png"
          alt="Tenpo Logo"
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
        <div className="absolute bottom-4 left-4">
          <Aclaration />
        </div>
      </aside>
      <main className="sm:w-fit w-screen flex justify-center shadow-2xl h-screen items-center">
        <Login />
      </main>
    </div>
  );
}
