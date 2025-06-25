import Image from "next/image";

export const metadata = {
    title: "About & Credits – Finance App",
    description: "Learn more about Finance App and the tools behind it."
};

export default function AboutPage() {
    return (
        <main className="max-w-2xl mx-auto py-12 px-4 space-y-8">
            <h1 className="text-4xl font-bold mb-4">About Finance App</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
                <strong>Finance App</strong> is a modern, full-stack personal finance tracker built to help users manage expenses, track income, and analyze trends with ease. The goal: to make budgeting beautiful, simple, and secure.
            </p>

            <section>
                <h2 className="text-2xl font-semibold mt-8 mb-2">Tech Stack</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                        <Image src="/next.svg" alt="Next.js Logo" width={24} height={24} className="inline" />{" "}
                        <span className="font-semibold">Next.js 15</span> – React framework for server-side rendering and static site generation.
                    </li>
                    <li>
                        <Image src="/supabase.svg" alt="Supabase Logo" width={24} height={24} className="inline" />{" "}
                        <span className="font-semibold">Supabase</span> – Auth, database, and file storage as a Postgres-based backend.
                    </li>
                    <li>
                        <span className="font-semibold">Tailwind CSS</span> – Utility-first CSS framework for rapid UI development.
                    </li>
                    <li>
                        <span className="font-semibold">React 19</span> – Component-based UI library.
                    </li>
                    <li>
                        <span className="font-semibold">Lucide Icons</span> – Icon library for a modern look.
                    </li>
                    <li>
                        <span className="font-semibold">React Hook Form</span> – Performant, flexible forms.
                    </li>
                    <li>
                        <span className="font-semibold">Zod</span> – Type-safe schema validation.
                    </li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mt-8 mb-2">Open Source Packages</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                    This app is made possible thanks to many open-source packages, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                    <li>@eslint/eslintrc</li>
                    <li>@faker-js/faker</li>
                    <li>@hookform/resolvers</li>
                    <li>@supabase/ssr </li>
                    <li>@supabase/supabase-js</li>
                    <li>@tailwindcss/forms</li>
                    <li>@tailwindcss/postcss</li>
                    <li>autoprefixer</li>
                    <li>dotenv</li>
                    <li>eslint</li>
                    <li>eslint-config-next</li>
                    <li>eslint-config-next</li>
                    <li>js-cookie</li>
                    <li>json-server</li>
                    <li>lint</li>
                    <li>lucide-react</li>
                    <li>next</li>
                    <li>next-auth</li>
                    <li>next-i18next</li>
                    <li>postcss</li>
                    <li>react</li>
                    <li>react-dom</li>
                    <li>react-error-boundary</li>
                    <li>react-hook-form</li>
                    <li>turbopack</li>
                    <li>zod</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mt-8 mb-2">Author & License</h2>
                <p>
                    &copy; {new Date().getFullYear()} Ryan Snell. All rights reserved.<br />
                    Built as a personal project for learning, demo, and portfolio purposes.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mt-8 mb-2">Acknowledgements</h2>
                <p>
                    Thanks to the creators and maintainers of all the above packages and open-source contributors.
                </p>
            </section>
        </main>
    );
}
