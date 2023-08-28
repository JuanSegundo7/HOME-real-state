import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/stores";
import Spinner from "@/components/Spinner";
import { IPropertyCard } from "../../../models/types";
import Card from "@/components/Card";
import Search from "@/components/Search";

import {
  selectCityData,
  selectNeighborhoodData,
  selectSearchTypeData,
  selectPropertyTypeData,
  selectSearchData,
} from "../../../redux/reselect/searchSelector";
import {
  updateCity,
  updatePrice,
  updateNeighborhood,
  updatePropertyType,
  updateSearchType,
} from "../../../redux/slices/searchSlice";
import { useRouter } from "next/router";
import { applyFilters } from "../../../redux/slices/propertySlice";
import {
  selectFilterData,
  selectLoadingData,
  selectNoMatchData,
  selectPropertiesData,
} from "../../../redux/reselect/propertySelector";

const Busqueda = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const search = useSelector(selectSearchData);
  const properties = useSelector(selectPropertiesData);
  const filter = useSelector(selectFilterData);
  const loading = useSelector(selectLoadingData);
  const noMatch = useSelector(selectNoMatchData);

  const {
    City,
    Neighborhood,
    PropertyType,
    LowestPrice,
    HighestPrice,
    SearchType,
  } = router.query;

  const price = {
    lowestPrice: Number(LowestPrice),
    highestPrice: Number(HighestPrice),
  };

  useEffect(() => {
    dispatch(updateCity(City as string));
    dispatch(updateNeighborhood(Neighborhood as string));
    dispatch(updatePropertyType(PropertyType as string));
    dispatch(updatePrice(price));
    dispatch(updateSearchType(SearchType as string));
  }, [router.query, dispatch]);

  useEffect(() => {
    dispatch(applyFilters(search));
  }, [dispatch, properties, search]);

  const city = useSelector(selectCityData);
  const neighborhood = useSelector(selectNeighborhoodData);
  const searchType = useSelector(selectSearchTypeData);
  const propertyType = useSelector(selectPropertyTypeData);

  return (
    <section className="w-full h-full min-h-screen mt-[75px] bg-white px-16">
      <div className="w-full flex items-start flex-col">
        <h3 className="text-4xl font-bold">
          {propertyType}s en{" "}
          {searchType
            ? searchType === "Alquiler"
              ? searchType.toLowerCase()
              : searchType.toLowerCase()
            : ""}{" "}
          en {city}
          {neighborhood && <>, {neighborhood}</>}
        </h3>
        <Search />
      </div>
      <div className="w-full flex-col items-center justify-center my-5">
        <h2 className="font-semibold text-3xl mb-5">
          {(filter && filter.length && filter.length > 1) || !filter.length
            ? filter.length + " resultados encontrados."
            : filter.length + " resultado encontrado."}
        </h2>
        <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4 items-center justify-center h-full">
          {loading ? (
            <Spinner />
          ) : noMatch ? (
            <></>
          ) : (
            filter.map((property: IPropertyCard, i: number) => (
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
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Busqueda;
