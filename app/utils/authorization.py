from flask_login import current_user
from functools import wraps
from app.models import db, Exercise, Exercise_Comment, Post, Post_Comment, Type
import json

# Get current user
def get_current_user():
    if current_user.is_authenticated:
        return current_user.id
    return {'errors': {'message': 'Unauthorized'}}, 401

# Exercise must belong to current user
def is_exercise_owner(f):
    @wraps(f)
    def exercise_authorization(exerciseId):
        userId = get_current_user()
        exercise = Exercise.query.get(exerciseId)
        if userId != exercise.userId:
            return json.dumps({"message": "Forbidden"}), 403
        return f(exerciseId)
    return exercise_authorization

# Exercise Comment must belong to current user
def is_exercise_comment_owner(f):
    @wraps(f)
    def exercise_comment_authorization(exerciseCommentId):
        userId = get_current_user()
        exerciseComment = Exercise_Comment.query.get(exerciseCommentId)
        if userId != exerciseComment.userId:
            return json.dumps({"message": "Forbidden"}), 403
        return f(exerciseCommentId)
    return exercise_comment_authorization

# Post must belong to current user
def is_post_owner(f):
    @wraps(f)
    def post_authorization(postId):
        userId = get_current_user()
        post = Post.query.get(postId)
        if userId != post.userId:
            return json.dumps({"message": "Forbidden"}), 403
        return f(postId)
    return post_authorization

# Post Comment must belong to current user
def is_post_comment_owner(f):
    @wraps(f)
    def post_comment_authorization(postCommentId):
        userId = get_current_user()
        postComment = Post_Comment.query.get(postCommentId)
        if userId != postComment.userId:
            return json.dumps({"message": "Forbidden"}), 403
        return f(postCommentId)
    return post_comment_authorization
