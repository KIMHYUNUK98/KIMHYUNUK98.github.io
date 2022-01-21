---
title: "5525번"
category: "BaekJoon"
date: "2022-01-21 16:43:00 +09:00"
desc: "IOIOI"
thumbnail: "./images/baekjoon/baekjoon.jpg"
alt: "markdown logo"
---


## 문제
N+1개의 I와 N개의 O로 이루어져 있으면, I와 O이 교대로 나오는 문자열을 PN이라고 한다.

P1 IOI
P2 IOIOI
P3 IOIOIOI
PN IOIOI...OI (O가 N개)
I와 O로만 이루어진 문자열 S와 정수 N이 주어졌을 때, S안에 PN이 몇 군데 포함되어 있는지 구하는 프로그램을 작성하시오.

## 입력
첫째 줄에 N이 주어진다. 둘째 줄에는 S의 길이 M이 주어지며, 셋째 줄에 S가 주어진다.

## 출력
S에 PN이 몇 군데 포함되어 있는지 출력한다.

## 제한
1 ≤ N ≤ 1,000,000
2N+1 ≤ M ≤ 1,000,000
S는 I와 O로만 이루어져 있다.

----

    #include <iostream> 
    #include <string>
    #include <algorithm> 

    using namespace std; 

    int main(void) { 
        cin.tie(NULL); 
        
        int num;
        cin >> num;

        string answer = "";
        for(int i = 0 ; i < 2*num + 1 ; i++) {
            if(i % 2 == 0)
                answer += 'I';
            else 
                answer += 'O';
        }

        int len;
        cin >> len;

        string arr = "";
        cin >> arr;
        
        int count = 0;

        for(int i = 0 ; i < len - 2*num ; i++) {
            if(answer == arr.substr(i,2*num+1)) {
                count++;
            }
        }


        cout << count << endl;
        
        return 0; 
    }