import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";

function Dashboard() {
    const { auth } = usePage().props;
    const user = auth?.user;

    const menuItems = [
        {
            title: "Materi",
            desc: "Baca materi PAI interaktif",
            href: "/materials",
        },
        {
            title: "Quiz",
            desc: "Uji pemahaman dengan kuis",
            href: "/quizzes",
        },
        {
            title: "Progress",
            desc: "Pantau perkembangan nilai",
            href: "/progress",
        },
        {
            title: "Peringkat",
            desc: "Leaderboard antar siswa",
            href: "/leaderboard",
        },
        {
            title: "Lencana",
            desc: "Koleksi pencapaianmu",
            href: "/badges",
        },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="py-6 px-4 max-w-4xl mx-auto">
                <div className="inline-block mb-6">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
                        {user?.role?.toUpperCase()}
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {menuItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-indigo-200 transition-all duration-300"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                                {item.desc}
                            </p>
                        </Link>
                    ))}
                </div>

                {user?.role === "admin" && (
                    <div className="mt-4">
                        <Link
                            href="/admin"
                            className="block bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-indigo-200 transition-all duration-300"
                        >
                            <h3 className="text-lg font-semibold text-gray-900">
                                Admin Panel
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Kelola sekolah, user, dan kelas
                            </p>
                        </Link>
                    </div>
                )}

                <p className="text-center text-gray-400 text-xs mt-8">
                    PAI Apps — Media Pembelajaran Interaktif
                </p>
            </div>
        </>
    );
}

// Pola persistent layout: AuthenticatedLayout dipasang di sini,
// bukan dibungkus langsung di JSX return komponen.
// Header (yang butuh data user) tetap bisa dikirim sebagai prop.
Dashboard.layout = (page) => (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold text-gray-800">
                Halo, {page.props.auth?.user?.name}
            </h2>
        }
    >
        {page}
    </AuthenticatedLayout>
);

export default Dashboard;
