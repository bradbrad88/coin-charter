import { Routes, Route } from "react-router-dom";
import Homepage from "pages/Homepage";
import Friends from "pages/Friends";
import Dashboard from "pages/Dashboard";
import Charts from "pages/Charts";
import Header from "common/Header";
import CoinProfile from "pages/CoinProfile";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="friends" element={<Friends />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="charts" element={<Charts />} />
        // !!! DELETE AFTER DONE THE ACTUAL PAGE DONE UP
      </Routes>
    </div>
  );
};

export default App;
