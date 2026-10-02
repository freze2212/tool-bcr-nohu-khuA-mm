import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAssetUrl } from "../../utils/assetUrl";
import { NH_GAME_PROVIDERS } from "./nhMenuGameProviders";
import BackButton from "../../components/BackButton";
import "./HomeNH.css";

const HomeNH = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const providers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NH_GAME_PROVIDERS;
    return NH_GAME_PROVIDERS.filter((e) => e.name.toLowerCase().includes(q));
  }, [query]);

  const handleClick = (slotLink: string) => {
    navigate(`/NH/slot${slotLink}`);
  };

  return (
    <div className="nh-hub">
      <header className="ll-game-hero" aria-label="Nổ hũ">
        <BackButton href="/" className="ll-game-hero__back" />
        <h1 className="ll-game-hero__title">&gt;_SẢNH GAME CỦA GG88_&lt;</h1>
      </header>

      <form className="nh-hub-search" role="search" onSubmit={(ev) => ev.preventDefault()}>
        <span className="nh-hub-search__icon" aria-hidden>
          ⌕
        </span>
        <input
          type="search"
          className="nh-hub-search__input"
          value={query}
          onChange={(ev) => setQuery(ev.target.value)}
          placeholder="Tìm kiếm game…"
          aria-label="Tìm kiếm game"
        />
        <button type="submit" className="nh-hub-search__btn">
          ⌕ Tìm ngay
        </button>
      </form>

      <div className="nh-providers-grid">
        {providers.map((e) => (
          <div
            key={e.link}
            className="nh-provider-card"
            onClick={() => handleClick(e.link)}
            onKeyDown={(ev) => {
              if (ev.key === "Enter" || ev.key === " ") {
                ev.preventDefault();
                handleClick(e.link);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <img
              className="nh-provider-card__frame"
              src={getAssetUrl("/assets/khua/provider-frame.png")}
              alt=""
            />
            <span className="nh-provider-card__logo">
              <img src={getAssetUrl(e.url)} alt={e.name} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeNH;
