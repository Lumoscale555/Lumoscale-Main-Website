import os
from dotenv import load_dotenv

load_dotenv(override=True)

class Settings:
    # LiveKit
    livekit_url = os.getenv("LIVEKIT_URL")
    livekit_api_key = os.getenv("LIVEKIT_API_KEY")
    livekit_api_secret = os.getenv("LIVEKIT_API_SECRET")

    # APIs
    openai_api_key = os.getenv("OPENAI_API_KEY")
    deepgram_api_key = os.getenv("DEEPGRAM_API_KEY")
    cartesia_api_key = os.getenv("CARTESIA_API_KEY")
    cartesia_voice_id = os.getenv("CARTESIA_VOICE_ID", "248be419-3632-4f4d-b671-2ab23ede5d4d") # Default ID if not set

    # Redis
    redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")

settings = Settings()
