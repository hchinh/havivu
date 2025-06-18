import CategorySection from '@/components/category-section'
import HighlightedSection from '@/components/highlighted-section'

export default function HomePage() {
	return (
		<div className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full space-y-10">
			<HighlightedSection />
			<CategorySection />
		</div>
	)
}
