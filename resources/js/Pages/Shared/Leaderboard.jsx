import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function Leaderboard({ leaderboard, rankSaya, user }) {
    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Peringkat</h1>

            {rankSaya && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 mb-6 text-center">
                    <p className="text-indigo-700 font-semibold">
                        Peringkat Kamu: #{rankSaya} · {user.total_poin} Poin
                    </p>
                </div>
            )}

            {leaderboard.length > 0 && (
                <div className="flex justify-center items-end gap-3 mb-8">
                    {leaderboard[1] && (
                        <div className="text-center">
                            <div className="w-14 h-14 bg-gray-200 rounded-2xl mx-auto flex items-center justify-center text-xl font-bold text-gray-500 mb-2">
                                2
                            </div>
                            <p className="text-xs font-semibold truncate w-16">
                                {leaderboard[1].name}
                            </p>
                            <p className="text-xs text-gray-400">
                                {leaderboard[1].total_poin}
                            </p>
                        </div>
                    )}
                    {leaderboard[0] && (
                        <div className="text-center -mt-4">
                            <div className="w-18 h-18 bg-gradient-primary rounded-2xl mx-auto flex items-center justify-center text-2xl font-bold text-white mb-2 shadow-lg shadow-indigo-200">
                                1
                            </div>
                            <p className="text-xs font-semibold truncate w-20">
                                {leaderboard[0].name}
                            </p>
                            <p className="text-xs text-indigo-600 font-semibold">
                                {leaderboard[0].total_poin}
                            </p>
                        </div>
                    )}
                    {leaderboard[2] && (
                        <div className="text-center">
                            <div className="w-14 h-14 bg-gray-100 rounded-2xl mx-auto flex items-center justify-center text-xl font-bold text-gray-600 mb-2">
                                3
                            </div>
                            <p className="text-xs font-semibold truncate w-16">
                                {leaderboard[2].name}
                            </p>
                            <p className="text-xs text-gray-400">
                                {leaderboard[2].total_poin}
                            </p>
                        </div>
                    )}
                </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {leaderboard.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex items-center justify-between px-4 py-3 ${user.id === item.id ? "bg-indigo-50" : ""}`}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold ${
                                        index === 0
                                            ? "bg-gradient-primary text-white"
                                            : index === 1
                                              ? "bg-gray-200 text-gray-600"
                                              : index === 2
                                                ? "bg-gray-100 text-gray-600"
                                                : "bg-gray-100 text-gray-500"
                                    }`}
                                >
                                    {index + 1}
                                </span>
                                <span className="font-medium text-gray-800 text-sm">
                                    {item.name}
                                </span>
                            </div>
                            <span className="font-semibold text-indigo-600 text-sm">
                                {item.total_poin} Poin
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

Leaderboard.layout = (page) => (
    <AuthenticatedLayout>{page}</AuthenticatedLayout>
);

export default Leaderboard;
