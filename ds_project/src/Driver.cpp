#include "../header/Driver.h"

using namespace std;

Driver::Driver() {
    id = -1;
    name = "";
    currentLocation = -1;
    available = true;
}

Driver::Driver(int driverId, string driverName, int location) {
    id = driverId;
    name = driverName;
    currentLocation = location;
    available = true;
}

int Driver::getId() {
    return id;
}

string Driver::getName() {
    return name;
}

int Driver::getCurrentLocation() {
    return currentLocation;
}

bool Driver::isAvailable() {
    return available;
}

void Driver::setAvailable(bool status) {
    available = status;
}

void Driver::setLocation(int location) {
    currentLocation = location;
}