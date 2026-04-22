import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Pets from "./pages/Pets";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddPet from "./pages/AddPet";
import AdminDashboard from "./pages/AdminDashboard";
import EditPet from "./pages/EditPet";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/edit-pet/:id" element={<EditPet />} />
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;