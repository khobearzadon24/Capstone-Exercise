from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def no_special_char(form, field):
    specialChars = re.compile('[@_!$%^&*()<>?/\|}{~:]')
    if (specialChars.search(field.data) != None):
        raise ValidationError(f"{field.name.capitalize()} must not contain special characters")


class SignUpForm(FlaskForm):
    firstName = StringField('firstName', validators=[DataRequired(), no_special_char])
    lastName= StringField('lastName', validators=[DataRequired(), no_special_char])
    email = StringField('email', validators=[DataRequired(),Email(),user_exists])
    password = StringField('password', validators=[DataRequired()])
