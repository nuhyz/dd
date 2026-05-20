export function PHBCard({ selected, onClick, imageKey, imageSrc, title, subtitle, tags = [], description, children }) {
  return (
    <div className={`phb-card${selected ? " selected" : ""}`} onClick={onClick}>
      <div className="card-image">
        {imageSrc ? (
          <img src={imageSrc} alt={title} />
        ) : (
          <div className="card-image-placeholder">
            <span className="placeholder-icon">⚔️</span>
            <span className="placeholder-label">{imageKey || title}</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="card-title">{title}</div>
        {subtitle && <div className="card-subtitle">{subtitle}</div>}
        {description && <p className="card-description">{description}</p>}
        {tags.length > 0 && (
          <div className="card-tags">
            {tags.map((t, i) => <span key={i} className={`card-tag${t.gold ? " gold" : ""}`}>{t.label}</span>)}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
