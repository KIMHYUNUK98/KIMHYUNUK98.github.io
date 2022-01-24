---
title: "문자열 압축"
category: "Programmers"
date: "2020-01-24 16:07:00 +09:00"
desc: "2020 KAKAO BLIND RECRUITMENT"
thumbnail: "./images/programmers/programmers.jpg"
alt: "apple big sur gradient"
---

문자열을 가지고 장난을 치는 문제라고 생각이 들었다. substr을 자유자재로 사용할 수 있는지, erase를 사용할 때의 index 문제점을 잘 파악하고 있는지를 물어보는 문제 같았다. 사실 원하는 결과값은 반복되는 문자열의 개수와 문자열의 크기이므로 이를 각각 구해서 더하는 방식으로 접근해도 된다. 복잡한 알고리즘을 요구하지는 않지만 조건을 잘 세워서 정답을 구할 수 있는 논리를 가지고 있는지를 파악하는 문제였다.

```cpp
#include <string>
#include <vector>
#include <iostream>

using namespace std;

int solution(string s) {
    int answer = 0;
    int total = 0;
    int count = 1;
    int min = 99999;
    string restore = s;
    string temp = "";
    
    // 문자열의 절반에 해당하는 길이보다 큰 경우는 없다.
    for(int i = 1 ; i <= s.size()/2 ; i++) {
        s = restore;
        
        // 반복되는 문자열을 Bubble sort 처럼 하나씩 비교하기 위한 for 문
        for(int j = 0; j < s.size() - 1 ; j = j + i) {
            
            // 시작점과 반복되는 문자열의 길이가 문장의 길이보다 큰 경우 break;
            if(j+i >= s.size()) break;
            
            // j index부터 i 길이 만큼 temp에 할당
            temp = s.substr(j, i);
            
            // 만약 temp와 그 다음 반복 문자열이 같은 경우
            if(temp == s.substr(j+i, i)) {
                
                // 반복되는 문자열 중 앞 부분을 지우고
                s.erase(j,i);
                
                // erase 한 만큼 반복문의 index를 땡겨준다.
                j = j - i;
                
                // 몇 번 반복되었는지 확인
                count++;
                
                // 만약 3번째 반복되는 문자열에서 반복됨이 끊긴다면 현재 탐지한 반복됨이
                // 마지막이므로 count한 것을 문자열로 변환시켜 그 길이가 얼마인지
                // total에 누적시킨다. 그리고 다시 count는 1로 초기화
                if(j+2*i <= s.size() && s.substr(j+i,i) != s.substr(j+2*i, i)) {
                    string one = to_string(count);
                    total += one.size();
                    count = 1;
                }
            }
        }
        // total 변수에 자른 문자열의 size와 total에 누적된 count 문자열의 길이를 더한다
        total = s.size() + total;
        
        // 만약 그것이 최소값이면 min에 최신화를 시켜준다.
        if(min > total) {
            min = total;
        }
        
        // 이 작업을 반복되는 문자열의 길이가 s.size()/2보다 작을때까지 시행하기 위한 준비
        count = 1;
        total = 0;
    }
    
    // 만약 min 이 최신화 되지 않았다면(반복되는 문자열이 없는 경우)
    if(min == 99999) answer = s.size();
    else answer = min;
    
    return answer;
}
```