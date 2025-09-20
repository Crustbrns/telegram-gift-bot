import { useState } from "react";
import { motion } from "framer-motion";
import classes from './tabs.module.css';
import Star from "../svgs/star";
import type { Prize } from "../../rolls/Roll";

// type Opt = { value: number; label: string };
// const OPTIONS: Opt[] = [
//   { value: 25, label: "25" },
//   { value: 50, label: "50" },
//   { value: 100, label: "100" },
// ];

type SegmentedTabsProps = {
  rolls: Array<Prize>
}

export default function SegmentedTabs({rolls} : SegmentedTabsProps) {
  const [selected, setSelected] = useState<number>(25);

  function SelectRoll(item: Prize){
      setSelected(item.cost)
      console.log(item._id);
  }

  return (
    <div className={`${classes.tabs} relative flex rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-1 text-white`}>
      {rolls.map((o) => {
        const active = o.cost === selected;
        return (
          <div
            key={o._id}
            onClick={() => SelectRoll(o)}
            className={`${classes.tab} relative flex-1 px-8 py-3 text-center font-medium`}
          >
            {active && (
              <motion.span
                layoutId="pill"
                className={`${classes.tab_active} absolute inset-0 rounded-xl backdrop-blur-xl shadow`}
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            <span style={{color:'#e57f12'}} className="relative z-10 flex items-center justify-center gap-1">
              <Star/> {o.cost}
            </span>
          </div>
        );
      })}
    </div>
  );
}
