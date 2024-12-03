import React from "react";
import styled from "styled-components";

interface RemindToggleProps {
  checked: boolean;
  onToggle: () => void;
}

const RemindToggle: React.FC<RemindToggleProps> = ({ checked, onToggle }) => {
  return (
    <StyledWrapper>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onToggle} />
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 25px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 15px;
    transition: background-color 0.3s ease;
  }

  .switch input:checked + .slider {
    background-color: #404040;
  }

  .slider::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    top: 2.5px;
    left: 3px;
    transition: left 0.3s ease;
  }

  .switch input:checked + .slider::before {
    left: calc(100% - 23px);
  }
`;

export default RemindToggle;
