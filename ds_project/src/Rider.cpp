
#include "../header/Rider.h"

using namespace std;

Rider::Rider() {
    id = -1;
    name = "";
    pickupLocation = -1;
    dropoffLocation = -1;
}

Rider::Rider(int riderId, string riderName, int pickup, int dropoff) {
    id = riderId;
    name = riderName;
    pickupLocation = pickup;
    dropoffLocation = dropoff;
}

int Rider::getId() {
    return id;
}

string Rider::getName() {
    return name;
}

int Rider::getPickupLocation() {
    return pickupLocation;
}

int Rider::getDropoffLocation() {
    return dropoffLocation;
}
