<!-- # vue3-test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/). -->


## Life Cycle
lifecycle|--
--|--
beforeCreate()|데이터가 정의되기 전(beforeCreate는 활용도가 낮다)
created()|데이터가 생성된 직후(created는 많이 사용된다)
beforeMount()|렌더링이 되기 전. html과 실제 연결이 되기 전(beforeMount도 활용도가 낮다)
mounted()|렌더링이 된 직후(mounted가 가장 많이 사용됨)

```js
export default {
  data() {
    return {
      count: 3
    }
  },
  beforeCreate() {
    console.log('Before Create!', this.count) // undefined
  },
  created() {
    console.log('Created!!', this.count) // 3
  },
  beforeMount() {
    console.log('Before Mount!')
    console.log(document.querySelector('h1')) // null
  },
  mounted() {
    console.log('Mounted!!')
    console.log(document.querySelector('h1')) // <h1>{{ count }}</h1>
  }
}
```

## template syntax
### 1. v-on (@)
특정 이벤트가 발생했을 경우에 대한 처리를 하고 싶은 경우 v-on을 사용할 수 있다. 일반적으로 v-on 키워드 대신 약어인 @ 를 사용한다.
```js
<h1 
  @click="method">
  {{ msg }}
</h1>
```

### 2. v-bind( : )
적용할 속성 값을 "" 기호 안에 넣어 작성하는데, 기호 안의 문자열을 문자열이 아닌 해당하는 데이터로 사용하기 위해서는 v-bind 키워를 앞에 붙여준다. 일반적으로 v-bind키워드 대신 약어인 : 를 사용한다.
```js
<template>
  <h1
    :class="class">
    {{ msg }}
  </h1>
</template>

<script>
export default {
  data() {
    return{
      class: 'active',
      msg: 'Hello world!'
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  color: blue;
}
</style>
```

### 3. v-once
vuejs에서 데이터가 변경되면 반응성에 의해 사용자가 보게 되는 화면에 출력되는 값 역시 변경되게 된다.

v-once를 사용하면 데이터가 최초에 바뀔 시에만 반응성이 적용되어 화면이 바뀌고 그 뒤로는 데이터가 바뀌어도 화면은 바뀌지 않게 된다.

### 4. v-for (반복문)
만약 배열 형태의 데이터의 모든 요소들을 화면에 나타내기 위해서는 여러 개의 요소를 작성해야 한다.
그런데 만약 배열 내의 데이터가 무수히 많다면, 직접 li 태그를 여러 개 작성하기에는 무리가 있다. 이럴 때 v-for 기능을 사용할 수 있다.

```js
<ul>
  <li
    v-for="fruit in fruits"
    :key="fruit">
    {{ fruit }}
  </li>
  // 이때 key 값으로는 각 요소마다 고유한 속성을 사용해야 한다.
</ul>
```


## computed(계산된 데이터)
data 옵션에 정의해놓은 특정한 데이터를 추가적으로 어떤 연산을 통해 정의를 한 다음 정의된 값을 반환하여 사용할 수 있는 새로운 데이터

기존의 데이터를 우리가 원하는 형태로 가공하여 사용할 수 있다

```js
<template>
  <section v-if="hasFruit">
    <h1>Fruits</h1>
    <ul>
      <li
        v-for="fruit in fruits"
        :key="fruit">
        {{ fruit }}
      </li>
    </ul>
  </section>
  <br />
  <section>
    <h1>Reverse Fruits</h1>
    // computed 데이터 역시 그냥 데이터처럼 사용할 수 있다.
    <ul>
      <li
        v-for="fruit in reverseFruits"
        :key="fruit">
        {{ fruit }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      fruits: [
        'Apple', 'Banana', 'Cherry'
      ]
    }
  },
  computed: {
    hasFruits() {
      return this.fruits.length > 0
      // boolean data를 리턴하는 method
      // fruits 배열의 길이가 0 보다 크면 true를 리턴할 것임
    },
    reversedFruits() {
      return this.fruits.map(fruit => {
        return fruit.split('').reverse().join('')
        // 문자열 데이터를 split으로 쪼개서 캐릭터 배열로 만든 다음
        // reverse() method를 통해 배열을 뒤집고
        // 그렇게 만들어진 배열의 캐릭터를 join으로 다시 합쳐서 반환
        
        // 'Apple' => ['A', 'p', 'p', 'l', 'e']
        // => ['e', 'l', 'p', 'p', 'A'] => 'elppA'
      })
    }
  }
}
</script>
```

