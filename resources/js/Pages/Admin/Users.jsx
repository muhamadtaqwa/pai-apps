import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Users({ users }) {
    const { delete: destroy } = useForm();

    function handleDelete(user) {
        if (confirm("Yakin hapus user ini?")) {
            destroy(`/admin/users/${user.id}`, {
                onSuccess: () => toast.success("User dihapus!"),
            });
        }
    }

    return (
        <AuthenticatedLayout>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <Link
                    href="/admin"
                    className="text-indigo-500 hover:text-indigo-600 font-medium text-sm mb-4 inline-block"
                >
                    Kembali
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    Kelola User
                </h1>

                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50">
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400">
                                        Nama
                                    </th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400">
                                        Email
                                    </th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400">
                                        Role
                                    </th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400">
                                        Sekolah
                                    </th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400">
                                        Kelas
                                    </th>
                                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-400">
                                        Poin
                                    </th>
                                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-400">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b border-gray-50 hover:bg-gray-50"
                                    >
                                        <td className="py-3 px-4 text-sm font-medium text-gray-800">
                                            {user.name}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-500">
                                            {user.email}
                                        </td>
                                        <td className="py-3 px-4 text-sm">
                                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-500">
                                            {user.school?.nama || "-"}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-500">
                                            {user.school_class?.nama || "-"}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-center font-semibold text-indigo-600">
                                            {user.total_poin}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <button
                                                onClick={() =>
                                                    handleDelete(user)
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
            </div>
        </AuthenticatedLayout>
    );
}
