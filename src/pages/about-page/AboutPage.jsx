export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 py-12 px-6 md:px-16 shadow-sm">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src="/euc-logo.png"
              className="w-14 h-14 md:w-16 md:h-16"
              alt="EUC Logo"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Timelyfy
            </h1>
            <img
              src="/timelyfy.svg"
              className="w-14 h-14 md:w-16 md:h-16"
              alt="Timelyfy Logo"
            />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A Web-based Automatic Scheduling System using Greedy Algorithm for
            MSEUF-CI
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          {/* About Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/30 p-8 md:p-12 mb-12 border border-gray-100 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-maroon-800 dark:text-red-400 mb-6">
              About Timelyfy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              <span className="font-semibold text-maroon-700 dark:text-red-400">
                Timelyfy
              </span>{" "}
              is a web-based collaboration platform designed to simplify the
              process of schedule creation for college students in MSEUF-CI.
              Timelyfy helps administrators manage their time efficiently with
              the main feature of automagically allocating courses. With
              Timelyfy, the progress of every schedule creator is transparent
              and connected to one another, resulting in effortless conflict
              checking.
            </p>
          </div>

          {/* Developers Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/30 p-8 md:p-12 border border-gray-100 dark:border-gray-700">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              The Developers
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {/* Developer 1 */}
              <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <img
                  className="w-28 h-28 rounded-full mb-4 object-cover ring-4 ring-gray-100 dark:ring-gray-700"
                  src="https://cdn.pixilart.com/images/user/profile/large/7ad5a882722beee.png?v=1660092107"
                  alt="Marc Joel Baldoz"
                />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Marc Joel Baldoz
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  User Interface and Backend
                </p>
                <div className="size-20 flex">
                  <a href="https://vite.dev"></a>
                  <a href="https://vite.dev">
                    <img src="https://vite.dev/logo.svg" alt="Vite React" />
                  </a>
                </div>
              </div>

              {/* Developer 2 */}
              <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <img
                  className="w-28 h-28 rounded-full mb-4 object-cover ring-4 ring-gray-100 dark:ring-gray-700"
                  src="https://dthezntil550i.cloudfront.net/7s/latest/7s1803041752176120002886709/3a6b5559-1013-4bad-8223-78974818271d.png"
                  alt="Emmanuel Ona"
                />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Emmanuel Ona
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Greedy Scheduler Algorithm
                </p>

                <a href="https://fastapi.tiangolo.com">
                  <img
                    src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png"
                    alt="Fast API"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-auto">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Timelyfy - Scheduler for MSEUF-CI.
          All rights reserved.
        </p>
      </footer>
    </div>
  );
}
