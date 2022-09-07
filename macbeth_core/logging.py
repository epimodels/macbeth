import logging
import os
import pathlib
import logging.handlers as handlers
import sys

_logs_full_path = os.path.join(pathlib.Path().absolute(), 'logs')
_log_file_formatter = logging.Formatter(
    '%(asctime)s - %(levelname)-8s - %(filename)8s | %(funcName)s:%(lineno)d %(message)s')
_log_file_path = pathlib.Path('logs/macbeth.log').resolve()
_log_level = logging.DEBUG

os.makedirs(_logs_full_path, exist_ok=True)


class CustomFormatter(logging.Formatter):
    '''Custom Formatter used to add colors to the logs in the terminal'''

    white = '\033[97m'
    grey = '\x1b[38;21m'
    blue = '\x1b[38;5;39m'
    yellow = '\x1b[38;5;226m'
    red = '\x1b[38;5;196m'
    bold_red = '\x1b[31;1m'
    blood_red = '\x1b[38;5;124m'
    green = '\x1b[32m'
    light_green = '\x1b[92m'
    orange = '\x1b[38;5;208m'
    light_orange = '\x1b[38;5;208m'
    reset = '\x1b[0m'

    def __init__(self):
        super().__init__()
        self.FORMATS = {
            logging.DEBUG: self._set_formats_color(self.white),
            logging.INFO: self._set_formats_color(self.light_green),
            logging.WARNING: self._set_formats_color(self.light_orange),
            logging.ERROR: self._set_formats_color(self.red),
            logging.CRITICAL: self._set_formats_color(self.blood_red),
        }

    def _set_formats_color(self, log_level_color):
        return f'{self.grey}%(asctime)s{self.reset} - {log_level_color}%(levelname)-8s' \
            f'{self.reset} - {self.orange}%(filename)s{self.reset} ' \
            f'| %(funcName)s:{self.orange}%(lineno)d{self.reset} %(message)s'

    def format(self, record):
        log_fmt = self.FORMATS.get(record.levelno)
        formatter = logging.Formatter(log_fmt)
        return formatter.format(record)


def _get_file_handler():
    handler = handlers.RotatingFileHandler(filename=_log_file_path, mode='a',
                                           maxBytes=5*1024*1024, backupCount=2,
                                           encoding=None, delay=0)
    handler.setFormatter(_log_file_formatter)
    handler.setLevel(_log_level)
    return handler


def _get_stream_handler(output_stream=sys.stdout):
    handler = logging.StreamHandler(output_stream)
    handler.setFormatter(CustomFormatter())
    handler.setLevel(_log_level)
    return handler


_log = logging.getLogger('macbeth')
_log.setLevel(logging.DEBUG)
_log.addHandler(_get_file_handler())
_log.addHandler(_get_stream_handler())

log = _log

if __name__ == '__main__':
    log.debug('This is a debug message')
    log.info('This is an info message')
    log.warning('This is a warning message')
    log.error('This is an error message')
    log.critical('This is a critical message')
