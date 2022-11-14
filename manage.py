#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from macbeth_core.logging import log


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'macbeth_core.settings')
    try:
        log.info('Starting Django')
        originaldir = os.getcwd()
        from django.core.management import execute_from_command_line
        os.chdir(originaldir)
    except ImportError as exc:
        log.exception('Exception while importing Django', exc_info=exc)
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?",
        ) from exc
    execute_from_command_line(sys.argv)
    log.info('Django server closed')


if __name__ == '__main__':
    main()
