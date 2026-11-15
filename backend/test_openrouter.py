
import os
import json
import urllib.request
import urllib.error
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

api_key = os.getenv("OPENROUTER_API_KEY")

if not api_key:
    raise ValueError("OPENROUTER_API_KEY not found in backend/.env")

payload = {
    "model": "openrouter/free",
    "messages": [
        {
            "role": "user",
            "content": "Reply with exactly: ASTRO ONLINE"
        }
    ]
}

request = urllib.request.Request(
    "https://openrouter.ai/api/v1/chat/completions",
    data=json.dumps(payload).encode("utf-8"),
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    },
    method="POST"
)

try:
    with urllib.request.urlopen(request, timeout=60) as response:
        result = json.loads(response.read().decode("utf-8"))
        print("OPENROUTER STATUS: SUCCESS")
        print("MODEL:", result.get("model"))
        print("RESPONSE:", result["choices"][0]["message"]["content"])

except urllib.error.HTTPError as error:
    print("OPENROUTER ERROR:", error.code)
    print(error.read().decode("utf-8"))

except Exception as error:
    print("ERROR:", str(error))
