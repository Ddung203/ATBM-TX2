#include <bits/stdc++.h>
using namespace std;

int gcd(int a, int b) {
	if (b == 0) return a;
	else return gcd(b, a % b);
}

string encode(string banRo, int a, int b) {
	// y = (x * a + b) mod 26
	int size = banRo.length();
	string result = "";
	// in hoa tat ca
	for (int i = 0; i < size; i++) 
		banRo[i] = toupper(banRo[i]);
	// thuc hien ma hoa
	for (int i = 0; i < size; i++)
		result += ((a * (banRo[i] - 'A') + b) % 26) + 'A';
	return result;
}

int main() {
	int a, b;
	cout << "Nhap a = ";    cin >> a;
	cout << "Nhap b = ";    cin >> b;
	cout << encode("ATTACK", a, b);
	return 0;
}

