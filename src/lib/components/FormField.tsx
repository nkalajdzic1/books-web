import { FunctionComponent, PropsWithChildren } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "lib/components";

export interface IFormField extends PropsWithChildren {
  component?: (props: any) => JSX.Element;
  onChange?: (val: any) => void;
  onBlur?: (val: any) => void;
  name: string;
  additionalErrors?: Object;
  type?: string;
}

export const FormField: FunctionComponent<IFormField> = ({
  component: Component = Input,
  onChange,
  onBlur,
  name,
  additionalErrors,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext(); // we assume the form is wrapped with FormProvider (react-hooks-form)

  const handleChange = (payload: any) => {
    onChange?.(payload);
  };

  const handleBlur = (payload: any) => {
    onBlur?.(payload);
  };

  const getInnerErrors = (errs: any) => {
    let result = {};
    Object.keys(errs).forEach((k) => {
      result = { ...result, ...errs[k].types };
    });

    return result;
  };

  const getErrors = (formErrors: any, formName: any) => {
    const properties = Array.isArray(formName) ? formName : formName.split(".");
    const errs = properties.reduce(
      (prev: any, curr: any) => prev && prev[curr],
      formErrors
    );

    let errorsToReturn = undefined;

    if (errs) {
      if (errs.types) {
        errorsToReturn = errs.types;
      } else {
        errorsToReturn = errs.type
          ? { [`${errs.type}`]: errs.message }
          : getInnerErrors(errs);
      }
    }

    return errorsToReturn;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange: onFieldChange, onBlur: _onFieldBlur, value, ref },
      }) => {
        let errs = getErrors(errors, name);

        if (additionalErrors && Object.keys(additionalErrors).length > 0) {
          errs = {
            ...(errs || {}),
            ...additionalErrors,
          };
        }

        return (
          <Component
            onChange={(e: any) => {
              onFieldChange?.(e);
              handleChange(e);
            }}
            onBlur={(e: any) => {
              handleBlur(e);
              onFieldChange?.(e);
              // onFieldBlur?.()
            }}
            value={value}
            errors={errs}
            name={name}
            checked={value}
            componentRef={ref}
            {...props}
          />
        );
      }}
    />
  );
};
