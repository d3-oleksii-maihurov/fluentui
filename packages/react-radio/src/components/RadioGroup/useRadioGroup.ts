import * as React from 'react';
import { getNativeElementProps, useEventCallback, useId } from '@fluentui/react-utilities';
import { RadioGroupProps, RadioGroupState } from './RadioGroup.types';

/**
 * Create the state required to render RadioGroup.
 *
 * The returned state can be modified with hooks such as useRadioGroupStyles_unstable,
 * before being passed to renderRadioGroup_unstable.
 *
 * @param props - props from this instance of RadioGroup
 * @param ref - reference to root HTMLElement of RadioGroup
 */
export const useRadioGroup_unstable = (props: RadioGroupProps, ref: React.Ref<HTMLDivElement>): RadioGroupState => {
  const generatedName = useId('radiogroup-');

  const { name = generatedName, value, defaultValue, disabled, layout = 'vertical', onChange } = props;

  return {
    layout,
    context: React.useMemo(
      () => ({
        name,
        value,
        defaultValue,
        disabled,
        layout,
      }),
      [name, layout, value, defaultValue, disabled],
    ),
    components: {
      root: 'div',
    },
    root: {
      ref,
      role: 'radiogroup',
      ...getNativeElementProps('div', props, /*excludedPropNames:*/ ['onChange', 'name']),
      onChange: useEventCallback(ev => {
        if (onChange && ev.target instanceof HTMLInputElement && ev.target.name === name) {
          onChange(ev, { value: ev.target.value });
        }
      }),
    },
  };
};
