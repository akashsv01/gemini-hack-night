'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface AllergenResult {
  contains_allergens: boolean;
  which_allergens: string[];
  evidence: string;
}

interface APIResponse {
  [url: string]: AllergenResult;
}

export default function BlankPage() {
  const [results, setResults] = useState<APIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Mock data for testing
        const mockData: APIResponse = {
          "https://www.example.com/product1": {
            contains_allergens: true,
            which_allergens: ["peanuts", "tree nuts"],
            evidence: "Product contains peanut butter and almond extract in ingredients list"
          },
          "https://www.example.com/product2": {
            contains_allergens: false,
            which_allergens: [],
            evidence: "No common allergens found in ingredient list"
          },
          "https://www.example.com/product3": {
            contains_allergens: true,
            which_allergens: ["milk", "soy"],
            evidence: "Contains milk powder and soy lecithin as listed ingredients"
          }
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setResults(mockData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchResults();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading allergen results...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="absolute top-4 left-4">
          <img src="https://i.postimg.cc/9QBwWZdR/image.png" alt="LOGO" width="144" height="144" />
        </div>
        <h1 className="text-5xl font-bold text-center mb-8 text-green-600">Allergen Analysis Results</h1>
        
        {/* Dynamically render results for each URL */}
        {Object.entries(results).map(([url, result]) => (
          <div key={url} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 break-all text-black">{url}</h2>
            <div className="space-y-3">
              <div className={`text-lg font-medium flex items-center gap-2 ${
                result.contains_allergens ? 'text-red-600' : 'text-green-600'
              }`}>
                {result.contains_allergens ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Contains Allergens
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    No Allergens Detected
                  </>
                )}
              </div>
              {result.which_allergens.length > 0 && (
                <div>
                  <p className="font-medium text-black">Allergens found:</p>
                  <ul className="list-disc list-inside pl-4 text-black">
                    {result.which_allergens.map((allergen, index) => (
                      <li key={index} className="text-black">{allergen}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-gray-600">{result.evidence}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
