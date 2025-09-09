import React, { type ReactNode } from "react";
import classes from "./container.module.css";

type ContainerProps = {
  children: ReactNode;
};

function Container({ children }: ContainerProps) {
  return (
    <div className={classes.main}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

export default Container;
