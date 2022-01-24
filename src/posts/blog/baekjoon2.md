---
title: "13265번"
category: "BaekJoon"
date: "2022-01-18 19:18:00 +09:00"
desc: "색칠하기, BFS"
thumbnail: "./images/baekjoon/baekjoon.jpg"
alt: "markdown logo"
---

## 13265번

### 문제

<b>어린 토니킴은 색칠공부를 좋아한다.

토니킴은 먼저 여러 동그라미와 동그라미 두 개를 연결하는 직선들 만으로 그림을 그리고 (모든 동그라미들 사이에 직선이 있을 필요는 없다), 연결된 두 동그라미는 서로 색이 다르게 되도록 색을 칠하고자 한다.

이 그림을 색칠하는데 필요한 최소의 색의 개수를 구하는 문제는 어렵기 때문에 토니킴은 2 가지 색상으로 색칠이 가능한지의 여부만을 알고 싶어한다.

동그라미들의 번호와 동그라미들이 서로 연결된 직선에 대한 정보가 주어졌을 때, 이 동그라미들이 2 가지 색상으로 색칠이 가능한지 알아내자.</b>

### 입력

<b>입력의 첫 줄에는 테스트 케이스의 개수 T 가 주어진다.

그 다음 줄부터 각 테스트 케이스에 대해 동그라미의 개수 n(n<=1000)과 직선들의 개수 m(m<=100,000)이 주어지고, 그 다음 줄부터 m 줄에 걸쳐 동그라미들이 연결된 직선에 대한 정보가 주어진다. (x y) 로 주어지면 동그라미 x 와 동그라미 y 가 직선으로 서로 연결되었다는 의미이다. 동그라미들의 숫자는 1 부터 n 까지이다.</b>

### 출력

<b>각 테스트 케이스에 대해서 possible 이나 impossible 을 출력한다. 2 가지 색상으로 색칠이 가능하면 possible. 불가능하면 impossible 이다.</b>


🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱
> <b> BFS를 하면서 Visited 말고 Color라는 배열을 하나 더 만들어서 해당 조건을 충족시키도록 만들어주면 금방 해결할 수 있는 문제였다. 여기서 처음에 q.push로 뭐를 해야할지 에서 막혔는데, Node가 연결되지 않은 경우도 존재하므로 모든 Node에 대해서 한 번씩 탐색할 수 있도록 for문을 이용해야 했다. </b>

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <queue>

using namespace std;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    
    int run = 0;
    cin >> run;

    for(int i = 0 ; i < run ; i++) {
        int circle = 0, line = 0;
        cin >> circle >> line;
        vector<vector<int>> arr(circle+1);

        for(int j = 0 ; j < line ; j++) {
            int x = 0, y = 0;
            cin >> x >> y;
            
            arr[x].push_back(y);
            arr[y].push_back(x);
        }

        int error = 0;

        for(int m = 1 ; m <= circle ; m++) {
            int visited[circle+1] = {0,};
            int color[circle+1] = {0,};
            
            queue<int> q;

            q.push(m);
            visited[m] = 0;
            color[m] = 0;

            while(!q.empty()) {
                int node = q.front();
                q.pop();

                error = 0;
                for(int j = 0 ; j < arr[node].size(); j++) {
                    if(visited[arr[node][j]] == 0) {
                        visited[arr[node][j]] = 1;
                        if(color[node] == 1)
                            color[arr[node][j]] = 0;
                        else if(color[node] == 0)
                            color[arr[node][j]] = 1;
                        q.push(arr[node][j]);
                    }

                    if(color[node] == color[arr[node][j]]) 
                        error++;
                }

                if(error > 0) break;
            }
            if(error > 0) break;
        }

        if(error != 0) cout << "impossible" << endl;
        else cout << "possible" << endl;
    }

    return 0;
}
```