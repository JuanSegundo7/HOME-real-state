import { createSelector } from "reselect";
import { RootState } from "../stores";

const selectSearchType = (state: RootState) => state.search.searchType;
const selectSearchTypeForHome = (state: RootState) => state.search.searchTypeForHome;
const selectCity = (state: RootState) => state.search.city;
const selectNeighborhood = (state: RootState) => state.search.neighborhood;
const selectPrice = (state: RootState) => state.search.price;
const selectPropertyType = (state: RootState) => state.search.propertyType;
const selectSearch = (state: RootState) => state.search;

export const selectSearchData = createSelector(
    [selectSearch],
    (search) => search
);

export const selectSearchTypeData = createSelector(
    [selectSearchType],
    (searchType) => searchType
);

export const selectSearchTypeForHomeData = createSelector(
    [selectSearchTypeForHome],
    (searchTypeForHome) => searchTypeForHome
);

export const selectCityData = createSelector(
    [selectCity],
    (city) => city
);

export const selectNeighborhoodData = createSelector(
    [selectNeighborhood],
    (neighborhood) => neighborhood
);

export const selectPriceData = createSelector(
    [selectPrice],
    (price) => price
);

export const selectPropertyTypeData = createSelector(
    [selectPropertyType],
    (propertyType) => propertyType
);