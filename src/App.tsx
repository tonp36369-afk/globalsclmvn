import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

/** ====== CẤU HÌNH EMAILJS ====== */
const SERVICE_ID = "service_xxxxxx"; // Thay bằng Service ID của bạn
const TEMPLATE_ID = "template_lngj6w8"; // Template ID có vẻ đúng
const PUBLIC_KEY = "public_key_xxxxx"; // Thay bằng Public Key của bạn

/** ====== STYLE TIỆN DỤNG ====== */
const sectionWrap: React.CSSProperties = { maxWidth: 1100, margin: "0 auto", padding: "0 20px" };
const h2: React.CSSProperties = { fontSize: "2rem", fontWeight: 800, color: "#0a2e65", textAlign: "center" };
const pLead: React.CSSProperties = { textAlign: "center", color: "#475569", maxWidth: 820, margin: "12px auto 0" };
const btn: React.CSSProperties = {
  display: "inline-block",
  background: "#0a2e65",
  color: "#fff",
  padding: "12px 22px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  boxShadow: "0 6px 14px rgba(10,46,101,.25)",
};
const btnGhost: React.CSSProperties = {
  ...btn,
  background: "transparent",
  color: "#0a2e65",
  border: "2px solid #0a2e65",
  boxShadow: "none",
};

