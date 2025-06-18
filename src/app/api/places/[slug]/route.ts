import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type Params = { params: { slug: string } }

export async function GET(_: Request, { params }: Params) {
	try {
		const place = await prisma.place.findUnique({
			where: { slug: params.slug },
			include: { reviews: true },
		})

		if (!place) {
			return NextResponse.json({ error: 'Không tìm thấy địa điểm' }, { status: 404 })
		}

		return NextResponse.json(place)
	} catch (error) {
		console.error('Error fetching place:', error)
		return NextResponse.json({ error: 'Lỗi khi lấy địa điểm' }, { status: 500 })
	}
}

export async function PUT(req: Request, { params }: Params) {
	try {
		const data = await req.json()

		const updated = await prisma.place.update({
			where: { slug: params.slug },
			data,
		})

		return NextResponse.json(updated)
	} catch (error) {
		console.error('Error updating place:', error)
		return NextResponse.json({ error: 'Lỗi khi cập nhật địa điểm' }, { status: 500 })
	}
}

export async function DELETE(_: Request, { params }: Params) {
	try {
		await prisma.place.delete({
			where: { slug: params.slug },
		})

		return NextResponse.json({ message: 'Đã xóa địa điểm' })
	} catch (error) {
		console.error('Error deleting place:', error)
		return NextResponse.json({ error: 'Lỗi khi xóa địa điểm' }, { status: 500 })
	}
}
