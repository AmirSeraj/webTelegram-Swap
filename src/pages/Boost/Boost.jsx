import "./Boost.css";
// import { TONConnect } from "@/components/Ton/TONConnect";
import SpecialBoost from "@/components/SpecialBoost/SpecialBoost.jsx";
import Boosts from "@/components/Boosts/Boosts.jsx";
import Balance from "@/components/Balance/Balance";

/**
 * @returns {JSX.Element}
 */
export function Boost() {
  return (
    <div className="game text-pink-100">
      <Balance />
      {/* <div className="itemme wallette">
        <TONConnect />
      </div> */}
      <div className="itemme special mt-2">
        <SpecialBoost />
      </div>
      <div className="itemme boost">
        <Boosts />
      </div>
    </div>
  );
}
