# Styling
## Classes naming conventions for `*.module.scss`
* **Blocks, Elements** - lowercase and dash (`-`) separated. f.e. `.paganitation`, `.button`, `.investment-planning`, `investment-planning .title`
  * It is easy to use these classes with react (supports auto-completion in IDEs). f.e. `import styles from './pagination.module.scss';` → `styles.pagination`, `styles.paginationWrapper` in `*.tsx`
    * BEM element pattern `.block__element` would require some preparations in every component and would not support auto complete in `*.tsx` files. Also, react's CSS modules create very strict scopes.
* **Modifiers** - preferred usage would be with `--` connector. f.e. `.button--primary`, `.title--small`, `.dot--blue`, `.dot--red`.
  * Avoid generic modifier classes (f.e. `.red`, `.big` `.is-open`) to keep coding patterns consistent.
  * Do not use two or more modifiers as one. Bad: `.button--red--small { ... }`; Good: `.button--red { ... } .button--small { ... }`
  
## Some good practices:
  * Avoid styling by selecting any elements (`div`, `span`, `input`, ...). 
    * Add class and style it. 
    * Elements that have strict structure can be styled sometimes, but it is best avoid it anyways.
    * Use `> *` when needed.
  * Do not style by ids (`#element`).
  * Avoid shortened (`.btn`, `.inv-plan`) words.
  * Split layout styling and appearance/content styling into different classes. Same class should avoid mixing positioning, space allocation styling with fonts, colors, illustrative styling.
  * Try to look through `_variables.scss`, `_colors.scss` and related components to see if required patterns are already defined in code to avoid redundant similar implementations due to design inconsistencies or unclear instructions.
  
## `/styles/**` Structure
* `styles.scss` comments define folders and files structure for global styling.
* `_components-settings.scss` should be imported to `*.module.scss` files in order to use variables and helpers. `@import 'components-settings';`
  * This file must not contain any css output. Also, it's preferred that `@import` chains do not import this file twice even though it will usually not have noticeable consequences.