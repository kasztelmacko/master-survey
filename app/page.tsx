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
            Witaj w ankiecie do pracy magisterskiej!
          </h1>
          <div>
            Będziesz proszony/proszona o odpowiedzi na pytania dotyczące produktów
            fast food. Ankieta dotyczy Twoich preferencji, wyborów oraz czynników
            wpływających na Twoje decyzje.
          </div>
          <br />
          <div>
            Badanie jest prowadzone w celach naukowych i jest anonimowe. Twoje
            odpowiedzi pomogą w realizacji mojej pracy magisterskiej.
          </div>
          <div>
            Ankieta powinna zająć do{" "}
            <span className="font-bold">10 minut</span>.
          </div>
          <br />
          <div>
            W przypadku pytań, zachęcam do kontaktu pod adresem{" "}
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
          Rozpocznij ankietę
        </button>
      </main>
    </div>
  );
}