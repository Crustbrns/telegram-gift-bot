import React, { useEffect } from "react";
import classes from "./giftcarousel.module.css";
import Card from "./card";
import { TbTriangleFilled } from "react-icons/tb";
import { DefaultGifts } from "../../rolls/DefaultGifts";

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
  winItem: GiftImage;
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
  const [cards] = React.useState<GiftImage[]>(() => GenerateGift(gifts, 14));
  const [offset, setOffset] = React.useState(0);
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    let frame: number;
    let lastTime = performance.now();
    // const startTime = lastTime;
    function checkWidth() {
      setWidth(window.innerWidth);
    }

    // проверяем сразу
    checkWidth();

    // навешиваем слушатель
    window.onresize = checkWidth;

    const speed = { current: 58.4 };
    // const accel = { current: 0.05 };

    function animate(now: number) {
      const delta = (now - lastTime) / (1000 / 60);
      lastTime = now;

      setOffset((prev) => prev - speed.current * delta);
      // setCount((prev) => prev + Math.max(1, Math.floor(delta)/100));
      speed.current = Math.max(0, speed.current - 1 * delta);
      // if (now - startTime < 400) {
      //   speed.current += 3;
      // } else {
      //   if (now - startTime < 2600) {
      //     speed.current = Math.max(0, speed.current - 0.6);
      //   } else {
      //     speed.current = Math.max(0, speed.current - accel.current);
      //     accel.current += 0.00025;
      //   }
      // }

      // console.log(count);
      frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    // const interval = setInterval(() => {
    //   console.log("Тик" + count, new Date().toLocaleTimeString());
    //   setCount((prev) => prev + 1);
    // }, 1000);

    // очищаем интервал при размонтировании
    return () => {
      cancelAnimationFrame(frame);
      // clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.shadow_left}></div>
        <div className={classes.shadow_right}></div>
        <div className={classes.pointer}></div>
        <TbTriangleFilled className={classes.arrowpointerdown} size={20} />
        <TbTriangleFilled className={classes.arrowpointer} size={20} />
        <div className={`${classes.card_holder} ${classes.carousel_track}`}>
          <div
            style={{
              transform: `translateX(${offset}px)`,
              display: "flex",
              gap: "10px",
              marginLeft: width > 720 ? 0 : -(720 - width)/2
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
      <div className={classes.button}>Мне повезет!</div>
    </div>
  );
}

export default Giftcarousel;
