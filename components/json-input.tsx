'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface JsonInputProps {
  onApiResponse: (data: any) => void; // Define a more specific type for `data` if possible
}

export function JsonInput({ onApiResponse }: JsonInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const parsedJson = JSON.parse(inputValue);

      if (!Array.isArray(parsedJson.data)) {
        throw new Error("Invalid input: 'data' must be an array.");
      }

      // Handle file upload
      let file_b64: string | null = null;
      if (file) {
        file_b64 = await new Promise<string | null>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result ? reader.result.toString().split(',')[1] : null);
          };
          reader.onerror = () => {
            reject(new Error('Failed to read the file.'));
          };
          reader.readAsDataURL(file);
        });
      }

      const requestBody = {
        ...parsedJson,
        file_b64,
      };

      const response = await fetch('https://bhfl-api-hujs.onrender.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      onApiResponse(data);
    } catch (err: any) {
      setError(
        err instanceof SyntaxError
          ? 'Invalid JSON format. Please check your input.'
          : err.message || 'An unexpected error occurred.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="json-input">JSON Input</Label>
        <Textarea
          id="json-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Enter JSON (e.g., { "data": ["A", "C", "z", "1", "2"] })'
          rows={5}
        />
      </div>
      <div>
        <Label htmlFor="file-input">File Upload (Optional)</Label>
        <Input
          id="file-input"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Submit'}
      </Button>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
