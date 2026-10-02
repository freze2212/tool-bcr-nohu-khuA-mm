import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { getAssetUrl } from "../../utils/assetUrl";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import "./SoccerStriker.css";

const SoccerStriker: React.FC = () => {
  const navigate = useNavigate();

  // User coins (synced with localStorage and token-updated events)
  const [userCoins, setUserCoins] = useState<number>(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user_info") || "{}");
      return typeof u.coins === "number" ? u.coins : 999999;
    } catch {
      return 999999;
    }
  });

  // Check VIP threshold (>= 100.000 xu unlocks all features)
  const isVipUnlocked = userCoins >= 100000;

  // Selected League: "AMATEUR" | "CLUB" | "PREMIER"
  const [selectedLeague, setSelectedLeague] = useState<string>("AMATEUR");

  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [hasAnalyzed, setHasAnalyzed] = useState<boolean>(false);
  const [shotPredictions, setShotPredictions] = useState<string[]>([
    "trái", "phải", "trái", "phải", "trái", "phải", "trái", "phải", "trái"
  ]);
  const [winPercent, setWinPercent] = useState<number>(88);

  // VIP Modal state
  const [isVipModalOpen, setIsVipModalOpen] = useState<boolean>(false);

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  // Deduct 5 coins
  const deductCoins = async (amount: number = 5, action: string = "SOCCER_HACK"): Promise<boolean> => {
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
      // Offline fallback: deduct locally
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

  // Trigger Hack Analysis
  const handleStartHack = async () => {
    if (isAnalyzing) return;

    if (userCoins < 5) {
      await Swal.fire({
        icon: "warning",
        title: "Không đủ Token",
        text: "Bạn cần ít nhất 5 Token để phân tích lượt sút.",
        confirmButtonColor: "#ff0033",
        background: "rgba(25, 2, 6, 0.98)",
        color: "#ffffff",
      });
      return;
    }

    // Deduct 5 Token
    await deductCoins(5, "SOCCER_HACK");

    // Start scanning animation
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const startTime = Date.now();
    const duration = 1600; // 1.6s

    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setAnalysisProgress(pct);

      if (pct >= 100) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setIsAnalyzing(false);
        setHasAnalyzed(true);

        // Generate random directions ("trái" / "phải") for all 9 shots
        const directions = ["trái", "phải"];
        const newShots = Array.from({ length: 9 }, () => directions[Math.floor(Math.random() * 2)]);
        setShotPredictions(newShots);

        // Dynamic win percent (86% - 96%)
        setWinPercent(86 + Math.floor(Math.random() * 11));
      }
    }, 40);
  };

  const handleLeagueClick = (league: string) => {
    if (league === "AMATEUR") {
      setSelectedLeague("AMATEUR");
    } else {
      if (isVipUnlocked) {
        setSelectedLeague(league);
      } else {
        setIsVipModalOpen(true);
      }
    }
  };

  const handleBack = () => {
    navigate("/NH");
  };

  return (
    <div className="soccer-page">
      <div className="soccer-container">
        {/* Top Back Button */}
        <div className="soccer-top-bar">
          <BackButton onClick={handleBack} className="nh-hero-banner__back" />
        </div>

        {/* Main Soccer Card (Frame 2147224409: 634px x 846px) */}
        <div
          className="soccer-card"
          style={{
            backgroundImage: `url(${getAssetUrl("/assets/nohu/table/table_card_bg.png")})`,
          }}
        >
          {/* 1. Top Tỷ Lệ Pill (Frame 2147224271) */}
          <div className="soccer-pill">
            <span className="soccer-pill-text">
              &gt; Tỷ lệ: <span>{winPercent}%</span> &lt;
            </span>
          </div>

          {/* 2. Mech Robot & Radar Section (Frame 2147224574: 387px x 184px) */}
          <div className="soccer-mech-row">
            <div className="soccer-mech-robot-wrap">
              <img
                src={getAssetUrl("/assets/soccer/soccer_robot_mech.png")}
                alt="Mech Robot"
                className="soccer-mech-robot-img"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = getAssetUrl("/assets/nohu/table/robot_avatar.png");
                }}
              />
            </div>

            <div className="soccer-radar-wrap">
              <img
                src={getAssetUrl("/assets/nohu/table/radar_loading.png")}
                alt="Radar Loading"
                className="soccer-radar-img"
              />
              <div className="soccer-radar-center">
                <span className="soccer-radar-percent">{winPercent}%</span>
              </div>
            </div>
          </div>

          {/* 3. Game Title */}
          <div className="soccer-game-title">SOCCER STRIKER</div>

          {/* 4. Game Thumbnail & 3 Leagues Row */}
          <div className="soccer-game-row">
            <div className="soccer-game-thumb-wrap">
              <img
                src={getAssetUrl("/assets/soccer/soccer_game_thumb.png")}
                alt="Soccer Striker"
                className="soccer-game-thumb"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = getAssetUrl("/assets/nohu/game_soccer_striker.png");
                }}
              />
            </div>

            <div className="soccer-leagues-col">
              {/* AMATEUR */}
              <button
                type="button"
                className={`soccer-league-btn ${
                  selectedLeague === "AMATEUR" ? "soccer-league-btn--active" : ""
                }`}
                onClick={() => handleLeagueClick("AMATEUR")}
              >
                AMATEUR
              </button>

              {/* CLUB */}
              <button
                type="button"
                className={`soccer-league-btn ${
                  selectedLeague === "CLUB"
                    ? "soccer-league-btn--active"
                    : !isVipUnlocked
                    ? "soccer-league-btn--locked"
                    : ""
                }`}
                onClick={() => handleLeagueClick("CLUB")}
              >
                CLUB {!isVipUnlocked && <span className="soccer-lock-icon">🔒</span>}
              </button>

              {/* PREMIER */}
              <button
                type="button"
                className={`soccer-league-btn ${
                  selectedLeague === "PREMIER"
                    ? "soccer-league-btn--active"
                    : !isVipUnlocked
                    ? "soccer-league-btn--locked"
                    : ""
                }`}
                onClick={() => handleLeagueClick("PREMIER")}
              >
                PREMIER {!isVipUnlocked && <span className="soccer-lock-icon">🔒</span>}
              </button>
            </div>
          </div>

          {/* 5. Prediction Card (Frame 2147224419: 368px x 187px) */}
          <div className="soccer-pred-card">
            <div className="soccer-pred-title">KẾT QUẢ DỰ ĐOÁN 9 LƯỢT SÚT</div>
            <div className="soccer-pred-divider" />

            {isAnalyzing ? (
              /* State: Scanning / Analyzing */
              <div className="soccer-pred-scanning">
                <div className="soccer-pred-scanning-text">
                  Đang phân tích giải {selectedLeague}...
                </div>
                <div className="soccer-pred-progress-bar">
                  <div
                    className="soccer-pred-progress-fill"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>
              </div>
            ) : hasAnalyzed ? (
              /* State: 9-Slot Result Grid (Frame 2147224216) */
              <div className="soccer-slots-grid">
                {/* When VIP unlocked (>= 100k coins): Show all 9 slots */}
                {isVipUnlocked ? (
                  shotPredictions.map((direction, idx) => (
                    <div key={idx} className="soccer-slot-item soccer-slot-item--unlocked">
                      <span className="soccer-slot-label">lượt {idx + 1}</span>
                      <span className="soccer-slot-value">{direction}</span>
                    </div>
                  ))
                ) : (
                  /* When not VIP: Row 1 unlocked (3 shots), Rows 2 & 3 locked (6 VIP slots) */
                  <>
                    {shotPredictions.slice(0, 3).map((direction, idx) => (
                      <div key={idx} className="soccer-slot-item soccer-slot-item--unlocked">
                        <span className="soccer-slot-label">lượt {idx + 1}</span>
                        <span className="soccer-slot-value">{direction}</span>
                      </div>
                    ))}

                    {[4, 5, 6, 7, 8, 9].map((slotNum) => (
                      <div
                        key={slotNum}
                        className="soccer-slot-item soccer-slot-item--locked"
                        role="button"
                        tabIndex={0}
                        onClick={() => setIsVipModalOpen(true)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") setIsVipModalOpen(true);
                        }}
                      >
                        <span className="soccer-slot-vip">🔒VIP</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ) : (
              /* State: Initial Before Hack */
              <div className="soccer-pred-initial">
                <div className="soccer-pred-initial-text">
                  Nhấn "HACK" để nhận kết quả
                </div>
              </div>
            )}
          </div>

          {/* 6. Hack Button (Frame 2147224270: 427.8px x 100px) */}
          <div className="soccer-hack-btn-wrap">
            <button
              type="button"
              className="soccer-hack-btn"
              style={{
                backgroundImage: `url(${getAssetUrl("/assets/nohu/table/hack_button_bg.png")})`,
              }}
              disabled={isAnalyzing}
              onClick={handleStartHack}
            >
              {isAnalyzing ? "ĐANG PHÂN TÍCH..." : ">Hack (5Token)<"}
            </button>
          </div>
        </div>
      </div>

      {/* 7. VIP Feature Modal (Frame 2147224272: 615.7px x 320px) */}
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

export default SoccerStriker;
