from fastapi import FastAPI
from google import genai
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from PIL import Image
import threading
app = FastAPI()
load_dotenv()

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
def identify_food(dishIMG):
    class Response(BaseModel):
        options: list[str]
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=[f"what is the top 3 most likely dishes in the provided image",dishIMG],
        config={
        "response_mime_type": "application/json",
        "response_schema": Response,
    }
    )
    return {"response_text": response.text}

def check_idvl(source,allergens):
    length = len(allergens)-1
    allergensStr = allergens[0]
    for i in range(1,len(allergens)):
        if i == length:
            allergensStr += "or " + allergens[i] + " "
        else:
            allergensStr += ", "+ allergens[i] + " "
    class Response(BaseModel):
        contians_allergens: bool
        which_allergens: list[str]
        evidence: str
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=f"does the recipe below contain any of these ingredients: {allergensStr} here is the recipe {source}",
        config={
        "response_mime_type": "application/json",
        "response_schema": Response,
    }
    )
    return {"response_text": response.text}
def multithreadedCheck(links,sources,allergens):
    out = {}
    threads = []
    for i in range(len(sources)):
        threads.append(threading.Thread(target=check_idvl, args=(sources[i],allergens)))
        out[links[i]] = threads[i].start()
    return out
