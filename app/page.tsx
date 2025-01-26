"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStartSurvey = () => {
    router.push("/survey");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Welcome to My Masters Thesis survey!
          </h1>
          <div>
            You will be asked questions concerning fast food brands. The survey
            asks about your preferences, choices, and factors influencing your
            decisions.
          </div>
          <br />
          <div>
            The research is conducted for scientific purposes and is anonymous.
            Your answers will help my master's thesis.
          </div>
          <div>
            The survey should take up to{" "}
            <span className="font-bold">10 minutes</span>.
          </div>
          <br />
          <div>
            In case of any questions, feel free to contact me at{" "}
            <a
              href="mailto:m.kasztelani@student.uw.edu.pl"
              className="text-primary"
            >
              m.kasztelani@student.uw.edu.pl
            </a>
            .
          </div>
        </div>

        <button
          onClick={handleStartSurvey}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Start Survey
        </button>
      </main>
    </div>
  );
}