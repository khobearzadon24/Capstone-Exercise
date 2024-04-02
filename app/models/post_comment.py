from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.orm import validates
from sqlalchemy import CheckConstraint
import datetime as dt


class Post_Comment(db.Model):
    __tablename__ = "post_comments"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id=db.Column(db.Integer, primary_key=True)
    userId=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    postId=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id"), ondelete="CASCADE"))
    description=db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.Date, default=dt.datetime.now())
    updatedAt = db.Column(db.Date, default=dt.datetime.now())

    post = db.relationship("Post", back_populates = "post_comments")

    user = db.relationship("User", back_populates = "post_comments")

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.user.firstName,
            'lastName': self.user.lastName,
            'userId': self.userId,
            'postId': self.postId,
            'description': self.description,
            'createdAt': str(self.createdAt)
        }
