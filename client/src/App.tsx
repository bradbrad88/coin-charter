import { Routes, Route } from "react-router-dom";
import Header from "common/Header";
import Homepage from "pages/Homepage";
import Profile from "src/pages/Profile";
import Friends from "pages/Friends";
import Charts from "pages/Charts";
import CoinProfile from "pages/CoinProfile";
import Login from "pages/Login";
import ChartCoin from "./pages/ChartCoin";
import ReadOnlyProfile from "pages/ReadOnlyProfile";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import Signup from "./pages/Signup";
import { Provider as UserProvider } from "contexts/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMainDefinition } from "@apollo/client/utilities";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:3000/graphql",
    connectionParams: {
      // authToken: put token here
    },
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: splitLink,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <ToastContainer
          position="top-left"
          theme="colored"
          toastClassName="toasty"
          autoClose={3000}
        />
        <div>
          <Header />
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="friends" element={<Friends />} />
            <Route path="profile" element={<Profile />} />
            <Route path="charts" element={<Charts />} />
            <Route path="coin/:coinId" element={<CoinProfile />} />
            <Route path="chart/:chartId" element={<ChartCoin />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile/:profileId" element={<ReadOnlyProfile />} />
          </Routes>
        </div>
      </UserProvider>
    </ApolloProvider>
  );
};

export default App;
