import "./App.css";
import Container from "./components/container/container";
import GiftCarousel, {
  type GiftType,
} from "./components/giftcarousel/giftcarousel";
import { img0, img1, img10, img2, img3, img4, img5, img6, img7, img8, img9 } from "./components/giftcarousel/images";
import SegmentedTabs from "./components/tabs/segmentedtabs";
import Title from "./components/title/title";
// import Tabs from "./components/tabs/tabs";

const gifts: GiftType[] = [
  { image: img0, title: "Gift 0", price: "15" },
  { image: img1, title: "Gift 1", price: "15" },
  { image: img2, title: "Gift 2", price: "15" },
  { image: img3, title: "Gift 3", price: "15" },
  { image: img4, title: "Gift 4", price: "15" },
  { image: img5, title: "Gift 5", price: "15" },
  { image: img6, title: "Gift 6", price: "15" },
  { image: img7, title: "Gift 7", price: "15" },
  { image: img8, title: "Gift 8", price: "15" },
  { image: img9, title: "Gift 9", price: "15" },
  { image: img10, title: "nft", price: "15" },
];

function App() {
  return (
    <>
      <Container>
        <SegmentedTabs />
        <Title />
        <GiftCarousel gifts={gifts} winningIndex={10} />
      </Container>
    </>
  );
}

export default App;
