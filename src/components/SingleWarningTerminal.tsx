import React from "react";
import "./SingleWarningTerminal.css";

type SingleWarningTerminalProps = {
  message?: string;
  className?: string;
};

const SingleWarningTerminal: React.FC<SingleWarningTerminalProps> = ({
  message = "Cảnh báo: Sảnh PG đang có biến động mạnh!",
  className = "",
}) => {
  return (
    <aside
      className={`single-warning-terminal ${className}`.trim()}
      aria-label="Terminal cảnh báo hệ thống"
    >
      <div className="single-warning-terminal__panel">
        {/* Cyber Corner Bracket Decors */}
        <span
          className="single-warning-terminal__corner single-warning-terminal__corner--tl"
          aria-hidden
        />
        <span
          className="single-warning-terminal__corner single-warning-terminal__corner--tr"
          aria-hidden
        />

        {/* Header Bar */}
        <div className="single-warning-terminal__header">
          <div className="single-warning-terminal__title-wrap">
            <span className="single-warning-terminal__prompt">&gt;</span>
            <span className="single-warning-terminal__title">TERMINAL</span>
          </div>
          <span className="single-warning-terminal__status-dot" aria-hidden />
        </div>

        {/* Body Text */}
        <div className="single-warning-terminal__body">
          <p className="single-warning-terminal__text">
            {message}
            <span className="single-warning-terminal__cursor" aria-hidden>_</span>
          </p>
        </div>
      </div>
    </aside>
  );
};

export default SingleWarningTerminal;
