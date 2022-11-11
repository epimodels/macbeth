# Lotka-Volterra predator-prey model
# Prey species is secondary, predator has an intrinsic birth/death rate from other sources
# PyCSeS Implementation
# Author: Eric Lofgren (Eric.Lofgren@gmail.com)

Modelname: LV_migration
Description: PySCes Model Description Language Implementation of Lotka-Volterra model

# Set model to run with numbers of individuals
Species_In_Conc: False
Output_In_Conc: False

# Prey Reactions
R1:
	prey > $pool
	prey*predator*beta

R2:
	$pool > prey
	prey*alpha*(1-(prey/K_prey))

# Predator Reactions (from consumption of prey)

R3:
	$pool > predator
	predator*prey*delta*(1-(predator/K_predator))

# Predator Reactions (from intrinsic birth/death rates)

R4:
    predator > $pool
    predator*gamma*(1-(predator/K_predator))

R5:
    $pool > predator
    predator*mu*(1-(predator/K_predator))

# Parameter Values
prey = 6
predator = 3
alpha = 10.0
gamma = 1.0
mu = 1.0
beta = 0.45
delta = 0.10
K_prey = 10
K_predator = 15
