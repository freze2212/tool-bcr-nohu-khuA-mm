import { useEffect, useState } from "react";
import { getUserProfile } from "../utilities/axios.utilities";
import "./MmTopBar.css";

type MmTopBarProps = {
  onLogoutClick: () => void;
};

function formatToken(n: number | undefined): string {
  if (n == null || Number.isNaN(n)) return "0";
  return n.toLocaleString("en-US");
}

export default function MmTopBar({ onLogoutClick }: MmTopBarProps) {
  const [name, setName] = useState("—");
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user_info") || "{}");
      if (u.userName) setName(String(u.userName));
      if (typeof u.coins === "number") setCoins(u.coins);
    } catch {
      /* ignore */
    }

    getUserProfile()
      .then((data) => {
        if (data?.username) setName(data.username);
        if (typeof data?.coins === "number") setCoins(data.coins);
      })
      .catch(() => {});

    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (typeof detail?.coins === "number") setCoins(detail.coins);
    };
    window.addEventListener("token-updated", onUpdate);
    return () => window.removeEventListener("token-updated", onUpdate);
  }, []);

  return (
    <header className="mm-top">
      <div className="mm-top__brand">
        <div className="mm-top__name">
          <strong>PRO TIP MM88</strong>
          <span>PRO EDITION</span>
        </div>
        <p>
          SYS.ID: HK-9821-VN <i>{"//"}</i> AI CORE V3.8 - ANALYTICS TERMINAL <i>{"//"}</i>
          <b> MAINFRAME SYNCHRONIZED</b>
        </p>
      </div>
      <div className="mm-top__user">
        <span className="mm-top__hello">Xin chào, {name}</span>
        <span className="mm-top__token">{formatToken(coins)} TOKEN</span>
        <button type="button" className="mm-top__logout" onClick={onLogoutClick}>
          ĐĂNG XUẤT
        </button>
      </div>
    </header>
  );
}
