---
title: "11437번"
category: "BaekJoon"
date: "2022-01-24 15:34:00 +09:00"
desc: "LCA (Longest Common Ancestor)"
thumbnail: "./images/baekjoon/baekjoon.jpg"
alt: "markdown logo"
---

시간 제한	메모리 제한	제출	정답	맞힌 사람	정답 비율
3 초	256 MB	12868	5694	3323	42.922%

## 문제
N(2 ≤ N ≤ 50,000)개의 정점으로 이루어진 트리가 주어진다. 트리의 각 정점은 1번부터 N번까지 번호가 매겨져 있으며, 루트는 1번이다.

두 노드의 쌍 M(1 ≤ M ≤ 10,000)개가 주어졌을 때, 두 노드의 가장 가까운 공통 조상이 몇 번인지 출력한다.

## 입력
첫째 줄에 노드의 개수 N이 주어지고, 다음 N-1개 줄에는 트리 상에서 연결된 두 정점이 주어진다. 그 다음 줄에는 가장 가까운 공통 조상을 알고싶은 쌍의 개수 M이 주어지고, 다음 M개 줄에는 정점 쌍이 주어진다.

## 출력
M개의 줄에 차례대로 입력받은 두 정점의 가장 가까운 공통 조상을 출력한다.

BFS 탐색 알고리즘으로 depth와 parent를 각각 설정해주고, LCA 함수로 넘어가는 두 파라미터의 깊이 관계와 Parent의 동일 여부를 가지고 가장 가까운 공통조상을 찾는 문제를 해결할 수 있다.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>

using namespace std;

#define MAX 50001

vector<vector<int>> arr(MAX);;
int visited[MAX] ={0,};
int depth[MAX] ={0,};
int parent[MAX] ={0,};

int LCA(int x, int y) {
    if(depth[x] > depth[y]) swap(x,y);

    while(depth[x] != depth[y]) y = parent[y];

    while(x != y) {
        x = parent[x];
        y = parent[y];
    }
    
    return x;
}

int main() {

    ios_base::sync_with_stdio(0);
    cin.tie(0);
    
    int num;
    cin >> num;

    for(int i = 0 ; i < num-1 ; i++) {
        int x, y;
        cin >> x >> y;
        arr[x].push_back(y);
        arr[y].push_back(x);
    }

    queue<int> q;
    
    q.push(1);
    visited[1] = 1;
    depth[1] = 1;
    parent[1] = 1;

    while(!q.empty()) {
        int node = q.front();
        q.pop();

        for(int j = 0 ; j < arr[node].size() ; j++) {
            if(visited[arr[node][j]] == 0) {
                visited[arr[node][j]] = 1;
                q.push(arr[node][j]);
                depth[arr[node][j]] = depth[node] + 1;
                parent[arr[node][j]] = node;
            }
        }
    }

    int count;
    cin >> count;
    for(int i = 0 ; i < count ; i++) {
        int x, y ;
        cin >> x >> y;
        cout << LCA(x,y) << endl;
    }

    return 0;
}
```
