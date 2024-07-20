import { createContext, useEffect, useState } from "react";

export const CoinContaxt = createContext();

const CoinContaxtProvider = (props) =>{

    const [allCoin, setAllCoin] = useState([])
    const [currency, setCurrency] = useState({
        name: 'usd',
        Symbol: "$"
    })

    const fetchAllCoin = async ()=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': '	CG-dFG1ktpHs6iGzDeBB1R7Ewo4'
            }
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }

    useEffect(()=>{
        fetchAllCoin();
    },[currency])

    const contaxtValue ={
        allCoin,
        currency,
        setCurrency
    }

    return(
        <CoinContaxt.Provider value={contaxtValue}>
            {props.children}
        </CoinContaxt.Provider>
    )
}

export default CoinContaxtProvider;