#ifndef RIDESHARESYSTEM_H
#define RIDESHARESYSTEM_H

#include "City.h"
#include "Driver.h"
#include "Rider.h"
#include "Trip.h"
#include "DispatchEngine.h"
#include "RollbackManager.h"

using namespace std;

class RideShareSystem {
private:
    City* city;
    DispatchEngine* dispatch;
    RollbackManager* rollback;
    Trip* trips;
    int tripCount;
    int tripCapacity;
    int nextTripId;
    
    void resizeTrips();
    Trip* findTrip(int tripId);
    
public:
    RideShareSystem();
    ~RideShareSystem();
    
    void initializeCity();
    void addDriver(Driver driver);
    int requestTrip(Rider rider);
    bool assignDriver(int tripId);
    bool startTrip(int tripId);
    bool completeTrip(int tripId);
    bool cancelTrip(int tripId);
    void rollbackOperations(int k);
    
    void displayTripHistory();
    void displayAnalytics();
    
    int getTripCount();
    Trip* getTrip(int index);
};

#endif
