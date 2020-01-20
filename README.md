
# React Render At

![Package Version](https://img.shields.io/github/package-json/v/BNT-AR/react-render-at/master?color=blue&label=version&style=flat-square)

### Installation

    npm install @bnt-ar/react-render-at
    
### Breakpoints
| Device | Min | Max
|--|--|--|
| Desktop | 1200px | Infinite
| Laptop | 1024px | 1199px
| Tablet | 768px | 1023px
| Mobile | 0px | 767px    

### Usage

There are two ways you can use the package:  
  
- Via component  
```js
import React from 'react'
import {RenderAt} from 'react-render-at'  
  
class App = () => (  
    <h1>My App</h1>  
    <RenderAt desktop>  
        Content  
    </RenderAt>  
)  
```
#### Available props
| Prop | Type | Default |
| -- | -- | -- |
| desktop | boolean | no
| laptop  | boolean | no
| tablet | boolean | no
| mobile | boolean | no

- Via High Order Component

```js
import React from 'react'
import RenderAtHOC from 'react-render-at'  
  
class App = props => (  
  <h1>My App</h1>  
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

export default RenderAtHOC(App)
```
