
import hero_image from "../Assets/hero_image.jpg";
export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#ffffff", borderTop: "1px solid #f3f4f6" }}>
      <div
        className="max-w-6xl mx-auto px-6 lg:px-8"
        style={{ padding: "48px 32px 32px" }}
      >
        {/* Bottom bar — exactly as in screenshot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {/* Logo left */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                 <img
                src={hero_image}
                alt="MockCoach AI Logo"
                className="w-10 h-10 object-contain"
               />
            <span style={{ color: "#111827", fontSize: "14px", fontWeight: 600, letterSpacing: "-0.01em" }}>
              MockCoach AI
            </span>
          </div>

          {/* Copyright */}
          <p style={{ fontSize: "12px", color: "#9ca3af" }}>
            © 2024 MockCoach AI. All rights reserved.
          </p>

          {/* Links right */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service", "Contact Support", "Twitter"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  textDecoration: "none",
                }}
                className="hover:text-gray-700 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}