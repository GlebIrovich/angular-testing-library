// https://github.com/testing-library/angular-testing-library/issues/188
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { render } from '../../src/public_api';

@Component({
  template: `<h1>Hello {{ formattedName }}</h1>`,
})
export class BugOnChangeComponent implements OnChanges {
  @Input() name: string;

  formattedName: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.name) {
      this.formattedName = changes.name.currentValue.toUpperCase();
    }
  }
}

it('should output formatted name after rendering', async () => {
  const { getByText } = await render(BugOnChangeComponent, { componentProperties: { name: 'name' } });

  getByText('Hello NAME');
});
