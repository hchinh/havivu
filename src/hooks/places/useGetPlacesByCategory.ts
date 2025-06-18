import { axiosInstance } from '@/lib/axios'
import { Filters } from '@/types'
import { Place } from '@/types/place'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export function useGetPlacesByCategory(category?: string, filters?: Filters) {
	return useQuery<Place[], AxiosError>({
		queryKey: ['places', category, filters],
		queryFn: async () => {
			const params = new URLSearchParams()

			if (category) params.set('category', category)
			if (filters?.q) params.set('q', filters.q)
			if (filters?.sort) params.set('sort', filters.sort)
			if (filters?.minRating !== undefined) {
				params.set('minRating', String(filters.minRating))
			}

			try {
				const { data } = await axiosInstance.get<Place[]>(`/api/places?${params.toString()}`)
				return data
			} catch (error) {
				const axiosError = error as AxiosError
				if (axiosError.response?.status === 404) {
					// Không có dữ liệu → trả về mảng rỗng
					return []
				}
				throw axiosError
			}
		},
	})
}
