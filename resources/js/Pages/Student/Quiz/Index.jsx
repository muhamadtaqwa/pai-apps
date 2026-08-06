import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage } from "@inertiajs/react";

function Index({ quizzes }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Daftar Kuis
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Pilih kuis untuk dikerjakan
                    </p>
                </div>
                {(user?.role === "guru" || user?.role === "admin") && (
                    <Link
                        href="/quizzes/create"
                        className="bg-gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition shadow-lg shadow-indigo-200"
                    >
                        Buat Kuis
                    </Link>
                )}
            </div>

            {quizzes.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-400">Belum ada kuis</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {quizzes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-indigo-200 transition-all duration-300"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {quiz.judul}
                                    </h2>
                                    <p className="text-gray-400 text-sm mt-1">
                                        {quiz.deskripsi}
                                    </p>
                                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                                        <span>
                                            {quiz.waktu_per_soal} detik/soal
                                        </span>
                                        <span>{quiz.user?.name}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    {(user?.role === "guru" ||
                                        user?.role === "admin") && (
                                        <Link
                                            href={`/quizzes/${quiz.id}/results`}
                                            className="text-indigo-500 bg-indigo-50 px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-100 transition"
                                        >
                                            Hasil
                                        </Link>
                                    )}
                                    <Link
                                        href={`/quizzes/${quiz.id}`}
                                        className="bg-gradient-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
                                    >
                                        Mulai
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;

export default Index;
