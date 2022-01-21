---
title: "2711번"
category: "BaekJoon"
date: "2022-01-21 16:42:00 +09:00"
desc: "오타맨 고창영"
thumbnail: "./images/baekjoon/baekjoon.jpg"
alt: "markdown logo"
---


## 문제
고창영은 맨날 오타를 낸다. 창영이가 오타를 낸 문장과 오타를 낸 위치가 주어졌을 때, 오타를 지운 문자열을 출력하는 프로그램을 작성하시오.

창영이는 오타를 반드시 1개만 낸다.

## 입력
첫째 줄에 테스트 케이스의 개수 T(1<=T<=1,000)가 주어진다. 각 테스트 케이스는 한 줄로 구성되어 있다. 첫 숫자는 창영이가 오타를 낸 위치이고, 두 번째 문자열은 창영이가 친 문자열이다. 문자열의 가장 첫 문자는 1번째 문자이고, 문자열의 길이는 80을 넘지 않고, 대문자로만 이루어져 있다. 오타를 낸 위치는 문자열 길이보다 작거나 같다.

## 출력
각 테스트 케이스에 대해 오타를 지운 문자열을 출력한다.

    #include <iostream> 
    #include <string>
    #include <algorithm> 

    using namespace std; 

    int main(void) { 
        cin.tie(NULL); 
        
        int num = 0;
        cin >> num;

        for(int i = 0 ; i < num ; i++) {
            int index = 0;
            string arr = "";
            cin >> index >> arr;

            arr.erase(index-1,1);

            cout << arr << endl;
        }

        
        return 0; 
    }