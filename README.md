
# React Render At

### Installation

    npm install react-render-at
    
### Default Breakpoints
| Device | Min | Max
|--|--|--|
| Desktop | 1200px | Infinite
| Laptop | 1024px | 1199px
| Tablet | 768px | 1023px
| Mobile | 0px | 767px

### Usage

There are three ways you can use the package:  
  
- Via component

```js
import React from 'react'
import {RenderAt} from 'react-render-at'
  
function App () {
  return (
      <RenderAt desktop>
          Content  
      </RenderAt>
  )
}
```
#### Available props
| Prop | Type | Default |
| -- | -- | -- |
| desktop | boolean | no
| laptop  | boolean | no
| tablet | boolean | no
| mobile | boolean | no
| fragment | boolean | no

- Via High Order Component

```js
import React from 'react'
import {withReanderAt} from 'react-render-at'  
  
function App(props) {
  return (
   {
     props.isDesktop && <p>Content in Desktop</p>
   }
   {
     props.isLaptop && <p>Content in Laptop</p>
   }
   {
     props.isTablet && <p>Content in Tablet</p>
   }
   {
     props.isLaptop && <p>Content in Mobile</p>
   }
  )
}

export default withRenderAt(App)
```

#### Available props
| Prop | Type |
| -- | -- |
| isDesktop | boolean
| isLaptop  | boolean
| isTablet | boolean
| isMobile | boolean

- Via Hooks

```js
import React from 'react'
import {useRenderAt} from 'react-render-at'
  
function App() {
  const { isDesktop, isLaptop, isTablet, isMobile } = useRenderAt()

  return (
    {
      isDesktop && <p>Content in Desktop</p>
    }
    {
      isLaptop && <p>Content in Laptop</p>
    }
    {
      isTablet && <p>Content in Tablet</p>
    }
    {
      isMobile && <p>Content in Mobile</p>
    }
  )
}

export default App
```

#### Available props
| Prop | Type |
| -- | -- |
| isDesktop | boolean
| isLaptop  | boolean
| isTablet | boolean
| isMobile | boolean

### Config

You can change the default debounce by calling `setDebounceTime` at the beginning of your app:

```js
import React from 'react'
import RenderAt from 'react-render-at'

RenderAt.setDebounceTime(250) // Resize event debounce time in milliseconds.
```

You can override the default breakpoints by calling `setBreakpoints` at the beginning of you app:

```js
import React from 'react'
import RenderAt from 'react-render-at'

RenderAt.setBreakpoints({
  desktop: {minWidth: 1024, maxWidth: Infinity}
})
```
#### Available object props
| Prop | Type |
| -- | -- |
| desktop | { minWidth: number, maxWidth: number | Infinity }
| laptop  | { minWidth: number, maxWidth: number | Infinity }
| tablet | { minWidth: number, maxWidth: number | Infinity }
| mobile | { minWidth: number, maxWidth: number | Infinity }
