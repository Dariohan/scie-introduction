"use client";

import { BookOpen, ExternalLink, RotateCcw } from "lucide-react";
import { useId, useRef, useState } from "react";

type ReferenceFlipCardProps = {
  eyebrow: string;
  value: string;
  title: string;
  summary?: string;
  backTitle: string;
  backBody: string;
  sourceLabel: string;
  sourceHref: string;
  viewAction: string;
  openAction: string;
  returnAction: string;
  className?: string;
};

export function ReferenceFlipCard({
  eyebrow,
  value,
  title,
  summary,
  backTitle,
  backBody,
  sourceLabel,
  sourceHref,
  viewAction,
  openAction,
  returnAction,
  className = "",
}: ReferenceFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const backId = useId();
  const frontButtonRef = useRef<HTMLButtonElement>(null);
  const returnButtonRef = useRef<HTMLButtonElement>(null);

  const showReference = () => {
    setFlipped(true);
    requestAnimationFrame(() => returnButtonRef.current?.focus());
  };

  const showSummary = () => {
    setFlipped(false);
    requestAnimationFrame(() => frontButtonRef.current?.focus());
  };

  return (
    <article
      className={`reference-flip-card${flipped ? " is-flipped" : ""}${className ? ` ${className}` : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && flipped) showSummary();
      }}
    >
      <div className="reference-flip-card__inner">
        <div className="reference-flip-card__face reference-flip-card__front">
          <span className="reference-flip-card__eyebrow">{eyebrow}</span>
          <strong>{value}</strong>
          <h4>{title}</h4>
          {summary ? <p>{summary}</p> : null}
          <span className="reference-flip-card__action">
            <BookOpen aria-hidden="true" />
            {viewAction}
          </span>
          <button
            ref={frontButtonRef}
            type="button"
            className="reference-flip-card__front-trigger"
            aria-label={viewAction}
            aria-expanded={flipped}
            aria-controls={backId}
            onClick={showReference}
            tabIndex={flipped ? -1 : 0}
          />
        </div>

        <div
          id={backId}
          className="reference-flip-card__face reference-flip-card__back"
          aria-hidden={!flipped}
        >
          <span className="reference-flip-card__eyebrow">{sourceLabel}</span>
          <h4>{backTitle}</h4>
          <p>{backBody}</p>
          <div className="reference-flip-card__back-actions">
            <a
              href={sourceHref}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={flipped ? 0 : -1}
            >
              {openAction}
              <ExternalLink aria-hidden="true" />
            </a>
            <button
              ref={returnButtonRef}
              type="button"
              onClick={showSummary}
              tabIndex={flipped ? 0 : -1}
            >
              <RotateCcw aria-hidden="true" />
              {returnAction}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
