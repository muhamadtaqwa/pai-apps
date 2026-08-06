import { Link } from "@inertiajs/react";

export default function Forbidden() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center max-w-md w-full">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-red-100 flex items-center justify-center">
                    <span className="text-3xl text-red-500 font-bold">403</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 mb-2">
                    Akses Ditolak
                </h1>
                <p className="text-gray-400 text-sm mb-6">
                    Kamu tidak punya izin untuk mengakses halaman ini.
                </p>
                <Link
                    href="/dashboard"
                    className="bg-gradient-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition"
                >
                    Kembali ke Dashboard
                </Link>
            </div>
        </div>
    );
}
