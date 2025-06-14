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
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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

    existing_user = db.query(model.User).filter(model.User.username == user.username or model.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, detail="Username or email already exist")
    
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

@app.post("/like")
def set_like(request:schemas.Likes, db:Session=Depends(get_db)):
    existing = db.query(model.AllLikes).filter(model.AllLikes.post_id==request.post_id, model.AllLikes.user_id==request.user_id).first()

    if(existing):
        db.delete(existing)
        db.commit()
        return {"status": "unlike"}
    
    like= model.AllLikes(
        post_id = request.post_id,
        user_id = request.user_id
    )
    db.add(like)
    db.commit()
    db.refresh(like)
    return {"status": "like"}

@app.get("/likes/{userid}")
def get_likes(userid:str, db:Session=Depends(get_db)):
    likes = db.query(model.AllLikes).filter(model.AllLikes.user_id==userid).all()
    return [like.post_id for like in likes]

@app.post("/profile/{username}")
def update_desc(username:str, request:schemas.Desc, db:Session=Depends(get_db)):
    db.query(model.AllDesc).filter(model.AllDesc.username==username).delete(synchronize_session=False)
    desc = model.AllDesc(
        description = request.description,
        username = username
    )
    db.add(desc)
    db.commit()
    db.refresh(desc)
    return "Updated"

@app.get("/profile/{username}")
def get_desc(username:str, db:Session=Depends(get_db)):
    desc = db.query(model.AllDesc).filter(model.AllDesc.username==username).first()
    return desc

@app.post("/image/{username}")
def editDp(username:str, request: schemas.DPimg, db:Session=Depends(get_db)):
    db.query(model.AllDPimg).filter(model.AllDPimg.username==username).delete(synchronize_session=False)

    newimg = model.AllDPimg(
        imgurl = request.imgurl,
        username = request.username
    )
    db.add(newimg)
    db.commit()
    db.refresh(newimg)

    return {"message" : "Image edited successfully"}

@app.get("/image/{username}")
def get_img(username:str, db:Session=Depends(get_db)):
    image = db.query(model.AllDPimg).filter(model.AllDPimg.username==username).first()
    return image
