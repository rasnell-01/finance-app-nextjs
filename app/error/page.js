import Link from "next/link";

export default function ErrorPage() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-red-50">
            <h1 className="text-4xl font-bold text-red-700 mb-4">Oops! Something went wrong.</h1>
            <p className="text-lg text-gray-700 mb-6">
                We could not process your request. Please try again or contact support if the problem continues.
            </p>
            <Link href="/" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                Go Home
            </Link>
        </div>
    );
}
