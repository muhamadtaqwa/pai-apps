import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";

const features = [
    {
        title: "Materi Interaktif",
        desc: "Pelajari PAI dengan materi ringkas dan mudah dipahami.",
    },
    {
        title: "Kuis Menantang",
        desc: "Uji pemahamanmu dengan kuis berbatas waktu dan skor.",
    },
    {
        title: "Poin & Lencana",
        desc: "Kumpulkan poin, raih lencana, dan naik peringkat.",
    },
];

export default function Home() {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="px-4 pt-20 pb-16 max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
                        Belajar PAI
                        <br />
                        <span className="bg-gradient-primary bg-clip-text text-transparent">
                            Lebih Seru & Efektif
                        </span>
                    </h1>

                    <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                        Platform pembelajaran interaktif dengan materi, kuis
                        menantang, dan sistem poin yang bikin belajar makin
                        semangat.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        {user ? (
                            <Link
                                href="/quizzes"
                                className="bg-gradient-primary text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:opacity-90 transition tap-target shadow-lg shadow-indigo-200"
                            >
                                Mulai Belajar
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/register"
                                    className="bg-gradient-primary text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:opacity-90 transition tap-target shadow-lg shadow-indigo-200"
                                >
                                    Daftar
                                </Link>
                                <Link
                                    href="/login"
                                    className="border-2 border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl text-base font-medium hover:border-indigo-300 hover:text-indigo-600 transition tap-target"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </motion.div>
            </section>

            {/* Features */}
            <section className="px-4 pb-24 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 mb-4 flex items-center justify-center">
                                <span className="text-indigo-600 font-bold text-sm">
                                    0{i + 1}
                                </span>
                            </div>
                            <h3 className="text-gray-900 font-semibold text-lg mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="px-4 py-8 border-t border-gray-100 text-center text-sm text-gray-400">
                PAI Apps — Media Pembelajaran PAI-BP Interaktif
            </footer>
        </div>
    );
}
