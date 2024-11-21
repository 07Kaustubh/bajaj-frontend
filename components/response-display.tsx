interface Response {
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

interface ResponseDisplayProps {
  response: Response | null; // Allow null for cases where the response is not available
  selectedFilters: string[];
}

export function ResponseDisplay({ response, selectedFilters }: ResponseDisplayProps) {
  if (!response) {
    return (
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Response:</h2>
        <p>No response available.</p>
      </div>
    );
  }

  const filterResponse = () => {
    const filteredResponse: Partial<Response> = {
      is_success: response.is_success,
      user_id: response.user_id,
      email: response.email,
      roll_number: response.roll_number,
      is_prime_found: response.is_prime_found,
    };

    if (selectedFilters.includes('alphabets') && response.alphabets) {
      filteredResponse.alphabets = response.alphabets;
    }

    if (selectedFilters.includes('numbers') && response.numbers) {
      filteredResponse.numbers = response.numbers;
    }

    if (
      selectedFilters.includes('highest_lowercase_alphabet') &&
      response.highest_lowercase_alphabet
    ) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    if (response.file_valid !== undefined) {
      filteredResponse.file_valid = response.file_valid;
      filteredResponse.file_mime_type = response.file_mime_type;
      filteredResponse.file_size_kb = response.file_size_kb;
    }

    return filteredResponse;
  };

  const filteredResponse = filterResponse();

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Response:</h2>
      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
        {JSON.stringify(filteredResponse, null, 2)}
      </pre>
    </div>
  );
}
