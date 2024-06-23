import CountUp from "react-countup";
import "./Balance.css"
import {useData} from "@/components/Context.jsx";

export default function Balance() {
    const { balance, lastBalance } = useData()

    return (
        <div className="flex gap-2 items-center">
            <img src={"./coin32.png"} alt="coin"/>
            <CountUp duration={0.2} start={lastBalance} className="counter" end={balance}/>
        </div>
    );
}
