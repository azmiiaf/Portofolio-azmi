// Pecah teks jadi huruf-huruf (class "char") supaya bisa dianimasikan satu per satu
export default function SplitChars({ text, charClass = 'char' }) {
  return text.split(' ').map((word, i) => (
    <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom">
      {word.split('').map((c, j) => (
        <span key={j} className={`${charClass} inline-block`}>{c}</span>
      ))}
    </span>
  ))
}
