---
title: "7562번"
category: "BaekJoon"
date: "2022-01-21 16:44:00 +09:00"
desc: "나이트 움직이기"
thumbnail: "./images/baekjoon/baekjoon.jpg"
alt: "markdown logo"
---


## 문제
체스판 위에 한 나이트가 놓여져 있다. 나이트가 한 번에 이동할 수 있는 칸은 아래 그림에 나와있다. 나이트가 이동하려고 하는 칸이 주어진다. 나이트는 몇 번 움직이면 이 칸으로 이동할 수 있을까?



## 입력
입력의 첫째 줄에는 테스트 케이스의 개수가 주어진다.

각 테스트 케이스는 세 줄로 이루어져 있다. 첫째 줄에는 체스판의 한 변의 길이 l(4 ≤ l ≤ 300)이 주어진다. 체스판의 크기는 l × l이다. 체스판의 각 칸은 두 수의 쌍 {0, ..., l-1} × {0, ..., l-1}로 나타낼 수 있다. 둘째 줄과 셋째 줄에는 나이트가 현재 있는 칸, 나이트가 이동하려고 하는 칸이 주어진다.

## 출력
각 테스트 케이스마다 나이트가 최소 몇 번만에 이동할 수 있는지 출력한다.

    #include <iostream> 
    #include <string>
    #include <algorithm> 
    #include <queue>
    #include <cstring>

    using namespace std; 

    int dx[8] = {1,2,2,1,-1,-2,-2,-1};
    int dy[8] = {-2,-1,1,2,2,1-1,-2};

    int main(void) { 
        cin.tie(NULL); 
        
        int num = 0;
        cin >> num;

        int srcx, srcy, destx, desty;

        for(int i = 0 ; i < num; i++) {
            int len = 0;
            cin >> len;
            cin >> srcx >> srcy;
            cin >> destx >> desty;

            int visited[301][301] = {0,};
            int count[301][301] = {0,};
            memset(count, 0, sizeof(count));
            memset(visited, 0, sizeof(visited));

            queue<pair<int,int>> q;

            q.push({srcy, srcx});
            visited[srcy][srcx] = 1;
            if(srcy == desty && srcx == destx) {
                cout << 0 << endl;
                continue;
            }
            int answer = 0;
            int end = 0;

            while(!q.empty()) {
                int nodey = q.front().first;
                int nodex = q.front().second;
                q.pop();

                for(int k = 0 ; k < 8 ; k++) {
                    int tempy = nodey + dy[k];
                    int tempx = nodex + dx[k];
                    if(tempy >= 0 && tempy <= len-1 && tempx >= 0 && tempx <= len-1 
                        && visited[tempy][tempx] == 0) {
                            count[tempy][tempx] = count[nodey][nodex] + 1;
                            visited[tempy][tempx] = 1;
                            q.push({tempy, tempx});
                            if(tempy == desty && tempx == destx) {
                                end = 1;
                                answer = count[tempy][tempx];
                            }
                        }
                }
                if(end == 1) break;
            }
            cout << answer << endl;
        }
        

        return 0; 
    }