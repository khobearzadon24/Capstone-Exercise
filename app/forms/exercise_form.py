from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
import re

def no_special_char(form, field):
    specialChars = re.compile('[@_!$%^&*()<>?/\|}{~:]')
    if (specialChars.search(field.data) != None):
        raise ValidationError(f"{field.name.capitalize()} must not contain special characters")

class ExerciseForm(FlaskForm):
    name = StringField('name', validators=[DataRequired("Name is required"), no_special_char])
    description = StringField('description', validators=[DataRequired("Description is required"), no_special_char])
    type = StringField('type', validators=[DataRequired("Type is required"), ])
    imageUrl = StringField('imageUrl',validators=[DataRequired("Image is required"),])