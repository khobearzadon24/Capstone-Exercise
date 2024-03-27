from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_data import posts

def seed_posts():
    for post in posts:
        newRes = Post(**post)
        db.session.add(newRes)
    db.session.commit()

def undo_posts():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
