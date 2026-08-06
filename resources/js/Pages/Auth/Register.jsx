import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function Register({ schools, classes }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "siswa",
        school_id: "",
        school_class_id: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Buat Akun
                    </h1>
                    <p className="text-gray-500">Daftar untuk mulai belajar</p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <InputLabel htmlFor="name" value="Nama" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full rounded-xl border-gray-200"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="role" value="Role" />
                        <select
                            id="role"
                            name="role"
                            className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.role}
                            onChange={(e) => setData("role", e.target.value)}
                            required
                        >
                            <option value="">Pilih Role</option>
                            <option value="siswa">Siswa</option>
                            <option value="guru">Guru</option>
                        </select>
                        <InputError message={errors.role} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="school_id" value="Sekolah" />
                        <select
                            id="school_id"
                            name="school_id"
                            className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.school_id}
                            onChange={(e) =>
                                setData("school_id", e.target.value)
                            }
                        >
                            <option value="">Pilih Sekolah</option>
                            {schools?.map((school) => (
                                <option key={school.id} value={school.id}>
                                    {school.nama}
                                </option>
                            ))}
                        </select>
                        <InputError
                            message={errors.school_id}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="school_class_id" value="Kelas" />
                        <select
                            id="school_class_id"
                            name="school_class_id"
                            className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.school_class_id}
                            onChange={(e) =>
                                setData("school_class_id", e.target.value)
                            }
                        >
                            <option value="">Pilih Kelas</option>
                            {classes?.map((kelas) => (
                                <option key={kelas.id} value={kelas.id}>
                                    {kelas.nama}
                                </option>
                            ))}
                        </select>
                        <InputError
                            message={errors.school_class_id}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-xl border-gray-200"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-xl border-gray-200"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Konfirmasi Password"
                        />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full rounded-xl border-gray-200"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gradient-primary text-white py-3 rounded-xl text-base font-semibold hover:opacity-90 transition tap-target shadow-lg shadow-indigo-200 disabled:opacity-50"
                    >
                        {processing ? "Memproses..." : "Daftar"}
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Sudah punya akun?{" "}
                        <Link
                            href={route("login")}
                            className="text-indigo-500 hover:text-indigo-600 font-medium transition"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </motion.div>
        </GuestLayout>
    );
}
