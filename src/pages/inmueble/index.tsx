import axios from "axios";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Inmueble = () => {
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
    direccion: string;
    m2: string;
    altura_inmueble: string;
    altura_edificio: string;
    banos: string;
    precio: string;
    garaje: string;
    piscina: string;
    amueblado: string;
    balcon_terraza: string;
    jardin: string;
    ascensor: string;
    vivienda_accesible: string;
    aire_acondicionado: string;
    calefaccion: string;
    tipo_pisos: string;
    tipo_ventanas: string;
    tipo_puertas: string;
    puerta_principal: string;
    antiguedad: string;
    estado: string;
    salon_independiente: string;
    agua_caliente: string;
    lavadero: string;
    fianza: string;
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
    direccion: "",
    m2: "",
    banos: "",
    altura_inmueble: "",
    altura_edificio: "",
    precio: "",
    garaje: "",
    piscina: "",
    amueblado: "",
    balcon_terraza: "",
    jardin: "",
    ascensor: "",
    vivienda_accesible: "",
    aire_acondicionado: "",
    calefaccion: "",
    tipo_pisos: "",
    tipo_ventanas: "",
    tipo_puertas: "",
    puerta_principal: "",
    antiguedad: "",
    estado: "",
    salon_independiente: "",
    agua_caliente: "",
    lavadero: "",
    fianza: "",
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("https://formspree.io/f/mbjenoae", formValues);
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
        direccion: "",
        m2: "",
        banos: "",
        altura_inmueble: "",
        altura_edificio: "",
        precio: "",
        garaje: "",
        piscina: "",
        amueblado: "",
        balcon_terraza: "",
        jardin: "",
        ascensor: "",
        vivienda_accesible: "",
        aire_acondicionado: "",
        calefaccion: "",
        tipo_pisos: "",
        tipo_ventanas: "",
        tipo_puertas: "",
        puerta_principal: "",
        antiguedad: "",
        estado: "",
        salon_independiente: "",
        agua_caliente: "",
        lavadero: "",
        fianza: "",
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
      <div className="bg-white text-black rounded-lg w-full max-w-[1200px] mt-2 mb-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-black p-4 items-center w-full"
        >
          <fieldset className="flex flex-row flex-wrap gap-4 justify-center w-full">
            <fieldset className="w-full">
              <h3>Informacion de Contacto</h3>
              <fieldset className="flex gap-2 flex-col sm:flex-row">
                <input
                  placeholder="Nombre"
                  className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                  type="text"
                  name="nombre"
                  value={formValues.nombre}
                  onChange={handleChange}
                  required
                />
                <input
                  placeholder="Apellido"
                  className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                  type="text"
                  name="apellido"
                  value={formValues.apellido}
                  onChange={handleChange}
                  required
                />
              </fieldset>
              <fieldset className="flex gap-2 flex-col sm:flex-row">
                <input
                  placeholder="Número de teléfono"
                  className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                  type="number"
                  name="numero"
                  value={formValues.numero}
                  onChange={handleChange}
                  required
                />
                <input
                  placeholder="Dirección exacta"
                  className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                  type="text"
                  name="direccion"
                  value={formValues.direccion}
                  onChange={handleChange}
                  required
                />
              </fieldset>
              <fieldset className="flex gap-2 flex-col sm:flex-row">
                <select
                  placeholder="Tipo de busqueda"
                  className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
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
                  className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
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
              </fieldset>
              <select
                placeholder="Barrio"
                onChange={handleChange}
                className={`focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-[580px] ${
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
                <option value="barrio_de_las_letras">
                  Barrio de Las Letras
                </option>
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
            </fieldset>
            <fieldset className="flex flex-row flex-wrap gap-4 justify-center w-full">
              <fieldset className="w-full">
                <h3>Inmueble</h3>
                <fieldset className="flex gap-2 flex-col sm:flex-row">
                  <select
                    placeholder="Tipo de inmueble"
                    onChange={handleChange}
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
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
                    name="altura_inmueble"
                    value={formValues.altura_inmueble}
                    onChange={handleChange}
                    required
                  />
                  <input
                    placeholder="Altura de la edificación"
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    type="text"
                    name="altura_edificio"
                    value={formValues.altura_edificio}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
                <fieldset className="flex gap-2 flex-col sm:flex-row">
                  <input
                    placeholder="Dormitorios"
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    type="number"
                    name="dormitorios"
                    value={formValues.dormitorios}
                    onChange={handleChange}
                    required
                  />
                  <input
                    placeholder="Baños"
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    type="number"
                    name="banos"
                    value={formValues.banos}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
                <fieldset className="flex gap-2 flex-col sm:flex-row">
                  <select
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    name="garaje"
                    defaultValue="garaje"
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="garaje">
                      Garaje
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>
                  <select
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    name="piscina"
                    defaultValue="piscina"
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="piscina">
                      Piscina
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>
                </fieldset>
                <fieldset className="flex gap-2 flex-col sm:flex-row">
                  <select
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    name="amueblado"
                    defaultValue="amueblado"
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="amueblado">
                      Amueblado
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>
                  <select
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    name="Mascota"
                    defaultValue="mascota"
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="mascota">
                      Mascota
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>
                </fieldset>
                <fieldset className="flex gap-2 flex-col sm:flex-row">
                  <select
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    name="balcon_terraza"
                    defaultValue="balcon/terraza"
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="balcon/terraza">
                      Balcon/Terraza
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>
                  <select
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    name="jardin"
                    defaultValue="jardin"
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="jardin">
                      Jardin
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>
                </fieldset>
                <fieldset className="flex gap-2 flex-col sm:flex-row">
                  <select
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    name="ascensor"
                    defaultValue="ascensor"
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="ascensor">
                      Ascensor
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>

                  <select
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    name="vivienda_accesible"
                    defaultValue="vivienda_accesible"
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="vivienda_accesible">
                      Vivienda Accesible
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>
                </fieldset>
                <fieldset className="flex gap-2 flex-col sm:flex-row">
                  <select
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    name="aire_acondicionado"
                    defaultValue="aire_acondicionado"
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="aire_acondicionado">
                      Aire Acondicionado
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>
                  <select
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    name="calefaccion"
                    defaultValue="calefaccion"
                    onChange={handleChange}
                  >
                    <option disabled value="calefaccion">
                      Calefacción
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>
                </fieldset>
                <fieldset className="flex gap-2 flex-col sm:flex-row">
                  <input
                    placeholder="Puerta Principal"
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    type="text"
                    name="puerta_principal"
                    value={formValues.puerta_principal}
                    onChange={handleChange}
                  />
                  <input
                    placeholder="Tipo de Puertas"
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    type="text"
                    name="tipo_puertas"
                    value={formValues.tipo_puertas}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="flex gap-2 flex-col sm:flex-row">
                  <input
                    placeholder="Tipo de Pisos"
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    type="text"
                    name="tipo_pisos"
                    value={formValues.tipo_pisos}
                    onChange={handleChange}
                  />
                  <input
                    placeholder="Tipo de Ventanas"
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    type="text"
                    name="tipo_ventanas"
                    value={formValues.tipo_ventanas}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="flex gap-2 flex-col sm:flex-row">
                  <input
                    placeholder="Antigüedad (años)"
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    type="number"
                    name="antiguedad"
                    value={formValues.antiguedad}
                    onChange={handleChange}
                  />
                  <input
                    placeholder="Estado"
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    type="text"
                    name="estado"
                    value={formValues.estado}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="flex gap-2 flex-col sm:flex-row">
                  <select
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    name="lavadero"
                    defaultValue="lavadero"
                    onChange={handleChange}
                  >
                    <option disabled value="lavadero">
                      Lavadero
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>
                  <select
                    className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                    name="salon_independiente"
                    defaultValue="salon_independiente"
                    onChange={handleChange}
                  >
                    <option disabled value="salon_independiente">
                      Salón Independiente
                    </option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>
                </fieldset>
                <select
                  className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-[580px]"
                  name="agua_caliente"
                  defaultValue="agua_caliente"
                  onChange={handleChange}
                >
                  <option disabled value="agua_caliente">
                    Agua Caliente
                  </option>
                  <option value="individual">Individual</option>
                  <option value="central">Central</option>
                </select>
              </fieldset>
            </fieldset>
            {formValues.tipo_busqueda === "alquiler" ? (
              <input
                placeholder="Fianza"
                className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                type="number"
                name="fianza"
                value={formValues.fianza}
                onChange={handleChange}
                required
              />
            ) : (
              <input
                placeholder="Precio"
                maxLength={10}
                className="focus:outline-none bg-slate-200 rounded-md py-2 px-4 my-2 flex-shrink w-full max-w-full"
                type="number"
                name="precio"
                value={formValues.precio}
                onChange={handleChange}
                required
              />
            )}
          </fieldset>
          <button
            className="my-2 bg-blue-400 text-white rounded-md w-full max-w-[200px]"
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
    </section>
  );
};

export default Inmueble;
