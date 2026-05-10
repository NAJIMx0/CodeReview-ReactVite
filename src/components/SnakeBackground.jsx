import snake1 from '../assets/snake1.jfif';
import snake2 from '../assets/snake2.jfif';

export default function SnakeBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* lighter overlay */}
            <div className="absolute inset-0 bg-black/60 z-10" />

            <img
                src={snake1}
                alt=""
                className="absolute -left-10 top-0 w-[60%] z-0"
                style={{
                    animation: 'float1 14s ease-in-out infinite',
                    filter: 'grayscale(100%) brightness(0.5)',
                    opacity: 0.9,
                }}
            />

            <img
                src={snake2}
                alt=""
                className="absolute -right-10 bottom-0 w-[60%] z-0"
                style={{
                    animation: 'float2 18s ease-in-out infinite',
                    filter: 'grayscale(100%) brightness(0.5)',
                    opacity: 0.9,
                }}
            />

            <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(-2deg) scale(1); }
          50% { transform: translateY(-25px) rotate(2deg) scale(1.03); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(2deg) scale(1); }
          50% { transform: translateY(25px) rotate(-2deg) scale(1.03); }
        }
      `}</style>
        </div>
    );
}