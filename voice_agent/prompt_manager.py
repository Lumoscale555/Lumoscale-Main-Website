import yaml
import os

class PromptManager:
    def __init__(self, prompt_path="prompts.yaml"):
        # Get absolute path relative to this file
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.prompt_path = os.path.join(base_dir, prompt_path)
        self.prompts = self._load_prompts()

    def _load_prompts(self):
        try:
            with open(self.prompt_path, 'r') as f:
                return yaml.safe_load(f)
        except Exception as e:
            print(f"Error loading prompts: {e}")
            return {}

    def get_system_prompt(self):
        return self.prompts.get('system_prompt', "You are a helpful assistant.")

    @property
    def initial_greeting(self):
        return self.prompts.get('initial_greeting', "Hello, how can I help you?")

prompt_manager = PromptManager()
