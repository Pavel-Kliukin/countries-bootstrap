import {createSlice} from "@reduxjs/toolkit"

// const favourites = localStorage.getItem('favourites') !== null ? JSON.parse(localStorage.getItem('favourites')) : []
const favourites = ["Finland"]

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    favourites
  },

  reducers: {
    addFavourite (state, action) {
      // The line below is not neccessary but can be useful as a check to see if localStorage favourite already exists
      if (state.favourites.some(fav => fav === action.payload)) state.favourites = [...state.favourites]
      state.favourites = [...state.favourites, action.payload]
      localStorage.setItem('favourites', JSON.stringify(state.favourites))
    },

    removeFavourite (state, action) {
      const newArray = [...state.favourites]
      newArray.splice(newArray.findIndex(e => e === action.payload), 1)
      state.favourites = [...newArray]
    },

    clearFavourites (state) {
      localStorage.removeItem('favourites')
      state.favourites = []
    }
  }

})

export const {addFavourite, removeFavourite, clearFavourites} = favouritesSlice.actions // this line is connecting the reducer actions to the store
export default favouritesSlice.reducer