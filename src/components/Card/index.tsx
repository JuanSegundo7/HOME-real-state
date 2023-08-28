import React, { useState } from "react";
import { IPropertyCard, Images } from "../../../models/types";
import Image from "next/image";
import { LiaBedSolid } from "react-icons/lia";
import { PiBathtubLight } from "react-icons/pi";
import { BsXDiamond, BsStars } from "react-icons/bs";
import { neighborhood } from "../../../utils/searchLists";
import { CiLocationOn } from "react-icons/ci";
import { useRouter } from "next/router";
import Home from "/imgs/home.png";

const Card = ({
  _id,
  images,
  title,
  address,
  price,
  bail,
  neighborhood,
  poblation,
  bathrooms,
  bedrooms,
  searchType,
  m2,
}: IPropertyCard) => {
  const router = useRouter();
  const [image, setImage] = useState(
    images[0] &&
      `${process.env.NEXT_PUBLIC_BACK_API}${(images[0] as Images).data.replace(
        /\s+/g,
        ""
      )}`
  );

  return (
    <div
      onClick={() => router.push(`/propiedad/${_id}`)}
      className="border rounded-lg cursor-pointer w-[350px] shadow-lg"
    >
      {images[0] && (
        <Image
          alt={title}
          src={image}
          onError={() => {
            setImage("/imgs/home.png");
          }}
          width={900}
          height={900}
          className="w-full rounded-t-lg h-[210px]"
        />
      )}
      <div className="absolute">
        <div className="relative bottom-4 right-2 bg-black w-[100px] gap-1 flex justify-center items-center p-1 rounded-lg">
          <BsStars size={16} color="white" />
          <p className="text-white text-sm">{searchType.toUpperCase()}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-start p-4">
        <div className="flex justify-start items-center">
          <p className="font-bold text-2xl my-2">
            €
            {(price &&
              price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")) ||
              (bail && bail.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))}
          </p>
          {bail && <p className="text-2xl">/mes</p>}
        </div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="flex flex-col items-start mb-8">
          <div className="flex gap-1 items-center">
            <CiLocationOn size={20} />
            <p className="text-lg">{address}</p>
          </div>
          <p className="pl-6 text-md text-left font-bold">
            {neighborhood && (
              <>
                {neighborhood.charAt(0).toUpperCase() + neighborhood.slice(1)},{" "}
              </>
            )}
            {poblation.charAt(0).toUpperCase() + poblation.slice(1)}
          </p>
        </div>
        <div className="flex gap-4 justify-between items-center w-full mt-4">
          <div className="flex items-center justify-center gap-2">
            <LiaBedSolid size={24} />
            <p>{bedrooms} camas</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <PiBathtubLight size={24} />
            <p>{bathrooms} baños</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <BsXDiamond size={24} />
            <p>{m2}m2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
