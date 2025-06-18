import { axiosInstance } from '@/lib/axios'
import { Place } from '@/types'
import { useQuery } from '@tanstack/react-query'

export function useGetPlaceBySlug(slug?: string) {
	return useQuery<Place>({
		queryKey: ['place', slug],
		queryFn: async () => {
			const { data } = await axiosInstance.get(`/api/places/${slug}`)
			return data
		},
		enabled: !!slug,
	})
}
