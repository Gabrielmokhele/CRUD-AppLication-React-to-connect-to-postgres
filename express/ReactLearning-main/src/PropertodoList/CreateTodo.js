import React from "react";
import { TextField, Button, Box, FormControl } from "@mui/material";
import { Formik, Form, Field } from "formik";

const CreateTodo = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={{ text: "" }}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
    >
      {({ handleChange, handleBlur, values }) => (
        <Form>
          <Box sx={{ mt: 10 }}>
            <FormControl fullWidth>
              <Field
                as={TextField}
                sx={{ width: "100%" }}
                type="text"
                name="text"
                label="Enter Todo"
                variant="filled"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.text}
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 1 }}
            >
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CreateTodo;
