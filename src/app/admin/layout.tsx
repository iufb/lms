import { ReactNode } from "react";

import '../globals.css';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return <html lang="ru">
        <body>{children}</body>
    </html>
}
