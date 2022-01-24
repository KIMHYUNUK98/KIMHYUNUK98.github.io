---
title: "2042번"
category: "BaekJoon"
date: "2022-01-24 15:35:00 +09:00"
desc: "구간 합 구하기(세그먼트 트리)"
thumbnail: "./images/baekjoon/baekjoon.jpg"
alt: "markdown logo"
---


# 구간 합 구하기 


## 문제
어떤 N개의 수가 주어져 있다. 그런데 중간에 수의 변경이 빈번히 일어나고 그 중간에 어떤 부분의 합을 구하려 한다. 만약에 1,2,3,4,5 라는 수가 있고, 3번째 수를 6으로 바꾸고 2번째부터 5번째까지 합을 구하라고 한다면 17을 출력하면 되는 것이다. 그리고 그 상태에서 다섯 번째 수를 2로 바꾸고 3번째부터 5번째까지 합을 구하라고 한다면 12가 될 것이다.

## 입력
첫째 줄에 수의 개수 N(1 ≤ N ≤ 1,000,000)과 M(1 ≤ M ≤ 10,000), K(1 ≤ K ≤ 10,000) 가 주어진다. M은 수의 변경이 일어나는 횟수이고, K는 구간의 합을 구하는 횟수이다. 그리고 둘째 줄부터 N+1번째 줄까지 N개의 수가 주어진다. 그리고 N+2번째 줄부터 N+M+K+1번째 줄까지 세 개의 정수 a, b, c가 주어지는데, a가 1인 경우 b(1 ≤ b ≤ N)번째 수를 c로 바꾸고 a가 2인 경우에는 b(1 ≤ b ≤ N)번째 수부터 c(b ≤ c ≤ N)번째 수까지의 합을 구하여 출력하면 된다.

입력으로 주어지는 모든 수는 -263보다 크거나 같고, 263-1보다 작거나 같은 정수이다.

## 출력
첫째 줄부터 K줄에 걸쳐 구한 구간의 합을 출력한다. 단, 정답은 -263보다 크거나 같고, 263-1보다 작거나 같은 정수이다.

## 내 생각
세그먼트 트리 알고리즘을 처음 공부할 수 있었던 기회였다. Binary Search Tree와 비슷하게 다가왔고 Recursive 하게 트리를 만들고 (Tree를 만든다는 말에서 진짜 Tree구조를 만드는 것이 아니라 Vector 배열을 가지고 Index의 Parent화 Child화를 하는 것을 의미한다. 난 착각을 참 많이 했어서...ㅋㅎㅎ) 값을 변경하는 함수와 배열의 어느 구간까지의 덧셈을 하는 함수를 구현하는 방법을 공부했다.

세그먼트 트리 알고리즘을 왜 쓰지? 라는 생각을 했었는데 다음은 해당 알고리즘을 알지 못하고 문자열로 입력받은 후 덧셈을 처리한 과정을 구현한 코드이다.(엥 어디갔지.. 암튼 to_stirng이랑 stoi로 2^64을 커버하려고 했었다.) 당연히 시간초과가 걸렸고 O(logN) 만큼 복잡도를 내려야 했다.

```cpp
#include <iostream>
#include <vector>
#include <math.h>

#define MAX 1000000

using namespace std;
int n, m, k;
//1<=n<=1000000
//1<=m,k<=10000
long long arr[MAX];

long long makeSegmentTree(vector<long long> &segmentTree, int node, int start, int end) {
    // 시작범위 == 끝 범위이면 재귀함수 Return을 해준다.
    if (start == end) {
        // Leaf Node를 만난 경우이므로 해당 node에 값을 할당한다.
        return segmentTree[node] = arr[start];
    }

    int mid = (start + end) / 2;
    int leftChildNode = makeSegmentTree(segmentTree, node*2, start, mid);
    int rightChildNode = makeSegmentTree(segmentTree, node*2 +1 , mid+1, end);

    return segmentTree[node] = leftChildNode + rightChildNode;
    
}

void updateSegmentTree(vector<long long> &segmentTree, int node, int start, int end,int idx, long long diff) {
    // 바꿔야 하는 index가 (여기서는 하나) 주어진 범위를 벗어나면 return 한다.
    if (idx < start || idx > end) return;

    // 주어진 범위 안에 있다면 1번 노드의 값에 차이(diff)만큼 더해준다.
    segmentTree[node] += diff;

    // leaf node를 갈때까지 자녀 Node의 값을 모두 바꿔준다.
    if (start != end) {
        int mid = (start + end) / 2;
        updateSegmentTree(segmentTree, node * 2, start, mid, idx, diff);
        updateSegmentTree(segmentTree, node * 2 + 1, mid + 1, end, idx, diff);
    }
}

long long sumSegmentTree(vector<long long> &segmentTree, int node, int left, int right, int start, int end) {
    // 주어진 범위를 벗어나면 return 해준다.
    if (left>end || right<start) return 0;

    // 주어진 범위 안에 있으면 해당 node의 값이 summation 한 값이다.
    if (left <= start && right >= end) return segmentTree[node];


    int mid = (start + end) / 2;
    int leftChildNode = sumSegmentTree(segmentTree, node*2, left, right, start, mid);
    int rightChildNode = sumSegmentTree(segmentTree, node*2 +1 , left, right, mid+1, end);

    return leftChildNode + rightChildNode;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);

    cin >> n >> m >> k;

    // long long 배열에 값을 넣어준다.
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    // Node의 개수에 따른 높이 연산
    int treeDepth = ceil(log2(n));

    // 트리의 높이에 따른 필요한 Node 수 계산
    int treeSize = 1 << (treeDepth + 1);

    // 필요한 Node 수 만큼 트리를 생성한다,
    vector<long long> segmentTree(treeSize);
    
    // 1번 노드를 Root노드로 하는 세그먼트 트리를 만들어준다.
    makeSegmentTree(segmentTree,1,0,n-1);

    for (int i = 0; i < m + k; i++) {
        int order, left;
        long long right;
        cin >> order>> left >> right;
        if (order == 1) {
            // 값을 바꾸는 경우
            updateSegmentTree(segmentTree, 1, 0, n - 1, left - 1, right-arr[left - 1]);
            // arr의 값을 바꿔준다.
            arr[left - 1] = right;
        }
        else {
            //sum
            cout << sumSegmentTree(segmentTree, 1, left-1, right-1, 0, n - 1)<<'\n';
        }
    }
    return 0;
}
```