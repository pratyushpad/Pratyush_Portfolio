type ArrowUpRightProps = {
  /** Size relative to the surrounding text. Defaults to cap height. */
  size?: string;
  className?: string;
};

/**
 * External-link arrow.
 *
 * Replaces the ↗ character (U+2197), which isn't in Google Fonts' Inter
 * subsets and therefore fell back to a system font at a mismatched weight.
 * Drawn instead so it inherits the link's color (currentColor, so hover
 * transitions carry over) and sits baseline-to-cap-height like the text.
 *
 * The viewBox is cropped to the stroke's outer bounds, so `size` is the
 * rendered height of the glyph itself rather than a padded box.
 */
export default function ArrowUpRight({ size = '0.72em', className }: ArrowUpRightProps) {
  return (
    <svg
      viewBox="0.3 0.3 9.4 9.4"
      width={size}
      height={size}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'baseline', flexShrink: 0 }}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1 9 9 1" />
      <path d="M3.2 1H9v5.8" />
    </svg>
  );
}
