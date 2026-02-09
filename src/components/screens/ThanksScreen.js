export default function ThanksScreen({ onPlayAgain }) {
  return (
    <div className="bg-white p-10 rounded-[40px] shadow-xl text-center">
      <h1 className="text-5xl mb-4">🌟</h1>
      <h2 className="text-2xl font-bold mb-8">Terima Kasih!</h2>
      <button
        onClick={onPlayAgain}
        className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold"
      >
        Main Lagi
      </button>
    </div>
  );
}