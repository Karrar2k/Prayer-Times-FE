import React from "react";
import ThemeToggle from "../ui/themeToggle";
import LangToggle from "../ui/LangToggle";
import AdhanToggle from "../ui/AdhanToggle";
import Volume from "../ui/Volume";
import "./SettingsModal.css";

interface SettingsModalProps {
  onClose: () => void;
  theme: string;
  toggleTheme: () => void;
  language: string;
  toggleLanguage: () => void;
  adhanEnabled: boolean;
  toggleAdhan: () => void;
  volume: number;
  onVolumeChange: (value: number) => void;
  translations: {
    settingtitle: string;
    theme: string;
    dark: string;
    light: string;
    close: string;
    adhan: string;
    silent: string;
    prayerCall: string;
    english: string;
    arabic: string;
  };
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  theme,
  toggleTheme,
  language,
  toggleLanguage,
  adhanEnabled,
  toggleAdhan,
  volume,
  onVolumeChange,
  translations,
}) => {
  return (
    <div
      className={`settings-modal-backdrop ${
        theme === "dark" ? "dark" : "light"
      }`}
      onClick={onClose}
    >
      <div
        className={`settings-modal ${theme === "dark" ? "dark" : "light"}`}
        onClick={(e) => e.stopPropagation()}
        style={{ direction: "ltr"}}
      >
        <h2 className="modal-title">{translations.settingtitle}</h2>

        <div className="settings-item theme-toggle">
          <span className="toggle-label">{translations.light}</span>
          <ThemeToggle checked={theme === "dark"} onToggle={toggleTheme} />
          <span className="toggle-label">{translations.dark}</span>
        </div>

        <div className="settings-item language-toggle">
          <span className="toggle-label">{translations.english}</span>
          <LangToggle
            checked={language === "العربية"}
            onToggle={toggleLanguage}
          />
          <span className="toggle-label">{translations.arabic}</span>
        </div>

        <div className="settings-item adhan-toggle">
          <span className="toggle-label">{translations.silent}</span>
          <AdhanToggle checked={adhanEnabled} onToggle={toggleAdhan} />
          <span className="toggle-label">{translations.prayerCall}</span>
        </div>

        <div className="settings-item volume-bar">
          <Volume volume={volume} onVolumeChange={onVolumeChange} />
        </div>

        <button className="close-button" onClick={onClose}>
          {translations.close}
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;