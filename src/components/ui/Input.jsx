export default function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-sm text-white/60">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border text-base border-white/20 bg-white/5 px-4 py-3 outline-none transition-colors focus:border-lime"
      />
    </label>
  )
}
