import { HashRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import BackgroundAudio from './components/BackgroundAudio.jsx';
import EasterEggButton from './components/EasterEggButton.jsx';
import Home from './pages/Home.jsx';
import FilterBySpecies from './pages/FilterBySpecies.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

function App() {
  return (
    <HashRouter>
      <Navigation />
      <BackgroundAudio />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter" element={<FilterBySpecies />} />
        <Route path="/species/:speciesName" element={<FilterBySpecies />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <EasterEggButton />
    </HashRouter>
  );
}

export default App;
