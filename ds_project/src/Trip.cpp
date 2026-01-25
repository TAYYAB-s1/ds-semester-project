
#include "../header/Trip.h"
#include <iostream>

using namespace std;

Trip::Trip() {
    id = -1;
    riderId = -1;
    driverId = -1;
    pickupLocation = -1;
    dropoffLocation = -1;
    distance = 0;
    state = REQUESTED;
}

Trip::Trip(int tripId, int rider, int pickup, int dropoff, int dist) {
    id = tripId;
    riderId = rider;
    driverId = -1;
    pickupLocation = pickup;
    dropoffLocation = dropoff;
    distance = dist;
    state = REQUESTED;
}

int Trip::getId() {
    return id;
}

int Trip::getRiderId() {
    return riderId;
}

int Trip::getDriverId() {
    return driverId;
}

int Trip::getPickupLocation() {
    return pickupLocation;
}

int Trip::getDropoffLocation() {
    return dropoffLocation;
}

int Trip::getDistance() {
    return distance;
}

TripState Trip::getState() {
    return state;
}

void Trip::assignDriver(int driver) {
    if (state == REQUESTED) {
        driverId = driver;
        state = ASSIGNED;
    }
}

void Trip::startTrip() {
    if (state == ASSIGNED) {
        state = ONGOING;
    }
}

void Trip::completeTrip() {
    if (state == ONGOING) {
        state = COMPLETED;
    }
}

void Trip::cancelTrip() {
    if (state == REQUESTED || state == ASSIGNED) {
        state = CANCELLED;
    }
}

string Trip::getStateString() {
    switch(state) {
        case REQUESTED: return "REQUESTED";
        case ASSIGNED: return "ASSIGNED";
        case ONGOING: return "ONGOING";
        case COMPLETED: return "COMPLETED";
        case CANCELLED: return "CANCELLED";
        default: return "UNKNOWN";
    }
}
