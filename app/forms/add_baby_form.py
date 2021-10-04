from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, DateField
from wtforms.validators import DataRequired, ValidationError
from app.models import Baby
from datetime import date, datetime


def baby_exists(form, field):
    # Checking if user exists
    name = field.data
    baby = Baby.query.filter(Baby.name == name).first()
    if baby:
        raise ValidationError('Baby name already exists')


def valid_age(form, field):
    birthday = field.data
    today = date.today()
    delta = today - birthday
    print(today, '_________________0000000________________', birthday)
    print(today - birthday, '_____________subtract')
    print(delta.days, '____________number?')
    if delta.days > 730:
        raise ValidationError('Thats too old to be a baby a baby has to be less than 3 years old')
    if delta.days < 0:
        raise ValidationError('Thats a future baby :) please add a baby born less between today and the last 3 years')

class  BabyForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), baby_exists])
    birthday = DateField('birthday', validators=[DataRequired(), valid_age])
