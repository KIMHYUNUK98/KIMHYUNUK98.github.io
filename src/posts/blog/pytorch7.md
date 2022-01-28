---
title: "PyTorch (Torch.nn 분해하기)"
category: "PyTorch_Study"
date: "2022-01-28 09:00:00 +09:00"
desc: "Torch.nn 분석"
thumbnail: "./images/deeplearning/pytorch_study.jpg"
alt: "markdown logo"
---


## Torch 함수 만들기

```python
from pathlib import Path
import requests

DATA_PATH = Path("data")
PATH = DATA_PATH / "mnist"

PATH.mkdir(parents=True, exist_ok=True)

URL = "https://github.com/pytorch/tutorials/raw/master/_static/"
FILENAME = "mnist.pkl.gz"

if not (PATH / FILENAME).exists():
        content = requests.get(URL + FILENAME).content
        (PATH / FILENAME).open("wb").write(content)
```
### PATH 설정
DATA_PATH 와 PATH에 대해 디렉토리 상수를 만들어주는 데 이때 Pathlib의 Path 사용하여 해당 디렉토리로 경로를 지정해주고 PATH 상수에는 mnist 파일까지 '/' 를 이용하여 이어준다. PATH.mkdir은 미리 지정해준 경로를 입력으로 하고 **parents flag가 True인 경우 상위 디렉토리를 포함하여 누락된 디렉토리를 작성**한다. 만일 parents flag가 False인 경우 FileNotFoundError를 반환하지만 여전히 누락된 디렉토리를 작성해준다. **exist_ok = True가 되면 FileExistError를 무시**해준다. mkdir의 메소드를 사용하게 되는 변수는 이전에 경로를 설정해주었던 PATH 입력 상수가 된다.

### FILE이 존재하지 않는 경우
URL과 FILENAME은 디렉토리에 **파일이 존재하지 않는 경우 http GET 방식을 활용해 content를 해당 DATA_PATH / PATH에 작성해줘야 하기 때문에 존재**하게 된다. if 문은 해당 경로에 파일이 존재하지 않는 경우 해당 URL / FILENAME 경로에 있는 gz 집 파일을 content에 저장하고 기존에 저장한 PATH / FILENAME 경로에 content에 저장한 내용을 write하게 된다. open("wb") 는 해당 파일을 WRITE 형식으로 열겠다는 것이고 write 매소드를 통해서 파일에 쓰고자 하는 것을 파라미터로 담게 된다.

```python
import pickle
import gzip

with gzip.open((PATH / FILENAME).as_posix(), "rb") as f:
        ((x_train, y_train), (x_valid, y_valid), _) = pickle.load(f, encoding="latin-1")
```

### gzip 활용
gzip은 **파일을 압축하고 압축된 파일을 푸는 인터페이스**를 제공해준다. open 매소드의 첫 번째 파라미터는 filename이 들어가는 데 실제 파일명이나 bytes 객체가 된다. 두 번째는 MODE를 얘기하는 것인데 r / rb / a / ab / w / wb / x / xb 는 Binary 모드인 경우 rt / at / wt / xt 는 Text 모드인 경우 사용된다. **DEFAULT 값은 rb 라고 한다.** 

### pickle이란?
**pickle 모듈을 사용하면 원하는 데이터를 자료형의 변경없이 파일로 저장해서 그대로 불러올 수 있다.** pickle로 데이터를 저장하거나 불러올 때는 바이트 형식으로 wb / rb 를 해야 한다. pickle.load는 파일을 한 줄씩 읽어오고 파일의 저장된 형식에 따라 x_train, y_train, x_valid, y_valid 값이 차례대로 저장된다.

```python
from matplotlib import pyplot
import numpy as np

pyplot.imshow(x_train[0].reshape((28, 28)), cmap="gray")
print(x_train.shape)
```

