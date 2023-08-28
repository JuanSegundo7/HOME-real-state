import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/stores";
import { updateSearchTypeForHome } from "../../../redux/slices/searchSlice";
import { useRouter } from "next/router";
import { ISetSearchState } from "../../../models/types";

const SwitchButton = ({ setSearchState }: ISetSearchState) => {
  const dispatch = useDispatch<AppDispatch>();

  const [status, setStatus] = useState("Alquiler");

  const toggleSwitch = (value: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchType: value,
    }));
    setStatus(value);
    dispatch(updateSearchTypeForHome(value));
  };

  return (
    <div className="w-[150px] sm:w-[207px] h-[45px] rounded-2xl border bg-gradient-to-b from-home-dark-blue to-home-light-blue flex justify-center items-center ">
      <button
        onClick={() => toggleSwitch("Venta")}
        className={`flex justify-center items-center w-full h-full rounded-2xl text-white ${
          status === "Venta" && "bg-gradient-to-b from-[#60ADB5] to-[#9CE0C4]"
        }`}
      >
        Comprar
      </button>
      <button
        onClick={() => toggleSwitch("Alquiler")}
        className={`flex justify-center items-center w-full h-full rounded-2xl text-white ${
          status === "Alquiler" &&
          "bg-gradient-to-b from-[#60ADB5] to-[#9CE0C4]"
        }`}
      >
        Alquilar
      </button>
    </div>
  );
};

export default SwitchButton;
