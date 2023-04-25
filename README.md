# sortable-react

[Demo](https://www.npmjs.com/package/sortable-react/readme/demo.mp4) | [npm](https://www.npmjs.com/package/sortable-react)

![MP4 of the demo being used](./readme/demo.mp4)

[Sortable-React](https://github.com/Timtance/sortable-react)Under the React framework, based on the React component under TypeScript syntax, hook functions are used to handle, Drag responds to events, and drag and sort Doms.

V1.0.0 starts in its simplest form. If you need rich interaction, please download a higher version.

### Why do we need to do this?

- We will help you install the following plugins: react, react dom, ahaooks, less loader

- Based on the React framework, it is necessary to install React.

- Based on the React component under TypeScript syntax, it is necessary to install React dom.

- Based on the Css extension language, it is necessary to install less loader.

- Based on hook functions, it is necessary to install hooks.

## Usage

You can see 

1. Install the package:

```bash
yarn add sortable-react
```

or

```bash
npm install sortable-react
```

2. Import the component in your `<script setup>` (or `<script>`):

```typescript
import { Sortable } from "sortable-react";
```

3. Use the component:

```react
return (
<>
    <Sortable
      parameter={['标签1'，'标签2']}
    >
    </Sortable>
</>
)
```

### Props

- `parameter` (`Array<any>`, required): your data to list

### Events

You can listen to Sortable events by adding the listeners to the `Sortable` component. For example:

```typescript
<Sortable
  @click="(event: Event) => void"
>
```

### Using plugins

You need to mount any plugins you want outside of before importing this library. For example, the below is correct:

```typescript
import { useMount } from "ahooks";
import { useCallback, useMemo, useRef, useState } from "react";
import styles from './index.less';
```


## Development

Run `yarn` to install dependencies

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)