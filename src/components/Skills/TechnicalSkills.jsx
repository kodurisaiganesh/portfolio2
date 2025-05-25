import React, { useEffect, useState } from "react";

const TechnicalShowcase = () => {
  const [animate, setAnimate] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [tiltAngles, setTiltAngles] = useState({}); // store tilt per card

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const handleClick = (section) => {
    setActiveCard((prev) => (prev === section ? null : section));
  };

  const handleMouseMove = (section, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within card
    const y = e.clientY - rect.top; // y position within card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // max 10deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;

    setTiltAngles((prev) => ({
      ...prev,
      [section]: { rotateX: -rotateX, rotateY },
    }));
  };

  const handleMouseLeave = (section) => {
    setTiltAngles((prev) => ({
      ...prev,
      [section]: { rotateX: 0, rotateY: 0 },
    }));
  };

  // Unique colors per section
  const colors = {
    "Technical Skills": {
      border: "#e91e63", // pink
      shadow: "rgba(233, 30, 99, 0.3)",
      text: "#ad1457",
      glow: "#f50057",
    },
    "Web Technologies": {
      border: "#3f51b5", // indigo
      shadow: "rgba(63, 81, 181, 0.3)",
      text: "#283593",
      glow: "#303f9f",
    },
    Coursework: {
      border: "#009688", // teal
      shadow: "rgba(0, 150, 136, 0.3)",
      text: "#00695c",
      glow: "#00796b",
    },
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>🚀 My Technical Arsenal</h1>

      <div style={styles.grid}>
        {["Technical Skills", "Web Technologies", "Coursework"].map(
          (section, i) => {
            const content = {
              "Technical Skills": ["C++", "Java", "Python", "JavaScript"],
              "Web Technologies": ["React.js", "Node.js", "MySQL", "GitHub & CI/CD"],
              Coursework: [
                "Data Structures and Algorithms",
                "Object Oriented Programming",
                "Computer Networks",
                "Operating Systems",
              ],
            };
            const icons = {
              "Technical Skills": "🛠️",
              "Web Technologies": "🌐",
              Coursework: "📚",
            };

            const isActive = activeCard === section;
            const tilt = tiltAngles[section] || { rotateX: 0, rotateY: 0 };

            const color = colors[section];

            return (
              <div
                key={section}
                onClick={() => handleClick(section)}
                onMouseMove={(e) => handleMouseMove(section, e)}
                onMouseLeave={() => handleMouseLeave(section)}
                style={{
                  ...styles.card,
                  opacity: animate ? 1 : 0,
                  transform: animate
                    ? isActive
                      ? `translateY(-10px) scale(1.05) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
                      : `translateY(0) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
                    : "translateY(30px)",
                  boxShadow: isActive
                    ? `0 15px 35px ${color.shadow}`
                    : "0 6px 15px rgba(0, 0, 0, 0.05)",
                  borderColor: isActive ? color.border : color.border,
                  color: isActive ? color.text : color.text,
                  transition: `opacity 0.8s ease ${i * 0.2 + 0.1}s, 
                               transform 0.3s ease, 
                               box-shadow 0.3s ease, 
                               border-color 0.3s ease,
                               color 0.3s ease`,
                  transformStyle: "preserve-3d",
                }}
                className="hover-glow"
              >
                <h2 style={{ ...styles.cardTitle, borderColor: color.border }}>
                  {icons[section]} {section}
                </h2>
                <ul style={styles.list}>
                  {content[section].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          }
        )}
      </div>

      <style>{`
        /* Import Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Merriweather:wght@700&display=swap');

        .hover-glow {
          background-color: #fff;
          border-radius: 20px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition:
            box-shadow 0.3s ease,
            transform 0.3s ease,
            color 0.3s ease,
            filter 0.3s ease;
          will-change: transform;
          border: 3px solid transparent;
        }

        .hover-glow:hover {
          filter: drop-shadow(0 0 10px var(--glow-color));
          transform: translateY(-10px) scale(1.07);
          box-shadow: 0 20px 40px var(--shadow-color);
          border-color: var(--border-color);
          color: var(--text-color);
        }

        .hover-glow h2 {
          font-family: 'Merriweather', serif;
          font-weight: 700;
          font-size: 26px;
          margin-bottom: 20px;
          border-bottom: 3px solid;
          padding-bottom: 8px;
          letter-spacing: 0.06em;
          color: inherit;
          transition: color 0.3s ease, border-color 0.3s ease;
        }

        .hover-glow ul {
          list-style-type: circle;
          padding-left: 22px;
          font-size: 17px;
          line-height: 2;
          color: inherit;
          font-weight: 400;
        }

        /* Responsive Grid */
        @media (max-width: 900px) {
          div[style*="flex-wrap: wrap"] > div {
            flex: 1 1 calc(50% - 20px) !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="flex-wrap: wrap"] > div {
            flex: 1 1 100% !important;
            padding: 15px 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "60px 20px",
    maxWidth: "960px",
    margin: "0 auto",
    fontFamily: "'Inter', sans-serif",
    color: "#004d40",
  },
  title: {
    fontFamily: "'Merriweather', serif",
    fontSize: "38px",
    textAlign: "center",
    marginBottom: "50px",
    color: "#00bcd4",
    fontWeight: "700",
    letterSpacing: "1.5px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center",
    perspective: "1000px", // enables 3D perspective
  },
  card: {
    flex: "1 1 calc(33.333% - 20px)",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "30px 35px",
    cursor: "pointer",
    transformOrigin: "center bottom",
    fontFamily: "'Inter', sans-serif",
    border: "3px solid",
  },
  cardTitle: {
    // border bottom color will be controlled inline
  },
  list: {
    listStyle: "circle",
    paddingLeft: "22px",
    fontSize: "17px",
    lineHeight: "2",
    fontWeight: 400,
  },
};

export default TechnicalShowcase;
