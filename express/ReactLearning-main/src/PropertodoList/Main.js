import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import CreateTodo from "./CreateTodo";
import LinearProgress from "@mui/material/LinearProgress";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Container,
  Grid,
  Checkbox,
  TextField,
  Button,
  Alert,
  Paper,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Header from "./Header";
import ResponsiveDialog from "../components/SucessOrFailure/Responsive Dialog";

const Main = () => {
  const queryClient = useQueryClient();
  const getTodos = useQuery({
    queryKey: ["todos"],
    queryFn: () => axios.get("http://localhost:5000/todos"),
    onError: () => handleOpenSnackbar("Failed to fetch todos", "error"),
  });

  const todos = getTodos.data?.data?.data.sort(
    (a, b) => a.createdAt - b.createdAt
  );

  const createTodos = useMutation({
    mutationFn: (data) => axios.post("http://localhost:5000/todos", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      handleClickOpen("Todo Created Successfully");
    },
    onError: () => handleOpenSnackbar("Failed to create todo", "error"),
  });

  const deleteTodos = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:5000/todos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      handleClickOpen("Todo Deleted Successfully");
    },
    onError: () => handleOpenSnackbar("Failed to delete todo", "error"),
  });

  const ToggleTodo = useMutation({
    mutationFn: (todo) => {
      const response = axios.patch(`http://localhost:5000/todos/${todo.id}`, {
        isCompleted: !todo.isCompleted,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      handleClickOpen("Toggled Successfully");
    },
    onError: () => handleOpenSnackbar("Failed to toggle todo", "error"),
  });

  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  const editTodos = useMutation({
    mutationFn: ({ id, text }) =>
      axios.patch(`http://localhost:5000/todos/${id}`, { text }),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setEditId(null);
      setEditText("");
      handleClickOpen("Todo successfully updated!");
    },
    onError: () => handleOpenSnackbar("Failed to update todo", "error"),
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleOpenSnackbar = (message, severity = "error") => {
    setSnackbarContent(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  const handleClickOpen = (content) => {
    setDialogContent(content);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (data) => {
    createTodos.mutate(data);
    set;
  };

  const handleDelete = (id) => {
    deleteTodos.mutate(id);
  };

  const handleToggleTodo = (todo) => {
    ToggleTodo.mutate(todo);
  };

  const handleEdit = () => {
    if (editText.trim() && editId !== null) {
      editTodos.mutate({ id: editId, text: editText });
    }
  };

  return (
    <Grid>
      <Header />
      <Container style={{ width: 800 }}>
        {getTodos.isLoading && <LinearProgress>...Is Loading</LinearProgress>}
        <CreateTodo handleSubmit={handleSubmit} />
        <br />
        <Paper style={{ maxHeight: 500, overflow: "auto" }}>
          <List>
            {todos?.map((todo) => (
              <ListItem
                key={todo.id}
                divider
                style={{
                  backgroundColor: todo.isCompleted ? "#f0f0f0" : "inherit",
                  cursor: todo.isCompleted ? "default" : "pointer",
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={todo.isCompleted}
                    edge="start"
                    onChange={() => handleToggleTodo(todo)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={todo.text}
                  secondary={
                    <>
                      Status: {todo.isCompleted ? "Completed" : "Not Complete"}
                      <br />
                      Created At:{" "}
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                      if (!todo.isCompleted) {
                        setEditId(todo.id);
                        setEditText(todo.text);
                      }
                    }}
                    disabled={todo.isCompleted}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
        {editId && (
          <div style={{ marginTop: 20 }}>
            <TextField
              label="Edit Todo"
              value={editText}
              variant="filled"
              onChange={(e) => setEditText(e.target.value)}
              fullWidth
            />
            <Button
              onClick={handleEdit}
              variant="contained"
              color="success"
              style={{ marginTop: 10 }}
            >
              Save
            </Button>
          </div>
        )}
      </Container>
      <ResponsiveDialog
        open={open}
        handleClose={handleClose}
        content={dialogContent}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarContent}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Main;
