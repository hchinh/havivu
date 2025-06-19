'use client'

import { Input } from '@/components/ui/input'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from './ui/button'

const CATEGORY_LINKS = [
	{ label: 'Ăn uống', href: '/category/restaurant' },
	{ label: 'Cà phê', href: '/category/cafe' },
	{ label: 'Khách sạn', href: '/category/hotel' },
	{ label: 'Bar', href: '/category/bar' },
	{ label: 'Tham quan', href: '/category/sightseeing' },
]

export default function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<header className="flex flex-col md:flex-row md:items-center justify-between px-4 py-3 border-b shadow-sm sticky top-0 bg-white z-50">
			{/* TOP: Logo + Toggle */}
			<div className="flex items-center justify-between w-full md:w-auto">
				<h1 className="text-xl font-bold">
					<Link href="/">HAVIVU</Link>
				</h1>

				{/* Mobile Toggle Button */}
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					className="md:hidden"
				>
					{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</Button>
			</div>

			{/* Desktop Menu */}
			<NavigationMenu viewport={false} className="hidden md:flex">
				<NavigationMenuList className="flex items-center gap-4 text-sm font-medium ml-6">
					<NavigationMenuItem>
						<NavigationMenuLink asChild>
							<Link href="/" className={linkStyle}>
								Trang chủ
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<NavigationMenuTrigger className="text-gray-700 hover:text-black">
							Danh mục
						</NavigationMenuTrigger>
						<NavigationMenuContent className="bg-white p-2 shadow-md rounded-md">
							<ul className="grid gap-1 w-40">
								{CATEGORY_LINKS.map((item) => (
									<li key={item.href}>
										<NavigationMenuLink asChild>
											<Link
												href={item.href}
												className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
											>
												{item.label}
											</Link>
										</NavigationMenuLink>
									</li>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<NavigationMenuLink asChild>
							<Link href="/explore" className={linkStyle}>
								Khám phá
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			{/* Desktop Right */}
			<div className="hidden md:flex items-center gap-3 ml-auto">
				<Input type="text" placeholder="Tìm kiếm địa điểm..." className="max-w-sm" />
				<Link href="/login" className="text-sm font-medium whitespace-nowrap hover:underline">
					Đăng nhập
				</Link>
			</div>

			{mobileMenuOpen && (
				<NavigationMenu viewport={false} className="md:hidden mt-4 w-full">
					<NavigationMenuList className="flex flex-col items-start gap-2 text-sm font-medium">
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link href="/" className={linkStyle} onClick={() => setMobileMenuOpen(false)}>
									Trang chủ
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem className="w-full">
							<NavigationMenuTrigger className="text-gray-700 hover:text-black w-full text-left p-2">
								Danh mục
							</NavigationMenuTrigger>
							<NavigationMenuContent className="bg-white p-2 shadow-md rounded-md">
								<ul className="grid gap-1 w-40">
									{CATEGORY_LINKS.map(({ href, label }) => (
										<li key={href}>
											<NavigationMenuLink asChild>
												<Link
													href={href}
													className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
													onClick={() => setMobileMenuOpen(false)}
												>
													{label}
												</Link>
											</NavigationMenuLink>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link
									href="/explore"
									className={linkStyle}
									onClick={() => setMobileMenuOpen(false)}
								>
									Khám phá
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link
									href="/login"
									className="text-sm font-medium hover:underline"
									onClick={() => setMobileMenuOpen(false)}
								>
									Đăng nhập
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			)}
		</header>
	)
}

const linkStyle = 'text-gray-700 hover:text-black transition-colors'
