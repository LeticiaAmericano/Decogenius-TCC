import logging
from logging.config import fileConfig

from flask import current_app
from alembic import context

# This is the Alembic Config object, which provides access to values within the .ini file in use.
config = context.config

# Configure Python logging for Alembic
fileConfig(config.config_file_name)
logger = logging.getLogger('alembic.env')


def get_engine():
    """Retrieve the SQLAlchemy engine from Flask's app context."""
    try:
        # For Flask-SQLAlchemy <3.x or Alchemical
        return current_app.extensions['migrate'].db.get_engine()
    except (TypeError, AttributeError):
        # For Flask-SQLAlchemy >=3.x
        return current_app.extensions['migrate'].db.engine


def get_engine_url():
    """Get the database connection URL as a string."""
    try:
        # Render the URL and include the password
        return get_engine().url.render_as_string(hide_password=False).replace('%', '%%')
    except AttributeError:
        # For older SQLAlchemy versions
        return str(get_engine().url).replace('%', '%%')


def get_metadata():
    """Fetch metadata for autogeneration from Flask's app context."""
    target_db = current_app.extensions['migrate'].db
    if hasattr(target_db, 'metadatas'):
        # Handle multiple metadata objects if present
        return target_db.metadatas[None]
    return target_db.metadata


# Automatically set the SQLAlchemy database URL in the Alembic configuration
config.set_main_option('sqlalchemy.url', get_engine_url())


def run_migrations_offline():
    """Run migrations in 'offline' mode.

    This configures the context with just a database URL.
    No database connection is required; migration commands are output as SQL scripts.
    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=get_metadata(),
        literal_binds=True
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode.

    This creates a database connection and applies migrations directly.
    """
    # Prevent generating empty migration scripts when no schema changes are detected
    def process_revision_directives(context, revision, directives):
        if getattr(config.cmd_opts, 'autogenerate', False):
            script = directives[0]
            if script.upgrade_ops.is_empty():
                directives[:] = []  # Clear the directives list to avoid creating a script
                logger.info('No changes in schema detected.')

    # Fetch configuration arguments for Alembic
    conf_args = current_app.extensions['migrate'].configure_args
    if conf_args.get("process_revision_directives") is None:
        conf_args["process_revision_directives"] = process_revision_directives

    # Get the SQLAlchemy engine
    connectable = get_engine()

    # Connect to the database and configure the migration context
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=get_metadata(),
            **conf_args
        )

        with context.begin_transaction():
            context.run_migrations()


# Determine the mode (offline or online) and run the appropriate migration function
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
