from livekit.agents import llm
from typing import Annotated
import logging

logger = logging.getLogger("booking-tools")

@llm.function_tool(description="Book a meeting with the user")
def book_meeting(
    time: str
):
    """Book a meeting with the user
    
    Args:
        time: The time to book the meeting for
    """
    logger.info(f"Booking meeting for {time}")
    # In a real app, this would integrate with a calendar API
    return f"Meeting booked for {time}"
