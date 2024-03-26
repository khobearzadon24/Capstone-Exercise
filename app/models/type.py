from .db import db, SCHEMA, add_prefix_for_prod, environment
import datetime as dt

class Type(db.Model):
    __tablename__ = "types"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    imgUrl = db.Column(db.String)
    createdAt = db.Column(db.Date, default=dt.datetime.now())
    updatedAt = db.Column(db.Date, default=dt.datetime.now())

    exercises = db.relationship("Exercise", back_populates="type", cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            "name": self.name,
            'imgUrl': self.imgUrl
        }
