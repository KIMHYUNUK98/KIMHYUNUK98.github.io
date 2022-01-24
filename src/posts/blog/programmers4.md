---
title: "숫자 문자열과 영단어"
category: "Programmers"
date: "2020-01-24 16:10:00 +09:00"
desc: "2021 카카오 채용 연계형 인턴십"
thumbnail: "./images/programmers/programmers.jpg"
alt: "apple big sur gradient"
---

입력 받은 영어와 숫자가 조합된 문자열에서 하나하나 비교를 통해 case를 만들었다. 영어 문자열이 나오는 경우 정해진 단어의 길이를 생각해서 one 부터 nine까지를 분류했다.

```cpp
#include <string>
#include <vector>
#include <iostream>

using namespace std;

int solution(string s) {
    int answer = 0;
    string arr = "";
    
    for(int i = 0 ; i < s.size() ; i++) {
        if(s[i] >= '0' && s[i] <= '9') {
            arr.push_back(s[i]);
            continue;
        }
        
        if(s[i] == 'z' && s.substr(i,4) == "zero") { 
            arr.push_back('0'); 
            i = i + 3;
        }
        else if(s[i] == 'o' && s.substr(i,3) == "one") { 
            arr.push_back('1');
            i = i + 2;
        }
        else if(s[i] == 't' && s.substr(i,3) == "two") { 
            arr.push_back('2'); 
            i = i + 2;
        }
        else if(s[i] == 't' && s.substr(i,5) == "three") { 
            arr.push_back('3'); 
            i = i + 4;
        }
        else if(s[i] == 'f' && s.substr(i,4) == "four") { 
            arr.push_back('4'); 
            i = i + 3;
        }
        else if(s[i] == 'f'  && s.substr(i,4) == "five") { 
            arr.push_back('5'); 
            i = i + 3;
        }
        else if(s[i] == 's' && s.substr(i,3) == "six") { 
            arr.push_back('6'); 
            i = i + 2;
        }
        else if(s[i] == 's' && s.substr(i,5) == "seven") { 
            arr.push_back('7');
            i = i + 4;
        }
        else if(s[i] == 'e' && s.substr(i,5) == "eight") { 
            arr.push_back('8'); 
            i = i + 4;
        }
        else if(s[i] == 'n' && s.substr(i,4) == "nine") { 
            arr.push_back('9'); 
            i = i + 3;
        }
        else continue;
    }
    answer = stoi(arr);
    cout << arr << endl;
    return answer;
    
}

```