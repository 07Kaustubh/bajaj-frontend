'use client';

import { useState } from 'react';
import { JsonInput } from '../components/json-input';
import { FilterDropdown } from '../components/filter-dropdown';
import { ResponseDisplay } from '../components/response-display';

interface ApiResponse {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  alphabets?: string[];
  numbers?: number[];
  highest_lowercase_alphabet?: string;
  is_prime_found: boolean;
  file_valid?: boolean;
  file_mime_type?: string;
  file_size_kb?: number;
}

export default function Home() {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    'alphabets',
    'numbers',
    'highest_lowercase_alphabet',
  ]);

  const handleApiResponse = (response: ApiResponse) => {
    setApiResponse(response);
  };

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
          <ResponseDisplay
            response={apiResponse}
            selectedFilters={selectedFilters}
          />
        </>
      )}
    </main>
  );
}
