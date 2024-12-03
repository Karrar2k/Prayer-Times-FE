import React, { useState, useRef } from "react";
import "./RemindMe.css";

interface RemindMeProps {
  reminderMinutes: number | null;
  onSetReminder: (minutes: number, sound: string) => void;
  onDisableReminder: () => void;
  sound: string;
  volume: number;
  onSoundChange: (sound: string) => void;
  onTestSound: () => void;
  activeReminder: boolean;
  theme: "light" | "dark";
  translations: {
    reminder: {
      label: string;
      minutesBefore: string;
      enable: string;
      sound: string;
      test: string;
      stop: string;
      setR: string;
      edit: string;
      confirmation: string;
    };
  };
}

const RemindMe: React.FC<RemindMeProps> = ({
  reminderMinutes,
  onSetReminder,
  onDisableReminder,
  sound,
  volume,
  onSoundChange,
  activeReminder,
  theme,
  translations,
}) => {
  const [inputMinutes, setInputMinutes] = useState<number | string>(
    reminderMinutes || ""
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSetReminder = () => {
    const minutes =
      typeof inputMinutes === "string"
        ? parseInt(inputMinutes, 10)
        : inputMinutes;

    if (minutes && minutes >= 1 && minutes <= 30) {
      onSetReminder(minutes, sound);
    } else {
      alert(translations.reminder.minutesBefore);
    }
  };

  const handleTestSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const audio = new Audio(`/sounds/${sound}`);
    audioRef.current = audio;
    audio.volume = volume;

    audio.play().catch((err) => {
      console.error("Error playing sound:", err);
    });
  };

  const handleStopTestSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className={`remindme-container ${theme}`}>
      {!activeReminder ? (
        <>
          {/* Title */}
          <h2 className="remindme-title">{translations.reminder.label}</h2>

          {/* Input for Reminder Minutes */}
          <div className="remindme-row">
            <label htmlFor="minutes" className="remindme-label">
              {translations.reminder.minutesBefore}
            </label>
            <input
              id="minutes"
              type="number"
              min={1}
              max={30}
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              className="remindme-input"
            />
          </div>

          {/* Sound Selector */}
          <div className="remindme-row">
            <label htmlFor="sound" className="remindme-label">
              {translations.reminder.sound}
            </label>
            <select
              id="sound"
              value={sound}
              onChange={(e) => onSoundChange(e.target.value)}
              className="remindme-select"
            >
              <option value="Breaking.mp3">Breaking</option>
              <option value="Journey.mp3">Journey</option>
              <option value="Alfaraj.mp3">Dua Al-Faraj</option>
              <option value="Quluban.mp3">Nasheed Ya Quluban</option>
            </select>
            <button
              className="remindme-test-button"
              onClick={handleTestSound}
              aria-label="Test Sound"
            >
              {translations.reminder.test}
            </button>
            <button
              className="remindme-stop-test-button"
              onClick={handleStopTestSound}
              aria-label="Stop Test Sound"
            >
              {translations.reminder.stop}
            </button>
          </div>

          {/* Set Reminder Button */}
          <button
            className="remindme-set-button"
            onClick={handleSetReminder}
            aria-label="Set Reminder"
          >
            {translations.reminder.setR}
          </button>
        </>
      ) : (
        // Confirmation Modal
        <div className="remindme-modal">
          <p className="remindme-confirmation">
            {translations.reminder.confirmation.replace(
              "{minutes}",
              (reminderMinutes || 5).toString()
            )}
          </p>
          <button
            className="remindme-edit-button"
            onClick={onDisableReminder}
            aria-label="Edit Reminder"
          >
            {translations.reminder.edit}
          </button>
        </div>
      )}
    </div>
  );
};

export default RemindMe;