
#ifndef CITY_H
#define CITY_H

// Custom edge structure (NO STL graph)
struct Edge {
    int to;
    int weight;
    Edge* next;
};

class City {
private:
    int numNodes;
    Edge** adjacencyList;   // array of linked lists
    int* zone;              // zone of each node

public:
    City(int nodes);
    ~City();

    void addRoad(int from, int to, int distance);
    void setZone(int node, int zoneId);
    int getZone(int node) const;

    int shortestPath(int src, int dest);
};

#endif
