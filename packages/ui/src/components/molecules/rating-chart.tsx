export interface RatingData {
  stars: number;
  count: number;
}

export interface RatingChartProps {
  ratings?: RatingData[];
}

export function RatingChart({ ratings }: RatingChartProps) {
  // Default ratings for when no data is provided
  const defaultRatings: RatingData[] = [
    { stars: 5, count: 45000 },
    { stars: 4, count: 35000 },
    { stars: 3, count: 20000 },
    { stars: 2, count: 5000 },
    { stars: 1, count: 1000 },
  ];

  const ratingData = ratings || defaultRatings;
  const maxCount = Math.max(...ratingData.map((r) => r.count));

  return (
    <div className="space-y-2">
      {ratingData.map((rating) => (
        <div key={rating.stars} className="flex items-center space-x-3">
          <span className="w-6 text-sm text-slate-400">{rating.stars}★</span>
          <div className="h-2 flex-1 rounded-full bg-slate-700">
            <div
              className="h-2 rounded-full bg-green-500 transition-all duration-500"
              style={{ width: `${(rating.count / maxCount) * 100}%` }}
            />
          </div>
          <span className="w-12 text-right text-xs text-slate-400">
            {rating.count >= 1000 ? `${(rating.count / 1000).toFixed(0)}k` : rating.count}
          </span>
        </div>
      ))}
    </div>
  );
}
