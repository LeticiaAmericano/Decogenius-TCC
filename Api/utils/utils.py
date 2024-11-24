import json
import base64
import requests

def string_to_json(json_string):
    try:
        cleaned_string = " ".join(json_string.split())
        cleaned_string = cleaned_string.replace("```json", '').replace('```', '').replace('json', '')

        json_data = json.loads(cleaned_string)
        return json_data
    except json.JSONDecodeError as e:
        print(f"Erro ao converter string para JSON: {e}")
        return None
    

def convert_image_to_base64_url(image_url):
    try:
        response = requests.get(image_url)
        response.raise_for_status()

        img_base64 = base64.b64encode(response.content).decode('utf-8')

        base64_url = f"data:image/png;base64,{img_base64}"
        return base64_url
    except Exception as e:
        print(f"Error converting image to Base64: {e}")
        return None