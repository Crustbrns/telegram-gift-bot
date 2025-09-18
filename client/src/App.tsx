import "./App.css";
import Container from "./components/container/container";
import SegmentedTabs from "./components/tabs/segmentedtabs";
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
        {/* <GiftCarousel gifts={gifts} winItem={gift} /> */}
        
      </Container>
    </>
  );
}

export default App;
