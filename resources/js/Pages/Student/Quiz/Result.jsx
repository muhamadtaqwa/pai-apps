import { Link } from "@inertiajs/react";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Result({
    quiz,
    skor,
    totalSoal,
    jawabanDetail,
    ranking,
    poin,
    newBadges,
}) {
    const persentase = Math.round((skor / totalSoal) * 100);

    useEffect(() => {
        if (persentase >= 80) {
            toast.success("Nilai bagus, pertahankan!", {
                duration: 4000,
                style: { background: "#6366F1", color: "#fff" },
            });
        } else if (persentase >= 50) {
            toast("Lumayan! Tingkatkan lagi!", {
                duration: 4000,
                style: { background: "#FBBF24", color: "#1F2937" },
            });
        } else {
            toast.error("Jangan menyerah! Coba lagi!", { duration: 4000 });
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-4">
            <div className="max-w-2xl mx-auto">
                {/* Score Ring */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center mb-4">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-primary p-1">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            <span className="text-4xl font-bold text-gray-900">
                                {persentase}
                            </span>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        Kuis Selesai
                    </h1>
                    <p className="text-gray-400 text-sm mb-2">{quiz.judul}</p>

                    <div className="text-lg font-semibold text-gray-700 mb-4">
                        {skor} dari {totalSoal} benar
                    </div>

                    {/* Poin & Ranking */}
                    <div className="flex justify-center gap-3 mb-4">
                        {poin > 0 && (
                            <span className="bg-gradient-primary text-white px-4 py-1.5 rounded-full text-sm font-medium">
                                +{poin} Poin
                            </span>
                        )}
                        {ranking && (
                            <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium">
                                Peringkat #{ranking}
                            </span>
                        )}
                    </div>

                    {/* Lencana Baru */}
                    {newBadges && newBadges.length > 0 && (
                        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-4">
                            <p className="text-indigo-700 font-semibold text-sm mb-2">
                                Lencana Baru
                            </p>
                            <div className="flex justify-center gap-2 flex-wrap">
                                {newBadges.map((badge) => (
                                    <span
                                        key={badge}
                                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                        <div
                            className="bg-gradient-progress h-2 rounded-full transition-all duration-700"
                            style={{ width: `${persentase}%` }}
                        ></div>
                    </div>

                    <Link
                        href="/quizzes"
                        className="inline-block bg-gradient-primary text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-indigo-200"
                    >
                        Kembali ke Daftar Kuis
                    </Link>
                </div>

                {/* Detail Jawaban */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Detail Jawaban
                    </h2>
                    <div className="space-y-2">
                        {jawabanDetail.map((item, index) => (
                            <div
                                key={item.question_id}
                                className={`p-4 rounded-xl border ${
                                    item.is_benar
                                        ? "border-teal-200 bg-teal-50"
                                        : "border-red-200 bg-red-50"
                                }`}
                            >
                                <p className="font-medium text-gray-800 text-sm">
                                    {index + 1}. {item.pertanyaan}
                                </p>
                                {item.pembahasan && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.pembahasan}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
