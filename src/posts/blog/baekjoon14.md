---
title: "9205번"
category: "BaekJoon"
date: "2022-01-29 22:34:00 +09:00"
desc: "맥주 마시면서 걸어가기"
thumbnail: "./images/baekjoon/baekjoon.jpg"
alt: "markdown logo"
---

가능한 거리 이내의 node를 Adjacent list로 만들고 BFS를 한 결과 도달할 수 없으면 sad 도달할 수 있으면 happy를 출력하면 된다.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
#include <stack>
#include <cstring>
#include <map>

using namespace std;

#define MAX 102

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    
    int test_case = 0;
    
    cin >> test_case;

    for(int i = 0 ; i < test_case ; i++) {
        int cu = 0 ;
        cin >> cu;
        int visited[MAX];
        vector<vector<int>> graph(MAX);
        memset(visited, 0, sizeof(visited));

        vector<pair<int,int>> cord;

        for(int j = 0 ; j < cu+2 ; j++) {
            int x = 0, y = 0;
            cin >> x >> y;
            cord.push_back({x,y});
        }

        for(int j = 0 ; j < cord.size() - 1; j++) {
            for(int m = j+1 ; m < cord.size() ; m++) {
                int distance = abs(cord[m].first-cord[j].first) + abs(cord[m].second - cord[j].second);
                if(distance <= 1000) {
                    graph[j].push_back(m);
                    graph[m].push_back(j);
                }
            }
        }
        
        queue<int> q;
        
        q.push(0);
        visited[0] = 1;

        while(!q.empty()) {
            int node = q.front();
            q.pop();

            for(int j = 0 ; j < graph[node].size() ; j++) {
                if(visited[graph[node][j]] == 0) {
                    visited[graph[node][j]] = 1;
                    q.push(graph[node][j]);
                }
            }
        }
        
        if(visited[cu+1] == 1) cout << "happy" << endl;
        else cout << "sad" << endl;
    }

    return 0;
}
```

이 경우는 모든 경우에 대해서 탐색하는게 아니라 편의점이 순서대로 들어오는 경우를 가정하고 풀었던 코드.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
#include <stack>
#include <cstring>
#include <map>

using namespace std;

int dx[4] = {0,0,-1,1};
int dy[4] = {1,-1,0,0};

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    
    int test_case = 0;
    
    cin >> test_case;

    for(int i = 0 ; i < test_case ; i++) {
        int cu = 0;
        cin >> cu;
        multimap<int,int> map;

        for(int j = 0 ; j < cu+2 ; j++) {
            int x = 0, y = 0;
            cin >> x >> y;

            map.insert(make_pair(x,y));
        }
        
        int x_temp = 0, y_temp = 0;
        for(auto cnt : map) {
            int distance = (cnt.first - x_temp) + (cnt.second - y_temp);
            if(distance > 0) {
                if(distance > 1000) {
                    cout << "sad" << endl;
                    return 0;
                }
            }

            x_temp = cnt.first;
            y_temp = cnt.second;
        }
        cout << "happy" << endl;
    }
    
    return 0;
}
```