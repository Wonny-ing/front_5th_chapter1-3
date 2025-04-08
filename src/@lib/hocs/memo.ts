import { shallowEquals } from "../equalities";
import { ComponentType, useState } from "react";
import { useRef } from "../hooks";

/** memo Hoc은 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지 */
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const MemoComponent = (props: P) => {
    // 1. 이전 props를 저장할 ref 생성
    const prevPropsRef = useRef<P | null>(null);

    // 2. 컴포넌트의 렌더링 결과를 저장할 state
    const [memoizedResult, setMemoizedResult] = useState(() => {
      // 초기 렌더링 시에는 항상 컴포넌트를 렌더링하고 props 저장
      prevPropsRef.current = props;
      return Component(props);
    });

    // 3. equals 함수를 사용하여 props 비교
    // props가 변경된 경우에만 새로운 렌더링 수행 - 첫번째 실행이거나 props가 변경되었을때
    if (!prevPropsRef.current || !_equals(prevPropsRef.current, props)) {
      // 현재 props를 저장 - props 객체의 참조를 직접 저장하는 대신 복사본을 만들어 저장
      prevPropsRef.current = { ...props };
      // 4. props가 변경된 경우에만 새로운 렌더링 수행
      const newResult = Component(props);
      setMemoizedResult(newResult);
    }

    return memoizedResult;
  };

  // 5. 메모이제이션된 컴포넌트 생성
  return MemoComponent;
}
