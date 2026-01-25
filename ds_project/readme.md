# Ride-Sharing Dispatch & Trip Management System


A comprehensive in-memory ride-sharing system implementation using advanced data structures and algorithms, similar to platforms like Uber or Careem.

## Authors
```
DSA Semester Project - 2 Student Team

Muhammad Tayyab F202436199
Zahra Ahsan F2024376195
```



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

## Compilation & Execution

### Compile All Files
```bash
g++ -Iinclude -o rideshare main.cpp src/City.cpp src/Driver.cpp src/Rider.cpp src/Trip.cpp src/DispatchEngine.cpp src/RollbackManager.cpp src/RideShareSystem.cpp
```

```bash
g++ -Iinclude -o rideshare main.cpp src/*.cpp
```
### Run the Program
```bash
./rideshare
```

### Windows (MinGW)
```bash
g++ -o rideshare.exe main.cpp City.cpp Driver.cpp Rider.cpp Trip.cpp DispatchEngine.cpp RollbackManager.cpp RideShareSystem.cpp
rideshare.exe
```

### Alternative: Separate Compilation
```bash
g++ -c City.cpp
g++ -c Driver.cpp
g++ -c Rider.cpp
g++ -c Trip.cpp
g++ -c DispatchEngine.cpp
g++ -c RollbackManager.cpp
g++ -c RideShareSystem.cpp
g++ -c main.cpp
g++ -o rideshare *.o
./rideshare
```

## Test Cases

The system includes 12 comprehensive test cases:

1. **Shortest Path Correctness**: Validates graph and routing algorithm
2. **Driver Management**: Tests driver registration and tracking
3. **Trip Request**: Validates trip creation
4. **Driver Assignment**: Tests dispatch logic
5. **Trip Start**: Validates state transition
6. **Trip Completion**: Tests completion flow and driver availability restoration
7. **Trip Cancellation**: Validates cancellation at different states
8. **Driver Reassignment**: Tests driver availability after cancellation
9. **Invalid State Handling**: Ensures invalid transitions are blocked
10. **Multiple Rollbacks**: Tests rollback mechanism with multiple operations
11. **Analytics**: Validates metric calculations
12. **Trip History**: Tests complete trip tracking

## Usage Example

```cpp
RideShareSystem system;
system.initializeCity();

Driver driver1(1, "Alice", 0);
system.addDriver(driver1);

Rider rider1(1, "John", 0, 4);
int tripId = system.requestTrip(rider1);

system.assignDriver(tripId);
system.startTrip(tripId);
system.completeTrip(tripId);

system.displayAnalytics();
system.displayTripHistory();
```

## System Constraints

- No STL graph or map containers for core logic
- No external routing APIs
- No global variables
- All implementations use custom data structures
- Header files contain declarations only

## Analytics Provided

- Total number of trips
- Completed trips count
- Cancelled trips count
- Average trip distance
- Driver utilization metrics

## Complexity Analysis

**Shortest Path (Dijkstra)**
- Time: O(V²) where V is number of nodes
- Space: O(V)

**Driver Assignment**
- Time: O(D × V²) where D is number of drivers
- Space: O(V)

**Trip Operations**
- Request/Assign/Start/Complete: O(1)
- Cancel: O(D) to find driver
- Rollback: O(k) for k operations

**Analytics**
- Time: O(T) where T is number of trips
- Space: O(1)

## Key Design Decisions

**Zone-Based Partitioning**: Improves driver assignment efficiency by prioritizing same-zone drivers

**Cross-Zone Penalty**: Adds 50 distance units to encourage local assignments

**Stack-Based Rollback**: Enables LIFO operation reversal with complete state restoration

**State Machine Enforcement**: Prevents invalid trip transitions and maintains data integrity

## Future Enhancements

- Multi-threading for concurrent trip handling
- Priority queue optimization for Dijkstra's algorithm
- Real-time driver location updates
- Dynamic pricing based on demand
- Advanced analytics with time-based metrics