export default function App() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<null | "sending" | "ok" | "err">(null);
  const [showForm, setShowForm] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Danh sách ảnh banner
  const bannerImages = [
    "/banner-sclm.jpg",
    "/banner3.jpg",
    "/banner4.jpg",
    "/banner5.jpg",
  ];

  // Tự động chuyển slide mỗi 5 giây
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus("ok");
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setStatus("err");
    }
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif", color: "#0f172a" }}>
      {/* ===== HEADER ===== */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(10,46,101,0.9)",
          backdropFilter: "saturate(180%) blur(6px)",
          borderBottom: "1px solid rgba(255,255,255,.12)",
        }}
      >
        <div style={{ ...sectionWrap, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/logo-sclm.png" alt="SCLM" style={{ width: 44, height: 44, borderRadius: "50%" }} />
            <div style={{ color: "white", fontWeight: 800, letterSpacing: 0.5 }}>GLOBAL SCLM</div>
          </div>
          <nav style={{ display: "flex", gap: 18 }}>
            <a href="#about" style={navA}>Giới thiệu</a>
            <a href="#solutions" style={navA}>Giải pháp</a>
            <a href="#partners" style={navA}>Hợp tác</a>
            <a href="#contact" style={navA}>Liên hệ</a>
          </nav>
          <a href="#contact" style={{ ...btn, padding: "10px 16px" }}>Trở thành đối tác</a>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section
        style={{
          background: "linear-gradient(140deg, #0a2e65 0%, #154a9a 50%, #eaf3ff 100%)",
          color: "white",
          padding: "40px 0 30px",
          textAlign: "center",
        }}
      >
        <div style={sectionWrap}>
          <img src="/logo-sclm.png" alt="SCLM" style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 12px" }} />
          <h1 style={{ fontSize: "2.8rem", fontWeight: 900, lineHeight: 1.15, marginBottom: 10 }}>
            Global Supply Chain & Logistics Management
          </h1>
          <p style={{ fontSize: 18, opacity: 0.92, maxWidth: 860, margin: "0 auto 24px" }}>
            Kết nối – Cung ứng – Phát triển toàn cầu. Nền tảng hỗ trợ doanh nghiệp Việt tham gia chuỗi cung ứng quốc tế bằng công nghệ.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://sclm.vn" target="_blank" rel="noreferrer" style={btn}>Truy cập website chính thức</a>
            <a href="#contact" style={btnGhost}>Đăng ký hợp tác</a>
          </div>

          {/* Banner Slider */}
          <div style={{ marginTop: 18, position: 'relative', maxWidth: 1100, margin: '18px auto 0' }}>
            {/* Ảnh banner */}
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, boxShadow: "0 12px 28px rgba(0,0,0,.25)" }}>
              <img
                src={bannerImages[currentSlide]}
                alt={`SCLM Banner ${currentSlide + 1}`}
                style={{ 
                  width: "100%", 
                  height: 400,
                  objectFit: 'cover',
                  transition: 'opacity 0.5s ease-in-out',
                }}
              />
              
              {/* Nút Previous */}
              <button
                onClick={prevSlide}
                style={{
                  position: 'absolute',
                  left: 20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 50,
                  height: 50,
                  fontSize: 24,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}
              >
                ‹
              </button>

              {/* Nút Next */}
              <button
                onClick={nextSlide}
                style={{
                  position: 'absolute',
                  right: 20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 50,
                  height: 50,
                  fontSize: 24,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}
              >
                ›
              </button>

              {/* Dots indicator */}
              <div style={{ 
                position: 'absolute', 
                bottom: 20, 
                left: '50%', 
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 8,
              }}>
                {bannerImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    style={{
                      width: currentSlide === index ? 24 : 12,
                      height: 12,
                      borderRadius: 6,
                      border: 'none',
                      background: currentSlide === index ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT INFO ===== */}
      <section style={{ padding: "40px 0", background: "#f8fbff", textAlign: "center" }}>
        <div style={sectionWrap}>
          <ul style={{ display: "flex", justifyContent: "center", gap: "40px", color: "#0a2e65", lineHeight: 1.8, listStyle: "none", margin: 0, padding: 0 }}>
            <li>✉️ Email: <b>sclm.customer@gmail.com</b></li>
            <li>📞 Hotline: <b>0582 779 977</b> | <b>0947 886 611</b></li>
            <li>🌐 Website: <b>sclm.vn</b></li>
          </ul>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" style={{ padding: "70px 0", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div style={sectionWrap}>
          <h2 style={{ ...h2, color: "#ffffff" }}>Về SCLM Global</h2>
          
          {/* Khung văn bản nổi bật */}
          <div style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: 16,
            padding: "30px 40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            maxWidth: 820,
            margin: "20px auto 0",
          }}>
            <p style={{ textAlign: "center", color: "#1e293b", fontSize: 17, lineHeight: 1.7, margin: 0 }}>
              SCLM là nền tảng kết nối doanh nghiệp với chuỗi cung ứng quốc tế. Chúng tôi tối ưu logistics, kho vận, tích hợp công nghệ,
              và mô hình cửa hàng trung gian để doanh nghiệp tăng tốc không cần ôm hàng hay lo đầu ra.
            </p>
          </div>

          {/* Tagline moved up from tax section */}
          <p style={{
            textAlign: "center",
            color: "#ffffff",
            fontSize: 18,
            fontWeight: 800,
            marginTop: 16,
            letterSpacing: 0.2,
          }}>
            "SCLM GLOBAL – Nơi phụ nữ bắt đầu hành trình kinh doanh tự chủ"
          </p>

          {/* Nội dung về phụ nữ khởi nghiệp */}
          <div style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: 12,
            padding: "24px 32px",
            maxWidth: 820,
            margin: "20px auto 0",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}>
            <p style={{ textAlign: "center", color: "#ffffff", fontSize: 16, lineHeight: 1.7, margin: "0 0 16px 0" }}>
              <strong>SCLM GLOBAL</strong> đồng hành cùng phụ nữ Việt trong hành trình khởi nghiệp, cung cấp kiến thức, công cụ và giải pháp toàn diện để tự chủ tài chính, phát triển thương hiệu và mở rộng thị trường.
            </p>
            <ul style={{ 
              textAlign: "left", 
              color: "#ffffff", 
              fontSize: 15, 
              lineHeight: 1.8, 
              margin: 0, 
              paddingLeft: 20,
              listStyleType: "disc"
            }}>
              <li>Phụ nữ nội trợ – muốn chủ động tài chính, có thời gian linh hoạt.</li>
              <li>Phụ nữ chưa từng kinh doanh – nhưng có đam mê và mong muốn phát triển.</li>
              <li>Phụ nữ kinh doanh nhỏ lẻ – muốn mở rộng và phát triển bền vững.</li>
            </ul>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginTop: 40 }}>
            {[
              ["2.000+", "Nhà cung ứng kết nối"],
              ["25+", "Quốc gia hợp tác"],
              ["10.000+", "Đơn hàng/tháng"],
              ["24/7", "Hỗ trợ – đối soát minh bạch"],
            ].map(([num, label]) => (
              <div key={label} style={{
                ...statBox,
                background: "rgba(255,255,255,0.95)",
                border: "2px solid rgba(255,255,255,0.3)",
              }}>
                <div style={{ fontSize: 34, fontWeight: 900, color: "#667eea" }}>{num}</div>
                <div style={{ color: "#475569" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REGISTER FORM ===== */}
      <section id="register" style={{ padding: "70px 0", background: "#f4f6f9" }}>
        <div style={sectionWrap}>
          <h2 style={h2}>Đăng ký tham gia hoạt động tiếp nhận xử lý trung gian</h2>
          <p style={pLead}>Để tham gia chương trình hoạt động của SCLM, vui lòng bấm vào nút dưới đây để mở biểu mẫu đăng ký chính thức. Sau khi hoàn tất, đội ngũ SCLM sẽ liên hệ để xác minh và hướng dẫn chi tiết.</p>
          
          {/* Hỗ trợ người dùng Việt Nam */}
          <div style={{
            maxWidth: 820,
            margin: "40px auto",
            background: "linear-gradient(135deg, #0a2e65 0%, #154a9a 100%)",
            borderRadius: 16,
            padding: "32px 40px",
            boxShadow: "0 10px 30px rgba(10,46,101,0.2)",
            border: "2px solid rgba(255,255,255,0.1)",
          }}>
            <h3 style={{
              margin: "0 0 20px 0",
              fontSize: "1.6rem",
              fontWeight: 800,
              color: "#ffffff",
              textAlign: "center",
              letterSpacing: 0.3,
            }}>
              🇻🇳 Hiện tại Global SCLM Hỗ trợ người dùng Việt Nam – Bắt đầu dễ dàng cùng SCLM
            </h3>
            
            <div style={{ color: "#ffffff", fontSize: 15.5, lineHeight: 1.8 }}>
              <p style={{ margin: "0 0 16px 0" }}>
                Hiện tại, <strong>SCLM Global</strong> đang triển khai chương trình hỗ trợ người dùng tại Việt Nam trong việc mở tài khoản và kích hoạt cơ sở tiếp nhận & xử lý thông tin trung gian ngay trên hệ thống.
              </p>
              
              <p style={{ margin: "0 0 16px 0", background: "rgba(255,255,255,0.1)", padding: "12px 16px", borderRadius: 8, borderLeft: "3px solid #facc15" }}>
                Người dùng có thể bắt đầu tham gia chỉ với ngưỡng hoạt động từ <strong style={{ color: "#facc15" }}>30 USD</strong>, để sở hữu cơ sở tiếp nhận – xử lý thông tin và tạo lợi nhuận mỗi ngày ngay tại nhà thông qua hệ thống vận hành tự động của SCLM.
              </p>
              
              <p style={{ margin: "0 0 12px 0" }}>
                Nhằm đảm bảo an toàn và tính minh bạch tuyệt đối, SCLM đã tích hợp cơ chế tự động hóa kích hoạt và xử lý giao dịch ngay lập tức trên nền tảng.
              </p>
              
              <p style={{ margin: 0, opacity: 0.95 }}>
                Điều này giúp người dùng giao dịch nhanh hơn, xử lý linh hoạt hơn và trải nghiệm một hệ thống vận hành ổn định, thông minh, an toàn tuyệt đối.
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center", margin: "30px 0" }}>
            <button 
              onClick={() => setShowForm(prev => !prev)} 
              style={{
                ...btn,
                background: "#00A9FF",
                border: "none",
                padding: "14px 28px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Mở biểu mẫu đăng ký SCLM
            </button>
          </div>

          {showForm && (
            <div>
              <form ref={formRef} onSubmit={sendEmail} style={{
            maxWidth: 650,
            margin: "40px auto",
            background: "linear-gradient(180deg,#0a2e65,#0f3b73)",
            color: '#ffffff',
            padding: 30,
            borderRadius: 16,
            boxShadow: "0 10px 30px rgba(2,6,23,.25)",
          }}>
            <div style={{ display: "grid", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Tên</label>
                <input type="text" name="ten" required style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Tuổi</label>
                <input type="number" name="tuoi" required style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Kinh nghiệm làm việc online</label>
                <input type="text" name="kinh_nghiem" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Công việc hiện tại</label>
                <input type="text" name="cong_viec" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Quốc gia hoạt động</label>
                <input type="text" name="quoc_gia" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Ngưỡng hoạt động mong muốn (USD)</label>
                <input type="number" name="von" required style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Thu nhập lý tưởng hàng tháng (USD)</label>
                <input type="number" name="thu_nhap" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" name="email" required style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Số điện thoại</label>
                <input type="text" name="sdt" required style={inputStyle} />
              </div>

              <button type="submit" style={{
                ...btn,
                width: "100%",
                background: "linear-gradient(90deg, #0a2e65, #1e40af)",
                border: "none",
                padding: "14px 22px",
                cursor: "pointer",
                transition: "opacity 0.2s",
                opacity: status === "sending" ? 0.7 : 1,
              }}>
                {status === "sending" ? "Đang gửi..." : "Gửi đăng ký"}
              </button>

              {status === "ok" && (
                <div style={{ color: "#059669", fontWeight: 600, textAlign: "center" }}>
                  ✓ Đăng ký thành công! Chúng tôi sẽ liên hệ lại với bạn sớm.
                </div>
              )}

              {status === "err" && (
                <div style={{ color: "#dc2626", fontWeight: 600, textAlign: "center" }}>
                  ✕ Có lỗi xảy ra. Vui lòng thử lại sau.
                </div>
              )}
            </div>
            </form>

            {/* External Cục Thuế logo requested */}
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <a href="https://dichvucong.gov.vn" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://dichvucong.gov.vn/p/home/theme/img/header/logo.png"
                  alt="Logo Cục Thuế (Nguồn: dichvucong.gov.vn)"
                  style={{ 
                    width: 140, 
                    height: 'auto', 
                    objectFit: 'contain', 
                    borderRadius: 6,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </a>
            </div>

            {/* Thông báo tuân thủ quy định */}
            <div style={{
              maxWidth: 650,
              margin: '20px auto',
              padding: '20px 24px',
              background: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
              borderLeft: '4px solid #f57c00',
              borderRadius: 12,
              boxShadow: '0 4px 12px rgba(245,124,0,0.15)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ fontSize: 24, marginTop: 2 }}>⚠️</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    margin: '0 0 12px 0', 
                    fontSize: 16, 
                    fontWeight: 700, 
                    color: '#e65100',
                    letterSpacing: 0.3
                  }}>
                    Vui lòng tuân thủ quy định & hoạt động minh bạch theo chính sách của SCLM
                  </h4>
                  <p style={{ margin: '0 0 8px 0', fontSize: 14, color: '#5d4037', lineHeight: 1.6 }}>
                    Hệ thống SCLM là đơn vị trung gian tiếp nhận và xử lý thông tin cho các doanh nghiệp, hoạt động minh bạch, tuân thủ pháp luật Việt Nam.
                  </p>
                  <p style={{ margin: '0 0 8px 0', fontSize: 14, color: '#5d4037', lineHeight: 1.6 }}>
                    Toàn bộ hoạt động của hệ thống được đăng ký và quản lý theo quy định của Cục Thuế Nhà nước Trung ương.
                  </p>
                  <p style={{ margin: 0, fontSize: 14, color: '#5d4037', lineHeight: 1.6, fontWeight: 600 }}>
                    <span style={{ color: '#1976d2' }}>✓</span> SCLM Global – đã được Meta xác minh tích xanh doanh nghiệp.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ 
              marginTop: '30px',
              padding: '20px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.15)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <img src="/logo-thue.png" alt="Logo Cục Thuế" style={{ 
                  width: '70px',
                  height: '70px',
                  objectFit: 'contain',
                  background: '#fff',
                  padding: '4px',
                  borderRadius: '8px'
                }} />
                <div style={{ color: '#fff' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                    Thuế Việt Nam - Cục Thuế
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    Cơ Quan Chủ Quản: Bộ Tài Chính • Số Giấy Phép: 207/GP-BC
                  </div>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                marginTop: '10px'
              }}>
                <svg 
                  viewBox="0 0 24 24" 
                  style={{ width: '24px', height: '24px', fill: '#ffffff' }}
                >
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
                </svg>
                <a href="http://www.facebook.sclm.global.vn" target="_blank" rel="noopener noreferrer" style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: '600'
                }}>
                  www.facebook.sclm.global.vn
                </a>
              </div>
            </div>

            <p style={{ textAlign: 'center', marginTop: '30px', color: '#64748b', fontSize: '14px' }}>
              © 2025 SCLM Global. All rights reserved.
            </p>
          </div>
          )}
        </div>
      </section>      {/* ===== SOLUTIONS ===== */}
      <section id="solutions" style={{ padding: "70px 0" }}>
        <div style={sectionWrap}>
          <h2 style={h2}>Giải pháp & Mô hình nổi bật</h2>
          <p style={pLead}>Thiết kế để dễ bắt đầu – ít rủi ro – tăng trưởng bền vững.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, marginTop: 28 }}>
            {cards.map((c) => (
              <div key={c.title} style={card}>
                <div style={cardIcon}>{c.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>{c.title}</div>
                <div style={{ color: "#475569", fontSize: 15 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARTNERS / CTA ===== */}
      <section id="partners" style={{ padding: "60px 0", background: "#f2f7ff" }}>
        <div style={{ ...sectionWrap, textAlign: "center" }}>
          <h2 style={h2}>💥 Sẵn sàng mở rộng thương hiệu cùng SCLM?</h2>
          <p style={pLead}>
            Tham gia mạng lưới đối tác SCLM – nơi hội tụ doanh nghiệp năng động, hệ thống vận hành minh bạch, cùng công cụ quản lý toàn diện trên điện thoại & laptop, giúp bạn kiểm soát hiệu quả mọi hoạt động kinh doanh mọi lúc – mọi nơi.
          </p>
          <p style={{ ...pLead, marginTop: 16, fontWeight: 600, color: "#0a2e65" }}>
            🚀 SCLM không chỉ mang đến nền tảng công nghệ mà còn là người đồng hành chiến lược, hỗ trợ xây dựng thương hiệu, tối ưu vận hành và mở rộng quy mô bền vững.
          </p>
          <div style={{ marginTop: 18 }}>
            <a href="#contact" style={btn}>Đăng ký hợp tác ngay</a>
          </div>
        </div>
      </section>

      {/* ===== CONTACT (FORM GỬI MAIL THẬT) ===== */}
      <section id="contact" style={{ padding: "70px 0", background: "linear-gradient(180deg, #ffffff, #f4f8ff)" }}>
        <div style={{ ...sectionWrap, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 22, alignItems: "center" }}>
          {/* left */}
          <div>
            <h2 style={{ ...h2, textAlign: "left" }}>Liên hệ & Hợp tác</h2>
            <p style={{ color: "#475569", marginTop: 8 }}>
              Điền thông tin để đội ngũ SCLM liên hệ trong ngày. Mọi dữ liệu được **đối soát minh bạch** trong hệ thống.
            </p>
          </div>

          {/* right: FORM */}
          <form ref={formRef} onSubmit={sendEmail} style={formStyle}>
            <input name="from_name" placeholder="Họ và tên" required style={input} />
            <input name="from_email" type="email" placeholder="Email" required style={input} />
            <input name="phone" placeholder="Số điện thoại" required style={input} />
            <textarea name="message" placeholder="Nội dung cần liên hệ" rows={5} required style={input} />
            <button type="submit" style={btn}>
              {status === "sending" ? "Đang gửi..." : "Gửi liên hệ"}
            </button>
            {status === "ok" && <div style={noteOk}>✅ Gửi thành công! Anh/chị vui lòng kiểm tra hộp thư.</div>}
            {status === "err" && <div style={noteErr}>❌ Gửi thất bại! Vui lòng thử lại sau.</div>}
          </form>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      {/* ===== TAX / LEGAL (moved to bottom) ===== */}
      <section id="tax" style={{ padding: "40px 0", background: "linear-gradient(180deg,#0d1728,#141c33)" }}>
        <div style={{ ...sectionWrap, maxWidth: 1000 }}>
          <div style={{
            padding: 22,
            borderRadius: 14,
            background: "linear-gradient(180deg,#0d1728,#141c33)",
            border: "1px solid rgba(250,204,21,0.28)",
            boxShadow: "0 0 18px rgba(250,204,21,0.06)",
            color: '#e2e8f0'
          }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 12 }}>
              <img src="https://dangky.dichvucong.gov.vn/content/698e3c6e522f6948637426e907ba3188.svg" alt="Logo Cục Thuế" style={{ width: 110, height: 110, objectFit: 'contain', borderRadius: 8, background: '#fff', padding: 6 }} />
              <div>
                <h3 style={{ margin: 0, fontSize: 18, color: '#facc15' }}>🇻🇳 GIẢM THUẾ GIAO THƯƠNG — HỖ TRỢ DOANH NGHIỆP VIỆT NAM</h3>
                <p style={{ margin: '8px 0 0', color: '#94a3b8', maxWidth: 720 }}>
                  Nền tảng được du nhập từ Pháp và ký kết nhằm hỗ trợ doanh nghiệp Việt Nam tránh được lệnh trừng phạt thuế của Mỹ. Văn kiện do Thủ Tướng Chính Phủ <strong>Phạm Minh Chính</strong> ký ngày <strong>21/03/2022</strong> tại Hà Nội, chỉ đạo toàn bộ dự án nhằm giảm chi phí doanh nghiệp từ <strong>13% – 18%</strong> trong hoạt động sản xuất – hậu cần – xuất nhập khẩu – thương mại điện tử thông qua chuỗi tối ưu hoá và chính sách giao thương, thuế quan nhập khẩu.
                </p>
              </div>
            </div>

            <div style={{ marginTop: 6, color: '#94a3b8', lineHeight: 1.6 }}>
              <p style={{ margin: '8px 0' }}>
                Chi Cục Thuế hỗ trợ đóng thuế tại chỗ lần đầu, cấp chứng nhận và cho phép truy cập vào <strong>Trang Thuế Doanh Nghiệp Quốc Gia</strong> theo bộ luật hiện hành được sửa đổi, bổ sung dựa trên Hiến pháp nước CHXHCN Việt Nam năm 1992 và Nghị quyết số 51/2001/QH10.
              </p>
              <p style={{ margin: '8px 0' }}>
                Kể từ lần sau, doanh nghiệp chỉ cần nhận sao kê ngân hàng và đóng thuế online — không cần đến Kho Bạc Nhà Nước. Chính sách này góp phần hiện đại hoá quy trình quản lý, giảm thủ tục hành chính theo <strong>Nghị quyết 136/NQ-CP (27/12/2017)</strong> và <strong>Nghị quyết 66/NQ-CP (26/3/2025)</strong>.
              </p>
            </div>

            <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: 18, alignItems: 'flex-start' }}>
              <div style={{ minWidth: 120 }}>
                <img src="https://dangky.dichvucong.gov.vn/content/698e3c6e522f6948637426e907ba3188.svg" alt="Logo Cục Thuế" style={{ width: 100, height: 100, objectFit: 'contain' }} />
              </div>
              <div style={{ color: '#e2e8f0' }}>
                <p style={{ margin: 0, fontWeight: 700 }}>Thuế Việt Nam - Cục Thuế</p>
                <p style={{ margin: '6px 0 0', color: '#94a3b8' }}>Cơ Quan Chủ Quản: Bộ Tài Chính • Số Giấy Phép: 207/GP-BC</p>
                <div style={{ marginTop: 10, color: '#cbd5e1' }}>
                  <p style={{ margin: 0, fontWeight: 700 }}>SCLM Global Supply Chain & Logistics, Management</p>
                  <p style={{ margin: '6px 0 0', color: '#94a3b8' }}>Tên Quốc Tế: SCLM TM DV COMPANY LIMITED</p>
                  <p style={{ margin: '6px 0 0', color: '#94a3b8' }}>Tên Viết Tắt: SCLM TM DV CO., LTD</p>
                  <p style={{ margin: '6px 0 0', color: '#94a3b8' }}>Địa chỉ thuế: 10 đường Nguyễn Phong Sắc, phường Dịch Vọng, quận Cầu Giấy, TP Hà Nội.</p>
                  <p style={{ margin: '6px 0 0', color: '#94a3b8' }}>Số điện thoại: 024.3793 0142</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: "#0a2e65", color: "white", padding: "22px 0" }}>
        <div style={{ ...sectionWrap, display: "flex", gap: 12, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo-sclm.png" alt="SCLM" style={{ width: 36, height: 36, borderRadius: "50%" }} />
            <div style={{ fontWeight: 800, letterSpacing: .3 }}>GLOBAL SCLM</div>
          </div>
          <div style={{ opacity: .9, fontSize: 14 }}>© 2025 SCLM Global. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

/** ====== STYLES BỔ TRỢ ====== */
const navA: React.CSSProperties = { color: "white", textDecoration: "none", fontWeight: 600, opacity: .9 };
const statBox: React.CSSProperties = {
  background: "white",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 6px 18px rgba(2,6,23,.06)",
  textAlign: "center",
};
const card: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 10px 22px rgba(2,6,23,.06)",
  border: "1px solid #e2e8f0",
};
const cardIcon: React.CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: 12,
  background: "#0a2e65",
  color: "white",
  display: "grid",
  placeItems: "center",
  marginBottom: 10,
  fontWeight: 800,
};
const formStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 10px 22px rgba(2,6,23,.06)",
  border: "1px solid #e2e8f0",
  display: "grid",
  gap: 12,
};
const input: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #cbd5e1",
  outline: "none",
  fontSize: 15,
};
const noteOk: React.CSSProperties = { color: "#0a2e65", fontWeight: 600 };
const noteErr: React.CSSProperties = { color: "#b91c1c", fontWeight: 600 };

/** ====== FORM STYLES ====== */
const labelStyle: React.CSSProperties = {
  display: "block",
  fontWeight: 600,
  color: "#ffffff",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.04)",
  color: "#ffffff",
  outline: "none",
  fontSize: 15,
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

/** ====== NỘI DUNG THẺ GIẢI PHÁP ====== */
const cards = [
  {
    icon: "📦",
    title: "Logistics thông minh",
    desc: "Tối ưu kho - vận tải - đối soát bằng công nghệ và dữ liệu thời gian thực.",
  },
  {
    icon: "🌐",
    title: "Cửa hàng trung gian",
    desc: "Nhận hàng → gửi kho cung ứng. Không cần bán hàng, không ôm hàng.",
  },
  {
    icon: "🚀",
    title: "Khởi nghiệp chuỗi cung ứng",
    desc: "Mô hình nhẹ, minh bạch, tăng thu nhập theo hiệu quả vận hành.",
  },
  {
    icon: "🤝",
    title: "Đối tác toàn cầu",
    desc: "Kết nối 2.000+ nhà cung ứng, vận hành đa quốc gia, hỗ trợ 24/7.",
  },
];
