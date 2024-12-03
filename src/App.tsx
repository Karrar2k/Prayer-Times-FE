import React, { useState, useEffect, useRef } from "react";
import House from "./components/House/House";
import SettingsModal from "./components/SettingsModal/SettingsModal";
import RemindMe from "./components/RemindMe/RemindMe";
import Pattern from "./components/ui/Pattern";
import translations from "./translations";
import "./App.css";

const App: React.FC = () => {
  const [city, setCity] = useState(
    () => localStorage.getItem("selectedCity") || "London"
  );
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "English"
  );
  const [remindersEnabled, setRemindersEnabled] = useState(
    () => localStorage.getItem("remindersEnabled") === "true"
  );
  const [adhanEnabled, setAdhanEnabled] = useState(
    () => localStorage.getItem("adhanEnabled") === "true"
  );
  const [prayerTimes] = useState<Record<string, string>>({});
  const [nextPrayerTime, setNextPrayerTime] = useState<Date | null>(null);
  const [reminderMinutes, setReminderMinutes] = useState<number | null>(() => {
    const savedMinutes = localStorage.getItem("reminderMinutes");
    return savedMinutes ? parseInt(savedMinutes, 10) : null;
  });
  const [selectedSound, setSelectedSound] = useState<string>("Breaking.mp3");
  const [volume, setVolume] = useState<number>(() => {
    const savedVolume = localStorage.getItem("volume");
    return savedVolume ? parseFloat(savedVolume) : 1.0;
  });
  const [activeReminder, setActiveReminder] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Ref to track test audio
  const testAudioRef = useRef<HTMLAudioElement | null>(null);

  // Save preferences to localStorage
  useEffect(() => localStorage.setItem("selectedCity", city), [city]);
  useEffect(() => localStorage.setItem("theme", theme), [theme]);
  useEffect(() => localStorage.setItem("language", language), [language]);
  useEffect(
    () => localStorage.setItem("adhanEnabled", String(adhanEnabled)),
    [adhanEnabled]
  );
  useEffect(() => {
    if (remindersEnabled) {
      localStorage.setItem("remindersEnabled", "true");
      if (reminderMinutes !== null) {
        localStorage.setItem("reminderMinutes", reminderMinutes.toString());
      }
    } else {
      localStorage.removeItem("remindersEnabled");
      localStorage.removeItem("reminderMinutes");
    }
  }, [remindersEnabled, reminderMinutes]);
  useEffect(() => localStorage.setItem("volume", volume.toString()), [volume]);

  // Calculate Next Prayer Time
  useEffect(() => {
    if (Object.keys(prayerTimes).length > 0) {
      const now = new Date();
      const times = ["Fajr", "Dhur", "Maghrib"].map((prayer) => {
        const [hours, minutes] = prayerTimes[prayer].split(":").map(Number);
        const time = new Date();
        time.setHours(hours, minutes, 0, 0);
        return { prayer, time };
      });

      const next = times.find(({ time }) => time > now);
      setNextPrayerTime(next ? next.time : null);
    }
  }, [prayerTimes]);

  // Adhan Logic
  useEffect(() => {
    if (adhanEnabled && nextPrayerTime) {
      const now = new Date();
      const timeToNextPrayer = nextPrayerTime.getTime() - now.getTime();

      const timeout = setTimeout(() => {
        const audio = new Audio(`${process.env.PUBLIC_URL}/sounds/Adhan.mp3`);
        audio.volume = volume;
        audio.play();
        setNextPrayerTime(null);
      }, timeToNextPrayer);

      return () => clearTimeout(timeout);
    }
  }, [adhanEnabled, nextPrayerTime, volume]);

  // Reminder Timer Logic
  useEffect(() => {
    let reminderTimeout: NodeJS.Timeout | null = null;

    if (remindersEnabled && reminderMinutes !== null && nextPrayerTime) {
      const reminderTime = new Date(nextPrayerTime.getTime());
      reminderTime.setMinutes(reminderTime.getMinutes() - reminderMinutes);

      const now = new Date();
      const timeToReminder = reminderTime.getTime() - now.getTime();

      reminderTimeout = setTimeout(() => {
        const audio = new Audio(
          `${process.env.PUBLIC_URL}/sounds/${selectedSound}`
        );
        audio.volume = volume;
        audio.play();
        setActiveReminder(true);

        setTimeout(() => setActiveReminder(false), 60 * 1000);
      }, timeToReminder);

      return () => {
        if (reminderTimeout) clearTimeout(reminderTimeout);
      };
    }
  }, [
    remindersEnabled,
    reminderMinutes,
    nextPrayerTime,
    selectedSound,
    volume,
  ]);

  // Ensure theme is applied to the root document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Ensure correct language and directionality
  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      language === "العربية" ? "rtl" : "ltr"
    );
    document.documentElement.style.fontFamily =
      language === "العربية"
        ? "'Alexandria', sans-serif"
        : "'Teko', sans-serif";
  }, [language]);

  // Handlers
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "English" ? "العربية" : "English"));
  const toggleAdhan = () => setAdhanEnabled((prev) => !prev);
  const toggleReminders = () => setRemindersEnabled((prev) => !prev);

  const handleSetReminder = (time: number, sound: string) => {
    if (time >= 1 && time <= 30) {
      setReminderMinutes(time);
      setSelectedSound(sound);
      setActiveReminder(true);
    } else {
      alert("Please enter a valid reminder time between 1 and 30 minutes.");
    }
  };

  const handleStopReminder = () => {
    setActiveReminder(false);
    setReminderMinutes(null);
  };

  const handleTestSound = () => {
    if (testAudioRef.current) {
      testAudioRef.current.pause();
      testAudioRef.current.currentTime = 0;
    }

    const audio = new Audio(
      `${process.env.PUBLIC_URL}/sounds/${selectedSound}`
    );
    audio.volume = volume;
    testAudioRef.current = audio;
    audio.play();
  };

  const handleVolumeChange = (value: number) => setVolume(value);

  return (
    <Pattern theme={theme}>
      <div className="app-container">
        <div className="content-wrapper">
          <House
            city={city}
            onCityChange={setCity}
            openSettings={() => setShowSettings(true)}
            date={new Date().toLocaleDateString(
              language === "English" ? "en-GB" : "ar-SA",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
            translations={
              language === "English" ? translations.en : translations.ar
            }
            remindersEnabled={remindersEnabled}
            toggleReminders={toggleReminders}
            theme={theme}
            adhanEnabled={adhanEnabled}
          />

          {remindersEnabled && (
            <div className="remindme-wrapper">
              <RemindMe
                reminderMinutes={reminderMinutes}
                onSetReminder={handleSetReminder}
                onDisableReminder={handleStopReminder}
                sound={selectedSound}
                onSoundChange={setSelectedSound}
                onTestSound={handleTestSound}
                activeReminder={activeReminder}
                theme={theme}
                volume={volume}
                translations={
                  language === "English" ? translations.en : translations.ar
                }
              />
            </div>
          )}
        </div>

        {showSettings && (
          <SettingsModal
            onClose={() => setShowSettings(false)}
            theme={theme}
            toggleTheme={toggleTheme}
            language={language}
            toggleLanguage={toggleLanguage}
            adhanEnabled={adhanEnabled}
            toggleAdhan={toggleAdhan}
            volume={volume}
            onVolumeChange={handleVolumeChange}
            translations={
              language === "English"
                ? translations.en.settings
                : translations.ar.settings
            }
          />
        )}
      </div>
    </Pattern>
  );
};

export default App;