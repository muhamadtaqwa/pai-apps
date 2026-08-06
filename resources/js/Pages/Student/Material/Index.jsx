import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage } from "@inertiajs/react";

const typeConfig = {
    ringkasan: { label: "Ringkasan" },
    video: { label: "Video" },
    pdf: { label: "PDF" },
};

function Index({ materials }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Daftar Materi
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Pilih materi untuk dipelajari
                    </p>
                </div>
                {(user?.role === "guru" || user?.role === "admin") && (
                    <Link
                        href="/materials/create"
                        className="bg-gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition shadow-lg shadow-indigo-200"
                    >
                        Tambah Materi
                    </Link>
                )}
            </div>

            {materials.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-400">Belum ada materi</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {materials.map((material) => {
                        const config =
                            typeConfig[material.tipe] || typeConfig.ringkasan;
                        return (
                            <Link
                                key={material.id}
                                href={`/materials/${material.id}`}
                                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-indigo-200 transition-all duration-300 flex items-center gap-4"
                            >
                                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                                    <span className="text-indigo-600 font-bold text-xs">
                                        {config.label[0]}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-lg font-semibold text-gray-900 truncate">
                                        {material.judul}
                                    </h2>
                                    <p className="text-gray-400 text-sm">
                                        {config.label} · {material.user?.name}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;

export default Index;
