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

void tichMatrix(int p[2], int k[2][2], int res[2]) {
    for (int i = 0; i < 2; i++) {
        res[i] = 0;
        for (int j = 0; j < 2; j++) {
            res[i] += p[j] * k[j][i];
        }
        res[i] %= 26;
    }
}

string encryptHill(string banRo, int k[2][2]) {
    string banMa = "", s = banRo;
    for (int i = 0; i < banRo.size(); i++) banRo[i] = toupper(banRo[i]);
    for (int i = 0; i < banRo.size(); i += 2) {
        int p[2] = {banRo[i] - 'A', banRo[i + 1] - 'A'};
        int res[2];
        tichMatrix(p, k, res);
        banMa += char(res[0]) + 'A';
        banMa += char(res[1]) + 'A';
    }
    for (int i = 0; i < s.size(); i++) {
        if (islower(s[i])) banMa[i] = tolower(banMa[i]);
    }
    return banMa;
}

int main() {
    int k[2][2];
    cout << "Nhap ma tran khoa k" << endl;
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            cout << "k[" << i << "][" << j << "] = ";
            cin >> k[i][j];
        }
    }
	string banRo, banMa;
    cout << "\nNhap ban ro: ";   cin >> banRo;
    cout << "\nNhap ban ma: ";   cin >> banMa;
	if (encryptHill(banRo, k) == banMa)
		cout << "\nBan da nhap dung!";
	else 
		cout << "\nBan da nhap sai!";
    return 0;
}

/*
4
5
3
5
HELP
ODLA
*/

/*
4
5
3
5
HELP
BCLA
*/
