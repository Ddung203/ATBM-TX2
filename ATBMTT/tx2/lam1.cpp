#include <bits/stdc++.h>
using namespace std;

int gcd(int a, int b) {
	if (b == 0) return a;
	return gcd(b, a % b);
}


int oclitMoRong(int r0, int r1) {
	int r[100], q[100], s[100], t[100];
	memset(r, 1, sizeof(r));
	r[0] = r0; r[1] = r1;
	int i = 0;
	while (true) {
		r[i + 2] = r[i] % r[i + 1];
		q[i + 1] = r[i] / r[i + 1];
		if (i == 0) {
			s[0] = 1;
			t[0] = 0;
		} else if (i == 1) {
			s[1] = 0;
			t[1] = 1;
		} else {
			s[i] = s[i - 2] - q[i - 1] * s[i - 1];
			t[i] = t[i - 2] - q[i - 1] * t[i - 1];
		}
		if (r[i + 2] == 0) break;
		else i += 1;
	}
	i += 1;
	s[i] = s[i - 2] - q[i - 1] * s[i - 1];
	t[i] = t[i - 2] - q[i - 1] * t[i - 1];
	return t[i] > 0 ? t[i] : (t[i] + r0);
}

int main() {
	int a, b, c, d;
	cout << "Nhap vao so a = ";    cin >> a;
	while (gcd(a, 26) != 1) {
		cout << "Nhap lai a sao cho gcd(a, 26) = 1" << endl;
		cout << "Nhap a = ";       cin >> a;
	}
	cout << "Nhap b = ";           cin >> b;
	cout << "Nhap c = ";           cin >> c;
	cout << "Nhap d = ";           cin >> d;
	if (b == d && oclitMoRong(26, a) == c) {
		cout << endl << "Do la khoa giai ma!";
	} else {
		cout << endl << "Do khong la khoa giai ma!";
	}
	return 0;
}

