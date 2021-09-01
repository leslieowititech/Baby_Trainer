from flask import Blueprint
from app.models import Feed,db

feed_routes = Blueprint('feeds', __name__)


@feed_routes.route('/')
def get_all_feeds():
    feeds = Feed.query.all()
    return {'feeds': [feed.to_dict() for feed in feeds]}

@feed_routes.route('/<int:baby_id>')
def get_all_feeds_for_specifiic_baby(baby_id):
    feeds = Feed.query.filter(Feed.baby_id == baby_id)
    return {'feeds': [feed.to_dict() for feed in feeds]}
