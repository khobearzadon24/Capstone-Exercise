from .db import db, SCHEMA, environment, add_prefix_for_prod
import datetime as dt

class Exercise(db.Model):
    __tablename__ = 'exercises'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    description=db.Column(db.Text, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    imgUrl = db.Column(db.String, nullable=False)
    typeId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("types.id")), nullable=False)
    createdAt = db.Column(db.Date, default=dt.datetime.now())
    updatedAt = db.Column(db.Date, default=dt.datetime.now())

    exercise_comments = db.relationship("Exercise_Comment", back_populates="exercise", cascade = 'all, delete-orphan')
    type = db.relationship("Type", back_populates="exercises")


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "userId": self.userId,
            "imgUrl": self.imgUrl,
            "typeId": self.typeId,
            "exercise_comments": [exercise_comment.to_dict() for exercise_comment in self.exercise_comments],
        }
