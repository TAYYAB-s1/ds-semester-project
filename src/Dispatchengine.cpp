#include "../header/DispatchEngine.h"

using namespace std;

DispatchEngine::DispatchEngine(City* cityGraph) {
    city = cityGraph;
    driverCapacity = 20;
    driverCount = 0;
    drivers = new Driver[driverCapacity];
}

DispatchEngine::~DispatchEngine() {
    delete[] drivers;
}

void DispatchEngine::resizeDrivers() {
    int newCapacity = driverCapacity * 2;
    Driver* newDrivers = new Driver[newCapacity];
    
    for (int i = 0; i < driverCount; i++) {
        newDrivers[i] = drivers[i];
    }
    
    delete[] drivers;
    drivers = newDrivers;
    driverCapacity = newCapacity;
}

void DispatchEngine::addDriver(Driver driver) {
    if (driverCount >= driverCapacity) {
        resizeDrivers();
    }
    drivers[driverCount] = driver;
    driverCount++;
}

int DispatchEngine::findBestDriver(int pickupLocation) {
    int bestDriver = -1;
    int minDistance = 2147483647;
    int pickupZone = city->getNodeZone(pickupLocation);
    
    for (int i = 0; i < driverCount; i++) {
        if (drivers[i].isAvailable()) {
            int driverLocation = drivers[i].getCurrentLocation();
            int distance = city->findShortestPath(driverLocation, pickupLocation);
            int driverZone = city->getNodeZone(driverLocation);
            
            if (driverZone != pickupZone) {
                distance += 50;
            }
            
            if (distance < minDistance) {
                minDistance = distance;
                bestDriver = i;
            }
        }
    }
    
    return bestDriver;
}

Driver* DispatchEngine::getDriver(int driverId) {
    for (int i = 0; i < driverCount; i++) {
        if (drivers[i].getId() == driverId) {
            return &drivers[i];
        }
    }
    return nullptr;
}

int DispatchEngine::getDriverCount() {
    return driverCount;
}