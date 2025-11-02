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
from PIL import ImageFile
from io import BytesIO
from io import StringIO
import base64

ImageFile.LOAD_TRUNCATED_IMAGES = True
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
    extract at most 5 links for {dish}. Do not include videos or invalid links. 
    Respond ONLY in the requested JSON format, with json field being named 'recipe_links'."""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            tools=[grounding_tool],
            response_schema=ResponseLinksSchema,
            # response_mime_type="application/json",
        )
    )
    cleaned_json_string = str(response.text).strip("\n").strip("```json").strip("```")
    data = json.loads(cleaned_json_string)
    
    print(data)
    return data['recipe_links']


def get_page_text(url: str):
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
        response = requests.get(url, allow_redirects=True, headers=headers)
        response.raise_for_status()  # Raise an exception for bad status codes
        final_url = response.url
        print(f"Redirected to: {final_url}")

        soup = BeautifulSoup(response.content, "html.parser")
        # delete elements
        for data in soup(["style", "script"]):
            data.decompose()
        
        return ' '.join(soup.stripped_strings)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching URL {url}: {e}")
        return ""


def check_individual_page(source, restrictions, dict, link):
    restrictionsStr = ", ".join(restrictions)

    class RestrictionsResponse(BaseModel):
        contains_restrictions: bool
        which_restrictions: list[str]
        evidence: str

    response = client.models.generate_content(
        model = "gemini-2.0-flash-lite",
        contents = f"""
        Analyze this text from an online recipe webpage: {source}
        Does the recipe violate any of these dietary restrictions: {restrictionsStr}. Analyze only the text relevant to
        the main recipe. If allergens or dietary restrictions are found, provide a 25 word excerpt as evidence,
        and set 'contains_restrictions' to true.""",
        config = {
            "response_mime_type": "application/json",
            "response_schema": RestrictionsResponse,
        }
    )
    dict[link] = response.text

def identify_food(b64_string: str):
    class Response(BaseModel):
        options: list[str]
    
    comma_idx = b64_string.find(',') 
    b64_data = b64_string[comma_idx+1:]

    # missing_padding = len(b64_data) % 4
    # if missing_padding:
    #     b64_data += '='* (4 - missing_padding)

    img = Image.open(BytesIO(base64.b64decode(b64_data)))
    
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=[f"What is the most likely dish in the provided image. Only give one dish.", img],
        config={
        "response_mime_type": "application/json",
        "response_schema": Response,
        }
    )
    print("request")

    data = json.loads(str(response.text))
    
    print(data['options'])
    return data['options']



def multithreadedCheck(links, restrictions):
    out = {"length": len(links)}
    threads = []
    for i in range(len(links)):
        text = get_page_text(links[i])
        thread = threading.Thread(target=check_individual_page, args=(text, restrictions, out, links[i]))
        thread.start()
        threads.append(thread)

    for thread in threads:
        thread.join()

    return out

# TS IS THE ACTUAL ROUTE!!!
class InputParams(BaseModel):
    image_url: str
    restrictions: list[str]


@app.post("/runcheck/")
def run_check(params: InputParams):
    img_url = params.image_url
    restrictions = params.restrictions
    
    
    results = {}
    candidates = identify_food(img_url)
    for i in range(len(candidates)):
        recipes = get_recipe_links(candidates[i])
        individual_results = multithreadedCheck(recipes, restrictions)
        results[i] = individual_results

    return results


