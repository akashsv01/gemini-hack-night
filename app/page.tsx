'use client';
import Image from 'next/image';
import { ChefHat, CookingPot, Timer, Utensils } from 'lucide-react'; // Assuming lucide-react is available, or you can use inline SVGs

// NOTE: Since the file structure provided does not show a 'components' folder, 
// I'm defining the Recipe component directly in the page file for simplicity, 
// but in a real app, this would live in a separate file (e.g., components/RecipeCard.tsx)

const RecipeCard = () => {
  const ingredients = [
    '1 lb Fettuccine or Spaghetti',
    '4 tablespoons butter',
    '4 cloves garlic, minced',
    '1 cup heavy cream',
    '1/2 cup Parmesan cheese, grated',
    'Salt and black pepper to taste',
    'Fresh parsley, chopped (for garnish)',
  ];

  const instructions = [
    'Cook pasta according to package directions. Reserve about 1 cup of pasta water before draining.',
    'In a large skillet, melt the butter over medium heat. Add minced garlic and sauté for about 1 minute until fragrant.',
    'Pour in the heavy cream and bring to a gentle simmer. Reduce heat to low and cook for 2-3 minutes.',
    'Stir in the grated Parmesan cheese until the sauce is smooth. If the sauce is too thick, add a little reserved pasta water.',
    'Add the drained pasta to the skillet and toss to coat thoroughly in the creamy sauce.',
    'Season generously with salt and pepper. Serve immediately, garnished with fresh parsley.'
  ];

  // Placeholder image URL
  const imageUrl = 'https://placehold.co/800x450/7879f5/ffffff?text=Creamy+Pasta';


  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl bg-white shadow-xl rounded-xl mt-8">
      <header className="text-center mb-8">
        <h2 className="text-5xl font-extrabold text-indigo-700 mb-2">
          Creamy Garlic Butter Pasta
        </h2>
        <p className="text-xl text-gray-500">
          A quick, rich, and ridiculously easy weeknight meal.
        </p>
      </header>

      {/* Hero Image / Placeholder */}
      <div className="relative w-full h-96 mb-8 overflow-hidden rounded-lg shadow-md">
        <img
          src={imageUrl}
          alt="Creamy Garlic Pasta"
          className="w-full h-full object-cover"
          // Adding onError for a clean fallback if the placeholder fails
          onError={(e) => {
            e.currentTarget.onerror = null; // prevents infinite loop
            e.currentTarget.src = 'https://placehold.co/800x450/374151/ffffff?text=Pasta+Image';
          }}
        />
      </div>

      {/* Metadata / Quick Facts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-10 border-b pb-6">
        <div className="flex flex-col items-center">
          <Utensils className="h-6 w-6 text-indigo-500" />
          <span className="text-lg font-semibold mt-1">Servings</span>
          <span className="text-gray-600">4</span>
        </div>
        <div className="flex flex-col items-center">
          <Timer className="h-6 w-6 text-indigo-500" />
          <span className="text-lg font-semibold mt-1">Prep Time</span>
          <span className="text-gray-600">5 min</span>
        </div>
        <div className="flex flex-col items-center">
          <CookingPot className="h-6 w-6 text-indigo-500" />
          <span className="text-lg font-semibold mt-1">Cook Time</span>
          <span className="text-gray-600">15 min</span>
        </div>
        <div className="flex flex-col items-center">
          <ChefHat className="h-6 w-6 text-indigo-500" />
          <span className="text-lg font-semibold mt-1">Difficulty</span>
          <span className="text-gray-600">Easy</span>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="mb-10">
        <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-indigo-400 pb-2 mb-4">
          Ingredients
        </h3>
        <ul className="space-y-3 list-none p-0">
          {ingredients.map((item, index) => (
            <li key={index} className="flex items-center text-lg text-gray-700 bg-indigo-50 p-3 rounded-lg shadow-sm">
              <span className="text-indigo-600 font-semibold mr-3">•</span> {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions Section */}
      <div>
        <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-indigo-400 pb-2 mb-4">
          Instructions
        </h3>
        <ol className="space-y-4">
          {instructions.map((step, index) => (
            <li key={index} className="flex text-gray-700">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md mr-3">
                {index + 1}
              </div>
              <p className="flex-grow text-lg">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </div>

    </div>
  );
};

// Export the main component for the page
export default function PastaRecipePage() {
  return (
    <div className="py-12">
      <RecipeCard />
    </div>
  );
}
