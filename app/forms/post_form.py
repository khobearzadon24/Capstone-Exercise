from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
import re


def no_special_char(form, field):
    specialChars = re.compile('[@_!$%^&*()<>?/\|}{~:]')
    if (specialChars.search(field.data) != None):
        raise ValidationError(f"{field.name.capitalize()} must not contain special characters")

class PostForm(FlaskForm):
    name = StringField('name', validators=[DataRequired("Name is required"), no_special_char])
    description = StringField('description', validators=[DataRequired("Description is required")])
