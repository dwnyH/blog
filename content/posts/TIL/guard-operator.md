---
title: "Optional Chaining"
date: "2019-11-17"
template: "posts"
category: "TIL"
description: "Ecma TC39의 proposal로 자바스크립트 발전동향 알아보기"
---

이 포스팅은 가드연산자보다 `Ecma TC39 propsal`을 알게된 부분을 작성하고 싶어 쓰게 되었다. 어제 You Don't Know JS 네번째 모임에서 가드연산자 부분에 대한 이야기를 다루는데 어떤분이 이 가드연산자를 편하게 쓸 수 있는 [optional chaining](https://github.com/tc39/proposal-optional-chaining)에 대하여 말씀해주셨다.

간단하게 말하자면, 가드연산자는 `&&`의 첫번째 피연산자의 평가 결과가 truthy일 때 두 번째 연산자를 선택하는 것인데, 주로 `object && object.property` 이런식으로 많이 쓰이며, 나도 실제로 많이 사용하고 있는 연산자였다. 

그런데 현재 tc39의 proposal로 등록되어 stage3까지 가서 자바스크립트 문법에 도입될 확률이 높은 `Optional Chaining`이라는 것을 사용하게 되면 위의 가드연산자로 표현한 구문을 더 간결하게 표현할 수 있다는 것이다. 

```javascript

function () {
  // Guard Operator 이용
  var value = object && object.property;

  // Optional Chaining 이용
  var value = object?.property;
}
```

간결하게 표현될 수 있다는 사실도 놀라웠지만, 사실 이런 동향을 살필 수 있다는 사실을 처음 알게되어 무척 흥미로웠다. 위의 Optional Chaining 설명에는 `Nullish coalescing operator` 라는 또 다른 proposal 연산자도 함께 설명하는 구문이 있어서 다른 proposal도 확인해 볼 수 있었는데, 이 역시 stage3에 들어가 도입될 확률이 높은 문법이다.

이는 다음 예제와 같이 || 연산자를 이용해 앞에 값이 falsy일 경우에 두번째 피연산자값을 이용하게 하는 방식을 보완하기 위한 방법이다.

``` javascript
const headerText = response.settings.headerText || 'Hello, world!';
const animationDuration = response.settings.animationDuration || 300; 
const showSplashScreen = response.settings.showSplashScreen || true; 
```

OR 연산자의 좌측 값이 null 또는 undefined임을 가정하며 위와 같은 구문들을 작성하지만, 좌측의 값이 Boolean타입으로 변환된 후 측정되기 때문에 값이 `'', 0, false` 와 같이 의도된 값이라도 falsy로 판단되는 경우가 있다. 이와 같은 예기치 못한 상황을 막기 위해 고안된 것이 `Nullish coalescing operator`인 것이다.

```javascript
const headerText = response.settings.headerText ?? 'Hello, world!';
const animationDuration = response.settings.animationDuration ?? 300; 
const showSplashScreen = response.settings.showSplashScreen ?? true; 
```
OR 연산자 대신에 ?? 라는 nullish coalescing 연산자를 이용하여 앞의 값이 null 또는 undefined일 경우에만 연산자 우측값을 리턴하도록 하게 해주는 방식이다. 

`ECMA TC39`에 가보면 정말 수많은 proposal들이 있다. 아직은 자바스크립트밖에 안써봤고 불편함을 느끼기보다는 주어진 것 내에서 잘해야겠다는 생각만 가지고 있었는데 이렇게 더 나은방법을 고안하고 제기해주는 일들이 일어난다는 것이 무척 흥미로웠다. 아직은 기존 문법을 더 정확히 이해하는 데에 시간을 더 많이 쓰지만 시간이 날 때 틈틈히 최신 동향도 살펴보아야겠다는 생각이 들었다.
