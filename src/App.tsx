import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Guide from "./pages/Guide";
import Guides from "./pages/Guides";
import Home from "./pages/Home";
import Kingdoms from "./pages/Kingdoms";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import Npcs from "./pages/Npcs";
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
        <Route path="guides" element={<Guides />} />
        <Route path="guides/:slug" element={<Guide />} />
        <Route path="npcs" element={<Npcs />} />
        <Route path="rules" element={<Rules />} />
        <Route path="privacy" element={<Legal slug="privacy" />} />
        <Route path="terms" element={<Legal slug="terms" />} />
        <Route path="store" element={<Store />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