### matplotlib의 pyplot
**matplotlib의 pyploy 모듈은 각각의 함수를 사용해서 간편하게 그래프를 만들고 변화를 줄 수 있다.**
imshow 함수를 통해 화면에 출력하게 된다. 여기서 x_train 에 들어있는 값은 784 크기를 가진 (1 x 784) 벡터이기 때문에 28 x 28 의 형태로 reshape 함수를 통해서 변환을 해준다. 그리고 colormap은 흑백으로 처리하기 위해 gray scale을 사용한다. 여기서 x_train의 인덱스 값이 0으로 들어간 것은 해당 x_train의 데이터는 현재 50,000 개가 존재하기 때문에 가장 처음의 값을 사용한 것이다. 그래서 **x_train의 shape을 출력하게 되면 (50000, 784) 가 나온다.**

```python
import torch

x_train, y_train, x_valid, y_valid = map(
    torch.tensor, (x_train, y_train, x_valid, y_valid)
)
n, c = x_train.shape
print(x_train, y_train)
print(x_train.shape)
print(y_train.min(), y_train.max())
```
map 함수를 통해서 기존의 train과 valid를 torch.tensor의 형태로 Mapping을 시킨다. x는 50000개의 (28 x 28) 데이터를 tensor의 형태로 가지고 있고 y는 각각의 데이터가 어느 숫자에 대응되는지에 대한 정보를 50000개 가지고 있다.

```python
import math

weights = torch.randn(784, 10) / math.sqrt(784)
weights.requires_grad_()
bias = torch.zeros(10, requires_grad=True)
```

### Weight 초기화
**weights 들을 초기화할 때 Xavier's Initialization을 사용**한다. 그러기 위해서 784의 Sqrt 함수를 통해 나누게 되고 randn는 Normalized Distribution으로 정규분포 범위 안의 랜덤한 값을 할당하게 된다. **requires_grad를 하게 되면 모든 연산에 대해 추적**을 시작하고 Back Propagation을 진행할 때 자동 미분을 할 수 있게 한다. bias는 10개의 tensor 모두 0으로 할당을 하고 시작을 한다.

```python
def log_softmax(x):
    return x - x.exp().sum(-1).log().unsqueeze(-1)

def model(xb):
    return log_softmax(xb @ weights + bias)
```

### Activation function 만들기
기존의 activation function은 호출해서 사용했다면 이번에는 log_softmax 함수를 직접 만들어보자. log_softmax 함수는 기존의 SoftMax 함수를 보완해준다. **SoftMax는 Vanishing Gradient 문제를 발생할 가능성이 있는데 이를 해결해주는 게 log_SoftMax 함수**이다.

model 함수에서는 Input값 x에 대해서 log_softmax 함수를 사용하고 linear한 weight와 bias 1차 식을 통해 activation function 기능을 수행하게 된다.

```python
bs = 64  # 배치 크기

xb = x_train[0:bs]  # x로부터 미니배치(mini-batch) 추출
preds = model(xb)  # 예측
preds[0], preds.shape
print(preds[0], preds.shape)
```
### batch 간격으로 Train 하기
x_train의 **0번째 이미지부터 63번째 이미지**까지 총 64개의 Mini-batch를 추출해서 xb라는 변수에 담고 해당 값을 위에서 정의한 model 함수에 넣어 예측을 하게 된다.

```python
def nll(input, target):
    return -input[range(target.shape[0]), target].mean()

loss_func = nll
```

loss function을 정의하기 위해 기울기 계산 함수를 만들어준다. 위에서 보여주는 식은 Negative log-likelihood 함수이다.

```python
yb = y_train[0:bs]
print(loss_func(preds, yb))
```
y_train의 Label과 예측한 preds의 차이를 위에서 정의한 loss_func에 집어넣어 어떤 값을 내는지 확인한다.

```python
def accuracy(out, yb):
    preds = torch.argmax(out, dim=1)
    return (preds == yb).float().mean()
```
### Accuracy
다음은 정확도를 계산하기 위한 함수이다. out에 담겨져있는 0부터 9까지의 확률 중 가장 큰 값을 가지고 있는 index와 yb의 값이 동일한 경우 예측을 정확하게 한 경우가 된다.

