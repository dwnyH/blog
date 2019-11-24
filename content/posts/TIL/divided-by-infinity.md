---
title: 자바스크립트에서의 1 나누기 0
date: "2019-11-02"
template: "posts"
category: "TIL"
description: "1 나누기 0은 왜 무한대일까"
---

토요일날 진행하는 you don't know JS 독서 모임에서 1,2장 파트 이야기를 진행하다가 다음 예제에 대한 질문이 던져졌다.

```javascript
var a = 1 / 0; // Infinity
var b = -1 / 0; //-Infinity
```

**"왜 1 나누기 0이 무한대인가요?"**
예제를 보면서 당연시 넘어갔던 부분에 대해 한 분이 질문을 해주셨는데 답을 할 수가 없어 구글링을 해보았다. 스택오버플로우의 여러 답변들과 책의 내용을 총집합해보면 이유는 다음과 같다. 

자바스크립트에서 숫자는 부동소수점으로 표기되므로 0은 0.000xxx을 나타내는데, 1을 0.000xxx와 같은 값으로 나눈다고 치면 0.000xxx보다 더 작고 소수점 뒤의 자리수가 더 긴 수로 나눠질텐데, 이렇게 표현할 수 있는 범위를 넘어선 숫자를 Infinity로 표기하므로 값이 `Infinity`가 나오는 것이다.

이에 덧붙여 `0/0`은 1e-500/1e-600이 될 수도 있고 1e-600/1e-500 값이 될 수도 있는데 수치적으로 유의미 하지 않으므로 `NaN`을 리턴하는 것이라고 한다.

[출처: stackoverflow](https://stackoverflow.com/questions/27317517/make-division-by-zero-equal-to-zero)
