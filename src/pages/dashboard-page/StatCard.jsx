// export default function StatCard({ title, count, icon: Icon, highlight }) {
//   return (
//     <div
//       className={`flex relative items-center gap-4 rounded-full p-4 shadow-md ${
//         highlight
//           ? "bg-red-100 text-red-800 border border-red-300"
//           : "border border-gray-200 bg-white text-gray-800"
//       }`}
//     >
//       <div className="bg-gray-200 p-3 rounded-full">
//         <Icon className="text-4xl text-gray-700" />
//       </div>
//       <div>
//         <h4 className="text-md font-medium">{title}</h4>
//         <p className="text-2xl font-bold">{count}</p>
//       </div>
//     </div>
//   );
// }

const spanClasses = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
};

export default function StatCard({
  label,
  Icon,
  color,
  colSpan,
  stats,
  description,
  year,
  sem,
}) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow 
        ${spanClasses[colSpan] || ""}
        `}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className={`flex bg-gradient-to-br from-${color}-50 to-${color}-100 p-3 rounded-xl`}
        >
          <Icon size={24} className={`text-${color}-600`} />

          {label && ( // Show Label if there is label
            <h1 className={`font-semibold ml-2 text-${color}-800`}>{label}</h1>
          )}
        </div>
        {year && (
          <div
            className={`flex font-semibold text-gray-800 bg-gradient-to-br from-${color}-50 to-${color}-100 p-3 rounded-xl`}
          >
            Year {year} <span className="text-gray-400 font-light px-2">|</span>{" "}
            Sem {sem}
          </div>
        )}
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats}</h3>
      <p className="text-sm text-gray-600 font-medium">{description}</p>
    </div>
  );
}
