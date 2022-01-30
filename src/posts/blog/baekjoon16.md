---
title: "1697번"
category: "BaekJoon"
date: "2022-01-30 16:46:00 +09:00"
desc: "숨바꼭질"
thumbnail: "./images/baekjoon/baekjoon.jpg"
alt: "markdown logo"
---

BFS 처럼 가면 모든 경우의 수를 찾을 수 있다. DFS처럼 생각을 했었다. 주변에 갈 수 있는 곳에 대한 모든 고려를 하면서 원하는 node와 만나면 break 하게 하면 알고리즘 끝.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    
    vector<int> visited(100010, 0);
    vector<int> path(100010, 0);
    queue<int> q;

    int start = 0, end = 0;
    cin >> start >> end;

    q.push(start);
    visited[start] = 1;
    
    while(!q.empty()) {
        int node = q.front();
        if(node == end) break;
        q.pop();

        if(visited[node+1] == 0 && node + 1 >= 0 && node + 1 < 100001) {
            q.push(node+1);
            visited[node+1] = 1;
            path[node+1] = path[node] + 1;
        } 
        if(visited[node-1] == 0 && node - 1 >= 0 && node - 1 < 100001) {
            q.push(node-1);
            visited[node-1] = 1;
            path[node-1] = path[node] + 1;
        } 
        if(visited[node*2] == 0 && node*2 >= 0 && node*2 < 100001){
            q.push(node * 2);
            visited[node*2] = 1;
            path[node*2] = path[node] + 1;
        }

    }

    cout << path[end];

    return 0;
}
```