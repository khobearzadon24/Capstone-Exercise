from app.models import db, Exercise, Exercise_Comment, User
from app.models.exercise import exerciseTypes
from app.forms import ExerciseForm,ExerciseCommentForm
from flask import Blueprint, request
from flask_login import login_required
from app.routes.aws_helper import upload_file_to_s3, get_unique_filename
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
    return json.dumps(exerciseTypes)


#CREATE A NEW EXERCISE at ["/api/exercise"]
@exercise_routes.route("/", methods=["POST"])
@login_required
def newExercise():
    form = ExerciseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        imgUrl = form.imgUrl.data
        url = None

        if imgUrl:
            imgUrl.filename = get_unique_filename(imgUrl.filename)
            upload = upload_file_to_s3(imgUrl)
            if "url" not in upload:
                return {"exercise_image": "Failed to upload image, try again."}, 500
            url = upload["url"]

        newExercise = Exercise(
            name=form.data['name'],
            description=form.data['description'],
            type=form.data['type'],
            userId=get_current_user(),
            imgUrl = url
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
    user = User.query.get(exercise.userId)
    # print(user, 'here is your user')
    if not exercise:
        return json.dumps({
            "message": "Exercise couldn't be found"
        }), 404

    exercise_comments = [exercise_comment.to_dict() for exercise_comment in exercise.exercise_comments]

    exercise_formatted = {
        "id": exercise.id,
        "userId": exercise.userId,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "description": exercise.description,
        "imgUrl": exercise.imgUrl,
        "name": exercise.name,
        "type": exercise.type,
        "Exercise_comments": exercise_comments,
    }
    return json.dumps(exercise_formatted)

#EDIT/UPDATE A EXERCISE at ["/api/exercise/:id"]
@exercise_routes.route("/<int:exerciseId>", methods=["PUT"])
@login_required
@is_exercise_owner
def updateExercise(exerciseId):
    form = ExerciseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        exercise = Exercise.query.get(id)
        imgUrl = form.imgUrl.data
        url= None

        if not exercise:
            return {"error": "Exercise could not be found"}, 404

        if imgUrl:
            imgUrl.filename = get_unique_filename(imgUrl.filename)
            upload = upload_file_to_s3(imgUrl)
            if "url" not in upload:
                return {"exercise_image": "Failed to upload image, try again."}, 500
            url = upload["url"]

        exercise.name = form.name.data
        exercise.description = form.description.data
        exercise.type = form.type.data
        exercise.imgUrl = url

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
    user = User.query.get(exercise_comments.userId)
    reviewResponse = [exercise_comment.to_dict() for exercise_comment in exercise_comments]

    exercise_comment_formatted ={
        'id': exercise_comments.id,
        'userId': exercise_comments.userId,
        "firstName": user.firstName,
        "lastName": user.lastName,
        'exerciseId': exercise_comments.exerciseId,
        'description': exercise_comments.description,
        'createdAt': str(exercise_comments.createdAt)
    }

    return json.dumps(exercise_comment_formatted)
