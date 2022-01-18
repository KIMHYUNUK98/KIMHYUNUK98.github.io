---
title: "1919번"
category: "BaekJoon"
date: "2022-01-18 19:51:00 +09:00"
desc: "애너그램 만들기"
thumbnail: "./images/baekjoon/baekjoon.jpg"
alt: "markdown logo"
---

## 1919번

### 애너그램 만들기

### 문제

**두 영어 단어가 철자의 순서를 뒤바꾸어 같아질 수 있을 때, 그러한 두 단어를 서로 애너그램 관계에 있다고 한다. 예를 들면 occurs 라는 영어 단어와 succor 는 서로 애너그램 관계에 있는데, occurs의 각 문자들의 순서를 잘 바꾸면 succor이 되기 때문이다.**

**한 편, dared와 bread는 서로 애너그램 관계에 있지 않다. 하지만 dared에서 맨 앞의 d를 제거하고, bread에서 제일 앞의 b를 제거하면, ared와 read라는 서로 애너그램 관계에 있는 단어가 남게 된다.**

**두 개의 영어 단어가 주어졌을 때, 두 단어가 서로 애너그램 관계에 있도록 만들기 위해서 제거해야 하는 최소 개수의 문자 수를 구하는 프로그램을 작성하시오. 문자를 제거할 때에는 아무 위치에 있는 문자든지 제거할 수 있다.**

### 입력

**첫째 줄과 둘째 줄에 영어 단어가 소문자로 주어진다. 각각의 길이는 1,000자를 넘지 않으며, 적어도 한 글자로 이루어진 단어가 주어진다.**

### 출력
**첫째 줄에 답을 출력한다.**


- 🌱 **pair를 활용해서 겹치는 부분이 존재한다면 count를 증가시켜주는 방식**
- 🌱 **count 된 것을 전체 문자열의 길이의 합에서 빼주면 answer**
- 

    #include <iostream>
    #include <vector>
    #include <string>
    #include <cstring>

    using namespace std;

    int main() {
        ios::sync_with_stdio(0);
        cin.tie(0);
        
        vector<pair<char,int>> arr1;
        vector<pair<char,int>> arr2;
        
        string temp1 = "";
        string temp2 = "";
        cin >> temp1 >> temp2;
        
        for(int i = 0 ; i < temp1.size() ; i++) 
            arr1.push_back(make_pair(temp1[i], 0));
        
        for(int i = 0 ; i < temp2.size() ; i++)
            arr2.push_back(make_pair(temp2[i], 0));

        int count = 0;

        for(int i = 0 ; i < temp1.size() ; i++) {
            for(int j = 0 ; j < temp2.size() ; j++) {
                if(arr1[i].first == arr2[j].first && arr2[j].second == 0 && arr1[i].second ==0) {
                    arr1[i].second++;
                    arr2[j].second++;
                    count++;
                }
            }
        }

        int answer = arr1.size() + arr2.size() - 2*count;

        cout << answer << endl;

        return 0;
    }