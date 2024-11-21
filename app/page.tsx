'use client'

import { useState } from 'react'
import { JsonInput } from '../components/json-input'
import { FilterDropdown } from '../components/filter-dropdown'
import { ResponseDisplay } from '../components/response-display'

export default function Home() {
  const [apiResponse, setApiResponse] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState(['alphabets', 'numbers', 'highest_lowercase_alphabet'])

  const handleApiResponse = (response) => {
    setApiResponse(response)
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">JSON Processor</h1>
      <JsonInput onApiResponse={handleApiResponse} />
      {apiResponse && (
        <>
          <FilterDropdown
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
          <ResponseDisplay response={apiResponse} selectedFilters={selectedFilters} />
        </>
      )}
    </main>
  )
}

