import { Routes, Route } from "react-router-dom";
import Header from "common/Header";
import Homepage from "pages/Homepage";
import Profile from "src/pages/Profile";
import Friends from "pages/Friends";
import Charts from "pages/Charts";
import CoinProfile from "pages/CoinProfile";
import Login from "pages/Login";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import Signup from "./pages/Signup";
import { Provider as UserProvider } from "contexts/UserContext";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: httpLink,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <div>
          <Header />
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="friends" element={<Friends />} />
            <Route path="profile" element={<Profile />} />
            <Route path="charts" element={<Charts />} />
            <Route path="coin/:coinId" element={<CoinProfile />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile/:profileId" element={<Profile />} />
          </Routes>
        </div>
      </UserProvider>
    </ApolloProvider>
  );
};

export default App;
