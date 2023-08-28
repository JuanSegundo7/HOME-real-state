import React, { useState } from "react";
import SwitchButton from "../SwitchButton";
import Dropdown from "../Dropdown";
import DropdownPrice from "../DropdownPrice";
import {
  cities,
  neighborhood,
  propertys,
  price,
} from "../../../utils/searchLists";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/stores";
import { applyFilters } from "../../../redux/slices/propertySlice";
import { useRouter } from "next/router";
import {
  updateNeighborhood,
  updateCity,
  updatePrice,
  updatePropertyType,
} from "../../../redux/slices/searchSlice";

const Search = () => {
  const [searchState, setSearchState] = useState({
    searchType: "Alquiler",
    city: "Madrid",
    neighborhood: "Austrias",
    price: {
      lowestPrice: 0,
      highestPrice: 0,
    },
    propertyType: "Piso",
  });

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleDispatch = () => {
    dispatch(applyFilters(searchState));

    const queryParams = new URLSearchParams({
      City: searchState.city,
      Neighborhood: searchState.neighborhood,
      LowestPrice: searchState.price.lowestPrice.toString(),
      HighestPrice: searchState.price.highestPrice.toString(),
      PropertyType: searchState.propertyType,
      SearchType: searchState.searchType,
    });
    router.push(`/busqueda?${queryParams.toString()}`);
  };
  return (
    <section className="w-full max-w-[400px] lg:max-w-[1200px] 2xl:max-w-[1350px]">
      <div className="border shadow-md rounded-xl py-6 px-6 w-full mt-10">
        <div className="flex flex-col items-start lg:flex-row lg:items-center gap-6 justify-between">
          <div className="flex w-full justify-center lg:w-[207px]">
            <SwitchButton setSearchState={setSearchState} />
          </div>
          <Dropdown
            values={cities}
            setSearchState={setSearchState}
            type="city"
          />
          <Dropdown
            searchState={searchState}
            values={neighborhood}
            setSearchState={setSearchState}
            type="neighborhood"
          />
          <DropdownPrice values={price} setSearchState={setSearchState} />
          <Dropdown
            values={propertys}
            setSearchState={setSearchState}
            type="propertyType"
          />
          <div className="flex w-full justify-center lg:w-[131px]">
            <div
              onClick={handleDispatch}
              className="bg-black rounded-2xl flex items-center justify-center text-white w-[131px] h-[58px] border border-1 py-19 px-42 cursor-pointer"
            >
              Buscar
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
