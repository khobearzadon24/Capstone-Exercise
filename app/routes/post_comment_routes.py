from flask import Blueprint, Flask, request
from app.models import db, Post_Comment, User
from flask_login import login_required
from app.utils.authorization import is_post_comment_owner, get_current_user
import json
from app.forms import PostCommentForm
from types import SimpleNamespace

post_comment_routes = Blueprint("post-comments", __name__)

# DELETE A POST COMMENT
@post_comment_routes.route('/<int:postCommentId>', methods=["DELETE"])
@login_required
@is_post_comment_owner
def deletePostComment(postCommentId):
    comment = Post_Comment.query.get(postCommentId)

    if not comment:
        return json.dumps({
            "message": "Post Comment couldn't be found"
        }), 404

    db.session.delete(comment)
    db.session.commit()
    return json.dumps({
        "message": "Successfully deleted"
    })

@post_comment_routes.route("/current")
@login_required
def getAllPostCommentsByCurrentOwner():
    comments = Post_Comment.query.filter_by(userId=get_current_user()).all()
    return json.dumps([comment.to_dict() for comment in comments])


#GET EXERCISE COMMENTS BY ID ["/api/post-comments/:id"]
@post_comment_routes.route("/<int:id>")
@login_required
def getPostCommentById(id):
    post_comment = Post_Comment.query.get(id)
    user = User.query.get(post_comment.userId)

    if not post_comment:
        return json.dumps({
            "message": "Post Comment does not exist."
        }), 404

    post_comment_formatted = {
        'id': post_comment.id,
        'userId': post_comment.userId,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'postId': post_comment.postId,
        'description': post_comment.description,
        'createdAt': post_comment.createdAt
    }

    return json.dumps(post_comment_formatted)

#EDIT POST COMMENT BY ID ["/api/post-comments:id"]
@post_comment_routes.route("/<int:postCommentId>", methods=["PUT"])
@login_required
@is_post_comment_owner
def updatePostComment(postCommentId):
    post_comment = Post_Comment.query.get(postCommentId)

    if not post_comment:
        return json.dumps({
            "message": "Post Comment couldn't be found"
        }), 404

    data = json.loads(request.data, object_hook = lambda d: SimpleNamespace(**d))
    #convert JSON to object so form can key in using
    form = PostCommentForm(obj=data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(post_comment)
        db.session.add(post_comment)
        db.session.commit()
        return json.dumps(post_comment.to_dict())
    return {'message': 'Bad Request', 'errors': form.errors}, 400
