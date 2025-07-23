import { useEffect, useState } from "react";
import Prayer from "./components/prayer";

function App() {
  const [timings, setTimings] = useState([]);
  const [city, setCity] = useState("Cairo");
const [date, setDate] = useState(() => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
});
  const prayers = [
    { name: "الفجر", key: "Fajr" },
    { name: "الشروق", key: "Sunrise" },
    { name: "الظهر", key: "Dhuhr" },
    { name: "العصر", key: "Asr" },
    { name: "المغرب", key: "Maghrib" },
    { name: "العشاء", key: "Isha" },
  ];

  const cities = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الإسكندرية", value: "Alexandria" },
    { name: "أسوان", value: "Aswan" },
    { name: "الأقصر", value: "Luxor" },
    { name: "المنصورة", value: "Mansoura" },
    { name: "الجيزة", value: "Giza" },
  ];

  function formatTimeTo12Hour(time24) {
    if (!time24) return "";

    const [hourStr, minuteStr] = time24.split(":");
    let hour = parseInt(hourStr);
    const minute = minuteStr;
    const isPM = hour >= 12;

    hour = hour % 12 || 12;

    const ampm = isPM ? "م" : "ص";
    const formatted = `${hour}:${minute} ${ampm}`;

    return formatted.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
  }

  const GetTimings = async () => {
    try {
      const formattedDate = date.split("-").reverse().join("-"); // Convert YYYY-MM-DD to DD-MM-YYYY
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=${city}&country=EG`
      );
      const data = await response.json();
      console.log(data);
      setTimings(data.data.timings);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  useEffect(() => {
    GetTimings();
  }, [city, date]);

  return (
  <section>
    <div className="container">
      <h1 className="main-title">مواقيت الصلاة</h1> {/* 👈 Headline added */}

      <div className="top_sec">
        <div className="city">
          <h3>المدينة</h3>
          <select onChange={(e) => setCity(e.target.value)} value={city}>
            {cities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="date">
          <h3>التاريخ</h3>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {prayers.map((prayer, index) => (
        <Prayer
          key={index}
          name={prayer.name}
          time={timings[prayer.key]}
          formatTime={formatTimeTo12Hour}
        />
      ))}
    </div>
  </section>
);

}

export default App;
