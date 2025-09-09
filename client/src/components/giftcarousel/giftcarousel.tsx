import { useEffect, useRef, useState } from "react";
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
  winningIndex?: number;
  onFinish?: (gift: GiftType) => void;
};

function Giftcarousel({ gifts, winningIndex, onFinish }: Props) {
  const [cards] = useState<GiftType[]>(() =>
    Array(40)
      .fill(null)
      .flatMap(() => gifts)
  );

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const baseIndex =
      winningIndex !== undefined
        ? winningIndex
        : Math.floor(Math.random() * gifts.length);

    const accelDuration = 1500;
    const steadyDuration = 200;
    const decelDuration = 8000;
    const totalDuration = accelDuration + steadyDuration + decelDuration;

    const startScroll = el.scrollLeft;

    const items = Array.from(el.children) as HTMLElement[];
    if (items.length === 0) return;

    //   const cardWidth = items[0].offsetWidth;
    //   const gap =
    //     items.length > 1
    //       ? items[1].offsetLeft - items[0].offsetLeft - cardWidth
    //       : 0;
    //   const cardFullWidth = cardWidth + gap;

    const spins = Math.floor(25 + Math.random() * 10);
    const finalIndex = spins * gifts.length + baseIndex;

    const targetNode = items[finalIndex];
    if (!targetNode) return;

    const nodeCenter = targetNode.offsetLeft + targetNode.offsetWidth / 2;
    const containerCenter = startScroll + el.clientWidth / 2;
    const totalDiff = nodeCenter - containerCenter;

    const easeInQuad = (t: number) => t * t;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    let start: number | null = null;
    let animId: number;

    function step(timestamp: number) {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;

      let progress: number;
      if (elapsed < accelDuration) {
        const local = elapsed / accelDuration;
        progress = 0.3 * easeInQuad(local);
      } else if (elapsed < accelDuration + steadyDuration) {
        const local = (elapsed - accelDuration) / steadyDuration;
        progress = 0.3 + 0.1 * local;
      } else if (elapsed < totalDuration) {
        const local =
          (elapsed - accelDuration - steadyDuration) / decelDuration;
        progress = 0.4 + 0.6 * easeOutCubic(local);
      } else {
        progress = 1;
      }

      el!.scrollLeft = startScroll + totalDiff * progress;

      if (elapsed < totalDuration) {
        animId = requestAnimationFrame(step);
      } else {
        onFinish?.(gifts[baseIndex]);
      }
    }

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [gifts, winningIndex, onFinish]);

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.shadow_left}></div>
        <div className={classes.shadow_right}></div>
        <div
          ref={ref}
          className={`${classes.card_holder} ${classes.carousel_track}`}
        >
          {cards.map((gift, i) => (
            <Card key={i + gift.title + i} card={gift} />
          ))}
        </div>
      </div>
      <div className={classes.arrow_container}>
      <TbTriangleFilled className={classes.arrow} color="black" size={25}/>
      </div>
      <div className={classes.button}>
          Мне повезет!
      </div>
    </div>
  );
}

export default Giftcarousel;
