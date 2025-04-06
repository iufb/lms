import { Header } from "@/widgets/Header";
import { ReactNode } from "react";


export default function UserLayout({ children }: { children: ReactNode }) {

    return <section>
        <Header />
        <main className="max-w-5xl px-2 lg:px-0 mx-auto">{children}</main>
    </section>
}
