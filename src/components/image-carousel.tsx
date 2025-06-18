'use client'

import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

type ImageCarouselProps = {
	images: string[]
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
	if (!images || images.length === 0) {
		return (
			<div className="rounded-xl bg-gray-100 flex items-center justify-center h-56 text-gray-400">
				No image available
			</div>
		)
	}

	return (
		<Carousel className="w-full max-w-full">
			<CarouselContent>
				{images.map((url, index) => (
					<CarouselItem key={index}>
						<div className="relative w-full h-56 rounded-xl overflow-hidden">
							<Image
								src={url}
								alt={`Slide ${index + 1}`}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       33vw"
								priority={index === 0} // preload ảnh đầu tiên
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			{/* <CarouselPrevious />
			<CarouselNext /> */}
		</Carousel>
	)
}
