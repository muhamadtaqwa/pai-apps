import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function Results({ quiz, results }) {
    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <Link
                    href="/quizzes"
                    className="text-indigo-500 hover:text-indigo-600 font-medium text-sm mb-4 inline-block"
                >
                    Kembali ke Daftar Kuis
                </Link>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                Hasil Kuis: {quiz.judul}
                            </h1>
                            <p className="text-gray-400 text-sm">
                                {quiz.deskripsi}
                            </p>
                        </div>
                        {results.length > 0 && (
                            <div className="flex gap-2">
                                <a
                                    href={`/quizzes/${quiz.id}/export-excel`}
                                    className="bg-gradient-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
                                >
                                    Excel
                                </a>
                                <a
                                    href={`/quizzes/${quiz.id}/export-pdf`}
                                    className="border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
                                >
                                    PDF
                                </a>
                            </div>
                        )}
                    </div>

                    {results.length === 0 ? (
                        <div className="text-center py-10 text-gray-400 text-sm">
                            Belum ada siswa yang mengerjakan
                        </div>
                    ) : (
                        <>
                            <div className="bg-indigo-50 rounded-2xl p-6 mb-6">
                                <h3 className="text-lg font-bold text-indigo-800 mb-4 text-center">
                                    Top 3
                                </h3>
                                <div className="flex justify-center gap-4">
                                    {results
                                        .slice(0, 3)
                                        .map((result, index) => {
                                            const nilai = Math.round(
                                                (result.skor /
                                                    result.total_soal) *
                                                    100,
                                            );
                                            const colors = [
                                                "bg-gradient-primary",
                                                "bg-gray-300",
                                                "bg-gray-200",
                                            ];
                                            return (
                                                <div
                                                    key={result.id}
                                                    className="text-center"
                                                >
                                                    <div
                                                        className={`w-12 h-12 ${colors[index]} rounded-2xl mx-auto flex items-center justify-center text-white font-bold text-lg mb-2 shadow-lg`}
                                                    >
                                                        {index + 1}
                                                    </div>
                                                    <p className="font-semibold text-gray-800 text-sm">
                                                        {result.user?.name}
                                                    </p>
                                                    <p className="text-indigo-600 font-bold text-sm">
                                                        {nilai}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-400">
                                                #
                                            </th>
                                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-400">
                                                Nama
                                            </th>
                                            <th className="text-center py-3 px-3 text-xs font-semibold text-gray-400">
                                                Skor
                                            </th>
                                            <th className="text-center py-3 px-3 text-xs font-semibold text-gray-400">
                                                Nilai
                                            </th>
                                            <th className="text-center py-3 px-3 text-xs font-semibold text-gray-400">
                                                Tanggal
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map((result, index) => {
                                            const nilai = Math.round(
                                                (result.skor /
                                                    result.total_soal) *
                                                    100,
                                            );
                                            return (
                                                <tr
                                                    key={result.id}
                                                    className="border-b border-gray-50 hover:bg-gray-50"
                                                >
                                                    <td className="py-3 px-3 text-sm text-gray-500">
                                                        {index + 1}
                                                    </td>
                                                    <td className="py-3 px-3 text-sm font-medium text-gray-800">
                                                        {result.user?.name}
                                                    </td>
                                                    <td className="py-3 px-3 text-sm text-center font-semibold text-indigo-600">
                                                        {result.skor}/
                                                        {result.total_soal}
                                                    </td>
                                                    <td className="py-3 px-3 text-center">
                                                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                                            {nilai}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 text-xs text-center text-gray-400">
                                                        {result.selesai_pada
                                                            ? new Date(
                                                                  result.selesai_pada,
                                                              ).toLocaleDateString(
                                                                  "id-ID",
                                                              )
                                                            : "-"}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
