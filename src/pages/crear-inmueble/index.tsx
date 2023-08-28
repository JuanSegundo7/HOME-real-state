import axios from "axios";
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IProperty } from "../../../models/types";
import { getSession, useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";

const Inmueble = () => {
  const router = useRouter();
  const [sucess, setSuccess] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    async function checkAuth() {
      const session = await getSession();
      if (!session || (user && user.role === "comercial")) {
        router.push("/");
        alert("Los usuarios Comerciales no pueden crear publicaciones");
      }
    }
    checkAuth();
  }, [session]);

  const [formValues, setFormValues] = useState<IProperty>({
    searchType: "",
    poblation: "madrid",
    neighborhood: "",
    propertyType: "",
    title: "",
    bedrooms: "",
    address: "",
    m2: "",
    propertyHeight: "",
    buildingHeight: "",
    bathrooms: "",
    price: "",
    garage: "",
    pool: "",
    furnished: "",
    terrace: "",
    garden: "",
    elevator: "",
    accessibleProperty: "",
    a_c: "",
    pets: "",
    heating: "",
    floorsType: "",
    windowsType: "",
    doorsType: "",
    mainDoor: "",
    antique: "",
    status: "",
    independentLiving: "",
    hotWater: "",
    laundry: "",
    bail: "",
    images: [],
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    if (name === "precio") {
      const cleanValue = value.replace(/\D/g, "");

      const number = parseInt(cleanValue, 10);

      const formattedValue = number.toLocaleString();

      return setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: formattedValue,
      }));
    }

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      return setFormValues((prevFormValues) => ({
        ...prevFormValues,
        images: files,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", user?.id ?? "");
    formData.append("searchType", formValues.searchType);
    formData.append("poblation", formValues.poblation);
    formData.append("neighborhood", formValues.neighborhood);
    formData.append("propertyType", formValues.propertyType);
    formData.append("title", formValues.title);
    formData.append("bedrooms", formValues.bedrooms);
    formData.append("address", formValues.address);
    formData.append("m2", formValues.m2);
    formData.append("propertyHeight", formValues.propertyHeight);
    formData.append("buildingHeight", formValues.buildingHeight);
    formData.append("bathrooms", formValues.bathrooms);
    formData.append("garage", formValues.garage);
    formData.append("pool", formValues.pool);
    formData.append("furnished", formValues.furnished);
    formData.append("pets", formValues.pets);
    formData.append("terrace", formValues.terrace);
    formData.append("garden", formValues.garden);
    formData.append("elevator", formValues.elevator);
    formData.append("accessibleProperty", formValues.accessibleProperty);
    formData.append("a_c", formValues.a_c);
    formData.append("heating", formValues.heating);
    formData.append("floorsType", formValues.floorsType);
    formData.append("windowsType", formValues.windowsType);
    formData.append("doorsType", formValues.doorsType);
    formData.append("mainDoor", formValues.mainDoor);
    formData.append("antique", formValues.antique);
    formData.append("status", formValues.status);
    formData.append("independentLiving", formValues.independentLiving);
    formData.append("hotWater", formValues.hotWater);
    formData.append("laundry", formValues.laundry);
    {
      formValues.price.length && formData.append("price", formValues.price);
    }
    {
      formValues.bail.length && formData.append("bail", formValues.bail);
    }
    formValues.images.forEach((image, index) => {
      formData.append(`image-${index}`, image as File);
    });

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_API}/propertys`,
        formData
      );
      setSuccess(true);

      setFormValues({
        searchType: "",
        poblation: "madrid",
        neighborhood: "",
        propertyType: "",
        title: "",
        bedrooms: "",
        address: "",
        m2: "",
        propertyHeight: "",
        buildingHeight: "",
        bathrooms: "",
        price: "",
        garage: "",
        pool: "",
        furnished: "",
        terrace: "",
        garden: "",
        elevator: "",
        accessibleProperty: "",
        a_c: "",
        pets: "",
        heating: "",
        floorsType: "",
        windowsType: "",
        doorsType: "",
        mainDoor: "",
        antique: "",
        status: "",
        independentLiving: "",
        hotWater: "",
        laundry: "",
        bail: "",
        images: [],
      });

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <section className="w-full h-full min-h-[100vh] flex flex-col items-center justify-start px-8 md:px-16">
      {!user ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner />;
        </div>
      ) : (
        <>
          <div className="mt-8 w-full flex justify-start">
            <Link
              href={"/"}
              className="bg-white p-2 rounded-full w-8 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
              >
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </Link>
          </div>
          <div className="bg-white text-black rounded-lg w-full max-w-[1000px] mt-2 mb-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col text-black p-4 items-center w-full"
            >
              <fieldset className="flex flex-row flex-wrap gap-4 justify-center w-full">
                <fieldset className="w-full">
                  <h3>Informacion de Ubicación</h3>
                  <fieldset className="flex gap-2 flex-col sm:flex-row">
                    <input
                      placeholder="Dirección exacta"
                      className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                      type="text"
                      name="address"
                      value={formValues.address}
                      onChange={handleChange}
                      required
                    />
                    <select
                      placeholder="Tipo de busqueda"
                      className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                      name="searchType"
                      onChange={handleChange}
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Tipo de busqueda
                      </option>
                      <option value="alquiler">Alquiler</option>
                      <option value="venta">Venta</option>
                    </select>
                  </fieldset>
                  <fieldset className="flex gap-2 flex-col sm:flex-row">
                    <select
                      placeholder="Población"
                      onChange={handleChange}
                      className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                      name="poblation"
                      required
                    >
                      <option value="" disabled={true}>
                        Población
                      </option>
                      <option value="madrid">Madrid</option>
                      <option value="mostoles">Móstoles</option>
                      <option value="alcorcon">Alcorcón</option>
                      <option value="fuenlabrada">Fuenlabrada</option>
                      <option value="getafe">Getafe</option>
                      <option value="leganes">Leganés</option>
                      <option value="pinto">Pinto</option>
                      <option value="parla">Parla</option>
                    </select>
                    <select
                      placeholder="Barrio"
                      onChange={handleChange}
                      className={`focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full sm:max-w-[49.5%] ${
                        formValues.poblation !== "madrid"
                          ? "cursor-not-allowed"
                          : "cursor-auto"
                      }`}
                      name="neighborhood"
                      disabled={formValues.poblation !== "madrid"}
                      defaultValue=""
                      required
                    >
                      <option value="" disabled={true}>
                        Barrio
                      </option>
                      <option value="austrias">Austrias</option>
                      <option value="barrio_de_las_letras">
                        Barrio de Las Letras
                      </option>
                      <option value="barrio_de_salamanca">
                        Barrio de Salamanca
                      </option>
                      <option value="casa_de_campo">Casa de Campo</option>
                      <option value="castellana">Castellana</option>
                      <option value="chamberi">Chamberí</option>
                      <option value="chueca">Chueca</option>
                      <option value="conde_duque">Conde Duque</option>
                      <option value="sol_gran_vila">Sol-Gran Vila</option>
                      <option value="la_latina">La Latina</option>
                      <option value="lavapies">Lavapíes</option>
                      <option value="madrid_rio">Madrid Río</option>
                      <option value="malasana">Malasaña</option>
                      <option value="paseo_del_arte">Paseo del Arte</option>
                      <option value="princesa">Princesa</option>
                      <option value="retiro">Retiro</option>
                      <option value="salesas">Salesas</option>
                      <option value="aeropuerto_feria_de_madrid">
                        Aaeropuerto-Feria de Madrid
                      </option>
                    </select>
                  </fieldset>
                </fieldset>
                <fieldset className="flex flex-row flex-wrap gap-4 justify-center w-full">
                  <fieldset className="w-full">
                    <h3>Inmueble</h3>
                    <fieldset className="flex gap-2 flex-col sm:flex-row">
                      <input
                        placeholder="Título de la publicación"
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        type="text"
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                    <fieldset className="flex gap-2 flex-col sm:flex-row">
                      <select
                        placeholder="Tipo de inmueble"
                        onChange={handleChange}
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        name="propertyType"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Tipo de inmueble
                        </option>
                        <option value="piso">Piso</option>
                        <option value="chalet">Chalet</option>
                        <option value="oficina">Oficina</option>
                        <option value="barrio">Barrio</option>
                      </select>
                      <input
                        placeholder="Metros cuadrados"
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        type="number"
                        name="m2"
                        value={formValues.m2}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                    <fieldset className="flex gap-2 flex-col sm:flex-row">
                      <input
                        placeholder="Altura del inmueble"
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        type="text"
                        name="propertyHeight"
                        value={formValues.propertyHeight}
                        onChange={handleChange}
                        required
                      />
                      <input
                        placeholder="Altura de la edificación"
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        type="text"
                        name="buildingHeight"
                        value={formValues.buildingHeight}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                    <fieldset className="flex gap-2 flex-col sm:flex-row">
                      <input
                        placeholder="Dormitorios"
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        type="number"
                        name="bedrooms"
                        value={formValues.bedrooms}
                        onChange={handleChange}
                        required
                      />
                      <input
                        placeholder="Baños"
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        type="number"
                        name="bathrooms"
                        value={formValues.bathrooms}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                    <fieldset className="flex gap-2 flex-col sm:flex-row">
                      <select
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        name="garage"
                        defaultValue="garage"
                        onChange={handleChange}
                        required
                      >
                        <option disabled value="garage">
                          Garaje
                        </option>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                      </select>
                      <select
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        name="pool"
                        defaultValue="pool"
                        onChange={handleChange}
                        required
                      >
                        <option disabled value="pool">
                          Piscina
                        </option>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                      </select>
                    </fieldset>
                    <fieldset className="flex gap-2 flex-col sm:flex-row">
                      <select
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        name="furnished"
                        defaultValue="furnished"
                        onChange={handleChange}
                        required
                      >
                        <option disabled value="furnished">
                          Amueblado
                        </option>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                      </select>
                      <select
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        name="pets"
                        defaultValue="pets"
                        onChange={handleChange}
                        required
                      >
                        <option disabled value="pets">
                          Mascotas
                        </option>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                      </select>
                    </fieldset>
                    <fieldset className="flex gap-2 flex-col sm:flex-row">
                      <select
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        name="terrace"
                        defaultValue="terrace"
                        onChange={handleChange}
                        required
                      >
                        <option disabled value="terrace">
                          Balcon/Terraza
                        </option>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                      </select>
                      <select
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        name="garden"
                        defaultValue="garden"
                        onChange={handleChange}
                        required
                      >
                        <option disabled value="garden">
                          Jardin
                        </option>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                      </select>
                    </fieldset>
                    <fieldset className="flex gap-2 flex-col sm:flex-row">
                      <select
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        name="elevator"
                        defaultValue="elevator"
                        onChange={handleChange}
                        required
                      >
                        <option disabled value="elevator">
                          Ascensor
                        </option>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                      </select>

                      <select
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        name="accessibleProperty"
                        defaultValue="accessibleProperty"
                        onChange={handleChange}
                        required
                      >
                        <option disabled value="accessibleProperty">
                          Vivienda Accesible
                        </option>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                      </select>
                    </fieldset>
                    <fieldset className="flex gap-2 flex-col sm:flex-row">
                      <select
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        name="a_c"
                        defaultValue="a_c"
                        onChange={handleChange}
                        required
                      >
                        <option disabled value="a_c">
                          Aire Acondicionado
                        </option>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                      </select>
                      <select
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        name="heating"
                        defaultValue="heating"
                        onChange={handleChange}
                      >
                        <option disabled value="heating">
                          Calefacción
                        </option>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                      </select>
                    </fieldset>
                    <fieldset className="flex gap-2 flex-col sm:flex-row">
                      <input
                        placeholder="Puerta Principal"
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        type="text"
                        name="mainDoor"
                        value={formValues.mainDoor}
                        onChange={handleChange}
                      />
                      <input
                        placeholder="Tipo de Puertas"
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        type="text"
                        name="doorsType"
                        value={formValues.doorsType}
                        onChange={handleChange}
                      />
                    </fieldset>
                    <fieldset className="flex gap-2 flex-col sm:flex-row">
                      <input
                        placeholder="Tipo de Pisos"
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        type="text"
                        name="floorsType"
                        value={formValues.floorsType}
                        onChange={handleChange}
                      />
                      <input
                        placeholder="Tipo de Ventanas"
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        type="text"
                        name="windowsType"
                        value={formValues.windowsType}
                        onChange={handleChange}
                      />
                    </fieldset>
                    <fieldset className="flex gap-2 flex-col sm:flex-row">
                      <input
                        placeholder="Antigüedad (años)"
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        type="number"
                        name="antique"
                        value={formValues.antique}
                        onChange={handleChange}
                      />
                      <input
                        placeholder="Estado"
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        type="text"
                        name="status"
                        value={formValues.status}
                        onChange={handleChange}
                      />
                    </fieldset>
                    <fieldset className="flex gap-2 flex-col sm:flex-row">
                      <select
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        name="laundry"
                        defaultValue="laundry"
                        onChange={handleChange}
                      >
                        <option disabled value="laundry">
                          Lavadero
                        </option>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                      </select>
                      <select
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                        name="independentLiving"
                        defaultValue="independentLiving"
                        onChange={handleChange}
                      >
                        <option disabled value="independentLiving">
                          Salón Independiente
                        </option>
                        <option value={1}>Si</option>
                        <option value={0}>No</option>
                      </select>
                    </fieldset>
                    <fieldset className="flex gap-2 flex-col sm:flex-row">
                      <select
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full sm:max-w-[49.5%]"
                        name="hotWater"
                        defaultValue="hotWater"
                        onChange={handleChange}
                      >
                        <option disabled value="hotWater">
                          Agua Caliente
                        </option>
                        <option value="individual">Individual</option>
                        <option value="central">Central</option>
                      </select>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="focus:outline-none bg-slate-200 rounded-md py-2 px-2 my-2 flex-shrink w-full sm:max-w-[49%] border-none"
                      />
                    </fieldset>
                  </fieldset>
                </fieldset>
                {formValues.searchType === "alquiler" ? (
                  <input
                    placeholder="Fianza"
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    type="number"
                    name="bail"
                    value={formValues.bail}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <input
                    placeholder="Precio"
                    maxLength={10}
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-[500px]"
                    type="number"
                    name="price"
                    value={formValues.price}
                    onChange={handleChange}
                    required
                  />
                )}
              </fieldset>
              <button
                className="my-2 bg-home-dark-blue text-white rounded-md w-full max-w-[200px]"
                type="submit"
              >
                Enviar
              </button>
            </form>
            {sucess && (
              <h1 className="mb-2 px-4 text-lg text-center">
                ¡Tu solicitud ha sido envidada exitosamente! Muchas gracias
              </h1>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Inmueble;
