'use client'

import FilterBar from '@/components/filter-bar'
import { PlaceCard } from '@/components/place-card'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetPlacesByCategory } from '@/hooks/places/useGetPlacesByCategory'
import { Filters, Place } from '@/types'
import { useParams } from 'next/navigation'
import { useCallback, useState } from 'react'

const categoryTitles: Record<string, string> = {
	restaurant: 'Ăn uống',
	cafe: 'Cà phê',
	hotel: 'Khách sạn',
	bar: 'Bar',
	sightseeing: 'Tham quan',
}

export default function CategoryPage() {
	const { slug } = useParams()
	const category = slug as string
	const [filters, setFilters] = useState<Filters>({
		q: '',
		sort: 'latest',
		minRating: 0,
	})
	const { data: places, isLoading } = useGetPlacesByCategory(category, filters)

	const handleFilterChange = useCallback((newFilters: typeof filters) => {
		setFilters(newFilters)
	}, [])

	return (
		<main className="container max-w-6xl mx-auto py-6">
			<h1 className="text-2xl font-bold mb-4">{categoryTitles[category] || 'Danh mục'}</h1>

			<FilterBar onFilterChange={handleFilterChange} category={category} />

			{isLoading ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{Array.from({ length: 8 }).map((_, i) => (
						<Skeleton key={i} className="h-64 w-full rounded-xl" />
					))}
				</div>
			) : places?.length === 0 ? (
				<div className="p-6 text-center text-muted-foreground border border-dashed rounded-lg">
					Không tìm thấy địa điểm nào phù hợp với bộ lọc bạn đã chọn.
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{places?.map((place: Place) => (
						<PlaceCard key={place.id} place={place} />
					))}
				</div>
			)}
		</main>
	)
}
