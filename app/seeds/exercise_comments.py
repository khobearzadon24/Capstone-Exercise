from app.models import db, Exercise_Comment, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_data import exercise_comments

def seed_exercise_comments():
    for exercise_comment in exercise_comments:
        newRes = Exercise_Comment(**exercise_comment)
        db.session.add(newRes)
    db.session.commit()

def undo_exercise_comments():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.exercise_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM exercise_comments"))

    db.session.commit()
