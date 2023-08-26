import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Container,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Windmill from "../animations/windmill.json";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";

const Form = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();

  const [statusMessage, setStatusMessage] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const [speed, setSpeed] = useState(null);

  const onSubmit = async (data) => {
    try {
      setSpeed(10);
      const response = await axios.post(
        "https://europe-west1-octue-amy.cloudfunctions.net/frontend-developer-case-study",
        {
          message: data,
        }
      );

      console.log("Successful: ", response.data);
      setSubmissionMessage("Submitted Successfully!");
      reset();

      setTimeout(() => {
        setSpeed(2);
        setStatusMessage("");
        setSubmissionMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSpeed(0);
      setStatusMessage("The windmill broke down :(");
      setSubmissionMessage("Submission Failed");

      // Set a timer to revert the speed back to 2 after 5 seconds
      setTimeout(() => {
        setSpeed(2);
        setStatusMessage("");
        setSubmissionMessage("");
      }, 5000);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        my: { xs: 5, md: 0 },
      }}
    >
      <Box
        sx={{
          boxShadow: 3,
          border: "1px solid #E0E0E0",
          borderRadius: 2,
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          width: { xs: "100%", md: "85%" },
          alignItems: "center",
          justifyContent: "center",
          gap: { md: 4 },
        }}
      >
        {/* FORM BOX */}
        <Box
          sx={{
            flex: 1,
            padding: 3,
            paddingBottom: { xs: 0, md: 3 },
            paddingTop: 3,
            backgroundColor: "background.default",
          }}
          order={{ xs: 2, md: 1 }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: {
                xs: "20px",
                sm: "18px",
                md: "24px",
              },
              textAlign: "center",
              paddingBottom: { xs: 1, md: 2 },
            }}
          >
            {" "}
            Please enter your Information
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              {/* NAME INPUT */}
              <TextField
                fullWidth
                id="name"
                label="Name"
                variant="outlined"
                placeholder="John Doe"
                {...register("name", {
                  required: "Name is Required",
                  maxLength: { value: 20, message: "Max length is 20" },
                  pattern: {
                    value: /^[A-Za-z\s]+$/i,
                    message: "Only letters are allowed",
                  },
                })}
                onBlur={() => trigger("name")}
                sx={{ mt: 3 }}
              />

              <Typography
                variant="body1"
                sx={{ color: "red", mt: errors.name ? { gap: 0 } : 3 }}
              >
                {errors.name?.message || " "}
              </Typography>

              {/* TURBINES INPUT */}
              <TextField
                fullWidth
                id="no_turbine"
                label="Number of Turbines"
                variant="outlined"
                placeholder="Ex: 100"
                {...register("no_turbines", {
                  required: "A Number is Required",
                  maxLength: { value: 5, message: "Max length is 5" },
                  minLength: { value: 1, message: "Min length is 1" },
                  pattern: {
                    value: /^\d+$/,
                    message: "Only numbers are allowed",
                  },
                })}
                onBlur={() => trigger("no_turbines")}
                sx={{ mt: 3 }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "red",
                  mt: errors.no_turbines ? { md: 0 } : 3,
                  mb: errors.no_turbines ? { xs: 3, md: 3 } : 3,
                }}
              >
                {errors.no_turbines?.message || " "}
              </Typography>

              {/* SUBMIT BUTTON */}
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  padding: 2,
                  fontWeight: "600",
                  fontStyle: "bold",
                  mb: { xs: 3, md: 0 },
                }}
              >
                <Typography variant="body1">Submit</Typography>
              </Button>
            </Stack>
          </form>
        </Box>

        {/* WINDMILL BOX */}
        <Box
          sx={{
            flex: 1,
            padding: 3,
            backgroundColor: "primary.main",
            borderRadius: { md: "0 2px 2px 0", xs: "0 0 2px 2px" },
          }}
          order={{ xs: 1, md: 2 }}
        >
          <Stack direction="column" sx={{ flexShrink: 0 }}>
            <Typography
              variant="h6"
              align="center"
              sx={{ mt: 2, color: "white" }}
            >
              {statusMessage}
            </Typography>
            <Player
              src={Windmill}
              className="player"
              loop
              autoplay
              speed={speed}
              key={speed}
              style={{ width: "100%", height: "auto", flexShrink: 0 }}
            />
            <Typography
              variant="h5"
              align="center"
              sx={{
                color: "white",
                mb: 2,
                flexShrink: 0,
                height: "1.5em",
              }}
            >
              {submissionMessage}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Form;
