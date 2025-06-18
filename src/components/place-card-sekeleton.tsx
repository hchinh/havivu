import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function PlaceCardSkeleton() {
	return (
		<Card className="h-full">
			<CardContent className="p-3 space-y-2">
				<Skeleton className="w-full h-56 rounded-xl" />
				<Skeleton className="h-5 w-3/4" />
				<Skeleton className="h-4 w-2/3" />
				<Skeleton className="h-4 w-1/3" />
			</CardContent>
		</Card>
	)
}
