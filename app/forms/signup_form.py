from wtforms import validators
from app.forms.login_form import password_matches
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def passord_and_confirm_password_match(form, field):
    password = field.data
    confirm_password = field.data
    if password != confirm_password:
        raise ValidationError('Passwords must match!')

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = PasswordField('password', validators=[passord_and_confirm_password_match, validators.EqualTo(
        'confirm_password', message='Passwords must match'), DataRequired()])
    confirm_password = PasswordField('confirm_password', validators=[DataRequired()])
