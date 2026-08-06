import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Create({ schools, classes }) {
    const { data, setData, post, processing, errors } = useForm({
        judul: "",
        konten: "",
        tipe: "ringkasan",
        school_id: "",
        school_class_id: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post("/materials", {
            onSuccess: () => toast.success("Materi berhasil dibuat!"),
            onError: () => toast.error("Gagal membuat materi!"),
        });
    }

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto px-4 py-8">
                <Link
                    href="/materials"
                    className="text-indigo-500 hover:text-indigo-600 font-medium text-sm mb-4 inline-block"
                >
                    Kembali
                </Link>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        Tambah Materi Baru
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Judul Materi
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
                                Tipe
                            </label>
                            <select
                                value={data.tipe}
                                onChange={(e) =>
                                    setData("tipe", e.target.value)
                                }
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="ringkasan">Ringkasan</option>
                                <option value="video">Video</option>
                                <option value="pdf">PDF</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Konten
                            </label>
                            <textarea
                                value={data.konten}
                                onChange={(e) =>
                                    setData("konten", e.target.value)
                                }
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                                rows="10"
                                required
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

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gradient-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-indigo-200"
                        >
                            {processing ? "Menyimpan..." : "Simpan Materi"}
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
