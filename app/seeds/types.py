from app.models import db, Type, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_data import types

def seed_types():
    for type in types:
        newRes = Type(**type)
        db.session.add(newRes)
    db.session.commit()

def undo_types():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.types RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM types"))

    db.session.commit()
