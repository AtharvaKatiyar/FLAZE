import { HeroGeometric } from "./components/ui/shadcn-io/ShapeLandingHero";
import { Routes, Route } from "react-router";
import {ThirdwebProvider} from 'thirdweb/react' 
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { sepolia } from "thirdweb/chains";
import { client } from "./client/thirdwebClient";
function App() {
  return (
    <>
      <ThirdwebProvider client={client} activeChain = {sepolia}>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/dashboard/*" element={<Dashboard/>}></Route>
        </Routes>  
      </ThirdwebProvider>
    </>
  );
}

export default App;