import "./Stats.css";
import { Divider } from "@nextui-org/react";
import { useData } from "@/components/Context.jsx";
import { useEffect } from "react";

/**
 * @returns {JSX.Element}
 */
export function Stats() {
  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const {
    statsTotal,
    statsTouch,
    statsTotalPlayer,
    statsDailyPlayer,
    statsOnline,
    setStatsTotal,
    setStatsTouch,
    setStatsTotalPlayer,
    setStatsDailyPlayer,
    setStatsOnline,
  } = useData();

  const totalPlayers = 445624 + Math.trunc(Date.now() / 1503680);
  const onlinePlayers = randomNumberInRange(66000, 75000);
  const dailyPlayers = Math.trunc(totalPlayers / 6.1414325);

  const totalTouchPlayers = Math.trunc(totalPlayers * 6069.7685945);
  const totalSharePlayers = Math.trunc((totalTouchPlayers * 75896524) / 25987589);

  useEffect(() => {
    setStatsTotal(totalSharePlayers);
    setStatsTouch(totalTouchPlayers);
    setStatsTotalPlayer(totalPlayers);
    setStatsDailyPlayer(dailyPlayers);
    setStatsOnline(onlinePlayers);
  }, []);

  return (
    <div className="games text-pink-100">
      <div className="my-2 flex flex-col gap-1 justify-center items-center">
        <span className="text-sm text-gray-200">Total Share Balance</span>
        <div className="flex flex-row items-center gap-3 mt-2">
          <img src={"./coin32.png"} alt="coin" />
          <h1 className="text-white text-2xl">
            {Number(statsTotal).toLocaleString()}
          </h1>
        </div>
      </div>
      <div className="items mx-3 w-full dividers">
        <Divider style={{ background: "lightgray" }} />
      </div>
      <div className="items others flex flex-col">
        <div className="my-4 flex flex-col gap-1 justify-center items-center">
          <span className="text-sm text-gray-200">Total Touches</span>
          <div className="flex flex-row items-center gap-3">
            <h1 className="text-white text-2xl">
              {Number(statsTouch).toLocaleString()}
            </h1>
          </div>
        </div>
        <div className="my-4 flex flex-col gap-1 justify-center items-center">
          <span className="text-sm text-gray-200">Total Players</span>
          <div className="flex flex-row items-center gap-3">
            <h1 className="text-white text-2xl">
              {Number(statsTotalPlayer).toLocaleString()}
            </h1>
          </div>
        </div>
        <div className="my-4 flex flex-col gap-1 justify-center items-center">
          <span className="text-sm text-gray-200">Daily Players</span>
          <div className="flex flex-row items-center gap-3">
            <h1 className="text-white text-2xl">
              {Number(statsDailyPlayer).toLocaleString()}
            </h1>
          </div>
        </div>
        <div className="my-4 flex flex-col gap-1 justify-center items-center">
          <span className="text-sm text-gray-200">Players Online</span>
          <div className="flex flex-row items-center gap-3">
            <h1 className="text-white text-2xl">
              {Number(statsOnline).toLocaleString()}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
