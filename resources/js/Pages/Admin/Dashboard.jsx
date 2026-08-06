import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function Dashboard({
    totalUsers,
    totalSchools,
    totalClasses,
    totalQuizzes,
}) {
    const stats = [
        { label: "Total User", value: totalUsers },
        { label: "Sekolah", value: totalSchools },
        { label: "Kelas", value: totalClasses },
        { label: "Quiz", value: totalQuizzes },
    ];

    const menus = [
        {
            label: "Kelola User",
            desc: "Lihat, edit, hapus user",
            href: "/admin/users",
        },
        {
            label: "Kelola Sekolah",
            desc: "Tambah dan hapus sekolah",
            href: "/admin/schools",
        },
        {
            label: "Kelola Kelas",
            desc: "Tambah dan hapus kelas",
            href: "/admin/classes",
        },
    ];

    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    Admin Panel
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white rounded-2xl border border-gray-100 p-4 text-center"
                        >
                            <p className="text-2xl font-bold text-indigo-600">
                                {stat.value}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="space-y-3">
                    {menus.map((menu) => (
                        <Link
                            key={menu.label}
                            href={menu.href}
                            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-indigo-200 transition-all duration-300 flex items-center gap-4"
                        >
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                                <span className="text-indigo-600 font-bold text-sm">
                                    {menu.label.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {menu.label}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {menu.desc}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
