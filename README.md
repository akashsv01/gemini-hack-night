# BiteRight 🍽️

> **Your instant dietary compatibility checker for any dish, anywhere!** Whether you're dining out or exploring new cuisines, BiteRight helps you make informed food choices. Simply snap a photo of a dish, specify your dietary restrictions, and get instant analysis of how likely it is to contain ingredients you need to avoid.


**Example**: Spotted "pad thai" on a menu but have a peanut allergy? Upload the photo or type the name, add "peanuts" as your restriction, and BiteRight might show that most of traditional recipes contain peanuts— helping you make a safe dining decision on the spot.

## 🌟 Features

- **📸 Image Upload & Recognition**: Snap a photo of any dish and let AI identify it for you
- **🔍 Recipe Discovery & Dietary Restriction Analysis**: Automatically searches the web for popular recipes based on dish photos and specified allergens
- **🎯 Smart Detection**: AI-powered dish recognition from photos for quick on-the-go checks
- **💨 Fast & Efficient**: Built with Next.js frontend and FastAPI backend for optimal performance
- **📱 User-Friendly Interface**: Clean, intuitive interface works seamlessly on desktop

## 🏗️ Tech Stack

### Frontend
- **Next.js** - React framework for production-ready applications
- **React** - UI component library
- **TypeScript** (if applicable) - Type-safe development

### Backend
- **Python FastAPI** - Modern, fast web framework for building APIs
- **Google Gemini 2.5 Flash** - AI-powered image recognition and dish identification
- **Google Gemini 2.0 Flash Lite** - Fast recipe content analysis
- **Google Search Grounding** - Web search integration for recipe discovery
- **BeautifulSoup4** - HTML parsing and web scraping
- **Pydantic** - Data validation and schema management
- **Threading** - Concurrent recipe analysis for faster results
- **Pillow (PIL)** - Image processing and base64 decoding
- **Requests** - HTTP client for fetching recipe pages

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun**
- **Python** (v3.8 or higher)
- **pip** - Python package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/hregahego/gemini-hack-night.git
cd gemini-hack-night
```

### 2. Set Up the Backend (FastAPI)

#### Navigate to the backend directory
```bash
cd backend
```

#### Create a virtual environment
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

#### Install Python dependencies
```bash
pip install -r requirements.txt
```

#### Set up environment variables
Create a `.env` file in the backend directory:
```env
# Add the necessary API key
GOOGLE_API_KEY=your_google_api_key_here
```

#### Run the FastAPI server
```bash
uvicorn app:app --reload
# or
python -m uvicorn app:app --reload
```

The backend API will be available at `http://localhost:8000`

### 3. Set Up the Frontend (Next.js)

#### Navigate to the frontend directory (or root if Next.js is in root)
```bash
cd ..  # if you were in backend
```

#### Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

#### Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see BiteRight in action!

## 📱 How to Use BiteRight

### Upload a Photo (Perfect for Dining Out)
1. **Take or Upload a Photo**: Snap a picture of the dish at a restaurant or upload an existing photo
2. **Specify Dietary Restrictions**: Add any dietary restrictions or allergens you want to avoid
3. **AI Recognition**: BiteRight automatically identifies the dish using Google Gemini API
4. **Get Instant Results**: See the risk and get insights whether the dish is most probable to contain your restricted ingredientsand, and make an informed decision


## 🔧 Image Analysis Flow
1. **Image Upload**: User uploads an image and types in his/her dietary restrictions
2. **Dish Identification**: Google Gemini 2.5 Flash analyzes the image and suggests dish names
3. **Recipe Search**: For each identified dish, Google Search grounding finds up to 5 recipe URL's
4. **Content Extraction**: BeautifulSoup scrapes and cleans the HTML content from each recipe page
5. **Parallel Analysis**: Multi-threaded processing analyzes all recipes simultaneously
6. **AI Restriction Check**: Google Gemini 2.0 Flash Lite checks each recipe for dietary restrictions
7. **Results Aggregation**: Returns comprehensive results with evidence and restriction details


## 🎯 Use Cases

- **🍽️ Dining Out**: Snap a photo of an unfamiliar dish on a menu to check if it's safe for your dietary needs before ordering
- **🏠 Restaurant Decisions**: Quickly assess menu items when browsing restaurant options online
- **🌍 Travel**: Navigate foreign cuisines confidently by checking dishes for allergens
- **👨‍🍳 Recipe Selection**: Make informed decisions about which dishes to cook based on dietary restrictions
- **🚨 Allergy Safety**: Get peace of mind about food safety when eating outside your comfort zone
- **🥗 Health Goals**: Understand ingredient prevalence for vegan, vegetarian, keto, or other dietary preferences
  

## 🤝 Contributing

This project was created during the MLH Gemini Hack Night 2025 and was built by:

- **[Akash S Vora](https://github.com/akashsv01)**
- **[Steven Wang](https://github.com/hregahego)**
- **[Drew Dietrich](https://github.com/Drewnicorn15)**
- **Parth Mohan**

Contributions, issues, and feature requests are welcome!


## 🙏 Acknowledgments

- Built during the MLH Gemini Hack Night
- Uses Google Gemini API for intelligent recipe analysis
- Leverages Next.js and FastAPI for modern, performant architecture

---

**Happy Cooking with BiteRight! 🍽️✨**
