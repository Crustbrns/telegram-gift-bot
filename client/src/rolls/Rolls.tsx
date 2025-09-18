import React from 'react';
import type { Roll } from './Roll';
import { DefaultGifts } from './DefaultGifts';

function Rolls() {
    const [rolls, setRolls] = React.useState<Array<Roll>>();

    
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/rolls/");
        const data = await res.json();
        setRolls(data);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      }
    };

    fetchData();
  }, []);


    return (
        <></>
        // <div style={{backgroundColor: 'red'}}>
        //     {rolls && 
        //     rolls[0].prizes.map(x => (
        //     <img src={DefaultGifts.find(y=>y._id === x)?.image} />))}
        // </div>
    );
}

export default Rolls;