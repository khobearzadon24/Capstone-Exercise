from app.models import db, Post, Post_Comment, User
from app.forms.post_form import PostForm
from app.forms.post_comment_form import PostCommentForm
from flask import Blueprint, request
from flask_login import login_required
from app.utils.authorization import is_post_owner, get_current_user
import json
from types import SimpleNamespace


post_routes = Blueprint("posts", __name__)


# GET ALL POSTS at ["/api/posts"]
@post_routes.route("/")
def allPosts():
    posts = Post.query.all()
    return json.dumps({"posts":[post.to_dict() for post in posts]})


#CREATE A NEW POST at ["/api/posts"]
@post_routes.route("/", methods=["POST"])
@login_required
def newPost():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newPost = Post(
            name=form.data['name'],
            description=form.data['description'],
            userId=get_current_user()
        )
        db.session.add(newPost)
        db.session.commit()
        return json.dumps(newPost.to_dict()), 201
    return {'message': 'Bad Request', 'errors': form.errors}, 400


#GET ALL POSTS BY CURRENT USER at ["/api/posts/current"]
@post_routes.route("/current")
@login_required
def allCurrentUserPosts():
    id = get_current_user()
    allUserPosts = Post.query.filter_by(userId=id).all()
    return json.dumps({"posts": [post.to_dict() for post in allUserPosts]})

#GET POST DETAILS BY ID at ["/api/posts/:id"]
@post_routes.route("/<int:id>")
def getPostById(id):
    post = Post.query.get(id)

    if not post:
        return json.dumps({
            "message": "Post couldn't be found"
        }), 404

    post_comments = [post_comment.to_dict() for post_comment in post.post_comments]

    post_formatted = {
        "id": post.id,
        "userId": post.userId,
        "description": post.description,
        "name": post.name,
        "Post_comments": post_comments,
    }
    return json.dumps(post_formatted)

#DELETE A POST at ["/api/posts/id"]
@post_routes.route("/<int:postId>", methods=["DELETE"])
@login_required
@is_post_owner
def deletePost(postId):
    post = Post.query.get(postId)
    if not post:
        return json.dumps({
            "message": "Post couldn't be found"
        }), 404

    db.session.delete(post)
    db.session.commit()
    return json.dumps({
        "message": "Successfully deleted"
    })

# CREATE A POST_COMMENT FOR A POST BASED ON ID
@post_routes.route('/<int:postId>/post-comments', methods=["POST"])
@login_required
def createPostComment(post_id):
    post = Post.query.get(post_id)
    if not post:
        return json.dumps({
            "message": "Post couldn't be found"
        }), 404

    form = PostCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newPostComment = Post_Comment(
            description=form.data['description'],
            userId=get_current_user(),
            postId=post_id
        )
        db.session.add(newPostComment)
        db.session.commit()
        responseObj = {
            "id": newPostComment.id,
            "user_id": newPostComment.userId,
            "postId": newPostComment.postId,
            "description": newPostComment.description,
            "createdAt": str(newPostComment.createdAt)
        }
        return json.dumps(responseObj), 201
    return {'message': 'Bad Request', 'errors': form.errors}, 400


# GET  POST COMMENTS
@post_routes.route('/<int:postId>/post-comments', methods=["GET"])
def getPostComments(postId):
    post_comments = Post_Comment.query.filter_by(postId=postId).all()
    reviewResponse = [post_comment.to_dict() for post_comment in post_comments]

    return json.dumps(reviewResponse)
