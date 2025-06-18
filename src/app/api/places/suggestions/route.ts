import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams
		const q = searchParams.get('q')?.toLowerCase()
		const category = searchParams.get('category')?.toLowerCase()

		if (!q || q.trim() === '') {
			return NextResponse.json([], { status: 200 })
		}

		const places = await prisma.place.findMany({
			where: {
				AND: [
					category ? { category: category } : {}, // lọc theo danh mục nếu có
					{
						OR: [
							{ name: { contains: q, mode: 'insensitive' } },
							{ description: { contains: q, mode: 'insensitive' } },
						],
					},
				],
			},
			select: {
				id: true,
				name: true,
			},
			take: 10,
		})

		return NextResponse.json(places)
	} catch (error) {
		console.error('Error fetching place suggestions:', error)
		return NextResponse.json({ error: 'Lỗi khi lấy gợi ý địa điểm' }, { status: 500 })
	}
}
