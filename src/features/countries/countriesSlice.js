import {createSlice} from "@reduxjs/toolkit"
import countriesAPI from "../../services/countries"

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    isLoading: true,
  },

  reducers: {
    isLoading(state, action) {
      state.isLoading = action.payload
    },
    getCountries(state, action) {
      state.countries = action.payload
    }
  },

})

export const initializeCountries = () => {
  return async (dispatch) => {
    const countries = await countriesAPI.getAllCountries()
    dispatch(getCountries(countries))
    setTimeout(()=> dispatch(isLoading(false)), 1000)
  }
}

export const {isLoading, getCountries} = countriesSlice.actions // this line is connecting the reducer actions to the store

export default countriesSlice.reducer