import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import {
    HomeIcon,
    BookOpenIcon,
    PencilSquareIcon,
    ChartBarIcon,
    TrophyIcon,
    ShieldCheckIcon,
    UserCircleIcon,
    ArrowLeftOnRectangleIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

const navItems = [
    { label: "Dashboard", route: "dashboard", icon: HomeIcon },
    { label: "Materi", route: "materials.index", icon: BookOpenIcon },
    { label: "Quiz", route: "quizzes.index", icon: PencilSquareIcon },
    { label: "Progress", route: "progress.index", icon: ChartBarIcon },
    { label: "Peringkat", route: "leaderboard.index", icon: TrophyIcon },
    { label: "Lencana", route: "badges.index", icon: ShieldCheckIcon },
];

const bottomItems = [
    { label: "Dashboard", route: "dashboard", icon: HomeIcon },
    { label: "Materi", route: "materials.index", icon: BookOpenIcon },
    { label: "Quiz", route: "quizzes.index", icon: PencilSquareIcon },
    { label: "Progress", route: "progress.index", icon: ChartBarIcon },
    { label: "Profile", route: "profile.edit", icon: UserCircleIcon },
];

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const isActive = (routeName) => route().current(routeName);

    // index of the currently active bottom-nav item (-1 if none match)
    const activeIndex = bottomItems.findIndex((item) => isActive(item.route));
    const ActiveIcon =
        activeIndex !== -1 ? bottomItems[activeIndex].icon : null;
    const itemWidthPct = 100 / bottomItems.length;

    const SidebarLink = ({ item }) => (
        <Link
            href={route(item.route)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition tap-target ${
                isActive(item.route)
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50"
            }`}
        >
            <item.icon className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span>{item.label}</span>}
        </Link>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex">
            {/* Sidebar Desktop */}
            <aside
                className={`hidden sm:flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ${sidebarOpen ? "w-60" : "w-16"}`}
            >
                <div className="flex items-center justify-between px-4 py-4">
                    {sidebarOpen && (
                        <Link href="/">
                            <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                                PAI Apps
                            </span>
                        </Link>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-xl hover:bg-gray-100 tap-target text-gray-500"
                    >
                        {sidebarOpen ? (
                            <ChevronDoubleLeftIcon className="h-5 w-5" />
                        ) : (
                            <ChevronDoubleRightIcon className="h-5 w-5" />
                        )}
                    </button>
                </div>

                {sidebarOpen && (
                    <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
                        Menu
                    </p>
                )}
                <nav className="flex-1 px-2 space-y-1">
                    {navItems.map((item) => (
                        <SidebarLink key={item.route} item={item} />
                    ))}
                    {user?.role === "admin" && (
                        <Link
                            href={route("admin.dashboard")}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition tap-target ${
                                isActive("admin.dashboard")
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            <ShieldCheckIcon className="h-5 w-5 shrink-0" />
                            {sidebarOpen && <span>Admin Panel</span>}
                        </Link>
                    )}
                </nav>

                <div className="px-2 pb-4 space-y-1 border-t border-gray-100 pt-4">
                    <Link
                        href={route("profile.edit")}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition tap-target ${
                            isActive("profile.edit")
                                ? "bg-indigo-50 text-indigo-600"
                                : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                        <UserCircleIcon className="h-5 w-5 shrink-0" />
                        {sidebarOpen && <span>Profile</span>}
                    </Link>
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition tap-target w-full"
                    >
                        <ArrowLeftOnRectangleIcon className="h-5 w-5 shrink-0" />
                        {sidebarOpen && <span>Logout</span>}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {header && (
                    <header className="bg-white border-b border-gray-100 px-4 py-4">
                        {header}
                    </header>
                )}

                <main className="flex-1 pb-24 sm:pb-0">{children}</main>

                {/* Floating Bottom Nav with bump effect */}
                <nav className="sm:hidden fixed bottom-4 left-4 right-4 z-50">
                    <div className="relative bg-white border border-gray-200 rounded-[28px] shadow-lg flex justify-around py-2 overflow-visible">
                        {bottomItems.map((item) => {
                            const active = isActive(item.route);
                            return (
                                <Link
                                    key={item.route}
                                    href={route(item.route)}
                                    className="flex flex-col items-center justify-end w-full px-1 py-1 text-[10px] font-medium transition tap-target"
                                >
                                    {/* icon stays in normal flow but is hidden when active,
                                        so the label keeps the same vertical position and the
                                        floating bubble below can sit exactly on top of it */}
                                    <item.icon
                                        className={`h-5 w-5 mb-1 transition-opacity ${
                                            active
                                                ? "opacity-0"
                                                : "text-gray-400"
                                        }`}
                                    />
                                    <span
                                        className={
                                            active
                                                ? "text-indigo-600 font-semibold"
                                                : "text-gray-400"
                                        }
                                    >
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}

                        {/* Floating active bubble */}
                        {ActiveIcon && (
                            <div
                                className="absolute -top-7 flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-lg shadow-indigo-100 border border-indigo-50 transition-all duration-300 ease-out"
                                style={{
                                    left: `calc(${(activeIndex + 0.5) * itemWidthPct}% - 28px)`,
                                }}
                            >
                                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-primary">
                                    <ActiveIcon className="h-5 w-5 text-white" />
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            <Toaster position="top-center" />
        </div>
    );
}
