export function TraitList({ traits }) {
  if (!traits?.length) return null;
  return (
    <ul className="trait-list">
      {traits.map((t, i) => (
        <li key={i} className="trait-item">
          <span className="trait-name">{t.name}.</span>
          <span className="trait-desc"> {t.description}</span>
        </li>
      ))}
    </ul>
  );
}
