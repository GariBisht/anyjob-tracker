export default function AnyJobLogo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="AnyJob Logo"
    >
      {/* Icon */}
      <rect x="0" y="6" width="48" height="48" rx="12" fill="#2563EB" />
      <path
        d="M14 30L22 38L34 22"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Text */}
      <text
        x="64"
        y="42"
        fill="white"
        fontSize="36"
        fontWeight="800"
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="-1"
      >
        Any
        <tspan fill="#3B82F6">Job</tspan>
      </text>
    </svg>
  );
}
