const StatCard = ({ title, count, icon: Icon, highlight }) => {
  return (
    <div
      className={`flex relative items-center gap-4 rounded-xl p-4 shadow-md ${
        highlight
          ? "bg-red-100 text-red-800 border border-red-300"
          : "border border-gray-200 bg-white text-gray-800"
      }`}
    >
      <div className="bg-gray-100 p-3 rounded-full">
        <Icon className="text-xl text-gray-700" />
      </div>
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
};

export default StatCard;
