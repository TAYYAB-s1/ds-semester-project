#ifndef DRIVER_H
#define DRIVER_H

#include <string>

using namespace std;

class Driver {
private:
    int id;
    string name;
    int currentLocation;
    bool available;
    
public:
    Driver();
    Driver(int driverId, string driverName, int location);
    
    int getId();
    string getName();
    int getCurrentLocation();
    bool isAvailable();
    void setAvailable(bool status);
    void setLocation(int location);
};

#endif
