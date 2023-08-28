import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPrice, ISearch } from '../../models/types';

const initialState: ISearch = {
  searchType: '',  
  searchTypeForHome: 'Alquiler',
  city: '',
  neighborhood: '',
  price: {
    lowestPrice: 0,
    highestPrice: 0,
  },
  propertyType: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchType: (state, action: PayloadAction<string>) => {
      state.searchType = action.payload;
    },

    updateSearchTypeForHome: (state, action: PayloadAction<string>) => {
      state.searchTypeForHome = action.payload;
    },

    updateCity: (state, action: PayloadAction<string>) => {
      if(action.payload !== "Madrid"){
        state.neighborhood = ""
      }
      
      state.city = action.payload;
    },
    updateNeighborhood: (state, action: PayloadAction<string>) => {
      state.neighborhood = action.payload;
    },
    updatePrice: (state, action: PayloadAction<IPrice>) => {
      state.price = action.payload;
    },
    updatePropertyType: (state, action: PayloadAction<string>) => {
      state.propertyType = action.payload;
    },
    resetFilters: (state) => {
      state.searchType = '';
      state.city = '';
      state.neighborhood = '';
      state.price = {lowestPrice:0, highestPrice:0};
      state.propertyType = '';
    },
  },
});

export const {
  updateSearchType,
  updateSearchTypeForHome,
  updateCity,
  updateNeighborhood,
  updatePrice,
  updatePropertyType,
  resetFilters,
  
} = searchSlice.actions;

export default searchSlice;