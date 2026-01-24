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

    cout << "\nTest 5: Complete trip" << endl;
    bool completed = system.completeTrip(trip1);
    cout << "Trip start: " << (completed ? "SUCCESS" : "FAILED") << endl;

    cout << "\nTest 6: Complete trip" << endl;
    bool completed = system.completeTrip(trip1);
    cout << "Trip completion: " << (completed ? "SUCCESS" : "FAILED") << endl;
    
    cout << "\nTest 7: Request and cancel trip" << endl;
    Rider r2(2, "Emma", 5, 9);
    int trip2 = system.requestTrip(r2);
    system.assignDriver(trip2);
    bool cancelled = system.cancelTrip(trip2);
    cout << "Trip cancellation: " << (cancelled ? "SUCCESS" : "FAILED") << endl;
    
    cout << "\nTest 8: Driver reassignment after cancellation" << endl;
    Rider r3(3, "Mike", 1, 3);
    int trip3 = system.requestTrip(r3);
    assigned = system.assignDriver(trip3);
    cout << "Driver reassignment: " << (assigned ? "SUCCESS" : "FAILED") << endl;
    
    cout << "\nTest 9: Invalid state transition handling" << endl;
    bool invalidStart = system.startTrip(999);
    cout << "Invalid trip start blocked: " << (!invalidStart ? "SUCCESS" : "FAILED") << endl;
    
    cout << "\nTest 10: Multiple trip rollbacks" << endl;
    system.rollbackOperations(2);
    cout << "Rolled back 2 operations" << endl;

cout << "\nTest 11: Analytics correctness" << endl;
    system.displayAnalytics();
    
    cout << "\nTest 12: Trip history display" << endl;
    system.displayTripHistory();
    
    cout << "\n========== ALL TESTS COMPLETED ==========" << endl;
}
nt main() {
    RideShareSystem system;

    runTests(system);

    cout << "\n\n========== INTERACTIVE MODE ==========\n";

    RideShareSystem demo;
    demo.initializeCity();

    int choice;
    bool running = true;

    while (running) {
        cout << "\n------ Ride Sharing Menu ------\n";
        cout << "1. Add Driver\n";
        cout << "2. Request Trip\n";
        cout << "3. Assign Driver\n";
        cout << "4. Start Trip\n";
        cout << "5. Complete Trip\n";
        cout << "6. Cancel Trip\n";
        cout << "7. Show Trip History\n";
        cout << "8. Show Analytics\n";
        cout << "9. Rollback Operations\n";
        cout << "0. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
        case 1: {
            int id, location;
            string name;
            cout << "Driver ID: ";
            cin >> id;
            cout << "Driver Name: ";
            cin.ignore();
            getline(cin, name);
            cout << "Driver Location: ";
            cin.ignore();
            cin >> location;
            demo.addDriver(Driver(id, name, location));
            cout << "Driver added successfully.\n";
            break;
        }

        case 2: {
            int id, start, end;
            string name;
            cout << "Rider ID: ";
            cin >> id;
            cout << "Rider Name: ";
            cin.ignore();
            getline(cin, name);
            cout << "Start Location: ";
            cin.ignore();
            cin >> start;
            cout << "End Location: ";
            cin >> end;
            int tripId = demo.requestTrip(Rider(id, name, start, end));
            cout << "Trip requested. Trip ID = " << tripId << endl;
            break;
        }

        case 3: {
            int tripId;
            cout << "Enter Trip ID: ";
            cin >> tripId;
            cout << (demo.assignDriver(tripId) ? "Driver Assigned\n" : "Assignment Failed\n");
            break;
        }

    

