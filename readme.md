# Ride-Sharing Dispatch & Trip Management System

A comprehensive in-memory ride-sharing system implementation using advanced data structures and algorithms, similar to platforms like Uber or Careem.

## Project Overview

This system simulates a complete ride-sharing service with zone-based city partitioning, intelligent driver dispatch, trip lifecycle management, and rollback capabilities. The implementation focuses on custom data structures without relying on STL containers for core functionality.

## Features

### Core Functionality

- **Zone-Based City Graph**: City represented as a weighted graph with zones for efficient driver assignment
- **Shortest Path Routing**: Dijkstra's algorithm implementation for optimal route calculation
- **Smart Driver Dispatch**: Zone-aware driver assignment with cross-zone penalty
- **Trip Lifecycle Management**: Complete state machine for trip progression
- **Rollback System**: Undo operations with full state restoration
- **Analytics Engine**: Real-time trip statistics and driver utilization metrics

### Trip States

Trips progress through the following states:
- `REQUESTED` → `ASSIGNED` → `ONGOING` → `COMPLETED`
- `REQUESTED` → `CANCELLED`
- `ASSIGNED` → `CANCELLED`

## Architecture

### File Structure

RideShareSystem/
├── include/                         # Header files
│   ├── City.h
│   ├── Driver.h
│   ├── Rider.h
│   ├── Trip.h
│   ├── DispatchEngine.h
│   ├── RollbackManager.h
│   └── RideShareSystem.h
│
├── src/                             # Source files
│   ├── City.cpp
│   ├── Driver.cpp
│   ├── Rider.cpp
│   ├── Trip.cpp
│   ├── DispatchEngine.cpp
│   ├── RollbackManager.cpp
│   └── RideShareSystem.cpp
│
├── main.cpp                         # Entry point (tests & demo)
└── README.md

### Key Components

**City Graph**
- Custom adjacency list implementation
- Nodes represent locations with zone assignments
- Weighted edges represent roads with distances
- Dijkstra's algorithm for shortest path calculation

**Dispatch Engine**
- Zone-based driver selection
- Cross-zone penalty mechanism (50 distance units)
- Proximity-based driver matching

**Rollback Manager**
- Stack-based operation history
- Supports undoing multiple operations
- Restores driver availability and trip states

**Trip Management**
- Enforced state transitions
- Complete trip lifecycle tracking
- Cancellation handling at any valid state

## Data Structures Used

- **Custom Adjacency List**: For graph representation
- **Dynamic Arrays**: Resizable containers for drivers and trips
- **Linked List**: For operation history in rollback manager
- **State Machine**: For trip lifecycle management

