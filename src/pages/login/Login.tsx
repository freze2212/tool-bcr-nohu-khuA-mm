import axios from "axios";
import React, { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import "./css/main.login.css";
import "./css/login-page.css";
import { getAssetUrl } from "../../utils/assetUrl";

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .transform((value) => (value ? value.toLowerCase().trim() : value))
    .required("Tên tài khoản bắt buộc"),
  phone_number: yup
    .string()
    .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số")
    .required("Số điện thoại bắt buộc"),
  password: yup.string().min(6, "Mật khẩu ít nhất 6 ký tự").required("Mật khẩu bắt buộc"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});

type RegisterFormValues = yup.InferType<typeof registerSchema>;

type AuthFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon: string;
  showToggle?: boolean;
  visible?: boolean;
  onToggle?: () => void;
};

const AuthField = forwardRef<HTMLInputElement, AuthFieldProps>(function AuthField(
  { icon, placeholder, type = "text", showToggle, visible, onToggle, className, ...inputProps },
  ref
) {
  return (
    <div className={`login-field${className ? ` ${className}` : ""}`}>
      <img className="login-field__icon" src={getAssetUrl(icon)} alt="" />
      <input
        ref={ref}
        className="login-field__input"
        type={showToggle ? (visible ? "text" : "password") : type}
        placeholder={placeholder}
        {...inputProps}
      />
      {showToggle ? (
        <button
          type="button"
          className="login-field__eye"
          onClick={onToggle}
          aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        >
          <img src={getAssetUrl("/assets/llwin/icon-eye.svg")} alt="" />
        </button>
      ) : null}
    </div>
  );
});

