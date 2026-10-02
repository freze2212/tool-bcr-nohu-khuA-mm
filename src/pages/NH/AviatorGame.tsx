import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { getAssetUrl } from "../../utils/assetUrl";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import "./AviatorGame.css";
import "./SoccerStriker.css"; // Reuse VIP modal styling

const AviatorGame: React.FC = () => {
  const navigate = useNavigate();

  // User coins
  const [userCoins, setUserCoins] = useState<number>(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user_info") || "{}");
      return typeof u.coins === "number" ? u.coins : 999999;
    } catch {
      return 999999;
    }
  });

  const isVipUnlocked = userCoins >= 100000;

  // Aviator State
  const [isFlying, setIsFlying] = useState<boolean>(false);
  const [hasAnalyzed, setHasAnalyzed] = useState<boolean>(false);
  const [winPercent, setWinPercent] = useState<number>(88);

  // Multiplier predictions
  const [currentMultiplier, setCurrentMultiplier] = useState<number>(0);
  const [entrySignal, setEntrySignal] = useState<string>("0.00x - 0.00x");
  const [safeCashout, setSafeCashout] = useState<string>("< 0.00x");
  const [highFreq, setHighFreq] = useState<string>("0.00x - 0.00x");
  const [isVipModeActive, setIsVipModeActive] = useState<boolean>(false);

  // Plane animation position (percentages)
  const [planePos, setPlanePos] = useState<{ x: number; y: number }>({ x: 12, y: 82 });

  // VIP Modal state
  const [isVipModalOpen, setIsVipModalOpen] = useState<boolean>(false);

  const flightIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Listen to token updates
  useEffect(() => {
    const handleTokenUpdated = (e: any) => {
      if (typeof e?.detail?.coins === "number") {
        setUserCoins(e.detail.coins);
      } else {
        try {
          const u = JSON.parse(localStorage.getItem("user_info") || "{}");
          if (typeof u.coins === "number") {
            setUserCoins(u.coins);
          }
        } catch {}
      }
    };
    window.addEventListener("token-updated", handleTokenUpdated);
    window.addEventListener("storage", handleTokenUpdated);
    return () => {
      window.removeEventListener("token-updated", handleTokenUpdated);
      window.removeEventListener("storage", handleTokenUpdated);
      if (flightIntervalRef.current) clearInterval(flightIntervalRef.current);
    };
  }, []);

  // Deduct 5 coins
  const deductCoins = async (amount: number = 5, action: string = "AVIATOR_HACK"): Promise<boolean> => {
    try {
      const token = Cookies.get("access_token");
      const res = await axios.post(
        `${process.env.REACT_APP_URL_API}/users/subtract-coins-for-action`,
        { amount, action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const newCoins = res.data?.coins ?? Math.max(0, userCoins - amount);
      setUserCoins(newCoins);
      const raw = localStorage.getItem("user_info");
      if (raw) {
        try {
          const u = JSON.parse(raw);
          u.coins = newCoins;
          localStorage.setItem("user_info", JSON.stringify(u));
        } catch {}
      }
      window.dispatchEvent(new CustomEvent("token-updated", { detail: { coins: newCoins } }));
      return true;
    } catch {
      // Offline fallback
      const newCoins = Math.max(0, userCoins - amount);
      setUserCoins(newCoins);
      const raw = localStorage.getItem("user_info");
      if (raw) {
        try {
          const u = JSON.parse(raw);
          u.coins = newCoins;
          localStorage.setItem("user_info", JSON.stringify(u));
        } catch {}
      }
      window.dispatchEvent(new CustomEvent("token-updated", { detail: { coins: newCoins } }));
      return true;
    }
  };

  // Trigger Aviator Hack Analysis
  const handleStartHack = async () => {
    if (isFlying) return;

    if (userCoins < 5) {
      await Swal.fire({
        icon: "warning",
        title: "Không đủ Token",
        text: "Bạn cần ít nhất 5 Token để phân tích điểm bay Aviator.",
        confirmButtonColor: "#ff0033",
        background: "rgba(25, 2, 6, 0.98)",
        color: "#ffffff",
      });
      return;
    }

    // Deduct 5 Token
    await deductCoins(5, "AVIATOR_HACK");

    // Start flight animation
    setIsFlying(true);
    setCurrentMultiplier(1.0);

    // Target Multiplier based on VIP mode
    const target = isVipModeActive
      ? +(12.0 + Math.random() * 36.85).toFixed(2)
      : +(1.85 + Math.random() * 3.4).toFixed(2);

    const startTime = Date.now();
    const duration = 1800; // 1.8s

    if (flightIntervalRef.current) clearInterval(flightIntervalRef.current);

    flightIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Interpolate multiplier exponentially
      const current = +(1.0 + (target - 1.0) * Math.pow(progress, 1.2)).toFixed(2);
      setCurrentMultiplier(current);

      // Trajectory curve coordinates (gliding to peak x: 53%, y: 22%)
      const curX = 12 + progress * 41;
      const curY = 82 - Math.pow(progress, 0.75) * 60;
      setPlanePos({ x: curX, y: curY });

      if (progress >= 1) {
        if (flightIntervalRef.current) clearInterval(flightIntervalRef.current);
        setIsFlying(false);
        setHasAnalyzed(true);
        setCurrentMultiplier(target);

        // Update strategy metric values
        const minEntry = +(target * 0.75).toFixed(2);
        const maxEntry = +(target * 1.85).toFixed(2);
        const safe = +(target * 0.9).toFixed(2);
        const minFreq = +(target * 0.6).toFixed(2);
        const maxFreq = +(target * 1.25).toFixed(2);

        setEntrySignal(`${minEntry}x - ${maxEntry}x`);
        setSafeCashout(`< ${safe}x`);
        setHighFreq(`${minFreq}x - ${maxFreq}x`);
        setWinPercent(isVipModeActive ? 96 + Math.floor(Math.random() * 4) : 88 + Math.floor(Math.random() * 9));
      }
    }, 40);
  };

  const handleVipButtonClick = () => {
    if (isVipUnlocked) {
      const nextState = !isVipModeActive;
      setIsVipModeActive(nextState);
      if (nextState) {
        setCurrentMultiplier(15.85);
        setEntrySignal("12.50x - 45.00x");
        setSafeCashout("< 14.80x");
        setHighFreq("10.00x - 28.00x");
        setWinPercent(98);
        setHasAnalyzed(true);
      } else {
        setCurrentMultiplier(2.85);
        setEntrySignal("2.32x - 7.14x");
        setSafeCashout("< 6.33x");
        setHighFreq("1.95x - 3.80x");
        setWinPercent(88);
      }
    } else {
      setIsVipModalOpen(true);
    }
  };

  const handleBack = () => {
    navigate("/NH");
  };

  return (
    <div className="aviator-page">
      <div className="aviator-container">
        {/* Top Back Button */}
        <div className="aviator-top-bar">
          <BackButton onClick={handleBack} className="nh-hero-banner__back" />
        </div>

        {/* Main Aviator Card (Frame 2147224266: 634px x 846px) */}
        <div
          className="aviator-card"
          style={{
            backgroundImage: `url(${getAssetUrl("/assets/nohu/table/table_card_bg.png")})`,
          }}
        >
          {/* 1. Top Tỷ Lệ Pill (Frame 2147224271) */}
          <div className="aviator-pill">
            <span className="aviator-pill-text">
              &gt; Tỷ lệ: <span>{winPercent}%</span> &lt;
            </span>
          </div>

          {/* 2. Mech Robot & Radar Section (Frame 2147224574: 387px x 184px) */}
          <div className="aviator-mech-row">
            <div className="aviator-mech-robot-wrap">
              <img
                src={getAssetUrl("/assets/soccer/soccer_robot_mech.png")}
                alt="Mech Robot"
                className="aviator-mech-robot-img"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = getAssetUrl("/assets/nohu/table/robot_avatar.png");
                }}
              />
            </div>

            <div className="aviator-radar-wrap">
              <img
                src={getAssetUrl("/assets/nohu/table/radar_loading.png")}
                alt="Radar Loading"
                className="aviator-radar-img"
              />
              <div className="aviator-radar-center">
                <span className="aviator-radar-percent">{winPercent}%</span>
              </div>
            </div>
          </div>

          {/* 3. Game Title */}
          <div className="aviator-game-title">PHI CÔNG SIÊU CẤP</div>

          {/* 4. Airplane Curve Chart Box (Group 13: 378.5px x 196.8px) */}
          <div className={`aviator-chart-box ${isVipModeActive ? "aviator-chart-box--vip" : ""}`}>
            {/* Grid background */}
            <div className="aviator-chart-grid" />

            {/* Flight Trajectory SVG Curve */}
            <svg className="aviator-svg-curve" viewBox="0 0 380 197" fill="none">
              <defs>
                <linearGradient id="aviatorGrad" x1="0" y1="0" x2="0" y2="197" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ff0033" stopOpacity="0.38" />
                  <stop offset="60%" stopColor="#800008" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#200003" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path
                d="M 0 160 Q 25 140 45 155 T 90 148 T 130 155 T 160 145 Q 185 85 200 45 Q 215 85 240 145 T 280 152 T 320 142 T 355 155 T 380 140 L 380 197 L 0 197 Z"
                fill="url(#aviatorGrad)"
              />
              <path
                d="M 0 160 Q 25 140 45 155 T 90 148 T 130 155 T 160 145 Q 185 85 200 45 Q 215 85 240 145 T 280 152 T 320 142 T 355 155 T 380 140"
                stroke="#FF5500"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="drop-shadow(0 0 8px rgba(255, 85, 0, 0.95))"
              />
            </svg>

            {/* Watermark Logo */}
            <div className="aviator-watermark">
              <div className="aviator-watermark-plane">✈</div>
              <div className="aviator-watermark-text">Aviator</div>
            </div>

            {/* VIP Badge */}
            {isVipModeActive && (
              <div className="aviator-vip-badge">👑 VIP 2.0 ACTIVE</div>
            )}

            {/* Flying Airplane */}
            <div
              className="aviator-plane-wrap"
              style={{
                left: `${planePos.x}%`,
                top: `${planePos.y}%`,
              }}
            >
              <img
                src={getAssetUrl("/assets/aviator/aviator_plane.png")}
                alt="Aviator Plane"
                className="aviator-plane-img"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = getAssetUrl("/assets/nohu/game_phi_cong.png");
                }}
              />
            </div>

            {/* Center Multiplier Value */}
            <div className="aviator-multiplier-center">
              <div className={`aviator-multiplier-val ${isFlying ? "flying" : ""}`}>
                {currentMultiplier.toFixed(2)}x
              </div>
              <div className={`aviator-multiplier-status ${isVipModeActive ? "vip-active" : ""}`}>
                {isFlying
                  ? "ĐANG TÍNH QUỸ ĐẠO BAY..."
                  : isVipModeActive
                  ? "👑 VIP 2.0: ĐIỂM NỔ CẤP SỐ NHÂN CAO"
                  : hasAnalyzed
                  ? "ĐIỂM NỔ DỰ ĐOÁN AN TOÀN"
                  : "CHƯA PHÂN TÍCH"}
              </div>
            </div>
          </div>

          {/* 5. 4 Strategy / Multiplier Metric Boxes (Frame 2147224223: 378.5px x 113.4px) */}
          <div className="aviator-metrics-grid">
            {/* Box 1: Tín hiệu vào cầu */}
            <div className={`aviator-metric-box ${isVipModeActive ? "vip-active" : ""}`}>
              <div className="aviator-metric-title">TÍN HIỆU VÀO CẦU</div>
              <div className="aviator-metric-val">{entrySignal}</div>
            </div>

            {/* Box 2: Điểm dừng an toàn */}
            <div className={`aviator-metric-box ${isVipModeActive ? "vip-active" : ""}`}>
              <div className="aviator-metric-title">ĐIỂM DỪNG AN TOÀN</div>
              <div className="aviator-metric-val">{safeCashout}</div>
            </div>

            {/* Box 3: Tần suất cao */}
            <div className={`aviator-metric-box ${isVipModeActive ? "vip-active" : ""}`}>
              <div className="aviator-metric-title">TẦN SUẤT CAO</div>
              <div className="aviator-metric-val">{highFreq}</div>
            </div>

            {/* Box 4: Server VIP 2.0 */}
            <div
              className={`aviator-metric-box aviator-metric-box--vip ${isVipModeActive ? "vip-active" : ""}`}
              role="button"
              tabIndex={0}
              onClick={handleVipButtonClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleVipButtonClick();
              }}
            >
              <div className="aviator-metric-title">👑 SERVER VIP 2.0</div>
              <div className="aviator-metric-vip-btn">
                {isVipUnlocked
                  ? isVipModeActive
                    ? "⚡ ĐANG CHẠY VIP 2.0"
                    : "> KÍCH HOẠT NGAY <"
                  : "> KÍCH HOẠT NGAY <"}
              </div>
            </div>
          </div>

          {/* 6. Hack Button (Frame 2147224270: 427.8px x 100px) */}
          <div className="aviator-hack-btn-wrap">
            <button
              type="button"
              className="soccer-hack-btn"
              style={{
                backgroundImage: `url(${getAssetUrl("/assets/nohu/table/hack_button_bg.png")})`,
              }}
              disabled={isFlying}
              onClick={handleStartHack}
            >
              {isFlying ? "ĐANG TÍNH ĐIỂM BAY..." : ">Hack (5Token)<"}
            </button>
          </div>
        </div>
      </div>

      {/* 7. VIP Modal (Frame 2147224272: 615.7px x 320px) */}
      {isVipModalOpen && (
        <div
          className="soccer-vip-modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsVipModalOpen(false);
          }}
        >
          <div className="soccer-vip-modal" role="dialog" aria-modal="true">
            <div className="soccer-vip-modal-top-bar">
              <span className="soccer-vip-modal-dot" />
            </div>
            <div className="soccer-vip-modal-title">TÍNH NĂNG VIP</div>
            <div className="soccer-vip-modal-desc">
              GIẢI ĐẤU NÀY CHỈ DÀNH CHO THÀNH VIÊN VIP.
              <br />
              VUI LÒNG NẠP TÍCH LŨY
              <br />
              ĐỂ MỞ KHÓA TOÀN BỘ TÍNH NĂNG.
            </div>
            <button
              type="button"
              className="soccer-vip-modal-btn"
              onClick={() => setIsVipModalOpen(false)}
            >
              ĐÃ HIỂU
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AviatorGame;
