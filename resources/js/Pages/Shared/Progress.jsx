import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function Progress({ results, totalPoin, totalQuiz, rataRata }) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Progress Belajar
            </h1>

            <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                    <p className="text-2xl font-bold text-indigo-600">
                        {totalQuiz}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Total Quiz</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">
                        {totalPoin}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Total Poin</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">
                        {rataRata?.toFixed(0) || 0}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Rata-rata</p>
                </div>
            </div>

            {results.length > 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Grafik Nilai
                    </h2>
                    <ResponsiveContainer width="100%" height={240}>
                        <LineChart data={results}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#E5E7EB"
                            />
                            <XAxis
                                dataKey="quiz"
                                tick={{ fontSize: 12 }}
                                stroke="#9CA3AF"
                            />
                            <YAxis
                                domain={[0, 100]}
                                tick={{ fontSize: 12 }}
                                stroke="#9CA3AF"
                            />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="nilai"
                                stroke="#6366F1"
                                strokeWidth={2}
                                dot={{ fill: "#6366F1", r: 4 }}
                                name="Nilai"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 text-center text-gray-400 text-sm">
                    Belum ada data kuis.
                </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Riwayat Kuis
                </h2>
                {results.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">
                        Belum ada riwayat
                    </p>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {results.reverse().map((result) => (
                            <div
                                key={result.id}
                                className="flex justify-between items-center py-3"
                            >
                                <div>
                                    <p className="font-medium text-gray-800 text-sm">
                                        {result.quiz}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {result.tanggal}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-indigo-600 text-sm">
                                        {result.skor}/{result.total}
                                    </p>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                                        {result.nilai}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

Progress.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;

export default Progress;
