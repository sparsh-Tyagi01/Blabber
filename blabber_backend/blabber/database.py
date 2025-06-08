from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

URL_DATABASE = "postgresql://blabber_user:aYpg1ZMgseMhHyMqRJivXvwNp0Li4Lp6@dpg-d12s6t3ipnbc73bbal70-a.oregon-postgres.render.com/blabber"

engine = create_engine(URL_DATABASE)

Base = declarative_base()
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit =False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()