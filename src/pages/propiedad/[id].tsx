import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { selectPropertiesData } from "../../../redux/reselect/propertySelector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/stores";
import { getProperties } from "../../../redux/slices/propertySlice";
import { IProperty, Images } from "../../../models/types";
import Image from "next/image";
import { LiaBedSolid } from "react-icons/lia";
import { PiBathtubLight, PiPaintBrushBroad } from "react-icons/pi";
import { BsXDiamond } from "react-icons/bs";
import Spinner from "@/components/Spinner";
import { getUsers } from "../../../redux/slices/usersSlice";
import { selectUsersData } from "../../../redux/reselect/usersSelector";
import EmailService from "@/resend";
import axios from "axios";

const Propiedad = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const properties = useSelector(selectPropertiesData);
  const users = useSelector(selectUsersData);

  useEffect(() => {
    if (!properties) dispatch(getProperties());
  }, [dispatch, properties]);

  const { id } = router.query;
  const property = properties!.find((prop) => prop._id === id) as IProperty;
  const userToFind = users.find((user) => user._id === property.createdBy);

  const [formValues, setFormValues] = useState({
    clientEmail: userToFind && (userToFind.email as string),
    name: "",
    userEmail: "",
    number: "",
    content: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_API}/email`,
        formValues
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const {
    _id,
    searchType,
    poblation,
    neighborhood,
    propertyType,
    title,
    bedrooms,
    address,
    m2,
    propertyHeight,
    buildingHeight,
    bathrooms,
    price,
    garage,
    pool,
    furnished,
    pets,
    terrace,
    garden,
    elevator,
    accessibleProperty,
    a_c,
    heating,
    floorsType,
    windowsType,
    doorsType,
    mainDoor,
    antique,
    status,
    independentLiving,
    hotWater,
    laundry,
    bail,
    images,
  } = property || {};

  const { name, surname, image } = userToFind || {};

  const imageUrl =
    images &&
    images[0] &&
    `${process.env.NEXT_PUBLIC_BACK_API}${(images[0] as Images).data.replace(
      /\s+/g,
      ""
    )}`;

  return (
    <section className="w-full h-full min-h-screen p-8 md:p-16">
      {!property ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <article className="w-full shadow-lg rounded-lg p-6">
          <article className="flex w-full flex-col gap-4 mb-5 items-start lg:mb-0 lg:flex-row lg:justify-between lg:items-center ">
            <div className="my-4">
              <h3 className="text-2xl 2xl:text-4xl font-bold">{title}</h3>
              <p>{address}</p>
            </div>
            <div className="flex gap-2">
              <div className="bg-home-light-blue text-white rounded-xl px-6 flex items-center">
                <p>{poblation.toUpperCase()}</p>
              </div>
              <div className="bg-home-dark-blue text-white rounded-xl px-6 flex items-center">
                <p>{propertyType.toUpperCase()}</p>
              </div>
            </div>
            <div className="flex justify-center items-end">
              <p className="text-2xl 2xl:text-4xl font-bold">
                €
                {price
                  ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  : bail.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </p>
              {bail && <p className="text-2xl">/mes</p>}
            </div>
          </article>
          <div className="flex w-full justify-center gap-2 xl:gap-16 flex-col xl:flex-row ">
            <article className="w-full h-full">
              {images[0] && (
                <Image
                  alt={title}
                  src={imageUrl}
                  width={1000}
                  height={1000}
                  className="w-full h-full xl:h-[540px]"
                />
              )}
              <div className=" bg-home-light-blue rounded-xl flex-col md:flex-row flex items-center justify-center md:justify-evenly w-full h-full p-6  my-8">
                <div className="flex flex-col items-center justify-center gap-2">
                  <p>Habitaciones</p>
                  <div className="flex items-center justify-start gap-2 w-full">
                    <LiaBedSolid size={22} />
                    {bedrooms}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <p>Baños</p>
                  <div className="flex items-center justify-start gap-2 w-full">
                    <PiBathtubLight size={22} />
                    {bathrooms}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-left w-full">Área</p>
                  <div className="flex items-center justify-start gap-2 w-full">
                    <BsXDiamond size={20} />
                    {m2}m2
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-left w-full">Tipo de propiedad</p>
                  <div className="flex items-center justify-start gap-2 w-full">
                    <PiPaintBrushBroad size={22} />
                    {propertyType}
                  </div>
                </div>
              </div>
            </article>
            <article className="h-full w-full xl:w-[50%] flex items-center justify-center">
              <div className="shadow-md rounded-md flex flex-col items-center justify-center p-6 w-full max-w-[400px] border border-gray-200">
                <div className="flex items-center justify-center gap-6">
                  <Image
                    src={image as string}
                    alt="user-image"
                    width={70}
                    height={70}
                    className="rounded-full"
                  />
                  <p className="text-lg font-bold">
                    {name} {surname && surname}
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-2 items-center justify-center mt-5 w-full"
                >
                  <input
                    placeholder="Nombre"
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                  ></input>
                  <input
                    placeholder="Email"
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    name="userEmail"
                    value={formValues.userEmail}
                    onChange={handleChange}
                  ></input>
                  <input
                    placeholder="Teléfono"
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    name="number"
                    value={formValues.number}
                    onChange={handleChange}
                  ></input>
                  <textarea
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 h-40 flex-shrink w-full max-w-full"
                    placeholder={`Hola! Estoy interesado/a en ${title}`}
                    name="content"
                    value={formValues.content}
                    onChange={handleChange}
                  ></textarea>
                  <button>Enviar</button>
                </form>
              </div>
            </article>
          </div>
        </article>
      )}
    </section>
  );
};

export default Propiedad;
