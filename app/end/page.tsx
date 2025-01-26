'use client';

export default function EndPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">Dziękuję za poświęcony czas!</h1>
        <p className="text-lg text-text/80">
          Twoje odpowiedzi zostały zapisane. Dziękuję za udział w ankiecie!
        </p>
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
    </div>
  );
}