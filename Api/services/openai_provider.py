from utils.model_system_instructions import dalle_system_instructions
from openai import OpenAI
from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class GPTDescriptionResponse(BaseModel):
    simple_description: str
    detailed_description: str
        
class OpenAIProvider:
    def __init__(self, messages, system_instructions, temperature, max_tokens, model):
        self.messages = [{"role": "system", "content": system_instructions}] + messages if system_instructions is not None else messages
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.model = model


    def generate_response(self):

        try:
            completion = client.chat.completions.create(
                model=self.model,
                messages=self.messages,
                temperature=self.temperature,
                max_tokens=self.max_tokens
            )
            return completion.choices[0].message.content
        except Exception as e:
            print(f"An error occurred while generating the response: {e}")
            return None
        
    def generate_object_response(self):

        try:
            completion = client.beta.chat.completions.parse(
                model=self.model,
                messages=self.messages,
                temperature=self.temperature,
                max_tokens=self.max_tokens,
                response_format= GPTDescriptionResponse,
            )
            return completion.choices[0].message.parsed
        except Exception as e:
            print(f"An error occurred while generating the response: {e}")
            return None
        
    def generate_image(self):
        response = client.images.generate(
            model=self.model,
            prompt=dalle_system_instructions(self.messages[0]['content']),
            size="1024x1024",
            quality="standard",
            n=1,
            response_format='b64_json'
        )

        return response.data[0].b64_json
