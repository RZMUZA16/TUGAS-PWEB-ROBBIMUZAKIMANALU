import React, { useEffect, useState } from "react";
import axios from "axios";
import "./side.css" // Import gambar

const RukuSide = () => {
  const [verses, setVerses] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [selectedRuku, setSelectedRuku] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Ambil teks Arab dari Ruku
        const rukuRes = await axios.get(`http://api.alquran.cloud/v1/ruku/${selectedRuku}/quran-uthmani`);
        const ayahs = rukuRes.data.data.ayahs;
        setVerses(ayahs);

        // 2. Ambil seluruh terjemahan Indonesia
        const transRes = await axios.get(`http://api.alquran.cloud/v1/quran/id.indonesian`);
        const quranTranslation = transRes.data.data;
        let allTranslations = [];

        // Flatten terjemahan dari semua surah ke dalam satu array
        quranTranslation.surahs.forEach((surah) => {
          allTranslations.push(...surah.ayahs);
        });

        // 3. Filter terjemahan untuk ayat-ayat yang ada pada ruku ini
        const filteredTranslations = allTranslations.filter((translation) =>
          ayahs.some((a) => a.number === translation.number)
        );
        setTranslations(filteredTranslations);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchData();
  }, [selectedRuku]);

  return (
    <div
      className="full-page"
    >
      <div className="py-4">
        <h2 className="mb-4 text-center">Ruku {selectedRuku}</h2>

        <div className="mb-4 text-center">
          <label htmlFor="rukuSelect" className="form-label fw-bold">Pilih Ruku:</label>
          <select
            id="rukuSelect"
            className="form-select w-auto d-inline-block"
            value={selectedRuku}
            onChange={(e) => setSelectedRuku(Number(e.target.value))}
          >
            {[...Array(558)].map((_, index) => {
              const rukuNumber = index + 1;
              return (
                <option key={rukuNumber} value={rukuNumber}>
                  Ruku {rukuNumber}
                </option>
              );
            })}
          </select>
        </div>

        <div className="row">
          {verses.map((ayah) => {
            const translation = translations.find((t) => t.number === ayah.number);
            return (
              <div key={ayah.number} className="col-md-6 mb-3">
                <div className="p-3 border rounded shadow bg-white h-100">
                  <p
                    className="text-right h5"
                    style={{ direction: "rtl", fontFamily: "Scheherazade, serif" }}
                  >
                    {ayah.text}
                  </p>
                  <p className="text-muted small mt-2">
                    Surah {ayah.surah.englishName} ({ayah.surah.name}) - Ayat {ayah.numberInSurah}
                  </p>
                  <p className="mt-2 text-dark">
                    <strong>Terjemahan:</strong> {translation?.text || "Memuat..."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RukuSide;
