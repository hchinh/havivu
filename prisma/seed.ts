import { User } from '@/types'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	console.log('🌱 Seeding data...')

	// Xóa sạch dữ liệu cũ
	await prisma.review.deleteMany()
	await prisma.place.deleteMany()
	await prisma.user.deleteMany()

	// Tạo user mẫu test
	const testUser = await prisma.user.create({
		data: {
			name: 'Test User',
			email: 'test@example.com',
			avatarUrl: 'https://i.pravatar.cc/150?u=testuser',
			bio: 'Một tín đồ du lịch',
			role: 'user',
		},
	})

	// ✅ Tạo 10 users giả
	const users: User[] = []
	for (let i = 0; i < 10; i++) {
		const user = await prisma.user.create({
			data: {
				name: faker.person.fullName(),
				email: faker.internet.email(),
				avatarUrl: faker.image.avatar(),
				bio: faker.lorem.sentence(),
				role: 'user',
			},
		})
		users.push(user)
	}

	const allUsers = [testUser, ...users]

	// ✅ Danh sách địa điểm
	const placesData = [
		{
			name: 'Cà phê Đà Lạt Chill',
			slug: 'ca-phe-da-lat-chill',
			description: 'Quán cà phê view đồi cực chill tại Đà Lạt.',
			category: 'cafe',
			address: '123 Đường Đồi Thông, Đà Lạt',
			latitude: 11.9416,
			longitude: 108.4384,
			openingHours: '08:00 - 22:00',
			phone: '0123 456 789',
			website: 'https://caphechill.vn',
			images: [
				'https://source.unsplash.com/featured/?cafe',
				'https://source.unsplash.com/featured/?dalat',
			],
		},
		{
			name: 'Nhà hàng Hải sản Biển Xanh',
			slug: 'nha-hang-hai-san-bien-xanh',
			description: 'Thưởng thức hải sản tươi ngon bên bờ biển.',
			category: 'restaurant',
			address: '45 Trần Phú, Nha Trang',
			latitude: 12.2388,
			longitude: 109.1967,
			openingHours: '10:00 - 23:00',
			phone: '0987 654 321',
			website: 'https://biensanh.vn',
			images: [
				'https://source.unsplash.com/featured/?seafood',
				'https://source.unsplash.com/featured/?restaurant',
			],
		},
		{
			name: 'Khách sạn Sunset View',
			slug: 'khach-san-sunset-view',
			description: 'Khách sạn 3 sao với view hoàng hôn tuyệt đẹp.',
			category: 'hotel',
			address: 'Số 9, Nguyễn Huệ, Huế',
			latitude: 16.4637,
			longitude: 107.5909,
			openingHours: '24/7',
			phone: '0909 888 777',
			website: 'https://sunsetviewhotel.vn',
			images: [
				'https://source.unsplash.com/featured/?hotel',
				'https://source.unsplash.com/featured/?sunset',
			],
		},
		{
			name: 'Bar Sài Gòn Vibes',
			slug: 'bar-sai-gon-vibes',
			description: 'Không gian trẻ trung, âm nhạc sống động tại trung tâm Sài Gòn.',
			category: 'bar',
			address: '42 Nguyễn Thị Minh Khai, Quận 1, TP.HCM',
			latitude: 10.7769,
			longitude: 106.7009,
			openingHours: '18:00 - 02:00',
			phone: '0903 111 999',
			website: 'https://saigonvibes.bar',
			images: [
				'https://source.unsplash.com/featured/?bar',
				'https://source.unsplash.com/featured/?nightlife',
			],
		},
		{
			name: 'Tiệm Trà Thảo Mộc An Nhiên',
			slug: 'tiem-tra-thao-moc-an-nhien',
			description: 'Không gian yên tĩnh với trà thảo mộc và nhạc thiền.',
			category: 'cafe',
			address: '88 Nguyễn Văn Trỗi, Đà Nẵng',
			latitude: 16.0544,
			longitude: 108.2022,
			openingHours: '09:00 - 20:00',
			phone: '0937 456 321',
			website: 'https://annhientea.vn',
			images: [
				'https://source.unsplash.com/featured/?tea',
				'https://source.unsplash.com/featured/?herbal',
			],
		},
		{
			name: 'Nhà hàng Chay Tịnh Tâm',
			slug: 'nha-hang-chay-tinh-tam',
			description: 'Ẩm thực chay thanh tịnh giữa lòng Hà Nội.',
			category: 'restaurant',
			address: '27 Lý Quốc Sư, Hoàn Kiếm, Hà Nội',
			latitude: 21.0312,
			longitude: 105.8496,
			openingHours: '10:00 - 21:30',
			phone: '0967 888 555',
			website: 'https://tinhtamchay.vn',
			images: [
				'https://source.unsplash.com/featured/?vegetarian,food',
				'https://source.unsplash.com/featured/?hanoi,restaurant',
			],
		},
		{
			name: 'Khách sạn Blue Ocean Phú Quốc',
			slug: 'khach-san-blue-ocean-phu-quoc',
			description: 'Nghỉ dưỡng bên bờ biển xanh trong, cách biển chỉ vài bước chân.',
			category: 'hotel',
			address: '99 Trần Hưng Đạo, Phú Quốc',
			latitude: 10.227,
			longitude: 103.9635,
			openingHours: '24/7',
			phone: '0297 377 8888',
			website: 'https://blueoceanphuquoc.vn',
			images: [
				'https://source.unsplash.com/featured/?beach,hotel',
				'https://source.unsplash.com/featured/?phuquoc,resort',
			],
		},
		{
			name: 'The Lighthouse Rooftop Bar',
			slug: 'the-lighthouse-rooftop-bar',
			description: 'Bar trên tầng thượng với ánh sáng lung linh và cocktail đặc sắc.',
			category: 'bar',
			address: '25 Bùi Viện, Quận 1, TP.HCM',
			latitude: 10.7689,
			longitude: 106.6954,
			openingHours: '18:00 - 03:00',
			phone: '0902 456 789',
			website: 'https://thelighthousebar.vn',
			images: [
				'https://source.unsplash.com/featured/?rooftop,bar',
				'https://source.unsplash.com/featured/?night,drinks',
			],
		},
		{
			name: 'Bánh Mì Phượng Hội An',
			slug: 'banh-mi-phuong-hoi-an',
			description: 'Tiệm bánh mì nổi tiếng được nhiều du khách yêu thích.',
			category: 'restaurant',
			address: '2B Phan Chu Trinh, Hội An',
			latitude: 15.8794,
			longitude: 108.335,
			openingHours: '06:00 - 21:00',
			phone: '0912 345 678',
			website: 'https://banhmiphuong.com',
			images: [
				'https://source.unsplash.com/featured/?banhmi',
				'https://source.unsplash.com/featured/?hoian,food',
			],
		},
		{
			name: 'Reaching Out Tea House',
			slug: 'reaching-out-tea-house',
			description: 'Không gian trà tĩnh lặng, do người khiếm thính phục vụ.',
			category: 'cafe',
			address: '131 Trần Phú, Hội An',
			latitude: 15.8795,
			longitude: 108.326,
			openingHours: '08:00 - 20:00',
			phone: '0935 789 123',
			website: 'https://reachingoutteahouse.com',
			images: [
				'https://source.unsplash.com/featured/?tea,hoian',
				'https://source.unsplash.com/featured/?cafe,vietnam',
			],
		},
		{
			name: 'The DeckHouse An Bàng Beach',
			slug: 'the-deckhouse-an-bang',
			description: 'Nhà hàng bên bãi biển với thiết kế mộc mạc và đồ ăn ngon.',
			category: 'restaurant',
			address: 'Bãi biển An Bàng, Hội An',
			latitude: 15.917,
			longitude: 108.339,
			openingHours: '10:00 - 22:00',
			phone: '0932 112 334',
			website: 'https://thedeckhouseanbang.com',
			images: [
				'https://source.unsplash.com/featured/?beach,restaurant',
				'https://source.unsplash.com/featured/?hoian,sea',
			],
		},
		{
			name: 'Ngũ Hành Sơn Đà Nẵng',
			slug: 'ngu-hanh-son-da-nang',
			description: 'Quần thể núi đá vôi tuyệt đẹp với chùa và hang động.',
			category: 'sightseeing',
			address: 'Hòa Hải, Ngũ Hành Sơn, Đà Nẵng',
			latitude: 16.0036,
			longitude: 108.263,
			openingHours: '07:00 - 17:30',
			phone: '0236 396 0674',
			website: 'https://ngu-hanh-son.vn',
			images: [
				'https://source.unsplash.com/featured/?mountain,vietnam',
				'https://source.unsplash.com/featured/?danang,sightseeing',
			],
		},
	]

	// ✅ Seed địa điểm + nhiều review ngẫu nhiên
	for (const place of placesData) {
		const createdPlace = await prisma.place.create({ data: place })

		const reviewCount = faker.number.int({ min: 5, max: 10 })
		let totalRating = 0

		for (let i = 0; i < reviewCount; i++) {
			const rating = faker.number.int({ min: 3, max: 5 })
			totalRating += rating

			await prisma.review.create({
				data: {
					rating,
					comment: faker.lorem.sentences({ min: 1, max: 3 }),
					userId: faker.helpers.arrayElement(allUsers).id,
					placeId: createdPlace.id,
				},
			})
		}

		const avgRating = parseFloat((totalRating / reviewCount).toFixed(1))

		await prisma.place.update({
			where: { id: createdPlace.id },
			data: {
				rating: avgRating,
				reviewCount: reviewCount,
			},
		})
	}

	console.log('✅ Seed xong!')
}

main()
	.catch((e) => {
		console.error('❌ Lỗi khi seed:', e)
		process.exit(1)
	})
	.finally(() => prisma.$disconnect())
