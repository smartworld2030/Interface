import React from 'react'

interface ExclamationTriangleProps {
  onClick: () => void
}

export const ExclamationTriangle: React.FC<ExclamationTriangleProps> = ({
  onClick,
}) => {
  return (
    <span
      onClick={onClick}
      role="img"
      aria-label="exclamation"
      className="anticon anticon-exclamation"
      style={{
        color: 'rgb(26, 226, 133)',
      }}
    >
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="exclamation"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M 448 740 a 64 64 0 1 0 128 0 a 64 64 0 1 0 -128 0 z m 32 -168 h 64 c 4.4 0 8 -3.6 8 -8 V 190 c 0 -4.4 -3.6 -8 -8 -8 h -64 c -4.4 0 -8 3.6 -8 8 v 375 c 0 4.4 3.6 8 8 8 z M 512 0 L 1024 900 L 0 900 L 512 0"></path>
      </svg>
    </span>
  )
}
