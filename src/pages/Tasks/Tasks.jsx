import "./Tasks.css";
import { TONConnect } from "@/components/Ton/TONConnect.jsx";
import TaskMenu from "@/components/TaskMenu/TaskMenu.jsx";

/**
 * @returns {JSX.Element}
 */
export function Tasks() {
  return (
    <div className="game text-pink-100">
      <div className="flex-col">
        <TONConnect />
      </div>
      <div className="content-start items-start align-top">
        <TaskMenu />
      </div>
    </div>
  );
}
