#include<bits/stdc++.h>
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
        r[i + 2] = r[i] % r[i + 1];
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
            t[i] = t[i -2] - q[i - 1] * t[i - 1];
        }
        if (r[i + 2] == 0) break;
        else i++;
    }
    i++;
    s[i] = s[i - 2] - q[i - 1] * s[i - 1];
    t[i] = t[i -2] - q[i - 1] * t[i - 1];
    return t[i] > 0 ? t[i] : (t[i] + r0);
}

string encryptAffine(string banRo, int a, int b) {
    string banMa = "";
    for (int i = 0; i < banRo.size(); i++) {
        if(isupper(banRo[i])) {
            banMa += char(((a * (banRo[i] - 'A') + b) % 26) + 'A');
        }
        else {
            banMa += char(((a * (banRo[i] - 'a') + b) % 26) + 'a');
        }
    }
    return banMa;
}

int main() {
    int a, b, khoaGiai;
    // nhap khoa
    cout << "Nhap khoa a = ";
	cin >> a;
    while (gcd(a, 26) != 1) {
        cout << "Khoa a khong hop le, yeu cau nhap lai!" << endl;
        cout << "Nhap lai a: "; cin >> a;
    }
    cout << "\nNhap khoa b = ";
    cin >> b;
    string banRo, banMa;
    cout << "\nNhap xau ky tu thu nhat = ";
    cin >> banRo;
    cout << "\nNhap xau ky tu thu hai = ";
    cin >> banMa;
    // kiem tra
    if (encryptAffine(banRo, a, b) == banMa)
    	cout << "\nBan da nhap dung!";
	else 
		cout << "\nBan da nhap sai!";
    return 0;
}
/*
15
3
ATTACK
DCCDHX
*/


