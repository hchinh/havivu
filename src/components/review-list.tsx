'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useReviewsByPlace } from '@/hooks/reviews/useReviewByPlace'
import { StarIcon } from 'lucide-react'
import { useState } from 'react'

export default function ReviewList({ placeId }: { placeId: string }) {
	const [page, setPage] = useState(1)
	const { data, isLoading } = useReviewsByPlace(placeId, page, 5)
	const reviews = data?.reviews || []
	const total = data?.total || 0
	const totalPages = Math.ceil(total / 5)

	if (isLoading) {
		return (
			<div className="space-y-4">
				{[...Array(3)].map((_, i) => (
					<div key={i} className="space-y-2">
						<Skeleton className="w-1/4 h-4" />
						<Skeleton className="w-full h-5" />
					</div>
				))}
			</div>
		)
	}

	if (reviews.length === 0) {
		return <p className="text-gray-500 text-sm">Chưa có đánh giá nào.</p>
	}

	return (
		<div className="space-y-4">
			{reviews.map((review) => (
				<div key={review.id} className="border-b pb-3">
					<div className="flex items-center justify-between text-sm text-gray-700">
						<span className="font-medium">
							{review.user?.name || review.userName || 'Người dùng ẩn danh'}
						</span>
						<div className="flex items-center gap-1 text-yellow-500">
							{Array.from({ length: review.rating }).map((_, i) => (
								<StarIcon key={i} size={14} />
							))}
						</div>
					</div>
					<p className="text-sm mt-1 text-gray-800">{review.comment}</p>
				</div>
			))}

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex justify-between items-center pt-4">
					<Button
						variant="outline"
						onClick={() => setPage((p) => Math.max(p - 1, 1))}
						disabled={page === 1}
					>
						Trang trước
					</Button>
					<span className="text-sm text-gray-500">
						Trang {page} / {totalPages}
					</span>
					<Button
						variant="outline"
						onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
						disabled={page === totalPages}
					>
						Trang sau
					</Button>
				</div>
			)}
		</div>
	)
}
