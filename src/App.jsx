// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/HeaderComponent.jsx';
import Footer from './components/FooterComponent.jsx';
import Home from './side/HomeSide.jsx'; 
import Juz from './side/JuzSide.jsx';
import Surah from './side/SurahSide.jsx';
import Ruku from './side/RukuSide.jsx'; 

function App() {
  return (
    <Router>
      <Header />
      <div style={{ paddingTop: '64px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Juz" element={<Juz />} />
          <Route path="/ruku" element={<Ruku />} />
         
          <Route path="/surah/:id" element={<Surah />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
