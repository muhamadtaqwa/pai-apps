import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: "" });

    return (
        <GuestLayout>
            <Head title="Lupa Password" />

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Lupa Password
                </h1>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Masukkan email kamu, kami akan kirim link untuk reset
                    password.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-teal-600 bg-teal-50 p-3 rounded-xl">
                    {status}
                </div>
            )}

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post(route("password.email"));
                }}
                className="space-y-4"
            >
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl border-gray-200"
                        placeholder="Email"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-gradient-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-indigo-200"
                >
                    {processing ? "Mengirim..." : "Kirim Link Reset"}
                </button>

                <p className="text-center text-sm text-gray-500">
                    <Link
                        href={route("login")}
                        className="text-indigo-500 hover:text-indigo-600 font-medium transition"
                    >
                        Kembali ke Login
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
