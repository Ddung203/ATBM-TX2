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
    while(true) {
        q[i + 1] = r[i] / r[i + 1];
        r[i + 2] = r[i] % r[i + 1];
        if (i == 0) {
            s[i] = 1;
            t[i] = 0;
        }
        else if (i == 1) {
            s[i] = 0;
            t[i] = 1;
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

int main() {
    cout << "Nhap vao gia tri a: ";
    int a; cin >> a;
    while (gcd(a, 26) != 1) {
        cout << "Gia tri a vua nhap khong hop le, yeu cau nhap lai!" << endl;
        cout << "Nhap lai gia tri a: "; cin >> a;
    }
    cout << "Nhap vao gia tri b: ";
    int b; cin >> b;
    cout << "Khoa giai ma la (a^-1, b) = (" << oclitMoRong(26, a) << ", " << b << ")" << endl;
}