## Training Loop 돌리기

```python
from IPython.core.debugger import set_trace

lr = 0.5  # 학습률(learning rate)
epochs = 2  # 훈련에 사용할 에폭(epoch) 수

for epoch in range(epochs):
    for i in range((n - 1) // bs + 1):
        #set_trace()
        start_i = i * bs
        end_i = start_i + bs
        xb = x_train[start_i:end_i]
        yb = y_train[start_i:end_i]
        pred = model(xb)
        loss = loss_func(pred, yb)

        loss.backward()
        with torch.no_grad():
            weights -= weights.grad * lr
            bias -= bias.grad * lr
            weights.grad.zero_()
            bias.grad.zero_()
```
### Training loop
epoch는 2번 돌아가고 Nested for문에서는 총 **50000번 중 64(Mini-batch)를 돌고 실행**을 하게 된다. start_i와 end_i는 각각 어디서부터 어디까지의 데이터로 학습을 해줄 지를 나타내주는 변수이고 이를 각각 위에서 정의한 model 함수, loss_func 함수를 통과시키고 Autograd를 이용해서 backward 호출을 하게 된다.

**torch.no_grad() 함수는 gradient 계산 context를 비활성화 해주는 함수**이다. learning_rate를 직접 계산해줘서 업데이트하고 있기 때문에 gradient를 트랙킹하지 않으므로써 메모리를 줄이고 연산속도를 증가시키는 역할을 한다.

## nn.functional

```python
import torch.nn.functional as F

loss_func = F.cross_entropy

def model(xb):
    return xb @ weights + bias
```

functional함수를 통해 위에서 만든 **activation function과 loss function을 대체**하게 된다. Negative log-likelihood 와 log-softmax 함수를 사용하는 경우 Pytorch는 이 둘을 결합한 CrossEntropy를 제공하고 있다. 위에 보이는 것 과 같이 weights와 bias에 대한 Matrix 연산만 해주면 된다.

### nn.Module

```python
from torch import nn

class Mnist_Logistic(nn.Module):
    def __init__(self):
        super().__init__()
        self.weights = nn.Parameter(torch.randn(784, 10) / math.sqrt(784))
        self.bias = nn.Parameter(torch.zeros(10))

    def forward(self, xb):
        return xb @ self.weights + self.bias

    model = Mnist_Logistic()
```

nn.Parameter를 이용해 Xavier's Initialization을 하고 bias도 0으로 초기화를 시켜준다. 그리고 Mnist_Logistic 함수를 인스턴스화 한다. (object를 생성해주는 것)

```python
def fit():
    for epoch in range(epochs):
        for i in range((n - 1) // bs + 1):
            start_i = i * bs
            end_i = start_i + bs
            xb = x_train[start_i:end_i]
            yb = y_train[start_i:end_i]
            pred = model(xb)
            loss = loss_func(pred, yb)

            loss.backward()
            with torch.no_grad():
                for p in model.parameters():
                    p -= p.grad * lr
                model.zero_grad()

fit()
```

weight와 bias를 일일이 계산해주는 것이 아니라 **model.parameter 메소드를 이용해서 빠지는 파라미터 없이 for문을 돌려주며 .grad 메소드를 통해서 자동 계산**이 가능하게 한다.

### nn.Linear

```python
class Mnist_Logistic(nn.Module):
    def __init__(self):
        super().__init__()
        self.lin = nn.Linear(784, 10)

    def forward(self, xb):
        return self.lin(xb)
```

weight와 bias를 일일이 계산해서 return을 해주는 것이 아닌 **forward 함수에서는 Constructor에서 정의한
Linear 함수를 통해 자동 계산**을 가능하게 한다.

### Optimizer

