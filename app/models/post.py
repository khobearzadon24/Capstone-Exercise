from .db import db, SCHEMA, environment, add_prefix_for_prod
import datetime as dt

class Post(db.Model):
    __tablename__='posts'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description=db.Column(db.Text, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    createdAt = db.Column(db.Date, default=dt.datetime.now())
    updatedAt = db.Column(db.Date, default=dt.datetime.now())

    post_comments = db.relationship("Post_Comment", back_populates="post", cascade='all, delete-orphan')

    user = db.relationship("User", back_populates = "post")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'firstName': self.user.firstName,
            'lastName': self.user.lastName,
            'description': self.description,
            'userId': self.userId,
            'createdAt': str(self.createdAt),
            'post_comments': [post_comment.to_dict() for post_comment in self.post_comments],
        }
