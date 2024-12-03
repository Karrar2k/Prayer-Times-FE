import React from "react";
import PrayerTimes from "../PrayerTimes/PrayerTimes";
import RemindToggle from "../ui/RemindToggle"; // Assuming this is your slider component
import "./House.css";

interface HouseProps {
  city: string;
  onCityChange: (city: string) => void;
  openSettings: () => void;
  date: string;
  translations: {
    title: string;
    cities: Record<string, string>;
    times: {
      fajr: string;
      dhur: string;
      maghrib: string;
      imsaak: string;
    };
    adhanplaying: string;
    reminder: {
      enable: string;
    };
    footer: {
      createdBy: string;
      name: string;
    };
  };
  remindersEnabled: boolean;
  toggleReminders: () => void;
  theme: "light" | "dark";
  adhanEnabled: boolean;
}

const House: React.FC<HouseProps> = ({
  city,
  onCityChange,
  openSettings,
  date,
  translations,
  remindersEnabled,
  toggleReminders,
  theme,
  adhanEnabled,
}) => {
  return (
    <div className={`house ${theme}`}>
      <div className="house-header">
        <span
          className="settings-gear"
          role="img"
          aria-label="settings"
          onClick={openSettings}
        >
          ⚙️
        </span>
      </div>
      <div className="house-content">
        <h1>{translations.title}</h1>
        <p className="current-date">{date}</p>
        <select
          className="city-selector"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
        >
          {Object.entries(translations.cities).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        {adhanEnabled && (
          <p className="adhan-status">{translations.adhanplaying}</p>
        )}
        <PrayerTimes
          city={city}
          translations={translations.times}
          className={`prayer-times ${theme}`}
        />
        <div className="reminder-section">
          <label className="reminder-toggle">
            <span>{translations.reminder.enable}</span>
            <RemindToggle
              checked={remindersEnabled}
              onToggle={toggleReminders}
            />
          </label>
        </div>
      </div>

      {/* Footer for Credit */}
      <footer className="house-footer">
        {translations.footer.createdBy}{" "}
        <a
          href="https://github.com/Karrar2k"
          target="_blank"
          rel="noopener noreferrer"
        >
          {translations.footer.name}
        </a>
      </footer>
    </div>
  );
};

export default House;