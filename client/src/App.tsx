import "./App.css";
import Container from "./components/container/container";
import SegmentedTabs from "./components/tabs/segmentedtabs";
import Giftcarousel from "./components/giftcarousel/giftcarousel";
import { rolls, rolls_selects } from "./rolls/Roll";
// import Title from "./components/title/title";
// import Tabs from "./components/tabs/tabs";

function App() {
  return (
    <>
      <Container>
        <SegmentedTabs rolls={rolls_selects}/>
        {/* <Title /> */}
        {rolls != null && 
        <Giftcarousel gifts={rolls.prizes} winItem={rolls.prizes[0]} />}
        
      </Container>
    </>
  );
}

export default App;
