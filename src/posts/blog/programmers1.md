---
title: "카카오프렌즈 컬러링 북"
category: "Programmers"
date: "2020-01-24 16:04:00 +09:00"
desc: "2017 카카오 코드 예선"
thumbnail: "./images/programmers/programmers.jpg"
alt: "apple big sur gradient"
---

문제를 보고 인접한 Node를 탐색하는 DFS를 사용해야겠다 라는 생각이 들었다. DS에서 배운 DFS는 Adjacent List를 만들어서 탐색하는 방법이라 온종일 그 생각밖에 안 들어서 Adjacent List만 만들다가 다시 뜯어 고쳤다. 기본적으로 필요한 변수는 2차원 vector와 visited 유무를 판단하는 2차원 배열이면 모든 알고리즘을 충족할 수 있도록 만들 수 있다. 

MxN Matrix 처럼 주어지고 인접한 영역간의 관계를 물어보는 문제에서는 괜히 2차원 인접 리스트로 만들지 말고 dx, dy에 대한 변수를 할당하여 상, 하, 좌, 우를 탐색할 수 있는 알고리즘으로 작성할 수 있는 생각을 기르는 중..

```cpp
#include <vector>
#include <iostream>

using namespace std;

int dx[4] = {0, 0, -1, 1};
int dy[4] = {1, -1, 0, 0};
int visited[100][100] = {0,};

int dfs(int y, int x, int height, int width, vector<vector<int>> picture) {
    visited[y][x] = 1;
    int count = 1;
    
    for(int i =0 ; i < 4 ; i++) {
        int x_pos = x+dx[i];
        int y_pos = y+dy[i];
        
        if(x_pos >= width || x_pos < 0 || y_pos >= height || y_pos < 0) 
            continue;
        
        if(picture[y][x] == picture[y_pos][x_pos] && visited[y_pos][x_pos] == 0) {
            count += dfs(y_pos, x_pos, height, width, picture);
        }
        
    }
    
    return count;
}

// 전역 변수를 정의할 경우 함수 내에 초기화 코드를 꼭 작성해주세요.
vector<int> solution(int m, int n, vector<vector<int>> picture) {
    int number_of_area = 0;
    int max_size_of_one_area = 0;
    
    // 전역변수 초기화
    for(int i = 0 ; i < m ; i++) {
        for(int j = 0 ; j < n ; j++) {
            visited[i][j] = 0;
        }
    }
    
    // 방문한 적이 없고 해당 노드가 0이 아닌 경우 dfs를 호출
    for(int i = 0 ; i < m ; i++) {
        for(int j = 0 ; j < n ; j++) {
            if(picture[i][j] == 0 || visited[i][j] == 1)
                continue;
            else {
                number_of_area++;
                max_size_of_one_area = max(max_size_of_one_area,dfs(i,j, m, n, picture));
            }
        }
    }
    
    vector<int> answer(2);
    answer[0] = number_of_area;
    answer[1] = max_size_of_one_area;
    return answer;
}
```