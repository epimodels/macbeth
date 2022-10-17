#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# ------------------------------------------------------------
# file: zombie_seir_result.py
# ------------------------------------------------------------
# zombie seir compute model result

from dataclasses import dataclass


@dataclass
class ZombieSEIRResult:

    t: list
    s: list
    e: list
    i: list
    r: list
