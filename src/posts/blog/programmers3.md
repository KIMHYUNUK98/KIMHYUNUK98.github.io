---
title: "오픈 채팅방"
category: "Programmers"
date: "2020-01-24 16:08:00 +09:00"
desc: "2019 KAKAO BLIND RECRUITMENT"
thumbnail: "./images/programmers/programmers.jpg"
alt: "apple big sur gradient"
---

공백이 포함된 문자열인 stringstream을 사용하는 법을 처음 배웠다. 일일이 if문을 통해서 substr로 비교를 했고 이를 통해 Test Case를 통과한 방법은 구현을 했으나 Time Problem으로 실패했었다. Stringstream을 통해서 간편히 원하는 단어를 뽑아내고 If 문을 활용해서 원하는 논리로 구현시킬 수 있었다. Map 의 경우도 insert(make_pair)의 방법을 사용하고 find("찾고자 하는 문자열")->second 이렇게 선언해서 할당을 했었다. 이제는 원하는 문자열을 index화 시켜서 할당을 해도 될 것 같다.

사실 이 알고리즘은 구글에 존재하는 방법 중 하나이다. 그래도 배운건 배운 거니...

```cpp
#include <string>
#include <vector>
#include <iostream>
#include <sstream>
#include <map>

using namespace std;

vector<string> solution(vector<string> record) {
    vector<string> answer;
    map<string,string> map;
    vector<string> sent;
    
    // record의 크기만큼 반복한다.
    for(int i =0 ; i < record.size() ; i++) {
        string str[3];
        string token;
        
        // 공백이 있는 문자열을 입력받기 위한 stringstream 선언
        stringstream ss(record[i]);
        int count = 0;
        
        // 문자열 ss에 해당하는 것을 공백을 기준으로 token(string)에 해당하는 것이 존재할 경우
        // str 배열에 해당하는 token을 담는다.
        while(ss >> token) {
            str[count++] = token;
        }
        
        // 만약 처음 들어오는 단어가 Enter인 경우
        if(str[0] == "Enter") {
            // sent 벡터에는 들어온 순서대로 push_back을 해서 대기시켜 놓는다.
            sent.push_back("님이 들어왔습니다.");
            
            // answer에는 이름이 아닌 id를 먼저 저장시킨다.
            answer.push_back(str[1]);
            
            // map에서 id에 해당하는 username을 저장시키는 방법
            map[str[1]] = str[2];
        }
        else if(str[0] == "Leave") {
            // Leave의 경우도 sent 벡터에 push_back
            sent.push_back( "님이 나갔습니다.");
            
            // answer에 id를 저장시킨다.
            answer.push_back(str[1]);
        }
        else {
            // Change의 경우 해당하는 id에 변경된 이름을 할당한다.
            map[str[1]] = str[2];
        }
    }
    
    for(int i =0 ; i < answer.size() ; i++) {
        // answer에 누적된 id에 해당하는 username을 map을 이용해서 치환을 해준다.
        answer[i] = map[answer[i]] + sent[i];
    }
    
    return answer;
}
```

StringStream알기 이전 substr로 문자열을 분리했을 때

```cpp
#include <string>
#include <vector>
#include <iostream>
#include <sstream>
#include <unordered_map>

using namespace std;

vector<string> solution(vector<string> record) {
    vector<string> answer;
    vector<int> space(2,0);
    unordered_map<string,string> map;
    int count = 0 ;
    
    for(int i = 0 ; i < record.size() ; i++) {
        for(int j = 0 ; j < record[i].size() ; j++) {
            if(record[i][j] == ' ') space[count++] = j;
            
        }
        if(record[i][0] == 'E') {
            string id = record[i].substr(space[0]+1, space[1]-space[0]-1);
            string name = record[i].substr(space[1]+1, record[i].size()-space[1]-1);
            if(map.find(id) != map.end())
                map.find(id)->second = name;
            else map.insert(make_pair(id, name));
            answer.push_back(id + "님이 들어왔습니다.");
         } else if(record[i][0] == 'L') {
            string id = record[i].substr(space[0]+1, record[i].size()-space[0]-1);
            answer.push_back(id + "님이 나갔습니다.");
         } else if(record[i][0] == 'C') {
            string id = record[i].substr(space[0]+1, space[1]-space[0]-1);
            string name = record[i].substr(space[1]+1, record[i].size()-space[1]-1);
            map.find(id)->second = name;
         }
        count = space[0] = space[1] = 0;
    }

    for(int i =0 ; i < answer.size() ; i++) {
        for(int j =0 ; j < answer[i].size() ; j++) {
            if(answer[i][j] == ' ') {
                string userid = answer[i].substr(0, j-6);
                answer[i].replace(0,j-6, map.find(userid)->second);
            }
        }
    }
    
    return answer;
}
```