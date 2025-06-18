import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import { PlaceSuggestion } from '@/types'

export function useGetPlaceSuggestionsByCategory(q: string, category?: string) {
	return useQuery<PlaceSuggestion[]>({
		queryKey: ['place-suggestions', q, category],
		queryFn: async () => {
			const params = new URLSearchParams()
			params.set('q', q)
			if (category) params.set('category', category)

			const { data } = await axiosInstance.get<PlaceSuggestion[]>(
				`/api/places/suggestions?${params.toString()}`
			)
			return data
		},
		enabled: q.trim().length > 0, // tránh call khi q rỗng
		staleTime: 1000 * 60, // cache 1 phút
	})
}
