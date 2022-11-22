import { useState } from "react";
import "./Menu.css";

const Menu = ({ toggleDisplay, getDailyRepos }) => {
  const [period, setPeriod] = useState("Favorites");

  const onPeriodChange = (period, title) => {
    getDailyRepos(period);
    setPeriod(title);
  };
  const onFavDisplay = () => {
    toggleDisplay(true);
    setPeriod("Favorites");
  };
  return (
    <div className="menu">
      <div id="header">
        <button
          onClick={() => onPeriodChange("day", "Top repositories of the day")}
        >
          Daily
        </button>
        <button
          onClick={() => onPeriodChange("week", "Top repositories of the week")}
        >
          Weekly
        </button>
        <button
          onClick={() =>
            onPeriodChange("month", "Top repositories of the month")
          }
        >
          Monthly
        </button>
        <button onClick={() => onFavDisplay()}>Favorites</button>
        <div id="current"> {period}</div>
      </div>
    </div>
  );
};

export default Menu;
