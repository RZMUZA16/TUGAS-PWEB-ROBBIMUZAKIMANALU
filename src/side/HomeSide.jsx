import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./side.css";
import image from "../assets/background.jpg";

const HomeSide = () => {
    const [surahs, setSurahs] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const response = await axios.get("https://api.alquran.cloud/v1/quran/quran-uthmani");
                setSurahs(response.data.data.surahs);
            } catch (error) {
                console.error("Gagal mengambil data surah:", error);
            }
        };

        fetchSurahs();
    }, []);

    return (
        <>
            <div
                className="HomeSide"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="TOP-FILE">
                    <div>
                        <h1 className="text-center">AL-QURAN</h1>
                        <p className="text-center">
                            Dari teks hingga tafsir, semua dalam satu platform interaktif untuk mendekatkan diri pada Kitabullah.
                        </p>
                        <p className="text-center">
                            Al-Qur'an adalah petunjuk hidup bagi umat manusia, penuh hikmah, kasih sayang, dan kebenaran.
                            Kami hadir untuk memudahkan Anda membaca, memahami, dan merenungi ayat-ayat suci dengan tafsir yang terpercaya.
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <div className="BOTTOM-FILE">
                    <h1 className="text-center">Daftar Surah</h1>
                    <p className="text-center">Daftar Surah Al-Qur'an</p>

                    <ul className="Surah-grid text-center">
                        {surahs.map((surah) => (
                            <li
                                key={surah.number}
                                className="Surah-container"
                                onClick={() => navigate(`/surah/${surah.number}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="Surah-wrapper">
                                    <div className="Surah-number">{surah.number}</div>
                                    <div className="Surah-title">
                                        {surah.englishName} - {surah.name}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default HomeSide;
