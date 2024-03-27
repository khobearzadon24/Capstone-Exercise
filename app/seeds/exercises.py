from app.models import db, Exercise, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_data import exercises

def seed_exercises():
    for exercise in exercises:
        newRes = Exercise(**exercise)
        db.session.add(newRes)
    db.session.commit()

def undo_exercises():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.exercises RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM exercises"))

    db.session.commit()
