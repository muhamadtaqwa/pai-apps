import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

function Show({ material }) {
    return (
        <div className="max-w-3xl mx-auto px-4 py-6">
            <Link
                href="/materials"
                className="text-indigo-500 hover:text-indigo-600 font-medium text-sm inline-block mb-4"
            >
                Kembali ke Daftar Materi
            </Link>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600 mb-4">
                    {material.tipe}
                </span>

                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    {material.judul}
                </h1>

                <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                    {material.konten}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-400">
                    Dibuat oleh: {material.user?.name}
                </div>
            </div>
        </div>
    );
}

Show.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;

export default Show;
