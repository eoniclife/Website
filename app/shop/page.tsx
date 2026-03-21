import Link from "next/link";

export default function ShopPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-eonic-bg px-5 py-10">
      <section className="surface-panel max-w-2xl rounded-[28px] px-8 py-12 text-center">
        <p className="font-display text-4xl italic text-eonic-text">Shop placeholder</p>
        <p className="mt-4 text-lg leading-8 text-eonic-text-2">
          Razorpay checkout lands here in V2. In V1 this page only receives the order intent handoff.
        </p>
        <Link href="/" className="mt-8 inline-block text-eonic-teal">
          Return home
        </Link>
      </section>
    </main>
  );
}
