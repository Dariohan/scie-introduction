type SectionHeadingProps = {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
  inverted?: boolean;
};

export function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  inverted = false,
}: SectionHeadingProps) {
  return (
    <header className={`section-heading${inverted ? " section-heading--light" : ""}`}>
      <div className="section-heading__meta">
        <span>{number}</span>
        <span>{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}
