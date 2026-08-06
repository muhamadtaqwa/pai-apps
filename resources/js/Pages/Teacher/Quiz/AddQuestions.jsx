import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function AddQuestions({ quiz, flash }) {
    const [tipeSoal, setTipeSoal] = useState("pg");

    const { data, setData, post, processing, errors, reset } = useForm({
        pertanyaan: "",
        pembahasan: "",
        tipe: "pg",
        pilihan_a: "",
        pilihan_b: "",
        pilihan_c: "",
        pilihan_d: "",
        jawaban_benar: "",
        tambah_lagi: true,
    });

    function handleSubmit(e) {
        e.preventDefault();
        setData("tipe", tipeSoal);
        post(`/quizzes/${quiz.id}/questions`, {
            onSuccess: () => {
                toast.success("Soal berhasil ditambahkan!");
                if (data.tambah_lagi) {
                    reset();
                    setTipeSoal("pg");
                }
            },
            onError: () => toast.error("Gagal menambah soal!"),
        });
    }

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto px-4 py-8">
                <Link
                    href="/quizzes"
                    className="text-indigo-500 hover:text-indigo-600 font-medium text-sm mb-4 inline-block"
                >
                    Kembali
                </Link>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        Tambah Soal
                    </h1>
                    <p className="text-gray-400 text-sm mb-6">
                        Kuis: {quiz.judul}
                    </p>

                    {flash?.success && (
                        <div className="bg-indigo-50 text-indigo-700 p-3 rounded-xl mb-4 text-sm">
                            {flash.success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tipe Soal
                            </label>
                            <select
                                value={tipeSoal}
                                onChange={(e) => {
                                    setTipeSoal(e.target.value);
                                    setData("tipe", e.target.value);
                                }}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="pg">Pilihan Ganda</option>
                                <option value="bs">Benar / Salah</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pertanyaan
                            </label>
                            <textarea
                                value={data.pertanyaan}
                                onChange={(e) =>
                                    setData("pertanyaan", e.target.value)
                                }
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pembahasan
                            </label>
                            <textarea
                                value={data.pembahasan}
                                onChange={(e) =>
                                    setData("pembahasan", e.target.value)
                                }
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                                rows="2"
                            ></textarea>
                        </div>

                        {tipeSoal === "pg" ? (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Pilihan Jawaban
                                </label>
                                {["a", "b", "c", "d"].map((p) => (
                                    <div
                                        key={p}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-sm text-gray-500">
                                            {p.toUpperCase()}
                                        </span>
                                        <input
                                            type="text"
                                            value={data[`pilihan_${p}`]}
                                            onChange={(e) =>
                                                setData(
                                                    `pilihan_${p}`,
                                                    e.target.value,
                                                )
                                            }
                                            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Jawaban
                                </label>
                                <select
                                    value={data.jawaban_benar}
                                    onChange={(e) =>
                                        setData("jawaban_benar", e.target.value)
                                    }
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                                    required
                                >
                                    <option value="">Pilih jawaban...</option>
                                    <option value="A">Benar</option>
                                    <option value="B">Salah</option>
                                </select>
                            </div>
                        )}

                        {tipeSoal === "pg" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Jawaban Benar
                                </label>
                                <select
                                    value={data.jawaban_benar}
                                    onChange={(e) =>
                                        setData("jawaban_benar", e.target.value)
                                    }
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                                    required
                                >
                                    <option value="">
                                        Pilih jawaban benar...
                                    </option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                            </div>
                        )}

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-gradient-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-indigo-200"
                            >
                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan & Tambah Lagi"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setData("tambah_lagi", false);
                                    handleSubmit(new Event("submit"));
                                }}
                                className="bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
                            >
                                Selesai
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
