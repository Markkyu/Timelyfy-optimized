export default function EmptyContent({ icon: Icon, emptyTitle, emptyDesc }) {
  return (
    <>
      <div className="bg-gray-300 p-8 rounded-full mb-6">
        <Icon className="text-gray-600" sx={{ fontSize: 56 }} />
      </div>
      <h3 className="text-4xl font-bold text-gray-700 mb-3">{emptyTitle}</h3>
      <p className="text-lg text-gray-600 text-center max-w-md">{emptyDesc}</p>
    </>
  );
}
