from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, DateTimeField
from wtforms import validators
from wtforms.validators import DataRequired, ValidationError


class DiaperForm(FlaskForm):
    type = StringField('type')
    change_time = DateTimeField('change_time')
    user_id = IntegerField('user_id')
    baby_id = IntegerField('baby_id')