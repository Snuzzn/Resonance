import React from "react";

export const MyContext = React.createContext();
export const MyProvider = ({ children }) => {
  const [darkMode, setDarkMode] = React.useState(true);

  const [selectedTopic, setSelectedTopic] = React.useState(true);
  const [cardSize, setCardSize] = React.useState(345);
  const [type, setType] = React.useState("All");
  const [openAddTopic, setOpenAddTopic] = React.useState(false);
  const [topics, setTopics] = React.useState([]);
  const [filter, setFilter] = React.useState("Unfiltered");

  const value = {
    darkMode,
    setDarkMode,
    selectedTopic,
    setSelectedTopic,
    cardSize,
    setCardSize,
    type,
    setType,
    openAddTopic,
    setOpenAddTopic,
    topics,
    setTopics,
    filter,
    setFilter,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
