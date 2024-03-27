from flask import Blueprint, Flask, request
from app.models import db, Post_Comment
from flask_login import login_required
from app.utils.authorization import is_post_comment_owner, get_current_user
import json

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
