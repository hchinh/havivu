import { Review } from './review'

export interface Place {
	id: string
	name: string
	slug: string
	description?: string | null
	category: string
	address: string
	latitude: number
	longitude: number
	openingHours?: string | null
	phone?: string | null
	website?: string | null
	images: string[]
	rating: number
	reviewCount: number
	createdAt: Date
	updatedAt: Date
	reviews?: Review[]
}

export type PlaceSuggestion = {
	id: string
	name: string
}
