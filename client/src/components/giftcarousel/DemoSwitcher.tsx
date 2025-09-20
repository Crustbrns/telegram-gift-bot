import { useState } from "react";
import classes from "./giftcarousel.module.css";
import { PiCodesandboxLogoFill } from "react-icons/pi";
import { useObDemoStore } from "../../user/User";

type Opt = { value: boolean; label: string };
const OPTIONS: Opt[] = [
  { value: true, label: "demo" },
  //   { value: 2, label: "откл" },
];

export default function DemoSwitcher(isActive: boolean) {
  const { obdemo, update } = useObDemoStore();
  const [selectedDemo, setSelectedDemo] = useState<boolean>(obdemo);

  function SelectRoll() {
    if(isActive){
        setSelectedDemo(!obdemo);
        update(!obdemo);
        console.log(selectedDemo);
    }
  }

  return (
    <div
      onClick={SelectRoll}
      className={`${classes.tabs} relative flex rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-1 text-white`}
    >
      {OPTIONS.map((o: Opt) => {
        const active = o.value === selectedDemo;
        return (
          <div
            key={o.label}
            className={`${classes.tab} ${
              active ? classes.tab_active : ""
            } relative flex-1 px-8 py-3 text-center font-medium`}
          >
            <span className="relative z-10 flex items-center justify-center gap-1">
              {o.label === "demo" ? (
                <>
                  {" "}
                  <PiCodesandboxLogoFill size={20} /> Демо{" "}
                </>
              ) : (
                o.label
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
