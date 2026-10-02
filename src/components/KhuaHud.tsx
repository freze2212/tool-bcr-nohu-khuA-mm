import { useEffect, useState } from "react";
import { getAssetUrl } from "../utils/assetUrl";
import "./KhuaHud.css";

const asset = (path: string) => getAssetUrl(path);

const FEED: Array<[string, string, string]> = [
  ["Xiaofeng", "vừa hack thành công", "BACCRAT C01..."],
  ["forg", "Đang truy cập", "BACCRAT C02..."],
  ["onestar", "phân tích thành công", "BACCRAT C02..."],
  ["user001", "Đã kết nối thành công", "BACCRAT C02..."],
  ["Xiaofeng", "vừa hack thành công", "BACCRAT C01..."],
  ["onestar", "phân tích thành công", "BACCRAT C02..."],
  ["Xiaofeng", "vừa hack thành công", "BACCRAT C01..."],
  ["forg", "Đang truy cập", "BACCRAT C02..."],
  ["onestar", "phân tích thành công", "BACCRAT C02..."],
  ["user001", "Đã kết nối thành công", "BACCRAT C02..."],
  ["Xiaofeng", "vừa hack thành công", "BACCRAT C01..."],
  ["onestar", "phân tích thành công", "BACCRAT C02..."],
  ["Xiaofeng", "vừa hack thành công", "BACCRAT C01..."],
  ["forg", "Đang truy cập", "BACCRAT C02..."],
  ["onestar", "phân tích thành công", "BACCRAT C02..."],
  ["user001", "Đã kết nối thành công", "BACCRAT C02..."],
  ["Xiaofeng", "vừa hack thành công", "BACCRAT C01..."],
  ["onestar", "phân tích thành công", "BACCRAT C02..."],
];

const CORE_BASE = [
  { id: "C0", pct: 54, color: "#ffc700" },
  { id: "C1", pct: 68, color: "#ffc700" },
  { id: "C2", pct: 32, color: "#98ffce" },
  { id: "C3", pct: 82, color: "#ffc700", glow: true },
  { id: "C4", pct: 24, color: "#98ffce" },
  { id: "C5", pct: 41, color: "#ffc700" },
  { id: "C6", pct: 38, color: "#98ffce" },
  { id: "C7", pct: 59, color: "#ffc700" },
];

