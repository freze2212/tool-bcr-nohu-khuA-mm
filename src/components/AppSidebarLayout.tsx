import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import MmTopBar from "./MmTopBar";
import ModalConfirmLogout from "./ModalConfirmLogout";
import HackerLiveFeed from "./HackerLiveFeed";
import "./AppSidebarLayout.css";

type AppSidebarLayoutProps = {
  children: React.ReactNode;
};

function isFinalGameTable(pathname: string) {
  return (
    pathname.startsWith("/NH/soccer-striker") ||
    pathname.startsWith("/NH/aviator")
  );
}

export default function AppSidebarLayout({ children }: AppSidebarLayoutProps) {
  const [isShowLogout, setIsShowLogout] = useState(false);
  const { pathname } = useLocation();

  const showDualLiveFeeds = useMemo(
    () => pathname === "/" || isFinalGameTable(pathname),
    [pathname]
  );

  return (
    <div className="x88-hub-shell">
      <MmTopBar onLogoutClick={() => setIsShowLogout(true)} />

      <div className="x88-hub-shell__body">
        {children}

        {showDualLiveFeeds ? (
          <>
            <HackerLiveFeed side="left" variant="terminal" />
            <HackerLiveFeed side="right" variant="live" />
          </>
        ) : null}
      </div>

      <ModalConfirmLogout
        isShowLogout={isShowLogout}
        setIsShowLogout={() => setIsShowLogout(false)}
      />
    </div>
  );
}
