import { useState } from "react";
import { motion } from "framer-motion";
import classes from './tabs.module.css';
import Star from "../svgs/star";

type Opt = { value: number; label: string };
const OPTIONS: Opt[] = [
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

export default function SegmentedTabs() {
  const [selected, setSelected] = useState<number>(25);

  return (
    <div className={`${classes.tabs} relative flex rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-1 text-white`}>
      {OPTIONS.map((o) => {
        const active = o.value === selected;
        return (
          <div
            key={o.value}
            onClick={() => setSelected(o.value)}
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
              <Star/> {o.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
