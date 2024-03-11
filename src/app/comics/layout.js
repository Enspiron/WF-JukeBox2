export const metadata = {
    title: "Comics Test",
    description: "Comics Test",
};

export default function Layout({
    children
}) {
    return (
        <section>
            {children}
        </section>
    )
}