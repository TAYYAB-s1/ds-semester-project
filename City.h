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

