---
title: 문자열에 빌려쓸 수 있는/없는 배열 메서드
date: "2019-10-29"
template: "posts"
category: "TIL"
description: "'You don't know JS'책을 지희와 논의하면서 알게된 사실"
---

**You don't know JS책**의 **Chapter 2 값**에 이런 내용이 있다.
`문자열을 다룰 때 유용한 대부분의 배열 메서드는 사실상 문자열에 쓸 수 없지만, 문자열에 대해 불변 배열메서드를 빌려 쓸 수는 있다.`

이와 함께 따라온 예제는 다음과 같다.

```javascript
  var a = 'foo';
  a.join; // undefined
  a.map; // undefined

  var c = Array.prototype.join.call(a, '-'); // 'f-o-o'
  var d = Array.prototype.map.call(a, 
    (v) => v.toUpperCase();
  ).join(''); // "FOO"
```

텍스트로 봐서는 무슨말인지 감이 잘 안왔는데, 예제를 보니 조금 감이 왔다. 문자열에서 바로 배열메서드에 접근해 쓸 수는 없지만, 배열메서드에 문자열을 할당하는 방식으로는(빌려쓰는 방식으로는) 사용이 가능하다는 이야기로 이해했다.

그런데 이 뒤 바로 다음 글에 `불행히도 문자열은 불변 값이라 바로 변경되지 않으므로 배열의 가변 메서드는 통하지 않고, 그래서 '빌려 쓰는 것' 또한 안된다`라며 가변메서드를 빌려쓰는 다음 예제가 나온다.

```javascript
  var a = 'foo'
  Array.prototype.reverse.call(a); // 불가능
```

??? 이해가 가지 않았다. 일단 1. 불변/가변메서드가 무엇인지 부터 이해가 안가고, 2. 왜 가변메서드는 빌려쓸 수 없는지도 이해가 안되었다.

그래서 책을 먼저 읽은 지희한테 이 내용을 이야기했고, 논의끝에 지희가 1번에 대한 정의를 내려주었다. `join`메서드와 `map`으로는 원래 값이 변경되지 않은채 새로운 배열형태가 return되지만, reverse의 경우 원래의 값도 변경시키기 때문에 전자의 것은 불변, 후자의 것은 가변이라는 것이다. 

어느정도 궁금증은 해소되었으나 그래도 코드적으로 문자열에서 가변적인 메서드접근이 왜 안되는지 궁금했는데 지희가 이번엔 ECMAScript 명세를 관리하는 [tc39사이트][https://tc39.es]를 참고해보라고 알려주었다. 이곳에 `join`, `map`, `reverse`와 같은 Array 메소드들이 pseudo code 형태로 어떻게 구현되어있는지 설명되어있다.

먼저 tc39사이트에 [Array.prototype.join][https://tc39.es/ecma262/#sec-array.prototype.join]가 pseudo code 형태로 작성된 것을 보면, 반복문을 돌면서 join하는 과정을 거치기 전에 빈 문자열을 할당하고 그 문자열에 join할 대상과 join 인자로 들어오는 seperator를 하나씩 결합키는 형태이다. 맨 처음 부분에서 join할 대상(ex. 문자열)을 Object화 시키고 join이 이루어질 때 index에 해당하는 property만 하나씩 잡아 새로운 문자열에 할당하기 때문에 원래 대상을 변화시키지 않아 가능한 것이다. 

두 번째로 [Array.prototype.map][https://tc39.es/ecma262/#sec-array.prototype.map]의 pseudo code를 살펴보면, 맨 처음에 map의 대상도 똑같이 Object화 시킨다. 그리고 나서 새 배열을 할당하고 현재 index에 해당하는 property에 접근해 mapping된 형태를 차례로 새 배열에 넣어주는 형태로 되기 때문에 원래 문자열을 변경시키지 않으므로 문자열에 map 메소드 사용이 가능하다.

마지막으로 **가변적 메서드**인 [Array.prototype.reverse][https://tc39.es/ecma262/#sec-array.prototype.reverse]을 살펴보면, 이 역시 처음 reverse할 대상을 Object화시키는것으로 나온다. 그러나 위의 메서드들과 달리, Object화된 대상에 get만 이용하는 것이 아니라 set을 이용하여 하위 인덱스와 상위 인덱스에 해당하는 값을 직접 변경시켜준다. 배열은 가변값이기 때문에 위 속성이 가능하지만, 문자열은 불변값이기 때문에 불가능한 것이다.

일년 전 자바스크립트의 원시값, 참조값 등의 개념을 배우면서 값에 대한 개념은 어느정도 안다고 생각했는데 이렇게 다시 조금만 응용해서 설명하면 아직 헷갈리는 부분이 있는 것 같다. 책을 보게 되어서 다행이라는 생각이 들었다 :)
