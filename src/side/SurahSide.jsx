import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./side.css"; 

const SurahSide = () => {
  const { id } = useParams();
  const [verses, setVerses] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [surahName, setSurahName] = useState("");

  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        // Fetch data teks Arab dan terjemahan Bahasa Indonesia secara paralel
        const [arabResponse, transResponse] = await Promise.all([
          axios.get("http://api.alquran.cloud/v1/quran/quran-uthmani"),
          axios.get("http://api.alquran.cloud/v1/quran/id.indonesian")
        ]);

        // Cari surah yang sesuai dengan parameter id
        const arabSurah = arabResponse.data.data.surahs.find(
          (s) => s.number === parseInt(id)
        );
        const transSurah = transResponse.data.data.surahs.find(
          (s) => s.number === parseInt(id)
        );

        if (arabSurah && transSurah) {
          setVerses(arabSurah.ayahs);
          setTranslations(transSurah.ayahs);
          setSurahName(`${arabSurah.englishName} (${arabSurah.name})`);
        }
      } catch (error) {
        console.error("Gagal mengambil data surah:", error);
      }
    };

    fetchSurahData();
  }, [id]);

  return (
    <div className="Surahside p-4 pt-5">
      <h1 className="text-center text-2xl font-bold mb-4">Surah {surahName}</h1>
      <div className="SurahContainer space-y-4">
        {verses.map((ayah, index) => {
          const translation = translations[index];
          return (
            <div key={ayah.numberInSurah} className="p-4 border rounded-lg shadow bg-white">
              {/* Teks Arab */}
              <p
                className="font-arabic"
                style={{ direction: "rtl", textAlign: "right", fontFamily: "Scheherazade, serif" }}
              >
                {ayah.text}
              </p>
              {/* Terjemahan Bahasa Indonesia */}
              {translation && (
                <p className="mt-2 text-dark">
                  <strong>Terjemahan:</strong> {translation.text}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">Ayat {ayah.numberInSurah}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SurahSide;
