---
title: "5582번"
category: "BaekJoon"
date: "2022-01-18 19:55:00 +09:00"
desc: "공통부분 문자열"
thumbnail: "./images/baekjoon/baekjoon.jpg"
alt: "markdown logo"
---

## 5582번

### 문제

**두 문자열이 주어졌을 때, 두 문자열에 모두 포함된 가장 긴 공통 부분 문자열을 찾는 프로그램을 작성하시오.**

**어떤 문자열 s의 부분 문자열 t란, s에 t가 연속으로 나타나는 것을 말한다. 예를 들어, 문자열 ABRACADABRA의 부분 문자열은 ABRA, RAC, D, ACADABRA, ABRACADABRA, 빈 문자열 등이다. 하지만, ABRC, RAA, BA, K는 부분 문자열이 아니다.**

**두 문자열 ABRACADABRA와 ECADADABRBCRDARA의 공통 부분 문자열은 CA, CADA, ADABR, 빈 문자열 등이 있다. 이 중에서 가장 긴 공통 부분 문자열은 ADABR이며, 길이는 5이다. 또, 두 문자열이 UPWJCIRUCAXIIRGL와 SBQNYBSBZDFNEV인 경우에는 가장 긴 공통 부분 문자열은 빈 문자열이다.**

### 입력
**첫째 줄과 둘째 줄에 문자열이 주어진다. 문자열은 대문자로 구성되어 있으며, 길이는 1 이상 4000 이하이다.**

### 출력
**첫째 줄에 두 문자열에 모두 포함 된 부분 문자열 중 가장 긴 것의 길이를 출력한다.**


##### 시간 초과 풀이

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <cstring>

using namespace std;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    
    string temp1 = "";
    string temp2 = "";
    cin >> temp1 >> temp2;
    int answer = 0;
    int count = 1;
    int max = 0;
    
    for(int i = 0 ; i < temp1.size() ; i++) {
        for(int j = 0 ; j < temp2.size() ; j++) {
            if(temp1[i] == temp2[j]) {
                answer++;

                while(true) {
                    if(temp1[i+count] == '\0' || temp2[j+count] == '\0') break;
                    if(temp1[i+count] == temp2[j+count]) 
                        answer++;
                    else 
                        break;
                    count++;
                }
            }
            if(max < answer)
                max = answer;

            // cout << temp1[i]  << max << " " ;
            count = 1;
            answer = 0;
        }
        //cout << endl;
    }

    cout << max << endl;

    return 0;
}

##### DP 풀이

#include <iostream> 
#include <string>
#include <algorithm> 

#define MAX 4002 
using namespace std; 
string a, b; 
int answer; 
int dp[MAX][MAX]; 

int main(void) { 
    cin.tie(NULL); 
    answer = 0; 
    
    cin >> a; cin >> b; 
    for (int i = 0; i < a.size(); i++) { 
        for (int j = 0; j < b.size(); j++) { 
            if (a[i] == b[j]) { 
                if (i == 0 || j == 0) { 
                    dp[i][j] = 1; 
                    answer = max(answer, dp[i][j]); 
                    continue; 
                } 
            dp[i][j] = dp[i - 1][j - 1] + 1; 
            answer = max(answer, dp[i][j]); 
            } 
        } 
    } 
    
    cout << answer << endl; 
    
    return 0; 
}
```