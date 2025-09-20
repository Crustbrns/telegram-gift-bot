import { useLastWinsStore } from "../../user/User";

function LastDrops() {
  const { lastwins } = useLastWinsStore();

  return (
    <div>
      {lastwins.map((gift) => (
        <div>{gift}</div>
      ))}
    </div>
  );
}

export default LastDrops;
