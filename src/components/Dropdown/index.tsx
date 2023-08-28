import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCityData } from "../../../redux/reselect/searchSelector";
import { useRouter } from "next/router";
import Image from "next/image";

const Dropdown = ({ values, setSearchState, searchState, type }: any) => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { City, Neighborhood, PropertyType } = router.query;
  const { logo, title, list } = values;
  const [isOpen, setIsOpen] = useState(false);

  const [location, setLocation] = useState("");

  useEffect(() => {
    const initialLocation =
      (title === "Ciudad" && City) ||
      (title === "Barrio" && Neighborhood) ||
      (title === "Barrio" && City !== "Madrid" && Neighborhood) ||
      (title === "Tipo vivienda" && PropertyType) ||
      (list && list[0]?.name);

    setLocation(initialLocation);
  }, [City, Neighborhood, PropertyType, list, title]);

  const handleSelect = (value: any) => {
    setLocation(value);
    setSearchState((prevState: any) => ({
      ...prevState,
      [type]: value,
    }));
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex items-center gap-4 w-auto max-w-[200px]">
      <div>
        <Image src={logo} alt="logo" width={40} height={40} />
      </div>
      <div className="flex items-left flex-col">
        <p className="text-sm font-light text-left text-home-grey">{title}</p>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`font-bold w-full flex items-center justify-start text-sm rounded-lg leading-5 ${
            searchState && searchState.city !== "Madrid" && title === "Barrio"
              ? "cursor-not-allowed"
              : ""
          }`}
        >
          {searchState && searchState.city !== "Madrid" && title === "Barrio"
            ? "No disponible"
            : location}
        </button>
        {isOpen &&
          ((searchState && searchState.city === "Madrid") ||
            title !== "Barrio") && (
            <div className="relative h-full w-full">
              <div
                ref={dropdownRef}
                className={`bg-white p-2 px-4 rounded-lg -right-5 absolute top-1 w-auto max-w-[180px] border-2 max-h-[150px] overflow-y-auto ${
                  title === "Tipo vivienda" && "right-2"
                }`}
              >
                <ul>
                  {list &&
                    list.map((value: any, i: any) => (
                      <li
                        onClick={() =>
                          handleSelect(
                            value.value.charAt(0).toUpperCase() +
                              value.value.slice(1)
                          )
                        }
                        className="text-black cursor-pointer"
                        value={value.value}
                        key={i}
                      >
                        {value.name}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Dropdown;
