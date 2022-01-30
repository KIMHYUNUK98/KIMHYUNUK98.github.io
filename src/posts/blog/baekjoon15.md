---
title: "5014번"
category: "BaekJoon"
date: "2022-01-30 16:46:00 +09:00"
desc: "스타트 링크"
thumbnail: "./images/baekjoon/baekjoon.jpg"
alt: "markdown logo"
---

문제 유형이 같고 수능 수학 문제 행동영역 정리했던 기분이다.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>

using namespace std;

#define MAX 1000010

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    
    int F, S, G, U, D;
    queue<int> q;
    vector<int> visited(MAX, 0);
    vector<int> path(MAX, 0);
    cin >> F >> S >> G >> U >> D;

    q.push(S);
    visited[S] = 1;
    int count = 0;

    while(!q.empty()) {
        int node = q.front();
        q.pop();
        if(node == G) {
            cout << path[G] << endl;
            return 0;
        }

        if(node + U <= F && visited[node + U] == 0) {
            visited[node + U] = 1;
            q.push(node+U);
            path[node + U] = path[node] + 1;
        }
        if(node - D >= 1 && visited[node - D] == 0 ) {
            visited[node - D] = 1;
            q.push(node-D);
            path[node-D] = path[node] + 1;
        }
    }

    cout << "use the stairs" << endl;

    return 0;
}
```