#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# file: zombie_sir_result.py
# ------------------------------------------------------------
# zombie sir compute model result

from dataclasses import dataclass


@dataclass
class ZombieSIRResult:

    t: list
    s: list
    i: list
    r: list
