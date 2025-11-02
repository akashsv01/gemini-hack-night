from fastapi import FastAPI
from google import genai
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from PIL import Image
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
    print(response.text)
    return {"response_text": response.text}