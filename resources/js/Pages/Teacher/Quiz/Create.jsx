import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Create({ schools, classes }) {
    const { data, setData, post, processing, errors } = useForm({
        judul: "",
        deskripsi: "",
        waktu_per_soal: 30,
        school_id: "",
        school_class_id: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post("/quizzes", {
            onSuccess: () => toast.success("Kuis berhasil dibuat!"),
            onError: () => toast.error("Gagal membuat kuis!"),
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
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        Buat Kuis Baru
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Judul Kuis
                            </label>
                            <input
                                type="text"
                                value={data.judul}
                                onChange={(e) =>
                                    setData("judul", e.target.value)
                                }
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.deskripsi}
                                onChange={(e) =>
                                    setData("deskripsi", e.target.value)
                                }
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                                rows="3"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sekolah
                                </label>
                                <select
                                    value={data.school_id}
                                    onChange={(e) =>
                                        setData("school_id", e.target.value)
                                    }
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Semua</option>
                                    {schools?.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Kelas
                                </label>
                                <select
                                    value={data.school_class_id}
                                    onChange={(e) =>
                                        setData(
                                            "school_class_id",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Semua</option>
                                    {classes?.map((k) => (
                                        <option key={k.id} value={k.id}>
                                            {k.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Waktu per Soal (detik)
                            </label>
                            <input
                                type="number"
                                value={data.waktu_per_soal}
                                onChange={(e) =>
                                    setData("waktu_per_soal", e.target.value)
                                }
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                                min="10"
                                max="120"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gradient-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-indigo-200"
                        >
                            {processing ? "Menyimpan..." : "Lanjut Tambah Soal"}
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
