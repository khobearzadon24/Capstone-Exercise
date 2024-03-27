from app.models import db, Post_Comment, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_data import post_comments

def seed_post_comments():
    for post_comment in post_comments:
        newRes = Post_Comment(**post_comment)
        db.session.add(newRes)
    db.session.commit()

def undo_post_comments():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM post_comments"))

    db.session.commit()
