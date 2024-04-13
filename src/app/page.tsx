import Catalogue from "@/components/Catalogue";
import Header from "@/components/Header";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center max-w-screen-2xl pt-[60px] px-6 md:pt-[45px] md:px-[30px]">
      <Header />
      <div className="flex flex-col items-center justify-center pt-[80px] max-w-[975px] w-full">
        <Reviews />
        <Catalogue />
      </div>
    </main>
  );
}
