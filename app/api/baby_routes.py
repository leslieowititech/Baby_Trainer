from flask import Blueprint
from flask_login import current_user
from app.models import Baby
from app.forms import BabyForm

baby_routes = Blueprint('babies', __name__)

@baby_routes.route('/')
def get_all_babies():
    babies = Baby.query.all()
    return {'babies': [baby.to_dict() for baby in babies]}

@baby_routes.route('/<int:id>')
def get_single_baby(id):
    baby = Baby.query.get(id)
    return baby.to_dict()

@baby_routes.route('/<int:id>', methods=['PUT'])
def edit_a_baby(id):
    form = BabyForm()
    baby = Baby.query.get(id)

