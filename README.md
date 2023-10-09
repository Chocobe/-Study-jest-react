# React 컴포넌트 유닛 테스트를 위한 Jest 스터디

* 강좌: (인프런) 따라하며 배우는 리액트 테스트
* 강사: John Ahn
* 링크: [따라하며 배우는 리액트 테스트](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8/dashboard)

<hr />

1. [Jest 파일 구조 & 사용법](#1)
1. [React testing library 주요 API](#2)
1. [쿼리 함수에 대해서](#3)
1. [Jest 에 대한 Eslint 설정](#4)
1. [TDD (테스트 주도 개발)](#5)
1. [FiringEvents API 를 사용하여, 사용자 인터렉션 테스트하기](#6)
1. [권장 Query 우선 순위](#7)
1. [fireEvent API 대신 userEvent API 사용하기](#8)



<br /><hr /><br />



###### 1
# 1. Jest 파일 구조 & 사용법

Jest 를 사용한 테스트 파일은 `describe()` 와 `it()` 으로 구성합니다.

* `it()`: 하나의 테스트 케이스
* `expect()`: 복수의 `it()` 을 묶는 그룹 단위

<br />

`it()` 은 callback 함수를 인자로 받으며, 이 callback 함수에 테스트 케이스를 작성 합니다.

callback 은 `expect()` 로 테스트 대상 값을 지정하고, `matcher 함수` 로 테스트 성공 여부를 파악 합니다.

<br />

```javascript
import { 
  render, 
  screen,
} from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```



<br /><hr /><br />



###### 2
# 2. React testing library 주요 API

React 컴포넌트를 테스트하기 위해서는 `React testing library` 를 사용하여 `Node` 를 만들고 Jest 로 테스트를 수행합니다.

* `render()`: React 컴포넌트를 `Node` 로 렌더링 합니다.
* `쿼리 함수`: `Node` 로 만든 React 컴포넌트 내부에서 특정 요소(Element) 를 찾습니다.
* `matcher 함수`: `쿼리 함수` 로 찾은 요소(Element) 가 테스트 통과인지 실패인지를 판단합니다.

<br />

* 모든 `matcher` 공식 문서
    * [jest-dom](https://github.com/testing-library/jest-dom#custom-matchers)
* 모든 `쿼리 함수` 공식 문서
    * [Testing Library](https://testing-library.com/docs/queries/about)



<br /><hr /><br />



###### 3
# 3. 쿼리 함수에 대해서

유닛 테스트는 특정 React 컴포넌트를 테스트하는 목적을 가집니다.

컴포넌트가 어떤 상태이기를 기대할 때, 이 상태는 테스트 대상 React 컴포넌트 내부에 위치할 것입니다.

`쿼리 함수` 는 React 컴포넌트 내부에서 특정 요소(Element) 를 찾기위한 함수 입니다.

<br />

`쿼리 함수` 는 크게 3가지 유형을 가지며, 아래와 같은 prefix 를 가집니다.

* `getBy___()`
* `queryBy___()`
* `findBy___()`

<br />

각 유형은 검색 결과에 대한 동작이 다르며, 테스트 상황별 적합한 유형을 선택해야 합니다.

* `getBy___()`
    * 검색 결과가 1개라면, 결과 요소(Element) 를 반환 합니다.
    * 검색 결과가 2개 or 없다면, `throw Error` 를 발생시킵니다.
    * 2개 이상의 결과를 기대한다면, `getAllBy___()` 를 사용합닏사.
* `queryBy___()`
    * 검색 결과가 1개라면, 결과 요소(Element) 를 반환 합니다.
    * 검색 결과가 없다면, `null` 을 반환 합니다.
    * 검색 결과가 2개 이상이라면, `throw Error` 를 발생시킵니다.
    * 2개 이상의 결과를 기대한다면, `queryAllBy___()` 를 사용합니다.
* `findBy___()`
    * `Promise` 객체를 반환 합니다.
    * 검색 결과가 1개라면, `resolve()` 됩니다.
    * 검색 결과가 2개 이상 or 없다면, `reject()` 됩니다.
    * 2개 이상의 결과를 기대한다면, `findAllBy___()` 를 사용합니다.



<br /><hr /><br />



###### 4
# 4. Jest 에 대한 Eslint 설정

Jest 에 대한 `Eslint` 는 추가 설치와 설정이 필요합니다.

설치할 패키지는 다음과 같습니다.

* `eslint-plugin-jest-dom`: `jest-dom` 에 대한 `Eslint plugin`
* `eslint-plugin-testing-library`: `testing-library` 에 대한 `Eslint plugin`

<br />

터미널에 아래 명령을 사용하여 plugin 을 설치 합니다.

```bash
yarn add eslint-plugin-jest-dom eslint-plugin-testing-library
```

<br />

설치가 완료되면 프로젝트 root 경로에 `.eslintrc.json` 파일을 생성하고, 다음과 같이 설정 합니다.

```json
{
    "plugins": [
        "jest-dom",
        "testing-library"
    ],
    "exttends": [
        "react-app",
        "plugin:jest-dom/recommended",
        "plugin:testing-library/react"
    ]
}
```

<br />

만약 `CRA` 로 생성한 프로젝트라면 아래 2가지 사항을 확인합니다. 
* `package.json` 에 `eslint` 설정이 함께 포함되어 있을 수 있으므로, 있다면 지워줍니다.
* `.eslintrc.json` 의 `extends` 에 `react-app/jest` 가 있다면, 지워줍니다.
    * `react-app/jest` 에 의해 Eslint plugin 이 동작하지 않습니다.

<br />

테스트 코드 작성 시, IDE 의 자동완성 도움을 받기위해 `@types/jest` 를 설치 합니다.

```bash
yarn add @types/jest
```



<br /><hr /><br />



###### 5
# 5. TDD (테스트 주도 개발)

테스트 코드를 먼저 작성한 후, 테스트를 통과하는 코드를 작성하는 방식으로 기능을 구현하는 방법론은 `TDD (테스트 주도 개발)` 이라고 합니다.

TDD 를 도입했을 때, 가장 큰 장점은 다음과 같습니다.

* 각 기능별 테스트 코드가 있으므로, 코드의 안정성이 높습니다.
* 기능 개발을 할 때 디버깅에 많은 시간을 사용하게 되는데, 테스트 코드가 이미 있다면, 해당 테스트 코드를 통해 디버깅이 되므로, 결과적으로 개발 속도를 향상시킬 수 있습니다.

<br />

TDD 는 아래 과정을 반복하며, 기능을 구현하게 됩니다.

1. 추가할 기능에 대한 테스트 코드 작성
2. 테스트 코드 실행 => 실패 (실제 기능을 구현한 것이 아니므로, 실패하게 됩니다.)
3. 테스트 코드가 통과되도록, 실제 기능을 구현합니다.

<br />

컴포넌트 구현에 TDD 를 적용한다면, 아래와 같은 단계를 거치게 됩니다.

1. 구현할 컴포넌트의 컨텐츠(`textContent`) 를 검사하는 테스트 코드를 작성합니다.
    * 테스트가 통과하도록 컴포넌트 초기 UI 를 구현합니다.
2. 사용자 인터렉션이 있다면 (예: 버튼), `FiringEvents API` 또는 `@testing-library/user-event` 를 사용하여, 이벤트를 발생시킨 후의 컴포넌트 컨텐츠(`textContent`) 를 검사합니다.
    * 테스트가 통과하도록 컴포넌트의 인터렉션을 구현합니다.



<br /><hr /><br />



###### 6
# 6. FiringEvents API 를 사용하여, 사용자 인터렉션 테스트하기

버튼과 같은 사용자 인터렉션 요소를 테스트할 수 있습니다.

사용자가 버튼을 클릭했을 때, 해당 컴포넌트의 컨텐츠(`textContent`)가 어떤 값을 가져야 하는지 테스트할 수 있습니다.

예를 들면, 카운터 증가 버튼을 테스트 할 때, `+ 버튼` 클릭 시 증가한 값이 컴포넌트 컨텐츠(`textContent`) 에 반영되었는지 테스트 합니다.

<br />

테스트 코드 상에서는 실제로 버튼을 클릭할 수는 없으므로, `FiringEvents API` 를 사용하여, 컴포넌트에 `click 이벤트` 를 발생시킬 수 있습니다.

공식문서 상에서는 `FiringEvents API` 를 사용하기 보다는, `@testing-library/user-event` 를 사용해야 한다고 합니다.

> Most projects have a few use cases for fireEvent, but the majority of the time you should probably use @testing-library/user-event.

<br />

아래 코드는 counter 컴포넌트의 `+ 버튼` 을 클릭했을 때 테스트 코드 입니다.

```javascript
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import Counter from './Counter';

test('When the "+" button is preseed, the counter changes to "1"', () => {
    render(<Counter />);

    const plusButtonElement = screen.getByTestId('plus-button');
    fireEvent.click(plusButtonElement);

    const counterElement = screen.getByTestId('counter');
    expect(counterElement).toHaveTextContent('1');
});
```



<br /><hr /><br />



###### 7
# 7. 권장 Query 우선 순위

`@testing-library` 는 다양한 방법의 Query 함수를 제공 합니다.

어떤 Query 를 사용하여도 원하는 요소(Element) 를 찾을 수 있지만, 실제 사용자가 접근하는 방식과 유사한 방법일수록 권장합니다.

* [Query Priority 공식문서](https://testing-library.com/docs/queries/about#priority)

<br />

Query 의 우선순위는 아래의 방법에 가장 일치하는지에 의해 정해집니다.

* 사용자가 화면에서 실제 요소(Element) 를 인지하는 방법이 가장 권장되는 Query 이다.

<br />

`@testing-library` 공식문서에서 권장하는 Query 우선순위는 다음과 같습니다.

1. 테스크 코드는 실제 사용자 경험과 닮아야 한다.
    1. `getByRol('button', { name: /submit/i })`
        * 요소(Element) 의 `Role` 과 `name` 을 사용하므로, 사용자가 실제 요소(Element) 를 인지하는 방식과 가장 유사합니다.
    2. `getByLabelText(matcher)`
        * `Form` 요소(Element) 일 때 적합한 Query 입니다.
    3. `getByPlaceholderText(matcher)`
        * `Form` 요소(Element) 일 때 적합한 Query 입니다.
    4. `getByText(matcher)`
        * 입력 요소(Element) 가 아닌, `<div />`, `<span />` 과 같은 요소(Element) 일 때 적합한 Query 입니다.
    5. `getByDisplayValue(matcher)`
        * `Form` 요소의 `currentValue` 를 사용하는 Query 입니다.

2. `ARIA compliant` 선택자를 사용한 Query
    1. `getByAltText(matcher)`
        * `alt` 속성을 지원하는 태그일 경우, 사용할 수 있는 Query 입니다.
    2. `getByTitle(matcher)`
        * `title` 속성을 지원하는 태그일 경우, 사용할 수 있지만, 실제 화면에 보이는 속성이 아니므로, 권장하지 않습니다.

3. `[data-testid="..."]` 선택자를 사용한 Query
    1. `getByTestId(matcher)`
        * 요소의 속성(Attribute) 에 `data-testid` 를 직접 지정학로, 이를 사용하는 Query 이며, 사용자는 알 수 없는 속성이므로 권장하지 않습니다.



<br /><hr /><br />



###### 8
# 8. fireEvent API 대신 userEvent API 사용하기

`fireEvent API` 와 `userEvent API` 모두 사용자의 인터렉션을 테스트하기 위한 기능 입니다.

`click()` 을 예시로 한다면, `fireEvent API` 의 `click()` 은 오직 `click` 이벤트만 발생시킵니다.

하지만 `userEvent API` 는 `click()` 을 했을 때, 실제 브라우저에서의 동작처럼 부가적인 동작까지 실행 합니다.

<br />

그러므로 `userEvent API` 를 사용해야만 실제 사용자 경험과 유사한 테스트를 할 수 있습니다.



<br /><hr /><br />



###### 9
# 9. `msw` 를 사용한 서버 mocking 하기

서버와 통신이 필요한 부분은 실제 서버가 구현되지 않으면, 구현이나 테스트를 하기 어렵습니다.

`msw (mock service worker)` 라이브러리를 사용하여 가상의 Mock 서버를 구현할 수 있습니다.

* [msw 공식문서](https://mswjs.io/)



