from fastapi import FastAPI
from google import genai
from google.genai import types
import os
from dotenv import load_dotenv
from bs4 import BeautifulSoup
import requests
from pydantic import BaseModel
import json
import threading
import python_multipart
from PIL import Image
from io import BytesIO


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

def get_page_text(url: str):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    # delete elements
    for data in soup(["style", "script"]):
        data.decompose()
    
    return ' '.join(soup.stripped_strings)


def check_individual_page(source, restrictions):
    restrictionsStr = ", ".join(restrictions)

    class RestrictionsResponse(BaseModel):
        contains_restrictions: bool
        which_restrictions: list[str]
        evidence: str

    response = client.models.generate_content(
        model = "gemini-2.5-flash",
        contents = f"""
        Analyze this text from an online recipe webpage: {source}
        Does the recipe violate any of these dietary restrictions: {restrictionsStr}. Analyze only the text relevant to
        the main recipe. If allergens or dietary restrictions are found, provide a 25 word excerpt as evidence.""",
        config = {
            "response_mime_type": "application/json",
            "response_schema": RestrictionsResponse,
        }
    )
    return {"response_text": response.text}

def identify_food(image_url: str):
    class Response(BaseModel):
        options: list[str]
    
    image_bytes = requests.get(image_url)
    img = Image.open(BytesIO(image_bytes.content))

    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=[f"What are the top 3 most likely dishes in the provided image", img],
        config={
        "response_mime_type": "application/json",
        "response_schema": Response,
        }
    )

    data = json.loads(str(response.text))
    
    return data['options']



def multithreadedCheck(links, restrictions):
    out = {"length": len(links)}
    threads = []
    for i in range(len(links)):
        threads.append(threading.Thread(target=check_individual_page, args=(get_page_text(links[i]), restrictions)))
        out[links[i]] = threads[i].start()

    return out

# TS IS THE ACTUAL ROUTE!!!
class InputParams(BaseModel):
    image_url: str
    restrictions: list[str]


@app.get("/runcheck/")
def run_check(params: InputParams):
    img_url = params.image_url
    restrictions = params.restrictions
    
    results = {}
    candidates = identify_food(img_url)
    for i in range(3):
        recipes = get_recipe_links(candidates[i])
        individual_results = multithreadedCheck(recipes, restrictions)
        results[i] = individual_results

    print(results)
    return results

    







    

if __name__ == "__main__":
    print(identify_food("https://images-ext-1.discordapp.net/external/dR4XrcBJfHIVDozDBb0se2Vs2L-vC86wAjgOvIJQoJU/https/upload.wikimedia.org/wikipedia/commons/b/b0/Hamburger_%252812164386105%2529.jpg?format=webp&width=2304&height=1536"))



