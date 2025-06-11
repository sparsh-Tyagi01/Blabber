from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from . import auth, model, schemas
from .database import engine, SessionLocal
from sqlalchemy.orm import Session
from .hashing import Hash


model.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://blabber-chi.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_password = Hash.bcrypt(user.password)

    existing_user = db.query(model.User).filter(model.User.username == user.username | model.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, detail="Username already exist")
    
    new_user = model.User(
        name = user.name,
        username = user.username,
        email = user.email,
        password = hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return "successfully register"

@app.post("/login")
def login(user:schemas.UserLogin, db:Session=Depends(get_db)):
    db_user = db.query(model.User).filter(model.User.username == user.username).first()
    if not db_user or not Hash.verify(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    token = auth.create_access_token(data={"username": db_user.username, "name":db_user.name})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/protected")
async def protected_route(current_user: schemas.TokenData = Depends(auth.get_current_user)):
    return {"message": f"Hello! {current_user.username}",
            "username": {current_user.username},
            "name": {current_user.name}}


@app.post("/posts")
def post_posts(request:schemas.Posts, db:Session=Depends(get_db)):
    new_post = model.AllPosts(
        description = request.description,
        username = request.username,
        image = request.image,
        category = request.category
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return "post Created"

@app.get("/posts")
def get_posts(db:Session=Depends(get_db)):
    post = db.query(model.AllPosts).order_by(model.AllPosts.id.desc()).all()
    return post

@app.post("/profile")
def update_desc(request:schemas.Desc, db:Session=Depends(get_db)):
    #db.query(model.AllDesc).filter(model.AllDesc.username==request.username).delete(synchronize_session=False)
    desc = model.AllDesc(
        description = request.description,
        username = request.username
    )
    db.add(desc)
    db.commit()
    db.refresh(desc)
    return "Updated"

@app.get("/profile")
def get_desc(db:Session=Depends(get_db)):
    new_desc = db.query(model.AllDesc).all()
    return new_desc