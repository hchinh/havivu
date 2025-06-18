export interface User {
	id: string
	name: string
	email: string
	avatarUrl?: string | null
	bio?: string | null
	role: string
	createdAt: Date
	updatedAt: Date
}
