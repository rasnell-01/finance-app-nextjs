import {Copyright, PiggyBank, ReceiptText} from "lucide-react";
import Image from "next/image";

export default function PageFooter({ className }) {
    return (
        <footer role="contentinfo" aria-label="Footer" className={`
           flex flex-col gap-1 p-4 text-gray-500 text-sm bg-gray-100 dark:bg-gray-900 ${className}`}>
            {/* First row: Copyright and Next.js */}
            <div className="flex flex-row justify-between items-center gap-2 w-full">
                <div className="flex items-center gap-2">
                <Copyright className="w-4 h-4"/>
                <span>2025 - Ryan Snell</span>
            </div>
                <div className="flex items-center gap-2">
                <Image src="/next.svg" alt="Next.js Logo" width={20} height={20} />
                <span>Built with Next.js</span>
            </div>
            </div>
            {/* Second row: App name/version and Supabase */}
            <div className="flex flex-row justify-between items-center gap-2 w-full">
                <div className="flex items-center gap-2">
                <PiggyBank className="w-4 h-4"/>
                <span>Finance App</span>
                <ReceiptText className="w-4 h-4"/>
                <div className="bg-gray-200 dark:bg-gray-800 rounded px-2 py-1 text-xs" aria-label="App Version">
                    1.0.1
                </div>
            </div>
                <div className="flex items-center gap-2">
                    <Image src="/supabase.svg" alt="Supabase Logo" width={20} height={20} />
                    <span>Powered by Supabase</span>
                </div>
            </div>
        </footer>
    );
}
