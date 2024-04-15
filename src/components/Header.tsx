import { ModeToggle } from "./ModeToggle";

export default function Header() {
    return (
        <div className="flex flex-col items-center justify-between w-full">
            <h1 className="text-2xl md:text-6xl sm:text-4xl lg:text-8xl font-normal flex items-center justify-center text-white bg-[#777777] rounded-2xl w-full mb-[40px] py-3">
                тестовое задание!
            </h1>
            <div className="flex items-center justify-between max-w-[975px] w-full">
                <h3 className="tracking-wide text-2xl ">
                     React Developer (Next.js)
                </h3>
                <ModeToggle />
            </div>
            
        </div>

    );
}