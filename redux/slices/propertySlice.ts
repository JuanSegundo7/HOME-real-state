  import axios from "axios";
  import { IProperty, IPropertyState } from "../../models/types";
  import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

  export const getProperties = createAsyncThunk('data/fetchData', async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/propertys`);
      return data;
    } catch (error) {
      throw new Error('Error fetching data: ' + error);
    }
  });

  const initialState: IPropertyState  = {
    properties: [],
    filter: [],
    loading: false,
    noMatches: false,
  };

  export const propertySlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
      applyFilters: (state, action: PayloadAction<any>) => {
        state.loading = true;
        const { properties } = state;
        const search = action.payload
        const { city, neighborhood, price, propertyType, searchType } = search;
        const {lowestPrice, highestPrice} = price

        const filteredProperties = properties.filter(property => 
          (!property.bail ? Number(property.price) >= Number(lowestPrice) && Number(property.price) <= Number(highestPrice) : Number(property.bail) >= Number(lowestPrice) && Number(property.bail) <= Number(highestPrice)) &&
           (property.poblation.toLowerCase() === city.toLowerCase()) &&
           (property.searchType.toLowerCase() === searchType.toLowerCase())
          && (!neighborhood || property.neighborhood.trim().toLowerCase() === neighborhood.trim().toLowerCase())
          && (property.propertyType.trim().toLowerCase() === propertyType.trim().toLowerCase()))


          state.filter = filteredProperties;
  
          state.loading = false;
          state.noMatches = filteredProperties.length === 0;
        
          return state;
      }
    },
    extraReducers: (builder) => {
      builder.addCase(getProperties.fulfilled, (state, action: PayloadAction<IProperty[]>) => {
        state.properties = action.payload;
        state.loading = false; // 
        return state;
      });
    }
  });

  export const {
    applyFilters
  } = propertySlice.actions;

  export const { reducer: dataReducer } = propertySlice;
  export default propertySlice;