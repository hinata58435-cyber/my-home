import { Star } from 'lucide-react';

export default function StarRating({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} من 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={
            i <= Math.round(value)
              ? 'fill-wood text-wood'
              : 'fill-beige-200 text-beige-200'
          }
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}
