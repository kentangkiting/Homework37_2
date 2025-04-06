import { Form, Field } from "react-final-form";
import "./App.css";

function App() {
  const required = (name: string) => (value: string) => {
    return value ? undefined : `${name} dibutuhkan`;
  };

  const minLength = (min: number) => (value: string) => {
    return value && value.length < min
      ? `Harus lebih dari ${min} karakter `
      : undefined;
  };
  const maxLength = (max: number) => (value: string) => {
    return value && value.length > max
      ? `Harus Kurang dari ${max} karakter `
      : undefined;
  };
  const composeValidator =
    (...validators: any[]) =>
    (value: any) => {
      return validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );
    };
  return (
    <Form
      onSubmit={(value) => console.log(value)}
      render={({ handleSubmit, form, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            component="input"
            validate={composeValidator(required("Email"))}
          >
            {({ input, meta }) => (
              <div>
                <input {...input} name="email" placeholder="email" />
                {meta.touched && meta.error && <div>{meta.error}</div>}
              </div>
            )}
          </Field>
          <Field
            name="user"
            component="input"
            validate={composeValidator(
              required("User"),
              minLength(5),
              maxLength(12)
            )}
          >
            {({ input, meta }) => (
              <div>
                <input {...input} name="user" placeholder="user" />
                {meta.touched && meta.error && <div>{meta.error}</div>}
              </div>
            )}
          </Field>
          <Field
            name="password"
            component="input"
            validate={composeValidator(required("Password"), minLength(6))}
          >
            {({ input, meta }) => (
              <div>
                <input
                  {...input}
                  name="Password"
                  type="password"
                  placeholder="Password"
                />
                {meta.touched && meta.error && <div>{meta.error}</div>}
              </div>
            )}
          </Field>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button type="button" onClick={form.reset}>
            Reset
          </button>
        </form>
      )}
    ></Form>
  );
}

export default App;
