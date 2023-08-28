import Search from "@/components/Search";
import PropertysHome from "@/components/PropertysHome";
import { useSelector } from "react-redux";
import { selectSearchData } from "../../redux/reselect/searchSelector";
import Image from "next/image";

const Home = () => {
  const search = useSelector(selectSearchData);
  const { searchTypeForHome } = search;

  return (
    <section className="flex flex-col items-center justify-center w-full h-full text-black bg-white my-10">
      <article className="w-full h-full max-w-[1500px] px-16 flex flex-col lg:flex-row items-center justify-center lg:gap-[130px] xl:gap-[100px]">
        <div className="h-full w-full flex justify-end flex-col">
          <h3 className="font-semibold  text-3xl md:text-6xl lg:text-5xl xl:text-7xl text-center  lg:text-left lg:leading-[40px] xl:leading-[68px] xl:tracking-[-4.38px] text-[#191A23]">
            La forma más facil de encontrar tu propiedad soñada
          </h3>
          <p className="mt-5 text-lg font-light lg:ax-w-[560px] text-[#9C9292] text-center lg:text-lg lg:text-left lg:leading-[26px]">
            Somos personas creativas que te proporcionamos la mejor manera de
            tener un nuevo lugar comodo y adecuado para vivir
          </p>
        </div>
        <div className="hidden h-[600px] w-full  lg:flex items-start lg:justify-start  xl:justify-center relative">
          <Image
            src="/imgs/home-image-1.png"
            alt="home-1"
            width={297}
            height={446}
            className="rounded-[50px] border border-black lg:w-[268px] lg:h-[415px] 2xl:w-[298px] 2xl:h-[445px]"
          />

          <div className="absolute">
            <div className=" relative lg:top-[154px] lg:left-[12em] 2xl:top-[154px] 2xl:left-[16em] flex items-center justify-center">
              <Image
                src="/imgs/home-image-2.png"
                alt="home-2"
                width={284}
                height={362}
                className="rounded-[50px] border border-black lg:w-[255px] lg:h-[330px] 2xl:w-[285px] 2xl:h-[360px]"
              />
            </div>
          </div>
        </div>
      </article>
      <div className="w-full px-16 mb-3 flex items-center justify-center">
        <Search />
      </div>
      {searchTypeForHome === "Alquiler" ? (
        <PropertysHome alquiler />
      ) : (
        <PropertysHome venta />
      )}
    </section>
  );
};

export default Home;
