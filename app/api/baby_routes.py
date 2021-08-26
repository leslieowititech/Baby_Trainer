from flask import Blueprint
from app.models import Baby

baby_routes = Blueprint('babies', __name__)

@baby_routes.route('/')
def get_all_babies():
    babies = Baby.query.all()
    return {'babies': [baby.to_dict() for baby in babies]}

@baby_routes.route('/<int:id>')
def get_single_baby(id):
    baby = Baby.query.get(id)
    return baby.to_dict()