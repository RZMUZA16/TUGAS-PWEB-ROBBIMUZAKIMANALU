import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JuzSide = () => {
  const [verses, setVerses] = useState([]);
  const [selectedJuz, setSelectedJuz] = useState(30);
  const [showDropdown, setShowDropdown] = useState(false); 

  useEffect(() => {
    const fetchJuz = async () => {
      try {
        const response = await axios.get(`https://api.alquran.cloud/v1/juz/${selectedJuz}/quran-uthmani`);
        setVerses(response.data.data.ayahs);
      } catch (error) {
        console.error(`Gagal mengambil data Juz ${selectedJuz}:`, error);
      }
    };

    fetchJuz();
  }, [selectedJuz]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectJuz = (juzNumber) => {
    setSelectedJuz(juzNumber);
    setShowDropdown(false);
  };

  return (
    <div className="full-page">
    <div className="JuzSide container">
      <div className="d-flex justify-content-between align-items-center mb-4 position-relative">
        <h2 className="mb-0">Juz {selectedJuz}</h2>

        <div className="position-relative">
          <button className="btn btn-success dropdown-toggle" onClick={toggleDropdown}>
            Pilih Juz
          </button>

          {showDropdown && (
            <div
              className="dropdown-menu show"
              style={{
                maxHeight: '300px',
                overflowY: 'auto',
                position: 'absolute',
                right: 0,
                zIndex: 1000,
              }}
            >
              {[...Array(30)].map((_, index) => {
                const juzNumber = index + 1;
                return (
                  <button
                    key={juzNumber}
                    className={`dropdown-item ${selectedJuz === juzNumber ? 'active' : ''}`}
                    onClick={() => handleSelectJuz(juzNumber)}
                  >
                    Juz {juzNumber}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="text-center mb-4 text-muted">Daftar Ayat dalam Juz {selectedJuz}</div>

      <div className="row">
        {verses.map((ayah) => (
          <div key={ayah.number} className="col-md-6 mb-3">
            <div className="p-3 border rounded shadow bg-white h-100">
              <p className="text-right h5" style={{ direction: 'rtl', fontFamily: 'Scheherazade, serif' }}>
                {ayah.text}
              </p>
              <p className="text-muted small mt-2">
                Surah {ayah.surah.englishName} ({ayah.surah.name}) - Ayat {ayah.numberInSurah}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default JuzSide;
