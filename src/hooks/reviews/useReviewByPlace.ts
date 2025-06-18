import { axiosInstance } from '@/lib/axios'
import { Review } from '@/types'
import { useQuery } from '@tanstack/react-query'

export function useReviewsByPlace(placeId?: string, page = 1, limit = 5) {
	return useQuery<{ reviews: Review[]; total: number }>({
		queryKey: ['reviews', placeId, page],
		queryFn: async () => {
			const { data } = await axiosInstance.get(`/api/reviews`, {
				params: { placeId, page, limit },
			})
			return data
		},
		enabled: !!placeId,
	})
}
