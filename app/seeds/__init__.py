from flask.cli import AppGroup
from .users import seed_users, undo_users
from .babies import seed_babies, undo_babies
from .diapers import seed_diapers, undo_diapers
from .feeds import seed_feeds, undo_feeds

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_babies()
    seed_diapers()
    seed_feeds()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_babies()
    undo_diapers()
    undo_feeds()
    # Add other undo functions here
