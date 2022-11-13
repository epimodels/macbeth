from dataclasses import dataclass


@dataclass
class EbolaModelResult:

    time: list
    infected: list
    hospitalized: list
    total_size: list
