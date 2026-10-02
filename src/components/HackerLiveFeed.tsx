import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "./HackerLiveFeed.css";

type FeedSide = "left" | "right";

type LiveHackLine = {
  user: string;
  action: string;
  table: string;
  tablePath: string;
};

const LIVE_HACK_LINES: LiveHackLine[] = [
  { user: "Xiaofeng", action: "vừa hack thành công", table: "BACCRAT C01...", tablePath: "/casino/room/C01" },
  { user: "forg", action: "Đang truy cập", table: "BACCRAT C02...", tablePath: "/casino/room/C02" },
  { user: "onestar", action: "phân tích thành công", table: "BACCRAT C02...", tablePath: "/casino/room/C02" },
  { user: "user001", action: "Đã kết nối thành công", table: "BACCRAT C02...", tablePath: "/casino/room/C02" },
  { user: "Xiaofeng", action: "vừa hack thành công", table: "BACCRAT C01...", tablePath: "/casino/room/C01" },
  { user: "onestar", action: "phân tích thành công", table: "BACCRAT C02...", tablePath: "/casino/room/C02" },
  { user: "hacker99", action: "vừa kích hoạt Super VIP", table: "SLOT PG01...", tablePath: "/NH/slot/PG" },
  { user: "GoldenBoss", action: "khóa tọa độ bắn cá", table: "FISHING F03...", tablePath: "/fishing" },
];

type TerminalItem = {
  time: string;
  prefix: string;
  table: string;
  tablePath: string;
  suffix: string;
  colorType: "green" | "red" | "yellow";
};

const TERMINAL_ITEMS: TerminalItem[] = [
  {
    time: "22:12:11",
    prefix: "TÍN HIỆU ỔN ĐỊNH: Bàn",
    table: "BÀN BACCARAT C03",
    tablePath: "/casino/room/C03",
    suffix: "có tỷ lệ thắng ổn định.",
    colorType: "green",
  },
  {
    time: "22:12:11",
    prefix: "PHÁT HIỆN CHUỖI: bàn",
    table: "BÀN BACCARAT C02",
    tablePath: "/casino/room/C02",
    suffix: "đang có chuỗi BANKER",
    colorType: "red",
  },
  {
    time: "22:12:11",
    prefix: "PHÁT HIỆN CHUỖI: bàn",
    table: "BÀN BACCARAT C01",
    tablePath: "/casino/room/C01",
    suffix: "đang có chuỗi PLAYER",
    colorType: "yellow",
  },
  {
    time: "22:12:11",
    prefix: "TÍN HIỆU ỔN ĐỊNH: Bàn",
    table: "BÀN BACCARAT C13",
    tablePath: "/casino/room/C13",
    suffix: "có tỷ lệ thắng ổn định.",
    colorType: "green",
  },
  {
    time: "22:12:11",
    prefix: "PHÁT HIỆN CHUỖI: bàn",
    table: "BÀN BACCARAT C05",
    tablePath: "/casino/room/C05",
    suffix: "đang có chuỗi BANKER",
    colorType: "red",
  },
  {
    time: "22:12:11",
    prefix: "TÍN HIỆU ỔN ĐỊNH: Bàn",
    table: "BÀN BACCARAT C04",
    tablePath: "/casino/room/C04",
    suffix: "có tỷ lệ thắng ổn định.",
    colorType: "green",
  },
];

function LiveHackBlock() {
  return (
    <div className="hacker-feed__block" aria-hidden>
      {LIVE_HACK_LINES.map((line, i) => (
        <div className="hacker-feed__line hacker-feed__line--live" key={`live-${i}`}>
          <span className="hacker-feed__arrow">&gt;&gt;</span>{" "}
          <span className="hacker-feed__gold-user">{line.user}</span>{" "}
          <span className="hacker-feed__white-text">{line.action}</span>{" "}
          <Link className="hacker-feed__gold-link" to={line.tablePath}>
            {line.table}
          </Link>
        </div>
      ))}
    </div>
  );
}

function TerminalBlock() {
  return (
    <div className="hacker-feed__block" aria-hidden>
      {TERMINAL_ITEMS.map((item, i) => (
        <div
          className={`hacker-feed__line hacker-feed__line--term hacker-feed__line--${item.colorType}`}
          key={`term-${i}`}
        >
          <span className="hacker-feed__time">[{item.time}]</span>{" "}
          <span className="hacker-feed__term-msg">
            {item.prefix}{" "}
            <Link className="hacker-feed__term-link" to={item.tablePath}>
              {item.table}
            </Link>{" "}
            {item.suffix}
          </span>
        </div>
      ))}
    </div>
  );
}

type HackerLiveFeedProps = {
  side: FeedSide;
  variant?: "live" | "terminal";
};

const HackerLiveFeed: React.FC<HackerLiveFeedProps> = ({ side, variant }) => {
  const isTerminal = variant ? variant === "terminal" : side === "left";
  const title = isTerminal ? "TERMINAL" : "LIVE HACK ONLINE";
  const durationSec = isTerminal ? 24 : 20;

  const content = useMemo(
    () =>
      isTerminal ? (
        <>
          <TerminalBlock />
          <TerminalBlock />
        </>
      ) : (
        <>
          <LiveHackBlock />
          <LiveHackBlock />
        </>
      ),
    [isTerminal]
  );

  return (
    <aside
      className={`hacker-feed hacker-feed--${side} hacker-feed--${isTerminal ? "terminal-box" : "live-box"}`}
      aria-label={title}
    >
      <div className="hacker-feed__panel">
        {/* Cyber Corner Bracket Decors */}
        <span className="hacker-feed__corner hacker-feed__corner--tl" aria-hidden />
        <span className="hacker-feed__corner hacker-feed__corner--tr" aria-hidden />

        <div className="hacker-feed__header">
          <span className="hacker-feed__title">{title}</span>
          <span className="hacker-feed__status-dot" aria-hidden />
        </div>
        <div className="hacker-feed__viewport">
          <div
            className="hacker-feed__marquee"
            style={{ animationDuration: `${durationSec}s` }}
          >
            {content}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default HackerLiveFeed;
