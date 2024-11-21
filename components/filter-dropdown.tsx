'use client'

import { Checkbox } from '@/components/ui/checkbox'

const filterOptions = [
  { id: 'alphabets', label: 'Alphabets' },
  { id: 'numbers', label: 'Numbers' },
  { id: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' },
]

export function FilterDropdown({ selectedFilters, setSelectedFilters }) {
  const handleFilterChange = (filterId) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    )
  }

  return (
    <div className="space-y-2 my-4">
      <h2 className="text-lg font-semibold">Filter Results:</h2>
      {filterOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <Checkbox
            id={option.id}
            checked={selectedFilters.includes(option.id)}
            onCheckedChange={() => handleFilterChange(option.id)}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </div>
  )
}

