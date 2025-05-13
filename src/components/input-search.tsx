'use client'

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * A search input component that allows users to search and updates the URL query parameter.
 * 
 * @component
 * @description Renders an input field with a search icon, manages search state, and updates 
 * the URL query parameter dynamically as the user types.
 * 
 * @returns {JSX.Element} A search input component with responsive styling and search functionality.
 */
export default function InputSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') || '')

  /**
   * Updates the URL search parameters based on the current search input.
   * 
   * When the search value changes, this effect:
   * - Adds the search query to URL parameters if a search term exists
   * - Removes the search query parameter if the search is empty
   * - Navigates to the updated URL without a full page reload
   */
  useEffect(() => {
    const params = new URLSearchParams()
    if (search) { 
      params.set('q', search)
    } else {
      params.delete('q')
    }

    router.push(`/?${params.toString()}`)
  }, [search, router])

  return (
    <div className="flex justify-center px-4">
      <div className="relative w-full md:max-w-[700px] lg:max-w-[1280px]">
        <Input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 h-[40px] bg-white text-sm text-text-secondary"
          placeholder="busque pela loja ou culinária"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  )
}