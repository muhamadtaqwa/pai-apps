import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4">
            <div className="mb-8">
                <Link href="/">
                    <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        PAI Apps
                    </span>
                </Link>
            </div>

            <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:max-w-md">
                {children}
            </div>
        </div>
    );
}
