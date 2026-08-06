import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Schools({ schools }) {
    const { data, setData, post, reset, processing } = useForm({
        nama: "",
        alamat: "",
        kode: "",
    });
    const { delete: destroy } = useForm();

    function handleSubmit(e) {
        e.preventDefault();
        post("/admin/schools", {
            onSuccess: () => {
                toast.success("Sekolah ditambahkan!");
                reset();
            },
        });
    }

    function handleDelete(id) {
        if (confirm("Yakin hapus?")) {
            destroy(`/admin/schools/${id}`, {
                onSuccess: () => toast.success("Sekolah dihapus!"),
            });
        }
    }

    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <Link
                    href="/admin"
                    className="text-indigo-500 hover:text-indigo-600 font-medium text-sm mb-4 inline-block"
                >
                    Kembali
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    Kelola Sekolah
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl border border-gray-100 p-6 mb-6"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                            type="text"
                            placeholder="Nama Sekolah"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                            className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Alamat"
                            value={data.alamat}
                            onChange={(e) => setData("alamat", e.target.value)}
                            className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="text"
                            placeholder="Kode (ex: ALMNH)"
                            value={data.kode}
                            onChange={(e) => setData("kode", e.target.value)}
                            className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-4 bg-gradient-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition shadow-lg shadow-indigo-200"
                    >
                        Tambah Sekolah
                    </button>
                </form>

                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400">
                                    Nama
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400">
                                    Kode
                                </th>
                                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-400">
                                    User
                                </th>
                                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-400">
                                    Kelas
                                </th>
                                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-400">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {schools.map((school) => (
                                <tr
                                    key={school.id}
                                    className="border-b border-gray-50 hover:bg-gray-50"
                                >
                                    <td className="py-3 px-4 text-sm font-medium">
                                        {school.nama}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-500">
                                        {school.kode}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-center">
                                        {school.users_count}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-center">
                                        {school.classes_count}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() =>
                                                handleDelete(school.id)
                                            }
                                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
