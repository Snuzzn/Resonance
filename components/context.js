import React from "react";

export const MyContext = React.createContext();
export const MyProvider = ({ children }) => {
  const [darkMode, setDarkMode] = React.useState(true);

  const [selectedTopic, setSelectedTopic] = React.useState(true);
  const [cardSize, setCardSize] = React.useState(345);

  const value = {
    darkMode,
    setDarkMode,
    selectedTopic,
    setSelectedTopic,
    cardSize,
    setCardSize,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
