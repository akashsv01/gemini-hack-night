from fastapi import FastAPI
from google import genai
import os
from dotenv import load_dotenv

app = FastAPI()
load_dotenv()

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])


@app.get("/testprompt/{prompt}")
async def generate(prompt: str):
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    )
    print(response.text)
    return {"response_text": response.text}
