from fastapi import FastAPI
from google import genai
from google.genai import types
import os
from dotenv import load_dotenv
from bs4 import BeautifulSoup
import requests
from pydantic import BaseModel
import json


app = FastAPI()
load_dotenv()

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

# enable google search grounding for results
grounding_tool = types.Tool(
    google_search=types.GoogleSearch()
)

def get_recipe_links(dish: str):
    class ResponseLinksSchema(BaseModel):
        recipe_links: list[str]

    prompt = f"""You are a Recipe Link Extractor. Based on the google search results, 
    extract at most 15 links for {dish}. Do not include videos. 
    Respond ONLY in the requested JSON format. If no recipe links are found, return a JSON 
    object with an empty list: {{"recipe_links": []}}."""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            tools=[grounding_tool],
            response_schema=ResponseLinksSchema,
        )
    )

    cleaned_json_string = str(response.text).strip("\n").strip("```json").strip("```")
    data = json.loads(cleaned_json_string)
    
    return data['recipe_links']

def get_page_body(url: str):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    # delete elements
    for data in soup(["style", "script"]):
        data.decompose()
    
    return ' '.join(soup.stripped_strings)

if __name__ == "__main__":
    print(get_page_body("https://www.simplyrecipes.com/recipes/homemade_pepperoni_pizza/"))


