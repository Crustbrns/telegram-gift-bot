import React from "react";
import classes from "./NavButtons.module.css";
import { IoIosArrowBack } from "react-icons/io";

function NavButtons() {
  return (
    <>
    <div className={classes.stroke}></div>
    <div className={classes.container}>
      <div className={classes.holder}>
        <div className={classes.button_name}>
          <IoIosArrowBack />
        </div>
        <div className={classes.button_name}>crustbrns</div>
      </div>
    </div>
    </>
  );
}

export default NavButtons;
