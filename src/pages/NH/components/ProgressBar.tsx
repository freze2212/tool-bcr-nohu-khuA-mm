import React from 'react';
import './ProgressBar.css';
import { useNavigate } from 'react-router-dom';

type NhSlotPlayKind = 'jackpot' | 'choi' | 'cho';

const PLAY_LABEL: Record<NhSlotPlayKind, string> = {
  jackpot: 'JACKPOT',
  choi: 'CHƠI',
  cho: 'CHỜ',
};

interface ProgressBarProps {
  percentage: number;
  title: string;
  imageUrl: string;
  id: string;
  playKind: NhSlotPlayKind;
  /** Mặc định `/NH/table` — hub bắn cá dùng `/fishing/table` */
  tableBasePath?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  title,
  imageUrl,
  id,
  playKind,
  tableBasePath = "/NH/table",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("title_img", imageUrl);
    localStorage.setItem("title_text", title);
    localStorage.setItem("win_percent", percentage.toString());
    const base = tableBasePath.replace(/\/$/, "");
    navigate(`${base}/${id}`);
  };

  const fixedPercent = Math.max(0, Math.min(100, Math.round(percentage)));

  return (
    <div
      onClick={handleClick}
      onKeyDown={(ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          handleClick();
        }
      }}
      className="nh-basic-card"
      role="button"
      tabIndex={0}
    >
      <div className="nh-basic-card__inner">
        <div className="nh-basic-game-image-wrap">
          <img className="nh-basic-game-image" src={imageUrl} alt={title} loading="lazy" />
        </div>
        <div className="nh-basic-game-title" title={title}>
          {title}
        </div>
        <div className={`nh-basic-card__badge nh-basic-card__badge--${playKind}`}>
          {PLAY_LABEL[playKind]}
        </div>
        <div className="nh-basic-bar">
          <div className={`nh-basic-bar__track nh-basic-bar__track--${playKind}`}>
            <div
              className={`nh-basic-bar__fill nh-basic-bar__fill--${playKind}`}
              style={{ width: `${fixedPercent}%` }}
            />
            <span className="nh-basic-bar__pct">{fixedPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProgressBar);