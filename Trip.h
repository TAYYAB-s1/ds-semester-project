#ifndef TRIP_H
#define TRIP_H

#include <string>

using namespace std;

enum TripState {
    REQUESTED,
    ASSIGNED,
    ONGOING,
    COMPLETED,
    CANCELLED
};

class Trip {
private:
    int id;
    int riderId;
    int driverId;
    int pickupLocation;
    int dropoffLocation;
    int distance;
    TripState state;
    
public:
    Trip();
    Trip(int tripId, int rider, int pickup, int dropoff, int dist);
    
    int getId();
    int getRiderId();
    int getDriverId();
    int getPickupLocation();
    int getDropoffLocation();
    int getDistance();
    TripState getState();
    
    void assignDriver(int driver);
    void startTrip();
    void completeTrip();
    void cancelTrip();
    
    string getStateString();
};

#endif
