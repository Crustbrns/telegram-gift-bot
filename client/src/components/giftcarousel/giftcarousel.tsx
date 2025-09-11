import React, { useEffect } from "react";
import classes from "./giftcarousel.module.css";
import Card from "./card";
import { TbTriangleFilled } from "react-icons/tb";

export type GiftType = {
  image: string;
  title: string;
  price: string;
};

type Props = {
  gifts: GiftType[];
  winningIndex: number;
};

function GenerateGift(gifts: Array<GiftType>, count: number): Array<GiftType> {
  if (count === 0) new Array<GiftType>(gifts[0]);
  const tempgifts = new Array<GiftType>();
  for (let i = 0; i < count; i++) {
    tempgifts.push(gifts[Math.floor(Math.random() * gifts.length)]);
  }
  return tempgifts;
}

function Giftcarousel({ gifts }: Props) {
  const [cards] = React.useState<GiftType[]>(() => GenerateGift(gifts, 50));
  const [offset, setOffset] = React.useState(0);

  useEffect(() => {
    let frame: number;
    let lastTime = performance.now();
    const startTime = lastTime;

    const speed = { current: 0 };

    function animate(now: number) {
      const delta = (now - lastTime) / (1000 / 60);
      lastTime = now;

      setOffset((prev) => prev - speed.current * delta);

      if (now - startTime < 1500) {
        speed.current += 0.3;
      } else {
        speed.current = Math.max(0, speed.current - 0.08);
      }

      frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.shadow_left}></div>
        <div className={classes.shadow_right}></div>
        <div className={`${classes.card_holder} ${classes.carousel_track}`}>
          <div
            style={{
              transform: `translateX(${offset}px)`,
              display: "flex",
              gap: "8px",
            }}
          >
            {cards.map((gift, i) => (
              <Card key={i + gift.title + i} card={gift} />
            ))}
          </div>
        </div>
      </div>
      <div className={classes.arrow_container}>
        <TbTriangleFilled className={classes.arrow} color="black" size={25} />
      </div>
      <div className={classes.button}>Мне повезет!</div>
    </div>
  );
}

export default Giftcarousel;
