#include <bits/stdc++.h>
using namespace std;

int gcd(int a, int b) {
    if (b == 0) return a;
    else return gcd(b, a % b);
}

string encryptAffine(string banRo, int a, int b) {
    string banMa = "";
    for (int i = 0; i < banRo.size(); i++) {
        if (isupper(banRo[i])) {
            banMa += char ((a * (banRo[i] - 'A') + b) % 26 + 'A');
        }
        else {
            banMa += char ((a * (banRo[i] - 'a') + b) % 26 + 'a');
        }
    }
    return banMa;
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
    cout << "Nhap xau ki tu 1: ";
    string s1; cin >> s1;
    cout << "Nhap xau ki tu 2: ";
    string s2; cin >> s2;
    if (encryptAffine(s1, a, b) == s2) cout << "Ban da nhap dung" << endl;
    else cout << "Ban da nhap sai" << endl;
}

/*
15
3
ATtaCK
DCcdHX
ABcdHX
*/