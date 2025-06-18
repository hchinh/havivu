'use client'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { useGetPlacesByCategory } from '@/hooks/places/useGetPlacesByCategory'
import { Place } from '@/types'
import Autoplay from 'embla-carousel-autoplay'
import { PlaceCard } from './place-card'
import { PlaceCardSkeleton } from './place-card-sekeleton'

function CategoryBlock({
	icon,
	title,
	category,
}: {
	icon: string
	title: string
	category: string
}) {
	const { data = [], isLoading } = useGetPlacesByCategory(category)

	return (
		<section className="py-6">
			<h2 className="text-xl font-bold mb-4">
				{icon} {title}
			</h2>
			<Carousel
				plugins={[
					Autoplay({
						delay: 3000,
						stopOnInteraction: true,
					}),
				]}
				className="w-full max-w-full"
			>
				<CarouselContent>
					{isLoading
						? Array.from({ length: 3 }).map((_, index) => (
								<CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3">
									<PlaceCardSkeleton />
								</CarouselItem>
						  ))
						: data.map((place: Place) => (
								<CarouselItem key={place.id} className="basis-full sm:basis-1/2 md:basis-1/3">
									<PlaceCard place={place} />
								</CarouselItem>
						  ))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</section>
	)
}

export default function CategorySection() {
	return (
		<>
			<CategoryBlock icon="☕" title="Cà phê" category="cafe" />
			<CategoryBlock icon="🍽️" title="Ăn uống" category="restaurant" />
			<CategoryBlock icon="🏨" title="Khách sạn" category="hotel" />
			<CategoryBlock icon="🍷" title="Bar" category="bar" />
			<CategoryBlock icon="🗺️" title="Tham quan" category="sightseeing" />
		</>
	)
}
