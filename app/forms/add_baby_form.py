from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, DateField
from wtforms.validators import DataRequired, ValidationError
from app.models import Baby

# def baby_exists(form, field):
#     print(field.data)
#     name = field.data['name']
#     print(name, '____________________nameHere')
#     baby = Baby.query.filter(Baby.name == name).first()
#     print(baby, '_____________________babyHERE')
#     if baby:
#         raise ValidationError('Cannot have duplicate Babies')


class  BabyForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    birthday = DateField('birthday', validators=[DataRequired()])
