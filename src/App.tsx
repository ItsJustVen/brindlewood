import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Guide from "./pages/Guide";
import Galleries from "./pages/Galleries";
import Gallery from "./pages/Gallery";
import Guides from "./pages/Guides";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Kingdoms from "./pages/Kingdoms";
import Legal from "./pages/Legal";
import Staff from "./pages/Staff";
import News from "./pages/News";
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
        <Route path="gallery" element={<Galleries />} />
        <Route path="gallery/:slug" element={<Gallery />} />
        <Route path="news" element={<News />} />
        <Route path="staff" element={<Staff />} />
        <Route path="npcs" element={<Npcs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="rules" element={<Rules />} />
        <Route path="privacy" element={<Legal slug="privacy" />} />
        <Route path="terms" element={<Legal slug="terms" />} />
        <Route path="store" element={<Store />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
