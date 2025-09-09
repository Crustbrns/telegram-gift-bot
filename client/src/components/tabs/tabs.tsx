import { useState } from "react";
import classes from './tabs.module.css';

export default function Tabs() {
  const [selected, setSelected] = useState(25);
  const options = [25, 50, 100];

  return (
    <div className={classes.tabs}>
      {options.map((val) => (
        <div
          key={val}
          onClick={() => setSelected(val)}
          className={`${classes.tab}
            ${
              selected === val
                ? classes.tab_active
                : "text-gray-300 hover:bg-white/10"
            }`}
        >
          {val} ✨
        </div>
      ))}
    </div>
  );
}
