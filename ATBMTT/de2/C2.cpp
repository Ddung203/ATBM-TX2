#include<bits/stdc++.h>
using namespace std;

int gcd(int a, int b) {
    if (b == 0) return a;
    else return gcd(b, a % b);
}

int detK(int k[2][2]) {
    int res = k[0][0] * k[1][1] - k[0][1] * k[1][0];
    while (res < 26) res += 26;
    return res % 26;
}

void nhanMatrix(int p[2], int k[2][2], int res[2]) {
	res[0] = p[0] * k[0][0] + p[1] * k[1][0];
	res[1] = p[0] * k[0][1] + p[1] * k[1][1];
	res[0] %= 26;
	res[1] %= 26;
}

string encryptHill(string banRo, int k[2][2]) {
    string banMa = "", s = banRo;
    for (int i = 0; i < banRo.size(); i++) banRo[i] = toupper(banRo[i]);
    
    for (int i = 0; i < banRo.size(); i += 2) {
        int res[2];
        int p[2] = {banRo[i] - 'A', banRo[i + 1] - 'A'};
        nhanMatrix(p, k, res);
        banMa += res[0] + 'A';
        banMa += res[1] + 'A';
    }
    return banMa;
}

int main() {
    int k[2][2];
    cout << "Nhap ma tran khoa k" << endl;
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            cout << "Nhap k[" << i << "][" << j << "] = ";
            cin >> k[i][j];
        }
    }
    if (gcd(26, detK(k)) != 1) {
        cout << "Ma tran khoa k khong hop le!";
        return 0;
    }
    cout << "Nhap xau ki tu 1: ";
    string s1; cin >> s1;
    cout << "Nhap xau ki tu 2: ";
    string s2; cin >> s2;
    if (encryptHill(s1, k) == s2) cout << "Ban da nhap dung" << endl;
    else cout << "Ban da nhap sai" << endl;
}

/*
4
5
3
5
HELP
ODLA
*/
