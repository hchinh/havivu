import { axiosInstance } from '@/lib/axios'
import { Place } from '@/types'
import { useQuery } from '@tanstack/react-query'

export function useHighlightedPlaces() {
	return useQuery<Place[]>({
		queryKey: ['highlighted-places'],
		queryFn: async () => {
			const { data } = await axiosInstance.get('/api/places/highlighted')
			return data
		},
		staleTime: 1000 * 60 * 5, // cache trong 5 phút
	})
}
