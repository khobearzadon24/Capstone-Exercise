from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class ExerciseCommentForm(FlaskForm):
    description = StringField('description', validators=[DataRequired("Description is required"),Length(min=1), Length(max=100)])
