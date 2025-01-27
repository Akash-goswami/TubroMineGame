import { useBackground } from "../../context/backgroundClassProvider";
import BetInfo from "./BetInfo";
import FreeBets from "./FreeBets";
import LimitMain from "./LimitMain";
import Manu from "./Manu";
import MyBets from "./MyBets";
import Rules from "./Rules";

export default function ParentComponent() {
  const { activeComponent } = useBackground();

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {activeComponent === "menu" && <Manu />}
      {activeComponent === "limit" && <LimitMain />}
      {activeComponent === "rules" && <Rules />}
      {activeComponent === "mybets" && <MyBets />}
      {activeComponent === "freebets" && <FreeBets />}
      {activeComponent === "betInfo" && <BetInfo />}
      {/* Other components */}
    </div>
  );
}
