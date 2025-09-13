"use client";

// Wind Animation Component for full-screen background effects
function WindAnimation() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Animated circle */}
      <div
        className="absolute border-2 rounded-full"
        style={{
          borderColor: "rgba(168, 85, 247, 0.7)",
          width: "80px",
          height: "80px",
          top: "40%",
          left: "25%",
          transform: "translate(-50%, -50%)",
          animation: "windCircle 5s ease-out infinite both",
          zIndex: 3,
        }}
      />

      {/* Second animated circle */}
      <div
        className="absolute border-2 rounded-full"
        style={{
          borderColor: "rgba(192, 132, 252, 0.5)",
          width: "60px",
          height: "60px",
          top: "65%",
          left: "75%",
          transform: "translate(-50%, -50%)",
          animation: "windCircle2 7s ease-out infinite both",
          zIndex: 3,
        }}
      />

      {/* SVG wind path animation */}
      <div
        className="absolute"
        style={{
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          version="1.1"
          preserveAspectRatio="xMidYMid slice"
          style={{
            overflow: "visible",
          }}
        >
          <path
            d="M-100,300c151.6,1.9,220.9,16.4,278.4,30.3c30.9,20.1-3.6,37.5,26.9,75c13.9,14,31.8,42.2,83.7,50.9
            c75.7,10.2,195.3-8.7,226.4-36.5c43.8-34.4-76.4-57.5-59.3-110.1c13.3-24.1,51.1-58.7,134.7-67.4c104.9-10.9,254.3,21.7,270.8,65.4
            c15.3,36-60.6,66.1-126.6,79.8c-119.5,24.5-287.7,14.9-324-7.6c-1.5-0.9-23.9-14.7-6.1-22.7c11.7-5,32.9-5.4,39.1-5.5
            c46.4-0.8,84.1,12.1,99,17.2c139.5,48.5,161.9,63.9,216.2,75.7c72.1,15.6,198.1,24.2,272.8,6.9c109.4-25.5,22.6-88,148.5-130.7
            c52.6-17.9,120-24.6,169.4-27.5"
            fill="none"
            stroke="#a855f7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="150 1800"
            strokeDashoffset="1950"
            opacity="0.6"
            style={{
              animation: "windLine 6s linear infinite",
            }}
          />

          {/* Additional wind paths for more coverage */}
          <path
            d="M-50,150c100,20,200,40,300,30c100,-10,200,50,300,40c100,-10,200,-30,300,-20c100,10,200,60,300,50"
            fill="none"
            stroke="#c084fc"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="80 1200"
            strokeDashoffset="1280"
            opacity="0.4"
            style={{
              animation: "windLine2 8s linear infinite",
            }}
          />

          <path
            d="M-80,600c120,-30,240,20,360,10c120,-10,240,-40,360,-30c120,10,240,70,360,60"
            fill="none"
            stroke="#ddd6fe"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="60 900"
            strokeDashoffset="960"
            opacity="0.3"
            style={{
              animation: "windLine3 10s linear infinite",
            }}
          />
        </svg>
      </div>

      <style jsx global>{`
        @keyframes windLine {
          from {
            stroke-dasharray: 150 1800;
            stroke-dashoffset: 1950;
          }
          to {
            stroke-dasharray: 150 1800;
            stroke-dashoffset: 15;
          }
        }

        @keyframes windLine2 {
          from {
            stroke-dasharray: 80 1200;
            stroke-dashoffset: 1280;
          }
          to {
            stroke-dasharray: 80 1200;
            stroke-dashoffset: 10;
          }
        }

        @keyframes windLine3 {
          from {
            stroke-dasharray: 60 900;
            stroke-dashoffset: 960;
          }
          to {
            stroke-dasharray: 60 900;
            stroke-dashoffset: 5;
          }
        }

        @keyframes windCircle {
          0%,
          40% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
          }
          70%,
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }

        @keyframes windCircle2 {
          0%,
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
          }
          80%,
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}

export default WindAnimation;