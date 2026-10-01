import type { CSSProperties } from 'react';

interface ResponsiveImageProps {
  src?: string;
  mobileSrc?: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

export default function ResponsiveImage({ src, mobileSrc, alt, className = '', style }: ResponsiveImageProps) {
  return (
    <picture className="block h-full w-full">
      {mobileSrc && <source srcSet={mobileSrc} media="(max-width: 767px)" />}
      <img src={src || ''} alt={alt} className={className} style={style} />
    </picture>
  );
}