const NODE_BASE = [
  { lines: ["Node HK-01 (Hong", "Kong)"], load: 42, ping: 8, tone: "ok", badge: "ACTIVE" },
  { lines: ["Node SG-02", "(Singapore)"], load: 58, ping: 14, tone: "ok", badge: "ACTIVE" },
  { lines: ["Node TY-03 (Tokyo)"], load: 31, ping: 22, tone: "warn", badge: "RELAY" },
  { lines: ["Node US-04 (San", "Jose)"], load: 15, ping: 110, tone: "idle", badge: "STANDBY" },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function drift(base: number, spread: number, min: number, max: number) {
  return Math.round(clamp(base + (Math.random() * 2 - 1) * spread, min, max));
}

type Telemetry = {
  latency: number;
  jitter: number;
  ops: number;
  cores: number[];
  ram: number;
  ghz: number;
  peak: number;
  mbps: number;
  stream: number;
  nodes: Array<{ load: number; ping: number }>;
};

function nextTelemetry(prev?: Telemetry): Telemetry {
  const cores = CORE_BASE.map((core, index) =>
    drift(prev?.cores[index] ?? core.pct, 8, 8, 96)
  );
  return {
    latency: drift(prev?.latency ?? 8, 3, 4, 24),
    jitter: Math.round((0.1 + Math.random() * 0.6) * 10) / 10,
    ops: drift(prev?.ops ?? 184, 12, 120, 260),
    cores,
    ram: Math.round(clamp((prev?.ram ?? 14.8) + (Math.random() * 0.6 - 0.3), 11.2, 15.8) * 10) / 10,
    ghz: Math.round((3.4 + Math.random() * 0.9) * 100) / 100,
    peak: Math.round((8 + Math.random() * 8) * 10) / 10,
    mbps: Math.round((90 + Math.random() * 80) * 10) / 10,
    stream: Math.round((0.02 + Math.random() * 0.08) * 100) / 100,
    nodes: NODE_BASE.map((node, index) => ({
      load: drift(prev?.nodes[index]?.load ?? node.load, 6, 4, 92),
      ping: drift(prev?.nodes[index]?.ping ?? node.ping, 4, 4, 180),
    })),
  };
}

function CornerMarks() {
  return (
    <>
      <i className="khua-mark khua-mark--tl-h" />
      <i className="khua-mark khua-mark--tl-v" />
      <i className="khua-mark khua-mark--tr-h" />
      <i className="khua-mark khua-mark--tr-v" />
      <i className="khua-mark khua-mark--bl-h" />
      <i className="khua-mark khua-mark--bl-v" />
      <i className="khua-mark khua-mark--br-h" />
      <i className="khua-mark khua-mark--br-v" />
    </>
  );
}

export function KhuaFeedPanel() {
  const [tick, setTick] = useState(0);
  const [stream, setStream] = useState(0.04);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTick((value) => value + 1);
      setStream(Math.round((0.02 + Math.random() * 0.08) * 100) / 100);
    }, 1400);
    return () => window.clearInterval(timer);
  }, []);

  const lines = Array.from({ length: FEED.length }, (_, index) => FEED[(index + tick) % FEED.length]);

  return (
    <aside className="khua-hud__panel khua-hud__feed">
      <CornerMarks />
      <header className="khua-feed__head">
        <div className="khua-feed__title-row">
          <i className="khua-feed__tick" />
          <h2>
            BẢNG DỮ LIỆU THẮNG THUA
            <br />
            NGƯỜI CHƠI
          </h2>
          <span className="khua-feed__chip">
            NODE //
            <br />
            LIVE-MATRX-01
          </span>
        </div>
        <div className="khua-feed__sub">
          <p>{"// TOÀN BỘ SẢNH CƯỢC: SLOTS • LIVE CASINO • BẮN CÁ • TÀI XỈU • POKER"}</p>
          <span>
            <i />
            AUTO-STREAMING // {stream.toFixed(2)}s
          </span>
        </div>
      </header>
      <div className="khua-feed__list">
        {lines.map((line, index) => (
          <p key={`${line[0]}-${index}`}>
            <b>&gt;&gt; {line[0]}</b> {line[1]} <b>{line[2]}</b>
          </p>
        ))}
      </div>
    </aside>
  );
}

