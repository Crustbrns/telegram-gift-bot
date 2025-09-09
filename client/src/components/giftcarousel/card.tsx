// import Lottie from "lottie-react";
import classes from "./giftcarousel.module.css";
import type { GiftType } from "./giftcarousel";
import React from "react";
import type { AnimationConfigWithData } from "lottie-web";

type CardProps = {
  card: GiftType;
};

function Card({ card }: CardProps) {
  const [animationData, setAnimationData] = React.useState<AnimationConfigWithData["animationData"] | null>(null);

  React.useEffect(() => {
    if (card.title === "nft") {
      fetch("https://nft.fragment.com/gift/hexpot-10348.lottie.json")
        .then((res) => res.json())
        .then(setAnimationData)
        .catch((err) => console.error("Ошибка загрузки Lottie JSON:", err));
    }
  }, [card.title]);


  return (
    <div className={classes.card_container}>
      {card.title !== "nft" ? (
        <img className={classes.card_image} src={card.image} alt={card.title} />
      ) : animationData ? (
        <img className={classes.card_image} src={card.image} alt={card.title} />
        
        // <Lottie
        //   className={classes.card_image}
        //   autoplay
        //   loop
        //   animationData={animationData}
        // />
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
}

export default Card;
