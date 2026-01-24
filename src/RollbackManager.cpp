#include "../header/RollbackManager.h"

using namespace std;

RollbackManager::RollbackManager() {
    head = nullptr;
    operationCount = 0;
}

RollbackManager::~RollbackManager() {
    while (head != nullptr) {
        OperationNode* temp = head;
        head = head->next;
        delete temp;
    }
}

void RollbackManager::recordOperation(Operation op) {
    OperationNode* newNode = new OperationNode;
    newNode->data = op;
    newNode->next = head;
    head = newNode;
    operationCount++;
}

Operation RollbackManager::popOperation() {
    if (head != nullptr) {
        Operation op = head->data;
        OperationNode* temp = head;
        head = head->next;
        delete temp;
        operationCount--;
        return op;
    }
    Operation empty;
    empty.type = "";
    return empty;
}

bool RollbackManager::hasOperations() {
    return head != nullptr;
}

int RollbackManager::getOperationCount() {
    return operationCount;
}