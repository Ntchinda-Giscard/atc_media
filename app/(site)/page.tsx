import Image from "next/image";
import HomeBody from "./components/home_body";
import SampleUseCase from "./components/login";

export default function Home() {
  return (
    <div className="h-svh min-w-full">
      <HomeBody />
    </div>
  );
}
