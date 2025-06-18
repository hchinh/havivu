'use client'

import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, XIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
	images: string[]
}

export default function ImageGallery({ images }: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [direction, setDirection] = useState<1 | -1>(1)

	const openPreview = (index: number) => {
		setCurrentIndex(index)
		setIsOpen(true)
	}

	const nextImage = () => {
		setDirection(1)
		setCurrentIndex((prev) => (prev + 1) % images.length)
	}

	const prevImage = () => {
		setDirection(-1)
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
	}

	const variants = {
		enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
		center: { x: 0, opacity: 1 },
		exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
	}

	const maxThumbnails = 4
	const hasMore = images.length > maxThumbnails

	return (
		<div className="space-y-2">
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
				{images.slice(0, maxThumbnails).map((img, idx) => {
					const isLastVisible = idx === maxThumbnails - 1 && hasMore
					return (
						<div
							key={idx}
							className="relative aspect-video cursor-pointer overflow-hidden rounded-lg shadow-sm group"
							onClick={() => openPreview(idx)}
						>
							<Image
								src={img}
								alt={`Ảnh ${idx + 1}`}
								fill
								className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
							/>
							{isLastVisible && (
								<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
									<span className="text-white text-sm font-semibold">
										+{images.length - maxThumbnails + 1} ảnh
									</span>
								</div>
							)}
						</div>
					)
				})}
			</div>

			<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
				<div className="fixed inset-0 bg-black/70" aria-hidden="true" />
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<Dialog.Panel className="relative max-w-4xl w-full">
						<button
							onClick={() => setIsOpen(false)}
							className="absolute top-3 right-3 text-white bg-black/50 p-1 rounded-full hover:bg-black z-10"
						>
							<XIcon size={20} />
						</button>
						<button
							onClick={prevImage}
							className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black z-10"
						>
							<ChevronLeft size={24} />
						</button>
						<button
							onClick={nextImage}
							className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black z-10"
						>
							<ChevronRight size={24} />
						</button>

						<div className="relative w-full h-[60vh] overflow-hidden rounded-lg bg-black flex items-center justify-center">
							<AnimatePresence custom={direction} mode="wait" initial={false}>
								<motion.div
									key={currentIndex}
									custom={direction}
									variants={variants}
									initial="enter"
									animate="center"
									exit="exit"
									transition={{
										x: { type: 'spring', stiffness: 300, damping: 30 },
										opacity: { duration: 0.2 },
									}}
									className="absolute inset-0"
								>
									<Image
										src={images[currentIndex]}
										alt={`Ảnh ${currentIndex + 1}`}
										fill
										className="object-contain"
									/>
								</motion.div>
							</AnimatePresence>
						</div>
					</Dialog.Panel>
				</div>
			</Dialog>
		</div>
	)
}
