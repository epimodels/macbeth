
from macbeth_backend.computations.lotka_volterra.lotka_volterra import LotkaVolterraPool


p = LotkaVolterraPool(0, 100, 2500, 6, 3, 10.0, 1.0, 1.0, 0.45, 0.10, 10, 15)
p.compute_model()
