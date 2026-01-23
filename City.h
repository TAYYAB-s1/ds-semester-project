#ifndef CITY_H
#define CITY_H

#include <iostream>
#include <string>

using namespace std;

struct Edge {
    int destination;
    int distance;
    Edge* next;
};

struct Node {
    int id;
    string name;
    int zone;
    Edge* edges;
};

class City {
private:
    Node* nodes;
    int nodeCount;
    int capacity;
    
    void resize();
    int* dijkstra(int start);
    
public:
    City(int initialCapacity = 50);
    ~City();
    
    void addNode(int id, string name, int zone);
    void addEdge(int from, int to, int distance);
    int findShortestPath(int from, int to);
    int getNodeZone(int nodeId);
    int getNodeCount();
    Node* getNode(int index);
};

#endif
