from sqlalchemy import Column,Integer,String
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)


class AllPosts(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    username = Column(String)
    image = Column(String)
    category = Column(String)

class AllLikes(Base):
    __tablename__ = "likes"
    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(String)
    user_id = Column(String)

class AllDesc(Base):
    __tablename__ = "Users_desc"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    username = Column(String)