
import numpy
from pathlib import Path
from stochpy import SSA
from macbeth_backend.computations.compute_model import InterfaceComputeModel


class LotkaVolterraPool(InterfaceComputeModel):

    def __init__(self, start_time, end_time, n_runs,
                 prey, predator, alpha, gamma,
                 mu, beta, delta, k_prey, k_predator):

        self.start_time = start_time
        self.end_time = end_time
        self.n_runs = n_runs
        self.prey = prey
        self.predator = predator
        self.alpha = alpha
        self.gamma = gamma
        self.mu = mu
        self.beta = beta
        self.delta = delta
        self.k_prey = k_prey
        self.k_predator = k_predator

        self.lv_pool = SSA()
        self.lv_pool.Model(model_file='lotka_volterra_pool.psc', dir=Path(__file__).parent.absolute())
        self.lv_pool.ChangeParameter('prey', self.prey)
        self.lv_pool.ChangeParameter('predator', self.predator)
        self.lv_pool.ChangeParameter('alpha', self.alpha)
        self.lv_pool.ChangeParameter('gamma', self.gamma)
        self.lv_pool.ChangeParameter('mu', self.mu)
        self.lv_pool.ChangeParameter('beta', self.beta)
        self.lv_pool.ChangeParameter('delta', self.delta)
        self.lv_pool.ChangeParameter('K_prey', self.k_prey)
        self.lv_pool.ChangeParameter('K_predator', self.k_predator)

    def compute_model(self):

        pool_prey = numpy.empty(self.end_time)
        pool_predator = numpy.empty(self.end_time)
        pool_total = numpy.empty(self.end_time)

        print(pool_prey)

        for i in range(self.n_runs):
            self.lv_pool.Endtime(self.end_time)
            self.lv_pool.DoStochSim()
            self.lv_pool.GetRegularGrid(n_samples=self.end_time*10)
            population = self.lv_pool.data_stochsim.species
            for t in range(self.end_time):
                print(population)
                pool_prey[t] = (i * pool_prey[t] + population[0][0][t]) / (i + 1)
                pool_predator[t] = (i * pool_predator[t] + population[1][0][t]) / (i + 1)
                pool_total[t] = (i * pool_total[i] + population[t][0] + population[t][1]) / (i + 1)

        print(f'pool_prey: {pool_prey}')
        print(f'pool_predator: {pool_predator}')
        print(f'pool_total: {pool_total}')
