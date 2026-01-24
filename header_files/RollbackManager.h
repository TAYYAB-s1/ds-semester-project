#ifndef ROLLBACKMANAGER_H
#define ROLLBACKMANAGER_H

#include "Trip.h"

using namespace std;

struct Operation {
    string type;
    int tripId;
    int driverId;
    int driverLocation;
    bool driverAvailability;
    TripState previousState;
};

struct OperationNode {
    Operation data;
    OperationNode* next;
};

class RollbackManager {
private:
    OperationNode* head;
    int operationCount;
    
public:
    RollbackManager();
    ~RollbackManager();
    
    void recordOperation(Operation op);
    Operation popOperation();
    bool hasOperations();
    int getOperationCount();
};

#endif
