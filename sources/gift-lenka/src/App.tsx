import { useState, useEffect, useRef, useCallback } from "react";

/* ───────── helpers ───────── */
const rand = (a: number, b: number) => Math.random() * (b - a) + a;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/* ───────── Confetti canvas ───────── */
function Confetti({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const particles = useRef<
    {
      x: number;
      y: number;
      w: number;
      h: number;
      color: string;
      vx: number;
      vy: number;
      rot: number;
      rv: number;
      opacity: number;
    }[]
  >([]);

  const spawn = useCallback(() => {
    const colors = [
      "#ff6b8a",
      "#ffd166",
      "#06d6a0",
      "#118ab2",
      "#ef476f",
      "#fca311",
      "#e63946",
      "#a855f7",
      "#f472b6",
      "#34d399",
      "#facc15",
      "#fb923c",
    ];
    for (let i = 0; i < 250; i++) {
      particles.current.push({
        x: rand(0, window.innerWidth),
        y: rand(-window.innerHeight, 0),
        w: rand(6, 14),
        h: rand(4, 10),
        color: pick(colors),
        vx: rand(-3, 3),
        vy: rand(2, 7),
        rot: rand(0, 360),
        rv: rand(-6, 6),
        opacity: 1,
      });
    }
  }, []);

  useEffect(() => {
    if (!active) return;
    spawn();
    const interval = setInterval(spawn, 2500);
    return () => clearInterval(interval);
  }, [active, spawn]);

  useEffect(() => {
    const cvs = ref.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d")!;
    let raf: number;

    const resize = () => {
      cvs.width = window.innerWidth;
      cvs.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rv;
        p.vy += 0.04;
        p.opacity -= 0.001;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      particles.current = particles.current.filter(
        (p) => p.y < cvs.height + 50 && p.opacity > 0
      );
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}

/* ───────── Balloons ───────── */
function Balloons({ active }: { active: boolean }) {
  const [balloons] = useState(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      color: pick([
        "#ff6b8a",
        "#ffd166",
        "#06d6a0",
        "#118ab2",
        "#ef476f",
        "#fca311",
        "#a855f7",
        "#f472b6",
        "#34d399",
        "#facc15",
        "#e63946",
        "#fb7185",
      ]),
      left: rand(2, 95),
      delay: rand(0, 3),
      size: rand(40, 70),
      duration: rand(5, 10),
    }))
  );

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute"
          style={{
            left: `${b.left}%`,
            bottom: "-100px",
            animation: `floatUp ${b.duration}s ease-out ${b.delay}s forwards`,
          }}
        >
          <div
            style={{
              width: b.size,
              height: b.size * 1.25,
              background: `radial-gradient(ellipse at 35% 30%, ${b.color}dd, ${b.color})`,
              borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
              position: "relative",
              boxShadow: `inset -${b.size / 6}px -${b.size / 6}px ${b.size / 3}px rgba(0,0,0,0.1), inset ${b.size / 8}px ${b.size / 8}px ${b.size / 4}px rgba(255,255,255,0.3)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: -b.size * 0.6,
                left: "50%",
                width: 1,
                height: b.size * 0.6,
                background: "#999",
                transform: "translateX(-50%)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────── Flying Fives ───────── */
function FlyingFives({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="text-9xl font-black"
        style={{
          animation: "fiveLeft 2.5s ease-out forwards",
          background: "linear-gradient(135deg, #f472b6, #a855f7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "none",
          filter: "drop-shadow(0 4px 20px rgba(168,85,247,0.5))",
          fontSize: "clamp(100px, 20vw, 200px)",
        }}
      >
        5
      </div>
      <div
        className="text-9xl font-black"
        style={{
          animation: "fiveRight 2.5s ease-out forwards",
          background: "linear-gradient(135deg, #fbbf24, #ef4444)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 4px 20px rgba(239,68,68,0.5))",
          fontSize: "clamp(100px, 20vw, 200px)",
        }}
      >
        5
      </div>
    </div>
  );
}

/* ───────── Capybara SVG ───────── */
function CapybaraScene() {
  return (
    <div className="flex justify-center my-6" style={{ animation: "fadeInUp 1s ease-out 1.5s both" }}>
      <svg viewBox="0 0 400 320" width="360" height="290" className="drop-shadow-lg">
        {/* Table */}
        <rect x="80" y="230" width="240" height="12" rx="6" fill="#c98a5e" />
        <rect x="100" y="242" width="12" height="60" rx="3" fill="#b07a50" />
        <rect x="288" y="242" width="12" height="60" rx="3" fill="#b07a50" />

        {/* Tea cup on table */}
        <g transform="translate(240, 190)">
          <ellipse cx="30" cy="42" rx="28" ry="8" fill="#ddd" />
          <path d="M5,10 Q2,25 8,40 L52,40 Q58,25 55,10 Z" fill="#fff" stroke="#ccc" strokeWidth="1.5" />
          <ellipse cx="30" cy="10" rx="25" ry="8" fill="#d4a76a" />
          {/* Steam */}
          <path d="M20,-5 Q18,-20 25,-25 Q30,-18 28,-5" fill="none" stroke="#ccc" strokeWidth="1.5" opacity="0.6">
            <animate attributeName="d" values="M20,-5 Q18,-20 25,-25 Q30,-18 28,-5;M20,-5 Q15,-25 22,-30 Q32,-20 28,-5;M20,-5 Q18,-20 25,-25 Q30,-18 28,-5" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.3;0.6" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M35,-3 Q33,-18 38,-22 Q42,-15 40,-3" fill="none" stroke="#ccc" strokeWidth="1.5" opacity="0.4">
            <animate attributeName="d" values="M35,-3 Q33,-18 38,-22 Q42,-15 40,-3;M35,-3 Q30,-22 36,-28 Q44,-18 40,-3;M35,-3 Q33,-18 38,-22 Q42,-15 40,-3" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.2;0.4" dur="2.5s" repeatCount="indefinite" />
          </path>
          {/* Cup handle */}
          <path d="M55,15 Q72,15 72,28 Q72,38 55,38" fill="none" stroke="#ccc" strokeWidth="3" />
        </g>

        {/* Capybara body */}
        <g>
          {/* Body */}
          <ellipse cx="160" cy="210" rx="65" ry="40" fill="#8B6914">
            <animate attributeName="ry" values="40;41;40" dur="4s" repeatCount="indefinite" />
          </ellipse>
          {/* Head */}
          <ellipse cx="130" cy="165" rx="42" ry="38" fill="#9B7424" />
          {/* Snout */}
          <ellipse cx="100" cy="178" rx="22" ry="16" fill="#A88030" />
          {/* Nose */}
          <ellipse cx="84" cy="174" rx="6" ry="4.5" fill="#3d2b04" />
          {/* Eyes */}
          <circle cx="118" cy="155" r="5" fill="#1a1a1a" />
          <circle cx="140" cy="153" r="5" fill="#1a1a1a" />
          {/* Eye shine */}
          <circle cx="119.5" cy="153.5" r="1.8" fill="#fff" />
          <circle cx="141.5" cy="151.5" r="1.8" fill="#fff" />
          {/* Eyebrows - happy */}
          <path d="M112,148 Q118,144 124,148" fill="none" stroke="#5a3e06" strokeWidth="1.5" />
          <path d="M134,146 Q140,142 146,146" fill="none" stroke="#5a3e06" strokeWidth="1.5" />
          {/* Mouth - smile */}
          <path d="M92,185 Q100,192 112,186" fill="none" stroke="#5a3e06" strokeWidth="2" strokeLinecap="round" />
          {/* Ears */}
          <ellipse cx="115" cy="132" rx="9" ry="6" fill="#8B6914" transform="rotate(-20,115,132)" />
          <ellipse cx="147" cy="130" rx="9" ry="6" fill="#8B6914" transform="rotate(20,147,130)" />
          <ellipse cx="115" cy="132" rx="6" ry="4" fill="#a88030" transform="rotate(-20,115,132)" />
          <ellipse cx="147" cy="130" rx="6" ry="4" fill="#a88030" transform="rotate(20,147,130)" />

          {/* Front legs */}
          <rect x="110" y="230" width="18" height="30" rx="9" fill="#8B6914" />
          <rect x="175" y="230" width="18" height="30" rx="9" fill="#8B6914" />
          {/* Feet */}
          <ellipse cx="119" cy="260" rx="12" ry="5" fill="#7a5c10" />
          <ellipse cx="184" cy="260" rx="12" ry="5" fill="#7a5c10" />

          {/* Arm holding phone */}
          <g>
            <path d="M195,195 Q210,185 215,170" fill="none" stroke="#8B6914" strokeWidth="18" strokeLinecap="round">
              <animate attributeName="d" values="M195,195 Q210,185 215,170;M195,195 Q212,183 217,168;M195,195 Q210,185 215,170" dur="5s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Smartphone */}
          <g transform="translate(205, 135) rotate(10)">
            <animate attributeName="transform" type="rotate" values="translate(205,135) rotate(10);translate(207,133) rotate(12);translate(205,135) rotate(10)" dur="5s" repeatCount="indefinite" />
            <rect x="0" y="0" width="32" height="52" rx="5" fill="#222" />
            <rect x="3" y="6" width="26" height="40" rx="2" fill="#4fc3f7" />
            {/* Screen content - hearts */}
            <text x="16" y="30" textAnchor="middle" fontSize="14">💬</text>
            {/* Camera dot */}
            <circle cx="16" cy="3.5" r="1.2" fill="#555" />
          </g>

          {/* Blush */}
          <ellipse cx="98" cy="182" rx="8" ry="5" fill="#e8a0a0" opacity="0.4" />

          {/* Party hat! */}
          <g transform="translate(128, 120)">
            <polygon points="0,15 15,-25 30,15" fill="#ef4444" stroke="#fbbf24" strokeWidth="1.5" />
            <circle cx="15" cy="-27" r="5" fill="#fbbf24" />
            <line x1="5" y1="5" x2="10" y2="-10" stroke="#fbbf24" strokeWidth="1.5" />
            <line x1="15" y1="8" x2="15" y2="-15" stroke="#34d399" strokeWidth="1.5" />
            <line x1="25" y1="5" x2="20" y2="-10" stroke="#fbbf24" strokeWidth="1.5" />
          </g>
        </g>

        {/* Floating hearts */}
        <text x="310" y="140" fontSize="20" opacity="0.7">
          💖
          <animate attributeName="y" values="140;120;140" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </text>
        <text x="60" y="120" fontSize="16" opacity="0.5">
          ✨
          <animate attributeName="y" values="120;100;120" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
        </text>
        <text x="340" y="180" fontSize="16" opacity="0.5">
          🎵
          <animate attributeName="y" values="180;160;180" dur="2.8s" repeatCount="indefinite" />
        </text>
      </svg>
    </div>
  );
}

/* ───────── Gift Box ───────── */
function GiftBox({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 cursor-pointer" onClick={onClick}>
      <p
        className="text-2xl md:text-3xl font-bold text-pink-400 animate-bounce"
        style={{ textShadow: "0 2px 10px rgba(244,114,182,0.4)" }}
      >
        🎁 Нажми на подарок! 🎁
      </p>
      <div className="relative" style={{ animation: "giftPulse 1.5s ease-in-out infinite" }}>
        {/* Box bottom */}
        <div
          className="w-40 h-32 md:w-52 md:h-40 rounded-xl relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #ef4444, #dc2626)",
            boxShadow: "0 10px 40px rgba(239,68,68,0.4), inset 0 2px 10px rgba(255,255,255,0.2)",
          }}
        >
          {/* Vertical ribbon */}
          <div className="absolute left-1/2 top-0 bottom-0 w-5 md:w-7 -translate-x-1/2 bg-yellow-400 opacity-90" />
          {/* Horizontal ribbon */}
          <div className="absolute top-1/2 left-0 right-0 h-5 md:h-7 -translate-y-1/2 bg-yellow-400 opacity-90" />
        </div>
        {/* Lid */}
        <div
          className="absolute -top-5 md:-top-6 -left-2 -right-2 h-10 md:h-12 rounded-xl"
          style={{
            background: "linear-gradient(145deg, #f87171, #ef4444)",
            boxShadow: "0 -2px 15px rgba(239,68,68,0.3)",
          }}
        >
          <div className="absolute left-1/2 top-0 bottom-0 w-5 md:w-7 -translate-x-1/2 bg-yellow-400 opacity-90" />
        </div>
        {/* Bow */}
        <div className="absolute -top-12 md:-top-14 left-1/2 -translate-x-1/2">
          <div className="relative w-16 h-10 md:w-20 md:h-12">
            <div
              className="absolute left-0 top-2 w-8 h-7 md:w-10 md:h-8 rounded-full"
              style={{
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                transform: "rotate(-20deg)",
              }}
            />
            <div
              className="absolute right-0 top-2 w-8 h-7 md:w-10 md:h-8 rounded-full"
              style={{
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                transform: "rotate(20deg)",
              }}
            />
            <div
              className="absolute left-1/2 top-3 w-4 h-4 md:w-5 md:h-5 -translate-x-1/2 rounded-full"
              style={{ background: "linear-gradient(135deg, #fcd34d, #fbbf24)" }}
            />
          </div>
        </div>
        {/* Sparkles around */}
        <div className="absolute -top-16 -left-6 text-2xl animate-ping" style={{ animationDuration: "2s" }}>✨</div>
        <div className="absolute -top-10 -right-8 text-xl animate-ping" style={{ animationDuration: "1.5s", animationDelay: "0.5s" }}>⭐</div>
        <div className="absolute -bottom-4 -left-8 text-xl animate-ping" style={{ animationDuration: "1.8s", animationDelay: "0.3s" }}>🌟</div>
        <div className="absolute -bottom-2 -right-6 text-2xl animate-ping" style={{ animationDuration: "2.2s", animationDelay: "0.8s" }}>✨</div>
      </div>
      <p className="text-lg text-pink-300 mt-4 opacity-75 animate-pulse">
        👆 Тапни скорее! 👆
      </p>
    </div>
  );
}

/* ───────── Card ───────── */
function GreetingCard() {
  return (
    <div
      className="w-full max-w-2xl mx-auto"
      style={{ animation: "cardAppear 1.2s ease-out 1s both" }}
    >
      <div
        className="rounded-3xl p-1"
        style={{
          background: "linear-gradient(135deg, #f472b6, #a855f7, #6366f1, #ec4899)",
          boxShadow: "0 20px 60px rgba(168,85,247,0.3)",
        }}
      >
        <div
          className="rounded-3xl p-6 md:p-10"
          style={{
            background: "linear-gradient(135deg, #fdf2f8, #faf5ff, #fff7ed)",
          }}
        >
          {/* Title */}
          <h1
            className="text-3xl md:text-5xl font-black text-center mb-6 leading-tight"
            style={{
              background: "linear-gradient(135deg, #ec4899, #a855f7, #ef4444)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "fadeInUp 0.8s ease-out 1.3s both",
            }}
          >
            🎂 С Днём Рождения, <br />
            любимая Крёстная Леночка! 🎂
          </h1>

          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 mb-6" />

          {/* Capybara */}
          <CapybaraScene />

          {/* Text */}
          <div
            className="space-y-4 text-base md:text-lg leading-relaxed text-gray-700"
            style={{ animation: "fadeInUp 0.8s ease-out 1.8s both" }}
          >
            <p className="text-center text-xl md:text-2xl font-semibold text-pink-600">
              💖 Дорогая наша Леночка! 💖
            </p>
            <p>
              Мы с мамой от всего сердца поздравляем тебя с этим прекрасным и
              светлым днём! 🌸✨ Ты — самый добрый, самый тёплый и самый родной
              человек на свете! Рядом с тобой всегда уютно и спокойно, как за
              чашечкой ароматного чая в кругу самых близких ☕🥰
            </p>
            <p>
              Желаем тебе крепкого-крепкого здоровья 💪, бесконечных искренних
              улыбок 😊, моря счастья 🌊💫 и чтобы каждый новый день приносил
              только радость, любовь и приятные сюрпризы! Пусть глаза всегда
              сияют, а душа поёт! 🎵💕
            </p>
            <p>
              Пусть все мечты исполняются, пусть рядом будут только любящие
              люди, а жизнь будет наполнена теплом, смехом и гармонией! 🌺🌈
            </p>

            {/* Certificate block */}
            <div
              className="my-6 rounded-2xl p-5 md:p-7 border-2 border-dashed border-purple-300 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #fdf4ff, #fef3c7, #fdf2f8)",
              }}
            >
              <div className="absolute top-2 right-3 text-3xl animate-bounce">🎁</div>
              <p className="text-center text-xl md:text-2xl font-bold text-purple-700 mb-3">
                🎀 Подарочный Сертификат 🎀
              </p>
              <p className="text-center text-gray-700">
                А ещё мы хотим подарить тебе кое-что особенное! 🎉 Этот
                сертификат даёт тебе возможность выбрать <strong className="text-purple-600">любой
                современный смартфон</strong> 📱, какой только пожелает твоё
                сердце! 💜
              </p>
              <p className="text-center text-gray-700 mt-2">
                Чтобы мы всегда были на связи 📞, чтобы тебе было удобно
                общаться, смотреть фоточки и видео 📸, и чтобы каждый день
                был ещё комфортнее и ярче! ✨📲
              </p>
              <p className="text-center text-lg font-semibold text-pink-600 mt-3">
                Выбирай лучший — ты это заслуживаешь! 👑💖
              </p>
            </div>

            <p className="text-center text-xl md:text-2xl font-bold text-pink-600 mt-6">
              С безграничной любовью, <br />
              твои родные 🥰💕
            </p>

            <div className="flex justify-center gap-2 text-3xl mt-4">
              <span className="animate-bounce" style={{ animationDelay: "0s" }}>🌷</span>
              <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>💐</span>
              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>🌸</span>
              <span className="animate-bounce" style={{ animationDelay: "0.3s" }}>🎂</span>
              <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>🎈</span>
              <span className="animate-bounce" style={{ animationDelay: "0.5s" }}>💝</span>
              <span className="animate-bounce" style={{ animationDelay: "0.6s" }}>🥳</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Main App ───────── */
export function App() {
  const [opened, setOpened] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => setShowCard(true), 800);
  };

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translateY(-120vh) rotate(15deg); opacity: 0.6; }
        }
        @keyframes fiveLeft {
          0%   { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          30%  { transform: translate(-10vw, -20vh) scale(1.4) rotate(-15deg); opacity: 1; }
          70%  { transform: translate(-25vw, -35vh) scale(1.2) rotate(-10deg); opacity: 1; }
          100% { transform: translate(-35vw, -50vh) scale(0.8) rotate(-5deg); opacity: 0; }
        }
        @keyframes fiveRight {
          0%   { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          30%  { transform: translate(10vw, -20vh) scale(1.4) rotate(15deg); opacity: 1; }
          70%  { transform: translate(25vw, -35vh) scale(1.2) rotate(10deg); opacity: 1; }
          100% { transform: translate(35vw, -50vh) scale(0.8) rotate(5deg); opacity: 0; }
        }
        @keyframes giftPulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25%      { transform: scale(1.05) rotate(-2deg); }
          75%      { transform: scale(1.05) rotate(2deg); }
        }
        @keyframes cardAppear {
          0%   { transform: translateY(80px) scale(0.8); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes fadeInUp {
          0%   { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes giftExplode {
          0%   { transform: scale(1); opacity: 1; }
          50%  { transform: scale(1.3); opacity: 0.8; }
          100% { transform: scale(0) rotate(20deg); opacity: 0; }
        }
        @keyframes bgShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        body {
          overflow-x: hidden;
        }
      `}</style>

      <Confetti active={opened} />
      <Balloons active={opened} />
      {opened && <FlyingFives active={opened} />}

      <div
        className="min-h-screen flex items-center justify-center px-4 py-10 relative"
        style={{
          background: opened
            ? "linear-gradient(135deg, #fdf2f8, #ede9fe, #fef3c7, #fce7f3)"
            : "linear-gradient(135deg, #0f172a, #1e1b4b, #4c1d95, #831843)",
          backgroundSize: opened ? "400% 400%" : "100% 100%",
          animation: opened ? "bgShift 8s ease infinite" : "none",
          transition: "background 1.5s ease",
        }}
      >
        {/* Stars background before opening */}
        {!opened && (
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  width: rand(2, 5),
                  height: rand(2, 5),
                  top: `${rand(0, 100)}%`,
                  left: `${rand(0, 100)}%`,
                  animationDelay: `${rand(0, 3)}s`,
                  animationDuration: `${rand(1.5, 3)}s`,
                  opacity: rand(0.3, 0.8),
                }}
              />
            ))}
          </div>
        )}

        {!opened && (
          <div style={{ zIndex: 10 }}>
            <GiftBox onClick={handleOpen} />
          </div>
        )}

        {opened && !showCard && (
          <div
            className="flex items-center justify-center"
            style={{ animation: "giftExplode 0.8s ease-in forwards" }}
          >
            <div className="text-8xl">🎁</div>
          </div>
        )}

        {showCard && (
          <div className="w-full max-w-2xl z-30 relative">
            <GreetingCard />
          </div>
        )}
      </div>
    </>
  );
}
