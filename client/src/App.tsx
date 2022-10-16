import { Routes, Route } from "react-router-dom";
import Homepage from "pages/Homepage";
import Friends from "pages/Friends";
import Dashboard from "pages/Dashboard";
import Charts from "pages/Charts";

const App = () => {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="friends" element={<Friends />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="charts" element={<Charts />} />
    </Routes>
  );
};

export default App;