## Style
vue파일에서 요소에 스타일을 적용할 수 있다.
이때 style을 적용시키는 방법은 여러 가지가 있다.
style 태그 작성, style 속성 적용 등...
style태그에 인라인으로 scoped 속성을 적용하면 해당 파일 내에서만 유효한 스타일을 작성할 수 있다.

```js
<template>
  <h1
    @click="activate"
    :class="{active: isActive}">
    <!-- active 라는 클래스를 추가하고 싶은데 이 클래스는 isActive 데이터의 영향을 받는다. isActive가 true인 경우에만 active 클래스가 적용됨 -->
    <!-- 객체 데이터를 통해 여러 클래스를 할당할 수도 있음 -->
    <!-- 클래스 이름에 특수 기호가 들어가는 경우에는 ''로 묶어주어야 함 -->
    <!-- 바인딩된 객체(:class)는 꼭 인라인일 필요는 없음 data()에 객체데이터를 추가해서 불러와도 됨-->
    Hello?!({{ isActive }})
  </h1>
  <div
    :style="[styleObject, backgroundStyle]"
    @click="changeStyle">
    Style
  </div>
  <!-- 스타일 역시 data에 객체 데이터를 선언해서 이것을 사용하여 바인딩 할 수 있다. -->
  <!-- 배열데이터로 여러 개의 객체 데이터를 적용할 수도 있다 -->
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      styleObject: {
        color: 'orange',
        fontSize: 50 + 'px'
      },
      backgroundStyle: {
        backgroundColor: 'black'
      }
    }
  },
  methods: {
    activate() {
      this.isActive = !this.isActive
    },
    changeStyle() {
      this.styleObject = {
        color: 'red',
        fontSize: '30px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .active {
    color: red;
    font-weight: bold;
  }
</style>
```

## conditional rendering( 조건부 렌더링 )
특정 키워드를 사용하여 조건을 만족할 때에만 렌더링이 되도록 설정할 수 있다.

### 1. v-if
v-if 키워드를 사용하면 조건부 값이 false일 경우에는 렌더링이 되지 않고 true인 경우에만 렌더링이 된다.

### 2. v-show
v-show 키워드를 사용하면 v-if와 달리 조건부 값이 false여도 렌더링은 된다. 하지만 요소가 화면에는 나타나지 않는다.

### tip
전환이 자주 되어야 하는 경우에는 v-show를 사용하는 것이 좋다. v-if를 사용하게 되면 렌더링을 했다가 끊었다가를 반복해야 하는데 그 비용이 꽤 크기 때문이다.
반면 런타임 동안에 조건이 잘 변경되지 않는다면 v-if를 사용하는 것이 좋다.

일단 v-if로 작성한 다음 전환이 자주 이루어질 것 같으면 v-show로 바꿔
사용하자.

<br />

## list rendering
v-for 디렉티브를 사용해서 배열 데이터를 리스트로 렌더링할 수 있다.