```python
from torch import optim

def get_model():
    model = Mnist_Logistic()
    return model, optim.SGD(model.parameters(), lr=lr)

model, opt = get_model()
print(loss_func(model(xb), yb))

for epoch in range(epochs):
    for i in range((n - 1) // bs + 1):
        start_i = i * bs
        end_i = start_i + bs
        xb = x_train[start_i:end_i]
        yb = y_train[start_i:end_i]
        pred = model(xb)
        loss = loss_func(pred, yb)

        loss.backward()
        opt.step()
        opt.zero_grad()

print(loss_func(model(xb), yb))
```

Optimizer로 SGD 함수를 사용하고 forward하기 위한 model 객체화와 업데이트를 위한 opt 변수를 이용해 Forward -> Loss 계산 -> Backward -> Optimzer 를 진행한다.

### Dataset

```python
from torch.utils.data import TensorDataset

train_ds = TensorDataset(x_train, y_train)

model, opt = get_model()

for epoch in range(epochs):
    for i in range((n - 1) // bs + 1):
        xb, yb = train_ds[i * bs: i * bs + bs]
        pred = model(xb)
        loss = loss_func(pred, yb)

        loss.backward()
        opt.step()
        opt.zero_grad()

print(loss_func(model(xb), yb))

```

TensorDataSet은 길이와 인덱싱 방법을 정의함으로써 텐서의 첫 번째 차원에 따라 반복, 인덱싱, 슬라이스 하는 방법을 제공한다.


### DataLoader

```python
from torch.utils.data import DataLoader

train_ds = TensorDataset(x_train, y_train)
train_dl = DataLoader(train_ds, batch_size=bs)

model, opt = get_model()

for epoch in range(epochs):
    for xb, yb in train_dl:
        pred = model(xb)
        loss = loss_func(pred, yb)

        loss.backward()
        opt.step()
        opt.zero_grad()

print(loss_func(model(xb), yb))


```

DataLoader는 **Mini-batch를 자동적으로 제공하고 있어서 반복하기 쉽게** 만들어준다. Nested for문을 보면 간편하게 train_dl로 표현한 것을 볼 수 있다. **자동적으로 배치 사이즈만큼 반복**을 시켜준다.


### Validation

Overfitting을 확인하기 위해 항상 검증 데이터셋이 있어야 한다. 훈련 데이터(training Data)를 섞는 것은 배치와 Overfitting과의 상관관계를 방지하기 위해 중요하다. 하지만 **검증 데이터(Validation Data)는 섞든 안섞든 동일**하다. 그러므로 **검증 데이터의 배치는 훈련 데이터의 배치의 2배만큼 키워서 손실을 더 빠르게 계산하도록 돕는다.**

```python
train_ds = TensorDataset(x_train, y_train)
train_dl = DataLoader(train_ds, batch_size=bs, shuffle=True)

valid_ds = TensorDataset(x_valid, y_valid)
valid_dl = DataLoader(valid_ds, batch_size=bs * 2)

model, opt = get_model()
```
```python
for epoch in range(epochs):
    model.train()
    for xb, yb in train_dl:
        pred = model(xb)
        loss = loss_func(pred, yb)

        loss.backward()
        opt.step()
        opt.zero_grad()

    model.eval()
    with torch.no_grad():
        valid_loss = sum(loss_func(model(xb), yb) for xb, yb in valid_dl)

    print(epoch, valid_loss / len(valid_dl))
```

Nested for 문 전에 model.train() 메소드를 항상 호출하고 Inference 전에 model.eval()을 호출한다. 이렇게 하면 각 epoch 이 끝날 때 검증 손실을 계산하고 출력하게 된다.

### fit()과 get_data() 생성

```python
def loss_batch(model, loss_func, xb, yb, opt=None):
    loss = loss_func(model(xb), yb)

    if opt is not None:
        loss.backward()
        opt.step()
        opt.zero_grad()

    return loss.item(), len(xb)
```

loss_batch 함수는 **training data와 validation_data를 한꺼번에 수행할 수 있게 해주는 함수**이다. optimizer가 none이 아닌 경우 Back Propagation을 진행해야 하는 Train의 경우이고 만약 None 인 경우 Optimizer를 전달하지 않으므로 메소드가 역전파를 수행하지 않는다는 의미를 가지고 있다.

