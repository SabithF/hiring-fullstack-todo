const CircularProgress = ({ progress }) => {
  const angle = progress * 3.6; 

  return (
    <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center relative">
      
      <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>

     
      <div
        className="absolute inset-0 rounded-full border-4 border-blue-500"
        style={{
          clipPath: "circle(50%)",
          mask: `conic-gradient(#3b82f6 ${angle}deg, transparent ${angle}deg)`
        }}
      ></div>

      
      <p className="text-white font-semibold text-lg">{progress}%</p>
    </div>
  );
};

export default CircularProgress;
