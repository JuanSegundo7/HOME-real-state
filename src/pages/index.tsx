import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-start w-full min-h-[100vh] text-black h-full bg-slate-400">
      <div className="relative w-full">
        <div className="absolute inset-0 w-full h-screen filter saturate bg-madrid bg-cover bg-no-repeat bg-center"></div>
        <div className="relative h-screen flex items-center justify-center">
          <div className="bg-white m-4 p-4 rounded-lg w-fit mt-10 flex items-center justify-center flex-col">
            <Image
              src="/imgs/home.png"
              alt="logo"
              width={200}
              height={200}
              unoptimized
            />
            <h2 className="text-black teext-xl sm:text-3xl mt-2 mb-8 text-center">
              Juntos a tu nuevo hogar
            </h2>
            <article className="flex flex-col sm:flex-row justify-center gap-2">
              <Link href="/inmueble">
                <div className="bg-home-light-blue p-2 rounded-lg cursor-pointer hover:bg-home-dark-blue transition duration-300">
                  <p className="text-white text-center font-bold tracking-wider">
                    Registrar un inmueble
                  </p>
                </div>
              </Link>
              <Link href="/cliente">
                <div className="bg-home-light-blue p-2 rounded-lg cursor-pointer hover:bg-home-dark-blue transition duration-300">
                  <p className="text-white text-center font-bold tracking-wider">
                    Registrar un cliente
                  </p>
                </div>
              </Link>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
