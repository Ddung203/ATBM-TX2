#include <bits/stdc++.h>
using namespace std;

int gcd(int a, int b) {
    if (b == 0) return a;
    else return gcd(b, a % b);
}

int oclitMoRong(int r0, int r1) {
    int r[100], q[100], s[100], t[100];
    memset(r, 1, sizeof(r));
    r[0] = r0; r[1] = r1;
    int i = 0;
    while (true) {
        q[i + 1] = r[i] / r[i + 1];
        r[i + 2] = r[i]  % r[i + 1];
        if (i == 0) {
            s[0] = 1;
            t[0] = 0;
        }
        else if (i == 1) {
            s[1] = 0;
            t[1] = 1;
        }
        else {
            s[i] = s[i - 2] - q[i - 1] * s[i - 1];
            t[i] = t[i - 2] - q[i - 1] * t[i - 1];
        }
        if (r[i + 2] == 0) break;
        else i++;
    }
    i++;
    s[i] = s[i - 2] - q[i - 1] * s[i - 1];
    t[i] = t[i - 2] - q[i - 1] * t[i - 1];
    return t[i] > 0 ? t[i] : (t[i] + r[0]);
}

int detK(int k[2][2]) {
	int temp = k[0][0] * k[1][1] - k[1][0] * k[0][1];
	while (temp < 0) temp += 26;
	return temp % 26;
}

void kNghichDao(int k[2][2], int res[2][2]) {
	// k^-1 = det(k)^-1 * pK
	int pk[2][2] = {{k[1][1], -k[0][1]}, {-k[1][0], k[0][0]}};
	int detk_inv = oclitMoRong(26, detK(k));
	for (int i = 0; i < 2; i++) {
		for (int j = 0; j < 2; j++) {
			while (pk[i][j] < 0) pk[i][j] += 26;
			res[i][j] = pk[i][j] * detk_inv;
			res[i][j] %= 26;
		}
	}
}


int main() {
	
	int k[2][2] = {{3, 3}, {2, 5}};
	int res[2][2];
	// kiem tra ton tai
	kNghichDao(k, res);
	cout << res[0][0] << " " << res[0][1] << endl;
	cout << res[1][0] << " " << res[1][1] << endl;
	return 0;
}

