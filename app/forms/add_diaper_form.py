from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, DateTimeField
from wtforms import validators
from wtforms.validators import DataRequired, ValidationError

# def only_pee_or_poo(form, field):
#     type = field.data
#     if(type != 'pee' or type != 'poo'):
#         raise ValidationError('Type must be pee or poo')

class DiaperForm(FlaskForm):
    type = StringField('type')
    change_time = StringField('change_time')
    user_id = IntegerField('user_id')
    baby_id = IntegerField('baby_id')
