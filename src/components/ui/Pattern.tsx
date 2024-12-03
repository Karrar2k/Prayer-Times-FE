import React from "react";
import styled from "styled-components";

interface PatternProps {
  theme: "light" | "dark";
  children?: React.ReactNode; // Accept children to wrap the app content
}

const Pattern: React.FC<PatternProps> = ({ theme, children }) => {
  return (
    <StyledWrapper theme={theme}>
      <div className="container">{children}</div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ theme: "light" | "dark" }>`
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) =>
      theme === "light"
        ? "repeating-linear-gradient(45deg, #e1e1e1, #e1e1e1 10px, #d1d1d1 10px, #d1d1d1 20px)"
        : "repeating-linear-gradient(45deg, #1e2935, #1e2935 10px, #212f3d 10px, #212f3d 20px)"};
  }
`;

export default Pattern;
