#include <iostream>
using namespace std;

int main() {
    string items[] = {"Pizza", "Burger", "Pepsi"};
    int prices[] = {250, 150, 40};
    int quantity[3];
    int total = 0;

    cout << "Zomato Lite Billing System\n";
    for (int i = 0; i < 3; ++i) {
        cout << "Enter quantity for " << items[i] << " (₹" << prices[i] << "): ";
        cin >> quantity[i];
        total += quantity[i] * prices[i];
    }

    cout << "\nYour Total Bill: ₹" << total << endl;
    return 0;
}
