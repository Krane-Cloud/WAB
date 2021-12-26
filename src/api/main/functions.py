def generateRandomString(size: int = 32) -> str:
    import random
    import string
    chars = string.ascii_uppercase + string.digits + string.ascii_lowercase
    return ''.join(random.choice(chars) for _ in range(size))