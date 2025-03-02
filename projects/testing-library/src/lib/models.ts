import { Type, DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { BoundFunction, Queries, queries, Config as dtlConfig } from '@testing-library/dom';
import { OptionsReceived } from 'pretty-format';

export type RenderResultQueries<Q extends Queries = typeof queries> = { [P in keyof Q]: BoundFunction<Q[P]> };
export interface RenderResult<ComponentType, WrapperType = ComponentType> extends RenderResultQueries {
  /**
   * @description
   * The containing DOM node of your rendered Angular Component.
   * This is a regular DOM node, so you can call container.querySelector etc. to inspect the children.
   */
  container: Element;
  /**
   * @description
   * Prints out the component's DOM with syntax highlighting.
   * Accepts an optional parameter, to print out a specific DOM node.
   *
   * @param
   * element: The to be printed HTML element, if not provided it will log the whole component's DOM
   */
  debug: (
    element?: Element | HTMLDocument | (Element | HTMLDocument)[],
    maxLength?: number,
    options?: OptionsReceived,
  ) => void;
  /**
   * @description
   * Trigger a change detection cycle for the component.
   *
   * For more info see https://angular.io/api/core/testing/ComponentFixture#detectChanges
   */
  detectChanges: () => void;
  /**
   * @description
   * The Angular `DebugElement` of the component.
   *
   * For more info see https://angular.io/api/core/DebugElement
   */
  debugElement: DebugElement;
  /**
   * @description
   * The Angular `ComponentFixture` of the component or the wrapper.
   * If a template is provided, it will be the fixture of the wrapper.
   *
   * For more info see https://angular.io/api/core/testing/ComponentFixture
   */
  fixture: ComponentFixture<WrapperType>;
  /**
   * @description
   * Navigates to the href of the element or to the path.
   *
   */
  navigate: (elementOrPath: Element | string, basePath?: string) => Promise<boolean>;
  /**
   * @description
   * Re-render the same component with different props.
   */
  rerender: (componentProperties: Partial<ComponentType>) => void;
}

export interface RenderComponentOptions<ComponentType, Q extends Queries = typeof queries> {
  /**
   * @description
   * Will call detectChanges when the component is compiled
   *
   * @default
   * true
   *
   * @example
   * const component = await render(AppComponent, {
   *  detectChanges: false
   * })
   */
  detectChanges?: boolean;
  /**
   * @description
   * A collection of components, directives and pipes needed to render the component, for example, nested components of the component.
   *
   * For more info see https://angular.io/api/core/NgModule#declarations
   *
   * @default
   * []
   *
   * @example
   * const component = await render(AppComponent, {
   *  declarations: [ CustomerDetailComponent, ButtonComponent ]
   * })
   */
  declarations?: any[];
  /**
   * @description
   * A collection of providers needed to render the component via Dependency Injection, for example, injectable services or tokens.
   *
   * For more info see https://angular.io/api/core/NgModule#providers
   *
   * @default
   * []
   *
   * @example
   * const component = await render(AppComponent, {
   *  providers: [
   *    CustomersService,
   *    {
   *      provide: MAX_CUSTOMERS_TOKEN,
   *      useValue: 10
   *    }
   *  ]
   * })
   */
  providers?: any[];
  /**
   * @description
   * A collection of imports needed to render the component, for example, shared modules.
   * Adds `NoopAnimationsModule` by default if `BrowserAnimationsModule` isn't added to the collection.
   *
   * For more info see https://angular.io/api/core/NgModule#imports
   *
   * @default
   * `[NoopAnimationsModule]`
   *
   * @example
   * const component = await render(AppComponent, {
   *  imports: [
   *    AppSharedModule,
   *    MaterialModule,
   *  ]
   * })
   */
  imports?: any[];
  /**
   * @description
   * A collection of schemas needed to render the component.
   * Allowed values are `NO_ERRORS_SCHEMA` and `CUSTOM_ELEMENTS_SCHEMA`.
   *
   * For more info see https://angular.io/api/core/NgModule#schemas
   *
   * @default
   * []
   *
   * @example
   * const component = await render(AppComponent, {
   *  schemas: [
   *    NO_ERRORS_SCHEMA,
   *  ]
   * })
   */
  schemas?: any[];
  /**
   * @description
   * An object to set `@Input` and `@Output` properties of the component
   *
   * @default
   * {}
   *
   * @example
   * const component = await render(AppComponent, {
   *  componentProperties: {
   *    counterValue: 10,
   *    send: (value) => { ... }
   *  }
   * })
   */
  componentProperties?: Partial<ComponentType>;
  /**
   * @description
   * A collection of providers to inject dependencies of the component.
   *
   * For more info see https://angular.io/api/core/Directive#providers
   *
   * @default
   * []
   *
   * @example
   * const component = await render(AppComponent, {
   *  componentProviders: [
   *    AppComponentService
   *  ]
   * })
   */
  componentProviders?: any[];
  /**
   * @description
   * Queries to bind. Overrides the default set from DOM Testing Library unless merged.
   *
   * @default
   * undefined
   *
   * @example
   * import * as customQueries from 'custom-queries'
   * import { queries } from '@testing-library/angular'
   *
   * const component = await render(AppComponent, {
   *  queries: { ...queries, ...customQueries }
   * })
   */
  queries?: Q;
  /**
   * @description
   * Exclude the component to be automatically be added as a declaration.
   * This is needed when the component is declared in an imported module.
   *
   * @default
   * false
   *
   * @example
   * const component = await render(AppComponent, {
   *  imports: [AppModule], // a module that includes AppComponent
   *  excludeComponentDeclaration: true
   * })
   */
  excludeComponentDeclaration?: boolean;

  /**
   * @description
   * The route configuration to set up the router service via `RouterTestingModule.withRoutes`.
   * For more info see https://angular.io/api/router/Routes.
   *
   * @example
   * const component = await render(AppComponent, {
   *  declarations: [ChildComponent],
   *  routes: [
   *    {
   *      path: '',
   *      children: [
   *         {
   *            path: 'child/:id',
   *            component: ChildComponent
   *          }
   *      ]
   *    }
   *  ]
   * })
   */
  routes?: Routes;

  /**
   * @description
   * Removes the Angular attributes (ng-version, and root-id) from the fixture.
   *
   * @default
   * `false`
   *
   * @example
   * const component = await render(AppComponent, {
   *  removeAngularAttributes: true
   * })
   */
  removeAngularAttributes?: boolean;
}

export interface RenderDirectiveOptions<WrapperType, Properties extends object = {}, Q extends Queries = typeof queries>
  extends RenderComponentOptions<Properties, Q> {
  /**
   * @description
   * The template to render the directive.
   * This template will override the template from the WrapperComponent.
   *
   * @example
   * const component = await render(SpoilerDirective, {
   *  template: `<div spoiler message='SPOILER'></div>`
   * })
   */
  template: string;
  /**
   * @description
   * An Angular component to wrap the component in.
   * The template will be overridden with the `template` option.
   *
   * @default
   * `WrapperComponent`, an empty component that strips the `ng-version` attribute
   *
   * @example
   * const component = await render(SpoilerDirective, {
   *  template: `<div spoiler message='SPOILER'></div>`
   *  wrapper: CustomWrapperComponent
   * })
   */
  wrapper?: Type<WrapperType>;
  componentProperties?: Partial<WrapperType & Properties>;
}

export interface Config {
  defaultImports: any[];
  dom: Partial<dtlConfig>;
}
