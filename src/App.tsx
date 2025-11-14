      {/* Nút shortcut nổi tới vòng quay may mắn */}
      <button
        style={{
          position: 'fixed',
          right: 24,
          bottom: 32,
          zIndex: 9999,
          background: '#FFD700',
          color: '#0a2e65',
          fontWeight: 800,
          fontSize: 18,
          border: 'none',
          borderRadius: '50%',
          width: 64,
          height: 64,
          boxShadow: '0 4px 18px rgba(0,0,0,0.12)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
        }}
        title="Vòng Quay May Mắn"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        🎡
      </button>
      {/* Vòng quay may mắn - ảnh và nút QUAY NGAY duy nhất */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '32px 0' }}>
        <img src="/vong-quay-may-man.png" alt="Vòng quay may mắn" style={{ maxWidth: '400px', width: '100%', height: 'auto', borderRadius: '16px' }} />
        <button
          style={{
            marginTop: 18,
            background: '#FFD700',
            color: '#0a2e65',
            fontWeight: 800,
            fontSize: 22,
            border: 'none',
            borderRadius: 32,
            padding: '18px 48px',
            boxShadow: '0 4px 18px rgba(0,0,0,0.10)',
            cursor: 'pointer',
            letterSpacing: 1.2,
            transition: 'background 0.2s',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          QUAY NGAY
        </button>
      </div>
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
import ZaloSupportWidget from "./ZaloSupportWidget";

/** ====== CẤU HÌNH EMAILJS ====== */
const SERVICE_ID = "service_tb5zo3i"; // Service ID đã được cấu hình
const TEMPLATE_ID = "template_kkjhug9"; // Template ID: Contact Us
const PUBLIC_KEY = "OfCOrhRJrYm5SmrnF"; // Public Key đã được cấu hình

/** ====== STYLE TIỆN DỤNG ====== */
const sectionWrap: React.CSSProperties = { 
  maxWidth: 1100, 
  margin: "0 auto", 
  padding: "0 20px",
  width: "100%"
};
const h2: React.CSSProperties = { 
  fontSize: "clamp(1.5rem, 5vw, 2rem)", 
  fontWeight: 800, 
  color: "#0a2e65", 
  textAlign: "center" 
};
const pLead: React.CSSProperties = { 
  textAlign: "center", 
  color: "#475569", 
  maxWidth: 820, 
  margin: "12px auto 0",
  fontSize: "clamp(0.95rem, 2.5vw, 1rem)"
};
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
  color: "#ffffff",
  border: "2px solid #ffffff",
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
    "/banner5.jpg",
    "/banner6.jpg",
    "/banner7.jpg",
    "/banner8.jpg",
    "/banner11.jpg",
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
          background: "rgba(10,46,101,0.95)",
          backdropFilter: "saturate(180%) blur(6px)",
          borderBottom: "1px solid rgba(255,255,255,.12)",
        }}
      >
        <div style={{ ...sectionWrap, display: "flex", flexDirection: "column", alignItems: "stretch", gap: 2, padding: "0 0 0 0" }}>
          {/* Thông tin liên hệ nhỏ phía trên */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            alignItems: "center",
            fontSize: 13,
            color: "#e0e7ef",
            gap: 18,
            padding: "2px 12px 0 12px",
            minHeight: 22,
            letterSpacing: 0.1,
          }}>
            <span>✉️ <b style={{ color: "#fff" }}>contact@sclm.vn</b></span>
            <span>📞 <b style={{ color: "#fff" }}>+84582 77 99 77</b></span>
          </div>
          {/* Dòng chính header */}
          <div style={{
            ...sectionWrap,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "6px 10px 6px 10px",
            minHeight: 48,
            flexWrap: "wrap",
            gap: 8,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              <img src="/logo-sclm.png" alt="SCLM" style={{ width: 38, height: 38, borderRadius: "50%", animation: "none", transition: "none" }} />
              <div style={{ color: "white", fontWeight: 800, letterSpacing: 0.5, fontSize: 18, whiteSpace: "nowrap" }}>GLOBAL SCLM</div>
            </div>
            <nav style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#about" style={navA}>Giới thiệu</a>
              <a href="#solutions" style={navA}>Giải pháp</a>
              <a href="https://connect.viber.com/business/ea6b050a-b4c1-11f0-b475-16a159ce570c" target="_blank" rel="noreferrer" style={navA}>Hợp tác</a>
              <a href="#contact" style={navA}>Liên hệ</a>
            </nav>
            <a href="https://connect.viber.com/business/ea6b050a-b4c1-11f0-b475-16a159ce570c" target="_blank" rel="noreferrer" style={{ ...btn, padding: "8px 12px", fontSize: 14 }}>Trở thành đối tác</a>
          </div>
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
          <h1 style={{ fontSize: "clamp(1.75rem, 6vw, 2.8rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: 10 }}>
            Global Supply Chain & Logistics Management
          </h1>
          <p style={{ fontSize: "clamp(0.95rem, 3vw, 18px)", opacity: 0.92, maxWidth: 860, margin: "0 auto 24px", padding: "0 10px" }}>
            Kết nối – Cung ứng – Phát triển toàn cầu. Nền tảng hỗ trợ doanh nghiệp Việt tham gia chuỗi cung ứng quốc tế bằng công nghệ.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://sclm.vn" target="_blank" rel="noreferrer" style={btn}>Truy cập website chính thức</a>
            <a href="https://www.facebook.com/sclm.global.vn/" target="_blank" rel="noreferrer" style={btnGhost}>Truy cập Fanpage chính thức</a>
          </div>

          {/* Banner Slider */}
          <div style={{ marginTop: 18, position: 'relative', maxWidth: 1400, margin: '18px auto 0', padding: 0 }}>
            {/* Ảnh banner */}
            <div
              className="banner-slider"
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 16,
                boxShadow: "0 8px 18px rgba(0,0,0,.18)",
                border: '2px solid #FFD700',
                minHeight: 0,
                margin: '0 auto',
                width: '100%',
                background: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                maxWidth: 1200,
              }}
            >
              <img
                src={bannerImages[currentSlide]}
                alt={`SCLM Banner ${currentSlide + 1}`}
                style={{
                  width: '100%',
                  maxWidth: 1200,
                  height: 'clamp(180px, 38vw, 340px)',
                  objectFit: 'contain',
                  transition: 'opacity 0.5s ease-in-out',
                  borderBottom: '1px solid #e2e8f0',
                  background: 'transparent',
                  display: 'block',
                  margin: '0 auto',
                  padding: 0,
                }}
              />
              {/* Đường kẻ phân cách */}
              <div style={{
                width: '100%',
                height: 3,
                background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 100%)',
                position: 'absolute',
                bottom: 0,
                left: 0,
                opacity: 0.85,
              }} />
              {/* Nút Previous */}
              <button
                onClick={prevSlide}
                style={{
                  position: 'absolute',
                  left: 4,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.92)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 26,
                  height: 26,
                  fontSize: 14,
                  cursor: 'pointer',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
                  transition: 'all 0.3s',
                  zIndex: 2,
                }}
                aria-label="Previous banner"
              >
                ‹
              </button>
              {/* Nút Next */}
              <button
                onClick={nextSlide}
                style={{
                  position: 'absolute',
                  right: 4,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.92)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 26,
                  height: 26,
                  fontSize: 14,
                  cursor: 'pointer',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
                  transition: 'all 0.3s',
                  zIndex: 2,
                }}
                aria-label="Next banner"
              >
                ›
              </button>
              {/* Dots indicator */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 4,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 3,
                  zIndex: 1,
                }}
              >
                {bannerImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    style={{
                      width: currentSlide === index ? 10 : 6,
                      height: 6,
                      borderRadius: 3,
                      border: 'none',
                      background: currentSlide === index ? '#FFD700' : 'rgba(255,255,255,0.7)',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      margin: 0,
                      padding: 0,
                    }}
                    aria-label={`Chọn banner ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT INFO ===== */}
      <section className="contact-info-section" style={{ padding: "40px 0", background: "#f8fbff", textAlign: "center" }}>
        <div style={{ ...sectionWrap, padding: 0 }}>
          <ul style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "24px",
            color: "#0a2e65",
            lineHeight: 1.7,
            listStyle: "none",
            margin: 0,
            padding: 0,
            flexWrap: "wrap",
            fontSize: 15,
            fontWeight: 500,
            wordBreak: "break-word"
          }}>
            <li>✉️ Email: <b>contact@sclm.vn</b></li>
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

          {/* Thay thế bằng nội dung về cửa hàng trung gian và chính sách hỗ trợ */}
          <div style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: 12,
            padding: "28px 32px",
            maxWidth: 900,
            margin: "24px auto 0",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}>
            <p style={{ textAlign: "center", color: "#fff", fontSize: 18, fontWeight: 700, margin: "0 0 18px 0", lineHeight: 1.7 }}>
              Cửa hàng trung gian là nơi tiếp nhận thông tin đơn hàng, xử lý gửi về kho cung ứng để kho tiến hành phân loại và vận chuyển đến nơi nhận. Tất cả đơn hàng của các nước được đưa về kho cung ứng tập kết, giúp quá trình phân loại, đóng gói và vận chuyển đến nơi nhận diễn ra nhanh chóng, giúp doanh nghiệp giảm từ <b>18 đến 20% chi phí và thời gian</b>.
            </p>
            <p style={{ textAlign: "center", color: "#fff", fontSize: 16, margin: "0 0 14px 0", lineHeight: 1.7 }}>
              Khi cửa hàng của bạn có đơn hàng, giao diện sẽ hiển thị số lượng, giá trị và chiết khấu rõ ràng để bạn dễ dàng theo dõi, kiểm soát. Bạn chỉ cần xử lý đơn hàng bằng một nút xác nhận gửi đơn hàng thành công là đã hoàn thành công việc của mình. Hãy thường xuyên truy cập cửa hàng để kiểm tra đơn hàng mới!
            </p>
            <p style={{ textAlign: "center", color: "#fff", fontSize: 16, margin: "0 0 14px 0", lineHeight: 1.7 }}>
              Nếu lo ngại về vốn vận hành, đừng lo! <b>Ngưỡng hoạt động rất thấp</b>, phù hợp với tất cả những người mới khởi nghiệp và chưa có đủ vốn. Đây là doanh nghiệp được nhà nước hỗ trợ nên ngưỡng hoạt động không quá cao.
            </p>
            <p style={{ textAlign: "center", color: "#fff", fontSize: 16, margin: 0, lineHeight: 1.7 }}>
              <b>Chính sách hiện hành của đất nước</b> là dùng doanh nghiệp để thúc đẩy nhân dân làm giàu. Chỉ khi nhân dân giàu mạnh thì đất nước mới giàu mạnh.
            </p>
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
      <section id="register" style={{ padding: "70px 0", background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)" }}>
        <div style={sectionWrap}>
          <h2 style={h2}>Đăng ký tham gia hoạt động tiếp nhận xử lý trung gian</h2>
          <p style={pLead}>Để tham gia chương trình hoạt động của SCLM, vui lòng bấm vào nút dưới đây để mở biểu mẫu đăng ký chính thức. Sau khi hoàn tất, đội ngũ SCLM sẽ liên hệ để xác minh và hướng dẫn chi tiết.</p>
          
          {/* Ảnh app SCLM - 2 khung */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            maxWidth: 920,
            margin: "40px auto",
          }}>
            {/* Khung 1: Ảnh 3.jpg */}
            <div style={{
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              transition: "transform 0.3s ease",
              background: "#ffffff",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img 
                src="/3.jpg" 
                alt="SCLM App" 
                style={{ 
                  width: "100%", 
                  height: "auto",
                  minHeight: 280,
                  objectFit: "contain",
                  display: "block"
                }} 
              />
            </div>
            
            {/* Khung 2: Ảnh appsclm3 */}
            <div style={{
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              transition: "transform 0.3s ease",
              background: "#ffffff",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img 
                src="/appsclm3.jpg" 
                alt="SCLM App 3" 
                style={{ 
                  width: "100%", 
                  height: "auto",
                  minHeight: 280,
                  objectFit: "contain",
                  display: "block"
                }} 
              />
            </div>
          </div>
          
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

          {/* Khung nền xanh bọc toàn bộ */}
          <div style={{
            maxWidth: 920,
            margin: "30px auto",
            background: "linear-gradient(135deg, #0a2e65 0%, #154a9a 100%)",
            borderRadius: 20,
            padding: "40px 32px",
            boxShadow: "0 12px 32px rgba(10,46,101,0.3)",
          }}>
            <div style={{ 
              textAlign: "center", 
              marginBottom: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              alignItems: "center"
            }}>
              {/* Biểu mẫu đăng ký - Bên trái */}
              <div style={{ width: "100%", maxWidth: "500px" }}>
                <p style={{
                  margin: "0 0 12px 0",
                  fontSize: 16,
                  color: "#ffffff",
                  fontWeight: 600,
                  textAlign: "left",
                  paddingLeft: "15px"
                }}>
                  Click vào đây để mở biểu mẫu đăng ký
                </p>
                <button 
                  onClick={() => setShowForm(prev => !prev)} 
                  style={{
                    ...btn,
                    background: "#00A9FF",
                    border: "none",
                    padding: "14px 28px",
                    cursor: "pointer",
                    fontSize: "16px",
                    width: "100%"
                  }}
                >
                  Mở biểu mẫu đăng ký SCLM
                </button>
              </div>

              {/* Cửa Hàng Trung Gian - Bên phải trong cùng khung */}
              <div style={{ width: "100%", maxWidth: "500px" }}>
                <p style={{
                  margin: "0 0 12px 0",
                  fontSize: 16,
                  color: "#ffffff",
                  fontWeight: 600,
                  textAlign: "left",
                  paddingLeft: "15px"
                }}>
                  Click vào đây để mở Cửa Hàng Trung Gian
                </p>
                <button 
                  onClick={() => window.open('https://sclm-global.com/#/', '_blank')} 
                  style={{
                    ...btn,
                    background: "#FFD700",
                    color: "#0a2e65",
                    border: "none",
                    padding: "14px 28px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "700",
                    width: "100%"
                  }}
                >
                  Cửa Hàng Trung Gian
                </button>
              </div>
            </div>
            
            {/* 3 logo nhỏ */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
              margin: "32px auto",
              padding: "20px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: 16,
              maxWidth: 500,
            }}>
              <img src="/4.jpg" alt="Logo 1" style={{ width: 80, height: 80, objectFit: "contain", borderRadius: 8 }} />
              <img src="/2.jpg" alt="Logo 2" style={{ width: 80, height: 80, objectFit: "contain", borderRadius: 8 }} />
              <img src="/1.jpg" alt="Logo 3" style={{ width: 80, height: 80, objectFit: "contain", borderRadius: 8 }} />
            </div>

            {/* Văn bản kêu gọi */}
            <div style={{
              textAlign: "center",
              padding: "24px 32px",
              background: "rgba(0,0,0,0.2)",
              borderRadius: 16,
              marginTop: "32px",
            }}>
              <h3 style={{
                margin: "0 0 8px 0",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#facc15",
                letterSpacing: 0.3,
                lineHeight: 1.3,
              }}>
                HÃY CÙNG SCLM KẾT NỐI GIAO THƯƠNG VƯƠN TẦM QUỐC TẾ
              </h3>
              <p style={{
                margin: 0,
                fontSize: 15,
                color: "#ffffff",
                fontWeight: 500,
                opacity: 0.95,
              }}>
                Cho lĩnh vực thương mại điện tử Việt Nam
              </p>
            </div>
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
                <label style={labelStyle}>Họ và tên</label>
                <input type="text" name="ho_ten" required style={inputStyle} placeholder="Nhập họ và tên đầy đủ" />
              </div>

              <div>
                <label style={labelStyle}>Tuổi tác</label>
                <input type="number" name="tuoi_tac" required style={inputStyle} placeholder="Nhập tuổi" min="18" max="100" />
              </div>

              <div>
                <label style={labelStyle}>Email người dùng</label>
                <input type="email" name="email_nguoi_dung" required style={inputStyle} placeholder="example@email.com" />
              </div>

              <div>
                <label style={labelStyle}>Số điện thoại người dùng</label>
                <input type="tel" name="sdt_nguoi_dung" required style={inputStyle} placeholder="0123456789" />
              </div>

              <div>
                <label style={labelStyle}>Số căn cước công dân</label>
                <input 
                  type="text" 
                  name="so_cccd" 
                  required 
                  style={inputStyle} 
                  placeholder="Nhập 12 số CCCD" 
                  maxLength={12}
                  pattern="[0-9]{12}"
                />
                <p style={{ fontSize: 12, color: "#94a3b8", margin: "6px 0 0 0" }}>
                  Nhập đúng 12 số căn cước công dân
                </p>
              </div>

              <div>
                <label style={labelStyle}>Kinh nghiệm làm việc online</label>
                <input type="text" name="kinh_nghiem" style={inputStyle} placeholder="Ví dụ: 2 năm bán hàng online" />
              </div>

              <div>
                <label style={labelStyle}>Công việc hiện tại</label>
                <input type="text" name="cong_viec" style={inputStyle} placeholder="Nhập công việc hiện tại" />
              </div>

              <div>
                <label style={labelStyle}>Quốc gia hoạt động</label>
                <input type="text" name="quoc_gia" style={inputStyle} placeholder="Ví dụ: Việt Nam" />
              </div>

              <div>
                <label style={labelStyle}>Ngưỡng hoạt động mong muốn (VỐN USD)</label>
                <input type="number" name="von" required style={inputStyle} placeholder="30" min="30" />
              </div>

              <div>
                <label style={labelStyle}>Thu nhập lý tưởng hàng tháng (VỐN USD)</label>
                <input type="number" name="thu_nhap" style={inputStyle} placeholder="500" />
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
                  <p style={{ margin: '0 0 16px 0', fontSize: 14, color: '#5d4037', lineHeight: 1.6 }}>
                    Toàn bộ hoạt động của hệ thống được đăng ký và quản lý theo quy định của Cục Thuế Nhà nước Trung ương.
                  </p>
                  
                  {/* Logo Cục Thuế - Dịch vụ công */}
                  <div style={{ textAlign: 'center', margin: '16px 0' }}>
                    <a href="https://dichvucong.gov.vn" target="_blank" rel="noopener noreferrer">
                      <img
                        src="https://dichvucong.gov.vn/p/home/theme/img/header/logo.png"
                        alt="Cổng Dịch vụ công Quốc gia"
                        style={{ 
                          width: 220, 
                          height: 'auto', 
                          objectFit: 'contain',
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </a>
                  </div>
                  
                  <p style={{ margin: 0, fontSize: 14, color: '#5d4037', lineHeight: 1.6, fontWeight: 600 }}>
                    <span style={{ color: '#1976d2' }}>✓</span> SCLM Global – đã được Meta xác minh tích xanh doanh nghiệp.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ 
              marginTop: '30px',
              padding: '24px',
              background: 'linear-gradient(135deg, #0a2e65 0%, #154a9a 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.2)',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(10,46,101,0.3)'
            }}>
              {/* Logo Dịch vụ công to hơn */}
              <div style={{ marginBottom: '20px' }}>
                <a href="https://dichvucong.gov.vn" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://dangky.dichvucong.gov.vn/content/698e3c6e522f6948637426e907ba3188.svg" 
                    alt="Logo Cục Thuế - Dịch vụ công" 
                    style={{ 
                      width: '140px',
                      height: '140px',
                      objectFit: 'contain',
                      background: '#fff',
                      padding: '12px',
                      borderRadius: '16px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </a>
              </div>

              {/* Thông tin */}
              <div style={{ color: '#fff', marginBottom: '16px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '17px', marginBottom: '6px', color: '#facc15' }}>
                  Thuế Việt Nam - Cục Thuế
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#ff4444' }}>
                  Cơ Quan Chủ Quản: Bộ Tài Chính • Số Giấy Phép: 207/GP-BC
                </div>
              </div>

              {/* Liên hệ hỗ trợ */}
              <div style={{ 
                background: 'rgba(0,0,0,0.25)',
                borderRadius: '12px',
                padding: '16px',
                marginTop: '16px'
              }}>
                <div style={{ 
                  fontSize: '15px', 
                  fontWeight: 'bold', 
                  color: '#ffffff', 
                  marginBottom: '12px' 
                }}>
                  📞 Liên hệ hỗ trợ SCLM Global
                </div>

                {/* Facebook */}
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '10px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }}>
                  <svg 
                    viewBox="0 0 24 24" 
                    style={{ width: '22px', height: '22px', fill: '#ffffff', flexShrink: 0 }}
                  >
                    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
                  </svg>
                  <a href="https://www.facebook.com/sclm.global.vn/" target="_blank" rel="noopener noreferrer" style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    www.facebook.com/sclm.global.vn
                  </a>
                </div>

                {/* Viber */}
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '10px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '22px', flexShrink: 0 }}>💬</div>
                  <a href="https://connect.viber.com/business/ea6b050a-b4c1-11f0-b475-16a159ce570c" target="_blank" rel="noopener noreferrer" style={{
                    color: '#000000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Chat Viber: SCLM Global Business
                  </a>
                </div>
              </div>
            </div>

            <p style={{ textAlign: 'center', marginTop: '30px', color: '#64748b', fontSize: '14px' }}>
              © 2025 SCLM Global. All rights reserved.
            </p>
          </div>
          )}
        </div>
      </section>      {/* ===== SOLUTIONS ===== */}
      <section id="solutions" style={{ padding: "70px 0", background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)" }}>
        <div style={sectionWrap}>
          <h2 style={{ ...h2, color: "#0a2e65" }}>Giải pháp & Mô hình nổi bật</h2>
          <p style={{ ...pLead, color: "#0f172a", fontWeight: 600 }}>Thiết kế để dễ bắt đầu – ít rủi ro – tăng trưởng bền vững.</p>

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
      <section id="partners" style={{ padding: "60px 0", background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)" }}>
        <div style={{ ...sectionWrap, textAlign: "center" }}>
          <h2 style={h2}>Liên hệ & Hợp tác</h2>
          <p style={pLead}>
            Liên hệ trực tiếp với SCLM qua các kênh chính thức dưới đây. Đội ngũ luôn sẵn sàng hỗ trợ bạn 24/7.
          </p>
          
          <h2 style={{ ...h2, marginTop: 50 }}>💥 Sẵn sàng mở rộng thương hiệu cùng SCLM?</h2>
          <p style={pLead}>
            Tham gia mạng lưới đối tác SCLM – nơi hội tụ doanh nghiệp năng động, hệ thống vận hành minh bạch, cùng công cụ quản lý toàn diện trên điện thoại & laptop, giúp bạn kiểm soát hiệu quả mọi hoạt động kinh doanh mọi lúc – mọi nơi.
          </p>
          <p style={{ ...pLead, marginTop: 16, fontWeight: 600, color: "#0a2e65" }}>
            🚀 SCLM không chỉ mang đến nền tảng công nghệ mà còn là người đồng hành chiến lược, hỗ trợ xây dựng thương hiệu, tối ưu vận hành và mở rộng quy mô bền vững.
          </p>
        </div>
      </section>

      {/* ===== CONTACT (FORM GỬI MAIL THẬT) ===== */}
      <section id="contact" style={{ padding: "70px 0", background: "linear-gradient(180deg, #ffffff, #f4f8ff)" }}>
        <div style={{ ...sectionWrap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "flex-start" }}>
          {/* left - Contact Info */}
          <div>
            {/* Ảnh anhapp20.jpg */}
            <div>
              <img 
                src="/sclmapp20.jpg" 
                alt="SCLM App" 
                style={{ 
                  width: "100%", 
                  height: "auto",
                  borderRadius: 16,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                }} 
              />
            </div>
          </div>

          {/* right - Contact channels */}
          <div>
            <div style={{
              background: "linear-gradient(135deg, #0a2e65 0%, #154a9a 100%)",
              borderRadius: 20,
              padding: "36px 32px",
              boxShadow: "0 12px 32px rgba(10,46,101,0.25)",
              color: "#ffffff",
            }}>
              <h3 style={{
                margin: "0 0 24px 0",
                fontSize: "1.4rem",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: 0.3,
                textAlign: "center",
              }}>
                📞 Liên hệ & Kết nối với SCLM Global
              </h3>
              
              <p style={{
                margin: "0 0 20px 0",
                fontSize: 14,
                color: "#facc15",
                textAlign: "center",
                fontWeight: 600,
              }}>
                👉 Click vào các kênh bên dưới để kết nối ngay
              </p>

              <div style={{ display: "grid", gap: 16, textAlign: "left" }}>
                {/* Website */}
                <div style={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  border: "1px solid rgba(255,255,255,0.15)",
                }}>
                  <div style={{ fontSize: 24 }}>🌐</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 3 }}>Website chính thức</div>
                    <a href="https://sclm.vn" target="_blank" rel="noopener noreferrer" style={{
                      color: "#facc15",
                      fontWeight: 700,
                      fontSize: 16,
                      textDecoration: "none",
                    }}>
                      www.sclm.vn
                    </a>
                  </div>
                </div>

                {/* Hotline & Email */}
                <div style={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  border: "1px solid rgba(255,255,255,0.15)",
                }}>
                  <div style={{ fontSize: 24 }}>�</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 3 }}>Liên hệ & Kết nối với SCLM Global</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#0a2e65' }}>
                      <span style={{ color: '#FFD700' }}>0582 779 977</span> | <span style={{ color: '#FFD700' }}>0947 886 611</span>
                    </div>
                  </div>
                </div>

                {/* Facebook */}
                <div style={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  border: "1px solid rgba(255,255,255,0.15)",
                }}>
                  <div style={{ fontSize: 24 }}>📘</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 3 }}>Facebook (Tích xanh doanh nghiệp)</div>
                    <a href="https://www.facebook.com/sclm.global.vn/" target="_blank" rel="noopener noreferrer" style={{
                      color: "#facc15",
                      fontWeight: 700,
                      fontSize: 16,
                      textDecoration: "none",
                    }}>
                      www.facebook.com/sclm.global.vn
                    </a>
                  </div>
                </div>

                {/* Viber */}
                <div style={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  border: "1px solid rgba(255,255,255,0.15)",
                }}>
                  <div style={{ fontSize: 24 }}>💬</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 3 }}>Chat trực tiếp qua Viber Business</div>
                    <a href="https://connect.viber.com/business/ea6b050a-b4c1-11f0-b475-16a159ce570c" target="_blank" rel="noopener noreferrer" style={{
                      color: "#facc15",
                      fontWeight: 700,
                      fontSize: 16,
                      textDecoration: "none",
                    }}>
                      SCLM Global Business
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div style={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  border: "1px solid rgba(255,255,255,0.15)",
                }}>
                  <div style={{ fontSize: 24 }}>✉️</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 3 }}>Email hỗ trợ khách hàng</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#FFD700' }}>contact@sclm.vn</div>
                  </div>
                </div>
              </div>

              <p style={{
                marginTop: 20,
                fontSize: 13,
                opacity: 0.9,
                lineHeight: 1.6,
                textAlign: "center",
              }}>
                Đội ngũ SCLM luôn sẵn sàng tư vấn và hỗ trợ bạn 24/7 qua mọi kênh liên hệ trên
              </p>
            </div>
            
            {/* Text below contact box */}
            <p style={{ color: "#475569", textAlign: "center", fontSize: 16, lineHeight: 1.6, marginTop: 24 }}>
              Liên hệ trực tiếp với SCLM qua các kênh chính thức. Đội ngũ luôn sẵn sàng hỗ trợ bạn 24/7.
            </p>
          </div>
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
              <a href="https://dichvucong.gov.vn" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://dangky.dichvucong.gov.vn/content/698e3c6e522f6948637426e907ba3188.svg" 
                  alt="Logo Cục Thuế" 
                  style={{ 
                    width: 110, 
                    height: 110, 
                    objectFit: 'contain', 
                    borderRadius: 8, 
                    background: '#fff', 
                    padding: 6,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </a>
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
                <a href="https://dichvucong.gov.vn" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://dangky.dichvucong.gov.vn/content/698e3c6e522f6948637426e907ba3188.svg" 
                    alt="Logo Cục Thuế" 
                    style={{ 
                      width: 100, 
                      height: 100, 
                      objectFit: 'contain',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </a>
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
            <img src="/logo-sclm.png" alt="SCLM" style={{ width: 36, height: 36, borderRadius: "50%", animation: "none", transition: "none" }} />
            <div style={{ fontWeight: 800, letterSpacing: .3 }}>GLOBAL SCLM</div>
          </div>
          <div style={{ opacity: .9, fontSize: 14 }}>© 2025 SCLM Global. All rights reserved.</div>
        </div>
      </footer>

      {/* Vòng quay may mắn đã có ở đầu trang, chỉ giữ 1 widget */}

      {/* Hỗ trợ 24/7 Zalo */}
      <ZaloSupportWidget
        zaloUrl="https://zalo.me/0813789127"
        position={{ bottom: '20px', left: '20px' }}
        size="80px"
        enableDrag={true}
      />
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
