interface AdminLoginPageProps {
  searchParams?: Promise<{
    error?: string;
  }>;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const hasError = resolvedSearchParams.error === "1";

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Admin login</h1>
          <p className="text-sm text-slate-600">Enter the shared admin token to access the pipeline.</p>
        </div>

        {hasError ? <p className="text-sm text-red-700">Incorrect token. Try again.</p> : null}

        <form action="/api/admin/login" method="POST" className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700" htmlFor="token">
              Token
            </label>
            <input
              id="token"
              name="token"
              type="password"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
