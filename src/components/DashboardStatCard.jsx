function DashboardStatCard({ label, value, helper }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
      {helper && <p className="mt-2 text-sm leading-6 text-slate-400">{helper}</p>}
    </article>
  )
}

export default DashboardStatCard
