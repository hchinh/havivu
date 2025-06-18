import { User } from './user'

export interface Review {
	id: string
	placeId: string // liên kết đến Place
	userId?: string | null // nếu có hệ thống user
	userName?: string | null // hiển thị nếu không có user
	user?: User // nếu có hệ thống user
	rating: number // 1 to 5
	comment?: string | null
	createdAt: Date
	updatedAt: Date
}
