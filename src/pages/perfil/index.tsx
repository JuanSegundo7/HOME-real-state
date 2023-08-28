import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";
import axios from "axios";
import SignInButton from "@/components/SignInButton";
import { useSelector } from "react-redux";
import { selectPropertiesData } from "../../../redux/reselect/propertySelector";
import { IPropertyCard } from "../../../models/types";
import Card from "@/components/Card";

const Profile = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const properties = useSelector(selectPropertiesData);

  const filterUserProperties = properties.filter(
    (property) => property.createdBy === user?.id
  );

  const handleDisconnect = () => {
    signOut({ callbackUrl: "/" });
  };

  const [role, setRole] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({ surname: "", movil: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACK_API}/users/update`, {
        email: session?.user.email,
        role: role && role.toLowerCase(),
        movil: formValues.movil,
        surname: formValues.surname,
      });

      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />;
      </div>
    );
  }

  const newImageUrl =
    user && user.image && user.image.replace("s96-c", "s256-c");

  return (
    <section className="flex flex-col items-center justify-center w-full min-h-[100vh] text-black h-full bg-white my-10 gap-5">
      <article className="shadow-md rounded-md p-4 w-full max-w-[1200px] flex items-center justify-center gap-10 border border-gray-200">
        <Image
          src={newImageUrl as string}
          alt="user-image"
          width={200}
          height={200}
          priority
          className="rounded-full"
        />
        <div className="flex flex-col items-center just gap-4">
          <h2 className="text-xl font-bold">
            ¡Hola, {user && user.name}
            {user && user.surname}!
          </h2>
          <p className="font-bold text-md">
            Tipo de usuario{" "}
            {user.role === "client" ? "CLIENTE" : user.role.toLocaleUpperCase()}
          </p>
          <button
            className="text-white bg-home-dark-blue rounded-lg p-2"
            onClick={handleDisconnect}
          >
            Desconectarse
          </button>
        </div>
      </article>
      {filterUserProperties && filterUserProperties.length > 0 && (
        <article className="shadow-md rounded-md p-4 w-full max-w-[1200px] flex flex-col items-center justify-center gap-10 border border-gray-200	">
          <div className="w-full flex items-start">
            <h2 className="text-left lg:text-xl xl:text-2xl font-bold">
              Tus publicaciones
            </h2>
          </div>
          <div>
            {filterUserProperties.map((property: IPropertyCard, i) => (
              <Card
                _id={property._id}
                key={i}
                m2={property.m2}
                searchType={property.searchType}
                bathrooms={property.bathrooms}
                bedrooms={property.bedrooms}
                address={property.address}
                images={property.images}
                price={property.price}
                bail={property.bail}
                title={property.title}
                poblation={property.poblation}
                neighborhood={property.neighborhood}
              />
            ))}
          </div>
        </article>
      )}
      {!user.surname && (
        <article className="shadow-md rounded-md p-4 w-full mt-6 max-w-[1200px] flex flex-col items-center justify-center gap-10 border border-gray-200">
          <article className="flex flex-col items-center ">
            <h3 className="text-2xl font-bold	text-center">
              ¡Hola, {user && user.name}, bienvenido a Home!
            </h3>
            <p className="text-xl font-bold	text-center">
              Por favor completa estos datos para terminar tu registro
            </p>
          </article>
          <article className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-bold	text-center">
              ¿Que tipo de usuario queres crear?
            </h2>
            <p className="text-xl font-bold	text-center">
              ( IMPORTANTE ) una vez creado el tipo de usuario no se podrá
              cambiar, tendrás que ingresar con una nueva cuenta
            </p>
            <article className="w-full flex justify-center items-center gap-4">
              <SignInButton role="client" text="CLIENTE" setRole={setRole} />
              <SignInButton
                role="comercial"
                text="COMERCIAL"
                setRole={setRole}
              />
            </article>
            <p>Tipo de usuario</p>
            <p className="font-bold">
              {!role
                ? "Ningún tipo de usuario seleccionado"
                : role.toUpperCase() === "CLIENT"
                ? "CLIENTE"
                : role.toUpperCase()}
            </p>
          </article>
          <article className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-bold	text-center">
              Por favor completá estos datos personales para terminar el
              registro
            </h2>
            <article className="w-full flex justify-center items-center gap-4">
              <form>
                <input
                  type="text"
                  value={formValues.surname}
                  onChange={handleChange}
                  placeholder="APELLIDO"
                  name="surname"
                  className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                />
                <input
                  type="number"
                  name="movil"
                  value={formValues.movil}
                  onChange={handleChange}
                  placeholder="MOVIL (INCLUIR NUMERO INTERNACIONAL)"
                  className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                />
              </form>
            </article>
            <div
              className={`max-w-[250px] w-full h-12 rounded-lg py-3 px-4 text-white bg-gradient-to-r from-teal-300  via-teal-400 via-teal-500 to-teal-600 flex justify-center items-center cursor-pointer ${
                role === null
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={
                role === null
                  ? () =>
                      alert(
                        "Tenes que elegir un tipo de usuario antes de guardar los datos"
                      )
                  : handleRegister
              }
            >
              <div>GUARDAR DATOS</div>
            </div>
          </article>
        </article>
      )}
    </section>
  );
};

export default Profile;
