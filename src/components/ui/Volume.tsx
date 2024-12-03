import React from "react";
import styled from "styled-components";

interface VolumeProps {
  volume: number;
  onVolumeChange: (value: number) => void;
}

const Volume: React.FC<VolumeProps> = ({ volume, onVolumeChange }) => {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(parseFloat(e.target.value));
  };

  return (
    <StyledWrapper>
      <div className="volume-container">
        <svg
          className="volume-icon"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          xmlSpace="preserve"
        >
          <path
            d="M18.36 19.36a1 1 0 0 1-.705-1.71C19.167 16.148 20 14.142 20 12s-.833-4.148-2.345-5.65a1 1 0 1 1 1.41-1.419C20.958 6.812 22 9.322 22 12s-1.042 5.188-2.935 7.069a.997.997 0 0 1-.705.291z"
            fill="currentColor"
          />
          <path
            d="M15.53 16.53a.999.999 0 0 1-.703-1.711C15.572 14.082 16 13.054 16 12s-.428-2.082-1.173-2.819a1 1 0 1 1 1.406-1.422A6 6 0 0 1 18 12a6 6 0 0 1-1.767 4.241.996.996 0 0 1-.703.289zM12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z"
            fill="currentColor"
          />
        </svg>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          aria-label="Volume Control"
          className="volume-slider"
        />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .volume-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px; /* Spacing between the icon and the slider */
    width: 100%; /* Ensures it spans the available space */
  }

  .volume-icon {
    width: 24px;
    height: 24px;
    fill: var(--icon-color, #fff);
  }

  .volume-slider {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 70%; /* Adjusts the slider width */
    height: 5px;
    background: var(--slider-bg, #ccc);
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: var(--thumb-bg, #fff);
    cursor: pointer;
  }

  .volume-slider::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: var(--thumb-bg, #fff);
    cursor: pointer;
  }
`;

export default Volume;