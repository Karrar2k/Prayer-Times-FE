import React, { useEffect, useState } from "react";
import "./PrayerTimes.css";

interface PrayerTime {
  imsaak: string;
  fajr: string;
  dhur: string;
  maghrib: string;
}

interface PrayerTimesProps {
  city: string;
  translations: {
    fajr: string;
    dhur: string;
    maghrib: string;
    imsaak: string;
  };
  className?: string;
}

// Function to format time to HH:MM
const formatTime = (time: string) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
};

const PrayerTimes: React.FC<PrayerTimesProps> = ({
  city,
  translations,
  className,
}) => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(`https://prayer-times-be-4rvn.onrender.com/prayer-times/${city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch prayer times.");
        }
        return response.json();
      })
      .then((data) => {
        // Format the times upon receiving the data
        const formattedData: PrayerTime = {
          imsaak: formatTime(data.imsaak),
          fajr: formatTime(data.fajr),
          dhur: formatTime(data.dhur),
          maghrib: formatTime(data.maghrib),
        };
        setPrayerTimes(formattedData);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [city]);

  if (loading) {
    return <div className="loading">Loading prayer times...</div>;
  }

  if (error || !prayerTimes) {
    return (
      <div className="error">
        Unable to fetch prayer times for {city}. Please try again later.
      </div>
    );
  }

  return (
    <div className={`prayer-times ${className || ""}`}>
      <ul>
        <li>
          <strong>{translations.fajr}:</strong> {prayerTimes.fajr}
          <div className="imsaak-card">
            {translations.imsaak}: {prayerTimes.imsaak}
          </div>
        </li>
        <li>
          <strong>{translations.dhur}:</strong> {prayerTimes.dhur}
        </li>
        <li>
          <strong>{translations.maghrib}:</strong> {prayerTimes.maghrib}
        </li>
      </ul>
    </div>
  );
};

export default PrayerTimes;