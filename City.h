#include "../header/City.h"

using namespace std;

City::City(int initialCapacity) {
    capacity = initialCapacity;
    nodeCount = 0;
    nodes = new Node[capacity];
    for (int i = 0; i < capacity; i++) {
        nodes[i].edges = nullptr;
    }
}

City::~City() {
    for (int i = 0; i < nodeCount; i++) {
        Edge* current = nodes[i].edges;
        while (current != nullptr) {
            Edge* temp = current;
            current = current->next;
            delete temp;
        }
    }
    delete[] nodes;
}

void City::resize() {
    int newCapacity = capacity * 2;
    Node* newNodes = new Node[newCapacity];
    
    for (int i = 0; i < nodeCount; i++) {
        newNodes[i] = nodes[i];
    }
    
    for (int i = nodeCount; i < newCapacity; i++) {
        newNodes[i].edges = nullptr;
    }
    
    delete[] nodes;
    nodes = newNodes;
    capacity = newCapacity;
}

void City::addNode(int id, string name, int zone) {
    if (nodeCount >= capacity) {
        resize();
    }
    nodes[nodeCount].id = id;
    nodes[nodeCount].name = name;
    nodes[nodeCount].zone = zone;
    nodes[nodeCount].edges = nullptr;
    nodeCount++;
}

void City::addEdge(int from, int to, int distance) {
    Edge* newEdge = new Edge;
    newEdge->destination = to;
    newEdge->distance = distance;
    newEdge->next = nodes[from].edges;
    nodes[from].edges = newEdge;
}
int* City::dijkstra(int start) {
    int* distances = new int[nodeCount];
    bool* visited = new bool[nodeCount];
    
    for (int i = 0; i < nodeCount; i++) {
        distances[i] = 2147483647;
        visited[i] = false;
    }
    
    distances[start] = 0;
    
    for (int count = 0; count < nodeCount - 1; count++) {
        int minDist = 2147483647;
        int minIndex = -1;
        
        for (int v = 0; v < nodeCount; v++) {
            if (!visited[v] && distances[v] < minDist) {
                minDist = distances[v];
                minIndex = v;
            }
        }
        
        if (minIndex == -1) break;
        
        visited[minIndex] = true;
        
        Edge* edge = nodes[minIndex].edges;
        while (edge != nullptr) {
            int v = edge->destination;
            if (!visited[v] && distances[minIndex] != 2147483647 &&
                distances[minIndex] + edge->distance < distances[v]) {
                distances[v] = distances[minIndex] + edge->distance;
            }
            edge = edge->next;
        }
    }
    
    delete[] visited;
    return distances;
}

int City::findShortestPath(int from, int to) {
    int* distances = dijkstra(from);
    int result = distances[to];
    delete[] distances;
    return result;
}

int City::getNodeZone(int nodeId) {
    if (nodeId >= 0 && nodeId < nodeCount) {
        return nodes[nodeId].zone;
    }
    return -1;
}

int City::getNodeCount() {
    return nodeCount;
}

Node* City::getNode(int index) {
    if (index >= 0 && index < nodeCount) {
        return &nodes[index];
    }
    return nullptr;
}

