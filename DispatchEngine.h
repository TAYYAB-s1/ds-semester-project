
#ifndef DISPATCHENGINE_H
#define DISPATCHENGINE_H

#include "City.h"
#include "Driver.h"

using namespace std;

class DispatchEngine {
private:
    Driver* drivers;
    int driverCount;
    int driverCapacity;
    City* city;
    
    void resizeDrivers();
    
public:
    DispatchEngine(City* cityGraph);
    ~DispatchEngine();
    
    void addDriver(Driver driver);
    int findBestDriver(int pickupLocation);
    Driver* getDriver(int driverId);
    int getDriverCount();
};

#endif