```python
import numpy as np

def fit(epochs, model, loss_func, opt, train_dl, valid_dl):
    for epoch in range(epochs):
        model.train()
        for xb, yb in train_dl:
            loss_batch(model, loss_func, xb, yb, opt)

        model.eval()
        with torch.no_grad():
            losses, nums = zip(
                *[loss_batch(model, loss_func, xb, yb) for xb, yb in valid_dl]
            )
        val_loss = np.sum(np.multiply(losses, nums)) / np.sum(nums)

        print(epoch, val_loss)
```

fit 함수는 epoch을 수행하면서 DataLoader의 객체만큼 반복을 수행하는데, 위에서 정의한 loss_batch 함수를 활용해서 (이는 Training_data 와 Validation_data를 모두 수행한다.) model_eval()을 통해 loss와 num 을 계산하게 된다. val_loss는 loss의 확률에 대한 평균을 모두 더해서 계산된다.

```python
def get_data(train_ds, valid_ds, bs):
    return (
        DataLoader(train_ds, batch_size=bs, shuffle=True),
        DataLoader(valid_ds, batch_size=bs * 2),
    )
```

get_data 함수는 학습(Training) 및 검증(Validation)에 대한 DataLoader를 호출하는 함수이다.


### 3줄로 간략한 표현

```python
train_dl, valid_dl = get_data(train_ds, valid_ds, bs)
model, opt = get_model()
fit(epochs, model, loss_func, opt, train_dl, valid_dl)
```

get_data로 DataLoader를 호출하고 get_model() 을 통해 activation 및 Optimzer를 객체화 시키고 fit() 함수를 통해 Train과 Valid에 대한 결과값을 나타낼 수 있게 된다.

### CNN

```python
class Mnist_CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 16, kernel_size=3, stride=2, padding=1)
        self.conv2 = nn.Conv2d(16, 16, kernel_size=3, stride=2, padding=1)
        self.conv3 = nn.Conv2d(16, 10, kernel_size=3, stride=2, padding=1)

    def forward(self, xb):
        xb = xb.view(-1, 1, 28, 28)
        xb = F.relu(self.conv1(xb))
        xb = F.relu(self.conv2(xb))
        xb = F.relu(self.conv3(xb))
        xb = F.avg_pool2d(xb, 4)
        return xb.view(-1, xb.size(1))

lr = 0.1
```

conv1, conv2, conv3로 각 Layer를 정의하고 그 뒤에는 relu 함수를 배치시킨다. 마지막으로 avg_pooling을 통해서 평균화 작업을 거친다.

```python
model = Mnist_CNN()
opt = optim.SGD(model.parameters(), lr=lr, momentum=0.9)

fit(epochs, model, loss_func, opt, train_dl, valid_dl)
```

만든 CNN 모델을 model 변수로 객체화 시키고 optimzer는 momentum을 사용한 SGD 방식을 선언한다. fit() 함수를 통해서 Train과정과 Validation 과정을 거치게 된다.

### nn.Sequential

```python
class Lambda(nn.Module):
    def __init__(self, func):
        super().__init__()
        self.func = func

    def forward(self, x):
        return self.func(x)


def preprocess(x):
    return x.view(-1, 1, 28, 28)

model = nn.Sequential(
    Lambda(preprocess),
    nn.Conv2d(1, 16, kernel_size=3, stride=2, padding=1),
    nn.ReLU(),
    nn.Conv2d(16, 16, kernel_size=3, stride=2, padding=1),
    nn.ReLU(),
    nn.Conv2d(16, 10, kernel_size=3, stride=2, padding=1),
    nn.ReLU(),
    nn.AvgPool2d(4),
    Lambda(lambda x: x.view(x.size(0), -1)),
)

opt = optim.SGD(model.parameters(), lr=lr, momentum=0.9)

fit(epochs, model, loss_func, opt, train_dl, valid_dl)
```

Sequential은 그 안에 포함된 모듈을 순차적으로 실행할 수 있게 해준다. 
