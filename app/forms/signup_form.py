from wtforms import validators
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


# def passord_and_confirm_password_match(form, field):
#     # print(form.data, 'test______this')
#     password = form.data['password']
#     confirm = form.data['confirm']
#     print('test_____',form.data, '_____________validator')

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
    password = StringField('password', validators=[ DataRequired()])
    # confirm = StringField('confirm', validators=[DataRequired()])
