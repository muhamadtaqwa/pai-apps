import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import DeleteUserForm from "../Partials/DeleteUserForm";
import UpdatePasswordForm from "../Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "../Partials/UpdateProfileInformationForm";

function Edit({ mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Profile" />

            <div className="py-6 px-4 max-w-4xl mx-auto space-y-6">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 sm:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 sm:p-8">
                    <UpdatePasswordForm />
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 sm:p-8">
                    <DeleteUserForm />
                </div>

                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="block w-full text-center bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition sm:hidden"
                >
                    Logout
                </Link>
            </div>
        </>
    );
}

Edit.layout = (page) => (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
        }
    >
        {page}
    </AuthenticatedLayout>
);

export default Edit;
