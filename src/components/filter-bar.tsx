'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useDebounce } from '@/hooks/common/useDebounce'
import { useGetPlaceSuggestionsByCategory } from '@/hooks/places/useGetSuggestionsByCategory'
import { AnimatePresence, motion } from 'framer-motion'
import { FunnelIcon, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Filters = {
	q: string
	sort: 'latest' | 'top-rated'
	minRating: number
}

type FilterBarProps = {
	onFilterChange: (filters: Filters) => void
	category?: string
}

const defaultFilters: Filters = {
	q: '',
	sort: 'latest',
	minRating: 0,
}

export default function FilterBar({ onFilterChange, category }: FilterBarProps) {
	const [filters, setFilters] = useState<Filters>(defaultFilters)
	const [showSuggestions, setShowSuggestions] = useState(false)

	const debouncedQuery = useDebounce(filters.q, 200)
	const { data: suggestions = [] } = useGetPlaceSuggestionsByCategory(debouncedQuery, category)

	const inputRef = useRef<HTMLInputElement>(null)

	const handleSearch = () => {
		onFilterChange(filters)
		setShowSuggestions(false)
	}

	const handleReset = () => {
		setFilters(defaultFilters)
		onFilterChange(defaultFilters)
		setShowSuggestions(false)
	}

	const handleSuggestionClick = (name: string) => {
		setFilters((prev) => ({ ...prev, q: name }))
		setShowSuggestions(false)
		inputRef.current?.blur()
		onFilterChange({ ...filters, q: name })
	}

	useEffect(() => {
		setShowSuggestions(debouncedQuery.length > 0 && suggestions.length > 0)
	}, [debouncedQuery, suggestions])

	return (
		<div className="p-4 rounded-xl border bg-white shadow-sm mb-6 relative">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{/* Tìm kiếm */}
				<div className="flex flex-col gap-1 relative">
					<Label htmlFor="q">Tìm kiếm</Label>
					<Input
						ref={inputRef}
						id="q"
						placeholder="Tên địa điểm..."
						value={filters.q}
						onChange={(e) => setFilters((prev) => ({ ...prev, q: e.target.value }))}
						onFocus={() => setShowSuggestions(suggestions.length > 0)}
					/>
					<AnimatePresence>
						{showSuggestions && (
							<motion.ul
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.2 }}
								className="absolute top-full z-10 mt-1 w-full bg-white border rounded shadow-sm max-h-60 overflow-y-auto"
							>
								{suggestions.map((place) => (
									<li
										key={place.id}
										className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
										onClick={() => handleSuggestionClick(place.name)}
									>
										{place.name}
									</li>
								))}
							</motion.ul>
						)}
					</AnimatePresence>
				</div>

				{/* Sắp xếp */}
				<div className="flex flex-col gap-1">
					<Label htmlFor="sort">Sắp xếp</Label>
					<Select
						value={filters.sort}
						onValueChange={(val) =>
							setFilters((prev) => ({ ...prev, sort: val as Filters['sort'] }))
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Chọn sắp xếp" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="latest">Mới nhất</SelectItem>
							<SelectItem value="top-rated">Đánh giá cao</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Đánh giá tối thiểu */}
				<div className="flex flex-col gap-1">
					<Label htmlFor="minRating">Tối thiểu ⭐</Label>
					<Select
						value={filters.minRating.toString()}
						onValueChange={(val) => setFilters((prev) => ({ ...prev, minRating: parseInt(val) }))}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Chọn đánh giá" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="0">Tất cả</SelectItem>
							<SelectItem value="1">1 sao trở lên</SelectItem>
							<SelectItem value="2">2 sao trở lên</SelectItem>
							<SelectItem value="3">3 sao trở lên</SelectItem>
							<SelectItem value="4">4 sao trở lên</SelectItem>
							<SelectItem value="5">5 sao</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Hành động */}
				<div className="flex flex-col items-end lg:flex-row gap-2 w-full">
					<Button onClick={handleSearch} className="w-full lg:w-1/2">
						<FunnelIcon className="w-4 h-4 mr-2" />
						Tìm kiếm
					</Button>
					<Button variant="outline" onClick={handleReset} className="w-full lg:w-1/2">
						<RotateCcw className="w-4 h-4 mr-2" />
						Đặt lại
					</Button>
				</div>
			</div>
		</div>
	)
}
