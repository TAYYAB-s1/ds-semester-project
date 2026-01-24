#include "../header/RideShareSystem.h"
#include <iostream>

using namespace std;

RideShareSystem::RideShareSystem() {
    city = new City();
    dispatch = new DispatchEngine(city);
    rollback = new RollbackManager();
    tripCapacity = 50;
    tripCount = 0;
    trips = new Trip[tripCapacity];
    nextTripId = 1;
}

RideShareSystem::~RideShareSystem() {
    delete city;
    delete dispatch;
    delete rollback;
    delete[] trips;
}
void RideShareSystem::initializeCity() {
    for (int i = 0; i < 15; i++) {
        city->addNode(i, "Location" + to_string(i), i / 5);
    }
    
    city->addEdge(0, 1, 5);
    city->addEdge(1, 0, 5);
    city->addEdge(1, 2, 8);
    city->addEdge(2, 1, 8);
    city->addEdge(2, 3, 6);
    city->addEdge(3, 2, 6);
    city->addEdge(3, 4, 7);
    city->addEdge(4, 3, 7);
    city->addEdge(0, 5, 10);
    city->addEdge(5, 0, 10);
    city->addEdge(5, 6, 4);
    city->addEdge(6, 5, 4);
    city->addEdge(6, 7, 9);
    city->addEdge(7, 6, 9);
    city->addEdge(7, 8, 5);
    city->addEdge(8, 7, 5);
    city->addEdge(8, 9, 6);
    city->addEdge(9, 8, 6);
    city->addEdge(5, 10, 12);
    city->addEdge(10, 5, 12);
    city->addEdge(10, 11, 7);
    city->addEdge(11, 10, 7);
    city->addEdge(11, 12, 8);
    city->addEdge(12, 11, 8);
    city->addEdge(12, 13, 6);
    city->addEdge(13, 12, 6);
    city->addEdge(13, 14, 9);
    city->addEdge(14, 13, 9);
}
void RideShareSystem::resizeTrips() {
    int newCapacity = tripCapacity * 2;
    Trip* newTrips = new Trip[newCapacity];
    
    for (int i = 0; i < tripCount; i++) {
        newTrips[i] = trips[i];
    }
    
    delete[] trips;
    trips = newTrips;
    tripCapacity = newCapacity;
}

void RideShareSystem::addDriver(Driver driver) {
    dispatch->addDriver(driver);
}

int RideShareSystem::requestTrip(Rider rider) {
    if (tripCount >= tripCapacity) {
        resizeTrips();
    }
    
    int distance = city->findShortestPath(rider.getPickupLocation(), rider.getDropoffLocation());
    Trip newTrip(nextTripId, rider.getId(), rider.getPickupLocation(), rider.getDropoffLocation(), distance);
    
    trips[tripCount] = newTrip;
    tripCount++;
    
    Operation op;
    op.type = "REQUEST";
    op.tripId = nextTripId;
    op.driverId = -1;
    op.previousState = REQUESTED;
    rollback->recordOperation(op);
    
    nextTripId++;
    return nextTripId - 1;
}

Trip* RideShareSystem::findTrip(int tripId) {
    for (int i = 0; i < tripCount; i++) {
        if (trips[i].getId() == tripId) {
            return &trips[i];
        }
    }
    return nullptr;
}

bool RideShareSystem::assignDriver(int tripId) {
    Trip* trip = findTrip(tripId);
    if (trip == nullptr || trip->getState() != REQUESTED) {
        return false;
    }
    
    int driverIdx = dispatch->findBestDriver(trip->getPickupLocation());
    if (driverIdx == -1) {
        return false;
    }
    
    Driver* driver = dispatch->getDriver(driverIdx);
    if (driver == nullptr) {
        return false;
    }
    
    Operation op;
    op.type = "ASSIGN";
    op.tripId = tripId;
    op.driverId = driver->getId();
    op.driverLocation = driver->getCurrentLocation();
    op.driverAvailability = driver->isAvailable();
    op.previousState = trip->getState();
    rollback->recordOperation(op);
    
    trip->assignDriver(driver->getId());
    driver->setAvailable(false);
    
    return true;
}

bool RideShareSystem::startTrip(int tripId) {
    Trip* trip = findTrip(tripId);
    if (trip == nullptr || trip->getState() != ASSIGNED) {
        return false;
    }
    
    Operation op;
    op.type = "START";
    op.tripId = tripId;
    op.driverId = trip->getDriverId();
    op.previousState = trip->getState();
    rollback->recordOperation(op);
    
    trip->startTrip();
    return true;
}

bool RideShareSystem::completeTrip(int tripId) {
    Trip* trip = findTrip(tripId);
    if (trip == nullptr || trip->getState() != ONGOING) {
        return false;
    }
    
    Driver* driver = dispatch->getDriver(trip->getDriverId());
    if (driver != nullptr) {
        Operation op;
        op.type = "COMPLETE";
        op.tripId = tripId;
        op.driverId = driver->getId();
        op.driverLocation = driver->getCurrentLocation();
        op.driverAvailability = driver->isAvailable();
        op.previousState = trip->getState();
        rollback->recordOperation(op);
        
        trip->completeTrip();
        driver->setLocation(trip->getDropoffLocation());
        driver->setAvailable(true);
        return true;
    }
    
    return false;
}

bool RideShareSystem::cancelTrip(int tripId) {
    Trip* trip = findTrip(tripId);
    if (trip == nullptr || (trip->getState() != REQUESTED && trip->getState() != ASSIGNED)) {
        return false;
    }
    
    TripState prevState = trip->getState();
    
    if (prevState == ASSIGNED) {
        Driver* driver = dispatch->getDriver(trip->getDriverId());
        if (driver != nullptr) {
            Operation op;
            op.type = "CANCEL";
            op.tripId = tripId;
            op.driverId = driver->getId();
            op.driverAvailability = driver->isAvailable();
            op.previousState = prevState;
            rollback->recordOperation(op);
            
            driver->setAvailable(true);
        }
    } else {
        Operation op;
        op.type = "CANCEL";
        op.tripId = tripId;
        op.driverId = -1;
        op.previousState = prevState;
        rollback->recordOperation(op);
    }
    
    trip->cancelTrip();
    return true;
}

