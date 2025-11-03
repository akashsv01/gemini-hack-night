// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// interface AllergenResult {
//   contains_allergens: boolean;
//   which_allergens: string[];
//   evidence: string;
// }

// interface APIResponse {
//   [url: string]: AllergenResult;
// }

// export default function BlankPage() {
//   const router = useRouter();
//   const [results, setResults] = useState<APIResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [imageUrl, setImageUrl] = useState<string>('');
//   const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);

//   useEffect(() => {
//     // Retrieve dietary restrictions and image from sessionStorage
//     const storedImageUrl = sessionStorage.getItem('imageUrl');
//     const storedRestrictions = sessionStorage.getItem('dietaryRestrictions');

//     if (storedImageUrl) {
//       setImageUrl(storedImageUrl);
//     }

//     if (storedRestrictions) {
//       try {
//         const restrictions = JSON.parse(storedRestrictions);
//         setDietaryRestrictions(restrictions);
//       } catch (error) {
//         console.error('Error parsing dietary restrictions:', error);
//       }
//     }

//     const fetchResults = async () => {
//       try {
//         const storedImageUrl = sessionStorage.getItem('imageUrl');
//         const storedRestrictions = sessionStorage.getItem('dietaryRestrictions');
//         const restrictions = storedRestrictions ? JSON.parse(storedRestrictions) : [];

//         const response = await fetch('http://127.0.0.1:8000/runcheck/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             image_url: storedImageUrl,
//             restrictions: restrictions,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setResults(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       }
//     };

//     fetchResults();
//   }, []);

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-xl text-red-600">{error}</p>
//       </div>
//     );
//   }

//   if (!results) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-xl">Loading allergen results...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <div className="max-w-3xl mx-auto space-y-6">
//         <div className="absolute top-4 left-4">
//           <img src="https://i.postimg.cc/9QBwWZdR/image.png" alt="LOGO" width="144" height="144" />
//         </div>

//         <button
//           onClick={() => router.push('/')}
//           className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//         >
//           ← Back
//         </button>

//         <h1 className="text-5xl font-bold text-center mb-8 text-green-600">Allergen Analysis Results</h1>
        
//         {/* Display Dietary Restrictions */}
//         {dietaryRestrictions.length > 0 && (
//           <div className="bg-white rounded-lg shadow p-6 mb-6">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//               Your Dietary Restrictions
//             </h2>
//             <div className="flex flex-wrap gap-2">
//               {dietaryRestrictions.map((restriction, index) => (
//                 <div
//                   key={index}
//                   className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium"
//                 >
//                   {restriction}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Display Uploaded Image */}
//         {imageUrl && (
//           <div className="bg-white rounded-lg shadow p-6 mb-6">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//               Uploaded Image
//             </h2>
//             <img 
//               src={imageUrl} 
//               alt="Uploaded food" 
//               className="max-w-full h-auto rounded-lg shadow"
//             />
//           </div>
//         )}
        
//         {/* Dynamically render results for each URL */}
//         {Object.entries(results).map(([url, result]) => (
//           <div key={url} className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-xl font-semibold mb-4 break-all text-black">{url}</h2>
//             <div className="space-y-3">
//               <div className={`text-lg font-medium flex items-center gap-2 ${
//                 result.contains_allergens ? 'text-green-600' : 'text-red-600'
//               }`}>
//                 {result.contains_allergens ? (
//                   <>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     No Allergens Detected
//                   </>
//                 ) : (
//                   <>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                     Allergens Detected
//                   </>
//                 )}
//               </div>
//               {result.which_allergens && result.which_allergens.length > 0 && (
//                 <div>
//                   <p className="font-medium text-black">Allergens found:</p>
//                   <ul className="list-disc list-inside pl-4 text-black">
//                     {result.which_allergens.map((allergen, index) => (
//                       <li key={index} className="text-black">{allergen}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               <p className="text-gray-600">{result.evidence}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AllergenResult {
  contains_restrictions: boolean;  // Changed from contains_allergens
  which_restrictions: string[];    // Changed from which_allergens
  evidence: string;
}

interface APIResponse {
  [url: string]: AllergenResult;
}

export default function BlankPage() {
  const router = useRouter();
  const [results, setResults] = useState<APIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);

  useEffect(() => {
    // Retrieve dietary restrictions and image from sessionStorage
    const storedImageUrl = sessionStorage.getItem('imageUrl');
    const storedRestrictions = sessionStorage.getItem('dietaryRestrictions');

    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
    }

    if (storedRestrictions) {
      try {
        const restrictions = JSON.parse(storedRestrictions);
        setDietaryRestrictions(restrictions);
      } catch (error) {
        console.error('Error parsing dietary restrictions:', error);
      }
    }

    const fetchResults = async () => {
      try {
        const storedImageUrl = sessionStorage.getItem('imageUrl');
        const storedRestrictions = sessionStorage.getItem('dietaryRestrictions');
        const restrictions = storedRestrictions ? JSON.parse(storedRestrictions) : [];

        const response = await fetch('http://127.0.0.1:8000/runcheck/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image_url: storedImageUrl,
            restrictions: restrictions,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Debug log
        setResults(data);
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

        <button
          onClick={() => router.push('/')}
          className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          ← Back
        </button>

        <h1 className="text-5xl font-bold text-center mb-8 text-green-600">Allergen Analysis Results</h1>
        
        {/* Display Dietary Restrictions */}
        {dietaryRestrictions.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Dietary Restrictions
            </h2>
            <div className="flex flex-wrap gap-2">
              {dietaryRestrictions.map((restriction, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium"
                >
                  {restriction}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display Uploaded Image */}
        {imageUrl && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Uploaded Image
            </h2>
            <img 
              src={imageUrl} 
              alt="Uploaded food" 
              className="max-w-full h-auto rounded-lg shadow"
            />
          </div>
        )}
        
        {/* Dynamically render results for each URL */}
        {Object.entries(results).map(([url, result]) => (
          <div key={url} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 break-all text-black">
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {url}
              </a>
            </h2>
            <div className="space-y-3">
              {/* FIXED: Now correctly checks contains_restrictions */}
              <div className={`text-lg font-medium flex items-center gap-2 ${
                !result.contains_restrictions ? 'text-green-600' : 'text-red-600'
              }`}>
                {!result.contains_restrictions ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Safe to Eat - No Restrictions Violated
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Warning - Dietary Restrictions Found
                  </>
                )}
              </div>
              {result.which_restrictions && result.which_restrictions.length > 0 && (
                <div>
                  <p className="font-medium text-black">Restrictions violated:</p>
                  <ul className="list-disc list-inside pl-4 text-black">
                    {result.which_restrictions.map((restriction, index) => (
                      <li key={index} className="text-red-700 font-medium">{restriction}</li>
                    ))}
                  </ul>
                </div>
              )}
              {result.evidence && (
                <div className="bg-gray-50 p-3 rounded border-l-4 border-red-500">
                  <p className="text-sm font-medium text-gray-700 mb-1">Evidence:</p>
                  <p className="text-gray-600 text-sm italic">{result.evidence}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}