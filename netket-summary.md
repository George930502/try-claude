# NetKet: Neural Network Quantum States

## Overview

NetKet is a comprehensive Python library for studying many-body quantum systems using neural networks and machine learning techniques. Built on JAX for high-performance automatic differentiation and GPU acceleration, NetKet provides cutting-edge methods for quantum state simulation and optimization.

## Key Features

- **Variational Monte Carlo (VMC)**: Find ground states of quantum Hamiltonians using neural network wavefunctions
- **Time-Dependent Variational Principle (TDVP)**: Perform real-time and imaginary-time quantum dynamics
- **Stochastic Reconfiguration**: Efficient optimization using natural gradient descent
- **Diverse Quantum Systems**: Support for spin models, fermionic systems, bosonic systems, and continuous-space quantum mechanics
- **Flexible Neural Networks**: RBM, CNN, autoregressive models with symmetry constraints
- **Advanced Sampling**: Metropolis, parallel tempering, and autoregressive sampling algorithms
- **GPU & Distributed Computing**: JAX-based GPU acceleration and MPI support for multi-node simulations

## Supported Quantum Systems

1. **Spin Models**: Ising, Heisenberg chains and lattices
2. **Fermionic Systems**: Hubbard models with particle number conservation
3. **Bosonic Systems**: Bose-Hubbard models
4. **Continuous Space**: Quantum chemistry applications

## Core Components

### 1. Hilbert Spaces
Define quantum state spaces with various constraints:
- Spin systems (spin-1/2, spin-1, etc.)
- Bosonic Fock spaces with particle number conservation
- Fermionic spin orbitals
- Continuous space for particles

### 2. Quantum Operators
Built-in Hamiltonians and observables:
- Ising, Heisenberg, Bose-Hubbard operators
- Custom operators via Pauli strings or matrix elements
- Fermionic creation/annihilation operators

### 3. Neural Network Models
Variational ansätze architectures:
- Restricted Boltzmann Machines (RBM)
- Graph Convolutional Neural Networks (GCNN)
- Autoregressive Neural Networks (ARNN)
- Slater Determinants for fermions
- Custom Flax/Haiku models

### 4. Monte Carlo Samplers
MCMC algorithms for state sampling:
- Metropolis Local (single spin flips)
- Metropolis Exchange (particle swaps)
- Parallel Tempering (multi-temperature)
- Autoregressive Direct Sampling (exact)

### 5. Optimizers
Optimization algorithms:
- SGD, Adam, RMSProp, AdaGrad
- Stochastic Reconfiguration (SR) for natural gradients
- Quantum Geometric Tensor (QGT) preconditioners

## Primary Use Cases

### 1. Ground State Finding
Use VMC to optimize neural network wavefunctions and find the lowest energy state of quantum Hamiltonians. Stochastic reconfiguration accelerates convergence by using quantum Fisher information.

### 2. Quantum Dynamics
Simulate time evolution of quantum systems using TDVP with adaptive ODE solvers. Supports both real-time and imaginary-time evolution.

### 3. Observable Computation
Calculate expectation values of quantum observables with Monte Carlo sampling, including statistical uncertainty estimates and convergence diagnostics.

## Advanced Features

- **Symmetry-Aware Networks**: Incorporate translation, rotation, and other symmetries to reduce parameter count and improve optimization
- **GPU Acceleration**: Automatic GPU utilization via JAX with sharding for multi-GPU systems
- **Distributed Computing**: MPI support for scaling to multiple nodes
- **Logging & Callbacks**: JSON, TensorBoard logging with early stopping and convergence monitoring
- **Integration with ML Frameworks**: Works seamlessly with Flax, Haiku, Equinox, and Optax

## Performance

NetKet leverages JAX's JIT compilation and automatic differentiation to achieve high performance:
- Automatic GPU acceleration without code changes
- Efficient memory usage through JAX's functional programming paradigm
- Scalable to large systems with distributed computing
- Fast gradient computation via automatic differentiation

## Technical Details

- **Language**: Python
- **Backend**: JAX (for automatic differentiation and XLA compilation)
- **Code Snippets Available**: 562
- **Trust Score**: 8.1/10
- **Context7 Library ID**: `/netket/netket`

## Example Workflow

1. Define quantum system (lattice graph, Hilbert space, Hamiltonian)
2. Choose neural network ansatz (RBM, GCNN, custom model)
3. Configure Monte Carlo sampler
4. Create variational state combining sampler and model
5. Set up VMC driver with optimizer (optionally with SR)
6. Run optimization and monitor convergence
7. Compute observables and analyze results

## Resources

- Official Repository: https://github.com/netket/netket
- Documentation: Comprehensive API documentation available
- Integration: Compatible with standard Python scientific stack (NumPy, SciPy, JAX ecosystem)

---

*This summary was generated using Context7 documentation retrieval for the NetKet package (/netket/netket).*
