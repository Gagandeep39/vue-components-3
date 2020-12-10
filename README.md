# Components - Advanced

- [Components - Advanced](#components---advanced)
  - [Deployment](#deployment)
  - [Global Componets](#global-componets)
  - [Local Components](#local-components)
  - [Scoped Styles](#scoped-styles)
  - [Slots](#slots)
  - [Named Slot](#named-slot)

## Deployment

- View Deployment at https://gagandeep39.github.io/vue-components-3/

## Global Componets

- Components declared in App.js are called global components
- They can be used Anywhere inside application

```js
const app = createApp(App);

app.component("the-header", TheHeader);
app.component("base-badge", BaseBadge);

app.mount("#app");
```

## Local Components

- Componen declared inside another componet is Locl component
- It is accessible from that component only (**Not** even from Child component)

```js
export default {
  components: {
    // Camel Case
    the-header': 'TheHeader',
    // Pascal case
    BaseBadge: BaseBadge,
    // Or simply
    BaseBadge
  }
}
```

- Using pascal case gives us access to `the-header`, `TheHeader` both
- Using `the-header` only allows using `the-header` in html tags

## Scoped Styles

- Styles can be global or scoped
- App.vue is usually ued to define global styles
- If we do not specify scope, it will be treated as global
- `scoped` Keybword added to add scope stypes
- It is applied to that file only, not the child

```html
<style scoped></style>
```

## Slots

- Reusable components structure
- Similar to Higher order components in ReactJS
- Allows us to recieve HTML componetns
- Suppose we created a component base-card
- We will enclose our html contnt inside based
- We can then view this content using <slot> </slot>

```html
<template>
  <section>
    <base-card>
      <div>
        <h3>{{ fullName }}</h3>
      </div>
    </base-card>
  </section>
</template>
```

```html
<template>
  <div>
    <slot></slot>
  </div>
</template>
```

## Named Slot

- Used when we have multiple slot
- We can pecify the slot nme in which we have to render the content
- If we add a namedslot, we will **always** have to use `v-slot`, else the content will not render

```html
<!-- Base Class -->
<slot name="nameslot"></slot>
```

```html
<!-- Class o be renders -->
<template>
  <section>
    <base-card>
      <template v-slot:nameslot>
        <div>
          <h3>{{ fullName }}</h3>
        </div>
      </template>
    </base-card>
  </section>
</template>
```
