from flask import Blueprint, Flask, request
from app.models import db, Exercise_Comment, User
from flask_login import login_required
from app.utils import is_exercise_comment_owner, get_current_user
from app.forms import ExerciseCommentForm
import json
from types import SimpleNamespace

exercise_comment_routes = Blueprint("exercise-comments", __name__)

# DELETE AN EXERCISE COMMENT
@exercise_comment_routes.route('/<int:exerciseCommentId>', methods=["DELETE"])
@login_required
@is_exercise_comment_owner
def deleteExerciseComment(exerciseCommentId):
    comment = Exercise_Comment.query.get(exerciseCommentId)

    if not comment:
        return json.dumps({
            "message": "Exercise Comment couldn't be found"
        }), 404

    db.session.delete(comment)
    db.session.commit()
    return json.dumps({
        "message": "Successfully deleted"
    })

# get all owner comments
@exercise_comment_routes.route("/current")
@login_required
def getAllExerciseCommentsByCurrentOwner():
    comments = Exercise_Comment.query.filter_by(userId=get_current_user()).all()
    return json.dumps([comment.to_dict() for comment in comments])

# GET EXERCISE COMMENTS BY ID ["/api/exericse-comments/:id"]
@exercise_comment_routes.route("/<int:id>")
@login_required
def getExerciseCommentById(id):
    exercise_comment = Exercise_Comment.query.get(id)
    user = User.query.get(exercise_comment.userId)

    if not exercise_comment:
        return json.dumps({
            "message": "Exercise Comment does not exist."
        }), 404

    exercise_comment_formatted ={
        'id': exercise_comment.id,
        'userId': exercise_comment.userId,
        "firstName": user.firstName,
        "lastName": user.lastName,
        'exerciseId': exercise_comment.exerciseId,
        'description': exercise_comment.description,
        'createdAt': str(exercise_comment.createdAt)
    }

    return json.dumps(exercise_comment_formatted)

# EDIT EXERCISE COMMENT BY ID ["/api/exericse-comments/:id"]
@exercise_comment_routes.route("/<int:exerciseCommentId>", methods =["PUT"])
@login_required
@is_exercise_comment_owner
def updateExerciseComment(exerciseCommentId):
    exercise_comment = Exercise_Comment.query.get(exerciseCommentId)

    if not exercise_comment:
        return json.dumps({
            "message": "Exercise Comment couldn't be found"
        }), 404

    data = json.loads(request.data, object_hook=lambda d: SimpleNamespace(**d))
    #convert JSON to Object so form can key in using
    form = ExerciseCommentForm(obj=data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(exercise_comment)
        db.session.add(exercise_comment)
        db.session.commit()
        return json.dumps(exercise_comment.to_dict())
    return {'message': 'Bad Request', 'errors': form.errors}, 400