```js
<template>
  <button @click="handler">
    Click me!
  </button>
  <ul>
    <!-- 받을 변수의 이름은 마음대로 지정 가능 -->
    <li
      v-for="fruit in newFruits" 
      :key="fruit.id">
      <!-- key로는 고유한 값을 사용해야 한다 -->
      {{ fruit.name }} - {{ fruit.id }}
      <!-- index는 zero based 이기 때문에 0부터 시작 -->
    </li>
  </ul>
  <br />
  <ul>
    <li
      v-for="{ id, name } in newFruits"
      :key="id">
      {{ name }} - {{ id }}
    </li>
  </ul>
</template>

<script>
import shortid from 'shortid'
// 고유한 id를 생성해주는 패키지

export default {
  data() {
    return {
      fruits: ['Apple', 'Banana', 'Cherry'],
    }
  },
  computed: {
    newFruits() {
      return this.fruits.map(fruit => ({
        id: shortid.generate(),
        name: fruit
      }))
    }
    // newFruits: [
    //     { id: 0, name: 'Apple' },
    //     { id: 1, name: 'Banana' },
    //     { id: 2, name: 'Cherry' }
    // ]
    // 이렇게 반환이 될 것임
  },
  methods: {
    handler() {
      this.fruits.push('Orange')
      // push method를 통해 배열의 형태가 변했을 때
      // 만약 데이터가 화면에 렌더링 되어 있다면 반응성에 의해 변경된 내용이 화면에 출력됨
    }
    // 원본의 데이터를 변형시키지 않는 filter(), concat(), slice()와 같은 메소드라도 새로 만들어진 데이터를 원본 데이터에 할당을 한다면 그것 역시 원본 데이터가 변경이 된 것이므로 반응성에 의해 화면에 나타내어짐
    // Ex) example.items = example.items.filter(item => item.message.match(/Foo/))
  }
}
</script>
```

## event handling
v-on(@) 디렉티브를 사용하여 특정 이벤트에 대해 핸들러를 발동시킬 수 있다.
이때 핸들러는 직접적으로 작성하기 보다는 메소드를 작성하여 넣어주는 것이 좋다.
```js
@click="count+=1"
```
이런 식으로 하는 것은 권장되지 않음
```js
@click="handler"
```
이런 식으로 메소드를 사용하는 것이 좋음

이때 method의 인수로 아무것도 전달하지 않으면 디폴트로 event 자체가 인수로 전달되지만 내가 원하는 특정 인수를 넣어줄 수도 있다.

```js
  <button @click="handler('what')">
    Click
  </button>
```
그렇다면 내가 원하는 인수도 넣고, event 객체도 받아보고 싶다면?  
인수로 $event를 넣어주면 된다.

```js
  <button @click="handler('what', $event)">
    Click
  </button>
```

하나의 이벤트에 대해 여러 개의 핸들러를 발동시킬 수도 있다.  
이때는 핸들러들을 쉼표로 구분하여 넣어주면 되는데, 전달하는 인수가 없더라도 반드시 method 뒤에 소괄호()를 붙여주어야 한다.

```js
  <button @click="handlerA(), handlerB()">
    Click me!
  </button>
  ```

  ### event.preventDefault()
  요소의 기본 동작을 막는다.
  예를 들어 a 태그는 클릭 시 지정한 링크로 이동하는 기능을 가지고 있다.  
  event.preventDefault()를 사용하면 해당 링크로 이동하는 기능을 막아준다.  
  이벤트 핸들러 내에서 event 객체를 인자로 받아 객체 내의 preventDefault() method를 실행시켜주면 된다.  
  이러한 기능은 @click.prevent 이렇게 이벤트 이름 뒤에 prevent를 붙여서 사용할 수도 있다.
  ```js
    <a
    href="https://naver.com"
    target="_brank"
    @click.prevent="handler('ABC!')">
    NAVER
  </a>
  ```
  prevent뒤에 once 키워드를 체이닝으로 붙여주면 최초 1회만 막아주도록 할 수도 있다.
  ```js
    <a
    href="https://naver.com"
    target="_brank"
    @click.prevent.once="handler('ABCD!')">
    NAVER
  </a>
  ```
