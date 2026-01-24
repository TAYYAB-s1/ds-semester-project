#ifndef RIDER_H
#define RIDER_H

#include <string>

using namespace std;

class Rider {
private:
    int id;
    string name;
    int pickupLocation;
    int dropoffLocation;
    
public:
    Rider();
    Rider(int riderId, string riderName, int pickup, int dropoff);
    
    int getId();
    string getName();
    int getPickupLocation();
    int getDropoffLocation();
};

#endif
