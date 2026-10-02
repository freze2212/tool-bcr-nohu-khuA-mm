import BackButton from "../../../components/BackButton";
import { KhuaFeedPanel, KhuaMonitorPanel } from "../../../components/KhuaHud";
import { getAssetUrl } from "../../../utils/assetUrl";
import "./KhuaAnalysis.css";

type ResultValues = {
  rounds: number;
  minBet: string;
};

export type NhAnalysisLayoutProps = {
  gameTitle: string;
  gameImg: string;
  winPercent: number;
  gameScreenUrl: string;
  isScreenLoading: boolean;
  robotSpeech: string;
  robotVisible: boolean;
  autoMode: boolean;
  onAutoModeChange: (value: boolean) => void;
  onRobotVisibleChange: (value: boolean) => void;
  onBack: () => void;
  onSeeResults: () => void;
  onStopHack: () => void;
  onAddCoins: () => void;
  onVipActivate: () => void;
  onVipStop: () => void;
  vipHackActive: boolean;
  vipBusy: boolean;
  isSpinning: boolean;
  showHackInput: boolean;
  showHackLoading: boolean;
  showHackResults: boolean;
  manualValues: ResultValues;
  autoValues: ResultValues;
  timeSlotText: string;
  refreshRemainingSec: number;
  hackProgress: number;
  hackBalance: string;
  onHackBalanceChange: (value: string) => void;
  onConfirmHack: () => void;
  variant?: "slot" | "fish";
  bossRounds?: number;
};

export default function NhAnalysisLayout({
  gameTitle,
  gameImg,
  winPercent,
  onBack,
  onSeeResults,
  onStopHack,
  onVipActivate,
  onVipStop,
  vipHackActive,
  vipBusy,
  isSpinning,
  showHackInput,
  showHackLoading,
  showHackResults,
  manualValues,
  autoValues,
  timeSlotText,
  refreshRemainingSec,
  hackProgress,
  hackBalance,
  onHackBalanceChange,
  onConfirmHack,
  variant = "slot",
  bossRounds = 0,
}: NhAnalysisLayoutProps) {
  const title = gameTitle.trim() || (variant === "fish" ? "JACKPOT ĐÁNH CÁ" : "Quyết chiến tiền thưởng");
  const isFish = variant === "fish";
  const pct = Math.max(0, Math.min(100, Math.round(winPercent || 0)));
  const mm = String(Math.floor(Math.max(0, refreshRemainingSec) / 60)).padStart(2, "0");
  const ss = String(Math.max(0, refreshRemainingSec) % 60).padStart(2, "0");
  const frame = getAssetUrl("/assets/khua/popup-result-frame.png");
  const robot = getAssetUrl("/assets/khua/robot-analysis.png");
  const gauge = getAssetUrl("/assets/khua/gauge-ring.png");
  const scan = getAssetUrl("/assets/khua/scan-core.png");
  const ecg = getAssetUrl("/assets/khua/ecg.svg");

  return (
    <div className="khua-an">
      <BackButton className="nh-analysis__back" onClick={onBack} />
      <div className="khua-an__fit">
        <div className="khua-an__board">
          <KhuaFeedPanel />
          <div className="khua-card-fit">
          <section className={`khua-card${isFish ? " is-fish" : ""}`}>
            <div className="khua-card__frame">
              <img src={frame} alt="" />
            </div>
            <div className="khua-card__hero">
              <img className="khua-card__robot" src={robot} alt="" />
              <div className="khua-card__gauge">
                <div className="khua-card__gauge-img">
                  <img src={gauge} alt="" />
                </div>
                <div className="khua-card__readout">
                  <small>DỰ ĐOÁN TIẾP THEO</small>
                  <strong>{pct}%</strong>
                  <span className="khua-card__trust">
                    <img src={ecg} width={12.394} height={8.263} alt="" />
                    ĐỘ TIN CẬY CAO
                  </span>
                </div>
              </div>
            </div>

            {showHackInput ? (
              <form
                className="khua-card__form"
                onSubmit={(event) => {
                  event.preventDefault();
                  onConfirmHack();
                }}
              >
                <strong>NHẬP SỐ DƯ HIỆN TẠI</strong>
                <input
                  inputMode="numeric"
                  value={hackBalance}
                  onChange={(event) => onHackBalanceChange(event.target.value.replace(/\D/g, ""))}
                  aria-label="Nhập số dư hiện tại"
                />
                <button type="submit" className="khua-card__stop" disabled={isSpinning}>
                  XÁC NHẬN
                </button>
              </form>
            ) : showHackLoading ? (
              <div className="khua-card__form">
                <strong>Đang phân tích dữ liệu...</strong>
                <div className="khua-card__bar">
                  <b style={{ width: `${Math.max(0, Math.min(100, hackProgress))}%` }} />
                </div>
              </div>
            ) : (
              <div className="khua-card__lower">
                <div className="khua-card__mid">
                  <div className="khua-card__shot">
                    {gameImg ? <img src={gameImg} alt={title} /> : null}
                  </div>
                  <div className="khua-card__scan">
                    <img src={scan} alt="" />
                    <span>scanning...</span>
                  </div>
                </div>
                <h2 className="khua-card__title">{title}</h2>
                <article className="khua-card__box">
                  <strong>{isFish ? "Bắn mồi cá nhỏ" : "Quay mồi"}</strong>
                  <span>
                    {isFish
                      ? `${manualValues.rounds} lượt (đạn ${manualValues.minBet})`
                      : `${manualValues.rounds} vòng - Mức cược ${manualValues.minBet}`}
                  </span>
                </article>
                <article className="khua-card__box">
                  <strong>{isFish ? "Bắn auto cá lớn" : "Quay Auto"}</strong>
                  <span>
                    {isFish
                      ? `${autoValues.rounds} lượt`
                      : `${autoValues.rounds} vòng - Mức cược ${autoValues.minBet}`}
                  </span>
                </article>
                <article className="khua-card__box">
                  <strong>{isFish ? "Bắn Boss đạn lớn" : "Khung giờ"}</strong>
                  <span>{isFish ? `${bossRounds} lượt (đạn ${manualValues.minBet})` : timeSlotText}</span>
                </article>
                <button
                  type="button"
                  className="khua-card__vip"
                  disabled={vipBusy}
                  onClick={() => {
                    if (vipHackActive) onVipStop();
                    else void onVipActivate();
                  }}
                >
                  <strong>👑VIP FEATURE</strong>
                  <em>{vipHackActive ? "Dừng kích hoạt" : "> Kích hoạt ngay<"}</em>
                </button>
              </div>
            )}

            <p className="khua-card__timer">{`${mm}:${ss}`}</p>
            <button
              type="button"
              className="khua-card__stop"
              disabled={isSpinning}
              onClick={showHackResults ? onStopHack : onSeeResults}
            >
              {showHackResults ? "DỪNG HACK NGAY" : "XEM KẾT QUẢ"}
            </button>
          </section>
          </div>
          <KhuaMonitorPanel />
        </div>
      </div>
    </div>
  );
}
