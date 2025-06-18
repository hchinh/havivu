import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const places = await prisma.place.findMany({
			orderBy: [{ rating: 'desc' }, { reviewCount: 'desc' }, { createdAt: 'desc' }],
			take: 5, // Số lượng địa điểm nổi bật
			include: {
				reviews: {
					select: { id: true }, // hoặc lấy 1–2 review gần nhất nếu cần
				},
			},
		})

		return NextResponse.json(places)
	} catch (error) {
		console.error('Lỗi khi lấy địa điểm nổi bật:', error)
		return NextResponse.json({ error: 'Không thể lấy địa điểm nổi bật' }, { status: 500 })
	}
}
