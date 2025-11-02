import ImageUpload from '../component/ImageUpload';
import DietaryRestrictions from '../component/DietaryRestrictions';

export default function BlankTitlePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="absolute top-4 left-4">
        <img src="https://i.postimg.cc/9QBwWZdR/image.png" alt="LOGO" width="144" height="144" />
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="absolute top-4 left-4">
        <img src="https://i.postimg.cc/9QBwWZdR/image.png" alt="LOGO" width="144" height="144" />
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen gap-8">
        <h1 className="text-8xl font-extrabold text-green-600">
          BiteRight
        </h1>
        <ImageUpload />
        <DietaryRestrictions />
      </div>
    </div>
  );
}