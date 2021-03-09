import * as postcss from 'postcss';

export const getRule = ({
  Declaration,
  selector,
  prop,
  value,
}: {
  Declaration: typeof postcss.Declaration;
  selector: string;
  prop: string;
  value: string;
}): postcss.Rule => {
  const declaration = new Declaration({
    prop,
    value,
  });

  declaration.important = true;

  const rule = new postcss.Rule({ selector });
  rule.append(declaration);

  return rule;
};
