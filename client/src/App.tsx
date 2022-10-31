import { Routes, Route } from "react-router-dom";
import Homepage from "pages/Homepage";
import Friends from "pages/Friends";
import Dashboard from "pages/Dashboard";
import Charts from "pages/Charts";
import Header from "common/Header";
import CoinProfile from "pages/CoinProfile";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="friends" element={<Friends />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="charts" element={<Charts />} />
          {/* temporary in here while dev */}
          <Route path="coin/:coinId" element={<CoinProfile />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
};

export default App;