export function KhuaMonitorPanel() {
  const [live, setLive] = useState<Telemetry>(() => nextTelemetry());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLive((prev) => nextTelemetry(prev));
    }, 1100);
    return () => window.clearInterval(timer);
  }, []);

  const avg = Math.round((live.cores.reduce((sum, value) => sum + value, 0) / live.cores.length) * 10) / 10;
  const ramPct = Math.round((live.ram / 16) * 1000) / 10;

  return (
    <aside className="khua-hud__panel khua-hud__monitor">
      <CornerMarks />
      <header className="khua-mon__head">
        <div className="khua-mon__title-row">
          <div className="khua-mon__title">
            <i />
            <h2>
              TRUNG TÂM GIÁM SÁT TRẠNG
              <br />
              THÁI HỆ THỐNG
            </h2>
          </div>
          <span className="khua-mon__ok">
            <i />
            <em>
              ALL SYSTEMS
              <br />
              NOMINAL
            </em>
          </span>
        </div>
        <div className="khua-mon__sub">
          <p>
            {"// SYSTEM TELEMETRY & MULTI-CLUSTER"}
            <br />
            KERNEL MM88
          </p>
          <p>
            LATENCY: {live.latency}ms //
            <br />
            JITTER: {live.jitter.toFixed(1)}ms
          </p>
        </div>
      </header>

      <div className="khua-mon__stats">
        <article className="is-fixed">
          <div className="khua-mon__stat-top">
            <small>
              SERVER
              <br />
              STATUS
            </small>
            <i className="khua-mon__dot" />
          </div>
          <strong>ONLINE</strong>
          <em>
            Uptime:
            <br />
            99.99%
          </em>
          <b className="khua-mon__track">
            <s style={{ width: "100%", background: "#98ffce" }} />
          </b>
        </article>
        <article className="is-fixed">
          <div className="khua-mon__stat-top">
            <small>API LATENCY</small>
            <img src={asset("/assets/khua/icon-latency.svg")} width={9.333} height={11.667} alt="" />
          </div>
          <strong className="is-gold">{live.latency}ms</strong>
          <em className="is-green">Đã đồng bộ</em>
          <b className="khua-mon__track">
            <s style={{ width: `${clamp(100 - live.latency * 2, 40, 96)}%`, background: "#ffc700" }} />
          </b>
        </article>
        <article>
          <div className="khua-mon__stat-top">
            <small>AI ENGINE</small>
            <img src={asset("/assets/khua/icon-ai.svg")} width={10.5} height={10.5} alt="" />
          </div>
          <strong className="is-amber">
            LV.5
            <br />
            ACTIVE
          </strong>
          <em>{(live.ops / 10).toFixed(1)}k ops/s</em>
          <b className="khua-mon__track">
            <s style={{ width: `${clamp(live.ops / 2.6, 45, 96)}%`, background: "#f5bf00" }} />
          </b>
        </article>
        <article>
          <div className="khua-mon__stat-top">
            <small>
              FIREWALL
              <br />
              SHIELD
            </small>
            <img src={asset("/assets/khua/icon-firewall.svg")} width={9.333} height={11.667} alt="" />
          </div>
          <strong>SECURE</strong>
          <em>
            Anti-DDoS //
            <br />
            Tor
          </em>
          <b className="khua-mon__track">
            <s style={{ width: "98%", background: "#98ffce" }} />
          </b>
        </article>
      </div>

      <div className="khua-mon__cpu">
        <div className="khua-mon__cores">
          <div className="khua-mon__cores-head">
            <span>
              {"// TẢI ĐA LÕI CPU (OCTA-"}
              <br />
              CORE)
            </span>
            <em>
              AVG:
              <br />
              {avg.toFixed(1)}%
            </em>
          </div>
          <div className="khua-mon__core-grid">
            {CORE_BASE.map((core, index) => {
              const pct = live.cores[index];
              const hot = pct >= 70;
              const color = hot ? "#ffc700" : core.color;
              return (
                <div key={core.id}>
                  <span>{core.id}:</span>
                  <i>
                    <b
                      style={{
                        width: `${pct}%`,
                        background: color,
                        boxShadow: hot ? "0 0 6px rgba(255,199,0,0.5)" : undefined,
                      }}
                    />
                  </i>
                  <em style={{ color: color === "#98ffce" ? "#98ffce" : "#ffe9b9" }}>{pct}%</em>
                </div>
              );
            })}
          </div>
          <div className="khua-mon__ram">
            <div>
              <span>
                BỘ NHỚ RAM ĐÃ
                <br />
                PHÂN PHỐI:
              </span>
              <em>
                {live.ram.toFixed(1)} GB / 16.0 GB
                <br />
                ({ramPct}%)
              </em>
            </div>
            <i>
              <b style={{ width: `${ramPct}%` }} />
            </i>
          </div>
        </div>
        <div className="khua-mon__rf">
          <div className="khua-mon__rf-head">
            <span>
              RF SPECTRUM
              <br />
              RADAR
            </span>
            <em>
              {live.ghz.toFixed(2)}
              <br />
              GHz
            </em>
          </div>
          <div className="khua-mon__wave">
            <img src={asset("/assets/khua/rf-wave.svg")} width={165} height={88} alt="" />
            <span>PEAK: +{live.peak.toFixed(1)}dBm</span>
          </div>
          <div className="khua-mon__rf-foot">
            <span>
              PACKET SNIFFER:
              <br />
              ACTIVE
            </span>
            <em>
              {live.mbps.toFixed(1)}
              <br />
              Mb/s
            </em>
          </div>
        </div>
      </div>

      <div className="khua-mon__nodes">
        <div className="khua-mon__nodes-head">
          <span>{"// CỤM MÁY CHỦ VỆ TINH (NODE CLUSTERS)"}</span>
          <em>4/4 SẴN SÀNG</em>
        </div>
        <div className="khua-mon__node-grid">
          {NODE_BASE.map((node, index) => (
            <article key={node.lines[0]}>
              <div>
                <i className={`is-${node.tone}`} />
                <div>
                  <strong>
                    {node.lines.map((line, lineIndex) => (
                      <span key={line}>
                        {lineIndex > 0 ? <br /> : null}
                        {line}
                      </span>
                    ))}
                  </strong>
                  <span>
                    TẢI: {live.nodes[index].load}% • ĐỘ TRỄ:
                    <br />
                    {live.nodes[index].ping}ms
                  </span>
                </div>
              </div>
              <b className={`is-${node.tone}`}>{node.badge}</b>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
