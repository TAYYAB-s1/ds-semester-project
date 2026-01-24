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