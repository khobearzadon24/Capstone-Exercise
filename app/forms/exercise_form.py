from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.routes.aws_helper import ALLOWED_EXTENSIONS
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models.exercise import exerciseTypes
import re

def valid_type(form, field):
    if field.data not in exerciseTypes:
        raise ValidationError("Invalid Type")

def no_special_char(form, field):
    specialChars = re.compile('[@_!$%^&*()<>?/\|}{~:]')
    if (specialChars.search(field.data) != None):
        raise ValidationError(f"{field.name.capitalize()} must not contain special characters")

class ExerciseForm(FlaskForm):
    name = StringField('name', validators=[DataRequired("Name is required"), no_special_char])
    description = StringField('description', validators=[DataRequired("Description is required"), no_special_char])
    type = StringField('type', validators=[DataRequired("Type is required"), ])
    imgUrl = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
