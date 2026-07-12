import { ExternalLink } from "lucide-react";

type RednoteLinkProps = {
  label: string;
  title: string;
  action: string;
  href: string;
  inverted?: boolean;
};

export function RednoteLink({
  label,
  title,
  action,
  href,
  inverted = false,
}: RednoteLinkProps) {
  return (
    <a
      className={`rednote-link reveal-item${inverted ? " rednote-link--dark" : ""}`}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      <span>{label}</span>
      <strong>{title}</strong>
      <span className="rednote-link__action">
        {action}
        <ExternalLink aria-hidden="true" />
      </span>
    </a>
  );
}
