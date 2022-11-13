# Ebola Model - 2014 Outbreak Stochastic Implementation
# Author: Eric Lofgren (lofgrene@vbi.vt.edu)

Modelname: EbolaLiberia
Description: PML Implementation of Legrand et al., 2007 Ebola Model with parameters from http://arxiv.org/abs/1409.4607 for Liberia's 2014 Ebola Outbreak

# Set model to run with numbers of individuals
Species_In_Conc: False
Output_In_Conc: False

# Differential Equations as Reactions
# Order of Compartments:
# S, E, Community, Hospital, Funeral, I, H, F, R

R1:
	S > E + Community
	(beta_I*S*I)/(S+E+I+H+F+R)

R2:
	S > E + Hospital
	(beta_H*S*H)/(S+E+I+H+F+R)

R3:
	S > E + Funeral
	(beta_F*S*F)/(S+E+I+H+F+R)

R4:
	E > I
	alpha*E

R5:
	I > H
	gamma_H*dx*I

R6:
	H > F
	gamma_DH*delta_2*H

R7:
	F > R
	gamma_F*F

R8:
	I > R
	gamma_I*(1-dx)*(1-delta_1)*I

R9:
	I > F
	delta_1*(1-dx)*gamma_D*I

R10:
	H > R
	gamma_IH*(1-delta_2)*H

# Parameter Values
# Output Variables
S = 3476608
E = 0
I = 1
H = 0
F = 0
R = 0
Community = 0
Hospital = 0
Funeral = 0

# Input Variables

beta_I = 0.1595
beta_H = 0.062036
beta_F = 0.489256

alpha = 0.083333
gamma_H = 0.308899
gamma_DH = 0.09925999
gamma_F = 0.496443
gamma_I = 0.066667
gamma_D = 0.075121
gamma_IH = 0.08501507
dx = 0.20
delta_1 = 0.5
delta_2 = 0.5
