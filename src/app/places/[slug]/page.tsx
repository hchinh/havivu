'use client'

// import ImageCarousel from '@/components/image-carousel'
import ImageGallery from '@/components/image-gallery'
import ReviewList from '@/components/review-list'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetPlaceBySlug } from '@/hooks/places/useGetPlaceBySlug'
import { StarIcon } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function PlaceDetailPage() {
	const params = useParams()
	const slug = params?.slug as string
	const { data: place, isLoading } = useGetPlaceBySlug(slug)

	if (isLoading || !place) {
		return (
			<div className="container max-w-5xl mx-auto py-6 space-y-4">
				<Skeleton className="h-[300px] w-full rounded-xl" />
				<Skeleton className="h-6 w-1/3" />
				<Skeleton className="h-4 w-1/2" />
				<Skeleton className="h-20 w-full" />
			</div>
		)
	}

	const {
		name,
		address,
		images,
		rating,
		reviewCount,
		description,
		openingHours,
		phone,
		website,
		latitude,
		longitude,
	} = place

	return (
		<main className="container max-w-7xl mx-auto py-6 space-y-6">
			{/* <ImageCarousel images={images} /> */}
			<ImageGallery images={images} />

			<div className="grid md:grid-cols-3 gap-8">
				{/* Left content: info + review */}
				<div className="md:col-span-2 space-y-6">
					<div>
						<h1 className="text-2xl font-bold">{name}</h1>
						<div className="flex items-center gap-2 text-sm text-yellow-500">
							<StarIcon size={16} />
							<span>
								{rating} ({reviewCount} đánh giá)
							</span>
						</div>
					</div>

					{description && <p className="text-gray-700 text-sm leading-relaxed">{description}</p>}

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
						<div>
							<strong>📍 Địa chỉ:</strong> {address}
						</div>
						{openingHours && (
							<div>
								<strong>🕒 Giờ mở cửa:</strong> {openingHours}
							</div>
						)}
						{phone && (
							<div>
								<strong>📞 Điện thoại:</strong> {phone}
							</div>
						)}
						{website && (
							<div>
								<strong>🔗 Website:</strong>{' '}
								<a href={website} className="text-blue-600 underline" target="_blank">
									{website}
								</a>
							</div>
						)}
					</div>

					<div className="pt-4 border-t">
						<h2 className="text-xl font-semibold mb-2">Đánh giá từ người dùng</h2>
						<ReviewList placeId={place.id} />
					</div>
				</div>

				{/* Right content: Google Map */}
				<div className="h-[300px] md:h-full">
					<iframe
						title="Bản đồ"
						src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=vi&z=16&output=embed`}
						width="100%"
						height="100%"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						className="rounded-xl shadow-sm"
					/>
				</div>
			</div>
		</main>
	)
}
