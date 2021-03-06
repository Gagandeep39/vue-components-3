# Components - Advanced

- [Components - Advanced](#components---advanced)
  - [Deployment](#deployment)
  - [Global Componets](#global-componets)
  - [Local Components](#local-components)
  - [Scoped Styles](#scoped-styles)
  - [Slots](#slots)
  - [Named Slot](#named-slot)
  - [Empty Slot](#empty-slot)
  - [Scoped Slots](#scoped-slots)
  - [Dynamic Components](#dynamic-components)
  - [Caching Dynamic Components](#caching-dynamic-components)
  - [Teleport](#teleport)
  - [Styling folder structure](#styling-folder-structure)

## Deployment

- View Deployment at https://gagandeep39.github.io/vue-components-3/

## Global Componets

- Components declared in App.js are called global components
- They can be used Anywhere inside application

```js
const app = createApp(App);

app.component('the-header', TheHeader);
app.component('base-badge', BaseBadge);

app.mount('#app');
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
- If we add a single namedslot and no other slots, we will **always** have to use template ith `v-slot`, else the content will not render
- If we have one unamed slot and one named slot, content inside template will be rendered in named slot and rest unnamed slot
- We can also exlicity specify `v-slot:default` to use unnamed slot
- `v-slot:` can be replaced with `#`

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

```html
<!-- Explicitly specifying named and unnamed sot -->
<template>
  <section>
    <base-card>
      <template v-slot:header>
        <h2>Available Badges</h2>
      </template>
      <template v-slot:default>
        <ul>
          <li>
            <base-badge type="admin" caption="ADMIN"></base-badge>
          </li>
          <li>
            <base-badge type="author" caption="AUTHOR"></base-badge>
          </li>
        </ul>
      </template>
    </base-card>
  </section>
</template>
```

## Empty Slot

- If we provide no content for named slot, we can show a dummy data in it
- DOM is still created with no data for slots
- To improve UI we can perform an v-if check to not render the slot if there is no data. Refer [\$slot](#slot)

```html
<!-- Base Class -->
<slot name="nameslot">
  Hello this is an Empty Slot
</slot>
```

<!-- Class o be renders, but no content provded for nameslot -->
<template>
  <section>
    <base-card>
      <template v-slot:default>
        <h3>{{ fullName }}</h3>
      </template>
    </base-card>
  </section>
</template>
```

## `$slot`

- Provided by vue to mannipulate slot
- We can get info about are slots by console logging it in `mount()` lifecycle hook
- We can use it to perform an if check and not load content if not required

```html
<!-- Checks hether we recieved HTML data for nameslot slot -->
<header v-if="$slots.nameslot">
  <slot name="nameslot">
    Hello this is an Empty Slot
  </slot>
</header>
```

## Scoped Slots

- Allows passing data from inside component
- Passing data from component containg slot to component where we pass Markup data

```html
<!-- Parent -->
<course-goals>
  <template #default="slotProps">
    <h2>
      {{ slotProps.item }}
    </h2>
  </template>
</course-goals>
```

```html
<!-- Child -->
<template>
  <ul>
    <li v-for="goal in goals" :key="goal">
      <!-- Allows accessing goal from parent -->
      <slot :item="goal"></slot>
    </li>
  </ul>
</template>
```

1. Here we are Creating a slot in child
2. Binding `goal` to variable `item` as `v-bind:item="goal"`
3. Retrieving props from parent as slotProps
4. Accsisng item as slotProps.item
5. **If** we are using abc-def, we will access it as`slotProps['abc-def']` as we cant use `-` in Html
6. **If** there is **only** one slot, then we can remove `template` tag and move `#default="slotProps"` to `course-goals`

## Dynamic Components

- Dynamically show components
- Better than v-if, as it reduces the code to be rtten sometimes
- Uses <component is="custom-defined-cmponent"></component>
- Shows the specified component in its plae

```html
<!-- Notmal Component -->
<button @click="setSelectedComponent('active-goals')">Active Goal</button>
<button @click="setSelectedComponent('manage-goals')">Manage Goal</button>
<active-goals v-if="selectedComponent === 'active-goals'"></active-goals>
<manage-goals v-if="selectedComponent === 'manage-goals'"></manage-goals>

<!-- Dynamic COmponent -->
<button @click="setSelectedComponent('active-goals')">Active Goal</button>
<button @click="setSelectedComponent('manage-goals')">Manage Goal</button>
<!-- We re using ngbind as we are proidng a variabl -->
<component :is="selectedComponent"></component>
```

```js
export default {
  components: {
    ActiveGoals,
    ManageGoals,
  },
  data() {
    return {
      selectedComponent: 'active-goals',
      setSelectedComponent(cmp) {
        this.selectedComponent = cmp;
      },
    };
  },
};
```

## Caching Dynamic Components

- If we are creating forms and we have 2 formes shown using <component>
- We need to make sure both are in memory if we hide anther
- By default, it deletes the data from memory when components re switched
- Can be pevented by surrounding the `<component>` with `<keep-alive>`

```html
<keep-alive>
  <component :is="selectedComponent"></component>
</keep-alive>
```

## Teleport

- Move element to anoher page
- Takes 2 attributs
  - CSS selector of element where to display
  - Content to be displayed
- Usuay used to display error on root page nstead of child component

```html
<teleport to="body">
  <error-alert v-if="dataIsInvalid">
    <h2>Input is invalid!</h2>
    <p>Enter few characters</p>
    <button @click="confirmError">Ok</button>
  </error-alert>
</teleport>
```

- Renders the component inside body tag
- We can render this using **id selector** as `#app`

## Styling folder structure

- Refer [link](https://v3.vuejs.org/style-guide) for more info 