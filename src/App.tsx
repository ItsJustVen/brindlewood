import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Kingdoms from "./pages/Kingdoms";
import NotFound from "./pages/NotFound";
import Play from "./pages/Play";
import Rules from "./pages/Rules";
import Store from "./pages/Store";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="play" element={<Play />} />
        <Route path="kingdoms" element={<Kingdoms />} />
        <Route path="rules" element={<Rules />} />
        <Route path="store" element={<Store />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
