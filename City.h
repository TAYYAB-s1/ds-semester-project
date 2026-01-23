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