const Login: React.FC = () => {
  const Cookies = require("js-cookie");

  const [authView, setAuthView] = useState<"login" | "register">("login");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegPassword2, setShowRegPassword2] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [rememberLogin, setRememberLogin] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const {
    register: registerField,
    handleSubmit: handleRegisterSubmit,
    reset: resetRegisterForm,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem("mm_remember_user");
    if (saved) {
      setUserName(saved);
      setRememberLogin(true);
    }
  }, []);

  const handleLogin = async () => {
    const cleanUsername = userName.trim().toLowerCase();
    if (cleanUsername === "" || password.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Lỗi đăng nhập",
        text: "Vui lòng điền đầy đủ tài khoản và mật khẩu!",
        customClass: {
          popup: "custom-swal",
          title: "custom-title",
          htmlContainer: "custom-text",
        },
      });
      return;
    }

    try {
      Swal.fire({
        title: "Đang kết nối Server GOBING...",
        html: "<p class='swal-loading-subtext'>Hệ thống đang xác thực danh tính...</p><div class='swal-loading-dots'><span class='swal-dot swal-dot-cyan'></span><span class='swal-dot swal-dot-orange'></span></div>",
        customClass: {
          popup: "custom-swal swal-loading-modal",
          title: "custom-title",
          htmlContainer: "custom-text",
        },
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      await new Promise((resolve) => setTimeout(resolve, 800));
      await axios
        .post(`${process.env.REACT_APP_URL_API}/auth/login`, {
          username: cleanUsername,
          password,
        })
        .then(async (data) => {
          localStorage.setItem(
            "user_info",
            JSON.stringify({
              userName: data.data.user.username,
              coins: data.data.user.coins,
              role: data.data.user.role,
              id: data.data.user._id,
            })
          );

          Cookies.set("access_token", data.data.access_token, {
            expires: 1 / 24,
            secure: false,
            sameSite: "Lax",
          });
          if (rememberLogin) {
            localStorage.setItem("mm_remember_user", cleanUsername);
          } else {
            localStorage.removeItem("mm_remember_user");
          }

          await new Promise((resolve) => setTimeout(resolve, 100));

          if (
            (data.status === 200 || data.status === 201) &&
            (data.data.user.role === "SUPERADMIN" || data.data.user.role === "ADMIN")
          ) {
            Swal.fire({
              icon: "success",
              title: "Đăng nhập thành công",
              text: "Đang chuyển hướng trang Quản trị...",
              customClass: {
                popup: "custom-swal",
                title: "custom-title",
                htmlContainer: "custom-text",
              },
            });
            setTimeout(() => {
              window.location.href = "/admin";
            }, 500);
          } else {
            Swal.fire({
              icon: "success",
              title: "Đăng nhập thành công",
              text: "Chào mừng bạn đến với GOBING VIP!",
              customClass: {
                popup: "custom-swal",
                title: "custom-title",
                htmlContainer: "custom-text",
              },
            });
            setTimeout(() => {
              window.location.href = "/";
            }, 500);
          }
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            Swal.fire({
              icon: "error",
              title: "Lỗi đăng nhập",
              text: "Tài khoản hoặc mật khẩu không chính xác!",
              customClass: {
                popup: "custom-swal",
                title: "custom-title",
                htmlContainer: "custom-text",
              },
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Lỗi máy chủ",
              text: "Không thể kết nối đến máy chủ GOBING, vui lòng thử lại!",
              customClass: {
                popup: "custom-swal",
                title: "custom-title",
                htmlContainer: "custom-text",
              },
            });
          }
        });
    } catch (error) {
      return error;
    }
  };

  const onRegister = async (data: RegisterFormValues) => {
    try {
      const cleanUsername = (data.username || "").trim().toLowerCase();
      Swal.fire({
        title: "Đang khởi tạo tài khoản...",
        html: "<p class='swal-loading-subtext'>Đang đăng ký thành viên mới...</p>",
        customClass: {
          popup: "custom-swal swal-loading-modal",
          title: "custom-title",
          htmlContainer: "custom-text",
        },
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      await axios
        .post(`${process.env.REACT_APP_URL_API}/auth/register`, {
          username: cleanUsername,
          phone: data.phone_number,
          password: String(data.password),
          ...(referralCode.trim() ? { referral_code: referralCode.trim() } : {}),
        })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Đăng ký thành công!",
              text: "Vui lòng đăng nhập bằng tài khoản vừa tạo.",
              customClass: {
                popup: "custom-swal",
                title: "custom-title",
                htmlContainer: "custom-text",
              },
            });
            resetRegisterForm();
            setAuthView("login");
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Lỗi đăng ký",
            text: `${err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!"}`,
            customClass: {
              popup: "custom-swal",
              title: "custom-title",
              htmlContainer: "custom-text",
            },
          });
        });
    } catch (error) {
      return error;
    }
  };

  const goRegister = () => {
    setAuthView("register");
    setReferralCode("");
    resetRegisterForm();
  };

  const goLogin = () => {
    setAuthView("login");
    resetRegisterForm();
  };

  const asset = (path: string) => getAssetUrl(`/assets/khua/${path}`);

  return (
    <div className="mm-login">
      <div className="mm-login__shell">
        <section className="mm-login__card" aria-label={authView === "login" ? "Đăng nhập" : "Đăng ký"}>
          <span className="mm-login__tick mm-login__tick--tl-h" />
          <span className="mm-login__tick mm-login__tick--tr-h" />
          <span className="mm-login__tick mm-login__tick--tl-v" />
          <span className="mm-login__tick mm-login__tick--tr-v" />

          <div className="mm-login__hazard" aria-hidden>
            <span className="mm-login__bars"><i /><i /><i /></span>
            <span className="mm-login__slit" />
            <span className="mm-login__bars mm-login__bars--flip"><i /><i /><i /></span>
          </div>

          <div className="mm-login__emblem" aria-hidden>
            <img src={asset("icon-warn-1.svg")} alt="" />
            <img src={asset("icon-warn-2.svg")} alt="" />
            <img src={asset("icon-warn-3.svg")} alt="" />
          </div>
          <h1 className="mm-login__title">PRO TIP MM88</h1>
          <p className="mm-login__sub">
            <span />
            {authView === "login" ? "Đăng nhập để tiếp tục" : "Khởi tạo tài khoản mới"}
            <span />
          </p>

          {authView === "login" ? (
            <form
              className="mm-login__fields"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="login-field-wrap">
                <AuthField
                  icon="/assets/khua/icon-user.svg"
                  placeholder="Tên đăng nhập"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value.toLowerCase())}
                  style={{ textTransform: "lowercase" }}
                  autoComplete="username"
                  maxLength={20}
                />
                <i className="login-field__dot" />
              </div>
              <AuthField
                icon="/assets/khua/icon-lock.svg"
                placeholder="Mật khẩu"
                showToggle
                visible={showPassword}
                onToggle={() => setShowPassword((v) => !v)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                maxLength={24}
              />
              <div className="mm-login__row">
                <label className="mm-login__check">
                  <input
                    type="checkbox"
                    checked={rememberLogin}
                    onChange={(e) => setRememberLogin(e.target.checked)}
                  />
                  Ghi nhớ đăng nhập
                </label>
                <button
                  type="button"
                  className="mm-login__link"
                  onClick={() =>
                    Swal.fire({
                      icon: "info",
                      title: "Quên mật khẩu",
                      text: "Liên hệ hỗ trợ để lấy lại mật khẩu.",
                      customClass: {
                        popup: "custom-swal",
                        title: "custom-title",
                        htmlContainer: "custom-text",
                      },
                    })
                  }
                >
                  Quên mật khẩu?
                </button>
              </div>
              <button type="submit" className="mm-login__submit">
                Đăng nhập
                <img src={asset("icon-chevron.svg")} alt="" />
              </button>
            </form>
          ) : (
            <form
              className="mm-login__fields"
              onSubmit={(e) => {
                if (!agreeTerms) {
                  e.preventDefault();
                  Swal.fire({
                    icon: "error",
                    title: "Chưa đồng ý điều khoản",
                    text: "Vui lòng đồng ý với Điều khoản và Chính sách bảo mật.",
                    customClass: {
                      popup: "custom-swal",
                      title: "custom-title",
                      htmlContainer: "custom-text",
                    },
                  });
                  return;
                }
                handleRegisterSubmit(onRegister)(e);
              }}
              noValidate
            >
              <AuthField
                icon="/assets/khua/icon-user.svg"
                placeholder="Tên đăng nhập / Nickname"
                autoComplete="username"
                style={{ textTransform: "lowercase" }}
                {...registerField("username", {
                  onChange: (e: any) => {
                    e.target.value = (e.target.value || "").toLowerCase();
                  },
                })}
              />
              {registerErrors.username && (
                <p className="login-page__field-error">{registerErrors.username.message}</p>
              )}
              <AuthField
                icon="/assets/khua/icon-lock.svg"
                placeholder="Mật khẩu bảo mật"
                showToggle
                visible={showRegPassword}
                onToggle={() => setShowRegPassword((v) => !v)}
                autoComplete="new-password"
                {...registerField("password")}
              />
              {registerErrors.password && (
                <p className="login-page__field-error">{registerErrors.password.message}</p>
              )}
              <AuthField
                icon="/assets/khua/icon-lock.svg"
                placeholder="Nhập lại mật khẩu"
                showToggle
                visible={showRegPassword2}
                onToggle={() => setShowRegPassword2((v) => !v)}
                autoComplete="new-password"
                {...registerField("password_confirmation")}
              />
              {registerErrors.password_confirmation && (
                <p className="login-page__field-error">
                  {registerErrors.password_confirmation.message}
                </p>
              )}
              <AuthField
                icon="/assets/khua/icon-shield.svg"
                placeholder="Số điện thoại"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                {...registerField("phone_number")}
              />
              {registerErrors.phone_number && (
                <p className="login-page__field-error">{registerErrors.phone_number.message}</p>
              )}
              <AuthField
                icon="/assets/khua/icon-shield.svg"
                placeholder="Mã giới thiệu (nếu có)"
                autoComplete="off"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
              <label className="mm-login__check">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                Tôi đồng ý với Điều khoản & Chính sách bảo mật
              </label>
              <button type="submit" className="mm-login__submit">
                Đăng ký ngay
                <img src={asset("icon-chevron.svg")} alt="" />
              </button>
            </form>
          )}

          <div className="mm-login__or">
            <span>{authView === "login" ? "HOẶC" : "HOẶC ĐÃ CÓ TÀI KHOẢN"}</span>
          </div>
          <button
            type="button"
            className="mm-login__alt"
            onClick={authView === "login" ? goRegister : goLogin}
          >
            <img src={asset("icon-shield.svg")} alt="" />
            {authView === "login" ? "Tạo tài khoản mới" : "Đăng nhập ngay"}
          </button>

          <div className="mm-login__foot">
            <i />
            <span>
              {authView === "login"
                ? "TERMINAL v2.8.4"
                : "TERMINAL V2.8.4 // REGISTRATION_PROTOCOL"}
            </span>
            <i />
          </div>
        </section>
      </div>

      <div className="mm-login__hud">
        <div className="mm-login__badge">
          <p>
            <img src={asset("icon-antenna.svg")} alt="" /> SYSTEM STATUS
          </p>
          <strong>
            <i className="mm-login__pulse" /> ONLINE
          </strong>
        </div>
        <div className="mm-login__badge">
          <p>SECURE CONNECTION</p>
          <strong>
            <img src={asset("icon-lock-sm.svg")} alt="" /> 256-BIT ENCRYPTION
          </strong>
        </div>
      </div>
    </div>
  );
};

export default Login;
