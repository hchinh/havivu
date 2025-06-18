'use client'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { useHighlightedPlaces } from '@/hooks/places/useHighlightedPlaces'
import { Place } from '@/types'
import Autoplay from 'embla-carousel-autoplay'
import { PlaceCard } from './place-card'
import { PlaceCardSkeleton } from './place-card-sekeleton'

export default function HighlightedSection() {
	const { data: places = [], isLoading } = useHighlightedPlaces()

	return (
		<section className="py-6">
			<h2 className="text-xl font-bold mb-4">📍 Địa điểm nổi bật</h2>
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
						: places.map((place: Place) => (
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
