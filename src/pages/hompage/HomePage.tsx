import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAssetUrl } from "../../utils/assetUrl";
import "./HomePage.css";

const GAME_CARDS = [
  {
    id: "bcr",
    title: "Tool Baccarat",
    image: "/assets/khua/card-baccarat.png",
    to: "/casino/lobby",
  },
  {
    id: "nohu",
    title: "Tool Nổ Hũ",
    image: "/assets/khua/card-nohu.png",
    to: "/NH",
  },
  {
    id: "banca",
    title: "Tool Bắn Cá",
    image: "/assets/khua/card-banca.png",
    to: "/fishing",
  },
] as const;

const HomePage = () => {
  const navigate = useNavigate();

  const onCardClick = useCallback(
    (to: string) => {
      navigate(to);
    },
    [navigate]
  );

  return (
    <main className="ll-home">
      <section className="ll-home__cards" aria-label="Danh sách game">
        {GAME_CARDS.map((card) => (
          <button
            key={card.id}
            type="button"
            className="ll-home__card"
            onClick={() => onCardClick(card.to)}
            aria-label={card.title}
          >
            <img src={getAssetUrl(card.image)} alt="" />
          </button>
        ))}
      </section>
    </main>
  );
};

export default HomePage;
