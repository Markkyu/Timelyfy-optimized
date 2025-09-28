export default function AboutPage() {
  return (
    <div className="h-full flex flex-col bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white py-8 px-6 md:px-16 text-center shadow-md">
        <h1 className="text-3xl md:text-5xl font-bold flex flex-col md:flex-row items-center justify-center gap-3">
          <img
            src="/euc-logo.png"
            className="w-12 h-12 md:w-14 md:h-14"
            alt="EUC Logo"
          />
          Timelyfy
          <img
            src="/timelyfy.svg"
            className="w-12 h-12 md:w-14 md:h-14"
            alt="Timelyfy Logo"
          />
        </h1>
        <p className="text-base md:text-lg mt-4 italic max-w-3xl mx-auto text-gray-600">
          A Web-based Automatic Scheduling System using Greedy Algorithm For
          MSEUF-CI
        </p>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 md:px-16 ">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* About Section */}
          <div className="bg-white shadow-lg rounded-2xl p-8 border h-full">
            <h2 className="text-xl md:text-3xl font-semibold text-maroon-700 mb-4">
              About Timelyfy
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">
              <b> Timelyfy </b> is a web-based collaboration platform designed
              to simplify the process of schedule creation for college students
              in MSEUF-CI. Timelyfy helps administrators manage their time
              efficiently with the main feature of automagically allocating
              courses in just a few seconds. With Timelyfy, the progress of
              every schedule creator is transparent and connected to one
              another, resulting in effortless conflict checking.
            </p>
          </div>

          {/* Developers Section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold text-gray-800">The Developers</h3>
            <div className="bg-white shadow-md rounded-xl p-6 border flex flex-col items-center">
              <img
                className="w-24 h-24 bg-gray-200 rounded-full mb-4 object-cover"
                src="https://cdn.pixilart.com/images/user/profile/large/7ad5a882722beee.png?v=1660092107"
                alt="MJ"
                title="MJ"
              />
              <h4 className="font-semibold text-lg text-maroon-800">MJ</h4>
              <p className="text-sm text-gray-400">Front end Developer</p>
              <p className="text-sm text-gray-600">
                User Interface and User Experience
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 border flex flex-col items-center">
              <img
                className="w-24 h-24 bg-gray-200 rounded-full mb-4 object-cover"
                src="https://dthezntil550i.cloudfront.net/7s/latest/7s1803041752176120002886709/3a6b5559-1013-4bad-8223-78974818271d.png"
                alt="EG"
                title="EG"
              />
              <h4 className="font-semibold text-lg text-maroon-800">EG</h4>
              <p className="text-sm text-gray-400">Back end Developer</p>
              <p className="text-sm text-gray-600">
                API-Database and Algorithm
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
