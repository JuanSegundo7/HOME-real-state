import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/stores";
import { getProperties } from "../../../redux/slices/propertySlice";
import { IPropertyCard } from "../../../models/types";
import Card from "../Card";
import HomeCard from "../CardHome";

interface PropertyHome {
  alquiler?: boolean;
  venta?: boolean;
}

import { selectPropertiesData } from "../../../redux/reselect/propertySelector";

const PropertysHome = ({ alquiler }: PropertyHome) => {
  const dispatch = useDispatch<AppDispatch>();

  const properties = useSelector(selectPropertiesData);

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  const filteredProperties =
    properties &&
    properties.filter(
      (property: IPropertyCard) =>
        property.searchType === (alquiler ? "alquiler" : "venta")
    );

  const onePropertie = filteredProperties && filteredProperties.slice(-1)[0];

  const threeProperties = filteredProperties && filteredProperties.slice(0, 3);

  return (
    <section className="px-6 sm:px-16 w-full max-w-[1200px]  2xl:max-w-[1350px] my-20">
      <h3 className="text-left text-3xl 2xl:text-5xl font-bold my-8">
        Ultimas propiedades en {alquiler ? "alquiler" : "venta"}.
      </h3>
      <article className="hidden xl:flex items-center justify-center w-full">
        {onePropertie && (
          <HomeCard
            _id={onePropertie._id}
            m2={onePropertie.m2}
            propertyType={onePropertie.propertyType}
            searchType={onePropertie.searchType}
            bathrooms={onePropertie.bathrooms}
            bedrooms={onePropertie.bedrooms}
            address={onePropertie.address}
            images={onePropertie.images}
            price={onePropertie.price}
            bail={onePropertie.bail}
            poblation={onePropertie.poblation}
            neighborhood={onePropertie.neighborhood}
            title={onePropertie.title}
          />
        )}
      </article>
      <article className="flex items-center justify-center">
        <div className="flex justify-center items-center flex-col md:flex-row md:flex-wrap gap-3 md:justify-between w-full">
          {threeProperties &&
            threeProperties.map((property: IPropertyCard, i) => (
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
    </section>
  );
};

export default PropertysHome;
