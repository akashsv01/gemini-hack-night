// 'use client';

// import { useState } from 'react';
// import ImageUpload from '../component/ImageUpload';
// import DietaryRestrictions from '../component/DietaryRestrictions';
// import GoButton from '@/component/GoButton';

// export default function BlankTitlePage() {
//   const [imageInfo, setImageInfo] = useState<{
//     file: File;
//     url: string;
//   } | null>(null);

//   const handleImageUpload = (file: File, dataUrl: string) => {
//     setImageInfo({
//       file,
//       url: dataUrl
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="absolute top-4 left-4">
//         <img src="https://i.postimg.cc/9QBwWZdR/image.png" alt="LOGO" width="144" height="144" />
//       </div>
//       <div className="flex flex-col justify-center items-center min-h-screen gap-8">
//         <h1 className="text-8xl font-extrabold text-green-600">
//           BiteRight
//         </h1>
//         <ImageUpload onImageUpload={handleImageUpload} />
        
//         {/* Display the COMPLETE image URL */}
//         {imageInfo && (
//           <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md">
//             <p className="text-sm font-semibold text-gray-700 mb-2">Complete Image URL:</p>
//             <div className="bg-gray-100 p-3 rounded border border-gray-300 overflow-auto max-h-96">
//               <p className="text-xs break-all font-mono whitespace-pre-wrap">
//                 {imageInfo.url}
//               </p>
//             </div>
//             <button
//               onClick={() => navigator.clipboard.writeText(imageInfo.url)}
//               className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
//             >
//               Copy to Clipboard
//             </button>
//           </div>
//         )}
        
//         <DietaryRestrictions />
//         <div className="pt-4">
//           <GoButton
//             to="/blank"
//             label="Find"
//             className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import ImageUpload from '../component/ImageUpload';
// import DietaryRestrictions from '../component/DietaryRestrictions';
// import GoButton from '@/component/GoButton';

// export default function BlankTitlePage() {
//   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleImageUpload = async (file: File, dataUrl: string) => {
//     setUploading(true);
//     setError(null);
    
//     try {
    
//       const base64Image = dataUrl.split(',')[1];
      
//       const formData = new FormData();
//       formData.append('image', base64Image);
      
//       const response = await fetch('https://api.imgbb.com/1/upload?key=53a66592b082494ffb93dd6e8d6a363a', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
      
//       if (data.success) {
//         setImageUrl(data.data.url);
//       } else {
//         setError(data.error?.message || 'Upload failed. Please try again.');
//       }
//     } catch (err) {
//       console.error('Upload error:', err);
//       setError(`Upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="absolute top-4 left-4">
//         <img src="https://i.postimg.cc/9QBwWZdR/image.png" alt="LOGO" width="144" height="144" />
//       </div>
//       <div className="flex flex-col justify-center items-center min-h-screen gap-8">
//         <h1 className="text-8xl font-extrabold text-green-600">
//           BiteRight
//         </h1>
//         <ImageUpload onImageUpload={handleImageUpload} />
        
//         {uploading && (
//           <div className="text-center bg-blue-100 p-4 rounded-lg">
//             <p className="text-blue-600 animate-pulse font-semibold">Uploading to cloud...</p>
//           </div>
//         )}
        
//         {error && (
//           <div className="text-center bg-red-100 p-4 rounded-lg max-w-2xl">
//             <p className="text-red-600 font-semibold">Error:</p>
//             <p className="text-red-600 text-sm mt-1">{error}</p>
//           </div>
//         )}
        
//         {imageUrl && (
//           <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md">
//             <p className="text-sm font-semibold text-gray-700 mb-2">Hosted Image URL:</p>
//             <div className="bg-gray-100 p-3 rounded border border-gray-300 overflow-auto max-h-32">
//               <a 
//                 href={imageUrl} 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="text-xs break-all text-blue-600 hover:text-blue-800 underline"
//               >
//                 {imageUrl}
//               </a>
//             </div>
//             <div className="flex gap-2 mt-3">
//               <button
//                 onClick={() => navigator.clipboard.writeText(imageUrl)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
//               >
//                 Copy URL
//               </button>
//               <button
//                 onClick={() => window.open(imageUrl, '_blank')}
//                 className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
//               >
//                 Open Image
//               </button>
//             </div>
//           </div>
//         )}
        
//         <DietaryRestrictions />
//         <div className="pt-4">
//           <GoButton
//             to="/blank"
//             label="Find"
//             className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '../component/ImageUpload';
import DietaryRestrictions from '../component/DietaryRestrictions';

export default function BlankTitlePage() {
  const router = useRouter();
  const [imageInfo, setImageInfo] = useState<{
    file: File;
    url: string;
  } | null>(null);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);

  const handleImageUpload = (file: File, dataUrl: string) => {
    setImageInfo({
      file,
      url: dataUrl
    });
  };

  const handleRestrictionsChange = (restrictions: string[]) => {
    setDietaryRestrictions(restrictions);
  };

  const handleFind = () => {
    // Store data in sessionStorage to pass to next page
    if (imageInfo) {
      sessionStorage.setItem('imageUrl', imageInfo.url);
    }
    sessionStorage.setItem('dietaryRestrictions', JSON.stringify(dietaryRestrictions));
    
    // Navigate to the next page
    router.push('/blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="absolute top-4 left-4">
        <img src="https://i.postimg.cc/9QBwWZdR/image.png" alt="LOGO" width="144" height="144" />
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen gap-8">
        <h1 className="text-8xl font-extrabold text-green-600">
          BiteRight
        </h1>
        <ImageUpload onImageUpload={handleImageUpload} />
        
        {/* Display the COMPLETE image URL */}
        {imageInfo && (
          <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm font-semibold text-gray-700 mb-2">Complete Image URL:</p>
            <div className="bg-gray-100 p-3 rounded border border-gray-300 overflow-auto max-h-96">
              <p className="text-xs break-all font-mono whitespace-pre-wrap">
                {imageInfo.url}
              </p>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(imageInfo.url)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
        
        <DietaryRestrictions onRestrictionsChange={handleRestrictionsChange} />
        
        <div className="pt-4">
          <button
            onClick={handleFind}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Find
          </button>
        </div>
      </div>
    </div>
  );
}