## event.stopPropagation()
이벤트는 전파된다는 특성을 가지고 있다. 자식 요소와 부모 요소가 겹쳐진 부분을 우리가 클릭하게 되면 자식 요소의 click 이벤트도 발동하고, 이 이벤트가 전파되어 부모 요소의 click 이벤트도 발동하게 된다. 이러한 현상을 버블링(bubbling)이라고 한다.

event.stopPropagation()을 통해 버블링 현상을 막아줄 수 있다.  
이벤트 핸들러 내에서 event 객체를 인자로 받아 객체 내의 stopPropagation() method를 실행시켜주면 된다.
또는 stop 키워드를 통해 별도의 method를 작성하지 않고도 사용할 수 있다.
```js
<div
  class="parent"
  @click="handlerA">
  <div
    class="child"
    @click.stop="handlerB"></div>
</div>
```
이렇게 작성하게 되면 자식 요소와 부모 요소가 겹쳐져 있는 부분을 클릭하게 되더라도 handlerA는 실행되지 않는다.

## capture
캡쳐링은 버블링과 반대되는 개념으로 버블링이 하위 요소에 상위 요소로 전파가 되는 개념이었다면 캡쳐링은 이 순서를 뒤집어준다.
즉, 상위 요소의 이벤트가 먼저 발동하고 이 이벤트가 하위 요소로 전파되도록 해준다.
```js
<div
  class="parent"
  @click.capture="handlerA">
  <div
    class="child"
    @click="handlerB"></div>
</div>
```
이렇게 하면 handlerA가 먼저 실행된 뒤에 hanlderB가 실행되게 된다.

## self
순수하게 해당 요소에 대해서만 이벤트가 발생했을 때 핸들러가 동작하도록 하고 싶을 수 있다. 이때는 self 키워드를 사용하면 된다.

```js
<div
  class="parent"
  @click.self="handlerA">
  <div
    class="child"
    @click="handlerB"></div>
</div>
```
자식 요소와 부모 요소가 겹쳐지는 부분을 클릭했을 때는 handlerA가 실행되지 않게 된다.

이벤트 객체에는 target과 currentTarget이라는 속성이 있다.  
target은 실제 이벤트가 발생한 요소이고, currentTarget은 핸들러가 실행되게 한 실제 요소이다.  
이 두 요소는 항상 일치하는 것은 아니다.  
self는 이 두 요소가 일치할 때에만 핸들러를 실행하도록 해주는 키워드이다.  
<br />

## wheel
마우스 휠을 움직이게 되면 발동되는 이벤트이다.  
만약 스크롤을 움직일 때마다 많은 양의 로직이 수행되어야 한다면 화면에 버벅임이 발생할 수 있다.  
```js
<div
  class="parentWheel"
  @wheel.passive="handlerWheel">
  <div
    class="childWheel"></div>
</div>
```  
이때 passive 키워드를 사용하게 되면 사용자에게 보여지는 화면과 로직을 독립시켜서 화면 따로 로직 따로 수행이 되도록 만들 수 있다.  
그렇게 되면 실제로는 많은 양의 로직을 처리하고 있을지라도 사용자는 버벅임 없이 화면을 볼 수 있게 된다.  
<br />

## key
키보드 입력에 대해서도 이벤트가 발생하도록 할 수 있다.

### 1. keydown
keydown은 말 그대로 키보드 키가 내려갈 때 즉 누르는 순간에 이벤트가 발동하게 된다.

### 2. keyup
keyup은 말 그대로 키보드가 눌렸다가 올라오는 순간에 이벤트가 발동하게 된다.  
<br />
인식할 input을 케밥 케이스 형태로 수식어로 작성해주면 된다.
또한 체이닝을 통해 여러 개의 키 수식어를 작성하게 되면 해당 키들을 동수에 눌렀을 때만 핸들러가 실행되게 된다.

```js
<input
  type="text"
  @keydown="handlerKey" />

<input
  type="text"
  @keydown.enter="handler" />

<input
  type="text"
  @keydown.ctrl.a="handler" />
```

