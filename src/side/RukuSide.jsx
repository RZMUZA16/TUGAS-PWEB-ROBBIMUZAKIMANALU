import React, { useEffect, useState } from "react";
import axios from "axios";

const RukuSide = () => {
  const [verses, setVerses] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [selectedRuku, setSelectedRuku] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
 
        const rukuRes = await axios.get(`http://api.alquran.cloud/v1/ruku/${selectedRuku}/quran-uthmani`);
        const ayahs = rukuRes.data.data.ayahs;
        setVerses(ayahs);

        const ayahNumbers = ayahs.map((a) => a.number).join(",");

        const translationRes = await axios.get(
          `http://api.alquran.cloud/v1/ayah/${ayahNumbers}/id.indonesian`
        );

        let translationData = translationRes.data.data;
        if (!Array.isArray(translationData)) {
          translationData = [translationData];
        }

        setTranslations(translationData);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchData();
  }, [selectedRuku]);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Ruku {selectedRuku}</h2>

      <div className="row">
        {verses.map((ayah, index) => (
          <div key={ayah.number} className="col-md-6 mb-3">
            <div className="p-3 border rounded shadow bg-white h-100">
              <p className="text-right h5" style={{ direction: "rtl", fontFamily: "Scheherazade, serif" }}>
                {ayah.text}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Surah {ayah.surah.englishName} ({ayah.surah.name}) - Ayat {ayah.numberInSurah}
              </p>
              <p className="text-muted mt-2">
                <strong>Terjemahan:</strong> {translations[index]?.text || "Loading..."}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4 text-center">
  <label htmlFor="rukuSelect" className="form-label fw-bold">Pilih Ruku:</label>
  <select
    id="rukuSelect"
    className="form-select w-auto d-inline-block"
    value={selectedRuku}
    onChange={(e) => setSelectedRuku(Number(e.target.value))}
  >
    {[...Array(558)].map((_, index) => (
      <option key={index + 1} value={index + 1}>
        Ruku {index + 1}
      </option>
    ))}
  </select>
</div>

    </div>
  );
};

export default RukuSide;
