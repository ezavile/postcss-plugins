import * as postcss from 'postcss';

export const getRule = ({
  selector,
  prop,
  value,
}: {
  selector: string;
  prop: string;
  value: string;
}): postcss.Rule => {
  const declaration = new postcss.Declaration({
    prop,
    value,
  });

  declaration.important = true;

  const rule = new postcss.Rule({ selector });
  rule.append(declaration);

  return rule;
};
