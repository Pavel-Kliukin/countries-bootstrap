import {createSlice} from "@reduxjs/toolkit"
import { addFavouriteToFirebase, auth, clearFavouritesFromFirebase, removeFavouriteFromFirebase } from "../../auth/firebase"

// Old code wich uses LocalStorage instead of Firebase: 
// const favourites = localStorage.getItem('favourites') !== null ? JSON.parse(localStorage.getItem('favourites')) : []

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    favourites: [],
    isLoading: true,
  },

  reducers: {

    isLoading(state, action) {
      state.isLoading = action.payload;
    },

    getFavourites(state, action) {
    state.favourites = action.payload;
    },

    addFavourite (state, action) {

      if(state.favourites.some(fav => fav === action.payload)) state.favourites = [...state.favourites]
      state.favourites = [...state.favourites, action.payload]

      const user = auth.currentUser
      if (user) addFavouriteToFirebase(user.uid, action.payload);

      // Old code wich uses LocalStorage instead of Firebase: 
      // The line below is not neccessary but can be useful as a check to see if localStorage favourite already exists
      // if (state.favourites.some(fav => fav === action.payload)) state.favourites = [...state.favourites]
      // state.favourites = [...state.favourites, action.payload]
      // localStorage.setItem('favourites', JSON.stringify(state.favourites))
    },

    removeFavourite (state, action) {

      const newArray= [...state.favourites]
      newArray.splice(newArray.findIndex(e => e === action.payload), 1)
      state.favourites = [...newArray]

      const user = auth.currentUser
      if (user) {
        removeFavouriteFromFirebase(user.uid, action.payload);
      }

      // Old code wich uses LocalStorage instead of Firebase: 
      // const newArray = [...state.favourites]
      // newArray.splice(newArray.findIndex(e => e === action.payload), 1)
      // state.favourites = [...newArray]
    },

    clearFavourites (state) {

      state.favourites = []
      const user = auth.currentUser
      if (user) {
        clearFavouritesFromFirebase(user.uid);
      }

      // Old code wich uses LocalStorage instead of Firebase: 
      // localStorage.removeItem('favourites')
      // state.favourites = []
    }
  }

})

export const {addFavourite, removeFavourite, clearFavourites, getFavourites, isLoading} = favouritesSlice.actions // this line is connecting the reducer actions to the store
export default favouritesSlice.reducer