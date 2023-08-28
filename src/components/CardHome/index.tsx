import React, { useState } from "react";
import { IPropertyCard, Images } from "../../../models/types";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { LiaBedSolid } from "react-icons/lia";
import { PiBathtubLight } from "react-icons/pi";
import { BsXDiamond, BsStars } from "react-icons/bs";
import { PiPaintBrushBroad } from "react-icons/pi";

function HomeCard({
  images,
  title,
  address,
  price,
  bail,
  bathrooms,
  bedrooms,
  propertyType,
  searchType,
  neighborhood,
  poblation,
  m2,
}: IPropertyCard) {
  const [image, setImage] = useState(
    images[0] &&
      `${process.env.NEXT_PUBLIC_BACK_API}${(images[0] as Images).data.replace(
        /\s+/g,
        ""
      )}`
  );

  return (
    <article className="flex justify-center items-center h-full w-full my-8 border shadow-md rounded-xl">
      <div className="w-full h-full">
        <Image
          alt={title}
          src={image}
          onError={() => {
            setImage("/imgs/home.png");
          }}
          width={900}
          height={900}
          className="w-full h-full rounded-l-xl"
        />
        <div className="absolute">
          <div className="relative bottom-[160px] right-[616px] bg-black w-[100px] gap-1 flex justify-center items-center p-1 rounded-lg z-10">
            <BsStars size={16} color="white" />
            <p className="text-white text-sm">{searchType.toUpperCase()}</p>
          </div>
        </div>
      </div>
      <div className="w-full h-full 2xl:h-[400px] p-6 flex flex-col items-left justify-between">
        <div className="flex justify-start items-center">
          <h3 className="font-bold text-3xl my-8">
            €
            {(price &&
              price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")) ||
              (bail && bail.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))}
          </h3>
          {bail && <p className="text-2xl">/mes</p>}
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-2">{title}</h3>
          <div className="flex gap-1 items-center mb-8">
            <CiLocationOn size={20} />
            <p className="text-lg">
              {address},{" "}
              {neighborhood && (
                <>
                  {neighborhood.charAt(0).toUpperCase() + neighborhood.slice(1)}
                  ,{" "}
                </>
              )}
              {poblation.charAt(0).toUpperCase() + poblation.slice(1)},{" "}
            </p>
          </div>
        </div>
        <div className=" bg-[#66D0A442] p-5 rounded-xl flex justify-center gap-12 w-[500px] h-[100px]">
          <div className="flex flex-col items-center justify-evenly">
            <p className="text-[#686A79] font-light text-sm leading-6">
              Habitaciones
            </p>
            <div className="flex items-center justify-start gap-2 w-full font-bold">
              <LiaBedSolid size={20} />
              {bedrooms}
            </div>
          </div>
          <div className="flex flex-col items-center justify-evenly">
            <p className="text-[#686A79] font-light text-sm leading-6">Baños</p>
            <div className="flex items-center justify-start gap-2 w-full font-bold">
              <PiBathtubLight size={20} />
              {bathrooms}
            </div>
          </div>
          <div className="flex flex-col items-center justify-evenly">
            <p className="text-left w-full text-[#686A79] font-light text-sm leading-6">
              Área
            </p>
            <div className="flex items-center justify-start gap-2 w-full font-bold">
              <BsXDiamond size={18} />
              {m2}m2
            </div>
          </div>
          <div className="flex flex-col items-center justify-evenly">
            <p className="text-left w-full text-[#686A79] font-light text-sm leading-6">
              Tipo
            </p>
            <div className="flex items-center justify-start gap-2 w-full font-bold">
              <PiPaintBrushBroad size={20} />
              {propertyType &&
                propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default HomeCard;
