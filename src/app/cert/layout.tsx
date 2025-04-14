
import { Fira_Sans } from 'next/font/google';
import { ReactNode } from "react";
import '../globals.css';


const fira = Fira_Sans({ subsets: ['latin', 'cyrillic'], weight: ["300", "400", "500", "600", "700", "800"] });

export default async function CertLayout({ children }: { children: ReactNode }) {
    return <html lang="ru">
        <body className={fira.className}>
            {children}
        </body>
    </html>
}
