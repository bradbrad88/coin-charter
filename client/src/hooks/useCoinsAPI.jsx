// Import Axios
import axios from "axios";

const APIUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d";

// Call coin API
const searchCryptos = async () => {
  const response = await axios.get(APIUrl);
  return response;
};

export default searchCryptos;
