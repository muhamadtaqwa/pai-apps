import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    return (
        <GuestLayout>
            <Head title="Verifikasi Email" />

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Verifikasi Email
                </h1>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Sebelum lanjut, verifikasi email kamu dulu. Cek inbox dan
                    klik link verifikasi yang sudah dikirim.
                </p>
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 text-sm font-medium text-teal-600 bg-teal-50 p-3 rounded-xl">
                    Link verifikasi baru sudah dikirim ke email kamu.
                </div>
            )}

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post(route("verification.send"));
                }}
                className="space-y-4"
            >
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-gradient-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-indigo-200"
                >
                    {processing ? "Mengirim..." : "Kirim Ulang Email"}
                </button>

                <div className="text-center">
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="text-sm text-gray-400 hover:text-gray-600 transition"
                    >
                        Logout
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
