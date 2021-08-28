from flask import Blueprint, redirect, request
from flask_login import current_user
from app.models import Baby, db
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

@baby_routes.route('/create', methods=['POST'])
def create_a_baby():
    form = BabyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        print(data, 'data______CREATE')
        new_baby = Baby(
            name=data['name'],
            birthday=data['birthday'],
            user_id = current_user.id
        )

        db.session.add(new_baby)
        db.session.commit()

        return new_baby.to_dict()
    return 'Bad data'


