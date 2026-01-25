import redis.asyncio as redis
import json
import time
import uuid
from config import settings

class RedisClient:
    def __init__(self):
        self.client = None

    async def connect(self):
        if not self.client:
            self.client = redis.from_url(settings.redis_url)

    async def create_conversation(self, user_id: str, metadata: dict = None):
        if not self.client:
            await self.connect()
        
        conv_id = str(uuid.uuid4())
        key = f"conversation:{conv_id}"
        
        data = {
            "id": conv_id,
            "user_id": user_id,
            "created_at": time.time(),
            "metadata": json.dumps(metadata or {})
        }
        
        await self.client.hset(key, mapping=data)
        return conv_id

    async def add_message(self, conv_id: str, role: str, content: str):
        if not self.client:
            await self.connect()
            
        key = f"conversation:{conv_id}:messages"
        message = {
            "role": role,
            "content": content,
            "timestamp": time.time()
        }
        
        await self.client.rpush(key, json.dumps(message))

redis_client = RedisClient()
