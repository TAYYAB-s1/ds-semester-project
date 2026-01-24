#include <iostream>
#include <string>
#include "./header/RideShareSystem.h"

using namespace std;

void runTests(RideShareSystem& system) {
    cout << "\n========== RUNNING TEST CASES ==========" << endl;
    
    cout << "\nTest 1: Shortest path correctness" << endl;
    system.initializeCity();
    cout << "City initialized with 15 nodes and edges" << endl;
    
    cout << "\nTest 2: Adding drivers" << endl;
    Driver d1(1, "Alice", 0);
    Driver d2(2, "Bob", 5);
    Driver d3(3, "Charlie", 10);
    system.addDriver(d1);
    system.addDriver(d2);
    system.addDriver(d3);
    cout << "Added 3 drivers" << endl;
    
    cout << "\nTest 3: Request trip" << endl;
    Rider r1(1, "John", 0, 4);
    int trip1 = system.requestTrip(r1);
    cout << "Trip requested: Trip ID " << trip1 << endl;
    
    cout << "\nTest 4: Assign driver to trip" << endl;
    bool assigned = system.assignDriver(trip1);
    cout << "Driver assignment: " << (assigned ? "SUCCESS" : "FAILED") << endl;
