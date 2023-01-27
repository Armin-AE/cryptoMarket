import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect } from "react";
import SwapVertIcon from "@mui/icons-material/SwapVert";
function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [marketsort, setMarketsort] = useState(false);
  const [pricesort, setPricesort] = useState(false);
  const [ranksort, setRanksort] = useState(false);
  const getData = async () => {
    try {
      const data = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const res = await data.json();
      setCoins(res);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };
  const sMcap = () => {
    setMarketsort((last) => (last = !last));
    return setCoins((last) => {
      const help = [...last];
      help.sort((a, b) =>
        marketsort ? a.market_cap > b.market_cap : a.market_cap < b.market_cap
      );
      return [...help];
    });
  };
  const sPrice = () => {
    setPricesort((last) => (last = !last));
    return setCoins((last) => {
      const help = [...last];
      help.sort((a, b) =>
        pricesort
          ? a.current_price > b.current_price
          : a.current_price < b.current_price
      );
      return [...help];
    });
  };
  const sRank = () => {
    setRanksort((last) => (last = !last));
    return setCoins((last) => {
      const help = [...last];
      help.sort((a, b) =>
        ranksort
          ? a.market_cap_rank > b.market_cap_rank
          : a.market_cap_rank < b.market_cap_rank
      );
      return [...help];
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <div className="container ">
        <div className="market">
          <input
            type="text"
            className="searching"
            onChange={(e) =>
              setSearch(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            placeholder="Search Coin..."
          />
          <div className="markets">
            <div
              onClick={() => sRank()}
              className="cur"
              style={{
                display: "flex",
                width: "100%",
                gap: "2rem",
              }}
            >
              <p>#</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p>Coin</p>
                <SwapVertIcon style={{ fontSize: "large" }} />
              </div>
            </div>
            <p
              style={{ display: "flex", alignItems: "center" }}
              className="cur"
              onClick={() => sMcap()}
            >
              Market Cap
              <SwapVertIcon style={{ fontSize: "large" }} />
            </p>
            <p
              style={{ display: "flex", alignItems: "center" }}
              className="cur"
              onClick={() => sPrice()}
            >
              Price
              <SwapVertIcon style={{ fontSize: "large" }} />
            </p>
            {coins
              .filter((item) => item.name.includes(search))
              .map((item, idx) => (
                <>
                  <div
                    className="borders"
                    style={{
                      padding: "1rem",
                      display: "flex",
                      gap: "30px",
                      alignItems: "center",
                    }}
                  >
                    <p>{item.market_cap_rank}</p>

                    <img
                      style={{ width: "40px", height: "40px" }}
                      src={item.image}
                      alt=""
                    />
                    <div style={{ display: "flex", gap: "10px" }}>
                      <p style={{ fontWeight: "bold" }}>{item.name}</p>
                      <p>{item.symbol}</p>
                    </div>
                  </div>
                  <p>{item.market_cap}</p>
                  <p>${item.current_price}</p>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
