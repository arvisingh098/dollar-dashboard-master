import React, { useEffect, useState } from "react";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { UseWalletProvider } from "use-wallet";
import { updateModalMode } from "./utils/web3";
import { storePreference, getPreference } from "./utils/storage";

//Components
import Container from "./components/Container";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

//Pages
import HomePage from "./pages/Home";
import Wallet from "./pages/Wallet";
import Pool from "./pages/Pool";
import EpochDetail from "./pages/EpochDetail";
import Regulation from "./pages/Regulation";
import CouponMarket from "./pages/CouponMarket";
import Candidate from "./pages/Candidate";
import Trade from "./pages/Trade";
import Governance from "./pages/Governance";
import HomePageNoWeb3 from "./pages/HomePageNoWeb3";

function App() {
  const storedTheme = getPreference("theme", "light");

  const [hasWeb3, setHasWeb3] = useState(false);
  const [user, setUser] = useState(""); // the current connected user
  const [theme, setTheme] = useState(storedTheme);

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
    updateModalMode(newTheme);
    storePreference("theme", newTheme);
  };

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      if (!isCancelled) {
        // @ts-ignore
        setHasWeb3(typeof window.ethereum !== "undefined");
      }
    }

    updateUserInfo();
    const id = setInterval(updateUserInfo, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  return (
    <Router>
      <UseWalletProvider
        chainId={1}
        connectors={{
          walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
          walletlink: {
            url: "https://mainnet.eth.aragon.network/",
            appName: "Coinbase Wallet",
            appLogoUrl: "",
          },
        }}
      >
        <>
          <Navbar></Navbar>
          <Container>
            <>
              <HomePage
                hasWeb3={hasWeb3}
                user={user}
                setUser={setUser}
              ></HomePage>
              {hasWeb3 ? (
                <Switch>
                  <Route path="/dao/:override">
                    <Wallet user={user} />
                  </Route>

                  <Route path="/dao/">
                    <Wallet user={user} />
                  </Route>
                  <Route path="/epoch/">
                    <EpochDetail user={user} />
                  </Route>
                  <Route path="/coupons/:override">
                    <CouponMarket user={user} />
                  </Route>
                  <Route path="/coupons/">
                    <CouponMarket user={user} />
                  </Route>
                  <Route path="/governance/candidate/:candidate">
                    <Candidate user={user} />
                  </Route>
                  <Route path="/governance/">
                    <Governance user={user} />
                  </Route>
                  <Route path="/trade/">
                    <Trade user={user} />
                  </Route>
                  <Route path="/regulation/">
                    <Regulation user={user} />
                  </Route>
                  <Route path="/pool/:override">
                    <Pool user={user} />
                  </Route>
                  <Route path="/pool/">
                    <Pool user={user} />
                  </Route>
                </Switch>
              ) : (
                <Switch>
                  <Route path="/">
                    <HomePageNoWeb3 />
                  </Route>
                </Switch>
              )}
            </>
          </Container>
        </>
        <Footer />
      </UseWalletProvider>
    </Router>
  );
}

export default App;
