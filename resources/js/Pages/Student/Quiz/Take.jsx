import { useState, useEffect, useRef } from "react";
import { useForm, Link } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Take({ quiz, sudahDikerjakan }) {
    const [soalAktif, setSoalAktif] = useState(0);
    const [waktu, setWaktu] = useState(quiz.waktu_per_soal);
    const [jawabanDipilih, setJawabanDipilih] = useState({});
    const [selesai, setSelesai] = useState(false);
    const timerRef = useRef(null);

    const { data, setData, post, processing } = useForm({
        answers: {},
    });

    const questions = quiz.questions;
    const questionNow = questions[soalAktif];

    useEffect(() => {
        if (selesai) return;
        timerRef.current = setInterval(() => {
            setWaktu((prev) => {
                if (prev <= 1) {
                    toast("Waktu habis!");
                    handleNext();
                    return quiz.waktu_per_soal;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [soalAktif, selesai]);

    function handleJawab(answerId) {
        setJawabanDipilih({ ...jawabanDipilih, [questionNow.id]: answerId });
    }

    function handleNext() {
        clearInterval(timerRef.current);
        if (soalAktif < questions.length - 1) {
            setSoalAktif(soalAktif + 1);
            setWaktu(quiz.waktu_per_soal);
        } else {
            setSelesai(true);
            setData("answers", jawabanDipilih);
        }
    }

    function handleSubmit() {
        post(`/quizzes/${quiz.id}/submit`);
    }

    if (sudahDikerjakan) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center max-w-md w-full">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-100 flex items-center justify-center">
                        <span className="text-2xl text-indigo-500">!</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Kuis Sudah Dikerjakan
                    </h2>
                    <p className="text-gray-400 text-sm mb-6">
                        Kamu sudah menyelesaikan kuis ini sebelumnya.
                    </p>
                    <Link
                        href="/quizzes"
                        className="text-indigo-500 hover:text-indigo-600 font-medium text-sm"
                    >
                        Kembali ke daftar kuis
                    </Link>
                </div>
            </div>
        );
    }

    if (selesai) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center max-w-md w-full">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-primary flex items-center justify-center">
                        <span className="text-2xl text-white">S</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Siap Kirim!
                    </h2>
                    <p className="text-gray-400 text-sm mb-6">
                        Kamu menjawab {Object.keys(jawabanDipilih).length} dari{" "}
                        {questions.length} soal
                    </p>
                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className="w-full bg-gradient-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
                    >
                        {processing ? "Mengirim..." : "Kirim Jawaban"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-2xl w-full">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-400">
                        Soal {soalAktif + 1} / {questions.length}
                    </span>
                    <span
                        className={`font-bold text-lg ${waktu <= 5 ? "text-red-500" : "text-gray-700"}`}
                    >
                        {waktu}s
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                    <div
                        className="bg-gradient-progress h-2 rounded-full transition-all duration-300"
                        style={{
                            width: `${((soalAktif + 1) / questions.length) * 100}%`,
                        }}
                    ></div>
                </div>

                {/* Pertanyaan */}
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    {questionNow?.pertanyaan}
                </h2>

                {/* Pilihan */}
                <div className="space-y-2 mb-6">
                    {questionNow?.answers.map((answer) => (
                        <button
                            key={answer.id}
                            onClick={() => handleJawab(answer.id)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                                jawabanDipilih[questionNow.id] === answer.id
                                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                    : "border-gray-100 hover:border-gray-300 text-gray-700"
                            }`}
                        >
                            <span className="font-medium">
                                {answer.pilihan}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    disabled={!jawabanDipilih[questionNow?.id]}
                    className="w-full bg-gradient-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {soalAktif < questions.length - 1 ? "Lanjut" : "Selesai"}
                </button>
            </div>
        </div>
    );
}
