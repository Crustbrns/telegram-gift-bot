import React, { useEffect } from "react";
import classes from "./giftcarousel.module.css";
import Card from "./card";
// import { TbTriangleFilled } from "react-icons/tb";
import { DefaultGifts } from "../../rolls/DefaultGifts";
import { BsStars } from "react-icons/bs";
import { useLastWinsStore, useObDemoStore } from "../../user/User";
import DemoSwitcher from "./DemoSwitcher";

export type GiftType = {
  image: string;
  title: string;
  price: string;
};

export type GiftImage = {
  image: string;
  _id: string;
  title: string;
  price: string;
};

type Props = {
  gifts: string[];
  winItem: string;
};

function GenerateGift(gifts: Array<string>, count: number): Array<GiftImage> {
  if (count === 0)
    new Array<GiftImage>(
      DefaultGifts[DefaultGifts.findIndex((x) => x._id === gifts[0])]
    );
  const tempgifts = new Array<GiftImage>();
  for (let i = 0; i < count; i++) {
    tempgifts.push(DefaultGifts[Math.floor(Math.random() * gifts.length)]);
  }
  return tempgifts;
}

function Giftcarousel({ gifts }: Props) {
  const { addWin } = useLastWinsStore();
  const { obdemo } = useObDemoStore();
  const [cards, setCards] = React.useState<GiftImage[]>(() =>
    GenerateGift(gifts, 14)
  );
  const [offset, setOffset] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [isRolled, setIsRolled] = React.useState(false);
  const speedRef = React.useRef(0);
  const [isInactive, setIsInactive] = React.useState(false);

  function Roll() {
    if (!isInactive) {
      setIsRolled(true);
      const giftstemp = GenerateGift(gifts, 14);
      setCards(giftstemp);
      // console.log(giftstemp[11]);
      addWin(giftstemp[11].title);
      setOffset(0);
      setIsInactive(true);
      speedRef.current = 58.4;
      setTimeout(() => {
        setIsInactive(false);
      }, 900);
    }
  }

  useEffect(() => {
    let frame: number;
    let lastTime = performance.now();
    function checkWidth() {
      setWidth(window.innerWidth);
    }
    checkWidth();

    window.onresize = checkWidth;
    // const speed = { current: 58.4 };

    // setIsInactive(true);
    // else setIsInactive(false);
    function animate(now: number) {
      const delta = (now - lastTime) / (1000 / 60);
      lastTime = now;
      setOffset((prev) => prev - speedRef.current * delta);
      // setOffset((prev) => prev - speed.current * delta);
      speedRef.current = Math.max(0, speedRef.current - 1 * delta);
      frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.shadow_left}></div>
        <div className={classes.shadow_right}></div>
        <div className={classes.pointer}></div>
        <BsStars className={classes.arrowpointerdown} size={35} />
        <BsStars className={classes.arrowpointer} size={35} />
        <div
          className={`${classes.card_holder} ${
            isRolled === false ? classes.card_holder_static : ""
          } ${classes.carousel_track}`}
        >
          <div
            style={{
              transform: `translateX(${offset}px)`,
              display: "flex",
              gap: "10px",
              marginLeft: width > 720 ? 0 : -(720 - width) / 2,
            }}
          >
            {cards.map((gift, i) => (
              <Card key={i + gift.title + i} card={gift} />
            ))}
          </div>
        </div>
      </div>
      {/* <div className={classes.arrow_container}>
        <TbTriangleFilled className={classes.arrow} color="black" size={25} />
      </div> */}
      <div className={classes.button_holder}>
        <div
          className={`${classes.button} ${
            isInactive ? classes.button_inactive : ""
          }`}
          onClick={Roll}
        >
          {!obdemo ? "Испытать удачу!" : "Попробовать бесплатно!"}
        </div>
        <DemoSwitcher isInactive={isInactive} />
      </div>
    </div>
  );
}

export default Giftcarousel;
