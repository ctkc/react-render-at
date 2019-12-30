
# React Render At

### Installation

    npm install react-render-at

### Usage

There are two ways you can use the package:  
  
- Via component  
```  
import {RenderAt} from 'react-render-at'  
  
class App = () => (  
    <h1>My App</h1>  
    <RenderAt>  
        Content  
    </RenderAt>  
)  
```

| Prop | Type | Default |
| -- | -- | -- | -- |
| desktop | boolean | no
| laptop  | boolean | no
| tablet | boolean | no
| mobile | boolean | no

- Via High Order Component

```  
import RenderAtHOC from 'react-render-at'  
  
class App = props => (  
    <h1>My App</h1>  
    {
		props.isDesktop
			? <p>Content in Desktop</p>
			: null
	}
	{
		props.isLaptop
			? <p>Content in Laptop</p>
	}
		{
		props.isTablet
			? <p>Content in Tablet</p>
	}
		{
		props.isLaptop
			? <p>Content in Mobile</p>
	}
)

export default RenderAtHOC(App)
```

### Breakpoints
| Device | Min | Max
|--|--|--|
| Desktop | 1200px | Infinite
| Laptop | 1024px | 1199px
| Tablet | 768px | 1023px
| Mobile | 0px | 767px

