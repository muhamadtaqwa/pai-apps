import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function Badges({ badges, allBadges }) {
    const badgeIds = badges.map((b) => b.id);

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Koleksi Lencana
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {allBadges.map((badge) => {
                    const dimiliki = badgeIds.includes(badge.id);
                    return (
                        <div
                            key={badge.id}
                            className={`rounded-2xl p-5 text-center border transition-all ${
                                dimiliki
                                    ? "bg-white border-indigo-200 shadow-md"
                                    : "bg-gray-50 border-gray-200 opacity-60"
                            }`}
                        >
                            <div
                                className={`w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center ${
                                    dimiliki
                                        ? "bg-gradient-primary"
                                        : "bg-gray-200"
                                }`}
                            >
                                <span className="text-2xl text-white font-bold">
                                    {dimiliki ? badge.icon : "?"}
                                </span>
                            </div>
                            <h3 className="font-semibold text-gray-800 text-sm">
                                {badge.nama}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1">
                                {badge.deskripsi}
                            </p>
                            {dimiliki && (
                                <span className="inline-block mt-3 text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                                    Dimiliki
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

Badges.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;

export default Badges;
