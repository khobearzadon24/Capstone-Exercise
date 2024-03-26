from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.orm import validates
from sqlalchemy import CheckConstraint
import datetime as dt


class Exercise_Comment(db.Model):
    __tablename__ = "exercise_comments"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
