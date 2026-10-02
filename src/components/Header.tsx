import React, { useEffect, useState } from "react";
import { getUserProfile } from "../utilities/axios.utilities";
import { getAssetUrl } from "../utils/assetUrl";
import "./AppHeaderBar.css";

interface IProps {
  setIsShowLogout: () => void;
}

function formatToken(n: number | undefined): string {
  if (n == null || Number.isNaN(n)) return "0";
  return n.toLocaleString("vi-VN");
}

const Header: React.FC<IProps> = ({ setIsShowLogout }) => {
  const userInfoString = localStorage.getItem("user_info");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  const [userProfile, setUserProfile] = useState<any>(null);
  const [currentCoins, setCurrentCoins] = useState<number>(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user_info") || "{}");
      return typeof u.coins === "number" ? u.coins : 999999;
    } catch {
      return 999999;
    }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUserProfile(data);
        if (typeof data.coins === "number") {
          setCurrentCoins(data.coins);
        }
        let prev: Record<string, unknown> = {};
        try {
          prev = JSON.parse(localStorage.getItem("user_info") || "{}");
        } catch {
          prev = {};
        }
        localStorage.setItem(
          "user_info",
          JSON.stringify({
            ...prev,
            userName: data.username,
            coins: data.coins,
            role: data.role,
            id: data._id ?? prev.id,
          })
        );
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchProfile();

    const handleTokenUpdated = (e: any) => {
      if (typeof e?.detail?.coins === "number") {
        setCurrentCoins(e.detail.coins);
      } else {
        try {
          const u = JSON.parse(localStorage.getItem("user_info") || "{}");
          if (typeof u.coins === "number") {
            setCurrentCoins(u.coins);
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

  const displayName = userProfile?.username ?? userInfo?.userName ?? "Xiaofeng";
  const coins = currentCoins;

  return (
    <div className="app-header-wrap">
      <nav className="app-header-bar" role="navigation" aria-label="Thanh điều hướng">
        {/* Left: User Avatar & Username */}
        <div className="app-header-bar__user-pill">
          <div className="app-header-bar__avatar-wrap">
            <img
              className="app-header-bar__avatar-img"
              src={getAssetUrl("/assets/gobing/avatar-gobing.png")}
              alt=""
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = getAssetUrl("/assets/icon-vip.png");
              }}
            />
          </div>
          <span className="app-header-bar__username">{displayName}</span>
        </div>

        {/* Right: Token Balance & Logout Button */}
        <div className="app-header-bar__right">
          <div className="app-header-bar__token-pill">
            <span>Token:</span>
            <span className="app-header-bar__token-value">{formatToken(coins)}</span>
          </div>

          <button
            type="button"
            className="app-header-bar__logout"
            onClick={setIsShowLogout}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Đăng xuất</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
