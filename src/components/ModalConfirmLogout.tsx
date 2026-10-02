import React from "react";
import { getAssetUrl } from "../utils/assetUrl";

interface IProps {
  isShowLogout: boolean;
  setIsShowLogout: () => void;
}

const ModalConfirmLogout: React.FC<IProps> = ({
  isShowLogout,
  setIsShowLogout,
}) => {
  const Cookies = require("js-cookie");

  return (
    <div className={`model-group ${isShowLogout ? "active" : ""} `}>
      <div
        id="logout-model "
        className={`model-item model-logout ${
          isShowLogout ? "model-logout_active" : ""
        } `}
        style={{
          color: "rgb(255, 255, 255)",
          fontFamily: "Prompt",
          boxSizing: "border-box",
          padding: "40px 0px",
          width: "calc(-35px + 100vw)",
          position: "relative",
          maxWidth: "500px",
          display: "block",
          font: "16px / 24px Prompt",
        }}
      >
        <div
          className="lobby-confirm__panel"
          style={{
            width: "100%",
            margin: "0 auto",
            backgroundImage: `url(${getAssetUrl("/assets/khua/popup-warn-frame.png")})`,
          }}
        >
          {/* Top header bar with top-right close button */}
          <div className="lobby-confirm__topbar">
            <button
              type="button"
              className="lobby-confirm__close-btn"
              onClick={setIsShowLogout}
              aria-label="Đóng"
            >
              ×
            </button>
          </div>

          <div className="lobby-confirm__body" style={{ textAlign: "center" }}>
            <header className="lobby-confirm__header">
              <span className="lobby-confirm__warn" aria-hidden>
                ⚠
              </span>
              <h2 className="lobby-confirm__title">
                ĐĂNG XUẤT
              </h2>
              <span className="lobby-confirm__warn" aria-hidden>
                ⚠
              </span>
            </header>

            <p className="lobby-confirm__question" style={{ fontSize: "1.05rem", margin: "8px 0 16px" }}>
              Bạn có chắc muốn đăng xuất khỏi hệ thống không?
            </p>

            <div className="lobby-confirm__actions">
              <button
                type="button"
                className="lobby-confirm__btn lobby-confirm__btn--cancel"
                onClick={setIsShowLogout}
              >
                HỦY BỎ
              </button>
              <button
                type="button"
                className="lobby-confirm__btn lobby-confirm__btn--agree"
                onClick={() => {
                  Cookies.remove("access_token");
                  setIsShowLogout();
                  window.location.reload();
                  localStorage.removeItem("user_info");
                }}
              >
                XÁC NHẬN
              </button>
            </div>
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
html {
  color: rgb(255, 255, 255);
  box-sizing: border-box;
  font-family: sans-serif;
  line-height: 1.15;
  text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
}

body {
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: rgb(33, 37, 41);
  text-align: left;
  margin: 0px;
  -webkit-font-smoothing: auto;
  background-color: transparent;
}
`,
        }}
      />
    </div>
  );
};

export default ModalConfirmLogout;
