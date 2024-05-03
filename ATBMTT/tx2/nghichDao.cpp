#include <bits/stdc++.h>
using namespace std;

int getInv(int a, int b) {
	int flag = 0;
	for (int i = 0;  i < b; i++) {
		flag = (a * i) % b;
		if (flag == 1)
			return i;
	}
}

int olitMoRong(int r0, int r1) {
	int r[100], q[100], s[100], t[100];
	r[0] = r0;
	r[1] = r1;
	int i = 0;
	while (true) {
		q[i + 1] = r[i] / r[i + 1];
		r[i + 2] = r[i] % r[i + 1];
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
	cout << olitMoRong(26, 5) << endl;
	return 0;
}

