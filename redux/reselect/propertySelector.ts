import { createSelector } from "reselect";
import { RootState } from "../stores";

const selectProperties = (state: RootState) => state.propertys.properties;
const selectFilter = (state: RootState) => state.propertys.filter;
const selectLoading = (state: RootState) => state.propertys.loading;
const selectNoMatch = (state: RootState) => state.propertys.noMatches;

export const selectPropertiesData = createSelector(
    [selectProperties],
    (properties) => properties
);

export const selectFilterData = createSelector(
    [selectFilter],
    (filter) => filter
);

export const selectLoadingData = createSelector(
    [selectLoading],
    (loading) => loading
);

export const selectNoMatchData = createSelector(
    [selectNoMatch],
    (noMatches) => noMatches
);