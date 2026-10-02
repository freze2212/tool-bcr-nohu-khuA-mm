import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAssetUrl } from "../../utils/assetUrl";
import { FISHING_GAME_PROVIDERS } from "./fishingMenuGameProviders";
import BackButton from "../../components/BackButton";
import "../NH/HomeNH.css";

const HomeFishing = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const providers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FISHING_GAME_PROVIDERS;
    return FISHING_GAME_PROVIDERS.filter((e) => e.name.toLowerCase().includes(q));
  }, [query]);

  const handleClick = (slotLink: string) => {
    navigate(`/fishing/slot${slotLink}`);
  };

  return (
    <div className="nh-hub">
      <div className="container-fluid lobby-bg position-relative mx-auto mb-5 max-w-[1440px]">
        <div className="container mx-auto px-2">
          {/* Header chuẩn Figma Node 1:17470 */}
          <header className="ll-game-hero" aria-label="Bắn cá">
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
      </div>
    </div>
  );
};

export default HomeFishing;