## v-model
v-model 디렉티브를 사용하여 양방향 바인딩을 구현할 수 있다.  
v-model을 사용하지 않으면 data()에서 리턴해주는 데이터를 단순히 화면에 나타내는 단방향 바인딩만 가능하다.  

v-model을 이용하면 사용자 입력이 data를 바꿀 수도 있는 양방향 바인딩이 가능해진다.  
비슷한 기능으로 @input을 사용할 수도 있다.  

단, v-model을 이용하면 한글을 입력받을 때 조금 불편하다. 한글을 입력받는 경우엔 @input을 이용하는 것이 반응성이 더 좋다.

v-model, @input은 입력을 받는 즉시 데이터를 변형시킨다.
@change를 사용하면 모든 입력을 마친 후 enter키를 누르게 되면 바인딩이 진행되어 데이터가 변형되게 된다. 이는 v-model.lazy 디렉티브를 사용해서도 구현할 수 있다.

```js
<template>
  <h1>{{ msg }}</h1>

  <h1>v-model</h1>
  <input
    type="text"
    v-model.trim="msg" />

  <h1>@input</h1>
  <input
    type="text"
    :value="msg"
    @input="msg = $event.target.value" />

  <h1>@change</h1>
  <input
    type="text"
    :value="msg"
    @change="msg = $event.target.value" />

  <h1>{{ checked }}</h1>
  <input
    type="checkbox"
    v-model="checked" />
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello world!',
      // 데이터를 숫자 데이터로 선언해도 input 요소로 들어가게 되면 문자열처럼 바뀌어서 들어감
      // 만약 숫자 데이터로 유지되게 사용하고 싶다면 v-model.number 라고 써주면 된다
      checked: false
    }
  },
  methods: {
    handler(event) {
      console.log(event.target.value)
      this.msg = event.target.value
      // 이걸 v-model을 이용해서 간단히 처리할 수 있음
    }
  },
  watch: {
    // watch는 특정 데이터가 변형된 것이 감지되면 발동된다.
    msg() {
      console.log(this.msg)
      // v-model.trim을 사용하게 되면 문자열 앞뒤에 공백이 제거되기 때문에 앞뒤에 공백이 추가되는 것은 값이 변했다고 인식되지 않아서 watch가 발동되지 않음
    }
  }
}
</script>
```

## props, context
props 속성을 통해서 상위 요소에서 하위 요소로 데이터를 전달할 수 있다.
```js
App.vue

<template>
  <MyBtn
    class="heropy"
    style="color: red;"
    color="#ff0000"
    @hello="log">
    Apple
  </MyBtn> 
</template>

<script>
import MyBtn from '~/components/MyBtn'

export default {
  components: {
    MyBtn
  },
  methods: {
    log() {
      console.log('Hello world!')
    }
  }  
}
</script>
```
App.vue 파일 내에서는 MyBtn이라는 컴포넌트를 import하여 사용하고 있다.  
<br />
```js
MyBtn.vue

<template>
  <div
    v-bind="$attrs"
    class="btn"
    @click="hello">
    <slot></slot>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: 'gray'
    }
  },
  emits: ['hello'],
  // hello라는 이벤트를 받아오겠다
  mounted() {
    console.log(this.color)
    console.log(this.$attrs)
    // $attrs는 상속받은 모든 속성의 객체
  },
  methods: {
    hello() {
      // hello() 메소드는 받아온 hello라는 이벤트를 발동시킨다
      this.$emit('hello')
    }
  },

  // COMPOSITION API
  setup(props, context) {
    //순서는 꼭 props, context 순으로 받아야 함
    function hello() {
      context.emit('hello')
    }

    onMounted(()=>{
      console.log(props.color)
      console.log(context.attrs)
    })

    return {
      hello
    }
  }
}
</script>
```
MyBtn.vue에서는 App.vue에서 전달한 데이터를 props에 받아서 사용하고 있다.  
inheritAttrs 속성의 값을 false로 지정했기 때문에 속성들이 상속되지 않는다.
