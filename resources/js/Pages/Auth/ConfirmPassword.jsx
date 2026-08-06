import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    return (
        <GuestLayout>
            <Head title="Konfirmasi Password" />

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Konfirmasi Password
                </h1>
                <p className="text-gray-400 text-sm">
                    Masukkan password kamu untuk melanjutkan.
                </p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post(route("password.confirm"), {
                        onFinish: () => reset("password"),
                    });
                }}
                className="space-y-4"
            >
                <div>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-xl border-gray-200"
                        placeholder="Password"
                        isFocused={true}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-gradient-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-indigo-200"
                >
                    {processing ? "Memproses..." : "Konfirmasi"}
                </button>
            </form>
        </GuestLayout>
    );
}
