from flask import Blueprint, request
from app.models import Feed,db
from app.forms import FeedForm


feed_routes = Blueprint('feeds', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@feed_routes.route('/')
def get_all_feeds():
    feeds = Feed.query.all()
    return {'feeds': [feed.to_dict() for feed in feeds]}


@feed_routes.route('/<int:baby_id>')
def get_all_feeds_for_specifiic_baby(baby_id):
    feeds = Feed.query.filter(Feed.baby_id == baby_id)
    return {'feeds': [feed.to_dict() for feed in feeds]}


@feed_routes.route('/fed/<int:id>')
def get_specific_feed(id):
    feed = Feed.query.get(id)

    return feed.to_dict()


@feed_routes.route('/create', methods=['POST'])
def create_a_feed():
    form = FeedForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_feed = Feed(
            type=data['type'],
            feed_time=data['feed_time'],
            amount=data['amount'],
            user_id=data['user_id'],
            baby_id=data['baby_id']
        )

        db.session.add(new_feed)
        db.session.commit()
        return new_feed.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

@feed_routes.route('/<int:id>', methods=['DELETE'])
def delete_a_feed(id):
    feed_to_delete = Feed.query.get(id)
    db.session.delete(feed_to_delete)
    db.session.commit()


@feed_routes.route('/<int:id>', methods=['PUT'])
def edit_a_feed(id):
    form = FeedForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    feed_to_update = Feed.query.get(id)
    if(form.validate_on_submit()):
        feed_to_update.type = form.type.data
        feed_to_update.feed_time = form.feed_time.data
        feed_to_update.amount = form.amount.data
        feed_to_update.user_id = form.user_id.data
        feed_to_update.baby_id = form.baby_id.data

        db.session.add(feed_to_update)
        db.session.commit()

        return feed_to_update.to_dict()
