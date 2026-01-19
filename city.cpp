#include "City.h"
#include <iostream>
#include <climits>

using namespace std;

// Constructor
City::City(int nodes) {
    numNodes = nodes;

    adjacencyList = new Edge*[numNodes];
    zone = new int[numNodes];

    for (int i = 0; i < numNodes; i++) {
        adjacencyList[i] = nullptr;
        zone[i] = -1;
    }
}

// Destructor (VERY IMPORTANT)
City::~City() {
    for (int i = 0; i < numNodes; i++) {
        Edge* curr = adjacencyList[i];
        while (curr != nullptr) {
            Edge* temp = curr;
            curr = curr->next;
            delete temp;
        }
    }
    delete[] adjacencyList;
    delete[] zone;
}

// Add road (undirected graph)
void City::addRoad(int from, int to, int distance) {
    Edge* newEdge = new Edge;
    newEdge->to = to;
    newEdge->weight = distance;
    newEdge->next = adjacencyList[from];
    adjacencyList[from] = newEdge;

    // reverse edge
    newEdge = new Edge;
    newEdge->to = from;
    newEdge->weight = distance;
    newEdge->next = adjacencyList[to];
    adjacencyList[to] = newEdge;
}

// Set zone of a node
void City::setZone(int node, int zoneId) {
    zone[node] = zoneId;
}

// Get zone of a node
int City::getZone(int node) const {
    return zone[node];
}

// Dijkstra WITHOUT STL
int City::shortestPath(int src, int dest) {
    int* dist = new int[numNodes];
    bool* visited = new bool[numNodes];

    for (int i = 0; i < numNodes; i++) {
        dist[i] = INT_MAX;
        visited[i] = false;
    }

    dist[src] = 0;

    for (int count = 0; count < numNodes - 1; count++) {
        int u = -1;
        int minDist = INT_MAX;

        for (int i = 0; i < numNodes; i++) {
            if (!visited[i] && dist[i] < minDist) {
                minDist = dist[i];
                u = i;
            }
        }

        if (u == -1) break;
        visited[u] = true;

        Edge* curr = adjacencyList[u];
        while (curr != nullptr) {
            int v = curr->to;
            int w = curr->weight;

            if (!visited[v] && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
            curr = curr->next;
        }
    }

    int result = dist[dest];

    delete[] dist;
    delete[] visited;

    return result;
}
