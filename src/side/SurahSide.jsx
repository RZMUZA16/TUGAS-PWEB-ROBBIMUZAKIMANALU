import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./side.css"; // Import CSS file for styling
const SurahSide = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [verses, setVerses] = useState([]);
  const [surahName, setSurahName] = useState("");

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const response = await axios.get("http://api.alquran.cloud/v1/quran/quran-uthmani");
        const surah = response.data.data.surahs.find(s => s.number === parseInt(id));
        if (surah) {
          setVerses(surah.ayahs);
          setSurahName(`${surah.englishName} (${surah.name})`);
        }
      } catch (error) {
        console.error("Gagal mengambil data surah:", error);
      }
    };

    fetchSurah();
  }, [id]);

  return (
    <div className="Surahside p-4 pt -20">
      <h1 className="text-center text-2xl font-bold mb-4">Surah {surahName}</h1>
      <div className="SurahContainer space-y-4">
        {verses.map((ayah) => (
          <div key={ayah.numberInSurah} className="p-4 border rounded-lg shadow bg-white">
            <p className="font-arabic">{ayah.text}</p>
            <p className="text-sm text-gray-500 mt-2"> {ayah.numberInSurah}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahSide;
