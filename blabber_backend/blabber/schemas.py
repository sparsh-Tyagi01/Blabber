from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Posts(BaseModel):
    description: str
    username: str
    image: str
    category: str

class Likes(BaseModel):
    post_id: str
    user_id: int

class Desc(BaseModel):
    description: str
    username: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
    name: str