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
    int res = k[0][0] * k[1][1] - k[0][1] * k[1][0];
    while (res < 26) res += 26;
    return res % 26;
}

void kNghichDao(int k[2][2], int res[2][2]) {
    int tmp[2][2] = {{k[1][1], -k[0][1]}, {-k[1][0], k[0][0]}};
    int det = oclitMoRong(26, detK(k));
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            while (tmp[i][j] < 0) tmp[i][j] += 26;
            res[i][j] = tmp[i][j] * det;
            res[i][j] %= 26;
        }
    }
}

int main() {
    cout << "Nhap vao so a: ";
    int a; cin >> a;
    cout << "Nhap vao so b: ";
    int b; cin >> b;
    cout << "Nhap vao so c: ";
    int c; cin >> c;
    cout << "Nhap vao so d: ";
    int d; cin >> d;
    int k[2][2] = {{a, b}, {c, d}};
    if (gcd(26, detK(k)) != 1) {
        cout << "Ma tran khoa khong hop le!";
        return 0;
    }
    int res[2][2];
    kNghichDao(k, res);
    cout << "Ma tran khoa giai ma la: ";
    cout << "{{" << res[0][0] << ", " << res[0][1] << "} {" << res[1][0] << ", " << res[1][1] << "}}" << endl;
}

/*
1
0
2
7
{{1, 0} {22, 15}}
*/