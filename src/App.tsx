import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import PropertiesPage from "./components/PropertiesPage";
import PropertyDetails from "./components/PropertyDetails";
import AboutUsPage from "./components/AboutUsPage";


function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<PropertiesPage/>} />
          <Route path="/property/:id" element={<PropertyDetails/>} />
          <Route path="/chi-siamo" element={<AboutUsPage />} />
        </Routes>
        
      </>
    </Suspense>
  );
}

export default App;
