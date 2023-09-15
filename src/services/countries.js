import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/all"

const countriesAPI = {
  getAllCountries: async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
  }
}

export default countriesAPI