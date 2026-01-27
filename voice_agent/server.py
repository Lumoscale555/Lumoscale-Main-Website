from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from livekit import api
import os
from config import settings
from pydantic import BaseModel

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


class OutboundCallRequest(BaseModel):
    phone: str

@app.post("/api/call")
async def start_outbound_call(request: OutboundCallRequest):
    import uuid
    room_name = f"room-{uuid.uuid4()}"
    
    # Initialize LiveKit API
    lk_api = api.LiveKitAPI(settings.livekit_url, settings.livekit_api_key, settings.livekit_api_secret)
    
    try:
        if not settings.sip_trunk_id:
             return {"error": "SIP_TRUNK_ID not configured"}
             
        # Create SIP Participant to dial out
        # This requires the SIP trunk to be configured in LiveKit Cloud
        # and the SIP_TRUNK_ID to be set in env
        await lk_api.sip.create_sip_participant(
            api.CreateSIPParticipantRequest(
                sip_trunk_id=settings.sip_trunk_id,
                sip_call_to=request.phone,
                room_name=room_name,
                participant_identity=f"sip-user-{request.phone}",
                participant_name="Phone User",
            )
        )
        
        # The Agent (worker) is already listening for new rooms.
        # It will automatically join 'room_name' when the room is created 
        # (which happens when the SIP participant is created/connected).
        
        return {"message": "Call initiated", "room_name": room_name}
    finally:
        await lk_api.aclose()
