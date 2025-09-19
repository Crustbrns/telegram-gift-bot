import "./App.css";
import Container from "./components/container/container";
import Giftcarousel from "./components/giftcarousel/giftcarousel";
import SegmentedTabs from "./components/tabs/segmentedtabs";
import { rolls } from "./rolls/Roll";
import Rolls from "./rolls/Rolls";
// import Title from "./components/title/title";
// import Tabs from "./components/tabs/tabs";

function App() {
  return (
    <>
      <Container>
        <SegmentedTabs />
        <Rolls/>
        {/* <Title /> */}
        {rolls != null && 
        <Giftcarousel gifts={rolls.prizes} winItem={rolls.prizes[0]} />}
        
      </Container>
    </>
  );
}

export default App;
