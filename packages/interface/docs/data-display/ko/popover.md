# Popover

`Popover`는 사용자가 특정 요소를 클릭하거나 터치할 때 나타나는 작은 오버레이 창으로, 제목, 이미지, 링크 등 다양한 콘텐츠를 포함하여 추가적인 정보나 기능을 제공합니다.

- **상세한 정보 제공:** 간단한 설명 이상의 풍부한 정보를 제공해야 할 때 사용합니다.
- **상호작용 요소 포함:** `Button`, `Link`, `Input` 등 사용자와의 추가적인 상호작용이 필요한 경우 사용합니다.

## 사용 규칙

`Popover`를 사용할 때는 다음 지침을 준수해야 합니다:

1. **트리거 요소 설정:** `Popover`는 `Button`, `Icon` 등 사용자가 클릭하거나 터치할 수 있는 인터랙티브한 요소에 연결해야 합니다.
2. **적절한 콘텐츠 제한:** 간결하고 핵심적인 정보만을 포함하며, 지나치게 많은 내용을 담지 않도록 합니다.

### 다른 컴포넌트 사용이 적합한 상황

비슷한 형태의 컴포넌트인 `Tooltip`과 비교하자면, `Tooltip`은 짧고 간결한 부가 설명을 제공하는 데 사용되며, 일반적으로 사용자가 요소 위에 마우스를 올리거나 포커스할 때 나타납니다. 반면에 `Popover`는 더 풍부한 콘텐츠를 포함할 수 있으며, 사용자가 요소를 클릭하거나 터치할 때 나타나고, 추가적인 사용자 상호작용이 필요한 경우에 사용됩니다.

## 사용 예시

- **상세 설명:** `Icon` 옆에 도움말을 제공하여 사용자가 해당 기능에 대한 자세한 설명을 확인할 수 있도록 합니다.
- **부가 설명:** 특정 데이터 포인트를 클릭했을 때 상세 정보를 표시하며, 전달하고자 하는 정보의 내용이 많아 `Tooltip`에 담을 수 없을 때 사용합니다.
