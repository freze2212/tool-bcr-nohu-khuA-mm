import React, { useEffect, useMemo, useState } from "react";
import { getUserProfile } from "../utilities/axios.utilities";
import { getAssetUrl } from "../utils/assetUrl";
import "./HomeSidebar.css";

const VIP_THRESHOLD = 1_000_000;

interface HomeSidebarProps {
  onLogoutClick: () => void;
  drawerOpen?: boolean;
}

function formatToken(n: number | undefined): string {
  if (n == null || Number.isNaN(n)) return "0";
  return n.toLocaleString("vi-VN");
}

const HomeSidebar: React.FC<HomeSidebarProps> = ({ onLogoutClick, drawerOpen = false }) => {
  const userInfoString = localStorage.getItem("user_info");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const [userProfile, setUserProfile] = useState<any>(null);
  const [currentCoins, setCurrentCoins] = useState<number>(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user_info") || "{}");
      return typeof u.coins === "number" ? u.coins : 0;
    } catch {
      return 0;
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

  const displayName = userProfile?.username ?? userInfo?.userName ?? "—";
  const coins = currentCoins;
  const isVip = coins >= VIP_THRESHOLD;

  const { progressPercent, remainingPoints } = useMemo(() => {
    const clamped = Math.min(Math.max(coins, 0), VIP_THRESHOLD);
    return {
      progressPercent: (clamped / VIP_THRESHOLD) * 100,
      remainingPoints: Math.max(VIP_THRESHOLD - coins, 0),
    };
  }, [coins]);

  return (
    <aside
      className={`hub-sidebar${drawerOpen ? " hub-sidebar--open" : ""}`}
      aria-label="Thanh điều hướng"
      style={{
        backgroundImage: `url(${getAssetUrl("/assets/llwin/sidebar-frame.png")})`,
      }}
    >
      <div className="hub-sidebar__content">
        <div className="hub-sidebar__logo-clip">
          <img
            className="hub-sidebar__logo"
            src={getAssetUrl("/assets/llwin/logo.png")}
            alt="Super setting tool"
          />
        </div>

        <div className="hub-sidebar__account">
          <div className="hub-sidebar__pill hub-sidebar__pill--user">
            <img
              className="hub-sidebar__avatar"
              src={getAssetUrl("/assets/llwin/avatar.png")}
              alt=""
              width={39}
              height={39}
            />
            <span className="hub-sidebar__username">{displayName}</span>
          </div>

          <div className="hub-sidebar__vip">
            <div
              className="hub-sidebar__progress"
              role="progressbar"
              aria-valuenow={Math.round(progressPercent)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="hub-sidebar__progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="hub-sidebar__vip-text">
              {isVip ? (
                <>
                  Bạn đã đạt <span>VIP</span>
                </>
              ) : (
                <>
                  Bạn cần nạp thêm <span>{formatToken(remainingPoints)}</span> điểm để đạt{" "}
                  <span>VIP</span>
                </>
              )}
            </p>
          </div>

          <div className="hub-sidebar__pill hub-sidebar__pill--coins">
            <img
              className="hub-sidebar__coin"
              src={getAssetUrl("/assets/llwin/coin.png")}
              alt=""
              width={23}
              height={23}
            />
            <span className="hub-sidebar__coins">{formatToken(coins)}</span>
          </div>

          <button type="button" className="hub-sidebar__logout" onClick={onLogoutClick}>
            <img
              className="hub-sidebar__logout-icon"
              src={getAssetUrl("/assets/llwin/logout.svg")}
              alt=""
              width={20}
              height={20}
            />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
      <p className="hub-sidebar__version">&gt;_version 1.09</p>
    </aside>
  );
};

export default HomeSidebar;
