import google.generativeai as genai
import os
import logging
import json
from datetime import datetime

# Configure logging
log_directory = os.getenv("LOG_DIR", "logs")
os.makedirs(log_directory, exist_ok=True)
log_file = os.path.join(
    log_directory, f"llm_calls_{datetime.now().strftime('%Y%m%d')}.log"
)

# Set up logger
logger = logging.getLogger("llm_logger")
logger.setLevel(logging.INFO)
logger.propagate = False  # Prevent propagation to root logger
file_handler = logging.FileHandler(log_file, encoding='utf-8')
file_handler.setFormatter(
    logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
)
logger.addHandler(file_handler)

# Simple cache configuration
cache_file = "llm_cache.json"


# By default, we Google Gemini 2.5 pro, as it shows great performance for code understanding
def call_llm(prompt: str, use_cache: bool = True) -> str:
    """
    Calls the Google Gemini API with a given prompt and returns the response.
    Caches responses to a local file to avoid repeated API calls.
    """
    logger.info(f"PROMPT: {prompt}")

    # Load cache from disk
    cache = {}
    if use_cache and os.path.exists(cache_file):
        try:
            with open(cache_file, "r", encoding="utf-8") as f:
                cache = json.load(f)
        except (IOError, json.JSONDecodeError) as e:
            logger.warning(f"Failed to load cache: {e}. Starting with empty cache.")
            cache = {}

    # Return from cache if exists
    if use_cache and prompt in cache:
        logger.info(f"RESPONSE (from cache): {cache[prompt]}")
        return cache[prompt]

    # Configure and call the API
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            logger.error("GEMINI_API_KEY environment variable not set.")
            raise ValueError("GEMINI_API_KEY environment variable not set.")
        
        genai.configure(api_key=api_key)

        model_name = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
        model = genai.GenerativeModel(model_name)

        response = model.generate_content(prompt)
        # Handle cases where the response might be blocked
        if not response.parts:
            error_message = "LLM response was empty or blocked."
            logger.error(error_message)
            return f"Error: {error_message}"
        response_text = response.text

    except Exception as e:
        logger.error(f"Error calling LLM API: {e}")
        # Return a descriptive error message
        return f"Error: Could not get response from LLM. Details: {e}"

    # Log the response
    logger.info(f"RESPONSE (from API): {response_text}")

    # Update cache if enabled
    if use_cache:
        cache[prompt] = response_text
        try:
            with open(cache_file, "w", encoding="utf-8") as f:
                json.dump(cache, f, indent=2)
        except IOError as e:
            logger.error(f"Failed to save cache: {e}")

    return response_text


if __name__ == "__main__":
    test_prompt = "Hello, how are you?"

    # First call - should hit the API and cache the result
    print("--- First call (should use API) ---")
    response1 = call_llm(test_prompt, use_cache=True)
    print(f"Response 1: {response1}\n")

    # Second call - should use the cache
    print("--- Second call (should use cache) ---")
    response2 = call_llm(test_prompt, use_cache=True)
    print(f"Response 2: {response2}\n")

    # Call with cache disabled
    print("--- Third call (cache disabled) ---")
    response3 = call_llm(test_prompt, use_cache=False)
    print(f"Response 3: {response3}")