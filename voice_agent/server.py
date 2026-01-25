from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from livekit import api
import os
from config import settings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/token")
async def get_token():
    # Create a random room name if needed, or use a specific one
    # For this demo, let's use a unique room for each session or shared
    import uuid
    room_name = f"room-{uuid.uuid4()}"
    participant_identity = f"user-{uuid.uuid4()}"

    token = api.AccessToken(settings.livekit_api_key, settings.livekit_api_secret) \
        .with_identity(participant_identity) \
        .with_name(participant_identity) \
        .with_grants(api.VideoGrants(room_join=True, room=room_name))

    return {
        "accessToken": token.to_jwt(),
        "url": settings.livekit_url
    }
