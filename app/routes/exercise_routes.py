from app.models import db, Exercise, Exercise_Comment, User, Type
from app.forms import ExerciseForm,ExerciseCommentForm
from flask import Blueprint, request
from flask_login import login_required
from app.utils.authorization import is_exercise_owner, get_current_user
import json
from types import SimpleNamespace


exercise_routes = Blueprint("exercises", __name__)


# GET ALL EXERCISES at ["/api/exercises"]
@exercise_routes.route("/")
def allExercises():
    exercises = Exercise.query.all()
    return json.dumps({"exercises":[exercise.to_dict() for exercise in exercises]})


# GET ALL EXERCISE TYPES at ["api/exerices/types"]
@exercise_routes.route("/types")
def allExerciseTypes():
    types = Type.query.all()
    return json.dumps({"types": [type.to_dict() for type in types]})


#CREATE A NEW EXERCISE at ["/api/exercise"]
@exercise_routes.route("/", methods=["POST"])
@login_required
def newExercise():
    form = ExerciseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newExercise = Exercise(
            name=form.data['name'],
            description=form.data['description'],
            type=form.data['typeId'],
            imgUrl=form.data['imgUrl'],
            userId=get_current_user()
        )
        db.session.add(newExercise)
        db.session.commit()
        return json.dumps(newExercise.to_dict()), 201
    return {'message': 'Bad Request', 'errors': form.errors}, 400


#GET ALL EXERCISES BY CURRENT USER at ["/api/exercises/current"]
@exercise_routes.route("/current")
@login_required
def allCurrentUserExercises():
    id = get_current_user()
    allUserExercises = Exercise.query.filter_by(userId=id).all()
    return json.dumps({"exercises": [exercise.to_dict() for exercise in allUserExercises]})

#GET EXERCISE DETAILS BY ID at ["/api/exercises/:id"]
@exercise_routes.route("/<int:id>")
def getExerciseById(id):
    exercise = Exercise.query.get(id)

    if not exercise:
        return json.dumps({
            "message": "Exercise couldn't be found"
        }), 404

    exercise_comments = [exercise_comment.to_dict() for exercise_comment in exercise.exercise_comments]

    exercise_formatted = {
        "id": exercise.id,
        "userId": exercise.userId,
        "description": exercise.description,
        "imgUrl": exercise.imgUrl,
        "name": exercise.name,
        "type": exercise.typeId,
        "Exercise_comments": exercise_comments,
    }
    return json.dumps(exercise_formatted)

#EDIT/UPDATE A EXERCISE at ["/api/exercise/:id"]
@exercise_routes.route("/<int:exerciseId>", methods=["PUT"])
@login_required
@is_exercise_owner
def updateExercise(exerciseId):
    exercise = Exercise.query.get(exerciseId)

    if not exercise:
        return json.dumps({
            "message": "Exercise couldn't be found"
        }), 404
    data = json.loads(request.data, object_hook=lambda d: SimpleNamespace(**d)) # convert JSON to Object so form can key in using .
    form = ExerciseForm(obj=data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(exercise)
        db.session.add(exercise)
        db.session.commit()
        return json.dumps(exercise.to_dict())
    return {'message': 'Bad Request', 'errors': form.errors}, 400


#DELETE AN EXERCISE at ["/api/exercises/id"]
@exercise_routes.route("/<int:exerciseId>", methods=["DELETE"])
@login_required
@is_exercise_owner
def deleteExercise(exerciseId):
    exercise = Exercise.query.get(exerciseId)
    if not exercise:
        return json.dumps({
            "message": "Exercise couldn't be found"
        }), 404

    db.session.delete(exercise)
    db.session.commit()
    return json.dumps({
        "message": "Successfully deleted"
    })

# CREATE AN EXERCISE_COMMENT FOR A EXERCISE BASED ON ID
@exercise_routes.route('/<int:exerciseId>/exercise-comments', methods=["POST"])
@login_required
def createExerciseComment(exerciseId):
    exercise = Exercise.query.get(exerciseId)
    if not exercise:
        return json.dumps({
            "message": "Exercise couldn't be found"
        }), 404

    form = ExerciseCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newReview = Exercise_Comment(
            description=form.data['description'],
            userId=get_current_user(),
            exerciseId=exerciseId
        )
        db.session.add(newReview)
        db.session.commit()
        responseObj = {
            "id": newReview.id,
            "user_id": newReview.userId,
            "exerciseId": newReview.exerciseId,
            "description": newReview.description,
            "createdAt": str(newReview.createdAt)
        }
        return json.dumps(responseObj), 201
    return {'message': 'Bad Request', 'errors': form.errors}, 400


# GET  EXERCISE COMMENTS
@exercise_routes.route('/<int:exerciseId>/exercise-comments', methods=["GET"])
def getExerciseComments(exerciseId):
    exercise_comments = Exercise_Comment.query.filter_by(exerciseId=exerciseId).all()
    reviewResponse = [exercise_comment.to_dict() for exercise_comment in exercise_comments]

    return json.dumps(reviewResponse)
