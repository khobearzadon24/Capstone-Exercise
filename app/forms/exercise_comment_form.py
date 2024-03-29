from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ExerciseCommentForm(FlaskForm):
    description = StringField('description', validators=[DataRequired("Description is required")])
