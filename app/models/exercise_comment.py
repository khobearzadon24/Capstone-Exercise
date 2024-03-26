from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.orm import validates
from sqlalchemy import CheckConstraint
import datetime as dt


class Exercise_Comment(db.Model):
    __tablename__ = "exercise_comments"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id=db.Column(db.Integer, primary_key=True)
    userId=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    exerciseId=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("exercises.id"), ondelete="CASCADE"))
    description=db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.Date, default=dt.datetime.now())
    updatedAt = db.Column(db.Date, default=dt.datetime.now())

    exercise = db.relationship("Exercise", back_populates = "exercise_comments")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'exerciseId': self.exerciseId,
            'description': self.description,
            'createdAt': str(self.createdAt)
        }
