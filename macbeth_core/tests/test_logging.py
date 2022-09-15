#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# File: test_logging.py
# ------------------------------------------------------------
# Tests the logging module is working as expected.

import unittest
from parameterized import parameterized
from macbeth_core.logging import log


def _logging_messages():
    '''log_method, log_message, log_level, # of times logged'''
    return [
        (log.info, 'This is an info message.', 'INFO', 1),
        (log.debug, 'This is a debug message.', 'DEBUG', 4),
        (log.warning, 'This is a warning message.', 'WARNING', 62),
        (log.error, 'This is an error message.', 'ERROR', 3),
        (log.critical, 'This is a critical message.', 'CRITICAL', 24),
        (log.exception, 'This is an exception message.', 'ERROR', 11),
    ]


def _logging_exceptions():
    return [
        (Exception,),
        (AssertionError,),
        (FloatingPointError,),
    ]


class TestLogging(unittest.TestCase):
    '''Test cases for the logging module.

    Ensures that the logging modules displays the correct messages for each
    type of log level.
    '''

    def setUp(self):
        self.logger = log

    @parameterized.expand(_logging_messages)
    def test_logging_displays_proper_message(self, log_method, message, level, _):
        with self.assertLogs(level=level) as captured:
            log_method(message)
        self.assertTrue(message in captured.output[0])

    @parameterized.expand(_logging_messages)
    def test_logging_displays_proper_level(self, log_method, message, level, _):
        with self.assertLogs(level=level) as captured:
            log_method(message)
        self.assertTrue(level in captured.output[0])

    @parameterized.expand(_logging_messages)
    def test_logging_displays_proper_number_of_messages(self, log_method, message, level, n):
        with self.assertLogs(level=level) as captured:
            self._log_n_times(log_method, message, n)
        self.assertEqual(len(captured.output), n)

    @parameterized.expand(_logging_exceptions)
    def test_exception_logging_displays_exception(self, exception_method):
        exception_name = exception_method.__name__
        with self.assertLogs() as captured:
            self.logger.exception('This is an exception message.', exc_info=exception_method())
        self.assertTrue(exception_name in captured.output[0],
                        msg=f'Expected: {exception_name}, Actual: {captured.output[0]}')

    def _log_n_times(self, logger, message, n):
        for _ in range(n):
            logger(message)
