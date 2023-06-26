import axios from "axios";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Cliente = () => {
  const router = useRouter();
  const [sucess, setSuccess] = useState(false);

  type FormValuesType = {
    nombre: string;
    apellido: string;
    numero: string;
    tipo_busqueda: string;
    poblacion: string;
    barrio: string;
    tipo_inmueble: string;
    dormitorios: string;
    baños: string;
    precio: string;
    garaje: string;
    piscina: string;
    amueblado: string;
    balcon_terraza: string;
    jardin: string;
    ascensor: string;
    vivienda_accesible: string;
    aire_acondicionado: string;
  };

  const [formValues, setFormValues] = useState<FormValuesType>({
    nombre: "",
    apellido: "",
    numero: "",
    tipo_busqueda: "",
    poblacion: "madrid",
    barrio: "",
    tipo_inmueble: "",
    dormitorios: "",
    baños: "",
    precio: "",
    garaje: "",
    piscina: "",
    amueblado: "",
    balcon_terraza: "",
    jardin: "",
    ascensor: "",
    vivienda_accesible: "",
    aire_acondicionado: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    if (name === "precio") {
      const cleanValue = value.replace(/[^0-9]/g, "");

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("https://formspree.io/f/xrgvnqad", formValues);
      setSuccess(true);

      setFormValues({
        nombre: "",
        apellido: "",
        numero: "",
        tipo_busqueda: "",
        poblacion: "madrid",
        barrio: "",
        tipo_inmueble: "",
        dormitorios: "",
        baños: "",
        precio: "",
        garaje: "",
        piscina: "",
        amueblado: "",
        balcon_terraza: "",
        jardin: "",
        ascensor: "",
        vivienda_accesible: "",
        aire_acondicionado: "",
      });

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <section className="w-full h-full min-h-[100vh] flex flex-col items-center justify-start px-16">
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
      <div className="bg-white text-black rounded-lg w-full min-w-[300px] max-w-lg mt-2 mb-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-black p-4 items-center"
        >
          <fieldset className="flex flex-row flex-wrap gap-2 justify-center">
            <input
              placeholder="Nombre"
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2"
              type="text"
              name="nombre"
              value={formValues.nombre}
              onChange={handleChange}
              required
            />
            <input
              placeholder="Apellido"
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2"
              type="text"
              name="apellido"
              value={formValues.apellido}
              onChange={handleChange}
              required
            />
            <input
              placeholder="Número de telefono"
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2"
              type="number"
              name="numero"
              value={formValues.numero}
              onChange={handleChange}
              required
            />
            <select
              placeholder="Tipo de busqueda"
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 w-full max-w-[214px]"
              name="tipo_busqueda"
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
            <select
              placeholder="Población"
              onChange={handleChange}
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 w-full max-w-[214px]"
              name="poblacion"
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
              className={`focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 w-full max-w-[214px] ${
                formValues.poblacion !== "madrid"
                  ? "cursor-not-allowed"
                  : "cursor-auto"
              }`}
              name="barrio"
              disabled={formValues.poblacion !== "madrid"}
              defaultValue=""
              required
            >
              <option value="" disabled={true}>
                Barrio
              </option>
              <option value="austrias">Austrias</option>
              <option value="barrio_de_las_letras">Barrio de Las Letras</option>
              <option value="barrio_de_salamanca">Barrio de Salamanca</option>
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
            <input
              placeholder="Dormitorios"
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2"
              type="number"
              name="dormitorios"
              value={formValues.dormitorios}
              onChange={handleChange}
              required
            />
            <select
              placeholder="Tipo de inmueble"
              onChange={handleChange}
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 w-full max-w-[214px]"
              name="tipo_inmueble"
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
              placeholder="Baños"
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2"
              type="number"
              name="banos"
              value={formValues.baños}
              onChange={handleChange}
              required
            />
            <select
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 w-full max-w-[214px]"
              name="garaje"
              defaultValue="garaje"
              onChange={handleChange}
            >
              <option disabled value="garaje">
                Garaje
              </option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
            <select
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 w-full max-w-[214px]"
              name="piscina"
              defaultValue="piscina"
              onChange={handleChange}
            >
              <option disabled value="piscina">
                Piscina
              </option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
            <select
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 w-full max-w-[214px]"
              name="amueblado"
              defaultValue="amueblado"
              onChange={handleChange}
            >
              <option disabled value="amueblado">
                Amueblado
              </option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
            <select
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 w-full max-w-[214px]"
              name="Mascota"
              defaultValue="mascota"
              onChange={handleChange}
            >
              <option disabled value="mascota">
                Mascota
              </option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
            <select
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 w-full max-w-[214px]"
              name="balcon_terraza"
              defaultValue="balcon/terraza"
              onChange={handleChange}
            >
              <option disabled value="balcon/terraza">
                Balcon/Terraza
              </option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
            <select
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 w-full max-w-[214px]"
              name="jardin"
              defaultValue="jardin"
              onChange={handleChange}
            >
              <option disabled value="jardin">
                Jardin
              </option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
            <select
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 w-full max-w-[214px]"
              name="ascensor"
              defaultValue="ascensor"
              onChange={handleChange}
            >
              <option disabled value="ascensor">
                Ascensor
              </option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
            <select
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 w-full max-w-[214px]"
              name="vivienda_accesible"
              defaultValue="vivienda_accesible"
              onChange={handleChange}
            >
              <option disabled value="vivienda_accesible">
                Vivienda Accesible
              </option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
            <select
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 w-full max-w-[214px]"
              name="aire_acondicionado"
              defaultValue="aire_acondicionado"
              onChange={handleChange}
            >
              <option disabled value="aire_acondicionado">
                Aire Acondicionado
              </option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
            <input
              placeholder="Precio"
              className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 w-full max-w-[436px]"
              type="number"
              name="precio"
              value={formValues.precio}
              onChange={handleChange}
              required
            />
          </fieldset>
          <button
            className="my-2 bg-home-dark-blue text-white rounded-md w-full max-w-[200px]"
            type="submit"
          >
            Enviar
          </button>
        </form>
        {sucess && (
          <h1 className="mb-3 px-4 text-lg text-center">
            ¡Tu solicitud ha sido envidada exitosamente! Muchas gracias
          </h1>
        )}
      </div>
    </section>
  );
};

export default Cliente;
