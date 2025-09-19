// import Lottie from "lottie-react";
import classes from "./giftcarousel.module.css";
import type { GiftImage } from "./giftcarousel";
import Star from "../svgs/star";

type CardProps = {
  card: GiftImage;
};

function Card({ card }: CardProps) {
  // const [animationData, setAnimationData] = React.useState<AnimationConfigWithData["animationData"] | null>(null);

  // React.useEffect(() => {
  //   if (card.title === "nft") {
  //     fetch("https://nft.fragment.com/gift/hexpot-10348.lottie.json")
  //       .then((res) => res.json())
  //       .then(setAnimationData)
  //       .catch((err) => console.error("Ошибка загрузки Lottie JSON:", err));
  //   }
  // }, [card.title]);

  return (
    <div className={classes.card_container}>
      <img className={classes.card_image} src={card.image} alt={card.title} />
      <div className={classes.card_price}>
        <Star />
        <span className={classes.card_price_title}>{card.price}</span>
      </div>
    </div>
  );
}

export default Card;
