export function ResponseDisplay({ response, selectedFilters }) {
  const filterResponse = () => {
    const filteredResponse = {
      is_success: response.is_success,
      user_id: response.user_id,
      email: response.email,
      roll_number: response.roll_number,
    }
    
    if (selectedFilters.includes('alphabets') && response.alphabets) {
      filteredResponse.alphabets = response.alphabets
    }
    
    if (selectedFilters.includes('numbers') && response.numbers) {
      filteredResponse.numbers = response.numbers
    }
    
    if (selectedFilters.includes('highest_lowercase_alphabet') && response.highest_lowercase_alphabet) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet
    }
    
    // Always include these fields
    filteredResponse.is_prime_found = response.is_prime_found
    
    if (response.file_valid !== undefined) {
      filteredResponse.file_valid = response.file_valid
      filteredResponse.file_mime_type = response.file_mime_type
      filteredResponse.file_size_kb = response.file_size_kb
    }
    
    return filteredResponse
  }

  const filteredResponse = filterResponse()

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Response:</h2>
      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
        {JSON.stringify(filteredResponse, null, 2)}
      </pre>
    </div>
  )
}

