---
title: "9205번"
category: "BaekJoon"
date: "2022-01-22 23:12:00 +09:00"
desc: "맥주마시면서 걸어가기"
thumbnail: "./images/baekjoon/baekjoon.jpg"
alt: "markdown logo"
---

### 문제
송도에 사는 상근이와 친구들은 송도에서 열리는 펜타포트 락 페스티벌에 가려고 한다. 올해는 맥주를 마시면서 걸어가기로 했다. 출발은 상근이네 집에서 하고, 맥주 한 박스를 들고 출발한다. 맥주 한 박스에는 맥주가 20개 들어있다. 목이 마르면 안되기 때문에 50미터에 한 병씩 마시려고 한다. 즉, 50미터를 가려면 그 직전에 맥주 한 병을 마셔야 한다.

상근이의 집에서 페스티벌이 열리는 곳은 매우 먼 거리이다. 따라서, 맥주를 더 구매해야 할 수도 있다. 미리 인터넷으로 조사를 해보니 다행히도 맥주를 파는 편의점이 있다. 편의점에 들렸을 때, 빈 병은 버리고 새 맥주 병을 살 수 있다. 하지만, 박스에 들어있는 맥주는 20병을 넘을 수 없다. 편의점을 나선 직후에도 50미터를 가기 전에 맥주 한 병을 마셔야 한다.

편의점, 상근이네 집, 펜타포트 락 페스티벌의 좌표가 주어진다. 상근이와 친구들이 행복하게 페스티벌에 도착할 수 있는지 구하는 프로그램을 작성하시오.

### 입력
첫째 줄에 테스트 케이스의 개수 t가 주어진다. (t ≤ 50)

각 테스트 케이스의 첫째 줄에는 맥주를 파는 편의점의 개수 n이 주어진다. (0 ≤ n ≤ 100).

다음 n+2개 줄에는 상근이네 집, 편의점, 펜타포트 락 페스티벌 좌표가 주어진다. 각 좌표는 두 정수 x와 y로 이루어져 있다. (두 값 모두 미터, -32768 ≤ x, y ≤ 32767)

송도는 직사각형 모양으로 생긴 도시이다. 두 좌표 사이의 거리는 x 좌표의 차이 + y 좌표의 차이 이다. (맨해튼 거리)

### 출력
각 테스트 케이스에 대해서 상근이와 친구들이 행복하게 페스티벌에 갈 수 있으면 "happy", 중간에 맥주가 바닥나서 더 이동할 수 없으면 "sad"를 출력한다. 

### 가능한 거리 이내의 node를 Adjacent list로 만들고 BFS를 한 결과 도달할 수 없으면 sad 도달할 수 있으면 happy를 출력하면 된다.

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

이 경우는 모든 경우에 대해서 탐색하는게 아니라 편의점이 순서대로 들어오는 경우를 가정하고 풀었던 코드.

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