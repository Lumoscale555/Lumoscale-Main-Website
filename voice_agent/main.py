import asyncio
import logging
import json
import time
import uuid
from livekit import rtc
from livekit.agents import AutoSubscribe, JobContext, WorkerOptions, cli, llm
from livekit.agents.voice import Agent, AgentSession, UserInputTranscribedEvent, ConversationItemAddedEvent
from livekit.plugins import deepgram, cartesia, openai, silero
from config import settings
from prompt_manager import prompt_manager
from database.redis_client import redis_client
from tools import book_meeting

logger = logging.getLogger("voice-agent")
logger.setLevel(logging.INFO)

class HospitalVoiceAgent:
    def __init__(self):
        self.prompt_manager = prompt_manager
        
    def create_agent(self) -> Agent:
        system_prompt = self.prompt_manager.get_system_prompt()
        agent = Agent(
            instructions=system_prompt,
            vad=silero.VAD.load(),
            stt=deepgram.STT(api_key=settings.deepgram_api_key),
            llm=openai.LLM(api_key=settings.openai_api_key, model="gpt-4o-mini"),
            tts=cartesia.TTS(api_key=settings.cartesia_api_key, voice=settings.cartesia_voice_id),
            tools=[book_meeting],
        )
        return agent

async def entrypoint(ctx: JobContext):
    await redis_client.connect()
    room = ctx.room
    
    print(f"Waiting for participant in room {room.name}...")
    session = AgentSession()
    conv_id = None
    
    async def log_message(role: str, content: str):
        if conv_id and content:
            await redis_client.add_message(conv_id=conv_id, role=role, content=content)
            logger.info(f"{role.capitalize()}: {content}")
            
            # Broadcast to frontend for transcripts
            try:
                # Construct a chat message payload compatible with LiveKit frontend components
                # standard topic for livekit chat is "lk-chat-topic" (if using standard components)
                # payload is JSON
                msg = {
                    "id": str(uuid.uuid4()),
                    "timestamp": int(time.time() * 1000),
                    "message": content,
                }
                # For basic useChat, we often need to wrap it or just send raw text?
                # Actually standard components expect a specific JSON structure if using Data packet.
                # Let's try sending just the text if that's what custom implementation expects, 
                # but useChat expects: { message: str, timestamp: number }
                
                # We will use a custom topic 'transcription' to be safe and handle it manually in frontend 
                # OR stick to 'lk-chat-topic' if we know the schema. 
                # Let's use 'transcription' and handle it with useDataChannel or similar if useChat is tricky.
                # BUT user asked for "words spoken by me and agent".
                # Let's send a JSON with role.
                
                payload = json.dumps({
                    "role": role,
                    "content": content,
                    "timestamp": int(time.time() * 1000)
                })
                
                await ctx.room.local_participant.publish_data(
                    payload.encode('utf-8'),
                    topic="transcription",
                    reliable=True
                )
            except Exception as e:
                logger.error(f"Failed to publish transcript: {e}")

    @session.on(UserInputTranscribedEvent)
    def on_user_speech(event: UserInputTranscribedEvent):
        if event.user_input:
            asyncio.create_task(log_message("user", event.user_input))
    
    @session.on(ConversationItemAddedEvent)
    def on_agent_speech(event: ConversationItemAddedEvent):
        if event.item.role == "assistant" and event.item.content:
            asyncio.create_task(log_message("assistant", event.item.content))

    hospital_agent = HospitalVoiceAgent()
    agent = hospital_agent.create_agent()
    
    await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)
    participant = await ctx.wait_for_participant()
    logger.info(f"Starting voice assistant for: {participant.identity}")

    conv_id = await redis_client.create_conversation(user_id=participant.identity, metadata={"room_name": room.name})
    await session.start(agent, room=room)
    await session.say(prompt_manager.initial_greeting, allow_interruptions=True)
    logger.info("Voice assistant started and greeting sent")

def run_agent():
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, api_key=settings.livekit_api_key, api_secret=settings.livekit_api_secret, ws_url=settings.livekit_url))

if __name__ == "__main__":
    run_agent()
