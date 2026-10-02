import { useMemo, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import NhAnalysisLayout from "./components/NhAnalysisLayout";
import "./HomeNH.css";
import "./TableGameFigma.css";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const TableGameNew = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFishingTable = location.pathname.startsWith("/fishing/table");
  const params = useParams();
  const tableRoomParam = params?.room;
  const userInfo = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user_info") || "null");
    } catch {
      return null;
    }
  }, []);

  const [userCoins, setUserCoins] = useState<number>(userInfo?.coins ?? 0);
  const gameImg: string = (localStorage.getItem("title_img") || "/assets/phantichchitiet.gif") as string;
  const [gameTitle, setGameTitle] = useState<string>("THỢ SĂN CÁ MẬP");
  const winPercent = parseInt(localStorage.getItem("win_percent") || "90");

  const [points, setPoints] = useState<string>("");
  const [isHackPopupOpen, setIsHackPopupOpen] = useState(false);
  const [hackBalance, setHackBalance] = useState<string>("0");
  const [hackPopupMode, setHackPopupMode] = useState<"input" | "loading">("input");
  const [hackProgress, setHackProgress] = useState<number>(0);
  const [hackCapitalLabel, setHackCapitalLabel] = useState<string>("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [isHackBtnHovered, setIsHackBtnHovered] = useState(false);
  const [isVipPopupOpen, setIsVipPopupOpen] = useState(false);
  const [vipRecommendBet, setVipRecommendBet] = useState<string>("8K");
  const [vipPctBig, setVipPctBig] = useState<number>(88);
  const [vipPctSuper, setVipPctSuper] = useState<number>(88);
  const [vipPctUltra, setVipPctUltra] = useState<number>(92);
  const [isVipFeatureCharging, setIsVipFeatureCharging] = useState(false);
  const [isVipHackPopupStarting, setIsVipHackPopupStarting] = useState(false);
  const [vipHackActive, setVipHackActive] = useState(false);
  const [vipHackUiVisible, setVipHackUiVisible] = useState(false);
  const [vipHackEndsAtMs, setVipHackEndsAtMs] = useState<number | null>(null);
  const [vipHackRemainingSec, setVipHackRemainingSec] = useState<number>(0);
  const [manualValues, setManualValues] = useState({ rounds: 0, minBet: "0" });
  const [autoValues, setAutoValues] = useState({ rounds: 0, minBet: "0" });
  const [bossValues, setBossValues] = useState({ rounds: 0 });
  const [fishingAnalysisComplete, setFishingAnalysisComplete] = useState(false);
  const [analysisLatencyMs, setAnalysisLatencyMs] = useState(12);
  const pendingFishingCapitalVndRef = useRef<number | null>(null);
  const [timeSlotText, setTimeSlotText] = useState(">Chưa có dữ liệu");
  const [showHackResults, setShowHackResults] = useState(false);
  const [refreshRemainingSec, setRefreshRemainingSec] = useState(0);
  const [refreshEndsAtMs, setRefreshEndsAtMs] = useState<number | null>(null);
  const [gameScreenUrl, setGameScreenUrl] = useState("");
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [robotVisible, setRobotVisible] = useState(true);
  const hackProgressTimerRef = useRef<number | null>(null);
  const hackRoundedValueRef = useRef<number | null>(null);
  const vipHackUiTimerRef = useRef<number | null>(null);
  const refreshTimerRef = useRef<number | null>(null);

  const ww = useWindowWidth();
  const isNarrow = ww <= 430;
  const isMobileUi = ww <= 640;

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
    };
  }, []);

  useEffect(() => {
    const titleFromStorage = localStorage.getItem("title_text");
    if (titleFromStorage) setGameTitle(titleFromStorage);
  }, [tableRoomParam]);

  useEffect(() => {
    Swal.fire({
      html: `<div style="padding: 18px; color:white; font-family: 'Courier New', monospace;">Đang tải dữ liệu...</div>`,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      timer: 1200,
      customClass: { popup: "custom-swal" },
    });
  }, []);

  useEffect(() => {
    setFishingAnalysisComplete(false);
    setBossValues({ rounds: 0 });
  }, [isFishingTable, tableRoomParam]);

  useEffect(() => {
    if (isFishingTable || !tableRoomParam) {
      setGameScreenUrl("");
      setIsScreenLoading(false);
      return;
    }

    let cancelled = false;
    setIsScreenLoading(true);

    axios
      .get(`${process.env.REACT_APP_URL_API}/game-screen-links/resolve/${tableRoomParam}`)
      .then((res) => {
        if (cancelled) return;
        setGameScreenUrl(String(res.data?.screenUrl ?? ""));
      })
      .catch(() => {
        if (!cancelled) setGameScreenUrl("");
      })
      .finally(() => {
        if (!cancelled) setIsScreenLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isFishingTable, tableRoomParam]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate(isFishingTable ? "/fishing" : "/NH");
  };

  const deductCoins = async (amount: number = 1, action: string = "PLAY_GAME") => {
    try {
      const token = Cookies.get("access_token");
      if (!token) return true; // không chặn luồng khi dev chưa login
      const res = await axios.post(
        `${process.env.REACT_APP_URL_API}/users/subtract-coins-for-action`,
        { amount, action },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
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
    } catch (e) {
      return false;
    }
  };

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const jitter = (value: number, percent: number) => {
    const spread = value * percent;
    return value + (Math.random() * 2 - 1) * spread;
  };

  const formatPointBet = (value: number) => {
    if (!Number.isFinite(value) || value <= 0) return "1 Điểm";
    return `${Math.round(value)} Điểm`;
  };

  const formatKBet = (value: number) => {
    if (!Number.isFinite(value) || value <= 0) return "1 Điểm";
    return `${Math.round(value)} Điểm`;
  };

  // Gợi ý cho nổ hũ: quay mồi ngắn + min thấp, auto dài hơn + min vừa phải.
  // Tính toán trực tiếp và chính xác dựa theo số Điểm mà người dùng nhập vào.
  const generateSpinSuggestions = (
    targetPoints: number,
    strategyHint?: "manual" | "auto"
  ) => {
    const p = Math.max(targetPoints, 10);

    let manualRoundsRange: [number, number];
    let autoRoundsRange: [number, number];
    let manualRatio: number;
    let autoRatio: number;

    if (p <= 100) {
      manualRoundsRange = [8, 15];
      autoRoundsRange = [20, 35];
      manualRatio = 0.015; // 1 - 2 điểm
      autoRatio = 0.035;   // 3 - 5 điểm
    } else if (p <= 500) {
      manualRoundsRange = [12, 20];
      autoRoundsRange = [25, 45];
      manualRatio = 0.015; // ~5 - 10 điểm
      autoRatio = 0.04;    // ~15 - 25 điểm
    } else if (p <= 2000) {
      manualRoundsRange = [15, 25];
      autoRoundsRange = [30, 50];
      manualRatio = 0.015; // ~15 điểm với 1000
      autoRatio = 0.04;    // ~40 điểm với 1000
    } else if (p <= 10000) {
      manualRoundsRange = [18, 30];
      autoRoundsRange = [35, 60];
      manualRatio = 0.012;
      autoRatio = 0.035;
    } else {
      manualRoundsRange = [20, 35];
      autoRoundsRange = [40, 70];
      manualRatio = 0.01;
      autoRatio = 0.03;
    }

    const manualRounds = randomInt(manualRoundsRange[0], manualRoundsRange[1]);
    let autoRounds = randomInt(autoRoundsRange[0], autoRoundsRange[1]);

    if (strategyHint === "manual") {
      autoRounds = Math.max(1, manualRounds + randomInt(-8, 4));
    } else if (strategyHint === "auto") {
      autoRounds = manualRounds + 10 + randomInt(0, 10);
    }

    const manualMinRaw = jitter(p * manualRatio, 0.15);
    const autoMinRaw = jitter(p * autoRatio, 0.18);

    const manualMin = Math.max(1, Math.round(manualMinRaw));
    const autoMin = Math.max(manualMin + 1, Math.round(autoMinRaw));

    return {
      manual: { rounds: manualRounds, min: manualMin },
      auto: { rounds: autoRounds, min: autoMin },
    };
  };

  /** Chia ngẫu nhiên số lượt theo điểm (bắn cá) — auto thường lớn nhất, có khung giờ vàng chuẩn xác. */
  const generateFishingTurnSplit = (pointsValue: number) => {
    const p = Math.max(1, Math.floor(pointsValue));
    const k = Math.sqrt(clamp(p / 100, 0.5, 3));
    const smallRounds = Math.max(12, Math.floor(randomInt(14, 22) * k));
    const autoRounds = Math.max(35, Math.floor(randomInt(40, 70) * k));
    const bossRounds = Math.max(10, Math.floor(randomInt(15, 25) * k));
    
    // Mức đạn theo điểm
    const smallBet = p >= 200 ? "2 Điểm" : "1 Điểm";
    const autoBet = p >= 500 ? "10 Điểm" : p >= 100 ? "5 Điểm" : "2 Điểm";

    const now = new Date();
    const startDelay = randomInt(2, 4);
    const duration = randomInt(15, 22);
    const start = new Date(now.getTime() + startDelay * 60 * 1000);
    const end = new Date(start.getTime() + duration * 60 * 1000);
    const timeSlot = `>${formatHourMinute(start)} - ${formatHourMinute(end)} (Săn Boss VIP)`;

    return {
      small: { rounds: smallRounds, bet: smallBet },
      auto: { rounds: autoRounds, bet: autoBet },
      boss: { rounds: bossRounds, bet: "20 Điểm" },
      timeSlot,
    };
  };

  const formatHourMinute = (date: Date) => {
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const buildTimeSlotText = (manualRounds: number, autoRounds: number) => {
    const now = new Date();
    const startDelay = randomInt(1, 4); // bắt đầu sau 1-4 phút
    const strategyIsAuto = autoRounds >= manualRounds + 10;
    const duration = strategyIsAuto ? randomInt(18, 25) : randomInt(12, 18);

    const start = new Date(now.getTime() + startDelay * 60 * 1000);
    const end = new Date(start.getTime() + duration * 60 * 1000);
    const strategy = strategyIsAuto ? "ưu tiên auto" : "ưu tiên mồi";

    return `>${formatHourMinute(start)} - ${formatHourMinute(end)} (${strategy})`;
  };

  // Actions
  const handleStart = async (
    targetPoints?: number,
    tokenCost: number = 1,
    strategyHint?: "manual" | "auto"
  ) => {
    const inputRaw =
      targetPoints !== undefined ? String(targetPoints) : points.trim();
    if (!inputRaw) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu dữ liệu",
        text: "Vui lòng nhập điểm trước khi bấm BẮT ĐẦU.",
        confirmButtonText: "Đã hiểu",
      });
      return;
    }

    const input = parseInt(inputRaw, 10);
    if (!input || input <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Điểm chưa hợp lệ",
        text: "Số điểm phải lớn hơn 0.",
        confirmButtonText: "Đã hiểu",
      });
      return;
    }

    // Nếu tokenCost <= 0 thì bỏ qua trừ xu (dùng cho chế độ hack VIP).
    if (tokenCost > 0) {
      // Check if user has enough coins
      if (userCoins < tokenCost) {
        showInsufficientXuModal(tokenCost);
        return;
      }

      // Deduct tokenCost xu
      const ok = await deductCoins(tokenCost, "SPIN_START");
      if (!ok) {
        showInsufficientXuModal(tokenCost);
        return;
      }
    }

    setIsSpinning(true);

    if (isFishingTable) {
      const split = generateFishingTurnSplit(input);
      setManualValues({ rounds: split.small.rounds, minBet: split.small.bet });
      setAutoValues({ rounds: split.auto.rounds, minBet: split.auto.bet });
      setBossValues({ rounds: split.boss.rounds });
      setTimeSlotText(split.timeSlot);
      setAnalysisLatencyMs(randomInt(10, 18));
      setFishingAnalysisComplete(true);
      setShowHackResults(true);
      startRefreshCountdown();
    } else {
      const suggestion = generateSpinSuggestions(input, strategyHint);

      const manualBetFormatted = formatPointBet(suggestion.manual.min);
      const autoBetFormatted = formatPointBet(suggestion.auto.min);

      setManualValues({
        rounds: suggestion.manual.rounds,
        minBet: manualBetFormatted,
      });
      setAutoValues({
        rounds: suggestion.auto.rounds,
        minBet: autoBetFormatted,
      });
      setBossValues({ rounds: 0 });
      setTimeSlotText(buildTimeSlotText(suggestion.manual.rounds, suggestion.auto.rounds));
      setFishingAnalysisComplete(false);
      startRefreshCountdown();
    }
    setTimeout(() => setIsSpinning(false), 250);
  };

  const showInsufficientXuModal = (requiredAmount: number = 1) => {
    // Create modal element
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(8, 0, 2, 0.85);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      backdrop-filter: blur(8px);
      animation: modalFadeIn 0.3s ease-out;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background-color: rgba(22, 2, 5, 0.96);
      border: 2px solid #ff0033;
      border-radius: 16px;
      padding: 0;
      text-align: center;
      color: white;
      max-width: 440px;
      width: 90%;
      box-shadow: 0 0 32px rgba(255, 0, 51, 0.6), inset 0 0 16px rgba(255, 0, 51, 0.15), 0 16px 48px rgba(0, 0, 0, 0.9);
      position: relative;
      animation: modalSlideIn 0.3s ease-out;
      font-family: 'Roboto', sans-serif;
      overflow: hidden;
    `;

    modalContent.innerHTML = `
      <style>
        @keyframes modalFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes modalSlideIn {
          0% { 
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          100% { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      </style>
      
      <div style="height: 38px; padding: 0 14px; border-bottom: 1px solid rgba(255, 0, 51, 0.4); display: flex; align-items: center; justify-content: flex-end; background: rgba(35, 2, 7, 0.6);">
        <button id="close-modal-ring" style="width: 26px; height: 26px; border-radius: 50%; border: 1.5px solid #ff0033; box-shadow: 0 0 10px rgba(255, 0, 51, 0.5); background: rgba(45, 0, 8, 0.8); color: #ff3355; font-size: 18px; font-weight: 800; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; margin-left: auto;">
          ×
        </button>
      </div>

      <div style="padding: 20px 28px 24px 28px; display: flex; flex-direction: column; align-items: center; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #ffe600; font-size: 24px; filter: drop-shadow(0 0 8px rgba(255, 230, 0, 0.7));">⚠</span>
          <h2 style="margin: 0; color: #ffe600; font-size: 22px; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase; text-shadow: 0 0 12px rgba(255, 230, 0, 0.65);">
            HẾT TOKEN
          </h2>
          <span style="color: #ffe600; font-size: 24px; filter: drop-shadow(0 0 8px rgba(255, 230, 0, 0.7));">⚠</span>
        </div>
        
        <p style="margin: 0; color: #ffffff; font-size: 15px; font-weight: 600; text-align: center;">
          Bạn cần tối thiểu <span style="color: #ffe600; font-weight: 800;">${requiredAmount} Token</span> để tiếp tục sử dụng tính năng này!
        </p>
        
        <div style="display: flex; gap: 14px; margin-top: 8px; width: 100%; justify-content: center;">
          <button id="insufficient-xu-confirm-btn" style="
            flex: 1;
            max-width: 150px;
            height: 40px;
            border-radius: 8px;
            background: linear-gradient(180deg, #ff0033 0%, #ff5500 100%);
            border: none;
            color: #ffffff;
            font-size: 15px;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 0 16px rgba(255, 0, 51, 0.6);
          ">Đồng ý</button>
        </div>
      </div>
    `;

    const closeRing = modalContent.querySelector('#close-modal-ring');
    const confirmBtn = modalContent.querySelector('#insufficient-xu-confirm-btn');

    const closeModal = () => {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal);
      }
    };

    if (closeRing) closeRing.addEventListener('click', closeModal);
    if (confirmBtn) confirmBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  };

  const openHackPopup = () => {
    // Yêu cầu: bật popup lên thì ô input xóa trắng
    setHackBalance("");
    setHackPopupMode("input");
    setHackProgress(0);
    setHackCapitalLabel("");
    pendingFishingCapitalVndRef.current = null;
    setShowHackResults(false);
    if (isFishingTable) setFishingAnalysisComplete(false);
    if (!isFishingTable) setRobotVisible(true);
    setIsHackPopupOpen(true);
  };

  const handleSeeResultsClick = async () => {
    if (isSpinning) return;
    if (userCoins < 2) {
      showInsufficientXuModal(2);
      return;
    }
    const ok = await deductCoins(2, "VIEW_RESULTS");
    if (!ok) {
      showInsufficientXuModal(2);
      return;
    }
    openHackPopup();
  };

  const closeHackPopup = () => {
    setIsHackPopupOpen(false);
    setHackPopupMode("input");
    setHackProgress(0);
    setHackCapitalLabel("");
    pendingFishingCapitalVndRef.current = null;
    hackRoundedValueRef.current = null;
    if (hackProgressTimerRef.current != null) {
      window.clearInterval(hackProgressTimerRef.current);
      hackProgressTimerRef.current = null;
    }
  };

  const openVipPopup = () => {
    // Tỉ lệ mức cược theo Điểm
    const betOptions = [15, 30, 50, 100] as const;
    const betWeights = [60, 20, 12, 8] as const; // tổng 100
    const r = Math.random() * 100;
    let acc = 0;
    let pick = 15;
    for (let i = 0; i < betOptions.length; i++) {
      acc += betWeights[i];
      if (r <= acc) {
        pick = betOptions[i];
        break;
      }
    }
    setVipRecommendBet(`${pick} Điểm`);

    const big = randomInt(85, 93);
    const superPct = randomInt(big + 1, 94);
    const ultraPct = randomInt(superPct + 1, 95);

    setVipPctBig(big);
    setVipPctSuper(superPct);
    setVipPctUltra(ultraPct);

    setIsVipPopupOpen(true);
  };

  const closeVipPopup = () => setIsVipPopupOpen(false);

  const isVipRunning = vipHackActive || vipHackUiVisible;

  const handleVipFeatureClick = async () => {
    if (isVipHackPopupStarting) return;
    if (isVipFeatureCharging) return;
    if (isVipRunning) return;

    if (userCoins < 20) {
      showInsufficientXuModal(20);
      return;
    }

    setIsVipFeatureCharging(true);
    const ok = await deductCoins(20, "VIP_FEATURE_OPEN");
    setIsVipFeatureCharging(false);
    if (!ok) {
      showInsufficientXuModal(20);
      return;
    }

    openVipPopup();
  };

  const formatMMSS = (totalSeconds: number) => {
    const s = Math.max(0, Math.floor(totalSeconds));
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const startRefreshCountdown = () => {
    const refreshSec = 5 * 60; // 5 phút đếm ngược
    setRefreshRemainingSec(refreshSec);
    setRefreshEndsAtMs(Date.now() + refreshSec * 1000);
    setShowHackResults(true);
  };

  const stopHackNow = () => {
    setShowHackResults(false);
    setRefreshRemainingSec(0);
    setRefreshEndsAtMs(null);
    if (refreshTimerRef.current != null) {
      window.clearInterval(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  };

  const parseVipBetToNumber = (label: string) => {
    const s = String(label ?? "").trim();
    if (!s) return 0;
    const n = parseInt(s.replace(/\D/g, ""), 10);
    return Number.isFinite(n) ? n : 0;
  };

  const startVipHackNow = () => {
    if (vipHackActive || isVipHackPopupStarting) return;

    const vipBetPool = ["15 Điểm", "30 Điểm", "50 Điểm", "100 Điểm"] as const;
    const selectedVipBet = vipBetPool[randomInt(0, vipBetPool.length - 1)];
    setVipRecommendBet(selectedVipBet);
    const selectedVipBetNumber = parseVipBetToNumber(selectedVipBet) || 15;
    const vipSuggestion = generateSpinSuggestions(selectedVipBetNumber * 25, "auto");

    if (isFishingTable) {
      const split = generateFishingTurnSplit(100);
      setManualValues({ rounds: split.small.rounds, minBet: split.small.bet });
      setAutoValues({ rounds: split.auto.rounds, minBet: split.auto.bet });
      setBossValues({ rounds: split.boss.rounds });
      setTimeSlotText(split.timeSlot);
      setAnalysisLatencyMs(randomInt(10, 18));
      setFishingAnalysisComplete(true);
    } else {
      setAnalysisLatencyMs(randomInt(10, 18));
      // Set lại kết quả hiển thị theo seed VIP mới
      const manualMin = Math.max(selectedVipBetNumber, vipSuggestion.manual.min);
      const autoMin = Math.max(
        Math.floor(selectedVipBetNumber * 1.5),
        vipSuggestion.auto.min
      );
      setManualValues({
        rounds: vipSuggestion.manual.rounds,
        minBet: formatPointBet(manualMin),
      });
      setAutoValues({
        rounds: vipSuggestion.auto.rounds,
        minBet: formatPointBet(autoMin),
      });
      setBossValues({ rounds: 0 });
      setTimeSlotText(
        buildTimeSlotText(vipSuggestion.manual.rounds, vipSuggestion.auto.rounds)
      );
    }

    // "2p trở xuống": random 60..120 giây
    const durationSec = Math.floor(60 + Math.random() * 61);

    setIsVipHackPopupStarting(true);
    setVipHackActive(true);
    setVipHackUiVisible(true);
    setVipHackRemainingSec(durationSec);
    setVipHackEndsAtMs(Date.now() + durationSec * 1000);

    // Đóng popup hack đang có để tránh che UI / xung đột
    setIsHackPopupOpen(false);
    setHackPopupMode("input");
    setHackProgress(0);
    setHackCapitalLabel("");
    hackRoundedValueRef.current = null;
    if (hackProgressTimerRef.current != null) {
      window.clearInterval(hackProgressTimerRef.current);
      hackProgressTimerRef.current = null;
    }

    // Bấm xong chạy ngay: đóng popup VIP liền, không dùng setTimeout 3s nữa
    setIsVipPopupOpen(false);
    setIsVipHackPopupStarting(false);

    if (!isFishingTable) {
      setRobotVisible(true);
      startRefreshCountdown();
    }
  };

  const stopVipHackNow = () => {
    if (!vipHackActive && !isVipHackPopupStarting) return;

    if (vipHackUiTimerRef.current != null) {
      window.clearInterval(vipHackUiTimerRef.current);
      vipHackUiTimerRef.current = null;
    }

    setVipHackActive(false);
    setVipHackUiVisible(false);
    setVipHackEndsAtMs(null);
    setVipHackRemainingSec(0);
    setIsVipHackPopupStarting(false);

    if (!isFishingTable) {
      stopHackNow();
    }
  };

  useEffect(() => {
    if (!vipHackActive) return;
    if (vipHackEndsAtMs == null) return;

    if (vipHackUiTimerRef.current != null) {
      window.clearInterval(vipHackUiTimerRef.current);
      vipHackUiTimerRef.current = null;
    }

    vipHackUiTimerRef.current = window.setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil((vipHackEndsAtMs - Date.now()) / 1000)
      );
      setVipHackRemainingSec(remaining);

      if (remaining <= 0) {
        if (vipHackUiTimerRef.current != null) {
          window.clearInterval(vipHackUiTimerRef.current);
          vipHackUiTimerRef.current = null;
        }
        setVipHackActive(false);
        setVipHackUiVisible(false);
        setVipHackEndsAtMs(null);
        setVipHackRemainingSec(0);
      }
    }, 200);

    return () => {
      if (vipHackUiTimerRef.current != null) {
        window.clearInterval(vipHackUiTimerRef.current);
        vipHackUiTimerRef.current = null;
      }
    };
  }, [vipHackActive, vipHackEndsAtMs]);

  useEffect(() => {
    if (refreshEndsAtMs == null) return;

    const tick = () => {
      const remaining = Math.max(0, Math.ceil((refreshEndsAtMs - Date.now()) / 1000));
      setRefreshRemainingSec(remaining);
      if (remaining <= 0) {
        setRefreshEndsAtMs(null);
        if (refreshTimerRef.current != null) {
          window.clearInterval(refreshTimerRef.current);
          refreshTimerRef.current = null;
        }
      }
    };

    tick();
    refreshTimerRef.current = window.setInterval(tick, 1000);

    return () => {
      if (refreshTimerRef.current != null) {
        window.clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
    };
  }, [refreshEndsAtMs]);

  const confirmHackPopup = async () => {
    if (isSpinning) return;

    const raw = hackBalance.trim();
    const value = parseInt(raw, 10);
    const pointValue = Number.isFinite(value) ? Math.floor(value) : NaN;

    if (!raw || Number.isNaN(pointValue) || pointValue < 1) {
      Swal.fire({
        icon: "warning",
        title: "Dữ liệu chưa hợp lệ",
        text: "Số điểm phải lớn hơn hoặc bằng 1.",
        confirmButtonText: "Đã hiểu",
      });
      return;
    }

    pendingFishingCapitalVndRef.current = null;
    hackRoundedValueRef.current = pointValue;

    setHackPopupMode("loading");
    setHackCapitalLabel(`${pointValue.toLocaleString("vi-VN")} Điểm`);
    setHackProgress(0);

    if (hackProgressTimerRef.current != null) {
      window.clearInterval(hackProgressTimerRef.current);
      hackProgressTimerRef.current = null;
    }

    // Chạy thanh tiến trình UI (mô phỏng "đang phân tích" như ảnh)
    hackProgressTimerRef.current = window.setInterval(() => {
      setHackProgress((p) => {
        const jump = 2 + Math.random() * 6;
        const next = Math.min(100, Math.floor(p + jump));
        return next;
      });
    }, 120);

    // Đóng popup ngoài cùng trong giai đoạn loading (để không bị "thừa popup")
    setIsHackPopupOpen(false);
  };

  useEffect(() => {
    if (hackPopupMode !== "loading") return;
    if (hackProgress < 100) return;

    if (hackProgressTimerRef.current != null) {
      window.clearInterval(hackProgressTimerRef.current);
      hackProgressTimerRef.current = null;
    }

    const rounded = hackRoundedValueRef.current;
    if (rounded == null) return;

    // Chờ handleStart cập nhật xong kết quả (quay mồi/quay auto / bắn cá) thì mới đóng popup
    void (async () => {
      await handleStart(rounded, 10, autoMode ? "auto" : undefined);
      closeHackPopup();
    })();
  }, [hackPopupMode, hackProgress]);

  const showAnalysisPanel =
    vipHackActive ||
    vipHackUiVisible ||
    (isFishingTable && fishingAnalysisComplete);
  const fishingUiTheme =
    isFishingTable &&
    (fishingAnalysisComplete || vipHackActive || vipHackUiVisible);
  const analysisPanelBg = fishingUiTheme ? "rgba(28,0,0,0.94)" : "#002520";
  const analysisPanelBorder = fishingUiTheme ? "1px solid #ff3300" : "1px solid #00FFE1";
  const analysisValueColor = fishingUiTheme ? "#F7FF00" : "#00FF6F";
  const analysisBtnBorder = fishingUiTheme ? "1px solid #2a8f3a" : "1px solid #00FFE1";
  const analysisBtnBg = fishingUiTheme ? "#0d6e1e" : "#00691C";
  const analysisBtnColor = fishingUiTheme ? "#ffffff" : "#00FF6F";

  const robotSpeech = useMemo(() => {
    if (hackPopupMode === "loading") {
      return hackCapitalLabel
        ? `Đang phân tích dữ liệu với mức vốn ${hackCapitalLabel}...`
        : "Đang phân tích dữ liệu...";
    }
    if (showHackResults) {
      return "Phân tích hoàn tất! Xem kết quả phía trên robot.";
    }
    if (isSpinning) {
      return "Đang quay — hãy giữ nguyên mức vốn đã nhập!";
    }
    if (vipHackActive && vipHackRemainingSec > 0) {
      return `VIP HACK đang chạy — còn ${vipHackRemainingSec}s.`;
    }
    if (isVipHackPopupStarting || isVipFeatureCharging) {
      return "Đang kích hoạt tính năng VIP...";
    }
    if (showAnalysisPanel) {
      return isFishingTable
        ? "Phân tích bắn cá hoàn tất! Xem kết quả bên dưới."
        : "Phân tích hoàn tất! Xem kết quả bên dưới.";
    }
    if (isHackPopupOpen) {
      return "Nhập mức vốn rồi bấm HACK để bắt đầu phân tích.";
    }
    return "Xin chào! Tôi có thể giúp gì cho bạn?";
  }, [
    hackPopupMode,
    hackCapitalLabel,
    showHackResults,
    isSpinning,
    vipHackActive,
    vipHackRemainingSec,
    isVipHackPopupStarting,
    isVipFeatureCharging,
    showAnalysisPanel,
    isFishingTable,
    isHackPopupOpen,
  ]);

  return (
    <div className="nh-hub nh-table-page">
      <NhAnalysisLayout
        gameTitle={gameTitle}
        gameImg={gameImg}
        winPercent={winPercent}
        gameScreenUrl={gameScreenUrl}
        isScreenLoading={isScreenLoading}
        robotSpeech={robotSpeech}
        robotVisible={robotVisible}
        autoMode={autoMode}
        onAutoModeChange={setAutoMode}
        onRobotVisibleChange={setRobotVisible}
        onBack={handleBack}
        onSeeResults={() => {
          void handleSeeResultsClick();
        }}
        onStopHack={stopHackNow}
        onAddCoins={() => {
          void Swal.fire({
            icon: "info",
            title: "Thêm xu",
            text: "Vui lòng nạp thêm xu vào tài khoản.",
            confirmButtonText: "Đã hiểu",
          });
        }}
        onVipActivate={() => {
          void handleVipFeatureClick();
        }}
        onVipStop={stopVipHackNow}
        vipHackActive={isVipRunning}
        vipBusy={isVipFeatureCharging || isVipHackPopupStarting}
        isSpinning={isSpinning}
        showHackInput={isHackPopupOpen && hackPopupMode === "input"}
        showHackLoading={hackPopupMode === "loading"}
        showHackResults={showHackResults}
        manualValues={manualValues}
        autoValues={autoValues}
        timeSlotText={timeSlotText}
        refreshRemainingSec={refreshRemainingSec}
        hackProgress={hackProgress}
        hackBalance={hackBalance}
        onHackBalanceChange={setHackBalance}
        onConfirmHack={() => {
          void confirmHackPopup();
        }}
        variant={isFishingTable ? "fish" : "slot"}
        bossRounds={bossValues.rounds}
      />

      {isVipPopupOpen ? (
        <div
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeVipPopup();
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10002,
            background: "rgba(0,0,0,0.65)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(6px)",
            padding: 14,
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            style={{
              width: "min(360px, calc(100vw - 32px))",
              maxWidth: "100%",
              boxSizing: "border-box",
              background: "linear-gradient(180deg, #120505 0%, #0a0303 100%)",
              border: "1px solid #ff3333",
              borderRadius: 14,
              boxShadow:
                "0 0 0 1px rgba(255, 60, 40, 0.35), 0 0 28px rgba(255, 40, 20, 0.45)",
              position: "relative",
              color: "#fff",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                minHeight: 38,
                padding: "0 14px",
                borderBottom: "1px solid rgba(255, 0, 51, 0.4)",
                background: "rgba(35, 2, 7, 0.6)",
                boxSizing: "border-box",
              }}
            >
              <button
                type="button"
                onClick={closeVipPopup}
                aria-label="Đóng"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  border: "1.5px solid #ff0033",
                  boxShadow: "0 0 10px rgba(255, 0, 51, 0.5)",
                  background: "rgba(45, 0, 8, 0.8)",
                  color: "#ff3355",
                  fontSize: 18,
                  fontWeight: 800,
                  lineHeight: 1,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  transition: "all 0.2s ease",
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                padding: "14px 18px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  fontWeight: 900,
                  letterSpacing: 0.4,
                  color: "#ffff00",
                  fontSize: isNarrow ? 15 : 17,
                  textShadow: "0 0 12px rgba(255,255,0,0.35)",
                  textTransform: "uppercase",
                }}
              >
                TỶ LỆ THẮNG LỚN
              </div>

              <div
                style={{
                  marginTop: 12,
                  border: "1px solid #ff3333",
                  borderRadius: 10,
                  padding: "8px 10px",
                  textAlign: "center",
                  fontWeight: 800,
                  fontSize: isNarrow ? 12 : 13,
                  background: "rgba(0,0,0,0.25)",
                }}
              >
                <span style={{ color: "#ffffff" }}>MỨC CƯỢC ĐỀ NGHỊ: </span>
                <span style={{ color: "#ffff00" }}>{vipRecommendBet}</span>
              </div>

              <div
                style={{
                  marginTop: 12,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    borderRadius: 10,
                    border: "1px solid #ff3333",
                    backgroundColor: "transparent",
                    padding: "8px 4px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 9,
                      lineHeight: 1.15,
                      color: "#ffffff",
                      textTransform: "uppercase",
                      letterSpacing: 0.02,
                    }}
                  >
                    THẮNG LỚN
                  </div>
                  <div
                    style={{
                      color: "#39ff14",
                      fontWeight: 900,
                      fontSize: isNarrow ? 18 : 20,
                      marginTop: 4,
                      textShadow: "0 0 10px rgba(57,255,20,0.45)",
                    }}
                  >
                    {vipPctBig}%
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: 10,
                    border: "1px solid #ff3333",
                    backgroundColor: "transparent",
                    padding: "8px 4px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 9,
                      lineHeight: 1.15,
                      color: "#ffffff",
                      textTransform: "uppercase",
                    }}
                  >
                    THẮNG SIÊU LỚN
                  </div>
                  <div
                    style={{
                      color: "#ffff00",
                      fontWeight: 900,
                      fontSize: isNarrow ? 18 : 20,
                      marginTop: 4,
                      textShadow: "0 0 8px rgba(255,255,0,0.35)",
                    }}
                  >
                    {vipPctSuper}%
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: 10,
                    border: "1px solid #ff3333",
                    backgroundColor: "transparent",
                    padding: "8px 4px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 9,
                      lineHeight: 1.15,
                      color: "#ffffff",
                      textTransform: "uppercase",
                    }}
                  >
                    THẮNG CỰC LỚN
                  </div>
                  <div
                    style={{
                      color: "#ff4da6",
                      fontWeight: 900,
                      fontSize: isNarrow ? 18 : 20,
                      marginTop: 4,
                      textShadow: "0 0 10px rgba(255,77,166,0.45)",
                    }}
                  >
                    {vipPctUltra}%
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="nh-vip-popup__use-btn"
                disabled={isVipHackPopupStarting || vipHackActive}
                onClick={startVipHackNow}
              >
                DÙNG HACK NGAY
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TableGameNew;
