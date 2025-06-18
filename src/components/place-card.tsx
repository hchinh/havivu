'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Place } from '@/types'
import Link from 'next/link'
import ImageCarousel from './image-carousel'

export function PlaceCard({ place }: { place: Place }) {
	return (
		<Link href={`/places/${place.slug}`} className="block">
			<Card className="hover:shadow-md transition-shadow">
				<CardContent className="p-3 space-y-2">
					<ImageCarousel images={place.images} />
					<h3 className="text-base font-semibold">{place.name}</h3>
					<p className="text-sm text-gray-500">{place.address}</p>
					<p className="text-yellow-500 text-sm">
						⭐ {place.rating} ({place.reviewCount} đánh giá)
					</p>
				</CardContent>
			</Card>
		</Link>
	)
}
